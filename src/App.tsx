import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppChatWidget } from './components/WhatsAppChatWidget';
import { MultiStepBookingModal } from './components/MultiStepBookingModal';
import { PackageDetailModal } from './components/PackageDetailModal';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { ToursPage } from './pages/ToursPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { TaxiPage } from './pages/TaxiPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { TravelStylesIndexPage } from './pages/TravelStylesIndexPage';
import { TravelStyleDetailPage } from './pages/TravelStyleDetailPage';

import { TOUR_PACKAGES } from './data/toursData';
import { TourPackage, TaxiVehicle } from './types';

export default function App() {
  const [selectedDetailPackage, setSelectedDetailPackage] = useState<TourPackage | null>(null);

  // Multi-step booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [preselectedPkgId, setPreselectedPkgId] = useState<string | undefined>(undefined);
  const [preselectedTaxiId, setPreselectedTaxiId] = useState<string | undefined>(undefined);
  const [preselectedDate, setPreselectedDate] = useState<string | undefined>(undefined);

  const handleOpenBooking = (prefillTarget?: string) => {
    // If prefillTarget matches a tour title or ID
    if (prefillTarget) {
      const matchedTour = TOUR_PACKAGES.find(
        (p) =>
          p.id.toLowerCase() === prefillTarget.toLowerCase() ||
          p.title.toLowerCase().includes(prefillTarget.toLowerCase())
      );
      if (matchedTour) {
        setPreselectedPkgId(matchedTour.id);
        setPreselectedTaxiId(undefined);
      } else {
        setPreselectedPkgId(undefined);
        setPreselectedTaxiId(undefined);
      }
    } else {
      setPreselectedPkgId(undefined);
      setPreselectedTaxiId(undefined);
    }
    setIsBookingModalOpen(true);
  };

  const handleBookTaxi = (vehicle: TaxiVehicle) => {
    setPreselectedTaxiId(vehicle.id);
    setPreselectedPkgId(undefined);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#24131E] font-sans antialiased">
      {/* Ensures page position scrolls to top on navigation */}
      <ScrollToTop />

      {/* Global Brand Header Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Multi-Page Route Outlet */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenBooking={handleOpenBooking}
                onSelectPackage={(pkg) => setSelectedDetailPackage(pkg)}
                onBookTaxi={handleBookTaxi}
              />
            }
          />

          {/* Destinations Catalog & Dedicated Region Pages */}
          <Route
            path="/destinations"
            element={<DestinationsPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/destination/:destinationId"
            element={<DestinationDetailPage onOpenBooking={handleOpenBooking} />}
          />

          {/* Tour Packages Catalog & Dedicated Itinerary Pages */}
          <Route
            path="/tours"
            element={<ToursPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/tour/:tourId"
            element={<TourDetailPage onOpenBooking={handleOpenBooking} />}
          />

          {/* Chauffeur Taxi Fleet Rental Page */}
          <Route
            path="/taxi"
            element={
              <TaxiPage
                onBookTaxi={handleBookTaxi}
                onOpenBooking={() => handleOpenBooking()}
              />
            }
          />

          {/* Customer Reviews & Instagram Reels Page */}
          <Route
            path="/reviews"
            element={<ReviewsPage onOpenBooking={() => handleOpenBooking()} />}
          />

          {/* Custom Trip Planning & Contact Page */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Travel Personas / Styles Catalog & Dedicated Persona Pages */}
          <Route
            path="/travel-styles"
            element={<TravelStylesIndexPage onOpenBooking={handleOpenBooking} />}
          />
          <Route
            path="/travel-style/:styleId"
            element={
              <TravelStyleDetailPage
                onOpenBooking={handleOpenBooking}
                onSelectPackage={(pkg) => setSelectedDetailPackage(pkg)}
                onBookTaxi={handleBookTaxi}
              />
            }
          />

          {/* 404 - real "not found" page (noindex) instead of redirecting to Home */}
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <Helmet>
                  <title>Page Not Found | Rangrez Holidays</title>
                  <meta name="robots" content="noindex, follow" />
                </Helmet>
                <h1 className="font-serif text-3xl font-bold text-[#4A0E35]">Page Not Found</h1>
                <p className="mt-2 text-sm text-[#735467] max-w-md">
                  The page you are looking for may have moved or no longer exists.
                </p>
                <Link
                  to="/"
                  className="mt-6 inline-flex items-center px-6 py-3 rounded-xl bg-[#4A0E35] text-white font-bold text-xs shadow-md hover:bg-[#380927]"
                >
                  Back to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Persistent Global Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Instant WhatsApp Support Widget */}
      <WhatsAppChatWidget />

      {/* Global Multi-Step Booking & Inquiry Modal (Gmail SMTP integrated) */}
      <MultiStepBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialPackageId={preselectedPkgId}
        initialTaxiId={preselectedTaxiId}
        initialDate={preselectedDate}
      />

      {/* Quick Package Detail Modal for Instant Previews */}
      {selectedDetailPackage && (
        <PackageDetailModal
          packageData={selectedDetailPackage}
          isOpen={Boolean(selectedDetailPackage)}
          onClose={() => setSelectedDetailPackage(null)}
          onBookNow={(pkg) => {
            setSelectedDetailPackage(null);
            handleOpenBooking(pkg.id);
          }}
        />
      )}
    </div>
  );
}
