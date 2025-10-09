import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { translations } from '../utils/translations';
import { LegalModals } from './LegalModals';
import logoSvg from '../assets/logo.svg';

interface FooterProps {
  language: 'tr' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="bg-black border-t border-white/10 relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4 md:mb-6">
              <img src={logoSvg} alt="Allync" className="w-8 h-8 md:w-10 md:h-10 mr-3" />
              <span className="text-lg md:text-xl font-bold text-white">Allync</span>
            </div>
            <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed">{t.footerDesc}</p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 md:w-8 md:h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors duration-300 cursor-pointer active:scale-95">
                <span className="text-white text-sm">f</span>
              </div>
              <div className="w-10 h-10 md:w-8 md:h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors duration-300 cursor-pointer active:scale-95">
                <span className="text-white text-sm">t</span>
              </div>
              <div className="w-10 h-10 md:w-8 md:h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors duration-300 cursor-pointer active:scale-95">
                <span className="text-white text-sm">in</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base md:text-lg text-white font-semibold mb-4 md:mb-6">{t.services}</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-400">
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.whatsappAISetup}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.customTraining}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.databaseIntegration}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.analyticsDashboard}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.support247}</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-base md:text-lg text-white font-semibold mb-4 md:mb-6">{t.industries}</h3>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-400">
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.beautySalons}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.lawFirms}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.healthcare}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.retail}</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors duration-300">{t.restaurant}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base md:text-lg text-white font-semibold mb-4 md:mb-6">{t.contact}</h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center text-sm md:text-base text-gray-400">
                <Mail className="w-4 h-4 md:w-5 md:h-5 mr-3 text-gray-300 flex-shrink-0" />
                <span className="break-all">info@allyncai.com</span>
              </div>
              <div className="flex items-start text-sm md:text-base text-gray-400">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-3 text-gray-300 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+97451079565" className="hover:text-gray-300 transition-colors text-sm">
                    {t.primaryPhone}
                  </a>
                  <a href="tel:+905362477824" className="hover:text-gray-300 transition-colors text-sm">
                    {t.secondaryPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-start text-sm md:text-base text-gray-400">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-3 text-gray-300 mt-0.5 flex-shrink-0" />
                <span>{language === 'tr' ? 'Katar Operasyon Merkezi' : 'Qatar Operations Center'}<br />{language === 'tr' ? 'Dünya Çapında Hizmet' : 'Worldwide Service'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8">
          {/* Company Compliance Section */}
          <div className="mb-6 md:mb-8">
            <div className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-4 md:p-6">
              <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">{t.complianceTitle}</h4>
              <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">{t.companyCompliance}</p>
              <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">{t.dataProtection}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="flex items-center justify-center p-2 md:p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-gray-300 text-xs md:text-sm font-medium">ISO 27001</span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-2 md:p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-gray-300 text-xs md:text-sm font-medium">GDPR</span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-2 md:p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-gray-300 text-xs md:text-sm font-medium">SOC 2</span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-2 md:p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-gray-300 text-xs md:text-sm font-medium">%99.9 SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-0">
              © 2025 Allync. {t.allRightsReserved}
            </p>
            <LegalModals language={language} />
          </div>
        </div>
      </div>
    </footer>
  );
};