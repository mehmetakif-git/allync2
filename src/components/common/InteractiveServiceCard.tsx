import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import { useCursor } from '../../context/CursorContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
  extendedContent: string;
  galleryImages: string[];
  glowColor?: string;
  audioSrc?: string;
  subtitles?: Array<{ start: number; text: string }>;
}

interface InteractiveServiceCardProps {
  service: Service;
  language: 'tr' | 'en';
  isOdd: boolean;
  index: number;
  onDetailClick: () => void;
  onContactClick: () => void;
  onHoldSuccess: () => void;
}

export const InteractiveServiceCard: React.FC<InteractiveServiceCardProps> = ({
  service,
  language,
  isOdd,
  index,
  onDetailClick,
  onContactClick,
  onHoldSuccess,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { setCursorState } = useCursor();
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const HOLD_DURATION = 1500;

  if (isMobile) {
    return (
      <ServiceCard
        service={service}
        language={language}
        isOdd={isOdd}
        index={index}
        onDetailClick={onDetailClick}
        onContactClick={onContactClick}
      />
    );
  }

  const startHold = () => {
    setIsHolding(true);
    setHoldProgress(0);

    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setHoldProgress(progress);
    }, 16);

    holdTimerRef.current = setTimeout(() => {
      completeHold();
    }, HOLD_DURATION);
  };

  const cancelHold = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  const completeHold = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsHolding(false);
    setHoldProgress(0);
    onHoldSuccess();
  };

  const handleMouseEnter = () => {
    setCursorState({
      type: 'hold',
      text: language === 'tr' ? 'Dinlemek için basılı tut' : 'Hold to listen',
    });
  };

  const handleMouseLeave = () => {
    setCursorState({ type: 'default', text: '' });
    cancelHold();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      startHold();
    }
  };

  const handleMouseUp = () => {
    cancelHold();
  };

  const circumference = 2 * Math.PI * 100;
  const strokeDashoffset = circumference - (holdProgress / 100) * circumference;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <ServiceCard
        service={service}
        language={language}
        isOdd={isOdd}
        index={index}
        onDetailClick={onDetailClick}
        onContactClick={onContactClick}
      />

      <AnimatePresence>
        {isHolding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[99997] flex items-center justify-center"
          >
            <svg width="200" height="200" className="transform -rotate-90">
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="90"
                stroke={service.glowColor || '#ffffff'}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 8px ${service.glowColor || '#ffffff'})`,
                }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
