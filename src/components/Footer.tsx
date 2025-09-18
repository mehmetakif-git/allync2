import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { translations } from '../utils/translations';
import { LegalModals } from './LegalModals';
import logoSvg from '/logo.svg';

interface FooterProps {
  language: 'tr' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="bg-black border-t border-white/10 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <img src={logoSvg} alt="Allync" className="w-10 h-10 mr-3" />
              <span className="text-xl font-bold text-white">Allync</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">{t.footerDesc}</p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                <span className="text-white">f</span>
              </div>
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                <span className="text-white">t</span>
              </div>
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors duration-300 cursor-pointer">
                <span className="text-white">in</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t.services}</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.whatsappAISetup}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.customTraining}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.databaseIntegration}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.analyticsDashboard}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.support247}</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t.industries}</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.beautySalons}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.lawFirms}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.healthcare}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.retail}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.restaurant}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t.contact}</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3 text-gray-300" />
                <span>info@allync.com.tr</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-gray-300" />
                <span>+974 123 456 789</span>
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-gray-300 mt-0.5" />
                <span>Global Operations<br />Worldwide Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Allync. {t.allRightsReserved}
            </p>
            <LegalModals language={language} />
          </div>
        </div>
      </div>
    </footer>
  );
};