import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  variant?: "default" | "card" | "nav";
}

export const GlowingEffect: React.FC<GlowingEffectProps> = ({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  variant = "default",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

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
        className="absolute"
        style={{
          left: position.x,
          top: position.y,
          width: `${spread}px`,
          height: `${spread}px`,
          transform: "translate(-50%, -50%)",
          background: glow
            ? `radial-gradient(circle, #6b7280 10%, #6b728000 20%),
               radial-gradient(circle at 40% 40%, #9ca3af 5%, #9ca3af00 15%),
               radial-gradient(circle at 60% 60%, #4b5563 10%, #4b556300 20%),
               radial-gradient(circle at 40% 60%, #374151 10%, #37415100 20%)`
            : "transparent",
          filter: glow ? "blur(10px)" : "none",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
};
