import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  ListChecks, 
  AlertCircle, 
  Sparkles,
  Search
} from 'lucide-react';
import { PRODUCT_CHEATSHEET } from '../data/productCheatsheet';

interface CheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatsheetModal: React.FC<CheatsheetModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  if (!isOpen) return null;

  const currentSection = PRODUCT_CHEATSHEET[activeTab];

  const filteredItems = currentSection.items.filter(
    (item) =>
      item.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.highlight && item.highlight.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'ListChecks':
        return <ListChecks className="w-4 h-4 text-blue-400" />;
      case 'AlertCircle':
        return <AlertCircle className="w-4 h-4 text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Cẩm Nang Huấn Luyện Bảo Lãnh Viện Phí</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                  Prudential 24/7
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Tài liệu tóm tắt nhanh các trang quy tắc, điều khoản và quy trình chuẩn
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar & Search */}
        <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {PRODUCT_CHEATSHEET.map((section, idx) => (
              <button
                key={section.title}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === idx
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                }`}
              >
                {getIcon(section.iconName)}
                <span>{section.badge}</span>
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm từ khóa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Section Title */}
        <div className="px-6 pt-4 pb-2">
          <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
            {getIcon(currentSection.iconName)}
            {currentSection.title}
          </h3>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-3.5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              Không tìm thấy mục nào khớp với "{searchTerm}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 transition-all hover:border-slate-600"
              >
                <h4 className="font-bold text-sm sm:text-base text-red-400 mb-1.5 flex items-baseline gap-2">
                  <span className="w-5 h-5 rounded-md bg-red-600/20 text-red-400 text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{item.heading}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-7 whitespace-pre-line">
                  {item.content}
                </p>
                {item.highlight && (
                  <div className="mt-2.5 ml-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-950/60 text-amber-300 border border-amber-800/50">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mẹo thực chiến: {item.highlight}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <span>Tổng đài CSKH Prudential 24/7: 1800 1 247 (Miễn cước)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Đóng Cẩm Nang
          </button>
        </div>
      </div>
    </div>
  );
};
