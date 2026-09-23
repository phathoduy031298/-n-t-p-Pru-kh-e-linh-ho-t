import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  BookMarked,
  Lightbulb,
  ShieldAlert,
  GraduationCap,
  Award,
  Flame,
  Check,
  X,
  FileText,
  Zap,
  Users
} from 'lucide-react';
import { Question, Participant } from '../types';
import { KahootStatsBar } from './KahootStatsBar';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: number | null;
  isAnswerSubmitted: boolean;
  onSelectOption: (index: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  currentScore?: number;
  participants?: Participant[];
}

const KAHOOT_OPTIONS = [
  { label: 'A', shape: '▲', color: 'bg-[#E21B3C]', hoverBg: 'hover:bg-[#ff2d55]', border: 'border-[#ff4d6d]', glow: 'shadow-red-900/50' },
  { label: 'B', shape: '◆', color: 'bg-[#1368CE]', hoverBg: 'hover:bg-[#1f7ae6]', border: 'border-[#3b82f6]', glow: 'shadow-blue-900/50' },
  { label: 'C', shape: '●', color: 'bg-[#D89E00]', hoverBg: 'hover:bg-[#f5b300]', border: 'border-[#eab308]', glow: 'shadow-yellow-900/50' },
  { label: 'D', shape: '■', color: 'bg-[#26890C]', hoverBg: 'hover:bg-[#32ad13]', border: 'border-[#22c55e]', glow: 'shadow-emerald-900/50' },
];

const ENCOURAGING_CORRECT_QUOTES = [
  '🎉 Xuất sắc! Bạn thể hiện sự am hiểu sản phẩm vững vàng như một Chuyên gia MDRT!',
  '⭐ Quá chuẩn xác! Khách hàng sẽ hoàn toàn an tâm khi được bạn đồng hành và tư vấn!',
  '🔥 Đỉnh cao chuyên nghiệp! Nắm chắc quy tắc bảo lãnh là chìa khóa bứt phá danh hiệu PruStar!',
  '💎 Tuyệt vời! Bạn đang làm chủ trọn vẹn quy tắc bảo lãnh viện phí của Prudential!',
  '🚀 Chính xác 100%! Tự tin chốt giải pháp PRUKhỏe Linh Hoạt và hỗ trợ khách hàng tại viện!'
];

