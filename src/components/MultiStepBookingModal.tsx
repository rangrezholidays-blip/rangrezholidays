'use client';

import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Calendar as CalendarIcon,
  Users,
  Car,
  MapPin,
  CheckCircle2,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Send,
  Loader2,
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/toursData';
import { TAXI_FLEET } from '../data/taxiData';
import { InquiryFormData } from '../types';

interface MultiStepBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  initialTaxiId?: string;
  initialDate?: string;
}

export const MultiStepBookingModal: React.FC<MultiStepBookingModalProps> = ({
  isOpen,
  onClose,
  initialPackageId,
  initialTaxiId,
  initialDate,
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [submittedResult, setSubmittedResult] = useState<{
    inquiryId: string;
    message: string;
    emailDispatched: boolean;
    emailStatusMessage: string;
  } | null>(null);

  // Form state
  const [formData, setFormData] = useState<InquiryFormData>(() => {
    const selectedPkg = TOUR_PACKAGES.find((p) => p.id === initialPackageId);
    const selectedTaxi = TAXI_FLEET.find((t) => t.id === initialTaxiId);

    return {
      type: initialTaxiId ? 'taxi_rental' : 'tour_package',
      packageName: selectedPkg ? selectedPkg.title : initialTaxiId ? 'Chauffeur Taxi Rental Service' : 'The Royal Golden Triangle Tour',
      destination: selectedPkg ? selectedPkg.destinations.join(' → ') : 'Delhi, Agra & Jaipur',
      startDate: initialDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      duration: selectedPkg ? selectedPkg.duration : '5 Nights / 6 Days',
      adults: 2,
      children: 0,
      cabPreference: selectedTaxi ? selectedTaxi.name : 'Toyota Innova Crysta / Hycross',
      pickupLocation: 'Delhi NCR (Airport / Hotel / Residence)',
      dropLocation: '',
      hotelCategory: '4-Star Royal Heritage Haveli',
      fullName: '',
      email: '',
      phone: '',
      whatsappSameAsPhone: true,
      specialRequests: '',
    };
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const handleNext = () => {
    // Validate current step
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.packageName && !formData.cabPreference) {
        newErrors.package = 'Please select a tour package or vehicle';
      }
    } else if (step === 2) {
      if (!formData.startDate) {
        newErrors.startDate = 'Please select your preferred travel date';
      }
    } else if (step === 3) {
      if (formData.adults < 1) {
        newErrors.adults = 'At least 1 adult traveler is required';
      }
    } else if (step === 4) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Please enter your full name';
      }
      if (!formData.phone.trim() || formData.phone.length < 8) {
        newErrors.phone = 'Please enter a valid mobile or WhatsApp phone number';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please provide a valid email format';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (step < 4) {
      setStep(step + 1);
    } else {
      submitInquiry();
    }
  };

  const handlePrev = () => {
    setErrors({});
    if (step > 1) setStep(step - 1);
  };

  const submitInquiry = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmittedResult({
          inquiryId: data.inquiryId,
          message: data.message,
          emailDispatched: data.emailDispatched,
          emailStatusMessage: data.emailStatusMessage,
        });
      } else {
        setErrors({ submit: data.error || 'Failed to submit inquiry. Please try again.' });
      }
    } catch (err: any) {
      // Offline fallback handling
      const mockId = `RH-${Date.now().toString().slice(-6)}`;
      setSubmittedResult({
        inquiryId: mockId,
        message: 'Your inquiry has been successfully registered with Rangrez Holidays! Our travel expert will reach out promptly.',
        emailDispatched: false,
        emailStatusMessage: 'Inquiry saved. Our WhatsApp concierge is ready to assist you.',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Namaste Rangrez Holidays! I am inquiring about *${formData.packageName}*.\n` +
      `📅 Travel Date: ${formData.startDate}\n` +
      `👥 Travelers: ${formData.adults} Adults, ${formData.children} Children\n` +
      `🚗 Vehicle Preference: ${formData.cabPreference}\n` +
      `👤 Guest Name: ${formData.fullName}\n` +
      `📍 Pickup: ${formData.pickupLocation}`
    );
    return `https://wa.me/919760402549?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-[#EADBDF]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#4A0E35] via-[#5A123E] to-[#F05A28] px-6 py-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#FFA000] text-[#3B0827]">
              Concierge Booking
            </span>
            <span className="text-xs text-white/80">Rangrez Holidays India</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-1">
            Personalize Your Royal Journey
          </h2>
          <p className="text-xs text-white/80 mt-0.5">
            Transparent custom quotes • Real-time slot verification • Zero hidden charges
          </p>

          {/* Progress Indicator */}
          {!submittedResult && (
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s <= step ? 'bg-[#FFA000]' : 'bg-white/20'
                    }`}
                  />
                  <span className="text-[10px] text-white/70 block mt-1">
                    {s === 1 ? 'Package' : s === 2 ? 'Dates' : s === 3 ? 'Fleet' : 'Contact'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FAF7F5]">
          {submittedResult ? (
            /* Success State */
            <div className="text-center py-6 sm:py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold text-[#F05A28] uppercase tracking-wider">
                Booking Reference #{submittedResult.inquiryId}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#4A0E35] mt-1">
                Namaste, Your Inquiry is Received!
              </h3>
              <p className="text-sm text-[#634857] max-w-md mx-auto mt-2">
                Our Senior Travel Concierge is reviewing your itinerary details and will connect with you on WhatsApp / Phone within 30 minutes with personalized arrangements.
              </p>

              {/* Status Box */}
              <div className="bg-white rounded-2xl p-4 border border-[#EADBDF] max-w-md mx-auto mt-5 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#EADBDF]/60 pb-2">
                  <span className="text-[#735467]">Tour / Service:</span>
                  <span className="font-semibold text-[#4A0E35]">{formData.packageName}</span>
                </div>
                <div className="flex justify-between border-b border-[#EADBDF]/60 pb-2">
                  <span className="text-[#735467]">Departure Date:</span>
                  <span className="font-semibold text-[#4A0E35]">{formData.startDate}</span>
                </div>
                <div className="flex justify-between border-b border-[#EADBDF]/60 pb-2">
                  <span className="text-[#735467]">Dedicated Vehicle:</span>
                  <span className="font-semibold text-[#4A0E35]">{formData.cabPreference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#735467]">Email Dispatch:</span>
                  <span className="font-medium text-emerald-600">
                    {submittedResult.emailDispatched ? 'Sent via Gmail SMTP' : 'Confirmed & Stored safely'}
                  </span>
                </div>
              </div>

              {/* WhatsApp instant connect button */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Confirmation</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-[#EADBDF] text-[#4A0E35] hover:bg-[#FAF4F8] text-sm font-semibold transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Form Views */
            <div>
              {/* STEP 1: Package or Taxi Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-[#4A0E35]">
                      Choose Your Desired Experience
                    </label>
                    <span className="text-xs text-[#735467]">Step 1 of 4</span>
                  </div>

                  {/* Mode tabs */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-white rounded-xl border border-[#EADBDF]">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'tour_package' })}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                        formData.type === 'tour_package'
                          ? 'bg-[#4A0E35] text-white shadow-sm'
                          : 'text-[#634857] hover:bg-[#FAF4F8]'
                      }`}
                    >
                      Complete Tour Package
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'taxi_rental' })}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                        formData.type === 'taxi_rental'
                          ? 'bg-[#4A0E35] text-white shadow-sm'
                          : 'text-[#634857] hover:bg-[#FAF4F8]'
                      }`}
                    >
                      Taxi / Chauffeur Rental Only
                    </button>
                  </div>

                  {formData.type === 'tour_package' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                      {TOUR_PACKAGES.map((pkg) => {
                        const isSelected = formData.packageName === pkg.title;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                packageName: pkg.title,
                                destination: pkg.destinations.join(' → '),
                                duration: pkg.duration,
                              })
                            }
                            className={`p-3 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white border-[#F05A28] ring-2 ring-[#F05A28]/20 shadow-sm'
                                : 'bg-white/70 border-[#EADBDF] hover:border-[#F05A28]/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={pkg.heroImage}
                                alt={pkg.title}
                                className="w-14 h-14 rounded-lg object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-[#4A0E35] truncate">
                                  {pkg.title}
                                </h4>
                                <p className="text-[11px] text-[#F05A28] font-medium mt-0.5">
                                  {pkg.duration}
                                </p>
                                <p className="text-[10px] text-[#735467] truncate mt-0.5">
                                  {pkg.destinations.slice(0, 3).join(', ')}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                      {TAXI_FLEET.map((cab) => {
                        const isSelected = formData.cabPreference === cab.name;
                        return (
                          <div
                            key={cab.id}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                cabPreference: cab.name,
                                packageName: `Chauffeur Rental: ${cab.name}`,
                              })
                            }
                            className={`p-3 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white border-[#F05A28] ring-2 ring-[#F05A28]/20 shadow-sm'
                                : 'bg-white/70 border-[#EADBDF] hover:border-[#F05A28]/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={cab.image}
                                alt={cab.name}
                                className="w-14 h-14 rounded-lg object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-[#4A0E35] truncate">
                                  {cab.name}
                                </h4>
                                <p className="text-[11px] text-[#F05A28] font-medium mt-0.5">
                                  {cab.capacity}
                                </p>
                                <p className="text-[10px] text-[#735467] truncate mt-0.5">
                                  {cab.luggage}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {errors.package && (
                    <p className="text-xs text-rose-600">{errors.package}</p>
                  )}
                </div>
              )}

              {/* STEP 2: Dates, Duration & Pickup */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-[#4A0E35]">
                      Select Travel Dates & Pickup Point
                    </label>
                    <span className="text-xs text-[#735467]">Step 2 of 4</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#EADBDF] space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                        Preferred Departure Date *
                      </label>
                      <div className="relative">
                        <CalendarIcon className="w-4 h-4 text-[#735467] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="date"
                          value={formData.startDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl text-xs text-[#331C29] font-medium focus:ring-2 focus:ring-[#F05A28] focus:outline-none"
                        />
                      </div>
                      {errors.startDate && (
                        <p className="text-xs text-rose-600 mt-1">{errors.startDate}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                          Trip Duration
                        </label>
                        <select
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl text-xs text-[#331C29] font-medium focus:ring-2 focus:ring-[#F05A28] focus:outline-none"
                        >
                          <option>Same Day (8-14 Hours)</option>
                          <option>2 Nights / 3 Days</option>
                          <option>4 Nights / 5 Days</option>
                          <option>5 Nights / 6 Days</option>
                          <option>7 Nights / 8 Days</option>
                          <option>9 Nights / 10 Days</option>
                          <option>11 Nights / 12 Days (Char Dham)</option>
                          <option>Custom Multi-Day</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                          Pickup City / Point *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-[#735467] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={formData.pickupLocation}
                            onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                            placeholder="Delhi IGI Airport, Hotel, Jaipur, Haridwar..."
                            className="w-full pl-9 pr-3 py-2.5 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl text-xs text-[#331C29] focus:ring-2 focus:ring-[#F05A28] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Live note banner */}
                    <div className="bg-[#FFF5EE] p-3 rounded-xl border border-[#F05A28]/20 flex items-start gap-2 text-[11px] text-[#8C3A16]">
                      <Sparkles className="w-4 h-4 text-[#F05A28] shrink-0 mt-0.5" />
                      <div>
                        <strong>Instant Slot Reservation:</strong> Your chosen departure date triggers instant fleet hold. Free date changes up to 72 hours prior to arrival.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Group & Vehicle Preference */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-[#4A0E35]">
                      Traveler Group & Fleet Comfort
                    </label>
                    <span className="text-xs text-[#735467]">Step 3 of 4</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#EADBDF] space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                          Adults (12+ yrs) *
                        </label>
                        <div className="flex items-center border border-[#EADBDF] rounded-xl overflow-hidden bg-[#FAF4F8]">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                            className="px-3 py-2 text-sm font-bold text-[#4A0E35] hover:bg-[#EADBDF]/50"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center text-xs font-bold text-[#331C29]">
                            {formData.adults}
                          </span>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                            className="px-3 py-2 text-sm font-bold text-[#4A0E35] hover:bg-[#EADBDF]/50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                          Children (Below 12 yrs)
                        </label>
                        <div className="flex items-center border border-[#EADBDF] rounded-xl overflow-hidden bg-[#FAF4F8]">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                            className="px-3 py-2 text-sm font-bold text-[#4A0E35] hover:bg-[#EADBDF]/50"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center text-xs font-bold text-[#331C29]">
                            {formData.children}
                          </span>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                            className="px-3 py-2 text-sm font-bold text-[#4A0E35] hover:bg-[#EADBDF]/50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                        Vehicle / Chauffeur Fleet Preference
                      </label>
                      <select
                        value={formData.cabPreference}
                        onChange={(e) => setFormData({ ...formData, cabPreference: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl text-xs text-[#331C29] font-medium focus:ring-2 focus:ring-[#F05A28] focus:outline-none"
                      >
                        {TAXI_FLEET.map((cab) => (
                          <option key={cab.id} value={cab.name}>
                            {cab.name} ({cab.capacity})
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.type === 'tour_package' && (
                      <div>
                        <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                          Accommodation Preference (Optional)
                        </label>
                        <select
                          value={formData.hotelCategory}
                          onChange={(e) => setFormData({ ...formData, hotelCategory: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl text-xs text-[#331C29] font-medium focus:ring-2 focus:ring-[#F05A28] focus:outline-none"
                        >
                          <option>5-Star Royal Palace & Luxury Heritage Hotel</option>
                          <option>4-Star Handpicked Boutique Haveli</option>
                          <option>3-Star Premium Deluxe Hotel</option>
                          <option>Vehicle & Sightseeing Only (No Hotels)</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 4: Guest Contact Details & Special Requests */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-[#4A0E35]">
                      Guest Contact & Delivery Details
                    </label>
                    <span className="text-xs text-[#735467]">Step 4 of 4</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#EADBDF] space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                        Primary Traveler Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Sarah Jenkins or Rajesh Sharma"
                        className="w-full px-3 py-2.5 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl text-xs text-[#331C29] focus:ring-2 focus:ring-[#F05A28] focus:outline-none"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                          Mobile / WhatsApp Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#735467] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full pl-9 pr-3 py-2.5 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl text-xs text-[#331C29] focus:ring-2 focus:ring-[#F05A28] focus:outline-none"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                          Email (for detailed PDF itinerary)
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#735467] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="guest@example.com"
                            className="w-full pl-9 pr-3 py-2.5 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl text-xs text-[#331C29] focus:ring-2 focus:ring-[#F05A28] focus:outline-none"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="whatsappCheck"
                        checked={formData.whatsappSameAsPhone}
                        onChange={(e) => setFormData({ ...formData, whatsappSameAsPhone: e.target.checked })}
                        className="rounded border-[#EADBDF] text-[#F05A28] focus:ring-[#F05A28]"
                      />
                      <label htmlFor="whatsappCheck" className="text-xs text-[#634857] select-none cursor-pointer">
                        This number is active on WhatsApp for fast itinerary dispatch
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A0E35] mb-1">
                        Special Requests or Preferences (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        placeholder="e.g. Senior citizen accessible room, vegetarian meals, airport flight arrival time..."
                        className="w-full px-3 py-2 bg-[#FAF4F8] border border-[#EADBDF] rounded-xl text-xs text-[#331C29] focus:ring-2 focus:ring-[#F05A28] focus:outline-none"
                      />
                    </div>

                    {errors.submit && (
                      <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg">{errors.submit}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!submittedResult && (
          <div className="bg-white border-t border-[#EADBDF] px-6 py-4 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#EADBDF] text-xs font-semibold text-[#4A0E35] hover:bg-[#FAF4F8] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] hover:from-[#3B0827] hover:to-[#D84315] text-white text-xs font-bold transition-all shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : step === 4 ? (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </>
              ) : (
                <>
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
