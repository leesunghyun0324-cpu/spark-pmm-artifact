import { type Client, AFFECTED_CLIENT_IDS } from '../data/clients';

interface Props {
  clients: Client[];
  withSpark: boolean;
  onCardClick: (client: Client) => void;
}

export default function ClientCard({ clients, withSpark, onCardClick }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {clients.map(client => {
        const isAffected = withSpark && AFFECTED_CLIENT_IDS.has(client.id);
        const isNonAffected = withSpark && !AFFECTED_CLIENT_IDS.has(client.id);

        return (
          <div
            key={client.id}
            onClick={() => isAffected ? onCardClick(client) : undefined}
            className={[
              'rounded-lg border p-3 transition-all',
              isAffected
                ? 'bg-blue-50 border-blue-300 border-l-4 border-l-blue-600 cursor-pointer active:bg-blue-100'
                : isNonAffected
                ? 'bg-white border-gray-150 opacity-50'
                : 'bg-white border-gray-200',
            ].join(' ')}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {isAffected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  )}
                  <span className="font-semibold text-sm text-gray-900 truncate">{client.name}</span>
                  <span className="text-xs text-gray-400">Age {client.age}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{client.plan_name}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                  isAffected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {client.state}
                </span>
                {isAffected && client.urgency_score !== undefined && (
                  <UrgencyBadge score={client.urgency_score} />
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
              <span>{client.carrier}</span>
              <span>·</span>
              <span>Last: {client.last_contact_date}</span>
            </div>

            {isAffected && (
              <p className="text-xs text-blue-600 mt-1.5 font-medium">
                Tap to view AI draft →
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function UrgencyBadge({ score }: { score: number }) {
  const style =
    score >= 80
      ? 'bg-red-100 text-red-700'
      : score >= 50
      ? 'bg-orange-100 text-orange-700'
      : 'bg-yellow-100 text-yellow-700';

  return (
    <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${style}`}>
      {score}
    </span>
  );
}
