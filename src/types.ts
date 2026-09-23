export interface Question {
  id: string;
  category: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  extraKnowledge: string;
  memoryTip: string;
  sourceDocPage?: string; // e.g. "Trang 13 - Quy tắc và Điều khoản PRUKhỏe Linh Hoạt"
  scenario?: string; // Optional real-world context
  optionExplanations?: [string, string, string, string]; // Detailed breakdown of A, B, C, D
  isDoublePoints?: boolean; // Kahoot-style random x2 points!
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  unit?: string;
  score: number;
  streak: number;
  lastAnswer?: {
    option: number;
    isCorrect: boolean;
    points: number;
  };
}

export interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
  streak: number;
}

export interface LeaderboardEntry {
  id: string;
  agentName: string;
  agentUnit: string; // GA Office / Branch
  agentTitle: string; // FC, MDRT, PruStar, Trưởng ban...
  score: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  accuracy: number;
  timestamp: number;
}

export type PlayMode = 'presentation' | 'team_battle' | 'practice';

export interface RoomPlayer {
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

export interface RoomState {
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
  players: Record<string, RoomPlayer>;
  lastUpdated: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedOption: number | null;
  isAnswerSubmitted: boolean;
  score: number;
  history: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
    assignedTeamId?: string;
  }[];
  isTimerRunning: boolean;
  timeLeft: number;
  isGameOver: boolean;
}
