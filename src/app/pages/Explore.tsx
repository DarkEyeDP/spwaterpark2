import { useState, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import { Droplet, Waves, Users, MapPin, X, Anchor, Maximize2, Minimize2, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { TornEdge } from '../components/TornEdge';
import { motion, AnimatePresence } from 'motion/react';

const DARK_WOOD = '#1a0e04';
const PARCHMENT  = '#f0ddb4';

type AttractionId = 'captains-plunge' | 'blackbeards-twist' | 'pirates-cove' | 'entrance';

interface Hotspot {
  id: AttractionId;
  label: string;
  x: number;
  y: number;
  color: string;
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

interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  feature?: boolean;
}

const MAP_WIDTH  = 1586;
const MAP_HEIGHT = 992;
const PARK_MAP_IMAGE = `${import.meta.env.BASE_URL}salty-pirate-park-map.jpeg`;
const GALLERY_BASE = `${import.meta.env.BASE_URL}explore-gallery/`;

function mapPercent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

const hotspots: Hotspot[] = [
  { id: 'entrance',          label: 'Park Entrance & Exit', x: 395,  y: 616, color: '#d4af37', labelPlacement: 'right' },
  { id: 'captains-plunge',   label: "Captain's Plunge",     x: 1218, y: 486, color: '#ee6352', labelPlacement: 'left'  },
  { id: 'pirates-cove',      label: "Pirate's Cove",        x: 918,  y: 639, color: '#20b2aa', labelPlacement: 'left'  },
  { id: 'blackbeards-twist', label: "Blackbeard's Twist",   x: 1304, y: 842, color: '#1b9aaa', labelPlacement: 'left'  },
];

const attractions: Attraction[] = [
  {
    id: 'captains-plunge',
    icon: Droplet,
    title: "Captain's Plunge",
    description: 'A 3-track body slide setup built for quick races, fast repeats, and big laughs from the top side of the park.',
    badges: ['High Energy', 'Best for Bigger Kids'],
    color: '#ee6352',
    tip: 'Start here early if your crew wants the fastest first splash.',
  },
  {
    id: 'blackbeards-twist',
    icon: Waves,
    title: "Blackbeard's Twist",
    description: 'Triple tube slides with a longer, twistier ride path down into the lower pool area.',
    badges: ['Good for Families', 'Racing Fun'],
    color: '#20b2aa',
    tip: "A good next stop after Captain's Plunge when everyone is warmed up.",
  },
  {
    id: 'pirates-cove',
    icon: Users,
    title: "Pirate's Cove",
    description: "The children's splash area sits near the center of the park, close to seating and the main walking paths.",
    badges: ['Best for Young Kids', 'Family Friendly'],
    color: '#20b2aa',
    tip: 'Great home base for parents with little ones.',
  },
  {
    id: 'entrance',
    icon: Anchor,
    title: 'Park Entrance and Exit',
    description: 'Start here for tickets, wristbands, and your first bearings before heading into the park.',
    badges: ['Start Here', 'Tickets at Gate'],
    color: '#d4af37',
    tip: 'Arrive early on weekends and holidays.',
  },
];

const galleryPhotos: GalleryPhoto[] = [
  {
    src: `${GALLERY_BASE}salty-pirate-water-park-sign.webp`,
    width: 1360,
    height: 1020,
    title: 'Welcome Aboard',
    // alt: 'Salty Pirate Water Park entrance sign on a grassy hill in Emerald Isle, North Carolina.',
    feature: true,
  },
  {
    src: `${GALLERY_BASE}overview-from-slide-tower.webp`,
    width: 1360,
    height: 1020,
    title: "Older view from the Blackbeard's Twist",
    // alt: 'High view over the Salty Pirate Water Park pools, lounge chairs, blue umbrellas, and slide runouts.',
  },
  {
    src: `${GALLERY_BASE}captains-plunge-racing-slides.webp`,
    width: 1360,
    height: 1020,
    title: "Captain's Plunge",
    // alt: "Guests riding the three-lane Captain's Plunge body slides into the splash pool.",
  },
  {
    src: `${GALLERY_BASE}blackbeards-twist-tube-slides.webp`,
    width: 765,
    height: 1020,
    title: "Blackbeard's Twist",
    // alt: "Green, blue, and yellow enclosed tube slides curving down into the pool at Blackbeard's Twist.",
  },
  {
    src: `${GALLERY_BASE}slide-tower-sundeck-view.webp`,
    width: 765,
    height: 1020,
    title: 'Lookout View of the Sundeck',
    // alt: 'View from the slide tower over the Salty Pirate sundeck, lounge chairs, pools, and nearby coastal buildings.',
  },
  {
    src: `${GALLERY_BASE}pirates-cove-ship-splash-area.webp`,
    width: 1360,
    height: 1020,
    title: "Pirate's Cove",
    // alt: "Children playing in Pirate's Cove beside the pirate ship splash structure, octopus mural, and water features.",
    feature: true,
  },
  {
    src: `${GALLERY_BASE}arcade-game-room.webp`,
    width: 1360,
    height: 1020,
    title: 'Arcade Area',
    // alt: 'Indoor arcade room with table seating, prize games, basketball, racing, and Guitar Hero machines.',
  },
  {
    src: `${GALLERY_BASE}pirates-cove-water-play.webp`,
    width: 1360,
    height: 1020,
    title: "Pirate's Cove",
    // alt: "Families playing around Pirate's Cove water features with the yellow umbrella sprayer and pirate ship walls.",
  },
  {
    src: `${GALLERY_BASE}aerial-pirates-cove-splash-zone.webp`,
    width: 1360,
    height: 762,
    title: 'Water Park from Above',
    // alt: "Aerial view of Pirate's Cove, the winding slide channel, lounge chairs, and blue shade umbrellas.",
  },
  {
    src: `${GALLERY_BASE}captains-plunge-splash-pool.webp`,
    width: 1360,
    height: 765,
    title: 'Bottom of Captain’s Plunge',
    // alt: "Three-lane turquoise body slides ending in the Captain's Plunge splash pool.",
  },
  {
    src: `${GALLERY_BASE}blackbeards-twist-slide-tower.webp`,
    width: 765,
    height: 1020,
    title: 'Slide Tower',
    // alt: "Front view of the Blackbeard's Twist slide tower with green, blue, and yellow tubes under cloudy skies.",
  },
  {
    src: `${GALLERY_BASE}hilltop-water-slide-view.webp`,
    width: 1360,
    height: 643,
    title: "Captain's Plunge",
    // alt: 'Wide view of the hilltop water slides, slide tower, grass slope, and poolside umbrellas.',
  },
  {
    src: `${GALLERY_BASE}tube-slides-closeup.webp`,
    width: 765,
    height: 1020,
    title: 'Twists and Turns',
    // alt: "Close view from beneath Blackbeard's Twist showing the green, blue, and yellow tube slide curves.",
  },
  {
    src: `${GALLERY_BASE}aerial-blackbeards-twist-slides.webp`,
    width: 1360,
    height: 821,
    title: "Aerial of Blackbeard's Twist",
    // alt: "Aerial view of Blackbeard's Twist tube slides, wooden tower, and rectangular landing pool.",
  },
];

export function Explore() {
  useSEO({
    title: 'Explore the Park | Salty Pirate Water Park — Emerald Isle, NC',
    description: "Explore Salty Pirate Water Park in Emerald Isle, NC with the interactive park map, ride highlights, and a photo gallery of slides, pools, Pirate's Cove, and the arcade.",
    canonical: '/explore',
  });
  const [activeId, setActiveId] = useState<AttractionId | null>(null);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const activeAttraction = attractions.find(a => a.id === activeId) ?? null;
  const selectedPhoto = selectedPhotoIndex === null ? null : galleryPhotos[selectedPhotoIndex];

  useEffect(() => {
    if (!mapFullscreen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMapFullscreen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mapFullscreen]);

  useEffect(() => {
    if (selectedPhotoIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowLeft') showPreviousPhoto();
      if (e.key === 'ArrowRight') showNextPhoto();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selectedPhotoIndex]);

  function handleHotspotClick(id: AttractionId) {
    setActiveId(prev => (prev === id ? null : id));
  }

  function showPreviousPhoto() {
    setSelectedPhotoIndex(current => {
      if (current === null) return null;
      return (current - 1 + galleryPhotos.length) % galleryPhotos.length;
    });
  }

  function showNextPhoto() {
    setSelectedPhotoIndex(current => {
      if (current === null) return null;
      return (current + 1) % galleryPhotos.length;
    });
  }

  return (
    <div>
      <PageHero
        title="Explore the Park"
        subtitle="Tap a marker on the map to discover each attraction and plan your first stop."
      />

      <TornEdge fill={PARCHMENT} fromColor={DARK_WOOD} />

      {/* ── Interactive Park Map ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2
                className="text-3xl mb-2"
                style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
              >
                Interactive Park Map
              </h2>
              <p style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)', fontSize: '0.875rem' }}>
                Tap any marker to learn about that area of the park.
              </p>
            </div>

            {/* Map container */}
            <div
              className="relative overflow-hidden group/map"
              style={{
                border: '3px solid rgba(120,72,20,0.3)',
                borderRadius: '2px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              <img
                src={PARK_MAP_IMAGE}
                alt="Salty Pirate Water Park illustrated map"
                className="w-full h-auto block"
                draggable={false}
              />

              {/* Fullscreen button */}
              <button
                onClick={() => setMapFullscreen(true)}
                className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 opacity-0 group-hover/map:opacity-100 transition-opacity duration-200 z-10 cursor-pointer"
                style={{
                  background: 'rgba(26,14,4,0.8)',
                  border: '1px solid rgba(212,175,55,0.5)',
                  borderRadius: '2px',
                  backdropFilter: 'blur(4px)',
                }}
                aria-label="View map fullscreen"
              >
                <Maximize2 className="w-4 h-4" style={{ color: '#d4af37' }} />
              </button>

              {/* Hotspot pins */}
              {hotspots.map(spot => {
                const isActive = activeId === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => handleHotspotClick(spot.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer"
                    style={{ top: mapPercent(spot.y, MAP_HEIGHT), left: mapPercent(spot.x, MAP_WIDTH) }}
                    aria-label={`View details for ${spot.label}`}
                  >
                    {/* Pulse ring */}
                    <span
                      className="absolute inset-0 rounded-full transition-all duration-500"
                      style={{
                        background: spot.color,
                        opacity: isActive ? 0.35 : 0,
                        transform: isActive ? 'scale(2)' : 'scale(1)',
                      }}
                    />
                    {/* Pin dot */}
                    <span
                      className="relative flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full border-2 border-white transition-transform duration-200"
                      style={{
                        background: spot.color,
                        transform: isActive ? 'scale(1.25)' : undefined,
                        boxShadow: isActive
                          ? `0 0 0 3px white, 0 0 0 5px ${spot.color}, 0 4px 12px rgba(0,0,0,0.4)`
                          : '0 2px 8px rgba(0,0,0,0.35)',
                      }}
                    >
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" style={{ fill: 'rgba(255,255,255,0.25)' }} />
                    </span>
                    {/* Label tooltip — desktop only */}
                    <span
                      className={`pointer-events-none absolute hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${
                        spot.labelPlacement === 'right'  ? 'left-full top-1/2 -translate-y-1/2 ml-2'   :
                        spot.labelPlacement === 'left'   ? 'right-full top-1/2 -translate-y-1/2 mr-2'  :
                        spot.labelPlacement === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2'   :
                                                           'bottom-full left-1/2 -translate-x-1/2 mb-2'
                      }`}
                    >
                      <span
                        className="text-xs font-semibold px-2 py-1 shadow"
                        style={{
                          background: DARK_WOOD,
                          color: '#f0ddb4',
                          border: '1px solid rgba(212,175,55,0.4)',
                          borderRadius: '2px',
                          fontFamily: 'var(--font-heading)',
                        }}
                      >
                        {spot.label}
                      </span>
                    </span>
                  </button>
                );
              })}
              {/* Detail card overlay */}
              <AnimatePresence>
                {activeAttraction && (
                  <motion.div
                    key={activeAttraction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-3 left-3 right-3 md:left-4 md:bottom-4 md:right-auto md:max-w-xs"
                    style={{
                      background: 'rgba(240,221,180,0.97)',
                      border: '1px solid rgba(120,72,20,0.3)',
                      borderRadius: '3px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                      backdropFilter: 'blur(4px)',
                      zIndex: 20,
                    }}
                  >
                    <div className="p-4 pr-8 relative">
                      <button
                        onClick={() => setActiveId(null)}
                        className="absolute top-2.5 right-2.5 transition-opacity hover:opacity-60"
                        style={{ color: 'rgba(90,64,48,0.7)' }}
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <h3 className="font-heading text-base font-bold mb-2" style={{ color: '#2a1810' }}>
                        {activeAttraction.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {activeAttraction.badges.map((badge, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-xs font-heading tracking-wide"
                            style={{
                              background: 'rgba(212,175,55,0.25)',
                              color: '#6b4a1e',
                              border: '1px solid rgba(107,74,30,0.2)',
                              borderRadius: '1px',
                            }}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs leading-relaxed mb-2" style={{ color: '#5a4030' }}>
                        {activeAttraction.description}
                      </p>

                      <p
                        className="text-xs italic pl-2.5"
                        style={{
                          color: '#7a5a3a',
                          borderLeft: '2px solid #d4af37',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        Crew tip: {activeAttraction.tip}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 parchment-bg" style={{ borderTop: '1px solid rgba(120,72,20,0.18)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                {/* <div className="inline-flex items-center gap-2 mb-3" style={{ color: '#8b1a1a', fontFamily: 'var(--font-heading)' }}>
                  <Camera className="w-4 h-4" aria-hidden="true" />
                  <span className="uppercase text-xs tracking-widest">Park Photos</span>
                </div> */}
                <h2
                  className="text-3xl md:text-4xl"
                  style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
                >
                  Photos of the Salty Pirate
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed" style={{ color: '#6b4a1e' }}>
                A closer look at the slides, splash areas, sundeck, and arcade your crew can explore between swims.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[230px] gap-3 md:gap-4">
              {galleryPhotos.map((photo, index) => (
                <button
                  key={photo.src}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`group relative overflow-hidden text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    photo.feature ? 'sm:col-span-2 lg:row-span-2' : ''
                  }`}
                  style={{
                    border: '3px solid rgba(120,72,20,0.25)',
                    borderRadius: '3px',
                    boxShadow: '0 8px 22px rgba(30,12,2,0.14)',
                    background: '#2a1810',
                    '--tw-ring-color': '#d4af37',
                    '--tw-ring-offset-color': PARCHMENT,
                  } as React.CSSProperties}
                  aria-label={`View larger photo: ${photo.title}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 p-3 md:p-4"
                    style={{ background: 'linear-gradient(180deg, transparent, rgba(26,14,4,0.88))' }}
                  >
                    <span className="block text-sm md:text-base font-heading font-bold" style={{ color: '#f8edd6' }}>
                      {photo.title}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen map modal */}
      <AnimatePresence>
        {mapFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            style={{ background: 'rgba(10,6,2,0.92)', backdropFilter: 'blur(6px)' }}
            onClick={() => setMapFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative w-full max-w-6xl"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={PARK_MAP_IMAGE}
                alt="Salty Pirate Water Park illustrated map"
                className="w-full h-auto block shadow-2xl"
                style={{ borderRadius: '2px', border: '3px solid rgba(212,175,55,0.4)' }}
                draggable={false}
              />
              <button
                onClick={() => setMapFullscreen(false)}
                className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 cursor-pointer"
                style={{
                  background: 'rgba(26,14,4,0.85)',
                  border: '1px solid rgba(212,175,55,0.5)',
                  borderRadius: '2px',
                }}
                aria-label="Close fullscreen map"
              >
                <Minimize2 className="w-5 h-5" style={{ color: '#d4af37' }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPhoto && selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-3 md:p-8"
            style={{ background: 'rgba(10,6,2,0.94)', backdropFilter: 'blur(6px)' }}
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative w-full max-w-6xl"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                className="block w-full max-h-[82vh] object-contain"
                style={{ borderRadius: '3px', border: '3px solid rgba(212,175,55,0.42)', background: '#120a02' }}
              />

              <div
                className="absolute left-0 right-0 bottom-0 p-4 md:p-5"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(18,10,2,0.92))' }}
              >
                <h3 className="font-heading text-base md:text-xl font-bold" style={{ color: '#f8edd6' }}>
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs md:text-sm mt-1 max-w-2xl" style={{ color: 'rgba(240,221,180,0.76)' }}>
                  {selectedPhoto.alt}
                </p>
              </div>

              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-3 right-3 flex items-center justify-center w-10 h-10 cursor-pointer"
                style={{
                  background: 'rgba(26,14,4,0.85)',
                  border: '1px solid rgba(212,175,55,0.5)',
                  borderRadius: '2px',
                }}
                aria-label="Close photo gallery"
              >
                <X className="w-5 h-5" style={{ color: '#d4af37' }} />
              </button>

              <button
                onClick={showPreviousPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 cursor-pointer"
                style={{
                  background: 'rgba(26,14,4,0.85)',
                  border: '1px solid rgba(212,175,55,0.5)',
                  borderRadius: '2px',
                }}
                aria-label="View previous photo"
              >
                <ChevronLeft className="w-5 h-5" style={{ color: '#d4af37' }} />
              </button>

              <button
                onClick={showNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 cursor-pointer"
                style={{
                  background: 'rgba(26,14,4,0.85)',
                  border: '1px solid rgba(212,175,55,0.5)',
                  borderRadius: '2px',
                }}
                aria-label="View next photo"
              >
                <ChevronRight className="w-5 h-5" style={{ color: '#d4af37' }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
