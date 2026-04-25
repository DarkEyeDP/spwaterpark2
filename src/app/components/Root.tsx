import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { StatusBanner } from './StatusBanner';
import { ScrollToTop } from './ScrollToTop';
import { HeroWeatherProvider } from '../context/HeroWeatherContext';
import type { ParkStatus } from './StatusBanner';

function getParkStatus(): ParkStatus {
  const now = new Date();
  const year = now.getFullYear();
  const openingDay = new Date(year, 4, 25); // May 25
  const closingDay = new Date(year, 8, 8);  // Sept 8 (day after Labor Day weekend)

  if (now < openingDay) return 'opening-soon';
  if (now >= closingDay) return 'season-closed';
  return 'open';
}

export function Root() {
  const status = getParkStatus();

  return (
    <HeroWeatherProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <StatusBanner status={status} />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </HeroWeatherProvider>
  );
}
