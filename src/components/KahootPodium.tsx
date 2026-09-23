import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Flame, 
  RotateCcw, 
  BookOpen, 
  Sparkles,
  Users,
  Award,
  ChevronRight
} from 'lucide-react';
import { Participant, Question } from '../types';
import { sound } from '../utils/audio';

interface KahootPodiumProps {
  participants: Participant[];
  totalQuestions: number;
  onRestartQuiz: () => void;
  onReviewQuestion: (index: number) => void;
  onOpenCheatsheet: () => void;
  questions: Question[];
}

export const KahootPodium: React.FC<KahootPodiumProps> = ({
  participants,
  totalQuestions,
  onRestartQuiz,
  onReviewQuestion,
  onOpenCheatsheet,
  questions
}) => {
  // Sort participants by score descending
  const sorted = [...participants].sort((a, b) => b.score - a.score);
  const first = sorted[0];
  const second = sorted[1];
  const third = sorted[2];
  const runnersUp = sorted.slice(3);

  // Staged reveal: 3rd place -> 2nd place -> 1st place
  const [revealedRank, setRevealedRank] = useState<number>(0);

  useEffect(() => {
    // Step 1: Reveal 3rd place after 600ms
    const t1 = setTimeout(() => {
      setRevealedRank(3);
      sound.playPodiumReveal(3);
    }, 700);

    // Step 2: Reveal 2nd place after 1800ms
    const t2 = setTimeout(() => {
      setRevealedRank(2);
      sound.playPodiumReveal(2);
    }, 2000);

    // Step 3: Reveal 1st place after 3300ms + Victory Fanfare + Confetti explosion
    const t3 = setTimeout(() => {
      setRevealedRank(1);
      sound.playPodiumReveal(1);

      // Grand confetti storm
      const duration = 4 * 1000;
      const end = Date.now() + duration;
      const interval: any = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          particleCount: 60,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#ED1B2E', '#1368CE', '#26890C', '#FFFFFF'],
        });
      }, 300);
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Top Banner */}
      <div className="text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          BẢNG VÀNG VINH DANH KAHOOT PODIUM
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          TOP 3 CHIẾN BINH TINH ANH PRUDENTIAL
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Chúc mừng các đại lý xuất sắc nhất đã làm chủ trọn vẹn kiến thức Sản phẩm Bảo Lãnh Viện Phí PRUKhỏe Linh Hoạt!
        </p>
      </div>

      {/* 3D Kahoot-style Podium */}
      <div className="bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow behind podium */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-3 gap-2 sm:gap-6 items-end max-w-2xl mx-auto pt-16 sm:pt-24 min-h-[360px] sm:min-h-[420px]">
          {/* RANK 2: SILVER (Left) */}
          <div className="flex flex-col items-center transition-all duration-700">
            {revealedRank <= 2 && second && (
              <div className="flex flex-col items-center mb-3 animate-in zoom-in-50 duration-500">
                <div className="relative mb-2">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-2xl sm:text-4xl shadow-xl ring-4 ring-slate-400/50">
                    {second.avatar}
                  </div>
                  <span className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full bg-slate-300 text-slate-900 font-black text-xs flex items-center justify-center shadow-md">
                    2
                  </span>
                </div>
                <h4 className="font-black text-xs sm:text-base text-slate-200 text-center truncate max-w-[100px] sm:max-w-[140px]">
                  {second.name}
                </h4>
                <span className="text-[10px] text-slate-400 truncate max-w-[100px]">
                  {second.unit}
                </span>
                <span className="text-sm sm:text-lg font-black text-slate-300 mt-1">
                  {second.score}đ
                </span>
              </div>
            )}

            {/* Podium Base 2 */}
            <div className="w-full bg-gradient-to-t from-slate-700 to-slate-600 rounded-t-2xl sm:rounded-t-3xl h-36 sm:h-48 flex flex-col items-center justify-center p-2 shadow-2xl border-t-2 border-slate-400">
              <span className="text-3xl sm:text-5xl font-black text-slate-300/80">2</span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 mt-1">
                Á Quân
              </span>
            </div>
          </div>

          {/* RANK 1: GOLD (Center - Highest) */}
          <div className="flex flex-col items-center transition-all duration-700">
            {revealedRank === 1 && first && (
              <div className="flex flex-col items-center mb-3 animate-in zoom-in-50 duration-700">
                <div className="relative mb-2 animate-bounce">
                  <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 absolute -top-8 left-1/2 -translate-x-1/2 filter drop-shadow-md" />
                  <div className="w-18 h-18 sm:w-26 sm:h-26 rounded-3xl bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 flex items-center justify-center text-3xl sm:text-5xl shadow-2xl ring-4 ring-amber-400/80">
                    {first.avatar}
                  </div>
                  <span className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg">
                    1
                  </span>
                </div>
                <h4 className="font-black text-sm sm:text-xl text-amber-300 text-center truncate max-w-[120px] sm:max-w-[180px]">
                  {first.name}
                </h4>
                <span className="text-[10px] sm:text-xs text-amber-200/80 truncate max-w-[120px]">
                  {first.unit}
                </span>
                <span className="text-lg sm:text-2xl font-black text-amber-400 mt-1 flex items-center gap-1">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  {first.score}đ
                </span>
              </div>
            )}

            {/* Podium Base 1 */}
            <div className="w-full bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500 rounded-t-2xl sm:rounded-t-3xl h-52 sm:h-64 flex flex-col items-center justify-center p-2 shadow-2xl border-t-2 border-amber-300">
              <span className="text-4xl sm:text-7xl font-black text-slate-950/80">1</span>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-950 mt-1">
                QUÁN QUÂN
              </span>
            </div>
          </div>

          {/* RANK 3: BRONZE (Right) */}
          <div className="flex flex-col items-center transition-all duration-700">
            {revealedRank <= 3 && third && (
              <div className="flex flex-col items-center mb-3 animate-in zoom-in-50 duration-500">
                <div className="relative mb-2">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-2xl sm:text-4xl shadow-xl ring-4 ring-amber-700/50">
                    {third.avatar}
                  </div>
                  <span className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                    3
                  </span>
                </div>
                <h4 className="font-black text-xs sm:text-base text-amber-200 text-center truncate max-w-[100px] sm:max-w-[140px]">
                  {third.name}
                </h4>
                <span className="text-[10px] text-slate-400 truncate max-w-[100px]">
                  {third.unit}
                </span>
                <span className="text-sm sm:text-lg font-black text-amber-300 mt-1">
                  {third.score}đ
                </span>
              </div>
            )}

            {/* Podium Base 3 */}
            <div className="w-full bg-gradient-to-t from-amber-950 to-amber-800 rounded-t-2xl sm:rounded-t-3xl h-28 sm:h-36 flex flex-col items-center justify-center p-2 shadow-2xl border-t-2 border-amber-600">
              <span className="text-3xl sm:text-5xl font-black text-amber-500/80">3</span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-300 mt-1">
                Hạng 3
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-6 border-t border-slate-800">
          <button
            onClick={onRestartQuiz}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-xl shadow-red-950/50 transition-transform active:scale-95 cursor-pointer text-sm sm:text-base"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Chơi Lại Trận Mới</span>
          </button>

          <button
            onClick={onOpenCheatsheet}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer text-sm sm:text-base"
          >
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span>Xem Cẩm Nang 5 Bước</span>
          </button>
        </div>
      </div>

      {/* Roster & Runners-up (Hạng 4 trở đi) */}
      {runnersUp.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Bảng Xếp Hạng Toàn Đoàn (Hạng 4 trở đi)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {runnersUp.map((p, idx) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-700 text-slate-300 font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 4}
                  </span>
                  <span className="text-2xl">{p.avatar}</span>
                  <div className="truncate">
                    <h5 className="font-black text-sm text-white truncate">{p.name}</h5>
                    <span className="text-[11px] text-slate-400">{p.unit}</span>
                  </div>
                </div>

                <span className="text-sm font-black text-amber-400 shrink-0">
                  {p.score}đ
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
