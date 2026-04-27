import { useState } from 'react';
import { ALL_CLIENTS, type Client } from '../data/clients';
import { AETNA_TX_SCENARIO, getScenarioAffectedClients } from '../data/scenarios';
import ClientTable from './ClientTable';
import ClientCard from './ClientCard';
import SidePanel from './SidePanel';
import ClientDetailModal from './ClientDetailModal';
import MessageModal from './MessageModal';

function getSortedClients(withSpark: boolean): Client[] {
  const affected = getScenarioAffectedClients(ALL_CLIENTS);
  const affectedIds = new Set(affected.map(c => c.id));

  if (!withSpark) {
    return [...ALL_CLIENTS].sort((a, b) => a.name.localeCompare(b.name));
  }

  const rest = ALL_CLIENTS
    .filter(c => !affectedIds.has(c.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...affected, ...rest];
}

function getTemplateIndex(clientId: string): number {
  const affected = getScenarioAffectedClients(ALL_CLIENTS);
  const idx = affected.findIndex(c => c.id === clientId);
  return idx >= 0 ? idx : 0;
}

export default function SimulatorPanel() {
  const [withSpark, setWithSpark] = useState(false);
  const [tableVisible, setTableVisible] = useState(true);
  const [detailClient, setDetailClient] = useState<Client | null>(null);
  const [messageClient, setMessageClient] = useState<Client | null>(null);

  const affectedClients = getScenarioAffectedClients(ALL_CLIENTS);
  const affectedIds = new Set(affectedClients.map(c => c.id));
  const clients = getSortedClients(withSpark);

  const triggerFade = (fn: () => void) => {
    setTableVisible(false);
    setTimeout(() => {
      fn();
      setTableVisible(true);
    }, 180);
  };

  const handleToggle = (val: boolean) => {
    if (val === withSpark) return;
    triggerFade(() => setWithSpark(val));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Live Simulation</span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            Your 247-Client Book · AEP Day 1
          </h2>
          <p className="mt-1.5 text-gray-500 text-sm">Same data. Same clients. Radically different outcomes.</p>
        </div>

        {/* Toggle — inline-grid avoids absolute-pill clipping bug */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-grid grid-cols-2 bg-gray-100 rounded-full p-1.5 shadow-inner gap-0 min-w-[320px]">
            <button
              onClick={() => handleToggle(false)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap text-center ${
                !withSpark ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Without Spark
            </button>
            <button
              onClick={() => handleToggle(true)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap text-center ${
                withSpark ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              With Spark AI Assistant
            </button>
          </div>
        </div>

        {/* Banner (withSpark only) */}
        {withSpark && (
          <div className="mb-4 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 slide-down">
            <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 animate-pulse" />
            <p className="text-sm text-blue-800 font-medium">{AETNA_TX_SCENARIO.bannerText}</p>
          </div>
        )}

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Table / Cards */}
          <div
            className="flex-1 min-w-0 transition-opacity duration-180"
            style={{ opacity: tableVisible ? 1 : 0 }}
          >
            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="max-h-[520px] overflow-y-auto rounded-xl scrollbar-thin">
                <ClientTable
                  clients={clients}
                  withSpark={withSpark}
                  affectedIds={affectedIds}
                  onRowClick={(client) => {
                    const enriched = affectedClients.find(c => c.id === client.id) ?? client;
                    setDetailClient(enriched);
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-gray-400 text-right">
                {clients.length} clients · {withSpark ? `${AETNA_TX_SCENARIO.affectedCount} flagged` : 'alpha sort'}
              </p>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden max-h-[500px] overflow-y-auto scrollbar-thin pr-1">
              <ClientCard
                clients={clients}
                withSpark={withSpark}
                affectedIds={affectedIds}
                onCardClick={(client) => {
                  const enriched = affectedClients.find(c => c.id === client.id) ?? client;
                  setDetailClient(enriched);
                }}
              />
            </div>
          </div>

          {/* Side panel */}
          <SidePanel
            withSpark={withSpark}
            affectedClients={affectedClients}
            onDetailClick={(client) => {
              const enriched = affectedClients.find(c => c.id === client.id) ?? client;
              setDetailClient(enriched);
            }}
            onMessageClick={(client) => {
              const enriched = affectedClients.find(c => c.id === client.id) ?? client;
              setMessageClient(enriched);
            }}
          />
        </div>
      </div>

      {/* Modals */}
      <ClientDetailModal
        client={detailClient}
        templateIndex={detailClient ? getTemplateIndex(detailClient.id) : 0}
        onClose={() => setDetailClient(null)}
      />
      <MessageModal
        client={messageClient}
        templateIndex={messageClient ? getTemplateIndex(messageClient.id) : 0}
        onClose={() => setMessageClient(null)}
      />
    </section>
  );
}
