# NHI Product System — Claude Code Prompt Guide
## How to Build This App Feature by Feature

These are copy-paste prompts for Claude Code (`claude` in terminal).
Run from inside the `nhi-product-system/` folder.

---

## SETUP — Run First

```
Install dependencies and set up the project. Use Vite + React + Tailwind CSS.
Read CLAUDE.md first for full project context.
Create vite.config.js, tailwind.config.js, postcss.config.js, and src/main.jsx.
Set up React Router with these routes: /, /skus, /costing, /qc, /waste, /allergen, /kpi, /suppliers.
Use the brand colors from CLAUDE.md (navy #1a1f36, red #c0392b, gold #d4a843).
```

---

## FEATURE 1 — Layout + Navigation

```
Build the app shell in src/App.jsx.
Create a sidebar navigation component (src/components/Sidebar.jsx) with:
- NHI logo area showing brand name and "Product System v1.0"
- Nav sections: Overview (Dashboard, KPI Tracker), Core Templates (Product Bibles, Recipe Costing, QC Scorecard, Waste Log), Operations (Daily Ops SOP, Crisis SOP), Reference (Allergen Matrix, Suppliers, Glossary, FAQ)
- Active state highlighting in gold (#d4a843)
- Navy (#1a1f36) background
Make a TopBar component (src/components/TopBar.jsx) showing the current page title and "Q1 2026 | System Active" badges.
```

---

## FEATURE 2 — Dashboard

```
Build the Dashboard page (src/pages/Dashboard.jsx).
Show 4 stat cards: Total SKUs Target (50), Appendix Sheets (37), Current Rollout Phase (Phase 2), FC% Target Reduction (-2%).
Show the 90-day rollout roadmap as 4 phase cards (Phase 1 done in green, Phase 2 active in gold, Phases 3-4 pending in gray).
Show the system index table with all 37 sheets (data in CLAUDE.md).
Show brand SKU progress bars: Kazu Café 13 (done), Mendokoro 15 (in progress ~60%), Yushoken 12 (~20%), Kazunori 10 (~20%).
Use data from src/data/seed.js.
```

---

## FEATURE 3 — Recipe Costing Calculator

```
Build the Recipe Costing Calculator (src/pages/RecipeCosting.jsx).
Dynamic ingredient table: user adds rows with fields for ingredient name, supplier, unit size, unit cost (₱), qty per serving. Auto-calculates cost per serving as unit_cost × qty.
Below the table: packaging cost and labor cost inputs.
Cost summary panel showing: raw ingredient cost, packaging, labor, total recipe cost, food cost %, gross margin.
Import calcFoodCostPct, getFCStatus, formatPeso from src/utils/calculations.js.
Flag food cost % in green if ≤30%, orange if 30-35%, red if >35%.
Target BC%: 25-30% note displayed.
Add print button.
```

---

## FEATURE 4 — QC Audit Scorecard

```
Build the QC Audit Scorecard (src/pages/QCAudit.jsx).
Form fields: brand selector, location, SKU code (with autocomplete from INITIAL_SKUS), auditor name, date.
5 scoring criteria with sliders (0-100): Appearance (25% weight), Portion Size (20%), Temperature (20%), Taste/Flavor (20%), Assembly Sequence (15%).
Import calcQCScore and getQCStatus from src/utils/calculations.js.
Show live weighted score updating as sliders move.
Color the total score: green ≥90 (Distinction), blue 80-89 (Pass), red <80 (Fail).
Show verdict banner with corrective action guidance for fails.
Corrective actions textarea.
Save button (local state for now, Supabase in Phase 2).
```

---

## FEATURE 5 — Allergen Matrix

```
Build the Allergen Matrix (src/pages/AllergenMatrix.jsx).
Full-width table showing all 17 current SKUs from INITIAL_SKUS in src/data/seed.js.
Columns: SKU Code, Product Name, then one column per allergen (8 allergens from ALLERGEN_FIELDS).
Brand section headers separating Kazu Café, Kazunori, Mendokoro/Yushoken rows.
✓ checkmark in red for confirmed allergens, yellow warning text for critical ones (Hazelnut, Almond).
Highlight rows in light red background for items with tree nut allergens.
Search/filter bar to find items by name or SKU.
Critical protocols section below the table for Hazelnut and Almond Hojicha.
What to say to customers section with correct/incorrect scripts.
Print button for posting at stations.
```

---

## FEATURE 6 — Daily Waste Log

