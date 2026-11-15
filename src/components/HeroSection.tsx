import { useState } from 'react';
import { Phone, ArrowRight, MessageCircle } from 'lucide-react';
import {
  BUSINESS_INFO,
  HERO_IMAGE,
  KARACHI_AREAS,
  OUTSTATION_DESTINATIONS,
  VEHICLES,
  type DriveMode,
} from '../data/rentalData';

export interface QuickQuoteSelection {
  vehicleId: string;
  pickupArea: string;
  driveMode: DriveMode;
  durationDays: number;
}

interface HeroSectionProps {
  onQuickBook: (selection: QuickQuoteSelection) => void;
}

export default function HeroSection({ onQuickBook }: HeroSectionProps) {
  const [pickupArea, setPickupArea] = useState(KARACHI_AREAS[0]);
  const [vehicleId, setVehicleId] = useState(VEHICLES[1].id); // Toyota Corolla Altis default
  const [driveMode, setDriveMode] = useState<DriveMode>('chauffeur');
  const [durationDays, setDurationDays] = useState<number>(1);
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook({
      vehicleId,
      pickupArea,
      driveMode,
      durationDays,
    });
  };

  return (
    <section id="top" className="relative bg-slate-950 text-white overflow-hidden">
      {/* Full-bleed atmospheric backdrop */}
      <div className="relative min-h-[560px] lg:min-h-[620px] flex items-center">
        {!heroImgFailed ? (
          <img
            src={HERO_IMAGE}
            alt="BMW i7 luxury sedan ready for rental dispatch in Karachi"
            referrerPolicy="no-referrer"
            onError={() => setHeroImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
          />
        )}

        {/* Measured readability scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl space-y-6">
            <p className="text-sm font-medium text-amber-400 tracking-wide">
              Orangi Town, Karachi &amp; Outstation · Open 24/7
            </p>

            <h1
              className="font-display font-bold tracking-tight text-white leading-[1.08]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)', textWrap: 'balance' }}
            >
              Reliable Car Rental Across Karachi, Anytime You Move
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
              Toyota Prado, Mercedes-Benz S-Class, BMW i7, Hilux Vigo 4x4, Audi A4, Copen
              Convertible, Corolla, and AC/Non-AC passenger coaches — available 24/7 for weddings,
              events, group tours, and city or outstation travel.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappIntl}?text=${encodeURIComponent(
                  'Assalam-o-Alaikum M.Husnain Rent A Car, I would like to book a vehicle in Karachi.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <MessageCircle className="w-4 h-4" />
                Reserve on WhatsApp
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white border border-white/25 hover:bg-white/10 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-column Quick Quote & Availability Strip */}
      <div className="relative z-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form
            onSubmit={handleQuoteSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          >
            <div>
              <label
                htmlFor="hero-pickup-area"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Karachi Area or Outstation
              </label>
              <select
                id="hero-pickup-area"
                value={pickupArea}
                onChange={(e) => setPickupArea(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-slate-950 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <optgroup label="Within Karachi (24/7)">
                  {KARACHI_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Out of City (Intercity)">
                  {OUTSTATION_DESTINATIONS.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label
                htmlFor="hero-vehicle"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Select Vehicle
              </label>
              <select
                id="hero-vehicle"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full h-11 px-3 text-sm bg-slate-950 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="hero-drive-mode"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Service Option
              </label>
              <select
                id="hero-drive-mode"
                value={driveMode}
                onChange={(e) => setDriveMode(e.target.value as DriveMode)}
                className="w-full h-11 px-3 text-sm bg-slate-950 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="chauffeur">With Chauffeur (Driver)</option>
                <option value="self-drive">Self-Drive (CNIC &amp; License)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="hero-duration"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Rental Duration
              </label>
              <select
                id="hero-duration"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full h-11 px-3 text-sm bg-slate-950 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value={1}>1 Day</option>
                <option value={3}>3 Days</option>
                <option value={7}>1 Week (7 Days)</option>
                <option value={15}>15 Days</option>
                <option value={30}>1 Month (30 Days)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full h-11 px-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                Check Availability
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
