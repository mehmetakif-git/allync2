import React, { useState, useRef, useEffect } from 'react';
import { Video as LucideIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlowingEffect } from '../ui/GlowingEffect';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { ServiceDetailModal } from '../ServiceDetailModal';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
  extendedContent: string;
  galleryImages: string[];
  glowColor?: string;
}

interface ServiceCardProps {
  service: Service;
  language: 'tr' | 'en';
  isOdd: boolean;
  index: number;
  onDetailClick: () => void;
  onContactClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  language,
  isOdd,
  index,
  onDetailClick,
  onContactClick
}) => {
  const Icon = service.icon;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, () => setExpandedIndex(null));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedIndex === null) return;
      if (e.key === 'Escape') setExpandedIndex(null);
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => prev === 0 ? service.galleryImages.length - 1 : prev - 1);
      if (e.key === 'ArrowRight') setCurrentIndex(prev => prev === service.galleryImages.length - 1 ? 0 : prev + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedIndex, service.galleryImages.length]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (expandedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [expandedIndex]);

  const handleThumbnailClick = (idx: number) => {
    setExpandedIndex(idx);
    setCurrentIndex(idx);
  };

  return (
    <div
      className={`flex flex-col ${isOdd ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
    >
      <div className="flex-1 w-full">
        <div className="w-full">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 w-full h-full relative">
            <GlowingEffect
              color={service.glowColor}
              blur={20}
              borderWidth={1.8}
              spread={100}
              glow={false}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              movementDuration={2}
            />
            <div className="w-full">
              <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {service.title}
              </h2>
            </div>

            <div className="w-full">
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="w-full">
              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {language === 'tr' ? 'Temel Özellikler' : 'Key Benefits'}
                </h3>
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mt-2 mr-3 flex-shrink-0`}></div>
                    <p className="text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    if (isDesktop) {
                      setIsModalOpen(true);
                    } else {
                      onDetailClick();
                    }
                  }}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-lg hover:scale-105 transition-transform`}
                >
                  {language === 'tr' ? 'Daha Detaylı İncele' : 'View More Details'}
                </button>
                <button
                  onClick={onContactClick}
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
                >
                  {language === 'tr' ? 'Özel Teklif İsteyin' : 'Request Custom Quote'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 w-full h-full relative pointer-events-auto cursor-pointer overflow-hidden">
          <GlowingEffect
            color={service.glowColor}
            blur={0}
            borderWidth={1}
            spread={80}
            glow={false}
            disabled={false}
            proximity={0}
            inactiveZone={0.7}
            movementDuration={2}
          />
          <div className="relative z-10 w-full h-full aspect-video">
            {service.galleryImages && service.galleryImages.length > 0 ? (
              <motion.button
                layoutId={`gallery-${service.title}-0`}
                onClick={() => handleThumbnailClick(0)}
                className="w-full h-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center cursor-pointer overflow-hidden relative group hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={service.galleryImages[0]}
                  alt={`${service.title} preview`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                  <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {language === 'tr' ? 'Galeriyi Görüntüle' : 'View Gallery'}
                  </p>
                </div>
              </motion.button>
            ) : (
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <p className="text-gray-500">{language === 'tr' ? 'Görsel Yok' : 'No Image'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {expandedIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99998]"
            />
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-6xl transform-gpu"
              >
                <button
                  onClick={() => setExpandedIndex(null)}
                  className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all z-[100000]"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <motion.div
                  layoutId={`gallery-${service.title}-${expandedIndex}`}
                  className="aspect-video bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center relative overflow-hidden group"
                >
                  <img
                    src={service.galleryImages[currentIndex]}
                    alt={`${service.title} preview`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:blur-sm transition-all duration-300"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-3xl font-bold">{service.galleryImages[currentIndex]}</p>
                    <p className="text-gray-300 text-base mt-2">{language === 'tr' ? 'Görsel' : 'Image'} {currentIndex + 1} / {service.galleryImages.length}</p>
                  </div>
                </motion.div>

                {service.galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentIndex(prev => prev === 0 ? service.galleryImages.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => setCurrentIndex(prev => prev === service.galleryImages.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                <div className="flex gap-2 mt-8 justify-center overflow-x-auto pb-4">
                  {service.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg bg-white/5 border-2 flex items-center justify-center transition-all ${
                        idx === currentIndex ? 'border-white scale-110' : 'border-white/20 hover:border-white/40'
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

      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={service.title}
        extendedContent={service.extendedContent}
        gradient={service.gradient}
        ctaText={language === 'tr' ? 'Özel Teklif İsteyin' : 'Request Custom Quote'}
        onCtaClick={onContactClick}
      />
    </div>
  );
};
