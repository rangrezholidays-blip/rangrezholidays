'use client';

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Shield,
  Sparkles,
  ChevronRight,
  PhoneCall,
  Share2,
} from 'lucide-react';
import { TourPackage } from '../types';

interface PackageDetailModalProps {
  packageData: TourPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (pkg: TourPackage, selectedDate?: string) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  packageData,
  isOpen,
  onClose,
  onBookNow,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'gallery'>('itinerary');

  if (!isOpen || !packageData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-[#EADBDF]">
        {/* Hero Header with Imagery */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={packageData.heroImage}
            alt={packageData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24061A]/90 via-[#24061A]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#F05A28] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges and Title */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-[#FFA000] text-[#24061A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {packageData.duration}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                {packageData.tourType}
              </span>
              <span className="bg-[#F05A28] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {packageData.groupSize}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {packageData.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#FFA000] mt-1 italic">
              {packageData.tagline}
            </p>

            <div className="flex items-center gap-4 text-xs text-white/80 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F05A28]" />
                {packageData.destinations.join(' • ')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#FFA000]" />
                {packageData.bestTimeToVisit}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EADBDF] bg-[#FAF7F5] px-6 overflow-x-auto gap-2 sm:gap-6 shrink-0">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-[#F05A28] text-[#4A0E35]'
                : 'border-transparent text-[#735467] hover:text-[#4A0E35]'
            }`}
          >
            Day-by-Day Itinerary ({packageData.itinerary.length} Days)
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'inclusions'
                ? 'border-[#F05A28] text-[#4A0E35]'
                : 'border-transparent text-[#735467] hover:text-[#4A0E35]'
            }`}
          >
            Inclusions & Services
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-[#F05A28] text-[#4A0E35]'
                : 'border-transparent text-[#735467] hover:text-[#4A0E35]'
            }`}
          >
            Visual Gallery
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="bg-[#FAF4F8] p-4 rounded-2xl border border-[#EADBDF]">
                <h4 className="font-serif text-sm font-bold text-[#4A0E35] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FFA000]" />
                  <span>The Journey Narrative</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#634857] leading-relaxed">
                  {packageData.overview}
                </p>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packageData.highlights.map((hl, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#EADBDF] text-xs text-[#4A0E35]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#F05A28] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Stepped Day-by-Day View */}
              <div className="border-l-2 border-[#FFA000] ml-3 pl-5 space-y-6 pt-2">
                {packageData.itinerary.map((item) => (
                  <div key={item.day} className="relative">
                    <div className="absolute -left-[29px] top-0 w-6 h-6 rounded-full bg-[#4A0E35] text-[#FFA000] text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                      {item.day}
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#EADBDF] shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h5 className="font-serif text-sm font-bold text-[#4A0E35]">
                          Day {item.day}: {item.title}
                        </h5>
                        {item.overnight && (
                          <span className="text-[10px] font-semibold text-[#8C3A16] bg-[#FFF5EE] px-2.5 py-0.5 rounded-full border border-[#F05A28]/20">
                            Night: {item.overnight}
                          </span>
                        )}
                      </div>

                      {item.image && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-[#EADBDF] max-h-48">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-44 object-cover"
                          />
                          {item.imageCaption && (
                            <div className="bg-[#FAF4F8] px-3 py-1.5 text-[10px] text-[#735467] italic border-t border-[#EADBDF]">
                              {item.imageCaption}
                            </div>
                          )}
                        </div>
                      )}

                      <p className="text-xs text-[#634857] leading-relaxed mt-2">
                        {item.description}
                      </p>

                      {item.activities && item.activities.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.activities.map((act, actIdx) => (
                            <span
                              key={actIdx}
                              className="text-[11px] bg-[#FAF4F8] text-[#4A0E35] px-2.5 py-1 rounded-lg border border-[#EADBDF]"
                            >
                              • {act}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                <h4 className="font-serif text-sm font-bold text-emerald-900 flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Complimentary Inclusions</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-emerald-950">
                  {packageData.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#FFF5EE] p-5 rounded-2xl border border-[#F05A28]/20">
                <h4 className="font-serif text-sm font-bold text-[#8C3A16] flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-[#F05A28]" />
                  <span>Exclusions & Optional Add-ons</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-[#8C3A16]">
                  {packageData.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28] mt-1.5 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: VISUAL GALLERY */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[packageData.heroImage, ...(packageData.gallery || [])].map((img, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden h-44 shadow-xs border border-[#EADBDF] group"
                >
                  <img
                    src={img}
                    alt={`Gallery ${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-6 bg-[#FAF7F5] border-t border-[#EADBDF] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-[#735467] flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>100% Tailored Private Departures • No Forced Group Pace</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/919760402549?text=Namaste%2C%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(packageData.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold transition-colors"
            >
              <span>WhatsApp Inquiry</span>
            </a>

            <button
              onClick={() => onBookNow(packageData)}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] hover:from-[#3B0827] hover:to-[#D84315] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Inquire & Plan Dates</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
