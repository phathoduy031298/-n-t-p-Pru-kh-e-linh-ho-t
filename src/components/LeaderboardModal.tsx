import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  X, 
  Medal, 
  Award, 
  UserCheck, 
  Trash2, 
  PlusCircle, 
  Calendar, 
  Sparkles,
  Search,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScore?: number;
  correctCount?: number;
  wrongCount?: number;
  totalQuestions?: number;
  onSavedNewScore?: () => void;
}

const LOCAL_STORAGE_KEY = 'pru_khoe_leaderboard_v1';

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    agentName: 'Nguyễn Thị Thu Trang',
    agentUnit: 'GA Thăng Long 1 - Hà Nội',
    agentTitle: 'MDRT 2026',
    score: 95,
    correctCount: 19,
    wrongCount: 1,
    totalQuestions: 20,
    accuracy: 95,
    timestamp: Date.now() - 1000 * 60 * 60 * 3,
  },
  {
    id: 'lb-2',
    agentName: 'Trần Văn Minh',
    agentUnit: 'GA Sài Gòn Star - TP.HCM',
    agentTitle: 'PruStar Diamond',
    score: 90,
    correctCount: 18,
    wrongCount: 2,
    totalQuestions: 20,
    accuracy: 90,
    timestamp: Date.now() - 1000 * 60 * 60 * 8,
  },
  {
    id: 'lb-3',
    agentName: 'Lê Hoàng Yến',
    agentUnit: 'GA Sông Hàn - Đà Nẵng',
    agentTitle: 'Tư Vấn Viên Tinh Anh',
    score: 84,
    correctCount: 17,
    wrongCount: 3,
    totalQuestions: 20,
    accuracy: 85,
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: 'lb-4',
    agentName: 'Phạm Đức Dũng',
    agentUnit: 'GA Cần Thơ VIP',
    agentTitle: 'Trưởng Ban Kinh Doanh',
    score: 78,
    correctCount: 16,
    wrongCount: 4,
    totalQuestions: 20,
    accuracy: 80,
    timestamp: Date.now() - 1000 * 60 * 60 * 36,
  },
  {
    id: 'lb-5',
    agentName: 'Đặng Mai Phương',
    agentUnit: 'GA Hải Phòng Central',
    agentTitle: 'FC Chuyên Nghiệp',
    score: 72,
    correctCount: 15,
    wrongCount: 5,
    totalQuestions: 20,
    accuracy: 75,
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
  },
];

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentScore,
  correctCount = 0,
  wrongCount = 0,
  totalQuestions = 20,
  onSavedNewScore,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentUnit, setNewAgentUnit] = useState('GA Sài Gòn');
  const [newAgentTitle, setNewAgentTitle] = useState('MDRT');
  const [isSaved, setIsSaved] = useState(false);

  // Load from localStorage or initialize
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setEntries(JSON.parse(stored));
      } else {
        setEntries(INITIAL_LEADERBOARD);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_LEADERBOARD));
      }
    } catch {
      setEntries(INITIAL_LEADERBOARD);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    const finalScore = currentScore !== undefined ? currentScore : 0;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const newEntry: LeaderboardEntry = {
      id: 'lb-' + Date.now(),
      agentName: newAgentName.trim(),
      agentUnit: newAgentUnit.trim() || 'Prudential Việt Nam',
      agentTitle: newAgentTitle,
      score: finalScore,
      correctCount,
      wrongCount,
      totalQuestions,
      accuracy,
      timestamp: Date.now(),
    };

    const updated = [...entries, newEntry].sort((a, b) => b.score - a.score);
    setEntries(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // LocalStorage error fallback
    }

    setIsSaved(true);
    if (onSavedNewScore) onSavedNewScore();
  };

  const handleResetLeaderboard = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại bảng xếp hạng về danh sách mặc định?')) {
      setEntries(INITIAL_LEADERBOARD);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_LEADERBOARD));
    }
  };

  const filteredEntries = entries.filter(
    (e) =>
      e.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.agentUnit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.agentTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-red-950/70 via-slate-900 to-amber-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/10">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Bảng Vàng Đại Lý Xuất Sắc
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  PruQuest Hall of Fame
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Quy tắc tính điểm: +5 điểm cho câu Đúng • -1 điểm cho câu Chưa Đúng
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* If currentScore is available and not yet saved, show Registration Card */}
          {currentScore !== undefined && !isSaved && (
            <div className="bg-gradient-to-r from-red-900/40 via-slate-800/80 to-amber-900/40 border border-red-500/40 rounded-2xl p-4 sm:p-5 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="font-black text-white text-base">
                    Ghi Danh Điểm Số Lượt Chơi Của Bạn
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black text-base">
                    {currentScore} Điểm
                  </span>
                  <span className="text-xs text-slate-300">
                    ({correctCount} đúng / {wrongCount} sai)
                  </span>
                </div>
              </div>

              <form onSubmit={handleSaveScore} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Họ & Tên Đại Lý *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn An"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Văn Phòng / Ban GA
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: GA Sài Gòn Central"
                    value={newAgentUnit}
                    onChange={(e) => setNewAgentUnit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                    Danh Hiệu / Vị Trí
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={newAgentTitle}
                      onChange={(e) => setNewAgentTitle(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-red-500"
                    >
                      <option value="MDRT">MDRT</option>
                      <option value="COT / TOT">COT / TOT</option>
                      <option value="PruStar">PruStar</option>
                      <option value="FC Chuyên Nghiệp">FC Chuyên Nghiệp</option>
                      <option value="Trưởng Ban / BM">Trưởng Ban / BM</option>
                      <option value="Giảng Viên / Trainer">Giảng Viên / Trainer</option>
                    </select>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      Lưu Điểm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {isSaved && (
            <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-2xl p-3.5 text-center text-sm text-emerald-200 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Điểm số của bạn đã được vinh danh thành công trên Bảng Vàng Prudential!</span>
            </div>
          )}

          {/* Search bar & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm đại lý hoặc văn phòng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:border-slate-500"
              />
            </div>

            <button
              onClick={handleResetLeaderboard}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Đặt lại bảng xếp hạng"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Đặt lại BXH</span>
            </button>
          </div>

          {/* Leaderboard Table / Cards */}
          <div className="space-y-2.5">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">
                Không tìm thấy đại lý nào phù hợp với từ khóa tìm kiếm.
              </div>
            ) : (
              filteredEntries.map((entry, index) => {
                let rankBadge = null;
                let cardBorder = 'border-slate-800';
                let bgStyle = 'bg-slate-800/40 hover:bg-slate-800/70';

                if (index === 0) {
                  rankBadge = (
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-base shadow-md shadow-amber-500/30">
                      🥇 1
                    </div>
                  );
                  cardBorder = 'border-amber-500/60 shadow-lg shadow-amber-500/5';
                  bgStyle = 'bg-gradient-to-r from-amber-950/40 via-slate-800/70 to-slate-800/40';
                } else if (index === 1) {
                  rankBadge = (
                    <div className="w-9 h-9 rounded-xl bg-slate-300 text-slate-950 flex items-center justify-center font-black text-base shadow-md">
                      🥈 2
                    </div>
                  );
                  cardBorder = 'border-slate-400/50';
                  bgStyle = 'bg-gradient-to-r from-slate-800/80 to-slate-800/40';
                } else if (index === 2) {
                  rankBadge = (
                    <div className="w-9 h-9 rounded-xl bg-amber-700 text-white flex items-center justify-center font-black text-base shadow-md">
                      🥉 3
                    </div>
                  );
                  cardBorder = 'border-amber-700/50';
                  bgStyle = 'bg-gradient-to-r from-amber-950/20 to-slate-800/40';
                } else {
                  rankBadge = (
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-sm border border-slate-700">
                      #{index + 1}
                    </div>
                  );
                }

                return (
                  <div
                    key={entry.id}
                    className={`flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border ${cardBorder} ${bgStyle} transition-all duration-200`}
                  >
                    <div className="flex items-center gap-3.5 min-w-[200px]">
                      {rankBadge}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-white text-base">
                            {entry.agentName}
                          </h4>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-600/20 text-red-400 border border-red-500/30">
                            {entry.agentTitle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {entry.agentUnit}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 ml-auto">
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Độ chính xác</div>
                        <div className="font-bold text-emerald-400 text-sm">
                          {entry.accuracy}% ({entry.correctCount}/{entry.totalQuestions || 20})
                        </div>
                      </div>

                      <div className="text-right min-w-[85px]">
                        <div className="text-xs text-slate-400">Tổng điểm</div>
                        <div className="font-black text-xl text-amber-400 flex items-center justify-end gap-1">
                          <span>{entry.score}</span>
                          <span className="text-xs font-normal text-amber-400/70">đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Quy tắc: Đúng +5 điểm | Sai -1 điểm • Hệ thống tự động ghi nhận</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors cursor-pointer"
          >
            Đóng Bảng Vàng
          </button>
        </div>
      </div>
    </div>
  );
};
