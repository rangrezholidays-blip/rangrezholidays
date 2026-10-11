import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ThankYouPage } from '@/views/ThankYouPage';

// A confirmation page should never appear in Google results.
export const metadata: Metadata = {
  title: 'Thank You | Rangrez Holidays',
  description: 'Your inquiry has been received by Rangrez Holidays.',
  robots: { index: false, follow: true },
};

// ThankYouPage reads ?ref= via useSearchParams, which requires a Suspense boundary.
export default function Page() {
  return (
    <Suspense fallback={null}>
      <ThankYouPage />
    </Suspense>
  );
}
