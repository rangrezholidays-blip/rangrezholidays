import type { Metadata } from 'next';
import { ReviewsPage } from '@/views/ReviewsPage';
import { STATIC_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata(STATIC_SEO.reviews);

export default function Page() {
  return <ReviewsPage />;
}
