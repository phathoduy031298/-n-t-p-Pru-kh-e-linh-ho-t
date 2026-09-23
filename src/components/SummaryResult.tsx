import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Share2, 
  Flame, 
  BookOpen
} from 'lucide-react';
import { Question, Team } from '../types';
import { sound } from '../utils/audio';

interface SummaryResultProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  history: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
    assignedTeamId?: string;
  }[];
  teams: Team[];
  isTeamMode: boolean;
  onRestartQuiz: () => void;
  onReviewQuestion: (index: number) => void;
  onOpenCheatsheet: () => void;
  onOpenLeaderboard: () => void;
}

export const SummaryResult: React.FC<SummaryResultProps> = ({
  score,
  totalQuestions,
  questions,
  history,
  teams,
  isTeamMode,
  onRestartQuiz,
  onReviewQuestion,
  onOpenCheatsheet,
  onOpenLeaderboard,
}) => {
  const correctCount = history.filter((h) => h.isCorrect).length;
  const incorrectCount = history.filter((h) => !h.isCorrect).length;
  const accuracyPercent = Math.round((correctCount / Math.max(1, history.length)) * 100);

  // Trigger celebration on render
  useEffect(() => {
    sound.playVictory();

    // Multi-stage confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ED1B2E', '#FFFFFF', '#FFD700', '#00A3E0', '#22C55E'],
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  // Title & Award based on percentage
  let rankTitle = 'Kiện Tướng Bảo Lãnh Viện Phí Prudential 🌟';
  let rankSub = 'Đại lý đã hoàn toàn làm chủ sản phẩm, tự tin tư vấn mọi khách hàng!';
  let rankBadgeColor = 'from-amber-500 to-yellow-600 text-slate-950';

  if (accuracyPercent < 50) {
    rankTitle = 'Chiến Binh Cần Ôn Luyện Bổ Sung 📚';
    rankSub = 'Hãy rà soát lại các câu sai để tránh bẫy khi tư vấn thực tế cho khách!';
    rankBadgeColor = 'from-slate-600 to-slate-700 text-white';
  } else if (accuracyPercent < 75) {
    rankTitle = 'Chiến Binh Pru Đang Bứt Phá 🚀';
    rankSub = 'Nắm vững 70% kiến thức cốt lõi, hoàn thiện thêm các tình huống viện phí!';
    rankBadgeColor = 'from-blue-600 to-indigo-600 text-white';
  } else if (accuracyPercent < 90) {
    rankTitle = 'Chuyên Viên Tinh Anh Bảo Lãnh Viện Phí 🎖️';
    rankSub = 'Kiến thức rất vững vàng, sẵn sàng bùng nổ doanh số với thẻ sức khỏe!';
    rankBadgeColor = 'from-emerald-500 to-teal-600 text-white';
  }

  // Find winning team if in team mode
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winningTeam = sortedTeams[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Grand Hero Card */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-red-600/20 blur-3xl pointer-events-none rounded-full" />

        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-red-600 to-rose-700 shadow-xl shadow-red-950/60 ring-4 ring-red-400/20 mb-4">
          <Trophy className="w-10 h-10 text-white animate-bounce" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
          CHÚC MỪNG HOÀN THÀNH HUẤN LUYỆN!
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-6">
          Chuyên đề: Dịch Vụ Bảo Lãnh Viện Phí 24/7 & Chăm Sóc Sức Khỏe Prudential
        </p>

        {/* Rank Banner */}
        <div className="inline-block mb-8">
          <div
            className={`px-5 py-2 rounded-2xl bg-gradient-to-r font-black text-sm sm:text-lg shadow-lg ${rankBadgeColor}`}
          >
            {rankTitle}
          </div>
          <p className="text-xs text-slate-300 mt-2 italic font-medium">{rankSub}</p>
        </div>

        {/* Score Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
            <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
              Tổng điểm đạt được
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">
              {score} <span className="text-xs font-normal text-amber-400/80">điểm</span>
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              (+5đ/đúng, -1đ/sai)
            </span>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
            <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
              Độ chính xác
            </span>
            <span className="text-2xl sm:text-3xl font-black text-blue-400">
              {accuracyPercent}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {correctCount} / {Math.max(1, history.length)} câu
            </span>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
            <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
              Số câu đúng (+5đ)
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              {correctCount}
            </span>
            <span className="text-[10px] text-emerald-500/80 block mt-0.5">
              +{correctCount * 5} điểm
            </span>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/60">
            <span className="text-[11px] text-slate-400 uppercase font-bold block mb-1">
              Số câu sai (-1đ)
            </span>
            <span className="text-2xl sm:text-3xl font-black text-rose-400 flex items-center justify-center gap-1">
              <XCircle className="w-5 h-5 text-rose-400" />
              {incorrectCount}
            </span>
            <span className="text-[10px] text-rose-500/80 block mt-0.5">
              -{incorrectCount * 1} điểm
            </span>
          </div>
        </div>

        {/* Team Battle Results (if applicable) */}
        {isTeamMode && (
          <div className="mb-8 max-w-2xl mx-auto bg-slate-800/60 rounded-2xl p-5 border border-slate-700">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-white text-base">
                KẾT QUẢ ĐẤU ĐỘI LỚP HỌC
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sortedTeams.map((team, idx) => (
                <div
                  key={team.id}
                  className={`p-3 rounded-xl border text-center ${
                    idx === 0
                      ? 'bg-amber-950/40 border-amber-500/80 ring-2 ring-amber-500/30'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-400 block mb-1">
                    {idx === 0 ? '🏆 Quán Quân' : `Hạng ${idx + 1}`}
                  </span>
                  <div className="font-black text-sm text-white truncate">
                    {team.name}
                  </div>
                  <div className="text-lg font-extrabold text-amber-400 mt-1">
                    {team.score}đ
                  </div>
                </div>
              ))}
            </div>

            {winningTeam && (
              <p className="mt-4 text-xs font-semibold text-amber-300">
                🎉 Chúc mừng {winningTeam.name} đã dẫn đầu với {winningTeam.score} điểm!
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-black bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-transform active:scale-95 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-slate-950" />
            <span>Vinh Danh Trên Bảng Vàng</span>
          </button>

          <button
            onClick={onRestartQuiz}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-900/40 transition-transform active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm Lại Đợt Mới</span>
          </button>

          <button
            onClick={onOpenCheatsheet}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Cẩm Nang 5 Bước</span>
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="font-extrabold text-lg text-white mb-4 flex items-center justify-between">
          <span>Xem Lại Danh Sách Câu Hỏi & Lời Giải</span>
          <span className="text-xs text-slate-400 font-normal">
            Bấm vào câu bất kỳ để xem lại giải thích
          </span>
        </h3>

        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {questions.map((q, idx) => {
            const h = history.find((item) => item.questionId === q.id);
            const isAnswered = !!h;
            const isCorrect = h?.isCorrect ?? false;

            return (
              <div
                key={q.id}
                onClick={() => onReviewQuestion(idx)}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all hover:scale-[1.005] ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-800/40 hover:bg-emerald-950/40'
                      : 'bg-rose-950/20 border-rose-800/40 hover:bg-rose-950/40'
                    : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                      isAnswered
                        ? isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-semibold text-slate-200 line-clamp-1">
                      {q.question}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      {q.category} {q.sourceDocPage ? `• ${q.sourceDocPage}` : ''}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isAnswered ? (
                    isCorrect ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Đúng (+100đ)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-700/50 flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-rose-400" />
                        Sai (Xem mẹo)
                      </span>
                    )
                  ) : (
                    <span className="text-[10px] text-slate-500">Chưa trả lời</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
