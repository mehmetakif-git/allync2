"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";

export function LayoutTextFlip({
  words,
  text,
  duration = 2500,
  className,
}: {
  words: string[];
  text: string;
  duration?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [5, -5]);
  const rotateY = useTransform(x, [-50, 50], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div
      className={cn("flex flex-wrap items-center justify-center", className)}
    >
      <motion.span
        layoutId="subtext"
        className="text-4xl md:text-6xl font-bold text-white"
      >
        {text}
      </motion.span>
      <motion.span
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-fit overflow-hidden rounded-md border border-transparent bg-white px-4 py-2 font-sans text-4xl md:text-6xl font-bold tracking-tight text-black shadow-sm"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -40,
              opacity: 0,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            key={index}
            className="inline-block whitespace-nowrap text-black"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
}
