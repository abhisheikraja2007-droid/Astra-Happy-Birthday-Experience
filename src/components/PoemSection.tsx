import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const PoemSection: React.FC = () => {
  return (
    <motion.section
      id="poem"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      className="w-full max-w-5xl mx-auto mt-16"
    >
      <div className="liquid-glass rounded-[48px] p-8 md:p-16 relative overflow-hidden jelly-hover border border-white/30 shadow-[0_32px_128px_-32px_rgba(219,184,255,0.3)] bg-surface-container/40">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-tertiary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(219,184,255,0.4)]">
            <Heart className="w-8 h-8 fill-primary text-primary" />
          </div>

          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-5xl text-on-surface mb-2 tracking-tight glow-text font-bold">
            என் புவிக்கு... ❤️
          </h2>

          <div className="font-['Inter'] text-lg md:text-2xl text-on-surface-variant space-y-6 leading-[1.8] max-w-3xl mx-auto font-light whitespace-pre-wrap">
            <p>
              உன் பிறந்த நாளில்{'\n'}
              இறைவனிடம் நான் கேட்ட வரம் ஒன்றே—{'\n'}
              உன் சிரிப்பு மட்டும் என்றென்றும் மாறாதிருக்கட்டும்.
            </p>
            <p>
              சோர்ந்து வரும் ஒவ்வொரு மாலையிலும்{'\n'}
              என் மார்பே உன் தலையணையாகட்டும்.
            </p>
            <p>
              புயலாய் உலகம் உன்னை சோதித்தாலும்,{'\n'}
              பூவாய் உன்னைத் தாங்கும் கரமாய் நானிருக்கட்டும்.
            </p>
            <p>
              என் நாளின் முதல் நினைவும் நீ,{'\n'}
              என் இரவின் கடைசி பிரார்த்தனையும் நீ.
            </p>
            <p>
              பிறந்தநாள் வாழ்த்துகள், என் பட்டு...{'\n'}
              உன் வாழ்நாள் முழுவதும்,{'\n'}
              நான் என்றென்றும் உன் நிம்மதியாகவே இருக்க விரும்புகிறேன். ❤️
            </p>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-primary/80 uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Dedicated with eternal fondness</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

