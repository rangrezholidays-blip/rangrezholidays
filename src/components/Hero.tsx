'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Search, MapPin, Car, ArrowRight, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/toursData';
import { TAXI_FLEET } from '../data/taxiData';

interface HeroProps {
  onSearch: (selectedPackageId?: string, selectedTaxiId?: string, date?: string) => void;
  onExplorePackages: () => void;
  onExploreTaxi: () => void;
  onPlanYourself?: () => void;
  onSelectPersona?: (persona: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onExplorePackages,
  onExploreTaxi,
  onPlanYourself,
  onSelectPersona,
}) => {
  const [selectedTour, setSelectedTour] = useState<string>('golden-triangle-classic');
  // Set on the client after mount so server HTML and first client render match
  // (the server runs in UTC, the visitor's browser in their own timezone).
  const [travelDate, setTravelDate] = useState<string>('');
  useEffect(() => {
    setTravelDate(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);
  }, []);
  const [vehicleType, setVehicleType] = useState<string>('innova-crysta');
  const [searchTab, setSearchTab] = useState<'tour' | 'cab'>('tour');
  const [selectedPersona, setSelectedPersona] = useState<string>('family');

  // Video playback states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleQuickCheck = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedTour, vehicleType, travelDate);
  };

  return (
    <div className="relative overflow-hidden bg-[#1E0515] text-white">
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000"
        >
          {/* High quality ambient India travel loops */}
          <source
            src="https://cdn.pixabay.com/video/2020/05/25/40149-424754746_large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-large-temple-in-an-ancient-city-43285-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#190412]/90 via-[#190412]/70 to-[#190412]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#190412] via-transparent to-[#190412]/30" />
      </div>

      {/* Subtle Video Controls (Bottom Right of Hero) */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
        <button
          type="button"
          onClick={toggleVideoPlay}
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/80 hover:text-white transition-all text-xs flex items-center gap-1.5 border border-white/10"
          title={isVideoPlaying ? 'Pause ambient video' : 'Play ambient video'}
        >
          {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/80 hover:text-white transition-all text-xs flex items-center gap-1.5 border border-white/10"
          title={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Hero Content - Only Main Heading & Sub-heading as requested */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 flex flex-col justify-center min-h-[78vh]">
        <div className="max-w-3xl">
          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Discover India’s Royal Splendor with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA000] via-[#FF7043] to-[#F05A28]">
              Rangrez Holidays
            </span>
          </h1>

          {/* Sub Heading */}
          <p className="mt-4 text-base sm:text-xl text-white/90 font-sans font-light leading-relaxed max-w-2xl">
            Bespoke private tours, royal heritage palaces, and luxury sanitized chauffeur taxi fleets across Delhi, Agra, Rajasthan, Uttarakhand & Himachal.
          </p>
        </div>

        {/* MakeMyTrip Inspired Interactive Plan / Search Bar */}
        <div className="mt-10 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/30 text-[#24131E] max-w-5xl">
          {/* Search Mode Tabs */}
          <div className="flex items-center gap-4 mb-4 border-b border-[#EADBDF] pb-3">
            <button
              type="button"
              onClick={() => setSearchTab('tour')}
              className={`text-xs font-bold flex items-center gap-1.5 pb-1 border-b-2 transition-all cursor-pointer ${
                searchTab === 'tour'
                  ? 'border-[#F05A28] text-[#4A0E35]'
                  : 'border-transparent text-[#735467] hover:text-[#4A0E35]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>Tour Packages & Itineraries</span>
            </button>
            <button
              type="button"
              onClick={() => setSearchTab('cab')}
              className={`text-xs font-bold flex items-center gap-1.5 pb-1 border-b-2 transition-all cursor-pointer ${
                searchTab === 'cab'
                  ? 'border-[#F05A28] text-[#4A0E35]'
                  : 'border-transparent text-[#735467] hover:text-[#4A0E35]'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>Chauffeur Taxi & Intercity Cab</span>
            </button>
          </div>

          <form onSubmit={handleQuickCheck} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tour Selection */}
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#735467] tracking-wider mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Destination / Tour</span>
              </label>
              <select
                value={selectedTour}
                onChange={(e) => setSelectedTour(e.target.value)}
                className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
              >
                {TOUR_PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title} ({pkg.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#735467] tracking-wider mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Preferred Date</span>
              </label>
              <input
                type="date"
                value={travelDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
              />
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block text-[11px] uppercase font-bold text-[#735467] tracking-wider mb-1.5 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Chauffeur Vehicle</span>
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
              >
                {TAXI_FLEET.map((cab) => (
                  <option key={cab.id} value={cab.id}>
                    {cab.name} ({cab.capacity.split('+')[0].trim()})
                  </option>
                ))}
              </select>
            </div>

            {/* Action CTA */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4A0E35] to-[#F05A28] hover:from-[#3B0827] hover:to-[#D84315] text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search & Plan Journey</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Quick Shortcuts Bar */}
          <div className="mt-4 pt-3 border-t border-[#EADBDF]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#735467] text-[11px]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>100% Customized Itineraries • Verified Chauffeur Fleet • Zero Hidden Charges</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {onPlanYourself && (
                <button
                  type="button"
                  onClick={onPlanYourself}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#F05A28] hover:underline cursor-pointer bg-[#FFF5EE] px-3 py-1.5 rounded-lg border border-[#F05A28]/20"
                >
                  <span>🛠️ Plan Tour By Yourself →</span>
                </button>
              )}
              <button
                type="button"
                onClick={onExploreTaxi}
                className="text-[#4A0E35] font-bold text-xs hover:underline cursor-pointer"
              >
                Taxi Fleet →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
