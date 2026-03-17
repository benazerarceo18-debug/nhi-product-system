import { BRANDS, BRAND_LABELS, BRAND_SKU_TARGETS, KPI_TARGETS } from '../data/seed';
import useSkuStore from '../store/skuStore';

const PHASES = [
  { phase: 1, name: 'Pilot',    scope: 'Kazu Café Ayala Triangle (13 SKUs)', status: 'done',    weeks: '1–4' },
  { phase: 2, name: 'Expand',   scope: 'Mendokoro all locations (15 SKUs)',   status: 'active',  weeks: '5–8' },
  { phase: 3, name: 'Scale',    scope: 'Yushoken + Kazunori (20 SKUs)',       status: 'pending', weeks: '9–12' },
  { phase: 4, name: 'Optimize', scope: 'All brands + continuous improvement', status: 'pending', weeks: '13+' },
];

function StatCard({ label, value, sub, color = 'navy' }) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-2xl font-bold mt-1 text-${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard() {
  const allSkus = useSkuStore(s => s.skus);
  const totalSkus = allSkus.length;
  const activeBrands = new Set(allSkus.map(s => s.brand)).size;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total SKUs" value={totalSkus} sub={`Target: ${KPI_TARGETS.product_bibles_complete}`} />
        <StatCard label="Active Brands" value={activeBrands} sub="of 4 total" />
        <StatCard label="Current Phase" value="Phase 2" sub="Mendokoro Expansion" color="gold" />
        <StatCard label="QC Target" value="90%+" sub="Avg audit score" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-sm font-semibold mb-3">Rollout Roadmap</h3>
          <div className="space-y-3">
            {PHASES.map(p => (
              <div key={p.phase} className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  p.status === 'done' ? 'bg-green-100 text-green-700' :
                  p.status === 'active' ? 'bg-gold/20 text-gold' :
                  'bg-gray-100 text-gray-400'
                }`}>{p.phase}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{p.name} <span className="text-xs text-gray-400 ml-1">Wk {p.weeks}</span></p>
                  <p className="text-xs text-gray-500">{p.scope}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  p.status === 'done' ? 'bg-green-50 text-green-700' :
                  p.status === 'active' ? 'bg-gold/10 text-gold' :
                  'bg-gray-50 text-gray-400'
                }`}>{p.status === 'done' ? '✓ Done' : p.status === 'active' ? '● Active' : '○ Pending'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-sm font-semibold mb-3">Brand Progress</h3>
          <div className="space-y-4">
            {BRANDS.map(b => {
              const count = allSkus.filter(s => s.brand === b).length;
              const target = BRAND_SKU_TARGETS[b];
              const pct = Math.round((count / target) * 100);
              return (
                <div key={b}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{BRAND_LABELS[b]}</span>
                    <span className="text-xs text-gray-500">{count}/{target} SKUs ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-sm font-semibold mb-3">Monthly KPI Targets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-light rounded">
            <p className="text-xs text-gray-500">Product Bibles</p>
            <p className="text-lg font-bold">{KPI_TARGETS.product_bibles_complete}</p>
            <p className="text-[10px] text-gray-400">SKUs documented</p>
          </div>
          <div className="text-center p-3 bg-light rounded">
            <p className="text-xs text-gray-500">Staff Trained</p>
            <p className="text-lg font-bold">{KPI_TARGETS.staff_trained_pct}%+</p>
            <p className="text-[10px] text-gray-400">Across all brands</p>
          </div>
          <div className="text-center p-3 bg-light rounded">
            <p className="text-xs text-gray-500">Waste Target</p>
            <p className="text-lg font-bold">&lt;{KPI_TARGETS.waste_pct_of_sales}%</p>
            <p className="text-[10px] text-gray-400">Of daily sales</p>
          </div>
          <div className="text-center p-3 bg-light rounded">
            <p className="text-xs text-gray-500">Cost Savings</p>
            <p className="text-lg font-bold">₱300K</p>
            <p className="text-[10px] text-gray-400">Monthly target</p>
          </div>
        </div>
      </div>
    </div>
  );
}
