import React from 'react';
import { motion } from 'framer-motion';

interface HolographicShimmerProps {
  intensity?: number;
  color?: string;
}

export const HolographicShimmer: React.FC<HolographicShimmerProps> = ({
  intensity = 0.5,
  color = '#8b5cf6'
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${color}${Math.round(intensity * 40).toString(16).padStart(2, '0')} 50%, transparent 100%)`,
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}${Math.round(intensity * 30).toString(16).padStart(2, '0')}, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
