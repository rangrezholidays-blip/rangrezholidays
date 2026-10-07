import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Calendar,
  MessageSquare,
  Car,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Sun,
  Award,
  Share2,
  Check,
  Play,
  Volume2,
  VolumeX,
  X,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { TOUR_PACKAGES } from '../data/toursData';
import { TAXI_FLEET } from '../data/taxiData';
import { CUSTOMER_REVIEWS } from '../data/reviewsAndReelsData';
import { TOUR_SEO, canonicalUrl } from '../data/seoData';

interface TourDetailPageProps {
  onOpenBooking: (prefillTour?: string) => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({ onOpenBooking }) => {
  const { tourId } = useParams<{ tourId: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [selectedEnlargedImage, setSelectedEnlargedImage] = useState<string | null>(null);

  const tour = TOUR_PACKAGES.find((t) => t.id === tourId);

  if (!tour) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#FAF7F5]">
        <MapPin className="w-16 h-16 text-[#F05A28] mb-4" />
        <h1 className="font-serif text-3xl font-bold text-[#4A0E35]">Tour Package Not Found</h1>
        <p className="mt-2 text-sm text-[#735467] max-w-md">
          The tour itinerary you are searching for is not available or may have been updated.
        </p>
        <Link
          to="/tours"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A0E35] text-white font-bold text-xs shadow-md hover:bg-[#380927]"
        >
          <span>Browse All Tour Packages</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const galleryImages = [tour.heroImage, ...(tour.gallery || [])];

  // Related tours in same or adjacent category
  const relatedTours = TOUR_PACKAGES.filter(
    (t) => t.id !== tour.id && (t.category === tour.category || t.category === 'golden-triangle')
  ).slice(0, 2);

  // Filter relevant customer reviews
  const relevantReviews = CUSTOMER_REVIEWS.slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const seo = TOUR_SEO[tour.id] ?? {
    title: `${tour.title} | Rangrez Holidays`,
    description: tour.tagline,
    path: `/tour/${tour.id}`,
  };

  return (
    <div className="bg-[#FAF7F5] min-h-screen">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={canonicalUrl(seo.path)} />
      </Helmet>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#EADBDF] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#735467]">
          <div className="flex items-center gap-2 font-medium overflow-x-auto no-scrollbar">
            <Link to="/" className="hover:text-[#4A0E35] shrink-0">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C4B0BC] shrink-0" />
            <Link to="/tours" className="hover:text-[#4A0E35] shrink-0">
              Tour Packages
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C4B0BC] shrink-0" />
            <span className="text-[#F05A28] font-bold truncate">{tour.title}</span>
          </div>

          <button
            onClick={handleShare}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#735467] hover:text-[#4A0E35] cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Tour</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#26071B] text-white py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-45">
          <img
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#200516]/95 via-[#200516]/75 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#FFA000] text-[#3B0827] text-xs font-bold tracking-wide uppercase shadow-sm">
                {tour.duration}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                {tour.tourType}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                {tour.groupSize}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-tight">
              {tour.title}
            </h1>

            <p className="mt-3 font-serif text-base sm:text-lg text-[#FFA000] italic">
              {tour.tagline}
            </p>

            {/* Destinations Route Strip */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/90 bg-black/30 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <MapPin className="w-4 h-4 text-[#F05A28] shrink-0" />
              <span className="font-semibold">Route:</span>
              <span>{tour.destinations.join(' ➔ ')}</span>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenBooking(tour.title)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] hover:brightness-110 text-[#24061A] text-xs font-bold shadow-lg transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Inquire & Customize This Tour</span>
              </button>

              {/* Video Teaser Button */}
              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all border border-white/30 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Watch Itinerary Video</span>
              </button>

              <a
                href={`https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20am%20interested%20in%20${encodeURIComponent(tour.title)}%20(${encodeURIComponent(tour.duration)}).%20Please%20share%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Tour Concierge</span>
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
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/5 relative group">
                <img
                  src={galleryImages[activeImageIndex] || tour.heroImage}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedEnlargedImage(galleryImages[activeImageIndex] || tour.heroImage)}
                />
                <button
                  type="button"
                  onClick={() => setSelectedEnlargedImage(galleryImages[activeImageIndex] || tour.heroImage)}
                  className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Enlarge Photo</span>
                </button>
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

            {/* Tour Narrative Overview & Highlights */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBDF] shadow-md space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#4A0E35] mb-3">
                  Tour Overview & Experience
                </h2>
                <p className="text-xs sm:text-sm text-[#4E3143] leading-relaxed">
                  {tour.overview}
                </p>
              </div>

              {/* Highlights */}
              <div className="pt-6 border-t border-[#F0E6EC]">
                <h3 className="text-xs font-bold text-[#4A0E35] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FFA000]" />
                  <span>Curated Tour Highlights</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-[#FAF4F8] border border-[#F0E6EC] flex items-start gap-2.5 text-xs text-[#4E3143]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#F05A28] shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cinematic Tour Video Preview Teaser Box */}
            <div className="bg-gradient-to-br from-[#24061A] to-[#3B0827] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 hidden md:block">
                <img
                  src={tour.heroImage}
                  alt="Tour visual"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 max-w-lg">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFA000] text-[#24061A] text-[10px] font-bold uppercase tracking-wider mb-3">
                  <Play className="w-3 h-3 fill-[#24061A]" />
                  <span>Cinematic Route Preview</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                  Experience {tour.title} on Video
                </h3>
                <p className="text-xs text-white/80 leading-relaxed mb-5">
                  Watch our 60-second drone and ground teaser capturing the monuments, royal chauffeur drives, and local flavors included in this itinerary.
                </p>
                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] text-[#24061A] text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-[#24061A]" />
                  <span>Play Cinematic Tour Video</span>
                </button>
              </div>
            </div>

            {/* Comprehensive Day-by-Day Itinerary WITH PHOTOS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBDF] shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#4A0E35]">
                    Day-by-Day Detailed Itinerary & Attractions
                  </h2>
                  <p className="text-xs text-[#735467] mt-1">
                    {tour.itinerary.length} Days of expertly scheduled cultural immersion with landmark photography
                  </p>
                </div>

                <span className="text-[11px] font-bold text-[#F05A28] bg-[#FFF5EE] px-3 py-1 rounded-full border border-[#F05A28]/20 self-start sm:self-auto">
                  Private Chauffeur Guided
                </span>
              </div>

              {/* Day Timeline Tabs */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-[#F0E6EC] mb-6">
                {tour.itinerary.map((item) => (
                  <button
                    key={item.day}
                    onClick={() => setActiveDay(item.day)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      activeDay === item.day
                        ? 'bg-[#4A0E35] text-white shadow-sm'
                        : 'bg-[#FAF4F8] text-[#735467] hover:text-[#4A0E35]'
                    }`}
                  >
                    Day {item.day}
                  </button>
                ))}
              </div>

              {/* Active Day Detail Display with Image Showcase */}
              {tour.itinerary.map((item) => {
                if (item.day !== activeDay) return null;

                return (
                  <div key={item.day} className="animate-fadeIn space-y-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F0E6EC]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-[#F05A28] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {item.day}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-[#4A0E35]">
                          {item.title}
                        </h3>
                      </div>

                      {item.overnight && (
                        <div className="text-xs text-[#735467] bg-[#FAF4F8] px-3 py-1.5 rounded-xl border border-[#F0E6EC] flex items-center gap-1.5">
                          <span className="font-semibold text-[#4A0E35]">Night Stay:</span>
                          <span>{item.overnight}</span>
                        </div>
                      )}
                    </div>

                    {/* Day Landmark Image */}
                    {item.image && (
                      <div className="rounded-2xl overflow-hidden border border-[#EADBDF] bg-black/5 relative group">
                        <div className="h-64 sm:h-80 w-full overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                            onClick={() => setSelectedEnlargedImage(item.image || null)}
                          />
                        </div>
                        {item.imageCaption && (
                          <div className="p-3 bg-[#24061A] text-white flex items-center justify-between text-xs">
                            <span className="text-white/90 font-medium">{item.imageCaption}</span>
                            <button
                              type="button"
                              onClick={() => setSelectedEnlargedImage(item.image || null)}
                              className="text-[11px] text-[#FFA000] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Camera className="w-3 h-3" />
                              <span>Enlarge</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-[#4E3143] leading-relaxed">
                      {item.description}
                    </p>

                    {item.activities && item.activities.length > 0 && (
                      <div className="bg-[#FAF4F8] p-4 rounded-2xl border border-[#F0E6EC] space-y-2">
                        <div className="text-[11px] font-bold text-[#4A0E35] uppercase tracking-wider">
                          Key Day Activities & Halts:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.activities.map((act, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-[#523348] flex items-start gap-2"
                            >
                              <span className="text-[#F05A28] font-bold">•</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Navigation between days */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#F0E6EC] text-xs">
                      {item.day > 1 ? (
                        <button
                          onClick={() => setActiveDay(item.day - 1)}
                          className="font-bold text-[#4A0E35] hover:text-[#F05A28] transition-colors cursor-pointer"
                        >
                          ← Previous (Day {item.day - 1})
                        </button>
                      ) : (
                        <div />
                      )}

                      {item.day < tour.itinerary.length ? (
                        <button
                          onClick={() => setActiveDay(item.day + 1)}
                          className="font-bold text-[#F05A28] hover:underline cursor-pointer"
                        >
                          Next (Day {item.day + 1}) →
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenBooking(tour.title)}
                          className="font-bold text-[#F05A28] hover:underline cursor-pointer"
                        >
                          Ready to Plan? Inquire Now →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Visual Strip of All Itinerary Days */}
              <div className="mt-8 pt-6 border-t border-[#F0E6EC]">
                <div className="text-xs font-bold text-[#4A0E35] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#F05A28]" />
                  <span>Itinerary Days Photo Gallery</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {tour.itinerary.map((it) => (
                    <button
                      key={it.day}
                      type="button"
                      onClick={() => setActiveDay(it.day)}
                      className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer ${
                        activeDay === it.day
                          ? 'border-[#F05A28] ring-2 ring-[#F05A28]/20 scale-105'
                          : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={it.image || tour.heroImage}
                        alt={`Day ${it.day}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">Day {it.day}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white rounded-3xl p-6 border border-[#EADBDF] shadow-md space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#4A0E35] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>What’s Included</span>
                </h3>
                <ul className="space-y-2.5">
                  {tour.inclusions.map((inc, i) => (
                    <li key={i} className="text-xs text-[#523348] flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white rounded-3xl p-6 border border-[#EADBDF] shadow-md space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#4A0E35] flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <span>Exclusions</span>
                </h3>
                <ul className="space-y-2.5">
                  {tour.exclusions.map((exc, i) => (
                    <li key={i} className="text-xs text-[#735467] flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar / Sticky Booking & Concierge */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Inquiry Sticky Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#EADBDF] shadow-lg sticky top-24 space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#F05A28] uppercase tracking-wider">
                  Bespoke Departure
                </span>
                <h3 className="font-serif text-xl font-bold text-[#4A0E35]">
                  Plan Your Experience
                </h3>
                <p className="text-xs text-[#735467]">
                  Pricing tailored to your travel dates, vehicle selection, and party size. Zero hidden fees.
                </p>
              </div>

              {/* Key Specs */}
              <div className="space-y-3 pt-4 border-t border-[#F0E6EC] text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#735467] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#F05A28]" />
                    <span>Duration:</span>
                  </span>
                  <span className="font-bold text-[#4A0E35]">{tour.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#735467] flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-[#F05A28]" />
                    <span>Vehicle:</span>
                  </span>
                  <span className="font-bold text-[#4A0E35]">AC Sedan / Innova / Tempo</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#735467] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#FFA000]" />
                    <span>Safety:</span>
                  </span>
                  <span className="font-bold text-emerald-700">Verified Chauffeur</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#F0E6EC]">
                <button
                  type="button"
                  onClick={() => onOpenBooking(tour.title)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] hover:brightness-110 text-[#24061A] text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Check Availability & Quote</span>
                </button>

                <a
                  href={`https://wa.me/919760402549?text=Namaste%2C%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(tour.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Assistance</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Video Player Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-[#1A0512] rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className="p-4 bg-[#24061A] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#FFA000] fill-[#FFA000]" />
                <span className="text-xs font-bold">{tour.title} — Video Tour</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black relative">
              <video
                src={tour.videoUrl || 'https://cdn.pixabay.com/video/2020/05/25/40149-424754746_large.mp4'}
                poster={tour.heroImage}
                autoPlay
                controls
                muted={isVideoMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#24061A] flex items-center justify-between text-xs text-white">
              <span className="text-white/80">Experience this breathtaking circuit with Rangrez Holidays</span>
              <button
                type="button"
                onClick={() => {
                  setShowVideoModal(false);
                  onOpenBooking(tour.title);
                }}
                className="px-4 py-2 rounded-xl bg-[#F05A28] text-white font-bold hover:brightness-110 transition-all cursor-pointer"
              >
                Inquire This Tour Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enlarged Image Lightbox */}
      {selectedEnlargedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer"
          onClick={() => setSelectedEnlargedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedEnlargedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedEnlargedImage}
              alt="Enlarged vista"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
