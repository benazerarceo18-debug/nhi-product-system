# NHI Product System

Operational hub for Nippon Hasha Inc. — 4 restaurant brands, 21+ locations, 50 target SKUs.

## What This Is
A web application replacing the `COMPLETE_Product_System_ALL_APPENDICES.xlsx` (37-sheet workbook).
Kitchen managers, operations staff, and BDSP use this instead of Excel.

## Quick Start

### Option A — Local Development
```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Option B — Open the MVP (no install needed)
Open `NHI_Product_System_MVP.html` directly in any browser. Fully functional prototype.

## Project Structure
```
nhi-product-system/
├── CLAUDE.md          ← Read this first. Full context for Claude Code.
├── PROMPTS.md         ← Copy-paste prompts to build each feature with Claude Code.
├── src/
│   ├── data/
│   │   ├── seed.js    ← All SKUs, suppliers, allergens, KPI targets
│   │   └── schema.md  ← Database schema (Supabase/PostgreSQL)
│   ├── utils/
│   │   └── calculations.js  ← FC%, QC scoring, waste calc, formatting
│   ├── components/    ← Reusable UI components
│   ├── pages/         ← One file per section
│   └── styles/        ← Global styles
└── NHI_Product_System_MVP.html  ← Working HTML prototype
```

## Features (MVP → Production)
| Feature | MVP HTML | Code Target |
|---|---|---|
| Dashboard + Rollout Roadmap | ✅ | React page |
| Product Bible Form (6 sections) | ✅ | React + Supabase |
| Recipe Costing Calculator | ✅ | React + auto-calc |
| QC Audit Scorecard | ✅ | React + Supabase |
| Daily Waste Log | ✅ | React + Supabase |
| Allergen Matrix | ✅ | React, printable |
| KPI Tracker | ✅ | React + Supabase |
| Supplier Directory | ✅ | React |
| Daily Ops SOP Checklist | ✅ | React |
| Crisis Management SOP | ✅ | React |
| Glossary + FAQ | ✅ | React |
| Mobile/Tablet Optimized | Partial | Phase 2 |
| Supabase Backend | ❌ | Phase 2 |
| Multi-user / Auth | ❌ | Phase 2 |

## Using Claude Code
Open terminal in this folder and run `claude`. Claude will automatically read `CLAUDE.md` for context.
Copy prompts from `PROMPTS.md` for each feature you want to build.

## Brand Reference
- Navy: `#1a1f36`
- Red (alerts): `#c0392b`
- Gold (accent): `#d4a843`
- Background: `#f5f6fa`
