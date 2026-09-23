import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Award, 
  CheckCircle, 
  Sparkles,
  Layers,
  ArrowRight,
  Trophy,
  BarChart3,
  Shuffle
} from 'lucide-react';
import { Question, Team, PlayMode, Participant, RoomState } from './types';
import { generateGameQuestions, QUESTION_BANK } from './data/questionBank';
import { Header } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { QuestionNavigator } from './components/QuestionNavigator';
import { TeamScoreboard } from './components/TeamScoreboard';
import { TimerBar } from './components/TimerBar';
import { SummaryResult } from './components/SummaryResult';
import { CheatsheetModal } from './components/CheatsheetModal';
import { DocQuestionGeneratorModal } from './components/DocQuestionGeneratorModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { KahootPodium } from './components/KahootPodium';
import { KahootLobbyModal } from './components/KahootLobbyModal';
import { KahootPlayerView } from './components/KahootPlayerView';
import { PhoneSimulatorModal } from './components/PhoneSimulatorModal';
import { sound } from './utils/audio';

const INITIAL_TEAMS: Team[] = [
  { id: 'team-1', name: 'Đội Vươn Xa', color: '#ED1B2E', score: 0, streak: 0 },
  { id: 'team-2', name: 'Đội Bứt Phá', color: '#00A3E0', score: 0, streak: 0 },
  { id: 'team-3', name: 'Đội Tinh Anh Pru', color: '#F59E0B', score: 0, streak: 0 },
  { id: 'team-4', name: 'Đội Tiên Phong', color: '#10B981', score: 0, streak: 0 },
];

const INITIAL_PARTICIPANTS: Participant[] = [
  { id: 'p1', name: 'Nguyễn Thùy Linh', avatar: '🌟', unit: 'Ban Kinh Doanh 1', score: 0, streak: 0 },
  { id: 'p2', name: 'Trần Quốc Tuấn', avatar: '🚀', unit: 'Pru Sài Gòn', score: 0, streak: 0 },
  { id: 'p3', name: 'Lê Hoàng Nam', avatar: '💎', unit: 'PruStar Hà Nội', score: 0, streak: 0 },
  { id: 'p4', name: 'Phạm Thu Hằng', avatar: '🏆', unit: 'MDRT Miền Bắc', score: 0, streak: 0 },
  { id: 'p5', name: 'Vũ Minh Đức', avatar: '🔥', unit: 'FC Tinh Anh', score: 0, streak: 0 },
  { id: 'p6', name: 'Đặng Thị Mai', avatar: '⭐', unit: 'PruCare Đà Nẵng', score: 0, streak: 0 },
  { id: 'p7', name: 'Hoàng Gia Bảo', avatar: '⚡', unit: 'Pru Elite Cần Thơ', score: 0, streak: 0 },
  { id: 'p8', name: 'Đỗ Bích Ngọc', avatar: '🌺', unit: 'Pru Diamond Hải Phòng', score: 0, streak: 0 },
];

// Helper to assign random double points (~25% of questions)
const assignRandomDoublePoints = (qs: Question[]): Question[] => {
  return qs.map((q, idx) => {
    // Random double points on every 4th question or specific thrilling questions
    const isDouble = (idx + 1) % 4 === 0 || idx === 2 || idx === 11 || idx === 18;
    return {
      ...q,
      isDoublePoints: isDouble,
    };
  });
};

const TIMER_DEFAULT = 20; // Exact 20s as Kahoot standard requested

