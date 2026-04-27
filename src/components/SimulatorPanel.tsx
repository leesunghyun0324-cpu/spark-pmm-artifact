import { useState } from 'react';
import { ALL_CLIENTS, AFFECTED_CLIENT_IDS, type Client } from '../data/clients';
import ClientTable from './ClientTable';
import ClientCard from './ClientCard';
import SidePanel from './SidePanel';
import ClientModal from './ClientModal';

function getSortedClients(withSpark: boolean): Client[] {
  if (!withSpark) {
    return [...ALL_CLIENTS].sort((a, b) => a.name.localeCompare(b.name));
  }
  const affected = ALL_CLIENTS
    .filter(c => AFFECTED_CLIENT_IDS.has(c.id))
    .sort((a, b) => (b.urgency_score ?? 0) - (a.urgency_score ?? 0));
  const rest = ALL_CLIENTS
    .filter(c => !AFFECTED_CLIENT_IDS.has(c.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...affected, ...rest];
}

export default function SimulatorPanel() {
  const [withSpark, setWithSpark] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clients = getSortedClients(withSpark);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Live Simulation
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Your 247-Client Book · AEP Day 1
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Same data. Same clients. Radically different outcomes.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative inline-flex items-center bg-gray-100 rounded-full p-1.5 shadow-inner">
            {/* Sliding pill */}
            <div
              className={`absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-in-out ${
                withSpark ? 'bg-blue-600 left-[calc(50%+3px)] right-1.5' : 'bg-white left-1.5 right-[calc(50%+3px)]'
              } shadow`}
            />
            <button
              onClick={() => setWithSpark(false)}
              className={`relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                !withSpark ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Without Spark
            </button>
            <button
              onClick={() => setWithSpark(true)}
              className={`relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap ${
                withSpark ? 'text-white' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              With Spark AI Assistant
            </button>
          </div>
        </div>

        {/* Banner (withSpark only) */}
        {withSpark && (
          <div className="mb-4 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
            <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 animate-pulse" />
            <p className="text-sm text-blue-800 font-medium">
              AI Assistant identified <strong>23 clients</strong> affected by Aetna's Texas market exit and sorted them by churn risk.
            </p>
          </div>
        )}

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Table / Cards */}
          <div className="flex-1 min-w-0">
            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="max-h-[520px] overflow-y-auto rounded-xl scrollbar-thin">
                <ClientTable clients={clients} withSpark={withSpark} onRowClick={setSelectedClient} />
              </div>
              <p className="mt-2 text-xs text-gray-400 text-right">
                {clients.length} clients · {withSpark ? '23 flagged' : 'unsorted'}
              </p>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden max-h-[500px] overflow-y-auto scrollbar-thin pr-1">
              <ClientCard clients={clients} withSpark={withSpark} onCardClick={setSelectedClient} />
            </div>
          </div>

          {/* Side panel */}
          <SidePanel withSpark={withSpark} clients={ALL_CLIENTS} onClientClick={setSelectedClient} />
        </div>
      </div>

      <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
    </section>
  );
}
