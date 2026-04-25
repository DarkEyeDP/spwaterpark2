import { Droplet, Waves, Users, MapPin, Zap, Heart, Smile } from 'lucide-react';

export function Explore() {
  const attractions = [
    {
      id: 'big-drops',
      icon: Droplet,
      title: 'Three Big Drop Slides',
      description: 'Three fast, exciting slides for bigger kids and thrill seekers. Feel the rush as you plunge down these vertical drops into the refreshing pools below.',
      badges: ['High Energy', 'Best for Bigger Kids'],
      color: 'text-coral-red'
    },
    {
      id: 'hill-slides',
      icon: Waves,
      title: 'Three Longer Mat-Ridden Hill Slides',
      description: 'Longer rides from the top of the hill, built for racing, gliding, and repeat runs. Grab a mat and challenge your crew to a race down the slopes.',
      badges: ['Good for Families', 'Racing Fun'],
      color: 'text-aqua-water'
    },
    {
      id: 'splash-zone',
      icon: Users,
      title: 'Kids Splash Adventure Zone',
      description: 'A cute splash area built for younger pirates and families. Safe, shallow water features with fountains, sprayers, and mini slides.',
      badges: ['Best for Young Kids', 'Family Friendly'],
      color: 'text-gold-treasure'
    },
    {
      id: 'pools',
      icon: MapPin,
      title: 'Pool and Landing Areas',
      description: 'Cool off, splash around, and regroup between adventures. Multiple pool areas provide space for swimming and relaxing.',
      badges: ['Relax and Watch', 'All Ages'],
      color: 'text-seafoam'
    }
  ];

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-br from-ocean-navy to-aqua-water text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Explore the Park</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Tap the map, discover the slides, and plan your first stop.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl text-ocean-navy mb-4">Interactive Park Map</h2>
              <p className="text-muted-foreground">
                Custom illustrated top-view map with clickable hotspots coming soon.
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-aqua-water/10 to-seafoam/20 border-4 border-ocean-navy/20 rounded-2xl p-12 md:p-20 min-h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMiwzNSw2NCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

              <div className="relative text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-ocean-navy/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-aqua-water" />
                </div>
                <h3 className="font-heading text-2xl text-ocean-navy mb-3">Map Preview</h3>
                <p className="text-muted-foreground max-w-md">
                  An illustrated top-view park map with interactive hotspots will be featured here. Desktop users can hover, mobile users can tap to explore each attraction.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-2xl mx-auto">
                  {[
                    { label: 'Big Drops', icon: Zap },
                    { label: 'Hill Slides', icon: Waves },
                    { label: 'Splash Zone', icon: Smile },
                    { label: 'Pool Areas', icon: Heart }
                  ].map((spot, i) => (
                    <div
                      key={i}
                      className="bg-white border-2 border-ocean-navy/20 rounded-lg p-3 hover:border-aqua-water hover:shadow-lg transition-all cursor-pointer"
                    >
                      <spot.icon className="w-6 h-6 text-aqua-water mx-auto mb-2" />
                      <div className="text-sm text-ocean-navy">{spot.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-parchment to-warm-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl text-ocean-navy mb-12 text-center">
              Attraction Details
            </h2>

            <div className="space-y-8">
              {attractions.map((attraction, index) => (
                <div
                  key={attraction.id}
                  className={`bg-white border-2 border-ocean-navy/10 rounded-xl overflow-hidden hover:shadow-xl transition-shadow ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex flex-col md:flex`}
                >
                  <div className="flex-1 p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-aqua-water/20 to-seafoam/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <attraction.icon className={`w-8 h-8 ${attraction.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl text-ocean-navy mb-2">
                          {attraction.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {attraction.badges.map((badge, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gold-treasure/20 text-ocean-navy text-xs rounded-full"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {attraction.description}
                    </p>
                  </div>

                  <div className="w-full md:w-80 bg-gradient-to-br from-aqua-water/10 to-seafoam/20 flex items-center justify-center p-12">
                    <div className="text-center text-muted-foreground">
                      <attraction.icon className={`w-20 h-20 mx-auto mb-3 ${attraction.color}`} />
                      <p className="text-sm">Photo placeholder</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl text-ocean-navy mb-8 text-center">
              Family Guidance
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Best for Young Kids', icon: Smile, color: 'bg-green-100 text-green-700' },
                { label: 'Best for Bigger Kids', icon: Zap, color: 'bg-orange-100 text-orange-700' },
                { label: 'Good for Families', icon: Heart, color: 'bg-pink-100 text-pink-700' },
                { label: 'High Energy', icon: Droplet, color: 'bg-red-100 text-red-700' },
                { label: 'Relax and Watch', icon: Users, color: 'bg-blue-100 text-blue-700' },
                { label: 'Racing Fun', icon: Waves, color: 'bg-purple-100 text-purple-700' }
              ].map((badge, i) => (
                <div
                  key={i}
                  className={`${badge.color} rounded-lg p-4 text-center`}
                >
                  <badge.icon className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
