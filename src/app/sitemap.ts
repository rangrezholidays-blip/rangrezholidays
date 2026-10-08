import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/seoData';
import { TOUR_PACKAGES } from '@/data/toursData';
import { DESTINATIONS_DATA } from '@/data/destinationsData';
import { TRAVEL_STYLES_DATA } from '@/data/travelStylesData';

// Update this date when page content meaningfully changes.
const LAST_MODIFIED = new Date('2026-10-07');

type Entry = MetadataRoute.Sitemap[number];

// Generated from the same data files that build the pages, so the sitemap
// can never list a URL that does not exist (or miss one that does).
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    changeFrequency: Entry['changeFrequency'],
    priority: number
  ): Entry => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  });

  return [
    page('/', 'daily', 1.0),
    page('/tours', 'weekly', 0.9),
    page('/taxi', 'weekly', 0.9),
    page('/destinations', 'weekly', 0.85),
    page('/travel-styles', 'weekly', 0.85),
    page('/reviews', 'daily', 0.8),
    page('/contact', 'monthly', 0.8),
    ...TOUR_PACKAGES.map((t) =>
      page(`/tour/${t.id}`, 'weekly', t.id === 'golden-triangle-classic' ? 0.85 : 0.8)
    ),
    ...DESTINATIONS_DATA.map((d) => page(`/destination/${d.id}`, 'monthly', 0.75)),
    ...TRAVEL_STYLES_DATA.map((s) => page(`/travel-style/${s.id}`, 'monthly', 0.7)),
  ];
}
