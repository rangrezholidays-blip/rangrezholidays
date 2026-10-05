import React from 'react';
import { ReviewsSection } from '../components/ReviewsSection';
import { InstaReelsSection } from '../components/InstaReelsSection';
import { MessageSquare, Calendar, Star, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface ReviewsPageProps {
  onOpenBooking: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-[#FAF7F5] min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-[#26071B] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop"
            alt="Traveler Experiences Taj Mahal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#26071B] via-[#26071B]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFA000]/20 text-[#FFA000] border border-[#FFA000]/30 text-xs font-bold tracking-wide uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-[#FFA000]" />
              <span>Verified Guest Reflections</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Real Stories & Live Reels from Our Travelers
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
              Read authentic feedback from discerning voyagers who explored Delhi, Agra, Rajasthan, Himachal, and Uttarakhand with Rangrez Holidays. Watch live Instagram moments captured on private departures.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] text-[#24061A] text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan Your Own Journey</span>
              </button>

              <a
                href="https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20saw%20your%20reviews%20and%20reels%20and%20want%20to%20plan%20a%20trip."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Customer Reviews */}
      <ReviewsSection />

      {/* Embedded Instagram Reels Showcase */}
      <InstaReelsSection onPlanTrip={(_tag) => onOpenBooking()} />
    </div>
  );
};
