import { useState } from 'react';
import { BRANDS, BRAND_LABELS, ALLERGEN_FIELDS } from '../data/seed';
import { isValidSKU, formatPeso } from '../utils/calculations';
import useSkuStore from '../store/skuStore';
import { BookOpen, ChevronRight, Plus, X, AlertCircle } from 'lucide-react';
import { BrandIcon, BRAND_COLORS } from '../components/BrandLogos';

const CATEGORIES = ['beverage', 'dessert', 'appetizer', 'ramen', 'main', 'side'];

const TABS = [
  { key: 'brand_identity', label: 'Brand Identity' },
  { key: 'operations', label: 'Operations' },
  { key: 'sensory', label: 'Sensory' },
  { key: 'commercials', label: 'Commercials' },
  { key: 'compliance', label: 'Compliance' },
  { key: 'digital_assets', label: 'Digital Assets' },
];

function NewSkuForm({ onSave, onCancel, preselectedBrand }) {
  const skus = useSkuStore(s => s.skus);
  const [form, setForm] = useState({
    sku_code: '',
    product_name: '',
    brand: preselectedBrand !== 'all' ? preselectedBrand : BRANDS[0],
    category: 'beverage',
    selling_price: '',
    allergens: {},
  });
  const [errors, setErrors] = useState({});

  const set = (field, val) => setForm({ ...form, [field]: val });

  const toggleAllergen = (key) => {
    const next = { ...form.allergens };
    if (next[key]) delete next[key];
    else next[key] = true;
    setForm({ ...form, allergens: next });
  };

  const setAllergenNote = (key, note) => {
    setForm({ ...form, allergens: { ...form.allergens, [key]: note || true } });
  };

  const validate = () => {
    const e = {};
    if (!form.sku_code.trim()) e.sku_code = 'Required';
    else if (!isValidSKU(form.sku_code.trim().toUpperCase())) e.sku_code = 'Must be CAT-TYPE-### (e.g. BEV-YML-001)';
    else if (skus.some(s => s.sku_code === form.sku_code.trim().toUpperCase())) e.sku_code = 'SKU already exists';
    if (!form.product_name.trim()) e.product_name = 'Required';
    if (!form.selling_price || Number(form.selling_price) <= 0) e.selling_price = 'Must be > 0';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      sku_code: form.sku_code.trim().toUpperCase(),
      product_name: form.product_name.trim(),
      brand: form.brand,
      category: form.category,
      selling_price: Math.round(Number(form.selling_price) * 100),
      allergens: form.allergens,
    });
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Plus size={18} className="text-gold" /> Add New Product
        </h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">SKU Code *</label>
          <input
            value={form.sku_code}
            onChange={e => set('sku_code', e.target.value.toUpperCase())}
            placeholder="e.g. BEV-YML-002"
            className={`w-full border rounded px-3 py-2 text-sm font-mono ${errors.sku_code ? 'border-nred' : ''}`}
          />
          {errors.sku_code && <p className="text-[11px] text-nred mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.sku_code}</p>}
          <p className="text-[10px] text-gray-400 mt-1">Format: CAT-TYPE-### (e.g. BEV-YML-001, DST-MTCH-002)</p>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Product Name *</label>
          <input
            value={form.product_name}
            onChange={e => set('product_name', e.target.value)}
            placeholder="e.g. Okinawa Milk Tea"
            className={`w-full border rounded px-3 py-2 text-sm ${errors.product_name ? 'border-nred' : ''}`}
          />
          {errors.product_name && <p className="text-[11px] text-nred mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.product_name}</p>}
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Brand *</label>
          <select value={form.brand} onChange={e => set('brand', e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
            {BRANDS.map(b => <option key={b} value={b}>{BRAND_LABELS[b]}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Category *</label>
          <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
            {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Selling Price (₱) *</label>
          <input
            type="number"
            value={form.selling_price}
            onChange={e => set('selling_price', e.target.value)}
            placeholder="e.g. 280"
            className={`w-full border rounded px-3 py-2 text-sm ${errors.selling_price ? 'border-nred' : ''}`}
          />
          {errors.selling_price && <p className="text-[11px] text-nred mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.selling_price}</p>}
          <p className="text-[10px] text-gray-400 mt-1">In pesos (stored as centavos internally)</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs text-gray-500 block mb-2">Allergens</label>
        <div className="grid grid-cols-4 gap-2">
          {ALLERGEN_FIELDS.map(a => {
            const active = !!form.allergens[a.key];
            return (
              <div key={a.key}>
                <button
                  type="button"
                  onClick={() => toggleAllergen(a.key)}
                  className={`w-full text-left px-2.5 py-1.5 rounded border text-xs flex items-center gap-1.5 transition-colors ${
                    active ? 'bg-red-50 border-nred/30 text-nred' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  <span>{a.emoji}</span>
                  <span>{a.label}</span>
                </button>
                {active && (
                  <input
                    value={typeof form.allergens[a.key] === 'string' ? form.allergens[a.key] : ''}
                    onChange={e => setAllergenNote(a.key, e.target.value)}
                    placeholder="Note (optional)"
                    className="w-full border rounded px-2 py-1 text-[10px] mt-1"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleSubmit} className="bg-navy text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-navy/90 flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
        <button onClick={onCancel} className="border px-6 py-2.5 rounded text-sm text-gray-500 hover:bg-gray-50">Cancel</button>
      </div>
    </div>
  );
}

function BibleForm({ sku }) {
  const [tab, setTab] = useState('brand_identity');
  const [data, setData] = useState({});

  const set = (field, val) => setData({ ...data, [`${tab}.${field}`]: val });
  const get = (field) => data[`${tab}.${field}`] || '';

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={18} className="text-gold" />
        <h3 className="font-semibold">{sku.sku_code} — {sku.product_name}</h3>
        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded ml-2">{BRAND_LABELS[sku.brand]}</span>
      </div>

      <div className="flex gap-1 mb-4 border-b overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-2 text-xs whitespace-nowrap border-b-2 transition-colors ${
              tab === t.key ? 'border-gold text-gold font-medium' : 'border-transparent text-gray-500 hover:text-navy'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {tab === 'brand_identity' && (
          <>
            <Field label="Brand Story" value={get('brand_story')} onChange={v => set('brand_story', v)} type="textarea" />
            <Field label="Product Description" value={get('description')} onChange={v => set('description', v)} type="textarea" />
            <Field label="Target Customer" value={get('target_customer')} onChange={v => set('target_customer', v)} />
          </>
        )}
        {tab === 'operations' && (
          <>
            <Field label="Prep Time (min)" value={get('prep_time')} onChange={v => set('prep_time', v)} type="number" />
            <Field label="Cook Time (min)" value={get('cook_time')} onChange={v => set('cook_time', v)} type="number" />
            <Field label="Portion Size" value={get('portion_size')} onChange={v => set('portion_size', v)} />
            <Field label="Assembly Steps" value={get('assembly_steps')} onChange={v => set('assembly_steps', v)} type="textarea" />
          </>
        )}
        {tab === 'sensory' && (
          <>
            <Field label="Appearance Standard" value={get('appearance')} onChange={v => set('appearance', v)} type="textarea" />
            <Field label="Taste Profile" value={get('taste')} onChange={v => set('taste', v)} type="textarea" />
            <Field label="Aroma" value={get('aroma')} onChange={v => set('aroma', v)} />
            <Field label="Texture" value={get('texture')} onChange={v => set('texture', v)} />
          </>
        )}
        {tab === 'commercials' && (
          <>
            <div className="text-sm">
              <span className="text-gray-500">Selling Price: </span>
              <span className="font-semibold">{formatPeso(sku.selling_price)}</span>
            </div>
            <Field label="Target BC%" value={get('target_bc')} onChange={v => set('target_bc', v)} />
            <Field label="Menu Engineering Class" value={get('menu_class')} onChange={v => set('menu_class', v)} placeholder="Star / Plowhorse / Puzzle / Dog" />
          </>
        )}
        {tab === 'compliance' && (
          <>
            <div className="text-sm bg-yellow-50 border border-yellow-200 rounded p-3">
              Allergens: {Object.entries(sku.allergens || {}).filter(([,v]) => v).map(([k, v]) => (
                <span key={k} className="inline-block bg-white border rounded px-2 py-0.5 mr-1 text-xs">
                  {k}{typeof v === 'string' ? `: ${v}` : ''}
                </span>
              ))}
              {Object.keys(sku.allergens || {}).length === 0 && <span className="text-gray-400">None documented</span>}
            </div>
            <Field label="Storage Requirements" value={get('storage')} onChange={v => set('storage', v)} type="textarea" />
            <Field label="Shelf Life" value={get('shelf_life')} onChange={v => set('shelf_life', v)} />
          </>
        )}
        {tab === 'digital_assets' && (
          <>
            <Field label="Hero Photo URL" value={get('hero_photo')} onChange={v => set('hero_photo', v)} placeholder="Link to product photo" />
            <Field label="Plating Reference URL" value={get('plating_ref')} onChange={v => set('plating_ref', v)} placeholder="Link to plating card" />
            <Field label="Notes" value={get('notes')} onChange={v => set('notes', v)} type="textarea" />
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder }) {
  const cls = "w-full border rounded px-3 py-2 text-sm";
  return (
    <div>
      <label className="text-xs text-gray-500 block mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} className={cls} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}

export default function ProductBibles() {
  const skus = useSkuStore(s => s.skus);
  const addSku = useSkuStore(s => s.addSku);
  const [selectedSku, setSelectedSku] = useState(null);
  const [brandFilter, setBrandFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = skus.filter(s => brandFilter === 'all' || s.brand === brandFilter);

  if (selectedSku) {
    const sku = skus.find(s => s.sku_code === selectedSku);
    if (!sku) { setSelectedSku(null); return null; }
    return (
      <div>
        <button onClick={() => setSelectedSku(null)} className="text-xs text-gray-400 hover:text-navy mb-4 flex items-center gap-1 transition-colors">&larr; Back to SKU list</button>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <BibleForm sku={sku} />
        </div>
      </div>
    );
  }

  if (showAddForm) {
    return (
      <div>
        <button onClick={() => setShowAddForm(false)} className="text-sm text-gold hover:text-gold/80 mb-4">&larr; Back to SKU list</button>
        <NewSkuForm
          preselectedBrand={brandFilter}
          onCancel={() => setShowAddForm(false)}
          onSave={(sku) => {
            addSku(sku);
            setShowAddForm(false);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex gap-1.5">
          <button onClick={() => setBrandFilter('all')} className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${brandFilter === 'all' ? 'bg-navy text-white' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'}`}>All Brands</button>
          {BRANDS.map(b => {
            const bc = BRAND_COLORS[b];
            return (
              <button key={b} onClick={() => setBrandFilter(b)} className={`px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1.5 ${brandFilter === b ? 'text-white' : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'}`} style={brandFilter === b ? { background: bc.primary } : {}}>
                <BrandIcon brand={b} size={14} />
                {BRAND_LABELS[b]}
              </button>
            );
          })}
        </div>
        <span className="text-[11px] text-gray-400">{filtered.length} products</span>
        <button
          onClick={() => setShowAddForm(true)}
          className="ml-auto bg-navy text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-navy/90 flex items-center gap-2"
        >
          <Plus size={14} /> Add New Product
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(sku => {
          const bc = BRAND_COLORS[sku.brand];
          return (
            <button
              key={sku.sku_code}
              onClick={() => setSelectedSku(sku.sku_code)}
              className={`bg-white rounded-xl border border-gray-100 p-4 text-left hover:shadow-md transition-all group brand-accent-${sku.brand}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 tracking-wider">{sku.sku_code}</span>
                <ChevronRight size={14} className="text-gray-200 group-hover:text-gold transition-colors" />
              </div>
              <p className="font-semibold mt-1.5 text-navy">{sku.product_name}</p>
              <div className="flex items-center gap-2 mt-2.5">
                <BrandIcon brand={sku.brand} size={18} />
                <span className="text-[10px] font-medium" style={{ color: bc?.primary }}>{BRAND_LABELS[sku.brand]}</span>
                <span className="text-[10px] bg-gray-50 px-1.5 py-0.5 rounded capitalize text-gray-400">{sku.category}</span>
                <span className="text-[10px] text-gray-400 ml-auto font-mono">{formatPeso(sku.selling_price)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
