import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { STATIC_SEO, canonicalUrl } from '../data/seoData';
import {
  Car,
  Star,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { InteractiveDestinationsAndPackages } from '../components/InteractiveDestinationsAndPackages';
import { InstaReelsSection } from '../components/InstaReelsSection';
import { TravelPersonasSection } from '../components/TravelPersonasSection';
import { TrustFeatures } from '../components/TrustFeatures';
import { AeoKnowledgeHub } from '../components/AeoKnowledgeHub';
import { TAXI_FLEET } from '../data/taxiData';
import { CUSTOMER_REVIEWS } from '../data/reviewsAndReelsData';
import { TourPackage, TaxiVehicle } from '../types';

interface HomePageProps {
  onOpenBooking: (prefillTour?: string) => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onBookTaxi: (vehicle: TaxiVehicle) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenBooking,
  onSelectPackage,
  onBookTaxi,
}) => {
  const [explorerTab, setExplorerTab] = React.useState<
    'packages' | 'tour-by-yourself' | 'destinations'
  >('packages');
  const [explorerPersona, setExplorerPersona] = React.useState<string>('all');

  const scrollToExplorer = () => {
    const el = document.getElementById('interactive-explorer');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Helmet>
        <title>{STATIC_SEO.home.title}</title>
        <meta name="description" content={STATIC_SEO.home.description} />
        <link rel="canonical" href={canonicalUrl(STATIC_SEO.home.path)} />
      </Helmet>

      {/* 1. Hero with Video Background & Streamlined Text (Only Main & Subheading) */}
      <Hero
        onSearch={(pkgId) => onOpenBooking(pkgId)}
        onExplorePackages={() => {
          setExplorerTab('packages');
          scrollToExplorer();
        }}
        onExploreTaxi={() => {
          const el = document.getElementById('taxi-preview');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onPlanYourself={() => {
          setExplorerTab('tour-by-yourself');
          scrollToExplorer();
        }}
        onSelectPersona={(persona) => {
          setExplorerTab('packages');
          setExplorerPersona(persona);
          scrollToExplorer();
        }}
      />

      {/* 2. Interactive Destinations & Tour Packages (Shifted UP right under Hero, MakeMyTrip style) */}
      <InteractiveDestinationsAndPackages
        onOpenBooking={onOpenBooking}
        onSelectPackage={onSelectPackage}
        tab={explorerTab}
        onTabChange={setExplorerTab}
        persona={explorerPersona}
        onPersonaChange={setExplorerPersona}
      />

      {/* 3. Traveler Stories & Reels Carousel (MakeMyTrip UI Style right on Home Page) */}
      <InstaReelsSection onPlanTrip={(tourTag) => onOpenBooking(tourTag)} />

      {/* 4. Travel Personas & Companion Section with Rich Visual Images & Dedicated Pages */}
      <TravelPersonasSection onOpenBooking={onOpenBooking} />

      {/* 5. Chauffeur Taxi Fleet Rental Section */}
      <section id="taxi-preview" className="py-16 sm:py-20 bg-[#FAF7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-3">
                <Car className="w-3.5 h-3.5" />
                <span>Intercity Chauffeur Mobility</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A0E35]">
                Luxury Chauffeur Taxi Fleet Rental
              </h2>
              <p className="mt-3 text-sm text-[#634857] leading-relaxed">
                From executive sedans to Toyota Innova Crysta and Maharaja Tempo Travellers, our GPS-equipped fleet covers outstation routes with verified, polite chauffeurs.
              </p>
            </div>

            <Link
              to="/taxi"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#F05A28] hover:text-[#4A0E35] transition-colors group cursor-pointer"
            >
              <span>View All Fleet Models</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TAXI_FLEET.slice(0, 3).map((cab) => (
              <div
                key={cab.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EADBDF] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cab.image}
                      alt={cab.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#4A0E35] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {cab.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-base font-bold text-[#4A0E35]">{cab.name}</h3>
                    <p className="text-xs text-[#735467] mt-0.5">{cab.capacity}</p>
                    <p className="text-xs text-[#523348] mt-2 line-clamp-2">{cab.tagline}</p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => onBookTaxi(cab)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] text-white text-xs font-bold shadow-sm hover:brightness-110 transition-all cursor-pointer"
                  >
                    Inquire {cab.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust Features ("Why Discerning Travelers Choose Us" - Shifted DOWN as requested) */}
      <TrustFeatures />

      {/* 6. AEO / GEO Knowledge Hub & AI Search Guide (Answers for ChatGPT, Perplexity & Google) */}
      <AeoKnowledgeHub onOpenBooking={onOpenBooking} />

      {/* 7. Guest Reviews & Testimonials */}
      <section className="py-20 bg-white border-t border-[#EADBDF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-3">
              <Star className="w-3.5 h-3.5 fill-[#FFA000] text-[#FFA000]" />
              <span>Traveler Love</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A0E35]">
              Real Memories, Genuine Trust
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#735467]">
              Over 2,400+ satisfied private departures across Delhi, Agra, Rajasthan, Himachal & Uttarakhand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FAF7F5] rounded-3xl p-6 border border-[#EADBDF] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#4A0E35]">{rev.name}</div>
                        <div className="text-[11px] text-[#735467]">{rev.country}</div>
                      </div>
                    </div>
                    <div className="text-xs text-[#FFA000] font-bold">
                      {'★'.repeat(rev.rating)}
                    </div>
                  </div>
                  <p className="text-xs text-[#4E3143] leading-relaxed italic">
                    "{rev.review}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EADBDF] text-[11px] text-[#735467] font-medium">
                  Tour Circuit: {rev.tourTaken}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A0E35] text-white text-xs font-bold shadow-md hover:bg-[#380927] transition-all cursor-pointer"
            >
              <span>View All Reviews & Watch Live Reels</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
