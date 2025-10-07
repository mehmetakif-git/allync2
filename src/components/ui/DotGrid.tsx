/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(InertiaPlugin);

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

export interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const surpriseMessages = [
  "Biraz mola ver istersen?",
  "Tıklama rekoru kırmaya mı çalışıyorsun?",
  "Vay canına, gizli bir dedektif!",
  "Aradığını buldun mu?",
  "Noktalar sana selam söylüyor.",
  "Allync AI was here.",
  "Bu kadar merak iyi değil.",
  "Ekranı kıracaksın!",
  "Sürpriz! Tekrar ben.",
  "Kahve içtin mi bugün?",
  "Sanırım burayı sevdin.",
  "Matrix'e hoş geldin.",
  "Dikkat et, noktalar ısırabilir!",
  "777 - Melekler seninle.",
  "Bir dilek tut!"
];

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 5,
  gap = 15,
  baseColor = '#FFFFFF',
  activeColor = '#FFFFFF',
  proximity = 50,
  speedTrigger = 90,
  shockRadius = 175,
  shockStrength = 12,
  maxSpeed = 5000,
  resistance = 1200,
  returnDuration = 2,
  className = '',
  style
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [popup, setPopup] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cell = dotSize + gap;
    const cols = Math.floor(width / cell);
    const rows = Math.floor(height / cell);

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  const handleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
        setPopup({ visible: true, message: randomMessage });
        return 0;
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (popup.visible) {
      const timer = setTimeout(() => {
        setPopup({ visible: false, message: '' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [popup.visible]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId: number;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let opacity = 0.3;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          opacity = 0.3 + (1 - dist / proximity) * 0.7;
        }

        const r = baseRgb.r;
        const g = baseRgb.g;
        const b = baseRgb.b;
        const style = `rgba(${r},${g},${b}, ${opacity})`;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    buildGrid();
    window.addEventListener('resize', buildGrid);
    return () => window.removeEventListener('resize', buildGrid);
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const pr = pointerRef.current;
      const rect = canvasRef.current!.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      const now = performance.now();
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = (dot.cx - pr.x);
          const pushY = (dot.cy - pr.y);
          gsap.to(dot, {
            xOffset: pushX,
            yOffset: pushY,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.5)',
                onComplete: () => {  dot._inertiaApplied = false; }
              });
            }
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);

          const effectiveShockStrength = 4;
          const pushX = (dot.cx - cx) * effectiveShockStrength * falloff;
          const pushY = (dot.cy - cy) * effectiveShockStrength * falloff;

          gsap.to(dot, {
            xOffset: pushX,
            yOffset: pushY,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.5)',
                onComplete: () => { dot._inertiaApplied = false; }
              });
            }
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 20);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        ref={wrapperRef}
        className={`fixed inset-0 -z-50 ${className}`}
        style={style}
        onClick={handleClick}
      >
        <canvas ref={canvasRef} />
      </div>
      <AnimatePresence>
        {popup.visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '2rem 3rem',
              borderRadius: '1rem',
              zIndex: 100,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              backdropFilter: 'blur(8px)',
              fontSize: '1.125rem',
              fontWeight: 500,
              textAlign: 'center',
              color: '#000',
              maxWidth: '28rem'
            }}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DotGrid;
