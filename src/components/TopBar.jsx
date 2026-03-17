import { useLocation } from 'react-router-dom';
import useAlertStore from '../store/alertStore';
import useSkuStore from '../store/skuStore';
import { AlertTriangle } from 'lucide-react';

const TITLES = {
  '/':         'Dashboard',
  '/skus':     'Product Bibles',
  '/costing':  'Recipe Costing',
  '/market':   'Market List',
  '/sales':    'Sales Tracker',
  '/qc':       'QC Audit Scorecard',
  '/waste':    'Daily Waste Log',
  '/allergen': 'Allergen Matrix',
  '/kpi':      'KPI Tracker',
};

export default function TopBar() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] || 'NHI Product System';
  const openAlerts = useAlertStore(s => s.getOpen());
  const totalSkus = useSkuStore(s => s.skus.length);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 no-print">
      <h2 className="text-lg font-semibold text-navy">{title}</h2>
      <div className="flex items-center gap-3">
        {openAlerts.length > 0 && (
          <span className="flex items-center gap-1.5 text-xs bg-gold/10 text-gold px-2 py-1 rounded font-medium">
            <AlertTriangle size={13} />
            {openAlerts.length} Alert{openAlerts.length > 1 ? 's' : ''}
          </span>
        )}
        <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded font-medium">Phase 2 Active</span>
        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">{totalSkus} SKUs</span>
      </div>
    </header>
  );
}
