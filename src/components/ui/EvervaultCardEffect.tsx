import React, { useState } from 'react';
import { useMotionValue, useMotionTemplate, motion } from 'framer-motion';
import logoSvg from '../../assets/logo.svg';

interface EvervaultCardEffectProps {
  color?: string;
  children: React.ReactNode;
}

export const EvervaultCardEffect: React.FC<EvervaultCardEffectProps> = ({
  color = '#8b5cf6',
  children
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const maskImage = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, white, transparent)`;

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
      className="w-full h-full relative group/card"
      onMouseMove={handleMouseMove}
    >
      {/* Original content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Hover effect overlay */}
      {!isMobile && (
        <>
          {/* Gradient overlay that follows mouse */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`,
              mixBlendMode: 'screen'
            }}
          />

          {/* Radial gradient that follows mouse */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] opacity-0 group-hover/card:opacity-100 backdrop-blur-sm transition-opacity duration-500 pointer-events-none"
            style={{
              maskImage,
              WebkitMaskImage: maskImage,
              background: `radial-gradient(circle at center, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2))`,
              mixBlendMode: 'screen'
            }}
          />

          {/* Logo overlay - appears on hover */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              maskImage,
              WebkitMaskImage: maskImage
            }}
          >
            <img
              src={logoSvg}
              alt="Allync"
              className="w-32 h-32 md:w-40 md:h-40"
              style={{
                filter: `drop-shadow(0 0 20px ${color}) brightness(1.3)`,
                mixBlendMode: 'screen'
              }}
            />
          </motion.div>
        </>
      )}
    </div>
  );
};
