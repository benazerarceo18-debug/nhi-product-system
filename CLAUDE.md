# NHI Product System — Claude Code Context File

## Project Overview
This is the **Nippon Hasha Inc. (NHI) Product System** — a web application that digitizes and operationalizes the complete product management framework across NHI's 4 restaurant brands:
- **Kazu Café** (13 SKUs — pilot complete)
- **Mendokoro** (15 SKUs — in rollout)
- **Yushoken** (12 SKUs — pending)
- **Kazunori** (10 SKUs — pending)

Target: 50+ documented SKUs across 21+ locations by end of Q1 2026.

## Business Context
- **Owner/Stakeholder:** Benz Arceo — Group Head of Business Development & Special Projects
- **Company:** Nippon Hasha Inc. (NHI) — premium Japanese restaurant group, Philippines
- **System Origin:** Based on `COMPLETE_Product_System_ALL_APPENDICES.xlsx` (37-sheet operational workbook, Foundation Year 2026 v1.0)
- **EOS Framework:** NHI runs on EOS (Entrepreneurial Operating System). Rocks, Scorecard, L10 are standard vocabulary.
- **Current Phase:** Phase 2 of 4 in 90-day rollout roadmap

## Application Purpose
Replace the Excel-based system with a web app that:
1. Lets Kitchen Managers fill out forms on tablet/mobile (no Excel required)
2. Centralizes all Product Bibles, recipes, allergen data, SOPs
3. Tracks KPIs in real-time (FC%, quality scores, waste, documentation completion)
4. Enforces the product system across all brands without BDSP needing to manually follow up

## Tech Stack (Recommended)
- **Frontend:** React + Vite (fast, modern)
- **Styling:** Tailwind CSS
- **State:** React Context or Zustand (simple, no overkill)
- **Backend (Phase 2):** Supabase (Postgres + Auth + Realtime) — preferred over Firebase for Philippine operations
- **Deployment:** Vercel or Netlify
- **Database schema:** See `/src/data/schema.md`

## Brand Colors (NHI System)
```
--navy:  #1a1f36   (primary dark)
--red:   #c0392b   (alerts, critical)
--gold:  #d4a843   (accent, active states)
--light: #f5f6fa   (background)
```

## Core Data Models

### SKU / Product Bible
```
sku_code:       string  (format: CAT-TYPE-###, e.g. BEV-YML-001)
product_name:   string
brand:          enum [kazu_cafe, mendokoro, yushoken, kazunori]
category:       enum [beverage, dessert, appetizer, ramen, main, side]
status:         enum [active, testing, discontinued]
version:        string
brand_story:    text
prep_time_min:  number
cook_time_min:  number
portion_size:   string
assembly_steps: text
appearance_std: text
taste_profile:  text
selling_price:  number
target_bc_pct:  number (25-30%)
allergens:      json
created_at:     timestamp
updated_at:     timestamp
```

### Recipe Costing
```
sku_code:       FK → skus
ingredients:    json array [{name, supplier, unit_size, unit_cost, qty_per_serving}]
packaging_cost: number
labor_cost:     number
total_cost:     number (calculated)
food_cost_pct:  number (calculated)
gross_margin:   number (calculated)
```

### QC Audit
```
brand:          enum
location:       string
sku_code:       FK → skus
auditor:        string
audit_date:     date
scores: {
  appearance:   number (0-100) — 25% weight
  portion:      number (0-100) — 20% weight
  temperature:  number (0-100) — 20% weight
  taste:        number (0-100) — 20% weight
  assembly:     number (0-100) — 15% weight
}
total_score:    number (calculated)
status:         enum [pass, fail, distinction]
corrective_actions: text
```

### Waste Log
```
brand:          enum
location:       string
km_name:        string
log_date:       date
entries:        json array [{item, qty, unit, cost, reason}]
total_waste_cost: number (calculated)
```

### Staff Proficiency
```
staff_name:     string
brand:          enum
location:       string
role:           string
trained_by:     string
training_date:  date
competencies:   json (checked items)
certified:      boolean
score_pct:      number
```

## Key Business Rules (CRITICAL — always enforce these)
1. **FC% target:** 25–30% for beverages, 28–35% for food. Flag anything above threshold.
2. **QC scoring:** Pass = 80%+, Distinction = 90%+. Below 80% = immediate retraining trigger.
3. **Substitution rule:** NO ingredient changes without a submitted + approved Substitution Request (Sheet 03). This is a food safety + compliance issue, not just quality.
4. **Allergen protocol:** The 8 major allergens (FDA/DTI Philippines): Milk, Eggs, Fish, Shellfish, Tree Nuts, Peanuts, Wheat/Gluten, Soy. Tree nut items require verbal customer disclosure.
5. **Waste target:** <2% of sales. Log everything — under-reporting is worse than over-reporting.
6. **Product Bible completeness:** All 6 sections required for a Bible to be considered "complete": Brand Identity, Operations, Sensory, Commercials, Compliance, Digital Assets.
7. **SKU format:** Always `CATEGORY-TYPE-###`. Never free-form.

