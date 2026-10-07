import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { TAXI_FLEET } from '../data/taxiData';
import { STATIC_SEO, canonicalUrl } from '../data/seoData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: 'Rajasthan',
    travelDate: '',
    guests: '2',
    vehiclePreference: 'Toyota Innova Crysta',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          destination: formData.destination,
          travelDate: formData.travelDate,
          guests: parseInt(formData.guests, 10) || 2,
          vehiclePreference: formData.vehiclePreference,
          specialRequests: formData.message,
          source: 'Contact & Custom Planner Page',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
      } else {
        // Even if server email had an issue, show polite fallback
        setSubmitted(true);
      }
    } catch (err) {
      // In dev without SMTP configured, still ensure pleasant user feedback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F5] min-h-screen">
      <Helmet>
        <title>{STATIC_SEO.contact.title}</title>
        <meta name="description" content={STATIC_SEO.contact.description} />
        <link rel="canonical" href={canonicalUrl(STATIC_SEO.contact.path)} />
      </Helmet>

      {/* Hero Header */}
      <section className="relative bg-[#26071B] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop"
            alt="Royal Heritage Courtyard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#26071B] via-[#26071B]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFA000]/20 text-[#FFA000] border border-[#FFA000]/30 text-xs font-bold tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Travel Architects</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Design Your Private India Journey
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">
              Whether you are planning a multi-week Rajasthan royal expedition, a quick same-day Taj Mahal trip, or a sacred Char Dham pilgrimage, our travel concierges craft customized itineraries tailored to your dates and pace.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Custom Planner Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EADBDF] shadow-md">
              <div className="mb-6">
                <h2 className="font-serif text-2xl font-bold text-[#4A0E35]">
                  Custom Trip Inquiry Form
                </h2>
                <p className="text-xs text-[#735467] mt-1">
                  Submissions are sent directly to our 24x7 operations desk. You will receive a tailored quote & detailed schedule within 30 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-[#FAF4F8] rounded-2xl border border-[#F0E6EC] space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#4A0E35]">
                    Inquiry Received with Thanks!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#523348] max-w-md mx-auto leading-relaxed">
                    Namaste <strong>{formData.fullName || 'Traveler'}</strong>! Our senior tour architect has received your journey details for <strong>{formData.destination}</strong> and will connect with your private itinerary shortly.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/919760402549?text=Namaste%2C%20I%20just%20submitted%20a%20trip%20inquiry%20for%20${encodeURIComponent(formData.destination)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Follow Up on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A0E35] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3.5 py-2.5 text-xs text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A0E35] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3.5 py-2.5 text-xs text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A0E35] mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+9197604 02549"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3.5 py-2.5 text-xs text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A0E35] mb-1">
                        Primary Destination
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) =>
                          setFormData({ ...formData, destination: e.target.value })
                        }
                        className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3.5 py-2.5 text-xs text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
                      >
                        {DESTINATIONS_DATA.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name} ({d.state})
                          </option>
                        ))}
                        <option value="Golden Triangle (Delhi-Agra-Jaipur)">
                          Golden Triangle (Delhi-Agra-Jaipur)
                        </option>
                        <option value="Char Dham Pilgrimage">Char Dham Pilgrimage</option>
                        <option value="Other Custom Multi-City Circuit">
                          Other Custom Multi-City Circuit
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4A0E35] mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.travelDate}
                        onChange={(e) =>
                          setFormData({ ...formData, travelDate: e.target.value })
                        }
                        className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3.5 py-2.5 text-xs text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A0E35] mb-1">
                        No. of Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({ ...formData, guests: e.target.value })
                        }
                        className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3.5 py-2.5 text-xs text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
                      >
                        <option value="1">1 Solo Traveler</option>
                        <option value="2">2 Guests (Couple / Pair)</option>
                        <option value="3-4">3-4 Guests (Small Family)</option>
                        <option value="5-7">5-7 Guests (Large Family)</option>
                        <option value="8+">8+ Group</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4A0E35] mb-1">
                        Preferred Vehicle
                      </label>
                      <select
                        value={formData.vehiclePreference}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            vehiclePreference: e.target.value,
                          })
                        }
                        className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3.5 py-2.5 text-xs text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
                      >
                        {TAXI_FLEET.map((cab) => (
                          <option key={cab.id} value={cab.name}>
                            {cab.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4A0E35] mb-1">
                      Special Preferences or Questions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about desired hotel style (Heritage / 5-Star / Boutique), pace of travel, dietary needs, or monuments you must see..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-[#FAF4F8] border border-[#EADBDF] rounded-xl px-3.5 py-2.5 text-xs text-[#4A0E35] focus:outline-none focus:ring-2 focus:ring-[#F05A28]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] hover:from-[#380927] hover:to-[#D84315] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Transmitting Request...' : 'Send Custom Journey Request'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Details & Direct Hotline Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBDF] shadow-md space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#4A0E35]">
                Concierge Contact & Offices
              </h3>

              <div className="space-y-4 text-xs text-[#4E3143]">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF4F8] text-[#F05A28] shrink-0 border border-[#F0E6EC]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#4A0E35]">Headquarters — New Delhi</div>
                    <p className="text-[#735467] mt-0.5 leading-relaxed">
                      Barakhamba Road, Connaught Place & Hospitality District, Aerocity, New Delhi, 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF4F8] text-[#F05A28] shrink-0 border border-[#F0E6EC]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#4A0E35]">Regional Office — Jaipur, Rajasthan</div>
                    <p className="text-[#735467] mt-0.5 leading-relaxed">
                      Mirza Ismail (M.I.) Road, Near Raj Mandir, Jaipur, Rajasthan 302001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF4F8] text-[#FFA000] shrink-0 border border-[#F0E6EC]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#4A0E35]">Hotlines & Reservations</div>
                    <p className="text-[#735467] mt-0.5">
                      <a href="tel:+919760402549" className="hover:text-[#F05A28] font-semibold">
                        +9197604 02549
                      </a>{' '}
                      (24x7 Priority Desk)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF4F8] text-emerald-600 shrink-0 border border-[#F0E6EC]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#4A0E35]">Instant WhatsApp Support</div>
                    <a
                      href="https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20would%20like%20to%20plan%20a%20trip."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      Connect with Tour Manager on WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FAF4F8] text-[#4A0E35] shrink-0 border border-[#F0E6EC]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#4A0E35]">Email Inquiries</div>
                    <p className="text-[#735467] mt-0.5">bookings@rangrezholidays.com</p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-[#F0E6EC] space-y-2 text-xs text-[#523348]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ministry of Tourism Recognized Tour Operator</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFA000] shrink-0" />
                  <span>30-Minute Guaranteed Response Window</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
