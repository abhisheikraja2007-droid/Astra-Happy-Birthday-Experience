import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 bg-transparent flex flex-col items-center justify-center gap-4 text-center px-container-margin transition-opacity duration-500 relative z-10 border-t border-white/10 mt-20">
      <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-on-surface flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
        Bhuvii 💝
      </div>

      <p className="font-['Inter'] text-sm text-tertiary opacity-90 flex items-center gap-1.5">
        <span>With love, forever.</span>
        <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
      </p>
    </footer>
  );
};
