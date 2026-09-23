import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Prudential Cashless Hospitalization Training App' });
});

// In-memory Kahoot Game Rooms
interface PlayerState {
  id: string;
  name: string;
  unit?: string;
  avatar: string;
  score: number;
  streak: number;
  lastAnswer?: {
    questionIndex: number;
    option: number;
    timeTakenMs: number;
    isCorrect: boolean;
    points: number;
  };
}

interface RoomState {
  pin: string;
  status: 'lobby' | 'question' | 'reveal' | 'finished';
  currentQuestionIndex: number;
  questionStartTime: number;
  timeLimitSec: number;
  isDoublePoints: boolean;
  correctAnswer?: number;
  questionText?: string;
  options?: string[];
  explanation?: string;
  players: Record<string, PlayerState>;
  lastUpdated: number;
}

const rooms: Record<string, RoomState> = {};
const sseClients: Record<string, express.Response[]> = {};

function broadcastRoom(pin: string) {
  const room = rooms[pin];
  if (!room || !sseClients[pin]) return;
  const data = `data: ${JSON.stringify(room)}\n\n`;
  sseClients[pin].forEach((client) => {
    try {
      client.write(data);
    } catch {
      // client disconnected
    }
  });
}

// Create or get room
app.post('/api/room/create', (req, res) => {
  const pin = req.body.pin || String(Math.floor(100000 + Math.random() * 900000));
  if (!rooms[pin]) {
    rooms[pin] = {
      pin,
      status: 'lobby',
      currentQuestionIndex: 0,
      questionStartTime: Date.now(),
      timeLimitSec: 20, // 20s as requested
      isDoublePoints: false,
      players: {},
      lastUpdated: Date.now(),
    };
  }
  return res.json({ success: true, room: rooms[pin] });
});

// Get room details
app.get('/api/room/:pin', (req, res) => {
  const { pin } = req.params;
  const room = rooms[pin];
  if (!room) {
    return res.status(404).json({ error: 'Không tìm thấy phòng game với mã PIN này.' });
  }
  return res.json({ success: true, room });
});

