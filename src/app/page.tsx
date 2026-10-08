import type { Metadata } from 'next';
import { HomePage } from '@/views/HomePage';
import { STATIC_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata(STATIC_SEO.home);

export default function Page() {
  return <HomePage />;
}
