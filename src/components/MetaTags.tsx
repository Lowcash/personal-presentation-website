import { useEffect } from 'react';

// Meta tags for SEO - sets document metadata
export function MetaTags() {
  useEffect(() => {
    // Helper function to set or update meta tags
    const setMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attribute === 'property' ? 'content' : attribute, value);
      } else {
        const meta = document.createElement('meta');
        if (attribute === 'property') {
          meta.setAttribute('property', selector.match(/\[property="(.+)"\]/)?.[1] || '');
          meta.setAttribute('content', value);
        } else {
          meta.setAttribute(attribute, value);
        }
        document.head.appendChild(meta);
      }
    };

    // Basic meta tags
    document.title = "Lukáš Machala (lowcash) • Fullstack Developer & AI Architect";
    
    const description = 'Fullstack developer specializing in TypeScript, React, Next.js, and AI-assisted development. Building modern web applications with agentic workflows.';
    
    setMetaTag('meta[name="description"]', 'content', description);
    setMetaTag('meta[name="author"]', 'content', 'Lukáš Machala');

    // Open Graph tags for social sharing
    const ogImageUrl = `${window.location.origin}/og-image.png`;
    
    const ogTags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://lowcash.dev/' },
      { property: 'og:title', content: 'Lukáš Machala (lowcash) • Fullstack Developer & AI Architect' },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImageUrl },
    ];

    ogTags.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = 'https://lowcash.dev/';
    } else {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = 'https://lowcash.dev/';
      document.head.appendChild(canonical);
    }

    // JSON-LD structured data for rich search results
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Lukáš Machala",
      "alternateName": "lowcash",
      "url": "https://lowcash.dev",
      "jobTitle": "Fullstack Developer & AI Architect",
      "description": description,
      "knowsAbout": [
        "TypeScript",
        "React",
        "Next.js",
        "tRPC",
        "Prisma",
        "PostgreSQL",
        "AI Development",
        "Software Architecture",
        "Augmented Reality",
        "VR Development",
        "Shader Programming"
      ]
    };

    // Remove existing structured data if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return null;
}
