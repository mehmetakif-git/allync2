import React, { useState } from 'react';
import { Scissors, Scale, Home, Sofa, Stethoscope, Calculator, MessageCircle, Clock, CheckCircle, Zap, Users, Camera, Settings } from 'lucide-react';
import { translations } from '../utils/translations';

interface IndustryExamplesProps {
  language: 'tr' | 'en';
}

export const IndustryExamples: React.FC<IndustryExamplesProps> = ({ language }) => {
  const t = translations[language];
  const [selectedIndustry, setSelectedIndustry] = useState('salon');
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const industries = [
    {
      id: 'salon',
      icon: Scissors,
      name: t.beautySalons,
      description: t.beautySalonsDesc,
      demo: language === 'tr' ? [
        { type: 'user', message: 'Merhaba, saç kesimi için randevu almak istiyorum', time: '14:30' },
        { type: 'bot', message: 'Merhaba! Saç kesimi için hangi gün uygun? Pazartesi-Cumartesi arası çalışıyoruz.', time: '14:30' },
        { type: 'user', message: 'Yarın öğleden sonra müsait misiniz?', time: '14:31' },
        { type: 'bot', message: 'Yarın 14:00, 15:30 ve 17:00 saatlerimiz boş. Hangi saati tercih edersiniz?', time: '14:31' },
        { type: 'user', message: '15:30 olabilir', time: '14:32' },
        { type: 'bot', message: 'Mükemmel! Yarın 15:30 için randevunuz hazırlandı. Adınızı ve telefon numaranızı alabilir miyim?', time: '14:32' }
      ] : [
        { type: 'user', message: 'Hi, I need a haircut appointment', time: '2:30 PM' },
        { type: 'bot', message: 'Hello! What day works for your haircut? We\'re open Monday-Saturday.', time: '2:30 PM' },
        { type: 'user', message: 'Tomorrow afternoon available?', time: '2:31 PM' },
        { type: 'bot', message: 'Tomorrow we have 2:00 PM, 3:30 PM and 5:00 PM available. Which time works?', time: '2:31 PM' },
        { type: 'user', message: '3:30 PM works', time: '2:32 PM' },
        { type: 'bot', message: 'Perfect! Your appointment is set for tomorrow at 3:30 PM. May I have your name and phone?', time: '2:32 PM' }
      ]
    },
    {
      id: 'dietitian',
      icon: Calculator,
      name: t.dietitians,
      description: t.dietitiansDesc,
      demo: language === 'tr' ? [
        { type: 'user', message: 'Beslenme danışmanlığı almak istiyorum', time: '10:15' },
        { type: 'bot', message: 'Merhaba! Size nasıl yardımcı olabilirim? Kilo verme, kilo alma veya sağlıklı beslenme konusunda mı destek istiyorsunuz?', time: '10:15' },
        { type: 'user', message: 'Kilo vermek istiyorum, 10 kilo fazlam var', time: '10:16' },
        { type: 'bot', message: 'Anlıyorum. Önce bir değerlendirme randevusu alalım. Boy, kilo ve yaşınızı öğrenebilir miyim?', time: '10:16' },
        { type: 'user', message: '1.70 boy, 80 kilo, 28 yaşındayım', time: '10:17' },
        { type: 'bot', message: 'Teşekkürler! BMI\'niz normal aralıkta. Bu hafta için randevu alalım, Salı 14:00 uygun mu?', time: '10:17' }
      ] : [
        { type: 'user', message: 'I need nutrition counseling', time: '10:15 AM' },
        { type: 'bot', message: 'Hello! How can I help? Are you looking for weight loss, weight gain, or general healthy eating guidance?', time: '10:15 AM' },
        { type: 'user', message: 'Weight loss, I need to lose 10 kg', time: '10:16 AM' },
        { type: 'bot', message: 'I understand. Let\'s schedule an assessment first. May I have your height, weight, and age?', time: '10:16 AM' },
        { type: 'user', message: '1.70m height, 80kg, 28 years old', time: '10:17 AM' },
        { type: 'bot', message: 'Thank you! Your BMI is in normal range. Let\'s book this week - is Tuesday 2:00 PM good?', time: '10:17 AM' }
      ]
    },
    {
      id: 'realestate',
      icon: Home,
      name: language === 'tr' ? 'Emlak' : 'Real Estate',
      description: language === 'tr' ? 'Emlak görüntüleme, fiyat sorguları, randevu alma' : 'Property viewing, price inquiries, appointment booking',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Satılık daire arıyorum, 3+1', time: '16:20' },
        { type: 'bot', message: 'Merhaba! 3+1 daire için hangi bölgeyi tercih ediyorsunuz ve bütçeniz nedir?', time: '16:20' },
        { type: 'user', message: 'Kadıköy civarı, 2-3 milyon arası', time: '16:21' },
        { type: 'bot', message: 'Kadıköy\'de bütçenize uygun 5 dairemiz var. Görüntüleme için ne zaman müsaitsiniz?', time: '16:21' },
        { type: 'user', message: 'Hafta sonu olabilir', time: '16:22' },
        { type: 'bot', message: 'Cumartesi 11:00 veya Pazar 14:00 uygun mu? Size detayları WhatsApp\'tan gönderebilirim.', time: '16:22' }
      ] : [
        { type: 'user', message: 'Looking for 3-bedroom apartment for sale', time: '4:20 PM' },
        { type: 'bot', message: 'Hello! Which area do you prefer for the 3-bedroom and what\'s your budget range?', time: '4:20 PM' },
        { type: 'user', message: 'Downtown area, $300-400k budget', time: '4:21 PM' },
        { type: 'bot', message: 'We have 5 properties in downtown within your budget. When are you available for viewing?', time: '4:21 PM' },
        { type: 'user', message: 'Weekend works', time: '4:22 PM' },
        { type: 'bot', message: 'Saturday 11 AM or Sunday 2 PM available? I can send you details via WhatsApp.', time: '4:22 PM' }
      ]
    },
    {
      id: 'furniture',
      icon: Sofa,
      name: t.furnitureStores,
      description: t.furnitureStoresDesc,
      demo: language === 'tr' ? [
        { type: 'user', message: 'L koltuk takımı arıyorum', time: '13:45' },
        { type: 'bot', message: 'Merhaba! L koltuk için hangi renk ve kumaş türünü tercih ediyorsunuz?', time: '13:45' },
        { type: 'user', message: 'Gri renk, deri olsun', time: '13:46' },
        { type: 'bot', message: 'Gri deri L koltuk modellerimiz var. Fiyat aralığı 15.000-35.000 TL. Mağazaya gelip görmek ister misiniz?', time: '13:46' },
        { type: 'user', message: 'Evet, ne zaman gelebilirim?', time: '13:47' },
        { type: 'bot', message: 'Hafta içi 10:00-19:00, hafta sonu 10:00-18:00 açığız. Hangi gün uygun?', time: '13:47' }
      ] : [
        { type: 'user', message: 'Looking for L-shaped sofa set', time: '1:45 PM' },
        { type: 'bot', message: 'Hello! What color and material do you prefer for the L-shaped sofa?', time: '1:45 PM' },
        { type: 'user', message: 'Gray color, leather material', time: '1:46 PM' },
        { type: 'bot', message: 'We have gray leather L-shaped sofas. Price range $2,000-$4,500. Would you like to visit our showroom?', time: '1:46 PM' },
        { type: 'user', message: 'Yes, when can I come?', time: '1:47 PM' },
        { type: 'bot', message: 'We\'re open weekdays 10 AM-7 PM, weekends 10 AM-6 PM. Which day works for you?', time: '1:47 PM' }
      ]
    },
    {
      id: 'law',
      icon: Scale,
      name: t.lawFirms,
      description: t.lawFirmsDesc,
      demo: language === 'tr' ? [
        { type: 'user', message: 'Boşanma davası için avukat arıyorum', time: '11:30' },
        { type: 'bot', message: 'Merhaba! Aile hukuku uzmanımızla görüşmenizi ayarlayabilirim. Durum acil mi?', time: '11:30' },
        { type: 'user', message: 'Acil değil ama bu hafta görüşmek istiyorum', time: '11:31' },
        { type: 'bot', message: 'Av. Ayşe Hanım\'ın Perşembe 15:00 veya Cuma 10:00 saatleri boş. Hangi gün uygun?', time: '11:31' },
        { type: 'user', message: 'Perşembe olabilir', time: '11:32' },
        { type: 'bot', message: 'Perşembe 15:00 için randevunuz alındı. İlk görüşme ücretsiz. Adres ve telefon bilgilerinizi alabilir miyim?', time: '11:32' }
      ] : [
        { type: 'user', message: 'Need lawyer for divorce case', time: '11:30 AM' },
        { type: 'bot', message: 'Hello! I can arrange a meeting with our family law specialist. Is this urgent?', time: '11:30 AM' },
        { type: 'user', message: 'Not urgent but want to meet this week', time: '11:31 AM' },
        { type: 'bot', message: 'Attorney Sarah has Thursday 3 PM or Friday 10 AM available. Which day works?', time: '11:31 AM' },
        { type: 'user', message: 'Thursday works', time: '11:32 AM' },
        { type: 'bot', message: 'Thursday 3 PM appointment booked. First consultation is free. May I have your contact details?', time: '11:32 AM' }
      ]
    },
    {
      id: 'accounting',
      icon: Calculator,
      name: language === 'tr' ? 'Muhasebe' : 'Accounting',
      description: language === 'tr' ? 'Vergi soruları, belge teslimi, son tarih hatırlatmaları' : 'Tax questions, document submission, deadline reminders',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Vergi beyannamem için randevu almak istiyorum', time: '09:15' },
        { type: 'bot', message: 'Merhaba! Gelir vergisi beyannamesi mi? Hangi belgeleriniz hazır?', time: '09:15' },
        { type: 'user', message: 'Evet, maaş bordroları ve kira gelirim var', time: '09:16' },
        { type: 'bot', message: 'Mükemmel! Bu hafta Çarşamba 14:00 veya Cuma 16:00 uygun mu? Belgeleri getirmeniz yeterli.', time: '09:16' },
        { type: 'user', message: 'Çarşamba olsun', time: '09:17' },
        { type: 'bot', message: 'Çarşamba 14:00 randevunuz hazır. Size hatırlatma mesajı göndereceğim. Başka soru var mı?', time: '09:17' }
      ] : [
        { type: 'user', message: 'Need appointment for tax return', time: '9:15 AM' },
        { type: 'bot', message: 'Hello! Income tax return? Which documents do you have ready?', time: '9:15 AM' },
        { type: 'user', message: 'Yes, salary slips and rental income', time: '9:16 AM' },
        { type: 'bot', message: 'Perfect! This week Wednesday 2 PM or Friday 4 PM available? Just bring your documents.', time: '9:16 AM' },
        { type: 'user', message: 'Wednesday works', time: '9:17 AM' },
        { type: 'bot', message: 'Wednesday 2 PM appointment set. I\'ll send you a reminder. Any other questions?', time: '9:17 AM' }
      ]
    },
    {
      id: 'veterinarian',
      icon: Stethoscope,
      name: language === 'tr' ? 'Veteriner Hekim' : 'Veterinarian',
      description: language === 'tr' ? 'Hayvan muayenesi, aşı randevuları, acil durumlar' : 'Pet examination, vaccination appointments, emergencies',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Kedim için aşı randevusu almak istiyorum', time: '10:30' },
        { type: 'bot', message: 'Merhaba! Kedinizin yaşı kaç ve hangi aşıları yapılacak?', time: '10:30' },
        { type: 'user', message: '2 yaşında, karma aşı gerekiyor', time: '10:31' },
        { type: 'bot', message: 'Anladım. Bu hafta Perşembe 15:00 veya Cuma 11:00 uygun mu? Aşı kartını getirmeyi unutmayın.', time: '10:31' },
        { type: 'user', message: 'Perşembe olabilir', time: '10:32' },
        { type: 'bot', message: 'Perşembe 15:00 randevunuz hazır. Kedinin son yemek saatini not alın. Başka soru var mı?', time: '10:32' }
      ] : [
        { type: 'user', message: 'Need vaccination appointment for my cat', time: '10:30 AM' },
        { type: 'bot', message: 'Hello! How old is your cat and which vaccines are needed?', time: '10:30 AM' },
        { type: 'user', message: '2 years old, needs combo vaccine', time: '10:31 AM' },
        { type: 'bot', message: 'Got it. This week Thursday 3 PM or Friday 11 AM available? Don\'t forget vaccination card.', time: '10:31 AM' },
        { type: 'user', message: 'Thursday works', time: '10:32 AM' },
        { type: 'bot', message: 'Thursday 3 PM appointment set. Note your cat\'s last meal time. Any other questions?', time: '10:32 AM' }
      ]
    },
    {
      id: 'fitness',
      icon: Zap,
      name: language === 'tr' ? 'Fitness Antrenörü' : 'Fitness Trainer',
      description: language === 'tr' ? 'Kişisel antrenman, beslenme planı, fitness danışmanlığı' : 'Personal training, nutrition plans, fitness consulting',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Kişisel antrenman seansı almak istiyorum', time: '08:45' },
        { type: 'bot', message: 'Merhaba! Fitness hedefleriniz neler? Kilo verme, kas yapma veya genel kondisyon mu?', time: '08:45' },
        { type: 'user', message: 'Kilo vermek istiyorum, 15 kilo fazlam var', time: '08:46' },
        { type: 'bot', message: 'Anlıyorum. Daha önce spor deneyiminiz var mı? İlk değerlendirme seansı için ne zaman uygun?', time: '08:46' },
        { type: 'user', message: 'Yeni başlıyorum, bu hafta sonu olabilir', time: '08:47' },
        { type: 'bot', message: 'Cumartesi 10:00 veya Pazar 14:00 uygun mu? İlk seans ücretsiz değerlendirme içerir.', time: '08:47' }
      ] : [
        { type: 'user', message: 'Want to book personal training session', time: '8:45 AM' },
        { type: 'bot', message: 'Hello! What are your fitness goals? Weight loss, muscle building, or general conditioning?', time: '8:45 AM' },
        { type: 'user', message: 'Want to lose weight, need to lose 15kg', time: '8:46 AM' },
        { type: 'bot', message: 'I understand. Do you have previous exercise experience? When works for initial assessment?', time: '8:46 AM' },
        { type: 'user', message: 'I\'m a beginner, this weekend works', time: '8:47 AM' },
        { type: 'bot', message: 'Saturday 10 AM or Sunday 2 PM available? First session includes free assessment.', time: '8:47 AM' }
      ]
    },
    {
      id: 'psychologist',
      icon: Users,
      name: language === 'tr' ? 'Psikolog/Terapist' : 'Psychologist/Therapist',
      description: language === 'tr' ? 'Psikolojik danışmanlık, terapi seansları, çift terapisi' : 'Psychological counseling, therapy sessions, couples therapy',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Psikolojik destek almak istiyorum', time: '14:20' },
        { type: 'bot', message: 'Merhaba! Size nasıl yardımcı olabilirim? Bireysel terapi mi arıyorsunuz?', time: '14:20' },
        { type: 'user', message: 'Evet, anksiyete problemim var', time: '14:21' },
        { type: 'bot', message: 'Anlıyorum. İlk görüşme için bu hafta içinde uygun olduğunuz gün var mı?', time: '14:21' },
        { type: 'user', message: 'Çarşamba öğleden sonra olabilir', time: '14:22' },
        { type: 'bot', message: 'Çarşamba 16:00 uygun mu? İlk seans 90 dakika sürer. Gizlilik garantisi ile.', time: '14:22' }
      ] : [
        { type: 'user', message: 'I need psychological support', time: '2:20 PM' },
        { type: 'bot', message: 'Hello! How can I help you? Are you looking for individual therapy?', time: '2:20 PM' },
        { type: 'user', message: 'Yes, I have anxiety issues', time: '2:21 PM' },
        { type: 'bot', message: 'I understand. Do you have any available days this week for initial consultation?', time: '2:21 PM' },
        { type: 'user', message: 'Wednesday afternoon could work', time: '2:22 PM' },
        { type: 'bot', message: 'Wednesday 4 PM available? First session is 90 minutes. Complete confidentiality assured.', time: '2:22 PM' }
      ]
    },
    {
      id: 'dentist',
      icon: Stethoscope,
      name: language === 'tr' ? 'Diş Hekimi' : 'Dentist',
      description: language === 'tr' ? 'Diş muayenesi, temizlik, tedavi randevuları' : 'Dental examination, cleaning, treatment appointments',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Diş ağrım var, acil randevu alabilir miyim?', time: '11:15' },
        { type: 'bot', message: 'Merhaba! Ağrı ne kadar süredir devam ediyor? Bugün için acil slot ayarlayabilirim.', time: '11:15' },
        { type: 'user', message: '2 gündür çok ağrıyor, dayanamıyorum', time: '11:16' },
        { type: 'bot', message: 'Anlıyorum. Bugün 15:30\'da acil muayene için yeriniz hazır. Ağrı kesici aldınız mı?', time: '11:16' },
        { type: 'user', message: 'Aldım ama geçmiyor', time: '11:17' },
        { type: 'bot', message: 'Bugün 15:30\'da görüşürüz. Kimlik ve sigorta kartınızı getirin. Geçmiş olsun.', time: '11:17' }
      ] : [
        { type: 'user', message: 'I have tooth pain, can I get emergency appointment?', time: '11:15 AM' },
        { type: 'bot', message: 'Hello! How long has the pain been going on? I can arrange emergency slot today.', time: '11:15 AM' },
        { type: 'user', message: 'For 2 days, very painful, can\'t bear it', time: '11:16 AM' },
        { type: 'bot', message: 'I understand. Today 3:30 PM emergency examination slot ready. Have you taken painkillers?', time: '11:16 AM' },
        { type: 'user', message: 'Yes but it\'s not helping', time: '11:17 AM' },
        { type: 'bot', message: 'See you today 3:30 PM. Bring ID and insurance card. Feel better soon.', time: '11:17 AM' }
      ]
    },
    {
      id: 'photographer',
      icon: Camera,
      name: language === 'tr' ? 'Fotoğrafçı' : 'Photographer',
      description: language === 'tr' ? 'Düğün, etkinlik, portre çekimleri' : 'Wedding, event, portrait photography',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Düğün fotoğrafçısı arıyorum', time: '16:45' },
        { type: 'bot', message: 'Merhaba! Düğün tarihiniz ne zaman? Paket seçeneklerini gösterebilirim.', time: '16:45' },
        { type: 'user', message: 'Haziran ayında, 15 Haziran cumartesi', time: '16:46' },
        { type: 'bot', message: 'O tarih müsait! Gün boyu çekim mi yoksa sadece tören mi? Fiyat listesini göndereyim.', time: '16:46' },
        { type: 'user', message: 'Gün boyu olsun, fiyatları öğrenmek istiyorum', time: '16:47' },
        { type: 'bot', message: 'Gün boyu paket 8000 TL. Görüşme için ne zaman uygun? Örnekleri gösterebilirim.', time: '16:47' }
      ] : [
        { type: 'user', message: 'Looking for wedding photographer', time: '4:45 PM' },
        { type: 'bot', message: 'Hello! When is your wedding date? I can show you package options.', time: '4:45 PM' },
        { type: 'user', message: 'In June, Saturday June 15th', time: '4:46 PM' },
        { type: 'bot', message: 'That date is available! Full day coverage or ceremony only? Let me send price list.', time: '4:46 PM' },
        { type: 'user', message: 'Full day please, want to know pricing', time: '4:47 PM' },
        { type: 'bot', message: 'Full day package $1200. When works for consultation? I can show portfolio samples.', time: '4:47 PM' }
      ]
    },
    {
      id: 'tailor',
      icon: Scissors,
      name: language === 'tr' ? 'Terzi/Konfeksiyon' : 'Tailor/Fashion',
      description: language === 'tr' ? 'Özel dikim, tadilat, elbise tasarımı' : 'Custom tailoring, alterations, dress design',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Takım elbise diktirmek istiyorum', time: '13:30' },
        { type: 'bot', message: 'Merhaba! Hangi kumaş türünü tercih ediyorsunuz? Ölçü almak için randevu ayarlayalım.', time: '13:30' },
        { type: 'user', message: 'Yünlü kumaş olsun, ne kadar sürer?', time: '13:31' },
        { type: 'bot', message: 'Yünlü takım 15-20 gün sürer. Ölçü için bu hafta uygun olduğunuz gün var mı?', time: '13:31' },
        { type: 'user', message: 'Perşembe öğleden sonra olabilir', time: '13:32' },
        { type: 'bot', message: 'Perşembe 14:30 uygun mu? Kumaş örneklerini de gösterebilirim. Fiyat 2500 TL\'den başlıyor.', time: '13:32' }
      ] : [
        { type: 'user', message: 'Want to get a suit tailored', time: '1:30 PM' },
        { type: 'bot', message: 'Hello! What fabric type do you prefer? Let\'s schedule appointment for measurements.', time: '1:30 PM' },
        { type: 'user', message: 'Wool fabric, how long does it take?', time: '1:31 PM' },
        { type: 'bot', message: 'Wool suit takes 15-20 days. Any day this week available for measurements?', time: '1:31 PM' },
        { type: 'user', message: 'Thursday afternoon could work', time: '1:32 PM' },
        { type: 'bot', message: 'Thursday 2:30 PM available? I can show fabric samples too. Pricing starts from $380.', time: '1:32 PM' }
      ]
    },
    {
      id: 'autoservice',
      icon: Settings,
      name: language === 'tr' ? 'Otomobil Servisi' : 'Auto Service',
      description: language === 'tr' ? 'Araç bakımı, onarım, periyodik servis' : 'Car maintenance, repairs, periodic service',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Aracımın periyodik bakımı gerekiyor', time: '09:00' },
        { type: 'bot', message: 'Merhaba! Araç markası ve modeli nedir? Kaç km\'de?', time: '09:00' },
        { type: 'user', message: 'Honda Civic 2020, 45.000 km\'de', time: '09:01' },
        { type: 'bot', message: 'Büyük bakım zamanı. Bu hafta Çarşamba 10:00 veya Cuma 14:00 uygun mu?', time: '09:01' },
        { type: 'user', message: 'Çarşamba olabilir, ne kadar sürer?', time: '09:02' },
        { type: 'bot', message: 'Çarşamba 10:00 randevunuz hazır. Yaklaşık 4-5 saat sürer. Yedeğe ihtiyacınız var mı?', time: '09:02' }
      ] : [
        { type: 'user', message: 'My car needs periodic maintenance', time: '9:00 AM' },
        { type: 'bot', message: 'Hello! What\'s your car make and model? What\'s the mileage?', time: '9:00 AM' },
        { type: 'user', message: 'Honda Civic 2020, 45,000 miles', time: '9:01 AM' },
        { type: 'bot', message: 'Major service time. This week Wednesday 10 AM or Friday 2 PM available?', time: '9:01 AM' },
        { type: 'user', message: 'Wednesday works, how long does it take?', time: '9:02 AM' },
        { type: 'bot', message: 'Wednesday 10 AM appointment set. Takes about 4-5 hours. Need a loaner car?', time: '9:02 AM' }
      ]
    },
    {
      id: 'cleaning',
      icon: Home,
      name: language === 'tr' ? 'Temizlik Şirketi' : 'Cleaning Company',
      description: language === 'tr' ? 'Ev temizliği, ofis temizliği, derin temizlik' : 'House cleaning, office cleaning, deep cleaning',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Haftalık ev temizliği hizmeti istiyorum', time: '12:15' },
        { type: 'bot', message: 'Merhaba! Eviniz kaç m²? Hangi gün ve saatte uygun?', time: '12:15' },
        { type: 'user', message: '120 m², salı günleri öğleden sonra olabilir', time: '12:16' },
        { type: 'bot', message: '120 m² için 3-4 saat sürer. Salı 13:00\'da başlayabilir miyiz? Haftalık 400 TL.', time: '12:16' },
        { type: 'user', message: 'Uygun, ne zaman başlayabiliriz?', time: '12:17' },
        { type: 'bot', message: 'Bu salı başlayabiliriz. Temizlik malzemeleri bizden. Adres bilgilerinizi alabilir miyim?', time: '12:17' }
      ] : [
        { type: 'user', message: 'Need weekly house cleaning service', time: '12:15 PM' },
        { type: 'bot', message: 'Hello! How many square feet is your house? Which day and time works?', time: '12:15 PM' },
        { type: 'user', message: '1300 sq ft, Tuesday afternoons could work', time: '12:16 PM' },
        { type: 'bot', message: '1300 sq ft takes 3-4 hours. Can we start Tuesday 1 PM? Weekly rate $60.', time: '12:16 PM' },
        { type: 'user', message: 'Sounds good, when can we start?', time: '12:17 PM' },
        { type: 'bot', message: 'We can start this Tuesday. Cleaning supplies included. May I have your address details?', time: '12:17 PM' }
      ]
    },
    {
      id: 'electrician',
      icon: Zap,
      name: language === 'tr' ? 'Elektrikçi/Tesisatçı' : 'Electrician/Plumber',
      description: language === 'tr' ? 'Elektrik arızası, tesisat tamiri, acil müdahale' : 'Electrical repairs, plumbing fixes, emergency service',
      demo: language === 'tr' ? [
        { type: 'user', message: 'Elektrik kesintim var, acil yardım lazım', time: '18:30' },
        { type: 'bot', message: 'Merhaba! Tüm evde mi yoksa belirli bölgelerde mi kesinti var?', time: '18:30' },
        { type: 'user', message: 'Sadece mutfak ve salon, sigortalar atmış', time: '18:31' },
        { type: 'bot', message: 'Anladım. Acil servis için bu akşam 20:00\'da gelebilirim. Uygun mu?', time: '18:31' },
        { type: 'user', message: 'Evet uygun, ücret ne kadar?', time: '18:32' },
        { type: 'bot', message: 'Acil servis 300 TL + malzeme. Bu akşam 20:00\'da adresinizde olacağım.', time: '18:32' }
      ] : [
        { type: 'user', message: 'Power outage, need emergency help', time: '6:30 PM' },
        { type: 'bot', message: 'Hello! Is it whole house or specific areas without power?', time: '6:30 PM' },
        { type: 'user', message: 'Just kitchen and living room, breakers tripped', time: '6:31 PM' },
        { type: 'bot', message: 'I understand. Emergency service tonight 8 PM available. Does that work?', time: '6:31 PM' },
        { type: 'user', message: 'Yes that works, what\'s the cost?', time: '6:32 PM' },
        { type: 'bot', message: 'Emergency service $45 + materials. I\'ll be at your address tonight 8 PM.', time: '6:32 PM' }
      ]
    },
    {
      id: 'education',
      icon: Users,
      name: language === 'tr' ? 'Eğitim Kursu' : 'Education/Training',
      description: language === 'tr' ? 'Dil kursu, sürücü kursu, mesleki eğitim' : 'Language courses, driving school, professional training',
      demo: language === 'tr' ? [
        { type: 'user', message: 'İngilizce kursu hakkında bilgi almak istiyorum', time: '14:45' },
        { type: 'bot', message: 'Merhaba! Seviyeniz nedir? Başlangıç, orta veya ileri düzey?', time: '14:45' },
        { type: 'user', message: 'Orta seviye, konuşma pratiği yapmak istiyorum', time: '14:46' },
        { type: 'bot', message: 'Konuşma odaklı kursumuz var. Haftada 3 gün, 2 saat. Ne zaman başlamak istersiniz?', time: '14:46' },
        { type: 'user', message: 'Bu ay içinde başlayabilir miyim?', time: '14:47' },
        { type: 'bot', message: '25 Ocak\'ta yeni grup başlıyor. Seviye testi için ne zaman uygun? Ücretsiz deneme dersi var.', time: '14:47' }
      ] : [
        { type: 'user', message: 'Want information about English course', time: '2:45 PM' },
        { type: 'bot', message: 'Hello! What\'s your level? Beginner, intermediate, or advanced?', time: '2:45 PM' },
        { type: 'user', message: 'Intermediate, want to practice speaking', time: '2:46 PM' },
        { type: 'bot', message: 'We have conversation-focused course. 3 days/week, 2 hours. When would you like to start?', time: '2:46 PM' },
        { type: 'user', message: 'Can I start this month?', time: '2:47 PM' },
        { type: 'bot', message: 'New group starts January 25th. When works for level test? Free trial lesson available.', time: '2:47 PM' }
      ]
    }
  ];

  const selectedIndustryData = industries.find(ind => ind.id === selectedIndustry) || industries[0];

  React.useEffect(() => {
    const conversation = selectedIndustryData.demo;
    if (currentMessage < conversation.length) {
      const currentMsg = conversation[currentMessage];
      
      if (currentMsg.type === 'bot') {
        setIsTyping(true);
        setDisplayedText('');
        
        let index = 0;
        const typingInterval = setInterval(() => {
          if (index < currentMsg.message.length) {
            setDisplayedText(currentMsg.message.slice(0, index + 1));
            index++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            setTimeout(() => {
              setCurrentMessage(prev => prev + 1);
            }, 2000);
          }
        }, 50);
        
        return () => clearInterval(typingInterval);
      } else {
        setDisplayedText(currentMsg.message);
        setTimeout(() => {
          setCurrentMessage(prev => prev + 1);
        }, 1500);
      }
    } else {
      setTimeout(() => {
        setCurrentMessage(0);
      }, 3000);
    }
  }, [currentMessage, selectedIndustry]);

  React.useEffect(() => {
    setCurrentMessage(0);
    setDisplayedText('');
  }, [selectedIndustry]);

  return (
    <section className="py-8 md:py-14 relative" style={{ display: 'block', opacity: 1 }}>
      
      <div className="max-w-1200px mx-auto px-5 sm:px-6 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.industryTitle}</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.industrySubtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6 md:mb-12 industry-grid">
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            return (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`industry-card p-4 rounded-xl transition-all duration-300 ${
                  selectedIndustry === industry.id
                    ? 'bg-gray-600 text-white shadow-lg shadow-gray-500/25'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <IconComponent className="w-8 h-8 mx-auto mb-2" />
                <span className="text-sm font-medium block">{industry.name}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {selectedIndustryData.name}
              </h3>
              <p className="text-gray-300 mb-6">
                {selectedIndustryData.description}
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6">
              <div className="demo-chat-container" style={{ minHeight: '550px' }}>
                <div className="space-y-4" style={{ minHeight: '520px', paddingTop: '20px', paddingBottom: '30px' }}>
                  {selectedIndustryData.demo.slice(0, currentMessage + 1).map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-gray-600 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <p className="text-sm">
                          {index === currentMessage && message.type === 'bot'
                            ? displayedText
                            : message.message}
                          {index === currentMessage && message.type === 'bot' && isTyping && (
                            <span className="animate-pulse">|</span>
                          )}
                        </p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.time}
                        </span>
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