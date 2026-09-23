import React from 'react';
import { Check, X, Filter } from 'lucide-react';
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
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questions,
  currentIndex,
  history,
  onSelectIndex,
  selectedCategory,
  onSelectCategory,
}) => {
  // Extract distinct categories
  const categories = ['Tất cả', ...Array.from(new Set(questions.map((q) => q.category)))];

  // Map question status
  const getStatus = (qId: string) => {
    const item = history.find((h) => h.questionId === qId);
    if (!item) return 'unanswered';
    return item.isCorrect ? 'correct' : 'incorrect';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <span>Danh sách câu hỏi</span>
          <span className="text-slate-500 font-normal">
            ({history.length}/{questions.length} đã trả lời)
          </span>
        </h3>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of question number buttons */}
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => {
          const status = getStatus(q.id);
          const isCurrent = idx === currentIndex;
          const isCategoryMatch = selectedCategory === 'Tất cả' || q.category === selectedCategory;

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
              key={q.id}
              onClick={() => onSelectIndex(idx)}
              className={`min-w-10 h-10 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${btnColor} ${
                !isCategoryMatch ? 'opacity-30' : ''
              }`}
              title={`Câu ${idx + 1}: ${q.question.slice(0, 50)}...`}
            >
              <span>{idx + 1}</span>
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};
