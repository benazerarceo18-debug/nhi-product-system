import { useState, useEffect, useRef, useCallback } from 'react';
import { BRAND_LABELS } from '../data/seed';
import useSkuStore from '../store/skuStore';
import useRecipeStore from '../store/recipeStore';
import useMarketStore from '../store/marketStore';
import useAlertStore from '../store/alertStore';
import { calcRecipeTotalCost, calcFoodCostPct, calcGrossMargin, getFCStatus, checkFCTolerance, formatPeso, formatPct } from '../utils/calculations';
import { Plus, Trash2, Printer, Lock, Unlock, AlertTriangle } from 'lucide-react';

const EMPTY_ING = { name: '', unit_cost_centavos: 0, qty_per_serving: 0, unit: 'g', market_item_id: null };

export default function RecipeCosting() {
  const allSkus = useSkuStore(s => s.skus);
  const updateSellingPrice = useSkuStore(s => s.updateSellingPrice);
  const getRecipe = useRecipeStore(s => s.getRecipe);
  const setRecipe = useRecipeStore(s => s.setRecipe);
  const marketItems = useMarketStore(s => s.items);
  const addAlert = useAlertStore(s => s.addAlert);
  const resolveAlert = useAlertStore(s => s.resolveAlert);
  const getBySkuCode = useAlertStore(s => s.getBySkuCode);

  const [selectedSku, setSelectedSku] = useState(allSkus[0]?.sku_code || '');
  const [ingredients, setIngredients] = useState([{ ...EMPTY_ING }]);
  const [packaging, setPackaging] = useState(0);
  const [labor, setLabor] = useState(0);
  const [priceUnlocked, setPriceUnlocked] = useState(false);
  const [editPrice, setEditPrice] = useState('');
  const [autocompleteIdx, setAutocompleteIdx] = useState(null);
  const [autocompleteQuery, setAutocompleteQuery] = useState('');
  const ingredientTableRef = useRef(null);

  const sku = allSkus.find(s => s.sku_code === selectedSku) || allSkus[0];

  // Load saved recipe when SKU changes
  useEffect(() => {
    const saved = getRecipe(selectedSku);
    if (saved) {
      setIngredients(saved.ingredients?.length ? saved.ingredients : [{ ...EMPTY_ING }]);
      setPackaging(saved.packaging || 0);
      setLabor(saved.labor || 0);
    } else {
      setIngredients([{ ...EMPTY_ING }]);
      setPackaging(0);
      setLabor(0);
    }
    setPriceUnlocked(false);
    setAutocompleteIdx(null);
  }, [selectedSku]);

  // Auto-save recipe on change
  const saveRecipe = useCallback(() => {
    const hasData = ingredients.some(i => i.name) || packaging > 0 || labor > 0;
    if (hasData) {
      setRecipe(selectedSku, { ingredients, packaging, labor });
    }
  }, [ingredients, packaging, labor, selectedSku, setRecipe]);

  useEffect(() => {
    const t = setTimeout(saveRecipe, 500);
    return () => clearTimeout(t);
  }, [saveRecipe]);

  const totalCost = calcRecipeTotalCost(ingredients, packaging * 100, labor * 100);
  const fcPct = calcFoodCostPct(totalCost, sku.selling_price);
  const fcStatus = getFCStatus(fcPct, sku.category);
  const tolerance = checkFCTolerance(fcPct, sku.category);
  const margin = calcGrossMargin(sku.selling_price, totalCost);
  const openAlert = getBySkuCode(selectedSku);

  // Trigger alert when out of tolerance (only if we have ingredients)
  useEffect(() => {
    if (totalCost > 0 && tolerance.triggerReview && !openAlert) {
      addAlert({
        sku_code: selectedSku,
        type: 'fc_tolerance',
        target_fc_pct: tolerance.target,
        actual_fc_pct: fcPct,
        drift_pct: tolerance.drift,
      });
    }
  }, [totalCost, tolerance.triggerReview, selectedSku]);

  const addRow = () => setIngredients([...ingredients, { ...EMPTY_ING }]);
  const removeRow = (i) => setIngredients(ingredients.filter((_, idx) => idx !== i));
  const updateRow = (i, field, val) => {
    const next = [...ingredients];
    next[i] = { ...next[i], [field]: field === 'name' || field === 'unit' ? val : Number(val) };
    setIngredients(next);
  };

  const handleNameChange = (i, val) => {
    updateRow(i, 'name', val);
    setAutocompleteIdx(i);
    setAutocompleteQuery(val.toLowerCase());
  };

  const selectMarketItem = (i, mktItem) => {
    const next = [...ingredients];
    next[i] = { ...next[i], name: mktItem.name, unit: mktItem.unit, unit_cost_centavos: mktItem.price_centavos, market_item_id: mktItem.id };
    setIngredients(next);
    setAutocompleteIdx(null);
    setAutocompleteQuery('');
  };

  const filteredMarket = autocompleteQuery.length >= 2
    ? marketItems.filter(m => m.name.toLowerCase().includes(autocompleteQuery))
    : [];

  const handlePriceSave = () => {
    const newCentavos = Math.round(Number(editPrice) * 100);
    if (newCentavos > 0) {
      updateSellingPrice(selectedSku, newCentavos);
      if (openAlert) {
        resolveAlert(openAlert.id, `Price adjusted to ${formatPeso(newCentavos)}`);
      }
    }
    setPriceUnlocked(false);
    setEditPrice('');
  };

  const previewFcPct = priceUnlocked && editPrice
    ? calcFoodCostPct(totalCost, Math.round(Number(editPrice) * 100))
    : null;

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

      {/* FC% Tolerance Alert Banner */}
      {totalCost > 0 && tolerance.triggerReview && (
        <div className="bg-gold/10 border border-gold rounded-lg p-3 mb-4 flex items-center gap-3">
          <AlertTriangle size={18} className="text-gold shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-navy">FC% Tolerance Breached — {formatPct(tolerance.drift)}pp {tolerance.direction} target</p>
            <p className="text-xs text-gray-600">Actual: {formatPct(fcPct)} | Target range: {formatPct(tolerance.min)}–{formatPct(tolerance.max)}</p>
          </div>
          <button onClick={() => { setPriceUnlocked(true); setEditPrice((sku.selling_price / 100).toString()); }} className="bg-gold text-white px-3 py-1.5 rounded text-xs hover:bg-gold/90">Adjust Price</button>
          <button onClick={() => ingredientTableRef.current?.scrollIntoView({ behavior: 'smooth' })} className="bg-white border text-navy px-3 py-1.5 rounded text-xs hover:bg-gray-50">Adjust Recipe</button>
        </div>
      )}

      <div className="bg-white rounded-lg border p-4 mb-4" ref={ingredientTableRef}>
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
                <td className="py-1.5 pr-2 relative">
                  <input value={ing.name} onChange={e => handleNameChange(i, e.target.value)} onBlur={() => setTimeout(() => setAutocompleteIdx(null), 200)} placeholder="e.g. Matcha Powder" className="w-full border rounded px-2 py-1 text-sm" />
                  {autocompleteIdx === i && filteredMarket.length > 0 && (
                    <div className="absolute z-10 left-0 right-2 top-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
                      {filteredMarket.map(m => (
                        <button key={m.id} onMouseDown={() => selectMarketItem(i, m)} className="w-full text-left px-3 py-1.5 text-sm hover:bg-gold/10 flex justify-between">
                          <span>{m.name}</span>
                          <span className="text-xs text-gray-400">{formatPeso(m.price_centavos)}/{m.unit}</span>
                        </button>
                      ))}
                    </div>
                  )}
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
            {priceUnlocked ? (
              <div className="mt-1">
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-sm text-gray-400">₱</span>
                  <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="w-24 border rounded px-2 py-1 text-sm text-center" autoFocus />
                </div>
                {previewFcPct !== null && (
                  <p className="text-xs text-gray-500 mt-1">FC% preview: {formatPct(previewFcPct)}</p>
                )}
                <div className="flex gap-1 justify-center mt-1">
                  <button onClick={handlePriceSave} className="bg-navy text-white px-3 py-1 rounded text-xs">Save</button>
                  <button onClick={() => setPriceUnlocked(false)} className="text-gray-500 text-xs">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <p className="text-xl font-bold">{formatPeso(sku.selling_price)}</p>
                <button onClick={() => { setPriceUnlocked(true); setEditPrice((sku.selling_price / 100).toString()); }} className="text-gray-400 hover:text-navy" title={tolerance.triggerReview ? 'Price edit recommended' : 'Locked — FC% within tolerance'}>
                  {tolerance.triggerReview ? <Unlock size={14} className="text-gold" /> : <Lock size={14} />}
                </button>
              </div>
            )}
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
