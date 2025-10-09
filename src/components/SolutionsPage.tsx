import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video as LucideIcon } from 'lucide-react';
import { translations } from '../utils/translations';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { ServiceCard } from './common/ServiceCard';
import { LayoutTextFlip } from './ui/LayoutTextFlip';
import { ShinyText } from './ui/ShinyText';

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
  extendedContent: string;
  galleryImages: string[];
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
  const ctaRef = useRef<HTMLDivElement>(null);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <div className="min-h-screen">
      <div className="pt-20 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <div className="flex flex-col items-center justify-center mb-4 md:mb-6">
              <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 text-center">
                <LayoutTextFlip
                  text={pageTitle}
                  words={flipWords}
                  duration={3000}
                  containerClassName={pageTitle === "Allync AI"
                    ? ["bg-purple-600", "bg-pink-600", "bg-indigo-600", "bg-fuchsia-600"]
                    : ["bg-cyan-600", "bg-green-600", "bg-teal-600", "bg-emerald-600"]
                  }
                />
              </motion.div>
            </div>
            <ShinyText text={pageSubtitle} className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-6 md:mb-8 px-4" />
          </div>

          <div className="space-y-12 md:space-y-32">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <ServiceCard
                  service={service}
                  language={language}
                  isOdd={index % 2 === 0}
                  index={index}
                  onDetailClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  onContactClick={scrollToContact}
                />

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      ref={(el) => (detailRefs.current[index] = el)}
                      layoutId={`expanded-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl overflow-hidden mt-4"
                    >
                      <div className="p-4 md:p-8 relative">
                        <button
                          onClick={() => setExpandedIndex(null)}
                          className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-xl md:text-2xl hover:text-gray-300 transition-colors z-10 p-2"
                        >
                          ✕
                        </button>
                        <div className="text-sm md:text-base text-gray-300 whitespace-pre-line leading-relaxed pr-8">
                          {service.extendedContent}
                        </div>
                        <button
                          onClick={() => {
                            scrollToContact();
                            setExpandedIndex(null);
                          }}
                          className={`mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-gradient-to-r ${service.gradient} text-white rounded-lg hover:scale-105 transition-all duration-300`}
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

          <div className="mt-16 md:mt-32 text-center">
            <motion.div
              ref={ctaRef}
              className="inline-block"
            >
              <button
                onClick={scrollToContact}
                className={`px-8 md:px-12 py-3 md:py-5 bg-gradient-to-r ${ctaButtonGradient} text-white text-base md:text-lg font-bold rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
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
