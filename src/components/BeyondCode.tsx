import { Music, Headphones, Play, Activity } from 'lucide-react';
import { SectionWrapper } from './shared/SectionWrapper';
import { SectionHeader } from './shared/SectionHeader';
import { TechTag } from './shared/TechTag';
import { useStaggerFadeIn } from '../hooks/useStaggerFadeIn';
import { SECTION_STYLES } from '../lib/section-config';

export function BeyondCode() {
  const { ref: cardsRef, getItemStyle } = useStaggerFadeIn(4);

  const interests = [
    {
      icon: Music,
      title: 'Music Production',
      description: 'As DJ Lowcash, I explore electronic music production and live DJ sets. From house to techno, music is where creativity meets technical precision - just like coding.',
      tags: ['Electronic Music', 'DJing', 'Live Performance'],
      link: 'https://youtube.com/@ltdlowcash?si=WTPwh27LfNIW1Q_K' // LTD Lowcash - společný kanál s aktuálními DJ sety
    },
    {
      icon: Headphones,
      title: 'Digital Nomad Life',
      description: 'Embracing location independence and exploring the world while building software. Remote work enables experiencing different cultures and perspectives.',
      tags: ['Remote Work', 'Travel', 'Cultural Exploration'],
      link: undefined
    },
    {
      icon: Play,
      title: 'Audiobooks & Hiking',
      description: 'Combining long hikes with audiobooks - learning while moving. Nature provides clarity, books provide knowledge, together they create space for thinking.',
      tags: ['Continuous Learning', 'Nature', 'Deep Thinking'],
      link: undefined
    },
    {
      icon: Activity,
      title: 'Biohacking & Optimization',
      description: 'Exploring how to optimize physical and mental performance through data-driven experimentation. From sleep tracking to nutrition, I approach health like debugging code.',
      tags: ['Sleep Optimization', 'Nutrition', 'Performance Tracking'],
      link: undefined
    }
  ];

  return (
    <SectionWrapper id="beyond-code">
      <SectionHeader
        title="Beyond Code"
        subtitle="Life is more than just programming - here's what else drives me"
        {...SECTION_STYLES.beyondCode}
      />

      <div ref={cardsRef} className="grid md:grid-cols-2 gap-3">
        {interests.map((interest, index) => (
          <div 
            key={index}
            className="rounded-2xl p-8 transition-all duration-500 h-full flex flex-col"
            style={getItemStyle(index) as React.CSSProperties}
          >
            <div className="flex items-start gap-4 mb-4">
              <interest.icon className="w-10 h-10 text-green-400 flex-shrink-0" />
              <div className="flex-grow">
                <h3 className="text-xl mb-1 text-white">{interest.title}</h3>
              </div>
            </div>
            <p className="text-gray-400 mb-6">{interest.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {interest.tags.map((tag, tagIndex) => (
                <TechTag key={tagIndex}>{tag}</TechTag>
              ))}
            </div>
            {interest.link && (
              <a
                href={interest.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm group"
              >
                <span>Check out my mixes</span>
                <svg 
                  className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}