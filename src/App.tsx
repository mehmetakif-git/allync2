import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { SelectionScreen } from './components/SelectionScreen';
import { HelmetManager } from './components/HelmetManager';
import DotGrid from './components/ui/DotGrid';
import Lanyard from './components/Lanyard';

const AllyncAISolutions = lazy(() => import('./components/AllyncAISolutions').then(module => ({ default: module.AllyncAISolutions })));
const DigitalSolutions = lazy(() => import('./components/DigitalSolutions').then(module => ({ default: module.DigitalSolutions })));

function App() {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [viewMode, setViewMode] = useState<'loading' | 'selection' | 'ai-view' | 'digital-view'>('loading');
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showLanyard, setShowLanyard] = useState(false);
  const showLanyardTimer = useRef<NodeJS.Timeout | null>(null);
  const hideLanyardTimer = useRef<NodeJS.Timeout | null>(null);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
  };

  const handleLoadingComplete = () => {
    setViewMode('selection');
    setTimeout(() => {
      setAnimationsEnabled(true);
    }, 500);
  };

  const handleSelectView = (view: 'ai-view' | 'digital-view') => {
    setViewMode(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSelection = () => {
    setViewMode('selection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (viewMode === 'ai-view' || viewMode === 'digital-view') {
        const sections = ['hero', 'chat-demo', 'packages', 'industry-examples', 'features', 'pricing', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  useEffect(() => {
    const handleUserActivity = () => {
      if (showLanyard) {
        setShowLanyard(false);
      }

      if (showLanyardTimer.current) clearTimeout(showLanyardTimer.current);
      if (hideLanyardTimer.current) clearTimeout(hideLanyardTimer.current);

      showLanyardTimer.current = setTimeout(() => {
        setShowLanyard(true);
      }, 90000);
    };

    handleUserActivity();

    const activityEvents: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keydown', 'scroll'];
    activityEvents.forEach(event => window.addEventListener(event, handleUserActivity));

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, handleUserActivity));
      if (showLanyardTimer.current) clearTimeout(showLanyardTimer.current);
      if (hideLanyardTimer.current) clearTimeout(hideLanyardTimer.current);
    };
  }, [showLanyard]);

  useEffect(() => {
    if (showLanyard) {
      hideLanyardTimer.current = setTimeout(() => {
        setShowLanyard(false);
      }, 60000);
    }
  }, [showLanyard]);

  const showBackground = viewMode !== 'loading';

  if (viewMode === 'loading') {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} language={language} />;
  }

  if (viewMode === 'selection') {
    return (
      <HelmetProvider>
        <div className={`min-h-screen bg-black app-loaded ${animationsEnabled ? 'animations-enabled' : 'animations-disabled'}`}>
          {showBackground && <DotGrid />}
          <HelmetManager language={language} activeSection="hero" />
          <Navigation
            language={language}
            onLanguageToggle={toggleLanguage}
            viewMode={viewMode}
          />
          <SelectionScreen
            language={language}
            onSelectView={handleSelectView}
            onLanguageToggle={toggleLanguage}
          />
          <AnimatePresence>
            {showLanyard && (
              <motion.div
                className="fixed inset-0 z-50"
                initial={{ y: '-100vh', opacity: 0 }}
                animate={{ y: '0vh', opacity: 1 }}
                exit={{ y: '-100vh', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              >
                <Lanyard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </HelmetProvider>
    );
  }

  if (viewMode === 'ai-view') {
    return (
      <HelmetProvider>
        <div className={`min-h-screen bg-black app-loaded ${animationsEnabled ? 'animations-enabled' : 'animations-disabled'}`}>
          {showBackground && <DotGrid />}
          <HelmetManager language={language} activeSection={activeSection} />
          <Navigation
            language={language}
            onLanguageToggle={toggleLanguage}
            viewMode={viewMode}
            onBackToSelection={handleBackToSelection}
          />
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          }>
            <AllyncAISolutions language={language} />
          </Suspense>
          <AnimatePresence>
            {showLanyard && (
              <motion.div
                className="fixed inset-0 z-50"
                initial={{ y: '-100vh', opacity: 0 }}
                animate={{ y: '0vh', opacity: 1 }}
                exit={{ y: '-100vh', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              >
                <Lanyard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </HelmetProvider>
    );
  }

  if (viewMode === 'digital-view') {
    return (
      <HelmetProvider>
        <div className={`min-h-screen bg-black app-loaded ${animationsEnabled ? 'animations-enabled' : 'animations-disabled'}`}>
          {showBackground && <DotGrid />}
          <HelmetManager language={language} activeSection={activeSection} />
          <Navigation
            language={language}
            onLanguageToggle={toggleLanguage}
            viewMode={viewMode}
            onBackToSelection={handleBackToSelection}
          />
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          }>
            <DigitalSolutions language={language} />
          </Suspense>
          <AnimatePresence>
            {showLanyard && (
              <motion.div
                className="fixed inset-0 z-50"
                initial={{ y: '-100vh', opacity: 0 }}
                animate={{ y: '0vh', opacity: 1 }}
                exit={{ y: '-100vh', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              >
                <Lanyard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </HelmetProvider>
    );
  }

  return null;
}

export default App;
