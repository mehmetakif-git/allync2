import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useOutsideClick } from '../hooks/use-outside-click';
import { GlowingEffect } from './ui/GlowingEffect';

interface ServiceVisualGalleryProps {
  images: string[];
  title: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ServiceVisualGallery: React.FC<ServiceVisualGalleryProps> = ({
  images,
  title,
  gradient,
  icon: Icon
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => setIsExpanded(false));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isExpanded) return;
      if (e.key === 'Escape') setIsExpanded(false);
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      if (e.key === 'ArrowRight') setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, images.length]);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isExpanded]);

  return (
    <>
      <motion.div
        layoutId={`gallery-${title}`}
        onClick={() => setIsExpanded(true)}
        className="relative h-72 lg:h-96 w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-white/20 group overflow-hidden"
      >
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
        <div className="relative z-10 text-center">
          <Icon className="w-24 h-24 text-gray-600 mb-4 mx-auto" />
          <p className="text-gray-500 text-sm font-medium">Görsel Önizleme</p>
          <p className="text-gray-600 text-xs mt-2">{title}</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
            <Maximize2 className="w-4 h-4" />
            <span className="text-xs">Genişletmek için tıkla</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-[9998]"
            />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                layoutId={`gallery-${title}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-6xl"
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="aspect-video bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
                  <Icon className="w-32 h-32 text-gray-400 relative z-10" />
                  <p className="text-white text-lg absolute z-10">{images[currentIndex]}</p>
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                <div className="flex gap-2 mt-6 justify-center overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg bg-white/5 border-2 flex items-center justify-center transition-all ${
                        idx === currentIndex ? 'border-white scale-110' : 'border-white/20'
                      }`}
                    >
                      <span className="text-xs text-gray-400">{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
