'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Compass,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Search,
  Sparkles,
  Car,
  Filter,
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/toursData';
import { useApp } from '../lib/app-context';

export const ToursPage: React.FC = () => {
  const { onOpenBooking } = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Curated Tours' },
    { id: 'golden-triangle', label: 'Golden Triangle' },
    { id: 'rajasthan', label: 'Rajasthan Royalty' },
    { id: 'char-dham', label: 'Char Dham Pilgrimage' },
    { id: 'himachal', label: 'Himachal Pradesh' },
    { id: 'same-day', label: 'Same Day Express' },
  ];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const params = new URLSearchParams(searchParams.toString());
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filteredTours = TOUR_PACKAGES.filter((tour) => {
    const matchesCategory =
      activeCategory === 'all' ? true : tour.category === activeCategory;

    const matchesSearch =
      searchQuery === ''
        ? true
        : tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.destinations.some((d) =>
            d.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          tour.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF7F5] min-h-screen">

      {/* Hero Header */}
      <section className="relative bg-[#26071B] text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop"
            alt="Rajasthan Fort & Dunes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#26071B] via-[#26071B]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFA000]/20 text-[#FFA000] border border-[#FFA000]/30 text-xs font-bold tracking-wide uppercase mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Royal Private Departures</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Curated Tour Packages Across India
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">
              Every package is conducted with dedicated private chauffeurs, sanitized vehicles, licensed monument guides, and handpicked heritage accommodations. Prioritizing immersive cultural narratives with tailored dates.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#EADBDF] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#4A0E35] text-white shadow-sm'
                    : 'text-[#735467] hover:text-[#4A0E35] hover:bg-[#FAF4F8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-[#735467] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city, fort, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-[#4A0E35] placeholder:text-[#9A7D90] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
            />
          </div>
        </div>
      </section>

      {/* Tour Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs font-bold text-[#735467] uppercase tracking-wider">
            Showing {filteredTours.length} bespoke itineraries
          </p>
          <div className="text-xs text-[#735467] hidden sm:block">
            ✨ No hidden costs • 100% Private Departures
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-3xl border border-[#EADBDF] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={tour.heroImage}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#4A0E35]/90 backdrop-blur-md text-white text-[11px] font-bold shadow-xs">
                      {tour.tourType}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FFA000] text-[#24061A] text-[11px] font-bold shadow-xs">
                      {tour.duration}
                    </span>
                  </div>

                  {/* Destinations Bottom Strip */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-1.5 text-white/90 text-xs truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#FFA000] shrink-0" />
                    <span className="truncate font-medium">
                      {tour.destinations.join(' • ')}
                    </span>
                  </div>
                </div>

                {/* Tour Info */}
                <div className="p-6">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4A0E35] group-hover:text-[#F05A28] transition-colors leading-snug">
                    {tour.title}
                  </h3>
                  <p className="text-xs font-medium text-[#F05A28] mt-1">
                    {tour.tagline}
                  </p>

                  <p className="text-xs text-[#523348] mt-3 line-clamp-3 leading-relaxed">
                    {tour.overview}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="mt-4 pt-4 border-t border-[#F0E6EC] space-y-2">
                    <div className="text-[11px] font-bold text-[#4A0E35] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#FFA000]" />
                      <span>Signature Highlights</span>
                    </div>
                    {tour.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#523348]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F05A28] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-[#F0E6EC] mt-4 flex items-center gap-3">
                <Link
                  href={`/tour/${tour.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[#4A0E35] hover:bg-[#380927] text-white text-xs font-bold transition-all shadow-md group cursor-pointer"
                >
                  <span>Explore Tour & Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => onOpenBooking(tour.title)}
                  className="py-3 px-4 rounded-xl border border-[#F05A28] text-[#F05A28] hover:bg-[#FFF5EE] text-xs font-bold transition-colors cursor-pointer"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EADBDF] my-8">
            <Compass className="w-12 h-12 text-[#C4B0BC] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#4A0E35]">
              No tours matched your criteria
            </h3>
            <p className="text-xs text-[#735467] mt-1">
              Try searching for a different destination or reset your filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-[#4A0E35] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
