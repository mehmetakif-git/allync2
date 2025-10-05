import React, { useState, useEffect } from 'react';
import logoSvg from '/logo.svg';
import { ANIMATION_DELAYS } from '../constants/animations';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [sloganText, setSloganText] = useState('');
  const [showSkip, setShowSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const fullSlogan = "Beyond Human Automation";

  useEffect(() => {
    // Logo animation
    setTimeout(() => setLogoVisible(true), ANIMATION_DELAYS.MODAL_ANIMATION);

    // Slogan typewriter effect
    setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < fullSlogan.length) {
          setSloganText(fullSlogan.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, ANIMATION_DELAYS.TYPING_SPEED);
    }, 1200);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadingComplete, ANIMATION_DELAYS.LOADING_COMPLETE);
          }, ANIMATION_DELAYS.ENABLE_ANIMATIONS);
          return 100;
        }
        return prev + 2;
      });
    }, ANIMATION_DELAYS.TYPING_SPEED);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(onLoadingComplete, ANIMATION_DELAYS.MODAL_ANIMATION);
  };

  return (
    <div className={`fixed inset-0 z-50 loading-screen ${isExiting ? 'loading-exit' : ''}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <div className="loading-gradient"></div>
        <div className="loading-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="loading-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
        >
          Skip →
        </button>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo */}
        <div className={`loading-logo ${logoVisible ? 'visible' : ''}`}>
          <div className="flex items-center mb-8">
            <img src={logoSvg} alt="Allync" className="w-16 h-16 mr-4 logo-glow-pulse" />
            <span className="text-5xl font-bold text-white glitch-logo" data-text="Allync">
              Allync
            </span>
          </div>
        </div>

        {/* Slogan */}
        <div className="mb-12 h-8">
          <p className="text-xl text-gray-300 font-mono typewriter-slogan">
            {sloganText}
            <span className="cursor-blink">|</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm">
          <div className="loading-progress-container">
            <div className="loading-progress-track">
              <div 
                className="loading-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
              <div className="loading-progress-glow" style={{ left: `${progress}%` }}></div>
            </div>
          </div>
          <div className="flex justify-between mt-3 text-sm text-gray-400">
            <span>Loading Experience</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Floating Shapes */}
        <div className="loading-shapes">
          <div className="loading-shape loading-shape-1"></div>
          <div className="loading-shape loading-shape-2"></div>
          <div className="loading-shape loading-shape-3"></div>
        </div>
      </div>
    </div>
  );
};