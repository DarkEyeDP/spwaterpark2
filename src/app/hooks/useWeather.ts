import { useState, useEffect } from 'react';

// Emerald Isle, NC
const LAT = 34.6584;
const LON = -76.9525;

const CACHE_KEY = 'salty_pirate_weather_v1';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

const NWS_HEADERS = {
  'User-Agent': '(saltypiratewater.com, contact@saltypiratewater.com)',
  'Accept': 'application/geo+json',
};

// Events that warrant a "check-back" even if rain chance is moderate
const SEVERE_EVENT_KEYWORDS = [
  'Tornado', 'Thunderstorm', 'Hurricane', 'Tropical Storm',
  'Flash Flood', 'Special Marine', 'Rip Current',
];

export type WeatherStatus = 'perfect' | 'good' | 'caution' | 'check-back';

export interface WeatherData {
  temperature: number;
  rainChance: number;
  shortForecast: string;
  windSpeed: string;
  status: WeatherStatus;
  hasAlert: boolean;
  alertHeadline?: string;
  fetchedAt: number;
}

export interface UseWeatherResult {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

function deriveStatus(temp: number, rainChance: number, hasAlert: boolean): WeatherStatus {
  if (hasAlert || rainChance >= 70) return 'check-back';
  if (rainChance >= 40 || temp < 72) return 'caution';
  if (rainChance >= 20 || temp < 78) return 'good';
  return 'perfect';
}

interface NWSPeriod {
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  probabilityOfPrecipitation?: { value: number | null };
  shortForecast: string;
  windSpeed: string;
}

interface NWSAlertFeature {
  properties?: { event?: string; headline?: string };
}

async function fetchFromNWS(): Promise<WeatherData> {
  // Step 1: Resolve grid point for coordinates
  const pointsRes = await fetch(`https://api.weather.gov/points/${LAT},${LON}`, {
    headers: NWS_HEADERS,
  });
  if (!pointsRes.ok) {
    throw new Error(`NWS points lookup failed (${pointsRes.status})`);
  }
  const pointsJson = await pointsRes.json();
  const hourlyUrl: string = pointsJson.properties.forecastHourly;

  // Step 2: Fetch hourly forecast
  const forecastRes = await fetch(hourlyUrl, { headers: NWS_HEADERS });
  if (!forecastRes.ok) {
    throw new Error(`NWS forecast fetch failed (${forecastRes.status})`);
  }
  const forecastJson = await forecastRes.json();

  // Find the current or next daytime period
  const now = new Date();
  const periods: NWSPeriod[] = forecastJson.properties.periods;
  const current =
    periods.find((p) => new Date(p.endTime) > now && p.isDaytime) ??
    periods[0];

  const temperature: number = current.temperature;
  const rainChance: number = current.probabilityOfPrecipitation?.value ?? 0;
  const shortForecast: string = current.shortForecast;
  const windSpeed: string = current.windSpeed;

  // Step 3: Check for active severe weather alerts
  let hasAlert = false;
  let alertHeadline: string | undefined;
  try {
    const alertsRes = await fetch(
      `https://api.weather.gov/alerts/active?point=${LAT},${LON}`,
      { headers: NWS_HEADERS }
    );
    if (alertsRes.ok) {
      const alertsJson = await alertsRes.json();
      const features: NWSAlertFeature[] = alertsJson.features ?? [];
      const severe = features.find((f) =>
        SEVERE_EVENT_KEYWORDS.some((kw) =>
          f.properties?.event?.includes(kw)
        )
      );
      if (severe) {
        hasAlert = true;
        alertHeadline = severe.properties?.headline;
      }
    }
  } catch {
    // Alerts are bonus info — don't fail the whole fetch if this errors
  }

  return {
    temperature,
    rainChance,
    shortForecast,
    windSpeed,
    status: deriveStatus(temperature, rainChance, hasAlert),
    hasAlert,
    alertHeadline,
    fetchedAt: Date.now(),
  };
}

function readCache(): WeatherData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: WeatherData = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data: WeatherData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Storage might be full or unavailable — not critical
  }
}

export function useWeather(): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refresh = () => {
    try { localStorage.removeItem(CACHE_KEY); } catch { /* ignore */ }
    setLoading(true);
    setError(null);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cached = readCache();
      if (cached) {
        if (!cancelled) {
          setData(cached);
          setLoading(false);
        }
        return;
      }

      try {
        const fresh = await fetchFromNWS();
        if (!cancelled) {
          writeCache(fresh);
          setData(fresh);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Weather unavailable');
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [tick]);

  return { data, loading, error, refresh };
}
