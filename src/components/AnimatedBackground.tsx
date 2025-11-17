import { useEffect, useState, useRef } from 'react';
import { ORB_COLORS } from '../lib/section-config';
import { ANIMATION_CONFIG, SECTION_COUNT } from '../lib/constants';

/**
 * Generate color breakpoints dynamically based on section count
 * Each section gets equal percentage space (100% / 9 sections = ~11.11% each)
 */
const generateColorBreakpoints = () => {
  const percentPerSection = 100 / (SECTION_COUNT - 1); // 9 sections = 8 segments
  
  return ORB_COLORS.map((color, index) => ({
    percent: index * percentPerSection,
    ...color
  }));
};

const COLOR_BREAKPOINTS = generateColorBreakpoints();

/**
 * Linear interpolation helper
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function AnimatedBackground() {
  const [targetScrollPercent, setTargetScrollPercent] = useState(0);
  const [smoothScrollPercent, setSmoothScrollPercent] = useState(0);
  const rafRef = useRef<number>();

  // RAW SCROLL TRACKING - set target
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      
      const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setTargetScrollPercent(Math.min(100, Math.max(0, percent)));
    };

    handleScroll(); // Initial
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SMOOTH INTERPOLATION - RAF loop
  useEffect(() => {
    const animate = () => {
      setSmoothScrollPercent(prev => {
        const diff = targetScrollPercent - prev;
        
        // Pokud je rozdíl malý, snap to target
        if (Math.abs(diff) < ANIMATION_CONFIG.SMOOTH_SCROLL_SNAP_THRESHOLD) {
          return targetScrollPercent;
        }
        
        return prev + diff * ANIMATION_CONFIG.SMOOTH_SCROLL_EASING;
      });
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [targetScrollPercent]);

  // Calculate segment (0 to SECTION_COUNT-2, so 0-7 for 9 sections)
  const percentPerSegment = 100 / (SECTION_COUNT - 1); // ~12.5% per segment
  const segmentIndex = Math.min(
    SECTION_COUNT - 2, 
    Math.floor(smoothScrollPercent / percentPerSegment)
  );
  
  // Local progress within current segment (0-1)
  const segmentStart = segmentIndex * percentPerSegment;
  const segmentProgress = Math.min(
    1, 
    Math.max(0, (smoothScrollPercent - segmentStart) / percentPerSegment)
  );
  
  // Barvy pro aktuální segment
  const colorFrom = COLOR_BREAKPOINTS[segmentIndex];
  const colorTo = COLOR_BREAKPOINTS[segmentIndex + 1];
  
  // INTERPOLOVAT v JavaScriptu
  const interpolatedR = Math.round(lerp(colorFrom.r, colorTo.r, segmentProgress));
  const interpolatedG = Math.round(lerp(colorFrom.g, colorTo.g, segmentProgress));
  const interpolatedB = Math.round(lerp(colorFrom.b, colorTo.b, segmentProgress));
  
  // Nastavit CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    
    // Globální progress (0-1) - SMOOTH VERSION
    root.style.setProperty('--scroll-progress', String(smoothScrollPercent / 100));
    root.style.setProperty('--scroll-percent', String(smoothScrollPercent));
    
    // Interpolované RGB hodnoty
    root.style.setProperty('--orb-r', String(interpolatedR));
    root.style.setProperty('--orb-g', String(interpolatedG));
    root.style.setProperty('--orb-b', String(interpolatedB));
  }, [smoothScrollPercent, interpolatedR, interpolatedG, interpolatedB]);
  
  const orbColor = `rgb(${interpolatedR}, ${interpolatedG}, ${interpolatedB})`;
  
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: '#030712' }}>
      {/* ============ OPTIMALIZOVANÉ - 8 ORBŮ PRO PERFORMANCE ============ */}
      
      {/* ORB 1 - Top left corner */}
      <div 
        className="orb-1 absolute rounded-full"
        style={{
          top: '-20%',
          left: '-15%',
          width: '900px',
          height: '900px',
          filter: 'blur(120px)',
          opacity: 0.15,
          background: orbColor,
          willChange: 'transform, filter',
        }}
      />
      
      {/* ORB 2 - Top right corner */}
      <div 
        className="orb-2 absolute rounded-full"
        style={{
          top: '-22%',
          right: '-18%',
          width: '850px',
          height: '850px',
          filter: 'blur(115px)',
          opacity: 0.14,
          background: orbColor,
          willChange: 'transform, filter',
        }}
      />
      
      {/* ORB 3 - Bottom left corner */}
      <div 
        className="orb-3 absolute rounded-full"
        style={{
          bottom: '-18%',
          left: '-20%',
          width: '880px',
          height: '880px',
          filter: 'blur(118px)',
          opacity: 0.15,
          background: orbColor,
          willChange: 'transform, filter',
        }}
      />
      
      {/* ORB 4 - Bottom right corner */}
      <div 
        className="orb-4 absolute rounded-full"
        style={{
          bottom: '-20%',
          right: '-16%',
          width: '860px',
          height: '860px',
          filter: 'blur(116px)',
          opacity: 0.14,
          background: orbColor,
          willChange: 'transform, filter',
        }}
      />
      
      {/* ORB 5 - Top center */}
      <div 
        className="orb-5 absolute rounded-full"
        style={{
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '750px',
          height: '750px',
          filter: 'blur(105px)',
          opacity: 0.13,
          background: orbColor,
          willChange: 'transform, filter',
        }}
      />
      
      {/* ORB 6 - Left center */}
      <div 
        className="orb-6 absolute rounded-full"
        style={{
          top: '50%',
          left: '-18%',
          transform: 'translateY(-50%)',
          width: '780px',
          height: '780px',
          filter: 'blur(108px)',
          opacity: 0.13,
          background: orbColor,
          willChange: 'transform, filter',
        }}
      />
      
      {/* ORB 7 - Right center */}
      <div 
        className="orb-7 absolute rounded-full"
        style={{
          top: '50%',
          right: '-16%',
          transform: 'translateY(-50%)',
          width: '760px',
          height: '760px',
          filter: 'blur(106px)',
          opacity: 0.12,
          background: orbColor,
          willChange: 'transform, filter',
        }}
      />
      
      {/* ORB 8 - Center (hlavní světelný zdroj) */}
      <div 
        className="orb-8 absolute rounded-full"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          filter: 'blur(110px)',
          opacity: 0.11,
          background: orbColor,
          willChange: 'transform, filter',
        }}
      />
      
      {/* Dark overlay pro kontrast a depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/50 to-gray-950/70 pointer-events-none" />
      
      {/* VIGNETTE EFFECT - silný pro focus */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, transparent 20%, rgba(3, 7, 18, 0.4) 45%, rgba(3, 7, 18, 0.75) 75%, rgba(3, 7, 18, 0.92) 100%)'
        }}
      />
    </div>
  );
}