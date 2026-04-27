export interface OutreachTemplate {
  id: string;
  subject: string;
  body: string;
}

export const TEMPLATES: OutreachTemplate[] = [
  {
    id: 'T1',
    subject: 'Important: Your Medicare Plan Is Changing — Let\'s Talk',
    body: 'Hi {firstName}, I\'m reaching out because {planName} will no longer be available in your area after December 31, 2026. Aetna has announced it is exiting the Texas market, which means we need to find you a comparable plan before the Annual Enrollment Period closes on December 7. {contextSentence} I\'d love to schedule a quick 15-minute call this week to review your options — there are several strong alternatives in your area. Reply here or call me directly at [BROKER_PHONE].',
  },
  {
    id: 'T2',
    subject: 'Action Needed: Your Aetna Plan Won\'t Renew in 2027',
    body: 'Hi {firstName}, I want to give you a heads-up about a significant change affecting your coverage. Aetna has confirmed it will exit the Texas Medicare market at year-end, which means {planName} will not renew automatically. {contextSentence} The good news: we have until December 7 to find you a plan with comparable benefits. I\'ve already identified a few options I think you\'ll like. Can we connect this week?',
  },
  {
    id: 'T3',
    subject: 'Your Medicare Coverage Needs Attention Before Dec 7',
    body: 'Hi {firstName}, I\'m following up because your current plan — {planName} — will be discontinued in Texas after this year. {contextSentence} During AEP (Oct 15–Dec 7), we can switch you to a plan with equal or better benefits at no extra cost. I\'d love to walk you through your options at a time that works for you. Please reply or call me at your convenience — I want to make sure you\'re covered going into 2027.',
  },
];

export const CONTEXT_SENTENCES = [
  'Given your enrollment history, I want to make sure this transition is as smooth as possible.',
  'I know switching plans can feel overwhelming, but I\'ll handle all the paperwork.',
  'Based on your current benefits, I\'ve already shortlisted two plans that I think are a great match.',
];

export function buildDraft(
  clientName: string,
  planName: string,
  templateIndex: number,
): { subject: string; body: string } {
  const template = TEMPLATES[templateIndex % TEMPLATES.length];
  const contextSentence = CONTEXT_SENTENCES[templateIndex % CONTEXT_SENTENCES.length];
  const firstName = clientName.split(' ')[0];

  return {
    subject: template.subject,
    body: template.body
      .replace('{firstName}', firstName)
      .replace('{planName}', planName)
      .replace('{contextSentence}', contextSentence),
  };
}
