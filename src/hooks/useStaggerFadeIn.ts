import { useEffect, useRef, useState } from 'react';

export function useStaggerFadeIn(itemCount: number, options = {}) {
  const ref = useRef<HTMLDivElement>(null);
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

  // Žádné animace - vše je viditelné
  const getItemStyle = (index: number) => ({
    opacity: 1,
    transform: 'translateY(0)',
    // Žádné transitions
  });

  return { ref, isVisible, getItemStyle };
}
