import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Copy, 
  Check, 
  Users, 
  Play, 
  X, 
  Sparkles, 
  ExternalLink,
  Smartphone,
  Flame,
  Volume2
} from 'lucide-react';
import { RoomPlayer, RoomState } from '../types';
import { sound } from '../utils/audio';

interface KahootLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  pin: string;
  room: RoomState | null;
  onStartGame: () => void;
  onOpenPhoneSim: () => void;
}

export const KahootLobbyModal: React.FC<KahootLobbyModalProps> = ({
  isOpen,
  onClose,
  pin,
  room,
  onStartGame,
  onOpenPhoneSim,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const previousPlayerCountRef = useRef(0);

  // Generate full join URL
  const joinUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?pin=${pin}`
    : `https://pruquest.vn?pin=${pin}`;

  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(joinUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [isOpen, joinUrl]);

  const players: RoomPlayer[] = room ? Object.values(room.players) : [];

  // Play a pop sound when a new player joins
  useEffect(() => {
    if (players.length > previousPlayerCountRef.current) {
      sound.playClick();
      previousPlayerCountRef.current = players.length;
    }
  }, [players.length]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-red-500/40 rounded-3xl shadow-2xl shadow-red-950/50 p-6 sm:p-8 text-slate-100 my-auto">
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-black tracking-widest uppercase mb-3">
            <QrCode className="w-4 h-4" />
            <span>Phòng Đấu Trí Trực Tiếp Kahoot Prudential</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Quét Mã QR & Đặt Tên Vào Phòng Thi
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Tư vấn viên quét mã QR ➔ <span className="text-white font-bold">Đặt Tên TVV</span> ➔ Sẵn sàng trả lời đếm ngược!
          </p>

          {/* 3 Step Quick Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 max-w-2xl mx-auto text-left">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5 text-xs">
              <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-xs shrink-0">1</span>
              <div>
                <span className="font-bold text-white block">Quét QR / Nhập PIN</span>
                <span className="text-[10px] text-slate-400">Dùng camera điện thoại</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-700/60 flex items-center gap-2.5 text-xs">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs shrink-0">2</span>
              <div>
                <span className="font-bold text-amber-300 block">Đặt Tên TVV</span>
                <span className="text-[10px] text-slate-300">Chỉ cần họ tên / biệt danh</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5 text-xs">
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-xs shrink-0">3</span>
              <div>
                <span className="font-bold text-white block">Đấu Trí Trực Tiếp</span>
                <span className="text-[10px] text-slate-400">Tự động hiện đáp án khi hết giờ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main interactive QR & PIN section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* QR Code Card */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl text-slate-900">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code vào phòng thi"
                className="w-56 h-56 rounded-xl object-contain shadow-inner"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center bg-slate-100 rounded-xl text-slate-400">
                Đang tạo mã QR...
              </div>
            )}
            <span className="text-xs font-bold text-slate-600 mt-2 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-red-600" />
              Mở camera điện thoại quét ngay
            </span>
          </div>

          {/* PIN & Instructions */}
          <div className="md:col-span-7 space-y-4">
            {/* Big Game PIN */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                MÃ PIN PHÒNG CHƠI (GAME PIN)
              </span>
              <div className="text-4xl sm:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-red-400 py-1 font-mono">
                {pin.slice(0, 3)} {pin.slice(3)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Hoặc nhập mã PIN tại màn hình đăng nhập
              </p>
            </div>

            {/* Direct Link */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700">
              <input
                type="text"
                readOnly
                value={joinUrl}
                className="flex-1 bg-transparent text-xs font-mono text-slate-300 px-2 py-1 outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã chép' : 'Sao chép link'}</span>
              </button>
            </div>

            {/* Simulation test button */}
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200">
              <span>Đang thử nghiệm trên máy tính?</span>
              <button
                onClick={onOpenPhoneSim}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-transform active:scale-95 cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mở điện thoại giả lập</span>
              </button>
            </div>
          </div>
        </div>

        {/* Players In Lobby Area */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-sm text-slate-200">
                Đại lý đã vào phòng ({players.length} người)
              </h3>
            </div>
            {players.length > 0 && (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
                ● Đang kết nối trực tiếp
              </span>
            )}
          </div>

          {players.length === 0 ? (
            <div className="py-8 text-center bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
              <p className="text-slate-400 text-sm">
                Chưa có đại lý nào kết nối. Hãy quét mã QR ở trên để bắt đầu!
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto p-2 bg-slate-950/50 rounded-2xl border border-slate-800/80">
              {players.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-bold text-white shadow-sm animate-scale-up"
                >
                  <span className="text-base">{p.avatar || '🌟'}</span>
                  <span className="text-slate-200">{p.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {p.unit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            <span>Thời gian trả lời: </span>
            <span className="font-bold text-amber-400">20 Giây / Câu</span>
            <span> • Điểm tốc độ + Khẩu quyết ghi nhớ sau mỗi câu</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onStartGame();
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-400 text-white font-black text-sm sm:text-base shadow-xl shadow-red-950/60 transition-transform active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>BẮT ĐẦU GAME (20S / CÂU)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
