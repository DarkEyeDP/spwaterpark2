import { UtensilsCrossed, IceCream, ShoppingBag, Palmtree, Cloud, MapPin, Star, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { TornEdge } from '../components/TornEdge';

const DARK_WOOD = '#1a0e04';
const PARCHMENT  = '#f0ddb4';


const businesses = [
  {
    name: 'Kilwins',
    category: 'Ice Cream & Treats',
    distance: '0.1 miles',
    description: 'Handcrafted fudge, creamy ice cream, and chocolate specialties right next door on Reed Drive.',
    icon: IceCream,
    color: '#c1860a',
    href: 'https://store.kilwins.com/emeraldisle',
  },
  {
    name: 'Village Ice Cream & Candies',
    category: 'Ice Cream & Treats',
    distance: '0.5 miles',
    description: 'Family-owned shop with 40+ flavors of hand-dipped ice cream, dippin\' dots, fresh fudge, and saltwater taffy.',
    icon: IceCream,
    color: '#c1860a',
    href: 'https://www.facebook.com/villageicecreamandcandies/',
  },
  {
    name: 'Caribsea Restaurant',
    category: 'Food & Restaurants',
    distance: '0.2 miles',
    description: 'Upscale-casual waterfront dining with fresh seafood, house-cured steaks, and a rooftop bar just steps from the park.',
    icon: UtensilsCrossed,
    color: '#ee6352',
    href: 'https://caribsearestaurant.com/',
  },
  {
    name: 'Surf\'s Up Grill and Bar',
    category: 'Food & Restaurants',
    distance: '0.5 miles',
    description: 'The only beachfront restaurant in Emerald Isle, serving grilled seafood and cold drinks with a direct view of the Atlantic.',
    icon: UtensilsCrossed,
    color: '#ee6352',
    href: 'https://www.surfsupemeraldisle.com/',
  },
  {
    name: 'Snapperz Grill & Steam Bar',
    category: 'Food & Restaurants',
    distance: '1.0 mile',
    description: 'Family-friendly coastal spot known for steamed seafood, fresh catch, and classic comfort food.',
    icon: UtensilsCrossed,
    color: '#ee6352',
    href: 'https://www.snapperzfamilyrestaurants.com/',
  },
  {
    name: 'Compass Grill',
    category: 'Food & Restaurants',
    distance: '5.0 miles',
    description: 'A casual down-home diner just over the bridge in Cedar Point serving hearty American breakfast and lunch favorites.',
    icon: UtensilsCrossed,
    color: '#ee6352',
    href: 'https://www.crystalcoastnc.org/listing/compass-grill/25343/',
  },
  {
    name: "Elly's Gifts",
    category: 'Shopping',
    distance: '0.8 miles',
    description: 'A destination gift shop for 25+ years with coastal décor, personalized gifts, jewelry, and homemade fudge.',
    icon: ShoppingBag,
    color: '#d4af37',
    href: 'https://www.ellysgifts.com/',
  },
  {
    name: 'WaterWay Local',
    category: 'Shopping',
    distance: '1.2 miles',
    description: 'Locally-owned boutique carrying coastal-inspired apparel, accessories, and gear celebrating Emerald Isle life.',
    icon: ShoppingBag,
    color: '#d4af37',
    href: 'https://waterwaylocal.com/',
  },
  {
    name: 'Emerald Plantation Cinema',
    category: 'Rainy Day Activities',
    distance: '0.8 miles',
    description: 'A cozy 4-screen movie theater on the island — perfect rainy-afternoon escape for the whole crew.',
    icon: Cloud,
    color: '#7a9ab0',
    href: 'https://emeraldplantationcinema.com/',
  },
  {
    name: "Mac Daddy's Entertainment",
    category: 'Rainy Day Activities',
    distance: '4.5 miles',
    description: 'Bowling, billiards, arcade games, indoor mini golf, and a sports bar just across the bridge.',
    icon: Cloud,
    color: '#7a9ab0',
    href: 'https://mymacdaddys.com/',
  },
  {
    name: "The Golfin' Dolphin",
    category: 'Family Attractions',
    distance: '4.5 miles',
    description: 'Two 18-hole mini golf courses and go-karts just across the bridge in Cape Carteret.',
    icon: Star,
    color: '#d4af37',
    href: 'https://thegolfindolphin.com/',
  },
  {
    name: 'NC Aquarium at Pine Knoll Shores',
    category: 'Family Attractions',
    distance: '13 miles',
    description: 'World-class state aquarium with sharks, sea turtles, river otters, and daily programs for all ages.',
    icon: Star,
    color: '#d4af37',
    href: 'https://www.ncaquariums.com/pine-knoll-shores',
  },
  {
    name: 'Eastern Regional Beach Access',
    category: 'Beach Access',
    distance: '2.5 miles',
    description: 'The largest public beach access in Emerald Isle with 245 parking spaces, restrooms, showers, and a picnic area.',
    icon: Palmtree,
    color: '#20b2aa',
    href: 'https://www.emeraldisle-nc.org/Facilities/Facility/Details/Eastern-Ocean-Regional-Access-EORA-2',
  },
];

export function Nearby() {
  return (
    <div>
      <PageHero
        title="Nearby Treasures"
        subtitle="Make a full day of Emerald Isle with food, shopping, beach time, and local stops close to the park."
      />

      <TornEdge fill={PARCHMENT} fromColor={DARK_WOOD} />

      {/* ── Intro ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              More Than Just a Water Park
            </h2>
            <p className="leading-relaxed text-sm md:text-base" style={{ color: '#5a4030', fontFamily: 'var(--font-heading)', letterSpacing: '0.02em' }}>
              Salty Pirate Water Park is part of a larger Emerald Isle experience. Discover nearby restaurants, shops, beaches, and local stops to make a full coastal adventure out of your visit.
            </p>
          </div>
        </div>
      </section>


      {/* ── Local Businesses ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-3xl mb-8 text-center"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              Local Businesses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {businesses.map((b, i) => (
                <div
                  key={i}
                  className="aged-card p-6 hover:shadow-xl transition-all hover:-translate-y-0.5"
                  style={{ borderRadius: '2px' }}
                >
                  <div className="flex items-center justify-end mb-4">
                    <span
                      className="flex items-center gap-1 text-xs font-heading"
                      style={{ color: '#7a5a3a' }}
                    >
                      <MapPin className="w-3 h-3" style={{ color: '#d4af37' }} />
                      {b.distance}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg mb-1" style={{ color: '#2a1810' }}>{b.name}</h3>
                  <div
                    className="inline-block px-2 py-0.5 text-xs font-heading tracking-wide mb-3"
                    style={{
                      background: 'rgba(212,175,55,0.2)',
                      color: '#6b4a1e',
                      border: '1px solid rgba(107,74,30,0.2)',
                      borderRadius: '1px',
                    }}
                  >
                    {b.category}
                  </div>
                  <p className="text-sm mb-4" style={{ color: '#5a4030' }}>{b.description}</p>
                  <a
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full text-xs font-heading tracking-wide transition-all hover:scale-105"
                    style={{
                      padding: '0.5rem 1rem',
                      background: DARK_WOOD,
                      color: '#f0ddb4',
                      border: '1px solid rgba(212,175,55,0.3)',
                      borderRadius: '2px',
                    }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit Website
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── Partnership CTA ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <LinkIcon className="w-8 h-8 mx-auto mb-4" style={{ color: '#d4af37' }} />
            <h2
              className="text-2xl md:text-3xl mb-3"
              style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
            >
              Local Business? Get Featured Here.
            </h2>
            <p className="text-sm mb-7" style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)', lineHeight: '1.8' }}>
              If you're a local Emerald Isle business interested in being featured on our Nearby Treasures page, we'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-heading tracking-wide transition-all hover:scale-105"
              style={{
                background: DARK_WOOD,
                color: '#f0ddb4',
                border: '1px solid rgba(212,175,55,0.35)',
                borderRadius: '2px',
              }}
            >
              Contact Us About Partnerships
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
