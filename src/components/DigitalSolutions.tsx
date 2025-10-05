import React, { useState } from 'react';
import { ShoppingCart, Monitor, Smartphone, Target, Wifi, Cloud, Palette, Wrench } from 'lucide-react';
import { translations } from '../utils/translations';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { CardContainer, CardBody, CardItem } from './ThreeDCard';
import { ServiceVisualGallery } from './ServiceVisualGallery';
import { ServiceDetailModal } from './ServiceDetailModal';

interface DigitalSolutionsProps {
  language: 'tr' | 'en';
}

export const DigitalSolutions: React.FC<DigitalSolutionsProps> = ({ language }) => {
  const t = translations[language];

  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const services = [
    {
      icon: ShoppingCart,
      title: t.eCommerceWebsites,
      description: t.eCommerceWebsitesDesc,
      benefits: t.eCommerceWebsitesBenefits,
      gradient: 'from-green-500 to-emerald-600',
      extendedContent: 'E-Ticaret Web Siteleri ile online satış yapmanızı sağlayan profesyonel platformlar oluşturun. Stripe ve PayPal entegrasyonu, envanter yönetimi ve SEO optimize altyapı ile işletmenizi dijital dünyaya taşıyın.\n\nÖzellikler:\n- Güvenli ödeme sistemleri\n- Mobil uyumlu tasarım\n- Gerçek zamanlı stok takibi\n- Sipariş yönetimi\n- Analitik ve raporlama\n\nE-ticaret başarınızı garantileyin.',
      galleryImages: ['Store Homepage', 'Product Pages', 'Checkout Process']
    },
    {
      icon: Monitor,
      title: t.corporateWebsites,
      description: t.corporateWebsitesDesc,
      benefits: t.corporateWebsitesBenefits,
      gradient: 'from-blue-500 to-cyan-600',
      extendedContent: 'Kurumsal Web Siteleri ile markanızı profesyonel şekilde dijital ortamda temsil edin. Modern tasarım, CMS entegrasyonu ve yüksek performans ile ziyaretçilerinize mükemmel deneyim sunun.\n\nÖzellikler:\n- Responsive tasarım\n- İçerik yönetim sistemi\n- SEO optimizasyonu\n- Çoklu dil desteği\n- Güvenlik sertifikaları\n\nKurumsal kimliğinizi dijitalde güçlendirin.',
      galleryImages: ['Corporate Homepage', 'About Page', 'Contact Section']
    },
    {
      icon: Smartphone,
      title: t.mobileAppDevelopment,
      description: t.mobileAppDevelopmentDesc,
      benefits: t.mobileAppDevelopmentBenefits,
      gradient: 'from-purple-500 to-pink-600',
      extendedContent: 'Mobil Uygulama Geliştirme ile iOS ve Android platformlarında native uygulamalar oluşturun. Cross-platform çözümler ve App Store yayınlama desteği ile mobil dünyada yerinizi alın.\n\nÖzellikler:\n- Native iOS ve Android\n- React Native / Flutter\n- Push notification\n- Offline mode\n- App Store optimization\n\nMobil kullanıcılarınıza ulaşın.',
      galleryImages: ['App Interface', 'Feature Screenshots', 'User Flow']
    },
    {
      icon: Target,
      title: t.digitalMarketing,
      description: t.digitalMarketingDesc,
      benefits: t.digitalMarketingBenefits,
      gradient: 'from-orange-500 to-red-600',
      extendedContent: 'Dijital Pazarlama hizmetleri ile online görünürlüğünüzü artırın. SEO, SEM, sosyal medya yönetimi ve içerik pazarlama stratejileri ile hedef kitlenize ulaşın.\n\nÖzellikler:\n- SEO optimizasyonu\n- Google Ads yönetimi\n- Sosyal medya stratejisi\n- İçerik üretimi\n- Analytics ve raporlama\n\nDijital varlığınızı büyütün.',
      galleryImages: ['Campaign Dashboard', 'Analytics Report', 'Social Media Calendar']
    },
    {
      icon: Wifi,
      title: t.iotSolutions,
      description: t.iotSolutionsDesc,
      benefits: t.iotSolutionsBenefits,
      gradient: 'from-teal-500 to-cyan-600',
      extendedContent: 'IoT Çözümleri ile akıllı cihazları entegre edin. Gerçek zamanlı veri toplama, bulut tabanlı yönetim ve otomasyon sistemleri ile operasyonlarınızı optimize edin.\n\nÖzellikler:\n- Sensor entegrasyonu\n- Cloud connectivity\n- Real-time monitoring\n- Automation rules\n- Data analytics\n\nAkıllı sistemlerle geleceğe hazırlanın.',
      galleryImages: ['IoT Dashboard', 'Device Management', 'Data Visualization']
    },
    {
      icon: Cloud,
      title: t.cloudSolutions,
      description: t.cloudSolutionsDesc,
      benefits: t.cloudSolutionsBenefits,
      gradient: 'from-indigo-500 to-blue-600',
      extendedContent: 'Cloud Solutions ile AWS, Azure ve GCP üzerinde ölçeklenebilir altyapılar kurun. Otomatik scaling, güvenli data migration ve yönetilen servisler ile bulut avantajlarından yararlanın.\n\nÖzellikler:\n- Multi-cloud support\n- Auto-scaling\n- Load balancing\n- Backup ve disaster recovery\n- Cost optimization\n\nBulut teknolojileri ile büyüyün.',
      galleryImages: ['Cloud Architecture', 'Deployment Pipeline', 'Monitoring Dashboard']
    },
    {
      icon: Palette,
      title: t.uiuxDesign,
      description: t.uiuxDesignDesc,
      benefits: t.uiuxDesignBenefits,
      gradient: 'from-fuchsia-500 to-purple-600',
      extendedContent: 'UI/UX Design hizmetleri ile kullanıcı deneyimini optimize edin. Kullanıcı araştırması, prototipleme ve marka kimliği tasarımı ile dijital ürünlerinizi mükemmelleştirin.\n\nÖzellikler:\n- User research\n- Wireframing\n- High-fidelity mockups\n- Prototyping\n- Usability testing\n\nKullanıcı odaklı tasarımlar yaratın.',
      galleryImages: ['Design System', 'Wireframes', 'Final Mockups']
    },
    {
      icon: Wrench,
      title: t.maintenanceSupport,
      description: t.maintenanceSupportDesc,
      benefits: t.maintenanceSupportBenefits,
      gradient: 'from-gray-500 to-gray-700',
      extendedContent: 'Bakım ve Destek hizmetleri ile dijital varlıklarınızı güvende tutun. Proaktif monitoring, güvenlik güncellemeleri ve 7/24 teknik destek ile sorunsuz çalışma garantisi.\n\nÖzellikler:\n- System monitoring\n- Security patches\n- Performance optimization\n- Backup management\n- 24/7 support\n\nDijital altyapınızı koruyun.',
      galleryImages: ['Monitoring Dashboard', 'Support Tickets', 'Performance Metrics']
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
                    <CardContainer className="w-full">
                      <CardBody className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 hover:border-white/20 transition-all duration-500 w-full h-full">
                        <CardItem translateZ="50" className="w-full">
                          <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                        </CardItem>

                        <CardItem translateZ="60" className="w-full">
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {service.title}
                          </h2>
                        </CardItem>

                        <CardItem translateZ="40" className="w-full">
                          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                            {service.description}
                          </p>
                        </CardItem>

                        <CardItem translateZ="30" className="w-full">
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
                        </CardItem>

                        <CardItem translateZ="50" className="w-full relative z-20 pointer-events-auto">
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => setOpenModalIndex(index)}
                              className={`flex-1 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg z-50 cursor-pointer`}
                            >
                              {t.moreDetailsButton}
                            </button>
                            <button
                              onClick={scrollToContact}
                              className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 z-50 cursor-pointer"
                            >
                              {t.requestCustomQuote}
                            </button>
                          </div>
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </div>

                  <div className="flex-1 w-full">
                    <ServiceVisualGallery
                      images={service.galleryImages}
                      title={service.title}
                      gradient={service.gradient}
                      icon={Icon}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {services.map((service, index) => (
            <ServiceDetailModal
              key={`modal-${index}`}
              isOpen={openModalIndex === index}
              onClose={() => setOpenModalIndex(null)}
              title={service.title}
              extendedContent={service.extendedContent}
              ctaText={t.requestCustomQuote}
              closeText={t.closeDetailsButton}
              onCtaClick={scrollToContact}
              gradient={service.gradient}
            />
          ))}

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
