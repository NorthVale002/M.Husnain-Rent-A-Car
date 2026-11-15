import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection, { type QuickQuoteSelection } from './components/HeroSection';
import FleetSection from './components/FleetSection';
import ServicesSection from './components/ServicesSection';
import PricingAndSteps from './components/PricingAndSteps';
import AreasReviewsFaq from './components/AreasReviewsFaq';
import ContactSection from './components/ContactSection';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import { KARACHI_AREAS, VEHICLES, type DriveMode, type Vehicle } from './data/rentalData';

interface ModalState {
  isOpen: boolean;
  vehicleId: string;
  driveMode: DriveMode;
  pickupArea: string;
  durationDays: number;
  weddingDecor: boolean;
}

export default function App() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    vehicleId: VEHICLES[1].id,
    driveMode: 'chauffeur',
    pickupArea: KARACHI_AREAS[0],
    durationDays: 1,
    weddingDecor: false,
  });

  const handleOpenDefaultBooking = () => {
    setModalState({
      isOpen: true,
      vehicleId: VEHICLES[1].id,
      driveMode: 'chauffeur',
      pickupArea: KARACHI_AREAS[0],
      durationDays: 1,
      weddingDecor: false,
    });
  };

  const handleBookWeddingCar = () => {
    setModalState({
      isOpen: true,
      vehicleId: VEHICLES[1].id,
      driveMode: 'chauffeur',
      pickupArea: KARACHI_AREAS[0],
      durationDays: 1,
      weddingDecor: true,
    });
  };

  const handleQuickBook = (selection: QuickQuoteSelection) => {
    setModalState({
      isOpen: true,
      vehicleId: selection.vehicleId,
      driveMode: selection.driveMode,
      pickupArea: selection.pickupArea,
      durationDays: selection.durationDays,
      weddingDecor: false,
    });
  };

  const handleSelectVehicle = (vehicle: Vehicle, mode: DriveMode) => {
    setModalState({
      isOpen: true,
      vehicleId: vehicle.id,
      driveMode: mode,
      pickupArea: KARACHI_AREAS[0],
      durationDays: 1,
      weddingDecor: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenBooking={handleOpenDefaultBooking} />

      <main className="flex-1">
        <HeroSection onQuickBook={handleQuickBook} />
        <FleetSection onSelectVehicle={handleSelectVehicle} />
        <ServicesSection
          onOpenBooking={handleOpenDefaultBooking}
          onBookWeddingCar={handleBookWeddingCar}
        />
        <PricingAndSteps onOpenBooking={handleOpenDefaultBooking} />
        <AreasReviewsFaq />
        <ContactSection />
      </main>

      <Footer />

      <BookingModal
        isOpen={modalState.isOpen}
        initialVehicleId={modalState.vehicleId}
        initialDriveMode={modalState.driveMode}
        initialPickupArea={modalState.pickupArea}
        initialDurationDays={modalState.durationDays}
        initialWeddingDecor={modalState.weddingDecor}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
