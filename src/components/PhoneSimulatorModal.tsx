import React from 'react';
import { X, Smartphone } from 'lucide-react';
import { KahootPlayerView } from './KahootPlayerView';

interface PhoneSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  pin: string;
}

export const PhoneSimulatorModal: React.FC<PhoneSimulatorModalProps> = ({
  isOpen,
  onClose,
  pin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
        >
          <X className="w-4 h-4" />
          <span>Đóng Giả Lập</span>
        </button>

        {/* Smartphone Shell Frame */}
        <div className="w-[360px] sm:w-[400px] h-[740px] max-h-[90vh] bg-slate-900 border-[10px] border-slate-800 rounded-[48px] shadow-2xl shadow-black overflow-hidden flex flex-col relative ring-1 ring-slate-700">
          {/* Top Speaker / Camera notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full z-30 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-950/80 mr-2" />
            <div className="w-8 h-1 bg-slate-700 rounded-full" />
          </div>

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto pt-4 bg-slate-950">
            <KahootPlayerView
              pin={pin}
              onExitPlayerMode={onClose}
            />
          </div>

          {/* Bottom Home Indicator */}
          <div className="h-4 bg-slate-900 flex items-center justify-center py-1">
            <div className="w-28 h-1 bg-slate-700 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
