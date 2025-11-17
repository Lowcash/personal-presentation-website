import { useEffect, useState, useRef } from 'react';
import { Terminal } from 'lucide-react';

/**
 * Debug component - Easter egg for developers
 * Toggle with "D" key
 * Only available in development mode or when manually enabled
 */
export function DebugInfo() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [orbR, setOrbR] = useState(0);
  const [orbG, setOrbG] = useState(0);
  const [orbB, setOrbB] = useState(0);
  const [fps, setFps] = useState(60);
  
  // Drag & drop state
  const [position, setPosition] = useState<'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'>(() => {
    return (localStorage.getItem('debug_position') as any) || 'bottom-left';
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Easter egg settings
  const [orbBrightness, setOrbBrightness] = useState(() => {
    return parseFloat(localStorage.getItem('orb_brightness') || '0.5'); // Changed default to 0.5
  });
  const [vignetteStyle, setVignetteStyle] = useState(() => {
    return localStorage.getItem('vignette_style') || 'minimal'; // Changed default to minimal
  });
  const [animationSpeed, setAnimationSpeed] = useState(() => {
    return parseFloat(localStorage.getItem('animation_speed') || '1.5'); // Changed default to 1.5x
  });
  const [colorVariation, setColorVariation] = useState(() => {
    return parseFloat(localStorage.getItem('color_variation') || '100');
  });

  // Only render in development OR if manually enabled via localStorage
  const isEnabled = process.env.NODE_ENV === 'development' || 
                   localStorage.getItem('debug_mode') === 'true';
  
  // Apply settings to CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--orb-brightness', String(orbBrightness));
    root.style.setProperty('--vignette-style', vignetteStyle);
    root.style.setProperty('--animation-speed', String(animationSpeed));
    root.style.setProperty('--color-variation', String(colorVariation / 100)); // normalize to 0-1
    localStorage.setItem('orb_brightness', String(orbBrightness));
    localStorage.setItem('vignette_style', vignetteStyle);
    localStorage.setItem('animation_speed', String(animationSpeed));
    localStorage.setItem('color_variation', String(colorVariation));
  }, [orbBrightness, vignetteStyle, animationSpeed, colorVariation]);

  // Toggle visibility with "D" key
  useEffect(() => {
    if (!isEnabled) return;

    // Show console hint on first load
    const hasSeenHint = sessionStorage.getItem('debug_hint_shown');
    if (!hasSeenHint) {
      console.log(
        '%c🎮 Easter Egg Found!',
        'color: #ec4899; font-size: 16px; font-weight: bold;'
      );
      console.log(
        '%cPress "D" to toggle Developer Console',
        'color: #a855f7; font-size: 12px;'
      );
      console.log(
        '%c→ Live scroll tracking\n→ RGB color values\n→ FPS monitoring\n→ Orb brightness control\n→ Vignette style switcher',
        'color: #8b5cf6; font-size: 11px;'
      );
      sessionStorage.setItem('debug_hint_shown', 'true');
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isEnabled]);

  // Track scroll and orb colors
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      
      const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollPercent(percent);

      // Get computed orb colors from CSS variables
      const root = getComputedStyle(document.documentElement);
      setOrbR(parseInt(root.getPropertyValue('--orb-r')) || 0);
      setOrbG(parseInt(root.getPropertyValue('--orb-g')) || 0);
      setOrbB(parseInt(root.getPropertyValue('--orb-b')) || 0);

      // Calculate FPS
      frameCount++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const fpsInterval = setInterval(() => {
      handleScroll(); // Update FPS regularly
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(fpsInterval);
    };
  }, []);

  // Click outside to close
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible]);

  // Drag & drop handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON' && 
        (e.target as HTMLElement).tagName !== 'INPUT') {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    // Prevent text selection while dragging
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      // Simple threshold to detect drag direction
      if (Math.abs(dx) > 50 || Math.abs(dy) > 50) {
        // Determine new position based on quadrant
        const isLeft = e.clientX < window.innerWidth / 2;
        const isTop = e.clientY < window.innerHeight / 2;
        
        const newPos = isTop 
          ? (isLeft ? 'top-left' : 'top-right')
          : (isLeft ? 'bottom-left' : 'bottom-right');
        
        setPosition(newPos);
        localStorage.setItem('debug_position', newPos);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Restore text selection
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, dragStart]);

  // Don't render at all if not enabled
  if (!isEnabled) {
    return null;
  }

  if (!isVisible) {
    return (
      <div 
        className={`fixed z-50 opacity-20 hover:opacity-100 transition-opacity cursor-pointer ${
          position === 'top-left' ? 'top-4 left-4' :
          position === 'top-right' ? 'top-4 right-4' :
          position === 'bottom-right' ? 'bottom-4 right-4' :
          'bottom-4 left-4'
        }`}
        onClick={() => setIsVisible(true)}
        title="Press 'D' to toggle debug info"
      >
        <Terminal className="w-6 h-6 text-gray-400" />
      </div>
    );
  }

  return (
    <div 
      ref={panelRef}
      className={`fixed z-50 font-mono text-xs transition-all ${
        position === 'top-left' ? 'top-4 left-4' :
        position === 'top-right' ? 'top-4 right-4' :
        position === 'bottom-right' ? 'bottom-4 right-4' :
        'bottom-4 left-4'
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
    >
      {/* Cyber/retro styled panel */}
      <div 
        className="relative border-2 rounded-lg overflow-hidden backdrop-blur-xl"
        style={{
          borderColor: `rgb(${orbR}, ${orbG}, ${orbB})`,
          boxShadow: `0 0 20px rgba(${orbR}, ${orbG}, ${orbB}, 0.3), inset 0 0 20px rgba(${orbR}, ${orbG}, ${orbB}, 0.05)`,
          background: 'rgba(3, 7, 18, 0.9)'
        }}
      >
        {/* Header */}
        <div 
          className="px-4 py-2 flex items-center justify-between border-b-2"
          style={{ 
            borderColor: `rgb(${orbR}, ${orbG}, ${orbB})`,
            background: `rgba(${orbR}, ${orbG}, ${orbB}, 0.1)`
          }}
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" style={{ color: `rgb(${orbR}, ${orbG}, ${orbB})` }} />
            <span className="text-white">DEV.CONSOLE</span>
            <span className="text-[8px] text-gray-500">(drag to move)</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2 min-w-[280px]">
          {/* Scroll Progress */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400">SCROLL:</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${scrollPercent}%`,
                    background: `linear-gradient(90deg, rgb(${orbR}, ${orbG}, ${orbB}), rgba(${orbR}, ${orbG}, ${orbB}, 0.6))`
                  }}
                />
              </div>
              <span className="text-white tabular-nums w-12 text-right">{scrollPercent.toFixed(1)}%</span>
            </div>
          </div>

          {/* RGB Values */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400">ORB_RGB:</span>
            <div className="flex gap-2 text-white tabular-nums">
              <span style={{ color: `rgb(255, ${orbG}, ${orbB})` }}>{orbR.toString().padStart(3, '0')}</span>
              <span style={{ color: `rgb(${orbR}, 255, ${orbB})` }}>{orbG.toString().padStart(3, '0')}</span>
              <span style={{ color: `rgb(${orbR}, ${orbG}, 255)` }}>{orbB.toString().padStart(3, '0')}</span>
            </div>
          </div>

          {/* Color Preview */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400">COLOR:</span>
            <div 
              className="w-32 h-6 rounded border-2 border-gray-700"
              style={{ 
                background: `rgb(${orbR}, ${orbG}, ${orbB})`,
                boxShadow: `0 0 10px rgba(${orbR}, ${orbG}, ${orbB}, 0.5)`
              }}
            />
          </div>

          {/* FPS */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400">FPS:</span>
            <span 
              className="text-white tabular-nums"
              style={{ color: fps < 30 ? '#ef4444' : fps < 50 ? '#f59e0b' : '#10b981' }}
            >
              {fps}
            </span>
          </div>
          
          {/* DIVIDER */}
          <div className="border-t-2 border-gray-800 my-3" style={{ borderColor: `rgba(${orbR}, ${orbG}, ${orbB}, 0.3)` }} />
          
          {/* CONTROLS SECTION */}
          <div className="space-y-3">
            <div className="text-xs text-gray-500 uppercase tracking-wider">⚙️ Controls</div>
            
            {/* Orb Brightness Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400 text-[10px]">ORB BRIGHTNESS:</span>
                <span className="text-white tabular-nums text-[10px]">{orbBrightness.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.1"
                value={orbBrightness}
                onChange={(e) => setOrbBrightness(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer"
                style={{
                  accentColor: `rgb(${orbR}, ${orbG}, ${orbB})`
                }}
              />
            </div>
            
            {/* Animation Speed Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400 text-[10px]">ANIMATION SPEED:</span>
                <span className="text-white tabular-nums text-[10px]">{animationSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer"
                style={{
                  accentColor: `rgb(${orbR}, ${orbG}, ${orbB})`
                }}
              />
            </div>
            
            {/* Color Variation Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400 text-[10px]">COLOR VARIATION:</span>
                <span className="text-white tabular-nums text-[10px]">{colorVariation.toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={colorVariation}
                onChange={(e) => setColorVariation(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer"
                style={{
                  accentColor: `rgb(${orbR}, ${orbG}, ${orbB})`
                }}
              />
            </div>
            
            {/* Vignette Style Radio */}
            <div>
              <div className="text-gray-400 text-[10px] mb-1.5">VIGNETTE STYLE:</div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                {[
                  { value: 'classic', label: 'Classic', desc: 'Dark edges' },
                  { value: 'inverted', label: 'Inverted', desc: 'Dark center' },
                  { value: 'minimal', label: 'Minimal', desc: 'Subtle' },
                  { value: 'none', label: 'None', desc: 'No effect' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setVignetteStyle(option.value)}
                    className={`px-2 py-1.5 rounded border transition-all ${
                      vignetteStyle === option.value
                        ? 'border-current text-white'
                        : 'border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-600'
                    }`}
                    style={vignetteStyle === option.value ? {
                      borderColor: `rgb(${orbR}, ${orbG}, ${orbB})`,
                      background: `rgba(${orbR}, ${orbG}, ${orbB}, 0.15)`
                    } : {}}
                  >
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-[9px] opacity-70">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Reset Button */}
            <button
              onClick={() => {
                const defaults = {
                  brightness: 0.5,
                  vignette: 'minimal',
                  speed: 1.5,
                  variation: 100
                };
                
                setOrbBrightness(defaults.brightness);
                setVignetteStyle(defaults.vignette);
                setAnimationSpeed(defaults.speed);
                setColorVariation(defaults.variation);
                
                // Force immediate localStorage update
                localStorage.setItem('orb_brightness', String(defaults.brightness));
                localStorage.setItem('vignette_style', defaults.vignette);
                localStorage.setItem('animation_speed', String(defaults.speed));
                localStorage.setItem('color_variation', String(defaults.variation));
              }}
              className="w-full px-3 py-1.5 text-[10px] text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded transition-all"
            >
              RESET TO DEFAULT
            </button>
          </div>

          {/* Hint */}
          <div className="pt-2 border-t border-gray-800 text-gray-500 text-center">
            Press 'D' to toggle
          </div>
        </div>
      </div>
    </div>
  );
}