import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Heart, Wand2 } from 'lucide-react';
import { triggerCelebration } from '../utils/confetti';

interface SurpriseGiftBoxProps {
  onUnlocked: () => void;
  isUnlocked: boolean;
}

export const SurpriseGiftBox: React.FC<SurpriseGiftBoxProps> = ({ onUnlocked, isUnlocked }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenGift = () => {
    if (isUnlocked || isOpening) return;
    setIsOpening(true);
    triggerCelebration();

    setTimeout(() => {
      onUnlocked();
    }, 1200);
  };

  if (isUnlocked) return null;

  return (
    <div className="w-full my-16 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-xl liquid-glass rounded-[36px] border border-white/25 p-10 md:p-14 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-gradient-to-b from-surface-container/90 to-surface/90 backdrop-blur-2xl"
      >
        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/40 mb-6 animate-bounce">
            <Gift className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#d4ff00]" />
            <span>Surprise Memory Box</span>
          </div>

          <h3 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-extrabold text-on-surface mb-3 glow-text">
            A Special Gift Awaits You
          </h3>

          <p className="font-['Inter'] text-on-surface-variant text-sm md:text-base opacity-80 max-w-md mb-8">
            Unwrap this magical gift box to reveal the secret visual archive and 25 cherished moments captured in time.
          </p>

          <motion.button
            onClick={handleOpenGift}
            disabled={isOpening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-[#d4ff00] text-white font-bold text-base tracking-wide shadow-[0_0_40px_rgba(219,184,255,0.5)] flex items-center gap-3 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Wand2 className="w-5 h-5 relative z-10 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="relative z-10 flex items-center gap-2">
              <span>{isOpening ? '✨ Unwrapping Magic...' : '🎁 Open Surprise Gift Box'}</span>
              <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
