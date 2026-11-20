import React from 'react';
import { GalleryItem } from '../types';
import { X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose, onNext, onPrev }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in">
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        {/* Top Control Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Display */}
        <div className="relative rounded-[24px] overflow-hidden liquid-glass border border-white/20 shadow-[0_0_80px_rgba(219,184,255,0.3)] max-h-[75vh] flex items-center justify-center p-2 bg-black/40">
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[70vh] max-w-full object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 flex items-center gap-2 text-center text-on-surface">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg">{item.title}</span>
          <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-white/10 text-primary font-mono ml-2">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};