## Current SKU Registry (17 documented, target 50)
| SKU Code | Product | Brand | Category |
|---|---|---|---|
| BEV-UML-001 | Ube Matcha Latte | Kazu Café | Beverage |
| BEV-YML-001 | Yakult Matcha Latte | Kazu Café | Beverage |
| BEV-SCH-001 | Salted Caramel Hojicha | Kazu Café | Beverage |
| BEV-HHL-001 | Hazelnut Hojicha | Kazu Café | Beverage |
| BEV-AHL-001 | Almond Hojicha | Kazu Café | Beverage |
| BEV-CCH-001 | Choco Cookies Hojicha | Kazu Café | Beverage |
| DST-YUZU-001 | Yuzu Ice Cream | Kazu Café | Dessert |
| DST-MTCH-001 | Matcha Ice Cream | Kazu Café | Dessert |
| DST-STRW-001 | Strawberry Ice Cream | Kazu Café | Dessert |
| APP-GYOZA-001 | Gyoza (6pcs) | Kazunori | Appetizer |
| APP-EDM-001 | Edamame | Kazunori | Appetizer |
| APP-TKY-001 | Chicken Karaage | Kazunori | Appetizer |
| RMN-SHIO-001 | Shio Ramen | Mendokoro/Yushoken | Ramen |
| RMN-SHOYU-001 | Shoyu Ramen | Mendokoro/Yushoken | Ramen |
| RMN-MISO-001 | Miso Ramen | Mendokoro/Yushoken | Ramen |
| MAIN-PIZZA-001 | Kazu Café Pizza | Kazu Café | Main |
| MAIN-RICE-001 | Katsu Curry Rice | Kazu Café | Main |

## Allergen Data (Critical Safety Reference)
| SKU | Milk | Eggs | Fish | Shellfish | Tree Nuts | Peanuts | Wheat | Soy |
|---|---|---|---|---|---|---|---|---|
| BEV-UML-001 | ✓ | | | | | | | |
| BEV-YML-001 | ✓ | | | | ⚠ Gelatin | | | |
| BEV-HHL-001 | ✓ | | | | ⚠ HAZELNUT | | | |
| BEV-AHL-001 | ✓ | | | | ⚠ ALMOND | | | |
| BEV-CCH-001 | ✓ | | | | | | ✓ | Possible |
| APP-GYOZA-001 | | | | | | | ✓ | ✓ |
| APP-TKY-001 | | ✓ | | | | | ✓ | ✓ |
| RMN-SHIO-001 | | ✓ | ✓ | | | | ✓ | ✓ |
| RMN-SHOYU-001 | | ✓ | | | | | ✓ | ✓ |
| RMN-MISO-001 | | ✓ | | | | | ✓ | ✓ |

## Implementation Phases (Roadmap)
| Phase | Timeline | Scope | Status |
|---|---|---|---|
| Phase 1: Pilot | Week 1-4 | Kazu Café Ayala Triangle (13 SKUs) | ✅ Done |
| Phase 2: Expand | Week 5-8 | Mendokoro all locations (15 SKUs) | 🔄 Active |
| Phase 3: Scale | Week 9-12 | Yushoken + Kazunori (20 SKUs) | ⏳ Pending |
| Phase 4: Optimize | Week 13+ | All brands + continuous improvement | ⏳ Pending |

## KPI Targets (Monthly)
| Category | Metric | Target |
|---|---|---|
| Documentation | Product Bibles complete | 50 SKUs |
| Documentation | Staff trained | 80%+ |
| Financial | FC% reduction | -2% vs baseline |
| Financial | Waste % of sales | <2% |
| Financial | Monthly cost savings | ₱300K |
| Quality | QC audit avg score | 90%+ |
| Quality | Items below 80% | 0 |
| Efficiency | Time saved/month | 15-20 hrs |

## Naming Conventions
- Components: PascalCase (e.g. `RecipeCostingForm.jsx`)
- Files: kebab-case (e.g. `allergen-matrix.jsx`)
- Database tables: snake_case (e.g. `qc_audits`)
- CSS classes: Follow Tailwind utility-first
- SKU codes: `CAT-TYPE-###` always uppercase

## Coding Style
- Functional components only (no class components)
- Keep components focused — one responsibility per component
- Extract reusable hooks into `/src/hooks/`
- Business logic (FC% calculation, QC scoring) goes in `/src/utils/`
- All monetary values in Philippine Peso (₱), stored as integers in centavos
- Dates: Philippines timezone (Asia/Manila, UTC+8)

## DO NOT
- Add features not in the original 37-sheet system without explicit approval
- Change allergen data without source verification
- Allow ingredient substitutions without approval workflow
- Use localStorage for anything sensitive (allergen/compliance data)

## Reference Files
- Original workbook: `COMPLETE_Product_System_ALL_APPENDICES.xlsx`
- Ice cream variant: `Ice Cream_Product_System_ALL_APPENDICES.xlsx`
- MVP HTML prototype: `NHI_Product_System_MVP.html`
- Brand guidelines: `KAZU_BrandGuide_20241204.pdf`, `MNK_BrandGuide_v1_KazuFormat.pptx`
