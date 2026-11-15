import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import {
  BUSINESS_INFO,
  KARACHI_AREAS,
  OUTSTATION_DESTINATIONS,
  VEHICLES,
  WEDDING_DECOR_STYLES,
  type DriveMode,
} from '../data/rentalData';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupArea, setPickupArea] = useState(KARACHI_AREAS[0]);
  const [vehicleId, setVehicleId] = useState(VEHICLES[1].id);
  const [driveMode, setDriveMode] = useState<DriveMode>('chauffeur');
  const [pickupDate, setPickupDate] = useState('');
  const [weddingDecor, setWeddingDecor] = useState(false);
  const [decorStyle, setDecorStyle] = useState(WEDDING_DECOR_STYLES[0].name);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const selectedVehicle = VEHICLES.find((v) => v.id === vehicleId) ?? VEHICLES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\s+/g, '');

    if (cleanName.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^(?:\+?92|0)?3\d{9}$/.test(cleanPhone) && cleanPhone.length < 10) {
      setError('Please enter a valid Pakistani mobile or WhatsApp number (e.g. 03120281033).');
      return;
    }

    const refCode = `MHR-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(refCode);
  };

  const buildWhatsAppLink = () => {
    const message = [
      `Assalam-o-Alaikum ${BUSINESS_INFO.name},`,
      `I would like to book: ${selectedVehicle.name}`,
      `Service: ${driveMode === 'chauffeur' ? 'With Chauffeur' : 'Self-Drive'}`,
      `Pickup Area: ${pickupArea}`,
      weddingDecor ? `Wedding Car Decoration: Yes (${decorStyle})` : '',
      pickupDate ? `Pickup Date: ${pickupDate}` : '',
      name ? `Name: ${name}` : '',
      phone ? `Phone: ${phone}` : '',
      notes ? `Notes: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${BUSINESS_INFO.whatsappIntl}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Direct Business Info */}
          <div className="lg:col-span-5 bg-slate-950 text-white rounded-xl p-8 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-amber-400">Direct Dispatch &amp; Office</p>
              <h2
                className="font-display text-3xl font-bold tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                Speak Directly With {BUSINESS_INFO.name}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Call or WhatsApp anytime for urgent airport pickups, wedding fleet bookings, or
                monthly corporate car contracts in Karachi.
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Office Address</p>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{BUSINESS_INFO.address}</p>
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium mt-1.5"
                  >
                    Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Phone &amp; WhatsApp</p>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="font-mono text-base text-slate-200 hover:text-amber-400 transition-colors block mt-0.5"
                  >
                    {BUSINESS_INFO.phoneDisplay} ({BUSINESS_INFO.phoneRaw})
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Email Address</p>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-slate-200 hover:text-amber-400 transition-colors block mt-0.5 break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Opening Hours</p>
                  <p className="text-slate-300 mt-0.5">{BUSINESS_INFO.hours}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Now
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white border border-slate-700 hover:bg-slate-900 rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call Dispatch
              </a>
            </div>
          </div>

          {/* Right Column: Validated Booking Request Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col justify-center">
            {submittedRef ? (
              <div className="space-y-5 py-6">
                <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  Booking Request Logged
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-950">
                  Reference: <span className="font-mono">{submittedRef}</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                  Thank you, <span className="font-semibold text-slate-900">{name}</span>. Your
                  inquiry for <span className="font-semibold text-slate-900">{selectedVehicle.name}</span>{' '}
                  ({driveMode === 'chauffeur' ? 'With Chauffeur' : 'Self-Drive'}) in{' '}
                  <span className="font-semibold text-slate-900">{pickupArea}</span> is ready. For
                  immediate vehicle lock-in, send this summary straight to our 24/7 WhatsApp desk.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send Summary on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setName('');
                      setPhone('');
                      setNotes('');
                    }}
                    className="px-5 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-950">
                    Request a Car Reservation
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Share your trip details and our team will confirm vehicle availability right away.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="px-4 py-3 text-sm font-medium text-red-800 bg-red-50 border border-red-200 rounded-lg"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Muhammad Bilal"
                      className="w-full h-11 px-3.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full h-11 px-3.5 text-sm font-mono bg-white border border-slate-300 rounded-lg text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-vehicle"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Preferred Vehicle
                    </label>
                    <select
                      id="contact-vehicle"
                      value={vehicleId}
                      onChange={(e) => setVehicleId(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
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
                      htmlFor="contact-area"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Karachi Area or Outstation
                    </label>
                    <select
                      id="contact-area"
                      value={pickupArea}
                      onChange={(e) => setPickupArea(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-mode"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Rental Option
                    </label>
                    <select
                      id="contact-mode"
                      value={driveMode}
                      onChange={(e) => setDriveMode(e.target.value as DriveMode)}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    >
                      <option value="chauffeur">With Chauffeur (Driver)</option>
                      <option value="self-drive">Self-Drive</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-date"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Pickup Date
                    </label>
                    <input
                      id="contact-date"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full h-11 px-3.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-lg space-y-2.5">
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
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                    >
                      {WEDDING_DECOR_STYLES.map((style) => (
                        <option key={style.name} value={style.name}>
                          {style.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-notes"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Trip Details (Optional)
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Airport flight time, wedding decor request, or outstation destination..."
                    className="w-full p-3.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                  >
                    Confirm Booking Request
                  </button>
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 text-sm font-semibold text-slate-900 bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors"
                  >
                    Chat Directly on WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
