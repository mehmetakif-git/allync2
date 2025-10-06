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
  borderWidth = 0,
  movementDuration = 2,
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

      setPosition({ x, y });

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        setOpacity(1);
      } else {
        const distanceX = Math.max(0, e.clientX < rect.left ? rect.left - e.clientX : e.clientX - rect.right);
        const distanceY = Math.max(0, e.clientY < rect.top ? rect.top - e.clientY : e.clientY - rect.bottom);
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < proximity) {
          setOpacity(1 - distance / proximity);
        } else {
          setOpacity(0);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [disabled, proximity]);

  useEffect(() => {
    if (disabled) return;

    const controls = animate(0, 360, {
      duration: movementDuration,
      repeat: Infinity,
      ease: "linear",
      onUpdate: (value) => setRotation(value),
    });

    return () => controls.stop();
  }, [movementDuration, disabled]);

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
          background: `rgba(255, 255, 255, 0.8)`,
          borderRadius: "inherit",
          padding: `${borderWidth}px`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          clipPath: `circle(${spread}px at ${position.x}px ${position.y}px)`,
          opacity: opacity,
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
