import { BRANDS, BRAND_LABELS, BRAND_SKU_TARGETS, KPI_TARGETS } from '../data/seed';
import useSkuStore from '../store/skuStore';
import useAlertStore from '../store/alertStore';
import { BrandIcon, BRAND_COLORS } from '../components/BrandLogos';
import { AlertTriangle, TrendingUp, Package, Users, Target } from 'lucide-react';

const PHASES = [
  { phase: 1, name: 'Pilot',    scope: 'Kazu Café Ayala Triangle (13 SKUs)', status: 'done',    weeks: '1–4' },
  { phase: 2, name: 'Expand',   scope: 'Mendokoro all locations (15 SKUs)',   status: 'active',  weeks: '5–8' },
  { phase: 3, name: 'Scale',    scope: 'Yushoken + Kazunori (20 SKUs)',       status: 'pending', weeks: '9–12' },
  { phase: 4, name: 'Optimize', scope: 'All brands + continuous improvement', status: 'pending', weeks: '13+' },
];

function StatCard({ label, value, sub, icon: Icon, color = '#1a1f36' }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</p>
          <p className="text-3xl font-bold mt-1 tracking-tight" style={{ color }}>{value}</p>
          {sub && <p className="text-[11px] text-gray-400 mt-1">{sub}</p>}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + '10' }}>
            <Icon size={20} style={{ color }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const allSkus = useSkuStore(s => s.skus);
  const openAlerts = useAlertStore(s => s.getOpen());
  const totalSkus = allSkus.length;
  const activeBrands = new Set(allSkus.map(s => s.brand)).size;

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total SKUs" value={totalSkus} sub={`Target: ${KPI_TARGETS.product_bibles_complete}`} icon={Package} />
        <StatCard label="Active Brands" value={activeBrands} sub="of 4 total" icon={Users} color="#4a7c59" />
        <StatCard label="Current Phase" value="2" sub="Mendokoro Expansion" icon={TrendingUp} color="#d4a843" />
        <StatCard label="QC Target" value="90%+" sub="Avg audit score" icon={Target} color="#8b2500" />
      </div>

      {/* Brand Progress Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {BRANDS.map(b => {
          const count = allSkus.filter(s => s.brand === b).length;
          const target = BRAND_SKU_TARGETS[b];
          const pct = Math.round((count / target) * 100);
          const bc = BRAND_COLORS[b];

          return (
            <div key={b} className={`bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow brand-accent-${b}`}>
              <div className="flex items-center gap-3 mb-3">
                <BrandIcon brand={b} size={32} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: bc.text }}>{bc.label}</p>
                  <p className="text-[10px] text-gray-400">{count}/{target} SKUs</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: bc.primary }} />
              </div>
              <p className="text-right text-[10px] font-medium mt-1" style={{ color: bc.primary }}>{pct}%</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Rollout Roadmap */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold mb-4 text-navy">Rollout Roadmap</h3>
          <div className="space-y-3">
            {PHASES.map(p => (
              <div key={p.phase} className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  p.status === 'done' ? 'bg-green-50 text-green-700' :
                  p.status === 'active' ? 'bg-gold/15 text-gold' :
                  'bg-gray-50 text-gray-300'
                }`}>{p.phase}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy">
                    {p.name}
                    <span className="text-[10px] text-gray-400 ml-2 font-normal">Wk {p.weeks}</span>
                  </p>
                  <p className="text-[11px] text-gray-400 truncate">{p.scope}</p>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                  p.status === 'done' ? 'bg-green-50 text-green-600' :
                  p.status === 'active' ? 'bg-gold/10 text-gold' :
                  'bg-gray-50 text-gray-300'
                }`}>
                  {p.status === 'done' ? 'Done' : p.status === 'active' ? 'Active' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FC% Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className={openAlerts.length > 0 ? 'text-gold' : 'text-gray-200'} />
            <h3 className="text-sm font-semibold text-navy">FC% Tolerance Alerts</h3>
            {openAlerts.length > 0 && (
              <span className="ml-auto text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-medium">
                {openAlerts.length} open
              </span>
            )}
          </div>
          {openAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3">
                <Target size={20} className="text-green-500" />
              </div>
              <p className="text-sm text-gray-500">All recipes within tolerance</p>
              <p className="text-[10px] text-gray-300 mt-1">No open reviews</p>
            </div>
          ) : (
            <div className="space-y-2">
              {openAlerts.slice(0, 5).map(a => {
                const sku = allSkus.find(s => s.sku_code === a.sku_code);
                const bc = sku ? BRAND_COLORS[sku.brand] : null;
                return (
                  <div key={a.id} className="flex items-center gap-3 text-sm rounded-lg px-3 py-2.5" style={{ background: (bc?.primary || '#d4a843') + '08' }}>
                    {sku && <BrandIcon brand={sku.brand} size={22} />}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-navy truncate">{sku?.product_name || a.sku_code}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{a.sku_code}</p>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gold/10 text-gold whitespace-nowrap">
                      {a.drift_pct?.toFixed(1)}pp {a.actual_fc_pct > a.target_fc_pct ? 'over' : 'under'}
                    </span>
                  </div>
                );
              })}
              <p className="text-[10px] text-gray-300 pt-1">Resolve in Recipe Costing</p>
            </div>
          )}
        </div>
      </div>

      {/* KPI Targets */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold mb-4 text-navy">Monthly KPI Targets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: 'Product Bibles', value: KPI_TARGETS.product_bibles_complete, unit: 'SKUs', color: '#1a1f36' },
            { label: 'Staff Trained', value: `${KPI_TARGETS.staff_trained_pct}%+`, unit: 'All brands', color: '#4a7c59' },
            { label: 'Waste Target', value: `<${KPI_TARGETS.waste_pct_of_sales}%`, unit: 'Of daily sales', color: '#8b2500' },
            { label: 'Cost Savings', value: '₱300K', unit: 'Monthly target', color: '#d4a843' },
          ].map(kpi => (
            <div key={kpi.label} className="text-center p-4 bg-light rounded-lg">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{kpi.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: kpi.color }}>{kpi.value}</p>
              <p className="text-[10px] text-gray-300 mt-0.5">{kpi.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
