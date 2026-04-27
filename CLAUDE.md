# Spark PMM Artifact — CLAUDE.md

## Project Purpose
Single-page interactive demo of Spark Advisors' AI Assistant (AI Churn Defense) product. Job-application artifact for Senior PMM role. The scenario: Aetna exits Texas during AEP 2026; broker uses Spark to triage 23 affected clients in 4 minutes vs. 6+ hours manually.

## Stack
- **Vite** + **React** + **TypeScript** (react-ts template)
- **Tailwind CSS v3** for all styling
- **Static data** in `src/data/` (no backend, no fetch, no API)
- Deploy target: **Vercel**

## Conventions
- One component per file in `src/components/`
- Static data exported as TypeScript constants from `src/data/`
- No new npm dependencies without strong justification
- Tailwind utility classes only — no custom CSS files beyond `src/index.css`
- No router — single HTML page, three stacked sections
- Mobile-first: spreadsheet collapses to cards at `<768px`

## Component Map
```
src/
  App.tsx                    # Root layout, refs for smooth scroll
  components/
    SetupPanel.tsx           # Panel 1: scenario framing
    SimulatorPanel.tsx       # Panel 2: toggle + table + side panel
    ClientTable.tsx          # Desktop table (hidden on mobile)
    ClientCard.tsx           # Mobile card (hidden on desktop)
    SidePanel.tsx            # Counters + outreach previews
    ClientModal.tsx          # Modal: full drafted message
    BehindArtifactPanel.tsx  # Panel 3: positioning + 90-day plan
  data/
    clients.ts               # 247 fictional clients
    outreach.ts              # 3 message templates
```

## Out of Scope
- No backend, database, or API calls
- No real LLM inference (outreach is template-based)
- No login, auth, or analytics
- No additional scenarios beyond Aetna-exits-Texas
- No share/export/download buttons
- No CMS, admin panel, or settings UI
- Do not invent Spark product features beyond what's in the scenario

## Key Design Decisions
- Accent color: `#2563eb` (Tailwind `blue-600`)
- Affected clients: exactly 23 TX-Aetna clients
- Counter values are hardcoded: "6h 12m / 3 missed" ↔ "4 minutes / 0 missed"
- Urgency scores: computed from days-since-contact + age bonus (demo formula only)
