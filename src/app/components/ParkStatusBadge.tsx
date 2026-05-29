import { useState, useEffect } from 'react';
import { getOpenStatus, formatETTime, formatETWeekday, type OpenStatus } from '../utils/parkHours';

export function useLiveOpenStatus(): OpenStatus {
  const [status, setStatus] = useState(() => getOpenStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 1000);
    return () => clearInterval(id);
  }, []);
  return status;
}

function diffParts(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

function pad(n: number) { return String(n).padStart(2, '0'); }

// Small pill — variant='dark' for dark backgrounds (footer), 'light' for parchment cards
export function ParkStatusPill({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const status = useLiveOpenStatus();

  const openColor    = variant === 'light' ? '#166534' : '#4ade80';
  const closedColor  = variant === 'light' ? '#0e7490' : '#67e8f9';
  const dimOpacity   = variant === 'light' ? 0.65 : 0.7;
  const defaultColor = variant === 'light' ? '#5a4030' : 'rgba(245,230,180,0.7)';

  if (status.type === 'open') {
    const { hours, minutes } = diffParts(status.closesAt);
    const closes = formatETTime(status.closesAt);
    return (
      <span style={{ color: openColor, fontFamily: 'var(--font-body)' }}>
        Open Now!
        <span style={{ opacity: dimOpacity }}>
          {' '}· Closes at {closes}
          {hours === 0 && minutes < 30 ? ` (${minutes}m)` : ''}
        </span>
      </span>
    );
  }

  if (status.type === 'closed') {
    const { days, hours, minutes } = diffParts(status.opensAt);
    const day = formatETWeekday(status.opensAt);
    const time = formatETTime(status.opensAt);

    if (status.currentPhase === 2) {
      return (
        <span style={{ color: closedColor, fontFamily: 'var(--font-body)' }}>
          Opens in {pad(hours)}h {pad(minutes)}m
          <span style={{ opacity: dimOpacity }}> · {day} at {time}</span>
        </span>
      );
    }
    return (
      <span style={{ color: closedColor, fontFamily: 'var(--font-body)' }}>
        Opens in {days > 0 ? `${days}d ` : ''}{pad(hours)}h
        <span style={{ opacity: dimOpacity }}> · Open {day}</span>
      </span>
    );
  }

  return <span style={{ color: defaultColor, fontFamily: 'var(--font-body)' }}>Open for the Season</span>;
}

// Full card used in the Home hero
const DARK_WOOD = '#1a0e04';

export function HeroStatusCard() {
  const status = useLiveOpenStatus();

  if (status.type === 'open') {
    const closes = formatETTime(status.closesAt);
    const schedule = status.phase === 1
      ? 'Thru May 31: Sat–Sun 10–6 · Mon 10–5'
      : 'Open every day · Mon 11–5 · Tue–Sun 10–6';
    return (
      <div
        className="mt-5 inline-block mx-auto px-8 py-5 text-center"
        style={{
          background: 'rgba(26,14,4,0.72)',
          border: '1px solid rgba(212,175,55,0.45)',
          borderRadius: '2px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px rgba(212,175,55,0.05)',
        }}
      >
        <div
          className="inline-block px-4 py-1.5 mb-3 text-xs font-heading tracking-widest uppercase"
          style={{ background: 'linear-gradient(135deg, #c1860a, #d4af37)', color: DARK_WOOD, borderRadius: '1px' }}
        >
          Open Now!
        </div>
        <h3
          className="text-2xl"
          style={{ fontFamily: 'var(--font-heading)', color: '#f0ddb4', letterSpacing: '0.06em' }}
        >
          {schedule}
        </h3>
        {status.phase === 1 && (
          <p className="text-sm mt-1" style={{ color: 'rgba(240,221,180,0.65)', fontFamily: 'var(--font-heading)' }}>
            Starting June 5: Open 7 days a week!
          </p>
        )}
        <p className="text-sm mt-2" style={{ color: 'rgba(240,221,180,0.65)', fontFamily: 'var(--font-heading)' }}>
          Closes today at {closes} · Come on in!
        </p>
      </div>
    );
  }

  if (status.type === 'closed') {
    const { days, hours, minutes } = diffParts(status.opensAt);
    const nextDay  = formatETWeekday(status.opensAt);
    const nextTime = formatETTime(status.opensAt);
    const isPhase2 = status.currentPhase === 2;

    const countdownStr = isPhase2
      ? `${pad(hours)}h ${pad(minutes)}m`
      : days > 0
        ? `${days}d ${pad(hours)}h`
        : `${pad(hours)}h ${pad(minutes)}m`;

    const scheduleLines = isPhase2
      ? ['Open every day', 'Mon 11 AM–5 PM · Tue–Sun 10 AM–6 PM']
      : ['Sat–Sun 10 AM–6 PM · Mon 10 AM–5 PM', 'Starting June 5: Open 7 days a week!'];

    return (
      <div
        className="mt-5 inline-block mx-auto px-8 py-5 text-center"
        style={{
          background: 'rgba(26,14,4,0.72)',
          border: '1px solid rgba(212,175,55,0.45)',
          borderRadius: '2px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px rgba(212,175,55,0.05)',
        }}
      >
        <div
          className="inline-block px-4 py-1.5 mb-3 text-xs font-heading tracking-widest uppercase"
          style={{ background: 'linear-gradient(135deg, #0e6b8a, #20b2aa)', color: '#f0fafa', borderRadius: '1px' }}
        >
          Opens in {countdownStr}
        </div>
        <h3
          className="text-2xl"
          style={{ fontFamily: 'var(--font-heading)', color: '#f0ddb4', letterSpacing: '0.06em' }}
        >
          Open {nextDay} at {nextTime}
        </h3>
        {scheduleLines.map((line, i) => (
          <p key={i} className="text-sm mt-1" style={{ color: 'rgba(240,221,180,0.65)', fontFamily: 'var(--font-heading)' }}>
            {line}
          </p>
        ))}
      </div>
    );
  }

  // pre-season / post-season: show nothing (handled by StatusBanner)
  return null;
}

// Live countdown text used inside StatusBanner for in-season-closed state
export function InSeasonCountdownLabel() {
  const status = useLiveOpenStatus();

  if (status.type !== 'closed') return null;

  const { days, hours, minutes, seconds } = diffParts(status.opensAt);
  const nextDay  = formatETWeekday(status.opensAt);
  const nextTime = formatETTime(status.opensAt);
  const isPhase2 = status.currentPhase === 2;

  if (isPhase2) {
    return (
      <span style={{ fontFamily: 'var(--font-body)' }}>
        Opens in&nbsp;
        <span className="tabular-nums">{pad(hours)}h {pad(minutes)}m {pad(seconds)}s</span>
        &nbsp;· {nextDay} at {nextTime}
      </span>
    );
  }

  return (
    <span style={{ fontFamily: 'var(--font-body)' }}>
      Opens in&nbsp;
      {days > 0 && <span>{days}d&nbsp;</span>}
      <span className="tabular-nums">{pad(hours)}h&nbsp;{pad(minutes)}m</span>
      &nbsp;· Open {nextDay} at {nextTime}
    </span>
  );
}
