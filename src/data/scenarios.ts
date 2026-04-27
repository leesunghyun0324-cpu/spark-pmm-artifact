import type { Client } from './clients';

export type ScenarioId = 'aetna-exits-tx';

export interface Scenario {
  id: ScenarioId;
  label: string;
  bannerText: string;
  affectedCount: number;
  getAffectedIds: () => Set<string>;
  computeUrgency: (client: Client) => number;
}

function daysSince(dateStr: string): number {
  const ref = new Date('2026-10-15');
  const d = new Date(dateStr);
  return Math.floor((ref.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

const AETNA_TX_IDS = new Set([
  'c001','c002','c003','c004','c005','c006','c007','c008','c009','c010',
  'c011','c012','c013','c014','c015','c016','c017','c018','c019','c020',
  'c021','c022','c023',
]);

export const AETNA_TX_SCENARIO: Scenario = {
  id: 'aetna-exits-tx',
  label: 'Aetna exits Texas',
  bannerText: 'AI Assistant identified 23 clients affected by Aetna\'s Texas market exit and ranked them by churn risk.',
  affectedCount: 23,
  getAffectedIds: () => AETNA_TX_IDS,
  computeUrgency: (c) => {
    const days = daysSince(c.last_contact_date);
    const ageBonus = Math.max(0, c.age - 75) * 2;
    const tenureBonus = Math.max(0, (new Date('2026-10-15').getFullYear() - new Date(c.enrollment_date).getFullYear()) * 3);
    return Math.min(100, Math.round(days * 0.4 + ageBonus + tenureBonus));
  },
};

export function getScenarioAffectedClients(clients: Client[]): Client[] {
  const affectedIds = AETNA_TX_SCENARIO.getAffectedIds();
  return clients
    .filter(c => affectedIds.has(c.id))
    .map(c => ({ ...c, urgency_score: c.urgency_score ?? AETNA_TX_SCENARIO.computeUrgency(c) }))
    .sort((a, b) => (b.urgency_score ?? 0) - (a.urgency_score ?? 0));
}
