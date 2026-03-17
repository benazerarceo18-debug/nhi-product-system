import { useState } from 'react';
import { BRAND_LABELS } from '../data/seed';
import useSkuStore from '../store/skuStore';
import { calcRecipeTotalCost, calcFoodCostPct, calcGrossMargin, getFCStatus, formatPeso, formatPct } from '../utils/calculations';
import { Plus, Trash2, Printer } from 'lucide-react';

const EMPTY_ING = { name: '', unit_cost_centavos: 0, qty_per_serving: 0, unit: 'g' };

export default function RecipeCosting() {
  const allSkus = useSkuStore(s => s.skus);
  const [selectedSku, setSelectedSku] = useState(allSkus[0]?.sku_code || '');
  const [ingredients, setIngredients] = useState([{ ...EMPTY_ING }]);
  const [packaging, setPackaging] = useState(0);
  const [labor, setLabor] = useState(0);

  const sku = allSkus.find(s => s.sku_code === selectedSku) || allSkus[0];
  const totalCost = calcRecipeTotalCost(ingredients, packaging * 100, labor * 100);
  const fcPct = calcFoodCostPct(totalCost, sku.selling_price);
  const fcStatus = getFCStatus(fcPct, sku.category);
  const margin = calcGrossMargin(sku.selling_price, totalCost);

  const addRow = () => setIngredients([...ingredients, { ...EMPTY_ING }]);
  const removeRow = (i) => setIngredients(ingredients.filter((_, idx) => idx !== i));
  const updateRow = (i, field, val) => {
    const next = [...ingredients];
    next[i] = { ...next[i], [field]: field === 'name' || field === 'unit' ? val : Number(val) };
    setIngredients(next);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-4 no-print">
        <select value={selectedSku} onChange={e => setSelectedSku(e.target.value)} className="border rounded px-3 py-2 text-sm">
          {allSkus.map(s => (
            <option key={s.sku_code} value={s.sku_code}>{s.sku_code} — {s.product_name}</option>
          ))}
        </select>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{BRAND_LABELS[sku.brand]}</span>
        <span className="text-xs text-gray-500">Selling: {formatPeso(sku.selling_price)}</span>
        <button onClick={() => window.print()} className="ml-auto flex items-center gap-2 bg-navy text-white px-4 py-2 rounded text-sm hover:bg-navy/90">
          <Printer size={16} /> Print
        </button>
      </div>

      <div className="bg-white rounded-lg border p-4 mb-4">
        <h3 className="text-sm font-semibold mb-3">Ingredients</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b">
              <th className="pb-2 w-1/3">Ingredient</th>
              <th className="pb-2">Unit</th>
              <th className="pb-2">Unit Cost (₱)</th>
              <th className="pb-2">Qty/Serving</th>
              <th className="pb-2">Line Cost</th>
              <th className="pb-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ing, i) => (
              <tr key={i} className="border-t">
                <td className="py-1.5 pr-2">
                  <input value={ing.name} onChange={e => updateRow(i, 'name', e.target.value)} placeholder="e.g. Matcha Powder" className="w-full border rounded px-2 py-1 text-sm" />
                </td>
                <td className="py-1.5 pr-2">
                  <input value={ing.unit} onChange={e => updateRow(i, 'unit', e.target.value)} className="w-16 border rounded px-2 py-1 text-sm" />
                </td>
                <td className="py-1.5 pr-2">
                  <input type="number" value={ing.unit_cost_centavos || ''} onChange={e => updateRow(i, 'unit_cost_centavos', e.target.value)} className="w-24 border rounded px-2 py-1 text-sm" />
                </td>
                <td className="py-1.5 pr-2">
                  <input type="number" value={ing.qty_per_serving || ''} onChange={e => updateRow(i, 'qty_per_serving', e.target.value)} className="w-20 border rounded px-2 py-1 text-sm" />
                </td>
                <td className="py-1.5 text-xs font-mono">
                  {formatPeso(ing.unit_cost_centavos * ing.qty_per_serving)}
                </td>
                <td className="py-1.5">
                  <button onClick={() => removeRow(i)} className="text-gray-400 hover:text-nred"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow} className="mt-2 flex items-center gap-1 text-xs text-gold hover:text-gold/80">
          <Plus size={14} /> Add Ingredient
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 no-print">
        <div className="bg-white rounded-lg border p-4">
          <label className="text-xs text-gray-500 block mb-1">Packaging Cost (₱)</label>
          <input type="number" value={packaging || ''} onChange={e => setPackaging(Number(e.target.value))} className="border rounded px-3 py-2 text-sm w-full" />
        </div>
        <div className="bg-white rounded-lg border p-4">
          <label className="text-xs text-gray-500 block mb-1">Labor Cost (₱)</label>
          <input type="number" value={labor || ''} onChange={e => setLabor(Number(e.target.value))} className="border rounded px-3 py-2 text-sm w-full" />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-sm font-semibold mb-3">Cost Summary</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">Total Cost</p>
            <p className="text-xl font-bold">{formatPeso(totalCost)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Selling Price</p>
            <p className="text-xl font-bold">{formatPeso(sku.selling_price)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Gross Margin</p>
            <p className="text-xl font-bold text-green-600">{formatPeso(margin)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Food Cost %</p>
            <p className="text-xl font-bold" style={{ color: fcStatus.color === 'green' ? '#16a34a' : fcStatus.color === 'orange' ? '#ea580c' : '#c0392b' }}>
              {formatPct(fcPct)}
            </p>
            <p className="text-xs mt-1" style={{ color: fcStatus.color === 'green' ? '#16a34a' : fcStatus.color === 'orange' ? '#ea580c' : '#c0392b' }}>
              {fcStatus.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