export default function App() {
  // Check if current URL was opened by scanning QR code with phone
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const urlPin = searchParams.get('pin');
  const isPlayerMode = Boolean(urlPin || searchParams.get('mode') === 'player');
  const [isManualPlayerMode, setIsManualPlayerMode] = useState(false);

  // Kahoot Room & Live Multiplayer state
  const [gamePin, setGamePin] = useState(urlPin || '839214');

  if (isPlayerMode || isManualPlayerMode) {
    return (
      <KahootPlayerView
        pin={urlPin || gamePin}
        onExitPlayerMode={() => {
          setIsManualPlayerMode(false);
          if (typeof window !== 'undefined' && urlPin) {
            window.location.href = window.location.pathname;
          }
        }}
      />
    );
  }

  const [questions, setQuestions] = useState<Question[]>(() => generateGameQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState<{
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
    assignedTeamId?: string;
  }[]>([]);

  const [room, setRoom] = useState<RoomState | null>(null);
  const [isKahootLobbyOpen, setIsKahootLobbyOpen] = useState(false);
  const [isPhoneSimOpen, setIsPhoneSimOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>(INITIAL_PARTICIPANTS);

  // Auto initialize room on server
  useEffect(() => {
    fetch('/api/room/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: gamePin }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRoom(data.room);
      })
      .catch(() => {});
  }, [gamePin]);

  // Real-time SSE Stream to listen for mobile players joining & answering
  useEffect(() => {
    const eventSource = new EventSource(`/api/room/${gamePin}/stream`);
    eventSource.onmessage = (event) => {
      try {
        const updatedRoom: RoomState = JSON.parse(event.data);
        setRoom(updatedRoom);

        const realPlayers = Object.values(updatedRoom.players);
        if (realPlayers.length > 0) {
          setParticipants(realPlayers.map((p) => ({
            id: p.id,
            name: p.name,
            avatar: p.avatar,
            unit: p.unit || '',
            score: p.score,
            streak: p.streak,
            lastAnswer: p.lastAnswer ? {
              option: p.lastAnswer.option,
              isCorrect: p.lastAnswer.isCorrect,
              points: p.lastAnswer.points,
              speedScore: p.lastAnswer.speedScore,
              orderRank: p.lastAnswer.orderRank,
              streakBonus: p.lastAnswer.streakBonus,
              streak: p.lastAnswer.streak,
            } : undefined,
          })));
        }
      } catch (err) {
        console.error('SSE parse error:', err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [gamePin]);

  // Game & Presentation modes
  const [playMode, setPlayMode] = useState<PlayMode>('presentation');
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [activeTeamId, setActiveTeamId] = useState<string>('team-1');
  const [isMuted, setIsMuted] = useState(false);
  const [isBgmActive, setIsBgmActive] = useState(false);

  // Current active question
  const currentQuestion = questions[currentIndex] || questions[0];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Timer state dynamically initialized to match current question's timeLimit
  const [customTimeLimit, setCustomTimeLimit] = useState(questions[0]?.timeLimit || 20);
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 20);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isTimerDisabled, setIsTimerDisabled] = useState(false); // Active countdown by default like Kahoot
  const timerRef = useRef<any>(null);

  // Views & Modals
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverTab, setGameOverTab] = useState<'podium' | 'details'>('podium');
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [isDocGeneratorOpen, setIsDocGeneratorOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Change answer time limit dynamically and broadcast to all TVV phones
  const handleChangeTimeLimit = (newLimit: number) => {
    sound.playClick();
    setCustomTimeLimit(newLimit);
    setTimeLeft(newLimit);
    if (!isAnswerSubmitted) {
      setIsTimerRunning(true);
    }
    fetch(`/api/room/${gamePin}/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'set_timer',
        timeLimitSec: newLimit,
      }),
    }).catch(() => {});
  };

  // Sound effects: play fanfare if double points appears
  useEffect(() => {
    if (currentQuestion?.isDoublePoints && !isAnswerSubmitted && !isGameOver) {
      sound.playDoublePointsFanfare();
    }
  }, [currentIndex, currentQuestion?.isDoublePoints, isAnswerSubmitted, isGameOver]);

  // Sync mute state to sound engine
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (next) {
      setIsBgmActive(false);
    }
  };

  // Toggle Lively Kahoot Background Music
  const handleToggleBgm = () => {
    if (isBgmActive) {
      sound.stopLivelyBGM();
      setIsBgmActive(false);
    } else {
      sound.setMuted(false);
      setIsMuted(false);
      sound.startLivelyBGM();
      setIsBgmActive(true);
    }
  };

  // Timer interval effect with automatic reveal upon countdown completion
  useEffect(() => {
    if (isTimerRunning && !isTimerDisabled && !isAnswerSubmitted && !isGameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            // Automatically reveal correct/wrong answer on host & TVV phones
            setTimeout(() => {
              handleTimeOutReveal();
            }, 0);
            return 0;
          }
          if (prev <= 6) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, isTimerDisabled, isAnswerSubmitted, isGameOver, currentIndex]);

  // Auto reveal when timer countdown reaches 0
  const handleTimeOutReveal = () => {
    if (isAnswerSubmitted) return;
    handleSelectOption(-1);
  };

  // Handle selecting an option (or -1 on timeout)
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;

    setSelectedOption(index);
    setIsAnswerSubmitted(true);
    setIsTimerRunning(false);

    const isCorrect = index >= 0 && index === currentQuestion.correctAnswer;
    const isDoublePoints = Boolean(currentQuestion.isDoublePoints);

    let pointsAwarded = 0;
    let speedScore = 0;
    let orderRankBonus = 0;
    let streakBonus = 0;
    let nextStreak = 0;

    if (isCorrect) {
      sound.playCorrect();
      nextStreak = streak + 1;
      setStreak(nextStreak);

      const totalSec = customTimeLimit || 20;
      const remainingSec = Math.max(0, Math.min(totalSec, timeLeft));
      const ratio = totalSec > 0 ? remainingSec / totalSec : 0.5;

      // Điểm tốc độ cơ sở: 500 - 1000 điểm
      speedScore = Math.round(500 + 500 * ratio);

      // Thưởng phản xạ nhanh: >80% thời gian: +100đ, >60%: +75đ, >40%: +50đ, còn lại: +25đ
      if (ratio > 0.8) orderRankBonus = 100;
      else if (ratio > 0.6) orderRankBonus = 75;
      else if (ratio > 0.4) orderRankBonus = 50;
      else orderRankBonus = 25;

      const basePoints = Math.round((speedScore + orderRankBonus) * (isDoublePoints ? 2 : 1));

      // Điểm thưởng chuỗi đúng liên tiếp (từ 3 câu trở lên)
      if (nextStreak >= 5) streakBonus = 400;
      else if (nextStreak === 4) streakBonus = 250;
      else if (nextStreak === 3) streakBonus = 150;

      pointsAwarded = basePoints + streakBonus;
      setScore((prev) => prev + pointsAwarded);

      // Light confetti celebration for right answer
      confetti({
        particleCount: isDoublePoints ? 80 : 45,
        spread: 70,
        origin: { y: 0.7 },
        colors: isDoublePoints ? ['#FFD700', '#FFA500', '#ED1B2E', '#22C55E'] : ['#22C55E', '#ED1B2E', '#FFD700'],
      });

      // Update team score if in team battle
      if (playMode === 'team_battle') {
        setTeams((prev) =>
          prev.map((t) => {
            if (t.id !== activeTeamId) return t;
            const teamNextStreak = t.streak + 1;
            let teamStreakBonus = 0;
            if (teamNextStreak >= 5) teamStreakBonus = 400;
            else if (teamNextStreak === 4) teamStreakBonus = 250;
            else if (teamNextStreak === 3) teamStreakBonus = 150;
            return {
              ...t,
              score: t.score + basePoints + teamStreakBonus,
              streak: teamNextStreak,
            };
          })
        );
      }
    } else {
      sound.playWrong();
      // Sai hoặc hết giờ: 0 điểm và HỦY chuỗi đúng lập tức!
      setStreak(0);
      pointsAwarded = 0;

      if (playMode === 'team_battle') {
        setTeams((prev) =>
          prev.map((t) =>
            t.id === activeTeamId ? { ...t, streak: 0 } : t
          )
        );
      }
    }

    // Update participants' answers and scores for Kahoot Breakdown ("Ai đã chọn câu nào")
    setParticipants((prev) => {
      let simCorrectRank = 0;
      return prev.map((p, pIdx) => {
        let chosenOpt = index;
        if (pIdx > 0) {
          const seed = (pIdx * 7 + currentIndex * 3) % 10;
          if (seed < 6) {
            chosenOpt = currentQuestion.correctAnswer;
          } else if (seed < 8) {
            chosenOpt = (currentQuestion.correctAnswer + 1) % 4;
          } else {
            chosenOpt = (currentQuestion.correctAnswer + 2) % 4;
          }
        }

        const pCorrect = chosenOpt === currentQuestion.correctAnswer;
        let pPoints = 0;
        let pStreak = 0;
        let pStreakBonus = 0;
        let pSpeedBonus = 0;
        let pOrderRank = 0;

        if (pCorrect) {
          simCorrectRank++;
          pOrderRank = simCorrectRank;
          pStreak = p.streak + 1;
          const simRatio = Math.max(0.1, 1 - (pIdx * 0.1));
          pSpeedBonus = Math.round(500 + 500 * simRatio);
          const simOrderBonus = pOrderRank === 1 ? 100 : pOrderRank === 2 ? 75 : pOrderRank === 3 ? 50 : 25;
          const simBase = Math.round((pSpeedBonus + simOrderBonus) * (isDoublePoints ? 2 : 1));

          if (pStreak >= 5) pStreakBonus = 400;
          else if (pStreak === 4) pStreakBonus = 250;
          else if (pStreak === 3) pStreakBonus = 150;

          pPoints = simBase + pStreakBonus;
        } else {
          pStreak = 0;
          pPoints = 0;
        }

        return {
          ...p,
          score: p.score + pPoints,
          streak: pStreak,
          lastAnswer: {
            option: chosenOpt,
            isCorrect: pCorrect,
            points: pPoints,
            speedScore: pSpeedBonus,
            orderRank: pOrderRank,
            streakBonus: pStreakBonus,
            streak: pStreak,
          },
        };
      });
    });

    // Save to history
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.questionId !== currentQuestion.id);
      return [
        ...filtered,
        {
          questionId: currentQuestion.id,
          selectedOption: index,
          isCorrect,
          assignedTeamId: playMode === 'team_battle' ? activeTeamId : undefined,
        },
      ];
    });

    // Notify connected mobile players via room API with question details for auto reveal
    fetch(`/api/room/${gamePin}/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'reveal',
        questionIndex: currentIndex,
        correctAnswer: currentQuestion.correctAnswer,
        questionText: currentQuestion.question,
        options: currentQuestion.options,
        explanation: currentQuestion.explanation,
      }),
    }).catch(() => {});
  };

  // Next Question logic
  const handleNextQuestion = () => {
    sound.playClick();
    if (isLastQuestion) {
      setIsGameOver(true);
      setGameOverTab('podium');
      sound.stopLivelyBGM();
      setIsBgmActive(false);

      fetch(`/api/room/${gamePin}/control`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'finish' }),
      }).catch(() => {});
      return;
    }

    const nextIndex = currentIndex + 1;
    const nextQ = questions[nextIndex];
    const nextTime = nextQ?.timeLimit || 20;

    setCurrentIndex(nextIndex);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCustomTimeLimit(nextTime);
    setTimeLeft(nextTime);
    if (!isTimerDisabled) {
      setIsTimerRunning(true);
    }

    // Auto rotate team in battle mode for next turn
    if (playMode === 'team_battle') {
      const currentTeamIdx = teams.findIndex((t) => t.id === activeTeamId);
      const nextTeam = teams[(currentTeamIdx + 1) % teams.length];
      setActiveTeamId(nextTeam.id);
    }

    // Broadcast next question to all player phones with tailored time limit & question details
    fetch(`/api/room/${gamePin}/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'next',
        questionIndex: nextIndex,
        isDoublePoints: Boolean(nextQ?.isDoublePoints),
        correctAnswer: nextQ?.correctAnswer,
        questionText: nextQ?.question,
        options: nextQ?.options,
        explanation: nextQ?.explanation,
        timeLimitSec: nextTime,
      }),
    }).catch(() => {});
  };

  // Previous Question
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      sound.playClick();
      jumpToQuestion(currentIndex - 1);
    }
  };

  // Jump to specific question
  const jumpToQuestion = (targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < questions.length) {
      setCurrentIndex(targetIndex);
      const targetQ = questions[targetIndex];
      const targetTime = targetQ?.timeLimit || 20;
      const answered = history.find((h) => h.questionId === targetQ.id);

      if (answered) {
        setSelectedOption(answered.selectedOption);
        setIsAnswerSubmitted(true);
        setIsTimerRunning(false);
      } else {
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
        setCustomTimeLimit(targetTime);
        setTimeLeft(targetTime);
        if (!isTimerDisabled) setIsTimerRunning(true);
      }

      fetch(`/api/room/${gamePin}/control`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'next',
          questionIndex: targetIndex,
          isDoublePoints: Boolean(targetQ?.isDoublePoints),
          correctAnswer: targetQ?.correctAnswer,
          questionText: targetQ?.question,
          options: targetQ?.options,
          explanation: targetQ?.explanation,
          timeLimitSec: targetTime,
        }),
      }).catch(() => {});
    }
  };

  // Reset entire quiz: generates a freshly shuffled 20-question exam (60% theory, 40% scenario, all categories)
  const handleResetQuiz = () => {
    sound.playClick();
    const freshQuestions = generateGameQuestions();
    setQuestions(freshQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setHistory([]);
    setIsGameOver(false);
    const initialTime = freshQuestions[0]?.timeLimit || 20;
    setCustomTimeLimit(initialTime);
    setTimeLeft(initialTime);
    setIsTimerRunning(!isTimerDisabled);
    setTeams(INITIAL_TEAMS);
    setParticipants(INITIAL_PARTICIPANTS);

    fetch(`/api/room/${gamePin}/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'next',
        questionIndex: 0,
        isDoublePoints: Boolean(freshQuestions[0]?.isDoublePoints),
        correctAnswer: freshQuestions[0]?.correctAnswer,
        questionText: freshQuestions[0]?.question,
        options: freshQuestions[0]?.options,
        explanation: freshQuestions[0]?.explanation,
        timeLimitSec: initialTime,
      }),
    }).catch(() => {});
  };

  // Shuffle new 20-question exam on demand
  const handleShuffleNewExam = () => {
    sound.playCorrect();
    handleResetQuiz();
  };

  // Add / Replace questions from Modal
  const handleAddQuestions = (newQuestions: Question[], replaceAll: boolean) => {
    const formatted = assignRandomDoublePoints(newQuestions);
    if (replaceAll) {
      setQuestions(formatted);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setScore(0);
      setHistory([]);
      setIsGameOver(false);
    } else {
      setQuestions((prev) => [...prev, ...formatted]);
    }
  };

  // Adjust score manually for teams
  const handleAdjustScore = (teamId: string, delta: number) => {
    sound.playClick();
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, score: Math.max(0, t.score + delta) } : t))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Header */}
      <Header
        playMode={playMode}
        setPlayMode={setPlayMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isBgmActive={isBgmActive}
        onToggleBgm={handleToggleBgm}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        onOpenDocGenerator={() => setIsDocGeneratorOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenKahootLobby={() => setIsKahootLobbyOpen(true)}
        onOpenPhoneSim={() => setIsPhoneSimOpen(true)}
        onOpenPlayerMode={() => setIsManualPlayerMode(true)}
        connectedPlayersCount={room ? Object.keys(room.players).length : 0}
        onResetQuiz={handleResetQuiz}
        onShuffleNewExam={handleShuffleNewExam}
        currentQuestionIndex={currentIndex}
        totalQuestions={questions.length}
        score={score}
        streak={streak}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 sm:px-6 flex flex-col gap-4">
        {isGameOver ? (
          <div>
            {/* View Selector between Kahoot Podium & Detailed Report */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={() => setGameOverTab('podium')}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  gameOverTab === 'podium'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Bục Vinh Quang Kahoot (Top 1, 2, 3)</span>
              </button>

              <button
                onClick={() => setGameOverTab('details')}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  gameOverTab === 'details'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/40 ring-2 ring-red-400'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Phân Tích Chi Tiết Từng Câu Hỏi</span>
              </button>
            </div>

            {gameOverTab === 'podium' ? (
              <KahootPodium
                participants={participants}
                totalQuestions={questions.length}
                onRestartQuiz={handleResetQuiz}
                onReviewQuestion={(idx) => {
                  setIsGameOver(false);
                  jumpToQuestion(idx);
                }}
                onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
                questions={questions}
              />
            ) : (
              <SummaryResult
                score={score}
                totalQuestions={questions.length}
                questions={questions}
                history={history}
                teams={teams}
                isTeamMode={playMode === 'team_battle'}
                onRestartQuiz={handleResetQuiz}
                onReviewQuestion={(idx) => {
                  setIsGameOver(false);
                  jumpToQuestion(idx);
                }}
                onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
                onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
              />
            )}
          </div>
        ) : (
          <>
            {/* Team Scoreboard (if Team Battle mode) */}
            {playMode === 'team_battle' && (
              <TeamScoreboard
                teams={teams}
                activeTeamId={activeTeamId}
                onSelectActiveTeam={(id) => {
                  sound.playClick();
                  setActiveTeamId(id);
                }}
                onAdjustScore={handleAdjustScore}
              />
            )}

            {/* Timer Bar with Custom Time Limit & Presets */}
            <TimerBar
              timeLeft={timeLeft}
              maxTime={customTimeLimit}
              isRunning={isTimerRunning}
              onToggleTimer={() => {
                sound.playClick();
                setIsTimerRunning(!isTimerRunning);
              }}
              onResetTimer={() => {
                sound.playClick();
                setTimeLeft(customTimeLimit);
                setIsTimerRunning(true);
              }}
              onAddTime={(sec) => {
                sound.playClick();
                setTimeLeft((t) => t + sec);
              }}
              onSelectTimeLimit={handleChangeTimeLimit}
              isDisabled={isTimerDisabled}
              onSetDisabled={(disabled) => {
                setIsTimerDisabled(disabled);
                if (disabled) setIsTimerRunning(false);
                else {
                  setTimeLeft(customTimeLimit);
                  setIsTimerRunning(true);
                }
              }}
            />

            {/* Main Interactive Question Card with Kahoot Styling & Participant Stats */}
            <QuestionCard
              question={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              selectedOption={selectedOption}
              isAnswerSubmitted={isAnswerSubmitted}
              onSelectOption={handleSelectOption}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={isLastQuestion}
              currentScore={score}
              participants={participants}
            />

            {/* Bottom Presentation Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Câu Trước</span>
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-xs font-bold text-white shadow-md shadow-red-950/40 transition-transform active:scale-95 cursor-pointer"
                >
                  <span>{isLastQuestion ? 'Xem Bục Vinh Quang Podium' : 'Câu Kế Tiếp'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-400 hidden sm:block">
                <span>Mẹo trình chiếu: Bấm phím </span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">
                  1 (▲), 2 (◆), 3 (●), 4 (■)
                </kbd>
                <span> để chọn đáp án • Bấm </span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">
                  Space
                </kbd>
                <span> để sang câu tiếp</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShuffleNewExam}
                  className="text-xs font-bold px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Trộn ngẫu nhiên bộ đề 20 câu: 60% Lý thuyết • 40% Tình huống, đầy đủ chủ đề"
                >
                  <Shuffle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Trộn Đề 20 Câu</span>
                </button>

                <button
                  onClick={() => {
                    setIsGameOver(true);
                    setGameOverTab('podium');
                    sound.stopLivelyBGM();
                    setIsBgmActive(false);
                  }}
                  className="text-xs font-black px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Vinh Danh Ngay (Top 1, 2, 3)</span>
                </button>
              </div>
            </div>

            {/* Question Navigator Drawer/Grid */}
            <QuestionNavigator
              questions={questions}
              currentIndex={currentIndex}
              history={history}
              onSelectIndex={(idx) => {
                sound.playClick();
                jumpToQuestion(idx);
              }}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onShuffleNewExam={handleShuffleNewExam}
            />
          </>
        )}
      </main>

      {/* Footer info */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-3 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>Prudential Việt Nam • Tài liệu đào tạo nội bộ Dịch vụ Bảo Lãnh Viện Phí 24/7</span>
          <span>Khẩu quyết: Lắng nghe. Thấu hiểu. Hành động.</span>
        </div>
      </footer>

      {/* Cheatsheet Modal */}
      <CheatsheetModal
        isOpen={isCheatsheetOpen}
        onClose={() => setIsCheatsheetOpen(false)}
      />

      {/* AI / Custom Document Question Generator Modal */}
      <DocQuestionGeneratorModal
        isOpen={isDocGeneratorOpen}
        onClose={() => setIsDocGeneratorOpen(false)}
        onAddQuestions={handleAddQuestions}
        currentQuestions={questions}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        currentScore={score}
        correctCount={history.filter((h) => h.isCorrect).length}
        wrongCount={history.filter((h) => !h.isCorrect).length}
        totalQuestions={questions.length}
      />

      {/* Kahoot QR Code & PIN Room Lobby Modal */}
      <KahootLobbyModal
        isOpen={isKahootLobbyOpen}
        onClose={() => setIsKahootLobbyOpen(false)}
        pin={gamePin}
        room={room}
        onStartGame={() => {
          sound.playClick();
          if (!isBgmActive) {
            sound.setMuted(false);
            setIsMuted(false);
            sound.startLivelyBGM();
            setIsBgmActive(true);
          }
          setTimeLeft(TIMER_DEFAULT);
          setIsTimerRunning(true);
          fetch(`/api/room/${gamePin}/control`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'start',
              questionIndex: currentIndex,
              isDoublePoints: Boolean(currentQuestion.isDoublePoints),
              correctAnswer: currentQuestion.correctAnswer,
            }),
          }).catch(() => {});
        }}
        onOpenPhoneSim={() => {
          setIsKahootLobbyOpen(false);
          setIsPhoneSimOpen(true);
        }}
      />

      {/* Mobile Player Simulator Modal */}
      <PhoneSimulatorModal
        isOpen={isPhoneSimOpen}
        onClose={() => setIsPhoneSimOpen(false)}
        pin={gamePin}
      />
    </div>
  );
}
