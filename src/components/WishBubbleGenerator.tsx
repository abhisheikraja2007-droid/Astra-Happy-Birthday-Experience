import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wand2 } from 'lucide-react';
import { useToast } from './ToastContext';

interface Bubble {
  id: number;
  x: number;
  size: number;
  color: string;
  duration: number;
  message?: string;
}

const WISHS_PRESETS = [
  '✨ Endless Joy',
  '💖 Starlight Dreams',
  '🌟 Radiant Health',
  '🌸 Boundless Love',
  '💫 Celestial Peace',
];

export const WishBubbleGenerator: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const { showToast } = useToast();

  const colors = [
    'from-purple-500/40 to-pink-500/40 border-purple-400/60 shadow-[0_0_20px_rgba(219,184,255,0.6)]',
    'from-pink-500/40 to-yellow-500/40 border-pink-400/60 shadow-[0_0_20px_rgba(255,182,193,0.6)]',
    'from-blue-500/40 to-cyan-500/40 border-blue-400/60 shadow-[0_0_20px_rgba(135,206,250,0.6)]',
    'from-[#d4ff00]/40 to-purple-500/40 border-[#d4ff00]/60 shadow-[0_0_20px_rgba(212,255,0,0.6)]',
  ];

  const spawnBubble = (e?: React.MouseEvent) => {
    const rect = (e?.currentTarget as HTMLElement)?.getBoundingClientRect();
    const x = rect ? e!.clientX - rect.left : Math.random() * 300 + 50;

    const chosenMessage = WISHS_PRESETS[Math.floor(Math.random() * WISHS_PRESETS.length)];
    const newBubble: Bubble = {
      id: Date.now() + Math.random(),
      x: x || Math.random() * 250,
      size: Math.floor(Math.random() * 35) + 45,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 2 + 3,
      message: chosenMessage,
    };

    setBubbles((prev) => [...prev.slice(-15), newBubble]);
    showToast(chosenMessage, 'A luminous wish has drifted into the celestial sky.', 'magic');
  };

  return (
    <div className="relative flex flex-col items-center gap-3 my-4">
      <motion.button
        onClick={spawnBubble}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/80 via-pink-600/80 to-[#d4ff00]/80 hover:from-purple-600 hover:via-pink-600 hover:to-[#d4ff00] text-white font-bold text-xs md:text-sm tracking-wide shadow-[0_0_30px_rgba(219,184,255,0.4)] backdrop-blur-md border border-white/35 transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <Wand2 className="w-4 h-4 text-white relative z-10 animate-bounce" />
        <span className="relative z-10 flex items-center gap-1.5">
          <span>Release Wish Bubble</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4ff00]" />
        </span>
      </motion.button>
      <span className="text-[11px] font-mono text-on-surface-variant/70 tracking-wider">
        Click to release floating celestial bubbles
      </span>

      {/* Floating active bubbles container */}
      <div className="absolute -top-32 left-0 right-0 h-40 pointer-events-none overflow-visible z-30">
        <AnimatePresence>
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20, scale: 0.5, x: b.x - 100 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: -140 - Math.random() * 60,
                scale: [0.5, 1.05, 1],
                x: (b.x - 100) + (Math.random() * 60 - 30),
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: b.duration, ease: [0.25, 1, 0.5, 1] }}
              style={{ width: b.size * 2, height: b.size * 2 }}
              className={`absolute bottom-0 rounded-full bg-gradient-to-br ${b.color} backdrop-blur-md border flex items-center justify-center p-2 text-center text-white text-[11px] font-extrabold shadow-lg`}
            >
              <div className="absolute top-2 left-2 w-3 h-3 bg-white/60 rounded-full blur-[1px]" />
              <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">{b.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
