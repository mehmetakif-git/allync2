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
  // Bu component aynı kalıyor...
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
  const [showContent, setShowContent] = useState(false);
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
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);
  
  // handleTimeUpdate fonksiyonu aynı kalıyor...
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
    // Bu dış katmanın GÖREVİ SADECE arka planı yönetmek. Opacity'yi ona bırakmıyoruz.
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
      {/* Arka plan animasyonu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute inset-0 backdrop-blur-xl bg-black/70"
        onClick={onClose}
      />

      {/* Asıl modal ve onun TÜM animasyonları */}
      <motion.div
        // layoutId="dimension-shift" // Bunu önceki adımda kaldırmıştık, doğru olan bu.
        initial={{
          scale: 0.8,
          opacity: 0, // Kendi opacity'sini kendi yönetiyor
          borderRadius: '100%',
          filter: 'saturate(3) contrast(2)',
        }}
        animate={{
          scale: 1,
          opacity: 1,
          borderRadius: '24px',
          filter: 'saturate(1) contrast(1)',
          transition: {
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
          }
        }}
        exit={{
          scale: 0.8,
          opacity: 0, // Çıkarken de kendi opacity'sini kendi yönetiyor
          borderRadius: '100%',
          filter: 'saturate(3) contrast(2)',
          transition: {
            duration: 0.6, // Kapanış biraz daha hızlı ve net olabilir
            ease: [0.43, 0.13, 0.23, 0.96],
          }
        }}
        className="relative z-10 w-full max-w-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 p-8 md:p-12"
        style={{
          boxShadow: `0 0 60px ${service.glowColor || '#ffffff'}40, inset 0 0 40px ${service.glowColor || '#ffffff'}10`,
        }}
      >
        {/* ...içerideki diğer kodlar tamamen aynı... */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: showContent ? 1 : 0,
            scale: showContent ? 1 : 0,
          }}
          // Çıkış animasyonu için `exit` ekliyoruz
          exit={{ opacity: 0, scale: 0 }}
          transition={{ delay: showContent ? 0.2 : 0, duration: 0.3 }}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* İçerik animasyonları */}
        <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            {/* ... Volume2 ikonu, h2 başlık ve diğer içerikler buraya ... */}
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center"
                  style={{ boxShadow: `0 0 40px ${service.glowColor || '#ffffff'}40` }}
            >
              <Volume2 className="w-12 h-12 text-white" strokeWidth={1.5} />
            </div >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {service.title}
            </h2>
            <div className="mb-8">
              {service.audioSrc ? (
                <div>...</div>
              ) : (
                <div className="py-8">
                  <SoundWaveVisualizer color={service.glowColor} />
                  <p className="text-gray-400 mt-6 text-lg">
                    Audio experience coming soon...
                  </p>
                </div>
              )}
            </div>
             {/* Subtitle logic ... */}
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};