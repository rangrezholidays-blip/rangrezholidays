'use client';

import React, { useState } from 'react';
import {
  Car,
  Users,
  Briefcase,
  Fuel,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Sparkles,
  MapPin,
  Calendar,
  MessageSquare,
  Award,
  Navigation,
} from 'lucide-react';
import { TAXI_FLEET } from '../data/taxiData';
import { TaxiVehicle } from '../types';
import { useApp } from '../lib/app-context';

export const TaxiPage: React.FC = () => {
  const { onBookTaxi, onOpenBooking } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'suv' | 'sedan' | 'van' | 'luxury'>('all');

  const filteredFleet =
    activeCategory === 'all'
      ? TAXI_FLEET
      : TAXI_FLEET.filter((v) => v.category === activeCategory);

  return (
    <div className="bg-[#FAF7F5] min-h-screen">

      {/* Hero Header */}
      <section className="relative bg-[#26071B] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Chauffeur Fleet"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#26071B] via-[#26071B]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFA000]/20 text-[#FFA000] border border-[#FFA000]/30 text-xs font-bold tracking-wide uppercase mb-3">
              <Car className="w-3.5 h-3.5" />
              <span>Chauffeur & Intercity Mobility Solutions</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Premium Chauffeur Taxi Fleet & Rentals
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
              Experience serene road journeys across Delhi, Agra, Rajasthan, Uttarakhand, and Himachal Pradesh. Our sanitized fleet of executive sedans, Toyota Innova Crysta, Force Urbania VIP coaches, and Mercedes luxury cars are captained by courteous, route-seasoned chauffeurs.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] text-[#24061A] text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Chauffeur Taxi</span>
              </button>

              <a
                href="https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20need%20a%20chauffeur%20taxi%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="bg-white border-b border-[#EADBDF] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-[#4A0E35]">Police Verified Chauffeurs</h4>
            <p className="text-[11px] text-[#735467] mt-0.5">Uniformed & English/Hindi speaking</p>
          </div>
          <div className="p-3">
            <Navigation className="w-6 h-6 text-[#F05A28] mx-auto mb-2" />
            <h4 className="text-xs font-bold text-[#4A0E35]">All India Tourist Permits</h4>
            <p className="text-[11px] text-[#735467] mt-0.5">Seamless toll, border & tax compliance</p>
          </div>
          <div className="p-3">
            <Fuel className="w-6 h-6 text-[#FFA000] mx-auto mb-2" />
            <h4 className="text-xs font-bold text-[#4A0E35]">No Hidden Toll or Surcharges</h4>
            <p className="text-[11px] text-[#735467] mt-0.5">Transparent commercial invoicing</p>
          </div>
          <div className="p-3">
            <Award className="w-6 h-6 text-[#4A0E35] mx-auto mb-2" />
            <h4 className="text-xs font-bold text-[#4A0E35]">100% Sanitized Company Fleet</h4>
            <p className="text-[11px] text-[#735467] mt-0.5">Complimentary bottled water & napkins</p>
          </div>
        </div>
      </section>

      {/* Fleet Filter Tabs */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#EADBDF] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Fleet Models' },
              { id: 'suv', label: 'Innova Crysta / SUVs' },
              { id: 'sedan', label: 'Executive Sedans' },
              { id: 'van', label: 'Urbania & Maharaja Tempo' },
              { id: 'luxury', label: 'VIP Mercedes & Audi' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#4A0E35] text-white shadow-sm'
                    : 'text-[#735467] hover:text-[#4A0E35] hover:bg-[#FAF4F8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#735467] hidden md:block shrink-0">
            Showing {filteredFleet.length} models
          </span>
        </div>
      </section>

      {/* Fleet Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((cab) => (
            <div
              key={cab.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EADBDF] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-black/5">
                  <img
                    src={cab.image}
                    alt={cab.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 bg-[#4A0E35] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {cab.category.toUpperCase()}
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl font-bold">{cab.name}</h3>
                    <p className="text-xs text-white/80">{cab.tagline}</p>
                  </div>
                </div>

                {/* Specs */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-2 bg-[#FAF4F8] p-3 rounded-2xl border border-[#F0E6EC] text-xs">
                    <div className="flex items-center gap-2 text-[#4A0E35]">
                      <Users className="w-4 h-4 text-[#F05A28]" />
                      <span className="font-semibold">{cab.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4A0E35]">
                      <Briefcase className="w-4 h-4 text-[#FFA000]" />
                      <span className="font-semibold">{cab.luggage}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#523348] leading-relaxed">
                    {cab.tagline}
                  </p>

                  {/* Amenities */}
                  <div>
                    <div className="text-[11px] font-bold text-[#4A0E35] uppercase tracking-wider mb-2">
                      Included Amenities:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cab.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF4F8] border border-[#F0E6EC] text-[11px] text-[#523348]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ideal For: {cab.idealFor}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onBookTaxi(cab)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] hover:from-[#3B0827] hover:to-[#D84315] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Car className="w-4 h-4" />
                  <span>Book {cab.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
