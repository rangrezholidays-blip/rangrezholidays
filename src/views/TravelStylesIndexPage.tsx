'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { TRAVEL_STYLES_DATA } from '../data/travelStylesData';
import { TravelStyle } from '../types';
import { useApp } from '../lib/app-context';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop';

export const TravelStylesIndexPage: React.FC = () => {
  const { onOpenBooking } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredStyles =
    selectedFilter === 'all'
      ? TRAVEL_STYLES_DATA
      : TRAVEL_STYLES_DATA.filter((s) => s.id === selectedFilter);

  return (
    <div className="bg-[#FAF7F5] min-h-screen pb-24">

      {/* 1. Hero Header */}
      <div className="relative bg-[#24061A] text-white py-16 sm:py-24 overflow-hidden border-b border-[#4A0E35]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1600&auto=format&fit=crop"
            alt="Travel Styles Header"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24061A] via-[#24061A]/85 to-[#24061A]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFA000] text-xs font-bold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Curated by How You Travel</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore by Travel Persona & Companion
          </h1>

          <p className="mt-4 text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Whether you are planning a multi-generational family vacation, a romantic palace honeymoon, a thrilling friends road trip, a solo cultural wander, or an executive corporate retreat — discover bespoke itineraries and calibrated chauffeur fleet designed for your exact companion style.
          </p>

          {/* Persona Filter Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-white text-[#4A0E35] shadow-md'
                  : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/15'
              }`}
            >
              All Travel Styles ({TRAVEL_STYLES_DATA.length})
            </button>
            {TRAVEL_STYLES_DATA.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedFilter(style.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedFilter === style.id
                    ? 'bg-[#FFA000] text-[#24061A] font-extrabold shadow-md'
                    : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/15'
                }`}
              >
                <span>{style.icon}</span>
                <span>{style.navLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Personas Cards List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {filteredStyles.map((style, index) => (
          <div
            key={style.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#EADBDF] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row group"
          >
            {/* Visual Image Side */}
            <div className="lg:w-2/5 relative min-h-[280px] lg:min-h-full overflow-hidden bg-[#24061A]">
              <img
                src={style.cardImage}
                alt={style.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-black/60" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/95 text-[#4A0E35] text-xs font-extrabold shadow-sm flex items-center gap-1">
                  <span>{style.icon}</span>
                  <span>{style.navLabel}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#4A0E35]/90 text-[#FFA000] text-[10px] font-bold">
                  {style.badge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] text-white/80 font-semibold">Private Experiences</div>
                <div className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FFA000]" />
                  <span>Tailored Custom Itineraries</span>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#F05A28] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{style.stats.toursCount} Curated Circuits Available</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0E35]">
                  {style.title}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-[#5C3F51] leading-relaxed">
                  {style.tagline}
                </p>

                <p className="mt-3 text-xs text-[#735467] leading-relaxed line-clamp-3">
                  {style.overview}
                </p>

                {/* Key Tailored Perks */}
                <div className="mt-5 pt-4 border-t border-[#F0E6EC]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#735467] mb-2.5">
                    Signature Amenities & Inclusions:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {style.tailoredPerks.slice(0, 4).map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-[#422638]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="font-medium">{perk.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Info Bar */}
                <div className="mt-5 p-3 rounded-2xl bg-[#FAF7F5] border border-[#EADBDF] flex flex-wrap items-center justify-between gap-3 text-xs text-[#735467]">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#87687B]">Pacing</span>
                    <span className="font-semibold text-[#4A0E35]">
                      {style.travelPacing.split('(')[0]}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#87687B]">Ideal Fleet</span>
                    <span className="font-semibold text-[#4A0E35]">
                      {style.id === 'family'
                        ? 'Toyota Innova Crysta'
                        : style.id === 'honeymoon'
                        ? 'Executive Sedan / Luxury'
                        : style.id === 'friends'
                        ? 'Maharaja Tempo / Urbania'
                        : style.id === 'solo'
                        ? 'Chauffeured Sedan'
                        : 'Force Urbania Coach'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-[#87687B]">Satisfaction</span>
                    <span className="font-bold text-emerald-600">{style.stats.satisfactionRate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-[#F0E6EC] flex flex-wrap items-center gap-3">
                <Link
                  href={`/travel-style/${style.id}`}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] text-white text-xs font-bold shadow-sm hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Dedicated {style.navLabel} Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => onOpenBooking(style.title)}
                  className="py-2.5 px-4 rounded-xl border border-[#4A0E35]/25 text-[#4A0E35] text-xs font-bold hover:bg-[#FAF4F8] transition-colors cursor-pointer"
                >
                  Plan Custom Itinerary
                </button>

                <a
                  href={`https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20want%20to%20inquire%20about%20a%20${encodeURIComponent(
                    style.navLabel
                  )}%20tour.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-emerald-700 text-xs font-bold hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Specialist</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
