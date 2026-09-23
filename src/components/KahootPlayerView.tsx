import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Trophy, 
  Clock, 
  Sparkles, 
  ArrowLeft,
  Smartphone,
  ShieldCheck,
  Send,
  Edit3,
  User,
  Hash,
  Smile,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { RoomPlayer, RoomState } from '../types';
import { sound } from '../utils/audio';

const AVATARS = ['🌟', '🚀', '💎', '🏆', '🔥', '⭐', '⚡', '🌺', '🎯', '💡', '🦅', '🦁'];

const NICKNAME_SUGGESTIONS = [
  'MDRT Tinh Anh',
  'PruStar Toàn Năng',
  'Chiến Binh Pru',
  'Cố Vấn Kim Cương',
  'Chuyên Gia Viện Phí',
];

const SHAPE_CONFIG = [
  { shape: '▲', label: 'A', name: 'Tam giác Đỏ', bg: 'bg-[#E21B3C]', border: 'border-red-500', text: 'text-red-400' },
  { shape: '◆', label: 'B', name: 'Hình thoi Xanh', bg: 'bg-[#1368CE]', border: 'border-blue-500', text: 'text-blue-400' },
  { shape: '●', label: 'C', name: 'Hình tròn Vàng', bg: 'bg-[#D89E00]', border: 'border-amber-500', text: 'text-amber-400' },
  { shape: '■', label: 'D', name: 'Hình vuông Lục', bg: 'bg-[#26890C]', border: 'border-emerald-500', text: 'text-emerald-400' },
];

interface KahootPlayerViewProps {
  pin: string;
  onExitPlayerMode: () => void;
}

