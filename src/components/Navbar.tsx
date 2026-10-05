import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, Calendar, Compass, ShieldCheck, ChevronDown, MapPin } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsDropdown, setDestinationsDropdown] = useState(false);
  const location = useLocation();

  const destinationsList = [
    { id: 'delhi', name: 'Delhi', desc: 'Imperial Capital & Heritage' },
    { id: 'agra', name: 'Agra', desc: 'Taj Mahal & Mughal Marvels' },
    { id: 'rajasthan', name: 'Rajasthan', desc: 'Forts, Palaces & Desert Dunes' },
    { id: 'uttarakhand', name: 'Uttarakhand', desc: 'Devbhoomi & Char Dham' },
    { id: 'himachal', name: 'Himachal', desc: 'Snow Peaks & Pine Valleys' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EADBDF] shadow-xs">
      
      {/* Top micro-bar for trust & direct hotline */}
      

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="cursor-pointer py-1 flex items-center">
          <Logo size="md" variant="dark" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive('/')
                ? 'text-[#F05A28] bg-[#FFF5EE]'
                : 'text-[#4A0E35] hover:text-[#F05A28] hover:bg-[#FAF4F8]'
            }`}
          >
            Home
          </Link>

          {/* Destinations with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDestinationsDropdown(true)}
            onMouseLeave={() => setDestinationsDropdown(false)}
          >
            <Link
              to="/destinations"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                isActive('/destination')
                  ? 'text-[#F05A28] bg-[#FFF5EE]'
                  : 'text-[#4A0E35] hover:text-[#F05A28] hover:bg-[#FAF4F8]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Destinations</span>
              <ChevronDown className="w-3 h-3 transition-transform" />
            </Link>

            {/* Dropdown Menu */}
            {destinationsDropdown && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-[#EADBDF] p-2 mt-1 z-50 animate-fadeIn">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#735467] uppercase tracking-wider border-b border-[#F0E6EC] mb-1">
                  Explore by Region
                </div>
                {destinationsList.map((dest) => (
                  <Link
                    key={dest.id}
                    to={`/destination/${dest.id}`}
                    onClick={() => setDestinationsDropdown(false)}
                    className="flex items-start gap-2.5 px-3 py-2 rounded-xl hover:bg-[#FAF4F8] transition-colors group"
                  >
                    <MapPin className="w-4 h-4 text-[#F05A28] mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-[#4A0E35] group-hover:text-[#F05A28]">
                        {dest.name}
                      </div>
                      <div className="text-[11px] text-[#735467]">{dest.desc}</div>
                    </div>
                  </Link>
                ))}
                <div className="pt-1.5 mt-1 border-t border-[#F0E6EC]">
                  <Link
                    to="/destinations"
                    onClick={() => setDestinationsDropdown(false)}
                    className="block text-center py-1.5 text-[11px] font-bold text-[#F05A28] hover:underline"
                  >
                    View All 5 Destinations →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/tours"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive('/tour')
                ? 'text-[#F05A28] bg-[#FFF5EE]'
                : 'text-[#4A0E35] hover:text-[#F05A28] hover:bg-[#FAF4F8]'
            }`}
          >
            Tour Packages
          </Link>

          <Link
            to="/travel-styles"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive('/travel-style')
                ? 'text-[#F05A28] bg-[#FFF5EE]'
                : 'text-[#4A0E35] hover:text-[#F05A28] hover:bg-[#FAF4F8]'
            }`}
          >
            Travel Styles
          </Link>

          <Link
            to="/taxi"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive('/taxi')
                ? 'text-[#F05A28] bg-[#FFF5EE]'
                : 'text-[#4A0E35] hover:text-[#F05A28] hover:bg-[#FAF4F8]'
            }`}
          >
            Taxi Fleet
          </Link>

          <Link
            to="/reviews"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive('/reviews')
                ? 'text-[#F05A28] bg-[#FFF5EE]'
                : 'text-[#4A0E35] hover:text-[#F05A28] hover:bg-[#FAF4F8]'
            }`}
          >
            Guest Reviews & Reels
          </Link>

          <Link
            to="/contact"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive('/contact')
                ? 'text-[#F05A28] bg-[#FFF5EE]'
                : 'text-[#4A0E35] hover:text-[#F05A28] hover:bg-[#FAF4F8]'
            }`}
          >
            Custom Plan
          </Link>
        </nav>

        {/* Actions & Book Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20want%20to%20plan%20a%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] hover:from-[#3B0827] hover:to-[#D84315] text-white text-xs font-bold transition-all shadow-md shadow-[#4A0E35]/10 hover:shadow-lg cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Plan / Inquire Now</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#4A0E35] hover:bg-[#FAF4F8] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EADBDF] px-4 py-5 space-y-3 animate-fadeIn shadow-lg">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isActive('/') ? 'bg-[#FFF5EE] text-[#F05A28]' : 'text-[#4A0E35] hover:bg-[#FAF4F8]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/destinations"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isActive('/destination') ? 'bg-[#FFF5EE] text-[#F05A28]' : 'text-[#4A0E35] hover:bg-[#FAF4F8]'
              }`}
            >
              Destinations (Delhi, Agra, Rajasthan, Uttarakhand, Himachal)
            </Link>

            <div className="pl-4 py-1 space-y-1 border-l-2 border-[#FFA000]/30 my-1">
              {destinationsList.map((dest) => (
                <Link
                  key={dest.id}
                  to={`/destination/${dest.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 rounded-lg text-xs font-medium text-[#735467] hover:text-[#4A0E35] hover:bg-[#FAF4F8]"
                >
                  • {dest.name} Tour & Guide
                </Link>
              ))}
            </div>

            <Link
              to="/tours"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isActive('/tour') ? 'bg-[#FFF5EE] text-[#F05A28]' : 'text-[#4A0E35] hover:bg-[#FAF4F8]'
              }`}
            >
              All Tour Packages
            </Link>

            <Link
              to="/travel-styles"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isActive('/travel-style') ? 'bg-[#FFF5EE] text-[#F05A28]' : 'text-[#4A0E35] hover:bg-[#FAF4F8]'
              }`}
            >
              Travel Styles & Personas
            </Link>

            <Link
              to="/taxi"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isActive('/taxi') ? 'bg-[#FFF5EE] text-[#F05A28]' : 'text-[#4A0E35] hover:bg-[#FAF4F8]'
              }`}
            >
              Taxi & Fleet Rental
            </Link>

            <Link
              to="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isActive('/reviews') ? 'bg-[#FFF5EE] text-[#F05A28]' : 'text-[#4A0E35] hover:bg-[#FAF4F8]'
              }`}
            >
              Guest Reviews & Reels
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isActive('/contact') ? 'bg-[#FFF5EE] text-[#F05A28]' : 'text-[#4A0E35] hover:bg-[#FAF4F8]'
              }`}
            >
              Custom Trip Planner & Contact
            </Link>
          </nav>

          <div className="pt-3 border-t border-[#EADBDF] space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#4A0E35] to-[#F05A28] text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan / Inquire Now</span>
            </button>

            <a
              href="https://wa.me/919760402549?text=Namaste%20Rangrez%20Holidays%2C%20I%20want%20to%20plan%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500 text-emerald-700 font-bold text-xs bg-emerald-50/50"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </header>
    
  );
};
