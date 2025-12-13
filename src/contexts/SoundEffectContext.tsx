import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';

interface SoundEffectContextType {
  playHoverSound: () => void;
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastPlayedRef = useRef<number>(0);
  const DEBOUNCE_MS = 50; // Prevent rapid-fire sounds

  // Initialize audio on mount
  useEffect(() => {
    audioRef.current = new Audio('/audio/sound_effects/click.mp3');
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'auto';

    // Preload the audio
    audioRef.current.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playHoverSound = useCallback(() => {
    const now = Date.now();
    if (now - lastPlayedRef.current < DEBOUNCE_MS) return;
    lastPlayedRef.current = now;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore errors (e.g., user hasn't interacted with page yet)
      });
    }
  }, []);

  // Global event listener for hover on interactive elements
  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if the element or its parent is an interactive element
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('role') && target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer');

      if (isInteractive) {
        playHoverSound();
      }
    };

    // Use capture phase to catch events before they bubble
    document.addEventListener('mouseenter', handleMouseEnter, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, [playHoverSound]);

  return (
    <SoundEffectContext.Provider value={{ playHoverSound }}>
      {children}
    </SoundEffectContext.Provider>
  );
};
