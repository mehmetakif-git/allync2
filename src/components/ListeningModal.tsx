import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';

// Arayüzler ve SoundWaveVisualizer component'i aynı kalıyor...
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
          animate={{ height: ['20%', '100%', '20%'] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
        />
      ))}
    </div>
  );
};


// --- ASIL DEĞİŞİKLİK BURADA BAŞLIYOR ---

// Animasyon adımlarını temiz bir şekilde tanımlıyoruz
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    borderRadius: '100%',
    filter: 'saturate(200%) contrast(150%)',
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    borderRadius: '24px', // rounded-3xl
    filter: 'saturate(100%) contrast(100%)',
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96], // Bu, "smooth" hissi veren özel bir eğri
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    borderRadius: '100%',
    filter: 'saturate(200%) contrast(150%)',
    y: 50,
    transition: {
      duration: 0.5, // Kapanış biraz daha hızlı olabilir
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

export const ListeningModal: React.FC<ListeningModalProps> = ({ service, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  // Diğer hook'lar ve useEffect'ler aynı kalıyor...
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // İçeriğin, ana animasyon bittikten sonra gelmesini sağlıyoruz
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // Animasyon süresine göre ayarlandı
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  return (
    // Dış katman artık animasyona KARIŞMIYOR. Sadece konumlandırma yapıyor.
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
      {/* Arka planın kendi basit animasyonu var, bu sorun değil */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      />

      {/* TÜM ANİMASYONUN PATRONU OLAN ANA KART */}
      <motion.div
        // Tanımladığımız animasyon adımlarını buraya veriyoruz
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        // Senin attığın class'lar burada
        className="relative z-10 w-full max-w-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 p-8 md:p-12"
        style={{
          boxShadow: `0 0 60px ${service.glowColor || '#ffffff'}40, inset 0 0 40px ${service.glowColor || '#ffffff'}10`,
        }}
      >
        {/* İçerik, ana animasyon bittikten sonra belirecek */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="text-center">
                <div
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-white/20 to-white/5 rounded-full flex items-center justify-center"
                  style={{ boxShadow: `0 0 40px ${service.glowColor || '#ffffff'}40` }}
                >
                  <Volume2 className="w-12 h-12 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {service.title}
                </h2>
                <div className="mb-8">
                  {service.audioSrc ? (
                    <div> {/* Ses oynatıcı içeriği */} </div>
                  ) : (
                    <div className="py-8">
                      <SoundWaveVisualizer color={service.glowColor} />
                      <p className="text-gray-400 mt-6 text-lg">
                        Audio experience coming soon...
                      </p>
                    </div>
                  )}
                </div>
                {/* Altyazı içeriği */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};