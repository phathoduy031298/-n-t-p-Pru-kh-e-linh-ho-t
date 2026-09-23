import React from 'react';
import { Trophy, Flame, Plus, Minus } from 'lucide-react';
import { Team } from '../types';

interface TeamScoreboardProps {
  teams: Team[];
  activeTeamId: string;
  onSelectActiveTeam: (teamId: string) => void;
  onAdjustScore: (teamId: string, delta: number) => void;
}

export const TeamScoreboard: React.FC<TeamScoreboardProps> = ({
  teams,
  activeTeamId,
  onSelectActiveTeam,
  onAdjustScore,
}) => {
  // Find highest score to mark leader
  const maxScore = Math.max(...teams.map((t) => t.score));

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-lg">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Bảng Đấu Trí Đồng Đội (Lớp Học)
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          * Chọn đội để ghi điểm khi đại lý trả lời
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {teams.map((team) => {
          const isActive = team.id === activeTeamId;
          const isLeader = team.score > 0 && team.score === maxScore;

          return (
            <div
              key={team.id}
              onClick={() => onSelectActiveTeam(team.id)}
              className={`relative cursor-pointer rounded-xl p-3 border transition-all duration-200 select-none ${
                isActive
                  ? 'bg-slate-800 ring-2 ring-red-500 border-red-500/80 shadow-md shadow-red-950/30'
                  : 'bg-slate-800/50 hover:bg-slate-800/80 border-slate-700/60'
              }`}
            >
              {isLeader && (
                <div className="absolute -top-2 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                  👑 Top 1
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: team.color }}
                  />
                  <h4 className="font-bold text-xs sm:text-sm text-slate-200 truncate">
                    {team.name}
                  </h4>
                </div>
                {team.streak > 1 && (
                  <span className="flex items-center text-[10px] font-bold text-orange-400 gap-0.5">
                    <Flame className="w-3 h-3 fill-orange-400" />
                    x{team.streak}
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {team.score}
                  <span className="text-xs font-normal text-slate-400 ml-1">đ</span>
                </span>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onAdjustScore(team.id, -50)}
                    className="p-1 rounded bg-slate-700/60 hover:bg-rose-900/60 text-slate-400 hover:text-rose-200 transition-colors"
                    title="Trừ 50 điểm"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onAdjustScore(team.id, 50)}
                    className="p-1 rounded bg-slate-700/60 hover:bg-emerald-900/60 text-slate-400 hover:text-emerald-200 transition-colors"
                    title="Cộng 50 điểm"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {isActive && (
                <div className="mt-1.5 pt-1.5 border-t border-slate-700/60 text-[10px] text-red-400 font-semibold flex items-center justify-between">
                  <span>● Đang chọn</span>
                  <span>+100đ khi đúng</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
