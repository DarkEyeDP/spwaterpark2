import { Check, Star, Users, Calendar, Clock, Shield } from 'lucide-react';

export function Pricing() {
  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-br from-ocean-navy to-aqua-water text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Pricing and Passes</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Choose the best way for your crew to enjoy the park.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl text-ocean-navy mb-8 text-center">
              Day Tickets
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Ages 6 and Up', price: '$22', icon: Users, badge: 'Most Popular' },
                { title: 'Ages 3 to 5', price: '$17', icon: Users, badge: 'Little Pirates' },
                { title: 'Adults Using Kiddie Pool', price: '$7', icon: Users, detail: 'Must be combined with full-price admission' }
              ].map((ticket, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-parchment to-warm-sand border-2 border-gold-treasure/30 rounded-xl p-6 text-center relative hover:shadow-lg transition-shadow"
                >
                  {ticket.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-coral-red text-white text-sm rounded-full">
                      {ticket.badge}
                    </div>
                  )}
                  <ticket.icon className="w-12 h-12 text-aqua-water mx-auto mt-2 mb-4" />
                  <h3 className="font-heading text-xl text-ocean-navy mb-3">{ticket.title}</h3>
                  <div className="text-4xl font-heading text-coral-red mb-2">{ticket.price}</div>
                  {ticket.detail && (
                    <p className="text-sm text-muted-foreground mt-3">{ticket.detail}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
              <p className="text-ocean-navy">
                <span className="font-heading">Note:</span> Children under 3 are free with paid adult admission.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-seafoam/20 to-aqua-water/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-3xl text-ocean-navy mb-4 text-center">
              Best Value Options
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Save money with our multi-day and season passes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Weekly Pass',
                  price: '$60',
                  period: '7 consecutive days',
                  icon: Calendar,
                  badge: 'Best for Vacations',
                  features: [
                    'Valid for 7 consecutive days',
                    'Unlimited park visits',
                    'Great for beach week',
                    'All ages, one price'
                  ],
                  highlight: false
                },
                {
                  title: 'Season Pass',
                  price: '$125',
                  period: 'Ages 6 and up',
                  icon: Star,
                  badge: 'Best Value',
                  features: [
                    'Valid all season long',
                    'Unlimited visits',
                    'Memorial Day to Labor Day',
                    'Pay for itself in 6 visits'
                  ],
                  highlight: true
                },
                {
                  title: 'Season Pass',
                  price: '$85',
                  period: 'Ages 3 to 5',
                  icon: Star,
                  badge: 'Best for Locals',
                  features: [
                    'Valid all season long',
                    'Unlimited visits',
                    'Perfect for local families',
                    'Great value for repeat visits'
                  ],
                  highlight: false
                }
              ].map((pass, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-8 relative ${
                    pass.highlight
                      ? 'border-4 border-gold-treasure shadow-2xl scale-105'
                      : 'border-2 border-ocean-navy/10 shadow-lg'
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-ocean-navy text-white text-sm rounded-full">
                    {pass.badge}
                  </div>
                  <pass.icon className={`w-12 h-12 mx-auto mt-2 mb-4 ${pass.highlight ? 'text-gold-treasure' : 'text-aqua-water'}`} />
                  <h3 className="font-heading text-2xl text-ocean-navy text-center mb-2">{pass.title}</h3>
                  <div className="text-5xl font-heading text-coral-red text-center mb-2">{pass.price}</div>
                  <p className="text-center text-muted-foreground mb-6">{pass.period}</p>

                  <ul className="space-y-3 mb-6">
                    {pass.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-xl p-8 text-center">
              <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="font-heading text-2xl text-ocean-navy mb-3">
                After 4PM Deal
              </h2>
              <p className="text-3xl font-heading text-coral-red mb-2">$12</p>
              <p className="text-muted-foreground mb-4">
                Tuesday through Sunday, after 4:00 PM
              </p>
              <p className="text-sm text-muted-foreground">
                Come later in the day and enjoy discounted admission. Perfect for afternoon fun without the full-day commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-ocean-navy/5 to-aqua-water/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-coral-red mx-auto mb-4" />
              <h2 className="font-heading text-3xl text-ocean-navy mb-3">
                Military & First Responder Discounts
              </h2>
              <p className="text-muted-foreground">
                Thank you for your service. We offer special discounts for military members and first responders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-blue-200 rounded-xl p-6 text-center">
                <h3 className="font-heading text-xl text-ocean-navy mb-3">Day Ticket Discount</h3>
                <div className="text-4xl font-heading text-coral-red mb-2">$2 OFF</div>
                <p className="text-sm text-muted-foreground">Valid ID required at ticket window</p>
              </div>

              <div className="bg-white border-2 border-blue-200 rounded-xl p-6 text-center">
                <h3 className="font-heading text-xl text-ocean-navy mb-3">Season Pass Discount</h3>
                <div className="text-4xl font-heading text-coral-red mb-2">$10 OFF</div>
                <p className="text-sm text-muted-foreground">Valid ID required at ticket window</p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Discounts apply to active military, veterans, police, fire, and EMS personnel.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl text-ocean-navy mb-4">Payment Information</h2>
            <div className="bg-parchment border-2 border-ocean-navy/10 rounded-xl p-6">
              <p className="text-muted-foreground mb-2">
                Tickets are sold at the park only.
              </p>
              <p className="text-sm text-muted-foreground">
                We accept cash and all major credit cards. No online ticket sales at this time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
