import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data';
import { GalleryItem } from '../types';
import { LightboxModal } from './LightboxModal';
import { SurpriseGiftBox } from './SurpriseGiftBox';
import { Sparkles, Image as ImageIcon, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'memories' | 'adventures' | 'candids'>('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const filteredImages = filter === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const currentSelectedItem = selectedItemIndex !== null ? filteredImages[selectedItemIndex] : null;

  const handleNext = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      className="w-full mt-24 mb-16 px-container-margin"
    >
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
          <ImageIcon className="w-4 h-4" />
          <span>Visual Archive</span>
        </div>
        <h2 className="font-['Plus_Jakarta_Sans'] text-4xl md:text-5xl font-extrabold text-on-surface glow-text">
          Beautiful Moments
        </h2>
        <p className="font-['Inter'] text-on-surface-variant opacity-70 mt-3 max-w-2xl text-center text-sm md:text-base">
          Glimpses of light captured in time, arranged in a seamless glass grid.
        </p>
      </div>

      {/* Surprise Gift Box Screen */}
      <SurpriseGiftBox isUnlocked={isUnlocked} onUnlocked={() => setIsUnlocked(true)} />

      {/* Gallery Content (Revealed after opening gift box) */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="w-full"
          >
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {(['all', 'memories', 'adventures', 'candids'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    filter === cat
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                      : 'bg-white/5 text-on-surface-variant hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <div className="masonry-grid w-full">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() => setSelectedItemIndex(index)}
                  className="liquid-glass rounded-[24px] overflow-hidden relative jelly-hover group cursor-pointer border border-white/15"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-primary/20 text-primary font-mono w-max mb-1 border border-primary/30">
                      {image.category}
                    </span>
                    <h4 className="font-['Plus_Jakarta_Sans'] text-white font-bold text-base flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      {image.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <LightboxModal
        item={currentSelectedItem}
        onClose={() => setSelectedItemIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </motion.section>
  );
};

