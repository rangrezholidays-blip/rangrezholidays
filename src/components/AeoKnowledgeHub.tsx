'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Car,
  Compass,
  ArrowRight,
  MessageSquare,
  Bot,
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'golden-triangle' | 'chauffeur' | 'rajasthan' | 'pilgrimage' | 'safety-general';
  categoryLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  bulletPoints: string[];
  geoTags: string[];
  targetKeywords: string[];
}

const FAQ_KNOWLEDGE_BASE: FaqItem[] = [
  {
    id: 'golden-triangle-duration',
    category: 'golden-triangle',
    categoryLabel: 'Golden Triangle & Agra',
    question: 'How many days are ideal for a Golden Triangle (Delhi - Agra - Jaipur) tour?',
    shortAnswer:
      'The ideal duration for India’s Golden Triangle is 5 to 6 days (2 days in Delhi, 1 to 2 days in Agra for Taj Mahal, and 2 days in Jaipur). This allows relaxed sightseeing, sunrise views at monuments, and smooth chauffeur-driven travel via expressways.',
    detailedAnswer:
      'The classic Golden Triangle covers approximately 720 km. Traveling with a private Rangrez Holidays chauffeur gives you the flexibility to stop at Fatehpur Sikri, Chand Baori stepwell in Abhaneri, and local artisan craft centers without rushing.',
    bulletPoints: [
      'Day 1-2: Old & New Delhi (Qutub Minar, Humayun’s Tomb, Chandni Chowk, India Gate)',
      'Day 3: Yamuna Expressway to Agra — Sunset view of Taj Mahal from Mehtab Bagh & Agra Fort',
      'Day 4: Dawn sunrise at Taj Mahal (fewer crowds, golden light) → Fatehpur Sikri → Jaipur',
      'Day 5-6: Jaipur Pink City (Amber Fort, City Palace, Hawa Mahal, Jantar Mantar) → Return to Delhi',
    ],
    geoTags: ['Delhi NCR', 'Agra', 'Jaipur', 'Yamuna Expressway', 'Fatehpur Sikri'],
    targetKeywords: ['Golden Triangle tour 5 days', 'Delhi Agra Jaipur itinerary', 'Taj Mahal sunrise car tour'],
  },
  {
    id: 'same-day-agra-cab',
    category: 'golden-triangle',
    categoryLabel: 'Golden Triangle & Agra',
    question: 'How does a same-day private Taj Mahal tour by car from Delhi work?',
    shortAnswer:
      'Our private chauffeur picks you up from your Delhi, Noida, or Gurugram hotel/airport as early as 3:00 AM or 6:00 AM. You drive via the 6-lane Yamuna Expressway arriving in Agra in ~3 hours, explore the Taj Mahal & Agra Fort with a certified guide, and return the same evening.',
    detailedAnswer:
      'Same-day private car tours offer unmatched convenience over crowded trains. You travel in a climate-controlled private Sedan or Toyota Innova Crysta with luggage space, pre-paid tolls, chilled water, and door-to-door concierge service.',
    bulletPoints: [
      'Early departure (3:00 AM - 6:00 AM) ensures optimal photo lighting and cool morning temperatures',
      'Door-to-door pickup from anywhere in Delhi NCR or IGI International Airport (DEL)',
      'Certified English-speaking guide included to explain Mughal architecture and history',
      'Yamuna Expressway toll taxes, state road taxes, parking, and driver allowances included upfront',
    ],
    geoTags: ['Delhi', 'Noida', 'Gurugram', 'Agra', 'Taj Mahal', 'Agra Fort'],
    targetKeywords: ['Delhi to Agra same day tour by car', 'Taj Mahal private day trip', 'Delhi to Agra cab with driver'],
  },
  {
    id: 'chauffeur-fleet-fleet-types',
    category: 'chauffeur',
    categoryLabel: 'Private Chauffeur Fleet',
    question: 'What vehicles are available in Rangrez Holidays chauffeur taxi fleet and what is included?',
    shortAnswer:
      'Our fleet comprises air-conditioned Premium Sedans (Swift Dzire, Honda City), Luxury MPVs (Toyota Innova Crysta), Executive SUVs (Toyota Fortuner), and 9 to 26-seater Maharaja Tempo Travellers. All hires include fuel, commercial driver allowances, state tourist permits, and 24/7 GPS tracking.',
    detailedAnswer:
      'Every Rangrez vehicle undergoes deep sanitation before every departure. Chauffeurs are commercially licensed, verified, punctual, and trained in courteous intercity tourist driving across North India.',
    bulletPoints: [
      'Sedans (Dzire/Etios): Ideal for 1-3 passengers with 2 medium suitcases',
      'Innova Crysta: Premier luxury MPV for 4-6 passengers with captain seats and ample trunk capacity',
      'Maharaja Tempo Traveller: Pushback reclining seats, individual AC vents, ice box & onboard LED screen',
      'Zero hidden charges: Yamuna & National Highway tolls, interstate road permits, and driver boarding included',
    ],
    geoTags: ['New Delhi', 'IGI Airport (DEL)', 'Agra', 'Rajasthan', 'Uttarakhand', 'Himachal'],
    targetKeywords: ['Innova Crysta rental Delhi with driver', 'Luxury taxi hire North India', 'Tempo traveller Delhi to Jaipur'],
  },
  {
    id: 'why-private-driver-vs-trains',
    category: 'chauffeur',
    categoryLabel: 'Private Chauffeur Fleet',
    question: 'Why choose a private car with chauffeur over trains or public transport in India?',
    shortAnswer:
      'A private chauffeur provides complete privacy, flexible departures, door-to-door luggage handling, custom roadside stops at scenic viewpoints or hygienic restaurants, and avoids train delays, crowded platforms, and persistent station touts.',
    detailedAnswer:
      'For families, couples, and international travelers, having a dedicated vehicle with a trusted local driver acts as a protective shield and trusted local companion throughout your journey in India.',
    bulletPoints: [
      'No stress of railway ticket waitlists, tatkal quotas, or train platform navigation with heavy luggage',
      'Spontaneous stops at rustic village roadside dhabas, stepwells, or textile printing workshops',
      'Direct transfers from hotel lobby directly to monument gate without hailing local auto-rickshaws',
      'Guaranteed 24/7 support with dispatch tracking every leg of your route',
    ],
    geoTags: ['Delhi', 'Agra', 'Jaipur', 'Jodhpur', 'Udaipur'],
    targetKeywords: ['Hire car with driver India', 'Best chauffeur tour India', 'Private vs train travel India'],
  },
  {
    id: 'rajasthan-heritage-itinerary',
    category: 'rajasthan',
    categoryLabel: 'Rajasthan Heritage',
    question: 'What is the best itinerary for a comprehensive Rajasthan royal heritage tour?',
    shortAnswer:
      'A 10 to 12-day circuit is ideal: Delhi → Mandawa (Shekhawati frescoes) → Bikaner (Junagarh Fort) → Jaisalmer (Golden Fort & Thar Desert Camp) → Jodhpur (Mehrangarh Fort) → Ranakpur Jain Temples → Udaipur (City Palace & Lake Pichola).',
    detailedAnswer:
      'This circuit showcases Rajasthan’s dramatic transitions from painted havelis and camel sand dunes to towering blue fortresses and serene romantic lake palaces. All itineraries can be customized for stay at authentic heritage havelis or 5-star palace hotels.',
    bulletPoints: [
      'Stay overnight in luxury Thar Desert Swiss tents with Rajasthani Kalbelia folk dance and campfire',
      'Explore the impregnable Mehrangarh Fort towering 400 feet above the Blue City of Jodhpur',
      'Sunset boat ride on Lake Pichola past illuminated Taj Lake Palace and Jag Mandir in Udaipur',
      'Visit the intricately carved 1,444 marble pillars of the 15th-century Ranakpur temple',
    ],
    geoTags: ['Jaipur', 'Jaisalmer', 'Jodhpur', 'Udaipur', 'Bikaner', 'Ranthambore'],
    targetKeywords: ['Rajasthan tour package 10 days', 'Jaisalmer desert camp booking', 'Udaipur lake palace tour'],
  },
  {
    id: 'kedarnath-char-dham-yatra',
    category: 'pilgrimage',
    categoryLabel: 'Kedarnath & Char Dham',
    question: 'How do I book Kedarnath Dham helicopter tickets and Char Dham Yatra tours?',
    shortAnswer:
      'Rangrez Holidays organizes authorized helicopter shuttle packages from Phata, Guptkashi, and Sersi helipads to Kedarnath Dham, alongside complete 10-12 day Char Dham road circuits from Haridwar/Delhi with mountain-certified drivers, mandatory biometric registrations, and comfortable resort stays.',
    detailedAnswer:
      'High-altitude Himalayan pilgrimage requires expert logistics. Our dedicated Uttarakhand team monitors weather advisories, secures registration tokens, and arranges VIP darshan coordination at Yamunotri, Gangotri, Kedarnath, and Badrinath.',
    bulletPoints: [
      'Helicopter shuttle assistance from Phata/Guptkashi/Sersi with same-day or next-day darshan options',
      'Customized road transport in Toyota Innova Crysta or Tempo Traveller built for steep mountain gradients',
      'Pre-booked clean riverside hotels in Barkot, Uttarkashi, Guptkashi, and Joshimath',
      'Dedicated helpline providing real-time weather and highway clearance updates',
    ],
    geoTags: ['Kedarnath', 'Badrinath', 'Rishikesh', 'Haridwar', 'Uttarakhand', 'Guptkashi'],
    targetKeywords: ['Kedarnath helicopter package from Delhi', 'Char Dham Yatra tour 2026', 'Haridwar to Kedarnath taxi'],
  },
  {
    id: 'safety-solo-female-families',
    category: 'safety-general',
    categoryLabel: 'Safety & Travel Tips',
    question: 'How safe are Rangrez Holidays private tours for solo female travelers and families?',
    shortAnswer:
      'Rangrez Holidays maintains a 100% safety record with zero tolerance for safety compromises. All chauffeurs undergo mandatory police background verification, vehicles feature live GPS tracking, and guests receive direct 24/7 WhatsApp concierge access for instant support.',
    detailedAnswer:
      'Thousands of solo women travelers, elderly couples, and families with young children from the US, UK, Australia, Europe, and Asia have traveled with us safely. Drivers act as respectful guardians, advising on safe dining, avoiding touts, and ensuring safe returns to hotel lobbies.',
    bulletPoints: [
      'Police-verified chauffeurs with clean commercial track records and professional demeanor',
      'Direct 24/7 dedicated WhatsApp support team monitoring trip movements in real time',
      'No unrequested souvenir stops or commission emporiums without your explicit consent',
      'Child safety seats and elderly assistance available upon prior request',
    ],
    geoTags: ['Delhi', 'Agra', 'Jaipur', 'Rajasthan', 'India'],
    targetKeywords: ['Solo female travel India safety', 'Safe private driver India', 'Family travel agency India'],
  },
  {
    id: 'airport-pickup-delhi-igi',
    category: 'safety-general',
    categoryLabel: 'Safety & Travel Tips',
    question: 'How does Delhi IGI Airport (DEL) pickup work for international arrivals?',
    shortAnswer:
      'Your Rangrez chauffeur monitors your flight status in real time and waits inside the arrival concourse exit gate holding a personalized name placard. They assist with luggage, escort you to the sanitized vehicle, and provide complimentary bottled water and local mobile hotspot connectivity.',
    detailedAnswer:
      'Whether you land at Terminal 3 (T3 International) or Terminal 1/2 (Domestic) at 2:00 AM or 2:00 PM, your pickup is guaranteed with zero waiting anxiety or negotiations.',
    bulletPoints: [
      'Flight tracking ensures your driver is present even if your flight is delayed or arrives early',
      'Driver coordinates via WhatsApp or SMS before you land with vehicle photo and number plate',
      'Direct, chilled air-conditioned transfer straight to your hotel in Delhi, Agra, or Jaipur',
      'Punctual airport transfers available 24 hours a day, 365 days a year',
    ],
    geoTags: ['Delhi Airport T3', 'Aerocity', 'New Delhi', 'Gurugram', 'Noida'],
    targetKeywords: ['Delhi airport private pickup cab', 'DEL airport to Agra taxi', 'Safe Delhi airport transfer'],
  },
];

