import type { Metadata } from 'next';
import { TravelStylesIndexPage } from '@/views/TravelStylesIndexPage';
import { STATIC_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata(STATIC_SEO.travelStyles);

export default function Page() {
  return <TravelStylesIndexPage />;
}
