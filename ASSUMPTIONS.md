# Assumptions & Non-Obvious Decisions

## Project Setup
- **Project directory name**: `spark-pmm-artifact` (descriptive, URL-safe)
- **GitHub repo**: `spark-pmm-artifact` (public, under leesunghyun0324-cpu)
- **Branch**: `master` (Vite default; Vercel handles both master and main)

## Design
- **Accent color**: `#2563eb` (Tailwind blue-600). Chosen to match the "confident, data-product" aesthetic described in the brief and is visually close to Spark's brand.
- **Font**: Inter via Google Fonts CDN. Industry-standard for data-product UIs (Linear, Notion).

## Data
- **Affected clients**: exactly 23 TX clients with carrier="Aetna". The 23 are hard-coded in the data as the first 23 TX-Aetna entries; the remaining TX clients use other carriers.
- **Urgency score formula**: `min(100, round(daysSinceContact * 0.4 + max(0, age - 75) * 2 + smallRandom))`. Chosen because recency of contact and age are the two most clinically meaningful retention risk factors. The formula is clearly labeled as a demo heuristic in the UI.
- **Client distribution**: TX 40, FL 60, CA 55, NY 47, AZ 45 = 247 total. TX is overrepresented per brief; FL is the largest non-TX state for Medicare volume realism.
- **Names**: Curated set of ~100 realistic names spanning Anglo, Hispanic, Asian, and African American demographics to reflect a realistic Medicare broker book.
- **Outreach templates**: 3 variants assigned by `(index % 3)` to affected clients, round-robin. Context sentences also assigned round-robin from 3 options.

## UX
- **Toggle**: Pill-style toggle is the visually loudest control; labels fully visible at all times (not hidden behind an icon).
- **Modal trigger**: Clicking any affected-client row in "With Spark" mode opens the modal. In "Without Spark" mode, rows are not clickable (no modal affordance).
- **Side panel position**: Right of table on desktop (lg:flex-row), below table on mobile.
- **Counters**: Text size `text-5xl` as specified — largest text on the simulator panel.
