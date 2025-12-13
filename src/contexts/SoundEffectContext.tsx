import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';

interface SoundEffectContextType {
  playHoverSound: () => void;
  playClickSound: () => void;
  playBackSound: () => void;
}

const SoundEffectContext = createContext<SoundEffectContextType | null>(null);

export const useSoundEffect = () => {
  const context = useContext(SoundEffectContext);
  if (!context) {
    throw new Error('useSoundEffect must be used within a SoundEffectProvider');
  }
  return context;
};

interface SoundEffectProviderProps {
  children: React.ReactNode;
}

export const SoundEffectProvider: React.FC<SoundEffectProviderProps> = ({ children }) => {
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const backAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastHoverPlayedRef = useRef<number>(0);
  const lastClickPlayedRef = useRef<number>(0);
  const lastBackPlayedRef = useRef<number>(0);
  const HOVER_DEBOUNCE_MS = 50;
  const CLICK_DEBOUNCE_MS = 100;
  const BACK_DEBOUNCE_MS = 100;

  // Initialize audio on mount
  useEffect(() => {
    // Hover sound
    hoverAudioRef.current = new Audio('/audio/sound_effects/hover.mp3');
    hoverAudioRef.current.volume = 0.3;
    hoverAudioRef.current.preload = 'auto';
    hoverAudioRef.current.load();

    // Click sound
    clickAudioRef.current = new Audio('/audio/sound_effects/click.mp3');
    clickAudioRef.current.volume = 0.4;
    clickAudioRef.current.preload = 'auto';
    clickAudioRef.current.load();

    // Back sound
    backAudioRef.current = new Audio('/audio/sound_effects/back.mp3');
    backAudioRef.current.volume = 0.4;
    backAudioRef.current.preload = 'auto';
    backAudioRef.current.load();

    return () => {
      if (hoverAudioRef.current) {
        hoverAudioRef.current.pause();
        hoverAudioRef.current = null;
      }
      if (clickAudioRef.current) {
        clickAudioRef.current.pause();
        clickAudioRef.current = null;
      }
      if (backAudioRef.current) {
        backAudioRef.current.pause();
        backAudioRef.current = null;
      }
    };
  }, []);

  const playHoverSound = useCallback(() => {
    const now = Date.now();
    if (now - lastHoverPlayedRef.current < HOVER_DEBOUNCE_MS) return;
    lastHoverPlayedRef.current = now;

    if (hoverAudioRef.current) {
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play().catch(() => {});
    }
  }, []);

  const playClickSound = useCallback(() => {
    const now = Date.now();
    if (now - lastClickPlayedRef.current < CLICK_DEBOUNCE_MS) return;
    lastClickPlayedRef.current = now;

    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {});
    }
  }, []);

  const playBackSound = useCallback(() => {
    const now = Date.now();
    if (now - lastBackPlayedRef.current < BACK_DEBOUNCE_MS) return;
    lastBackPlayedRef.current = now;

    if (backAudioRef.current) {
      backAudioRef.current.currentTime = 0;
      backAudioRef.current.play().catch(() => {});
    }
  }, []);

  // Check if element is interactive
  const isInteractiveElement = (target: HTMLElement): boolean => {
    return !!(
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a') ||
      (target.hasAttribute('role') && target.getAttribute('role') === 'button') ||
      target.classList.contains('cursor-pointer') ||
      target.closest('[role="button"]') ||
      target.closest('.cursor-pointer')
    );
  };

  // Global event listener for hover on interactive elements
  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isInteractiveElement(target)) {
        playHoverSound();
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    return () => document.removeEventListener('mouseenter', handleMouseEnter, true);
  }, [playHoverSound]);

  // Global event listener for click on interactive elements
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isInteractiveElement(target)) {
        playClickSound();
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [playClickSound]);

  return (
    <SoundEffectContext.Provider value={{ playHoverSound, playClickSound, playBackSound }}>
      {children}
    </SoundEffectContext.Provider>
  );
};
