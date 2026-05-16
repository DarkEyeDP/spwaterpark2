import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const BASE_DOMAIN = 'https://www.saltypiratewaterpark.com';
const OG_IMAGE = `${BASE_DOMAIN}/beach-background.jpg`;

export function useSEO({ title, description, canonical, ogTitle, ogDescription }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const attr = selector.startsWith('meta[name') ? 'name' : 'property';
        const val = selector.match(/"([^"]+)"/)?.[1] ?? '';
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('meta[name="description"]', description);

    const resolvedOgTitle = ogTitle ?? title;
    const resolvedOgDesc  = ogDescription ?? description;
    const resolvedCanonical = canonical ? `${BASE_DOMAIN}${canonical}` : BASE_DOMAIN;

    setMeta('meta[property="og:title"]',       resolvedOgTitle);
    setMeta('meta[property="og:description"]', resolvedOgDesc);
    setMeta('meta[property="og:url"]',         resolvedCanonical);
    setMeta('meta[property="og:image"]',       OG_IMAGE);
    setMeta('meta[name="twitter:title"]',       resolvedOgTitle);
    setMeta('meta[name="twitter:description"]', resolvedOgDesc);

    let canonical_el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical_el) {
      canonical_el = document.createElement('link');
      canonical_el.rel = 'canonical';
      document.head.appendChild(canonical_el);
    }
    canonical_el.href = resolvedCanonical;
  }, [title, description, canonical, ogTitle, ogDescription]);
}
