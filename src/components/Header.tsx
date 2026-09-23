import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  PlusCircle, 
  Users, 
  RotateCcw,
  Sparkles,
  Trophy,
  Music,
  QrCode,
  Smartphone,
  Shuffle,
  Flame
} from 'lucide-react';
import { PlayMode } from '../types';

interface HeaderProps {
  playMode: PlayMode;
  setPlayMode: (mode: PlayMode) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isBgmActive?: boolean;
  onToggleBgm?: () => void;
  onOpenCheatsheet: () => void;
  onOpenDocGenerator: () => void;
  onOpenLeaderboard: () => void;
  onOpenKahootLobby?: () => void;
  onOpenPhoneSim?: () => void;
  onOpenPlayerMode?: () => void;
  connectedPlayersCount?: number;
  onResetQuiz: () => void;
  onShuffleNewExam?: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  streak?: number;
}

export const Header: React.FC<HeaderProps> = ({
  playMode,
  setPlayMode,
  isMuted,
  onToggleMute,
  isBgmActive = false,
  onToggleBgm,
  onOpenCheatsheet,
  onOpenDocGenerator,
  onOpenLeaderboard,
  onOpenKahootLobby,
  onOpenPhoneSim,
  onOpenPlayerMode,
  connectedPlayersCount = 0,
  onResetQuiz,
  onShuffleNewExam,
  currentQuestionIndex,
  totalQuestions,
  score,
  streak = 0,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 flex items-center justify-between flex-wrap gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-md shadow-red-900/40 ring-2 ring-red-400/30 font-black text-xl tracking-tighter text-white">
            PRU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-red-200 bg-clip-text text-transparent">
                PruQuest
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-600 text-white uppercase tracking-wider shadow-xs">
                PRUKhỏe Linh Hoạt
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Hệ thống Huấn Luyện PRUKhỏe Linh Hoạt • Ưu tiên chính xác & Tốc độ • Chuỗi đúng ≥ 3 thưởng điểm 🔥
            </p>
          </div>
        </div>

        {/* Center Progress & Stats */}
        <div className="flex items-center gap-3 sm:gap-4 bg-slate-800/80 px-3 sm:px-4 py-1.5 rounded-xl border border-slate-700/60 shadow-inner">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Tiến độ câu</span>
            <span className="font-bold text-sm text-red-400">
              {currentQuestionIndex + 1} <span className="text-slate-500 font-normal">/ {totalQuestions}</span>
            </span>
          </div>

          <div className="w-px h-6 bg-slate-700" />

          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Tổng điểm</span>
            <span className="font-bold text-sm text-amber-400">
              {score} <span className="text-[11px] text-amber-500/80 font-normal">đ</span>
            </span>
          </div>

          {streak >= 2 && (
            <>
              <div className="w-px h-6 bg-slate-700" />
              <div className="text-center animate-fade-in">
                <span className="text-[10px] text-orange-400 uppercase tracking-wider block font-black flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 fill-orange-400 animate-pulse" /> Chuỗi
                </span>
                <span className="font-black text-sm text-orange-400 flex items-center justify-center gap-1">
                  x{streak}
                  {streak >= 3 && (
                    <span className="text-[9px] bg-orange-500/20 text-orange-300 px-1 py-0.2 rounded font-black border border-orange-500/30">
                      +Bonus
                    </span>
                  )}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Leaderboard Button */}
          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600/30 to-yellow-600/30 hover:from-amber-600/50 hover:to-yellow-600/50 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all shadow-xs"
            title="Xem Bảng Vàng Đại Lý Xuất Sắc"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Bảng Vàng</span>
          </button>

          {/* Play Mode Switcher */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setPlayMode('presentation')}
              className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                playMode === 'presentation'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Chế độ Trình chiếu Bảng Lớn cho cả lớp"
            >
              Trình chiếu
            </button>
            <button
              onClick={() => setPlayMode('team_battle')}
              className={`px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-all ${
                playMode === 'team_battle'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Chế độ Đấu Đội kịch tính"
            >
              <Users className="w-3.5 h-3.5" />
              Đấu Đội
            </button>
          </div>

          {/* QR Code Kahoot Join Button */}
          {onOpenKahootLobby && (
            <button
              onClick={onOpenKahootLobby}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white border border-red-400/40 text-xs font-black shadow-md shadow-red-950/50 transition-all active:scale-95 cursor-pointer"
              title="Mở mã QR phòng thi để đại lý quét điện thoại tham gia"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Mã QR Phòng</span>
              {connectedPlayersCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-white text-red-600 text-[10px] font-black">
                  {connectedPlayersCount}
                </span>
              )}
            </button>
          )}

          {/* Đại lý vào phòng / Đặt tên button */}
          {onOpenPlayerMode && (
            <button
              onClick={onOpenPlayerMode}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              title="Mở màn hình nhập mã phòng và đặt tên đại lý"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Đại Lý Vào Phòng</span>
            </button>
          )}

          {/* Test Phone Simulator Button */}
          {onOpenPhoneSim && (
            <button
              onClick={onOpenPhoneSim}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/60 text-xs font-bold transition-colors cursor-pointer"
              title="Mở giao diện điện thoại người chơi giả lập để kiểm tra 20s"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Giả Lập ĐT</span>
            </button>
          )}

          {/* Cheatsheet Button */}
          <button
            onClick={onOpenCheatsheet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            title="Mở cẩm nang 5 bước và quy tắc bảo lãnh"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Cẩm nang</span>
          </button>

          {/* AI / Custom Doc Question Generator */}
          <button
            onClick={onOpenDocGenerator}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600/30 to-red-600/30 hover:from-rose-600/50 hover:to-red-600/50 text-rose-200 border border-red-500/40 text-xs font-semibold transition-colors"
            title="Tạo câu hỏi từ tài liệu hoặc thêm câu hỏi mới"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden lg:inline">Thêm từ tài liệu</span>
          </button>

          {/* BGM Toggle (Kahoot lively music) */}
          {onToggleBgm && (
            <button
              onClick={onToggleBgm}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                isBgmActive
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-950 animate-pulse'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title={isBgmActive ? 'Tắt nhạc nền Kahoot' : 'Bật nhạc nền Kahoot vui tươi, sinh động'}
            >
              <Music className={`w-3.5 h-3.5 ${isBgmActive ? 'text-amber-400' : ''}`} />
              <span className="hidden sm:inline">{isBgmActive ? 'Nhạc BẬT' : 'Nhạc TẮT'}</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              isMuted
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60'
            }`}
            title={isMuted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors"
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình trình chiếu'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Shuffle New Exam (20 questions: 60% Theory, 40% Scenario) */}
          {onShuffleNewExam && (
            <button
              onClick={onShuffleNewExam}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white border border-red-400/40 text-xs font-black shadow-md shadow-red-950/50 transition-all active:scale-95 cursor-pointer"
              title="Trộn ngẫu nhiên bộ đề 20 câu: 60% Lý thuyết • 40% Tình huống, đầy đủ chủ đề"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Trộn Đề 20 Câu</span>
            </button>
          )}

          {/* Reset Quiz */}
          <button
            onClick={onResetQuiz}
            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/60 hover:text-rose-200 text-slate-400 border border-slate-700 text-xs transition-colors cursor-pointer"
            title="Làm mới bài trắc nghiệm từ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
