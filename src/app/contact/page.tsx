import type { Metadata } from 'next';
import { ContactPage } from '@/views/ContactPage';
import { STATIC_SEO } from '@/data/seoData';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata(STATIC_SEO.contact);

export default function Page() {
  return <ContactPage />;
}
