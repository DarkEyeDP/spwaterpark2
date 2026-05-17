interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

const DARK_WOOD = '#1a0e04';

export function PageHero({ title, subtitle, eyebrow }: PageHeroProps) {
  return (
    <div
      className="text-center py-10 px-4"
      style={{
        background: `linear-gradient(180deg, #120a02 0%, ${DARK_WOOD} 100%)`,
        borderBottom: '2px solid #6b4a1e',
      }}
    >
      <div
        className="w-full h-px mb-6"
        style={{ background: 'linear-gradient(90deg, transparent, #d4af37 30%, #d4af37 70%, transparent)' }}
      />
      {eyebrow && (
        <p
          className="uppercase tracking-widest text-xs mb-3"
          style={{ fontFamily: 'var(--font-heading)', color: '#d4af37', letterSpacing: '0.22em' }}
        >
          {eyebrow}
        </p>
      )}
      <h1
        className="text-4xl md:text-5xl mb-3"
        style={{ fontFamily: 'var(--font-display)', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.55))' }}
      >
        <span className="hero-title-shimmer">{title}</span>
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            letterSpacing: '0.06em',
            color: 'rgba(240,221,180,0.6)',
            maxWidth: '36rem',
            margin: '0 auto',
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        className="w-full h-px mt-6"
        style={{ background: 'linear-gradient(90deg, transparent, #d4af37 30%, #d4af37 70%, transparent)' }}
      />
    </div>
  );
}
