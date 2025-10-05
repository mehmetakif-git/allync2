import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LayoutTextFlipProps {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
}

export function LayoutTextFlip({
  text,
  words,
  duration = 2500,
  className = "",
}: LayoutTextFlipProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {text}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block origin-center"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
