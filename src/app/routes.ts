import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { Home } from './pages/Home';
import { PlanYourVisit } from './pages/PlanYourVisit';
import { Explore } from './pages/Explore';
import { Pricing } from './pages/Pricing';
import { Nearby } from './pages/Nearby';
import { Updates } from './pages/Updates';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { SiteMap } from './pages/SiteMap';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'plan-your-visit', Component: PlanYourVisit },
      { path: 'explore', Component: Explore },
      { path: 'pricing', Component: Pricing },
      { path: 'nearby', Component: Nearby },
      { path: 'updates', Component: Updates },
      { path: 'contact', Component: Contact },
      { path: 'site-map', Component: SiteMap },
      { path: 'privacy-policy', Component: PrivacyPolicy },
      { path: '*', Component: NotFound },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});
