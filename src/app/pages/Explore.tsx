import { useState, useRef } from 'react';
import { Droplet, Waves, Users, MapPin, Zap, Heart, Smile, X, Anchor, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AttractionId = 'captains-plunge' | 'blackbeards-twist' | 'pirates-cove' | 'main-pool' | 'entrance';

interface Hotspot {
  id: AttractionId;
  label: string;
  x: number;
  y: number;
  color: string;
  pulseColor: string;
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
}

interface Attraction {
  id: AttractionId;
  icon: React.ElementType;
  title: string;
  description: string;
  badges: string[];
  color: string;
  tip: string;
}

const MAP_WIDTH = 1586;
const MAP_HEIGHT = 992;

function mapPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

const hotspots: Hotspot[] = [
  { id: 'entrance',           label: 'Park Entrance & Exit',       x: 395,  y: 616, color: 'bg-gold-treasure', pulseColor: 'bg-gold-treasure/40', labelPlacement: 'right' },
  { id: 'captains-plunge',    label: "Captain's Plunge",    x: 1218, y: 486, color: 'bg-coral-red',     pulseColor: 'bg-coral-red/40',     labelPlacement: 'left' },
  { id: 'pirates-cove',       label: "Pirate's Cove",       x: 918,  y: 639, color: 'bg-seafoam',       pulseColor: 'bg-seafoam/40',       labelPlacement: 'left' },
  { id: 'blackbeards-twist',  label: "Blackbeard's Twist",  x: 1304, y: 842, color: 'bg-aqua-water',    pulseColor: 'bg-aqua-water/40',    labelPlacement: 'left' },
  // { id: 'main-pool',          label: 'Main Pool Deck',      x: 1096, y: 744, color: 'bg-ocean-navy',    pulseColor: 'bg-ocean-navy/30',    labelPlacement: 'bottom' },
];

const attractions: Attraction[] = [
  {
    id: 'captains-plunge',
    icon: Droplet,
    title: "Captain's Plunge",
    description: 'A 3-track body slide setup built for quick races, fast repeats, and big laughs from the top side of the park.',
    badges: ['High Energy', 'Best for Bigger Kids'],
    color: 'text-coral-red',
    tip: 'Start here early if your crew wants the fastest first splash.',
  },
  {
    id: 'blackbeards-twist',
    icon: Waves,
    title: "Blackbeard's Twist",
    description: 'Triple tube slides with a longer, twistier ride path down into the lower pool area.',
    badges: ['Good for Families', 'Racing Fun'],
    color: 'text-aqua-water',
    tip: 'A good next stop after Captain\'s Plunge when everyone is warmed up.',
  },
  {
    id: 'pirates-cove',
    icon: Users,
    title: "Pirate's Cove",
    description: 'The children\'s splash area sits near the center of the park, close to seating and the main walking paths.',
    badges: ['Best for Young Kids', 'Family Friendly'],
    color: 'text-seafoam',
    tip: 'Great home base for parents with little ones.',
  },
  // {
  //   id: 'main-pool',
  //   icon: Landmark,
  //   title: 'Main Pool Deck',
  //   description: 'The lower pool and deck area is an easy place to regroup between slide runs, cool off, and keep an eye on the action.',
  //   badges: ['Relax and Watch', 'All Ages'],
  //   color: 'text-ocean-navy',
  //   tip: 'Use this as a meeting point if your crew splits between slides.',
  // },
  {
    id: 'entrance',
    icon: Anchor,
    title: 'Park Entrance and Exit',
    description: 'Start here for tickets, wristbands, and your first bearings before heading into the park.',
    badges: ['Start Here', 'Tickets at Gate'],
    color: 'text-gold-treasure',
    tip: 'Arrive early on weekends and holidays.',
  },
];

export function Explore() {
  const [activeId, setActiveId] = useState<AttractionId | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const activeAttraction = attractions.find(a => a.id === activeId) ?? null;

  function handleHotspotClick(id: AttractionId) {
    setActiveId(prev => (prev === id ? null : id));
    // On mobile, scroll the detail panel into view
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-ocean-navy to-aqua-water text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Explore the Park</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Tap a marker on the map to discover each attraction and plan your first stop.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl text-ocean-navy mb-2">Interactive Park Map</h2>
              <p className="text-muted-foreground text-sm">
                Tap any marker to learn about that area of the park.
              </p>
            </div>

            {/* Map container */}
            <div className="relative overflow-hidden border-4 border-ocean-navy/20 shadow-2xl bg-ocean-navy/5" style={{ borderRadius: 8 }}>
              <img
                src="/salty-pirate-park-map.jpeg"
                alt="Salty Pirate Water Park illustrated map"
                className="w-full h-auto block"
                draggable={false}
              />

              {/* Hotspot pins */}
              {hotspots.map(spot => (
                <button
                  key={spot.id}
                  onClick={() => handleHotspotClick(spot.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                  style={{ top: mapPercent(spot.y, MAP_HEIGHT), left: mapPercent(spot.x, MAP_WIDTH) }}
                  aria-label={`View details for ${spot.label}`}
                >
                  {/* Pulse ring */}
                  <span
                    className={`absolute inset-0 rounded-full ${spot.pulseColor} ${
                      activeId === spot.id ? 'scale-150 opacity-100' : 'scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-150'
                    } transition-all duration-500`}
                  />

                  {/* Pin dot */}
                  <span
                    className={`relative flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full shadow-xl border-2 border-white ${spot.color} ${
                      activeId === spot.id ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-ocean-navy' : 'hover:scale-110'
                    } transition-transform duration-200`}
                  >
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white fill-white/25" />
                  </span>

                  {/* Label tooltip (desktop hover) */}
                  <span
                    className={`pointer-events-none absolute hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${
                      spot.labelPlacement === 'right'
                        ? 'left-full top-1/2 -translate-y-1/2 ml-2'
                        : spot.labelPlacement === 'left'
                          ? 'right-full top-1/2 -translate-y-1/2 mr-2'
                          : spot.labelPlacement === 'bottom'
                            ? 'top-full left-1/2 -translate-x-1/2 mt-2'
                            : 'bottom-full left-1/2 -translate-x-1/2 mb-2'
                    }`}
                  >
                    <span className="bg-ocean-navy text-white text-xs font-semibold px-2 py-1 shadow" style={{ borderRadius: 4 }}>
                      {spot.label}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* Active attraction detail panel */}
            <div ref={detailRef}>
              <AnimatePresence>
                {activeAttraction && (
                  <motion.div
                    key={activeAttraction.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                  className="mt-4 bg-gradient-to-br from-parchment to-warm-sand border-2 border-ocean-navy/15 p-6 relative"
                  style={{ borderRadius: 8 }}
                  >
                    <button
                      onClick={() => setActiveId(null)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-ocean-navy transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white flex items-center justify-center flex-shrink-0 shadow-sm" style={{ borderRadius: 8 }}>
                        <activeAttraction.icon className={`w-7 h-7 ${activeAttraction.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-xl text-ocean-navy mb-1">
                          {activeAttraction.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {activeAttraction.badges.map((badge, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-gold-treasure/25 text-ocean-navy text-xs"
                              style={{ borderRadius: 4 }}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          {activeAttraction.description}
                        </p>
                        <p className="text-xs text-ocean-navy/70 italic border-l-2 border-gold-treasure pl-3">
                          Crew tip: {activeAttraction.tip}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!activeAttraction && (
                <p className="text-center text-muted-foreground text-sm mt-4">
                  Tap a marker above to learn more about each area.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Attraction Detail Cards */}
      <section className="py-16 bg-gradient-to-br from-parchment to-warm-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl text-ocean-navy mb-10 text-center">
              Attraction Details
            </h2>

            <div className="space-y-6">
              {attractions.filter(a => a.id !== 'entrance').map((attraction) => (
                <button
                  key={attraction.id}
                  onClick={() => {
                    setActiveId(attraction.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left bg-white border-2 overflow-hidden hover:shadow-xl transition-all duration-200 flex flex-col md:flex ${
                    activeId === attraction.id
                      ? 'border-aqua-water shadow-lg shadow-aqua-water/20'
                      : 'border-ocean-navy/10'
                  }`}
                  style={{ borderRadius: 8 }}
                >
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-aqua-water/20 to-seafoam/20 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 8 }}>
                        <attraction.icon className={`w-7 h-7 ${attraction.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl text-ocean-navy mb-2">
                          {attraction.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {attraction.badges.map((badge, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-gold-treasure/20 text-ocean-navy text-xs"
                              style={{ borderRadius: 4 }}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {attraction.description}
                    </p>
                    <p className="mt-3 text-xs text-ocean-navy/70 italic border-l-2 border-gold-treasure pl-3">
                      Crew tip: {attraction.tip}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Family Guidance */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl text-ocean-navy mb-6 text-center">
              Family Guidance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'Best for Young Kids', icon: Smile,   color: 'bg-green-100 text-green-700' },
                { label: 'Best for Bigger Kids', icon: Zap,    color: 'bg-orange-100 text-orange-700' },
                { label: 'Good for Families',    icon: Heart,  color: 'bg-pink-100 text-pink-700' },
                { label: 'High Energy',          icon: Droplet,color: 'bg-red-100 text-red-700' },
                { label: 'Relax and Watch',      icon: Users,  color: 'bg-blue-100 text-blue-700' },
                { label: 'Racing Fun',           icon: Waves,  color: 'bg-purple-100 text-purple-700' },
              ].map((badge, i) => (
                <div key={i} className={`${badge.color} rounded-lg p-4 text-center`}>
                  <badge.icon className="w-7 h-7 mx-auto mb-2" />
                  <div className="text-sm font-medium">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
