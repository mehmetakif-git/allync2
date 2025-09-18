import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Paperclip, Smile, Mic, Phone, Video, MoreVertical } from 'lucide-react';
import { translations } from '../utils/translations';
import logoSvg from '/logo.svg';

interface WhatsAppChatDemoProps {
  language: 'tr' | 'en';
}

interface Message {
  id: number;
  type: 'user' | 'ai';
  message: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface Industry {
  id: string;
  name: string;
  icon: string;
  conversation: Message[];
}

export const WhatsAppChatDemo: React.FC<WhatsAppChatDemoProps> = ({ language }) => {
  const t = translations[language];
  const [selectedIndustry, setSelectedIndustry] = useState('salon');
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const industries: Industry[] = [
    {
      id: 'salon',
      name: language === 'tr' ? 'Güzellik Salonu' : 'Beauty Salon',
      icon: '💇‍♀️',
      conversation: language === 'tr' ? [
        { id: 1, type: 'user', message: 'Merhaba! Yarın için saç kesimi randevusu alabilir miyim?', time: '14:30', status: 'read' },
        { id: 2, type: 'ai', message: 'Merhaba! Tabii ki! Yarın için hangi saat uygun? 10:00-18:00 arası çalışıyoruz.', time: '14:30', status: 'read' },
        { id: 3, type: 'user', message: 'Öğleden sonra 15:00 civarı olabilir mi?', time: '14:31', status: 'read' },
        { id: 4, type: 'ai', message: 'Mükemmel! 15:00 için yerimiz var. Hangi kuaförümüzle çalışmak istersiniz? Ayşe Hanım veya Mehmet Bey?', time: '14:31', status: 'read' },
        { id: 5, type: 'user', message: 'Ayşe Hanım ile olsun. Saç boyası da yaptırabilir miyim?', time: '14:32', status: 'read' },
        { id: 6, type: 'ai', message: 'Elbette! Saç kesimi + boya için 2.5 saat ayıralım. Hangi rengi düşünüyorsunuz?', time: '14:32', status: 'read' },
        { id: 7, type: 'user', message: 'Kahverengi tonları, doğal görünsün', time: '14:33', status: 'read' },
        { id: 8, type: 'ai', message: 'Harika seçim! Yarın 15:00 Ayşe Hanım ile saç kesimi + kahverengi boya randevunuz hazır. Adınızı ve telefon numaranızı alabilir miyim?', time: '14:33', status: 'read' },
        { id: 9, type: 'user', message: 'Zeynep Yılmaz, 0555-123-4567', time: '14:34', status: 'read' },
        { id: 10, type: 'ai', message: 'Teşekkürler Zeynep Hanım! Randevunuz onaylandı. Size hatırlatma mesajı göndereceğim. Toplam ücret 450 TL. Görüşmek üzere! 💇‍♀️', time: '14:34', status: 'read' }
      ] : [
        { id: 1, type: 'user', message: 'Hi! Can I book a haircut appointment for tomorrow?', time: '2:30 PM', status: 'read' },
        { id: 2, type: 'ai', message: 'Hello! Of course! What time works for you tomorrow? We\'re open 10 AM - 6 PM.', time: '2:30 PM', status: 'read' },
        { id: 3, type: 'user', message: 'Around 3 PM in the afternoon would be great', time: '2:31 PM', status: 'read' },
        { id: 4, type: 'ai', message: 'Perfect! We have 3 PM available. Which stylist would you prefer? Sarah or Mike?', time: '2:31 PM', status: 'read' },
        { id: 5, type: 'user', message: 'Sarah please. Can I also get hair coloring?', time: '2:32 PM', status: 'read' },
        { id: 6, type: 'ai', message: 'Absolutely! For cut + color we\'ll need 2.5 hours. What color are you thinking?', time: '2:32 PM', status: 'read' },
        { id: 7, type: 'user', message: 'Brown tones, something natural looking', time: '2:33 PM', status: 'read' },
        { id: 8, type: 'ai', message: 'Great choice! Tomorrow 3 PM with Sarah for cut + brown color is booked. May I have your name and phone?', time: '2:33 PM', status: 'read' },
        { id: 9, type: 'user', message: 'Emma Johnson, 555-0123', time: '2:34 PM', status: 'read' },
        { id: 10, type: 'ai', message: 'Thank you Emma! Your appointment is confirmed. I\'ll send a reminder. Total cost $85. See you tomorrow! 💇‍♀️', time: '2:34 PM', status: 'read' }
      ]
    },
    {
      id: 'dentist',
      name: language === 'tr' ? 'Diş Hekimi' : 'Dentist',
      icon: '🦷',
      conversation: language === 'tr' ? [
        { id: 1, type: 'user', message: 'Diş ağrım var, acil randevu alabilir miyim?', time: '11:15', status: 'read' },
        { id: 2, type: 'ai', message: 'Merhaba! Ağrı ne kadar süredir devam ediyor? Bugün için acil slot ayarlayabilirim.', time: '11:15', status: 'read' },
        { id: 3, type: 'user', message: '2 gündür çok ağrıyor, dayanamıyorum', time: '11:16', status: 'read' },
        { id: 4, type: 'ai', message: 'Anlıyorum, çok üzgünüm. Bugün 15:30\'da Dr. Mehmet Bey\'in acil muayene saati var. Uygun mu?', time: '11:16', status: 'read' },
        { id: 5, type: 'user', message: 'Evet uygun, ağrı kesici aldım ama geçmiyor', time: '11:17', status: 'read' },
        { id: 6, type: 'ai', message: 'Bugün 15:30\'da sizi bekleyeceğiz. Kimlik ve sigorta kartınızı getirin. Hangi dişiniz ağrıyor?', time: '11:17', status: 'read' },
        { id: 7, type: 'user', message: 'Sol alt çene, arka diş', time: '11:18', status: 'read' },
        { id: 8, type: 'ai', message: 'Anladım. Muhtemelen iltihap var. Dr. Mehmet Bey röntgen çekip tedaviyi planlayacak. Adınızı alabilir miyim?', time: '11:18', status: 'read' },
        { id: 9, type: 'user', message: 'Ahmet Kaya, 0532-987-6543', time: '11:19', status: 'read' },
        { id: 10, type: 'ai', message: 'Ahmet Bey, bugün 15:30 acil randevunuz hazır. Geçmiş olsun, Dr. Mehmet Bey size yardımcı olacak. 🦷', time: '11:19', status: 'read' }
      ] : [
        { id: 1, type: 'user', message: 'I have tooth pain, can I get emergency appointment?', time: '11:15 AM', status: 'read' },
        { id: 2, type: 'ai', message: 'Hello! How long has the pain been going on? I can arrange emergency slot today.', time: '11:15 AM', status: 'read' },
        { id: 3, type: 'user', message: 'For 2 days, very painful, can\'t bear it', time: '11:16 AM', status: 'read' },
        { id: 4, type: 'ai', message: 'I understand, so sorry. Dr. Smith has emergency slot today 3:30 PM. Does that work?', time: '11:16 AM', status: 'read' },
        { id: 5, type: 'user', message: 'Yes that works, took painkillers but not helping', time: '11:17 AM', status: 'read' },
        { id: 6, type: 'ai', message: 'We\'ll see you today 3:30 PM. Bring ID and insurance card. Which tooth is hurting?', time: '11:17 AM', status: 'read' },
        { id: 7, type: 'user', message: 'Left lower jaw, back tooth', time: '11:18 AM', status: 'read' },
        { id: 8, type: 'ai', message: 'I see. Likely an infection. Dr. Smith will take X-ray and plan treatment. May I have your name?', time: '11:18 AM', status: 'read' },
        { id: 9, type: 'user', message: 'John Davis, 555-9876', time: '11:19 AM', status: 'read' },
        { id: 10, type: 'ai', message: 'John, your emergency appointment today 3:30 PM is set. Feel better soon, Dr. Smith will help you. 🦷', time: '11:19 AM', status: 'read' }
      ]
    },
    {
      id: 'lawyer',
      name: language === 'tr' ? 'Hukuk Bürosu' : 'Law Firm',
      icon: '⚖️',
      conversation: language === 'tr' ? [
        { id: 1, type: 'user', message: 'Boşanma davası için avukat arıyorum', time: '14:20', status: 'read' },
        { id: 2, type: 'ai', message: 'Merhaba! Aile hukuku uzmanımız Av. Ayşe Hanım ile görüşmenizi ayarlayabilirim. Durum acil mi?', time: '14:20', status: 'read' },
        { id: 3, type: 'user', message: 'Acil değil ama bu hafta görüşmek istiyorum', time: '14:21', status: 'read' },
        { id: 4, type: 'ai', message: 'Tabii. Av. Ayşe Hanım\'ın Perşembe 15:00 veya Cuma 10:00 saatleri boş. Hangi gün uygun?', time: '14:21', status: 'read' },
        { id: 5, type: 'user', message: 'Perşembe olabilir. İlk görüşme ücreti ne kadar?', time: '14:22', status: 'read' },
        { id: 6, type: 'ai', message: 'İlk danışmanlık görüşmesi 30 dakika ücretsiz. Sonrasında saatlik 500 TL. Hangi konularda destek istiyorsunuz?', time: '14:22', status: 'read' },
        { id: 7, type: 'user', message: 'Mal paylaşımı ve velayet konularında', time: '14:23', status: 'read' },
        { id: 8, type: 'ai', message: 'Anladım. Av. Ayşe Hanım bu konularda çok deneyimli. Perşembe 15:00 randevunuz hazır. Adınızı alabilir miyim?', time: '14:23', status: 'read' },
        { id: 9, type: 'user', message: 'Fatma Özkan, 0544-555-1234', time: '14:24', status: 'read' },
        { id: 10, type: 'ai', message: 'Fatma Hanım, Perşembe 15:00 Av. Ayşe Hanım ile randevunuz onaylandı. Kimlik ve evlilik cüzdanınızı getirin. ⚖️', time: '14:24', status: 'read' }
      ] : [
        { id: 1, type: 'user', message: 'Looking for lawyer for divorce case', time: '2:20 PM', status: 'read' },
        { id: 2, type: 'ai', message: 'Hello! I can arrange meeting with our family law specialist Attorney Sarah. Is this urgent?', time: '2:20 PM', status: 'read' },
        { id: 3, type: 'user', message: 'Not urgent but want to meet this week', time: '2:21 PM', status: 'read' },
        { id: 4, type: 'ai', message: 'Sure. Attorney Sarah has Thursday 3 PM or Friday 10 AM available. Which day works?', time: '2:21 PM', status: 'read' },
        { id: 5, type: 'user', message: 'Thursday works. What\'s the consultation fee?', time: '2:22 PM', status: 'read' },
        { id: 6, type: 'ai', message: 'First 30-minute consultation is free. After that $150/hour. What areas do you need help with?', time: '2:22 PM', status: 'read' },
        { id: 7, type: 'user', message: 'Property division and child custody', time: '2:23 PM', status: 'read' },
        { id: 8, type: 'ai', message: 'I see. Attorney Sarah is very experienced in these areas. Thursday 3 PM appointment set. May I have your name?', time: '2:23 PM', status: 'read' },
        { id: 9, type: 'user', message: 'Lisa Johnson, 555-1234', time: '2:24 PM', status: 'read' },
        { id: 10, type: 'ai', message: 'Lisa, Thursday 3 PM with Attorney Sarah confirmed. Bring ID and marriage certificate. ⚖️', time: '2:24 PM', status: 'read' }
      ]
    },
    {
      id: 'realestate',
      name: language === 'tr' ? 'Emlak' : 'Real Estate',
      icon: '🏠',
      conversation: language === 'tr' ? [
        { id: 1, type: 'user', message: 'Satılık 3+1 daire arıyorum', time: '16:45', status: 'read' },
        { id: 2, type: 'ai', message: 'Merhaba! Hangi bölgeyi tercih ediyorsunuz ve bütçeniz nedir?', time: '16:45', status: 'read' },
        { id: 3, type: 'user', message: 'Kadıköy civarı, 2-3 milyon arası', time: '16:46', status: 'read' },
        { id: 4, type: 'ai', message: 'Kadıköy\'de bütçenize uygun 5 dairemiz var. Asansörlü, balkonlu tercihleriniz var mı?', time: '16:46', status: 'read' },
        { id: 5, type: 'user', message: 'Asansörlü olsun, balkon önemli değil', time: '16:47', status: 'read' },
        { id: 6, type: 'ai', message: 'Mükemmel! 3 asansörlü seçeneğimiz var. Görüntüleme için ne zaman müsaitsiniz?', time: '16:47', status: 'read' },
        { id: 7, type: 'user', message: 'Hafta sonu olabilir', time: '16:48', status: 'read' },
        { id: 8, type: 'ai', message: 'Cumartesi 11:00 veya Pazar 14:00 uygun mu? Size fotoğrafları WhatsApp\'tan gönderebilirim.', time: '16:48', status: 'read' },
        { id: 9, type: 'user', message: 'Cumartesi 11:00 olsun, fotoğrafları da gönderin', time: '16:49', status: 'read' },
        { id: 10, type: 'ai', message: 'Harika! Cumartesi 11:00 görüntüleme randevunuz hazır. Fotoğrafları şimdi gönderiyorum. Adınızı alabilir miyim? 🏠', time: '16:49', status: 'read' }
      ] : [
        { id: 1, type: 'user', message: 'Looking for 3-bedroom apartment for sale', time: '4:45 PM', status: 'read' },
        { id: 2, type: 'ai', message: 'Hello! Which area do you prefer and what\'s your budget range?', time: '4:45 PM', status: 'read' },
        { id: 3, type: 'user', message: 'Downtown area, $300-400k budget', time: '4:46 PM', status: 'read' },
        { id: 4, type: 'ai', message: 'We have 5 properties downtown in your budget. Any preferences for elevator, balcony?', time: '4:46 PM', status: 'read' },
        { id: 5, type: 'user', message: 'Elevator is important, balcony not necessary', time: '4:47 PM', status: 'read' },
        { id: 6, type: 'ai', message: 'Perfect! We have 3 options with elevator. When are you available for viewing?', time: '4:47 PM', status: 'read' },
        { id: 7, type: 'user', message: 'Weekend works for me', time: '4:48 PM', status: 'read' },
        { id: 8, type: 'ai', message: 'Saturday 11 AM or Sunday 2 PM available? I can send photos via WhatsApp.', time: '4:48 PM', status: 'read' },
        { id: 9, type: 'user', message: 'Saturday 11 AM works, please send photos', time: '4:49 PM', status: 'read' },
        { id: 10, type: 'ai', message: 'Great! Saturday 11 AM viewing scheduled. Sending photos now. May I have your name? 🏠', time: '4:49 PM', status: 'read' }
      ]
    },
    {
      id: 'restaurant',
      name: language === 'tr' ? 'Restoran' : 'Restaurant',
      icon: '🍽️',
      conversation: language === 'tr' ? [
        { id: 1, type: 'user', message: 'Bu akşam 4 kişilik masa rezervasyonu yapabilir miyim?', time: '17:30', status: 'read' },
        { id: 2, type: 'ai', message: 'Merhaba! Tabii ki! Saat kaçta gelmeyi planlıyorsunuz?', time: '17:30', status: 'read' },
        { id: 3, type: 'user', message: '20:00 civarında olabilir', time: '17:31', status: 'read' },
        { id: 4, type: 'ai', message: '20:00 için 4 kişilik masamız var. İç mekan mı dış mekan mı tercih edersiniz?', time: '17:31', status: 'read' },
        { id: 5, type: 'user', message: 'Dış mekan olsun, hava güzel', time: '17:32', status: 'read' },
        { id: 6, type: 'ai', message: 'Mükemmel seçim! Bahçe bölümünde 20:00 için 4 kişilik masanız hazır. Özel bir kutlama var mı?', time: '17:32', status: 'read' },
        { id: 7, type: 'user', message: 'Doğum günü kutlaması, pasta getiriyoruz', time: '17:33', status: 'read' },
        { id: 8, type: 'ai', message: 'Ne güzel! Doğum günü süslemesi yapalım. Pasta için buzdolabımızı kullanabilirsiniz. Adınızı alabilir miyim?', time: '17:33', status: 'read' },
        { id: 9, type: 'user', message: 'Mehmet Yılmaz, 0533-444-5566', time: '17:34', status: 'read' },
        { id: 10, type: 'ai', message: 'Mehmet Bey, bu akşam 20:00 bahçede 4 kişilik masanız hazır. Doğum günü kutlu olsun! 🍽️🎂', time: '17:34', status: 'read' }
      ] : [
        { id: 1, type: 'user', message: 'Can I make reservation for 4 people tonight?', time: '5:30 PM', status: 'read' },
        { id: 2, type: 'ai', message: 'Hello! Of course! What time are you planning to come?', time: '5:30 PM', status: 'read' },
        { id: 3, type: 'user', message: 'Around 8 PM would be great', time: '5:31 PM', status: 'read' },
        { id: 4, type: 'ai', message: 'We have table for 4 at 8 PM. Indoor or outdoor seating preference?', time: '5:31 PM', status: 'read' },
        { id: 5, type: 'user', message: 'Outdoor please, weather is nice', time: '5:32 PM', status: 'read' },
        { id: 6, type: 'ai', message: 'Perfect choice! Patio table for 4 at 8 PM reserved. Any special celebration?', time: '5:32 PM', status: 'read' },
        { id: 7, type: 'user', message: 'Birthday celebration, bringing our own cake', time: '5:33 PM', status: 'read' },
        { id: 8, type: 'ai', message: 'How wonderful! We\'ll prepare birthday decorations. You can use our fridge for the cake. May I have your name?', time: '5:33 PM', status: 'read' },
        { id: 9, type: 'user', message: 'Mike Johnson, 555-4455', time: '5:34 PM', status: 'read' },
        { id: 10, type: 'ai', message: 'Mike, tonight 8 PM patio table for 4 is ready. Happy birthday celebration! 🍽️🎂', time: '5:34 PM', status: 'read' }
      ]
    },
    {
      id: 'fitness',
      name: language === 'tr' ? 'Fitness' : 'Fitness',
      icon: '💪',
      conversation: language === 'tr' ? [
        { id: 1, type: 'user', message: 'Kişisel antrenman seansı almak istiyorum', time: '08:45', status: 'read' },
        { id: 2, type: 'ai', message: 'Merhaba! Fitness hedefleriniz neler? Kilo verme, kas yapma veya genel kondisyon mu?', time: '08:45', status: 'read' },
        { id: 3, type: 'user', message: 'Kilo vermek istiyorum, 15 kilo fazlam var', time: '08:46', status: 'read' },
        { id: 4, type: 'ai', message: 'Anlıyorum. Daha önce spor deneyiminiz var mı? İlk değerlendirme seansı için ne zaman uygun?', time: '08:46', status: 'read' },
        { id: 5, type: 'user', message: 'Yeni başlıyorum, bu hafta sonu olabilir', time: '08:47', status: 'read' },
        { id: 6, type: 'ai', message: 'Mükemmel! Cumartesi 10:00 veya Pazar 14:00 uygun mu? İlk seans ücretsiz değerlendirme içerir.', time: '08:47', status: 'read' },
        { id: 7, type: 'user', message: 'Cumartesi 10:00 olsun. Beslenme programı da var mı?', time: '08:48', status: 'read' },
        { id: 8, type: 'ai', message: 'Evet! Diyetisyenimiz Selin Hanım ile beslenme planı hazırlayacağız. Cumartesi randevunuz hazır. Adınızı alabilir miyim?', time: '08:48', status: 'read' },
        { id: 9, type: 'user', message: 'Elif Demir, 0555-777-8899', time: '08:49', status: 'read' },
        { id: 10, type: 'ai', message: 'Elif Hanım, Cumartesi 10:00 ilk değerlendirme seansınız hazır. Spor kıyafeti getirin. Başarılar! 💪', time: '08:49', status: 'read' }
      ] : [
        { id: 1, type: 'user', message: 'Want to book personal training session', time: '8:45 AM', status: 'read' },
        { id: 2, type: 'ai', message: 'Hello! What are your fitness goals? Weight loss, muscle building, or general conditioning?', time: '8:45 AM', status: 'read' },
        { id: 3, type: 'user', message: 'Want to lose weight, need to lose 15kg', time: '8:46 AM', status: 'read' },
        { id: 4, type: 'ai', message: 'I understand. Do you have previous exercise experience? When works for initial assessment?', time: '8:46 AM', status: 'read' },
        { id: 5, type: 'user', message: 'I\'m a beginner, this weekend works', time: '8:47 AM', status: 'read' },
        { id: 6, type: 'ai', message: 'Perfect! Saturday 10 AM or Sunday 2 PM available? First session includes free assessment.', time: '8:47 AM', status: 'read' },
        { id: 7, type: 'user', message: 'Saturday 10 AM works. Do you have nutrition program?', time: '8:48 AM', status: 'read' },
        { id: 8, type: 'ai', message: 'Yes! Our nutritionist Sarah will prepare meal plan for you. Saturday appointment set. May I have your name?', time: '8:48 AM', status: 'read' },
        { id: 9, type: 'user', message: 'Emma Wilson, 555-7788', time: '8:49 AM', status: 'read' },
        { id: 10, type: 'ai', message: 'Emma, Saturday 10 AM initial assessment ready. Bring workout clothes. Good luck! 💪', time: '8:49 AM', status: 'read' }
      ]
    }
  ];

  const selectedIndustryData = industries.find(ind => ind.id === selectedIndustry) || industries[0];

  // Auto-play conversation effect
  useEffect(() => {
    if (!isPlaying) return;

    const messages = selectedIndustryData.conversation;
    let messageIndex = 0;

    const playNextMessage = () => {
      if (messageIndex >= messages.length) {
        setIsPlaying(false);
        return;
      }

      const message = messages[messageIndex];

      // Show typing indicator for AI messages
      if (message.type === 'ai') {
        setIsTyping(true);
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setDisplayedMessages(prev => [...prev, message]);
          setCurrentMessageIndex(messageIndex + 1);
          messageIndex++;
          
          // Schedule next message
          timeoutRef.current = setTimeout(playNextMessage, 2000);
        }, 1500);
      } else {
        // User messages appear immediately
        setDisplayedMessages(prev => [...prev, message]);
        setCurrentMessageIndex(messageIndex + 1);
        messageIndex++;
        
        // Schedule next message
        timeoutRef.current = setTimeout(playNextMessage, 1000);
      }
    };

    // Start playing messages
    playNextMessage();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, selectedIndustryData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages]);

  const playDemo = () => {
    setIsPlaying(true);
  };

  const pauseDemo = () => {
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsTyping(false);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
    setIsTyping(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleIndustryChange = (industryId: string) => {
    if (industryId !== selectedIndustry) {
      resetDemo();
      setSelectedIndustry(industryId);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="py-8 md:py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'tr' ? 'AI Asistanınızı Aksiyonda Görün' : 'See Your AI Assistant In Action'}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {language === 'tr' 
              ? 'Farklı sektörlerden gerçek müşteri konuşmalarını inceleyin ve AI asistanınızın nasıl çalıştığını görün'
              : 'Explore real customer conversations from different industries and see how your AI assistant works'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Industry Selector */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-6">
              {language === 'tr' ? 'Sektör Seçin' : 'Choose Industry'}
            </h3>
            <div className="space-y-3">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleIndustryChange(industry.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedIndustry === industry.id
                      ? 'bg-gray-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{industry.icon}</span>
                    <span className="font-medium">{industry.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
              {/* WhatsApp Header */}
              <div className="bg-gray-700 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={logoSvg} alt="Allync" className="w-10 h-10 rounded-full mr-3 bg-white p-1" />
                  <div>
                    <h4 className="text-white font-semibold">Allync AI</h4>
                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 animate-pulse"></div>
                      {language === 'tr' ? 'çevrimiçi' : 'online'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
                  <Video className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
                  <MoreVertical className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 bg-gray-800" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="whatsapp-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Cpath d="M0 0h100v100H0z" fill="%23111827"/%3E%3Cpath d="M0 0l100 100M100 0L0 100" stroke="%23374151" stroke-width="0.5" opacity="0.1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23whatsapp-bg)"/%3E%3C/svg%3E")' }}>
                <div className="space-y-4">
                  {displayedMessages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-gray-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.message}</p>
                        <div className="flex items-center justify-end mt-1 space-x-1">
                          <span className="text-xs opacity-70">{message.time}</span>
                          {message.type === 'user' && (
                            <div className="flex space-x-1">
                              <div className="w-3 h-3">
                                <svg viewBox="0 0 16 15" className="w-full h-full fill-current opacity-60">
                                  <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l3.61 3.463c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.064-.512z"/>
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 px-4 py-2 rounded-lg rounded-bl-sm max-w-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat Input Area */}
              <div className="bg-gray-700 p-4 flex items-center space-x-3">
                <Smile className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-300" />
                <Paperclip className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-300" />
                <div className="flex-1 bg-gray-600 rounded-full px-4 py-2">
                  <span className="text-gray-400 text-sm">
                    {language === 'tr' ? 'Mesaj yazın...' : 'Type a message...'}
                  </span>
                </div>
                <Mic className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-300" />
              </div>
            </div>

            {/* Demo Controls */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={isPlaying ? pauseDemo : playDemo}
                className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    {language === 'tr' ? 'Duraklat' : 'Pause'}
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    {language === 'tr' ? 'Demoyu Başlat' : 'Start Demo'}
                  </>
                )}
              </button>
              
              <button
                onClick={resetDemo}
                className="flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors duration-300"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                {language === 'tr' ? 'Sıfırla' : 'Reset'}
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>{language === 'tr' ? 'İlerleme' : 'Progress'}</span>
                <span>{currentMessageIndex}/{selectedIndustryData.conversation.length}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gray-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentMessageIndex / selectedIndustryData.conversation.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppChatDemo;