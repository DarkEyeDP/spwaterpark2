import { UtensilsCrossed, IceCream, ShoppingBag, Palmtree, Cloud, MapPin, ExternalLink, Star } from 'lucide-react';

export function Nearby() {
  const categories = [
    { title: 'Food and Restaurants', icon: UtensilsCrossed, color: 'text-coral-red' },
    { title: 'Ice Cream and Treats', icon: IceCream, color: 'text-pink-500' },
    { title: 'Shopping', icon: ShoppingBag, color: 'text-purple-500' },
    { title: 'Beach Access', icon: Palmtree, color: 'text-green-500' },
    { title: 'Rainy Day Activities', icon: Cloud, color: 'text-blue-500' },
    { title: 'Family Attractions', icon: Star, color: 'text-yellow-500' }
  ];

  const placeholderBusinesses = [
    {
      name: 'Coastal Cafe',
      category: 'Food and Restaurants',
      distance: '0.5 miles',
      description: 'Fresh seafood and family-friendly dining with ocean views.',
      icon: UtensilsCrossed
    },
    {
      name: 'Island Ice Cream Shop',
      category: 'Ice Cream and Treats',
      distance: '0.3 miles',
      description: 'Homemade ice cream and sweet treats for the whole family.',
      icon: IceCream
    },
    {
      name: 'Beachside Market',
      category: 'Shopping',
      distance: '0.8 miles',
      description: 'Local gifts, beach gear, and coastal souvenirs.',
      icon: ShoppingBag
    },
    {
      name: 'Public Beach Access',
      category: 'Beach Access',
      distance: '0.2 miles',
      description: 'Easy beach access with parking and facilities.',
      icon: Palmtree
    },
    {
      name: 'Aquarium & Marine Center',
      category: 'Family Attractions',
      distance: '5 miles',
      description: 'Educational marine exhibits and touch tanks for kids.',
      icon: Star
    },
    {
      name: 'Mini Golf Adventure',
      category: 'Rainy Day Activities',
      distance: '1.2 miles',
      description: 'Indoor and covered mini golf for all weather conditions.',
      icon: Cloud
    }
  ];

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-br from-ocean-navy to-aqua-water text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Nearby Treasures</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Make a full day of Emerald Isle with food, shopping, beach time, and local stops close to the park.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl text-ocean-navy mb-4">
              More Than Just a Water Park
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Salty Pirate Water Park is part of a larger Emerald Isle experience. This page will help families discover nearby businesses and activities before or after their visit. Support local businesses and make a full day of your coastal adventure.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-parchment to-warm-sand">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl text-ocean-navy mb-8 text-center">
              Explore by Category
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-ocean-navy/10 rounded-xl p-4 text-center hover:shadow-lg hover:border-aqua-water transition-all cursor-pointer"
                >
                  <category.icon className={`w-10 h-10 ${category.color} mx-auto mb-3`} />
                  <h3 className="text-sm text-ocean-navy">{category.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-3xl text-ocean-navy mb-8 text-center">
              Featured Local Businesses
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholderBusinesses.map((business, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-white to-seafoam/5 border-2 border-ocean-navy/10 rounded-xl p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-aqua-water/20 rounded-full flex items-center justify-center">
                      <business.icon className="w-6 h-6 text-ocean-navy" />
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {business.distance}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg text-ocean-navy mb-1">{business.name}</h3>
                  <div className="text-xs text-aqua-water mb-3">{business.category}</div>
                  <p className="text-sm text-muted-foreground mb-4">{business.description}</p>

                  <button className="w-full px-4 py-2 bg-ocean-navy text-white rounded-lg hover:bg-aqua-water transition-colors flex items-center justify-center gap-2">
                    Learn More
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground">
                These are placeholder examples. Real local partner businesses will be featured here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gold-treasure/10 to-warm-sand/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-4 border-gold-treasure/30 rounded-xl p-8 text-center">
              <Star className="w-16 h-16 text-gold-treasure mx-auto mb-4" />
              <h2 className="font-heading text-2xl text-ocean-navy mb-3">
                Featured Treasure of the Month
              </h2>
              <p className="text-muted-foreground mb-4">
                Each month, we highlight a special local partner business. This space will showcase their story, offerings, and what makes them special to the Emerald Isle community.
              </p>
              <div className="inline-block px-4 py-2 bg-gold-treasure/20 text-ocean-navy rounded-full text-sm">
                Local Partnership Opportunity
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-2xl text-ocean-navy mb-4">
              Local Business Interested in Partnership?
            </h2>
            <p className="text-muted-foreground mb-6">
              If you are a local Emerald Isle business interested in being featured on our Nearby Treasures page, we would love to hear from you.
            </p>
            <button className="px-8 py-3 bg-coral-red text-white rounded-lg hover:bg-gold-treasure hover:text-ocean-navy transition-colors">
              Contact Us About Partnerships
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
