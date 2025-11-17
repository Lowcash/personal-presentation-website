/**
 * OG Image Generator - React component for social media preview
 * Size: 1200x630px (Facebook/LinkedIn/Twitter recommended)
 * 
 * To generate static image:
 * 1. Open /og-image in browser
 * 2. Take screenshot (1200x630px)
 * 3. Save as /public/og-image.png
 */

export function OGImage() {
  return (
    <div 
      className="relative overflow-hidden"
      style={{
        width: '1200px',
        height: '630px',
        background: 'linear-gradient(135deg, #030712 0%, #1a1a2e 50%, #0f0f23 100%)'
      }}
    >
      {/* Gradient orb background - similar to main site */}
      <div 
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-20 text-center">
        {/* Main heading */}
        <h1 
          className="mb-6"
          style={{
            fontSize: '80px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.5))',
            lineHeight: '1.2'
          }}
        >
          Lukáš Machala
        </h1>

        {/* Subtitle */}
        <p 
          className="mb-8"
          style={{
            fontSize: '36px',
            color: '#e5e7eb',
            fontWeight: '500'
          }}
        >
          Fullstack Developer & Software Architect
        </p>

        {/* Tech stack badges */}
        <div className="flex gap-4 flex-wrap justify-center mb-8">
          {['TypeScript', 'React', 'Next.js', 'tRPC', 'Prisma', 'PostgreSQL'].map((tech) => (
            <div
              key={tech}
              style={{
                padding: '8px 20px',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '2px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '12px',
                fontSize: '20px',
                color: '#d8b4fe',
                fontWeight: '500'
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div 
          style={{
            fontSize: '28px',
            color: '#9ca3af',
            fontFamily: 'monospace'
          }}
        >
          lowcash.dev
        </div>
      </div>

      {/* Corner accent - top right */}
      <div 
        className="absolute"
        style={{
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Corner accent - bottom left */}
      <div 
        className="absolute"
        style={{
          bottom: '-100px',
          left: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
    </div>
  );
}
