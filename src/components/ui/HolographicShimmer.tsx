import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HolographicShimmerProps {
  className?: string;
  intensity?: number;
  color?: string;
}

export const HolographicShimmer: React.FC<HolographicShimmerProps> = ({
  className = '',
  intensity = 0.5,
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-auto ${className}`}
      style={{ zIndex: 1 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.4}),
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.2}),
            transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'screen',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={isHovered ? {
          x: ['-100%', '200%']
        } : { x: '-100%' }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: 'linear'
        }}
        style={{
          width: '50%',
          height: '100%',
          transform: 'skewX(-20deg)',
          background: `linear-gradient(90deg,
            transparent 0%,
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 20%,
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.8}) 50%,
            rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 80%,
            transparent 100%)`
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          boxShadow: isHovered
            ? `0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.6}),
               inset 0 0 30px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.3})`
            : 'none',
          transition: 'box-shadow 0.3s ease'
        }}
      />
    </div>
  );
};
