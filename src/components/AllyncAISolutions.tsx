import React, { useState } from 'react';
import { MessageCircle, Instagram, Video, Image as ImageIcon, Mic, FileText, Play, Film, BarChart3, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../utils/translations';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { ServiceCard } from './common/ServiceCard';

interface AllyncAISolutionsProps {
  language: 'tr' | 'en';
}

export const AllyncAISolutions: React.FC<AllyncAISolutionsProps> = ({ language }) => {
  const t = translations[language];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const services = [
    {
      icon: MessageCircle,
      title: t.waAutomation,
      description: t.waAutomationDesc,
      benefits: t.waAutomationBenefits,
      gradient: 'from-green-500 to-emerald-600',
      extendedContent: 'WhatsApp Automation ile işletmeniz 7/24 müşterilerinize anında yanıt verebilir. Gelişmiş yapay zeka teknolojisi sayesinde müşteri sorgularını anlayıp, randevu oluşturabilir, sık sorulan soruları yanıtlayabilir ve müşteri memnuniyetini artırabilirsiniz.\n\nÖzellikler:\n- Otomatik müşteri hizmetleri\n- Randevu yönetim sistemi\n- Çoklu dil desteği\n- CRM entegrasyonu\n- Detaylı raporlama ve analitik\n\nBu hizmet ile işletmeniz operasyonel maliyetleri düşürürken müşteri memnuniyetini maksimize edebilir.',
      galleryImages: ['WhatsApp Dashboard View', 'Chat Interface Example', 'Analytics Dashboard']
    },
    {
      icon: Instagram,
      title: t.instagramAutomation,
      description: t.instagramAutomationDesc,
      benefits: t.instagramAutomationBenefits,
      gradient: 'from-pink-500 to-purple-600',
      extendedContent: 'Instagram Automation ile sosyal medya yönetiminizi otomatikleştirin. DM\'lere otomatik yanıt verin, yorumları yönetin ve potansiyel müşterileri yakalayın.\n\nÖzellikler:\n- Otomatik DM yanıtları\n- Yorum yönetimi\n- Hashtag analizi\n- Etkileşim raporları\n- Lead generation\n\nSosyal medya varlığınızı güçlendirin ve etkileşiminizi artırın.',
      galleryImages: ['Instagram Dashboard', 'Auto-Reply System', 'Engagement Analytics']
    },
    {
      icon: Video,
      title: t.textToVideo,
      description: t.textToVideoDesc,
      benefits: t.textToVideoBenefits,
      gradient: 'from-blue-500 to-cyan-600',
      extendedContent: 'Text-to-Video AI ile metinlerinizi profesyonel videolara dönüştürün. Pazarlama içeriklerinizi, eğitim materyallerinizi veya sosyal medya gönderilerinizi birkaç dakika içinde video formatına çevirin.\n\nÖzellikler:\n- Otomatik video oluşturma\n- Çoklu format desteği (4K, HD)\n- Voiceover entegrasyonu\n- Özel template\'ler\n- Hızlı render\n\nİçerik üretiminizi hızlandırın ve profesyonel videolar oluşturun.',
      galleryImages: ['Video Editor Interface', 'Template Gallery', 'Export Options']
    },
    {
      icon: ImageIcon,
      title: t.textToImage,
      description: t.textToImageDesc,
      benefits: t.textToImageBenefits,
      gradient: 'from-violet-500 to-purple-600',
      extendedContent: 'Text-to-Image AI ile hayal ettiğiniz görselleri oluşturun. Marketing materyalleri, sosyal medya içerikleri veya web tasarımı için benzersiz görseller üretin.\n\nÖzellikler:\n- Yüksek çözünürlüklü görsel üretimi\n- Çoklu stil seçenekleri\n- Ticari kullanım hakları\n- Toplu üretim\n- API entegrasyonu\n\nYaratıcılığınızı sınırsız hale getirin.',
      galleryImages: ['AI Image Generator', 'Style Options', 'Generated Gallery']
    },
    {
      icon: Mic,
      title: t.voiceCloning,
      description: t.voiceCloningDesc,
      benefits: t.voiceCloningBenefits,
      gradient: 'from-orange-500 to-red-600',
      extendedContent: 'Voice Cloning teknolojisi ile gerçekçi ses klonları oluşturun. Sesli asistanlar, reklam seslendirmeleri veya eğitim içerikleri için profesyonel ses üretimi.\n\nÖzellikler:\n- Gerçekçi ses klonlama\n- Çoklu dil ve aksan desteği\n- Emotion control\n- Hızlı üretim\n- Yüksek kalite\n\nSeslendirme projelerinizi bir üst seviyeye taşıyın.',
      galleryImages: ['Voice Studio', 'Cloning Interface', 'Audio Library']
    },
    {
      icon: FileText,
      title: t.documentAI,
      description: t.documentAIDesc,
      benefits: t.documentAIBenefits,
      gradient: 'from-gray-500 to-gray-700',
      extendedContent: 'Document AI ile belgelerinizi otomatik olarak işleyin ve analiz edin. OCR, veri çıkarma ve akıllı kategorizasyon özellikleri ile iş süreçlerinizi hızlandırın.\n\nÖzellikler:\n- OCR ve metin tanıma\n- Otomatik veri çıkarma\n- Belge sınıflandırma\n- Doğrulama ve onay\n- Güvenli depolama\n\nDokümantasyon süreçlerinizi dijitalleştirin.',
      galleryImages: ['Document Scanner', 'Data Extraction', 'Classification System']
    },
    {
      icon: Play,
      title: t.imageToVideo,
      description: t.imageToVideoDesc,
      benefits: t.imageToVideoBenefits,
      gradient: 'from-teal-500 to-cyan-600',
      extendedContent: 'Image-to-Video AI ile statik görsellerinizi dinamik içeriğe dönüştürün. AI destekli animasyonlar ve efektler ile sosyal medya içeriklerinizi canlandırın.\n\nÖzellikler:\n- Otomatik animasyon\n- Transition efektleri\n- Music ve ses ekleme\n- Sosyal medya formatları\n- Toplu işlem\n\nGörsellerinize hayat verin.',
      galleryImages: ['Animation Studio', 'Effect Library', 'Preview Screen']
    },
    {
      icon: Film,
      title: t.videoToVideo,
      description: t.videoToVideoDesc,
      benefits: t.videoToVideoBenefits,
      gradient: 'from-indigo-500 to-blue-600',
      extendedContent: 'Video-to-Video AI ile videolarınızı dönüştürün. Stil transferi, yüz değiştirme ve gelişmiş düzenleme özellikleri ile videolarınızı yeniden oluşturun.\n\nÖzellikler:\n- AI video dönüşümü\n- Stil transferi\n- Kalite iyileştirme\n- Renklendir ve restorasy\n- Toplu düzenleme\n\nVideo üretim sürecinizi optimize edin.',
      galleryImages: ['Video Editor', 'Style Transfer', 'Enhancement Tools']
    },
    {
      icon: BarChart3,
      title: t.dataAnalysisAI,
      description: t.dataAnalysisAIDesc,
      benefits: t.dataAnalysisAIBenefits,
      gradient: 'from-yellow-500 to-orange-600',
      extendedContent: 'Data Analysis AI ile büyük veri setlerinizi analiz edin ve değerli içgörüler elde edin. Tahmine dayalı analizler ve görselleştirme araçları ile iş kararlarınızı destekleyin.\n\nÖzellikler:\n- Büyük veri analizi\n- Tahmine dayalı modeller\n- Görselleştirme araçları\n- Otomatik raporlama\n- Real-time analytics\n\nVeriye dayalı kararlar alın.',
      galleryImages: ['Analytics Dashboard', 'Data Visualization', 'Report Generator']
    },
    {
      icon: Sparkles,
      title: t.customAISolutions,
      description: t.customAISolutionsDesc,
      benefits: t.customAISolutionsBenefits,
      gradient: 'from-fuchsia-500 to-pink-600',
      extendedContent: 'Custom AI Solutions ile işletmenize özel yapay zeka çözümleri geliştirin. İhtiyaçlarınıza göre özelleştirilmiş AI sistemleri ile rekabet avantajı elde edin.\n\nÖzellikler:\n- Tam özelleştirilebilir\n- İş süreçlerine entegrasyon\n- Özel model eğitimi\n- Dedicated destek\n- Scalable altyapı\n\nHayalinizdeki AI çözümünü gerçekleştirin.',
      galleryImages: ['Custom AI Platform', 'Integration Options', 'Training Dashboard']
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
              {t.aiSolutionTitle}
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              {t.aiSolutionSubtitle}
            </p>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              {t.getConsultation}
            </button>
          </div>

          <div className="space-y-32">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <ServiceCard
                  service={service}
                  language={language}
                  isOdd={index % 2 === 0}
                  index={index}
                  onDetailClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  onContactClick={scrollToContact}
                />

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      layoutId={`expanded-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden mt-4"
                    >
                      <div className="p-8 relative">
                        <button
                          onClick={() => setExpandedIndex(null)}
                          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
                        >
                          ✕
                        </button>
                        <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                          {service.extendedContent}
                        </div>
                        <button
                          onClick={() => {
                            scrollToContact();
                            setExpandedIndex(null);
                          }}
                          className={`mt-6 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white rounded-lg hover:scale-105 transition-all duration-300`}
                        >
                          {t.requestCustomQuote}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <button
              onClick={scrollToContact}
              className="px-12 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
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
