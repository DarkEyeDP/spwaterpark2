import { Link } from 'react-router';
import { useSEO } from '../hooks/useSEO';
import { Shield, LineChart, Mail, MapPin, Cookie } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { TornEdge } from '../components/TornEdge';

const DARK_WOOD = '#1a0e04';
const PARCHMENT = '#f0ddb4';
const CREAM = '#f8edd6';

const sections = [
  {
    title: 'Information We Collect',
    icon: Shield,
    body:
      'When you browse this site, we may collect standard website usage information such as pages viewed, general traffic patterns, and device or browser details. If you contact us through links or forms, you may also choose to provide personal information such as your name, email address, phone number, and message.',
  },
  {
    title: 'How Analytics Are Used',
    icon: LineChart,
    body:
      'This website uses Google Analytics to understand how visitors use the site, which pages are most helpful, and how we can improve the experience. Google Analytics may collect information such as page visits, time on site, navigation behavior, and general device information.',
  },
  {
    title: 'Forms, Email, and Contact Requests',
    icon: Mail,
    body:
      'If you use contact or hiring forms, your information is used only to respond to your message or application. We do not sell your information, and we only use it for normal business communication related to Salty Pirate Water Park.',
  },
  {
    title: 'Maps, Links, and Third Parties',
    icon: MapPin,
    body:
      'Some pages may include third-party content or links, including Google Maps, social media links, lodging links, and other local business references. Those third-party services may have their own privacy practices, and your use of them is subject to their policies.',
  },
  {
    title: 'Cookies and Similar Technologies',
    icon: Cookie,
    body:
      'Analytics and embedded services may use cookies or similar technologies to support site functionality, measure traffic, and improve performance. You can manage cookies through your browser settings if you prefer to limit this behavior.',
  },
];

export function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | Salty Pirate Water Park — Emerald Isle, NC',
    description: 'Read the Salty Pirate Water Park website privacy policy, including information about analytics, contact forms, embedded services, and how visitor data is used.',
    canonical: '/privacy-policy',
  });

  return (
    <div>
      <PageHero
        title="Privacy Policy"
        subtitle="How visitor information, analytics, and contact details are handled on this website."
      />

      <TornEdge fill={PARCHMENT} fromColor={DARK_WOOD} />

      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              Privacy Matters
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: '#5a4030', fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}
            >
              This policy applies to the Salty Pirate Water Park website and explains, in plain language, what information may be collected and how it is used.
            </p>
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} fromColor={PARCHMENT} />

      <section className="py-14" style={{ background: CREAM }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-5">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="aged-card p-6 md:p-7" style={{ borderRadius: '2px' }}>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(212,175,55,0.16)',
                        border: '1px solid rgba(212,175,55,0.32)',
                        borderRadius: '2px',
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#c1860a' }} />
                    </div>
                    <div>
                      <h3 className="text-xl mb-2" style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}>
                        {section.title}
                      </h3>
                      <p className="text-sm md:text-base leading-relaxed" style={{ color: '#5a4030' }}>
                        {section.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="aged-card p-6 md:p-7" style={{ borderRadius: '2px' }}>
              <h3 className="text-xl mb-3" style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}>
                Questions About This Policy
              </h3>
              <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: '#5a4030' }}>
                If you have questions about this privacy policy or how the website is used, please reach out through the contact page.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-heading tracking-wide transition-all hover:scale-105"
                style={{
                  background: DARK_WOOD,
                  color: '#f0ddb4',
                  border: '1px solid rgba(212,175,55,0.35)',
                  borderRadius: '2px',
                }}
              >
                Contact the Crew
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
