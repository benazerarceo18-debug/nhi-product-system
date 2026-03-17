import { useState, useMemo } from 'react';
import { BRANDS, BRAND_LABELS, LOCATIONS } from '../data/seed';
import useSkuStore from '../store/skuStore';
import useRecipeStore from '../store/recipeStore';
import useSalesStore from '../store/salesStore';
import { calcRecipeTotalCost, calcFoodCostPct, calcTheoreticalConsumption, formatPeso, formatPct } from '../utils/calculations';
import { Save, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';

export default function SalesTracker() {
  const allSkus = useSkuStore(s => s.skus);
  const recipes = useRecipeStore(s => s.recipes);
  const addEntry = useSalesStore(s => s.addEntry);

  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [brand, setBrand] = useState(BRANDS[0]);
  const [location, setLocation] = useState('');
  const [enteredBy, setEnteredBy] = useState('');
  const [qtys, setQtys] = useState({});
  const [showConsumption, setShowConsumption] = useState(false);
  const [saved, setSaved] = useState(false);

  const brandSkus = allSkus.filter(s => s.brand === brand && s.status === 'active');

  const updateQty = (skuCode, val) => {
    setQtys({ ...qtys, [skuCode]: Math.max(0, Number(val) || 0) });
    setSaved(false);
  };

  const rows = useMemo(() => brandSkus.map(sku => {
    const qty = qtys[sku.sku_code] || 0;
    const recipe = recipes[sku.sku_code];
    const costPerUnit = recipe
      ? calcRecipeTotalCost(recipe.ingredients || [], (recipe.packaging || 0) * 100, (recipe.labor || 0) * 100)
      : 0;
    const revenue = qty * sku.selling_price;
    const cost = qty * costPerUnit;
    const margin = revenue - cost;
    return { sku, qty, revenue, cost, margin, costPerUnit, hasRecipe: !!recipe };
  }), [brandSkus, qtys, recipes]);

  const totals = useMemo(() => rows.reduce((acc, r) => ({
    revenue: acc.revenue + r.revenue,
    cost: acc.cost + r.cost,
    margin: acc.margin + r.margin,
  }), { revenue: 0, cost: 0, margin: 0 }), [rows]);

  const blendedFc = totals.revenue > 0 ? calcFoodCostPct(totals.cost, totals.revenue) : 0;

  const salesItems = useMemo(() =>
    Object.entries(qtys).filter(([, q]) => q > 0).map(([sku_code, qty_sold]) => ({ sku_code, qty_sold })),
    [qtys]
  );
  const consumption = useMemo(() => calcTheoreticalConsumption(recipes, salesItems), [recipes, salesItems]);

  const handleSave = () => {
    if (!location || !enteredBy) return;
    const items = salesItems;
    if (items.length === 0) return;
    addEntry({ date, brand, location, items, entered_by: enteredBy });
    setSaved(true);
  };

  return (
    <div className="max-w-5xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 no-print">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border rounded px-3 py-2 text-sm w-full" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Brand</label>
          <select value={brand} onChange={e => { setBrand(e.target.value); setQtys({}); setLocation(''); }} className="border rounded px-3 py-2 text-sm w-full">
            {BRANDS.map(b => <option key={b} value={b}>{BRAND_LABELS[b]}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} className="border rounded px-3 py-2 text-sm w-full">
            <option value="">Select location...</option>
            {(LOCATIONS[brand] || []).map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Entered By</label>
          <input value={enteredBy} onChange={e => setEnteredBy(e.target.value)} placeholder="Name" className="border rounded px-3 py-2 text-sm w-full" />
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b bg-gray-50">
              <th className="px-4 py-2.5">SKU</th>
              <th className="px-4 py-2.5">Product</th>
              <th className="px-4 py-2.5 w-24">Qty Sold</th>
              <th className="px-4 py-2.5 text-right">Revenue</th>
              <th className="px-4 py-2.5 text-right">Theo. Cost</th>
              <th className="px-4 py-2.5 text-right">Margin</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ sku, qty, revenue, cost, margin, hasRecipe }) => (
              <tr key={sku.sku_code} className="border-t hover:bg-gray-50/50">
                <td className="px-4 py-2 font-mono text-xs">{sku.sku_code}</td>
                <td className="px-4 py-2">
                  {sku.product_name}
                  {!hasRecipe && <span className="ml-1 text-[10px] text-gray-400">(no recipe)</span>}
                </td>
                <td className="px-4 py-2">
                  <input type="number" min={0} value={qtys[sku.sku_code] || ''} onChange={e => updateQty(sku.sku_code, e.target.value)} className="w-20 border rounded px-2 py-1 text-sm text-center" />
                </td>
                <td className="px-4 py-2 text-right font-mono text-xs">{qty > 0 ? formatPeso(revenue) : '—'}</td>
                <td className="px-4 py-2 text-right font-mono text-xs">{qty > 0 && hasRecipe ? formatPeso(cost) : '—'}</td>
                <td className="px-4 py-2 text-right font-mono text-xs">{qty > 0 && hasRecipe ? formatPeso(margin) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-lg border p-4 text-center">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold">{formatPeso(totals.revenue)}</p>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <p className="text-xs text-gray-500">Total Theo. Cost</p>
          <p className="text-xl font-bold">{formatPeso(totals.cost)}</p>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <p className="text-xs text-gray-500">Blended FC%</p>
          <p className="text-xl font-bold" style={{ color: blendedFc <= 30 ? '#16a34a' : blendedFc <= 35 ? '#ea580c' : '#c0392b' }}>
            {formatPct(blendedFc)}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4 text-center">
          <p className="text-xs text-gray-500">Total Margin</p>
          <p className="text-xl font-bold text-green-600">{formatPeso(totals.margin)}</p>
        </div>
      </div>

      {/* Theoretical Consumption */}
      <div className="bg-white rounded-lg border mb-4">
        <button onClick={() => setShowConsumption(!showConsumption)} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50">
          <span>Theoretical Consumption ({consumption.length} ingredients)</span>
          {showConsumption ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showConsumption && consumption.length > 0 && (
          <div className="border-t px-4 py-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b">
                  <th className="pb-2">Ingredient</th>
                  <th className="pb-2 text-right">Qty Needed</th>
                  <th className="pb-2">Unit</th>
                </tr>
              </thead>
              <tbody>
                {consumption.map((c, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1.5">{c.name}</td>
                    <td className="py-1.5 text-right font-mono">{c.qty.toFixed(1)}</td>
                    <td className="py-1.5 text-gray-500">{c.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showConsumption && consumption.length === 0 && (
          <div className="border-t px-4 py-6 text-center text-sm text-gray-400">Enter quantities above and ensure recipes are set up in Recipe Costing.</div>
        )}
      </div>

      <div className="flex justify-end no-print">
        <button onClick={handleSave} disabled={!location || !enteredBy || salesItems.length === 0} className="flex items-center gap-2 bg-navy text-white px-6 py-2.5 rounded text-sm hover:bg-navy/90 disabled:opacity-40 disabled:cursor-not-allowed">
          <Save size={16} /> {saved ? 'Saved' : 'Save Entry'}
        </button>
      </div>
    </div>
  );
}
