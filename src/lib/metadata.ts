import type { Metadata } from 'next';
import { canonicalUrl, type SeoEntry } from '../data/seoData';
import { SITE_NAME, OG_IMAGE, OG_IMAGE_ALT } from './site';

/** Builds per-page <title>, description, canonical, Open Graph and Twitter tags. */
export function buildMetadata(entry: SeoEntry): Metadata {
  const url = canonicalUrl(entry.path);
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      locale: 'en_IN',
      title: entry.title,
      description: entry.description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@rangrezholidays',
      creator: '@rangrezholidays',
      title: entry.title,
      description: entry.description,
      images: [OG_IMAGE],
    },
  };
}
