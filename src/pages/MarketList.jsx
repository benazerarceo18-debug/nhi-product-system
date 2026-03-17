import { useState } from 'react';
import { INGREDIENT_CATEGORIES, SUPPLIERS } from '../data/seed';
import useMarketStore from '../store/marketStore';
import useRecipeStore from '../store/recipeStore';
import { formatPeso } from '../utils/calculations';
import { Plus, Pencil, Trash2, RefreshCw, ChevronDown, ChevronUp, X, Check } from 'lucide-react';

const EMPTY_ITEM = { name: '', supplier_id: 3, unit: 'g', unit_size: '', price_centavos: 0, category: 'Dairy' };

export default function MarketList() {
  const items = useMarketStore(s => s.items);
  const addItem = useMarketStore(s => s.addItem);
  const updateItem = useMarketStore(s => s.updateItem);
  const updatePrice = useMarketStore(s => s.updatePrice);
  const removeItem = useMarketStore(s => s.removeItem);
  const recipes = useRecipeStore(s => s.recipes);
  const setRecipe = useRecipeStore(s => s.setRecipe);

  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_ITEM });
  const [editingId, setEditingId] = useState(null);
  const [priceEditId, setPriceEditId] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [expandedHistory, setExpandedHistory] = useState(null);

  const filtered = filter === 'All' ? items : items.filter(it => it.category === filter);

  const handleAdd = () => {
    if (!form.name || !form.price_centavos) return;
    if (editingId) {
      updateItem(editingId, form);
      setEditingId(null);
    } else {
      addItem(form);
    }
    setForm({ ...EMPTY_ITEM });
    setShowForm(false);
  };

  const startEdit = (item) => {
    setForm({ name: item.name, supplier_id: item.supplier_id, unit: item.unit, unit_size: item.unit_size, price_centavos: item.price_centavos, category: item.category });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handlePriceUpdate = (id) => {
    const val = Math.round(Number(newPrice) * 100);
    if (val > 0) {
      updatePrice(id, val);
    }
    setPriceEditId(null);
    setNewPrice('');
  };

  const syncRecipes = () => {
    let synced = 0;
    for (const [skuCode, recipe] of Object.entries(recipes)) {
      let changed = false;
      const updated = recipe.ingredients.map(ing => {
        if (ing.market_item_id) {
          const mkt = items.find(m => m.id === ing.market_item_id);
          if (mkt && mkt.price_centavos !== ing.unit_cost_centavos) {
            changed = true;
            return { ...ing, unit_cost_centavos: mkt.price_centavos };
          }
        }
        return ing;
      });
      if (changed) {
        setRecipe(skuCode, { ...recipe, ingredients: updated });
        synced++;
      }
    }
    alert(synced > 0 ? `Synced prices for ${synced} recipe(s).` : 'All recipes already up to date.');
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-4 no-print">
        <div className="flex gap-1 flex-wrap">
          {INGREDIENT_CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 text-xs rounded transition-colors ${filter === c ? 'bg-navy text-white' : 'bg-white border text-gray-600 hover:bg-gray-50'}`}>{c}</button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={syncRecipes} className="flex items-center gap-1.5 bg-white border text-navy px-3 py-1.5 rounded text-xs hover:bg-gray-50">
            <RefreshCw size={14} /> Sync Recipes
          </button>
          <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ ...EMPTY_ITEM }); }} className="flex items-center gap-1.5 bg-gold text-white px-3 py-1.5 rounded text-xs hover:bg-gold/90">
            <Plus size={14} /> Add Ingredient
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border p-4 mb-4">
          <h3 className="text-sm font-semibold mb-3">{editingId ? 'Edit Ingredient' : 'New Ingredient'}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="border rounded px-2 py-1.5 text-sm w-full" placeholder="e.g. Matcha Powder" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Supplier</label>
              <select value={form.supplier_id} onChange={e => setForm({ ...form, supplier_id: Number(e.target.value) })} className="border rounded px-2 py-1.5 text-sm w-full">
                {SUPPLIERS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="border rounded px-2 py-1.5 text-sm w-full">
                {INGREDIENT_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Unit</label>
              <input value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className="border rounded px-2 py-1.5 text-sm w-full" placeholder="g, ml, pc" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Unit Size</label>
              <input value={form.unit_size} onChange={e => setForm({ ...form, unit_size: e.target.value })} className="border rounded px-2 py-1.5 text-sm w-full" placeholder="e.g. 100g tin" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Price per unit (centavos)</label>
              <input type="number" value={form.price_centavos || ''} onChange={e => setForm({ ...form, price_centavos: Number(e.target.value) })} className="border rounded px-2 py-1.5 text-sm w-full" />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={handleAdd} className="bg-navy text-white px-4 py-1.5 rounded text-sm hover:bg-navy/90">{editingId ? 'Update' : 'Add'}</button>
              <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-gray-500 text-sm hover:text-gray-700">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b bg-gray-50">
              <th className="px-4 py-2.5">Ingredient</th>
              <th className="px-4 py-2.5">Supplier</th>
              <th className="px-4 py-2.5">Unit Size</th>
              <th className="px-4 py-2.5">Price/Unit</th>
              <th className="px-4 py-2.5">Category</th>
              <th className="px-4 py-2.5 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => {
              const supplier = SUPPLIERS.find(s => s.id === item.supplier_id);
              return (
                <tr key={item.id} className="border-t hover:bg-gray-50/50">
                  <td className="px-4 py-2.5 font-medium">{item.name}</td>
                  <td className="px-4 py-2.5 text-gray-600">{supplier?.name || '—'}</td>
                  <td className="px-4 py-2.5 text-gray-600">{item.unit_size}</td>
                  <td className="px-4 py-2.5">
                    {priceEditId === item.id ? (
                      <div className="flex items-center gap-1">
                        <input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-20 border rounded px-1.5 py-0.5 text-sm" autoFocus placeholder="₱" />
                        <button onClick={() => handlePriceUpdate(item.id)} className="text-green-600 hover:text-green-700"><Check size={14} /></button>
                        <button onClick={() => setPriceEditId(null)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                      </div>
                    ) : (
                      <span className="font-mono">{formatPeso(item.price_centavos)}/{item.unit}</span>
                    )}
                    {item.price_history?.length > 0 && (
                      <button onClick={() => setExpandedHistory(expandedHistory === item.id ? null : item.id)} className="ml-2 text-gray-400 hover:text-gray-600">
                        {expandedHistory === item.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    )}
                    {expandedHistory === item.id && item.price_history?.length > 0 && (
                      <div className="mt-1 text-xs text-gray-400 space-y-0.5">
                        {item.price_history.slice(-3).reverse().map((h, i) => (
                          <div key={i}>{formatPeso(h.price)} — {new Date(h.date).toLocaleDateString('en-PH')}</div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setPriceEditId(item.id); setNewPrice((item.price_centavos / 100).toString()); }} className="text-gray-400 hover:text-navy" title="Update price">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => startEdit(item)} className="text-gray-400 hover:text-gold" title="Edit details">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-nred" title="Remove">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No ingredients in this category.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-2">{filtered.length} ingredient{filtered.length !== 1 ? 's' : ''} • Prices in centavos per unit</p>
    </div>
  );
}
