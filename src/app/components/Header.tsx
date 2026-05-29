import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import logoImg from '@/assets/logo.png';
import xMarkerImg from '@/assets/x-marker.svg';
import { WeatherChip } from './WeatherChip';

const PIRATE_QUOTES = [
  // Salty Pirate crew
  { quote: "The water is cold. The sun is warm. All is as it ought to be.", author: "Cap'n Barnacle McGee" },
  { quote: "Feet first. ALWAYS feet first. This is not negotiable.", author: "Deckhand Paul" },
  { quote: "The last echoes of delighted screaming still drift over the water like sea mist rolling in off Emerald Isle.", author: "Cap'n Barnacle McGee" },
  { quote: "Tucked behind the old ledger was a map annotated: 'DO NOT LET PAUL DIG HERE AGAIN.'", author: "Quartermaster Marlowe" },
  { quote: "The footprints stopped near the tipping bucket and vanished completely. The salt smelled not like pool water, but like the sound side on a cold day off Emerald Isle.", author: "Cap'n Barnacle McGee" },
  { quote: "If there be a hidden passage beneath the park, it likely points south along the coast toward old pirate routes and poor decisions.", author: "Deckhand Paul" },
  { quote: "SQUAWK. When lightning doth crack across the heavens, ALL PIRATES MUST EXIT THE WATER. SQUAWK.", author: "Lt. Squawks" },
  { quote: "A Season Pass pays fer itself in but SIX visits. The captain done the math twice. He's very proud of himself.", author: "First Mate Patchy" },
  { quote: "The captain suspects imagination, though he hath instructed the crew not to ignore any mysterious creaking — particularly if accompanied by the name of Blackbeard.", author: "Cap'n Barnacle McGee" },
  { quote: "Even a captain knows a good bargain never stays anchored for long.", author: "Cap'n Barnacle McGee" },
  // Famous lines
  { quote: "Why is the rum always gone?", author: "Jack Sparrow" },
  { quote: "Not all treasure is silver and gold, mate.", author: "Jack Sparrow" },
  { quote: "The problem is not the problem. The problem is your attitude about the problem.", author: "Jack Sparrow" },
  { quote: "I'm disinclined to acquiesce to your request.", author: "Barbossa" },
  { quote: "A merry life and a short one shall be my motto.", author: "Bartholomew Roberts" },
  { quote: "I am a free prince, and I have as much authority to make war on the whole world as he who has a hundred sail of ships at sea.", author: "Samuel Bellamy" },
  { quote: "Now and then we had a hope that if we lived and were good, God would permit us to be pirates.", author: "Mark Twain" },
  { quote: "Better to ask forgiveness than permission — especially at sea.", author: "Old Pirate Proverb" },
  // Jokes
  { quote: "Why can't pirates learn the alphabet? Because they spend years at C.", author: "Unknown Pirate" },
  { quote: "How much did the pirate pay for his hook and peg leg? An arm and a leg.", author: "Unknown Pirate" },
  { quote: "What did the ocean say to the pirate? Nothing. It just waved.", author: "Unknown Pirate" },
  { quote: "Why do pirates make terrible singers? Because they always hit the high Cs.", author: "Unknown Pirate" },
  { quote: "What's a pirate's least favorite letter? Dear Sir, your ship has been repossessed.", author: "Unknown Pirate" },
];

