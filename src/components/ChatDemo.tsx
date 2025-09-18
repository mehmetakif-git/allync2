import React, { useState } from 'react';
import { User, Bot, Clock, Settings, Play, Pause, BarChart3, ChevronDown } from 'lucide-react';
import { translations } from '../utils/translations';
import logoSvg from '/logo.svg';

interface ChatDemoProps {
  language: 'tr' | 'en';
}

export const ChatDemo: React.FC<ChatDemoProps> = ({ language }) => {
  const t = translations[language];
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState('normal');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messageCount] = useState(2847);
  const [responseTime] = useState(2.1);
  
  const speedSettings = {
    slow: 3000,
    normal: 1500,
    fast: 500
  };
  
  const conversation = [
    { type: 'user', message: t.chatUser1, time: '14:14' },
    { type: 'bot', message: t.chatBot1, time: '14:14' },
    { type: 'user', message: t.chatUser2, time: '14:15' },
    { type: 'bot', message: t.chatBot2, time: '14:15' },
    { type: 'user', message: t.chatUser3, time: '14:16' },
    { type: 'bot', message: t.chatBot3, time: '14:16' },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (newSpeed: string) => {
    setSpeed(newSpeed);
  };

  const scrollToDemo = () => {
    const demoSection = document.getElementById('chat-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 md:py-16 relative bg-black" style={{ display: 'block', opacity: 1 }}>
      
      <div className="max-w-1200px mx-auto px-5 sm:px-6 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="text-center mb-8 md:mb-16 section-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.chatDemoTitle}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.chatDemoSubtitle}</p>
          
          {/* Live Statistics */}
          <div className="flex justify-center items-center gap-8 mt-8 mb-6">
            <div className="flex items-center text-gray-300">
              <BarChart3 className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-sm">{messageCount.toLocaleString()} {language === 'tr' ? 'mesaj işlendi' : 'messages processed'}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-sm">{responseTime.toFixed(1)}s {language === 'tr' ? 'ortalama yanıt' : 'avg response'}</span>
            </div>
          </div>
          
          {/* Demo Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePlayPause}
              className="flex items-center px-6 py-3 glass bg-white/5 border border-gray-600 rounded-lg font-semibold text-white hover:bg-white/10 transition-all duration-500 btn-ripple"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isPlaying ? t.pauseDemo : t.playDemo}
            </button>
            
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">{language === 'tr' ? 'Hız:' : 'Speed:'}</span>
              <div className="relative">
                <select
                  value={speed}
                  onChange={(e) => handleSpeedChange(e.target.value)}
                  className="appearance-none bg-white/5 border border-gray-600 rounded px-3 py-1 text-white text-sm pr-8 focus:outline-none focus:border-gray-400 transition-colors"
                  style={{ zIndex: 1000 }}
                >
                  <option value="slow" className="bg-gray-800 text-white">
                    {language === 'tr' ? 'Yavaş' : 'Slow'}
                  </option>
                  <option value="normal" className="bg-gray-800 text-white">
                    {language === 'tr' ? 'Normal' : 'Normal'}
                  </option>
                  <option value="fast" className="bg-gray-800 text-white">
                    {language === 'tr' ? 'Hızlı' : 'Fast'}
                  </option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <button
              onClick={scrollToDemo}
              className="px-4 py-2 glass bg-white/5 border border-gray-600 rounded-lg text-white text-sm hover:bg-white/10 transition-all duration-300"
            >
              {language === 'tr' ? 'Demo\'ya Git' : 'Go to Demo'}
            </button>
            
            <div className="text-xs text-gray-500">
              <span className="text-xs text-gray-500">
                {language === 'tr' ? `Hız: ${speed}` : `Speed: ${speed}`}
              </span>
            </div>
          </div>
        </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Chat Interface */}
          <div className="relative fade-in-left order-2 lg:order-1">
            <div className="glass bg-white/5 border border-gray-600 rounded-2xl p-6 shadow-2xl chat-container">
              {/* Chat Header */}
              <div className="flex items-center mb-4 lg:mb-6 p-3 lg:p-4 glass bg-white/5 rounded-lg border border-gray-700 holographic-shimmer">
                <img src={logoSvg} alt="Allync" className="w-10 h-10 mr-3" />
                <div>
                  <h3 className="text-white font-semibold">Allync AI</h3>
                  <p className="text-gray-300 text-sm flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    {language === 'tr' ? 'Çevrimiçi' : 'Online'}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="demo-chat-container space-y-3 lg:space-y-4 overflow-y-auto message-container px-1">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn message-item`}
                    style={{ minHeight: '50px', willChange: 'transform' }}
                  >
                    <div className={`flex items-start max-w-[280px] sm:max-w-xs lg:max-w-sm ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${
                        msg.type === 'user' ? 'bg-gray-600 ml-2' : 'bg-gradient-to-r from-gray-700 to-gray-600 mr-2'
                      }`}>
                        {msg.type === 'user' ? (
                          <User className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                        )}
                      </div>
                      <div className={`px-3 py-2 lg:px-4 lg:py-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-gray-600 text-white rounded-br-sm border border-gray-500' 
                          : 'glass bg-white/10 text-gray-200 rounded-bl-sm border border-gray-600'
                      }`}>
                        <p className="text-xs lg:text-sm leading-relaxed">{msg.message}</p>
                        <p className="text-xs opacity-60 mt-1 flex items-center">
                          <Clock className="w-2 h-2 lg:w-3 lg:h-3 mr-1" />
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Typing Indicator */}
              <div className="typing-indicator" style={{ minHeight: '40px', contain: 'layout' }}>
                <div className="flex items-center mt-4 text-gray-400 text-sm">
                  <Bot className="w-4 h-4 mr-2" />
                  <span>{t.aiTyping}</span>
                  <div className="flex ml-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDuration: `${speedSettings[speed]}ms` }}></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.2s', animationDuration: `${speedSettings[speed]}ms` }}></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse ml-1" style={{ animationDelay: '0.4s', animationDuration: `${speedSettings[speed]}ms` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-6 lg:space-y-8 fade-in-right order-1 lg:order-2">
            <div className="group p-6 rounded-xl glass bg-white/5 border border-gray-600 hover:bg-white/10 transition-all duration-500 card-depth">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <img src={logoSvg} alt="Allync" className="w-6 h-6 mr-3" />
                {t.naturalConversations}
              </h3>
              <p className="text-gray-400">{t.naturalConversationsDesc}</p>
            </div>

            <div className="group p-6 rounded-xl glass bg-white/5 border border-gray-600 hover:bg-white/10 transition-all duration-500 card-depth stagger-1">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Clock className="w-6 h-6 text-gray-300 mr-3" />
                {t.instantBooking}
              </h3>
              <p className="text-gray-400">{t.instantBookingDesc}</p>
            </div>

            <div className="group p-6 rounded-xl glass bg-white/5 border border-gray-600 hover:bg-white/10 transition-all duration-500 card-depth stagger-2">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <User className="w-6 h-6 text-gray-400 mr-3" />
                {t.customerDataCapture}
              </h3>
              <p className="text-gray-400">{t.customerDataCaptureDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};