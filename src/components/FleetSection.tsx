import { useState } from 'react';
import { Car } from 'lucide-react';
import {
  FLEET_CATEGORIES,
  VEHICLES,
  type DriveMode,
  type Vehicle,
  type VehicleCategory,
} from '../data/rentalData';

interface FleetSectionProps {
  onSelectVehicle: (vehicle: Vehicle, mode: DriveMode) => void;
}

function VehicleImage({ vehicle }: { vehicle: Vehicle }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-6 text-slate-500">
        <Car className="w-10 h-10 mb-2 text-slate-400" />
        <span className="text-sm font-medium text-slate-600 text-center">{vehicle.name}</span>
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
      <img
        src={vehicle.image}
        alt={`${vehicle.name} available at M.Husnain Rent A Car Karachi`}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  );
}

export default function FleetSection({ onSelectVehicle }: FleetSectionProps) {
  const [activeCategory, setActiveCategory] = useState<VehicleCategory>('All');

  const filteredVehicles =
    activeCategory === 'All'
      ? VEHICLES
      : VEHICLES.filter((vehicle) => vehicle.category === activeCategory);

  return (
    <section id="fleet" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <p className="text-sm font-semibold text-amber-700 mb-2">Our Karachi Fleet</p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950"
            style={{ textWrap: 'balance' }}
          >
            Clean, Ready-to-Drive Vehicles
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Select a vehicle category below and book directly via WhatsApp or form.
          </p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200">
          {FLEET_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
                activeCategory === category
                  ? 'bg-slate-950 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => {
            const defaultMode: DriveMode = vehicle.selfDriveAllowed ? 'self-drive' : 'chauffeur';

            return (
              <article
                key={vehicle.id}
                className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden transition-shadow duration-150 hover:shadow-md"
              >
                <VehicleImage vehicle={vehicle} />

                <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 mb-2">
                      <span>{vehicle.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{vehicle.seats} Seats</span>
                      <span aria-hidden="true">·</span>
                      <span>{vehicle.transmission}</span>
                      <span aria-hidden="true">·</span>
                      <span>{vehicle.engine}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-slate-950 tracking-tight">
                      {vehicle.name}
                    </h3>

                    <p className="mt-1.5 text-sm text-slate-600">{vehicle.idealFor}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <span className="text-xs font-medium text-slate-600">
                      {vehicle.selfDriveAllowed ? 'Self-Drive & Chauffeur' : 'Chauffeur Driven'}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectVehicle(vehicle, defaultMode)}
                      className="px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
