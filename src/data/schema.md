# NHI Product System — Database Schema

## Supabase / PostgreSQL

### Tables

#### `skus`
Core product registry — one row per menu item.
```sql
CREATE TABLE skus (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku_code        VARCHAR(20) UNIQUE NOT NULL,  -- BEV-YML-001
  product_name    VARCHAR(100) NOT NULL,
  product_name_jp VARCHAR(100),
  brand           VARCHAR(20) NOT NULL CHECK (brand IN ('kazu_cafe','mendokoro','yushoken','kazunori')),
  category        VARCHAR(20) NOT NULL CHECK (category IN ('beverage','dessert','appetizer','ramen','main','side')),
  status          VARCHAR(15) NOT NULL DEFAULT 'testing' CHECK (status IN ('active','testing','discontinued')),
  version         VARCHAR(10) NOT NULL DEFAULT '1.0',
  -- Section A: Brand Identity
  brand_story     TEXT,
  -- Section B: Operations
  prep_time_min   INTEGER,
  cook_time_min   INTEGER,
  portion_size    VARCHAR(50),
  assembly_steps  TEXT,
  -- Section C: Sensory
  appearance_std  TEXT,
  taste_profile   TEXT,
  -- Section D: Commercial
  selling_price   INTEGER NOT NULL,  -- in centavos (₱280.00 = 28000)
  target_bc_pct   DECIMAL(5,2) DEFAULT 28.00,
  -- Section E: Compliance / Allergens
  allergens       JSONB DEFAULT '{}',
  -- Section F: Digital Assets
  photo_url       TEXT,
  -- Metadata
  bible_complete  BOOLEAN DEFAULT false,
  created_by      VARCHAR(100),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `recipe_costings`
```sql
CREATE TABLE recipe_costings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku_code        VARCHAR(20) REFERENCES skus(sku_code),
  version         VARCHAR(10) DEFAULT '1.0',
  ingredients     JSONB NOT NULL DEFAULT '[]',
  -- [{name, supplier, unit_size, unit_cost_centavos, qty_per_serving, unit, cost_per_serving_centavos}]
  packaging_cost  INTEGER DEFAULT 0,  -- centavos
  labor_cost      INTEGER DEFAULT 0,  -- centavos
  total_cost      INTEGER GENERATED ALWAYS AS (
    (SELECT COALESCE(SUM((elem->>'cost_per_serving_centavos')::INTEGER), 0) FROM jsonb_array_elements(ingredients) elem)
    + packaging_cost + labor_cost
  ) STORED,
  food_cost_pct   DECIMAL(5,2),  -- calculated on insert/update
  gross_margin    INTEGER,        -- centavos, calculated
  approved_by     VARCHAR(100),
  approved_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `qc_audits`
```sql
CREATE TABLE qc_audits (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand           VARCHAR(20) NOT NULL,
  location        VARCHAR(100) NOT NULL,
  sku_code        VARCHAR(20) REFERENCES skus(sku_code),
  auditor_name    VARCHAR(100) NOT NULL,
  audit_date      DATE NOT NULL DEFAULT CURRENT_DATE,
  -- Weighted scores (0-100 each)
  score_appearance    INTEGER CHECK (score_appearance BETWEEN 0 AND 100),  -- 25% weight
  score_portion       INTEGER CHECK (score_portion BETWEEN 0 AND 100),     -- 20% weight
  score_temperature   INTEGER CHECK (score_temperature BETWEEN 0 AND 100), -- 20% weight
  score_taste         INTEGER CHECK (score_taste BETWEEN 0 AND 100),       -- 20% weight
  score_assembly      INTEGER CHECK (score_assembly BETWEEN 0 AND 100),    -- 15% weight
  total_score         DECIMAL(5,2),  -- weighted average, calculated
  status          VARCHAR(15) CHECK (status IN ('pass','fail','distinction')),
  corrective_actions TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `waste_logs`
```sql
CREATE TABLE waste_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand           VARCHAR(20) NOT NULL,
  location        VARCHAR(100) NOT NULL,
  km_name         VARCHAR(100) NOT NULL,
  log_date        DATE NOT NULL DEFAULT CURRENT_DATE,
  entries         JSONB NOT NULL DEFAULT '[]',
  -- [{item, sku_code, qty, unit, cost_centavos, reason}]
  total_waste_cost INTEGER DEFAULT 0,  -- centavos, sum of entries
  submitted_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `substitution_requests`
```sql
CREATE TABLE substitution_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku_code        VARCHAR(20) REFERENCES skus(sku_code),
  brand           VARCHAR(20) NOT NULL,
  location        VARCHAR(100) NOT NULL,
  requested_by    VARCHAR(100) NOT NULL,
  original_ingredient   VARCHAR(200) NOT NULL,
  proposed_substitute   VARCHAR(200) NOT NULL,
  reason          TEXT NOT NULL,
  allergen_impact TEXT,  -- must be filled if allergens change
  status          VARCHAR(15) DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  reviewed_by     VARCHAR(100),
  reviewed_at     TIMESTAMPTZ,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `staff_proficiency`
```sql
CREATE TABLE staff_proficiency (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_name      VARCHAR(100) NOT NULL,
  brand           VARCHAR(20) NOT NULL,
  location        VARCHAR(100) NOT NULL,
  role            VARCHAR(100) NOT NULL,
  trained_by      VARCHAR(100) NOT NULL,
  training_date   DATE NOT NULL,
  competencies    JSONB NOT NULL DEFAULT '{}',
  -- {task_name: boolean}
  total_tasks     INTEGER,
  completed_tasks INTEGER,
  score_pct       DECIMAL(5,2),
  certified       BOOLEAN DEFAULT false,
  certified_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

#### `kpi_reports`
```sql
CREATE TABLE kpi_reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_month    VARCHAR(7) NOT NULL,  -- YYYY-MM
  prepared_by     VARCHAR(100) NOT NULL,
  -- Category 1: Documentation
  product_bibles_complete   INTEGER,
  recipe_costings_complete  INTEGER,
  plating_cards_posted      INTEGER,
  staff_trained_pct         DECIMAL(5,2),
  -- Category 2: Financial
  fc_pct_baseline           DECIMAL(5,2),
  fc_pct_actual             DECIMAL(5,2),
  waste_pct_of_sales        DECIMAL(5,2),
  unauthorized_subs         INTEGER,
  cost_savings_centavos     INTEGER,
  -- Category 3: Quality
  qc_avg_score              DECIMAL(5,2),
  items_below_threshold     INTEGER,
  quality_complaints        INTEGER,
  remakes_pct               DECIMAL(5,2),
  -- Category 4: Efficiency
  time_saved_hours          DECIMAL(5,1),
  recipe_questions_count    INTEGER,
  over_portioning_incidents INTEGER,
  notes                     TEXT,
  created_at                TIMESTAMPTZ DEFAULT NOW()
);
```

## Indexes
```sql
CREATE INDEX idx_skus_brand ON skus(brand);
CREATE INDEX idx_skus_status ON skus(status);
CREATE INDEX idx_qc_audits_date ON qc_audits(audit_date);
CREATE INDEX idx_qc_audits_brand ON qc_audits(brand);
CREATE INDEX idx_waste_logs_date ON waste_logs(log_date);
CREATE INDEX idx_waste_logs_brand ON waste_logs(brand);
```

## RLS Policies (Supabase Row Level Security)
```sql
-- Kitchen staff can read all, insert their own brand
-- Operations managers can read/write all
-- BDSP can read/write everything
-- Admins have full access
```
