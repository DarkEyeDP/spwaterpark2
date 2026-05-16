import { Sun, Cloud, CloudRain, AlertTriangle, Loader2 } from 'lucide-react';
import { useWeather, type WeatherStatus } from '../hooks/useWeather';

const ICON_MAP: Record<WeatherStatus, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  perfect: Sun,
  good: Cloud,
  caution: CloudRain,
  'check-back': AlertTriangle,
};

const COLOR_MAP: Record<WeatherStatus, string> = {
  perfect: '#d4af37',
  good: '#20b2aa',
  caution: '#c1860a',
  'check-back': '#ee6352',
};

const LABEL_MAP: Record<WeatherStatus, string> = {
  perfect: 'Perfect Day',
  good: 'Good Conditions',
  caution: 'Weather Caution',
  'check-back': 'Check Before You Go',
};

interface WeatherChipProps {
  compact?: boolean;
}

export function WeatherChip({ compact = false }: WeatherChipProps) {
  const { data, loading } = useWeather();

  if (loading) {
    if (compact) {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5">
          <Loader2
            className="w-3.5 h-3.5 animate-spin"
            style={{ color: 'rgba(240,221,180,0.45)' }}
          />
          <span
            className="text-xs"
            style={{ color: 'rgba(240,221,180,0.45)', fontFamily: 'var(--font-heading)' }}
          >
            Loading weather…
          </span>
        </div>
      );
    }
    // Hero skeleton
    return (
      <div
        className="inline-flex items-center gap-3 px-6 py-3 animate-pulse"
        style={{
          background: 'rgba(240,221,180,0.07)',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '2px',
        }}
      >
        <div className="w-4 h-4 rounded-full bg-amber-200/30" />
        <div className="h-3 w-32 rounded bg-amber-200/30" />
        <div className="h-3 w-16 rounded bg-amber-200/20" />
      </div>
    );
  }

  if (!data) return null;

  const Icon = ICON_MAP[data.status];
  const color = COLOR_MAP[data.status];
  const label = LABEL_MAP[data.status];

  if (compact) {
    return (
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{
          background: 'rgba(240,221,180,0.07)',
          border: '1px solid rgba(212,175,55,0.18)',
          borderRadius: '2px',
        }}
      >
        <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
        <span
          className="text-xs tracking-wide"
          style={{ color: '#f0ddb4', fontFamily: 'var(--font-heading)' }}
        >
          {data.temperature}°F
        </span>
        <span
          className="text-xs hidden sm:inline"
          style={{ color: 'rgba(240,221,180,0.55)', fontFamily: 'var(--font-heading)' }}
        >
          · {data.rainChance}% rain
        </span>
      </div>
    );
  }

  // Hero chip — wider, more info
  return (
    <div
      className="inline-flex items-center gap-3 px-5 py-3"
      style={{
        background: 'rgba(26,14,4,0.75)',
        border: '1px solid rgba(212,175,55,0.45)',
        borderRadius: '2px',
        backdropFilter: 'blur(6px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
      }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
      <span
        className="text-sm font-medium"
        style={{ color, fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}
      >
        {label}
      </span>
      <span
        className="text-xs"
        style={{ color: 'rgba(240,221,180,0.4)', fontFamily: 'var(--font-heading)' }}
      >
        ·
      </span>
      <span
        className="text-sm"
        style={{ color: 'rgba(240,221,180,0.9)', fontFamily: 'var(--font-heading)' }}
      >
        {data.temperature}°F
      </span>
      <span
        className="text-xs"
        style={{ color: 'rgba(240,221,180,0.4)', fontFamily: 'var(--font-heading)' }}
      >
        ·
      </span>
      <span
        className="text-sm"
        style={{ color: 'rgba(240,221,180,0.8)', fontFamily: 'var(--font-heading)' }}
      >
        {data.rainChance}% rain
      </span>
    </div>
  );
}
