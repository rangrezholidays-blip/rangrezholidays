'use client';

import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Car,
  Hotel,
  Sparkles,
  ArrowRight,
  Check,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Star,
} from 'lucide-react';

interface TourByYourselfBuilderProps {
  onOpenBooking: (customTourSummary: string) => void;
}

const DESTINATION_OPTIONS = [
  { id: 'delhi', name: 'Delhi', region: 'Capital & Mughal Hub' },
  { id: 'agra', name: 'Agra', region: 'Taj Mahal & Yamuna' },
  { id: 'jaipur', name: 'Jaipur', region: 'Pink City & Forts' },
  { id: 'udaipur', name: 'Udaipur', region: 'Lakes & Palaces' },
  { id: 'jodhpur', name: 'Jodhpur', region: 'Mehrangarh & Blue City' },
  { id: 'jaisalmer', name: 'Jaisalmer', region: 'Thar Golden Dunes' },
  { id: 'shimla', name: 'Shimla', region: 'Colonial Hills & Pines' },
  { id: 'manali', name: 'Manali', region: 'Snow Points & Valleys' },
  { id: 'rishikesh', name: 'Rishikesh', region: 'Yoga & River Rafting' },
  { id: 'haridwar', name: 'Haridwar', region: 'Ganga Aarti Pilgrimage' },
  { id: 'kedarnath', name: 'Kedarnath', region: 'Himalayan Shrine' },
  { id: 'mathura', name: 'Mathura-Vrindavan', region: 'Krishna Bhoomi' },
];

const TRAVEL_PERSONAS = [
  {
    id: 'family',
    name: 'Family Holiday',
    icon: '👨‍👩‍👧‍👦',
    tagline: 'Kid-friendly pacing, spacious Innova & serene family resorts',
    perks: ['Child safety seats & baby food halts', 'Interconnected rooms preference', 'Senior citizen darshan support'],
  },
  {
    id: 'honeymoon',
    name: 'Honeymoon & Couples',
    icon: '💍',
    tagline: 'Palace suites, candlelight dinners & scenic private cruises',
    perks: ['Complimentary room floral decoration', 'Private sunset Lake Pichola boat', 'Secluded mountain view chalets'],
  },
  {
    id: 'friends',
    name: 'Friends & Group Trips',
    icon: '🎒',
    tagline: 'Adventure road trips, desert camping, bonfires & rafting',
    perks: ['Thar Desert dune safari & Kalbelia DJ', 'Rishikesh white water river rafting', 'Music-enabled Tempo Travellers'],
  },
  {
    id: 'solo',
    name: 'Solo Wanderer',
    icon: '🧭',
    tagline: 'Safe private chauffeurs, boutique homestays & heritage trails',
    perks: ['Police-verified & vetted chauffeurs', 'Flexible spontaneous stops', 'Authentic café & bazaar recommendations'],
  },
  {
    id: 'corporate',
    name: 'Corporate Offsite',
    icon: '💼',
    tagline: 'Executive retreats, team building, conference logistics & GST bills',
    perks: ['GST tax invoice with corporate rates', 'Audio/mic equipped luxury fleet', 'Dedicated ground concierge coordinator'],
  },
];

const VEHICLE_PREFERENCES = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    sub: 'Dzire / Etios (1-3 Guests)',
    tag: 'Best for Couples & Solo',
    badge: 'Economical & Agile',
  },
  {
    id: 'innova',
    name: 'Toyota Innova Crysta',
    sub: 'Captain Seats (4-6 Guests)',
    tag: 'Most Popular Choice',
    badge: 'Supreme Highway Comfort',
  },
  {
    id: 'tempo',
    name: 'Maharaja Tempo / Urbania',
    sub: 'Luxury Van (8-16 Guests)',
    tag: 'Large Families & Groups',
    badge: 'Reclining Pushback Seats',
  },
];

const STAY_STYLES = [
  {
    id: 'palace_5star',
    name: '5★ Royal Heritage Palaces',
    desc: 'Oberoi, Taj & authentic Maharaja heritage forts with royal hospitality',
  },
  {
    id: 'boutique_4star',
    name: '4★ Curated Boutique Havelis & Hill Resorts',
    desc: 'Handpicked properties combining regional charm, great food and modern pools',
  },
  {
    id: 'camps_resorts',
    name: 'Swiss Glamping Tents & Forest Lodges',
    desc: 'Desert dunes Swiss tents & Himalayan riverside alpine chalets',
  },
  {
    id: 'cab_only',
    name: 'Chauffeur Cab Only (I will book my own hotels)',
    desc: 'Dedicated vehicle with chauffeur, tolls, state permits, and fuel included',
  },
];

