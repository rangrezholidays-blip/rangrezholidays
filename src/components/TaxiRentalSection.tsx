'use client';

import React, { useState } from 'react';
import {
  Car,
  Users,
  Briefcase,
  Fuel,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Phone,
  Sparkles,
  Navigation,
  Wind,
  Wifi,
} from 'lucide-react';
import { TAXI_FLEET } from '../data/taxiData';
import { TaxiVehicle } from '../types';

interface TaxiRentalSectionProps {
  onBookTaxi: (vehicle: TaxiVehicle) => void;
}

export const TaxiRentalSection: React.FC<TaxiRentalSectionProps> = ({ onBookTaxi }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'suv' | 'sedan' | 'van' | 'luxury'>('all');

  const filteredFleet =
    activeTab === 'all'
      ? TAXI_FLEET
      : TAXI_FLEET.filter((v) => v.category === activeTab);

  return (
    <section id="taxi" className="py-20 bg-white border-y border-[#EADBDF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-3">
              <Car className="w-3.5 h-3.5" />
              <span>Chauffeur & Fleet Rental</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E35]">
              Comprehensive Taxi Rental Solutions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#634857] leading-relaxed">
              Travel across North India, Rajasthan, and Uttarakhand with peace of mind. Our company-owned, GPS-tracked fleet is driven by uniform-attired, polite, police-verified chauffeurs with transparent policies.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Fleet' },
              { id: 'suv', label: 'Innova Crysta / SUVs' },
              { id: 'sedan', label: 'Executive Sedans' },
              { id: 'van', label: 'Urbania & Tempo' },
              { id: 'luxury', label: 'Luxury VIP' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#4A0E35] text-white shadow-sm'
                    : 'bg-[#FAF4F8] text-[#634857] hover:bg-[#FAF0F5] border border-[#EADBDF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((cab) => (
            <div
              key={cab.id}
              className="bg-[#FAF7F5] rounded-3xl overflow-hidden border border-[#EADBDF] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={cab.image}
                  alt={cab.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24061A]/80 via-transparent to-transparent" />

                <span className="absolute top-3 left-3 bg-[#4A0E35] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {cab.category.toUpperCase()}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-lg font-bold text-white drop-shadow">
                    {cab.name}
                  </h3>
                  <p className="text-xs text-white/85 line-clamp-1">{cab.tagline}</p>
                </div>
              </div>

              {/* Specs and details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                {/* Capacity indicators */}
                <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-2xl border border-[#EADBDF]/70 text-xs text-[#4A0E35]">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#F05A28] shrink-0" />
                    <span className="font-medium truncate">{cab.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#F05A28] shrink-0" />
                    <span className="font-medium truncate">{cab.luggage}</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#F05A28] tracking-wider block mb-2">
                    Fleet Inclusions & Amenities:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#634857]">
                    {cab.features.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <div className="bg-[#FFF5EE] p-3 rounded-xl border border-[#F05A28]/20 text-xs">
                  <span className="font-bold text-[#4A0E35] block mb-0.5">Ideal Journeys:</span>
                  <p className="text-[#8C3A16] text-[11px] leading-snug">{cab.idealFor}</p>
                </div>

                {/* CTA */}
                <div className="pt-3 border-t border-[#EADBDF] flex items-center gap-2">
                  <a
                    href={`https://wa.me/919760402549?text=${encodeURIComponent(
                      `Namaste! I would like to book or inquire about the ${cab.name} taxi rental.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-emerald-500 text-emerald-700 hover:bg-emerald-50 text-xs transition-colors"
                    title="Inquire on WhatsApp"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onBookTaxi(cab)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] hover:from-[#3B0827] hover:to-[#D84315] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Request Taxi & Driver</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Taxi Service Guarantees Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#4A0E35] via-[#5A123E] to-[#4A0E35] rounded-3xl p-6 sm:p-8 text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFA000]/20 text-[#FFA000] flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white">All-India Tourist Permit</h4>
                <p className="text-xs text-white/75 mt-0.5">Smooth interstate travel with prepaid toll taxes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFA000]/20 text-[#FFA000] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white">Police-Verified Drivers</h4>
                <p className="text-xs text-white/75 mt-0.5">English/Hindi speaking with 10+ years experience.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFA000]/20 text-[#FFA000] flex items-center justify-center shrink-0">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white">Deep-Cleaned & Sanitized</h4>
                <p className="text-xs text-white/75 mt-0.5">Fresh upholstery, chilled dual AC, and mineral water.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFA000]/20 text-[#FFA000] flex items-center justify-center shrink-0">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white">24x7 GPS Fleet Radar</h4>
                <p className="text-xs text-white/75 mt-0.5">Central control room tracking for high passenger safety.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
