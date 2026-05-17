import { Link } from 'react-router';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import logoImg from '@/assets/logo.png';

const primaryLinks = [
  { to: '/', label: 'Home' },
  { to: '/plan-your-visit', label: 'Plan Your Visit' },
  { to: '/explore', label: 'Explore the Park' },
  { to: '/pricing', label: 'Pricing' },
];

const secondaryLinks = [
  { to: '/nearby', label: 'Nearby Fun' },
  { to: '/updates', label: 'Updates' },
  { to: '/contact', label: 'Contact' },
];

const legalLinks = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/site-map', label: 'Site Map' },
];

export function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #1a0e04 0%, #120a02 100%)',
        borderTop: '3px solid #6b4a1e',
      }}
    >
      {/* Gold rope accent */}
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #d4af37 20%, #d4af37 80%, transparent)' }}
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <img src={logoImg} alt="Salty Pirate Water Park" className="h-24 md:h-28 w-auto mb-5 opacity-90" />
            </div>
            <div className="space-y-3 max-w-sm mx-auto">
              <a
                href="https://maps.google.com/?q=8915+Reed+Dr,+Emerald+Isle,+NC+28594"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start justify-start gap-3 text-base transition-colors hover:text-amber-200"
                style={{ color: 'rgba(245,230,180,0.7)' }}
              >
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="footer-link text-left leading-snug" style={{ fontSize: 'clamp(1rem, 3.4vw, 1.15rem)' }}>
                  8915 Reed Dr<br />
                  Emerald Isle, NC 28594
                </span>
              </a>
              <a
                href="tel:+12523542609"
                className="flex items-center justify-start gap-3 text-base transition-colors hover:text-amber-200"
                style={{ color: 'rgba(245,230,180,0.7)' }}
              >
                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="footer-link whitespace-nowrap" style={{ fontSize: 'clamp(1rem, 3.4vw, 1.15rem)' }}>(252) 354-2609</span>
              </a>
              <a
                href="mailto:saltypiratewaterpark@gmail.com"
                className="flex items-center justify-start gap-3 text-base transition-colors hover:text-amber-200"
                style={{ color: 'rgba(245,230,180,0.7)' }}
              >
                <Mail className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="footer-link whitespace-nowrap" style={{ fontSize: 'clamp(0.8rem, 2.9vw, 1rem)' }}>saltypiratewaterpark@gmail.com</span>
              </a>
            </div>
          </div>

          <div>
            <h3
              className="font-heading text-sm tracking-widest uppercase mb-4"
              style={{ color: '#d4af37' }}
            >
              Park Pages
            </h3>
            <ul className="space-y-2 text-sm">
              {primaryLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="footer-link transition-colors hover:text-amber-200"
                    style={{ color: 'rgba(245,230,180,0.7)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-heading text-sm tracking-widest uppercase mb-4 text-center"
              style={{ color: '#d4af37', visibility: 'hidden' }}
              aria-hidden="true"
            >
              Park Pages
            </h3>
            <ul className="space-y-2 text-sm">
              {secondaryLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="footer-link transition-colors hover:text-amber-200"
                    style={{ color: 'rgba(245,230,180,0.7)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-heading text-sm tracking-widest uppercase mb-4"
              style={{ color: '#d4af37' }}
            >
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '2px',
                  color: 'rgba(245,230,180,0.8)',
                }}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '2px',
                  color: 'rgba(245,230,180,0.8)',
                }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="font-heading text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(212,175,55,0.75)' }}>
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                {legalLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="footer-link transition-colors hover:text-amber-200"
                      style={{ color: 'rgba(245,230,180,0.7)' }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3
              className="font-heading text-sm tracking-widest uppercase mb-4"
              style={{ color: '#d4af37' }}
            >
              Season Info
            </h3>
            <p className="text-sm" style={{ color: 'rgba(245,230,180,0.7)' }}>
              Open Memorial Day Weekend through Labor Day
            </p>
            <p className="text-xs mt-4" style={{ color: 'rgba(245,230,180,0.45)' }}>
              Hours and operations subject to weather and staffing.
            </p>
          </div>
        </div>

        <div
          className="mt-6 pt-5 text-center text-sm"
          style={{
            borderTop: '1px solid rgba(212,175,55,0.2)',
            color: 'rgba(245,230,180,0.45)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-display)', color: 'rgba(212,175,55,0.6)', fontSize: '1rem' }}>
            Set sail for summer fun. See you on the coast.
          </p>
          <p className="mt-4 text-xs max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,230,180,0.3)' }}>
            Salty Pirate Water Park is not responsible for personal injury, loss, or damage to property sustained while on the premises. Guests participate in all activities at their own risk. By entering the park, guests acknowledge and accept these terms.
          </p>
          <p className="mt-3 text-xs">
            <Link to="/site-map" className="footer-link hover:text-amber-200" style={{ color: 'rgba(212,175,55,0.7)' }}>
              Browse Site Map
            </Link>
            {' · '}
            <Link to="/privacy-policy" className="footer-link hover:text-amber-200" style={{ color: 'rgba(212,175,55,0.7)' }}>
              Privacy Policy
            </Link>
          </p>
          <p className="mt-3 text-xs">
            &copy; {new Date().getFullYear()} Salty Pirate Water Park. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom rope accent */}
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #d4af37 20%, #d4af37 80%, transparent)' }}
      />
    </footer>
  );
}
