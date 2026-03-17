import { useState } from 'react';
import { BRANDS, BRAND_LABELS, LOCATIONS } from '../data/seed';
import useSkuStore from '../store/skuStore';
import { calcQCScore, getQCStatus, QC_WEIGHTS } from '../utils/calculations';
import { ClipboardCheck } from 'lucide-react';

const CRITERIA = [
  { key: 'appearance',  label: 'Appearance',  weight: QC_WEIGHTS.appearance },
  { key: 'portion',     label: 'Portion Size', weight: QC_WEIGHTS.portion },
  { key: 'temperature', label: 'Temperature',  weight: QC_WEIGHTS.temperature },
  { key: 'taste',       label: 'Taste/Flavor', weight: QC_WEIGHTS.taste },
  { key: 'assembly',    label: 'Assembly/Plating', weight: QC_WEIGHTS.assembly },
];

export default function QCAudit() {
  const [brand, setBrand] = useState(BRANDS[0]);
  const [location, setLocation] = useState('');
  const allSkus = useSkuStore(s => s.skus);
  const [skuCode, setSkuCode] = useState(allSkus[0]?.sku_code || '');
  const [auditor, setAuditor] = useState('');
  const [scores, setScores] = useState({ appearance: 85, portion: 85, temperature: 85, taste: 85, assembly: 85 });
  const [corrective, setCorrective] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalScore = calcQCScore(scores);
  const status = getQCStatus(totalScore);

  const updateScore = (key, val) => setScores({ ...scores, [key]: Number(val) });

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const brandSkus = allSkus.filter(s => s.brand === brand);

  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Brand</label>
          <select value={brand} onChange={e => { setBrand(e.target.value); setSkuCode(''); setLocation(''); }} className="w-full border rounded px-3 py-2 text-sm">
            {BRANDS.map(b => <option key={b} value={b}>{BRAND_LABELS[b]}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
            <option value="">Select location...</option>
            {(LOCATIONS[brand] || []).map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">SKU</label>
          <select value={skuCode} onChange={e => setSkuCode(e.target.value)} className="w-full border rounded px-3 py-2 text-sm">
            <option value="">Select SKU...</option>
            {brandSkus.map(s => <option key={s.sku_code} value={s.sku_code}>{s.sku_code} — {s.product_name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Auditor</label>
          <input value={auditor} onChange={e => setAuditor(e.target.value)} placeholder="Your name" className="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4 mb-4">
        <h3 className="text-sm font-semibold mb-4">Quality Scoring</h3>
        {CRITERIA.map(c => (
          <div key={c.key} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{c.label} <span className="text-xs text-gray-400">({(c.weight * 100).toFixed(0)}% weight)</span></span>
              <span className="font-mono font-bold">{scores[c.key]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={scores[c.key]}
              onChange={e => updateScore(c.key, e.target.value)}
              className="w-full accent-gold"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>0</span><span>50</span><span>100</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border p-4 mb-4 text-center">
        <p className="text-xs text-gray-500 mb-1">Weighted Score</p>
        <p className="text-4xl font-bold" style={{ color: status.color === 'green' ? '#16a34a' : status.color === 'blue' ? '#2563eb' : '#c0392b' }}>
          {totalScore.toFixed(1)}
        </p>
        <p className="text-sm mt-1" style={{ color: status.color === 'green' ? '#16a34a' : status.color === 'blue' ? '#2563eb' : '#c0392b' }}>
          {status.label}
        </p>
        {totalScore < 80 && (
          <p className="text-xs text-nred mt-2 bg-red-50 rounded p-2">Immediate retraining required per NHI QC protocol</p>
        )}
      </div>

      {totalScore < 80 && (
        <div className="bg-white rounded-lg border p-4 mb-4">
          <label className="text-xs text-gray-500 block mb-1">Corrective Actions Required</label>
          <textarea
            value={corrective}
            onChange={e => setCorrective(e.target.value)}
            rows={3}
            placeholder="Detail required corrective actions..."
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-navy text-white py-3 rounded-lg text-sm font-medium hover:bg-navy/90 flex items-center justify-center gap-2"
      >
        <ClipboardCheck size={16} />
        {submitted ? 'Saved!' : 'Submit Audit'}
      </button>
    </div>
  );
}
