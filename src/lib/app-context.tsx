'use client';

import { createContext, useContext } from 'react';
import type { TourPackage, TaxiVehicle } from '../types';

/**
 * Global UI actions shared by every page (booking modal, package preview modal).
 * Provided by <AppShell /> in the root layout; consumed by the page views.
 */
export interface AppContextValue {
  /** Opens the booking modal. Accepts an optional tour id / title to prefill. */
  onOpenBooking: (prefillTarget?: unknown) => void;
  /** Opens the quick package preview modal. */
  onSelectPackage: (pkg: TourPackage) => void;
  /** Opens the booking modal prefilled with a taxi. */
  onBookTaxi: (vehicle: TaxiVehicle) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppShell>');
  return ctx;
}
