// Central SEO metadata for every page on the site.
// Used by each page component via generateMetadata() to set a unique
// title, meta description and canonical URL instead of relying
// on the single static tags in index.html.

export const SITE_URL = 'https://www.rangrezholidays.com';

export interface SeoEntry {
  title: string;
  description: string;
  path: string; // path relative to SITE_URL, starting with /
}

// ---- Static pages ----
export const STATIC_SEO: Record<string, SeoEntry> = {
  home: {
    title: 'Rangrez Holidays | Private India Tours & Chauffeur Taxi',
    description:
      "Bespoke private tours across India — Golden Triangle, Rajasthan, Char Dham Yatra — plus a luxury chauffeur-driven taxi fleet. Plan your custom trip today.",
    path: '/',
  },
  tours: {
    title: 'India Tour Packages | Golden Triangle & More | Rangrez',
    description:
      'Browse private, customizable India tour packages: Golden Triangle, Rajasthan heritage, Char Dham Yatra, Himachal road trips, and same-day city excursions.',
    path: '/tours',
  },
  destinations: {
    title: 'India Destinations We Cover | Rangrez Holidays',
    description:
      'Discover our core travel regions in India — Delhi, Agra, Rajasthan, Uttarakhand and Himachal Pradesh — each with curated private tour options.',
    path: '/destinations',
  },
  taxi: {
    title: 'Luxury Chauffeur Taxi Rental India | Rangrez Holidays',
    description:
      'Hire a private chauffeur-driven car in Delhi, Agra, Jaipur and beyond. Innova Crysta & luxury fleet, airport pickups, outstation trips, hourly rentals.',
    path: '/taxi',
  },
  reviews: {
    title: 'Customer Reviews & Traveler Stories | Rangrez Holidays',
    description:
      'Read real traveler experiences with Rangrez Holidays — private India tours, chauffeur service and Char Dham Yatra reviews from recent guests.',
    path: '/reviews',
  },
  contact: {
    title: 'Contact Us — Plan Your Custom India Trip | Rangrez',
    description:
      'Get in touch with Rangrez Holidays to plan a custom India tour or chauffeur taxi booking. Fast response via form, WhatsApp or phone.',
    path: '/contact',
  },
  travelStyles: {
    title: 'Tours by Travel Style — Family, Honeymoon & More | Rangrez',
    description:
      "Find the right India trip for your travel style: family holidays, honeymoons, friends' road trips, solo travel, and corporate retreats.",
    path: '/travel-styles',
  },
};

// ---- Tour detail pages (/tour/:tourId) ----
export const TOUR_SEO: Record<string, SeoEntry> = {
  'golden-triangle-classic': {
    title: 'Golden Triangle Tour (Delhi-Agra-Jaipur) | Rangrez',
    description:
      "7-day private Golden Triangle tour: Delhi, Taj Mahal in Agra, and Jaipur's Amber Fort. Chauffeur-driven, 4-5 star stays, fully customizable.",
    path: '/tour/golden-triangle-classic',
  },
  'rajasthan-royal-heritage': {
    title: 'Grand Rajasthan Royal Heritage Tour | Rangrez Holidays',
    description:
      'Private Rajasthan tour through Jaipur, Jodhpur, Jaisalmer and Udaipur — desert havelis, forts, lakes, and luxury camping under the stars.',
    path: '/tour/rajasthan-royal-heritage',
  },
  'char-dham-yatra-sacred': {
    title: 'Char Dham Yatra Package from Delhi | Rangrez Holidays',
    description:
      'Sacred Char Dham Yatra covering Yamunotri, Gangotri, Kedarnath and Badrinath. Private vehicle, helicopter option for Kedarnath, from Delhi.',
    path: '/tour/char-dham-yatra-sacred',
  },
  'same-day-agra-taj-mahal': {
    title: 'Same Day Taj Mahal Tour from Delhi | Rangrez Holidays',
    description:
      'Private same-day trip from Delhi to Agra — sunrise Taj Mahal, Agra Fort, chauffeur-driven round trip, flexible departure times.',
    path: '/tour/same-day-agra-taj-mahal',
  },
  'same-day-delhi-heritage': {
    title: 'Same Day Delhi Heritage Tour | Rangrez Holidays',
    description:
      "8-hour private Delhi heritage tour covering Qutub Minar, Humayun's Tomb, Old Delhi and India Gate with a chauffeur-driven vehicle.",
    path: '/tour/same-day-delhi-heritage',
  },
  'same-day-jaipur-pink-city': {
    title: 'Same Day Jaipur Tour from Delhi | Rangrez Holidays',
    description:
      "Private same-day excursion from Delhi to Jaipur's Pink City — Amber Fort, City Palace, chauffeur-driven, comfortable round trip.",
    path: '/tour/same-day-jaipur-pink-city',
  },
  'same-day-mathura-vrindavan': {
    title: 'Same Day Mathura Vrindavan Tour | Rangrez Holidays',
    description:
      'Private same-day Krishna darshan tour to Mathura and Vrindavan from Delhi — temples, chauffeur-driven comfort, flexible scheduling.',
    path: '/tour/same-day-mathura-vrindavan',
  },
  'himachal-shimla-manali-delight': {
    title: 'Shimla Manali Tour Package | Rangrez Holidays',
    description:
      'Private Himalayan road trip through Shimla, Kullu and Manali — mountain views, chauffeur-driven, cozy stays, custom itinerary options.',
    path: '/tour/himachal-shimla-manali-delight',
  },
  'himachal-spiti-valley-adventure': {
    title: 'Spiti Valley 4x4 Road Trip | Rangrez Holidays',
    description:
      'High-altitude Spiti Valley adventure by private 4x4 — remote monasteries, dramatic landscapes, experienced mountain drivers.',
    path: '/tour/himachal-spiti-valley-adventure',
  },
};

