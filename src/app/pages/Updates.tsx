import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Facebook, Instagram } from 'lucide-react';
import { ENTRIES } from '../data/captainsLog';
import { LogPage, CoverPage, MascotPage, BackCoverPage } from '../components/LogBook';

const DARK_WOOD = '#1a0e04';
const PARCHMENT = '#f0ddb4';
const DESK_IMAGE_SET = `url('/pirate-desk-top-optimized.jpg')`;

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
    transformStyle: 'preserve-3d',
    // 'clip' visually clips like 'hidden' but does NOT create a scroll container,
    // so descendant overflow-y:auto elements can still scroll inside the 3D context.
    overflow: 'clip',
  };

  const frontFaceStyle: React.CSSProperties = {
    ...faceStyle,
    transform: 'rotateY(0deg) translateZ(0.1px)',
  };

  const backFaceStyle: React.CSSProperties = {
    ...faceStyle,
    transform: 'rotateY(180deg) translateZ(0.1px)',
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
        style={{
          backgroundColor: DARK_WOOD,
          backgroundImage: `linear-gradient(rgba(18,10,2,0.2), rgba(18,10,2,0.32)), ${DESK_IMAGE_SET}`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
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
        <div style={{ width: '100%', maxWidth: '980px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div
            id="logbook"
            style={{
              width: '100%',
              maxWidth: '900px',
              padding: '6px 8px 0',
              transform: 'rotate(-1.4deg)',
              transformOrigin: 'center center',
            }}
          >
            {/* Perspective stage — no overflow:hidden so 3D sweeps aren't clipped */}
            <div style={{ position: 'relative', width: '100%', height: 'clamp(360px, 52vw, 540px)', perspective: 'clamp(500px, 180vw, 2200px)', filter: 'drop-shadow(0 24px 22px rgba(0,0,0,0.34)) drop-shadow(0 10px 10px rgba(0,0,0,0.22))' }}>

              {/* Open book: dark cover material visible around page edges */}
              {spread > 0 && (spread < maxSpread || animatingPage === N - 1) && (
                <div style={{ position: 'absolute', inset: -10, background: 'linear-gradient(135deg, #3a1c08, #2e1806 55%, #251505)', borderRadius: 5, zIndex: 0, pointerEvents: 'none', opacity: animatingPage === 0 || animatingPage === N - 1 ? 0 : 1, transition: 'opacity 0.5s ease' }} />
              )}

              {/* Closed book: subtle page thickness on right edge */}
              {spread === 0 && (
                <div style={{ position: 'absolute', top: '3%', bottom: '3%', left: '75%', width: 5, borderRadius: '0 2px 2px 0', background: 'linear-gradient(90deg, #c8b47a, #e0cc9a)', boxShadow: '3px 0 7px rgba(0,0,0,0.45)', pointerEvents: 'none', zIndex: 10 }} />
              )}

              {Array.from({ length: N }, (_, i) => (
                <div
                  key={i}
                  style={{ ...pageStyle(i), cursor: 'pointer' }}
                  onClick={() => i < spread ? goTo(spread - 1) : goTo(spread + 1)}
                >
                  <div style={frontFaceStyle}>{frontFace(i)}</div>
                  <div style={backFaceStyle}>{backFace(i)}</div>
                </div>
              ))}

              {/* Spine shadow between open pages */}
              {spread > 0 && spread < maxSpread && (
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 'calc(50% - 14px)', width: 28, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.28) 55%, transparent)', pointerEvents: 'none', zIndex: 300, opacity: animatingPage === 0 || animatingPage === N - 1 ? 0 : 1, transition: 'opacity 0.5s ease' }} />
              )}
            </div>
          </div>

          <div
            style={{
              width: '100%',
              maxWidth: '760px',
              padding: '14px 18px 16px',
              background: 'linear-gradient(180deg, rgba(42,24,8,0.94), rgba(28,16,6,0.92))',
              border: '2px solid rgba(212,175,55,0.28)',
              borderRadius: 10,
              boxShadow: '0 20px 40px rgba(0,0,0,0.42), inset 0 1px 0 rgba(212,175,55,0.22)',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', inset: 8, border: '1px solid rgba(212,175,55,0.16)', borderRadius: 6, pointerEvents: 'none' }} />

            <div className="flex items-center justify-between gap-4 relative">
              <button
                onClick={() => goTo(spread - 1)}
                disabled={spread === 0}
                className="flex items-center gap-1.5 transition-all disabled:opacity-30"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#d4af37', padding: '7px 12px', border: '1px solid rgba(212,175,55,0.34)', borderRadius: 3, background: 'rgba(212,175,55,0.08)', cursor: spread === 0 ? 'default' : 'pointer', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>

              <div className="flex gap-1.5 flex-wrap justify-center">
                {Array.from({ length: maxSpread + 1 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{ width: 10, height: 10, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.22)', cursor: 'pointer', background: i === spread ? '#d4af37' : 'rgba(212,175,55,0.22)', transition: 'all 0.2s', boxShadow: i === spread ? '0 0 10px rgba(212,175,55,0.45)' : 'none' }}
                    aria-label={`Go to page ${i}`}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(spread + 1)}
                disabled={spread === maxSpread}
                className="flex items-center gap-1.5 transition-all disabled:opacity-30"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#d4af37', padding: '7px 12px', border: '1px solid rgba(212,175,55,0.34)', borderRadius: 3, background: 'rgba(212,175,55,0.08)', cursor: spread === maxSpread ? 'default' : 'pointer', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-center mt-4 relative" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(212,175,55,0.55)' }}>
              {spread === 0 ? 'Click Next to open the log' : 'Use buttons to turn the page'}
            </p>
          </div>
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
