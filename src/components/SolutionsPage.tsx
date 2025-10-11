import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Video as LucideIcon } from 'lucide-react';
import { translations } from '../utils/translations';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { InteractiveServiceCard } from './common/InteractiveServiceCard';
import { ServiceCard } from './common/ServiceCard';
import { LayoutTextFlip } from './ui/LayoutTextFlip';
import { ShinyText } from './ui/ShinyText';
import { ListeningModal } from './ListeningModal';
import { ServiceDetailModal } from './ServiceDetailModal';
import { useMediaQuery } from '../hooks/useMediaQuery';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
  extendedContent: string;
  galleryImages: string[];
  glowColor?: string;
  audioSrc?: string;
  subtitles?: Array<{ start: number; text: string }>;
}

interface SolutionsPageProps {
  language: 'tr' | 'en';
  services: Service[];
  pageTitle: string;
  pageSubtitle: string;
  flipWords: string[];
  ctaButtonGradient: string;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  language,
  services,
  pageTitle,
  pageSubtitle,
  flipWords,
  ctaButtonGradient
}) => {
  const t = translations[language];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [modalService, setModalService] = useState<Service | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [detailModalService, setDetailModalService] = useState<Service | null>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (expandedIndex !== null && window.innerWidth < 768) {
      setTimeout(() => {
        detailRefs.current[expandedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [expandedIndex]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > threshold) {
      if (offset > 0 && currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
      } else if (offset < 0 && currentCardIndex < services.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      }
    }
  };

  const MobileCarousel = () => {
    return (
      <div className="relative w-full overflow-hidden">
        <div className="relative h-[600px] flex items-center">
          <AnimatePresence initial={false} mode="popLayout">
            {services.map((service, index) => {
              const Icon = service.icon;
              const offset = index - currentCardIndex;
              const isActive = index === currentCardIndex;

              if (Math.abs(offset) > 1) return null;

              return (
                <motion.div
                  key={index}
                  className="absolute w-full px-4"
                  initial={{ opacity: 0, x: offset * 100 + '%' }}
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    x: offset * 85 + '%',
                    scale: isActive ? 1 : 0.9,
                    zIndex: isActive ? 10 : 1,
                  }}
                  exit={{ opacity: 0, x: offset * 100 + '%' }}
                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                  }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                >
                  <div className="bg-white/5 backdrop-blur-[6px] border border-white/10 rounded-3xl p-4 w-full h-[550px] relative overflow-hidden flex flex-col">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">{service.title}</h2>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-4 flex-1 overflow-y-auto">
                      <h3 className="text-base font-semibold text-white mb-2">
                        {language === 'tr' ? 'Temel Özellikler' : 'Key Benefits'}
                      </h3>
                      {service.benefits.slice(0, 4).map((benefit, idx) => (
                        <div key={idx} className="flex items-start">
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mt-1.5 mr-2 flex-shrink-0`}
                            style={{
                              boxShadow: `0 0 6px ${service.glowColor}`,
                            }}
                          ></div>
                          <p className="text-xs text-gray-300 line-clamp-2">{benefit}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                      <button
                        onClick={() => setDetailModalService(service)}
                        className={`w-full px-4 py-2.5 bg-gradient-to-r ${service.gradient} text-white text-sm font-semibold rounded-lg`}
                        style={{
                          boxShadow: `0 0 12px ${service.glowColor}`,
                        }}
                      >
                        {language === 'tr' ? 'Detayları Görüntüle' : 'View Details'}
                      </button>
                      <button
                        onClick={scrollToContact}
                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-lg"
                      >
                        {language === 'tr' ? 'Özel Teklif İsteyin' : 'Request Custom Quote'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCardIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentCardIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const DesktopLayout = () => {
    return (
      <div className="space-y-32">
        {services.map((service, index) => (
          <div key={index} className="relative">
            <InteractiveServiceCard
              language={language}
              glowColor={service.glowColor}
              onHoldSuccess={() => setModalService(service)}
            >
              <ServiceCard
                service={service}
                language={language}
                isOdd={index % 2 === 0}
                index={index}
                onDetailClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                onContactClick={scrollToContact}
              />
            </InteractiveServiceCard>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  ref={(el) => (detailRefs.current[index] = el)}
                  layoutId={`expanded-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden mt-4"
                >
                  <div className="p-8 relative">
                    <button
                      onClick={() => setExpandedIndex(null)}
                      className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
                    >
                      ✕
                    </button>
                    <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                      {service.extendedContent}
                    </div>
                    <button
                      onClick={() => {
                        scrollToContact();
                        setExpandedIndex(null);
                      }}
                      className={`mt-6 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white rounded-lg hover:scale-105 transition-all duration-300`}
                    >
                      {t.requestCustomQuote}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex flex-col items-center justify-center mb-6">
              <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center overflow-hidden max-w-full px-4">
                <LayoutTextFlip
                  text={pageTitle}
                  words={flipWords}
                  duration={3000}
                  className="text-2xl md:text-6xl"
                  containerClassName={pageTitle === "Allync AI"
                    ? ["bg-purple-600", "bg-pink-600", "bg-indigo-600", "bg-fuchsia-600"]
                    : ["bg-cyan-600", "bg-green-600", "bg-teal-600", "bg-emerald-600"]
                  }
                />
              </motion.div>
            </div>
            <ShinyText text={pageSubtitle} className="text-xl text-gray-400 max-w-3xl mx-auto mb-8" />
          </div>

          {isMobile ? <MobileCarousel /> : <DesktopLayout />}

          <div className="mt-32 text-center">
            <motion.div
              ref={ctaRef}
              className="inline-block"
            >
              <button
                onClick={scrollToContact}
                className={`px-12 py-5 bg-gradient-to-r ${ctaButtonGradient} text-white text-lg font-bold rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
              >
                {t.getStarted}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="section-separator"></div>

      <div id="contact">
        <Contact language={language} />
      </div>

      <Footer language={language} />

      {modalService && (
        <ListeningModal
          service={modalService}
          onClose={() => setModalService(null)}
        />
      )}

      {detailModalService && (
        <ServiceDetailModal
          isOpen={true}
          onClose={() => setDetailModalService(null)}
          title={detailModalService.title}
          extendedContent={detailModalService.extendedContent}
          gradient={detailModalService.gradient}
          ctaText={language === 'tr' ? 'Özel Teklif İsteyin' : 'Request Custom Quote'}
          onCtaClick={() => {
            scrollToContact();
            setDetailModalService(null);
          }}
        />
      )}

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-separator {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
};
