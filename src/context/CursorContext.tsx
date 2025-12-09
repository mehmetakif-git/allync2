import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

type CursorType = 'default' | 'hover' | 'hold';

interface CursorState {
  type: CursorType;
  text: string;
}

interface CursorContextValue {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
}

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

const CustomCursor: React.FC = () => {
  const { cursorState } = useCursor();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isMobile]);

  // Mobile'da veya default state'te render etme
  if (isMobile || cursorState.type === 'default') {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[100000]"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
      animate={{
        x: 15,
        y: 15,
      }}
    >
      <AnimatePresence mode="wait">
        {cursorState.type === 'hover' && (
          <motion.div
            key="hover"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center"
            style={{
              boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
          </motion.div>
        )}
        {cursorState.type === 'hold' && cursorState.text && (
          <motion.div
            key="hold"
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
            className="px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap text-white"
            style={{
              background: 'linear-gradient(135deg, #00d9ff 0%, #00b8e6 50%, #0099cc 100%)',
              boxShadow: '0 4px 20px rgba(0, 217, 255, 0.4), 0 0 40px rgba(0, 217, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span className="flex items-center gap-2">
              <span className="text-base">🎧</span>
              {cursorState.text}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorState, setCursorState] = useState<CursorState>({
    type: 'default',
    text: '',
  });

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
      <CustomCursor />
    </CursorContext.Provider>
  );
};
