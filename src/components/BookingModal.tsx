import { useEffect, useState } from 'react';
import { X, MessageCircle, CheckCircle2 } from 'lucide-react';
import {
  BUSINESS_INFO,
  KARACHI_AREAS,
  OUTSTATION_DESTINATIONS,
  VEHICLES,
  WEDDING_DECOR_STYLES,
  type DriveMode,
} from '../data/rentalData';

interface BookingModalProps {
  isOpen: boolean;
  initialVehicleId?: string;
  initialDriveMode?: DriveMode;
  initialPickupArea?: string;
  initialDurationDays?: number;
  initialWeddingDecor?: boolean;
  onClose: () => void;
}

export default function BookingModal({
  isOpen,
  initialVehicleId,
  initialDriveMode = 'chauffeur',
  initialPickupArea = KARACHI_AREAS[0],
  initialDurationDays = 1,
  initialWeddingDecor = false,
  onClose,
}: BookingModalProps) {
  const [vehicleId, setVehicleId] = useState(initialVehicleId ?? VEHICLES[1].id);
  const [driveMode, setDriveMode] = useState<DriveMode>(initialDriveMode);
  const [pickupArea, setPickupArea] = useState(initialPickupArea);
  const [durationDays, setDurationDays] = useState(initialDurationDays);
  const [weddingDecor, setWeddingDecor] = useState(initialWeddingDecor);
  const [decorStyle, setDecorStyle] = useState(WEDDING_DECOR_STYLES[0].name);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [error, setError] = useState('');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialVehicleId) setVehicleId(initialVehicleId);
      setDriveMode(initialDriveMode);
      setPickupArea(initialPickupArea);
      setDurationDays(initialDurationDays);
      setWeddingDecor(initialWeddingDecor);
      setError('');
      setConfirmedRef(null);
    }
  }, [
    isOpen,
    initialVehicleId,
    initialDriveMode,
    initialPickupArea,
    initialDurationDays,
    initialWeddingDecor,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const vehicle = VEHICLES.find((v) => v.id === vehicleId) ?? VEHICLES[0];
  const canSelfDrive = vehicle.selfDriveAllowed;
  const effectiveMode: DriveMode =
    driveMode === 'self-drive' && canSelfDrive ? 'self-drive' : 'chauffeur';

  const buildWhatsAppBookingUrl = () => {
    const text = [
      `Assalam-o-Alaikum ${BUSINESS_INFO.name},`,
      `Booking Request:`,
      `Vehicle: ${vehicle.name}`,
      `Mode: ${effectiveMode === 'chauffeur' ? 'With Chauffeur' : 'Self-Drive'}`,
      `Pickup Area: ${pickupArea}`,
      `Duration: ${durationDays} Day(s)`,
      weddingDecor ? `Wedding Car Decoration: Yes (${decorStyle})` : '',
      pickupDate ? `Pickup Date: ${pickupDate}` : '',
      customerName ? `Name: ${customerName}` : '',
      customerPhone ? `Phone: ${customerPhone}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${BUSINESS_INFO.whatsappIntl}?text=${encodeURIComponent(text)}`;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanName = customerName.trim();
    const cleanPhone = customerPhone.replace(/\s+/g, '');

    if (cleanName.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^(?:\+?92|0)?3\d{9}$/.test(cleanPhone) && cleanPhone.length < 10) {
      setError('Please enter a valid mobile or WhatsApp number (e.g. 03120281033).');
      return;
    }

    setConfirmedRef(`MHR-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between gap-4">
          <div>
            <h3 id="booking-modal-title" className="font-display text-lg font-bold">
              Reserve Your Vehicle
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              24/7 Dispatch · {BUSINESS_INFO.phoneDisplay}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {confirmedRef ? (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                Booking Request Created
              </div>
              <p className="font-display text-xl font-bold text-slate-950">
                Reference: <span className="font-mono">{confirmedRef}</span>
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your booking request for <span className="font-semibold">{vehicle.name}</span>
                {weddingDecor ? ` with ${decorStyle} wedding decoration` : ''} ({durationDays} day
                {durationDays > 1 ? 's' : ''}) is ready. Tap below to send it directly to our
                WhatsApp desk for confirmation.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={buildWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send to WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4" noValidate>
              {error && (
                <div
                  role="alert"
                  className="px-3.5 py-2.5 text-sm font-medium text-red-800 bg-red-50 border border-red-200 rounded-lg"
                >
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="modal-vehicle" className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle
                </label>
                <select
                  id="modal-vehicle"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  {VEHICLES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-mode" className="block text-xs font-semibold text-slate-700 mb-1">
                    Drive Mode
                  </label>
                  <select
                    id="modal-mode"
                    value={effectiveMode}
                    onChange={(e) => setDriveMode(e.target.value as DriveMode)}
                    disabled={!canSelfDrive}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg disabled:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="chauffeur">With Chauffeur</option>
                    {canSelfDrive && <option value="self-drive">Self-Drive</option>}
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-days" className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration
                  </label>
                  <select
                    id="modal-days"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value={1}>1 Day</option>
                    <option value={3}>3 Days</option>
                    <option value={7}>1 Week (7 Days)</option>
                    <option value={15}>15 Days</option>
                    <option value={30}>1 Month (30 Days)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-area" className="block text-xs font-semibold text-slate-700 mb-1">
                    Karachi Area or Outstation
                  </label>
                  <select
                    id="modal-area"
                    value={pickupArea}
                    onChange={(e) => setPickupArea(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
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
                  <label htmlFor="modal-date" className="block text-xs font-semibold text-slate-700 mb-1">
                    Pickup Date
                  </label>
                  <input
                    id="modal-date"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Wedding Car Decoration Option */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
                <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={weddingDecor}
                    onChange={(e) => setWeddingDecor(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-600"
                  />
                  Include Wedding Car Decoration (Flowers &amp; Ribbons)
                </label>

                {weddingDecor && (
                  <select
                    aria-label="Wedding decoration style"
                    value={decorStyle}
                    onChange={(e) => setDecorStyle(e.target.value)}
                    className="w-full h-9 px-3 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    {WEDDING_DECOR_STYLES.map((style) => (
                      <option key={style.name} value={style.name}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    className="w-full h-10 px-3 text-sm font-mono bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer"
                >
                  Confirm Reservation
                </button>
                <a
                  href={buildWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-amber-600" />
                  WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
