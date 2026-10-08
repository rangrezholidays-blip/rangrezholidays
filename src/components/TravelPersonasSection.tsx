'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Heart,
  Compass,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { TRAVEL_STYLES_DATA } from '../data/travelStylesData';
import { TravelStyle } from '../types';

interface TravelPersonasSectionProps {
  onOpenBooking: (prefillTour?: string) => void;
}

const FALLBACK_PERSONA_IMAGE =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop';

export const TravelPersonasSection: React.FC<TravelPersonasSectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <section
      id="travel-personas"
      className="py-16 sm:py-24 bg-[#FFFDFB] border-b border-[#EADBDF] relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FAF0E6]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#FFF5EE]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-3.5">
              <Users className="w-3.5 h-3.5" />
              <span>Explore by Travel Persona & Companion</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E35] tracking-tight leading-tight">
              Tailored Itineraries for How You Travel
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-[#634857] leading-relaxed">
              Every travel companion has unique rhythms. Whether you are holidaying with curious toddlers and grandparents, celebrating a royal honeymoon, seeking thrills with your best friends, embarking on a solo cultural quest, or organizing an executive corporate retreat — we calibrate the fleet, hotel amenities, and pacing specifically for you.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/travel-styles"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#4A0E35]/20 text-xs font-bold text-[#4A0E35] hover:bg-[#FAF4F8] transition-colors group cursor-pointer"
            >
              <span>View All 5 Travel Styles</span>
              <ArrowRight className="w-4 h-4 text-[#F05A28] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 5 Travel Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TRAVEL_STYLES_DATA.map((style, index) => {
            const isFeatured = index === 0 || index === 1; // Family & Honeymoon get top highlight styling
            return (
              <div
                key={style.id}
                className={`bg-white rounded-3xl overflow-hidden border border-[#EADBDF] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group ${
                  index === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Visual Image Header with Floating Badges */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-[#24061A]">
                    <img
                      src={style.cardImage}
                      alt={style.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_PERSONA_IMAGE;
                      }}
                    />
                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24061A]/85 via-black/20 to-black/30" />

                    {/* Top Floating Badges */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#4A0E35] text-[11px] font-extrabold shadow-sm">
                        <span>{style.icon}</span>
                        <span>{style.navLabel}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#4A0E35]/90 backdrop-blur-md text-[#FFA000] text-[10px] font-bold border border-[#FFA000]/30">
                        <Sparkles className="w-3 h-3 text-[#FFA000]" />
                        <span>{style.stats.toursCount} Curated Circuits</span>
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3.5 left-4 right-4 text-white">
                      <div className="text-[11px] text-[#FFA000] font-bold uppercase tracking-wider">
                        {style.badge}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug drop-shadow-sm">
                        {style.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content & Features */}
                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-[#5C3F51] leading-relaxed mb-4 min-h-[3rem]">
                      {style.tagline}
                    </p>

                    {/* Highlighted Tailored Amenities */}
                    <div className="space-y-2 pt-3 border-t border-[#F0E6EC] mb-5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#735467]">
                        Tailored Inclusions & Perks:
                      </div>
                      {style.tailoredPerks.slice(0, 3).map((perk, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2 text-xs text-[#422638]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="line-clamp-1 font-medium">{perk.title}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quick Specs Pill Box */}
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-[#FAF7F5] border border-[#EADBDF] text-[11px]">
                      <div>
                        <span className="text-[#87687B] block text-[10px]">Recommended Fleet</span>
                        <span className="font-bold text-[#4A0E35] truncate block">
                          {style.id === 'family'
                            ? 'Toyota Innova Crysta'
                            : style.id === 'honeymoon'
                            ? 'Executive Sedan / Luxury'
                            : style.id === 'friends'
                            ? 'Maharaja Tempo / Urbania'
                            : style.id === 'solo'
                            ? 'Chauffeured Sedan'
                            : 'Luxury Force Urbania'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#87687B] block text-[10px]">Itinerary Customization</span>
                        <span className="font-bold text-[#4A0E35] block">
                          100% Bespoke Private
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5">
                  <Link
                    href={`/travel-style/${style.id}`}
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] text-white text-xs font-bold text-center shadow-sm hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Dedicated Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(style.title)}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-[#4A0E35]/25 text-[#4A0E35] text-xs font-bold hover:bg-[#FAF4F8] transition-colors text-center cursor-pointer"
                  >
                    Quick Inquiry
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner for Custom Trip Planning */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#4A0E35] via-[#350A26] to-[#F05A28] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#FFA000] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FFA000]" />
              <span>Bespoke Travel Engineering</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Can't find an exact match? We customize any itinerary.
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed">
              Combine multiple destinations, pick your preferred vehicle fleet, and tell us your group size — our senior destination specialists will generate a complete day-by-day plan within 30 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="py-3 px-6 rounded-xl bg-white text-[#4A0E35] text-xs font-extrabold hover:bg-[#FFF5EE] transition-all shadow-md cursor-pointer"
            >
              Plan Custom Trip
            </button>
            <a
              href="https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20would%20like%20to%20customize%20a%20private%20tour%20for%20my%20group."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
            >
              <span>WhatsApp Specialist</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
