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

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/plan-your-visit', label: 'Plan Your Visit' },
    { to: '/explore', label: 'Explore' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/nearby', label: 'Nearby Fun' },
    { to: '/updates', label: 'Updates' },
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
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="Salty Pirate Water Park"
              className="h-14 w-auto drop-shadow-lg group-hover:scale-105 transition-transform"
            />
          </Link>

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
              className="transition-all duration-300 overflow-hidden"
              style={{
                opacity: heroVisible ? 0 : 1,
                transform: heroVisible ? 'translateY(-6px)' : 'translateY(0)',
                maxWidth: heroVisible ? '0px' : '220px',
                pointerEvents: heroVisible ? 'none' : 'auto',
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
              className="hidden lg:block px-5 py-2 text-sm font-heading tracking-wide transition-all"
              style={{
                background: 'linear-gradient(135deg, #c1860a 0%, #d4af37 50%, #b8770a 100%)',
                color: '#1a0e04',
                border: '1px solid rgba(212,175,55,0.6)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                borderRadius: '2px',
              }}
            >
              Plan Your Visit
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-amber-100 hover:text-gold-treasure transition-colors rounded self-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            className="lg:hidden py-4"
            style={{ borderTop: '1px solid rgba(212,175,55,0.2)' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 font-heading text-sm tracking-wide transition-colors ${
                  isActive(link.to)
                    ? 'text-gold-treasure'
                    : 'text-amber-100/85 hover:text-gold-treasure'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Gold rope accent line */}
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #d4af37 20%, #d4af37 80%, transparent)' }}
      />
    </header>
  );
}
