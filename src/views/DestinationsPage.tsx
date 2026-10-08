'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Compass, ArrowRight, Sun, Car, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { TOUR_PACKAGES } from '../data/toursData';
import { useApp } from '../lib/app-context';

export const DestinationsPage: React.FC = () => {
  const { onOpenBooking } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredDestinations =
    selectedFilter === 'all'
      ? DESTINATIONS_DATA
      : DESTINATIONS_DATA.filter((d) => d.id === selectedFilter);

  return (
    <div className="bg-[#FAF7F5] min-h-screen">

      {/* Hero Header */}
      <section className="relative bg-[#26071B] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop"
            alt="Royal India Heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#26071B] via-[#26071B]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFA000]/20 text-[#FFA000] border border-[#FFA000]/30 text-xs font-bold tracking-wide uppercase mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>India’s Most Iconic Cultural Circuits</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Destinations of India’s Grandeur & Mystique
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
              Explore the timeless imperial monuments of Delhi, the ethereal marble poetry of Agra, the royal desert citadels of Rajasthan, the divine Himalayan shrines of Uttarakhand, and the crisp alpine serenity of Himachal Pradesh.
            </p>
          </div>
        </div>
      </section>

      {/* Destination Filter Tabs */}
      <section className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-[#EADBDF] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#4A0E35] text-white shadow-sm'
                  : 'text-[#735467] hover:text-[#4A0E35] hover:bg-[#FAF4F8]'
              }`}
            >
              All 5 Regions
            </button>
            {DESTINATIONS_DATA.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setSelectedFilter(dest.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedFilter === dest.id
                    ? 'bg-[#F05A28] text-white shadow-sm'
                    : 'text-[#735467] hover:text-[#F05A28] hover:bg-[#FAF4F8]'
                }`}
              >
                {dest.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] text-white text-xs font-bold shadow-xs hover:brightness-110 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize Multi-City Journey</span>
          </button>
        </div>
      </section>

      {/* Destinations List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-16">
          {filteredDestinations.map((dest, idx) => {
            const connectedTours = TOUR_PACKAGES.filter((t) =>
              dest.popularTours.includes(t.id)
            );

            const isReversed = idx % 2 === 1;

            return (
              <article
                key={dest.id}
                className="bg-white rounded-3xl border border-[#EADBDF] shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual Gallery Column */}
                  <div className={`lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] ${isReversed ? 'lg:order-2' : ''}`}>
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />

                    {/* Regional Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#4A0E35]/90 text-white backdrop-blur-md text-[11px] font-bold tracking-wide">
                        {dest.state}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                      <h2 className="font-serif text-2xl font-bold">{dest.name}</h2>
                      <p className="text-xs text-white/80">{dest.tagline}</p>
                    </div>
                  </div>

                  {/* Narrative Information Column */}
                  <div className={`lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${isReversed ? 'lg:order-1' : ''}`}>
                    <div>
                      <div className="hidden lg:block">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#F05A28] uppercase tracking-wider mb-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{dest.state}</span>
                        </div>
                        <h2 className="font-serif text-3xl font-extrabold text-[#4A0E35]">
                          {dest.name}
                        </h2>
                        <p className="text-sm font-semibold text-[#F05A28] mt-1">
                          {dest.tagline}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4E3143] leading-relaxed mt-4">
                        {dest.overview}
                      </p>

                      {/* Top Landmarks Preview */}
                      <div className="mt-6">
                        <h3 className="text-xs font-bold text-[#4A0E35] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#FFA000]" />
                          <span>Signature Highlights & Experiences</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {dest.topAttractions.slice(0, 4).map((att, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-[#523348] bg-[#FAF4F8] p-2.5 rounded-xl border border-[#F0E6EC]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#F05A28] shrink-0 mt-0.5" />
                              <span className="font-semibold">{att.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Climate & Vehicle Info */}
                      <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-[#F0E6EC] text-xs text-[#735467]">
                        <div className="flex items-center gap-1.5">
                          <Sun className="w-4 h-4 text-[#FFA000]" />
                          <span><strong>Best Time:</strong> {dest.bestTimeToVisit.split('(')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Car className="w-4 h-4 text-[#F05A28]" />
                          <span><strong>Recommended:</strong> {dest.recommendedVehicles[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Tour Links */}
                    <div className="mt-8 pt-6 border-t border-[#EADBDF] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {connectedTours.map((tour) => (
                          <Link
                            key={tour.id}
                            href={`/tour/${tour.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF4F8] hover:bg-[#F0E6EC] text-[#4A0E35] text-xs font-bold border border-[#EADBDF] transition-colors"
                          >
                            <span>{tour.title.split('—')[0].trim()}</span>
                            <ArrowRight className="w-3 h-3 text-[#F05A28]" />
                          </Link>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link
                          href={`/destination/${dest.id}`}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#4A0E35] hover:bg-[#380927] text-white text-xs font-bold transition-all shadow-md group cursor-pointer"
                        >
                          <span>Explore {dest.name} Guide</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                          onClick={() => onOpenBooking(dest.name)}
                          className="px-4 py-2.5 rounded-xl border border-[#F05A28] text-[#F05A28] hover:bg-[#FFF5EE] text-xs font-bold transition-colors cursor-pointer"
                        >
                          Plan Trip
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why Travel With Rangrez Holidays */}
      <section className="bg-white border-t border-[#EADBDF] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0E35]">
            Seamless Intercity Travel Across All 5 Key Circuits
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#735467] max-w-2xl mx-auto">
            Whether cruising along the Yamuna Expressway between Delhi and Agra or navigating the high mountain passes of Himachal and Uttarakhand, our sanitized company-owned fleet and seasoned chauffeurs ensure royal comfort at every mile.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/taxi"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>Explore Chauffeur Taxi Fleet</span>
            </Link>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#4A0E35] text-[#4A0E35] hover:bg-[#FAF4F8] text-xs font-bold transition-colors cursor-pointer"
            >
              <span>View All Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
