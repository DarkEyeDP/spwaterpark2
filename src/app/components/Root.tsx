import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { StatusBanner } from './StatusBanner';
import { ScrollToTop } from './ScrollToTop';
import { Compass } from './Compass';
import { AnalyticsPageTracker } from './AnalyticsPageTracker';
import { HeroWeatherProvider } from '../context/HeroWeatherContext';
import { getOpenStatus } from '../utils/parkHours';
import type { ParkStatus } from './StatusBanner';

function computeParkStatus(): ParkStatus {
  const s = getOpenStatus();
  if (s.type === 'pre-season')  return 'opening-soon';
  if (s.type === 'post-season') return 'season-closed';
  if (s.type === 'open')        return 'open';
  return 'in-season-closed';
}

function useLiveParkStatus(): ParkStatus {
  const [status, setStatus] = useState(computeParkStatus);
  useEffect(() => {
    const id = setInterval(() => setStatus(computeParkStatus()), 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

export function Root() {
  const status = useLiveParkStatus();

  return (
    <HeroWeatherProvider>
      <AnalyticsPageTracker />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <StatusBanner status={status} />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <div
        className="fixed bottom-5 left-5 z-50 hidden lg:block opacity-70 hover:opacity-100 transition-opacity"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))' }}
      >
        <Compass size={72} />
      </div>
    </HeroWeatherProvider>
  );
}
