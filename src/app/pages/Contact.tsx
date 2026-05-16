import { useForm } from 'react-hook-form';
import { useSEO } from '../hooks/useSEO';
import { Phone, Mail, MapPin, Facebook, Instagram, Send, Anchor } from 'lucide-react';
import { toast } from 'sonner';
import { PageHero } from '../components/PageHero';
import { TornEdge } from '../components/TornEdge';

const DARK_WOOD = '#1a0e04';
const PARCHMENT  = '#f0ddb4';
const CREAM      = '#f8edd6';

const PHONE_DISPLAY = '(252) 354-2609';
const PHONE_HREF    = 'tel:+12523542609';
const EMAIL         = 'saltypiratewaterpark@gmail.com';

interface ContactFormData {
  name: string;
  email: string;
  reason: string;
  message: string;
}

interface HiringFormData {
  name: string;
  email: string;
  phone: string;
  age: string;
  position: string;
  cprCert: string;
  lifeguardCert: string;
  availability: string;
  message: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: '#ffffff',
  border: '2px solid rgba(120,72,20,0.25)',
  borderRadius: '2px',
  color: '#2a1810',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '0.4rem',
  fontFamily: 'var(--font-heading)',
  fontSize: '0.8rem',
  color: '#5a4030',
  letterSpacing: '0.04em',
};

