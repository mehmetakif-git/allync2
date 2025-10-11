import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface InteractiveServiceCardProps {
  children: React.ReactElement;
  language: 'tr' | 'en';
  glowColor?: string;
  onHoldSuccess: () => void;
}

export const InteractiveServiceCard: React.FC<InteractiveServiceCardProps> = ({
  children,
  language,
  glowColor,
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
    return children;
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

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (holdProgress / 100) * circumference;

  return (
    <div className="relative">
      {React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
      })}

      <AnimatePresence>
        {isHolding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-[99997] flex items-center justify-center"
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
                stroke={glowColor || '#ffffff'}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 8px ${glowColor || '#ffffff'})`,
                }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
