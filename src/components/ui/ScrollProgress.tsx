import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  showMilestones?: boolean;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ showMilestones = true }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentSection, setCurrentSection] = useState('hero');

  const milestones = [
    { id: 'hero', label: 'Home', position: 0 },
    { id: 'chat-demo', label: 'Demo', position: 0.15 },
    { id: 'packages', label: 'Packages', position: 0.30 },
    { id: 'industry-examples', label: 'Industries', position: 0.45 },
    { id: 'features', label: 'Features', position: 0.60 },
    { id: 'pricing', label: 'Pricing', position: 0.75 },
    { id: 'contact', label: 'Contact', position: 0.90 }
  ];

  useEffect(() => {
    const updateSection = () => {
      const scrolled = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrolled / totalHeight;

      for (let i = milestones.length - 1; i >= 0; i--) {
        if (progress >= milestones[i].position) {
          setCurrentSection(milestones[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', updateSection, { passive: true });
    return () => window.removeEventListener('scroll', updateSection);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <motion.div
        className="h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 origin-left"
        style={{ scaleX }}
      />

      {showMilestones && (
        <div className="absolute top-2 left-0 right-0 flex justify-between px-8 pointer-events-auto">
          {milestones.map((milestone) => (
            <button
              key={milestone.id}
              onClick={() => {
                const element = document.getElementById(milestone.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`group relative transition-all duration-300 ${
                currentSection === milestone.id ? 'scale-110' : 'scale-100 opacity-50 hover:opacity-100'
              }`}
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSection === milestone.id
                  ? 'bg-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-500 group-hover:bg-gray-300'
              }`} />

              <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded px-2 py-1 whitespace-nowrap">
                  <span className="text-xs text-white font-medium">{milestone.label}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <motion.div
        className="absolute top-0 h-1 w-20 pointer-events-none"
        style={{
          left: scrollYProgress,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
          filter: 'blur(8px)',
          scaleX: 1
        }}
      />
    </div>
  );
};
