import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';

interface Service {
  title: string;
  audioSrc?: string;
  subtitles?: Array<{ start: number; text: string }>;
  glowColor?: string;
}

interface ListeningModalProps {
  service: Service;
  onClose: () => void;
}

const SoundWaveVisualizer: React.FC<{ color?: string }> = ({ color = '#ffffff' }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-20">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-white rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            height: ['20%', '100%', '20%'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

export const ListeningModal: React.FC<ListeningModalProps> = ({ service, onClose }) => {
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleTimeUpdate = () => {
    if (!audioRef.current || !service.subtitles) return;

    const currentTime = audioRef.current.currentTime;
    const activeSubtitle = service.subtitles
      .slice()
      .reverse()
      .find((sub) => currentTime >= sub.start);

    if (activeSubtitle) {
      setCurrentSubtitle(activeSubtitle.text);
    } else {
      setCurrentSubtitle('');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100000] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative z-10 w-full max-w-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-12"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center"
              style={{
                boxShadow: `0 0 40px ${service.glowColor || '#ffffff'}40`,
              }}
            >
              <Volume2 className="w-12 h-12 text-white" strokeWidth={1.5} />
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {service.title}
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              {service.audioSrc ? (
                <div>
                  <audio
                    ref={audioRef}
                    src={service.audioSrc}
                    controls
                    autoPlay
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full"
                    style={{
                      filter: 'brightness(0.9) contrast(1.1)',
                    }}
                  />
                </div>
              ) : (
                <div className="py-8">
                  <SoundWaveVisualizer color={service.glowColor} />
                  <p className="text-gray-400 mt-6 text-lg">
                    Audio experience coming soon...
                  </p>
                </div>
              )}
            </motion.div>

            {service.subtitles && service.subtitles.length > 0 && currentSubtitle && (
              <motion.div
                key={currentSubtitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="min-h-[80px] flex items-center justify-center"
              >
                <p className="text-xl text-white font-medium px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                  {currentSubtitle}
                </p>
              </motion.div>
            )}

            {(!service.subtitles || service.subtitles.length === 0) && (
              <div className="min-h-[80px] flex items-center justify-center">
                <p className="text-gray-500 text-sm">
                  Subtitles will appear here during playback
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
