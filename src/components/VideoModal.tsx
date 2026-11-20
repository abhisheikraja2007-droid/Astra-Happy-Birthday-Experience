import { X, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full h-full md:h-[95vh] max-w-none md:rounded-[32px] overflow-hidden liquid-glass border-0 md:border border-white/20 shadow-[0_0_80px_rgba(219,184,255,0.3)] bg-surface-container/90 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-on-surface">For the Chellam,Pattu,Sweet Thangam</h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Visual Container */}
        <div className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center">
          <video 
            src="/birthday.mp4" 
            className="absolute inset-0 w-full h-full object-contain z-0" 
            controls
            autoPlay
            playsInline
          />
        </div>
      </div>
    </div>
  );
};
