import { Link } from 'react-router';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import GoogleIcon from '@mui/icons-material/Google';
import { ParkStatusPill } from './ParkStatusBadge';

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

      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

          {/* ── Contact ── */}
          <div>
            <h3 className="font-heading text-sm tracking-widest uppercase mb-4" style={{ color: '#d4af37' }}>
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=8915+Reed+Dr,+Emerald+Isle,+NC+28594"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm transition-colors hover:text-amber-200"
                style={{ color: 'rgba(245,230,180,0.7)' }}
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="footer-link leading-snug">8915 Reed Dr<br />Emerald Isle, NC 28594</span>
              </a>
              <a
                href="tel:+12523542609"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-amber-200"
                style={{ color: 'rgba(245,230,180,0.7)' }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="footer-link">(252) 354-2609</span>
              </a>
              <a
                href="mailto:saltypiratewaterpark@gmail.com"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-amber-200"
                style={{ color: 'rgba(245,230,180,0.7)' }}
              >
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#d4af37' }} />
                <span className="footer-link" style={{ wordBreak: 'break-all' }}>saltypiratewaterpark@gmail.com</span>
              </a>
            </div>
          </div>

          {/* ── Navigate ── */}
          <div>
            <h3 className="font-heading text-sm tracking-widest uppercase mb-4" style={{ color: '#d4af37' }}>
              Navigate
            </h3>
            <ul className="space-y-2 text-sm">
              {[...primaryLinks, ...secondaryLinks].map((l) => (
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

          {/* ── Connect ── */}
          <div>
            <h3 className="font-heading text-sm tracking-widest uppercase mb-4" style={{ color: '#d4af37' }}>
              Connect
            </h3>
            <div className="flex gap-3 mb-5">
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
              <a
                href="https://g.page/r/CUnGozQrWxxBEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '2px',
                  color: 'rgba(245,230,180,0.8)',
                }}
                aria-label="Leave a Google Review"
              >
                <GoogleIcon style={{ fontSize: '1rem' }} />
              </a>
            </div>
            <h4 className="font-heading text-sm tracking-widest uppercase mb-2" style={{ color: '#d4af37' }}>
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

          {/* ── Season Info ── */}
          <div>
            <h3 className="font-heading text-sm tracking-widest uppercase mb-4" style={{ color: '#d4af37' }}>
              Season Info
            </h3>
            <p className="text-sm mb-3">
              <ParkStatusPill />
            </p>
            <div className="space-y-1 text-sm" style={{ color: 'rgba(245,230,180,0.7)' }}>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(212,175,55,0.6)' }}>Thru May 31</p>
              <p>Sat – Sun: 10 AM – 6 PM</p>
              <p>Monday: 10 AM – 5 PM</p>
              <p className="text-xs uppercase tracking-widest mt-3 mb-1" style={{ color: 'rgba(212,175,55,0.6)' }}>Starting June 5</p>
              <p>Tue – Sun: 10 AM – 6 PM</p>
              <p>Monday: 11 AM – 5 PM</p>
            </div>
            <p className="text-xs mt-4" style={{ color: 'rgba(245,230,180,0.4)' }}>
              Hours subject to weather and staffing.
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
          <p style={{ fontFamily: 'var(--font-display)', color: '#d4af37', fontSize: '1rem' }}>
            Set sail for summer fun. See you on the coast.
          </p>
          <p className="mt-4 text-xs max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(245,230,180,0.4)' }}>
            Salty Pirate Water Park is not responsible for personal injury, loss, or damage to property sustained while on the premises. Guests participate in all activities at their own risk. By entering the park, guests acknowledge and accept these terms.
          </p>
          <p className="mt-3 text-xs">
            <Link to="/site-map" className="footer-link hover:text-amber-200" style={{ color: '#d4af37' }}>
              Browse Site Map
            </Link>
            {' · '}
            <Link to="/privacy-policy" className="footer-link hover:text-amber-200" style={{ color: '#d4af37' }}>
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
