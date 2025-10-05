import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check as CheckIcon } from 'lucide-react';

interface LoadingState {
  text: string;
}

interface MultiStepLoaderProps {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
}

export const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({
  loadingStates,
  loading = true,
  duration = 2000,
  loop = true,
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentState((prevState) => {
        if (loop) {
          return prevState === loadingStates.length - 1 ? 0 : prevState + 1;
        } else {
          return Math.min(prevState + 1, loadingStates.length - 1);
        }
      });
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          <div className="flex flex-col items-start space-y-4">
            {loadingStates.map((state, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: index <= currentState ? 1 : 0.3,
                  y: 0,
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 w-full"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index < currentState
                      ? 'bg-green-500'
                      : index === currentState
                      ? 'bg-blue-500'
                      : 'bg-gray-700'
                  }`}
                >
                  {index < currentState ? (
                    <CheckIcon className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span
                  className={`text-base transition-all duration-300 ${
                    index <= currentState ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {state.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
