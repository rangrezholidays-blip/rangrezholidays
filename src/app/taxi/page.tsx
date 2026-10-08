import type { Metadata } from 'next';
import { TaxiPage } from '@/views/TaxiPage';
import { STATIC_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata(STATIC_SEO.taxi);

export default function Page() {
  return <TaxiPage />;
}