function PirateQuotePanel({ initialIndex }: { initialIndex: number }) {
  const [state, setState] = useState<'hint' | 'revealed'>('hint');
  const [quoteIdx, setQuoteIdx] = useState(initialIndex);
  const indexRef = useRef(initialIndex);
  const startX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reveal = useCallback(() => {
    indexRef.current = (indexRef.current + 1) % PIRATE_QUOTES.length;
    setQuoteIdx(indexRef.current);
    setState('revealed');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setState('hint'), 10000);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div
      className="relative flex flex-col justify-center w-full h-full select-none overflow-hidden"
      style={{ cursor: state === 'hint' ? 'ew-resize' : 'default' }}
      onPointerDown={(e) => { if (state === 'hint') startX.current = e.clientX; }}
      onPointerMove={(e) => {
        if (state !== 'hint') return;
        if (startX.current !== null && Math.abs(e.clientX - startX.current) > 18) {
          startX.current = null;
          reveal();
        }
      }}
      onPointerUp={() => { startX.current = null; }}
      onPointerLeave={() => { startX.current = null; }}
    >
      {/* Hint */}
      <AnimatePresence>
        {state === 'hint' && (
          <motion.div
            key="hint"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ fontSize: '1.1rem', opacity: 0.25 }}>⚓</span>
            <p
              className="text-xs leading-snug italic"
              style={{ color: 'rgba(240,221,180,0.28)', fontFamily: 'var(--font-body)' }}
            >
              wipe to reveal a hidden message
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed quote — wipes in left to right */}
      <AnimatePresence>
        {state === 'revealed' && (
          <motion.div
            key="quote"
            className="absolute inset-0 flex flex-col justify-center px-4 py-4 pointer-events-none"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <p
              className="text-xs leading-relaxed mb-3 italic"
              style={{ color: 'rgba(240,221,180,0.72)', fontFamily: 'var(--font-body)' }}
            >
              "{PIRATE_QUOTES[quoteIdx].quote}"
            </p>
            <p
              className="text-xs"
              style={{ color: '#d4af37', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}
            >
              — {PIRATE_QUOTES[quoteIdx].author}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const quoteIndexRef = useRef(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (mobileMenuOpen) {
      quoteIndexRef.current = (quoteIndexRef.current + 1) % PIRATE_QUOTES.length;
      setQuoteIndex(quoteIndexRef.current);
    }
  }, [mobileMenuOpen]);
  const location = useLocation();
  const showWeatherChip = true;

  const updatesNewUntil = new Date('2026-05-26T00:00:00');
  const showUpdatesBadge = new Date() < updatesNewUntil;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/plan-your-visit', label: 'Plan Your Visit' },
    { to: '/explore', label: 'Explore' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/nearby', label: 'Nearby Fun' },
    { to: '/updates', label: 'Updates', badge: showUpdatesBadge ? 1 : null },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="sticky top-0 z-50 shadow-lg"
      style={{
        background: 'linear-gradient(180deg, #1a0e04 0%, #2a1810 60%, #1c1008 100%)',
        borderBottom: '3px solid #6b4a1e',
        boxShadow: '0 4px 16px rgba(0,0,0,0.55), inset 0 -1px 0 rgba(212,175,55,0.3)',
      }}
    >
      {/* Gold rope accent line */}
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #d4af37 20%, #d4af37 80%, transparent)' }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo + Est. badge */}
          <div className="flex items-center gap-3">
            <div
              className="hidden lg:flex flex-col items-center leading-none select-none"
              style={{ opacity: 1 }}
            >
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.55rem', letterSpacing: '0.18em', color: '#d4af37', textTransform: 'uppercase' }}>Est.</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#d4af37', lineHeight: 1 }}>1977</span>
              <div className="w-8 h-px mt-0.5" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
            </div>
            <Link to="/" className="flex items-center group">
              <img
                src={logoImg}
                alt="Salty Pirate Water Park"
                className="h-14 w-auto drop-shadow-lg group-hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Est. 1977 — centered on mobile only */}
          <div
            className="lg:hidden absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none select-none pointer-events-none"
          >
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.55rem', letterSpacing: '0.18em', color: '#d4af37', textTransform: 'uppercase' }}>Est.</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: '#d4af37', lineHeight: 1 }}>1977</span>
            <div className="w-8 h-px mt-0.5" style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onMouseEnter={() => setHoveredLink(link.to)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-2 text-sm tracking-wide transition-colors font-heading ${
                  isActive(link.to)
                    ? 'text-gold-treasure border-b-2 border-gold-treasure'
                    : 'text-amber-100/85 hover:text-gold-treasure'
                }`}
              >
                {link.label}
                {'badge' in link && link.badge && (
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 text-white rounded-full"
                    style={{ fontSize: '0.6rem', background: '#ff1a1a', lineHeight: 1, fontFamily: 'system-ui, sans-serif', fontWeight: 700 }}
                  >
                    {link.badge}
                  </span>
                )}
                {hoveredLink === link.to && (
                  <span key={link.to} className="nav-x-marker">
                    <img src={xMarkerImg} alt="" aria-hidden="true" className="w-4 h-auto" />
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side — weather chip + CTA/hamburger */}
          <div className="flex items-start gap-2">
            {/* Weather chip — slides in when hero chip scrolls out */}
            <div
              className="transition-opacity duration-300"
              style={{
                opacity: showWeatherChip ? 1 : 0,
                visibility: showWeatherChip ? 'visible' : 'hidden',
                pointerEvents: showWeatherChip ? 'auto' : 'none',
              }}
            >
              <div className="flex flex-col items-center gap-0.5">
                <WeatherChip compact />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    color: '#f4d8a8',
                    whiteSpace: 'nowrap',
                  }}
                >
                  @Salty Pirate
                </span>
              </div>
            </div>

            <Link
              to="/plan-your-visit"
              className="hidden lg:block px-5 py-2 text-sm font-heading tracking-wide transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #c1860a 0%, #d4af37 50%, #b8770a 100%)',
                color: '#1a0e04',
                border: '1px solid rgba(212,175,55,0.6)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                borderRadius: '2px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, #d4991a 0%, #e8c44a 50%, #c98a1a 100%)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.45), 0 0 12px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, #c1860a 0%, #d4af37 50%, #b8770a 100%)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)';
              }}
            >
              Plan Your Visit
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-amber-100 hover:text-gold-treasure transition-colors rounded self-center"
              aria-label="Toggle menu"
            >
              <span className="relative block w-6 h-6">
                <Menu
                  className="absolute inset-0 w-6 h-6 transition-all duration-200"
                  style={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    transform: mobileMenuOpen ? 'rotate(90deg) scale(0.6)' : 'rotate(0deg) scale(1)',
                  }}
                />
                <X
                  className="absolute inset-0 w-6 h-6 transition-all duration-200"
                  style={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.6)',
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              className="lg:hidden overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="flex"
                style={{ borderTop: '1px solid rgba(212,175,55,0.2)' }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
                  hidden:  { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
              >
                {/* Nav links */}
                <nav className="py-2 flex-1">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.to}
                      variants={{
                        hidden:  { opacity: 0, x: -16 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: 'easeOut' } },
                      }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2 px-4 py-3 font-heading text-sm tracking-wide transition-colors ${
                          isActive(link.to)
                            ? 'text-gold-treasure'
                            : 'text-amber-100/85 hover:text-gold-treasure'
                        }`}
                      >
                        {link.label}
                        {'badge' in link && link.badge && (
                          <span
                            className="inline-flex items-center justify-center w-4 h-4 text-white rounded-full"
                            style={{ fontSize: '0.6rem', background: '#ff1a1a', lineHeight: 1, fontFamily: 'system-ui, sans-serif', fontWeight: 700 }}
                          >
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Pirate quote — swipe to reveal */}
                <motion.div
                  className="w-40 flex-shrink-0 self-stretch"
                  variants={{
                    hidden:  { opacity: 0 },
                    visible: { opacity: 1, transition: { delay: 0.38, duration: 0.4, ease: 'easeOut' } },
                  }}
                >
                  <PirateQuotePanel key={quoteIndex} initialIndex={quoteIndex} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gold rope accent line */}
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #d4af37 20%, #d4af37 80%, transparent)' }}
      />
    </header>
  );
}
