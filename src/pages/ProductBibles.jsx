import { useState } from 'react';
import { INITIAL_SKUS, BRANDS, BRAND_LABELS } from '../data/seed';
import { isValidSKU, formatPeso } from '../utils/calculations';
import { BookOpen, ChevronRight } from 'lucide-react';

const TABS = [
  { key: 'brand_identity', label: 'Brand Identity' },
  { key: 'operations', label: 'Operations' },
  { key: 'sensory', label: 'Sensory' },
  { key: 'commercials', label: 'Commercials' },
  { key: 'compliance', label: 'Compliance' },
  { key: 'digital_assets', label: 'Digital Assets' },
];

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

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        {TABS.map(t => {
          const filled = ['brand_story', 'description', 'prep_time', 'assembly_steps', 'appearance', 'taste', 'target_bc', 'storage', 'hero_photo']
            .some(f => data[`${t.key}.${f === 'brand_story' && t.key === 'brand_identity' ? f : Object.keys(data).find(k => k.startsWith(t.key)) ? f : ''}`]);
          return <span key={t.key} className={`w-3 h-3 rounded-full ${filled ? 'bg-green-400' : 'bg-gray-200'}`} title={t.label} />;
        })}
        <span className="ml-1">Section completion</span>
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
  const [selectedSku, setSelectedSku] = useState(null);
  const [brandFilter, setBrandFilter] = useState('all');

  const filtered = INITIAL_SKUS.filter(s => brandFilter === 'all' || s.brand === brandFilter);

  if (selectedSku) {
    const sku = INITIAL_SKUS.find(s => s.sku_code === selectedSku);
    return (
      <div>
        <button onClick={() => setSelectedSku(null)} className="text-sm text-gold hover:text-gold/80 mb-4">&larr; Back to SKU list</button>
        <div className="bg-white rounded-lg border p-6">
          <BibleForm sku={sku} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="border rounded px-3 py-2 text-sm">
          <option value="all">All Brands</option>
          {BRANDS.map(b => <option key={b} value={b}>{BRAND_LABELS[b]}</option>)}
        </select>
        <span className="text-xs text-gray-500">{filtered.length} products</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(sku => (
          <button
            key={sku.sku_code}
            onClick={() => setSelectedSku(sku.sku_code)}
            className="bg-white rounded-lg border p-4 text-left hover:border-gold transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">{sku.sku_code}</span>
              <ChevronRight size={14} className="text-gray-300 group-hover:text-gold" />
            </div>
            <p className="font-medium mt-1">{sku.product_name}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{BRAND_LABELS[sku.brand]}</span>
              <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded capitalize">{sku.category}</span>
              <span className="text-[10px] text-gray-400 ml-auto">{formatPeso(sku.selling_price)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