const SPECIAL_EXPERIENCES = [
  'Sunrise Taj Mahal crowd-free VIP guide',
  'Thar Desert camel & jeep safari with campfire dinner',
  'Lake Pichola private sunset chartered boat',
  'Rishikesh white water rafting (16km) & cliff jumping',
  'Kedarnath helicopter priority shuttle coordination',
  'Old Delhi Chandini Chowk food & rickshaw trail',
  'Candlelight poolside private dinner setup',
  'Jaipur Amer Fort jeep ascent with historian escort',
];

export const TourByYourselfBuilder: React.FC<TourByYourselfBuilderProps> = ({
  onOpenBooking,
}) => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    'delhi',
    'agra',
    'jaipur',
  ]);
  const [selectedPersona, setSelectedPersona] = useState<string>('family');
  const [durationDays, setDurationDays] = useState<number>(5);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('innova');
  const [selectedStay, setSelectedStay] = useState<string>('boutique_4star');
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([
    'Sunrise Taj Mahal crowd-free VIP guide',
    'Jaipur Amer Fort jeep ascent with historian escort',
  ]);
  const [startDate, setStartDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);

  const toggleDestination = (id: string) => {
    if (selectedDestinations.includes(id)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== id));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, id]);
    }
  };

  const toggleExperience = (exp: string) => {
    if (selectedExperiences.includes(exp)) {
      setSelectedExperiences(selectedExperiences.filter((e) => e !== exp));
    } else {
      setSelectedExperiences([...selectedExperiences, exp]);
    }
  };

  const currentPersonaObj =
    TRAVEL_PERSONAS.find((p) => p.id === selectedPersona) || TRAVEL_PERSONAS[0];
  const currentVehicleObj =
    VEHICLE_PREFERENCES.find((v) => v.id === selectedVehicle) ||
    VEHICLE_PREFERENCES[1];
  const currentStayObj =
    STAY_STYLES.find((s) => s.id === selectedStay) || STAY_STYLES[1];

  const destinationNames = selectedDestinations
    .map((id) => DESTINATION_OPTIONS.find((d) => d.id === id)?.name)
    .filter(Boolean)
    .join(' → ');

  // Compute estimated quote text
  const customSummary = `Tour By Yourself (${durationDays} Days / ${
    durationDays - 1
  } Nights) for ${guestCount} Guests [${currentPersonaObj.name}] | Route: ${destinationNames} | Vehicle: ${
    currentVehicleObj.name
  } | Stay: ${currentStayObj.name} | Special Inclusions: ${
    selectedExperiences.slice(0, 3).join(', ') || 'Customized on request'
  }`;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Rangrez Holidays! I just planned a custom "Tour By Yourself" on your website:\n\n` +
        `• Travelers: ${currentPersonaObj.icon} ${currentPersonaObj.name} (${guestCount} guests)\n` +
        `• Duration: ${durationDays} Days / ${durationDays - 1} Nights\n` +
        `• Circuit Route: ${destinationNames}\n` +
        `• Vehicle Choice: ${currentVehicleObj.name}\n` +
        `• Hotel Category: ${currentStayObj.name}\n` +
        `• Special Add-ons: ${selectedExperiences.join(', ') || 'Standard highlights'}\n` +
        `• Travel Date: ${startDate || 'Flexible / Upcoming month'}\n\n` +
        `Please send me an official itinerary proposal and best package quote!`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EADBDF] shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#4A0E35] via-[#5D1644] to-[#F05A28] p-6 sm:p-8 text-white relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#FFA000] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MakeMyTrip Style Customizer</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Plan Tour By Yourself
          </h3>
          <p className="mt-2 text-sm text-[#F7D8E6] leading-relaxed">
            Craft your own dream holiday from scratch in 4 effortless steps. Choose your route, pick your travel companion style, select your preferred chauffeur vehicle and stays — our destination architects will handle every minute detail.
          </p>
        </div>

        {/* Floating Quick Trust Badges */}
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>100% Tailored to Your Pacing</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>Dedicated Sanitized Chauffeur Cab</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>Zero Booking Deposit Required to Customize</span>
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-10">
        {/* STEP 1: WHO ARE YOU TRAVELING WITH? (TRAVEL PERSONA) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-[#F05A28] uppercase tracking-wider">
                Step 1 of 4
              </span>
              <h4 className="font-serif text-xl font-bold text-[#4A0E35]">
                Who Are You Traveling With?
              </h4>
              <p className="text-xs text-[#735467] mt-0.5">
                We calibrate driving intervals, hotel selections, and sight timings according to your travel style.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {TRAVEL_PERSONAS.map((persona) => {
              const isSelected = selectedPersona === persona.id;
              return (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => setSelectedPersona(persona.id)}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#FFF5EE] border-[#F05A28] shadow-md ring-2 ring-[#F05A28]/20'
                      : 'bg-[#FAF4F8] border-[#EADBDF] hover:border-[#F05A28]/50'
                  }`}
                >
                  <div>
                    <div className="text-3xl mb-2">{persona.icon}</div>
                    <div className="font-serif font-bold text-sm text-[#4A0E35]">
                      {persona.name}
                    </div>
                    <p className="text-[11px] text-[#735467] mt-1 leading-snug line-clamp-2">
                      {persona.tagline}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="mt-3 pt-2 border-t border-[#F05A28]/20 flex items-center gap-1 text-[11px] font-bold text-[#F05A28]">
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected Style</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Persona Perks Highlights */}
          <div className="mt-3 p-3.5 rounded-xl bg-[#FAF7F5] border border-[#EADBDF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#4A0E35] font-bold">
              <span>{currentPersonaObj.icon}</span>
              <span>Tailored perks for {currentPersonaObj.name}:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {currentPersonaObj.perks.map((perk, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#EADBDF] text-[11px] font-medium text-[#523348] flex items-center gap-1 shadow-2xs"
                >
                  <Check className="w-3 h-3 text-[#F05A28]" />
                  <span>{perk}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STEP 2: SELECT YOUR DESTINATIONS / CIRCUIT */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-xs font-bold text-[#F05A28] uppercase tracking-wider">
                Step 2 of 4
              </span>
              <h4 className="font-serif text-xl font-bold text-[#4A0E35]">
                Select Destinations in Your Circuit
              </h4>
              <p className="text-xs text-[#735467] mt-0.5">
                Click to add or remove cities. Our chauffeur will follow this exact itinerary route seamlessly.
              </p>
            </div>
            <div className="text-xs font-bold text-[#4A0E35] bg-[#FFF5EE] px-3 py-1.5 rounded-xl border border-[#F05A28]/30 self-start sm:self-auto">
              Route: <span className="text-[#F05A28]">{destinationNames}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {DESTINATION_OPTIONS.map((dest) => {
              const isSelected = selectedDestinations.includes(dest.id);
              return (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => toggleDestination(dest.id)}
                  className={`p-3 rounded-2xl text-left transition-all border cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#4A0E35] text-white border-[#4A0E35] shadow-sm'
                      : 'bg-white text-[#4A0E35] border-[#EADBDF] hover:border-[#F05A28]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{dest.name}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#FFA000] text-[#4A0E35] text-[10px] flex items-center justify-center font-extrabold">
                        ✓
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-[10px] mt-1 truncate ${
                      isSelected ? 'text-[#F7D8E6]' : 'text-[#735467]'
                    }`}
                  >
                    {dest.region}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 3: DURATION, TRAVEL DATES & PASSENGERS */}
        <div>
          <span className="text-xs font-bold text-[#F05A28] uppercase tracking-wider">
            Step 3 of 4
          </span>
          <h4 className="font-serif text-xl font-bold text-[#4A0E35] mb-4">
            Duration, Dates & Companions
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#FAF7F5] p-5 rounded-2xl border border-[#EADBDF]">
            {/* Duration Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#4A0E35] mb-2">
                <span>Total Duration:</span>
                <span className="text-[#F05A28] text-sm">
                  {durationDays} Days / {durationDays - 1} Nights
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full accent-[#F05A28] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#735467] mt-1">
                <span>1 Day</span>
                <span>5 Days</span>
                <span>10 Days</span>
                <span>15+ Days</span>
              </div>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-xs font-bold text-[#4A0E35] mb-1.5">
                Tentative Start Date:
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white border border-[#EADBDF] rounded-xl px-3 py-2 text-xs text-[#4A0E35] focus:outline-none focus:ring-1 focus:ring-[#F05A28]"
                />
              </div>
              <span className="text-[10px] text-[#735467] mt-1 block">
                Flexible dates? Leave blank or specify anytime
              </span>
            </div>

            {/* Guests Count */}
            <div>
              <label className="block text-xs font-bold text-[#4A0E35] mb-1.5">
                Number of Guests:
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-[#EADBDF] text-[#4A0E35] font-bold text-sm hover:border-[#F05A28] cursor-pointer"
                >
                  -
                </button>
                <span className="font-serif font-bold text-base text-[#4A0E35]">
                  {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                </span>
                <button
                  type="button"
                  onClick={() => setGuestCount(guestCount + 1)}
                  className="w-9 h-9 rounded-xl bg-white border border-[#EADBDF] text-[#4A0E35] font-bold text-sm hover:border-[#F05A28] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4: CHAUFFEUR VEHICLE & STAY CATEGORY */}
        <div>
          <span className="text-xs font-bold text-[#F05A28] uppercase tracking-wider">
            Step 4 of 4
          </span>
          <h4 className="font-serif text-xl font-bold text-[#4A0E35] mb-4">
            Vehicle Class & Accommodation Preference
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vehicle Selector */}
            <div>
              <h5 className="text-xs font-bold text-[#735467] uppercase mb-2.5">
                Preferred Chauffeur Vehicle:
              </h5>
              <div className="space-y-2.5">
                {VEHICLE_PREFERENCES.map((veh) => {
                  const isSelected = selectedVehicle === veh.id;
                  return (
                    <div
                      key={veh.id}
                      onClick={() => setSelectedVehicle(veh.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#FFF5EE] border-[#F05A28] shadow-xs'
                          : 'bg-white border-[#EADBDF] hover:border-[#F05A28]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#F05A28] text-white'
                              : 'bg-[#FAF4F8] text-[#4A0E35]'
                          }`}
                        >
                          <Car className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#4A0E35]">
                            {veh.name}
                          </div>
                          <div className="text-[11px] text-[#735467]">
                            {veh.sub}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF4F8] text-[#523348] border border-[#EADBDF]">
                        {veh.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stay Category Selector */}
            <div>
              <h5 className="text-xs font-bold text-[#735467] uppercase mb-2.5">
                Hotel / Accommodation Comfort:
              </h5>
              <div className="space-y-2.5">
                {STAY_STYLES.map((stay) => {
                  const isSelected = selectedStay === stay.id;
                  return (
                    <div
                      key={stay.id}
                      onClick={() => setSelectedStay(stay.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FFF5EE] border-[#F05A28] shadow-xs'
                          : 'bg-white border-[#EADBDF] hover:border-[#F05A28]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs text-[#4A0E35]">
                          {stay.name}
                        </div>
                        {isSelected && (
                          <span className="text-xs text-[#F05A28] font-bold">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#735467] mt-1 leading-snug">
                        {stay.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 5: SPECIAL SIGNATURE EXPERIENCES */}
        <div>
          <h4 className="font-serif text-base font-bold text-[#4A0E35] mb-2">
            Optional Signature Experiences (Check to add):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {SPECIAL_EXPERIENCES.map((exp, i) => {
              const isChecked = selectedExperiences.includes(exp);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleExperience(exp)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2 ${
                    isChecked
                      ? 'bg-[#4A0E35] text-white border-[#4A0E35]'
                      : 'bg-white text-[#523348] border-[#EADBDF] hover:border-[#F05A28]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded shrink-0 flex items-center justify-center text-[10px] mt-0.5 ${
                      isChecked ? 'bg-[#FFA000] text-[#4A0E35] font-bold' : 'border border-[#C4B0BC]'
                    }`}
                  >
                    {isChecked ? '✓' : ''}
                  </span>
                  <span className="leading-snug text-[11px]">{exp}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* INSTANT LIVE ITINERARY & CUSTOM QUOTE CARD */}
        <div className="bg-gradient-to-br from-[#FFF5EE] to-[#FAF4F8] rounded-3xl p-6 sm:p-8 border border-[#F05A28]/30 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A0E35] text-white text-[11px] font-bold">
                <span>{currentPersonaObj.icon}</span>
                <span>{currentPersonaObj.name} Summary Ready</span>
              </div>
              <h4 className="font-serif text-2xl font-extrabold text-[#4A0E35]">
                {durationDays} Days Custom Route: {destinationNames}
              </h4>
              <p className="text-xs text-[#634857] leading-relaxed">
                Traveling with {guestCount} guest{guestCount > 1 ? 's' : ''} in private {currentVehicleObj.name} with {currentStayObj.name}. Includes 24x7 Rangrez concierge, chauffeur allowances, state tax permits, and fuel.
              </p>
              {selectedExperiences.length > 0 && (
                <div className="text-[11px] text-[#F05A28] font-semibold pt-1">
                  ✨ Includes: {selectedExperiences.join(' • ')}
                </div>
              )}
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Get Instant WhatsApp Itinerary</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenBooking(customSummary)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Detailed Email Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
