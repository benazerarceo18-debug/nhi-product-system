import { useState } from 'react';
import { VESSEL_CATEGORIES, BRAND_LABELS, BRANDS } from '../data/seed';
import useVesselStore from '../store/vesselStore';
import useSkuStore from '../store/skuStore';
import { formatPeso } from '../utils/calculations';
import { Plus, X, Pencil, Trash2, Leaf, Package } from 'lucide-react';

const EMPTY_VESSEL = { code: '', category: 'Glassware', item: '', size: '', material: '', supplier: '', cost_centavos: 0, eco: false, status: 'active' };

export default function VesselSystem() {
  const items = useVesselStore(s => s.items);
  const addItem = useVesselStore(s => s.addItem);
  const updateItem = useVesselStore(s => s.updateItem);
  const removeItem = useVesselStore(s => s.removeItem);
  const skuVesselMap = useVesselStore(s => s.skuVesselMap);
  const setSkuVessels = useVesselStore(s => s.setSkuVessels);
  const allSkus = useSkuStore(s => s.skus);

  const [catFilter, setCatFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_VESSEL });

  // SKU-Vessel mapping state
  const [mapBrand, setMapBrand] = useState(BRANDS[0]);
  const [mapSku, setMapSku] = useState('');
  const [mapContext, setMapContext] = useState('dine_in');
  const [mapVessel, setMapVessel] = useState('');

  const filtered = catFilter === 'All' ? items : items.filter(v => v.category === catFilter);

  const startEdit = (v) => {
    setEditId(v.id);
    setForm({ code: v.code, category: v.category, item: v.item, size: v.size, material: v.material, supplier: v.supplier, cost_centavos: v.cost_centavos, eco: v.eco, status: v.status });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.code || !form.item) return;
    if (editId) {
      updateItem(editId, form);
    } else {
      addItem(form);
    }
    setForm({ ...EMPTY_VESSEL });
    setEditId(null);
    setShowForm(false);
  };

  const handleCancel = () => {
    setForm({ ...EMPTY_VESSEL });
    setEditId(null);
    setShowForm(false);
  };

  const brandSkus = allSkus.filter(s => s.brand === mapBrand);
  const currentMappings = mapSku ? (skuVesselMap[mapSku] || []) : [];

  const addMapping = () => {
    if (!mapSku || !mapVessel) return;
    const existing = skuVesselMap[mapSku] || [];
    if (existing.some(m => m.vessel_code === mapVessel && m.context === mapContext)) return;
    setSkuVessels(mapSku, [...existing, { vessel_code: mapVessel, context: mapContext }]);
    setMapVessel('');
  };

  const removeMapping = (skuCode, vesselCode, context) => {
    const existing = skuVesselMap[skuCode] || [];
    setSkuVessels(skuCode, existing.filter(m => !(m.vessel_code === vesselCode && m.context === context)));
  };

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
        {VESSEL_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCatFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              catFilter === cat ? 'bg-navy text-white' : 'bg-white text-gray-500 border hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vessel Table */}
      <div className="bg-white rounded-lg border overflow-hidden mb-6">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-sm font-semibold text-navy">Vessels & Packaging ({filtered.length})</h3>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm({ ...EMPTY_VESSEL }); }} className="flex items-center gap-1 text-xs text-gold hover:text-gold/80 font-medium">
            <Plus size={14} /> Add Item
          </button>
        </div>

        {showForm && (
          <div className="px-4 py-3 bg-light border-b">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="VES-XX-000" className="border rounded px-2 py-1.5 text-sm" />
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="border rounded px-2 py-1.5 text-sm">
                {VESSEL_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input value={form.item} onChange={e => setForm({ ...form, item: e.target.value })} placeholder="Item name" className="border rounded px-2 py-1.5 text-sm" />
              <input value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} placeholder="Size" className="border rounded px-2 py-1.5 text-sm" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <input value={form.material} onChange={e => setForm({ ...form, material: e.target.value })} placeholder="Material" className="border rounded px-2 py-1.5 text-sm" />
              <input value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} placeholder="Supplier" className="border rounded px-2 py-1.5 text-sm" />
              <input type="number" value={form.cost_centavos / 100 || ''} onChange={e => setForm({ ...form, cost_centavos: Math.round(Number(e.target.value) * 100) })} placeholder="Cost (₱)" className="border rounded px-2 py-1.5 text-sm" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.eco} onChange={e => setForm({ ...form, eco: e.target.checked })} className="accent-green-600" />
                Eco-friendly
              </label>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="bg-navy text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-navy/90">{editId ? 'Update' : 'Add'}</button>
              <button onClick={handleCancel} className="text-gray-500 px-4 py-1.5 rounded text-xs border hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b bg-gray-50">
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Material</th>
                <th className="px-4 py-2">Supplier</th>
                <th className="px-4 py-2 text-right">Cost</th>
                <th className="px-4 py-2 text-center">Eco</th>
                <th className="px-4 py-2 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id} className="border-t hover:bg-gray-50/50">
                  <td className="px-4 py-2 font-mono text-xs">{v.code}</td>
                  <td className="px-4 py-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{v.category}</span>
                  </td>
                  <td className="px-4 py-2">{v.item}</td>
                  <td className="px-4 py-2 text-gray-500">{v.size}</td>
                  <td className="px-4 py-2 text-gray-500">{v.material}</td>
                  <td className="px-4 py-2 text-gray-500 text-xs">{v.supplier}</td>
                  <td className="px-4 py-2 text-right font-mono text-xs">{formatPeso(v.cost_centavos)}</td>
                  <td className="px-4 py-2 text-center">{v.eco && <Leaf size={14} className="text-green-500 inline" />}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-1">
                      <button onClick={() => startEdit(v)} className="text-gray-400 hover:text-gold"><Pencil size={13} /></button>
                      <button onClick={() => removeItem(v.id)} className="text-gray-400 hover:text-nred"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SKU-Vessel Mapping */}
      <div className="bg-white rounded-lg border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Package size={16} className="text-navy" />
          <h3 className="text-sm font-semibold text-navy">SKU-Vessel Mapping</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Brand</label>
            <select value={mapBrand} onChange={e => { setMapBrand(e.target.value); setMapSku(''); }} className="w-full border rounded px-2 py-1.5 text-sm">
              {BRANDS.map(b => <option key={b} value={b}>{BRAND_LABELS[b]}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">SKU</label>
            <select value={mapSku} onChange={e => setMapSku(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm">
              <option value="">Select SKU...</option>
              {brandSkus.map(s => <option key={s.sku_code} value={s.sku_code}>{s.sku_code} — {s.product_name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Context</label>
            <select value={mapContext} onChange={e => setMapContext(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm">
              <option value="dine_in">Dine-in</option>
              <option value="takeout">Takeout</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Vessel</label>
            <div className="flex gap-1">
              <select value={mapVessel} onChange={e => setMapVessel(e.target.value)} className="flex-1 border rounded px-2 py-1.5 text-sm">
                <option value="">Select vessel...</option>
                {items.map(v => <option key={v.id} value={v.code}>{v.code} — {v.item}</option>)}
              </select>
              <button onClick={addMapping} disabled={!mapSku || !mapVessel} className="bg-navy text-white px-3 py-1.5 rounded text-xs hover:bg-navy/90 disabled:opacity-30">+</button>
            </div>
          </div>
        </div>

        {mapSku && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Mappings for <span className="font-mono font-medium text-navy">{mapSku}</span></p>
            {currentMappings.length === 0 ? (
              <p className="text-xs text-gray-400">No vessels assigned yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {currentMappings.map((m, i) => {
                  const vessel = items.find(v => v.code === m.vessel_code);
                  return (
                    <span key={i} className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${
                      m.context === 'dine_in' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                    }`}>
                      {m.context === 'dine_in' ? 'Dine-in' : 'Takeout'}: {vessel?.item || m.vessel_code}
                      <button onClick={() => removeMapping(mapSku, m.vessel_code, m.context)} className="hover:text-nred"><X size={12} /></button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
