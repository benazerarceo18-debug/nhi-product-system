import { useState } from 'react';
import { KPI_TARGETS } from '../data/seed';
import { scoreKPI, formatPct } from '../utils/calculations';

const SECTIONS = [
  {
    title: 'Documentation',
    kpis: [
      { key: 'product_bibles_complete', label: 'Product Bibles Complete', target: KPI_TARGETS.product_bibles_complete, unit: 'SKUs', higher: true },
      { key: 'recipe_costings_complete', label: 'Recipe Costings Complete', target: KPI_TARGETS.recipe_costings_complete, unit: 'SKUs', higher: true },
      { key: 'plating_cards_posted', label: 'Plating Cards Posted', target: KPI_TARGETS.plating_cards_posted, unit: 'cards', higher: true },
      { key: 'staff_trained_pct', label: 'Staff Trained', target: KPI_TARGETS.staff_trained_pct, unit: '%', higher: true },
    ],
  },
  {
    title: 'Financial',
    kpis: [
      { key: 'fc_pct_reduction', label: 'FC% Reduction vs Baseline', target: KPI_TARGETS.fc_pct_reduction, unit: '%', higher: false, invert: true },
      { key: 'waste_pct_of_sales', label: 'Waste % of Sales', target: KPI_TARGETS.waste_pct_of_sales, unit: '%', higher: false },
      { key: 'unauthorized_subs', label: 'Unauthorized Substitutions', target: KPI_TARGETS.unauthorized_subs, unit: '', higher: false },
      { key: 'cost_savings_peso', label: 'Monthly Cost Savings', target: KPI_TARGETS.cost_savings_peso, unit: '₱', higher: true },
    ],
  },
  {
    title: 'Quality',
    kpis: [
      { key: 'qc_avg_score', label: 'QC Audit Avg Score', target: KPI_TARGETS.qc_avg_score, unit: '%', higher: true },
      { key: 'items_below_threshold', label: 'Items Below 80%', target: KPI_TARGETS.items_below_threshold, unit: '', higher: false },
      { key: 'remakes_pct', label: 'Remake Rate', target: KPI_TARGETS.remakes_pct, unit: '%', higher: false },
    ],
  },
  {
    title: 'Efficiency',
    kpis: [
      { key: 'time_saved_hours', label: 'Time Saved/Month', target: KPI_TARGETS.time_saved_hours, unit: 'hrs', higher: true },
    ],
  },
];

const STATUS_COLORS = {
  on_track: { bg: 'bg-green-50', text: 'text-green-700', label: 'On Track' },
  watch: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Watch' },
  off_track: { bg: 'bg-red-50', text: 'text-nred', label: 'Off Track' },
  unknown: { bg: 'bg-gray-50', text: 'text-gray-400', label: '—' },
};

export default function KPITracker() {
  const [actuals, setActuals] = useState({});

  const update = (key, val) => setActuals({ ...actuals, [key]: val === '' ? null : Number(val) });

  return (
    <div className="max-w-4xl space-y-6">
      {SECTIONS.map(section => (
        <div key={section.title} className="bg-white rounded-lg border">
          <div className="px-4 py-3 border-b bg-navy/5">
            <h3 className="text-sm font-semibold text-navy">{section.title}</h3>
          </div>
          <div className="p-4 space-y-3">
            {section.kpis.map(kpi => {
              const actual = actuals[kpi.key] ?? null;
              const status = kpi.key === 'unauthorized_subs'
                ? (actual === null ? 'unknown' : actual === 0 ? 'on_track' : 'off_track')
                : scoreKPI(actual, kpi.target, kpi.higher);
              const sc = STATUS_COLORS[status];

              return (
                <div key={kpi.key} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{kpi.label}</p>
                    <p className="text-xs text-gray-400">Target: {kpi.target}{kpi.unit}</p>
                  </div>
                  <div className="w-28">
                    <input
                      type="number"
                      value={actual ?? ''}
                      onChange={e => update(kpi.key, e.target.value)}
                      placeholder="Actual"
                      className="w-full border rounded px-2 py-1.5 text-sm text-right"
                    />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded w-20 text-center ${sc.bg} ${sc.text}`}>
                    {sc.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
