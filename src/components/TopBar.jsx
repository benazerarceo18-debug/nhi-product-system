import { useLocation } from 'react-router-dom';
import useAlertStore from '../store/alertStore';
import useSkuStore from '../store/skuStore';
import { AlertTriangle, Bell } from 'lucide-react';
import { NHIMonogram } from './BrandLogos';

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

const SUBTITLES = {
  '/':         'System overview & KPI tracking',
  '/skus':     'SKU registry & documentation',
  '/costing':  'Ingredient costing & FC% analysis',
  '/market':   'Centralized ingredient price database',
  '/sales':    'Daily sales & theoretical consumption',
  '/qc':       'Weighted quality audit scoring',
  '/waste':    'Daily waste tracking & analysis',
  '/allergen': 'FDA/DTI 8 major allergens',
  '/kpi':      'Monthly performance metrics',
};

export default function TopBar() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] || 'NHI Product System';
  const subtitle = SUBTITLES[pathname] || '';
  const openAlerts = useAlertStore(s => s.getOpen());
  const totalSkus = useSkuStore(s => s.skus.length);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 no-print">
      <div>
        <h2 className="text-lg font-semibold text-navy tracking-tight">{title}</h2>
        {subtitle && <p className="text-[11px] text-gray-400 -mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2.5">
        {openAlerts.length > 0 && (
          <button className="relative flex items-center gap-1.5 text-xs bg-gold/8 text-gold px-3 py-1.5 rounded-lg font-medium hover:bg-gold/15 transition-colors">
            <Bell size={13} />
            {openAlerts.length} Alert{openAlerts.length > 1 ? 's' : ''}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full animate-pulse" />
          </button>
        )}
        <span className="text-[11px] bg-navy/5 text-navy/70 px-2.5 py-1 rounded-md font-medium">{totalSkus} SKUs</span>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-navy/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-navy">BA</span>
          </div>
        </div>
      </div>
    </header>
  );
}
