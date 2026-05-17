import { Check, Star, Users, Calendar, Clock, Shield, Anchor, Ticket, WalletCards } from 'lucide-react';
import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import coinImg from '@/assets/coin.svg';
import { PageHero } from '../components/PageHero';
import { TornEdge } from '../components/TornEdge';

const DARK_WOOD = '#1a0e04';
const GOLD = '#d4af37';
const PARCHMENT = '#f0ddb4';
const CREAM = '#f8edd6';

function RopeLine({ dim = false }) {
  return (
    <div
      className="w-full h-px"
      style={{
        background: dim
          ? 'linear-gradient(90deg, transparent, rgba(120,80,20,0.35) 25%, rgba(120,80,20,0.35) 75%, transparent)'
          : `linear-gradient(90deg, transparent, ${GOLD}99 25%, ${GOLD}99 75%, transparent)`,
      }}
    />
  );
}

function SectionHeading({ title, subtitle, dark = false }: { title: string; subtitle?: string; dark?: boolean }) {
  return (
    <div className="text-center mb-12">
      <RopeLine />
      <h2
        className="text-3xl md:text-4xl my-5"
        style={{ fontFamily: 'var(--font-display)', color: dark ? PARCHMENT : '#2a1810' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="max-w-2xl mx-auto text-sm mb-5"
          style={{ fontFamily: 'var(--font-heading)', color: dark ? 'rgba(240,221,180,0.55)' : '#7a5a3a', letterSpacing: '0.04em' }}
        >
          {subtitle}
        </p>
      )}
      <RopeLine />
    </div>
  );
}

const COIN_FILTERS = [
  'brightness(0.65) sepia(0.3)',
  'brightness(0.85) sepia(0.1)',
  'brightness(1.15) saturate(1.2)',
];

export function Pricing() {
  useSEO({
    title: 'Pricing & Tickets | Salty Pirate Water Park — Emerald Isle, NC',
    description: 'Water park ticket prices for Salty Pirate Water Park in Emerald Isle, NC. Day tickets from $17, weekly passes $60, and season passes from $85. Late arrival rate $12 after 4 PM.',
    canonical: '/pricing',
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const primaryChoices = [
    {
      eyebrow: 'Drop Anchor for a Day',
      title: 'Day Tickets',
      badge: 'Most Flexible',
      price: 'From $17',
      icon: Ticket,
      bestFor: 'Best for first-time visitors and one-day outings',
      description: 'Pick the ticket that fits your crew and enjoy a full day of slides, splashes, and pool time.',
      details: [
        { label: 'Ages 6 and up', value: '$22' },
        { label: 'Ages 3 to 5', value: '$17' },
        { label: 'Adults using kiddie pool', value: '$7' },
      ],
      note: 'Adults using the kiddie pool ticket must be combined with full-price admission.',
      priceColor: '#ee6352',
      featured: false,
    },
    {
      eyebrow: 'Stay Aboard All Week',
      title: 'Weekly Pass',
      badge: 'Best for Vacation Week',
      price: '$60',
      icon: Calendar,
      bestFor: 'Ideal for beach-week families who plan to visit more than once',
      description: 'A simple vacation-week option that keeps the schedule flexible and the fun easy to repeat.',
      features: ['7 consecutive days', 'Unlimited visits', 'All ages, one price'],
      priceColor: '#20b2aa',
      featured: false,
    },
    {
      eyebrow: 'Join the Crew for the Season',
      title: 'Season Pass',
      badge: 'Best Value',
      price: 'From $85',
      icon: Star,
      bestFor: 'Best for locals and repeat visitors',
      description: 'Built for families who want the freedom to stop by all season long without rethinking the budget.',
      details: [
        { label: 'Ages 6 and up', value: '$125' },
        { label: 'Ages 3 to 5', value: '$85' },
      ],
      note: 'Pays for itself in about 6 visits.',
      priceColor: GOLD,
      featured: true,
    },
  ];

  return (
    <div style={{ background: DARK_WOOD }}>
      <PageHero
        eyebrow="Captain's Choice Board"
        title="Choose the best way for your crew to enjoy the park"
        subtitle="Whether you're visiting for an afternoon, a beach week, or the whole season, here's the easiest way to chart your course."
      />

      {/* ── Ticket Options ── */}
      <section
        className="py-16 px-4"
        style={{ background: PARCHMENT }}
      >
        <div className="container mx-auto max-w-6xl">
          <SectionHeading
            title="Three easy ways to set sail"
            subtitle="Start with the option that matches your visit, then scan the details underneath for the exact price and fit."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {primaryChoices.map((choice, i) => {
              const isHovered = hoveredIndex === i;
              const hasExtra = ('details' in choice && choice.details) || ('features' in choice && choice.features);
              return (
                <div
                  key={i}
                  className="relative flex flex-col cursor-default"
                  style={{
                    background: '#f8edd6',
                    border: choice.featured ? `2px solid ${GOLD}` : '2px solid rgba(120,72,20,0.28)',
                    boxShadow: isHovered
                      ? `0 16px 40px rgba(0,0,0,0.22), 0 0 0 1px rgba(212,175,55,0.3)`
                      : choice.featured
                        ? `0 0 0 1px rgba(212,175,55,0.15), 0 8px 24px rgba(0,0,0,0.12)`
                        : '0 4px 16px rgba(0,0,0,0.1)',
                    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                    transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Badge ribbon */}
                  <div
                    className="w-full py-2 text-center text-xs tracking-widest uppercase"
                    style={{
                      background: choice.featured
                        ? `linear-gradient(135deg, #c1860a, ${GOLD}, #c1860a)`
                        : 'linear-gradient(135deg, #2a1810, #3d2010)',
                      color: choice.featured ? DARK_WOOD : 'rgba(240,221,180,0.7)',
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '0.18em',
                      borderBottom: choice.featured
                        ? `1px solid rgba(180,130,10,0.4)`
                        : '1px solid rgba(120,80,20,0.3)',
                    }}
                  >
                    {choice.badge}
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div>
                        <p
                          className="text-xs uppercase mb-1.5"
                          style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.18em', color: 'rgba(60,30,10,0.5)' }}
                        >
                          {choice.eyebrow}
                        </p>
                        <h3 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: DARK_WOOD }}>
                          {choice.title}
                        </h3>
                      </div>
                      {/* Coin */}
                      <img
                        src={coinImg}
                        alt=""
                        aria-hidden="true"
                        className="w-11 h-11 shrink-0"
                        style={{
                          filter: isHovered
                            ? `${COIN_FILTERS[i]} brightness(1.3) drop-shadow(0 0 6px rgba(212,175,55,0.6))`
                            : COIN_FILTERS[i],
                          transition: 'filter 0.3s ease',
                        }}
                      />
                    </div>

                    {/* Price */}
                    <div className="mb-1">
                      <span className="text-5xl" style={{ fontFamily: 'var(--font-display)', color: choice.priceColor }}>
                        {choice.price}
                      </span>
                    </div>
                    <p className="font-medium text-sm mb-2" style={{ color: DARK_WOOD, fontFamily: 'var(--font-heading)' }}>
                      {choice.bestFor}
                    </p>
                    <p className="text-sm" style={{ color: 'rgba(30,15,5,0.55)' }}>
                      {choice.description}
                    </p>

                    {/* Expandable details */}
                    {hasExtra && (
                      <div
                        className="pricing-details-expand"
                        style={{
                          maxHeight: isHovered ? '300px' : '0',
                          overflow: 'hidden',
                          transition: 'max-height 0.35s ease',
                        }}
                      >
                        <div className="mt-5">
                          <RopeLine dim />
                        </div>

                        {'details' in choice && choice.details && (
                          <div className="py-4 space-y-3">
                            {choice.details.map(d => (
                              <div key={d.label} className="flex items-center justify-between text-sm">
                                <span style={{ color: 'rgba(30,15,5,0.55)' }}>{d.label}</span>
                                <span style={{ fontFamily: 'var(--font-heading)', color: DARK_WOOD, fontSize: '1.1rem' }}>
                                  {d.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {'features' in choice && choice.features && (
                          <ul className="py-4 space-y-2.5">
                            {choice.features.map(f => (
                              <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(30,15,5,0.65)' }}>
                                <Check className="w-4 h-4 shrink-0" style={{ color: '#20b2aa' }} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}

                        {choice.note && (
                          <>
                            <RopeLine dim />
                            <p className="text-xs mt-4 italic" style={{ color: 'rgba(30,15,5,0.45)', fontFamily: 'var(--font-heading)' }}>
                              {choice.note}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TornEdge fill={PARCHMENT} fromColor={PARCHMENT} />

      {/* ── Special Deals ── */}
      <section className="py-14 px-4" style={{ background: PARCHMENT }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', color: '#2a1810' }}>
              Special deals and savings
            </h2>
            <p className="max-w-2xl mx-auto text-sm" style={{ fontFamily: 'var(--font-heading)', color: '#7a5a3a', letterSpacing: '0.04em' }}>
              A couple of easy ways to save if your visit timing or service status lines up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Late Arrival */}
            <div className="aged-card p-8" style={{ borderRadius: '2px' }}>
              <div
                className="w-12 h-12 flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(135deg, #c1860a, ${GOLD})`,
                  borderRadius: '2px',
                  boxShadow: '0 4px 12px rgba(180,130,10,0.25)',
                }}
              >
                <Clock className="w-6 h-6" style={{ color: DARK_WOOD }} />
              </div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#7a5a3a', letterSpacing: '0.2em' }}>
                Late Arrival Rate
              </p>
              <h3 className="text-4xl mb-1" style={{ fontFamily: 'var(--font-display)', color: '#c1860a' }}>
                $12 after 4 PM
              </h3>
              <p className="mb-5 text-sm" style={{ fontFamily: 'var(--font-heading)', color: '#2a1810' }}>
                Tuesday through Sunday
              </p>
              <div className="w-full h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(120,80,20,0.3) 50%, transparent)' }} />
              <p className="text-sm" style={{ color: '#5a4030' }}>
                A strong quick-win option for casual visitors who want afternoon fun without committing to a full day.
              </p>
            </div>

            {/* Military */}
            <div className="aged-card p-8" style={{ borderRadius: '2px' }}>
              <div
                className="w-12 h-12 flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(135deg, #c1860a, ${GOLD})`,
                  borderRadius: '2px',
                  boxShadow: '0 4px 12px rgba(180,130,10,0.25)',
                }}
              >
                <Shield className="w-6 h-6" style={{ color: DARK_WOOD }} />
              </div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#7a5a3a', letterSpacing: '0.2em' }}>
                Service Discounts
              </p>
              <h3 className="text-2xl mb-5" style={{ fontFamily: 'var(--font-display)', color: '#2a1810' }}>
                Military &amp; First Responder Savings
              </h3>
              <div className="w-full h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(120,80,20,0.3) 50%, transparent)' }} />
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: '#5a4030', fontFamily: 'var(--font-heading)' }}>Day ticket discount</span>
                  <span style={{ fontFamily: 'var(--font-heading)', color: '#c1860a', fontSize: '1.2rem' }}>$2 off</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span style={{ color: '#5a4030', fontFamily: 'var(--font-heading)' }}>Season pass discount</span>
                  <span style={{ fontFamily: 'var(--font-heading)', color: '#c1860a', fontSize: '1.2rem' }}>$10 off</span>
                </div>
                <p className="text-xs pt-2" style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)' }}>
                  Valid ID required at ticket window.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} fromColor={PARCHMENT} />

      {/* ── Notes ── */}
      <section className="py-14 px-4" style={{ background: CREAM }}>
        <div className="container mx-auto max-w-4xl">
          <div className="aged-card p-8 md:p-10" style={{ borderRadius: '2px' }}>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Anchor medallion */}
              <div
                className="flex items-center justify-center w-14 h-14 shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${DARK_WOOD}, #2a1810)`,
                  border: `2px solid ${GOLD}`,
                  borderRadius: '2px',
                  boxShadow: `0 0 0 4px rgba(212,175,55,0.12)`,
                }}
              >
                <Anchor className="w-7 h-7" style={{ color: GOLD }} />
              </div>

              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#7a5a3a', letterSpacing: '0.2em' }}>
                  Helpful Notes Before You Go
                </p>
                <h2 className="text-3xl mb-6" style={{ fontFamily: 'var(--font-display)', color: '#2a1810' }}>
                  A few quick details before you head our way
                </h2>

                <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(120,80,20,0.3) 50%, transparent)' }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: Users,       color: '#20b2aa', title: 'Children under 3 are free',    body: 'Free with paid adult admission.' },
                    { icon: WalletCards, color: '#ee6352', title: 'Payment accepted at the park', body: 'We accept cash and all major credit cards.' },
                  ].map(({ icon: Icon, color, title, body }) => (
                    <div key={title} className="p-4" style={{ background: 'rgba(26,14,4,0.05)', border: '1px solid rgba(120,72,20,0.2)', borderRadius: '2px' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5" style={{ color }} />
                        <p className="font-medium text-sm" style={{ color: DARK_WOOD, fontFamily: 'var(--font-heading)' }}>{title}</p>
                      </div>
                      <p className="text-sm" style={{ color: '#5a4030' }}>{body}</p>
                    </div>
                  ))}
                </div>

                <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(120,80,20,0.3) 50%, transparent)' }} />

                {/* Tickets at park banner */}
                <div
                  className="px-6 py-4 flex items-center gap-4"
                  style={{
                    background: `linear-gradient(135deg, ${DARK_WOOD}, #2a1810)`,
                    border: `1px solid rgba(212,175,55,0.35)`,
                    borderRadius: '2px',
                  }}
                >
                  <Ticket className="w-5 h-5 shrink-0" style={{ color: GOLD }} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', color: PARCHMENT, fontSize: '1rem', letterSpacing: '0.04em' }}>
                      Tickets are sold at the park only
                    </p>
                    <p className="text-sm" style={{ color: 'rgba(240,221,180,0.55)' }}>
                      No online ticket sales are available at this time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
