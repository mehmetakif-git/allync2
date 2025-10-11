import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useOutsideClick } from '../hooks/use-outside-click';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  extendedContent: string;
  ctaText: string;
  closeText: string;
  onCtaClick: () => void;
  gradient: string;
  language?: 'tr' | 'en';
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  title,
  extendedContent,
  ctaText,
  closeText,
  onCtaClick,
  gradient,
  language = 'tr'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useOutsideClick(modalRef, () => {
    if (isOpen) onClose();
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      startSpeech();
    } else {
      document.body.style.overflow = 'unset';
      stopSpeech();
    }

    return () => {
      document.body.style.overflow = 'unset';
      stopSpeech();
    };
  }, [isOpen]);

  const startSpeech = () => {
    if ('speechSynthesis' in window) {
      stopSpeech();

      const utterance = new SpeechSynthesisUtterance(extendedContent);
      utterance.lang = language === 'tr' ? 'tr-TR' : 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;

      const sentences = extendedContent.split(/[.!?]\s+/).filter(s => s.trim());
      let currentIndex = 0;

      utterance.onboundary = (event) => {
        if (event.name === 'sentence') {
          if (currentIndex < sentences.length) {
            setCurrentSubtitle(sentences[currentIndex]);
            currentIndex++;
          }
        }
      };

      utterance.onstart = () => {
        setIsSpeaking(true);
        if (sentences.length > 0) {
          setCurrentSubtitle(sentences[0]);
        }
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentSubtitle('');
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentSubtitle('');
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSubtitle('');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        stopSpeech();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden"
          >
            <div className="sticky top-0 z-10 bg-black/60 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 hover:scale-110"
                aria-label={closeText}
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 md:p-8">
              <div className={`w-full h-2 bg-gradient-to-r ${gradient} rounded-full mb-6`}></div>

              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {extendedContent}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  {closeText}
                </button>
                <button
                  onClick={() => {
                    onCtaClick();
                    onClose();
                  }}
                  className={`px-6 py-3 bg-gradient-to-r ${gradient} text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  {ctaText}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {isSpeaking && currentSubtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md border-t border-white/10 px-6 py-4"
                >
                  <p className="text-white text-center text-lg leading-relaxed">
                    {currentSubtitle}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
