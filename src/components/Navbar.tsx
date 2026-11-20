import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, PartyPopper } from 'lucide-react';

interface NavbarProps {
  onOpenWishModal: () => void;
  onCelebrate: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWishModal, onCelebrate, isPlayingAudio, onToggleAudio }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'poem' | 'video'>('video');

  const scrollToSection = (id: string, tab: 'gallery' | 'poem' | 'video') => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-auto rounded-full px-6 py-2.5 bg-surface-container-low/60 backdrop-blur-[25px] border border-white/20 shadow-[0_0_40px_rgba(219,184,255,0.15)] shadow-2xl flex items-center justify-between gap-6 z-50 transition-all duration-500 hover:bg-surface-container-low/80">
      <div className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-on-surface tracking-tight flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
        Bhuvii 💖
      </div>

      <div className="hidden md:flex gap-2 items-center text-sm font-semibold">
        <button
          onClick={() => scrollToSection('gallery', 'gallery')}
          className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
            activeTab === 'gallery' ? 'text-primary bg-white/5' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Gallery
        </button>
        <button
          onClick={() => scrollToSection('poem', 'poem')}
          className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
            activeTab === 'poem' ? 'text-primary bg-white/5' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Wishes
        </button>
        <button
          onClick={() => scrollToSection('video', 'video')}
          className={`px-3 py-1.5 rounded-full transition-all duration-300 relative ${
            activeTab === 'video' ? 'text-primary bg-white/5' : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Video
          {activeTab === 'video' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
          )}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleAudio}
          title={isPlayingAudio ? 'Mute ambient music' : 'Play ambient music'}
          className="text-on-surface-variant hover:text-primary hover:scale-105 transition-all p-2 rounded-full bg-white/5 border border-white/10"
        >
          {isPlayingAudio ? <Volume2 className="w-4 h-4 text-primary animate-pulse" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={onCelebrate}
          className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-black font-extrabold text-xs tracking-wide shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-transform"
        >
          <PartyPopper className="w-3.5 h-3.5" />
          <span>Celebrate</span>
        </button>

      </div>
    </nav>
  );
};
