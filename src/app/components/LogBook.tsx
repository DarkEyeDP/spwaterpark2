import { useEffect, useRef, useState } from 'react';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import GrainRoundedIcon from '@mui/icons-material/GrainRounded';
import ThunderstormRoundedIcon from '@mui/icons-material/ThunderstormRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import type { SvgIconComponent } from '@mui/icons-material';
import mascotImg from '@/assets/mascot.png';
import type { LogEntry, WeatherType } from '../data/captainsLog';

const PARCHMENT = '#f0ddb4';
const INK = '#1c1008';
const INK_FADED = 'rgba(28,16,8,0.55)';
const RED_INK = '#8b1a1a';
const LOG_SCRIPT_FONT = "'Moon Dance', cursive";
const LOG_LINE_HEIGHT = 26;
const LOG_GUTTER_WIDTH = 38;
const LOG_WRAP_BUFFER = 12;

const WEATHER_ORDER: WeatherType[] = ['sunny', 'partly-cloudy', 'cloudy', 'rainy', 'stormy'];
const WEATHER_ICONS: Record<WeatherType, { icon: SvgIconComponent; color: string; secondaryColor?: string }> = {
  sunny: { icon: WbSunnyRoundedIcon, color: '#b7791f' },
  'partly-cloudy': { icon: CloudRoundedIcon, color: '#8ea4b8', secondaryColor: '#d4a93a' },
  cloudy: { icon: CloudRoundedIcon, color: '#5f5a52' },
  rainy: { icon: GrainRoundedIcon, color: '#4a90b8' },
  stormy: { icon: ThunderstormRoundedIcon, color: '#5f4a3b' },
};

function splitLongWord(word: string, maxWidth: number, context: CanvasRenderingContext2D) {
  const segments: string[] = [];
  let current = '';

  for (const char of word) {
    const candidate = `${current}${char}`;
    if (current && context.measureText(candidate).width > maxWidth) {
      segments.push(current);
      current = char;
    } else {
      current = candidate;
    }
  }

  if (current) segments.push(current);
  return segments;
}

function wrapEntryText(text: string, maxWidth: number, context: CanvasRenderingContext2D) {
  const wrapped: string[] = [];

  for (const paragraph of text.split('\n')) {
    if (!paragraph.trim()) {
      wrapped.push('');
      continue;
    }

    let currentLine = '';
    for (const word of paragraph.trim().split(/\s+/)) {
      const candidate = currentLine ? `${currentLine} ${word}` : word;
      if (context.measureText(candidate).width <= maxWidth) {
        currentLine = candidate;
        continue;
      }

      if (currentLine) wrapped.push(currentLine);

      if (context.measureText(word).width <= maxWidth) {
        currentLine = word;
        continue;
      }

      const pieces = splitLongWord(word, maxWidth, context);
      wrapped.push(...pieces.slice(0, -1));
      currentLine = pieces.at(-1) ?? '';
    }

    wrapped.push(currentLine);
  }

  return wrapped.length ? wrapped : [''];
}

// ── Log entry sub-components ─────────────────────────────────────────────────

