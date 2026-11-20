import React from 'react';
import { Play, User } from 'lucide-react';
import { motion } from 'motion/react';
import { WishBubbleGenerator } from './WishBubbleGenerator';

interface HeroProps {
  onOpenVideo: () => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVideo, recipientName, setRecipientName }) => {
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      className="w-full flex flex-col items-center justify-center min-h-[700px] text-center gap-6 pt-10"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full liquid-glass border border-[#d4ff00]/40 text-[#d4ff00] text-xs md:text-sm font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(212,255,0,0.25)]"
      >
        <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-ping" />
        <span>Happy birthday My Kitty!! ✨</span>
      </motion.div>

      <h1 className="font-['Plus_Jakarta_Sans'] text-5xl md:text-6xl font-extrabold text-primary glow-text tracking-tight">
        Happy Birthday {recipientName ? `${recipientName} ❤️` : '❤️'}
      </h1>

      {/* Custom Text Box */}
      <div className="flex items-center gap-2 bg-black/40 border border-white/15 px-4 py-2 rounded-2xl backdrop-blur-md shadow-lg max-w-sm w-full mx-auto">
        <User className="w-4 h-4 text-primary shrink-0" />
        <span className="text-on-surface text-sm font-medium w-full text-left">
          To My Lovable Paithiyakaaaariiiiii 💘
        </span>
      </div>

      <p className="font-['Inter'] text-lg text-on-surface-variant max-w-2xl mx-auto opacity-80 leading-relaxed">
        May this year bring you as much joy and beauty as you bring to the world. A celebration of you, rendered in light and glass.
      </p>

      {/* Wish Bubble Generator */}
      <WishBubbleGenerator />

      {/* Curved OLED TV Feature */}
      <motion.div
        id="video"
        onClick={onOpenVideo}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="mt-6 w-full max-w-5xl aspect-video rounded-[32px] overflow-hidden liquid-glass relative group p-1 jelly-hover cursor-pointer shadow-[0_20px_60px_rgba(219,184,255,0.2)]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50 z-10 pointer-events-none"></div>
        <div className="w-full h-full rounded-[28px] overflow-hidden relative bg-black/40">
          <div
            className="bg-cover bg-center w-full h-full opacity-70 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxRsX7i_sqlvzyhe_hGD0kbJk4m2CQXkG-BJ4C80xRhXk_RELd6_bR_DXQ6DQd88TNixy1GvZbYPoeva9a-bjOnhRR0XwJS5qCACK5HuMjqmY8i7m19HIcrXHYT5Gkcel60Sdgge9cgqKaBJpuwykn5Y07139roc8dJNG6Fv5lbQZ14TpI9AMKRSWOsNmhnpnUGZnP0k-QMUmVCwGk4qGbICuvXuIOFx8YhXu308t546-ZoVdOhN0nrALYvyXxVUvFwkxewURTvcLK')`
            }}
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20 shadow-[0_0_30px_rgba(219,184,255,0.3)] group-hover:shadow-[0_0_50px_rgba(219,184,255,0.6)]">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center text-xs text-white/70 font-semibold tracking-wider uppercase">
            <span>Celestial Cinematic Experience</span>
            <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> 4K Ultra HD
            </span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

