import React, { createContext, useState, useRef, useEffect, useContext, memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const MouseEnterContext = createContext<{
  isMouseEntered: boolean;
  setIsMouseEntered: React.Dispatch<React.SetStateAction<boolean>>;
} | undefined>(undefined);

interface CometCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const CometCard: React.FC<CometCardProps> = ({
  children,
  className,
  containerClassName
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (!isMobile && containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && containerRef.current) {
      containerRef.current.style.transition = 'all 0.5s ease';
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
    setIsMouseEntered(false);
  };

  const handleTouchStart = () => {
    if (isMobile && containerRef.current) {
      containerRef.current.style.transform = 'scale(0.98)';
    }
  };

  const handleTouchEnd = () => {
    if (isMobile && containerRef.current) {
      containerRef.current.style.transform = 'scale(1)';
    }
  };

  return (
    <MouseEnterContext.Provider value={{ isMouseEntered, setIsMouseEntered }}>
      <div
        className={cn('flex items-center justify-center', containerClassName)}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            'flex items-center justify-center relative transition-all duration-200 ease-linear',
            isMobile ? 'hover:scale-[1.02] active:scale-[0.98]' : '',
            className
          )}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {children}
          <Stars />
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      {[...Array(40)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        />
      ))}
    </div>
  );
};
