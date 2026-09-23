import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  ChevronDown, 
  ChevronUp,
  Award,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { Participant } from '../types';

interface KahootStatsBarProps {
  correctAnswer: number;
  participants: Participant[];
  isDoublePoints?: boolean;
  onUpdateParticipantAnswer?: (participantId: string, optionIndex: number) => void;
}

const OPTION_THEMES = [
  { label: 'A', shape: '▲', color: 'bg-[#E21B3C]', border: 'border-[#ff4d6d]', lightBg: 'bg-red-950/40', text: 'text-red-400', name: 'Đỏ' },
  { label: 'B', shape: '◆', color: 'bg-[#1368CE]', border: 'border-[#3b82f6]', lightBg: 'bg-blue-950/40', text: 'text-blue-400', name: 'Xanh dương' },
  { label: 'C', shape: '●', color: 'bg-[#D89E00]', border: 'border-[#eab308]', lightBg: 'bg-yellow-950/40', text: 'text-yellow-400', name: 'Vàng' },
  { label: 'D', shape: '■', color: 'bg-[#26890C]', border: 'border-[#22c55e]', lightBg: 'bg-emerald-950/40', text: 'text-emerald-400', name: 'Xanh lá' },
];

export const KahootStatsBar: React.FC<KahootStatsBarProps> = ({
  correctAnswer,
  participants,
  isDoublePoints = false,
  onUpdateParticipantAnswer
}) => {
  const [filterOption, setFilterOption] = useState<number | 'all'>('all');
  const [isExpanded, setIsExpanded] = useState(true);

  // Count votes per option
  const counts = [0, 0, 0, 0];
  participants.forEach((p) => {
    if (p.lastAnswer !== undefined && p.lastAnswer.option >= 0 && p.lastAnswer.option < 4) {
      counts[p.lastAnswer.option]++;
    }
  });

  const totalVotes = participants.filter((p) => p.lastAnswer !== undefined).length;
  const maxCount = Math.max(...counts, 1);

  // Filtered participant list
  const filteredParticipants = participants.filter((p) => {
    if (filterOption === 'all') return true;
    return p.lastAnswer?.option === filterOption;
  });

  return (
    <div className="bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-5 shadow-2xl overflow-hidden animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-sm">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>Thống Kê Biểu Quyết Của Lớp (Kahoot Style)</span>
              {isDoublePoints && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase animate-pulse">
                  x2 Điểm
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              Tổng số đại lý đã tham gia bình chọn: <strong className="text-white">{totalVotes}</strong> / {participants.length} đại lý
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
        >
          <span>{isExpanded ? 'Thu gọn danh sách' : 'Xem chi tiết ai chọn câu nào'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* 4 Kahoot-style Animated Vertical/Horizontal Bars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 my-5">
        {OPTION_THEMES.map((theme, idx) => {
          const count = counts[idx];
          const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const isCorrect = idx === correctAnswer;
          const heightPercent = Math.max(15, Math.round((count / maxCount) * 100));

          return (
            <div
              key={idx}
              onClick={() => setFilterOption(filterOption === idx ? 'all' : idx)}
              className={`rounded-2xl p-3.5 border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                filterOption === idx
                  ? 'ring-2 ring-white scale-[1.02] shadow-xl'
                  : 'hover:scale-[1.01]'
              } ${
                isCorrect
                  ? 'border-emerald-500 bg-emerald-950/30'
                  : 'border-slate-800 bg-slate-900/80'
              }`}
            >
              {/* Correct answer indicator crown */}
              {isCorrect && (
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black shadow-sm">
                  <CheckCircle2 className="w-3 h-3" />
                  ĐÚNG
                </div>
              )}

              {/* Option Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-8 h-8 rounded-xl ${theme.color} text-white flex items-center justify-center font-black text-sm shadow-md`}>
                  {theme.shape}
                </span>
                <div>
                  <span className="text-xs font-black text-white">Đáp án {theme.label}</span>
                  <span className="text-[10px] text-slate-400 block">{pct}% ({count} người)</span>
                </div>
              </div>

              {/* Visual Height Bar */}
              <div className="w-full bg-slate-800 rounded-xl h-24 flex items-end p-1.5 overflow-hidden">
                <div
                  className={`w-full ${theme.color} rounded-lg transition-all duration-700 flex items-center justify-center font-black text-white text-xs shadow-inner`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {count > 0 && <span>{count}</span>}
                </div>
              </div>

              {/* Filter helper */}
              <div className="mt-2 text-center text-[11px] font-bold text-slate-400">
                {filterOption === idx ? 'Đang lọc xem 👆' : 'Bấm để lọc người chọn'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Participant Breakdown: "Ai trả lời những câu nào" */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-800 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              Chi tiết từng đại lý đã chọn đáp án nào:
            </span>

            {/* Quick Filter Pill Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterOption('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                  filterOption === 'all'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Tất cả ({participants.length})
              </button>
              {OPTION_THEMES.map((theme, idx) => (
                <button
                  key={idx}
                  onClick={() => setFilterOption(idx)}
                  className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors ${
                    filterOption === idx
                      ? `${theme.color} text-white`
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{theme.shape} {theme.label}</span>
                  <span className="text-[10px] opacity-80">({counts[idx]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Participant Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {filteredParticipants.map((p) => {
              const answer = p.lastAnswer;
              const hasAnswered = answer !== undefined;
              const isAnsCorrect = hasAnswered && answer.isCorrect;
              const optIndex = answer?.option ?? -1;
              const theme = optIndex >= 0 ? OPTION_THEMES[optIndex] : null;

              return (
                <div
                  key={p.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                    hasAnswered
                      ? isAnsCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100'
                        : 'bg-rose-950/30 border-rose-500/50 text-rose-100'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl shrink-0">{p.avatar}</span>
                    <div className="truncate">
                      <div className="font-extrabold text-xs sm:text-sm text-white truncate flex items-center gap-1">
                        <span>{p.name}</span>
                        {p.streak >= 2 && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-500 text-slate-950 flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 fill-slate-950" /> {p.streak}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {p.unit} • Điểm: <strong className="text-amber-400">{p.score}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Choice Badge */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    {hasAnswered && theme ? (
                      <div className="flex items-center gap-1.5">
                        <span className={`w-6 h-6 rounded-lg ${theme.color} text-white flex items-center justify-center font-black text-xs shadow-xs`}>
                          {theme.shape}
                        </span>
                        <div className="text-right">
                          <span className="text-xs font-black block">
                            {isAnsCorrect ? `+${answer.points}đ` : `${answer.points}đ`}
                          </span>
                          <span className="text-[9px] block opacity-80">
                            {isAnsCorrect ? 'ĐÚNG' : 'SAI'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-500 italic">Chưa chọn</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
