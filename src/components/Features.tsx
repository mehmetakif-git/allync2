import React, { useState, useEffect } from 'react';
import { Brain, Database, FileText, Settings, Clock, Shield, ChevronDown, BarChart3, Activity, CheckCircle } from 'lucide-react';
import { translations } from '../utils/translations';

interface FeaturesProps {
  language: 'tr' | 'en';
}

export const Features: React.FC<FeaturesProps> = ({ language }) => {
  const t = translations[language];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: language === 'tr' ? 'AI asistanı ne kadar sürede kurulur?' : 'How long does it take to set up the AI assistant?',
      answer: language === 'tr' 
        ? 'Kurulum süreci genellikle 24-48 saat içinde tamamlanır. Bu süre içinde AI asistanınız şirketinizin verilerini öğrenir ve test edilir.'
        : 'The setup process is typically completed within 24-48 hours. During this time, your AI assistant learns your company data and is tested.'
    },
    {
      question: language === 'tr' ? 'Mevcut sistemlerimle entegre olur mu?' : 'Does it integrate with my existing systems?',
      answer: language === 'tr'
        ? 'Evet, CRM, ERP, e-ticaret platformları ve diğer iş uygulamalarınızla sorunsuz entegre olur. API desteği ile özel entegrasyonlar da mümkündür.'
        : 'Yes, it seamlessly integrates with CRM, ERP, e-commerce platforms, and other business applications. Custom integrations are also possible with API support.'
    },
    {
      question: language === 'tr' ? 'Verilerim güvende mi?' : 'Is my data secure?',
      answer: language === 'tr'
        ? 'Verileriniz ISO 27001 sertifikalı sunucularda, end-to-end şifreleme ile korunur. GDPR ve diğer veri koruma yasalarına tam uyumluyuz.'
        : 'Your data is protected on ISO 27001 certified servers with end-to-end encryption. We are fully compliant with GDPR and other data protection laws.'
    },
    {
      question: language === 'tr' ? 'Kaç dil destekliyor?' : 'How many languages does it support?',
      answer: language === 'tr'
        ? '50+ dilde hizmet verebilir. Türkçe, İngilizce, Almanca, Fransızca, İspanyolca ve daha birçok dil için optimize edilmiştir.'
        : 'It can serve in 50+ languages. Optimized for Turkish, English, German, French, Spanish, and many more languages.'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: t.learningAI,
      description: t.learningAIDesc,
      benefits: t.learningAIBenefits,
      details: language === 'tr' 
        ? 'AI asistanınız şirketinizin SSS\'lerini, ürün katalogunu ve hizmet bilgilerini öğrenir. Her müşteri etkileşimi ile daha akıllı hale gelir ve daha doğru yanıtlar verir.'
        : 'Your AI assistant learns your company\'s FAQs, product catalog, and service information. It becomes smarter with each customer interaction and provides more accurate responses.'
    },
    {
      icon: Database,
      title: t.databaseManagement,
      description: t.databaseManagementDesc,
      benefits: t.databaseManagementBenefits,
      details: language === 'tr'
        ? 'Her konuşmadan müşteri bilgilerini otomatik olarak çıkarır ve düzenler. CRM sisteminizle entegre olarak müşteri profillerini oluşturur ve günceller.'
        : 'Automatically extracts and organizes customer information from every conversation. Integrates with your CRM system to create and update customer profiles.'
    },
    {
      icon: FileText,
      title: t.excelReports,
      description: t.excelReportsDesc,
      benefits: t.excelReportsBenefits,
      details: language === 'tr'
        ? 'Günlük, haftalık ve aylık raporlar otomatik olarak oluşturulur. Mevcut sistemlerinizle entegre olarak veri akışını kesintisiz hale getirir.'
        : 'Daily, weekly, and monthly reports are automatically generated. Integrates with your existing systems for seamless data flow.'
    },
    {
      icon: Settings,
      title: t.fullCustomization,
      description: t.fullCustomizationDesc,
      benefits: t.fullCustomizationBenefits,
      details: language === 'tr'
        ? 'AI asistanınızın kişiliği, yanıt tarzı ve iş akışları tamamen özelleştirilebilir. Markanızın sesini ve değerlerini yansıtır.'
        : 'Your AI assistant\'s personality, response style, and workflows are fully customizable. Reflects your brand\'s voice and values.'
    },
    {
      icon: Clock,
      title: t.availability247,
      description: t.availability247Desc,
      benefits: t.availability247Benefits,
      details: language === 'tr'
        ? 'Gece yarısı, hafta sonu, tatil günleri - AI asistanınız hiç durmaz. Küresel müşterilerinize farklı zaman dilimlerinde hizmet verir.'
        : 'Midnight, weekends, holidays - your AI assistant never stops. Serves your global customers across different time zones.'
    },
    {
      icon: Shield,
      title: t.secureReliable,
      description: t.secureReliableDesc,
      benefits: t.secureReliableBenefits,
      details: language === 'tr'
        ? 'Kurumsal düzeyde güvenlik protokolleri, veri şifreleme ve GDPR uyumluluğu. %99.9 çalışma süresi garantisi ile güvenilir hizmet.'
        : 'Enterprise-grade security protocols, data encryption, and GDPR compliance. Reliable service with 99.9% uptime guarantee.'
    }
  ];

  return (
    <section className="py-8 md:py-16 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.featuresTitle}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.featuresSubtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="mb-8 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <div
                  key={index}
                  className="group rounded-xl glass bg-white/5 border border-gray-600 hover:bg-white/8 transition-all duration-300 p-6"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r from-gray-700 to-gray-600">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">{feature.details}</p>
                  <ul className="space-y-1">
                    {feature.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="mb-8 md:mb-20 holographic-shimmer">
          <div className="text-center mb-6 md:mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              {language === 'tr' ? 'Önce vs Sonra' : 'Before vs After'}
            </h3>
            <p className="text-gray-400">
              {language === 'tr' 
                ? 'Manuel süreçler ile AI otomasyonu arasındaki fark'
                : 'The difference between manual processes and AI automation'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="glass bg-white/5 border border-gray-600 rounded-2xl p-8 fade-in-left">
              <h4 className="text-xl font-bold text-white mb-6 text-center">
                {language === 'tr' ? '❌ Manuel Süreç' : '❌ Manual Process'}
              </h4>
              
              <div className="space-y-4">
                {[
                  { metric: language === 'tr' ? 'Yanıt süresi' : 'Response time', value: '5-30 dakika', color: 'text-gray-500' },
                  { metric: language === 'tr' ? 'Çalışma saatleri' : 'Working hours', value: '9:00-18:00', color: 'text-gray-500' },
                  { metric: language === 'tr' ? 'Kaçırılan sorgu' : 'Missed inquiries', value: '%30', color: 'text-gray-500' },
                  { metric: language === 'tr' ? 'İnsan hatası' : 'Human error', value: '%15', color: 'text-gray-500' },
                  { metric: language === 'tr' ? 'Aylık maliyet' : 'Monthly cost', value: `$${(roiInputs.employees * roiInputs.hourlyWage * roiInputs.hoursPerDay * 22).toLocaleString()}`, color: 'text-gray-500' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400">{item.metric}</span>
                    <span className={`font-semibold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="glass bg-white/5 border border-gray-600 rounded-2xl p-8 fade-in-right">
              <h4 className="text-xl font-bold text-white mb-6 text-center">
                {language === 'tr' ? '✅ AI Otomasyonu' : '✅ AI Automation'}
              </h4>
              
              <div className="space-y-4">
                {[
                  { metric: language === 'tr' ? 'Yanıt süresi' : 'Response time', value: '2 saniye', color: 'text-white' },
                  { metric: language === 'tr' ? 'Çalışma saatleri' : 'Working hours', value: '7/24', color: 'text-white' },
                  { metric: language === 'tr' ? 'Kaçırılan sorgu' : 'Missed inquiries', value: '%0', color: 'text-white' },
                  { metric: language === 'tr' ? 'İnsan hatası' : 'Human error', value: '%0', color: 'text-white' },
                  { metric: language === 'tr' ? 'Aylık maliyet' : 'Monthly cost', value: '$0', color: 'text-white' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-500/10 to-gray-400/10 rounded-lg border border-gray-500/20">
                    <span className="text-gray-300">{item.metric}</span>
                    <span className={`font-semibold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8 md:mb-20 scan-reveal">
          <div className="text-center mb-6 md:mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              {language === 'tr' ? 'Sık Sorulan Sorular' : 'Frequently Asked Questions'}
            </h3>
            <p className="text-gray-400">
              {language === 'tr' 
                ? 'Merak ettiğiniz soruların yanıtları'
                : 'Answers to your most common questions'
              }
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="glass bg-white/5 border border-gray-600 rounded-xl overflow-hidden card-slide-up"
                   style={{ animationDelay: `${index * 0.1}s` }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-white">{faq.question}</h4>
                  <ChevronDown className={`w-5 h-5 text-gray-400 accordion-arrow ${expandedFaq === index ? 'open' : ''}`} />
                </button>
                <div className={`accordion-content ${expandedFaq === index ? 'open' : ''}`}>
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="text-center particle-burst">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="trust-badge glass bg-white/5 border border-gray-600 rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-300 font-semibold">ISO 27001</p>
              <p className="text-xs text-gray-500">Certified</p>
            </div>
            <div className="trust-badge glass bg-white/5 border border-gray-600 rounded-lg p-4 text-center">
              <CheckCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300 font-semibold">GDPR</p>
              <p className="text-xs text-gray-500">Compliant</p>
            </div>
            <div className="trust-badge glass bg-white/5 border border-gray-600 rounded-lg p-4 text-center">
              <Activity className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-300 font-semibold">SOC 2</p>
              <p className="text-xs text-gray-500">Type II</p>
            </div>
            <div className="trust-badge glass bg-white/5 border border-gray-600 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-300 font-semibold">99.9%</p>
              <p className="text-xs text-gray-500">SLA Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};