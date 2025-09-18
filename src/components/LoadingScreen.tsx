import React, { useState, useEffect } from 'react';
import logoSvg from '/logo.svg';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [sloganText, setSloganText] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  const fullSlogan = "Beyond Human Automation";

  useEffect(() => {
    // Logo animation
    setTimeout(() => setLogoVisible(true), 300);

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
      }, 80);
    }, 1200);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadingComplete, 800);
          }, 500);
          return 100;
        }
        return prev + 3;
      });
    }, 60);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-800 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {/* Logo */}
      <div className={`transition-all duration-1000 ${logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="flex items-center mb-8">
          <img src={logoSvg} alt="Allync" className="w-16 h-16 mr-4" />
          <span className="text-5xl font-bold text-white">
            Allync
          </span>
        </div>
      </div>

      {/* Slogan */}
      <div className="mb-12 h-8">
        <p className="text-xl text-gray-300 font-mono">
          {sloganText}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-80 max-w-sm">
        <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-gray-600 to-gray-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-3 text-sm text-gray-400">
          <span>Loading Experience</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};