import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/rentalData';

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
            <div className="md:col-span-5 space-y-3">
              <a href="#top" className="font-display text-xl font-bold text-white tracking-tight">
                {BUSINESS_INFO.name}
              </a>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                24/7 car and bus rental service in Orangi Town and across Karachi. Luxury sedans,
                4x4 SUVs, convertibles, decorated wedding cars, and passenger coaches.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5 text-sm">
              <p className="font-semibold text-white">Quick Links</p>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#fleet" className="hover:text-white transition-colors">
                    Vehicle Fleet
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Rental Services
                  </a>
                </li>
                <li>
                  <a href="#areas" className="hover:text-white transition-colors">
                    Karachi Areas
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    Rental Policies &amp; FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5 text-sm">
              <p className="font-semibold text-white">Karachi Contact</p>
              <p className="text-slate-400 leading-relaxed">{BUSINESS_INFO.address}</p>
              <p>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="font-mono text-amber-400 hover:text-amber-300 transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-slate-400 hover:text-white transition-colors break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <p>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  View Location on Google Maps
                </a>
              </p>
              <p className="text-xs text-slate-400 pt-1">{BUSINESS_INFO.hours}</p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
            </p>
            <p>Orangi Town Sector 6 · Karachi 75800</p>
          </div>
        </div>
      </footer>

      {/* Compact Floating WhatsApp Quick-Chat Action */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappIntl}?text=${encodeURIComponent(
          'Assalam-o-Alaikum M.Husnain Rent A Car, I want to inquire about renting a car in Karachi.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with M.Husnain Rent A Car"
        className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
}