// Join room as player (TVV only needs name and avatar)
app.post('/api/room/:pin/join', (req, res) => {
  const { pin } = req.params;
  const { name, unit, avatar, playerId } = req.body;

  if (!rooms[pin]) {
    // Auto-create room if not existing so anyone scanning can join immediately
    rooms[pin] = {
      pin,
      status: 'lobby',
      currentQuestionIndex: 0,
      questionStartTime: Date.now(),
      timeLimitSec: 20,
      isDoublePoints: false,
      players: {},
      lastUpdated: Date.now(),
    };
  }

  const room = rooms[pin];
  const id = playerId || `p_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  
  // Existing or new player
  if (!room.players[id]) {
    room.players[id] = {
      id,
      name: name || `TVV ${Object.keys(room.players).length + 1}`,
      unit: unit || '',
      avatar: avatar || '🌟',
      score: 0,
      streak: 0,
    };
  } else {
    // Update profile
    room.players[id].name = name || room.players[id].name;
    if (unit !== undefined) room.players[id].unit = unit;
    room.players[id].avatar = avatar || room.players[id].avatar;
  }

  room.lastUpdated = Date.now();
  broadcastRoom(pin);
  return res.json({ success: true, player: room.players[id], room });
});

// Player submits answer
app.post('/api/room/:pin/answer', (req, res) => {
  const { pin } = req.params;
  const { playerId, option, questionIndex, isCorrect, timeTakenMs, isDoublePoints } = req.body;

  const room = rooms[pin];
  if (!room || !room.players[playerId]) {
    return res.status(404).json({ error: 'Không tìm thấy người chơi hoặc phòng game.' });
  }

  const player = room.players[playerId];
  const correct = Boolean(isCorrect);
  const double = Boolean(isDoublePoints ?? room.isDoublePoints);

  // Scoring: Kahoot speed bonus + correctness (+10 for double, +5 for normal, -1 for wrong)
  const basePoints = correct ? (double ? 10 : 5) : -1;
  const timeBonus = correct && timeTakenMs && timeTakenMs < 20000 ? Math.max(0, Math.round((20000 - timeTakenMs) / 5000)) : 0;
  const totalPointsDelta = correct ? (basePoints + timeBonus) : -1;

  player.score = Math.max(0, player.score + totalPointsDelta);
  player.streak = correct ? player.streak + 1 : 0;
  player.lastAnswer = {
    questionIndex,
    option,
    timeTakenMs: timeTakenMs || 0,
    isCorrect: correct,
    points: totalPointsDelta,
  };

  room.lastUpdated = Date.now();
  broadcastRoom(pin);
  return res.json({ success: true, player, room });
});

// Host controls room (start game, next question, reveal answer, reset, change time limit)
app.post('/api/room/:pin/control', (req, res) => {
  const { pin } = req.params;
  const { action, questionIndex, isDoublePoints, correctAnswer, timeLimitSec, questionText, options, explanation } = req.body;

  const room = rooms[pin];
  if (!room) {
    return res.status(404).json({ error: 'Không tìm thấy phòng game.' });
  }

  if (timeLimitSec && typeof timeLimitSec === 'number') {
    room.timeLimitSec = timeLimitSec;
  }

  if (action === 'start') {
    room.status = 'question';
    room.currentQuestionIndex = questionIndex ?? 0;
    room.questionStartTime = Date.now();
    room.isDoublePoints = Boolean(isDoublePoints);
    if (correctAnswer !== undefined) room.correctAnswer = correctAnswer;
    if (questionText) room.questionText = questionText;
    if (options) room.options = options;
    if (explanation) room.explanation = explanation;
    // Clear last answers for the new question
    Object.values(room.players).forEach((p) => {
      delete p.lastAnswer;
    });
  } else if (action === 'next') {
    room.status = 'question';
    room.currentQuestionIndex = questionIndex ?? (room.currentQuestionIndex + 1);
    room.questionStartTime = Date.now();
    room.isDoublePoints = Boolean(isDoublePoints);
    if (correctAnswer !== undefined) room.correctAnswer = correctAnswer;
    if (questionText) room.questionText = questionText;
    if (options) room.options = options;
    if (explanation) room.explanation = explanation;
    Object.values(room.players).forEach((p) => {
      delete p.lastAnswer;
    });
  } else if (action === 'reveal') {
    room.status = 'reveal';
    if (correctAnswer !== undefined) room.correctAnswer = correctAnswer;
    if (explanation) room.explanation = explanation;
    if (options) room.options = options;
  } else if (action === 'set_timer') {
    if (timeLimitSec) {
      room.timeLimitSec = timeLimitSec;
    }
  } else if (action === 'finish') {
    room.status = 'finished';
  } else if (action === 'reset') {
    room.status = 'lobby';
    room.currentQuestionIndex = 0;
    room.questionStartTime = Date.now();
    Object.values(room.players).forEach((p) => {
      p.score = 0;
      p.streak = 0;
      delete p.lastAnswer;
    });
  }

  room.lastUpdated = Date.now();
  broadcastRoom(pin);
  return res.json({ success: true, room });
});

// Server-Sent Events (SSE) stream for instant real-time sync
app.get('/api/room/:pin/stream', (req, res) => {
  const { pin } = req.params;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  if (!sseClients[pin]) {
    sseClients[pin] = [];
  }
  sseClients[pin].push(res);

  // Send current state immediately if room exists
  if (rooms[pin]) {
    res.write(`data: ${JSON.stringify(rooms[pin])}\n\n`);
  }

  req.on('close', () => {
    if (sseClients[pin]) {
      sseClients[pin] = sseClients[pin].filter((c) => c !== res);
    }
  });
});

// AI Question Generator for Trainers pasting specific document pages
app.post('/api/generate-questions', async (req, res) => {
  try {
    const { documentText, topic, count = 5 } = req.body;

    if (!documentText || typeof documentText !== 'string' || documentText.trim().length < 20) {
      return res.status(400).json({ error: 'Nội dung tài liệu cần ít nhất 20 ký tự.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Chưa cấu hình GEMINI_API_KEY trong hệ thống.' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
Bạn là Chuyên gia Huấn luyện (Training Expert) cấp cao của Bảo hiểm Nhân thọ Prudential Việt Nam.
Hãy đọc kỹ nội dung tài liệu đào tạo sau đây về "Dịch vụ Bảo Lãnh Viện Phí" (và các gói sản phẩm chăm sóc sức khỏe liên quan của Prudential như PRU-Hành Trang Vui Khỏe, PRU-An Tâm Trọn Vẹn, thẻ bảo lãnh điện tử PRUOnline).

Nội dung tài liệu trích xuất từ các trang:
"""
${documentText.slice(0, 15000)}
"""

Chủ đề trọng tâm: ${topic || 'Quy trình, điều kiện, hạn mức và lưu ý bảo lãnh viện phí Prudential'}

Nhiệm vụ: Hãy tạo đúng ${Math.min(Math.max(Number(count) || 5, 2), 10)} câu hỏi trắc nghiệm thực chiến, có tính tình huống cao cho Đại lý / Tư vấn viên Prudential luyện tập trong lớp huấn luyện.
Yêu cầu đối với mỗi câu:
1. "question": Câu hỏi rõ ràng, có tính gợi mở hoặc tình huống khách hàng thực tế (Case study).
2. "options": Đúng 4 phương án lựa chọn (A, B, C, D) có tính bẫy hợp lý và bám sát quy tắc bảo lãnh viện phí.
3. "correctAnswer": Số index của đáp án đúng (0, 1, 2, hoặc 3).
4. "explanation": Lời giải thích chuyên sâu của Chuyên gia huấn luyện tại sao đáp án đó đúng, căn cứ quy định sản phẩm Prudential.
5. "extraKnowledge": Kiến thức bổ sung / Mẹo tư vấn thực chiến giúp đại lý "chốt sales" hoặc hướng dẫn khách hàng nhập viện an tâm.
6. "memoryTip": Lời khuyên ghi nhớ ngắn gọn (dễ thuộc lòng, khẩu quyết) giúp đại lý không bao giờ bị nhầm lẫn khi khách hàng hỏi.
7. "category": Nhóm chuyên đề (Ví dụ: "Quy trình bảo lãnh", "Điều khoản loại trừ & Thời gian chờ", "Hồ sơ thủ tục & Thẻ điện tử", "Xử lý tình huống tại viện").

Trả về định dạng JSON thuần theo schema đã định nghĩa.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctAnswer: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  extraKnowledge: { type: Type.STRING },
                  memoryTip: { type: Type.STRING },
                  category: { type: Type.STRING },
                },
                required: ['question', 'options', 'correctAnswer', 'explanation', 'extraKnowledge', 'memoryTip', 'category'],
              },
            },
          },
          required: ['questions'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, questions: parsed.questions || [] });
  } catch (error: any) {
    console.error('Error generating questions:', error);
    return res.status(500).json({
      error: error.message || 'Lỗi khi tạo câu hỏi từ tài liệu bằng AI',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Prudential Training App running on http://0.0.0.0:${port}`);
  });
}

startServer();
