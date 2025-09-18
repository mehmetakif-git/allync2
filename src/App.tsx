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
  const [isLoading, setIsLoading] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation language={language} onLanguageToggle={toggleLanguage} />
      <section id="hero">
        <Hero language={language} />
      </section>
      <section id="chat-demo">
        <ChatDemo language={language} />
      </section>
      <section id="packages">
        <PackagesBrochure language={language} />
      </section>
      <section id="industry-examples">
        <IndustryExamples language={language} />
      </section>
      <section id="features">
        <Features language={language} />
      </section>
      <section id="pricing">
        <Pricing language={language} />
      </section>
      <section id="contact">
        <Contact language={language} />
      </section>
      <Footer language={language} />
    </div>
  );
}

export default App;