// ---- Destination detail pages (/destination/:destinationId) ----
export const DESTINATION_SEO: Record<string, SeoEntry> = {
  delhi: {
    title: 'Delhi Private Tours & Travel Guide | Rangrez Holidays',
    description:
      "Explore Delhi with a private chauffeur — Qutub Minar, Humayun's Tomb, Old Delhi, India Gate, Lotus Temple and Akshardham, all customizable.",
    path: '/destination/delhi',
  },
  agra: {
    title: 'Agra & Taj Mahal Private Tours | Rangrez Holidays',
    description:
      'Private Agra tours covering the Taj Mahal, Agra Fort, Fatehpur Sikri and the Baby Taj — chauffeur-driven, same-day or multi-day options.',
    path: '/destination/agra',
  },
  rajasthan: {
    title: 'Rajasthan Private Tours & Travel Guide | Rangrez',
    description:
      'Private Rajasthan travel through Jaipur, Udaipur, Jodhpur and Jaisalmer — palaces, forts, lakes, and the Thar Desert, fully customizable.',
    path: '/destination/rajasthan',
  },
  uttarakhand: {
    title: 'Uttarakhand & Char Dham Tours | Rangrez Holidays',
    description:
      'Private Uttarakhand tours including the Char Dham Yatra, Rishikesh, Haridwar and the Himalayan foothills — chauffeur-driven travel.',
    path: '/destination/uttarakhand',
  },
  himachal: {
    title: 'Himachal Pradesh Private Tours | Rangrez Holidays',
    description:
      'Private Himachal Pradesh road trips — Shimla, Manali and Spiti Valley — mountain adventures with an experienced chauffeur-driven fleet.',
    path: '/destination/himachal',
  },
};

// ---- Travel style detail pages (/travel-style/:styleId) ----
export const TRAVEL_STYLE_SEO: Record<string, SeoEntry> = {
  family: {
    title: 'Family Holiday Packages in India | Rangrez Holidays',
    description:
      'Family-friendly private India tours with child safety seats, senior citizen care, interconnected rooms and flexible, spontaneous stops.',
    path: '/travel-style/family',
  },
  honeymoon: {
    title: 'Honeymoon Packages India | Romantic Tours | Rangrez',
    description:
      "Romantic private honeymoon tours in India — sunset boat cruises, candlelight dinners, VIP sunrise Taj Mahal access, luxury suite upgrades.",
    path: '/travel-style/honeymoon',
  },
  friends: {
    title: 'Friends & Adventure Road Trips India | Rangrez',
    description:
      'Private group road trips for friends — Thar Desert dune bashing, Rishikesh rafting, cliff jumping, highway food trails, custom routes.',
    path: '/travel-style/friends',
  },
  solo: {
    title: 'Solo Travel Packages India | Rangrez Holidays',
    description:
      'Safe, private solo travel tours across India with a trusted chauffeur, flexible itineraries, and personalized attention throughout.',
    path: '/travel-style/solo',
  },
  corporate: {
    title: 'Corporate Travel & MICE Packages | Rangrez Holidays',
    description:
      'Corporate travel, offsites and MICE packages in India — reliable chauffeur fleet, group logistics, and tailored itineraries for teams.',
    path: '/travel-style/corporate',
  },
};

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
