import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  ArrowUp,
  Compass,
} from "lucide-react";
import logo from "../assets/white-logo.png";

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const destinations = [
    { id: "delhi", name: "Delhi Imperial Heritage" },
    { id: "agra", name: "Agra & Taj Mahal Wonder" },
    { id: "rajasthan", name: "Rajasthan Royal Forts & Dunes" },
    { id: "uttarakhand", name: "Uttarakhand Devbhoomi & Char Dham" },
    { id: "himachal", name: "Himachal Pine Valleys & Snow Peaks" },
  ];

  return (
    <footer className="bg-[#24061A] text-white pt-16 pb-12 border-t border-[#4A0E35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" onClick={scrollToTop} className="inline-block">
              <img src={logo} alt="Rangrez Holidays" className="h-16 w-auto" />
            </Link>
            <p className="text-xs text-white/75 leading-relaxed max-w-sm">
              Rangrez Holidays is India’s premier luxury experiential tour
              operator and chauffeur taxi fleet provider. Specializing in
              bespoke private departures across the Golden Triangle, Rajasthan,
              Himachal Pradesh, and sacred Char Dham pilgrimage circuits.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFA000] shrink-0" />
                <span>
                  Connaught Place & Aerocity, New Delhi • M.I. Road, Jaipur •
                  Fatehabad Road, Agra
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFA000] shrink-0" />
                <a
                  href="tel:+919310340049"
                  className="hover:text-[#FFA000] transition-colors"
                >
                  +91 93103 40049 / +91 88002 40049 (24x7 Helpline & WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFA000] shrink-0" />
                <span>contact@rangrezholidays.com</span>
              </div>
            </div>
          </div>

          {/* Destinations Column */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#FFA000] tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Destinations</span>
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              {destinations.map((dest) => (
                <li key={dest.id}>
                  <Link
                    to={`/destination/${dest.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {dest.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/destinations"
                  className="text-[#FFA000] font-bold hover:underline"
                >
                  View All Destinations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Curated Tour Packages Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#FFA000] tracking-wider uppercase mb-3">
              Tour Packages
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <Link
                  to="/tour/golden-triangle-classic"
                  className="hover:text-white transition-colors"
                >
                  The Royal Golden Triangle (6D)
                </Link>
              </li>
              <li>
                <Link
                  to="/tour/rajasthan-royal-heritage"
                  className="hover:text-white transition-colors"
                >
                  Grand Rajasthan Royalty (10D)
                </Link>
              </li>
              <li>
                <Link
                  to="/tour/char-dham-yatra-sacred"
                  className="hover:text-white transition-colors"
                >
                  Sacred Char Dham Yatra (12D)
                </Link>
              </li>
              <li>
                <Link
                  to="/tour/himachal-shimla-manali-delight"
                  className="hover:text-white transition-colors"
                >
                  Shimla Manali Alpine Escape (7D)
                </Link>
              </li>
              <li>
                <Link
                  to="/tour/same-day-agra-taj-mahal"
                  className="hover:text-white transition-colors"
                >
                  Same Day Taj Mahal Express
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  to="/tours"
                  className="text-[#FFA000] font-bold hover:underline"
                >
                  Browse All Packages →
                </Link>
              </li>
            </ul>
          </div>

          {/* Taxi & Booking Quick Action */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#FFA000] tracking-wider uppercase mb-3">
              Taxi & Custom Plan
            </h4>
            <p className="text-xs text-white/75 mb-3 leading-relaxed">
              Have customized dates or need an executive chauffeur car for
              intercity trips?
            </p>

            <Link
              to="/taxi"
              className="block text-center py-2 px-3 rounded-xl border border-white/20 hover:border-white text-xs font-semibold text-white/90 hover:text-white transition-colors mb-2"
            >
              Explore Chauffeur Fleet
            </Link>

            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F05A28] to-[#FFA000] text-[#24061A] text-xs font-bold shadow-md hover:brightness-110 transition-all mb-2 cursor-pointer"
            >
              Plan / Inquire Journey
            </button>

            <a
              href="https://wa.me/919871234567?text=Namaste%20Rangrez%20Holidays%2C%20I%20want%20to%20plan%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* Travel Personas / Styles Quick Links */}
        <div className="py-6 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="text-xs">
            <span className="text-[#FFA000] font-bold uppercase tracking-wider block sm:inline mr-2">
              Explore by Travel Persona:
            </span>
            <span className="text-white/60 text-[11px]">
              Tailored itineraries & calibrated chauffeur fleets for your
              specific companion style
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/travel-style/family"
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-xs text-white/90 border border-white/10 transition-colors"
            >
              👨‍👩‍👧‍👦 Family Holidays
            </Link>
            <Link
              to="/travel-style/honeymoon"
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-xs text-white/90 border border-white/10 transition-colors"
            >
              💍 Honeymoon & Couples
            </Link>
            <Link
              to="/travel-style/friends"
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-xs text-white/90 border border-white/10 transition-colors"
            >
              🎒 Friends & Groups
            </Link>
            <Link
              to="/travel-style/solo"
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-xs text-white/90 border border-white/10 transition-colors"
            >
              🧭 Solo Travel
            </Link>
            <Link
              to="/travel-style/corporate"
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-xs text-white/90 border border-white/10 transition-colors"
            >
              💼 Corporate Offsites
            </Link>
          </div>
        </div>

        {/* Local GEO Chauffeur Hubs Strip for Local SEO */}
        <div className="py-4 border-b border-white/10 text-[11px] text-white/50 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-semibold text-[#FFA000]">
            Local GEO Service Hubs:
          </span>
          <span>Delhi NCR (Airport DEL T3 / Connaught Place / Gurugram)</span>
          <span>•</span>
          <span>Agra (Taj Mahal / Fatehabad Road)</span>
          <span>•</span>
          <span>Jaipur (Pink City / Amber)</span>
          <span>•</span>
          <span>Udaipur (Lake Pichola)</span>
          <span>•</span>
          <span>Jaisalmer (Thar Desert)</span>
          <span>•</span>
          <span>Uttarakhand (Haridwar / Rishikesh / Kedarnath Dham)</span>
          <span>•</span>
          <span>Himachal (Shimla / Manali)</span>
          <span>•</span>
          <span>Kashmir (Srinagar / Gulmarg)</span>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Approved by Ministry of Tourism, Govt. of India • IATO Accredited
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#ai-travel-knowledge-hub"
              className="hover:text-[#FFA000] transition-colors"
            >
              AI Travel Guide (FAQs)
            </a>
            <span>•</span>
            <Link to="/reviews" className="hover:text-white transition-colors">
              Traveler Reviews
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact & Offices
            </Link>
            <span>•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Sitemap
            </a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-[11px] text-white/40">
          © {new Date().getFullYear()} Rangrez Holidays. All rights reserved.
          Bespoke travel itineraries & luxury chauffeur services across India.
        </div>
      </div>
    </footer>
  );
};
