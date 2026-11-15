import { BOOKING_STEPS } from '../data/rentalData';

interface PricingAndStepsProps {
  onOpenBooking: () => void;
}

export default function PricingAndSteps({ onOpenBooking }: PricingAndStepsProps) {
  return (
    <section id="how-it-works" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-amber-700 mb-2">How It Works</p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950"
              style={{ textWrap: 'balance' }}
            >
              Book Your Car in Four Easy Steps
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="self-start md:self-auto px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            Reserve Now
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOOKING_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-3"
            >
              <span className="font-mono text-sm font-semibold text-amber-700">
                Step {item.step}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-slate-950">{item.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
