import React, { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";

export interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  blur?: number;
  borderWidth?: number;
  movementDuration?: number;
}

export const GlowingEffect: React.FC<GlowingEffectProps> = ({
  spread = 100,
  glow = true,
  disabled = false,
  proximity = 100,
  inactiveZone = 0.01,
  blur = 0,
  borderWidth = 2,
  movementDuration = 4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const distanceFromCenter = Math.sqrt(
        Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2)
      );

      const maxDistance = Math.max(rect.width, rect.height) / 2;
      const normalizedDistance = distanceFromCenter / maxDistance;

      if (normalizedDistance > inactiveZone && distanceFromCenter < proximity) {
        setPosition({ x, y });
        setOpacity(1 - normalizedDistance);
      } else {
        setOpacity(0);
      }
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    const parent = containerRef.current?.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [disabled, proximity, inactiveZone]);

  useEffect(() => {
    const controls = animate(0, 360, {
      duration: movementDuration,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (value) => setRotation(value),
    });

    return () => controls.stop();
  }, [movementDuration]);

  if (disabled) return null;

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
      style={{
        opacity: opacity,
      }}
      animate={{
        opacity: opacity,
      }}
      transition={{
        opacity: { duration: 0.3 },
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${rotation}deg at 50% 50%, #dd7bbb 0deg, #d79f1e 90deg, #5a922c 180deg, #4c7894 270deg, #dd7bbb 360deg)`,
          maskImage: `radial-gradient(${spread}px circle at ${position.x}px ${position.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(${spread}px circle at ${position.x}px ${position.y}px, black, transparent)`,
        }}
      />
      <div
        className="absolute inset-[1px] rounded-[inherit]"
        style={{
          background: "inherit",
          filter: blur > 0 ? `blur(${blur}px)` : "none",
        }}
      />
    </motion.div>
  );
};
