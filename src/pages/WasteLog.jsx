import { useState } from 'react';
import { BRANDS, BRAND_LABELS } from '../data/seed';
import { calcWasteTotal, getWasteStatus, formatPeso, formatPct } from '../utils/calculations';
import { Plus, Trash2, Save } from 'lucide-react';

const EMPTY_ENTRY = { item: '', qty: '', unit: 'pcs', cost_centavos: 0, reason: '' };
const REASONS = ['Overproduction', 'Expired', 'Spillage', 'Customer return', 'Prep error', 'Equipment failure', 'Other'];

export default function WasteLog() {
  const [brand, setBrand] = useState(BRANDS[0]);
  const [location, setLocation] = useState('');
  const [kmName, setKmName] = useState('');
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailySales, setDailySales] = useState(0);
  const [entries, setEntries] = useState([{ ...EMPTY_ENTRY }]);
  const [saved, setSaved] = useState(false);

  const totalWaste = calcWasteTotal(entries);
  const wastePct = dailySales > 0 ? (totalWaste / (dailySales * 100)) * 100 : 0;
  const wasteStatus = getWasteStatus(wastePct);

  const addEntry = () => setEntries([...entries, { ...EMPTY_ENTRY }]);
  const removeEntry = (i) => setEntries(entries.filter((_, idx) => idx !== i));
  const updateEntry = (i, field, val) => {
    const next = [...entries];
    next[i] = { ...next[i], [field]: field === 'cost_centavos' ? Number(val) * 100 : field === 'qty' ? Number(val) : val };
    setEntries(next);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Date</label>
          <input type="date" value={logDate} onChange={e => setLogDate(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Brand</label>
          <select value={brand} onChange={e => setBrand(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
            {BRANDS.map(b => <option key={b} value={b}>{BRAND_LABELS[b]}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Location</label>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. BGC" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Kitchen Manager</label>
          <input value={kmName} onChange={e => setKmName(e.target.value)} placeholder="KM name" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Waste Entries</h3>
          <div>
            <label className="text-xs text-gray-500 mr-2">Daily Sales (₱)</label>
            <input type="number" value={dailySales || ''} onChange={e => setDailySales(Number(e.target.value))} className="border rounded px-2 py-1 text-sm w-28" />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b">
              <th className="pb-2">Item</th>
              <th className="pb-2 w-20">Qty</th>
              <th className="pb-2 w-20">Unit</th>
              <th className="pb-2 w-28">Cost (₱)</th>
              <th className="pb-2">Reason</th>
              <th className="pb-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i} className="border-t">
                <td className="py-1.5 pr-2">
                  <input value={e.item} onChange={ev => updateEntry(i, 'item', ev.target.value)} placeholder="Item name" className="w-full border rounded px-2 py-1 text-sm" />
                </td>
                <td className="py-1.5 pr-2">
                  <input type="number" value={e.qty || ''} onChange={ev => updateEntry(i, 'qty', ev.target.value)} className="w-full border rounded px-2 py-1 text-sm" />
                </td>
                <td className="py-1.5 pr-2">
                  <input value={e.unit} onChange={ev => updateEntry(i, 'unit', ev.target.value)} className="w-full border rounded px-2 py-1 text-sm" />
                </td>
                <td className="py-1.5 pr-2">
                  <input type="number" value={e.cost_centavos / 100 || ''} onChange={ev => updateEntry(i, 'cost_centavos', ev.target.value)} className="w-full border rounded px-2 py-1 text-sm" />
                </td>
                <td className="py-1.5 pr-2">
                  <select value={e.reason} onChange={ev => updateEntry(i, 'reason', ev.target.value)} className="w-full border rounded px-2 py-1 text-sm">
                    <option value="">Select...</option>
                    {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="py-1.5">
                  <button onClick={() => removeEntry(i)} className="text-gray-400 hover:text-nred"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addEntry} className="mt-2 flex items-center gap-1 text-xs text-gold hover:text-gold/80">
          <Plus size={14} /> Add Entry
        </button>
      </div>

      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">Total Waste</p>
            <p className="text-2xl font-bold text-nred">{formatPeso(totalWaste)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Waste % of Sales</p>
            <p className="text-2xl font-bold" style={{ color: wasteStatus.color === 'green' ? '#16a34a' : wasteStatus.color === 'orange' ? '#ea580c' : '#c0392b' }}>
              {dailySales > 0 ? formatPct(wastePct) : '—'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm mt-2" style={{ color: wasteStatus.color === 'green' ? '#16a34a' : wasteStatus.color === 'orange' ? '#ea580c' : '#c0392b' }}>
              {dailySales > 0 ? wasteStatus.label : 'Enter daily sales'}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-navy text-white py-3 rounded-lg text-sm font-medium hover:bg-navy/90 flex items-center justify-center gap-2"
      >
        <Save size={16} />
        {saved ? 'Saved!' : 'Save Waste Log'}
      </button>
    </div>
  );
}
