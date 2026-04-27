import { type RefObject } from 'react';

interface Props {
  simulatorRef: RefObject<HTMLElement | null>;
}

export default function SetupPanel({ simulatorRef }: Props) {
  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="min-h-[80vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            October 15, 2026 · AEP Opens
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-6">
          You're an independent Medicare broker.
          <br className="hidden sm:block" />
          <span className="text-blue-600"> 247 clients. 5 states.</span>
          <br />
          Aetna just announced it's exiting Texas.
          <br />
          <span className="text-gray-500 font-medium">What do you do?</span>
        </h1>

        {/* Body copy */}
        <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mb-10">
          <p>
            Carrier exits during AEP are a growing reality — CMS reported 47 county-level plan
            withdrawals in 2025 alone, and the 2026 Final Rule accelerated formulary and benefit
            changes that compound the problem. Every affected client who doesn't hear from their
            broker first is a client who starts shopping on their own.
          </p>
          <p>
            With only 54 days in the AEP window and a full book to manage, the difference between
            a spreadsheet and an AI assistant isn't convenience.{' '}
            <strong className="text-gray-800">It's clients saved.</strong>
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToSimulator}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-colors shadow-sm"
        >
          Run the Simulation
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Stat chips */}
        <div className="flex flex-wrap gap-3 mt-8">
          {[
            '247 clients simulated',
            '5 states',
            '23 TX-Aetna clients affected',
            '54-day AEP window',
          ].map(label => (
            <span
              key={label}
              className="text-xs font-medium text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
