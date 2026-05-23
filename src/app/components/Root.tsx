import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { StatusBanner } from './StatusBanner';
import { ScrollToTop } from './ScrollToTop';
import { Compass } from './Compass';
import { AnalyticsPageTracker } from './AnalyticsPageTracker';
import { HeroWeatherProvider } from '../context/HeroWeatherContext';
import type { ParkStatus } from './StatusBanner';

function getParkStatus(): ParkStatus {
  const now = new Date();
  const year = now.getFullYear();
  const openingDay = new Date(year, 4, 23); // May 23
  const closingDay = new Date(year, 8, 8);  // Sept 8 (day after Labor Day weekend)

  if (now < openingDay) return 'opening-soon';
  if (now >= closingDay) return 'season-closed';
  return 'open';
}

export function Root() {
  const status = getParkStatus();

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
