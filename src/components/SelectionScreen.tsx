import React, { useState } from 'react';
import { Zap, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { translations } from '../utils/translations';

interface SelectionScreenProps {
  language: 'tr' | 'en';
  onSelectView: (view: 'ai-view' | 'digital-view') => void;
  onLanguageToggle: () => void;
}

const titleVariants = {
  tr: [
    "Çözümlerinizi Seçin",
    "Hangi Hizmeti İstersiniz?",
    "Size Nasıl Yardımcı Olabiliriz?",
    "İhtiyacınız Olan Nedir?",
    "Dijital Dönüşümünüz Başlasın"
  ],
  en: [
    "Choose Your Solutions",
    "Which Service Do You Need?",
    "How Can We Help You?",
    "What Do You Need?",
    "Start Your Digital Transformation"
  ]
};

export const SelectionScreen: React.FC<SelectionScreenProps> = ({ language, onSelectView, onLanguageToggle }) => {
  const t = translations[language];

  const [currentTitle] = useState(() => {
    const titles = titleVariants[language];
    return titles[Math.floor(Math.random() * titles.length)];
  });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <button
        onClick={onLanguageToggle}
        className="absolute top-8 right-8 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all z-20"
      >
        {language === 'tr' ? 'EN' : 'TR'}
      </button>

      <div className="relative z-10 max-w-6xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-white mb-16"
        >
          {currentTitle}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <button
            onClick={() => onSelectView('ai-view')}
            className="group relative bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-scale-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                {t.aiPillarTitle}
              </h2>

              <p className="text-xl text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {t.aiPillarSlogan}
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectView('digital-view')}
            className="group relative bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 animate-scale-in"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-green-600/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500">
                <Code className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                {t.digitalPillarTitle}
              </h2>

              <p className="text-xl text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {t.digitalPillarSlogan}
              </p>
            </div>
          </button>
        </div>
      </div>

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

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};
