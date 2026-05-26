import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import logoImg from '@/assets/logo.png';
import xMarkerImg from '@/assets/x-marker.svg';
import { WeatherChip } from './WeatherChip';
import { useHeroWeather } from '../context/HeroWeatherContext';


export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const { heroVisible } = useHeroWeather();
  const showWeatherChip = location.pathname !== '/' || !heroVisible;

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
          <div className="flex items-center gap-2">
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

        <div
          className="lg:hidden grid"
          style={{ gridTemplateRows: mobileMenuOpen ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
          <nav
            className="py-4"
            style={{
              borderTop: '1px solid rgba(212,175,55,0.2)',
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
              transition: 'opacity 200ms ease-out, transform 200ms ease-out',
              willChange: 'opacity, transform',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
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
            ))}
          </nav>
          </div>
        </div>
      </div>

      {/* Gold rope accent line */}
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #d4af37 20%, #d4af37 80%, transparent)' }}
      />
    </header>
  );
}
