import React, { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { cn } from "../../utils/cn";

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
  spread = 80,
  glow = false,
  disabled = true,
  proximity = 0,
  inactiveZone = 0.7,
  blur = 0,
  borderWidth = 3,
  movementDuration = 2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

      if (normalizedDistance > inactiveZone) {
        setPosition({ x, y });
        setOpacity(1 - normalizedDistance);
      } else {
        setOpacity(0);
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setOpacity(0);
    };

    const parent = containerRef.current?.parentElement;
    if (parent) {
      parent.addEventListener("mouseenter", handleMouseEnter);
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        parent.removeEventListener("mouseenter", handleMouseEnter);
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [disabled, proximity, inactiveZone]);

  useEffect(() => {
    if (!isHovered) {
      setRotation(0);
      return;
    }
    const controls = animate(0, 360, {
      duration: movementDuration,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (value) => setRotation(value),
    });

    return () => controls.stop();
  }, [movementDuration, isHovered]);

  if (disabled) return null;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-10 rounded-[inherit]",
        "overflow-visible"
      )}
      style={{
        padding: `${borderWidth}px`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${rotation}deg at 50% 50%, #dd7bbb 0deg, #d79f1e 90deg, #5a922c 180deg, #4c7894 270deg, #dd7bbb 360deg)`,
          borderRadius: "inherit",
          padding: `${borderWidth}px`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {glow && (
        <div
          className="absolute"
          style={{
            left: position.x,
            top: position.y,
            width: `${spread}px`,
            height: `${spread}px`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(255,255,255,0.4) 10%, transparent 30%),
               radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 5%, transparent 20%),
               radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 10%, transparent 25%)`,
            filter: blur > 0 ? `blur(${blur}px)` : "blur(20px)",
            pointerEvents: "none",
            opacity: opacity,
          }}
        />
      )}
    </motion.div>
  );
};
