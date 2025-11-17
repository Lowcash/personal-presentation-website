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
      tags: ['Electronic Music', 'DJing', 'Live Performance']
    },
    {
      icon: Headphones,
      title: 'Digital Nomad Life',
      description: 'Embracing location independence and exploring the world while building software. Remote work enables experiencing different cultures and perspectives.',
      tags: ['Remote Work', 'Travel', 'Cultural Exploration']
    },
    {
      icon: Play,
      title: 'Audiobooks & Hiking',
      description: 'Combining long hikes with audiobooks - learning while moving. Nature provides clarity, books provide knowledge, together they create space for thinking.',
      tags: ['Continuous Learning', 'Nature', 'Deep Thinking']
    },
    {
      icon: Activity,
      title: 'Biohacking & Optimization',
      description: 'Exploring how to optimize physical and mental performance through data-driven experimentation. From sleep tracking to nutrition, I approach health like debugging code.',
      tags: ['Sleep Optimization', 'Nutrition', 'Performance Tracking']
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
            <div className="flex flex-wrap gap-2">
              {interest.tags.map((tag, tagIndex) => (
                <TechTag key={tagIndex}>{tag}</TechTag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}