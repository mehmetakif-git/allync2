import React from 'react';
import { ShoppingCart, Monitor, Smartphone, Target, Wifi, Cloud, Palette, Wrench } from 'lucide-react';
import { translations } from '../utils/translations';
import { SolutionsPage, Service } from './SolutionsPage';

interface DigitalSolutionsProps {
  language: 'tr' | 'en';
}

export const DigitalSolutions: React.FC<DigitalSolutionsProps> = ({ language }) => {
  const t = translations[language];

  const services: Service[] = [
    {
      icon: ShoppingCart,
      title: t.eCommerceWebsites,
      description: t.eCommerceWebsitesDesc,
      benefits: t.eCommerceWebsitesBenefits,
      gradient: 'from-green-500 to-emerald-600',
      glowColor: 'rgba(34, 197, 94, 0.5)',
      extendedContent: 'E-Ticaret Web Siteleri ile online satış yapmanızı sağlayan profesyonel platformlar oluşturun. Stripe ve PayPal entegrasyonu, envanter yönetimi ve SEO optimize altyapı ile işletmenizi dijital dünyaya taşıyın.\n\nÖzellikler:\n- Güvenli ödeme sistemleri\n- Mobil uyumlu tasarım\n- Gerçek zamanlı stok takibi\n- Sipariş yönetimi\n- Analitik ve raporlama\n\nE-ticaret başarınızı garantileyin.',
      galleryImages: ['Store Homepage', 'Product Pages', 'Checkout Process']
    },
    {
      icon: Monitor,
      title: t.corporateWebsites,
      description: t.corporateWebsitesDesc,
      benefits: t.corporateWebsitesBenefits,
      gradient: 'from-blue-500 to-cyan-600',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      extendedContent: 'Kurumsal Web Siteleri ile markanızı profesyonel şekilde dijital ortamda temsil edin. Modern tasarım, CMS entegrasyonu ve yüksek performans ile ziyaretçilerinize mükemmel deneyim sunun.\n\nÖzellikler:\n- Responsive tasarım\n- İçerik yönetim sistemi\n- SEO optimizasyonu\n- Çoklu dil desteği\n- Güvenlik sertifikaları\n\nKurumsal kimliğinizi dijitalde güçlendirin.',
      galleryImages: ['Corporate Homepage', 'About Page', 'Contact Section']
    },
    {
      icon: Smartphone,
      title: t.mobileAppDevelopment,
      description: t.mobileAppDevelopmentDesc,
      benefits: t.mobileAppDevelopmentBenefits,
      gradient: 'from-purple-500 to-pink-600',
      glowColor: 'rgba(217, 70, 239, 0.5)',
      extendedContent: 'Mobil Uygulama Geliştirme ile iOS ve Android platformlarında native uygulamalar oluşturun. Cross-platform çözümler ve App Store yayınlama desteği ile mobil dünyada yerinizi alın.\n\nÖzellikler:\n- Native iOS ve Android\n- React Native / Flutter\n- Push notification\n- Offline mode\n- App Store optimization\n\nMobil kullanıcılarınıza ulaşın.',
      galleryImages: ['App Interface', 'Feature Screenshots', 'User Flow']
    },
    {
      icon: Target,
      title: t.digitalMarketing,
      description: t.digitalMarketingDesc,
      benefits: t.digitalMarketingBenefits,
      gradient: 'from-orange-500 to-red-600',
      glowColor: 'rgba(249, 115, 22, 0.5)',
      extendedContent: 'Dijital Pazarlama hizmetleri ile online görünürlüğünüzü artırın. SEO, SEM, sosyal medya yönetimi ve içerik pazarlama stratejileri ile hedef kitlenize ulaşın.\n\nÖzellikler:\n- SEO optimizasyonu\n- Google Ads yönetimi\n- Sosyal medya stratejisi\n- İçerik üretimi\n- Analytics ve raporlama\n\nDijital varlığınızı büyütün.',
      galleryImages: ['Campaign Dashboard', 'Analytics Report', 'Social Media Calendar']
    },
    {
      icon: Wifi,
      title: t.iotSolutions,
      description: t.iotSolutionsDesc,
      benefits: t.iotSolutionsBenefits,
      gradient: 'from-teal-500 to-cyan-600',
      glowColor: 'rgba(20, 184, 166, 0.5)',
      extendedContent: 'IoT Çözümleri ile akıllı cihazları entegre edin. Gerçek zamanlı veri toplama, bulut tabanlı yönetim ve otomasyon sistemleri ile operasyonlarınızı optimize edin.\n\nÖzellikler:\n- Sensor entegrasyonu\n- Cloud connectivity\n- Real-time monitoring\n- Automation rules\n- Data analytics\n\nAkıllı sistemlerle geleceğe hazırlanın.',
      galleryImages: ['IoT Dashboard', 'Device Management', 'Data Visualization']
    },
    {
      icon: Cloud,
      title: t.cloudSolutions,
      description: t.cloudSolutionsDesc,
      benefits: t.cloudSolutionsBenefits,
      gradient: 'from-indigo-500 to-blue-600',
      glowColor: 'rgba(99, 102, 241, 0.5)',
      extendedContent: 'Cloud Solutions ile AWS, Azure ve GCP üzerinde ölçeklenebilir altyapılar kurun. Otomatik scaling, güvenli data migration ve yönetilen servisler ile bulut avantajlarından yararlanın.\n\nÖzellikler:\n- Multi-cloud support\n- Auto-scaling\n- Load balancing\n- Backup ve disaster recovery\n- Cost optimization\n\nBulut teknolojileri ile büyüyün.',
      galleryImages: ['Cloud Architecture', 'Deployment Pipeline', 'Monitoring Dashboard']
    },
    {
      icon: Palette,
      title: t.uiuxDesign,
      description: t.uiuxDesignDesc,
      benefits: t.uiuxDesignBenefits,
      gradient: 'from-fuchsia-500 to-purple-600',
      glowColor: 'rgba(192, 38, 211, 0.5)',
      extendedContent: 'UI/UX Design hizmetleri ile kullanıcı deneyimini optimize edin. Kullanıcı araştırması, prototipleme ve marka kimliği tasarımı ile dijital ürünlerinizi mükemmelleştirin.\n\nÖzellikler:\n- User research\n- Wireframing\n- High-fidelity mockups\n- Prototyping\n- Usability testing\n\nKullanıcı odaklı tasarımlar yaratın.',
      galleryImages: ['Design System', 'Wireframes', 'Final Mockups']
    },
    {
      icon: Wrench,
      title: t.maintenanceSupport,
      description: t.maintenanceSupportDesc,
      benefits: t.maintenanceSupportBenefits,
      gradient: 'from-gray-500 to-gray-700',
      glowColor: 'rgba(107, 114, 128, 0.5)',
      extendedContent: 'Bakım ve Destek hizmetleri ile dijital varlıklarınızı güvende tutun. Proaktif monitoring, güvenlik güncellemeleri ve 7/24 teknik destek ile sorunsuz çalışma garantisi.\n\nÖzellikler:\n- System monitoring\n- Security patches\n- Performance optimization\n- Backup management\n- 24/7 support\n\nDijital altyapınızı koruyun.',
      galleryImages: ['Monitoring Dashboard', 'Support Tickets', 'Performance Metrics']
    }
  ];

  const flipWords = [
    language === 'tr' ? "Web Çözümleri" : "Web Solutions",
    language === 'tr' ? "Mobil Uygulamalar" : "Mobile Apps",
    language === 'tr' ? "Bulut Sistemleri" : "Cloud Systems",
    language === 'tr' ? "Dijital Dönüşüm" : "Digital Transform"
  ];

  return (
    <SolutionsPage
      language={language}
      services={services}
      pageTitle="Allync Digital"
      pageSubtitle={t.digitalSolutionSubtitle}
      flipWords={flipWords}
      ctaButtonGradient="from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700 hover:shadow-cyan-500/50"
    />
  );
};
