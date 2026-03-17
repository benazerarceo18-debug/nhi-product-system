import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Calculator, ClipboardCheck,
  Trash2, ShieldAlert, BarChart3,
} from 'lucide-react';

const NAV = [
  { to: '/',         label: 'Dashboard',      icon: LayoutDashboard },
  { to: '/skus',     label: 'Product Bibles',  icon: BookOpen },
  { to: '/costing',  label: 'Recipe Costing',  icon: Calculator },
  { to: '/qc',       label: 'QC Audit',        icon: ClipboardCheck },
  { to: '/waste',    label: 'Waste Log',        icon: Trash2 },
  { to: '/allergen', label: 'Allergen Matrix',  icon: ShieldAlert },
  { to: '/kpi',      label: 'KPI Tracker',      icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-navy text-white flex flex-col no-print">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-lg font-bold tracking-wide text-gold">NHI</h1>
        <p className="text-xs text-white/50">Product System</p>
      </div>
      <nav className="flex-1 py-2">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-gold/20 text-gold border-r-2 border-gold font-medium'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 text-xs text-white/30">
        v1.0 — Foundation Year 2026
      </div>
    </aside>
  );
}