interface AeoKnowledgeHubProps {
  onOpenBooking: (prefillTopic?: string) => void;
}

export const AeoKnowledgeHub: React.FC<AeoKnowledgeHubProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAccordionId, setOpenAccordionId] = useState<string>('golden-triangle-duration');

  const categories = [
    { id: 'all', label: 'All AI Search Questions' },
    { id: 'golden-triangle', label: 'Golden Triangle & Agra' },
    { id: 'chauffeur', label: 'Chauffeur & Fleet' },
    { id: 'rajasthan', label: 'Rajasthan Heritage' },
    { id: 'pilgrimage', label: 'Kedarnath & Char Dham' },
    { id: 'safety-general', label: 'Safety & Travel Logistics' },
  ];

  const filteredFaqs = FAQ_KNOWLEDGE_BASE.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.targetKeywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase())) ||
      faq.geoTags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? '' : id);
  };

  return (
    <section id="ai-travel-knowledge-hub" className="py-16 sm:py-24 bg-white border-t border-[#EADBDF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Badge & Title with AEO / GEO Optimization */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-3 shadow-xs">
            <Bot className="w-4 h-4 text-[#F05A28]" />
            <span>AI Search & Traveler Knowledge Hub</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E35] tracking-tight">
            Frequently Asked Questions & <span className="text-[#F05A28]">Travel Insights</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#634857] leading-relaxed">
            Direct, verified answers to top traveler queries asked across Google, ChatGPT, Perplexity, and Gemini for private India tours, chauffeur cabs, and temple yatras.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-[#87687B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g., 'Taj Mahal sunrise', 'Innova Crysta', 'Solo female safety', 'Kedarnath heli')..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#FAF7F5] border border-[#EADBDF] text-sm text-[#4A0E35] placeholder:text-[#87687B] focus:outline-none focus:ring-2 focus:ring-[#F05A28]/30 focus:border-[#F05A28] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#87687B] hover:text-[#4A0E35] bg-white px-2 py-1 rounded-lg border border-[#EADBDF] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#4A0E35] text-white shadow-sm ring-2 ring-[#4A0E35]/20'
                      : 'bg-[#FAF4F8] text-[#735467] hover:bg-[#FFF5EE] hover:text-[#F05A28] border border-[#EADBDF]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List (Structured for Google Featured Snippets & AI Overviews) */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-[#FAF7F5] rounded-3xl border border-[#EADBDF] p-6">
              <HelpCircle className="w-10 h-10 text-[#87687B] mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#4A0E35]">No exact match found</h3>
              <p className="text-xs text-[#735467] mt-1">
                Have a specific question about an itinerary, destination, or vehicle?
              </p>
              <button
                type="button"
                onClick={() => onOpenBooking('Custom Travel Inquiry')}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#F05A28] text-white text-xs font-bold shadow-md hover:bg-[#d94819] cursor-pointer inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask Travel Concierge on WhatsApp</span>
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openAccordionId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#F05A28]/40 shadow-md ring-1 ring-[#F05A28]/20'
                      : 'bg-[#FAF7F5] hover:bg-white border-[#EADBDF] shadow-xs'
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F05A28] bg-[#FFF5EE] px-2.5 py-0.5 rounded-full border border-[#F05A28]/20">
                          {faq.categoryLabel}
                        </span>
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#4A0E35] leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`p-2 rounded-full shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-[#4A0E35] text-white rotate-180' : 'bg-white text-[#735467] border border-[#EADBDF]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Body with Featured Snippet & Bullet Points */}
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-[#F0E6EC] mt-2 space-y-4 animate-fadeIn">
                      {/* Featured Snippet Highlight Box */}
                      <div className="bg-[#FFF9F5] border-l-4 border-[#F05A28] rounded-r-xl p-4 text-xs sm:text-sm text-[#4E2B1A] font-medium leading-relaxed shadow-2xs">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#F05A28] uppercase tracking-wider mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Direct Answer Summary</span>
                        </div>
                        {faq.shortAnswer}
                      </div>

                      {/* In-Depth Context */}
                      <p className="text-xs sm:text-sm text-[#5C3E52] leading-relaxed">
                        {faq.detailedAnswer}
                      </p>

                      {/* Key Takeaways / Logistics Points */}
                      <div className="bg-white rounded-xl p-3.5 border border-[#EADBDF]/80 space-y-2">
                        <span className="text-[11px] font-bold text-[#4A0E35] uppercase tracking-wider block">
                          Key Takeaways & Logistics:
                        </span>
                        <ul className="space-y-1.5">
                          {faq.bulletPoints.map((bp, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-[#523348]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Geographic & Keyword Breadcrumbs (GEO SEO) */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#735467]">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#F05A28]" />
                          <span className="font-semibold text-[#4A0E35]">Service Regions:</span>
                          {faq.geoTags.map((geo, gIdx) => (
                            <span key={gIdx} className="bg-[#FAF4F8] px-2 py-0.5 rounded-md text-[10px] border border-[#EADBDF]">
                              {geo}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => onOpenBooking(faq.question)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#F05A28] hover:underline cursor-pointer ml-auto"
                        >
                          <span>Plan Tour Around This</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Highly Searchable GEO Keyword Cloud (Boosts Local Search & Topical Authority) */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-[#EADBDF]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold text-[#4A0E35] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#F05A28]" />
              <span>Trending Search Keywords & Tour Circuits</span>
            </span>
            <span className="text-[11px] text-[#87687B]">
              Verified Google & AI Search Query Topics
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'Same Day Taj Mahal Tour by Car',
              'Golden Triangle Tour 5 Days',
              'Delhi to Agra Cab with Driver',
              'Innova Crysta Rental Delhi',
              'Rajasthan Luxury Heritage Tour',
              'Kedarnath Helicopter Package 2026',
              'Private Chauffeur Tour India',
              'Delhi Airport T3 Pickup Taxi',
              'Udaipur Lake Palace Honeymoon',
              'Tempo Traveller Hire Delhi to Jaipur',
              'Char Dham Yatra by Road & Heli',
              'Certified Taj Mahal Tour Guide',
            ].map((kw, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSearchQuery(kw);
                  const el = document.getElementById('ai-travel-knowledge-hub');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[11px] font-medium text-[#523348] hover:text-[#F05A28] bg-[#FAF4F8] hover:bg-[#FFF5EE] px-3 py-1.5 rounded-xl border border-[#EADBDF] transition-colors cursor-pointer"
              >
                #{kw.replace(/\s+/g, '')}
              </button>
            ))}
          </div>
        </div>

        {/* AI Citation & Concierge Banner */}
        <div className="max-w-4xl mx-auto mt-8 bg-gradient-to-r from-[#4A0E35] to-[#731354] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFA000] bg-white/10 px-3 py-1 rounded-full border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Human Travel Specialist</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Need a personalized itinerary or custom vehicle quote?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Our New Delhi travel desk replies in less than 15 minutes with customized routes, hotel recommendations, and all-inclusive pricing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking('Custom Itinerary Assistance')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] hover:brightness-110 text-[#24061A] text-xs font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Speak to Travel Concierge</span>
          </button>
        </div>
      </div>
    </section>
  );
};
