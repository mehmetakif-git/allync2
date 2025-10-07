import React, { useState, useEffect, lazy, Suspense } from 'react';
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

  // Effect to show Lanyard after 90 seconds of inactivity
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      if (!showLanyard) { // Don't set a new timer if lanyard is already trying to show or is shown
          inactivityTimer = setTimeout(() => {
              setShowLanyard(true);
          }, 90000);
      }
    };

    const activityEvents: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => window.addEventListener(event, resetTimer, { passive: true }));
    resetTimer(); // Start the timer initially

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [showLanyard]); // Dependency on showLanyard to help manage timer state correctly

  // Effect to hide Lanyard after 60 seconds of visibility or on new user activity
  useEffect(() => {
    if (!showLanyard) {
      return;
    }

    // Auto-hide after 60 seconds
    const hideTimer = setTimeout(() => {
      setShowLanyard(false);
    }, 60000);

    // Hide on any user activity
    const hideOnActivity = () => {
      setShowLanyard(false);
    };

    const activityEvents: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => window.addEventListener(event, hideOnActivity, { passive: true }));

    // Cleanup function for this effect
    return () => {
      clearTimeout(hideTimer);
      activityEvents.forEach(event => window.removeEventListener(event, hideOnActivity));
    };
  }, [showLanyard]); // This effect runs only when showLanyard becomes true


  const showBackground = viewMode !== 'loading';

  if (viewMode === 'loading') {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} language={language} />;
  }

  const renderLanyard = () => (
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
  );

  return (
    <HelmetProvider>
      <div className={`min-h-screen bg-black app-loaded ${animationsEnabled ? 'animations-enabled' : 'animations-disabled'}`}>
        {showBackground && <DotGrid />}
        <HelmetManager language={language} activeSection={activeSection} />
        <Navigation
          language={language}
          onLanguageToggle={toggleLanguage}
          viewMode={viewMode}
          onBackToSelection={viewMode !== 'selection' ? handleBackToSelection : undefined}
        />
        {viewMode === 'selection' && (
          <SelectionScreen
            language={language}
            onSelectView={handleSelectView}
            onLanguageToggle={toggleLanguage}
          />
        )}
        {viewMode === 'ai-view' && (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <AllyncAISolutions language={language} />
          </Suspense>
        )}
        {viewMode === 'digital-view' && (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <DigitalSolutions language={language} />
          </Suspense>
        )}
        {renderLanyard()}
      </div>
    </HelmetProvider>
  );
}

export default App;