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
              },
              {
                phase: 'Days 31–60',
                title: 'Activation',
                color: 'border-t-blue-500',
                content:
                  'Launch targeted outreach to broker segments most exposed to 2026 carrier exits. Publish "AEP Readiness Kit" content series (guide + email templates + checklists). Run discovery interviews to stress-test messaging. Coordinate with Sales on demo script and objection handling. Build first broker case study around a real retention event.',
              },
              {
                phase: 'Days 61–90',
                title: 'Expansion',
                color: 'border-t-blue-700',
                content:
                  'Run A/B tests on positioning angles: time-savings vs. clients-not-lost vs. peace of mind. Identify PR hook around AEP data — carrier exits + CMS Final Rule impact. Pitch trade press (BenefitsPRO, NAHU). Begin building category narrative around "AI-powered retention" to differentiate Spark from generic CRM competitors. Set KPIs for next AEP cycle.',
              },
            ].map(item => (
              <div
                key={item.phase}
                className={`bg-white rounded-xl border border-gray-200 border-t-4 ${item.color} p-5`}
              >
                <p className="text-xs font-semibold text-gray-400 mb-1">{item.phase}</p>
                <p className="text-sm font-semibold text-gray-900 mb-3">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.content}</p>
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
