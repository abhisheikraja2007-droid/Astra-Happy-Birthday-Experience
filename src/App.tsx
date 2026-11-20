import React, { useState, useEffect, useRef } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { CelestialParticles } from './components/CelestialParticles';
import { FloatingBalloons } from './components/FloatingBalloons';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoveSection } from './components/LoveSection';
import { VideoModal } from './components/VideoModal';
import { PoemSection } from './components/PoemSection';
import { WishesSection } from './components/WishesSection';
import { GallerySection } from './components/GallerySection';
import { VirtualGuestbook } from './components/VirtualGuestbook';
import { Footer } from './components/Footer';
import { ToastProvider } from './components/ToastContext';
import { triggerCelebration } from './utils/confetti';

export default function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [recipientName, setRecipientName] = useState('Bhuvanahamsadvani K S');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio ambient synth generator
  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAmbientAudio();
    } else {
      startAmbientAudio();
    }
  };

  useEffect(() => {
    audioRef.current = new Audio('/bgm/Kalyani.mpeg');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startAmbientAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      setIsPlayingAudio(true);
    }
  };

  const stopAmbientAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
  };


  return (
    <ToastProvider>
      <div className="antialiased min-h-screen flex flex-col relative bg-[#13131a] text-[#e4e1ec]">
        {/* Background Nebula Glows */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-900/15 rounded-full blur-[150px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#13131a]/40 via-[#13131a]/60 to-[#13131a]/95"></div>
        </div>

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Celestial Particles Effect */}
        <CelestialParticles />

        {/* Floating Balloons Effect */}
        <FloatingBalloons />

        {/* Navigation */}
        <Navbar
          onOpenWishModal={() => {
            document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onCelebrate={triggerCelebration}
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={toggleAudio}
        />

        {/* Main Canvas */}
        <main className="relative z-10 flex-grow flex flex-col items-center w-full px-container-margin pt-[100px] pb-16 max-w-7xl mx-auto">
          <Hero
            onOpenVideo={() => setIsVideoModalOpen(true)}
            recipientName={recipientName}
            setRecipientName={setRecipientName}
          />
          <LoveSection />
          <PoemSection />
          <VirtualGuestbook />
          <GallerySection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals */}
        <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
      </div>
    </ToastProvider>
  );
}
