import type { Client } from './clients';

export type ScenarioId = 'aetna-exits-tx' | 'uhc-eliquis' | 'humana-dental';

export interface Scenario {
  id: ScenarioId;
  label: string;
  shortLabel: string;
  bannerText: string;
  affectedCount: number;
  getAffectedIds: (clients: Client[]) => Set<string>;
  computeUrgency: (client: Client) => number;
}

// Shared urgency formula: days-since-contact weighted + age bonus
function daysSince(dateStr: string): number {
  const ref = new Date('2026-10-15');
  const d = new Date(dateStr);
  return Math.floor((ref.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function baseUrgency(client: Client, seed: number): number {
  const days = daysSince(client.last_contact_date);
  const ageBonus = Math.max(0, client.age - 75) * 2;
  const tenureBonus = Math.max(0, (new Date('2026-10-15').getFullYear() - new Date(client.enrollment_date).getFullYear()) * 3);
  return Math.min(100, Math.round(days * 0.4 + ageBonus + tenureBonus + (seed % 8)));
}

// Scenario 1: Aetna exits Texas (the default)
// 23 hard-coded TX-Aetna clients defined in clients.ts
const AETNA_TX_IDS = new Set([
  'c001','c002','c003','c004','c005','c006','c007','c008','c009','c010',
  'c011','c012','c013','c014','c015','c016','c017','c018','c019','c020',
  'c021','c022','c023',
]);

// Scenario 2: UHC drops Eliquis — 31 selected UHC clients
const UHC_ELIQUIS_IDS = new Set([
  // CA UHC (8)
  'a001','a006','a011','a016','a021','a026','a031','a036',
  // FL UHC (8)
  'f002','f007','f012','f017','f022','f027','f032','f037',
  // NY UHC (6)
  'n001','n006','n011','n016','n021','n026',
  // AZ UHC (5)
  'z001','z006','z011','z016','z021',
  // TX UHC (4)
  'c025','c029','c033','c037',
]);

// Scenario 3: Humana cuts dental benefit in TX + FL (~17 clients)
const HUMANA_DENTAL_IDS = new Set([
  // TX Humana (5)
  'c024','c028','c032','c036','c040',
  // FL Humana (12)
  'f001','f006','f011','f016','f021','f026','f031','f036','f041','f046','f051','f056',
]);

export const SCENARIOS: Scenario[] = [
  {
    id: 'aetna-exits-tx',
    label: 'Aetna exits Texas',
    shortLabel: 'Aetna exits TX',
    bannerText: 'AI Assistant identified {n} clients affected by Aetna\'s Texas market exit and ranked them by churn risk.',
    affectedCount: 23,
    getAffectedIds: () => AETNA_TX_IDS,
    computeUrgency: (c) => c.urgency_score ?? baseUrgency(c, 0),
  },
  {
    id: 'uhc-eliquis',
    label: 'UHC drops Eliquis from formulary',
    shortLabel: 'UHC Eliquis drop',
    bannerText: 'AI Assistant identified {n} UHC clients at risk — their formulary no longer covers Eliquis starting Jan 1, 2027.',
    affectedCount: 31,
    getAffectedIds: () => UHC_ELIQUIS_IDS,
    computeUrgency: (c) => baseUrgency(c, 5),
  },
  {
    id: 'humana-dental',
    label: 'Humana cuts dental benefit (TX/FL)',
    shortLabel: 'Humana dental cut',
    bannerText: 'AI Assistant identified {n} Humana clients in TX and FL whose dental benefits will be reduced in 2027.',
    affectedCount: 17,
    getAffectedIds: () => HUMANA_DENTAL_IDS,
    computeUrgency: (c) => baseUrgency(c, 2),
  },
];

export function getScenario(id: ScenarioId): Scenario {
  return SCENARIOS.find(s => s.id === id)!;
}

export function getScenarioAffectedClients(id: ScenarioId, clients: Client[]): Client[] {
  const scenario = getScenario(id);
  const affectedIds = scenario.getAffectedIds(clients);
  return clients
    .filter(c => affectedIds.has(c.id))
    .map(c => ({ ...c, urgency_score: scenario.computeUrgency(c) }))
    .sort((a, b) => (b.urgency_score ?? 0) - (a.urgency_score ?? 0));
}
