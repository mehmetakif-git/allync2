import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { cn } from '../../utils/cn';

interface DotGridProps {
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  opacity: number;
  radius: number;
}

const DotGrid: React.FC<DotGridProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>();
  const dotsRef = useRef<Dot[]>([]);

  const shockRadius = 200;
  const shockStrength = 50;
  const resistance = 0.15;
  const returnDuration = 0.8;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onClick = useCallback((e: MouseEvent) => {
    const clickX = e.clientX;
    const clickY = e.clientY;

    dotsRef.current.forEach((dot) => {
      const dx = clickX - dot.baseX;
      const dy = clickY - dot.baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < shockRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (1 - distance / shockRadius) * shockStrength;
        const targetX = dot.baseX - Math.cos(angle) * force;
        const targetY = dot.baseY - Math.sin(angle) * force;

        gsap.to(dot, {
          x: targetX,
          y: targetY,
          duration: resistance,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(dot, {
              x: dot.baseX,
              y: dot.baseY,
              duration: returnDuration,
              ease: "elastic.out(1, 0.3)"
            });
          }
        });
      }
    });
  }, [shockRadius, shockStrength, resistance, returnDuration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const dotSpacing = 30;
      const cols = Math.ceil(canvas.width / dotSpacing);
      const rows = Math.ceil(canvas.height / dotSpacing);

      dotsRef.current = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;
          dotsRef.current.push({
            x,
            y,
            baseX: x,
            baseY: y,
            opacity: 0.3,
            radius: 1.5
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const dotRadius = 1.5;
    const maxDistance = 150;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', onClick);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach((dot) => {
        const dx = mousePos.current.x - dot.x;
        const dy = mousePos.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let opacity = 0.3;
        let radius = dotRadius;

        if (distance < maxDistance) {
          const influence = 1 - distance / maxDistance;
          opacity = 0.3 + influence * 0.7;
          radius = dotRadius + influence * 2;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', onClick);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [onClick]);

  if (isMobile) {
    return null;
  }

  return (
    <div className={cn("fixed inset-0 -z-50", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default DotGrid;
