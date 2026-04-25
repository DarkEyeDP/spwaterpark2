import { Sun, Cloud, CloudRain, AlertTriangle, Wind, RefreshCw, Anchor } from 'lucide-react';
import { useWeather, type WeatherStatus } from '../hooks/useWeather';

const STATUS_CONFIG: Record<
  WeatherStatus,
  {
    Icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    label: string;
    message: string;
    border: string;
    accent: string;
  }
> = {
  perfect: {
    Icon: Sun,
    iconColor: '#d4af37',
    label: 'Perfect Day to Visit',
    message: 'Ideal conditions for water park fun. Grab your crew and go.',
    border: 'rgba(212,175,55,0.4)',
    accent: '#c1860a',
  },
  good: {
    Icon: Cloud,
    iconColor: '#20b2aa',
    label: 'Still Worth It',
    message: 'Good conditions with some clouds. Should be a solid day out.',
    border: 'rgba(32,178,170,0.4)',
    accent: '#20b2aa',
  },
  caution: {
    Icon: CloudRain,
    iconColor: '#8b6914',
    label: 'Weather May Impact Experience',
    message: 'Check live park status before heading out. Conditions are iffy.',
    border: 'rgba(139,105,20,0.4)',
    accent: '#8b6914',
  },
  'check-back': {
    Icon: AlertTriangle,
    iconColor: '#ee6352',
    label: 'Check Back Before Heading Out',
    message: 'Weather conditions may affect park operations today.',
    border: 'rgba(238,99,82,0.5)',
    accent: '#ee6352',
  },
};

function Skeleton() {
  return (
    <div
      className="p-6 flex flex-col gap-4 animate-pulse"
      style={{
        background: '#f8edd6',
        border: '2px solid rgba(120,72,20,0.2)',
        borderRadius: '2px',
        boxShadow: '3px 3px 10px rgba(0,0,0,0.12)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-amber-200/60" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-amber-200/60 rounded w-48" />
          <div className="h-4 bg-amber-200/40 rounded w-32" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-20 bg-amber-200/40 rounded" />
        <div className="h-20 bg-amber-200/40 rounded" />
      </div>
      <div className="h-4 bg-amber-200/30 rounded w-3/4" />
    </div>
  );
}

export function CaptainsForecast() {
  const { data, loading, error, refresh } = useWeather();

  if (loading) return <Skeleton />;

  if (error || !data) {
    return (
      <div
        className="p-6 text-center"
        style={{
          background: '#f8edd6',
          border: '2px solid rgba(120,72,20,0.2)',
          borderRadius: '2px',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.12)',
        }}
      >
        <Anchor className="w-8 h-8 mx-auto mb-3 opacity-40" style={{ color: '#6b4a1e' }} />
        <p className="font-heading text-sm mb-3" style={{ color: '#5a4030' }}>
          The captain's spyglass is foggy right now.
        </p>
        <p className="text-xs mb-4" style={{ color: '#8a6a4a', fontFamily: 'var(--font-body)' }}>
          Weather data temporarily unavailable.
        </p>
        <button
          onClick={refresh}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-heading tracking-wide transition-all hover:scale-105"
          style={{
            background: '#2a1810',
            color: '#f0ddb4',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '2px',
          }}
        >
          <RefreshCw className="w-3 h-3" />
          Try Again
        </button>
      </div>
    );
  }

  const config = STATUS_CONFIG[data.status];
  const { Icon } = config;

  const fetchedDate = new Date(data.fetchedAt);
  const timeStr = fetchedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return (
    <div
      className="p-6"
      style={{
        background: '#f8edd6',
        border: `2px solid ${config.border}`,
        borderRadius: '2px',
        boxShadow: '3px 3px 10px rgba(0,0,0,0.15), inset 0 0 24px rgba(120,72,20,0.05)',
      }}
    >
      {/* Alert banner */}
      {data.hasAlert && data.alertHeadline && (
        <div
          className="mb-4 px-4 py-3 flex items-start gap-2 text-sm"
          style={{
            background: 'rgba(238,99,82,0.12)',
            border: '1px solid rgba(238,99,82,0.4)',
            borderRadius: '2px',
            color: '#c0392b',
            fontFamily: 'var(--font-heading)',
          }}
        >
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{data.alertHeadline}</span>
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Status icon */}
        <div
          className="p-3 flex-shrink-0"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: `1px solid ${config.border}`,
            borderRadius: '2px',
          }}
        >
          <Icon className="w-8 h-8" style={{ color: config.iconColor }} />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="text-xs tracking-widest uppercase mb-1"
            style={{ color: '#8a6a4a', fontFamily: 'var(--font-heading)' }}
          >
            Captain's Forecast
          </p>
          <h3
            className="text-xl mb-1"
            style={{ color: '#2a1810', fontFamily: 'var(--font-display)' }}
          >
            {config.label}
          </h3>
          <p className="text-sm mb-4" style={{ color: '#5a4030', fontFamily: 'var(--font-body)' }}>
            {config.message}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Temperature', value: `${data.temperature}°F` },
              { label: 'Rain Chance', value: `${data.rainChance}%` },
              { label: 'Wind', value: data.windSpeed },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center py-3 px-2"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(120,72,20,0.18)',
                  borderRadius: '2px',
                }}
              >
                <div
                  className="text-xs uppercase tracking-wide mb-1"
                  style={{ color: '#8a6a4a', fontFamily: 'var(--font-heading)' }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-xl"
                  style={{ color: config.accent, fontFamily: 'var(--font-display)' }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Forecast text + meta */}
          <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs italic" style={{ color: '#8a6a4a', fontFamily: 'var(--font-body)' }}>
              {data.shortForecast} — Emerald Isle, NC
            </p>
            <button
              onClick={refresh}
              className="inline-flex items-center gap-1 text-xs transition-all hover:opacity-70"
              style={{ color: '#8a6a4a', fontFamily: 'var(--font-heading)' }}
              title="Refresh weather"
            >
              <RefreshCw className="w-3 h-3" />
              Updated {timeStr}
            </button>
          </div>

          {/* Wind detail */}
          {data.windSpeed && (
            <div
              className="mt-2 flex items-center gap-1 text-xs"
              style={{ color: '#8a6a4a', fontFamily: 'var(--font-body)' }}
            >
              <Wind className="w-3 h-3" />
              {data.windSpeed}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
