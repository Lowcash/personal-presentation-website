import { useEffect, useRef, useState } from 'react';

export function useSimpleScrollReveal(threshold = 0.1, options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Always visible - no animations

  // Vypnuto - žádné animace
  // useEffect(() => {
  //   const element = ref.current;
  //   if (!element) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsVisible(entry.isIntersecting);
  //     },
  //     {
  //       threshold: 0.1,
  //       ...options,
  //     }
  //   );

  //   observer.observe(element);

  //   return () => {
  //     if (element) {
  //       observer.unobserve(element);
  //     }
  //   };
  // }, []);

  return {
    ref,
    style: {
      opacity: 1,
      transform: 'translateY(0)',
      // Žádné transitions
    },
  };
}
