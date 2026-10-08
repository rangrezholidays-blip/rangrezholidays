'use client';

import React, { useMemo, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppChatWidget } from './WhatsAppChatWidget';
import { MultiStepBookingModal } from './MultiStepBookingModal';
import { PackageDetailModal } from './PackageDetailModal';
import { AppContext, type AppContextValue } from '../lib/app-context';
import { TOUR_PACKAGES } from '../data/toursData';
import type { TourPackage, TaxiVehicle } from '../types';

/**
 * Persistent site chrome (navbar, footer, chat widget, global modals).
 * Rendered once in the root layout so it survives page navigation.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [selectedDetailPackage, setSelectedDetailPackage] = useState<TourPackage | null>(null);

  // Multi-step booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [preselectedPkgId, setPreselectedPkgId] = useState<string | undefined>(undefined);
  const [preselectedTaxiId, setPreselectedTaxiId] = useState<string | undefined>(undefined);

  const value = useMemo<AppContextValue>(() => {
    const onOpenBooking = (prefillTarget?: unknown) => {
      // Ignore non-string args (e.g. a click event passed straight through as a handler).
      const target = typeof prefillTarget === 'string' ? prefillTarget : undefined;
      const matchedTour = target
        ? TOUR_PACKAGES.find(
            (p) =>
              p.id.toLowerCase() === target.toLowerCase() ||
              p.title.toLowerCase().includes(target.toLowerCase())
          )
        : undefined;
      setPreselectedPkgId(matchedTour?.id);
      setPreselectedTaxiId(undefined);
      setIsBookingModalOpen(true);
    };

    const onBookTaxi = (vehicle: TaxiVehicle) => {
      setPreselectedTaxiId(vehicle.id);
      setPreselectedPkgId(undefined);
      setIsBookingModalOpen(true);
    };

    return {
      onOpenBooking,
      onSelectPackage: (pkg: TourPackage) => setSelectedDetailPackage(pkg),
      onBookTaxi,
    };
  }, []);

  return (
    <AppContext.Provider value={value}>
      <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#24131E] font-sans antialiased">
        {/* Global Brand Header Navbar */}
        <Navbar onOpenBooking={() => value.onOpenBooking()} />

        {/* Current page */}
        <main className="flex-1">{children}</main>

        {/* Persistent Global Footer */}
        <Footer onOpenBooking={() => value.onOpenBooking()} />

        {/* Instant WhatsApp Support Widget */}
        <WhatsAppChatWidget />

        {/* Global Multi-Step Booking & Inquiry Modal */}
        <MultiStepBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialPackageId={preselectedPkgId}
          initialTaxiId={preselectedTaxiId}
        />

        {/* Quick Package Detail Modal for Instant Previews */}
        {selectedDetailPackage && (
          <PackageDetailModal
            packageData={selectedDetailPackage}
            isOpen={Boolean(selectedDetailPackage)}
            onClose={() => setSelectedDetailPackage(null)}
            onBookNow={(pkg) => {
              setSelectedDetailPackage(null);
              value.onOpenBooking(pkg.id);
            }}
          />
        )}
      </div>
    </AppContext.Provider>
  );
}
