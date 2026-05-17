import { useSEO } from '../hooks/useSEO';
import { Clock, MapPin, Shirt, Droplets, Sun, Users, ChevronDown, Anchor } from 'lucide-react';
import { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { TornEdge } from '../components/TornEdge';
import airbnbLogo from '@/assets/airbnb-logo.png';
import bookingLogo from '@/assets/booking-logo.png';
import hotelsLogo from '@/assets/hotels-logo-2.png';
import vrboLogo from '@/assets/vrbo-logo.svg';

const DARK_WOOD = '#1a0e04';
const PARCHMENT = '#f0ddb4';
const CREAM = '#f8edd6';

const faqs = [
  {
    question: 'Are tickets sold online?',
    answer: 'Tickets are currently sold at the park only. We accept cash and card.',
  },
  {
    question: 'What happens if the weather changes?',
    answer: 'Check the live status banner and weather module before arriving. We may delay opening or close early due to lightning, heavy rain, or unsafe conditions.',
  },
  {
    question: 'Is there a discount after 4PM?',
    answer: 'Yes, day tickets are $12 after 4PM Tuesday through Sunday.',
  },
  {
    question: 'Do you offer military or first responder discounts?',
    answer: 'Yes, we offer $2 off day tickets and $10 off season passes for military members and first responders with valid ID.',
  },
  {
    question: 'Can I bring food and drinks?',
    answer: 'Outside food and non-alcoholic beverages are welcome. We have picnic areas available.',
  },
  {
    question: 'Is there parking?',
    answer: 'Yes, free parking is available on-site.',
  },
];

const lodging = [
  {
    name: 'VRBO',
    logo: vrboLogo,
    tagline: 'Vacation rentals & beach houses',
    href: 'https://www.vrbo.com/search?destination=Salty+Pirate+Water+Park%2C+Emerald+Isle%2C+North+Carolina%2C+United+States+of+America&regionId=553248621561872517&sort=RECOMMENDED',
  },
  {
    name: 'Airbnb',
    logo: airbnbLogo,
    tagline: 'Homes, cottages & beach stays',
    href: 'https://www.airbnb.com/s/Emerald-Isle--NC/homes',
  },
  {
    name: 'Booking.com',
    logo: bookingLogo,
    tagline: 'Hotels, motels & rentals',
    href: 'https://www.booking.com/searchresults.html?ss=Emerald+Isle%2C+North+Carolina',
  },
  {
    name: 'Hotels.com',
    logo: hotelsLogo,
    tagline: 'Hotels close to the park',
    href: 'https://www.hotels.com/search.do?q-destination=Emerald+Isle%2C+NC',
  },
];

export function PlanYourVisit() {
  useSEO({
    title: 'Plan Your Visit | Salty Pirate Water Park — Emerald Isle, NC',
    description: 'Plan your visit to Salty Pirate Water Park in Emerald Isle, NC. Park hours, directions, what to bring, FAQs, and nearby lodging on the Crystal Coast.',
    canonical: '/plan-your-visit',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <PageHero
        title="Plan Your Visit"
        subtitle="Everything your crew needs before heading to Salty Pirate Water Park."
      />

      <TornEdge fill={PARCHMENT} fromColor={DARK_WOOD} />

      {/* ── Park Hours ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-7 h-7 flex-shrink-0" style={{ color: '#20b2aa' }} />
              <h2 className="font-heading text-3xl" style={{ color: '#2a1810' }}>Park Hours</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="aged-card p-6" style={{ borderRadius: '2px' }}>
                <h3 className="font-heading text-lg mb-4" style={{ color: '#2a1810' }}>Regular Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center" style={{ borderBottom: '1px solid rgba(120,72,20,0.15)', paddingBottom: '0.6rem' }}>
                    <span style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)' }}>Monday</span>
                    <span style={{ color: '#2a1810', fontFamily: 'var(--font-heading)' }}>11:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)' }}>Tuesday – Sunday</span>
                    <span style={{ color: '#2a1810', fontFamily: 'var(--font-heading)' }}>10:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="aged-card p-6" style={{ borderRadius: '2px' }}>
                <h3 className="font-heading text-lg mb-4" style={{ color: '#2a1810' }}>Important Notes</h3>
                <ul className="space-y-2 text-sm" style={{ color: '#5a4030' }}>
                  {[
                    'Seasonal hours may change due to weather',
                    'Staffing may affect operations',
                    'Special events may alter hours',
                    'Check live status before heading out',
                  ].map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#d4af37', marginTop: '1px' }}>·</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} fromColor={PARCHMENT} />

      {/* ── Location & Directions ── */}
      <section className="py-14" style={{ background: CREAM }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-7 h-7 flex-shrink-0" style={{ color: '#d4af37' }} />
              <h2 className="font-heading text-3xl" style={{ color: '#2a1810' }}>Location & Directions</h2>
            </div>

            <div className="aged-card p-6 md:p-8" style={{ borderRadius: '2px' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-lg mb-3" style={{ color: '#2a1810' }}>Address</h3>
                  <p className="text-sm mb-5" style={{ color: '#5a4030', fontFamily: 'var(--font-heading)', lineHeight: '1.8' }}>
                    Salty Pirate Water Park<br />
                    8915 Reed Dr<br />
                    Emerald Isle, NC 28594
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=8915+Reed+Dr,+Emerald+Isle,+NC+28594"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-heading tracking-wide transition-all hover:scale-105"
                    style={{
                      background: DARK_WOOD,
                      color: '#f0ddb4',
                      border: '1px solid rgba(212,175,55,0.35)',
                      borderRadius: '2px',
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>

                <div className="overflow-hidden" style={{ borderRadius: '2px', border: '2px solid rgba(120,72,20,0.2)', minHeight: '220px' }}>
                  <iframe
                    title="Salty Pirate Water Park location"
                    src="https://maps.google.com/maps?q=8915+Reed+Dr,+Emerald+Isle,+NC+28594&output=embed"
                    width="100%"
                    height="220"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={PARCHMENT} fromColor={CREAM} />

      {/* ── Drop Anchor Nearby ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Anchor className="w-7 h-7 flex-shrink-0" style={{ color: '#d4af37' }} />
              <h2 className="font-heading text-3xl" style={{ color: '#2a1810' }}>Drop Anchor Nearby</h2>
            </div>
            <p className="mb-8 text-sm max-w-2xl" style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}>
              Making a trip of it? Emerald Isle and the Crystal Coast have plenty of vacation rentals and hotels just minutes from the park.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {lodging.map(({ name, logo, tagline, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group aged-card flex flex-col hover:shadow-xl transition-all hover:-translate-y-0.5"
                  style={{ borderRadius: '2px', padding: 0, overflow: 'hidden' }}
                >
                  {/* Logo area — white bg so brand logos render correctly */}
                  <div
                    className="flex items-center justify-center px-4 py-5"
                    style={{ background: '#ffffff', borderBottom: '1px solid rgba(120,72,20,0.15)' }}
                  >
                    <img
                      src={logo}
                      alt={name}
                      className="h-8 w-auto object-contain"
                      style={{ maxWidth: '120px' }}
                    />
                  </div>
                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-4">
                    <p className="text-xs mb-3 flex-1" style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)' }}>
                      {tagline}
                    </p>
                    <div
                      className="inline-flex items-center gap-1 text-xs font-heading tracking-wide"
                      style={{ color: '#c1860a' }}
                    >
                      Search now
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} fromColor={PARCHMENT} />

      {/* ── What to Bring ── */}
      <section className="py-14" style={{ background: CREAM }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl mb-8 text-center"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              What to Bring
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: Shirt,    title: 'Swimwear',       items: ['Swim suits', 'Water shoes', 'Rash guards'],          color: '#20b2aa' },
                { icon: Sun,      title: 'Sun Protection', items: ['Sunscreen', 'Hats', 'Sunglasses'],                   color: '#d4af37' },
                { icon: Droplets, title: 'Essentials',     items: ['Towels', 'Change of clothes', 'Water bottle'],       color: '#c1860a' },
              ].map(({ icon: Icon, title, items, color }, i) => (
                <div key={i} className="aged-card p-6" style={{ borderRadius: '2px' }}>
                  <Icon className="w-8 h-8 mb-4" style={{ color }} />
                  <h3 className="font-heading text-lg mb-3" style={{ color: '#2a1810' }}>{title}</h3>
                  <ul className="space-y-2 text-sm" style={{ color: '#5a4030' }}>
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span style={{ color: '#d4af37', marginTop: '1px' }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={PARCHMENT} fromColor={CREAM} />

      {/* ── What to Expect ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-7 h-7 flex-shrink-0" style={{ color: '#d4af37' }} />
              <h2 className="font-heading text-3xl" style={{ color: '#2a1810' }}>What to Expect</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="aged-card p-6" style={{ borderRadius: '2px' }}>
                <h3 className="font-heading text-lg mb-4" style={{ color: '#2a1810' }}>Park Features</h3>
                <ul className="space-y-2 text-sm" style={{ color: '#5a4030' }}>
                  {[
                    'Three big drop slides',
                    'Three mat-ridden hill slides',
                    'Kids splash adventure zone',
                    'Family seating areas',
                    'Relaxation zones',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#d4af37', marginTop: '1px' }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aged-card p-6" style={{ borderRadius: '2px' }}>
                <h3 className="font-heading text-lg mb-4" style={{ color: '#2a1810' }}>Good to Know</h3>
                <ul className="space-y-2 text-sm" style={{ color: '#5a4030' }}>
                  {[
                    'Seasonal operations (Memorial Day – Labor Day)',
                    'Weather-sensitive operations',
                    'Family-friendly environment',
                    'Life jackets available',
                    'First aid on site',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#d4af37', marginTop: '1px' }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} fromColor={PARCHMENT} />

      {/* ── FAQ ── */}
      <section className="py-14" style={{ background: CREAM }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-3xl mb-8 text-center"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="aged-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ borderRadius: '2px', padding: 0 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left transition-all group"
                    style={{
                      background: openFaq === index ? 'rgba(212,175,55,0.12)' : 'transparent',
                    }}
                    onMouseEnter={e => { if (openFaq !== index) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,175,55,0.06)'; }}
                    onMouseLeave={e => { if (openFaq !== index) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                  >
                    <span className="font-heading text-sm pr-4 transition-colors group-hover:text-[#6b3a10]" style={{ color: '#2a1810' }}>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-all group-hover:scale-110 ${openFaq === index ? 'rotate-180' : ''}`}
                      style={{ color: '#d4af37' }}
                    />
                  </button>
                  {openFaq === index && (
                    <div
                      className="px-6 pb-5 text-sm"
                      style={{
                        color: '#5a4030',
                        fontFamily: 'var(--font-body)',
                        borderTop: '1px solid rgba(120,72,20,0.15)',
                        paddingTop: '1rem',
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
