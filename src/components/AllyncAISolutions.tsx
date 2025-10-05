import React from 'react';
import { MessageCircle, Instagram, Video, Image as ImageIcon, Mic, FileText, Play, Film, BarChart3, Sparkles } from 'lucide-react';
import { translations } from '../utils/translations';
import { Contact } from './Contact';
import { Footer } from './Footer';

interface AllyncAISolutionsProps {
  language: 'tr' | 'en';
}

export const AllyncAISolutions: React.FC<AllyncAISolutionsProps> = ({ language }) => {
  const t = translations[language];

  const services = [
    {
      icon: MessageCircle,
      title: t.waAutomation,
      description: t.waAutomationDesc,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Instagram,
      title: t.instagramAutomation,
      description: t.instagramAutomationDesc,
      gradient: 'from-pink-500 to-purple-600'
    },
    {
      icon: Video,
      title: t.textToVideo,
      description: t.textToVideoDesc,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: ImageIcon,
      title: t.textToImage,
      description: t.textToImageDesc,
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: Mic,
      title: t.voiceCloning,
      description: t.voiceCloningDesc,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: FileText,
      title: t.documentAI,
      description: t.documentAIDesc,
      gradient: 'from-gray-500 to-gray-700'
    },
    {
      icon: Play,
      title: t.imageToVideo,
      description: t.imageToVideoDesc,
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Film,
      title: t.videoToVideo,
      description: t.videoToVideoDesc,
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: BarChart3,
      title: t.dataAnalysisAI,
      description: t.dataAnalysisAIDesc,
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Sparkles,
      title: t.customAISolutions,
      description: t.customAISolutionsDesc,
      gradient: 'from-fuchsia-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t.aiSolutionTitle}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.aiSolutionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{
                    animation: 'fade-in-up 0.6s ease-out',
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-200 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>

                  <div className="visual-placeholder bg-white/5 border border-white/10 rounded-lg h-48 flex items-center justify-center text-gray-500 text-sm">
                    Visual Placeholder
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section-separator"></div>

      <Contact language={language} />

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
          margin: 80px 0;
        }
      `}</style>
    </div>
  );
};
