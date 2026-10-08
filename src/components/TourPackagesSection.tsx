'use client';

import React, { useState } from 'react';
import { Clock, MapPin, Sparkles, ChevronRight, Calendar, Users, Eye } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/toursData';
import { TourPackage } from '../types';

interface TourPackagesSectionProps {
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export const TourPackagesSection: React.FC<TourPackagesSectionProps> = ({
  onSelectPackage,
  onBookPackage,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Curated Tours' },
    { id: 'golden-triangle', label: 'Golden Triangle' },
    { id: 'rajasthan', label: 'Rajasthan Royal Heritage' },
    { id: 'char-dham', label: 'Char Dham Yatra' },
    { id: 'same-day', label: 'Same Day Express' },
  ];

  const filteredPackages =
    activeCategory === 'all'
      ? TOUR_PACKAGES
      : TOUR_PACKAGES.filter((p) => p.category === activeCategory);

  return (
    <section id="packages" className="py-20 bg-[#FAF7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Journeys</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E35]">
            Handcrafted Indian Odyssey Packages
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#634857] leading-relaxed">
            Immerse yourself in authentic royal heritage, sacred mountain trails, and seamless private chauffeur travel. Every tour is custom tailored to your preferred pace, private dates, and comfort.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#4A0E35] text-white shadow-md'
                  : 'bg-white text-[#634857] hover:text-[#4A0E35] border border-[#EADBDF] hover:border-[#F05A28]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EADBDF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Badges */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={pkg.heroImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-[#FFA000] text-[#3B0827] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {pkg.tourType}
                  </span>
                  <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/20">
                    {pkg.duration}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-white/90">
                    <MapPin className="w-3.5 h-3.5 text-[#FFA000] shrink-0" />
                    <span className="truncate">{pkg.destinations.join(' • ')}</span>
                  </div>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#4A0E35] group-hover:text-[#F05A28] transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#735467] font-medium mt-1 line-clamp-1">
                    {pkg.tagline}
                  </p>

                  <p className="text-xs text-[#523345] mt-3 line-clamp-3 leading-relaxed">
                    {pkg.overview}
                  </p>

                  {/* Highlights preview */}
                  <div className="mt-4 pt-3 border-t border-[#EADBDF]/70">
                    <span className="text-[10px] uppercase font-bold text-[#F05A28] tracking-wider block mb-1.5">
                      Curated Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-[#634857]">
                      {pkg.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28] mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom: strictly NO price tag, prioritizing narrative & engagement */}
                <div className="mt-6 pt-4 border-t border-[#EADBDF] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-[#735467]">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-[#F05A28]" />
                      <span>{pkg.groupSize}</span>
                    </span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      ✓ Instant Availability Check
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => onSelectPackage(pkg)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#4A0E35] text-[#4A0E35] hover:bg-[#FAF4F8] text-xs font-bold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Itinerary</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onBookPackage(pkg)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] hover:from-[#3B0827] hover:to-[#D84315] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Check Dates</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
