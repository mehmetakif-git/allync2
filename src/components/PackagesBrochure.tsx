import React from 'react';
import { Check, Star, Zap, Eye, Mic, FileText, Heart, Sparkles, Phone, Mail, MessageCircle } from 'lucide-react';
import { translations } from '../utils/translations';
import logoSvg from '/logo.svg';

interface PackagesBrochureProps {
  language: 'tr' | 'en';
}

export const PackagesBrochure: React.FC<PackagesBrochureProps> = ({ language }) => {
  const t = translations[language];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderBasicPlan = () => (
    <div className="package-card bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-500/30 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <span className="text-green-300 font-semibold">{language === 'tr' ? 'TEMEL PAKET' : 'BASIC PLAN'}</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t.basicPlan}</h2>
        <p className="text-gray-400">{t.basicPlanDesc}</p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          language === 'tr' ? 'WhatsApp Business üzerinden hızlı kurulum (48–72 saat)' : 'Quick setup via WhatsApp Business (48-72 hours)',
          language === 'tr' ? '%99 müşteri memnuniyeti garantisi' : '99% customer satisfaction guarantee',
          language === 'tr' ? 'Çok Dilli AI Desteği (50+ dil)' : 'Multi-language AI Support (50+ languages)',
          language === 'tr' ? 'Günlük/haftalık raporlar (WhatsApp üzerinden)' : 'Daily/weekly reports (via WhatsApp)',
          language === 'tr' ? '7/24 kesintisiz yanıt sistemi' : '24/7 continuous response system',
          language === 'tr' ? 'KVKK uyumlu, argo/kötüye kullanım filtresi' : 'GDPR compliant, profanity/abuse filter',
          language === 'tr' ? 'Yüksek Güvenlik & ISO Sertifikaları' : 'High Security & ISO Certificates',
          language === 'tr' ? 'İşletme anlık yazışmaları takip edebilir' : 'Business can track real-time conversations'
        ].map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">
              {feature}
              {(feature.includes('Dilli') || feature.includes('Multi-language') || feature.includes('ISO')) && (
                <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                  HIGHLIGHT
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={scrollToContact} className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-300">
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
          <span className="text-purple-300 font-semibold">{language === 'tr' ? 'PRO PAKET' : 'PRO PLAN'}</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t.proPlan}</h2>
        <p className="text-gray-400">{t.proPlanDesc}</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 italic">{language === 'tr' ? 'Basic Plan özelliklerine ek olarak:' : 'In addition to Basic Plan features:'}</p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          language === 'tr' ? 'Google Sheets / Excel entegrasyonu' : 'Google Sheets / Excel integration',
          language === 'tr' ? 'Google Takvim ile otomatik randevu kaydı' : 'Automatic appointment booking with Google Calendar',
          language === 'tr' ? 'İkinci WhatsApp numarası desteği (toplam 2 numara)' : 'Second WhatsApp number support (total 2 numbers)',
          language === 'tr' ? 'Raporlar hem WhatsApp hem bulut ortamında takip' : 'Reports tracking both WhatsApp and cloud environment',
          language === 'tr' ? 'Çok Dilli AI Desteği (50+ dil)' : 'Multi-language AI Support (50+ languages)',
          language === 'tr' ? 'Yüksek Güvenlik & ISO Sertifikaları' : 'High Security & ISO Certificates',
          language === 'tr' ? 'Gelişmiş analitik ve raporlama' : 'Advanced analytics and reporting',
          language === 'tr' ? 'Öncelikli müşteri desteği' : 'Priority customer support'
        ].map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">
              {feature}
              {(feature.includes('Dilli') || feature.includes('Multi-language') || feature.includes('ISO')) && (
                <span className="ml-2 px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                  HIGHLIGHT
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={scrollToContact} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300">
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
          <span className="text-red-300 font-semibold">{language === 'tr' ? 'PREMIUM / ENTERPRISE' : 'PREMIUM / ENTERPRISE'}</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{t.premiumPlan}</h2>
        <p className="text-gray-400">{t.premiumPlanDesc}</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 italic">{language === 'tr' ? 'Basic + Pro özelliklerine ek olarak:' : 'In addition to Basic + Pro features:'}</p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          language === 'tr' ? 'CRM / ERP sistemleriyle entegrasyon (Salesforce, Zoho, SAP)' : 'CRM / ERP systems integration (Salesforce, Zoho, SAP)',
          language === 'tr' ? 'Stok yönetim sistemleriyle tam uyum' : 'Full compatibility with inventory management systems',
          language === 'tr' ? 'Kurumsal raporlama araçlarına aktarım (Power BI, Tableau)' : 'Export to enterprise reporting tools (Power BI, Tableau)',
          language === 'tr' ? 'Yazıcı entegrasyonu: belirlenen saatlerde otomatik çıktı' : 'Printer integration: automatic output at scheduled times',
          language === 'tr' ? 'IoT cihaz entegrasyonu (POS, kiosk, ekran, sensörler)' : 'IoT device integration (POS, kiosk, displays, sensors)',
          language === 'tr' ? '5 adede kadar WhatsApp numarası eklenebilir' : 'Up to 5 WhatsApp numbers can be added',
          language === 'tr' ? 'Çok Dilli AI Desteği (50+ dil)' : 'Multi-language AI Support (50+ languages)',
          language === 'tr' ? 'Yüksek Güvenlik & ISO Sertifikaları' : 'High Security & ISO Certificates'
        ].map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">
              {feature}
              {(feature.includes('Dilli') || feature.includes('Multi-language') || feature.includes('ISO')) && (
                <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                  HIGHLIGHT
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button onClick={scrollToContact} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-300">
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
          <span className="text-yellow-300 font-semibold">{language === 'tr' ? 'EK PAKET' : 'ADD-ON PACKAGE'}</span>
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
            <p className="text-gray-300 text-sm">• {language === 'tr' ? 'Sesli mesaj gönderir' : 'Sends voice messages'}</p>
            <p className="text-gray-300 text-sm">• {language === 'tr' ? 'Gelen sesli mesajları analiz edip yazılı veya sesli yanıt üretir' : 'Analyzes incoming voice messages and generates written or voice responses'}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <Eye className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">{t.visionAI}</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• {language === 'tr' ? 'Görsel mesajları analiz eder (ürün, belge, fatura, katalog vb.)' : 'Analyzes visual messages (products, documents, invoices, catalogs, etc.)'}</p>
            <p className="text-gray-300 text-sm">• {language === 'tr' ? 'İşletme tarafından belirlenen görselleri otomatik gönderir' : 'Automatically sends visuals determined by the business'}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">{t.docAI}</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• {language === 'tr' ? 'PDF, Word, Excel gibi belgeleri tanır, özet çıkarır' : 'Recognizes documents like PDF, Word, Excel and extracts summaries'}</p>
            <p className="text-gray-300 text-sm">• {language === 'tr' ? 'Faturaları ve formları otomatik işler' : 'Automatically processes invoices and forms'}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <Heart className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">{t.emotionAI}</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• {language === 'tr' ? 'Mesajlardaki duygu durumunu algılar' : 'Detects emotional state in messages'}</p>
            <p className="text-gray-300 text-sm">• {language === 'tr' ? 'Duruma uygun özel senaryo başlatır' : 'Initiates appropriate custom scenarios'}</p>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">✨ {t.specialRequestFlexibility}</h3>
          <p className="text-gray-300 text-sm mb-2">• {language === 'tr' ? 'İşletmeye özel yeni özellikler geliştirilebilir' : 'Business-specific new features can be developed'}</p>
          <p className="text-gray-300 text-sm mb-2">• {language === 'tr' ? 'Tüm güncellemeler otomatik olarak sisteme entegre edilir' : 'All updates are automatically integrated into the system'}</p>
          <p className="text-yellow-300 text-sm font-semibold">• {t.beyondHumanAutomationDesc}</p>
        </div>
      </div>

      <div className="text-center space-y-4">
        <button onClick={scrollToContact} className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors duration-300">
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.packagesTitle}</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.packagesSubtitle}</p>
        </div>

        <div className="packages-grid">
          {renderBasicPlan()}
          {renderProPlan()}
          {renderPremiumPlan()}
          {renderAddonPlan()}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">{t.whichPackageSuitsYou}</h3>
            <p className="text-gray-400 mb-6">{t.talkToExperts}</p>
            <button 
              onClick={scrollToContact}
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