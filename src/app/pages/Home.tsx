import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Waves, Users, Droplet, MapPin, Clock, DollarSign, Navigation } from 'lucide-react';
import { Countdown } from '../components/Countdown';
import { CaptainsForecast } from '../components/CaptainsForecast';
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
const NAVY = '#0c2340';

export function Home() {
  const memorialDay2026 = new Date('2026-05-25T10:00:00');
  const { setHeroVisible } = useHeroWeather();
  const weatherChipRef = useRef<HTMLDivElement>(null);

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

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative text-white pt-8 pb-12 md:pt-10 md:pb-16 overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${DARK_WOOD} 0%, #2a1810 35%, #0c2340 100%)`,
        }}
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
            <img
              src={logoImg}
              alt="Salty Pirate Water Park"
              className="h-24 md:h-36 w-auto mx-auto mb-4 drop-shadow-2xl"
            />
            <h1
              className="text-4xl md:text-6xl lg:text-7xl mb-3 leading-none"
              style={{ color: '#f0ddb4', textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
            >
              Set Sail for Summer Fun
            </h1>
            <p
              className="text-base md:text-lg mb-6 max-w-2xl mx-auto"
              style={{ color: 'rgba(240,221,180,0.8)', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}
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
                  background: 'rgba(240,221,180,0.08)',
                  color: '#f0ddb4',
                  border: '2px solid rgba(240,221,180,0.3)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  borderRadius: '2px',
                }}
              >
                Explore the Park
                <Waves className="w-5 h-5" />
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
                background: 'rgba(240,221,180,0.07)',
                border: '1px solid rgba(212,175,55,0.35)',
                borderRadius: '2px',
                boxShadow: 'inset 0 0 30px rgba(212,175,55,0.05)',
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
                Opening Soon
              </div>
              <h3
                className="text-2xl"
                style={{ fontFamily: 'var(--font-heading)', color: '#f0ddb4', letterSpacing: '0.06em' }}
              >
                Memorial Day Weekend 2026
              </h3>
              <p className="text-sm mt-2" style={{ color: 'rgba(240,221,180,0.55)', fontFamily: 'var(--font-heading)' }}>
                Follow us for opening announcements
              </p>
            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={PARCHMENT} />

      {/* ── Quick Info ── */}
      <section className="py-14 parchment-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Clock, title: 'Park Status', detail: 'Opening Memorial Day', color: '#20b2aa' },
              { icon: Clock, title: 'Hours', detail: 'Mon 11–5 · Tue–Sun 10–6', color: '#20b2aa' },
              { icon: DollarSign, title: 'Pricing', detail: 'From $17 per person', color: '#ee6352' },
              { icon: Navigation, title: 'Directions', detail: 'Emerald Isle, NC', color: '#d4af37' },
            ].map((item, i) => (
              <div key={i} className="aged-card p-6 hover:shadow-xl transition-shadow" style={{ borderRadius: '2px' }}>
                <item.icon className="w-9 h-9 mb-3" style={{ color: item.color }} />
                <h3 className="font-heading text-base mb-1" style={{ color: '#2a1810' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: '#5a4030', fontFamily: 'var(--font-body)' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} />

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

      <TornEdge fill={PARCHMENT} />

      {/* ── Park Highlights ── */}
      <section className="py-16 parchment-bg">
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

      <TornEdge fill={DARK_WOOD} />

      {/* ── Countdown ── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${DARK_WOOD} 0%, #0c2340 100%)` }}
      >
        <img
          src={pirateShipImg}
          alt=""
          aria-hidden="true"
          className="absolute left-0 bottom-0 h-48 opacity-10 select-none pointer-events-none scale-x-[-1]"
          style={{ filter: 'brightness(3)' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <Countdown
            targetDate={memorialDay2026}
            title="Countdown to Opening Day"
            subtitle="Set sail with us Memorial Day weekend"
          />
        </div>
      </section>

      <TornEdge fill={CREAM} />

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
              { title: 'Day Tickets', price: '$22', detail: 'Ages 6 and up', badge: 'Most Popular' },
              { title: 'Weekly Pass', price: '$60', detail: '7 consecutive days', badge: 'Best for Vacations' },
              { title: 'Season Pass', price: '$125', detail: 'All season long', badge: 'Best Value' },
            ].map((option, i) => (
              <div
                key={i}
                className="aged-card p-6 text-center relative"
                style={{ borderRadius: '2px' }}
              >
                <img src={coinImg} alt="" aria-hidden="true" className="h-10 w-10 mx-auto mb-3 opacity-60" />
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

      <TornEdge fill={PARCHMENT} />

      {/* ── Nearby Fun ── */}
      <section className="py-16 parchment-bg">
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
    </div>
  );
}