export function Contact() {
  useSEO({
    title: 'Contact Us | Salty Pirate Water Park — Emerald Isle, NC',
    description: 'Contact Salty Pirate Water Park in Emerald Isle, NC. Call (252) 354-2609, email us, or fill out our contact form. Seasonal hiring applications also accepted.',
    canonical: '/contact',
  });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const hiringForm = useForm<HiringFormData>();

  const onSubmit = (data: ContactFormData) => {
    const reasonLabels: Record<string, string> = {
      general: 'General Question', hours: 'Hours and Schedule',
      pricing: 'Pricing and Passes', groups: 'Group Bookings',
      partnership: 'Local Business Partnership', other: 'Other',
    };
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Reason: ${reasonLabels[data.reason] ?? data.reason}`,
      ``,
      `Message:`,
      data.message,
    ].join('\n');
    window.location.href =
      `mailto:${EMAIL}?subject=${encodeURIComponent('Website Contact: ' + (reasonLabels[data.reason] ?? data.reason))}&body=${encodeURIComponent(body)}`;
    toast.success('Your email client should open — just hit Send!');
    reset();
  };

  const onHiringSubmit = (data: HiringFormData) => {
    const certLabel = (v: string) => ({ yes: 'Yes', no: 'No', expired: 'Expired / In Progress' }[v] ?? v);
    const posLabel: Record<string, string> = {
      general: 'General Park Staff', lifeguard: 'Lifeguard',
      cashier: 'Ticket / Cashier', any: 'Open to Any',
    };
    const body = [
      `Name: ${data.name}`,
      `Age: ${data.age}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Position: ${posLabel[data.position] ?? data.position}`,
      `CPR Certified: ${certLabel(data.cprCert)}`,
      `Lifeguard Certified: ${certLabel(data.lifeguardCert)}`,
      `Availability: ${data.availability}`,
      ``,
      `Additional Info:`,
      data.message || '(none)',
    ].join('\n');
    window.location.href =
      `mailto:${EMAIL}?subject=${encodeURIComponent('Season Hiring Application: ' + data.name)}&body=${encodeURIComponent(body)}`;
    toast.success('Your email client should open — just hit Send!');
    hiringForm.reset();
  };

  return (
    <div>
      <PageHero
        title="Contact the Crew"
        subtitle="Questions before you visit? Reach out and we'll get back to you."
      />

      <TornEdge fill={PARCHMENT} fromColor={DARK_WOOD} />

      {/* ── Contact Cards ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <a
                href={PHONE_HREF}
                className="aged-card p-6 text-center group hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ borderRadius: '2px' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '2px' }}
                >
                  <Phone className="w-6 h-6" style={{ color: '#d4af37' }} />
                </div>
                <h3 className="font-heading text-lg mb-2" style={{ color: '#2a1810' }}>Phone</h3>
                <p className="text-sm font-heading" style={{ color: '#c1860a' }}>{PHONE_DISPLAY}</p>
                <p className="text-xs mt-2" style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)' }}>Call during park hours</p>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="aged-card p-6 text-center group hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ borderRadius: '2px' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '2px' }}
                >
                  <Mail className="w-6 h-6" style={{ color: '#d4af37' }} />
                </div>
                <h3 className="font-heading text-lg mb-2" style={{ color: '#2a1810' }}>Email</h3>
                <p className="text-xs font-heading break-all" style={{ color: '#c1860a' }}>{EMAIL}</p>
                <p className="text-xs mt-2" style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)' }}>We reply within 24–48 hours</p>
              </a>

              <a
                href="https://maps.google.com/?q=8915+Reed+Dr,+Emerald+Isle,+NC+28594"
                target="_blank"
                rel="noopener noreferrer"
                className="aged-card p-6 text-center group hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ borderRadius: '2px' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '2px' }}
                >
                  <MapPin className="w-6 h-6" style={{ color: '#d4af37' }} />
                </div>
                <h3 className="font-heading text-lg mb-2" style={{ color: '#2a1810' }}>Address</h3>
                <p className="text-sm" style={{ color: '#5a4030', fontFamily: 'var(--font-heading)', lineHeight: '1.7' }}>
                  8915 Reed Dr<br />Emerald Isle, NC 28594
                </p>
              </a>

            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={CREAM} fromColor={PARCHMENT} />

      {/* ── Form + Map ── */}
      <section className="py-14" style={{ background: CREAM }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Form */}
              <div>
                <h2 className="text-3xl mb-6" style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}>
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" style={labelStyle}>Name</label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      style={inputStyle}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" style={labelStyle}>Email</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
                      })}
                      style={inputStyle}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="reason" style={labelStyle}>Reason for Contact</label>
                    <select
                      id="reason"
                      {...register('reason', { required: 'Please select a reason' })}
                      style={inputStyle}
                    >
                      <option value="">Select a reason</option>
                      <option value="general">General Question</option>
                      <option value="hours">Hours and Schedule</option>
                      <option value="pricing">Pricing and Passes</option>
                      <option value="groups">Group Bookings</option>
                      <option value="partnership">Local Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.reason && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{errors.reason.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message"
                      {...register('message', { required: 'Message is required' })}
                      rows={6}
                      style={{ ...inputStyle, resize: 'none' }}
                      placeholder="Tell us what you need..."
                    />
                    {errors.message && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 flex items-center justify-center gap-2 text-sm font-heading tracking-wide transition-all hover:scale-[1.01]"
                    style={{
                      background: `linear-gradient(135deg, #c1860a, #d4af37)`,
                      color: DARK_WOOD,
                      border: '1px solid rgba(212,175,55,0.5)',
                      borderRadius: '2px',
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Map + Social */}
              <div className="space-y-5">
                <div className="aged-card overflow-hidden" style={{ borderRadius: '2px', padding: 0 }}>
                  <iframe
                    title="Salty Pirate Water Park location"
                    src="https://maps.google.com/maps?q=8915+Reed+Dr,+Emerald+Isle,+NC+28594&output=embed"
                    width="100%"
                    height="260"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="p-4">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=8915+Reed+Dr,+Emerald+Isle,+NC+28594"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-5 py-2.5 flex items-center justify-center gap-2 text-sm font-heading tracking-wide transition-all hover:scale-[1.01]"
                      style={{
                        background: DARK_WOOD,
                        color: '#f0ddb4',
                        border: '1px solid rgba(212,175,55,0.35)',
                        borderRadius: '2px',
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                    </a>
                  </div>
                </div>

                <div className="aged-card p-6" style={{ borderRadius: '2px' }}>
                  <h3 className="font-heading text-lg mb-2" style={{ color: '#2a1810' }}>Follow the Crew</h3>
                  <p className="text-sm mb-5" style={{ color: '#5a4030' }}>
                    Stay updated with announcements, weather alerts, and summer fun.
                  </p>
                  <div className="flex gap-3">
                    {[
                      { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
                      { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
                    ].map(({ href, icon: Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-heading tracking-wide transition-all hover:scale-105"
                        style={{
                          background: DARK_WOOD,
                          color: '#f0ddb4',
                          border: '1px solid rgba(212,175,55,0.3)',
                          borderRadius: '2px',
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <TornEdge fill={PARCHMENT} fromColor={CREAM} />

      {/* ── Season Hiring ── */}
      <section className="py-14" style={{ background: PARCHMENT }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            {/* Heading */}
            <div className="flex items-center gap-3 mb-2">
              <Anchor className="w-7 h-7 flex-shrink-0" style={{ color: '#d4af37' }} />
              <h2 className="text-3xl" style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}>
                Join the Crew
              </h2>
            </div>
            <p className="mb-2 text-sm max-w-2xl" style={{ color: '#7a5a3a', fontFamily: 'var(--font-heading)' }}>
              We hire seasonal staff each summer for a fun, active outdoor environment.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-xs font-heading tracking-wide"
              style={{
                background: 'rgba(212,175,55,0.2)',
                border: '1px solid rgba(107,74,30,0.25)',
                color: '#6b4a1e',
                borderRadius: '1px',
              }}
            >
              CPR &amp; lifeguard certifications are a plus — not required
            </div>

            <form onSubmit={hiringForm.handleSubmit(onHiringSubmit)} className="aged-card p-6 md:p-8 space-y-5" style={{ borderRadius: '2px' }}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    {...hiringForm.register('name', { required: 'Required' })}
                    style={inputStyle}
                    placeholder="Your full name"
                  />
                  {hiringForm.formState.errors.name && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{hiringForm.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Age</label>
                  <input
                    type="number"
                    min={14}
                    {...hiringForm.register('age', { required: 'Required' })}
                    style={inputStyle}
                    placeholder="Your age"
                  />
                  {hiringForm.formState.errors.age && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{hiringForm.formState.errors.age.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    {...hiringForm.register('email', {
                      required: 'Required',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                    })}
                    style={inputStyle}
                    placeholder="your@email.com"
                  />
                  {hiringForm.formState.errors.email && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{hiringForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input
                    type="tel"
                    {...hiringForm.register('phone', { required: 'Required' })}
                    style={inputStyle}
                    placeholder="(xxx) xxx-xxxx"
                  />
                  {hiringForm.formState.errors.phone && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{hiringForm.formState.errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Position of Interest</label>
                <select
                  {...hiringForm.register('position', { required: 'Required' })}
                  style={inputStyle}
                >
                  <option value="">Select a position</option>
                  <option value="general">General Park Staff</option>
                  <option value="lifeguard">Lifeguard</option>
                  <option value="cashier">Ticket / Cashier</option>
                  <option value="any">Open to Any</option>
                </select>
                {hiringForm.formState.errors.position && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{hiringForm.formState.errors.position.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label style={labelStyle}>CPR Certified?</label>
                  <select {...hiringForm.register('cprCert')} style={inputStyle}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                    <option value="expired">Expired / In Progress</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Lifeguard Certified?</label>
                  <select {...hiringForm.register('lifeguardCert')} style={inputStyle}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                    <option value="expired">Expired / In Progress</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Availability</label>
                <input
                  type="text"
                  {...hiringForm.register('availability', { required: 'Required' })}
                  style={inputStyle}
                  placeholder="e.g. Weekends only, full summer, after June 15…"
                />
                {hiringForm.formState.errors.availability && <p className="text-xs mt-1" style={{ color: '#ee6352' }}>{hiringForm.formState.errors.availability.message}</p>}
              </div>

              <div>
                <label style={labelStyle}>Anything else we should know?</label>
                <textarea
                  {...hiringForm.register('message')}
                  rows={4}
                  style={{ ...inputStyle, resize: 'none' }}
                  placeholder="Previous experience, questions, or anything else…"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 flex items-center justify-center gap-2 text-sm font-heading tracking-wide transition-all hover:scale-[1.01]"
                style={{
                  background: `linear-gradient(135deg, #c1860a, #d4af37)`,
                  color: DARK_WOOD,
                  border: '1px solid rgba(212,175,55,0.5)',
                  borderRadius: '2px',
                }}
              >
                <Send className="w-4 h-4" />
                Submit Application
              </button>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
