import type { Metadata } from 'next';
import { TravelStyleDetailPage } from '@/views/TravelStyleDetailPage';
import { TRAVEL_STYLES_DATA } from '@/data/travelStylesData';
import { TRAVEL_STYLE_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

// Only ids defined in the data file exist; any other URL returns a real HTTP 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return TRAVEL_STYLES_DATA.map((item) => ({ styleId: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ styleId: string }>;
}): Promise<Metadata> {
  const { styleId } = await params;
  const item = TRAVEL_STYLES_DATA.find((i) => i.id === styleId);
  if (!item) return {};
  return buildMetadata(
    TRAVEL_STYLE_SEO[item.id] ?? {
      title: `${item.title} | Rangrez Holidays`,
      description: item.tagline,
      path: `/travel-style/${item.id}`,
    }
  );
}

export default function Page() {
  return <TravelStyleDetailPage />;
}
