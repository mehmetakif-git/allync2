import React from 'react';
import { Check, Star, Zap, Eye, Mic, FileText, Heart, Sparkles, Phone, Mail, MessageCircle } from 'lucide-react';
import { translations } from '../utils/translations';
import logoSvg from '/logo.svg';

interface PackagesBrochureProps {
  language: 'tr' | 'en';
}

export const PackagesBrochure: React.FC<PackagesBrochureProps> = ({ language }) => {
  const t = translations[language];

  const renderBasicPlan = () => (
    <div className="package-card bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <span className="text-green-300 font-semibold">BASIC PLAN</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t.basicPlan}</h2>
        <p className="text-gray-400">{t.basicPlanDesc}</p>
      </div>

      <div className="space-y-4 mb-8">
        {t.basicPlanFeatures.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">
              {feature}
              {(feature.includes('Multi-Language') || feature.includes('Çok Dilli') || feature.includes('ISO')) && (
                <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                  HIGHLIGHT
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-300">
          {t.chooseBasicPlan}
        </button>
      </div>
    </div>
  );

  const renderProPlan = () => (
    <div className="package-card bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-4">
          <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
          <span className="text-purple-300 font-semibold">PRO PLAN</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t.proPlan}</h2>
        <p className="text-gray-400">{t.proPlanDesc}</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 italic">
          {language === 'tr' ? 'Basic Plan özelliklerine ek olarak:' : 'In addition to Basic Plan features:'}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {t.proPlanFeatures.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">
              {feature}
              {(feature.includes('Multi-Language') || feature.includes('Çok Dilli') || feature.includes('ISO')) && (
                <span className="ml-2 px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                  HIGHLIGHT
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300">
          {t.chooseProPlan}
        </button>
      </div>
    </div>
  );

  const renderPremiumPlan = () => (
    <div className="package-card bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-4">
          <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
          <span className="text-red-300 font-semibold">PREMIUM / ENTERPRISE</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t.premiumPlan}</h2>
        <p className="text-gray-400">{t.premiumPlanDesc}</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 italic">
          {language === 'tr' ? 'Basic + Pro özelliklerine ek olarak:' : 'In addition to Basic + Pro features:'}
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {t.premiumPlanFeatures.map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">
              {feature}
              {(feature.includes('Multi-Language') || feature.includes('Çok Dilli') || feature.includes('ISO')) && (
                <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                  HIGHLIGHT
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-300">
          {t.choosePremiumPlan}
        </button>
      </div>
    </div>
  );

  const renderAddonPlan = () => (
    <div className="package-card bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-500/30 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
          <span className="text-yellow-300 font-semibold">ADD-ON PACKAGE</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t.addonPlan}</h2>
        <p className="text-gray-400">{t.addonPlanDesc}</p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="space-y-3">
          <div className="flex items-center">
            <Mic className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">{t.voiceAI}</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• {t.voiceAIDesc}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <Eye className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">{t.visionAI}</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• {t.visionAIDesc}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">{t.docAI}</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• {t.docAIDesc}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <Heart className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">{t.emotionAI}</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• {t.emotionAIDesc}</p>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">✨ {t.customRequestFlexibility}</h3>
          <p className="text-gray-300 text-sm mb-2">• {t.customRequestFlexibilityDesc}</p>
          <p className="text-yellow-300 text-sm font-semibold">• {t.beyondHumanAutomation}</p>
        </div>
      </div>

      <div className="text-center space-y-4">
        <button 
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors duration-300">
          {t.addAddonPackage}
        </button>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center text-gray-400">
            <Phone className="w-4 h-4 mr-2" />
            <span className="text-sm">+974 123 456 789</span>
          </div>
          <div className="flex items-center text-gray-400">
            <Mail className="w-4 h-4 mr-2" />
            <span className="text-sm">info@allync.com.tr</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="packages-section">
      <div className="packages-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.packagesTitle}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t.packagesSubtitle}
          </p>
        </div>

        <div className="packages-grid">
          {renderBasicPlan()}
          {renderProPlan()}
          {renderPremiumPlan()}
          {renderAddonPlan()}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t.whichPackageSuits}
            </h3>
            <p className="text-gray-400 mb-6">
              {t.talkToExperts}
            </p>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-premium btn-glow btn-ripple px-8 py-4 rounded-lg font-semibold text-white flex items-center justify-center mx-auto"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t.getFreeConsultation}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};