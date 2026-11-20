import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, Send, Heart } from 'lucide-react';
import { useToast } from './ToastContext';

import { INITIAL_WISHES } from '../data';

interface GuestbookWish {
  id: string;
  name: string;
  message: string;
  color: string;
}

const colors = [
  'from-purple-500/20 to-pink-500/20 border-purple-500/40',
  'from-orange-500/20 to-red-500/20 border-orange-500/40',
  'from-blue-500/20 to-cyan-500/20 border-blue-500/40',
  'from-emerald-500/20 to-teal-500/20 border-emerald-500/40',
  'from-rose-500/20 to-fuchsia-500/20 border-rose-500/40',
  'from-amber-500/20 to-yellow-500/20 border-amber-500/40',
  'from-indigo-500/20 to-violet-500/20 border-indigo-500/40',
  'from-lime-500/20 to-green-500/20 border-lime-500/40',
];

const INITIAL_BUBBLES: GuestbookWish[] = INITIAL_WISHES.map((wish, index) => ({
  id: wish.id,
  name: wish.name,
  message: wish.message,
  color: colors[index % colors.length],
}));

export const VirtualGuestbook: React.FC = () => {
  const [wishes, setWishes] = useState<GuestbookWish[]>(() => {
    let savedWishes: GuestbookWish[] = [];
    const saved = localStorage.getItem('birthday_wishes_custom');
    if (saved) {
      try {
        savedWishes = JSON.parse(saved);
      } catch (e) {
        savedWishes = [];
      }
    }
    
    // If the old key exists, we might want to migrate it or just ignore. Ignoring is safer to avoid dupes of old defaults.
    return [...savedWishes, ...INITIAL_BUBBLES];
  });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { showToast } = useToast();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: GuestbookWish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      color: colors[wishes.length % colors.length],
    };

    const newWishes = [newWish, ...wishes];
    setWishes(newWishes);
    
    // Save only custom wishes to localStorage (filter out the initial ones which start with 'w')
    const customWishes = newWishes.filter(w => !w.id.startsWith('w'));
    localStorage.setItem('birthday_wishes_custom', JSON.stringify(customWishes));
    setName('');
    setMessage('');
    setIsExpanded(false);
    showToast(`✨ Wish Released, ${newWish.name}!`, 'Your floating bubble has joined the celestial constellation.', 'heart');
  };

  return (
    <section id="guestbook" className="w-full max-w-6xl mx-auto my-20 px-4">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
          <MessageCircle className="w-4 h-4" />
          <span>Community Wall</span>
        </div>
        <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-5xl font-extrabold text-on-surface glow-text">
          Floating Wishes Bubble Wall
        </h2>
        <p className="font-['Inter'] text-on-surface-variant text-sm md:text-base mt-2 opacity-80 max-w-xl">
          Leave your brief birthday wish below and watch it float into our celestial bubble constellation.
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(219,184,255,0.4)] hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isExpanded ? 'Close Form' : '✨ Leave a Floating Wish'}</span>
        </button>
      </div>

      {/* Floating Wish Form Modal / Drawer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden mb-12"
          >
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto liquid-glass rounded-[28px] border border-white/20 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-5 bg-surface-container/90 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-on-surface flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
                  <span>Send Your Blessing</span>
                </h3>
                <span className="text-xs text-on-surface-variant font-mono">Appears instantly</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Brief Wish (Max 120 chars)
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Wishing you endless smiles and celestial joy!"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-transform"
                >
                  <Send className="w-4 h-4" />
                  <span>Release Bubble ✨</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bubbles Constellation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {wishes.map((wish, index) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`relative rounded-3xl p-6 bg-gradient-to-br ${wish.color} backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between gap-4 overflow-hidden group jelly-hover`}
            >
              {/* Internal bubble glow reflection */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

              <p className="font-['Inter'] text-on-surface text-base italic leading-relaxed z-10">
                "{wish.message}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    {wish.name.charAt(0)}
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-on-surface tracking-wide">
                    {wish.name}
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-[#d4ff00] animate-pulse" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