```
Build the Daily Waste Log (src/pages/WasteLog.jsx).
Header fields: date (default today), brand selector, location, KM name.
Dynamic entries table: add rows for each wasted item with fields for item/SKU, qty wasted, unit (pcs/g/ml/kg), est cost (₱), reason (Over-prep / Spoilage / Remake / Breakage / Other).
Auto-calculate total waste cost at bottom.
Import calcWasteTotal, formatPeso from calculations.js.
Save as draft and Submit buttons.
Show a note: "Target: waste <2% of daily sales. Log everything — under-reporting is worse than over-reporting."
```

---

## FEATURE 7 — KPI Tracker

```
Build the KPI Tracker page (src/pages/KPITracker.jsx).
4 sections matching the 37-sheet workbook: Documentation Completion, Financial Performance, Quality Performance, Operational Efficiency.
Each KPI row shows: metric name + note, target, actual input field, calculated status badge (on track / watch / off track).
Import scoreKPI from calculations.js. Import KPI_TARGETS from seed.js.
Color status badges: green = on track, orange = watch, red = off track.
"Update by the 5th of each month" reminder at top.
Export to PDF button.
```

---

## FEATURE 8 — Product Bible Form

```
Build the Product Bible form (src/pages/ProductBibles.jsx).
Two views: SKU grid list (all registered SKUs as cards) and a new/edit form.
SKU grid: card per SKU showing code, name, brand, category, status badge, and bible completion indicator.
New product bible form with 6 sections (tabbed):
  - A: Brand Identity (SKU code, name JP/EN, category, brand, status, brand story)
  - B: Operations (prep time, cook time, portion size, assembly steps)
  - C: Sensory (appearance standard, taste profile)
  - D: Commercial (selling price, target BC%, product classification: Star/Plowhorse/Puzzle/Dog)
  - E: Compliance (allergen checkboxes for all 8 allergens, DTI/FDA notes)
  - F: Digital Assets (photo URL, plating photo URL)
Validate SKU code format using isValidSKU from calculations.js.
Show "Bible Complete" indicator (all 6 sections filled = complete).
```

---

## FEATURE 9 — Supabase Integration

```
Set up Supabase integration.
Create src/lib/supabase.js with the Supabase client.
Create src/hooks/useSkus.js — hook to fetch, create, update SKUs from the skus table.
Create src/hooks/useQCAudits.js — hook to submit and fetch QC audits.
Create src/hooks/useWasteLogs.js — hook to submit and fetch waste logs.
Use the schema from src/data/schema.md.
Add .env.example with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
Replace all local state in the forms with Supabase mutations.
Show loading states and error handling.
```

---

## FEATURE 10 — Mobile Optimization (Kitchen Tablet View)

```
Make the app fully usable on a tablet (iPad/Android tablet) for kitchen managers.
The waste log, QC scorecard, and daily ops checklist should work well on a 768px width screen.
Make the sidebar collapsible on mobile (hamburger menu).
Increase touch targets to at least 44px for all interactive elements.
Make number inputs and sliders easy to use with a finger.
Test that the allergen matrix is scrollable horizontally on mobile.
Add a "Kitchen Mode" shortcut that goes directly to: Waste Log, QC Scorecard, Daily Ops Checklist.
```

---

## USEFUL DEBUG PROMPTS

```
# When something looks broken
The [component name] is not calculating correctly. The food cost % should be
totalCost / sellingPrice * 100. Check calculations.js and make sure the values
are in centavos before dividing.

# Adding a new SKU
Add this SKU to the seed data and allergen matrix:
SKU: [CODE], Name: [NAME], Brand: [BRAND], Allergens: [LIST]

# Styling fix
The [component] doesn't match the NHI brand. Use navy #1a1f36 for headers,
gold #d4a843 for active/highlight states, and red #c0392b only for alerts
and critical allergen warnings.

# Export feature
Add a print/export button to [page] that generates a clean printable view
without the sidebar and navigation, formatted for A4 paper. Kitchen teams
need to be able to print the allergen matrix and plating spec cards.
```

---

## BUILD ORDER (Recommended Sequence)

1. `Setup` — Get the app running locally
2. `Feature 1` — Layout + navigation
3. `Feature 5` — Allergen Matrix (most critical for safety, easiest to validate)
4. `Feature 3` — Recipe Costing (high value for finance)
5. `Feature 4` — QC Scorecard (weekly use)
6. `Feature 6` — Waste Log (daily use)
7. `Feature 2` — Dashboard (needs data from other features)
8. `Feature 7` — KPI Tracker
9. `Feature 8` — Product Bible Form (most complex)
10. `Feature 9` — Supabase (when ready to go live)
11. `Feature 10` — Mobile optimization (before kitchen deployment)

---

## RUNNING THE APP

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## DEPLOYMENT

Recommended: Vercel (free tier works, auto-deploys from GitHub)
```bash
npm install -g vercel
vercel --prod
```

Set environment variables in Vercel dashboard:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
