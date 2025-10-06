import { Helmet } from 'react-helmet-async';

interface HelmetManagerProps {
  language: 'tr' | 'en';
  activeSection?: string;
}

export const HelmetManager: React.FC<HelmetManagerProps> = ({ language, activeSection = 'hero' }) => {
  const getSectionTitle = () => {
    const baseTitles = {
      tr: {
        hero: 'Allync | İşletme Otomasyonu için Yapay Zeka & Dijital Çözümler',
        features: 'Allync | Özellikler',
        pricing: 'Allync | Fiyatlandırma',
        contact: 'Allync | İletişim',
        packages: 'Allync | Paketler',
        'chat-demo': 'Allync | Demo',
        'industry-examples': 'Allync | Sektörler'
      },
      en: {
        hero: 'Allync | AI & Digital Solutions for Business Automation',
        features: 'Allync | Features',
        pricing: 'Allync | Pricing',
        contact: 'Allync | Contact Us',
        packages: 'Allync | Packages',
        'chat-demo': 'Allync | Demo',
        'industry-examples': 'Allync | Industries'
      }
    };

    return baseTitles[language][activeSection] || baseTitles[language].hero;
  };

  const getSectionDescription = () => {
    const descriptions = {
      tr: {
        hero: 'Allync\'in özel Yapay Zeka ve Dijital çözümleriyle işinizi dönüştürün. WhatsApp asistanları, web geliştirme ve insan ötesi otomasyon sağlıyoruz.',
        features: 'Allync AI çözümlerinin sunduğu gelişmiş özellikler. 7/24 destek, çok dilli AI, güvenli veri yönetimi ve daha fazlası.',
        pricing: 'İşletmenize uygun esnek fiyatlandırma paketleri. Tek seferlik ödeme, abonelik yok.',
        contact: 'Allync ekibiyle iletişime geçin. AI ve dijital dönüşüm çözümleri için ücretsiz danışmanlık.',
        packages: 'İşletmeniz için özel tasarlanmış AI ve otomasyon paketleri. Temel, Pro ve Premium seçenekler.',
        'chat-demo': 'Allync AI asistanının gerçek zamanlı demo\'sunu görün. Farklı sektörlerden örnekler.',
        'industry-examples': 'Allync AI çözümlerinin farklı sektörlerdeki uygulamaları. Güzellik, hukuk, sağlık ve daha fazlası.'
      },
      en: {
        hero: 'Transform your business with Allync\'s custom AI and Digital solutions. We provide WhatsApp assistants, web development, and beyond human automation.',
        features: 'Advanced features offered by Allync AI solutions. 24/7 support, multilingual AI, secure data management and more.',
        pricing: 'Flexible pricing packages suitable for your business. One-time payment, no subscriptions.',
        contact: 'Get in touch with the Allync team. Free consultation for AI and digital transformation solutions.',
        packages: 'Custom designed AI and automation packages for your business. Basic, Pro and Premium options.',
        'chat-demo': 'See live demo of Allync AI assistant. Examples from different industries.',
        'industry-examples': 'Applications of Allync AI solutions across different industries. Beauty, law, healthcare and more.'
      }
    };

    return descriptions[language][activeSection] || descriptions[language].hero;
  };

  const keywords = language === 'tr'
    ? 'Yapay Zeka çözümleri, dijital dönüşüm, WhatsApp otomasyonu, işletme yapay zekası, chatbot, web geliştirme, mobil uygulamalar, özel yazılım'
    : 'AI solutions, digital transformation, WhatsApp automation, business AI, chatbot, web development, mobile apps, custom software';

  const canonicalUrl = 'https://allync.com.tr/';
  const sectionUrl = activeSection !== 'hero' ? `https://allync.com.tr/#${activeSection}` : canonicalUrl;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Allync",
        "description": language === 'tr'
          ? "WhatsApp Business AI asistanları ile işletmeleri dönüştüren teknoloji şirketi"
          : "Technology company transforming businesses with WhatsApp Business AI assistants",
        "url": "https://allync.com.tr",
        "logo": "https://allync.com.tr/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+974-5107-9565",
          "contactType": "customer service",
          "email": "info@allync.com.tr",
          "availableLanguage": ["Turkish", "English", "Arabic"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "QA",
          "addressLocality": "Doha"
        },
        "sameAs": [
          "https://www.linkedin.com/company/allync",
          "https://twitter.com/allync"
        ]
      },
      {
        "@type": "WebSite",
        "name": "Allync",
        "url": "https://allync.com.tr",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://allync.com.tr/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <Helmet>
      <html lang={language} />
      <title>{getSectionTitle()}</title>
      <meta name="description" content={getSectionDescription()} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={getSectionTitle()} />
      <meta property="og:description" content={getSectionDescription()} />
      <meta property="og:url" content={sectionUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={language === 'tr' ? 'tr_TR' : 'en_US'} />

      <meta name="twitter:title" content={getSectionTitle()} />
      <meta name="twitter:description" content={getSectionDescription()} />
      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
