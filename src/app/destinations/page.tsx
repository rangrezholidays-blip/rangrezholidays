import type { Metadata } from 'next';
import { DestinationsPage } from '@/views/DestinationsPage';
import { STATIC_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata(STATIC_SEO.destinations);

export default function Page() {
  return <DestinationsPage />;
}
