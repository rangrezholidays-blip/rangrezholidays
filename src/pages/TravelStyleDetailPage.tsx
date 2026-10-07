import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  ChevronDown,
  ChevronUp,
  Car,
  ArrowRight,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { TRAVEL_STYLES_DATA } from '../data/travelStylesData';
import { TOUR_PACKAGES } from '../data/toursData';
import { TAXI_FLEET } from '../data/taxiData';
import { TourPackage, TaxiVehicle } from '../types';
import { TRAVEL_STYLE_SEO, canonicalUrl } from '../data/seoData';

interface TravelStyleDetailPageProps {
  onOpenBooking: (prefillTour?: string) => void;
  onSelectPackage?: (pkg: TourPackage) => void;
  onBookTaxi?: (vehicle: TaxiVehicle) => void;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1600&auto=format&fit=crop';

export const TravelStyleDetailPage: React.FC<TravelStyleDetailPageProps> = ({
  onOpenBooking,
  onSelectPackage,
  onBookTaxi,
}) => {
  const { styleId } = useParams<{ styleId: string }>();
  const navigate = useNavigate();

  const currentStyle = TRAVEL_STYLES_DATA.find(
    (s) => s.id.toLowerCase() === styleId?.toLowerCase()
  );

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // If style not found
  if (!currentStyle) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF7F5]">
        <div className="text-4xl mb-4">🧭</div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0E35]">
          Travel Style Not Found
        </h1>
        <p className="mt-2 text-sm text-[#735467] max-w-md">
          We couldn't find the travel companion persona you were looking for. Please choose from our curated categories below.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {TRAVEL_STYLES_DATA.map((s) => (
            <Link
              key={s.id}
              to={`/travel-style/${s.id}`}
              className="px-4 py-2 rounded-xl bg-white border border-[#EADBDF] text-xs font-bold text-[#4A0E35] hover:bg-[#FFF5EE] transition-colors"
            >
              {s.icon} {s.navLabel}
            </Link>
          ))}
        </div>
        <Link
          to="/"
          className="mt-8 text-xs font-bold text-[#F05A28] hover:underline"
        >
          ← Return to Home
        </Link>
      </div>
    );
  }

  // Filter matching tours
  const matchingTours = TOUR_PACKAGES.filter((t) =>
    currentStyle.matchingTourIds.includes(t.id)
  );

  // Filter matching vehicles
  const matchingVehicles = TAXI_FLEET.filter((v) =>
    currentStyle.recommendedVehicleIds.includes(v.id)
  );

  const seo = TRAVEL_STYLE_SEO[currentStyle.id] ?? {
    title: `${currentStyle.title} | Rangrez Holidays`,
    description: currentStyle.tagline,
    path: `/travel-style/${currentStyle.id}`,
  };

  return (
    <div className="bg-[#FAF7F5] min-h-screen pb-24">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonicalUrl(seo.path)} />
      </Helmet>

      {/* 1. Breadcrumbs Bar */}
      <div className="bg-[#FAF4F8] border-b border-[#EADBDF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#735467]">
            <Link to="/" className="hover:text-[#4A0E35] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/travel-styles" className="hover:text-[#4A0E35] transition-colors">
              Travel Styles
            </Link>
            <span>/</span>
            <span className="font-bold text-[#4A0E35]">{currentStyle.navLabel}</span>
          </div>

          <Link
            to="/travel-styles"
            className="hidden sm:inline-flex items-center gap-1 font-bold text-[#F05A28] hover:underline text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Personas</span>
          </Link>
        </div>
      </div>

      {/* 2. Hero Visual Header */}
      <div className="relative bg-[#24061A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={currentStyle.heroImage}
            alt={currentStyle.title}
            className="w-full h-full object-cover opacity-35 filter blur-[0.5px] scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24061A] via-[#24061A]/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFA000] text-xs font-bold uppercase tracking-wider mb-4">
              <span className="text-base">{currentStyle.icon}</span>
              <span>{currentStyle.badge}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {currentStyle.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed font-light">
              {currentStyle.tagline}
            </p>

            {/* Quick Stats Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                <span className="block text-[11px] text-white/70 uppercase font-semibold">Itinerary Type</span>
                <span className="font-bold text-sm sm:text-base text-[#FFA000]">
                  100% Private
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                <span className="block text-[11px] text-white/70 uppercase font-semibold">Satisfaction</span>
                <span className="font-bold text-sm sm:text-base text-emerald-400">
                  {currentStyle.stats.satisfactionRate}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                <span className="block text-[11px] text-white/70 uppercase font-semibold">Curated Circuits</span>
                <span className="font-bold text-sm sm:text-base text-white">
                  {currentStyle.stats.toursCount} Packages
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                <span className="block text-[11px] text-white/70 uppercase font-semibold">Ideal Trip Length</span>
                <span className="font-bold text-sm sm:text-base text-white">
                  {currentStyle.stats.avgTripDays}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenBooking(currentStyle.title)}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] text-white text-xs sm:text-sm font-extrabold shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Plan My {currentStyle.navLabel} Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20am%20interested%20in%20planning%20a%20${encodeURIComponent(
                  currentStyle.navLabel
                )}%20tour.`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-md transition-all flex items-center gap-2 border border-white/25"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Specialist</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Style Persona Switcher Bar */}
      <div className="sticky top-20 z-30 bg-white border-b border-[#EADBDF] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#735467] uppercase tracking-wider shrink-0 mr-1">
            Other Styles:
          </span>
          {TRAVEL_STYLES_DATA.map((s) => {
            const isSelected = s.id === currentStyle.id;
            return (
              <Link
                key={s.id}
                to={`/travel-style/${s.id}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-[#4A0E35] text-white shadow-xs'
                    : 'bg-[#FAF7F5] text-[#5C3F51] hover:bg-[#FFF5EE] border border-[#EADBDF]'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.navLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main 2-Column Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview & Why Rangrez */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBDF] shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#4A0E35] mb-3">
                Crafted Exclusively for {currentStyle.navLabel}
              </h2>
              <p className="text-sm text-[#5C3F51] leading-relaxed mb-6">
                {currentStyle.overview}
              </p>

              <div className="border-t border-[#F0E6EC] pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#735467] mb-4">
                  Why Discerning Travelers Choose Us for This Style:
                </h3>
                <div className="space-y-3">
                  {currentStyle.whyChooseUs.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm text-[#422638] font-medium leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tailored Inclusions & Perks Grid */}
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-wider border border-[#F05A28]/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Signature Amenities</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0E35]">
                  Tailored Inclusions for {currentStyle.navLabel}
                </h2>
                <p className="text-xs sm:text-sm text-[#735467] mt-1">
                  Thoughtful details specifically prepared in your vehicles, hotels, and daily excursions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStyle.tailoredPerks.map((perk, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-white rounded-2xl p-5 border border-[#EADBDF] shadow-xs hover:border-[#F05A28]/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FFF5EE] border border-[#F05A28]/20 flex items-center justify-center text-[#F05A28] font-bold text-sm mb-3">
                      {pIdx + 1}
                    </div>
                    <h3 className="font-bold text-sm text-[#4A0E35] mb-1.5">
                      {perk.title}
                    </h3>
                    <p className="text-xs text-[#634857] leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Tour Packages matching this persona */}
            <div>
              <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-wider border border-[#F05A28]/20 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Curated Circuits</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A0E35]">
                    Handpicked Packages for {currentStyle.navLabel}
                  </h2>
                </div>

                <Link
                  to="/tours"
                  className="text-xs font-bold text-[#F05A28] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>View All Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {matchingTours.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-3xl overflow-hidden border border-[#EADBDF] shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row group"
                  >
                    <div className="md:w-56 h-48 md:h-auto shrink-0 relative overflow-hidden bg-[#24061A]">
                      <img
                        src={pkg.heroImage}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                      />
                      <span className="absolute top-3 left-3 bg-[#4A0E35] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                        {pkg.duration}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-[#F05A28] uppercase">
                            {pkg.tourType}
                          </span>
                          <span className="text-[#A2889A]">•</span>
                          <span className="text-[11px] text-[#735467]">
                            Best: {pkg.bestTimeToVisit}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-[#4A0E35] group-hover:text-[#F05A28] transition-colors">
                          <Link to={`/tour/${pkg.id}`}>{pkg.title}</Link>
                        </h3>

                        <p className="text-xs text-[#634857] mt-1 line-clamp-2 leading-relaxed">
                          {pkg.tagline}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {pkg.destinations.map((d, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-2 py-0.5 rounded-md bg-[#FAF4F8] text-[#5C3F51] text-[10px] font-medium border border-[#EADBDF]"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#F0E6EC] flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-[#4A0E35] font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
                          <span>Bespoke Private Tour</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/tour/${pkg.id}`}
                            className="px-3 py-1.5 rounded-xl border border-[#4A0E35]/20 text-xs font-bold text-[#4A0E35] hover:bg-[#FAF4F8] transition-colors"
                          >
                            Full Itinerary
                          </Link>
                          <button
                            type="button"
                            onClick={() => onOpenBooking(pkg.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] text-white text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Vehicle Fleet for this style */}
            <div>
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-wider border border-[#F05A28]/20 mb-2">
                  <Car className="w-3.5 h-3.5" />
                  <span>Fleet Calibration</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#4A0E35]">
                  Recommended Chauffeur Fleet
                </h2>
                <p className="text-xs text-[#735467] mt-1">
                  {currentStyle.vehicleRecommendation}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchingVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#EADBDF] p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-36 rounded-xl overflow-hidden mb-3 relative">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-[#4A0E35] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {vehicle.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#4A0E35]">{vehicle.name}</h4>
                      <p className="text-xs text-[#735467] mt-0.5">{vehicle.capacity}</p>
                      <p className="text-xs text-[#523348] mt-2 line-clamp-2">{vehicle.tagline}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F0E6EC] flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        GPS & AC Verified
                      </span>
                      {onBookTaxi && (
                        <button
                          type="button"
                          onClick={() => onBookTaxi(vehicle)}
                          className="text-xs font-bold text-[#F05A28] hover:underline"
                        >
                          Book Vehicle →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBDF]">
              <h2 className="font-serif text-2xl font-bold text-[#4A0E35] mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-[#735467] mb-6">
                Common questions from travelers booking our {currentStyle.navLabel} packages.
              </p>

              <div className="space-y-3">
                {currentStyle.faqs.map((faq, fIdx) => {
                  const isOpen = expandedFaq === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className="border border-[#EADBDF] rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isOpen ? null : fIdx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 bg-[#FAF7F5] hover:bg-[#FFF5EE] transition-colors cursor-pointer"
                      >
                        <span className="font-bold text-xs sm:text-sm text-[#4A0E35]">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#F05A28] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#735467] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white text-xs sm:text-sm text-[#5C3F51] leading-relaxed border-t border-[#EADBDF]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Traveler Review, Fast Quote & Destinations */}
          <div className="space-y-6">
            {/* Quick Trip Planner Sticky Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EADBDF] shadow-md sticky top-36">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-[11px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3 h-3" />
                <span>Bespoke Consultation</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#4A0E35]">
                Plan a {currentStyle.navLabel} Tour
              </h3>
              <p className="text-xs text-[#735467] mt-1 leading-relaxed">
                Connect with our dedicated destination specialist for custom route planning, vehicle selection, and instant pricing.
              </p>

              <div className="my-5 p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#EADBDF] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#735467]">Pacing:</span>
                  <span className="font-bold text-[#4A0E35] text-right max-w-[65%]">
                    {currentStyle.travelPacing.split('(')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#735467]">Best Season:</span>
                  <span className="font-bold text-[#4A0E35] text-right max-w-[65%]">
                    {currentStyle.bestMonths}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#735467]">Pricing & Quote:</span>
                  <span className="font-bold text-[#F05A28]">Custom on Request</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => onOpenBooking(currentStyle.title)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Custom Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20want%20to%20inquire%20about%20a%20${encodeURIComponent(
                    currentStyle.navLabel
                  )}%20custom%20tour.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/40 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Verified Trust Badges */}
              <div className="mt-6 pt-4 border-t border-[#F0E6EC] space-y-2 text-[11px] text-[#735467]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ministry of Tourism Approved Operator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero Toll or Interstate Permit Disputes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-[#FFA000] text-[#FFA000] shrink-0" />
                  <span>2,400+ Five-Star Verified Guest Departures</span>
                </div>
              </div>
            </div>

            {/* Verified Traveler Testimonial */}
            <div className="bg-[#FFF5EE] rounded-3xl p-6 border border-[#F05A28]/20">
              <div className="flex items-center gap-1 text-[#FFA000] mb-3">
                {[...Array(currentStyle.testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFA000]" />
                ))}
              </div>

              <p className="text-xs text-[#4A0E35] leading-relaxed italic mb-4">
                "{currentStyle.testimonial.quote}"
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-[#F05A28]/15">
                <img
                  src={currentStyle.testimonial.avatar}
                  alt={currentStyle.testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-[#4A0E35]">
                    {currentStyle.testimonial.name}
                  </div>
                  <div className="text-[11px] text-[#735467]">
                    {currentStyle.testimonial.city} • {currentStyle.testimonial.tourTaken}
                  </div>
                </div>
              </div>
            </div>

            {/* Ideal Destinations Tag Cloud */}
            <div className="bg-white rounded-3xl p-6 border border-[#EADBDF]">
              <h4 className="font-serif text-sm font-bold text-[#4A0E35] mb-3">
                Top Destinations for {currentStyle.navLabel}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentStyle.idealDestinations.map((dest, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-[#FAF7F5] text-xs font-semibold text-[#4A0E35] border border-[#EADBDF]"
                  >
                    📍 {dest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
