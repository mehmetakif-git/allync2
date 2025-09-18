import React from 'react';
import { Zap, Users, ArrowRight, Sparkles } from 'lucide-react';
import { translations } from '../utils/translations';
import logoSvg from '/logo.svg';

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  language: 'tr' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ language, ...props }) => {
  const t = translations[language];

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-gradient') as HTMLElement;
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-black dynamic-bg" {...props}>
      {/* Cursor Following Gradient */}
      <div className="cursor-gradient"></div>
      
      {/* Dynamic Background Layers */}
      <div className="diagonal-gradient"></div>
      <div className="wave-gradient"></div>
      <div className="mesh-gradient"></div>
      
      {/* Floating Gradient Orbs */}
      <div className="gradient-orb gradient-orb-1"></div>
      <div className="gradient-orb gradient-orb-2"></div>
      <div className="gradient-orb gradient-orb-3"></div>
      
      {/* Logo Background Elements */}
      <div className="logo-watermark">Allync</div>
      <div className="lettermark-a">A</div>
      <div className="logo-glow"></div>
      <div className="geometric-pattern"></div>
      
      {/* Logo Particles */}
      <div className="logo-particle"></div>
      <div className="logo-particle"></div>
      <div className="logo-particle"></div>
      <div className="logo-particle"></div>
      <div className="logo-particle"></div>

      {/* Cursor Following Gradient */}
      <div className="cursor-gradient"></div>
      
      {/* Dynamic Background Layers */}
      <div className="diagonal-gradient"></div>
      <div className="wave-gradient"></div>
      <div className="mesh-gradient"></div>
      
      {/* Floating Gradient Orbs */}
      <div className="gradient-orb gradient-orb-1"></div>
      <div className="gradient-orb gradient-orb-2"></div>
      <div className="gradient-orb gradient-orb-3"></div>
      
      {/* Logo Background Elements */}
      <div className="logo-watermark">Allync</div>
      <div className="lettermark-a">A</div>
      <div className="logo-glow"></div>
      <div className="geometric-pattern"></div>
      
      {/* Logo Particles */}
      <div className="logo-particle"></div>
      <div className="logo-particle"></div>
      <div className="logo-particle"></div>
      <div className="logo-particle"></div>
      <div className="logo-particle"></div>

      {/* Particle background */}
      <div className="particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* Morphing shapes */}
      <div className="absolute top-1/4 left-1/4 morph-shape"></div>
      <div className="absolute bottom-1/3 right-1/3 morph-shape" style={{ animationDelay: '2s' }}></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl breathe"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl breathe delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/3 rounded-full blur-3xl breathe delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className="hero-logo inline-flex items-center px-4 py-2 rounded-full glass bg-white/5 border border-gray-600 mb-8 hover:bg-white/10 transition-all duration-500 magnetic">
            <Sparkles className="w-4 h-4 text-gray-300 mr-2 animate-pulse" />
            <span className="text-sm text-gray-300 typewriter">{t.heroSlogan}</span>
          </div>

          {/* Company Name */}
          <div className="hero-title mb-6">
            <div className="flex items-center justify-center mb-4">
              <img src={logoSvg} alt="Allync" className="h-16 md:h-24 w-auto mr-4" />
              <h1 className="text-6xl md:text-8xl font-bold text-white glitch text-glow" data-text="Allync">
                Allync
              </h1>
            </div>
            <p className="text-lg text-gray-400 italic gradient-text">Beyond Human Automation</p>
          </div>

          {/* Main headline */}
          <h2 className="hero-subtitle text-4xl md:text-6xl font-bold text-white mb-6 leading-tight text-reveal">
            {t.heroTitle}
            <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent block mt-2">
              WhatsApp AI Asistanları
            </span>
          </h2>

          <p className="hero-subtitle text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">{t.heroSubtitle}</p>

          {/* CTA buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group btn-premium px-8 py-4 rounded-lg font-semibold text-white flex items-center justify-center"
            >
              {t.getAssistant}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button 
              onClick={() => {
                const demoSection = document.getElementById('chat-demo');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 glass bg-white/5 border border-gray-600 rounded-lg font-semibold text-white"
            >
              {t.watchDemo}
            </button>
          </div>

          {/* Feature highlights */}
          <div className="hero-features grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl glass bg-white/5 border border-gray-600">
              <img src={logoSvg} alt="Allync" className="w-8 h-8 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">{t.humanLike}</h3>
              <p className="text-gray-400 text-sm">{t.humanLikeDesc}</p>
            </div>
            
            <div className="p-6 rounded-xl glass bg-white/5 border border-gray-600">
              <Users className="w-8 h-8 text-gray-300 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">{t.support247}</h3>
              <p className="text-gray-400 text-sm">{t.support247Desc}</p>
            </div>
            
            <div className="p-6 rounded-xl glass bg-white/5 border border-gray-600">
              <Zap className="w-8 h-8 text-gray-400 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">{t.oneTimePayment}</h3>
              <p className="text-gray-400 text-sm">{t.oneTimePaymentDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};