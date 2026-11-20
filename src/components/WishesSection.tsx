import React, { useState } from 'react';
import { WishMessage } from '../types';
import { INITIAL_WISHES } from '../data';
import { MessageSquareHeart, Send, Sparkles, User } from 'lucide-react';
import { motion } from 'motion/react';

interface WishesSectionProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export const WishesSection: React.FC<WishesSectionProps> = ({ isModalOpen, onCloseModal }) => {
  const [wishes, setWishes] = useState<WishMessage[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: WishMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: 'Just now',
      avatarColor: 'from-purple-600 to-pink-500'
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setMessage('');
    onCloseModal();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      className="w-full max-w-5xl mx-auto my-16 px-4"
    >
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
          <MessageSquareHeart className="w-4 h-4" />
          <span>Community Wall</span>
        </div>
        <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-on-surface glow-text">
          Birthday Wishes
        </h2>
        <p className="font-['Inter'] text-on-surface-variant text-sm md:text-base mt-2 opacity-80 max-w-lg">
          Messages of love and starlight left by cherished friends and family.
        </p>
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishes.map((wish, index) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="liquid-glass rounded-2xl p-6 flex flex-col justify-between gap-4 border border-white/10 hover:border-primary/40 transition-all duration-300 jelly-hover"
          >
            <p className="font-['Inter'] text-on-surface text-sm md:text-base italic leading-relaxed">
              "{wish.message}"
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${wish.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {wish.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-on-surface">{wish.name}</h4>
                  <span className="text-xs text-on-surface-variant/70 font-mono">{wish.timestamp}</span>
                </div>
              </div>
              <Sparkles className="w-4 h-4 text-primary opacity-60" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Wish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-lg rounded-[28px] overflow-hidden liquid-glass border border-white/20 shadow-[0_0_60px_rgba(219,184,255,0.3)] bg-surface-container/90 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-on-surface">Leave a Birthday Wish</h3>
              </div>
              <button
                onClick={onCloseModal}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Your Wish
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a heartfelt birthday wish..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-transform"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Wish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.section>
  );
};

