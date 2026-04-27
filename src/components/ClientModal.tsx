import { useEffect } from 'react';
import { type Client } from '../data/clients';
import { buildDraft } from '../data/outreach';
import { AFFECTED_CLIENT_IDS } from '../data/clients';

interface Props {
  client: Client | null;
  onClose: () => void;
}

function getTemplateIndex(id: string): number {
  const affected = Array.from(AFFECTED_CLIENT_IDS);
  return affected.indexOf(id);
}

export default function ClientModal({ client, onClose }: Props) {
  useEffect(() => {
    if (!client) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [client, onClose]);

  if (!client) return null;

  const idx = getTemplateIndex(client.id);
  const { subject, body } = buildDraft(client.name, client.plan_name, idx);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                AI-Drafted Outreach
              </span>
              <UrgencyBadge score={client.urgency_score ?? 0} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-500">
              Age {client.age} · {client.state} · {client.plan_name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none mt-1 ml-4"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Draft */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Subject</p>
            <p className="text-sm font-medium text-gray-800 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
              {subject}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Message</p>
            <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 whitespace-pre-wrap">
              {body}
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400 italic">
            Draft generated from template — broker should personalize before sending.
          </p>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function UrgencyBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? 'bg-red-100 text-red-700 border-red-200'
      : score >= 50
      ? 'bg-orange-100 text-orange-700 border-orange-200'
      : 'bg-yellow-100 text-yellow-700 border-yellow-200';

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded border ${color}`}>
      Urgency {score}
    </span>
  );
}
