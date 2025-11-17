import { useEffect, useState } from 'react';
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

  // Only render in development OR if manually enabled via localStorage
  const isEnabled = process.env.NODE_ENV === 'development' || 
                   localStorage.getItem('debug_mode') === 'true';

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
        '%c→ Live scroll tracking\n→ RGB color values\n→ FPS monitoring',
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

  // Don't render at all if not enabled
  if (!isEnabled) {
    return null;
  }

  if (!isVisible) {
    return (
      <div 
        className="fixed bottom-4 left-4 z-50 opacity-20 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => setIsVisible(true)}
        title="Press 'D' to toggle debug info"
      >
        <Terminal className="w-6 h-6 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 font-mono text-xs">
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
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
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

          {/* Hint */}
          <div className="pt-2 border-t border-gray-800 text-gray-500 text-center">
            Press 'D' to toggle
          </div>
        </div>
      </div>
    </div>
  );
}