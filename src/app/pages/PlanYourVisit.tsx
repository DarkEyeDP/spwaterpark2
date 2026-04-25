import { Link } from 'react-router';
import { Clock, MapPin, Shirt, Droplets, Sun, Users, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function PlanYourVisit() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Are tickets sold online?',
      answer: 'Tickets are currently sold at the park only. We accept cash and card.'
    },
    {
      question: 'What happens if the weather changes?',
      answer: 'Check the live status banner and weather module before arriving. We may delay opening or close early due to lightning, heavy rain, or unsafe conditions.'
    },
    {
      question: 'Is there a discount after 4PM?',
      answer: 'Yes, day tickets are $12 after 4PM Tuesday through Sunday.'
    },
    {
      question: 'Do you offer military or first responder discounts?',
      answer: 'Yes, we offer $2 off day tickets and $10 off season passes for military members and first responders with valid ID.'
    },
    {
      question: 'Can I bring food and drinks?',
      answer: 'Outside food and non-alcoholic beverages are welcome. We have picnic areas available.'
    },
    {
      question: 'Is there parking?',
      answer: 'Yes, free parking is available on-site.'
    }
  ];

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-br from-ocean-navy to-aqua-water text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Plan Your Visit</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Everything your crew needs before heading to Salty Pirate Water Park.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-aqua-water" />
              <h2 className="font-heading text-3xl text-ocean-navy">Park Hours</h2>
            </div>

            <div className="bg-gradient-to-br from-parchment to-warm-sand border-2 border-gold-treasure/30 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading text-xl text-ocean-navy mb-4">Regular Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Monday</span>
                      <span className="text-ocean-navy">11:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tuesday - Sunday</span>
                      <span className="text-ocean-navy">10:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-heading text-ocean-navy mb-3">Important Notes</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Seasonal hours may change due to weather</li>
                    <li>• Staffing may affect operations</li>
                    <li>• Special events may alter hours</li>
                    <li>• Check live status before heading out</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-seafoam/20 to-aqua-water/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-coral-red" />
              <h2 className="font-heading text-3xl text-ocean-navy">Location & Directions</h2>
            </div>

            <div className="bg-white border-2 border-ocean-navy/10 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-xl text-ocean-navy mb-4">Address</h3>
                  <p className="text-muted-foreground mb-2">
                    Salty Pirate Water Park<br />
                    Emerald Isle, NC<br />
                    Crystal Coast
                  </p>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-ocean-navy text-white rounded-lg hover:bg-aqua-water transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-ocean-navy/5 to-aqua-water/5 rounded-lg p-6 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-16 h-16 mx-auto mb-3 text-aqua-water" />
                    <p>Map placeholder</p>
                    <p className="text-sm mt-2">Interactive map coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl text-ocean-navy mb-8 text-center">What to Bring</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Shirt, title: 'Swimwear', items: ['Swim suits', 'Water shoes', 'Rash guards'] },
                { icon: Sun, title: 'Sun Protection', items: ['Sunscreen', 'Hats', 'Sunglasses'] },
                { icon: Droplets, title: 'Essentials', items: ['Towels', 'Change of clothes', 'Water bottle'] }
              ].map((category, i) => (
                <div key={i} className="bg-gradient-to-br from-parchment to-warm-sand border-2 border-ocean-navy/10 rounded-xl p-6">
                  <category.icon className="w-10 h-10 text-aqua-water mb-4" />
                  <h3 className="font-heading text-lg text-ocean-navy mb-3">{category.title}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {category.items.map((item, j) => (
                      <li key={j}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-ocean-navy/5 to-aqua-water/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-gold-treasure" />
              <h2 className="font-heading text-3xl text-ocean-navy">What to Expect</h2>
            </div>

            <div className="bg-white rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading text-lg text-ocean-navy mb-3">Park Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Three big drop slides</li>
                    <li>• Three mat-ridden hill slides</li>
                    <li>• Kids splash adventure zone</li>
                    <li>• Family seating areas</li>
                    <li>• Relaxation zones</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-ocean-navy mb-3">Good to Know</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Seasonal operations (Memorial Day - Labor Day)</li>
                    <li>• Weather-sensitive operations</li>
                    <li>• Family-friendly environment</li>
                    <li>• Life jackets available</li>
                    <li>• First aid on site</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl text-ocean-navy mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-parchment to-warm-sand border-2 border-ocean-navy/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
                  >
                    <span className="font-heading text-ocean-navy">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-aqua-water transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-muted-foreground">
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
