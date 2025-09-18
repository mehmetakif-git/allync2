// Intersection Observer for scroll animations
export class ScrollAnimations {
  private observer: IntersectionObserver;
  private animatedElements = new Set<Element>();
  private isMobile = window.innerWidth <= 768;
  private throttleTimeout: number | null = null;

  constructor() {
    // Mobile-optimized intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only animate if animations are enabled
          const appContainer = document.querySelector('.animations-enabled');
          if (entry.isIntersecting && !this.animatedElements.has(entry.target) && appContainer) {
            // Add small delay to prevent simultaneous animations
            setTimeout(() => {
              this.animateElement(entry.target);
              this.animatedElements.add(entry.target);
            }, 50);
          }
        });
      },
      {
        threshold: this.isMobile ? 0.1 : 0.15,
        rootMargin: this.isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
      }
    );

    this.init();
  }

  private init() {
    // Wait for DOM to be ready and animations to be enabled
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.observeElements());
    } else {
      // Delay observation until after loader completes
      setTimeout(() => this.observeElements(), 1000);
    }
  }

  private observeElements() {
    const animationClasses = [
      '.fade-in-up',
      '.fade-in-left',
      '.fade-in-right',
      '.scale-in',
      '.scan-reveal',
      '.holographic-shimmer',
      '.particle-burst',
      '.energy-wave',
      '.counter-animate',
      '.card-slide-up',
      '.section-reveal'
    ];

    animationClasses.forEach(className => {
      const elements = document.querySelectorAll(className);
      elements.forEach(element => {
        // Add will-change for better performance
        (element as HTMLElement).style.willChange = 'transform, opacity';
        this.observer.observe(element);
      });
    });
  }

  private animateElement(element: Element) {
    // Remove will-change after animation completes
    setTimeout(() => {
      (element as HTMLElement).style.willChange = 'auto';
    }, 600);
    
    element.classList.add('visible');

    // Special handling for counters
    if (element.classList.contains('counter-animate')) {
      this.animateCounter(element);
    }

    // Special handling for typewriter effect
    if (element.classList.contains('typewriter-demo')) {
      this.animateTypewriter(element);
    }
  }

  private animateCounter(element: Element) {
    const numberElement = element.querySelector('[data-count]') as HTMLElement;
    if (!numberElement) return;

    const target = parseInt(numberElement.dataset.count || '0');
    const duration = 2000;
    const start = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);
      
      numberElement.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  private animateTypewriter(element: Element) {
    const textElement = element.querySelector('.typewriter-text') as HTMLElement;
    if (!textElement) return;

    const text = textElement.textContent || '';
    textElement.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        element.classList.remove('typewriter-demo');
      }
    }, 50);
  }

  public destroy() {
    this.observer.disconnect();
    this.animatedElements.clear();
  }

  public refresh() {
    this.observeElements();
  }
}

// Initialize scroll animations
export const initScrollAnimations = () => {
  return new ScrollAnimations();
};

// Utility functions for manual animation triggers
export const triggerAnimation = (element: Element, animationType: string) => {
  element.classList.add(animationType);
  setTimeout(() => {
    element.classList.add('visible');
  }, 50);
};

export const staggerElements = (elements: NodeListOf<Element>, delay: number = 100) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('visible');
    }, index * delay);
  });
};

// Performance monitoring
export const monitorAnimationPerformance = () => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure' && entry.name.includes('animation')) {
          console.log(`Animation ${entry.name}: ${entry.duration}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
  }
};