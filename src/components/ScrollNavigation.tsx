interface ScrollNavigationProps {
  currentSection: number;
  totalSections: number;
  sectionNames: string[];
  onSectionClick: (index: number) => void;
}

export function ScrollNavigation({ currentSection, totalSections, sectionNames, onSectionClick }: ScrollNavigationProps) {
  const sections = Array.from({ length: totalSections }, (_, i) => ({
    id: i,
    label: sectionNames[i],
  }));

  return (
    <>
      {/* DESKTOP - Right side vertical dots */}
      <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className="group relative cursor-pointer flex items-center justify-center w-3 h-3"
              aria-label={`Scroll to ${section.label}`}
            >
              {/* Dot - CSS CLASSES pro barvu */}
              <div 
                className={`rounded-full transition-all duration-300 ${
                  currentSection === section.id ? 'scroll-nav-dot-active w-3 h-3' : 'scroll-nav-dot-inactive w-2 h-2'
                }`}
              />
              
              {/* Tooltip on hover - minimalist */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {section.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE/TABLET - Bottom horizontal dots */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 flex gap-2.5">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className="group relative cursor-pointer flex items-center justify-center w-2 h-2"
              aria-label={`Scroll to ${section.label}`}
            >
              <div 
                className={`rounded-full transition-all duration-300 ${
                  currentSection === section.id ? 'scroll-nav-dot-active w-2 h-2' : 'scroll-nav-dot-inactive w-1.5 h-1.5'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