export const KahootPlayerView: React.FC<KahootPlayerViewProps> = ({
  pin: initialPin,
  onExitPlayerMode,
}) => {
  // Room PIN state
  const [pin, setPin] = useState<string>(initialPin || '839214');

  // Player identity state (TVV Name + Avatar only, no department code)
  const [playerId, setPlayerId] = useState<string>(() => {
    return localStorage.getItem(`pru_player_id_${initialPin}`) || '';
  });
  const [name, setName] = useState<string>(() => {
    return localStorage.getItem('pru_player_name') || '';
  });
  const [avatar, setAvatar] = useState<string>(() => {
    return localStorage.getItem('pru_player_avatar') || '🌟';
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  // Room & game state
  const [room, setRoom] = useState<RoomState | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef<any>(null);
  const questionStartRef = useRef<number>(Date.now());

  // SSE Stream to receive real-time room updates from host
  useEffect(() => {
    const activePin = pin.trim() || initialPin;
    const eventSource = new EventSource(`/api/room/${activePin}/stream`);

    eventSource.onmessage = (event) => {
      try {
        const data: RoomState = JSON.parse(event.data);
        setRoom(data);
      } catch (err) {
        console.error('Error parsing SSE room state:', err);
      }
    };

    eventSource.onerror = () => {
      // Fallback polling if SSE drops
      fetch(`/api/room/${activePin}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setRoom(data.room);
        })
        .catch(() => {});
    };

    return () => {
      eventSource.close();
    };
  }, [pin, initialPin]);

  // Sync player registration if playerId was stored
  useEffect(() => {
    if (room && playerId && room.players[playerId]) {
      setIsRegistered(true);
    }
  }, [room, playerId]);

  // Handle question transitions and synchronized countdown
  useEffect(() => {
    if (!room) return;

    if (room.status === 'question') {
      questionStartRef.current = room.questionStartTime || Date.now();
      setSelectedOption(null);
      const limit = room.timeLimitSec || 20;
      
      const elapsed = Math.floor((Date.now() - (room.questionStartTime || Date.now())) / 1000);
      const remaining = Math.max(0, limit - elapsed);
      setTimeLeft(remaining);

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        const currElapsed = Math.floor((Date.now() - questionStartRef.current) / 1000);
        const currRemaining = Math.max(0, limit - currElapsed);
        setTimeLeft(currRemaining);

        if (currRemaining <= 0) {
          clearInterval(timerRef.current);
        }
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [room?.status, room?.currentQuestionIndex, room?.timeLimitSec, room?.questionStartTime]);

  // Register or Update TVV Name in Room
  const handleJoinOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPin = pin.trim() || initialPin;
    if (!cleanName || !cleanPin) return;

    sound.playClick();
    const id = playerId || `p_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    try {
      const res = await fetch(`/api/room/${cleanPin}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: id,
          name: cleanName,
          avatar,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPlayerId(id);
        localStorage.setItem(`pru_player_id_${cleanPin}`, id);
        localStorage.setItem('pru_player_name', cleanName);
        localStorage.setItem('pru_player_avatar', avatar);
        setIsRegistered(true);
        setIsEditingName(false);
      }
    } catch (err) {
      console.error('Join error:', err);
    }
  };

  // Submit Answer when TVV taps one of the 4 Kahoot shape buttons
  const handleSelectAnswer = async (optionIndex: number) => {
    if (selectedOption !== null || !room || room.status !== 'question' || isSubmitting || timeLeft <= 0) return;

    setSelectedOption(optionIndex);
    setIsSubmitting(true);
    sound.playClick();

    const timeTakenMs = Date.now() - questionStartRef.current;
    const isCorrect = room.correctAnswer !== undefined ? optionIndex === room.correctAnswer : true;

    try {
      await fetch(`/api/room/${pin}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          option: optionIndex,
          questionIndex: room.currentQuestionIndex,
          isCorrect,
          timeTakenMs,
          isDoublePoints: room.isDoublePoints,
        }),
      });
    } catch (err) {
      console.error('Answer submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPlayer: RoomPlayer | undefined = (room && playerId) ? room.players[playerId] : undefined;

  // Auto-reveal on TVV phone when countdown reaches 0 OR room is set to 'reveal'
  const isTimeEnded = room?.status === 'question' && timeLeft <= 0;
  const isAutoRevealed = room?.status === 'reveal' || isTimeEnded;

  // 1. Render registration screen (OR Editing Name screen) - NO DEPARTMENT/UNIT FIELD
  if (!isRegistered || isEditingName) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/60 space-y-5">
          {/* Top navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-sm shadow-md">
                P
              </div>
              <span className="font-bold text-sm tracking-tight text-slate-200">
                PruQuest Live
              </span>
            </div>
            {isRegistered ? (
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 cursor-pointer"
              >
                Hủy
              </button>
            ) : (
              <button
                onClick={onExitPlayerMode}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Về Máy Chiếu</span>
              </button>
            )}
          </div>

          {/* Heading */}
          <div className="text-center">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-wider mb-2">
              <Hash className="w-3.5 h-3.5" />
              <span>PHÒNG THI KHOÁNG ĐẠT</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isEditingName ? 'Đổi Tên TVV' : 'Đặt Tên TVV & Vào Phòng'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Nhập mã phòng và tên Tư Vấn Viên để hiển thị trên bảng máy chiếu
            </p>
          </div>

          <form onSubmit={handleJoinOrUpdate} className="space-y-4">
            {/* 1. MÃ PHÒNG (GAME PIN) */}
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-amber-400" />
                <span>Mã Phòng (Game PIN):</span>
              </label>
              <input
                type="text"
                required
                maxLength={8}
                placeholder="VD: 839214"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\s+/g, ''))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-mono font-black text-lg tracking-widest text-center focus:border-red-500 focus:outline-none shadow-inner"
              />
            </div>

            {/* 2. MỤC ĐẶT TÊN TVV (CHỈ CẦN TÊN TVV, KHÔNG CẦN PHÒNG BAN) */}
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-red-400" />
                  <span>Tên Tư Vấn Viên (TVV) / Đại Lý:</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Thùy Linh, Tuấn MDRT..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm font-bold focus:border-red-500 focus:outline-none"
                />
              </div>

              {/* Quick nickname suggestion pills */}
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block mb-1.5">
                  Gợi ý tên nhanh:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {NICKNAME_SUGGESTIONS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        const base = name ? name.split(' - ')[0] : 'TVV';
                        setName(`${base} (${tag})`);
                      }}
                      className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                    >
                      +{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. CHỌN BIỂU TƯỢNG ĐẠI DIỆN */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-amber-400" />
                <span>Chọn biểu tượng đại diện:</span>
              </label>
              <div className="flex flex-wrap gap-2 justify-center">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setAvatar(av);
                    }}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                      avatar === av
                        ? 'bg-red-600 scale-110 shadow-lg ring-2 ring-white'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* LIVE PREVIEW BADGE */}
            <div className="p-3 rounded-xl bg-red-950/30 border border-red-800/40 text-center">
              <span className="text-[10px] uppercase font-bold text-red-400 block tracking-wider mb-1">
                Tên hiển thị trên màn hình máy chiếu:
              </span>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm font-bold text-white shadow-sm">
                <span className="text-xl">{avatar}</span>
                <span>{name || 'Họ Tên TVV'}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-400 font-black text-sm tracking-wide text-white shadow-xl shadow-red-950/60 transition-transform active:scale-95 cursor-pointer mt-2"
            >
              {isEditingName ? 'LƯU TÊN TVV MỚI' : 'VÀO PHÒNG GAME NGAY'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Waiting in Lobby
  if (!room || room.status === 'lobby') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-red-600/20 border-2 border-red-500/40 text-4xl flex items-center justify-center mx-auto shadow-inner animate-bounce">
            {avatar}
          </div>

          <div>
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {name}
              </h2>
              <button
                onClick={() => setIsEditingName(true)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                title="Đổi tên TVV"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-red-400 font-bold mt-1">
              Tư Vấn Viên Prudential
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              ĐÃ VÀO PHÒNG THÀNH CÔNG
            </span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              PIN: {pin}
            </div>
            <p className="text-xs text-slate-300">
              Hãy nhìn lên màn hình máy chiếu. Giảng viên sắp bấm nút bắt đầu bài thi!
            </p>
          </div>

          {/* Quick button to edit name if TVV wants */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsEditingName(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Đổi tên TVV khác</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-bold animate-pulse">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Đang kết nối trực tiếp ({room?.timeLimitSec || 20}s / Câu)</span>
          </div>

          <button
            onClick={onExitPlayerMode}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
          >
            Thoát chế độ người chơi
          </button>
        </div>
      </div>
    );
  }

  // 3. Finished / Game Over Podium Screen
  if (room.status === 'finished') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              HOÀN THÀNH BÀI THI!
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Tư vấn viên: <span className="text-white font-bold">{name}</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              Tổng điểm đạt được
            </span>
            <div className="text-4xl font-black text-amber-400 font-mono mt-1">
              {currentPlayer?.score ?? 0} ĐIỂM
            </div>
            <p className="text-xs text-emerald-400 font-semibold mt-2">
              Hãy nhìn lên Bục Vinh Quang Top 1, 2, 3 trên máy chiếu!
            </p>
          </div>

          <button
            onClick={onExitPlayerMode}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
          >
            Quay lại màn hình chính
          </button>
        </div>
      </div>
    );
  }

  // 4. AUTOMATIC REVEAL SCREEN (KHI HẾT GIỜ ĐẾM HOẶC KHI PHÒNG CHUYỂN REVEAL)
  if (isAutoRevealed) {
    // Check if player selected an option
    const hasChosen = selectedOption !== null && selectedOption >= 0;
    const isCorrect = hasChosen && (room.correctAnswer !== undefined ? selectedOption === room.correctAnswer : Boolean(currentPlayer?.lastAnswer?.isCorrect));
    const isTimedOutWithoutAnswer = !hasChosen;

    const pointsDelta = currentPlayer?.lastAnswer?.points ?? (isCorrect ? (room.isDoublePoints ? 10 : 5) : -1);

    const correctConfig = room.correctAnswer !== undefined ? SHAPE_CONFIG[room.correctAnswer] : undefined;
    const chosenConfig = hasChosen && selectedOption !== null ? SHAPE_CONFIG[selectedOption] : undefined;
    const correctOptionText = room.options && room.correctAnswer !== undefined ? room.options[room.correctAnswer] : '';

    return (
      <div className={`min-h-screen text-white flex flex-col items-center justify-center p-4 transition-colors ${
        isCorrect ? 'bg-emerald-950' : 'bg-rose-950'
      }`}>
        <div className="w-full max-w-md bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 my-auto">
          {/* Status Icon */}
          <div className="flex justify-center">
            {isCorrect ? (
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center animate-scale-up">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
            ) : isTimedOutWithoutAnswer ? (
              <div className="w-20 h-20 rounded-full bg-amber-500/20 border-4 border-amber-400 flex items-center justify-center animate-scale-up">
                <Clock className="w-12 h-12 text-amber-400 animate-pulse" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-rose-500/20 border-4 border-rose-400 flex items-center justify-center animate-scale-up">
                <XCircle className="w-12 h-12 text-rose-400" />
              </div>
            )}
          </div>

          {/* Result Heading */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black">
              {isCorrect 
                ? 'CHÍNH XÁC! 🎉' 
                : isTimedOutWithoutAnswer 
                ? 'HẾT THỜI GIAN TRẢ LỜI! ⏱️' 
                : 'CHƯA CHÍNH XÁC! ❌'}
            </h2>
            <div className="text-sm mt-2 text-slate-300 space-y-1">
              {isCorrect ? (
                <>
                  <div className="text-emerald-300 font-extrabold text-base">
                    +{pointsDelta} điểm {room.isDoublePoints && '⭐ (x2 Nhân đôi)'}!
                  </div>
                  {currentPlayer?.lastAnswer && (
                    <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-300 pt-1">
                      {currentPlayer.lastAnswer.speedScore !== undefined && (
                        <span className="bg-slate-800 px-2 py-0.5 rounded-md text-amber-300 border border-slate-700">
                          Tốc độ: +{currentPlayer.lastAnswer.speedScore}đ
                        </span>
                      )}
                      {currentPlayer.lastAnswer.orderRank !== undefined && (
                        <span className="bg-slate-800 px-2 py-0.5 rounded-md text-sky-300 border border-slate-700">
                          Thứ hạng nộp: #{currentPlayer.lastAnswer.orderRank}
                        </span>
                      )}
                      {currentPlayer.lastAnswer.streakBonus !== undefined && currentPlayer.lastAnswer.streakBonus > 0 && (
                        <span className="bg-orange-950/80 px-2 py-0.5 rounded-md text-orange-300 font-bold border border-orange-700/60 flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-orange-400" />
                          Chuỗi đúng ({currentPlayer.streak} câu): +{currentPlayer.lastAnswer.streakBonus}đ!
                        </span>
                      )}
                    </div>
                  )}
                </>
              ) : isTimedOutWithoutAnswer ? (
                <div className="text-amber-300">
                  <span>Hết giờ mà chưa kịp chạm đáp án! Chuỗi đúng bị hủy về 0.</span>
                </div>
              ) : (
                <div className="text-rose-300">
                  <div>Bạn đã chọn <span className="font-bold">{chosenConfig?.shape} {chosenConfig?.label}</span>.</div>
                  <div className="text-xs text-rose-400/80 mt-0.5">Không duy trì được chuỗi đúng (Chuỗi về 0).</div>
                </div>
              )}
            </div>
          </div>

          {/* EXACT CORRECT ANSWER BANNER */}
          {correctConfig && (
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border-2 border-emerald-500/60 text-left space-y-1.5">
              <span className="text-[10px] uppercase font-black text-emerald-400 tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ĐÁP ÁN ĐÚNG TRÊN MÁY CHIẾU:</span>
              </span>
              <div className="flex items-start gap-2.5">
                <span className={`w-8 h-8 rounded-xl ${correctConfig.bg} text-white font-black flex items-center justify-center text-sm shrink-0 shadow-md`}>
                  {correctConfig.shape}
                </span>
                <div className="text-xs font-bold text-slate-100 leading-snug pt-1">
                  <span className="text-emerald-400 font-black">{correctConfig.label}. </span>
                  {correctOptionText || `Phương án ${correctConfig.label}`}
                </div>
              </div>
            </div>
          )}

          {/* PROFESSIONAL EXPLANATION (QUY TẮC BẢO LÃNH 24/7) */}
          {room.explanation && (
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/50 text-left space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-400" />
                <span>Quy tắc nghiệp vụ:</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {room.explanation}
              </p>
            </div>
          )}

          {/* TVV Live Stats */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Tổng Điểm TVV
              </span>
              <span className="text-2xl font-black text-amber-400">
                {currentPlayer?.score ?? 0}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Chuỗi Thắng
              </span>
              <span className="text-2xl font-black text-red-400 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-current" />
                {currentPlayer?.streak ?? 0}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 animate-pulse flex items-center justify-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Đang chờ Giảng viên mở câu hỏi tiếp theo...</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. Active Countdown Question Screen with 4 Kahoot Touch Buttons (▲, ◆, ●, ■)
  const isDoublePoints = Boolean(room.isDoublePoints);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-3 sm:p-4 selection:bg-none select-none">
      {/* Top Header: TVV Profile & Countdown */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{avatar}</span>
          <div>
            <div className="text-xs font-black text-slate-200 leading-tight">
              {name}
            </div>
            <div className="text-[10px] text-amber-400 font-bold font-mono">
              {currentPlayer?.score ?? 0} điểm
            </div>
          </div>
        </div>

        {/* Dynamic Countdown Ring */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 font-mono">
          <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-rose-500 animate-bounce' : 'text-amber-400'}`} />
          <span className={`text-base font-black ${timeLeft <= 5 ? 'text-rose-400' : 'text-slate-100'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Center status banner */}
      <div className="text-center my-3">
        {isDoublePoints && (
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-black tracking-wider uppercase shadow-sm shadow-amber-950/40 mb-2 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CÂU HỎI NHÂN ĐÔI ĐIỂM (X2)</span>
          </div>
        )}

        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Câu hỏi số {(room.currentQuestionIndex || 0) + 1}
        </div>
        <p className="text-sm font-semibold text-slate-200 mt-0.5">
          {selectedOption !== null
            ? 'Đã ghi nhận lựa chọn! Khi hết giờ sẽ tự động hiện đáp án...'
            : 'Hãy nhìn câu hỏi trên máy chiếu và chạm vào hình tương ứng:'}
        </p>
      </div>

      {/* 4 HUGE KAHOOT TOUCH BUTTONS (▲, ◆, ●, ■) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-1 max-h-[70vh] my-auto">
        {/* Option 0 - RED TRIANGLE ▲ */}
        <button
          onClick={() => handleSelectAnswer(0)}
          disabled={selectedOption !== null || timeLeft <= 0}
          className={`h-full min-h-[140px] rounded-3xl flex flex-col items-center justify-center gap-2 text-white font-black shadow-xl transition-all cursor-pointer active:scale-95 ${
            selectedOption === 0
              ? 'bg-[#E21B3C] ring-4 ring-white scale-98 shadow-red-900/80'
              : selectedOption !== null
              ? 'bg-red-950/40 opacity-40'
              : 'bg-gradient-to-br from-[#E21B3C] to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-red-950/50'
          }`}
        >
          <span className="text-5xl sm:text-6xl drop-shadow-md">▲</span>
          <span className="text-lg tracking-wider font-extrabold">A</span>
        </button>

        {/* Option 1 - BLUE DIAMOND ◆ */}
        <button
          onClick={() => handleSelectAnswer(1)}
          disabled={selectedOption !== null || timeLeft <= 0}
          className={`h-full min-h-[140px] rounded-3xl flex flex-col items-center justify-center gap-2 text-white font-black shadow-xl transition-all cursor-pointer active:scale-95 ${
            selectedOption === 1
              ? 'bg-[#1368CE] ring-4 ring-white scale-98 shadow-blue-900/80'
              : selectedOption !== null
              ? 'bg-blue-950/40 opacity-40'
              : 'bg-gradient-to-br from-[#1368CE] to-cyan-700 hover:from-blue-500 hover:to-cyan-600 shadow-blue-950/50'
          }`}
        >
          <span className="text-5xl sm:text-6xl drop-shadow-md">◆</span>
          <span className="text-lg tracking-wider font-extrabold">B</span>
        </button>

        {/* Option 2 - YELLOW CIRCLE ● */}
        <button
          onClick={() => handleSelectAnswer(2)}
          disabled={selectedOption !== null || timeLeft <= 0}
          className={`h-full min-h-[140px] rounded-3xl flex flex-col items-center justify-center gap-2 text-white font-black shadow-xl transition-all cursor-pointer active:scale-95 ${
            selectedOption === 2
              ? 'bg-[#D89E00] ring-4 ring-white scale-98 shadow-amber-900/80 text-slate-950'
              : selectedOption !== null
              ? 'bg-amber-950/40 opacity-40'
              : 'bg-gradient-to-br from-[#D89E00] to-yellow-600 hover:from-amber-400 hover:to-yellow-500 shadow-amber-950/50'
          }`}
        >
          <span className="text-5xl sm:text-6xl drop-shadow-md">●</span>
          <span className="text-lg tracking-wider font-extrabold">C</span>
        </button>

        {/* Option 3 - GREEN SQUARE ■ */}
        <button
          onClick={() => handleSelectAnswer(3)}
          disabled={selectedOption !== null || timeLeft <= 0}
          className={`h-full min-h-[140px] rounded-3xl flex flex-col items-center justify-center gap-2 text-white font-black shadow-xl transition-all cursor-pointer active:scale-95 ${
            selectedOption === 3
              ? 'bg-[#26890C] ring-4 ring-white scale-98 shadow-emerald-900/80'
              : selectedOption !== null
              ? 'bg-emerald-950/40 opacity-40'
              : 'bg-gradient-to-br from-[#26890C] to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-emerald-950/50'
          }`}
        >
          <span className="text-5xl sm:text-6xl drop-shadow-md">■</span>
          <span className="text-lg tracking-wider font-extrabold">D</span>
        </button>
      </div>

      {/* Bottom status */}
      <div className="text-center py-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
        <span>Prudential Việt Nam • Đấu Trí Bảo Lãnh Viện Phí 24/7</span>
      </div>
    </div>
  );
};
