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
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsExpanded(false));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      if (e.key === 'ArrowRight') setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  return (
    <>
      <motion.div
        layoutId={`gallery-${title}`}
        onClick={() => setIsExpanded(true)}
        className="relative h-72 lg:h-96 w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-white/20 group"
      >
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} variant="default" />
        <Icon className="w-24 h-24 text-gray-600 mb-4" />
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-gray-600 text-xs mt-2">{images.length} images</p>
        <Maximize2 className="w-4 h-4 text-gray-500 absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div ref={ref} className="relative max-w-6xl w-full">
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-12 right-0 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <motion.div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
                <Icon className="w-32 h-32 text-gray-400" />
                <p className="text-white text-lg absolute">{images[currentIndex]}</p>
              </motion.div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              <div className="flex gap-2 mt-6 justify-center overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg bg-white/5 border-2 transition-all flex items-center justify-center ${idx === currentIndex ? 'border-white scale-110' : 'border-white/20 hover:border-white/40'}`}
                  >
                    <span className="text-xs text-gray-400">{idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
