import React from 'react';
import { Check, Zap, Star, MessageCircle } from 'lucide-react';
import { translations } from '../utils/translations';

interface PricingProps {
  language: 'tr' | 'en';
}

export const Pricing: React.FC<PricingProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section className="py-20 relative dynamic-bg">
      {/* Background Effects */}
      <div className="wave-gradient"></div>
      <div className="logo-watermark" style={{ fontSize: '15rem', opacity: 0.03 }}>A</div>
      
      {/* Background Effects */}
      <div className="wave-gradient"></div>
      <div className="logo-watermark" style={{ fontSize: '15rem', opacity: 0.03 }}>A</div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 section-reveal">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-500/20 to-gray-400/20 border border-gray-500/30 mb-6">
            <Star className="w-4 h-4 text-gray-300 mr-2" />
            <span className="text-sm text-gray-300 font-medium">{t.customSolutions}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.pricingTitle}
            <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent block">
              {t.pricingSubtitle}
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Pricing Card */}
          <div className="relative scale-in">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-2 rounded-full text-white font-semibold text-sm border border-gray-500">
                🚀 {language === 'tr' ? 'En Popüler' : 'Most Popular'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl holographic-shimmer">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {language === 'tr' ? 'WhatsApp AI Asistanı' : 'WhatsApp AI Assistant'}
                </h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="text-center">
                    <span className="text-4xl md:text-5xl font-bold text-white">{t.contactForPricing}</span>
                    <p className="text-gray-400 mt-2">{t.customSolutionsDesc}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-gray-300 mr-2" />
                    {t.whatsIncluded}
                  </h4>
                  {[
                    t.customAISetup,
                    t.whatsappIntegration,
                    t.unlimitedConversations,
                    t.customerSupportAutomation,
                    t.appointmentBookingSystem,
                    t.customerDatabaseManagement,
                    t.dailyExcelReports,
                    t.customTrainingData
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Star className="w-5 h-5 text-gray-400 mr-2" />
                    {t.bonusFeatures}
                  </h4>
                  {[
                    t.advancedDashboard,
                    t.multiLanguageSupport,
                    t.systemIntegration,
                    t.customWorkflow,
                    t.brandPersonality,
                    t.prioritySupport,
                    t.moneyBackGuarantee,
                    t.freeSetupOnboarding
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full btn-premium btn-glow btn-ripple px-8 py-4 rounded-lg font-bold text-white text-lg mb-4 magnetic card-depth"
                >
                  <MessageCircle className="w-5 h-5 inline mr-2" />
                  {t.requestFreeDemo}
                </button>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                    {language === 'tr' ? 'SSL Güvenli' : 'SSL Secured'}
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-500 rounded-full mr-2"></div>
                    {language === 'tr' ? '30 Gün Garanti' : '30-Day Guarantee'}
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-600 rounded-full mr-2"></div>
                    {language === 'tr' ? 'Anında Erişim' : 'Instant Access'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="mt-16 text-center fade-in-up">
            <div className="bg-gradient-to-r from-gray-500/10 to-gray-400/10 border border-gray-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">{t.calculateROI}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-gray-300">$5,000+</p>
                  <p className="text-gray-400">{t.monthlySavings}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-400">50%</p>
                  <p className="text-gray-400">{t.moreAppointments}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-500">24/7</p>
                  <p className="text-gray-400">{t.neverMissCustomer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};