import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, MessageCircle, Star, Check, Zap, Eye, Mic, FileText, Heart, Sparkles } from 'lucide-react';
import { translations } from '../utils/translations';
import logoSvg from '/logo.svg';

interface PackagesBrochureProps {
  language: 'tr' | 'en';
}

export const PackagesBrochure: React.FC<PackagesBrochureProps> = ({ language }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const brochureRef = useRef<HTMLDivElement>(null);

  const totalPages = 5;

  const pages = [
    {
      id: 'cover',
      theme: 'gradient-to-br from-gray-900 to-black',
      content: 'cover'
    },
    {
      id: 'basic',
      theme: 'gradient-to-br from-green-900/20 to-green-800/10',
      accent: 'green',
      content: 'basic'
    },
    {
      id: 'pro',
      theme: 'gradient-to-br from-purple-900/20 to-purple-800/10',
      accent: 'purple',
      content: 'pro'
    },
    {
      id: 'premium',
      theme: 'gradient-to-br from-red-900/20 to-red-800/10',
      accent: 'red',
      content: 'premium'
    },
    {
      id: 'addon',
      theme: 'gradient-to-br from-yellow-900/20 to-yellow-800/10',
      accent: 'yellow',
      content: 'addon'
    }
  ];

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsFlipping(false);
      }, 400);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  // Touch navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextPage();
    if (isRightSwipe) prevPage();
  };

  const renderCoverPage = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-8">
        <img src={logoSvg} alt="Allync" className="w-24 h-24 mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 glitch" data-text="Allync">
          Allync
        </h1>
        <p className="text-xl text-gray-300 mb-2">Beyond Human Automation</p>
      </div>
      
      <div className="space-y-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {language === 'tr' ? 'Paket Broşürü' : 'Package Brochure'}
        </h2>
        <p className="text-lg text-gray-400 max-w-md">
          {language === 'tr' 
            ? 'WhatsApp AI Asistanları için özel paket seçenekleri'
            : 'Special package options for WhatsApp AI Assistants'
          }
        </p>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>%99 Memnuniyet</span>
        </div>
        <div className="flex items-center">
          <Zap className="w-4 h-4 text-blue-400 mr-1" />
          <span>7/24 Destek</span>
        </div>
        <div className="flex items-center">
          <Check className="w-4 h-4 text-green-400 mr-1" />
          <span>ISO Sertifikalı</span>
        </div>
      </div>
    </div>
  );

  const renderBasicPlan = () => (
    <div className="p-8 h-full flex flex-col">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <span className="text-green-300 font-semibold">BASIC PLAN</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Başlangıç Paketi</h2>
        <p className="text-gray-400">Küçük işletmeler için ideal başlangıç çözümü</p>
      </div>

      <div className="flex-1 space-y-4">
        {[
          'WhatsApp Business üzerinden hızlı kurulum (48–72 saat)',
          '%99 müşteri memnuniyeti garantisi',
          'Çok Dilli AI Desteği (50+ dil)',
          'Günlük/haftalık raporlar (WhatsApp üzerinden)',
          '7/24 kesintisiz yanıt sistemi',
          'KVKK uyumlu, argo/kötüye kullanım filtresi',
          'Yüksek Güvenlik & ISO Sertifikaları',
          'İşletme anlık yazışmaları takip edebilir'
        ].map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">
              {feature}
              {(feature.includes('Çok Dilli') || feature.includes('ISO')) && (
                <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                  HIGHLIGHT
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors duration-300">
          {language === 'tr' ? 'Başlangıç Paketini Seç' : 'Choose Basic Plan'}
        </button>
      </div>
    </div>
  );

  const renderProPlan = () => (
    <div className="p-8 h-full flex flex-col">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-4">
          <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
          <span className="text-purple-300 font-semibold">PRO PLAN</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Orta Paket</h2>
        <p className="text-gray-400">Büyüyen işletmeler için gelişmiş özellikler</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 italic">Basic Plan özelliklerine ek olarak:</p>
      </div>

      <div className="flex-1 space-y-4">
        {[
          'Google Sheets / Excel entegrasyonu',
          'Google Takvim ile otomatik randevu kaydı',
          'İkinci WhatsApp numarası desteği (toplam 2 numara)',
          'Raporlar hem WhatsApp hem bulut ortamında takip',
          'Çok Dilli AI Desteği (50+ dil)',
          'Yüksek Güvenlik & ISO Sertifikaları',
          'Gelişmiş analitik ve raporlama',
          'Öncelikli müşteri desteği'
        ].map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">
              {feature}
              {(feature.includes('Çok Dilli') || feature.includes('ISO')) && (
                <span className="ml-2 px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                  HIGHLIGHT
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-300">
          {language === 'tr' ? 'Pro Paketini Seç' : 'Choose Pro Plan'}
        </button>
      </div>
    </div>
  );

  const renderPremiumPlan = () => (
    <div className="p-8 h-full flex flex-col">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-4">
          <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
          <span className="text-red-300 font-semibold">PREMIUM / ENTERPRISE</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">En Yüksek Paket</h2>
        <p className="text-gray-400">Kurumsal işletmeler için tam entegrasyon</p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 italic">Basic + Pro özelliklerine ek olarak:</p>
      </div>

      <div className="flex-1 space-y-4">
        {[
          'CRM / ERP sistemleriyle entegrasyon (Salesforce, Zoho, SAP)',
          'Stok yönetim sistemleriyle tam uyum',
          'Kurumsal raporlama araçlarına aktarım (Power BI, Tableau)',
          'Yazıcı entegrasyonu: belirlenen saatlerde otomatik çıktı',
          'IoT cihaz entegrasyonu (POS, kiosk, ekran, sensörler)',
          '5 adede kadar WhatsApp numarası eklenebilir',
          'Çok Dilli AI Desteği (50+ dil)',
          'Yüksek Güvenlik & ISO Sertifikaları'
        ].map((feature, index) => (
          <div key={index} className="flex items-start">
            <Check className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm leading-relaxed">
              {feature}
              {(feature.includes('Çok Dilli') || feature.includes('ISO')) && (
                <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                  HIGHLIGHT
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors duration-300">
          {language === 'tr' ? 'Premium Paketini Seç' : 'Choose Premium Plan'}
        </button>
      </div>
    </div>
  );

  const renderAddonPage = () => (
    <div className="p-8 h-full flex flex-col">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
          <span className="text-yellow-300 font-semibold">ADD-ON PACKAGE</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Beyond Human Automation</h2>
        <p className="text-gray-400">Her pakete opsiyonel olarak eklenebilir</p>
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center">
            <Mic className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">Voice AI</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• Sesli mesaj gönderir</p>
            <p className="text-gray-300 text-sm">• Gelen sesli mesajları analiz edip yazılı veya sesli yanıt üretir</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <Eye className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">Vision AI</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• Görsel mesajları analiz eder (ürün, belge, fatura, katalog vb.)</p>
            <p className="text-gray-300 text-sm">• İşletme tarafından belirlenen görselleri otomatik gönderir</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">Doc AI</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• PDF, Word, Excel gibi belgeleri tanır, özet çıkarır</p>
            <p className="text-gray-300 text-sm">• Faturaları ve formları otomatik işler</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <Heart className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">Emotion AI</h3>
          </div>
          <div className="ml-9 space-y-2">
            <p className="text-gray-300 text-sm">• Mesajlardaki duygu durumunu algılar</p>
            <p className="text-gray-300 text-sm">• Duruma uygun özel senaryo başlatır</p>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">✨ Özel İstek Esnekliği</h3>
          <p className="text-gray-300 text-sm mb-2">• İşletmeye özel yeni özellikler geliştirilebilir</p>
          <p className="text-gray-300 text-sm mb-2">• Tüm güncellemeler otomatik olarak sisteme entegre edilir</p>
          <p className="text-yellow-300 text-sm font-semibold">• Allync'te sınır yok: Beyond Human Automation.</p>
        </div>
      </div>

      <div className="mt-8 text-center space-y-4">
        <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors duration-300">
          {language === 'tr' ? 'Add-On Paketini Ekle' : 'Add Add-On Package'}
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

  const renderPageContent = (pageData: any) => {
    switch (pageData.content) {
      case 'cover':
        return renderCoverPage();
      case 'basic':
        return renderBasicPlan();
      case 'pro':
        return renderProPlan();
      case 'premium':
        return renderPremiumPlan();
      case 'addon':
        return renderAddonPage();
      default:
        return null;
    }
  };

  return (
    <section className="py-20 relative bg-black min-h-screen">
      {/* Background Effects */}
      <div className="diagonal-gradient"></div>
      <div className="mesh-gradient"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'tr' ? 'Paket Seçenekleri' : 'Package Options'}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {language === 'tr' 
              ? 'İşletmeniz için en uygun AI asistan paketini seçin'
              : 'Choose the most suitable AI assistant package for your business'
            }
          </p>
        </div>

        {/* Brochure Container */}
        <div 
          ref={brochureRef}
          className="relative max-w-4xl mx-auto w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Page Container */}
          <div className="relative perspective-1000">
            <div 
              className={`brochure-page bg-gradient-to-br ${pages[currentPage].theme} border border-white/10 rounded-2xl shadow-2xl transition-all duration-800 w-full max-w-full overflow-hidden ${
                isFlipping ? 'flip-animation' : ''
              }`}
              style={{
                minHeight: 'min(600px, 80vh)',
                maxWidth: '100%',
                width: '100%',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              {renderPageContent(pages[currentPage])}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                currentPage === 0
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              {language === 'tr' ? 'Önceki' : 'Previous'}
            </button>

            {/* Page Indicators */}
            <div className="flex items-center space-x-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? 'bg-white scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                currentPage === totalPages - 1
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {language === 'tr' ? 'Sonraki' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Page Counter */}
          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">
              {currentPage + 1} / {totalPages}
            </span>
          </div>

          {/* Keyboard Instructions */}
          <div className="text-center mt-4">
            <p className="text-gray-500 text-xs">
              {language === 'tr' 
                ? 'Klavye ok tuşları ile de gezinebilirsiniz'
                : 'Use keyboard arrow keys to navigate'
              }
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16 w-full">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-8 max-w-2xl mx-auto w-full overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-4">
              {language === 'tr' ? 'Hangi Paket Size Uygun?' : 'Which Package Suits You?'}
            </h3>
            <p className="text-gray-400 mb-6 px-2">
              {language === 'tr' 
                ? 'Uzmanlarımızla konuşun ve işletmeniz için en uygun paketi belirleyin'
                : 'Talk to our experts and determine the most suitable package for your business'
              }
            </p>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-premium btn-glow btn-ripple px-4 md:px-8 py-4 rounded-lg font-semibold text-white flex items-center justify-center mx-auto w-full max-w-xs"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {language === 'tr' ? 'Ücretsiz Danışmanlık Al' : 'Get Free Consultation'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};