import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Facebook, Instagram } from 'lucide-react';
import { ENTRIES } from '../data/captainsLog';
import { LogPage, CoverPage, MascotPage, BackCoverPage } from '../components/LogBook';

const DARK_WOOD = '#1a0e04';
const PARCHMENT = '#f0ddb4';

export function Updates() {
  // One page container per entry plus one for the cover (index 0).
  // States:  0 = cover closed, 1..N-1 = spreads, N = back cover visible.
  const N = ENTRIES.length + 1;
  const maxSpread = N;
  const [spread, setSpread] = useState(0);
  const [animatingPage, setAnimatingPage] = useState<number | null>(null);
  const animating = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  function goTo(s: number) {
    if (animating.current || s < 0 || s > maxSpread) return;
    animating.current = true;
    // The page physically rotating: going forward it is the page at s-1 (just flipped),
    // going backward it is the page at s (just returned to its front face).
    setAnimatingPage(s > spread ? s - 1 : s);
    setSpread(s);
    setTimeout(() => {
      animating.current = false;
      setAnimatingPage(null);
    }, 540);
  }

  const translate = spread === 0 ? '50%' : spread === maxSpread ? '150%' : '100%';

  function pageStyle(i: number): React.CSSProperties {
    const flipped = i < spread;
    let zIndex: number;
    if (i === animatingPage) {
      zIndex = 200; // stay on top while sweeping so content doesn't jump in
    } else {
      zIndex = flipped ? i + 1 : 2 * N - i;
    }
    return {
      position: 'absolute',
      height: '100%',
      width: '50%',
      transition: '0.5s transform ease-in-out',
      transformStyle: 'preserve-3d',
      transformOrigin: 'left',
      transform: `translate(${translate}) rotateY(${flipped ? '-180deg' : '0deg'})`,
      zIndex,
    };
  }

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden' as React.CSSProperties['backfaceVisibility'],
    // 'clip' visually clips like 'hidden' but does NOT create a scroll container,
    // so descendant overflow-y:auto elements can still scroll inside the 3D context.
    overflow: 'clip',
  };

  function frontFace(i: number) {
    if (i === 0) return <CoverPage />;
    const ei = i - 1;
    if (ei < ENTRIES.length) return <LogPage entry={ENTRIES[ei]} pageNum={ei + 1} total={ENTRIES.length} />;
    return <BackCoverPage />;
  }

  function backFace(i: number) {
    return i === N - 1 ? <BackCoverPage /> : <MascotPage />;
  }

  return (
    <div style={{ background: DARK_WOOD, minHeight: '100vh' }}>
      {/* Page header */}
      <div className="text-center py-10 px-4" style={{ background: `linear-gradient(180deg, #120a02 0%, ${DARK_WOOD} 100%)`, borderBottom: `2px solid #6b4a1e` }}>
        <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, #d4af37 30%, #d4af37 70%, transparent)' }} />
        <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: 'var(--font-display)', color: PARCHMENT, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
          Captain's Log
        </h1>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '0.08em', color: 'rgba(240,221,180,0.6)' }}>
          Official records of the Salty Pirate Water Park — Emerald Isle, NC
        </p>
        <div className="w-full h-px mt-6" style={{ background: 'linear-gradient(90deg, transparent, #d4af37 30%, #d4af37 70%, transparent)' }} />
      </div>

      {/* Book */}
      <div
        className="flex flex-col items-center pt-6 pb-16 px-2"
        style={{ background: DARK_WOOD }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
          touchStartY.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          const dy = e.changedTouches[0].clientY - touchStartY.current;
          // Only turn pages on clearly horizontal swipes so vertical scrolling isn't intercepted
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) goTo(spread + 1);
            else goTo(spread - 1);
          }
        }}
      >
        {/* Wood frame */}
        <div style={{ width: '100%', maxWidth: '900px', background: '#3a1e08', padding: '12px 14px 14px', boxShadow: '0 28px 70px rgba(0,0,0,0.75), inset 0 1px 0 rgba(212,175,55,0.2)', border: '2px solid #6b4a1e', borderRadius: '2px' }}>
          {/* Binding dots */}
          <div className="flex gap-2 mb-3 justify-center">
            {[...Array(11)].map((_, i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4af37', opacity: 0.45 }} />
            ))}
          </div>

          {/* Perspective stage — no overflow:hidden so 3D sweeps aren't clipped */}
          <div style={{ position: 'relative', width: '100%', height: 'clamp(360px, 52vw, 540px)', perspective: 'clamp(500px, 180vw, 2200px)' }}>
            {Array.from({ length: N }, (_, i) => (
              <div key={i} style={pageStyle(i)}>
                <div style={faceStyle}>{frontFace(i)}</div>
                <div style={{ ...faceStyle, transform: 'rotateY(180deg)' }}>{backFace(i)}</div>
              </div>
            ))}

            {/* Spine shadow between open pages */}
            {spread > 0 && spread < maxSpread && (
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 'calc(50% - 6px)', width: 12, background: 'linear-gradient(90deg, rgba(0,0,0,0.22), rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.22))', pointerEvents: 'none', zIndex: 50 }} />
            )}
          </div>

          {/* Navigation bar */}
          <div className="flex items-center justify-between mt-4 px-1">
            <button
              onClick={() => goTo(spread - 1)}
              disabled={spread === 0}
              className="flex items-center gap-1.5 transition-all disabled:opacity-30"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#d4af37', padding: '6px 10px', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '1px', background: 'rgba(212,175,55,0.06)', cursor: spread === 0 ? 'default' : 'pointer' }}
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <div className="flex gap-1.5 flex-wrap justify-center">
              {Array.from({ length: maxSpread + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', background: i === spread ? '#d4af37' : 'rgba(212,175,55,0.25)', transition: 'all 0.2s' }}
                  aria-label={`Go to page ${i}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(spread + 1)}
              disabled={spread === maxSpread}
              className="flex items-center gap-1.5 transition-all disabled:opacity-30"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#d4af37', padding: '6px 10px', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '1px', background: 'rgba(212,175,55,0.06)', cursor: spread === maxSpread ? 'default' : 'pointer' }}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-center mt-3" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'rgba(212,175,55,0.35)' }}>
            {spread === 0 ? 'Click Next to open the log' : 'Use buttons to turn the page'}
          </p>
        </div>
      </div>

      {/* Stay connected */}
      <div className="py-14 px-4 text-center" style={{ background: '#120a02', borderTop: '2px solid #6b4a1e' }}>
        <div className="w-full h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #d4af37 30%, #d4af37 70%, transparent)' }} />
        <h2 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', color: PARCHMENT }}>Stay Connected</h2>
        <p className="mb-8 max-w-lg mx-auto text-sm" style={{ fontFamily: 'var(--font-heading)', color: 'rgba(240,221,180,0.6)', letterSpacing: '0.04em' }}>
          Fast updates are shared on Facebook and Instagram. Follow along for real-time announcements and weather alerts.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {[
            { icon: Facebook, label: 'Follow on Facebook', href: 'https://facebook.com' },
            { icon: Instagram, label: 'Follow on Instagram', href: 'https://instagram.com' },
          ].map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 transition-all hover:scale-105" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.08em', color: PARCHMENT, border: '1px solid rgba(212,175,55,0.3)', borderRadius: '2px', background: 'rgba(212,175,55,0.08)' }}>
              <Icon className="w-4 h-4" /> {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
