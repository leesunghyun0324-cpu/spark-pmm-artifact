import { useEffect } from 'react';
import { type Client } from '../data/clients';
import { buildDraft } from '../data/outreach';

interface Props {
  client: Client | null;
  templateIndex: number;
  onClose: () => void;
}

const TALKING_POINTS: Record<number, [string, string, string]> = {
  0: [
    'Reassure first: "You\'re not losing coverage — just changing carriers. I\'ve already found you three strong alternatives."',
    'Anchor on continuity: "I checked your network. Your primary care doctor and cardiologist are both in-network with my top recommendation."',
    'Close with action: "I can do the paperwork with you on this call — it takes about 12 minutes. Want to get it done right now?"',
  ],
  1: [
    'Lead with the deadline: "We have until December 7. That\'s 53 days — plenty of time if we act now, not enough if we wait."',
    'Normalize the change: "I\'m calling every client affected by this. You\'re in good company — this isn\'t a reflection of your plan history."',
    'Present a clear winner: "Of the options available in your county, one plan stands out. Let me walk you through why."',
  ],
  2: [
    'Acknowledge the disruption: "I know it\'s frustrating when a plan you like stops being available. This was Aetna\'s business decision, not yours."',
    'Emphasize the handholding: "I\'ll handle the enrollment forms, the submission, and the confirmation. Your job is just to say yes."',
    'Mention the stakes gently: "If we miss December 7, you\'d be auto-enrolled by Medicare in a default plan — and those are rarely the best fit."',
  ],
};

function buildCallTiming(client: Client): string {
  const times = ['weekday mornings, 10 AM–12 PM CT', 'weekday afternoons, 2–4 PM CT', 'Tuesday or Thursday mornings, 9–11 AM CT'];
  return times[client.age % 3];
}

export default function MessageModal({ client, templateIndex, onClose }: Props) {
  useEffect(() => {
    if (!client) return;
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [client, onClose]);

  if (!client) return null;

  const { subject, body } = buildDraft(client.name, client.plan_name, templateIndex);
  const callTiming = buildCallTiming(client);
  const talkingPoints = TALKING_POINTS[templateIndex % 3];
  const score = client.urgency_score ?? 0;
  const scoreColor = score >= 80 ? 'bg-red-100 text-red-700' : score >= 50 ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700';

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-8 overflow-y-auto fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mb-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">AI-Drafted Outreach</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${scoreColor}`}>Urgency {score}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-500">Age {client.age} · {client.state} · {client.plan_name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none ml-4 mt-1" aria-label="Close">×</button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Message */}
          <div>
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-200 bg-white">
                <span className="text-xs text-gray-400">Subject: </span>
                <span className="text-sm font-medium text-gray-800">{subject}</span>
              </div>
              <div className="px-4 py-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{body}</div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-xs text-gray-400">Best to call: <span className="font-medium text-gray-600">{callTiming}</span></p>
            </div>
          </div>

          {/* Talking points */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Three Talking Points for the Call</p>
            <div className="space-y-2.5">
              {talkingPoints.map((point, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400 italic">Draft generated from template — broker should personalize before sending.</p>
        </div>

        <div className="px-6 pb-5">
          <button onClick={onClose} className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
