import type { Metadata } from 'next';
import { DestinationDetailPage } from '@/views/DestinationDetailPage';
import { DESTINATIONS_DATA } from '@/data/destinationsData';
import { DESTINATION_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

// Only ids defined in the data file exist; any other URL returns a real HTTP 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return DESTINATIONS_DATA.map((item) => ({ destinationId: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destinationId: string }>;
}): Promise<Metadata> {
  const { destinationId } = await params;
  const item = DESTINATIONS_DATA.find((i) => i.id === destinationId);
  if (!item) return {};
  return buildMetadata(
    DESTINATION_SEO[item.id] ?? {
      title: `${item.name} Private Tours | Rangrez Holidays`,
      description: item.tagline,
      path: `/destination/${item.id}`,
    }
  );
}

export default function Page() {
  return <DestinationDetailPage />;
}
