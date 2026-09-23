import React from 'react';
import { Check, X, Filter, Shuffle, Calculator, BookOpen } from 'lucide-react';
import { Question } from '../types';

interface QuestionNavigatorProps {
  questions: Question[];
  currentIndex: number;
  history: {
    questionId: string;
    isCorrect: boolean;
  }[];
  onSelectIndex: (index: number) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onShuffleNewExam?: () => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questions,
  currentIndex,
  history,
  onSelectIndex,
  selectedCategory,
  onSelectCategory,
  onShuffleNewExam,
}) => {
  // Extract distinct categories
  const categories = ['Tất cả', ...Array.from(new Set(questions.map((q) => q.category)))];

  // Count theory & scenario questions
  const theoryCount = questions.filter((q) => q.questionType !== 'scenario').length;
  const scenarioCount = questions.filter((q) => q.questionType === 'scenario').length;

  // Map question status
  const getStatus = (qId: string) => {
    const item = history.find((h) => h.questionId === qId);
    if (!item) return 'unanswered';
    return item.isCorrect ? 'correct' : 'incorrect';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
      {/* Top Header of Navigator */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>Danh sách câu hỏi</span>
            <span className="text-slate-500 font-normal">
              ({history.length}/{questions.length} đã hoàn thành)
            </span>
          </h3>

          {/* 60% Lý thuyết & 40% Tình huống indicator */}
          <div className="flex items-center gap-1 text-[11px] font-semibold">
            <span className="bg-sky-950/60 text-sky-300 border border-sky-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-sky-400" />
              {theoryCount} Lý Thuyết (60%)
            </span>
            <span className="bg-amber-950/60 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Calculator className="w-3 h-3 text-amber-400" />
              {scenarioCount} Tình Huống / Tính Toán (40%)
            </span>
          </div>
        </div>

        {/* Shuffle New 20-Question Exam button */}
        {onShuffleNewExam && (
          <button
            onClick={onShuffleNewExam}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black shadow-md shadow-red-950/50 transition-all active:scale-95 cursor-pointer ml-auto"
            title="Trộn ngẫu nhiên bộ đề mới 20 câu: 60% Lý thuyết + 40% Tình huống, đầy đủ chủ đề"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Trộn Bộ Đề Mới (20 câu)</span>
          </button>
        )}
      </div>

      {/* Category filter bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none border-t border-slate-800/60 pt-2.5">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`text-[11px] px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of question number buttons with Section Indicators and x2 Badges */}
      <div className="space-y-2 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {questions.map((q, idx) => {
            const status = getStatus(q.id);
            const isCurrent = idx === currentIndex;
            const isCategoryMatch = selectedCategory === 'Tất cả' || q.category === selectedCategory;
            const isScenario = q.questionType === 'scenario';
            const isDouble = Boolean(q.isDoublePoints);

            let btnColor = 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700';
            let icon = null;

            if (status === 'correct') {
              btnColor = 'bg-emerald-950/80 border-emerald-600/80 text-emerald-300';
              icon = <Check className="w-3 h-3 text-emerald-400" />;
            } else if (status === 'incorrect') {
              btnColor = 'bg-rose-950/80 border-rose-600/80 text-rose-300';
              icon = <X className="w-3 h-3 text-rose-400" />;
            }

            if (isCurrent) {
              btnColor += ' ring-2 ring-red-500 font-black shadow-md';
            }

            return (
              <button
                key={q.id || idx}
                onClick={() => onSelectIndex(idx)}
                className={`relative min-w-10 h-10 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${btnColor} ${
                  !isCategoryMatch ? 'opacity-30' : ''
                } ${isDouble && !status ? 'border-amber-500/60 shadow-xs shadow-amber-500/20' : ''}`}
                title={`Câu ${idx + 1} [${isScenario ? 'Tình huống/Tính toán' : 'Lý thuyết'} - ${q.category}] ${isDouble ? '(x2 Nhân đôi điểm)' : ''} - ${q.timeLimit || 20}s: ${q.question.slice(0, 50)}...`}
              >
                <span>{idx + 1}</span>
                {icon}
                {/* x2 Double Point Badge */}
                {isDouble && (
                  <span
                    className="absolute -top-1.5 -right-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[9px] px-1 rounded-full shadow-xs leading-tight"
                    title="Câu hỏi x2 Nhân đôi điểm!"
                  >
                    x2
                  </span>
                )}
                {/* Scenario indicator dot (if not already showing x2 at top-right) */}
                {isScenario && !isDouble && (
                  <span
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 border border-slate-900"
                    title="Câu hỏi Tình huống / Tính toán"
                  />
                )}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-1 pt-1 border-t border-slate-800/40">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" /> Câu 1-12: Lý thuyết nền tảng
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Câu 13-20: Tình huống & Tính toán
            </span>
          </div>
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <span className="bg-amber-400 text-slate-950 px-1 rounded-sm text-[9px] font-black">x2</span> 4 câu nhân đôi điểm
          </span>
        </div>
      </div>
    </div>
  );
};
