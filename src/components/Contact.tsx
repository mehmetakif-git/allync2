import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Phone, Mail, Calendar, ChevronDown } from 'lucide-react';
import { translations } from '../utils/translations';
import { InputGlow, LabelGlow, LabelInputContainer, BottomGradient } from './ui/InputGlow';
import { GlowingEffect } from './ui/GlowingEffect';

interface ContactProps {
  language: 'tr' | 'en';
}

export const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language];
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setStatusMessage('');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(
      (result) => {
        console.log('SUCCESS!', result.text);
        setStatusMessage(language === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Your message has been sent successfully!');
        setFormData({ name: '', email: '', phone: '', business: '', message: '' });
      },
      (error) => {
        console.log('FAILED...', error.text);
        setStatusMessage(language === 'tr' ? 'Bir hata oluştu, lütfen tekrar deneyin.' : 'An error occurred, please try again.');
      }
    ).finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      if (value && !emailRegex.test(value)) {
        setErrors({ ...errors, email: language === 'tr' ? 'Geçerli bir e-posta adresi girin' : 'Enter a valid email address' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    if (name === 'phone') {
      if (value && !phoneRegex.test(value)) {
        setErrors({ ...errors, phone: language === 'tr' ? 'Geçerli bir telefon numarası girin' : 'Enter a valid phone number' });
      } else {
        setErrors({ ...errors, phone: '' });
      }
    }
  };

  const isFormValid = formData.name && formData.email && formData.business && !errors.email && (!formData.phone || !errors.phone);

  return (
    <section className="py-8 md:py-12 relative bg-black contact-section" id="contact" style={{ display: 'block', opacity: 1, visibility: 'visible' }}>

      <div className="max-w-1200px mx-auto px-5 sm:px-6 lg:px-8" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'block', visibility: 'visible', opacity: 1 }}>
        <div className="text-center mb-8 md:mb-16 section-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent block">
              {t.contactTitle}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.contactSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 fade-in-left contact-form relative" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              variant="default"
            />
            <h3 className="text-2xl font-bold text-white mb-6">{t.getCustomDemo}</h3>

            <form ref={form} onSubmit={handleSubmit} className="space-y-6 form-grid">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <LabelGlow htmlFor="name">{t.fullName} *</LabelGlow>
                  <InputGlow
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={language === 'tr' ? 'Ahmet Yılmaz' : 'John Smith'}
                  />
                </LabelInputContainer>

                <LabelInputContainer>
                  <LabelGlow htmlFor="email">{t.emailAddress} *</LabelGlow>
                  <InputGlow
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={language === 'tr' ? 'ahmet@sirket.com' : 'john@business.com'}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </LabelInputContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <LabelGlow htmlFor="phone">{t.phoneNumber}</LabelGlow>
                  <InputGlow
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={language === 'tr' ? '+90 555 123 4567' : '+1 (555) 123-4567'}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </LabelInputContainer>

                <LabelInputContainer>
                  <LabelGlow htmlFor="business">{t.businessType} *</LabelGlow>
                  <div className="relative">
                    <select
                    id="business"
                    name="business"
                    required
                    value={formData.business}
                    onChange={handleChange}
                      className="w-full h-11 px-4 py-3 bg-gray-800 border-none rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-300 appearance-none pr-10 text-base"
                      style={{ zIndex: 100 }}
                    >
                    <option value="" className="bg-gray-800 text-neutral-500">{t.selectIndustry}</option>
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
                </LabelInputContainer>
              </div>

              <LabelInputContainer>
                <LabelGlow htmlFor="message">{t.tellUsNeeds}</LabelGlow>
                <InputGlow
                  id="message"
                  name="message"
                  isTextarea
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.needsPlaceholder}
                />
              </LabelInputContainer>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-gray-700 to-gray-800 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    {t.requestCustomQuote}
                    <Send className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </>
                )}
                <BottomGradient />
              </button>
              {statusMessage && (
                <p className={`mt-4 text-center ${statusMessage.includes('hata') || statusMessage.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-8 fade-in-right contact-info" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
            <div className="bg-gradient-to-br from-gray-500/10 to-gray-400/10 backdrop-blur-sm border border-gray-500/20 rounded-2xl p-6 lg:p-8 relative">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                variant="default"
              />
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
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center counter-animate relative">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  variant="default"
                />
                <p className="text-3xl font-bold text-gray-300">500+</p>
                <p className="text-gray-400 text-sm">{t.businessesAutomated}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center counter-animate stagger-1 relative">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  variant="default"
                />
                <p className="text-3xl font-bold text-gray-400">98.5%</p>
                <p className="text-gray-400 text-sm">{t.clientSatisfaction}</p>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-r from-gray-500/10 to-gray-400/10 backdrop-blur-sm border border-gray-500/20 rounded-xl p-6 text-center relative">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                variant="default"
              />
              <h4 className="text-lg font-semibold text-white mb-2">{t.guarantee}</h4>
              <p className="text-gray-400 text-sm">{t.guaranteeDesc}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
