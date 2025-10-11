import React, { useState, useEffect } from 'react';
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
  const zoomScale = 1 - (progress / 100) * 0.15;

  useEffect(() => {
    if (isActive) {
      document.documentElement.style.transform = `scale3d(${zoomScale}, ${zoomScale}, 1) translate3d(0, 0, 0)`;
      document.documentElement.style.filter = `blur(${progress * 0.15}px)`;
      document.documentElement.style.willChange = 'transform, filter';
      document.documentElement.style.transition = 'transform 50ms ease-out, filter 50ms ease-out';
      document.documentElement.style.transformOrigin = 'center center';
    } else {
      document.documentElement.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), filter 600ms ease-out';
      document.documentElement.style.transform = 'scale3d(1, 1, 1) translate3d(0, 0, 0)';
      document.documentElement.style.filter = 'blur(0px)';

      setTimeout(() => {
        document.documentElement.style.willChange = 'auto';
        document.documentElement.style.transition = '';
      }, 600);
    }

    return () => {
      if (!isActive) {
        document.documentElement.style.transform = '';
        document.documentElement.style.filter = '';
        document.documentElement.style.willChange = '';
        document.documentElement.style.transition = '';
        document.documentElement.style.transformOrigin = '';
      }
    };
  }, [isActive, zoomScale, progress]);

  return (
    <AnimatePresence>
      {isActive && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at ${buttonPosition.x}px ${buttonPosition.y}px,
                  rgba(139, 92, 246, ${progress / 100}) 0%,
                  rgba(59, 130, 246, ${progress / 200}) 30%,
                  rgba(6, 182, 212, ${progress / 300}) 60%,
                  transparent 100%)
              `
            }}
          />

          <motion.div
            className="fixed inset-0 z-[9991] pointer-events-none mix-blend-screen"
            style={{
              background: `radial-gradient(circle at ${buttonPosition.x}px ${buttonPosition.y}px,
                rgba(255, 0, 0, ${progress / 400}) 0%, transparent 40%)`,
              transform: `translate(${progress * 0.05}px, 0)`
            }}
          />
          <motion.div
            className="fixed inset-0 z-[9991] pointer-events-none mix-blend-screen"
            style={{
              background: `radial-gradient(circle at ${buttonPosition.x}px ${buttonPosition.y}px,
                rgba(0, 255, 0, ${progress / 400}) 0%, transparent 40%)`,
              transform: `translate(-${progress * 0.05}px, 0)`
            }}
          />
          <motion.div
            className="fixed inset-0 z-[9991] pointer-events-none mix-blend-screen"
            style={{
              background: `radial-gradient(circle at ${buttonPosition.x}px ${buttonPosition.y}px,
                rgba(0, 0, 255, ${progress / 400}) 0%, transparent 40%)`,
              transform: `translate(0, ${progress * 0.05}px)`
            }}
          />

          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: progress * (2 + i * 2),
                opacity: (0.4 - i * 0.08) * (1 - progress / 100)
              }}
              className="fixed rounded-full pointer-events-none z-[9992]"
              style={{
                left: buttonPosition.x,
                top: buttonPosition.y,
                width: '200px',
                height: '200px',
                transform: 'translate(-50%, -50%)',
                border: `2px solid rgba(139, 92, 246, ${0.6 - i * 0.1})`,
                boxShadow: `0 0 ${20 + i * 10}px rgba(139, 92, 246, 0.5)`
              }}
            />
          ))}

          <motion.div
            className="fixed inset-0 z-[9993] pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, ${progress / 500}) 0px,
                transparent 1px,
                transparent 2px,
                rgba(0, 0, 0, ${progress / 500}) 3px
              )`,
              opacity: progress / 100
            }}
          />

          <motion.div
            className="fixed inset-0 z-[9994] pointer-events-none"
            animate={{
              opacity: [0, 0.1, 0, 0.2, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            style={{
              background: `radial-gradient(circle at ${buttonPosition.x}px ${buttonPosition.y}px,
                transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
              transform: `scale(${1 + progress / 200})`
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