function WeatherConditions({ current }: { current: WeatherType }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-heading)', color: INK, letterSpacing: '0.15em', fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
        Weather Conditions
      </div>
      <div className="flex gap-1">
        {WEATHER_ORDER.map((w) => (
          <div key={w} style={{ width: 26, height: 26, border: `1px solid rgba(28,16,8,0.3)`, background: current === w ? 'rgba(139,26,26,0.08)' : 'transparent', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {(() => {
              const { icon: Icon, color, secondaryColor } = WEATHER_ICONS[w];
              return (
                <div style={{ position: 'relative', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {secondaryColor && (
                    <WbSunnyRoundedIcon
                      style={{
                        position: 'absolute',
                        left: -1,
                        top: -1,
                        fontSize: 11,
                        color: secondaryColor,
                        opacity: 0.95,
                      }}
                    />
                  )}
                  <Icon style={{ fontSize: w === 'stormy' ? 16 : 18, color, position: 'relative' }} />
                </div>
              );
            })()}
            {current === w && (
              <div style={{ position: 'absolute', inset: 1, border: `2px solid ${RED_INK}`, borderRadius: '50%', pointerEvents: 'none' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SeaStrength({ value }: { value: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-heading)', color: INK, letterSpacing: '0.15em', fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
        Sea Strength
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} style={{ width: 26, height: 26, border: `1px solid rgba(28,16,8,0.3)`, fontFamily: 'var(--font-heading)', fontSize: '0.68rem', color: n === value ? RED_INK : INK_FADED, fontWeight: n === value ? 700 : 400, background: n === value ? 'rgba(139,26,26,0.08)' : 'transparent', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {n}
            {n === value && (
              <div style={{ position: 'absolute', inset: 1, border: `2px solid ${RED_INK}`, borderRadius: '50%', pointerEvents: 'none' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page face components ─────────────────────────────────────────────────────

export function LogPage({ entry, pageNum, total }: { entry: LogEntry; pageNum: number; total: number }) {
  const pageScrollRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const logEntryRef = useRef<HTMLDivElement>(null);
  const [wrappedLines, setWrappedLines] = useState(() => entry.entry.split('\n'));

  function scrollPageBy(delta: number) {
    const page = pageScrollRef.current;
    if (!page) return;
    page.scrollTop += delta;
  }

  useEffect(() => {
    const page = pageScrollRef.current;
    if (!page) return;

    const handleWheel = (event: WheelEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || !page.contains(target)) return;

      event.preventDefault();
      event.stopPropagation();
      scrollPageBy(event.deltaY);
    };

    const handleTouchStart = (event: TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || !page.contains(target)) return;

      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || !page.contains(target)) return;

      const currentY = event.touches[0]?.clientY;
      if (currentY == null || touchStartY.current == null) return;
      event.preventDefault();
      event.stopPropagation();
      scrollPageBy(touchStartY.current - currentY);
      touchStartY.current = currentY;
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', handleTouchEnd, { capture: true });
    window.addEventListener('touchcancel', handleTouchEnd, { capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('touchend', handleTouchEnd, { capture: true });
      window.removeEventListener('touchcancel', handleTouchEnd, { capture: true });
    };
  }, []);

  useEffect(() => {
    const logEntry = logEntryRef.current;
    if (!logEntry) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    let frameId = 0;

    const recomputeWrappedLines = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const styles = window.getComputedStyle(logEntry);
        const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
        const paddingRight = Number.parseFloat(styles.paddingRight) || 0;
        const usableWidth = logEntry.clientWidth - paddingLeft - paddingRight - LOG_WRAP_BUFFER;
        if (usableWidth <= 0) return;

        context.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;

        setWrappedLines(wrapEntryText(entry.entry, usableWidth, context));
      });
    };

    recomputeWrappedLines();

    const resizeObserver = new ResizeObserver(recomputeWrappedLines);
    resizeObserver.observe(logEntry);
    void document.fonts?.ready.then(recomputeWrappedLines);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [entry.entry]);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
    <div
      ref={pageScrollRef}
      className="log-page-scroll"
      style={{ height: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', padding: '10px 12px 8px 12px', background: PARCHMENT, backgroundImage: `radial-gradient(ellipse at 15% 85%, rgba(120,72,20,0.18) 0%, transparent 50%), radial-gradient(ellipse at 85% 15%, rgba(150,100,40,0.14) 0%, transparent 50%)`, borderRadius: '0 4px 4px 0', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}
    >
      {/* Title */}
      <div style={{ textAlign: 'center', paddingBottom: 4, marginBottom: 5, borderBottom: `2px solid rgba(28,16,8,0.28)`, fontFamily: 'var(--font-heading)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', color: INK, textTransform: 'uppercase', flexShrink: 0 }}>
        Captain's Log Book
      </div>

      {/* Vessel / Captain / Season / Date */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: `1px solid rgba(28,16,8,0.28)`, marginBottom: 4, flexShrink: 0 }}>
        {[
          { label: 'Vessel', value: entry.vessel },
          { label: 'Captain', value: entry.captain },
          { label: 'Season', value: entry.season },
          { label: 'Date', value: entry.date },
        ].map((f, i) => (
          <div key={i} style={{ padding: '3px 6px', borderRight: i % 2 === 0 ? `1px solid rgba(28,16,8,0.28)` : 'none', borderBottom: i < 2 ? `1px solid rgba(28,16,8,0.28)` : 'none' }}>
            <div style={{ fontSize: '0.42rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', fontWeight: 700, color: INK_FADED }}>{f.label}:</div>
            <div style={{ fontFamily: LOG_SCRIPT_FONT, fontSize: '0.82rem', color: INK, lineHeight: 1.25 }}>{f.value}</div>
          </div>
        ))}
      </div>

      {/* Weather + Sea Strength */}
      <div className="log-weather-strength" style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 4, padding: '4px 6px', border: `1px solid rgba(28,16,8,0.28)`, flexShrink: 0 }}>
        <div className="log-weather-strength-section">
          <WeatherConditions current={entry.weather} />
        </div>
        <div className="log-weather-strength-divider" style={{ width: 1, alignSelf: 'stretch', background: 'rgba(28,16,8,0.2)', margin: '0 2px' }} />
        <div className="log-weather-strength-section">
          <SeaStrength value={entry.seaStrength} />
        </div>
      </div>

      {/* Wind / Temperature / Forecast */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: `1px solid rgba(28,16,8,0.28)`, marginBottom: 4, flexShrink: 0 }}>
        {[
          { label: 'Wind', value: `${entry.windDirection} ${entry.windSpeed}` },
          { label: 'Temperature', value: `${entry.temperature}°F` },
          { label: 'Forecast', value: entry.forecast },
        ].map((f, i) => (
          <div key={i} style={{ padding: '2px 6px', gridColumn: i === 2 ? 'span 2' : undefined, borderRight: i === 0 ? `1px solid rgba(28,16,8,0.28)` : 'none', borderBottom: i < 2 ? `1px solid rgba(28,16,8,0.28)` : 'none' }}>
            <div style={{ fontSize: '0.42rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', fontWeight: 700, color: INK_FADED }}>{f.label}:</div>
            <div style={{ fontFamily: LOG_SCRIPT_FONT, fontSize: '0.8rem', color: INK, lineHeight: 1.25 }}>{f.value}</div>
          </div>
        ))}
      </div>

      {/* Log entry text — flex:1 fills whatever is left */}
      <div style={{ border: `1px solid rgba(28,16,8,0.28)`, marginBottom: 5, minHeight: 220, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '2px 7px', borderBottom: `1px solid rgba(28,16,8,0.28)`, fontFamily: 'var(--font-heading)', fontSize: '0.42rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: INK, flexShrink: 0 }}>
          Log Entry — {entry.category}
        </div>
        <div
          ref={logEntryRef}
          className="log-ruled"
          style={{ padding: '2px 8px 4px 28px', fontFamily: LOG_SCRIPT_FONT, fontSize: '0.88rem', color: INK, lineHeight: `${LOG_LINE_HEIGHT}px`, position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 22, width: 1, background: 'rgba(139,26,26,0.35)', pointerEvents: 'none' }} />
          {wrappedLines.map((line, i) => (
            <div key={`${i}-${line}`} style={{ minHeight: `${LOG_LINE_HEIGHT}px`, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  position: 'absolute',
                  right: '100%',
                  top: 0,
                  width: `${LOG_GUTTER_WIDTH}px`,
                  marginRight: 6,
                  paddingRight: 1.5,
                  boxSizing: 'border-box',
                  fontFamily: LOG_SCRIPT_FONT,
                  fontSize: '0.62rem',
                  lineHeight: `${LOG_LINE_HEIGHT}px`,
                  color: 'rgba(28,16,8,0.22)',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                {i + 1}/{wrappedLines.length}
              </div>
              <span style={{ display: 'block', whiteSpace: 'nowrap', lineHeight: 1.05 }}>{line || ' '}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderTop: `1px solid rgba(28,16,8,0.22)`, paddingTop: 4, flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: '0.42rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', fontWeight: 700, color: INK_FADED }}>Logged By:</div>
          <div style={{ fontFamily: LOG_SCRIPT_FONT, fontSize: '0.82rem', color: INK }}>{entry.loggedBy}</div>
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.48rem', letterSpacing: '0.1em', color: INK_FADED, textAlign: 'right' }}>
          Entry {pageNum} of {total}
        </div>
      </div>
    </div>
    </div>
  );
}

const COVER_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.11'/%3E%3C/svg%3E")`;

export function CoverPage() {
  return (
    <div style={{
      height: '100%',
      background: '#2a1505',
      backgroundImage: [
        // Edge vignette — darker border suggesting worn leather
        `radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(0,0,0,0.55) 100%)`,
        // Corner scuffs — slightly exposed lighter wear
        `radial-gradient(circle at 2% 3%,   rgba(140,80,25,0.4) 0%, transparent 18%)`,
        `radial-gradient(circle at 98% 3%,  rgba(140,80,25,0.3) 0%, transparent 14%)`,
        `radial-gradient(circle at 2% 97%,  rgba(140,80,25,0.35) 0%, transparent 16%)`,
        `radial-gradient(circle at 98% 97%, rgba(140,80,25,0.4) 0%, transparent 18%)`,
        // Original atmosphere gradients
        `radial-gradient(ellipse at 30% 70%, rgba(80,40,5,0.6) 0%, transparent 60%)`,
        `radial-gradient(ellipse at 70% 30%, rgba(60,30,5,0.4) 0%, transparent 55%)`,
        // Grain texture
        COVER_GRAIN,
      ].join(', '),
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '20px', borderRadius: 5, position: 'relative',
    }}>
      {/* Worn binding shadow on spine side */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '12%', background: 'linear-gradient(90deg, rgba(0,0,0,0.45), transparent)', borderRadius: '5px 0 0 5px', pointerEvents: 'none' }} />
      <div style={{ border: '1px solid rgba(212,175,55,0.28)', padding: '18px 14px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 6, position: 'relative' }}>
        <div style={{ width: 40, height: 1, background: 'rgba(212,175,55,0.5)', marginBottom: 4 }} />
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)', color: '#d4af37', letterSpacing: '0.12em', textShadow: '0 2px 8px rgba(0,0,0,0.6)', lineHeight: 1.2 }}>
          Captain's
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3.8vw, 2.4rem)', color: '#d4af37', letterSpacing: '0.06em', textShadow: '0 2px 8px rgba(0,0,0,0.6)', lineHeight: 1.1 }}>
          Log Book
        </div>
        <div style={{ width: 40, height: 1, background: 'rgba(212,175,55,0.5)', margin: '6px 0' }} />
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.45rem, 1vw, 0.6rem)', color: 'rgba(212,175,55,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: 1.8 }}>
          Salty Pirate Water Park<br />Emerald Isle, NC
        </div>
        <div style={{ width: 40, height: 1, background: 'rgba(212,175,55,0.5)', marginTop: 6 }} />
      </div>
    </div>
  );
}

export function MascotPage() {
  return (
    <div style={{ height: '100%', background: PARCHMENT, backgroundImage: `radial-gradient(ellipse at 20% 80%, rgba(120,72,20,0.22) 0%, transparent 55%), radial-gradient(ellipse at 75% 18%, rgba(150,100,40,0.16) 0%, transparent 50%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', borderRadius: '0 4px 4px 0', borderLeft: '3px solid rgba(28,16,8,0.12)' }}>
      <img
        src={mascotImg}
        alt="Salty Pirate"
        style={{ width: '70%', maxHeight: '65%', objectFit: 'contain', opacity: 0.82, filter: 'sepia(12%)' }}
      />
      <div style={{ marginTop: 12, fontFamily: 'var(--font-display)', fontSize: 'clamp(0.65rem, 1.8vw, 1rem)', color: INK, opacity: 0.5, letterSpacing: '0.06em' }}>
        Salty Pirate
      </div>
    </div>
  );
}

export function BackCoverPage() {
  return (
    <div style={{ height: '100%', background: '#2e1806', backgroundImage: `radial-gradient(ellipse at 70% 30%, rgba(80,40,5,0.5) 0%, transparent 55%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', borderRadius: 5 }}>
      <img src={mascotImg} alt="" aria-hidden style={{ width: '52%', objectFit: 'contain', opacity: 0.35, filter: 'sepia(30%) brightness(0.55)', marginBottom: 14 }} />
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.45rem, 1vw, 0.6rem)', color: 'rgba(212,175,55,0.45)', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.8 }}>
        saltypiratewater.com<br />Emerald Isle, NC
      </div>
    </div>
  );
}
