import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Balloon {
  id: string;
  x: number; // percentage width
  color: string;
  size: number;
  speed: number;
  stringLength: number;
  wobbleSpeed: number;
  wobbleDistance: number;
}

const BALLOON_COLORS = [
  'bg-purple-500/80 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.5)]',
  'bg-pink-500/80 border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.5)]',
  'bg-[#d4ff00]/80 border-[#d4ff00] shadow-[0_0_25px_rgba(212,255,0,0.5)]',
  'bg-blue-500/80 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]',
  'bg-amber-500/80 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)]',
  'bg-teal-500/80 border-teal-400 shadow-[0_0_25px_rgba(20,184,166,0.5)]',
];

export const FloatingBalloons: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Generate initial set of balloons
    const initialBalloons: Balloon[] = Array.from({ length: 12 }, (_, i) => ({
      id: `balloon-${i}-${Date.now()}`,
      x: Math.random() * 90 + 5,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      size: Math.floor(Math.random() * 20) + 40, // 40px to 60px width
      speed: Math.random() * 10 + 15, // duration in seconds
      stringLength: Math.floor(Math.random() * 30) + 50,
      wobbleSpeed: Math.random() * 2 + 2,
      wobbleDistance: Math.random() * 30 + 15,
    }));
    setBalloons(initialBalloons);

    // Turn off balloons after 20 seconds
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  if (!isActive) return null;

  const popBalloon = (id: string) => {
    // Play subtle pop chime
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {
      // Audio fallback
    }

    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setPoppedCount((c) => c + 1);

    // Respawn a new balloon after a short delay
    setTimeout(() => {
      const newBalloon: Balloon = {
        id: `balloon-respawn-${Date.now()}-${Math.random()}`,
        x: Math.random() * 90 + 5,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        size: Math.floor(Math.random() * 20) + 40,
        speed: Math.random() * 10 + 15,
        stringLength: Math.floor(Math.random() * 30) + 50,
        wobbleSpeed: Math.random() * 2 + 2,
        wobbleDistance: Math.random() * 30 + 15,
      };
      setBalloons((prev) => [...prev, newBalloon]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            initial={{ y: '110vh', x: `${balloon.x}vw`, opacity: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.85, 0.85, 0],
              x: [
                `${balloon.x}vw`,
                `${balloon.x + (balloon.wobbleDistance / 10)}vw`,
                `${balloon.x - (balloon.wobbleDistance / 10)}vw`,
                `${balloon.x}vw`,
              ],
            }}
            transition={{
              y: { duration: balloon.speed, repeat: Infinity, ease: 'linear' },
              opacity: { duration: balloon.speed, times: [0, 0.1, 0.9, 1], repeat: Infinity },
              x: { duration: balloon.wobbleSpeed, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{ position: 'absolute' }}
            className="pointer-events-auto cursor-pointer group flex flex-col items-center"
            onMouseEnter={() => popBalloon(balloon.id)}
            onClick={() => popBalloon(balloon.id)}
          >
            {/* Balloon Body */}
            <div
              style={{ width: balloon.size, height: balloon.size * 1.25 }}
              className={`rounded-[50%_50%_50%_50%/40%_40%_60%_60%] ${balloon.color} backdrop-blur-md border border-white/40 flex items-start justify-center pt-2 transition-transform duration-200 group-hover:scale-125`}
            >
              {/* Balloon specular highlight */}
              <div className="w-2.5 h-4 bg-white/70 rounded-full blur-[0.5px] -rotate-45 ml-1 mt-1" />
            </div>

            {/* Balloon Knot */}
            <div className="w-2 h-1.5 bg-white/40 rounded-sm -mt-0.5" />

            {/* Balloon String */}
            <div
              style={{ height: balloon.stringLength }}
              className="w-[1px] bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Optional Popped Balloons Counter Badge */}
      {poppedCount > 0 && (
        <div className="absolute top-24 right-6 liquid-glass px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono text-primary flex items-center gap-1.5 shadow-lg pointer-events-auto">
          <span>🎈 Balloons Popped: {poppedCount}</span>
        </div>
      )}
    </div>
  );
};