const GENTLE_WRONG_QUOTES = [
  '🌱 Đừng lo lắng! Rèn luyện hôm nay giúp bạn luôn tự tin và sắc bén trước mọi tình huống thực tế.',
  '💡 Hãy bình tĩnh ghi nhớ bẫy thường gặp này nhé! Lời khuyên bên dưới sẽ giúp bạn nhớ lâu hơn.',
  '🎯 Mỗi lần thử thách là một cơ hội vàng để đại lý khắc sâu kiến thức sản phẩm vào tiềm thức.',
  '💪 Không sao cả! Chuyên gia Prudential tin bạn sẽ nắm vững ngay sau khi đọc giải thích chi tiết.'
];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  isAnswerSubmitted,
  onSelectOption,
  onNextQuestion,
  isLastQuestion,
  currentScore,
  participants = [],
}) => {
  const isCorrect = isAnswerSubmitted && selectedOption === question.correctAnswer;
  const isDoublePoints = Boolean(question.isDoublePoints);

  // Pick stable random quote for current question
  const quoteIndex = (currentIndex + (question.id ? question.id.charCodeAt(0) : 0)) % ENCOURAGING_CORRECT_QUOTES.length;
  const correctQuote = ENCOURAGING_CORRECT_QUOTES[quoteIndex];
  const wrongQuote = GENTLE_WRONG_QUOTES[quoteIndex % GENTLE_WRONG_QUOTES.length];

  // Keyboard shortcut listener (1, 2, 3, 4 or A, B, C, D, and Space/Enter for Next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (!isAnswerSubmitted) {
        if (e.key === '1' || e.key.toUpperCase() === 'A') onSelectOption(0);
        if (e.key === '2' || e.key.toUpperCase() === 'B') onSelectOption(1);
        if (e.key === '3' || e.key.toUpperCase() === 'C') onSelectOption(2);
        if (e.key === '4' || e.key.toUpperCase() === 'D') onSelectOption(3);
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswerSubmitted, onSelectOption, onNextQuestion]);

  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden transition-all">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Random Double Points Alert (Kahoot Style) */}
      {isDoublePoints && (
        <div className="mb-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-slate-950 px-4 py-2 rounded-2xl flex items-center justify-between shadow-lg shadow-amber-500/20 animate-pulse">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-wider">
            <Flame className="w-5 h-5 fill-slate-950" />
            <span>⭐ CÂU HỎI NHÂN ĐÔI ĐIỂM (x2 DOUBLE POINTS)! ⭐</span>
          </div>
          <span className="text-[11px] font-extrabold bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded-full">
            Đúng +10đ • Sai -1đ
          </span>
        </div>
      )}

      {/* Header bar of Question */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600/20 text-red-400 border border-red-500/30 flex items-center gap-1.5 shadow-xs">
            <GraduationCap className="w-3.5 h-3.5" />
            CÂU {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {question.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {participants.length > 0 && (
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-950/60 text-blue-300 border border-blue-800/60 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {participants.filter((p) => p.lastAnswer?.option !== undefined).length}/{participants.length} Đại lý đã chọn
              </span>
            </span>
          )}

          {question.sourceDocPage && (
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
              <BookMarked className="w-3.5 h-3.5 text-red-400" />
              {question.sourceDocPage}
            </span>
          )}

          {currentScore !== undefined && (
            <span className="px-3 py-1 rounded-xl text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              {currentScore} Điểm
            </span>
          )}
        </div>
      </div>

      {/* Scenario / Case Study Context (if applicable) */}
      {question.scenario && (
        <div className="mb-4 bg-slate-800/60 border-l-4 border-amber-500 rounded-r-xl px-4 py-2.5 text-xs sm:text-sm text-slate-300">
          <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-0.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Tình huống thực tế tại viện:
          </span>
          {question.scenario}
        </div>
      )}

      {/* Main Question Heading - Big & High-Contrast for Projector */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight mb-6">
        {question.question}
      </h2>

      {/* Instruction for Trainer / Class */}
      {!isAnswerSubmitted && (
        <div className="mb-4 text-xs text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="text-emerald-400 font-bold">
              {isDoublePoints ? '+10 điểm (x2)' : '+5 điểm'}
            </span> nếu chọn Đúng •{' '}
            <span className="text-rose-400 font-bold">-1 điểm</span> nếu chọn Chưa đúng
          </span>
          <span className="hidden sm:inline text-slate-500">Phím tắt: 1 (▲), 2 (◆), 3 (●), 4 (■)</span>
        </div>
      )}

      {/* 4 Choices Grid - Iconic Kahoot Shapes & Vivid Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
        {question.options.map((optionText, index) => {
          const isSelected = selectedOption === index;
          const isTargetCorrect = index === question.correctAnswer;
          const kahoot = KAHOOT_OPTIONS[index];

          let cardClasses = `${kahoot.color} text-white shadow-lg border-2 border-white/20`;
          let icon = null;

          if (isAnswerSubmitted) {
            if (isTargetCorrect) {
              cardClasses = `${kahoot.color} text-white border-4 border-white shadow-2xl ring-4 ring-emerald-500/50 scale-[1.01]`;
              icon = <CheckCircle2 className="w-6 h-6 text-white shrink-0 drop-shadow-md" />;
            } else if (isSelected && !isTargetCorrect) {
              cardClasses = 'bg-slate-900 border-2 border-rose-500 text-rose-300 opacity-90';
              icon = <XCircle className="w-6 h-6 text-rose-400 shrink-0" />;
            } else {
              cardClasses = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-40';
            }
          } else {
            cardClasses += ` ${kahoot.hoverBg} cursor-pointer active:scale-[0.98] transition-transform`;
          }

          return (
            <button
              key={index}
              onClick={() => {
                if (!isAnswerSubmitted) {
                  onSelectOption(index);
                }
              }}
              disabled={isAnswerSubmitted}
              className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 flex items-start gap-4 select-none ${cardClasses}`}
            >
              {/* Kahoot Shape Badge (▲, ◆, ●, ■) */}
              <span className="w-10 h-10 rounded-xl bg-black/25 flex items-center justify-center font-black text-xl shrink-0 shadow-inner text-white">
                {kahoot.shape}
              </span>

              <div className="flex-1">
                <span className="text-xs font-black uppercase tracking-wider block opacity-90 mb-0.5">
                  Đáp án {kahoot.label}
                </span>
                <span className="text-sm sm:text-base font-bold leading-snug block">
                  {optionText}
                </span>
              </div>

              {icon}
            </button>
          );
        })}
      </div>

      {/* Immediate Detailed Feedback Section (Once answered) */}
      {isAnswerSubmitted && (
        <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
          {/* Result Banner & Encouraging Quote */}
          <div
            className={`rounded-2xl p-5 border transition-all duration-300 ${
              isCorrect
                ? 'bg-gradient-to-br from-emerald-950/60 via-slate-900 to-emerald-950/40 border-emerald-500/50 shadow-xl'
                : 'bg-gradient-to-br from-rose-950/60 via-slate-900 to-rose-950/40 border-rose-500/50 shadow-xl'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/60 shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-emerald-400">
                          CHÍNH XÁC! XUẤT SẮC ĐẠI LÝ PRU!
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {isDoublePoints ? '+10 ĐIỂM (x2)' : '+5 ĐIỂM'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-200 font-medium mt-0.5">
                        {correctQuote}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-900/60 shrink-0">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-black text-rose-400">
                          CHƯA CHÍNH XÁC! HÃY GHI NHỚ NGAY!
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          -1 ĐIỂM
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-rose-200 font-medium mt-0.5">
                        {wrongQuote}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Advance Button */}
              <button
                onClick={onNextQuestion}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-900/50 transition-transform active:scale-95 cursor-pointer ml-auto"
              >
                <span>{isLastQuestion ? 'Xem Bảng Vàng Podium' : 'Câu Tiếp Theo'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Detailed Option Breakdown (A, B, C, D) */}
            {question.optionExplanations && (
              <div className="mt-4 bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    Phân tích chi tiết từng phương án (A, B, C, D):
                  </span>
                  <span className="text-[11px] text-slate-500">Chuẩn tài liệu PRUKhỏe Linh Hoạt</span>
                </div>

                <div className="space-y-2">
                  {question.optionExplanations.map((optExpl, idx) => {
                    const isThisCorrect = idx === question.correctAnswer;
                    const isThisSelected = idx === selectedOption;
                    const optTheme = KAHOOT_OPTIONS[idx];

                    let rowBorder = 'border-slate-800 bg-slate-800/30';
                    let badge = `${optTheme.color} text-white font-black`;

                    if (isThisCorrect) {
                      rowBorder = 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200';
                    } else if (isThisSelected && !isThisCorrect) {
                      rowBorder = 'border-rose-500/50 bg-rose-950/40 text-rose-200';
                    }

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${rowBorder}`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${badge}`}>
                          {optTheme.shape}
                        </span>
                        <p className="flex-1 leading-relaxed">
                          {optExpl}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Core Explanation & Golden Memory Tip */}
            <div className="mt-4 space-y-3.5 text-sm">
              <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Tổng hợp kiến thức từ Chuyên gia Huấn luyện Prudential:
                </div>
                <p className="text-slate-200 leading-relaxed font-normal">
                  {question.explanation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-blue-950/40 rounded-xl p-3.5 border border-blue-800/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                    <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
                    Mẹo tư vấn thực chiến & Quyền lợi vượt trội:
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                    {question.extraKnowledge}
                  </p>
                </div>

                <div className="bg-amber-950/40 rounded-xl p-3.5 border border-amber-800/40">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    Khẩu quyết / Lời khuyên để nhớ lâu hơn:
                  </div>
                  <p className="text-xs sm:text-sm text-amber-100/90 font-semibold leading-relaxed">
                    {question.memoryTip}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kahoot Answer Distribution & "Ai đã chọn câu nào" Breakdown */}
          <KahootStatsBar
            correctAnswer={question.correctAnswer}
            participants={participants}
            isDoublePoints={isDoublePoints}
          />
        </div>
      )}
    </div>
  );
};
