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
              <div className="flex items-start text-gray-400">
                <Phone className="w-5 h-5 mr-3 text-gray-300" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+97451079565" className="hover:text-gray-300 transition-colors text-sm">
                    {t.primaryPhone}
                  </a>
                  <a href="tel:+905362477824" className="hover:text-gray-300 transition-colors text-sm">
                    {t.secondaryPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-3 text-gray-300 mt-0.5" />
                <span>{language === 'tr' ? 'Katar Operasyon Merkezi' : 'Qatar Operations Center'}<br />{language === 'tr' ? 'Dünya Çapında Hizmet' : 'Worldwide Service'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          {/* Company Compliance Section */}
          <div className="mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">{t.complianceTitle}</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{t.companyCompliance}</p>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{t.dataProtection}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-gray-300 text-sm font-medium">ISO 27001</span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-gray-300 text-sm font-medium">GDPR</span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-gray-300 text-sm font-medium">SOC 2</span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-gray-300 text-sm font-medium">%99.9 SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
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