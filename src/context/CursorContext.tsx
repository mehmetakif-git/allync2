import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (cursorState.type === 'default' || !isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[100000] mix-blend-difference"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
      animate={{
        x: -20,
        y: -20,
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
            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-white" />
          </motion.div>
        )}
        {cursorState.type === 'hold' && cursorState.text && (
          <motion.div
            key="hold"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-2 rounded-full bg-white text-black font-semibold text-sm whitespace-nowrap"
          >
            {cursorState.text}
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
