import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppShell } from '@/components/AppShell';
import { SITE_URL } from '@/data/seoData';
import schemaOrg from '@/data/schemaOrg.json';
import {
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  HOME_OG_TITLE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  TWITTER_TITLE,
  TWITTER_DESCRIPTION,
} from '@/lib/site';

const GA_ID = 'G-KES3CGYSTR';
const GTM_ID = 'GTM-MH89Z7D6';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  // Fallback only: every page sets its own title, description and canonical.
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    title: HOME_OG_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rangrezholidays',
    creator: '@rangrezholidays',
    title: TWITTER_TITLE,
    description: TWITTER_DESCRIPTION,
    images: [OG_IMAGE],
  },
  // GEO / local SEO
  other: {
    'geo.region': 'IN-DL',
    'geo.placename': 'New Delhi, India',
    'geo.position': '28.6139;77.2090',
    ICBM: '28.6139, 77.2090',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Schema.org JSON-LD: TravelAgency, WebSite, FAQPage */}
        {schemaOrg.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="bg-[#FAF7F5] text-[#24131E] font-sans antialiased selection:bg-[#F05A28]/20 selection:text-[#4A0E35]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <AppShell>{children}</AppShell>

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}