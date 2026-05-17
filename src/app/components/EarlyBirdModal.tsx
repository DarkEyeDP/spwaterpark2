import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const DARK_WOOD = '#1a0e04';
const PARCHMENT = '#f0ddb4';
const SESSION_KEY = 'earlybird_dismissed';

export function EarlyBirdModal() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(false);
      setClosing(false);
    }, 220);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: 'rgba(10,5,2,0.75)',
        backdropFilter: 'blur(2px)',
        transition: 'opacity 220ms ease',
        opacity: closing ? 0 : 1,
      }}
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-md"
        style={{
          background: PARCHMENT,
          border: '2px solid rgba(212,175,55,0.55)',
          borderRadius: '3px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(120,72,20,0.08)',
          transition: 'opacity 220ms ease, transform 220ms ease',
          opacity: closing ? 0 : 1,
          transform: closing ? 'scale(0.94) translateY(8px)' : 'scale(1) translateY(0)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gold rope top */}
        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4af37 20%, #d4af37 80%, transparent)' }} />

        <div className="px-7 pt-6 pb-7">
          {/* Close */}
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 p-1 transition-opacity hover:opacity-60"
            aria-label="Close"
            style={{ color: '#8a6a4a' }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span
              className="inline-block px-4 py-1 text-xs font-heading tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, #c1860a, #d4af37)',
                color: DARK_WOOD,
                borderRadius: '1px',
                letterSpacing: '0.15em',
              }}
            >
              Limited Time Offer
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-center text-3xl mb-1"
            style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
          >
            Early Bird Sales
          </h2>
          <p
            className="text-center text-sm mb-5"
            style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)', letterSpacing: '0.03em' }}
          >
            One weekend only — Saturday &amp; Sunday, 10 AM – 4 PM
          </p>

          {/* Divider */}
          <div className="w-full h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(120,72,20,0.25), transparent)' }} />

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: 'Adult Season Pass', price: '$100', regular: '$125', savings: 'Save $25' },
              { label: 'Kids Season Pass',  price: '$70',  regular: '$85',  savings: 'Save $15' },
            ].map(({ label, price, regular, savings }) => (
              <div
                key={label}
                className="text-center py-4 px-3"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(120,72,20,0.2)',
                  borderRadius: '2px',
                }}
              >
                <div
                  className="text-3xl mb-0.5"
                  style={{ color: '#c1860a', fontFamily: 'var(--font-heading)', fontWeight: 700 }}
                >
                  {price}
                </div>
                <div
                  className="text-xs line-through mb-1"
                  style={{ color: '#a08060', fontFamily: 'var(--font-heading)' }}
                >
                  reg. {regular}
                </div>
                <div
                  className="inline-block px-2 py-0.5 text-xs font-heading tracking-wide mb-2"
                  style={{
                    background: 'rgba(193,134,10,0.15)',
                    color: '#7a4a00',
                    border: '1px solid rgba(193,134,10,0.3)',
                    borderRadius: '1px',
                  }}
                >
                  {savings}
                </div>
                <div
                  className="text-xs uppercase tracking-wide"
                  style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <p
            className="text-center text-xs mb-6"
            style={{ color: '#8a6a4a', fontFamily: 'var(--font-heading)', lineHeight: '1.7' }}
          >
            Lock in your season pass at early bird pricing the weekend before opening day, May 23-24th. Offer available in person only during sale hours.
          </p>

          {/* CTA */}
          <button
            onClick={dismiss}
            className="w-full py-3 text-sm font-heading tracking-wide transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, #c1860a, #d4af37)`,
              color: DARK_WOOD,
              border: '1px solid rgba(212,175,55,0.5)',
              borderRadius: '2px',
            }}
          >
            Got It, Captain!
          </button>
        </div>

        {/* Gold rope bottom */}
        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4af37 20%, #d4af37 80%, transparent)' }} />
      </div>
    </div>
  );
}
