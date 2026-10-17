import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/seoData';
import { TOUR_PACKAGES } from '@/data/toursData';
import { DESTINATIONS_DATA } from '@/data/destinationsData';
import { TRAVEL_STYLES_DATA } from '@/data/travelStylesData';

// Update this date when page content meaningfully changes.
const LAST_MODIFIED = new Date('2026-10-07');

type Entry = MetadataRoute.Sitemap[number];

// Blog posts are standalone HTML files in public/blog. Read them at build time so a new
// post appears in the sitemap automatically. The date comes from each file's
// <meta property="og:updated_time"> tag.
function blogEntries(): MetadataRoute.Sitemap {
  const dir = path.join(process.cwd(), 'public', 'blog');
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
  } catch {
    return [];
  }
  return files.map((file) => {
    const slug = file.replace(/\.html$/, '');
    const html = fs.readFileSync(path.join(dir, file), 'utf8');
    const match = html.match(/property="og:updated_time" content="([^"]+)"/);
    const isIndex = slug === 'index';
    return {
      url: isIndex ? `${SITE_URL}/blog` : `${SITE_URL}/blog/${slug}`,
      lastModified: match ? new Date(match[1]) : LAST_MODIFIED,
      changeFrequency: isIndex ? 'weekly' : 'monthly',
      priority: isIndex ? 0.8 : 0.75,
    } as Entry;
  });
}

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
    ...blogEntries(),
  ];
}
