'use client';

import React from 'react';
import { Star, CheckCircle2, Quote, Sparkles, MapPin, ThumbsUp } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/reviewsAndReelsData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FAF7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guest Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E35]">
            Loved by Travelers Worldwide
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#634857] leading-relaxed">
            Real stories from couples, families, and solo adventurers who trusted Rangrez Holidays with their once-in-a-lifetime journeys.
          </p>

          {/* Aggregate Rating Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-white px-6 py-3 rounded-2xl border border-[#EADBDF] shadow-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Verified Guests</span>
            </div>
            <span className="text-[#EADBDF]">•</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-[#FFA000] fill-[#FFA000]" />
              ))}
              <span className="ml-1 text-xs font-bold text-[#4A0E35]">4.9 / 5.0 Rating</span>
            </div>
            <span className="text-[#EADBDF]">•</span>
            <span className="text-xs text-[#735467]">TripAdvisor & Google Excellence</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-[#EADBDF] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#FFA000] fill-[#FFA000]" />
                    ))}
                  </div>
                  {rev.verifiedTrip && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Trip</span>
                    </span>
                  )}
                </div>

                {/* Tour Taken Tag */}
                <span className="inline-block text-[11px] font-semibold text-[#F05A28] bg-[#FFF5EE] px-2.5 py-0.5 rounded-md border border-[#F05A28]/20 mb-3">
                  {rev.tourTaken}
                </span>

                {/* Review Text */}
                <p className="text-xs text-[#523345] leading-relaxed italic relative">
                  "{rev.review}"
                </p>

                {/* Optional traveler photos */}
                {rev.userPhotos && rev.userPhotos.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {rev.userPhotos.map((photo, pIdx) => (
                      <img
                        key={pIdx}
                        src={photo}
                        alt="Guest snapshot"
                        className="w-14 h-14 rounded-xl object-cover border border-[#EADBDF]"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Guest Profile Footer */}
              <div className="mt-5 pt-4 border-t border-[#EADBDF]/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#FFA000]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#4A0E35]">{rev.name}</h4>
                    <p className="text-[10px] text-[#735467] flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#F05A28]" />
                      <span>
                        {rev.location}, {rev.country}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-[#8B6B80]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
