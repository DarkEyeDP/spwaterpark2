import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
  title?: string;
  subtitle?: string;
}

export function Countdown({ targetDate, title = 'Countdown to Opening Day', subtitle = 'The crew returns soon' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-center">
      <h3 className="font-heading text-2xl text-ocean-navy mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{subtitle}</p>

      <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Minutes' },
          { value: timeLeft.seconds, label: 'Seconds' }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 border-2 border-ocean-navy/10">
            <div className="text-3xl md:text-4xl font-heading text-coral-red">
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
