"use client";
import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.12,
  themeColor,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
  themeColor?: string;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  const prevWordsRef = useRef(words);

  useEffect(() => {
    // Re-animate when words change
    if (scope.current) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(staggerDelay),
        }
      );
    }
  }, [words, animate, filter, duration, staggerDelay]);

  // Reset animation when words change
  useEffect(() => {
    if (prevWordsRef.current !== words && scope.current) {
      const spans = scope.current.querySelectorAll("span");
      spans.forEach((span: HTMLSpanElement) => {
        span.style.opacity = "0";
        span.style.filter = filter ? "blur(10px)" : "none";
      });
      prevWordsRef.current = words;
    }
  }, [words, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="flex flex-wrap justify-center gap-x-2 gap-y-1">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="inline-block opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
                color: "white",
                textShadow: themeColor ? `0 0 20px ${themeColor}40` : undefined,
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-medium", className)}>
      <div className="text-white text-lg md:text-xl leading-relaxed tracking-wide">
        {renderWords()}
      </div>
    </div>
  );
};
