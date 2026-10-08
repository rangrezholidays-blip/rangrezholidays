import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ToursPage } from '@/views/ToursPage';
import { STATIC_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata(STATIC_SEO.tours);

// ToursPage reads ?category= via useSearchParams, which requires a Suspense boundary.
export default function Page() {
  return (
    <Suspense fallback={null}>
      <ToursPage />
    </Suspense>
  );
}
