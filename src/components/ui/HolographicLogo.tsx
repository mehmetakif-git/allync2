import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoSvg from '../../assets/logo.svg';

interface HolographicLogoProps {
  color?: string;
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const HolographicLogo: React.FC<HolographicLogoProps> = ({
  color = '#8b5cf6',
  size = 50,
  position = 'top-right'
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none z-20`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 rounded-lg blur-xl opacity-60"
          style={{
            background: `radial-gradient(circle, ${color}, transparent)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Logo with holographic filter */}
        <img
          src={logoSvg}
          alt="Allync"
          className="relative z-10"
          style={{
            width: size,
            height: size,
            filter: `drop-shadow(0 0 8px ${color}) brightness(1.2) contrast(1.1)`,
            mixBlendMode: 'screen'
          }}
        />

        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(135deg, transparent 30%, ${color}40 50%, transparent 70%)`,
          }}
          animate={{
            x: [-30, 30, -30],
            y: [-30, 30, -30],
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    </motion.div>
  );
};
