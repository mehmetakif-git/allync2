export interface MetaTags {
  title: string;
  description: string;
  keywords: string;
}

export const getMetaTags = (language: 'tr' | 'en'): MetaTags => {
  if (language === 'tr') {
    return {
      title: 'Allync | İşletme Otomasyonu için Yapay Zeka & Dijital Çözümler',
      description: 'Allync\'in özel Yapay Zeka ve Dijital çözümleriyle işinizi dönüştürün. WhatsApp asistanları, web geliştirme ve insan ötesi otomasyon sağlıyoruz.',
      keywords: 'Yapay Zeka çözümleri, dijital dönüşüm, WhatsApp otomasyonu, işletme yapay zekası, chatbot, web geliştirme, mobil uygulamalar, özel yazılım'
    };
  }

  return {
    title: 'Allync | AI & Digital Solutions for Business Automation',
    description: 'Transform your business with Allync\'s custom AI and Digital solutions. We provide WhatsApp assistants, web development, and beyond human automation.',
    keywords: 'AI solutions, digital transformation, WhatsApp automation, business AI, chatbot, web development, mobile apps, custom software'
  };
};
