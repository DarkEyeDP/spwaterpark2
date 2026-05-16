import { Link } from 'react-router';
import { Compass } from '../components/Compass';

export function NotFound() {
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a0e04 0%, #2a1810 50%, #0c2340 100%)',
      }}
    >
      {/* Subtle grid lines like a treasure map */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6">
        {/* 404 label */}
        <div
          className="text-xs font-heading tracking-widest uppercase px-4 py-1.5"
          style={{
            color: '#1a0e04',
            background: 'linear-gradient(135deg, #c1860a, #d4af37)',
            borderRadius: '1px',
          }}
        >
          Error 404
        </div>

        {/* Compass */}
        <Compass size={220} />

        {/* Heading */}
        <div>
          <h1
            className="text-5xl md:text-7xl mb-3 leading-none"
            style={{
              color: '#f0ddb4',
              textShadow: '1px 2px 0 #d4af37, 2px 4px 0 rgba(180,130,10,0.4)',
            }}
          >
            Ye Be Lost
          </h1>
          <p
            className="text-base md:text-lg max-w-md mx-auto"
            style={{
              color: 'rgba(240,221,180,0.7)',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.05em',
            }}
          >
            These waters aren't on any map, matey. Let the compass guide ye back to safe harbour.
          </p>
        </div>

        {/* CTA */}
        <Link
          to="/"
          className="px-8 py-3 text-sm font-heading tracking-wide transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #c1860a 0%, #d4af37 50%, #b8770a 100%)',
            color: '#1a0e04',
            border: '1px solid rgba(212,175,55,0.6)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            borderRadius: '2px',
          }}
        >
          Return to Home Port
        </Link>
      </div>
    </div>
  );
}
