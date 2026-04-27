import { type Client, AFFECTED_CLIENT_IDS } from '../data/clients';
import { buildDraft } from '../data/outreach';

interface Props {
  withSpark: boolean;
  clients: Client[];
  onClientClick: (client: Client) => void;
}

function getTemplateIndex(id: string): number {
  return Array.from(AFFECTED_CLIENT_IDS).indexOf(id);
}

export default function SidePanel({ withSpark, clients, onClientClick }: Props) {
  const affectedSorted = clients
    .filter(c => AFFECTED_CLIENT_IDS.has(c.id))
    .sort((a, b) => (b.urgency_score ?? 0) - (a.urgency_score ?? 0))
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-4 lg:w-80 xl:w-96 shrink-0">
      {/* Counter cards */}
      <div className={`rounded-xl border p-5 transition-all duration-300 ${
        withSpark
          ? 'bg-blue-600 border-blue-700 text-white'
          : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
          withSpark ? 'text-blue-200' : 'text-gray-400'
        }`}>
          {withSpark ? 'With Spark AI Assistant' : 'Without Spark'}
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <div className={`text-5xl font-bold tracking-tight leading-none ${
              withSpark ? 'text-white' : 'text-gray-900'
            }`}>
              {withSpark ? '4 min' : '6h 12m'}
            </div>
            <div className={`text-sm mt-1 ${withSpark ? 'text-blue-200' : 'text-gray-500'}`}>
              elapsed
            </div>
          </div>

          <div className={`h-px ${withSpark ? 'bg-blue-500' : 'bg-gray-100'}`} />

          <div>
            <div className={`text-5xl font-bold tracking-tight leading-none ${
              withSpark ? 'text-white' : 'text-red-500'
            }`}>
              {withSpark ? '0' : '3'}
            </div>
            <div className={`text-sm mt-1 ${withSpark ? 'text-blue-200' : 'text-gray-500'}`}>
              clients missed
            </div>
          </div>
        </div>
      </div>

      {/* State-specific content */}
      {withSpark ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              AI flagged 23 clients at risk
            </p>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
              Top 3 by urgency
            </span>
          </div>

          {affectedSorted.map((client) => {
            const idx = getTemplateIndex(client.id);
            const { subject, body } = buildDraft(client.name, client.plan_name, idx);
            const score = client.urgency_score ?? 0;
            const scoreColor =
              score >= 80
                ? 'bg-red-100 text-red-700'
                : score >= 50
                ? 'bg-orange-100 text-orange-700'
                : 'bg-yellow-100 text-yellow-700';

            return (
              <button
                key={client.id}
                onClick={() => onClientClick(client)}
                className="text-left w-full bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{client.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreColor}`}>
                    {score}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-600 mb-1 truncate">{subject}</p>
                <p className="text-xs text-gray-400 line-clamp-2">{body.slice(0, 110)}…</p>
                <p className="text-xs text-blue-500 mt-2 group-hover:text-blue-700 transition-colors">
                  Click to view full draft →
                </p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-2">Your starting point</p>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-gray-300">1.</span>
              <span>Open spreadsheet. Filter by State = TX.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-gray-300">2.</span>
              <span>Filter by Carrier = Aetna. Find ~23 rows.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-gray-300">3.</span>
              <span>Manually sort by "last contact" to prioritize.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-gray-300">4.</span>
              <span>Draft outreach one by one. Hope you finish before AEP closes.</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-red-500 font-medium">
            3 clients will be missed before you finish.
          </p>
        </div>
      )}
    </div>
  );
}
