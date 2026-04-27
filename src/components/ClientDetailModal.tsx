import { useEffect } from 'react';
import { type Client } from '../data/clients';
import { buildDraft } from '../data/outreach';

interface Props {
  client: Client | null;
  templateIndex: number;
  onClose: () => void;
}

const ALTERNATIVE_PLANS = [
  { carrier: 'Humana', plan: 'Humana Honor PPO', premium: '$0/mo', tradeoff: 'Comparable network coverage; slightly higher out-of-pocket max ($4,000 vs. $3,400).' },
  { carrier: 'UnitedHealthcare', plan: 'AARP MedicareComplete Choice PPO', premium: '$0/mo', tradeoff: 'Lower OOP max ($3,000); narrower specialist panel — worth confirming PCP is in-network.' },
  { carrier: 'Wellcare', plan: 'Wellcare Giveback HMO', premium: '−$48/mo (Giveback)', tradeoff: 'HMO structure requires PCP referrals; strong Part D benefits; best value if client accepts narrower network.' },
];

function daysSince(dateStr: string): number {
  const ref = new Date('2026-10-15');
  const d = new Date(dateStr);
  return Math.floor((ref.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function tenureYears(enrollDate: string): number {
  const ref = new Date('2026-10-15');
  const d = new Date(enrollDate);
  return Math.floor((ref.getTime() - d.getTime()) / (1000 * 60 * 60 * 24 * 365));
}

function buildWhyFlagged(client: Client): string[] {
  const days = daysSince(client.last_contact_date);
  const tenure = tenureYears(client.enrollment_date);
  const reasons: string[] = [
    `Enrolled in an Aetna plan exiting the Texas market — plan will not renew after December 31, 2026.`,
    `Last contacted ${days} days ago (${client.last_contact_date}) — at high risk of self-shopping before hearing from you.`,
  ];
  if (client.age >= 80) {
    reasons.push(`Age ${client.age} — navigating a plan change alone is significantly harder at this age; likely needs hands-on help and could easily be misled by 1-800-MEDICARE.`);
  } else if (client.age >= 75) {
    reasons.push(`Age ${client.age} — elevated effort to re-shop independently; benefit literacy tends to decrease as age increases.`);
  } else {
    reasons.push(`Age ${client.age} — lower re-shop friction, but still at risk of switching to a plan with inferior benefits without broker guidance.`);
  }
  if (tenure >= 3) {
    reasons.push(`${tenure}-year client — long-tenure clients have above-average lifetime value and referral potential; losing this account is a compounding loss.`);
  } else {
    reasons.push(`${tenure}-year client — relatively new; proactive contact now builds trust and reduces future churn risk.`);
  }
  return reasons;
}

function buildCallTiming(client: Client): string {
  const hour = (client.age % 3);
  const times = ['weekday mornings, 10 AM–12 PM CT', 'weekday afternoons, 2–4 PM CT', 'Tuesday or Thursday mornings, 9–11 AM CT'];
  return times[hour];
}

export default function ClientDetailModal({ client, templateIndex, onClose }: Props) {
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
  const reasons = buildWhyFlagged(client);
  const callTiming = buildCallTiming(client);
  const tenure = tenureYears(client.enrollment_date);
  const score = client.urgency_score ?? 0;
  const scoreColor = score >= 80 ? 'bg-red-100 text-red-700 border-red-200' : score >= 50 ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200';

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-8 overflow-y-auto fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mb-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-gray-100">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                Client Detail
              </span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${scoreColor}`}>
                Urgency {score}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Age {client.age} · {client.county ? `${client.county} County, ` : ''}{client.state} · {tenure} yr client
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none ml-4 shrink-0 mt-1" aria-label="Close">×</button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Plan card */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Current Plan</p>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-gray-400 mb-0.5">Carrier</p><p className="font-semibold text-blue-700">{client.carrier}</p></div>
              <div><p className="text-xs text-gray-400 mb-0.5">Plan</p><p className="font-medium text-gray-800">{client.plan_name}</p></div>
              <div><p className="text-xs text-gray-400 mb-0.5">Enrolled</p><p className="font-medium text-gray-700">{client.enrollment_date}</p></div>
              <div><p className="text-xs text-gray-400 mb-0.5">Last Contact</p><p className="font-medium text-gray-700">{client.last_contact_date}</p></div>
            </div>
          </div>

          {/* Why flagged */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Why Flagged</p>
            <div className="space-y-2">
              {reasons.map((r, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-red-50 text-red-600 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-gray-700 leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended alternatives */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Recommended Alternatives</p>
            <div className="space-y-2">
              {ALTERNATIVE_PLANS.map((plan, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-3.5 flex gap-3 hover:border-blue-200 transition-colors">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-50 text-green-600 text-xs font-bold flex items-center justify-center">✓</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{plan.plan}</span>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{plan.carrier}</span>
                      <span className="text-xs font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">{plan.premium}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{plan.tradeoff}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outreach draft */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">AI-Drafted Outreach</p>
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-200 bg-white">
                <span className="text-xs text-gray-400">Subject: </span>
                <span className="text-sm font-medium text-gray-800">{subject}</span>
              </div>
              <div className="px-4 py-3 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{body}</div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-xs text-gray-400">Best to call: <span className="font-medium text-gray-500">{callTiming}</span></p>
            </div>
            <p className="text-xs text-gray-400 italic mt-1">Draft generated from template — personalize before sending.</p>
          </div>
        </div>

        {/* Action buttons (visual) */}
        <div className="px-6 pb-6">
          <div className="flex gap-2 flex-wrap">
            {['Mark as contacted', 'Schedule call', 'Open in CRM'].map(label => (
              <button
                key={label}
                className="text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                onClick={e => e.stopPropagation()}
              >
                {label}
              </button>
            ))}
            <button onClick={onClose} className="ml-auto text-xs font-semibold px-3 py-2 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
