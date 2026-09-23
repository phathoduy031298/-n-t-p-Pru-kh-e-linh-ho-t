import React from 'react';
import { Play, Pause, RotateCcw, Clock, Plus, Zap, Settings2 } from 'lucide-react';

interface TimerBarProps {
  timeLeft: number;
  maxTime: number;
  isRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onAddTime: (seconds: number) => void;
  onSelectTimeLimit: (seconds: number) => void;
  isDisabled: boolean;
  onSetDisabled: (disabled: boolean) => void;
}

const TIME_PRESETS = [10, 15, 20, 30, 45, 60];

export const TimerBar: React.FC<TimerBarProps> = ({
  timeLeft,
  maxTime,
  isRunning,
  onToggleTimer,
  onResetTimer,
  onAddTime,
  onSelectTimeLimit,
  isDisabled,
  onSetDisabled,
}) => {
  const percentage = Math.max(0, Math.min(100, (timeLeft / (maxTime || 20)) * 100));

  // Determine color based on time urgency
  let barColor = 'bg-emerald-500';
  let textColor = 'text-emerald-400';
  if (timeLeft <= 5) {
    barColor = 'bg-red-600 animate-pulse';
    textColor = 'text-red-400 font-extrabold animate-bounce';
  } else if (timeLeft <= 10) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-400 font-bold';
  }

  return (
    <div className="bg-slate-900/90 border-2 border-slate-800 rounded-2xl p-3 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
      {/* Left: Clock & Countdown */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className={`p-1.5 rounded-xl ${timeLeft <= 5 ? 'bg-red-600/20 text-red-400' : 'bg-slate-800 text-amber-400'}`}>
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span>Thời gian trả lời:</span>
            {!isDisabled && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 font-mono font-bold">
                Cài đặt: {maxTime}s
              </span>
            )}
          </div>
          {!isDisabled ? (
            <div className="flex items-baseline gap-1">
              <span className={`text-xl sm:text-2xl font-mono font-black ${textColor}`}>
                {timeLeft}s
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">
                (Hết giờ sẽ tự động hiện đáp án)
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-400 italic">Thảo luận tự do (Đã tắt đếm giờ)</span>
          )}
        </div>
      </div>

      {/* Center: Dynamic progress bar */}
      {!isDisabled && (
        <div className="flex-1 min-w-[120px] max-w-sm h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5 shadow-inner hidden md:block">
          <div
            className={`h-full transition-all duration-300 ease-linear rounded-full ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}

      {/* Right: Time limit preset buttons + play/pause controls */}
      <div className="flex flex-wrap items-center gap-1.5 ml-auto">
        {/* Preset Selector */}
        <div className="flex items-center bg-slate-950/70 p-1 rounded-xl border border-slate-800 gap-0.5">
          <span className="text-[10px] font-bold text-slate-400 px-1.5 hidden sm:inline">
            Đổi thời gian:
          </span>
          {TIME_PRESETS.map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => onSelectTimeLimit(sec)}
              className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                maxTime === sec && !isDisabled
                  ? 'bg-red-600 text-white shadow-md shadow-red-950 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={`Đặt thời gian trả lời là ${sec} giây`}
            >
              {sec}s
            </button>
          ))}
        </div>

        {/* Play/Pause & Reset */}
        {!isDisabled && (
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleTimer}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title={isRunning ? 'Tạm dừng đồng hồ' : 'Chạy tiếp đồng hồ'}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
            <button
              onClick={onResetTimer}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Đặt lại thời gian"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onAddTime(10)}
              className="flex items-center gap-0.5 px-2 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              title="Cộng thêm 10 giây cho TVV"
            >
              <Plus className="w-3 h-3" />
              10s
            </button>
          </div>
        )}

        {/* Toggle on/off timer */}
        <button
          onClick={() => onSetDisabled(!isDisabled)}
          className={`text-[11px] px-2.5 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer ${
            isDisabled
              ? 'bg-red-950/60 border-red-700/60 text-red-300 hover:bg-red-900/60'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          {isDisabled ? 'Bật đếm giờ' : 'Tắt'}
        </button>
      </div>
    </div>
  );
};
