import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ChatDemo } from './components/ChatDemo';
import { PackagesBrochure } from './components/PackagesBrochure';
import { IndustryExamples } from './components/IndustryExamples';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [isLoading, setIsLoading] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Enable animations after a short delay
    setTimeout(() => {
      setAnimationsEnabled(true);
    }, 500);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen bg-black app-loaded ${animationsEnabled ? 'animations-enabled' : 'animations-disabled'}`}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />
      <section className="hero-section">
        <Hero language={language} id="hero" />
      </section>
      <div className="section-separator"></div>
      <section id="chat-demo">
        <ChatDemo language={language} />
      </section>
      <div className="section-separator"></div>
      <section id="packages">
        <PackagesBrochure language={language} />
      </section>
      <div className="section-separator"></div>
      <section id="industry-examples">
        <IndustryExamples language={language} />
      </section>
      <div className="section-separator"></div>
      <section id="features">
        <Features language={language} />
      </section>
      <div className="section-separator"></div>
      <section id="pricing">
        <Pricing language={language} />
      </section>
      <div className="section-separator"></div>
      <section id="contact" className="scroll-mt-20">
        <Contact language={language} />
      </section>
      <Footer language={language} />
    </div>
  );
}

export default App;