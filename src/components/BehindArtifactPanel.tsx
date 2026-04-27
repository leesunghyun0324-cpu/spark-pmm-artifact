export default function BehindArtifactPanel() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">

        {/* Section header */}
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Behind the Artifact
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            How I'd position and launch this product
          </h2>
        </div>

        {/* Positioning House */}
        <div className="mb-14">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Positioning House
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                label: 'Category',
                value: 'AI-powered client retention for Medicare brokers',
              },
              {
                label: 'Target Buyer',
                value: 'Independent Medicare brokers managing 50–500 clients who face growing renewal complexity and limited staff to monitor plan changes manually',
              },
              {
                label: 'Alternatives Considered',
                value: 'Spreadsheets + manual CMS plan-finder lookups; generic CRM email blasts; doing nothing and hoping clients stay',
              },
              {
                label: 'Key Differentiators',
                value: 'Real-time monitoring across CMS, carrier, and Sunfire data feeds; client-level urgency scoring; AI-drafted outreach ready in seconds; purpose-built for the 54-day AEP window',
              },
              {
                label: 'Value Proposition',
                value: 'Spark AI Assistant turns every carrier exit, plan change, or CMS rule shift into a proactive broker touchpoint — before clients start shopping elsewhere',
                wide: true,
              },
            ].map(item => (
              <div
                key={item.label}
                className={`bg-white rounded-xl border border-gray-200 p-5 ${(item as any).wide ? 'sm:col-span-2' : ''}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  {item.label}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Landscape */}
        <div className="mb-14">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Competitive Landscape
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider min-w-[140px]">Competitor</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Category</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Strength</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Gap vs. Spark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      name: 'Sunfire Matrix',
                      category: 'Plan comparison & enrollment',
                      strength: 'Deep plan data integration; widely adopted by brokers',
                      gap: 'No proactive monitoring or AI outreach — reactive tool, not retention tool',
                    },
                    {
                      name: 'AgencyBloc',
                      category: 'Insurance CRM',
                      strength: 'Strong renewal workflow automation; large broker user base',
                      gap: 'Generic CRM model — no carrier exit detection or urgency scoring',
                    },
                    {
                      name: 'Integrity / MedicareCENTER',
                      category: 'All-in-one broker platform',
                      strength: 'Full-stack platform: quoting, CRM, commissions',
                      gap: 'Retention AI is a feature, not a focus — prioritizes acquisition over churn defense',
                    },
                    {
                      name: 'NiprA / Surancebay',
                      category: 'License & compliance',
                      strength: 'Regulatory compliance workflow automation',
                      gap: 'No client-facing retention capability at all',
                    },
                    {
                      name: 'Spreadsheet + CMS plan-finder',
                      category: 'Status quo',
                      strength: 'Zero cost; familiar to all brokers',
                      gap: 'Manual, slow, not scalable; zero intelligence layer',
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{row.name}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{row.category}</td>
                      <td className="px-4 py-3 text-gray-600 leading-relaxed">{row.strength}</td>
                      <td className="px-4 py-3 text-blue-700 leading-relaxed">{row.gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 bg-blue-50">
              <p className="text-xs text-blue-700 font-medium">
                Spark's moat: the only product built around proactive, carrier-event-triggered retention — not just plan shopping or generic CRM.
              </p>
            </div>
          </div>
        </div>

        {/* Sales One-Pager */}
        <div className="mb-14">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            Sales One-Pager (Draft)
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 px-6 py-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded bg-white/20 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </span>
                <span className="text-white font-semibold">Spark AI Assistant</span>
              </div>
              <p className="text-blue-100 text-sm font-medium">
                Your clients are about to get a call from 1-800-MEDICARE. Reach them first.
              </p>
            </div>
            {/* Body */}
            <div className="px-6 py-5 grid sm:grid-cols-3 gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">The Problem</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Carrier exits, formulary changes, and CMS rule shifts affect hundreds of clients every AEP — but brokers learn about them the same way clients do: too late. Manual triage across a 200+ client book takes 6+ hours. The window to act is 54 days.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">What Spark Does</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Spark monitors CMS, carrier, and Sunfire data 24/7 across your entire book. When a change affects a client, it surfaces them instantly with an urgency score and a ready-to-send, AI-drafted outreach message — so you make contact in minutes, not days.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">The Outcome</p>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {[
                    '23 at-risk clients flagged in under 4 minutes',
                    'Outreach drafted and ready before competitors call',
                    'Zero clients lost to self-shopping or 1-800-MEDICARE',
                    'Every AEP becomes a proactive retention event, not a reactive scramble',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Quote */}
            <div className="mx-6 mb-5 bg-gray-50 rounded-lg border border-gray-200 px-5 py-4">
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "We had 31 clients on a UHC plan that dropped Eliquis. Without Spark, I wouldn't have known until clients started calling me. Instead, I had personalized outreach drafted and sent to all 31 within the same morning."
              </p>
              <p className="text-xs text-gray-400 mt-2">— Independent broker, 280-client book (illustrative)</p>
            </div>
            <div className="px-6 pb-5 flex flex-wrap gap-3">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">Works with your existing CMS tools</span>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">No rip-and-replace required</span>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">Setup in under 30 minutes</span>
            </div>
          </div>
        </div>

        {/* 90-Day Launch Plan */}
        <div className="mb-14">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            90-Day Launch Plan
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                phase: 'Days 1–30',
                title: 'Foundation',
                color: 'border-t-blue-300',
                content:
                  'Define the "churn defense" use-case narrative and ideal customer profile. Audit existing broker feedback and sales calls for authentic language. Build three value-prop pillars (time, clients saved, confidence). Create internal alignment deck and messaging brief. Identify 5–10 early-adopter brokers as case study candidates.',
                kpis: [
                  'Messaging brief approved by Sales + CS',
                  '3 value-prop pillars validated in 5+ broker interviews',
                  'ICP defined: firmographic + behavioral criteria',
                ],
              },
              {
                phase: 'Days 31–60',
                title: 'Activation',
                color: 'border-t-blue-500',
                content:
                  'Launch targeted outreach to broker segments most exposed to 2026 carrier exits. Publish "AEP Readiness Kit" content series (guide + email templates + checklists). Run discovery interviews to stress-test messaging. Coordinate with Sales on demo script and objection handling. Build first broker case study around a real retention event.',
                kpis: [
                  '1 published case study with before/after retention data',
                  'AEP Readiness Kit: 3+ pieces of content live',
                  'Demo-to-trial conversion rate established as baseline',
                ],
              },
              {
                phase: 'Days 61–90',
                title: 'Expansion',
                color: 'border-t-blue-700',
                content:
                  'Run A/B tests on positioning angles: time-savings vs. clients-not-lost vs. peace of mind. Identify PR hook around AEP data — carrier exits + CMS Final Rule impact. Pitch trade press (BenefitsPRO, NAHU). Begin building category narrative around "AI-powered retention" to differentiate Spark from generic CRM competitors. Set KPIs for next AEP cycle.',
                kpis: [
                  '1 trade press placement or byline (BenefitsPRO / NAHU)',
                  'A/B test winner identified; winning angle adopted in paid + organic',
                  'Category narrative doc finalized for next AEP campaign',
                ],
              },
            ].map(item => (
              <div
                key={item.phase}
                className={`bg-white rounded-xl border border-gray-200 border-t-4 ${item.color} p-5 flex flex-col`}
              >
                <p className="text-xs font-semibold text-gray-400 mb-1">{item.phase}</p>
                <p className="text-sm font-semibold text-gray-900 mb-3">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.content}</p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">KPIs</p>
                  <ul className="space-y-1.5">
                    {item.kpis.map((kpi, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="text-blue-400 font-bold shrink-0 mt-0.5">→</span>
                        <span>{kpi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real vs Simulated */}
        <div className="mb-14">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            What's Real vs. Simulated
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {[
              { real: true, text: 'Spark AI Assistant is a real product that monitors CMS, carrier, and Sunfire data feeds for every client in a broker\'s book' },
              { real: true, text: 'Carrier exits during AEP are a documented and growing phenomenon — this scenario is realistic, not hypothetical' },
              { real: true, text: 'The 54-day AEP window (Oct 15–Dec 7) and the pressure it creates for brokers are real constraints' },
              { real: false, text: 'The 247 clients in this demo are entirely fictional — generated for illustrative purposes only' },
              { real: false, text: 'Urgency scores are computed from a simplified demo formula (days since contact + age factor), not from Spark\'s live carrier data' },
              { real: false, text: 'AI-drafted outreach messages are template-based in this demo — Spark\'s actual AI drafting is more sophisticated' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                <span className={`mt-0.5 shrink-0 text-sm font-bold ${item.real ? 'text-green-500' : 'text-gray-300'}`}>
                  {item.real ? '✓' : '○'}
                </span>
                <p className={`text-sm leading-relaxed ${item.real ? 'text-gray-700' : 'text-gray-400'}`}>
                  <span className={`font-medium mr-1.5 ${item.real ? 'text-green-700' : 'text-gray-500'}`}>
                    {item.real ? 'Real:' : 'Simulated:'}
                  </span>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-gray-900">Sunghyun "Sam" Lee</p>
            <p className="text-sm text-gray-500">Applying for Senior PMM · Spark Advisors</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs text-gray-400 font-medium">Built as a job-application artifact · April 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
