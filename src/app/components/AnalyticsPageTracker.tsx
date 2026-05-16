import { useEffect } from 'react';
import { useLocation } from 'react-router';

const GA_MEASUREMENT_ID = 'G-1EHBKZC5PD';

type GtagCommand = 'config' | 'event' | 'js' | 'set';

type Gtag = (command: GtagCommand, targetId: string | Date, config?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function AnalyticsPageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    const pagePath = `${location.pathname}${location.search}${location.hash}`;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location]);

  return null;
}
