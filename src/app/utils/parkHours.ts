export type OpenStatus =
  | { type: 'pre-season' }
  | { type: 'post-season' }
  | { type: 'open'; closesAt: Date; phase: 1 | 2 }
  | { type: 'closed'; opensAt: Date; phase: 1 | 2; currentPhase: 1 | 2 };

interface ETComponents {
  year: number;
  month: number; // 1-based
  day: number;
  dow: number;   // 0=Sun … 6=Sat
  hour: number;
  minute: number;
}

const DOW_MAP: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

function getETComponents(date: Date): ETComponents {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
    hour12: false,
  }).formatToParts(date);

  const p: Record<string, string> = {};
  for (const part of parts) p[part.type] = part.value;

  return {
    year: parseInt(p.year),
    month: parseInt(p.month),
    day: parseInt(p.day),
    dow: DOW_MAP[p.weekday] ?? 0,
    hour: parseInt(p.hour) % 24, // some engines return "24" for midnight
    minute: parseInt(p.minute),
  };
}

// Park season runs entirely during EDT (UTC-4)
function makeETTime(year: number, month: number, day: number, hour: number): Date {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  const h = String(hour).padStart(2, '0');
  return new Date(`${year}-${m}-${d}T${h}:00:00-04:00`);
}

// Phase 1: Sat–Sun–Mon only (through May 31)
// Phase 2: 7 days a week (starting June 5)
function getPhaseForDate(year: number, month: number, day: number): 1 | 2 {
  if (month > 6 || (month === 6 && day >= 5)) return 2;
  return 1;
}

function getOpenHour(dow: number, phase: 1 | 2): number | null {
  if (phase === 2) return dow === 1 ? 11 : 10;
  // Phase 1: Sat(6), Sun(0), Mon(1) only
  if (dow === 6 || dow === 0 || dow === 1) return 10;
  return null;
}

function getCloseHour(dow: number): number {
  return dow === 1 ? 17 : 18;
}

function findNextOpening(now: Date): { opensAt: Date; phase: 1 | 2 } {
  for (let daysAhead = 0; daysAhead <= 8; daysAhead++) {
    const check = new Date(now.getTime() + daysAhead * 86_400_000);
    const et = getETComponents(check);
    const phase = getPhaseForDate(et.year, et.month, et.day);
    const openHour = getOpenHour(et.dow, phase);
    if (openHour === null) continue;

    const openTime = makeETTime(et.year, et.month, et.day, openHour);
    const closeTime = makeETTime(et.year, et.month, et.day, getCloseHour(et.dow));

    if (now >= closeTime) continue; // already closed today
    if (now < openTime) return { opensAt: openTime, phase };
    // now >= openTime means currently open — caller should not reach here
  }

  // Fallback (should never hit during normal season)
  const et = getETComponents(new Date(now.getTime() + 7 * 86_400_000));
  return { opensAt: makeETTime(et.year, et.month, et.day, 10), phase: 1 };
}

export function getOpenStatus(now: Date = new Date()): OpenStatus {
  const et = getETComponents(now);
  const seasonStart = makeETTime(et.year, 5, 23, 0); // May 23
  const seasonEnd   = makeETTime(et.year, 9, 8, 0);  // Sept 8

  if (now < seasonStart) return { type: 'pre-season' };
  if (now >= seasonEnd)  return { type: 'post-season' };

  const currentPhase = getPhaseForDate(et.year, et.month, et.day);
  const openHour = getOpenHour(et.dow, currentPhase);

  if (openHour !== null) {
    const openTime  = makeETTime(et.year, et.month, et.day, openHour);
    const closeTime = makeETTime(et.year, et.month, et.day, getCloseHour(et.dow));
    if (now >= openTime && now < closeTime) {
      return { type: 'open', closesAt: closeTime, phase: currentPhase };
    }
  }

  const { opensAt, phase } = findNextOpening(now);
  return { type: 'closed', opensAt, phase, currentPhase };
}

// Helpers for display
export function formatETTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date).replace(':00', '').toLowerCase();
}

export function formatETWeekday(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long',
  }).format(date);
}
