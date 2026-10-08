'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  MapPin,
  Calendar,
  Sun,
  ShieldCheck,
  Car,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Info,
  Clock,
  Compass,
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { TOUR_PACKAGES } from '../data/toursData';
import { TAXI_FLEET } from '../data/taxiData';
import { useApp } from '../lib/app-context';

export const DestinationDetailPage: React.FC = () => {
  const { onOpenBooking } = useApp();
  const { destinationId } = useParams<{ destinationId: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const destination = DESTINATIONS_DATA.find(
    (d) => d.id.toLowerCase() === destinationId?.toLowerCase()
  );

  if (!destination) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#FAF7F5]">
        <MapPin className="w-16 h-16 text-[#F05A28] mb-4" />
        <h1 className="font-serif text-3xl font-bold text-[#4A0E35]">Destination Not Found</h1>
        <p className="mt-2 text-sm text-[#735467] max-w-md">
          The destination you are seeking is either unavailable or has been relocated.
        </p>
        <Link
          href="/destinations"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A0E35] text-white font-bold text-xs shadow-md hover:bg-[#380927]"
        >
          <span>View All 5 Destinations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Filter tour packages connected to this destination
  const relatedTours = TOUR_PACKAGES.filter((pkg) =>
    destination.popularTours.includes(pkg.id)
  );

  // Filter recommended vehicles
  const matchedVehicles = TAXI_FLEET.slice(0, 3);

  const galleryImages = [destination.heroImage, ...(destination.gallery || [])];


  return (
    <div className="bg-[#FAF7F5] min-h-screen">

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#EADBDF] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-[#735467]">
          <Link href="/" className="hover:text-[#4A0E35]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#C4B0BC]" />
          <Link href="/destinations" className="hover:text-[#4A0E35]">
            Destinations
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#C4B0BC]" />
          <span className="text-[#F05A28] font-bold">{destination.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#26071B] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-45">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#200516]/95 via-[#200516]/75 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFA000] text-[#3B0827] text-xs font-bold tracking-wide uppercase mb-4 shadow-md">
              <Compass className="w-3.5 h-3.5" />
              <span>{destination.state}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {destination.name}
            </h1>

            <p className="mt-3 font-serif text-lg sm:text-xl text-[#FFA000] italic">
              {destination.tagline}
            </p>

            <p className="mt-5 text-sm sm:text-base text-white/85 leading-relaxed">
              {destination.overview}
            </p>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenBooking(destination.name)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] text-[#24061A] text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan a Custom Trip to {destination.name}</span>
              </button>

              <a
                href={`https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20want%20to%20plan%20a%20private%20trip%20to%20${encodeURIComponent(destination.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Expert</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Interactive Image Gallery */}
            <div className="bg-white rounded-3xl p-5 border border-[#EADBDF] shadow-md">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/5 relative">
                <img
                  src={galleryImages[activeImageIndex] || destination.heroImage}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#F05A28] ring-2 ring-[#F05A28]/20 scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Cultural Significance & History */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBDF] shadow-md">
              <h2 className="font-serif text-2xl font-bold text-[#4A0E35] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFA000]" />
                <span>Cultural Heritage & Timeless Significance</span>
              </h2>
              <p className="text-sm text-[#4E3143] leading-relaxed">
                {destination.culturalSignificance}
              </p>
            </div>

            {/* Top Iconic Attractions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBDF] shadow-md">
              <h2 className="font-serif text-2xl font-bold text-[#4A0E35] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#F05A28]" />
                <span>Top Iconic Sights & Experiences in {destination.name}</span>
              </h2>

              <div className="space-y-4">
                {destination.topAttractions.map((att, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FAF4F8] border border-[#F0E6EC] hover:border-[#EADBDF] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4A0E35] to-[#F05A28] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#4A0E35]">{att.name}</h3>
                        <p className="text-xs text-[#523348] mt-1 leading-relaxed">
                          {att.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Tour Packages Passing Through Destination */}
            {relatedTours.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBDF] shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-[#4A0E35]">
                      Curated Tour Packages Featuring {destination.name}
                    </h2>
                    <p className="text-xs text-[#735467] mt-1">
                      Private chauffeur-guided itineraries with flexible departures
                    </p>
                  </div>
                  <Link
                    href="/tours"
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#F05A28] hover:underline"
                  >
                    <span>All Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedTours.map((tour) => (
                    <div
                      key={tour.id}
                      className="border border-[#EADBDF] rounded-2xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between bg-white"
                    >
                      <div>
                        <div className="h-44 overflow-hidden relative">
                          <img
                            src={tour.heroImage}
                            alt={tour.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#4A0E35]/90 backdrop-blur-md text-white text-[11px] font-bold">
                            {tour.duration}
                          </span>
                        </div>

                        <div className="p-4">
                          <h3 className="font-serif text-base font-bold text-[#4A0E35] group-hover:text-[#F05A28] transition-colors">
                            {tour.title}
                          </h3>
                          <p className="text-xs text-[#735467] mt-1.5 line-clamp-2">
                            {tour.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 pt-0 flex items-center justify-between border-t border-[#F0E6EC] mt-3">
                        <span className="text-[11px] font-bold text-[#F05A28]">
                          {tour.destinations.length} Destinations
                        </span>
                        <Link
                          href={`/tour/${tour.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF4F8] hover:bg-[#F05A28] hover:text-white text-[#4A0E35] text-xs font-bold transition-colors cursor-pointer"
                        >
                          <span>View Full Itinerary</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Tips & Local Knowledge */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBDF] shadow-md">
              <h2 className="font-serif text-2xl font-bold text-[#4A0E35] mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-[#FFA000]" />
                <span>Insider Travel Tips & Route Advice</span>
              </h2>
              <div className="space-y-3">
                {destination.travelTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4E3143]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Trip Planning Box */}
            <div className="bg-gradient-to-br from-[#4A0E35] to-[#2D061F] rounded-3xl p-6 text-white shadow-xl sticky top-28">
              <div className="inline-flex items-center gap-1 text-[#FFA000] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Travel Inquiry</span>
              </div>

              <h3 className="font-serif text-xl font-bold">
                Experience {destination.name} Privately
              </h3>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Enjoy a private chauffeur, sanitized AC vehicle, handpicked heritage hotels, and licensed monument storytellers tailored to your dates.
              </p>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => onOpenBooking(destination.name)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] hover:brightness-110 text-[#24061A] text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Inquire Tour to {destination.name}</span>
                </button>

                <a
                  href={`https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20want%20to%20know%20about%20travel%20packages%20for%20${encodeURIComponent(destination.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Destination Quick Facts */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">State / Territory:</span>
                  <span className="font-semibold text-white">{destination.state}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Best Months:</span>
                  <span className="font-semibold text-[#FFA000]">
                    {destination.bestTimeToVisit.split('(')[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Tour Duration:</span>
                  <span className="font-semibold text-white">Same Day to 10 Days</span>
                </div>
              </div>
            </div>

            {/* Recommended Fleet */}
            <div className="bg-white rounded-3xl p-6 border border-[#EADBDF] shadow-md">
              <h3 className="font-serif text-lg font-bold text-[#4A0E35] mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-[#F05A28]" />
                <span>Recommended Fleet for this Region</span>
              </h3>
              <p className="text-xs text-[#735467] mb-4">
                Chauffeur-driven sanitized vehicles optimized for {destination.name} roads:
              </p>

              <div className="space-y-2">
                {destination.recommendedVehicles.map((vehicleName, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF4F8] border border-[#F0E6EC] text-xs font-semibold text-[#4A0E35] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{vehicleName}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/taxi"
                className="mt-4 block text-center text-xs font-bold text-[#F05A28] hover:underline"
              >
                View Taxi Fleet Specifications →
              </Link>
            </div>

            {/* Climate & Weather */}
            <div className="bg-white rounded-3xl p-6 border border-[#EADBDF] shadow-md">
              <h3 className="font-serif text-lg font-bold text-[#4A0E35] mb-2 flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#FFA000]" />
                <span>Climate & Seasonal Guide</span>
              </h3>
              <p className="text-xs text-[#523348] leading-relaxed">
                {destination.climateInfo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
