import { Link } from 'react-router';
import { useSEO } from '../hooks/useSEO';
import { Map, Anchor, Navigation, Ticket, Compass, Newspaper, Mail, Shield } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { TornEdge } from '../components/TornEdge';

const DARK_WOOD = '#1a0e04';
const PARCHMENT = '#f0ddb4';
const CREAM = '#f8edd6';

const siteSections = [
  {
    title: 'Plan Your Day',
    links: [
      { to: '/', label: 'Home', description: 'Start here for the main overview and current seasonal feel.', icon: Anchor },
      { to: '/plan-your-visit', label: 'Plan Your Visit', description: 'Hours, directions, FAQs, and what to bring.', icon: Navigation },
      { to: '/pricing', label: 'Pricing', description: 'Ticket pricing, pass info, and key visitor details.', icon: Ticket },
    ],
  },
  {
    title: 'Explore the Park',
    links: [
      { to: '/explore', label: 'Explore the Park', description: 'Interactive park map and attraction highlights.', icon: Compass },
      { to: '/nearby', label: 'Nearby Fun', description: 'Restaurants, treats, and local stops around Emerald Isle.', icon: Map },
      { to: '/updates', label: 'Updates', description: 'Captain’s Log, seasonal notices, and current news.', icon: Newspaper },
    ],
  },
  {
    title: 'Contact & Legal',
    links: [
      { to: '/contact', label: 'Contact', description: 'Phone, email, forms, and hiring inquiries.', icon: Mail },
      { to: '/privacy-policy', label: 'Privacy Policy', description: 'How site visits, forms, and analytics are handled.', icon: Shield },
    ],
  },
];

export function SiteMap() {
  useSEO({
    title: 'Site Map | Salty Pirate Water Park — Emerald Isle, NC',
    description: 'Browse every page on the Salty Pirate Water Park website, including visitor info, attractions, updates, contact details, and privacy information.',
    canonical: '/site-map',
  });

  return (
    <div>
      <PageHero
        title="Site Map"
        subtitle="A clear guide to every major page on the Salty Pirate Water Park website."
      />

      <TornEdge fill={PARCHMENT} fromColor={DARK_WOOD} />

      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              Navigate the Whole Site
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: '#5a4030', fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}
            >
              Whether you are planning a visit, exploring the park, or looking for important policies, every major page is linked below.
            </p>
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} fromColor={PARCHMENT} />

      <section className="py-14" style={{ background: CREAM }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {siteSections.map((section) => (
              <div key={section.title} className="aged-card p-6 md:p-7" style={{ borderRadius: '2px' }}>
                <h3
                  className="text-xl mb-5"
                  style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
                >
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block transition-all hover:-translate-y-0.5"
                        style={{
                          background: 'rgba(240,221,180,0.5)',
                          border: '1px solid rgba(120,72,20,0.18)',
                          borderRadius: '2px',
                          padding: '1rem',
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                            style={{
                              background: 'rgba(212,175,55,0.16)',
                              border: '1px solid rgba(212,175,55,0.32)',
                              borderRadius: '2px',
                            }}
                          >
                            <Icon className="w-4 h-4" style={{ color: '#c1860a' }} />
                          </div>
                          <div>
                            <p className="font-heading text-sm mb-1" style={{ color: '#2a1810' }}>
                              {link.label}
                            </p>
                            <p className="text-sm" style={{ color: '#6c4e34', lineHeight: '1.6' }}>
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
