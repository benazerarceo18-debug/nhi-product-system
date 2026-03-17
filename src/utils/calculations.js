/**
 * NHI Product System — Business Logic Utilities
 * All monetary values in centavos (₱1 = 100 centavos) unless suffixed with _pesos
 */

// ─── FOOD COST CALCULATIONS ────────────────────────────────────────────────

/**
 * Calculate food cost percentage
 * Target: 25-30% beverages, 28-35% food
 */
export function calcFoodCostPct(totalCostCentavos, sellingPriceCentavos) {
  if (!sellingPriceCentavos || sellingPriceCentavos === 0) return 0;
  return (totalCostCentavos / sellingPriceCentavos) * 100;
}

/**
 * Get FC% status flag
 */
export function getFCStatus(fcPct, category = 'beverage') {
  const max = category === 'beverage' ? 30 : 35;
  const warn = category === 'beverage' ? 32 : 37;
  if (fcPct <= max) return { status: 'on_target', label: '✓ On Target', color: 'green' };
  if (fcPct <= warn) return { status: 'warning', label: '⚠ Above Target', color: 'orange' };
  return { status: 'critical', label: '✗ Review Required', color: 'red' };
}

/**
 * Calculate recipe total cost from ingredients array
 */
export function calcRecipeTotalCost(ingredients, packagingCost = 0, laborCost = 0) {
  const rawCost = ingredients.reduce((sum, ing) => {
    return sum + (ing.unit_cost_centavos || 0) * (ing.qty_per_serving || 0);
  }, 0);
  return rawCost + packagingCost + laborCost;
}

/**
 * Calculate gross margin
 */
export function calcGrossMargin(sellingPriceCentavos, totalCostCentavos) {
  return sellingPriceCentavos - totalCostCentavos;
}

// ─── QC SCORING ──────────────────────────────────────────────────────────────

export const QC_WEIGHTS = {
  appearance:  0.25,
  portion:     0.20,
  temperature: 0.20,
  taste:       0.20,
  assembly:    0.15,
};

/**
 * Calculate weighted QC score
 * Returns 0-100
 */
export function calcQCScore(scores) {
  return (
    (scores.appearance  || 0) * QC_WEIGHTS.appearance +
    (scores.portion     || 0) * QC_WEIGHTS.portion +
    (scores.temperature || 0) * QC_WEIGHTS.temperature +
    (scores.taste       || 0) * QC_WEIGHTS.taste +
    (scores.assembly    || 0) * QC_WEIGHTS.assembly
  );
}

/**
 * Get QC pass/fail status
 */
export function getQCStatus(totalScore) {
  if (totalScore >= 90) return { status: 'distinction', label: '🏆 Distinction', color: 'green' };
  if (totalScore >= 80) return { status: 'pass', label: '✅ Pass', color: 'blue' };
  return { status: 'fail', label: '❌ Fail — Retrain Immediately', color: 'red' };
}

// ─── WASTE CALCULATIONS ───────────────────────────────────────────────────

/**
 * Calculate total waste cost from entries
 */
export function calcWasteTotal(entries) {
  return entries.reduce((sum, e) => sum + (e.cost_centavos || 0), 0);
}

/**
 * Check if waste is within target
 * Target: <2% of sales
 */
export function getWasteStatus(wastePct) {
  if (wastePct <= 2) return { status: 'on_target', label: '✓ Within Target', color: 'green' };
  if (wastePct <= 2.5) return { status: 'warning', label: '⚠ Watch', color: 'orange' };
  return { status: 'critical', label: '✗ Above Target', color: 'red' };
}

// ─── KPI SCORING ─────────────────────────────────────────────────────────

/**
 * Score a KPI value against its target
 * Returns: on_track | watch | off_track
 */
export function scoreKPI(actual, target, higherIsBetter = true) {
  if (actual === null || actual === undefined) return 'unknown';
  const ratio = actual / target;
  if (higherIsBetter) {
    if (ratio >= 1.0) return 'on_track';
    if (ratio >= 0.85) return 'watch';
    return 'off_track';
  } else {
    // Lower is better (waste%, FC%)
    if (ratio <= 1.0) return 'on_track';
    if (ratio <= 1.15) return 'watch';
    return 'off_track';
  }
}

// ─── FORMATTING ──────────────────────────────────────────────────────────

export function formatPeso(centavos) {
  return '₱' + (centavos / 100).toLocaleString('en-PH', { minimumFractionDigits: 2 });
}

export function formatPct(value) {
  return value.toFixed(1) + '%';
}

/**
 * Validate SKU code format: CAT-TYPE-###
 */
export function isValidSKU(code) {
  return /^[A-Z]{2,5}-[A-Z]{2,6}-\d{3}$/.test(code);
}
