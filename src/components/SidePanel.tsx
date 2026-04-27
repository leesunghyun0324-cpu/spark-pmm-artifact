import { type Client } from '../data/clients';
import { type ScenarioId } from '../data/scenarios';
import { buildDraft } from '../data/outreach';

interface Props {
  withSpark: boolean;
  affectedClients: Client[];
  scenarioId: ScenarioId;
  onDetailClick: (client: Client) => void;
  onMessageClick: (client: Client) => void;
}

export default function SidePanel({ withSpark, affectedClients, onDetailClick, onMessageClick }: Props) {
  const topThree = affectedClients.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 lg:w-80 xl:w-96 shrink-0">
      {/* Counter card */}
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
              AI flagged {affectedClients.length} clients at risk
            </p>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
              Top 3 by urgency
            </span>
          </div>

          {topThree.map((client, idx) => {
            const { subject, body } = buildDraft(client.name, client.plan_name, idx);
            const score = client.urgency_score ?? 0;
            const scoreColor =
              score >= 80
                ? 'bg-red-100 text-red-700'
                : score >= 50
                ? 'bg-orange-100 text-orange-700'
                : 'bg-yellow-100 text-yellow-700';

            return (
              <div key={client.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => onDetailClick(client)}
                    className="text-sm font-semibold text-gray-900 hover:text-blue-700 transition-colors text-left"
                  >
                    {client.name}
                  </button>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${scoreColor}`}>
                    {score}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-600 mb-1 truncate">{subject}</p>
                <p className="text-xs text-gray-400 line-clamp-2">{body.slice(0, 110)}…</p>
                <button
                  onClick={() => onMessageClick(client)}
                  className="text-xs text-blue-500 mt-2 hover:text-blue-700 transition-colors block"
                >
                  View full draft →
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-700 mb-2">Your starting point</p>
          <div className="space-y-2 text-sm text-gray-500">
            {[
              'Open spreadsheet. Filter by State = TX.',
              'Filter by Carrier = Aetna. Find ~23 rows.',
              'Manually sort by "last contact" to prioritize.',
              'Draft outreach one by one. Hope you finish before AEP closes.',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-gray-300 shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-red-500 font-medium">
            3 clients will be missed before you finish.
          </p>
        </div>
      )}
    </div>
  );
}
