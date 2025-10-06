import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../utils/translations';
import logoSvg from '../assets/logo.svg';

interface WhatsAppChatDemoProps {
  language: 'tr' | 'en';
}

interface Message {
  id: number;
  type: 'user' | 'ai';
  text: string;
  time: string;
}

interface Industry {
  id: string;
  name: string;
  icon: string;
  messages: Message[];
}

export const WhatsAppChatDemo: React.FC<WhatsAppChatDemoProps> = ({ language }) => {
  const t = translations[language];
  const [selectedIndustry, setSelectedIndustry] = useState('salon');
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const industries: Industry[] = [
    {
      id: 'salon',
      name: language === 'tr' ? 'Güzellik Salonu' : 'Beauty Salon',
      icon: '💇‍♀️',
      messages: language === 'tr' ? [
        { id: 1, type: 'user', text: 'Merhaba! Yarın için saç kesimi randevusu alabilir miyim?', time: '14:30' },
        { id: 2, type: 'ai', text: 'Merhaba! Tabii ki! Yarın için hangi saat uygun? 10:00-18:00 arası çalışıyoruz.', time: '14:30' },
        { id: 3, type: 'user', text: 'Öğleden sonra 15:00 civarı olabilir mi?', time: '14:31' },
        { id: 4, type: 'ai', text: 'Mükemmel! 15:00 için yerimiz var. Hangi kuaförümüzle çalışmak istersiniz?', time: '14:31' },
        { id: 5, type: 'user', text: 'Ayşe Hanım ile olsun. Saç boyası da yaptırabilir miyim?', time: '14:32' },
        { id: 6, type: 'ai', text: 'Elbette! Saç kesimi + boya için 2.5 saat ayıralım. Hangi rengi düşünüyorsunuz?', time: '14:32' },
        { id: 7, type: 'user', text: 'Kahverengi tonları, doğal görünsün', time: '14:33' },
        { id: 8, type: 'ai', text: 'Harika! Yarın 15:00 Ayşe Hanım ile randevunuz onaylandı. Adınızı alabilir miyim?', time: '14:33' }
      ] : [
        { id: 1, type: 'user', text: 'Hi! Can I book a haircut appointment for tomorrow?', time: '2:30 PM' },
        { id: 2, type: 'ai', text: 'Hello! Of course! What time works for you tomorrow? We\'re open 10 AM - 6 PM.', time: '2:30 PM' },
        { id: 3, type: 'user', text: 'Around 3 PM in the afternoon would be great', time: '2:31 PM' },
        { id: 4, type: 'ai', text: 'Perfect! We have 3 PM available. Which stylist would you prefer?', time: '2:31 PM' },
        { id: 5, type: 'user', text: 'Sarah please. Can I also get hair coloring?', time: '2:32 PM' },
        { id: 6, type: 'ai', text: 'Absolutely! For cut + color we\'ll need 2.5 hours. What color are you thinking?', time: '2:32 PM' },
        { id: 7, type: 'user', text: 'Brown tones, something natural looking', time: '2:33 PM' },
        { id: 8, type: 'ai', text: 'Great choice! Tomorrow 3 PM with Sarah is booked. May I have your name?', time: '2:33 PM' }
      ]
    },
    {
      id: 'dentist',
      name: language === 'tr' ? 'Diş Hekimi' : 'Dentist',
      icon: '🦷',
      messages: language === 'tr' ? [
        { id: 1, type: 'user', text: 'Diş ağrım var, acil randevu alabilir miyim?', time: '11:15' },
        { id: 2, type: 'ai', text: 'Merhaba! Ağrı ne kadar süredir devam ediyor? Bugün için acil slot ayarlayabilirim.', time: '11:15' },
        { id: 3, type: 'user', text: '2 gündür çok ağrıyor, dayanamıyorum', time: '11:16' },
        { id: 4, type: 'ai', text: 'Anlıyorum, çok üzgünüm. Bugün 15:30\'da Dr. Mehmet Bey\'in acil muayene saati var.', time: '11:16' },
        { id: 5, type: 'user', text: 'Evet uygun, ağrı kesici aldım ama geçmiyor', time: '11:17' },
        { id: 6, type: 'ai', text: 'Bugün 15:30\'da sizi bekleyeceğiz. Kimlik ve sigorta kartınızı getirin.', time: '11:17' },
        { id: 7, type: 'user', text: 'Tamam, teşekkürler. Ahmet Kaya, 0532-987-6543', time: '11:18' },
        { id: 8, type: 'ai', text: 'Ahmet Bey, bugün 15:30 acil randevunuz hazır. Geçmiş olsun! 🦷', time: '11:18' }
      ] : [
        { id: 1, type: 'user', text: 'I have tooth pain, can I get emergency appointment?', time: '11:15 AM' },
        { id: 2, type: 'ai', text: 'Hello! How long has the pain been going on? I can arrange emergency slot today.', time: '11:15 AM' },
        { id: 3, type: 'user', text: 'For 2 days, very painful, can\'t bear it', time: '11:16 AM' },
        { id: 4, type: 'ai', text: 'I understand, so sorry. Dr. Smith has emergency slot today 3:30 PM.', time: '11:16 AM' },
        { id: 5, type: 'user', text: 'Yes that works, took painkillers but not helping', time: '11:17 AM' },
        { id: 6, type: 'ai', text: 'We\'ll see you today 3:30 PM. Bring ID and insurance card.', time: '11:17 AM' },
        { id: 7, type: 'user', text: 'Okay, thank you. John Davis, 555-9876', time: '11:18 AM' },
        { id: 8, type: 'ai', text: 'John, your emergency appointment today 3:30 PM is set. Feel better! 🦷', time: '11:18 AM' }
      ]
    },
    {
      id: 'lawyer',
      name: language === 'tr' ? 'Hukuk Bürosu' : 'Law Firm',
      icon: '⚖️',
      messages: language === 'tr' ? [
        { id: 1, type: 'user', text: 'Boşanma davası için avukat arıyorum', time: '14:20' },
        { id: 2, type: 'ai', text: 'Merhaba! Aile hukuku uzmanımız Av. Ayşe Hanım ile görüşmenizi ayarlayabilirim.', time: '14:20' },
        { id: 3, type: 'user', text: 'Bu hafta görüşmek istiyorum', time: '14:21' },
        { id: 4, type: 'ai', text: 'Av. Ayşe Hanım\'ın Perşembe 15:00 veya Cuma 10:00 saatleri boş. Hangi gün uygun?', time: '14:21' },
        { id: 5, type: 'user', text: 'Perşembe olabilir. İlk görüşme ücreti ne kadar?', time: '14:22' },
        { id: 6, type: 'ai', text: 'İlk danışmanlık görüşmesi 30 dakika ücretsiz. Sonrasında saatlik 500 TL.', time: '14:22' },
        { id: 7, type: 'user', text: 'Anladım. Fatma Özkan, 0544-555-1234', time: '14:23' },
        { id: 8, type: 'ai', text: 'Fatma Hanım, Perşembe 15:00 Av. Ayşe Hanım ile randevunuz onaylandı. ⚖️', time: '14:23' }
      ] : [
        { id: 1, type: 'user', text: 'Looking for lawyer for divorce case', time: '2:20 PM' },
        { id: 2, type: 'ai', text: 'Hello! I can arrange meeting with our family law specialist Attorney Sarah.', time: '2:20 PM' },
        { id: 3, type: 'user', text: 'Want to meet this week', time: '2:21 PM' },
        { id: 4, type: 'ai', text: 'Attorney Sarah has Thursday 3 PM or Friday 10 AM available. Which day works?', time: '2:21 PM' },
        { id: 5, type: 'user', text: 'Thursday works. What\'s the consultation fee?', time: '2:22 PM' },
        { id: 6, type: 'ai', text: 'First 30-minute consultation is free. After that $150/hour.', time: '2:22 PM' },
        { id: 7, type: 'user', text: 'I see. Lisa Johnson, 555-1234', time: '2:23 PM' },
        { id: 8, type: 'ai', text: 'Lisa, Thursday 3 PM with Attorney Sarah confirmed. ⚖️', time: '2:23 PM' }
      ]
    },
    {
      id: 'realestate',
      name: language === 'tr' ? 'Emlak' : 'Real Estate',
      icon: '🏠',
      messages: language === 'tr' ? [
        { id: 1, type: 'user', text: 'Satılık 3+1 daire arıyorum', time: '16:45' },
        { id: 2, type: 'ai', text: 'Merhaba! Hangi bölgeyi tercih ediyorsunuz ve bütçeniz nedir?', time: '16:45' },
        { id: 3, type: 'user', text: 'Kadıköy civarı, 2-3 milyon arası', time: '16:46' },
        { id: 4, type: 'ai', text: 'Kadıköy\'de bütçenize uygun 5 dairemiz var. Asansörlü tercih eder misiniz?', time: '16:46' },
        { id: 5, type: 'user', text: 'Asansörlü olsun, balkon önemli değil', time: '16:47' },
        { id: 6, type: 'ai', text: 'Mükemmel! 3 asansörlü seçeneğimiz var. Görüntüleme için ne zaman müsaitsiniz?', time: '16:47' },
        { id: 7, type: 'user', text: 'Hafta sonu olabilir', time: '16:48' },
        { id: 8, type: 'ai', text: 'Cumartesi 11:00 görüntüleme randevunuz hazır. Fotoğrafları gönderiyorum. 🏠', time: '16:48' }
      ] : [
        { id: 1, type: 'user', text: 'Looking for 3-bedroom apartment for sale', time: '4:45 PM' },
        { id: 2, type: 'ai', text: 'Hello! Which area do you prefer and what\'s your budget range?', time: '4:45 PM' },
        { id: 3, type: 'user', text: 'Downtown area, $300-400k budget', time: '4:46 PM' },
        { id: 4, type: 'ai', text: 'We have 5 properties downtown in your budget. Any preference for elevator?', time: '4:46 PM' },
        { id: 5, type: 'user', text: 'Elevator is important, balcony not necessary', time: '4:47 PM' },
        { id: 6, type: 'ai', text: 'Perfect! We have 3 options with elevator. When are you available for viewing?', time: '4:47 PM' },
        { id: 7, type: 'user', text: 'Weekend works for me', time: '4:48 PM' },
        { id: 8, type: 'ai', text: 'Saturday 11 AM viewing scheduled. Sending photos now. 🏠', time: '4:48 PM' }
      ]
    },
    {
      id: 'restaurant',
      name: language === 'tr' ? 'Restoran' : 'Restaurant',
      icon: '🍽️',
      messages: language === 'tr' ? [
        { id: 1, type: 'user', text: 'Bu akşam 4 kişilik masa rezervasyonu yapabilir miyim?', time: '17:30' },
        { id: 2, type: 'ai', text: 'Merhaba! Tabii ki! Saat kaçta gelmeyi planlıyorsunuz?', time: '17:30' },
        { id: 3, type: 'user', text: '20:00 civarında olabilir', time: '17:31' },
        { id: 4, type: 'ai', text: '20:00 için 4 kişilik masamız var. İç mekan mı dış mekan mı tercih edersiniz?', time: '17:31' },
        { id: 5, type: 'user', text: 'Dış mekan olsun, hava güzel', time: '17:32' },
        { id: 6, type: 'ai', text: 'Mükemmel! Bahçe bölümünde 20:00 için 4 kişilik masanız hazır.', time: '17:32' },
        { id: 7, type: 'user', text: 'Doğum günü kutlaması, pasta getiriyoruz', time: '17:33' },
        { id: 8, type: 'ai', text: 'Ne güzel! Doğum günü süslemesi yapalım. Mehmet Bey, masanız hazır! 🍽️', time: '17:33' }
      ] : [
        { id: 1, type: 'user', text: 'Can I make reservation for 4 people tonight?', time: '5:30 PM' },
        { id: 2, type: 'ai', text: 'Hello! Of course! What time are you planning to come?', time: '5:30 PM' },
        { id: 3, type: 'user', text: 'Around 8 PM would be great', time: '5:31 PM' },
        { id: 4, type: 'ai', text: 'We have table for 4 at 8 PM. Indoor or outdoor seating preference?', time: '5:31 PM' },
        { id: 5, type: 'user', text: 'Outdoor please, weather is nice', time: '5:32 PM' },
        { id: 6, type: 'ai', text: 'Perfect choice! Patio table for 4 at 8 PM reserved.', time: '5:32 PM' },
        { id: 7, type: 'user', text: 'Birthday celebration, bringing our own cake', time: '5:33 PM' },
        { id: 8, type: 'ai', text: 'Wonderful! We\'ll prepare decorations. Mike, your table is ready! 🍽️', time: '5:33 PM' }
      ]
    },
    {
      id: 'fitness',
      name: language === 'tr' ? 'Fitness' : 'Fitness',
      icon: '💪',
      messages: language === 'tr' ? [
        { id: 1, type: 'user', text: 'Kişisel antrenman seansı almak istiyorum', time: '08:45' },
        { id: 2, type: 'ai', text: 'Merhaba! Fitness hedefleriniz neler? Kilo verme, kas yapma veya genel kondisyon mu?', time: '08:45' },
        { id: 3, type: 'user', text: 'Kilo vermek istiyorum, 15 kilo fazlam var', time: '08:46' },
        { id: 4, type: 'ai', text: 'Anlıyorum. Daha önce spor deneyiminiz var mı? İlk değerlendirme seansı için ne zaman uygun?', time: '08:46' },
        { id: 5, type: 'user', text: 'Yeni başlıyorum, bu hafta sonu olabilir', time: '08:47' },
        { id: 6, type: 'ai', text: 'Mükemmel! Cumartesi 10:00 uygun mu? İlk seans ücretsiz değerlendirme içerir.', time: '08:47' },
        { id: 7, type: 'user', text: 'Cumartesi olsun. Beslenme programı da var mı?', time: '08:48' },
        { id: 8, type: 'ai', text: 'Evet! Diyetisyenimizle beslenme planı hazırlayacağız. Elif Hanım, başarılar! 💪', time: '08:48' }
      ] : [
        { id: 1, type: 'user', text: 'Want to book personal training session', time: '8:45 AM' },
        { id: 2, type: 'ai', text: 'Hello! What are your fitness goals? Weight loss, muscle building, or general conditioning?', time: '8:45 AM' },
        { id: 3, type: 'user', text: 'Want to lose weight, need to lose 15kg', time: '8:46 AM' },
        { id: 4, type: 'ai', text: 'I understand. Do you have previous exercise experience? When works for initial assessment?', time: '8:46 AM' },
        { id: 5, type: 'user', text: 'I\'m a beginner, this weekend works', time: '8:47 AM' },
        { id: 6, type: 'ai', text: 'Perfect! Saturday 10 AM available? First session includes free assessment.', time: '8:47 AM' },
        { id: 7, type: 'user', text: 'Saturday works. Do you have nutrition program?', time: '8:48 AM' },
        { id: 8, type: 'ai', text: 'Yes! Our nutritionist will prepare meal plan. Emma, good luck! 💪', time: '8:48 AM' }
      ]
    }
  ];

  const currentIndustry = industries.find(ind => ind.id === selectedIndustry) || industries[0];

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setDisplayedMessages([]);
    setIsTyping(false);

    let messageIndex = 0;
    const messages = currentIndustry.messages;

    const showNextMessage = () => {
      if (messageIndex >= messages.length) {
        // Restart conversation after completion
        setTimeout(() => {
          setDisplayedMessages([]);
          messageIndex = 0;
          showNextMessage();
        }, 5000);
        return;
      }

      const message = messages[messageIndex];

      if (message.type === 'ai') {
        // Show typing indicator for AI messages
        setIsTyping(true);
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setDisplayedMessages(prev => [...prev, message]);
          messageIndex++;
          timeoutRef.current = setTimeout(showNextMessage, 2500);
        }, 1500);
      } else {
        // User messages appear immediately
        setDisplayedMessages(prev => [...prev, message]);
        messageIndex++;
        timeoutRef.current = setTimeout(showNextMessage, 1500);
      }
    };

    // Start conversation
    timeoutRef.current = setTimeout(showNextMessage, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedIndustry, currentIndustry]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages, isTyping]);

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
                  onClick={() => setSelectedIndustry(industry.id)}
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
              <div className="bg-gray-700 p-4 flex items-center">
                <img src={logoSvg} alt="Allync" className="w-10 h-10 rounded-full mr-3 bg-white p-1" />
                <div>
                  <h4 className="text-white font-semibold">Allync AI</h4>
                  <div className="flex items-center text-gray-300 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    {language === 'tr' ? 'çevrimiçi' : 'online'}
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 bg-gray-800">
                <div className="space-y-4">
                  {displayedMessages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-gray-600 text-white rounded-br-sm'
                          : 'bg-gray-300 text-gray-800 rounded-bl-sm'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <div className="flex items-center justify-end mt-1">
                          <span className="text-xs opacity-70">{message.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg rounded-bl-sm max-w-xs">
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

              {/* Chat Input Area (Visual Only) */}
              <div className="bg-gray-700 p-4 flex items-center">
                <div className="flex-1 bg-gray-600 rounded-full px-4 py-2">
                  <span className="text-gray-400 text-sm">
                    {language === 'tr' ? 'Mesaj yazın...' : 'Type a message...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppChatDemo;