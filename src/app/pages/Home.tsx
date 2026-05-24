import { useRef, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router';
import { ArrowRight, Clock, DollarSign, Navigation } from 'lucide-react';
import { CaptainsForecast } from '../components/CaptainsForecast';
// import { EarlyBirdModal } from '../components/EarlyBirdModal';
import { TornEdge } from '../components/TornEdge';
import { WeatherChip } from '../components/WeatherChip';
import { useHeroWeather } from '../context/HeroWeatherContext';
import logoImg from '@/assets/logo.png';
import pirateShipImg from '@/assets/pirate-ship.svg';
import mascotImg from '@/assets/mascot.png';
import waterSlideImg from '@/assets/water-slide.svg';
import treasureMapImg from '@/assets/treasure-map.svg';
import cuteShipImg from '@/assets/cute-ship.svg';
import coinImg from '@/assets/coin.svg';

const DARK_WOOD = '#1a0e04';
const PARCHMENT = '#f0ddb4';
const CREAM = '#f8edd6';
const heroAvif = `${import.meta.env.BASE_URL}beach-background.avif`;
const heroJpeg = `${import.meta.env.BASE_URL}beach-background-optimized.jpg`;

export function Home() {
  useSEO({
    title: 'Salty Pirate Water Park | Family Water Park in Emerald Isle, NC',
    description: 'Salty Pirate Water Park — Emerald Isle, NC. Family water park open Memorial Day through Labor Day on the Crystal Coast. Water slides, pools, and fun for all ages. Day tickets from $17.',
    canonical: '/',
  });
  const { setHeroVisible } = useHeroWeather();
  const weatherChipRef = useRef<HTMLDivElement>(null);
  const shimmerBeamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const beam = shimmerBeamRef.current;
    if (!beam) return;
    beam.style.animation = 'none';
    void beam.offsetWidth; // force reflow so browser registers the reset
    beam.style.animation = '';
  }, []);

  useEffect(() => {
    const el = weatherChipRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setHeroVisible]);

  const heroBg = {
    backgroundImage: `
      image-set(
        url('${heroAvif}') type('image/avif'),
        url('${heroJpeg}') type('image/jpeg')
      )`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
  };

  return (
    <div>
      {/* <EarlyBirdModal /> */}
      {/* ── Hero + first torn edge share the same background so the image flows through the transparent tear area ── */}
      <div style={heroBg}>
      {/* ── Hero ── */}
      <section
        className="relative text-white pt-8 pb-12 md:pt-10 md:pb-16 overflow-hidden"
      >
        {/* Decorative ship silhouette */}
        <img
          src={pirateShipImg}
          alt=""
          aria-hidden="true"
          className="absolute right-0 bottom-0 h-64 md:h-96 opacity-10 select-none pointer-events-none"
          style={{ filter: 'brightness(2)' }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="logo-shimmer-container h-24 md:h-36 w-auto mx-auto mb-4">
              <img
                src={logoImg}
                alt="Salty Pirate Water Park"
                className="h-full w-auto drop-shadow-2xl block"
              />
              <div
                className="logo-shimmer-mask"
                style={{
                  maskImage: `url(${logoImg})`,
                  WebkitMaskImage: `url(${logoImg})`,
                }}
              >
                <div className="logo-shimmer-beam" ref={shimmerBeamRef} />
              </div>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl mb-3 leading-none"
              style={{
                color: '#1a0e04',
                textShadow: '1px 2px 0 #d4af37, 2px 4px 0 rgba(180,130,10,0.55), 0 6px 20px rgba(180,120,0,0.25)',
              }}
            >
              Set Sail for Summer Fun
            </h1>
            <p
              className="text-base md:text-lg mb-6 max-w-2xl mx-auto"
              style={{ color: '#2a1810', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}
            >
              Salty Pirate Water Park returns for another season of family adventure in Emerald Isle, NC.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/plan-your-visit"
                className="px-8 py-4 inline-flex items-center justify-center gap-2 text-sm font-heading tracking-wide transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #c1860a, #d4af37, #b8770a)',
                  color: DARK_WOOD,
                  border: '1px solid rgba(212,175,55,0.7)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                  borderRadius: '2px',
                }}
              >
                Plan Your Visit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/explore"
                className="px-8 py-4 inline-flex items-center justify-center gap-2 text-sm font-heading tracking-wide transition-all hover:scale-105"
                style={{
                  background: 'rgba(26,14,4,0.78)',
                  color: '#d4af37',
                  border: '2px solid rgba(212,175,55,0.6)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                  borderRadius: '2px',
                }}
              >
                Explore the Park
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="currentColor" d="m8.154 15.846l5.808-1.884l1.884-5.808l-5.807 1.885zm3.842-2.73q-.467 0-.79-.327q-.321-.327-.321-.793q0-.467.326-.79q.327-.321.793-.321q.467 0 .79.326q.322.327.322.793q0 .467-.327.79q-.327.322-.793.322M12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.344 0 5.672-2.328T20 12t-2.328-5.672T12 4T6.328 6.328T4 12t2.328 5.672T12 20m0-8" />
                </svg>
              </Link>
            </div>

            {/* Hero weather chip — observed by IntersectionObserver */}
            <div ref={weatherChipRef} className="mt-5 flex justify-center">
              <WeatherChip />
            </div>

            {/* Opening soon badge */}
            <div
              className="mt-5 inline-block mx-auto px-8 py-5 text-center"
              style={{
                background: 'rgba(26,14,4,0.72)',
                border: '1px solid rgba(212,175,55,0.45)',
                borderRadius: '2px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px rgba(212,175,55,0.05)',
              }}
            >
              <div
                className="inline-block px-4 py-1.5 mb-3 text-xs font-heading tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, #c1860a, #d4af37)',
                  color: DARK_WOOD,
                  borderRadius: '1px',
                }}
              >
                Open Now!
              </div>
              <h3
                className="text-2xl"
                style={{ fontFamily: 'var(--font-heading)', color: '#f0ddb4', letterSpacing: '0.06em' }}
              >
                Now–May 31: Sat–Sun 10–6 · Mon 10–5
              </h3>
              <p className="text-sm mt-1" style={{ color: 'rgba(240,221,180,0.65)', fontFamily: 'var(--font-heading)' }}>
                June 5+: Open 7 days · Mon 11–5 · Tue–Sun 10–6
              </p>
              <p className="text-sm mt-2" style={{ color: 'rgba(240,221,180,0.65)', fontFamily: 'var(--font-heading)' }}>
                Come on in — the water is fine!
              </p>
            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={PARCHMENT} />
      </div>{/* end hero background wrapper */}

      {/* ── Quick Info ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Clock, title: 'Park Status', detail: 'Open Now!', color: '#20b2aa', href: null },
              { icon: Clock, title: 'Hours', detail: 'Jun 5+: 7 days · Mon 11–5 · Tue–Sun 10–6', color: '#20b2aa', href: null },
              { icon: DollarSign, title: 'Pricing', detail: 'From $17 per person', color: '#ee6352', href: '/pricing' },
              { icon: Navigation, title: 'Directions', detail: 'Emerald Isle, NC', color: '#d4af37', href: 'https://maps.google.com/?q=8915+Reed+Dr,+Emerald+Isle,+NC+28594' },
            ].map((item, i) => {
              const cardClass = item.href
                ? "aged-card p-6 hover:shadow-xl transition-all relative overflow-hidden block cursor-pointer hover:-translate-y-0.5 hover:brightness-105"
                : "aged-card p-6 transition-shadow relative overflow-hidden block";
              const cardStyle = { borderRadius: '2px' };
              const inner = (
                <>
                  <item.icon
                    className="absolute -bottom-3 -right-3 w-24 h-24 pointer-events-none"
                    style={{ color: item.color, opacity: 0.1 }}
                  />
                  <h3 className="font-heading text-base font-bold mb-1 relative" style={{ color: '#2a1810' }}>{item.title}</h3>
                  <p className="text-sm relative" style={{ color: '#5a4030', fontFamily: 'var(--font-body)' }}>{item.detail}</p>
                </>
              );
              if (!item.href) return <div key={i} className={cardClass} style={cardStyle}>{inner}</div>;
              if (item.href.startsWith('http')) return <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass} style={cardStyle}>{inner}</a>;
              return <Link key={i} to={item.href} className={cardClass} style={cardStyle}>{inner}</Link>;
            })}
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} fromColor={PARCHMENT} />

      {/* ── Captain's Forecast ── */}
      <section className="py-14" style={{ background: CREAM }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl mb-3"
                style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
              >
                Should I Go Today?
              </h2>
              <p style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', letterSpacing: '0.03em' }}>
                Before you pack the towels, check today's forecast and park status.
              </p>
            </div>
            <CaptainsForecast />
          </div>
        </div>
      </section>

      <TornEdge fill={PARCHMENT} fromColor={CREAM} />

      {/* ── Park Highlights ── */}
      <section className="py-16" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              Park Highlights
            </h2>
            <p style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', letterSpacing: '0.03em' }}>
              Discover the adventures waiting for your crew.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { img: waterSlideImg, title: 'Three Big Drop Slides', description: 'Fast, exciting slides for bigger kids and thrill seekers.', badge: 'High Energy' },
              { img: waterSlideImg, title: 'Three Mat Hill Slides', description: 'Longer rides from the top, built for racing and gliding.', badge: 'Race Your Crew' },
              { img: cuteShipImg, title: 'Kids Splash Zone', description: 'A cute splash area built for younger pirates and families.', badge: 'Family Friendly' },
              { img: treasureMapImg, title: 'Relaxation Areas', description: 'Seating and shaded spots to regroup between adventures.', badge: 'Relax & Watch' },
            ].map((feature, i) => (
              <div
                key={i}
                className="aged-card p-6 hover:shadow-xl transition-all hover:-translate-y-0.5 flex flex-col"
                style={{ borderRadius: '2px' }}
              >
                <img src={feature.img} alt="" aria-hidden="true" className="h-14 w-14 mb-4 opacity-80" />
                <div
                  className="inline-block self-start px-3 py-1 text-xs font-heading tracking-wide mb-3"
                  style={{
                    background: 'rgba(212,175,55,0.2)',
                    color: '#6b4a1e',
                    border: '1px solid rgba(107,74,30,0.25)',
                    borderRadius: '1px',
                  }}
                >
                  {feature.badge}
                </div>
                <h3 className="font-heading text-base mb-2" style={{ color: '#2a1810' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: '#5a4030' }}>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Mascot decoration */}
          <div className="text-center mt-10">
            <img src={mascotImg} alt="" aria-hidden="true" className="inline-block h-32 md:h-40 opacity-90 drop-shadow-lg" />
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} fromColor={PARCHMENT} />

      {/* ── Pricing ── */}
      <section className="py-16" style={{ background: CREAM }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              Pricing That Makes Sense
            </h2>
            <p style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', letterSpacing: '0.03em' }}>
              Choose the best way for your crew to enjoy the park.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Day Tickets', price: '$22', detail: 'Ages 6 and up', badge: 'Most Popular', coinFilter: 'brightness(0.65) sepia(0.3)' },
              { title: 'Weekly Pass', price: '$60', detail: '7 consecutive days', badge: 'Best for Vacations', coinFilter: 'brightness(0.85) sepia(0.1)' },
              { title: 'Season Pass', price: '$125', detail: 'All season long', badge: 'Best Value', coinFilter: 'brightness(1.15) saturate(1.2)' },
            ].map((option, i) => (
              <div
                key={i}
                className="aged-card pricing-card p-6 text-center relative"
                style={{ borderRadius: '2px', ['--coin-filter' as string]: option.coinFilter }}
              >
                <img src={coinImg} alt="" aria-hidden="true" className="pricing-coin h-10 w-10 mx-auto mb-3" style={{ filter: option.coinFilter }} />
                <div
                  className="inline-block px-4 py-1 text-xs font-heading tracking-wide mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #c1860a, #d4af37)',
                    color: DARK_WOOD,
                    borderRadius: '1px',
                  }}
                >
                  {option.badge}
                </div>
                <h3 className="font-heading text-xl mb-2" style={{ color: '#2a1810' }}>{option.title}</h3>
                <div
                  className="text-5xl mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: '#c1860a' }}
                >
                  {option.price}
                </div>
                <p className="text-sm" style={{ color: '#5a4030', fontFamily: 'var(--font-heading)' }}>{option.detail}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-heading tracking-wide transition-all hover:scale-105"
              style={{
                background: DARK_WOOD,
                color: '#f0ddb4',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '2px',
              }}
            >
              View All Pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <TornEdge fill={PARCHMENT} fromColor={CREAM} />

      {/* ── Nearby Fun ── */}
      <section className="py-16" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              Make a Full Day of Emerald Isle
            </h2>
            <p style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)', fontSize: '0.95rem', letterSpacing: '0.03em' }}>
              Discover nearby restaurants, shops, beaches, and local attractions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { img: treasureMapImg, title: 'Eat Nearby', description: 'Local restaurants and cafes' },
              { img: cuteShipImg, title: 'Shop Nearby', description: 'Unique coastal stores' },
              { img: waterSlideImg, title: 'Explore Nearby', description: 'Beaches and attractions' },
            ].map((item, i) => (
              <div
                key={i}
                className="aged-card p-6 text-center hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ borderRadius: '2px' }}
              >
                <img src={item.img} alt="" aria-hidden="true" className="h-14 w-14 mx-auto mb-3 opacity-75" />
                <h3 className="font-heading text-lg mb-2" style={{ color: '#2a1810' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: '#5a4030' }}>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/nearby"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-heading tracking-wide transition-all hover:scale-105"
              style={{
                background: DARK_WOOD,
                color: '#f0ddb4',
                border: '1px solid rgba(107,74,30,0.4)',
                borderRadius: '2px',
              }}
            >
              Discover Nearby Fun
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <TornEdge fill={DARK_WOOD} fromColor={PARCHMENT} />

      {/* ── Ship Store ── */}
      <section
        className="py-10 md:py-12"
        style={{
          background: DARK_WOOD,
          borderTop: '1px solid rgba(212,175,55,0.15)',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            {/* Coin + text */}
            <div className="flex items-center gap-5">
              <img
                src={coinImg}
                alt=""
                aria-hidden="true"
                className="h-14 w-14 flex-shrink-0"
                style={{ filter: 'brightness(1.1) saturate(1.2) drop-shadow(0 0 8px rgba(212,175,55,0.4))' }}
              />
              <div>
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: '#d4af37', fontFamily: 'var(--font-heading)' }}
                >
                  Official Merchandise
                </p>
                <h2
                  className="text-2xl md:text-3xl mb-1"
                  style={{ color: '#f0ddb4', fontFamily: 'var(--font-display)' }}
                >
                  Salty Pirate Ship Store
                </h2>
                <p
                  className="text-sm max-w-md"
                  style={{ color: 'rgba(245,230,180,0.65)', fontFamily: 'var(--font-heading)', lineHeight: '1.7' }}
                >
                  Fly the colors of the crew with official Salty Pirate gear — tees, tanks, totes, and more for every swashbuckler in the family.
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://www.saltypiratestore.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3 text-sm font-heading tracking-wide transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #c1860a, #d4af37)',
                color: DARK_WOOD,
                border: '1px solid rgba(212,175,55,0.5)',
                borderRadius: '2px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                whiteSpace: 'nowrap',
              }}
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
