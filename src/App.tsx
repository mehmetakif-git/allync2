import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { SelectionScreen } from './components/SelectionScreen';
import { HelmetManager } from './components/HelmetManager';
import DotGrid from './components/ui/DotGrid';
import Lanyard from './components/Lanyard';
import { InactivityWarning } from './components/InactivityWarning';

const AllyncAISolutions = lazy(() => import('./components/AllyncAISolutions').then(module => ({ default: module.AllyncAISolutions })));
const DigitalSolutions = lazy(() => import('./components/DigitalSolutions').then(module => ({ default: module.DigitalSolutions })));

function App() {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [viewMode, setViewMode] = useState<'loading' | 'selection' | 'ai-view' | 'digital-view'>('loading');
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showLanyard, setShowLanyard] = useState(false);
  const [scrollJolt, setScrollJolt] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(10);

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
    const handleWheel = (event: WheelEvent) => {
      setScrollJolt(event.deltaY);
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // This effect should only run on the client, and not on mobile.
    if (typeof window === 'undefined' || window.innerWidth < 768) {
      return;
    }

    let warningTimer: NodeJS.Timeout;
    let lanyardTimer: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout | null = null;

    const clearAllTimers = () => {
      clearTimeout(warningTimer);
      clearTimeout(lanyardTimer);
      if (countdownInterval) clearInterval(countdownInterval);
      setShowWarning(false);
      setCountdown(10);
    };

    const startTimers = () => {
      clearAllTimers();

      warningTimer = setTimeout(() => {
        setShowWarning(true);
        countdownInterval = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              if (countdownInterval) clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 80000); // Show warning at 80 seconds

      lanyardTimer = setTimeout(() => {
        setShowLanyard(true);
        setShowWarning(false);
      }, 90000); // Show lanyard at 90 seconds
    };

    const activityEvents: (keyof WindowEventMap)[] = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => window.addEventListener(event, startTimers, { passive: true }));

    startTimers(); // Start the timers initially

    return () => {
      clearAllTimers();
      activityEvents.forEach(event => window.removeEventListener(event, startTimers));
    };
  }, []);

  const handleLanyardDismiss = () => {
    setShowLanyard(false);
  };

  const showBackground = viewMode !== 'loading';

  if (viewMode === 'loading') {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} language={language} />;
  }

  const renderLanyard = () => (
    <AnimatePresence>
      {showLanyard && !isMobile && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ y: '-100vh', opacity: 0 }}
          animate={{ y: '0vh', opacity: 1 }}
          exit={{ y: '-100vh', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        >
          <Suspense fallback={null}>
            <Lanyard onDismiss={handleLanyardDismiss} scrollJolt={scrollJolt} />
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <HelmetProvider>
      <div className={`min-h-screen bg-black app-loaded ${animationsEnabled ? 'animations-enabled' : 'animations-disabled'}`}>
        {showBackground && !isMobile && <DotGrid />}
        <HelmetManager language={language} activeSection={activeSection} />
        <Navigation
          language={language}
          onLanguageToggle={toggleLanguage}
          viewMode={viewMode}
          onBackToSelection={viewMode !== 'selection' ? handleBackToSelection : undefined}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {showWarning && <InactivityWarning countdown={countdown} />}
        </AnimatePresence>
        {renderLanyard()}
      </div>
    </HelmetProvider>
  );
}

export default App;