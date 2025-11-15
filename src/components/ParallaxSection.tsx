import { useEffect, useState, useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxSection({ children, id, className, style }: ParallaxSectionProps) {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();
  const targetOffsetRef = useRef(0);
  const currentOffsetRef = useRef(0);
  const lastRelativePositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Vypočítat pozici sekce relativně k viewportu
      // -1 když je nahoře viewportu, 0 když ve středu, +1 když dole
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const relativePosition = (sectionCenter - viewportCenter) / windowHeight;
      
      lastRelativePositionRef.current = relativePosition;
      
      // Parallax offset: -50px až +50px
      const maxOffset = 50;
      
      // Když je VELMI blízko středu, force target na 0
      if (Math.abs(relativePosition) < 0.05) {
        targetOffsetRef.current = 0;
      } else {
        // Exponenciální útlum ke středu
        const exponentialFactor = Math.abs(relativePosition) > 0.3 
          ? 1.0
          : Math.pow(Math.abs(relativePosition) / 0.3, 2);
        
        targetOffsetRef.current = relativePosition * maxOffset * exponentialFactor;
      }
    };

    // RAF loop pro smooth interpolaci
    const animate = () => {
      const diff = targetOffsetRef.current - currentOffsetRef.current;
      
      // DYNAMIC EASING: Rychlejší když je blízko středu (snap completion)
      const isNearCenter = Math.abs(lastRelativePositionRef.current) < 0.1;
      const easing = isNearCenter ? 0.25 : 0.08; // 3x rychlejší blízko středu
      
      if (Math.abs(diff) > 0.01) {
        currentOffsetRef.current += diff * easing;
        setParallaxOffset(currentOffsetRef.current);
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };

    handleScroll(); // Initial
    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={{
        ...style,
        transform: `translateY(${parallaxOffset}px)`,
        transition: 'opacity 700ms ease-out', // Preserve opacity transition
      }}
    >
      {children}
    </section>
  );
}