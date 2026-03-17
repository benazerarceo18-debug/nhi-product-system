import { useState, Fragment } from 'react';
import { INITIAL_SKUS, BRANDS, BRAND_LABELS, ALLERGEN_FIELDS } from '../data/seed';
import { Printer, Search, AlertTriangle } from 'lucide-react';

export default function AllergenMatrix() {
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');

  const filtered = INITIAL_SKUS.filter(s => {
    if (brandFilter !== 'all' && s.brand !== brandFilter) return false;
    if (search && !s.product_name.toLowerCase().includes(search.toLowerCase()) && !s.sku_code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const grouped = BRANDS.reduce((acc, b) => {
    const items = filtered.filter(s => s.brand === b);
    if (items.length) acc.push({ brand: b, items });
    return acc;
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 no-print">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-2.5 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search SKU or product..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 border rounded text-sm w-64"
            />
          </div>
          <select
            value={brandFilter}
            onChange={e => setBrandFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="all">All Brands</option>
            {BRANDS.map(b => <option key={b} value={b}>{BRAND_LABELS[b]}</option>)}
          </select>
        </div>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded text-sm hover:bg-navy/90">
          <Printer size={16} /> Print
        </button>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start gap-2 text-sm">
        <AlertTriangle size={18} className="text-nred mt-0.5 shrink-0" />
        <div>
          <strong className="text-nred">Critical Protocol:</strong> Tree nut items (Hazelnut Hojicha, Almond Hojicha) require <strong>verbal customer disclosure</strong> before serving. 8 major allergens tracked per FDA/DTI Philippines.
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-white">
              <th className="text-left px-3 py-2.5 font-medium">SKU</th>
              <th className="text-left px-3 py-2.5 font-medium">Product</th>
              {ALLERGEN_FIELDS.map(a => (
                <th key={a.key} className="text-center px-2 py-2.5 font-medium whitespace-nowrap">
                  <span className="block">{a.emoji}</span>
                  <span className="text-[10px] font-normal">{a.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grouped.map(({ brand, items }) => (
              <Fragment key={brand}>
                <tr>
                  <td colSpan={2 + ALLERGEN_FIELDS.length} className="bg-gray-50 px-3 py-1.5 font-semibold text-navy text-xs uppercase tracking-wide">
                    {BRAND_LABELS[brand]}
                  </td>
                </tr>
                {items.map(sku => (
                  <tr key={sku.sku_code} className="border-t hover:bg-light/50">
                    <td className="px-3 py-2 font-mono text-xs">{sku.sku_code}</td>
                    <td className="px-3 py-2">{sku.product_name}</td>
                    {ALLERGEN_FIELDS.map(a => {
                      const val = sku.allergens?.[a.key];
                      const isCritical = typeof val === 'string' && val.includes('CRITICAL');
                      return (
                        <td key={a.key} className={`text-center px-2 py-2 ${isCritical ? 'bg-red-50' : ''}`}>
                          {val === true && <span className="text-nred font-bold">●</span>}
                          {typeof val === 'string' && (
                            <span className={`text-[10px] leading-tight block ${isCritical ? 'text-nred font-bold' : 'text-orange-600'}`} title={val}>
                              ⚠
                            </span>
                          )}
                          {!val && <span className="text-gray-200">—</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-500 flex gap-6">
        <span><span className="text-nred font-bold">●</span> Contains allergen</span>
        <span><span className="text-orange-600">⚠</span> Contains with note</span>
        <span><span className="text-gray-300">—</span> Not present</span>
      </div>
    </div>
  );
}
