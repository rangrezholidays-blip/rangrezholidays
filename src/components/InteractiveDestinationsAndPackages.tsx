'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Compass,
  MapPin,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Filter,
  Eye,
  Camera,
  Play,
  Star,
  Users,
  Search,
  Check,
  Wand2,
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { TOUR_PACKAGES } from '../data/toursData';
import { TourPackage } from '../types';
import { TourByYourselfBuilder } from './TourByYourselfBuilder';

interface InteractiveDestinationsAndPackagesProps {
  onOpenBooking: (prefillTour?: string) => void;
  onSelectPackage: (pkg: TourPackage) => void;
  tab?: 'packages' | 'tour-by-yourself' | 'destinations';
  onTabChange?: (tab: 'packages' | 'tour-by-yourself' | 'destinations') => void;
  persona?: string;
  onPersonaChange?: (persona: string) => void;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop';

const TRAVEL_PERSONAS = [
  { id: 'all', label: 'All Travel Styles', icon: '🌟', desc: 'Browse all curated tours' },
  { id: 'family', label: 'Family Holidays', icon: '👨‍👩‍👧‍👦', desc: 'Kid & elder friendly pacing, spacious Innovas' },
  { id: 'honeymoon', label: 'Honeymoon & Couples', icon: '💍', desc: 'Candlelight dinners, palace suites & private boats' },
  { id: 'friends', label: 'Friends & Groups', icon: '🎒', desc: 'Adventure road trips, campfires, rafting & trekking' },
  { id: 'solo', label: 'Solo Travel', icon: '🧭', desc: 'Verified chauffeurs, homestays & spiritual discovery' },
  { id: 'corporate', label: 'Corporate Offsites', icon: '💼', desc: 'Executive charters, team retreats & GST invoices' },
];

export const InteractiveDestinationsAndPackages: React.FC<
  InteractiveDestinationsAndPackagesProps
> = ({
  onOpenBooking,
  onSelectPackage,
  tab: controlledTab,
  onTabChange,
  persona: controlledPersona,
  onPersonaChange,
}) => {
  const [internalTab, setInternalTab] = useState<
    'packages' | 'tour-by-yourself' | 'destinations'
  >('packages');
  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;
  const setActiveTab = (newTab: 'packages' | 'tour-by-yourself' | 'destinations') => {
    if (onTabChange) onTabChange(newTab);
    setInternalTab(newTab);
  };

  const [internalPersona, setInternalPersona] = useState<string>('all');
  const selectedPersona = controlledPersona !== undefined ? controlledPersona : internalPersona;
  const setSelectedPersona = (newPersona: string) => {
    if (onPersonaChange) onPersonaChange(newPersona);
    setInternalPersona(newPersona);
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDestinationFilter, setSelectedDestinationFilter] =
    useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Categories for MakeMyTrip style tab bar
  const categories = [
    { id: 'all', label: 'All Experiences', icon: '✨' },
    { id: 'golden-triangle', label: 'Golden Triangle', icon: '👑' },
    { id: 'rajasthan', label: 'Royal Rajasthan', icon: '🏰' },
    { id: 'himachal', label: 'Himachal Escapes', icon: '🏔️' },
    { id: 'char-dham', label: 'Devbhoomi Uttarakhand', icon: '🕉️' },
    { id: 'same-day', label: 'Same Day Express', icon: '⚡' },
  ];

  // Filter packages based on active filters
  const filteredPackages = useMemo(() => {
    return TOUR_PACKAGES.filter((pkg) => {
      // Persona match
      if (selectedPersona !== 'all') {
        if (!pkg.travelStyles?.includes(selectedPersona as any)) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== 'all' && pkg.category !== selectedCategory) {
        return false;
      }

      // Destination filter match
      if (selectedDestinationFilter !== 'all') {
        const destLower = selectedDestinationFilter.toLowerCase();
        const hasDest = pkg.destinations.some((d) =>
          d.toLowerCase().includes(destLower)
        );
        if (!hasDest) return false;
      }

      // Duration filter match
      if (selectedDuration === 'short') {
        // 1 - 3 days
        if (
          !pkg.duration.includes('1 Day') &&
          !pkg.duration.includes('2 Day') &&
          !pkg.duration.includes('3 Day') &&
          !pkg.duration.includes('Same Day')
        ) {
          return false;
        }
      } else if (selectedDuration === 'medium') {
        // 4 - 6 days
        if (
          !pkg.duration.includes('4 Day') &&
          !pkg.duration.includes('5 Day') &&
          !pkg.duration.includes('6 Day')
        ) {
          return false;
        }
      } else if (selectedDuration === 'long') {
        // 7+ days
        if (
          !pkg.duration.includes('7 Day') &&
          !pkg.duration.includes('8 Day') &&
          !pkg.duration.includes('9 Day') &&
          !pkg.duration.includes('10 Day') &&
          !pkg.duration.includes('11 Day') &&
          !pkg.duration.includes('12 Day')
        ) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = pkg.title.toLowerCase().includes(q);
        const matchesTagline = pkg.tagline.toLowerCase().includes(q);
        const matchesDest = pkg.destinations.some((d) =>
          d.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesTagline && !matchesDest) {
          return false;
        }
      }

      return true;
    });
  }, [
    selectedCategory,
    selectedDestinationFilter,
    selectedDuration,
    selectedPersona,
    searchQuery,
  ]);

  const activePersonaObj =
    TRAVEL_PERSONAS.find((p) => p.id === selectedPersona) || TRAVEL_PERSONAS[0];

  return (
    <section id="interactive-explorer" className="py-12 sm:py-16 bg-[#FAF7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Holiday Hub</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E35]">
              Explore Destinations & Tour Packages
            </h2>
            <p className="mt-2 text-sm text-[#634857] max-w-2xl leading-relaxed">
              Browse signature chauffeured circuits, filter by who you are traveling with (Family, Honeymoon, Friends, Solo, Corporate), or plan a custom tour completely by yourself.
            </p>
          </div>

          {/* Primary View Switcher Tabs (MakeMyTrip style) */}
          <div className="flex flex-wrap p-1 rounded-2xl bg-white border border-[#EADBDF] shadow-xs self-start md:self-auto gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('packages')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'packages'
                  ? 'bg-[#4A0E35] text-white shadow-xs'
                  : 'text-[#735467] hover:text-[#4A0E35]'
              }`}
            >
              <span>Tour Packages</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === 'packages'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#FAF4F8] text-[#735467]'
                }`}
              >
                {TOUR_PACKAGES.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tour-by-yourself')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tour-by-yourself'
                  ? 'bg-gradient-to-r from-[#F05A28] to-[#FFA000] text-[#26071B] shadow-xs'
                  : 'text-[#F05A28] hover:bg-[#FFF5EE]'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Plan Tour By Yourself</span>
              <span className="text-[10px] bg-white/70 px-1 rounded font-extrabold">
                NEW
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('destinations')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'destinations'
                  ? 'bg-[#4A0E35] text-white shadow-xs'
                  : 'text-[#735467] hover:text-[#4A0E35]'
              }`}
            >
              <span>5 Key Regions</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === 'destinations'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#FAF4F8] text-[#735467]'
                }`}
              >
                {DESTINATIONS_DATA.length}
              </span>
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* VIEW 1: TOUR PACKAGES & FILTERING */}
        {/* =================================================================== */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            {/* FILTER BAR: Category + Region + Duration + Search */}
            <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#EADBDF] shadow-xs space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Categories */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#FFF5EE] text-[#F05A28] border border-[#F05A28]/30 shadow-xs'
                          : 'text-[#634857] hover:bg-[#FAF4F8]'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* Duration Filter Dropdown & Search */}
                <div className="flex items-center gap-2.5 shrink-0 border-t lg:border-t-0 pt-2 lg:pt-0 border-[#F0E6EC]">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#735467]" />
                    <select
                      value={selectedDuration}
                      onChange={(e) => setSelectedDuration(e.target.value)}
                      className="bg-[#FAF4F8] border border-[#EADBDF] text-[#4A0E35] text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                    >
                      <option value="all">Any Duration</option>
                      <option value="short">Short (1 - 3 Days)</option>
                      <option value="medium">Medium (4 - 6 Days)</option>
                      <option value="long">Grand (7+ Days)</option>
                    </select>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#735467] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search Taj, Manali..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-36 sm:w-44 bg-[#FAF4F8] border border-[#EADBDF] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#4A0E35] focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                    />
                  </div>
                </div>
              </div>

              {/* Destination Quick-Pills Sub-Strip */}
              <div className="pt-2 border-t border-[#F0E6EC] flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-[#735467] uppercase tracking-wider shrink-0 mr-1">
                  Region:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDestinationFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all border cursor-pointer ${
                    selectedDestinationFilter === 'all'
                      ? 'bg-[#F05A28] text-white border-[#F05A28]'
                      : 'bg-[#FAF4F8] text-[#4A0E35] border-[#EADBDF] hover:border-[#F05A28]'
                  }`}
                >
                  All Regions
                </button>
                {DESTINATIONS_DATA.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => {
                      setSelectedDestinationFilter(
                        selectedDestinationFilter === dest.name ? 'all' : dest.name
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all border flex items-center gap-1.5 cursor-pointer ${
                      selectedDestinationFilter === dest.name
                        ? 'bg-[#4A0E35] text-white border-[#4A0E35]'
                        : 'bg-white text-[#4A0E35] border-[#EADBDF] hover:border-[#F05A28]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFA000]" />
                    <span>{dest.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* "TOUR BY YOURSELF" CALLOUT CARD */}
            <div className="bg-gradient-to-r from-[#4A0E35] to-[#70154F] rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#4A0E35]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-2xl">
                  🛠️
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                    Can't find your exact itinerary or duration?
                  </h4>
                  <p className="text-xs text-[#F7D8E6] mt-0.5">
                    Use our interactive "Tour By Yourself" planner to handpick destinations, hotel comfort, and chauffeur fleet.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('tour-by-yourself')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] text-[#24061A] text-xs font-bold hover:brightness-110 transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Plan Tour By Yourself</span>
              </button>
            </div>

            {/* PACKAGES GRID */}
            {filteredPackages.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#EADBDF]">
                <Compass className="w-12 h-12 text-[#C4B0BC] mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#4A0E35]">
                  No tours found for this combination
                </h3>
                <p className="text-xs text-[#735467] mt-1 max-w-md mx-auto">
                  Try clearing the {selectedPersona !== 'all' ? `"${activePersonaObj.label}"` : ''} filter or reset destination filters to see all available journeys.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedDestinationFilter('all');
                      setSelectedDuration('all');
                      setSelectedPersona('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#4A0E35] text-white text-xs font-bold cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('tour-by-yourself')}
                    className="px-4 py-2 rounded-xl bg-[#F05A28] text-white text-xs font-bold cursor-pointer"
                  >
                    Build Custom Tour
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-white rounded-3xl overflow-hidden border border-[#EADBDF] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Header with Badge Overlay */}
                      <div className="relative h-60 overflow-hidden bg-black/10">
                        <img
                          src={tour.heroImage}
                          alt={tour.title}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                        {/* Top Pills */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-[#4A0E35]/95 backdrop-blur-md text-white text-[11px] font-bold shadow-xs">
                            {tour.duration}
                          </span>
                          {tour.rating && (
                            <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#4A0E35] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                              <Star className="w-3 h-3 text-[#FFA000] fill-[#FFA000]" />
                              <span>{tour.rating}</span>
                              {tour.reviewsCount && (
                                <span className="text-[9px] text-[#735467] font-normal">
                                  ({tour.reviewsCount})
                                </span>
                              )}
                            </span>
                          )}
                        </div>

                        {/* Persona Tags on Top of Image */}
                        {tour.travelStyles && tour.travelStyles.length > 0 && (
                          <div className="absolute top-12 left-3.5 flex flex-wrap gap-1">
                            {tour.travelStyles.slice(0, 2).map((style) => {
                              const personaMeta = TRAVEL_PERSONAS.find(
                                (p) => p.id === style
                              );
                              return (
                                <span
                                  key={style}
                                  className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1"
                                >
                                  <span>{personaMeta?.icon}</span>
                                  <span>{personaMeta?.label.split(' ')[0]}</span>
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Bottom Overlay Title on Image */}
                        <div className="absolute bottom-3.5 left-4 right-4 text-white">
                          <div className="text-[11px] font-medium text-[#FFA000] flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#FFA000] shrink-0" />
                            <span className="truncate">
                              {tour.destinations.join(' • ')}
                            </span>
                          </div>
                          <h3 className="font-serif text-lg font-bold text-white mt-1 leading-snug line-clamp-2">
                            {tour.title}
                          </h3>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5">
                        <p className="text-xs text-[#634857] line-clamp-2 leading-relaxed">
                          {tour.overview}
                        </p>

                        {/* Tour Type & Tailored Private Tour Badge */}
                        <div className="mt-3.5 pt-3 border-t border-[#F0E6EC] flex items-center justify-between">
                          <span className="text-xs font-bold text-[#4A0E35] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
                            <span>Private Custom Tour</span>
                          </span>
                          <span className="text-[11px] font-semibold text-[#523348] bg-[#FAF4F8] px-2.5 py-1 rounded-lg border border-[#EADBDF]">
                            {tour.tourType}
                          </span>
                        </div>

                        {/* Highlights Pills */}
                        <div className="mt-3 pt-2 border-t border-[#F0E6EC] space-y-1.5">
                          {tour.highlights.slice(0, 2).map((hl, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-1.5 text-xs text-[#523348]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#F05A28] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="p-5 pt-0 border-t border-[#F0E6EC] mt-2">
                      <div className="flex items-center gap-2 pt-3">
                        <Link
                          href={`/tour/${tour.id}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#4A0E35] hover:bg-[#380927] text-white text-xs font-bold transition-all shadow-xs group/btn cursor-pointer"
                        >
                          <span>View Itinerary</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => onSelectPackage(tour)}
                          className="p-2.5 rounded-xl border border-[#EADBDF] text-[#735467] hover:border-[#F05A28] hover:text-[#F05A28] bg-white transition-colors cursor-pointer"
                          title="Quick Preview Modal"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenBooking(tour.title)}
                          className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] text-[#24061A] hover:brightness-110 text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* VIEW 2: "TOUR BY YOURSELF" CUSTOM BUILDER (Requested Feature) */}
        {/* =================================================================== */}
        {activeTab === 'tour-by-yourself' && (
          <div>
            <TourByYourselfBuilder onOpenBooking={onOpenBooking} />
          </div>
        )}

        {/* =================================================================== */}
        {/* VIEW 3: 5 KEY REGIONS SPOTLIGHT */}
        {/* =================================================================== */}
        {activeTab === 'destinations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS_DATA.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EADBDF] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#26071B]/85 via-transparent to-transparent" />

                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#4A0E35]/90 backdrop-blur-md text-white text-[11px] font-bold">
                      {dest.state}
                    </span>

                    <div className="absolute bottom-3.5 left-4 right-4 text-white">
                      <h3 className="font-serif text-2xl font-bold text-white">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-[#FFA000] font-medium italic mt-0.5">
                        {dest.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-[#523348] line-clamp-3 leading-relaxed">
                      {dest.overview}
                    </p>

                    {/* Top Attractions Pills */}
                    <div className="mt-4 pt-4 border-t border-[#F0E6EC] space-y-2">
                      <div className="text-[11px] font-bold text-[#4A0E35] uppercase tracking-wider">
                        Top Sights:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.topAttractions.slice(0, 3).map((att, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-[#FAF4F8] border border-[#F0E6EC] text-[11px] text-[#523348]"
                          >
                            {att.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-[#F0E6EC] mt-4">
                  <Link
                    href={`/destination/${dest.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#4A0E35] hover:bg-[#380927] text-white text-xs font-bold transition-all shadow-md group cursor-pointer"
                  >
                    <span>View {dest.name} Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={() => onOpenBooking(dest.name)}
                    className="py-2.5 px-4 rounded-xl border border-[#F05A28] text-[#F05A28] hover:bg-[#FFF5EE] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Plan Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
