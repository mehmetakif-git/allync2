import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoldToViewEffectProps {
  isActive: boolean;
  progress: number;
  gradient: string;
  buttonPosition: { x: number; y: number };
}

export const HoldToViewEffect: React.FC<HoldToViewEffectProps> = ({
  isActive,
  progress,
  gradient,
  buttonPosition
}) => {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] pointer-events-none"
            style={{
              filter: `blur(${progress * 15}px)`
            }}
          />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: progress * 5, opacity: 0.3 - (progress * 0.2) }}
            exit={{ scale: 0, opacity: 0 }}
            className={`fixed rounded-full bg-gradient-to-r ${gradient} pointer-events-none z-[9991]`}
            style={{
              left: buttonPosition.x,
              top: buttonPosition.y,
              width: '100px',
              height: '100px',
              transform: 'translate(-50%, -50%)'
            }}
          />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: progress * 8, opacity: 0.15 - (progress * 0.1) }}
            exit={{ scale: 0, opacity: 0 }}
            className={`fixed rounded-full bg-gradient-to-r ${gradient} pointer-events-none z-[9991]`}
            style={{
              left: buttonPosition.x,
              top: buttonPosition.y,
              width: '100px',
              height: '100px',
              transform: 'translate(-50%, -50%)'
            }}
          />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: progress * 12, opacity: 0.08 - (progress * 0.05) }}
            exit={{ scale: 0, opacity: 0 }}
            className={`fixed rounded-full bg-gradient-to-r ${gradient} pointer-events-none z-[9991]`}
            style={{
              left: buttonPosition.x,
              top: buttonPosition.y,
              width: '100px',
              height: '100px',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

interface CircularProgressProps {
  progress: number;
  gradient: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ progress, gradient }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
      <circle
        cx="28"
        cy="28"
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="3"
      />
      <circle
        cx="28"
        cy="28"
        r={radius}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 50ms linear' }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" className="text-cyan-400" />
          <stop offset="100%" stopColor="currentColor" className="text-green-400" />
        </linearGradient>
      </defs>
    </svg>
  );
};

interface CustomCursorProps {
  isHovering: boolean;
  language: 'tr' | 'en';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isHovering, language }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isHovering) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] text-white text-xs font-semibold px-3 py-2 bg-black/80 backdrop-blur-sm rounded-full border border-white/20"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(10px, 10px)'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      {language === 'tr' ? '🖱️ Basılı Tut' : '🖱️ Click & Hold'}
    </motion.div>
  );
};
