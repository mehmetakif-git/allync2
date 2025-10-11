import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initScrollAnimations } from './utils/scrollAnimations';
import { CursorProvider } from './context/CursorContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CursorProvider>
      <App />
    </CursorProvider>
  </StrictMode>
);

// Initialize scroll animations after React renders
setTimeout(() => {
  // Wait for loader to complete before initializing animations
  const checkForAnimations = () => {
    const appContainer = document.querySelector('.animations-enabled');
    if (appContainer) {
      initScrollAnimations();
    } else {
      setTimeout(checkForAnimations, 100);
    }
  };
  checkForAnimations();
}, 500);