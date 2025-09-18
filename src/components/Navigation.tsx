import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';
import { translations } from '../utils/translations';
import logoSvg from '/logo.svg';

interface NavigationProps {
  language: 'tr' | 'en';
  onLanguageToggle: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ language, onLanguageToggle }) => {
  const t = translations[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const navItems = [
    { id: 'hero', label: language === 'tr' ? 'Ana Sayfa' : 'Home' },
    { id: 'chat-demo', label: 'Demo' },
    { id: 'packages', label: language === 'tr' ? 'Paketler' : 'Packages' },
    { id: 'industry-examples', label: language === 'tr' ? 'Sektörler' : 'Industries' },
    { id: 'features', label: language === 'tr' ? 'Özellikler' : 'Features' },
    { id: 'pricing', label: language === 'tr' ? 'Fiyatlar' : 'Pricing' },
    { id: 'contact', label: language === 'tr' ? 'İletişim' : 'Contact' }
  ];

  useEffect(() => {
    // Show navigation after loader completes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide back to top button
      setShowBackToTop(currentScrollY > 500);
      
      // Navigation visibility based on scroll direction
      if (currentScrollY > 100) {
        setIsScrollingUp(currentScrollY < lastScrollY);
      } else {
        setIsScrollingUp(true);
      }
      setLastScrollY(currentScrollY);

      // Update active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = currentScrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = sectionId === 'hero' ? 0 : element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 w-full max-w-full overflow-hidden ${
        isScrollingUp ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="glass bg-black/80 backdrop-blur-lg border-b border-white/10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div 
                className="flex items-center cursor-pointer group"
                onClick={() => scrollToSection('hero')}
              >
                <img src={logoSvg} alt="Allync" className="h-8 w-auto mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                  Allync
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4 lg:space-x-8 flex-wrap">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-2 lg:px-3 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full"></div>
                    )}
                  </button>
                ))}
                
                {/* Language Toggle */}
                <button
                  onClick={onLanguageToggle}
                  className="flex items-center px-2 lg:px-3 py-2 glass bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-300 flex-shrink-0"
                >
                  <span className="text-sm font-medium">{language === 'tr' ? 'EN' : 'TR'}</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={onLanguageToggle}
                  className="flex items-center px-3 py-2 glass bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
                >
                  <span className="text-sm font-medium">{language === 'tr' ? 'EN' : 'TR'}</span>
                </button>
                
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 glass bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden glass bg-black/90 backdrop-blur-lg border-t border-white/10 w-full overflow-hidden">
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-300 overflow-hidden ${
                      activeSection === item.id
                        ? 'text-white bg-white/10'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 glass bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 animate-fadeIn"
          style={{ 
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};