import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Heart } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'magic' | 'heart';
}

interface ToastContextType {
  showToast: (title: string, description?: string, type?: 'success' | 'magic' | 'heart') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((title: string, description?: string, type: 'success' | 'magic' | 'heart' = 'magic') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="pointer-events-auto liquid-glass rounded-2xl p-4 border border-white/25 shadow-[0_15px_40px_rgba(0,0,0,0.5)] bg-surface-container/95 backdrop-blur-2xl flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-500/30">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : toast.type === 'heart' ? (
                  <Heart className="w-5 h-5 fill-white" />
                ) : (
                  <Sparkles className="w-5 h-5 text-[#d4ff00]" />
                )}
              </div>
              <div className="flex-grow pt-0.5">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-on-surface">
                  {toast.title}
                </h4>
                {toast.description && (
                  <p className="font-['Inter'] text-xs text-on-surface-variant/80 mt-0.5 leading-relaxed">
                    {toast.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
