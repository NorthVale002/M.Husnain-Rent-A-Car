import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SERVICES, WEDDING_DECOR_IMAGES, WEDDING_DECOR_STYLES } from '../data/rentalData';

interface ServicesSectionProps {
  onOpenBooking: () => void;
  onBookWeddingCar: () => void;
}

export default function ServicesSection({
  onOpenBooking,
  onBookWeddingCar,
}: ServicesSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  return (
    <section id="services" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-amber-700 mb-2">Core Services</p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950"
                style={{ textWrap: 'balance' }}
              >
                Simple, Reliable Rentals Across Karachi
              </h2>
            </div>

            <button
              type="button"
              onClick={onOpenBooking}
              className="self-start md:self-auto px-5 py-2.5 text-sm font-semibold text-slate-950 bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            >
              Book a Ride
            </button>
          </div>

          {/* Clean 2x2 Grid with 4 concise services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.number}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between gap-3"
              >
                <p className="font-mono text-xs font-semibold text-amber-700">
                  {service.number}. Service
                </p>
                <h3 className="font-display text-xl font-bold tracking-tight text-slate-950">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wedding Car Decoration Visual Showcase */}
        <div
          id="wedding-decor"
          className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
        >
          <div className="lg:col-span-6 grid grid-cols-2 gap-1 bg-slate-200">
            {WEDDING_DECOR_IMAGES.map((img, idx) => (
              <div key={img.alt} className="bg-slate-100 aspect-[4/3] overflow-hidden">
                {!failedImages[idx] ? (
                  <img
                    src={img.src}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages((prev) => ({ ...prev, [idx]: true }))}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4 text-slate-500">
                    <Sparkles className="w-7 h-7 mb-1.5 text-amber-600" />
                    <span className="text-xs font-medium text-slate-700 text-center">
                      Wedding Car Decor
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-amber-700">Wedding Car Decoration</p>
              <h3
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950"
                style={{ textWrap: 'balance' }}
              >
                Fresh Flower &amp; Ribbon Styling for Baraat &amp; Valima
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Custom in-house floral &amp; ribbon decoration on Daihatsu Copen Convertible, Audi
                A4, Toyota Prado, Mercedes S-Class, BMW i7, and Corolla — delivered ready across
                Karachi.
              </p>
            </div>

            <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
              {WEDDING_DECOR_STYLES.map((style, idx) => (
                <div key={style.name} className="py-3">
                  <p className="text-sm font-semibold text-slate-950">
                    0{idx + 1}. {style.name}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">{style.detail}</p>
                </div>
              ))}
            </div>

            <div>
              <button
                type="button"
                onClick={onBookWeddingCar}
                className="px-5 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
              >
                Book Decorated Wedding Car
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
