import { useState, useEffect, type ReactNode } from 'react';
import { AlertCircle, CheckCircle, Clock, CloudRain } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type ParkStatus = 'open' | 'closed' | 'weather-delay' | 'opening-soon' | 'season-closed';

interface StatusBannerProps {
  status: ParkStatus;
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function OpeningCountdown() {
  const target = new Date('2026-05-25T10:00:00');
  const { days, hours, minutes, seconds } = useCountdown(target);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <span style={{ fontFamily: 'var(--font-body)' }}>
      Opens in&nbsp;
      <span className="opacity-100">{days}d&nbsp;</span>
      <span className="opacity-100">{pad(hours)}h&nbsp;</span>
      <span className="opacity-100">{pad(minutes)}m&nbsp;</span>
      <span className="opacity-100 tabular-nums">{pad(seconds)}s</span>
    </span>
  );
}

const STATUS_CONFIG: Record<ParkStatus, {
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  textColor: string;
  label: string;
  messages: ReactNode[];
}> = {
  'open': {
    icon: CheckCircle,
    bgColor: 'bg-green-500',
    textColor: 'text-green-50',
    label: 'Open Now!',
    messages: [
      'We are open! Come on in — the water is fine!',
      'Thru May 31: Sat–Sun 10 AM–6 PM · Mon 10 AM–5 PM',
      'Starting June 5: Open 7 days a week!',
      'Jun 5+: Tue–Sun 10 AM–6 PM · Mon 11 AM–5 PM',
    ],
  },
  'closed': {
    icon: AlertCircle,
    bgColor: 'bg-red-500',
    textColor: 'text-red-50',
    label: 'Closed',
    messages: [
      'The park is closed today. Check back tomorrow!',
      "We'll be back soon — stay salty!",
    ],
  },
  'weather-delay': {
    icon: CloudRain,
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-50',
    label: 'Weather Delay',
    messages: [
      'Weather may impact park operations today.',
      'Check back shortly for updates.',
      "Safety first — we'll open as soon as it's clear.",
    ],
  },
  'opening-soon': {
    icon: Clock,
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-50',
    label: 'Opening Soon',
    messages: [
      <OpeningCountdown key="countdown" />,
      'The crew returns Memorial Day weekend!',
      'Opening day is May 25th — mark your map!',
      'Follow us for opening day announcements.',
    ],
  },
  'season-closed': {
    icon: AlertCircle,
    bgColor: 'bg-gray-600',
    textColor: 'text-gray-50',
    label: 'Season Closed',
    messages: [
      'See you next season!',
      'Thanks for a great summer, mateys.',
      'Follow us for updates on next year\'s opening.',
    ],
  },
};

export function StatusBanner({ status }: StatusBannerProps) {
  const config = STATUS_CONFIG[status];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (config.messages.length <= 1) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % config.messages.length);
    }, 6000);
    return () => clearInterval(id);
  }, [config.messages.length]);

  return (
    <div className={`${config.bgColor} ${config.textColor} py-2 px-4`} style={{ borderBottom: '1px solid rgba(212,175,55,0.3)' }}>
      <div className="overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-0.5">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm font-medium">{config.label}</span>
            <span className="opacity-50 text-sm select-none">·</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              className="text-sm opacity-90 whitespace-nowrap"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%',   opacity: 1 }}
              exit={{    y: '-100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {config.messages[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
