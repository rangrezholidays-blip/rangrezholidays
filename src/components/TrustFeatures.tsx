'use client';

import React from 'react';
import {
  ShieldCheck,
  Award,
  Clock,
  Car,
  HeartHandshake,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  const trustPoints = [
    {
      icon: Award,
      title: 'Ministry of Tourism Accredited',
      desc: 'Official recognized inbound tour operator adhering to strict national tourism safety and ethical guidelines.',
    },
    {
      icon: ShieldCheck,
      title: '100% Transparent Zero Hidden Fees',
      desc: 'All interstate permits, expressway tolls, fuel surcharges, and chauffeur night allowances are crystal clear upfront.',
    },
    {
      icon: Car,
      title: 'Company-Owned Sanitized Fleet',
      desc: 'Spotless sedans, luxury Innova Crystas, and Urbania coaches with commercial passenger insurance and 24x7 GPS tracking.',
    },
    {
      icon: Clock,
      title: '24x7 Roadside & Trip Concierge',
      desc: 'Instant WhatsApp assistance from your dedicated trip manager for itinerary tweaks, medical support, or culinary tips.',
    },
    {
      icon: HeartHandshake,
      title: 'Handpicked Heritage & Yatra Guides',
      desc: 'Govt-licensed storytellers at historical monuments and seasoned mountain escorts for Char Dham pilgrimage.',
    },
    {
      icon: Sparkles,
      title: 'Private & Flexible Departures',
      desc: 'No hurried cattle-class group buses. Travel exclusively with your family or partner at your own customized pace.',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5EE] text-[#F05A28] text-xs font-bold uppercase tracking-widest border border-[#F05A28]/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Rangrez Standard of Trust</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A0E35]">
            Why Discerning Travelers Choose Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#634857] leading-relaxed">
            Planning a trip across India should inspire anticipation, not anxiety. Here is how Rangrez Holidays ensures flawless execution from airport arrival to your final farewell.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-[#FAF7F5] rounded-3xl p-6 border border-[#EADBDF] hover:border-[#F05A28]/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#4A0E35] to-[#F05A28] text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#FFA000]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#4A0E35] mb-2 group-hover:text-[#F05A28] transition-colors">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#634857] leading-relaxed">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Credibility & Accreditation Strip */}
        <div className="mt-14 pt-8 border-t border-[#EADBDF] flex flex-wrap items-center justify-around gap-6 text-center text-xs text-[#735467]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-[#4A0E35]">Approved Tour Operator (Govt of India)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-[#4A0E35]">IATO & TAAI Allied Member</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-[#4A0E35]">100% Commercial GPS Tourist Cabs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-[#4A0E35]">Uttarakhand Yatra Certified Drivers</span>
          </div>
        </div>
      </div>
    </section>
  );
};
