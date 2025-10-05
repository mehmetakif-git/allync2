import React from 'react';
import { ShoppingCart, Monitor, Smartphone, Target, Wifi, Cloud, Palette, Wrench } from 'lucide-react';
import { translations } from '../utils/translations';
import { Contact } from './Contact';
import { Footer } from './Footer';

interface DigitalSolutionsProps {
  language: 'tr' | 'en';
}

export const DigitalSolutions: React.FC<DigitalSolutionsProps> = ({ language }) => {
  const t = translations[language];

  const services = [
    {
      icon: ShoppingCart,
      title: t.eCommerceWebsites,
      description: t.eCommerceWebsitesDesc,
      benefits: t.eCommerceWebsitesBenefits,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Monitor,
      title: t.corporateWebsites,
      description: t.corporateWebsitesDesc,
      benefits: t.corporateWebsitesBenefits,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Smartphone,
      title: t.mobileAppDevelopment,
      description: t.mobileAppDevelopmentDesc,
      benefits: t.mobileAppDevelopmentBenefits,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Target,
      title: t.digitalMarketing,
      description: t.digitalMarketingDesc,
      benefits: t.digitalMarketingBenefits,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Wifi,
      title: t.iotSolutions,
      description: t.iotSolutionsDesc,
      benefits: t.iotSolutionsBenefits,
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Cloud,
      title: t.cloudSolutions,
      description: t.cloudSolutionsDesc,
      benefits: t.cloudSolutionsBenefits,
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Palette,
      title: t.uiuxDesign,
      description: t.uiuxDesignDesc,
      benefits: t.uiuxDesignBenefits,
      gradient: 'from-fuchsia-500 to-purple-600'
    },
    {
      icon: Wrench,
      title: t.maintenanceSupport,
      description: t.maintenanceSupportDesc,
      benefits: t.maintenanceSupportBenefits,
      gradient: 'from-gray-500 to-gray-700'
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t.digitalSolutionTitle}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              {t.digitalSolutionSubtitle}
            </p>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-green-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-green-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              {t.getConsultation}
            </button>
          </div>

          <div className="space-y-32">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isOdd = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col ${isOdd ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                  style={{
                    animation: 'fade-in-up 0.8s ease-out',
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="flex-1 w-full">
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                      <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {service.title}
                      </h2>

                      <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                        {service.description}
                      </p>

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

                      <button
                        onClick={scrollToContact}
                        className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                      >
                        {t.requestCustomQuote}
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="visual-mockup-placeholder h-72 lg:h-96 w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden relative group hover:border-white/20 transition-all duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                      <div className="relative z-10 text-center">
                        <Icon className="w-24 h-24 text-gray-600 mb-4 mx-auto" />
                        <p className="text-gray-500 text-sm font-medium">Visual Placeholder</p>
                        <p className="text-gray-600 text-xs mt-2">{service.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-32 text-center">
            <button
              onClick={scrollToContact}
              className="px-12 py-5 bg-gradient-to-r from-cyan-600 to-green-600 text-white text-lg font-bold rounded-lg hover:from-cyan-700 hover:to-green-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              {t.getStarted}
            </button>
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
          margin: 80px 0;
        }
      `}</style>
    </div>
  );
};
