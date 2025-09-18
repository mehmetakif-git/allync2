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

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black app-loaded" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
      <Navigation language={language} onLanguageToggle={toggleLanguage} />
      <div id="hero" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
        <Hero language={language} />
      </div>
      <section id="chat-demo" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
        <ChatDemo language={language} />
      </section>
      <section id="packages" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
        <PackagesBrochure language={language} />
      </section>
      <section id="industry-examples" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
        <IndustryExamples language={language} />
      </section>
      <section id="features" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
        <Features language={language} />
      </section>
      <section id="pricing" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
        <Pricing language={language} />
      </section>
      <section id="contact" className="scroll-mt-20" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
        <Contact language={language} />
      </section>
      <div style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
        <Footer language={language} />
      </div>
    </div>
  );
}

export default App;