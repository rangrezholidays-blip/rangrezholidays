import type { Metadata } from 'next';
import { TourDetailPage } from '@/views/TourDetailPage';
import { TOUR_PACKAGES } from '@/data/toursData';
import { TOUR_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

// Only ids defined in the data file exist; any other URL returns a real HTTP 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return TOUR_PACKAGES.map((item) => ({ tourId: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tourId: string }>;
}): Promise<Metadata> {
  const { tourId } = await params;
  const item = TOUR_PACKAGES.find((i) => i.id === tourId);
  if (!item) return {};
  return buildMetadata(
    TOUR_SEO[item.id] ?? {
      title: `${item.title} | Rangrez Holidays`,
      description: item.tagline,
      path: `/tour/${item.id}`,
    }
  );
}

export default function Page() {
  return <TourDetailPage />;
}
