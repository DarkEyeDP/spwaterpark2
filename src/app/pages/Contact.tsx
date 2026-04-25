import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Facebook, Instagram, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  reason: string;
  message: string;
}

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Form submission:', data);
    toast.success('Message sent! We will get back to you soon.');
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="bg-cream">
      <section className="bg-gradient-to-br from-ocean-navy to-aqua-water text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-4">Contact the Crew</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Questions before you visit? Reach out or follow along for the latest updates.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-parchment to-warm-sand border-2 border-ocean-navy/10 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-aqua-water/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-ocean-navy" />
                </div>
                <h3 className="font-heading text-lg text-ocean-navy mb-2">Phone</h3>
                <p className="text-muted-foreground">(252) 555-WAVE</p>
                <p className="text-xs text-muted-foreground mt-2">Call during park hours</p>
              </div>

              <div className="bg-gradient-to-br from-parchment to-warm-sand border-2 border-ocean-navy/10 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-aqua-water/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-ocean-navy" />
                </div>
                <h3 className="font-heading text-lg text-ocean-navy mb-2">Email</h3>
                <p className="text-muted-foreground">info@saltypiratepark.com</p>
                <p className="text-xs text-muted-foreground mt-2">We reply within 24-48 hours</p>
              </div>

              <div className="bg-gradient-to-br from-parchment to-warm-sand border-2 border-ocean-navy/10 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-aqua-water/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-ocean-navy" />
                </div>
                <h3 className="font-heading text-lg text-ocean-navy mb-2">Address</h3>
                <p className="text-muted-foreground">
                  Emerald Isle, NC<br />
                  Crystal Coast
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-seafoam/20 to-aqua-water/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="font-heading text-3xl text-ocean-navy mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-ocean-navy mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-ocean-navy/20 focus:border-aqua-water focus:outline-none bg-white"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-coral-red text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-ocean-navy mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-ocean-navy/20 focus:border-aqua-water focus:outline-none bg-white"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-coral-red text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reason" className="block text-ocean-navy mb-2">
                      Reason for Contact
                    </label>
                    <select
                      id="reason"
                      {...register('reason', { required: 'Please select a reason' })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-ocean-navy/20 focus:border-aqua-water focus:outline-none bg-white"
                    >
                      <option value="">Select a reason</option>
                      <option value="general">General Question</option>
                      <option value="hours">Hours and Schedule</option>
                      <option value="pricing">Pricing and Passes</option>
                      <option value="groups">Group Bookings</option>
                      <option value="partnership">Local Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.reason && (
                      <p className="text-coral-red text-sm mt-1">{errors.reason.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-ocean-navy mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      {...register('message', { required: 'Message is required' })}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border-2 border-ocean-navy/20 focus:border-aqua-water focus:outline-none bg-white resize-none"
                      placeholder="Tell us what you need..."
                    />
                    {errors.message && (
                      <p className="text-coral-red text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-coral-red text-white rounded-lg hover:bg-gold-treasure hover:text-ocean-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              <div className="space-y-6">
                <div className="bg-white border-2 border-ocean-navy/10 rounded-xl p-6">
                  <h3 className="font-heading text-xl text-ocean-navy mb-4">Visit Us</h3>
                  <div className="bg-gradient-to-br from-ocean-navy/5 to-aqua-water/5 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-16 h-16 mx-auto mb-3 text-aqua-water" />
                      <p>Interactive map placeholder</p>
                      <p className="text-sm mt-2">Get directions to the park</p>
                    </div>
                  </div>

                  <button className="w-full mt-4 px-6 py-3 bg-ocean-navy text-white rounded-lg hover:bg-aqua-water transition-colors flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>

                <div className="bg-gradient-to-br from-parchment to-warm-sand border-2 border-gold-treasure/30 rounded-xl p-6">
                  <h3 className="font-heading text-xl text-ocean-navy mb-4">Follow the Crew</h3>
                  <p className="text-muted-foreground mb-4">
                    Stay updated with real-time announcements, weather alerts, and summer fun on social media.
                  </p>

                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-3 bg-ocean-navy text-white rounded-lg hover:bg-aqua-water transition-colors flex items-center justify-center gap-2"
                    >
                      <Facebook className="w-5 h-5" />
                      Facebook
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-3 bg-ocean-navy text-white rounded-lg hover:bg-aqua-water transition-colors flex items-center justify-center gap-2"
                    >
                      <Instagram className="w-5 h-5" />
                      Instagram
                    </a>
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
