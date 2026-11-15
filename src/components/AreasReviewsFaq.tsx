import { useState } from 'react';
import { ChevronDown, MapPin, ExternalLink } from 'lucide-react';
import {
  BUSINESS_INFO,
  FAQS,
  KARACHI_AREAS,
  OUTSTATION_DESTINATIONS,
} from '../data/rentalData';

export default function AreasReviewsFaq() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section id="areas" className="py-14 lg:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Karachi Service Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm font-semibold text-amber-700">Karachi &amp; Intercity</p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950"
              style={{ textWrap: 'balance' }}
            >
              Serving All of Karachi &amp; Out-of-City Routes
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Visit us at <span className="font-medium text-slate-900">{BUSINESS_INFO.address}</span>{' '}
              for 24/7 delivery in Karachi or intercity trips across Pakistan.
            </p>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors duration-150"
              >
                <MapPin className="w-4 h-4 text-amber-600" />
                View Location on Google Maps
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-slate-950 mb-3">
                Within Karachi (24/7 Pickup &amp; Delivery)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5 text-sm text-slate-700">
                {KARACHI_AREAS.map((area) => (
                  <div key={area} className="py-1.5 border-b border-slate-100 font-medium">
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h3 className="font-display text-base font-bold text-slate-950 mb-3">
                Out of City (Intercity &amp; All-Pakistan Trips)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5 text-sm text-slate-700">
                {OUTSTATION_DESTINATIONS.map((city) => (
                  <div key={city} className="py-1.5 border-b border-slate-100 font-medium">
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div id="faq" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-amber-700 mb-2">Common Questions</p>
            <h3
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950"
              style={{ textWrap: 'balance' }}
            >
              Quick Answers
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Key details on documents, delivery, and 24/7 dispatch before you book.
            </p>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                  >
                    <span className="font-display text-base font-semibold text-slate-950">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
