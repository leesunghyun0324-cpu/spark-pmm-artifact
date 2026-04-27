import { type Client } from '../data/clients';

interface Props {
  clients: Client[];
  withSpark: boolean;
  affectedIds: Set<string>;
  onRowClick: (client: Client) => void;
}

export default function ClientTable({ clients, withSpark, affectedIds, onRowClick }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white scrollbar-thin">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Name</th>
            <th className="text-left px-3 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Age</th>
            <th className="text-left px-3 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">State</th>
            <th className="text-left px-3 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Carrier</th>
            <th className="text-left px-3 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden lg:table-cell">Plan</th>
            <th className="text-left px-3 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Last Contact</th>
            {withSpark && (
              <th className="text-left px-3 py-3 font-semibold text-blue-600 text-xs uppercase tracking-wider">Urgency</th>
            )}
          </tr>
        </thead>
        <tbody>
          {clients.map((client, i) => {
            const isAffected = withSpark && affectedIds.has(client.id);
            const isNonAffected = withSpark && !affectedIds.has(client.id);

            return (
              <tr
                key={client.id}
                onClick={() => isAffected ? onRowClick(client) : undefined}
                className={[
                  'border-b border-gray-100 transition-colors',
                  isAffected
                    ? 'bg-blue-50 border-l-4 border-l-blue-600 cursor-pointer hover:bg-blue-100'
                    : isNonAffected
                    ? 'opacity-50 even:bg-gray-50/50'
                    : i % 2 === 1
                    ? 'bg-gray-50'
                    : 'bg-white',
                ].join(' ')}
              >
                <td className="px-4 py-2.5 font-medium text-gray-900 whitespace-nowrap">
                  {isAffected && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mr-2 mb-0.5" />
                  )}
                  {client.name}
                </td>
                <td className="px-3 py-2.5 text-gray-600">{client.age}</td>
                <td className="px-3 py-2.5">
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                    client.state === 'TX' && isAffected
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {client.state}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">
                  {isAffected ? (
                    <span className="font-medium text-blue-700">{client.carrier}</span>
                  ) : (
                    client.carrier
                  )}
                </td>
                <td className="px-3 py-2.5 text-gray-500 hidden lg:table-cell max-w-[200px] truncate">
                  {client.plan_name}
                </td>
                <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">
                  {client.last_contact_date}
                </td>
                {withSpark && (
                  <td className="px-3 py-2.5">
                    {isAffected && client.urgency_score !== undefined ? (
                      <UrgencyBadge score={client.urgency_score} />
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
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
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style}`}>
      {score}
    </span>
  );
}
