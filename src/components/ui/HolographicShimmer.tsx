import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HolographicShimmerProps {
  className?: string;
  intensity?: number;
  color?: string;
}

export const HolographicShimmer: React.FC<HolographicShimmerProps> = ({
  className = '',
  intensity = 0.8,
  color = '#8b5cf6'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 139, g: 92, b: 246 };
  };

  const rgb = hexToRgb(color);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 50, y: 50 });
      }}
      className={`absolute inset-0 overflow-hidden rounded-[inherit] ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      {/* LARGE radial gradient that follows mouse */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? intensity * 0.6 : intensity * 0.3}),
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? intensity * 0.4 : intensity * 0.2}),
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? intensity * 0.2 : intensity * 0.1}),
            transparent 50%)`,
          opacity: 1,
          mixBlendMode: 'screen'
        }}
      />

      {/* Animated shimmer sweep */}
      <motion.div
        className="absolute inset-0"
        animate={isHovered ? {
          x: ['-150%', '250%']
        } : {}}
        transition={{
          duration: 2.5,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
          repeatDelay: 0
        }}
        style={{
          width: '100%',
          height: '200%',
          transform: 'skewX(-25deg)',
          background: `linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0) 20%,
            rgba(255, 255, 255, ${isHovered ? 0.4 : 0.2}) 50%,
            rgba(255, 255, 255, 0) 80%,
            transparent 100%)`,
          filter: 'blur(2px)'
        }}
      />

      {/* Colored shimmer sweep */}
      <motion.div
        className="absolute inset-0"
        animate={isHovered ? {
          x: ['-150%', '250%']
        } : {}}
        transition={{
          duration: 3,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear',
          repeatDelay: 0,
          delay: 0.5
        }}
        style={{
          width: '100%',
          height: '200%',
          transform: 'skewX(-25deg)',
          background: `linear-gradient(90deg,
            transparent 0%,
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 30%,
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? intensity : intensity * 0.5}) 50%,
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 70%,
            transparent 100%)`
        }}
      />

      {/* Edge glow that pulses */}
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        animate={isHovered ? {
          boxShadow: [
            `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.3}), inset 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.2})`,
            `0 0 40px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.5}), inset 0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.3})`,
            `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.3}), inset 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.2})`
          ]
        } : {
          boxShadow: `0 0 0px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: 'easeInOut'
        }}
      />

      {/* Corner highlights */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? intensity * 0.4 : 0}), transparent)`,
          transform: 'translate(50%, -50%)'
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? intensity * 0.4 : 0}), transparent)`,
          transform: 'translate(-50%, 50%)'
        }}
      />
    </div>
  );
};
