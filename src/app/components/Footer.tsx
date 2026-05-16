import { Link } from 'react-router';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import logoImg from '@/assets/logo.png';

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <img src={logoImg} alt="Salty Pirate Water Park" className="h-12 md:h-16 w-auto mb-3 opacity-90" />
            <div className="space-y-2">
              <a
                href="https://maps.google.com/?q=8915+Reed+Dr,+Emerald+Isle,+NC+28594"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm transition-colors hover:text-amber-200"
                style={{ color: 'rgba(245,230,180,0.7)' }}
              >
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="footer-link">
                  8915 Reed Dr<br />
                  Emerald Isle, NC 28594
                </span>
              </a>
              <a
                href="tel:+12523542609"
                className="flex items-center gap-2 text-sm transition-colors hover:text-amber-200"
                style={{ color: 'rgba(245,230,180,0.7)' }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="footer-link">(252) 354-2609</span>
              </a>
              <a
                href="mailto:saltypiratewaterpark@gmail.com"
                className="flex items-center gap-2 text-sm transition-colors hover:text-amber-200"
                style={{ color: 'rgba(245,230,180,0.7)' }}
              >
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="footer-link" style={{ fontSize: '0.75rem' }}>saltypiratewaterpark@gmail.com</span>
              </a>
            </div>
          </div>

          <div>
            <h3
              className="font-heading text-sm tracking-widest uppercase mb-4"
              style={{ color: '#d4af37' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/plan-your-visit', label: 'Plan Your Visit' },
                { to: '/explore', label: 'Explore the Park' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/nearby', label: 'Nearby Fun' },
              ].map((l) => (
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
            <ul className="space-y-2 text-sm mb-4">
              {[
                { to: '/updates', label: 'Updates' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
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
