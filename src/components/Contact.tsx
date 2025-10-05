import React, { useState } from 'react';
import { Send, Phone, Mail, Calendar, ChevronDown } from 'lucide-react';
import { translations } from '../utils/translations';

interface ContactProps {
  language: 'tr' | 'en';
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    // Add loading state
    submitBtn.classList.add('btn-loading');
    
    // Simulate form submission
    setTimeout(() => {
      submitBtn.classList.remove('btn-loading');
      // Handle form submission here
      console.log('Form submitted:', formData);
      // Show success message
      alert(language === 'tr' ? 'Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.' : 'Message sent! We will get back to you soon.');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-8 md:py-12 relative bg-black contact-section" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>
      
      <div className="max-w-1200px mx-auto px-5 sm:px-6 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'block', visibility: 'visible', opacity: 1 }}>
        <div className="text-center mb-8 md:mb-16 section-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.contactTitle}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block">
              
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.contactSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 fade-in-left contact-form" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
            <h3 className="text-2xl font-bold text-white mb-6">{t.getCustomDemo}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 form-grid">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">{t.fullName} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                    placeholder={language === 'tr' ? 'Ahmet Yılmaz' : 'John Smith'}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{t.emailAddress} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300"
                    placeholder={language === 'tr' ? 'ahmet@sirket.com' : 'john@business.com'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">{t.phoneNumber}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 min-h-[44px]"
                    placeholder={language === 'tr' ? '+90 555 123 4567' : '+1 (555) 123-4567'}
                  />
                </div>
                
                <div>
                  <label htmlFor="business" className="block text-sm font-medium text-gray-300 mb-2">{t.businessType} *</label>
                  <div className="relative">
                    <select
                    id="business"
                    name="business"
                    required
                    value={formData.business}
                    onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 appearance-none pr-10 min-h-[44px]"
                      style={{ zIndex: 100 }}
                    >
                    <option value="">{t.selectIndustry}</option>
                      <option value="salon" className="bg-gray-800 text-white">{t.salon}</option>
                      <option value="law" className="bg-gray-800 text-white">{t.law}</option>
                      <option value="healthcare" className="bg-gray-800 text-white">{t.healthcare}</option>
                      <option value="retail" className="bg-gray-800 text-white">{t.retail}</option>
                      <option value="restaurant" className="bg-gray-800 text-white">{t.restaurant}</option>
                      <option value="fitness" className="bg-gray-800 text-white">{t.fitness}</option>
                      <option value="veterinarian" className="bg-gray-800 text-white">{language === 'tr' ? 'Veteriner' : 'Veterinarian'}</option>
                      <option value="psychologist" className="bg-gray-800 text-white">{language === 'tr' ? 'Psikolog' : 'Psychologist'}</option>
                      <option value="dentist" className="bg-gray-800 text-white">{language === 'tr' ? 'Diş Hekimi' : 'Dentist'}</option>
                      <option value="photographer" className="bg-gray-800 text-white">{language === 'tr' ? 'Fotoğrafçı' : 'Photographer'}</option>
                      <option value="tailor" className="bg-gray-800 text-white">{language === 'tr' ? 'Terzi' : 'Tailor'}</option>
                      <option value="autoservice" className="bg-gray-800 text-white">{language === 'tr' ? 'Oto Servis' : 'Auto Service'}</option>
                      <option value="cleaning" className="bg-gray-800 text-white">{language === 'tr' ? 'Temizlik' : 'Cleaning'}</option>
                      <option value="electrician" className="bg-gray-800 text-white">{language === 'tr' ? 'Elektrikçi' : 'Electrician'}</option>
                      <option value="education" className="bg-gray-800 text-white">{language === 'tr' ? 'Eğitim' : 'Education'}</option>
                      <option value="other" className="bg-gray-800 text-white">{t.other}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">{t.tellUsNeeds}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-300 resize-none min-h-[100px]"
                  placeholder={t.needsPlaceholder}
                />
              </div>

              <button
                type="submit"
                className="w-full btn-premium btn-glow btn-ripple px-6 py-4 rounded-lg font-semibold text-white flex items-center justify-center group min-h-[50px]"
              >
                {t.requestCustomQuote}
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 fade-in-right contact-info" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
            <div className="bg-gradient-to-br from-gray-500/10 to-gray-400/10 border border-gray-500/20 rounded-2xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-white mb-6">{t.whyChooseAI}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-gray-500">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{t.quickSetup}</h4>
                    <p className="text-gray-400">{t.quickSetupDesc}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-gray-500">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{t.dedicatedSupport}</h4>
                    <p className="text-gray-400">{t.dedicatedSupportDesc}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 border border-gray-500">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{t.provenResults}</h4>
                    <p className="text-gray-400">{t.provenResultsDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center counter-animate">
                <p className="text-3xl font-bold text-gray-300">500+</p>
                <p className="text-gray-400 text-sm">{t.businessesAutomated}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center counter-animate stagger-1">
                <p className="text-3xl font-bold text-gray-400">98.5%</p>
                <p className="text-gray-400 text-sm">{t.clientSatisfaction}</p>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-r from-gray-500/10 to-gray-400/10 border border-gray-500/20 rounded-xl p-6 text-center">
              <h4 className="text-lg font-semibold text-white mb-2">{t.guarantee}</h4>
              <p className="text-gray-400 text-sm">{t.guaranteeDesc}</p>
            </div>

            {/* Company Compliance */}
            <div className="bg-gradient-to-r from-gray-500/10 to-gray-400/10 border border-gray-500/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">{t.complianceTitle}</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{t.companyCompliance}</p>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{t.dataProtection}</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">ISO 27001</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">GDPR</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">SOC 2</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">%99.9 SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};