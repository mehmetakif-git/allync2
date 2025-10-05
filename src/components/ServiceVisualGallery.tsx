import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useOutsideClick } from '../hooks/use-outside-click';

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
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  return (
    <>
      <motion.div
        onClick={() => setIsOpen(true)}
        className="visual-mockup-placeholder h-72 lg:h-96 w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden relative group cursor-pointer hover:border-white/20 transition-all duration-500"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
        <div className="relative z-10 text-center">
          <Icon className="w-24 h-24 text-gray-600 mb-4 mx-auto" />
          <p className="text-gray-500 text-sm font-medium">Visual Gallery</p>
          <p className="text-gray-600 text-xs mt-2">{title}</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
            <Maximize2 className="w-4 h-4" />
            <span className="text-xs">Click to expand</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                  {title}
                </h2>
              </div>

              <div className="relative aspect-video bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`}></div>
                <div className="relative z-10 text-center p-8">
                  <Icon className="w-32 h-32 text-gray-400 mb-6 mx-auto" />
                  <p className="text-gray-400 text-lg">
                    Image Placeholder {currentIndex + 1} of {images.length}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">{images[currentIndex]}</p>
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-white w-8'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
