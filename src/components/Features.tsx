import React, { useState, useEffect } from 'react';
import { Brain, Database, FileText, Settings, Clock, Shield, Calculator, TrendingUp, Users, Zap, ChevronDown, BarChart3, Activity, CheckCircle } from 'lucide-react';
import { translations } from '../utils/translations';

interface FeaturesProps {
  language: 'tr' | 'en';
}

export const Features: React.FC<FeaturesProps> = ({ language }) => {
  const t = translations[language];
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [roiInputs, setRoiInputs] = useState({
    employees: 2,
    hourlyWage: 15,
    hoursPerDay: 8
  });
  const [animatedStats, setAnimatedStats] = useState({
    conversations: 0,
    appointments: 0,
    responseTime: 0,
    satisfaction: 0
  });

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

  const faqData = [
    {
      question: language === 'tr' ? 'AI asistanı ne kadar sürede kurulur?' : 'How long does AI assistant setup take?',
      answer: language === 'tr' ? 'Kurulum süreci 24-48 saat içinde tamamlanır. Verilerinizi analiz eder, özelleştirmelerinizi yapar ve test ederiz.' : 'Setup process completes within 24-48 hours. We analyze your data, make customizations, and test everything.'
    },
    {
      question: language === 'tr' ? 'Hangi dilleri destekliyor?' : 'Which languages are supported?',
      answer: language === 'tr' ? 'Türkçe, İngilizce, Arapça ve 50+ dil desteği mevcuttur. Çoklu dil desteği ile global müşterilerinize hizmet verebilirsiniz.' : 'Turkish, English, Arabic and 50+ languages supported. Serve your global customers with multi-language support.'
    },
    {
      question: language === 'tr' ? 'Mevcut sistemlerle entegre olur mu?' : 'Does it integrate with existing systems?',
      answer: language === 'tr' ? 'CRM, ERP, takvim uygulamaları ve ödeme sistemleri ile entegre olur. API desteği ile özel entegrasyonlar da mümkündür.' : 'Integrates with CRM, ERP, calendar apps and payment systems. Custom integrations possible with API support.'
    },
    {
      question: language === 'tr' ? 'Veri güvenliği nasıl sağlanıyor?' : 'How is data security ensured?',
      answer: language === 'tr' ? 'End-to-end şifreleme, GDPR uyumluluğu ve ISO 27001 sertifikası ile verileriniz güvende. Düzenli güvenlik denetimleri yapılır.' : 'End-to-end encryption, GDPR compliance and ISO 27001 certification keeps your data safe. Regular security audits conducted.'
    }
  ];

  // Animated counters
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        conversations: prev.conversations < 2847 ? prev.conversations + 47 : 2847,
        appointments: prev.appointments < 156 ? prev.appointments + 3 : 156,
        responseTime: prev.responseTime < 0.3 ? Math.min(prev.responseTime + 0.01, 0.3) : 0.3,
        satisfaction: prev.satisfaction < 98.5 ? prev.satisfaction + 1.5 : 98.5
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // ROI Calculator
  const calculateROI = () => {
    const monthlyCost = roiInputs.employees * roiInputs.hourlyWage * roiInputs.hoursPerDay * 22; // 22 working days
    const aiCost = 2000; // One-time cost
    const monthlySavings = monthlyCost * 0.7; // 70% automation
    const paybackMonths = Math.ceil(aiCost / monthlySavings);
    const yearlyROI = ((monthlySavings * 12 - aiCost) / aiCost) * 100;

    return { monthlySavings, paybackMonths, yearlyROI };
  };

  const roi = calculateROI();

  return (
    <section className="py-16 bg-black relative" style={{ display: 'block', opacity: 1 }}>
      
      <div className="max-w-1200px mx-auto px-5 sm:px-6 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="text-center mb-16 section-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 fade-in-up text-glow">
            {t.featuresTitle}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.featuresSubtitle}</p>
        </div>

        {/* Business Intelligence Dashboard */}
        <div className="mb-20 fade-in-up">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              {language === 'tr' ? 'Gerçek Zamanlı İş Zekası' : 'Real-Time Business Intelligence'}
            </h3>
            <p className="text-gray-400">
              {language === 'tr' 
                ? 'AI asistanınızın performansını canlı olarak izleyin'
                : 'Monitor your AI assistant performance in real-time'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass bg-white/5 border border-gray-600 rounded-xl p-6 text-center card-depth counter-animate">
              <Activity className="w-8 h-8 text-white mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">{animatedStats.conversations.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">{language === 'tr' ? 'Günlük Mesaj' : 'Daily Messages'}</p>
              <div className="mt-2 text-xs text-gray-500">↗ +12% {language === 'tr' ? 'bu hafta' : 'this week'}</div>
            </div>
            
            <div className="glass bg-white/5 border border-gray-600 rounded-xl p-6 text-center card-depth counter-animate stagger-1">
              <Clock className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">{animatedStats.responseTime.toFixed(1)}s</p>
              <p className="text-gray-400 text-sm">{language === 'tr' ? 'Ortalama Yanıt' : 'Avg Response'}</p>
              <div className="mt-2 text-xs text-gray-500">↘ -0.2s {language === 'tr' ? 'bu ay' : 'this month'}</div>
            </div>
            
            <div className="glass bg-white/5 border border-gray-600 rounded-xl p-6 text-center card-depth counter-animate stagger-2">
              <Users className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">{animatedStats.satisfaction.toFixed(1)}%</p>
              <p className="text-gray-400 text-sm">{language === 'tr' ? 'Memnuniyet' : 'Satisfaction'}</p>
              <div className="mt-2 text-xs text-gray-500">↗ +2.1% {language === 'tr' ? 'bu ay' : 'this month'}</div>
            </div>
            
            <div className="glass bg-white/5 border border-gray-600 rounded-xl p-6 text-center card-depth counter-animate stagger-3">
              <CheckCircle className="w-8 h-8 text-gray-500 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-gray-400 text-sm">{language === 'tr' ? 'Çalışma Süresi' : 'Uptime'}</p>
              <div className="uptime-indicator mt-2">
                <div className="uptime-dot"></div>
                <span className="text-xs">{language === 'tr' ? 'Operasyonel' : 'Operational'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20 fade-in-up features-section">
          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <div
                  key={index}
                  className="feature-card group rounded-xl glass bg-white/5 border border-gray-600 hover:bg-white/8 transition-all duration-300 card-depth card-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-content">
                    <div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r from-gray-700 to-gray-600">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                    </div>
                    
                    <div>
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="mb-20 section-reveal">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              {language === 'tr' ? 'ROI Hesaplayıcı' : 'ROI Calculator'}
            </h3>
            <p className="text-gray-400">
              {language === 'tr' 
                ? 'AI asistanınızın size ne kadar tasarruf sağlayacağını hesaplayın'
                : 'Calculate how much your AI assistant will save you'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="glass bg-white/5 border border-gray-600 rounded-2xl p-8 fade-in-left">
              <h4 className="text-xl font-bold text-white mb-6">
                {language === 'tr' ? 'Mevcut Durumunuz' : 'Your Current Situation'}
              </h4>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    {language === 'tr' ? 'Müşteri hizmetleri çalışan sayısı' : 'Customer service employees'}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={roiInputs.employees}
                    onChange={(e) => setRoiInputs({...roiInputs, employees: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer min-h-[44px]"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-1">
                    <span>1</span>
                    <span className="text-white font-semibold">{roiInputs.employees}</span>
                    <span>10</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    {language === 'tr' ? 'Saatlik ücret ($)' : 'Hourly wage ($)'}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={roiInputs.hourlyWage}
                    onChange={(e) => setRoiInputs({...roiInputs, hourlyWage: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer min-h-[44px]"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-1">
                    <span>$10</span>
                    <span className="text-white font-semibold">${roiInputs.hourlyWage}</span>
                    <span>$50</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    {language === 'tr' ? 'Günlük çalışma saati' : 'Hours per day'}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    value={roiInputs.hoursPerDay}
                    onChange={(e) => setRoiInputs({...roiInputs, hoursPerDay: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer min-h-[44px]"
                  />
                  <div className="flex justify-between text-gray-400 text-sm mt-1">
                    <span>4h</span>
                    <span className="text-white font-semibold">{roiInputs.hoursPerDay}h</span>
                    <span>12h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Results */}
            <div className="glass bg-white/5 border border-gray-600 rounded-2xl p-8 fade-in-right">
              <h4 className="text-xl font-bold text-white mb-6">
                {language === 'tr' ? 'Tasarruf Hesabınız' : 'Your Savings'}
              </h4>
              
              <div className="space-y-6">
                <div className="text-center p-4 glass bg-white/5 rounded-lg border border-gray-700">
                  <Calculator className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">${roi.monthlySavings.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">
                    {language === 'tr' ? 'Aylık tasarruf' : 'Monthly savings'}
                  </p>
                </div>

                <div className="text-center p-4 glass bg-white/5 rounded-lg border border-gray-700">
                  <TrendingUp className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{roi.paybackMonths} {language === 'tr' ? 'ay' : 'months'}</p>
                  <p className="text-gray-400 text-sm">
                    {language === 'tr' ? 'Geri ödeme süresi' : 'Payback period'}
                  </p>
                </div>

                <div className="text-center p-4 glass bg-white/5 rounded-lg border border-gray-700">
                  <Zap className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{roi.yearlyROI.toFixed(0)}%</p>
                  <p className="text-gray-400 text-sm">
                    {language === 'tr' ? 'Yıllık ROI' : 'Yearly ROI'}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-gray-500/10 to-gray-400/10 border border-gray-500/20 rounded-lg">
                <p className="text-gray-300 text-sm text-center">
                  {language === 'tr' 
                    ? '💡 AI asistanı ile %70 otomasyon sağlayabilirsiniz'
                    : '💡 Achieve 70% automation with AI assistant'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="mb-20 holographic-shimmer">
          <div className="text-center mb-12">
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
        <div className="mb-20 scan-reveal">
          <div className="text-center mb-12">
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

        {/* Live Statistics Dashboard */}
        <div className="text-center mb-12 mt-20 energy-wave">
          <h3 className="text-3xl font-bold text-white mb-4">{t.dashboardIncluded}</h3>
          <p className="text-gray-400">{t.dashboardIncludedDesc}</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="glass bg-white/5 border border-gray-600 rounded-2xl p-8 shadow-2xl">
            {/* Mock Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <div className="glass bg-white/5 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-gray-300 text-sm font-medium">{t.totalConversations}</h4>
                  <p className="text-2xl font-bold text-white">{animatedStats.conversations.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">↗ +12% {language === 'tr' ? 'bu hafta' : 'this week'}</p>
                </div>
                <div className="glass bg-white/5 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-gray-300 text-sm font-medium">{t.appointmentsBooked}</h4>
                  <p className="text-2xl font-bold text-white">{animatedStats.appointments}</p>
                  <p className="text-gray-400 text-xs">↗ +8% {language === 'tr' ? 'bu hafta' : 'this week'}</p>
                </div>
                <div className="glass bg-white/5 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-gray-300 text-sm font-medium">{t.responseTime}</h4>
                  <p className="text-2xl font-bold text-white">{animatedStats.responseTime.toFixed(1)}s</p>
                  <p className="text-gray-400 text-xs">{t.averageResponse}</p>
                </div>
                <div className="glass bg-white/5 rounded-lg p-4 border border-gray-600">
                  <h4 className="text-gray-300 text-sm font-medium">{t.customerSatisfaction}</h4>
                  <p className="text-2xl font-bold text-white">{animatedStats.satisfaction.toFixed(1)}%</p>
                  <p className="text-gray-400 text-xs">↗ +2% {language === 'tr' ? 'bu ay' : 'this month'}</p>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="glass bg-white/5 rounded-lg p-4 border border-gray-700">
                <h4 className="text-white font-medium mb-4">{t.recentActivity}</h4>
                <div className="space-y-3">
                  {[
                    { action: t.newAppointmentBooked, time: language === 'tr' ? '2 dk önce' : '2 min ago', color: 'white' },
                    { action: t.customerInquiryHandled, time: language === 'tr' ? '5 dk önce' : '5 min ago', color: 'gray-300' },
                    { action: t.reportGenerated, time: language === 'tr' ? '1 saat önce' : '1 hour ago', color: 'gray-400' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <div className={`w-2 h-2 bg-white rounded-full mr-3 ${i === 0 ? 'animate-pulse' : ''}`}></div>
                      <div className="flex-1">
                        <p className="text-gray-300">{activity.action}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};