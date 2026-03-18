import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Calculator, ClipboardCheck,
  Trash2, ShieldAlert, BarChart3, ShoppingCart, TrendingUp, GlassWater, FileText, ExternalLink,
} from 'lucide-react';
import { NHILogo } from './BrandLogos';

const NAV = [
  { to: '/',         label: 'Dashboard',       icon: LayoutDashboard },
  { to: '/skus',     label: 'Product Bibles',  icon: BookOpen },
  { to: '/costing',  label: 'Recipe Costing',  icon: Calculator },
  { to: '/market',   label: 'Market List',     icon: ShoppingCart },
  { to: '/sales',    label: 'Sales Tracker',   icon: TrendingUp },
  { to: '/vessels',  label: 'Vessels',         icon: GlassWater },
  { to: '/qc',       label: 'QC Audit',        icon: ClipboardCheck },
  { to: '/waste',    label: 'Waste Log',       icon: Trash2 },
  { to: '/allergen', label: 'Allergen Matrix', icon: ShieldAlert },
  { to: '/kpi',      label: 'KPI Tracker',     icon: BarChart3 },
  { to: '/reports',  label: 'Reports',         icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen sidebar-gradient text-white flex flex-col no-print">
      {/* NHI Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-white/8">
        <NHILogo size={32} />
        <p className="text-[10px] text-white/30 mt-1.5 tracking-widest uppercase font-light">Product System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2">
        <p className="text-[10px] text-white/25 uppercase tracking-wider px-3 mb-2 font-medium">Operations</p>
        {NAV.slice(0, 6).map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-[13px] rounded-lg mb-0.5 transition-all ${
                isActive
                  ? 'bg-gold/15 text-gold font-medium shadow-sm shadow-gold/5'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              }`
            }
          >
            <Icon size={16} strokeWidth={isActive => isActive ? 2.5 : 1.5} />
            {label}
          </NavLink>
        ))}

        <p className="text-[10px] text-white/25 uppercase tracking-wider px-3 mt-4 mb-2 font-medium">Quality & Compliance</p>
        {NAV.slice(6).map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-[13px] rounded-lg mb-0.5 transition-all ${
                isActive
                  ? 'bg-gold/15 text-gold font-medium shadow-sm shadow-gold/5'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Switch App */}
      <div className="px-3 pb-2">
        <a
          href="https://nhi-ops-hub.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-[12px] rounded-lg text-white/40 hover:text-gold hover:bg-white/5 transition-all"
        >
          <ExternalLink size={13} />
          Switch to Ops Hub ↗
        </a>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-white/30">Phase 2 Active</span>
        </div>
        <p className="text-[10px] text-white/20 mt-1">Foundation Year 2026 · v2.0</p>
      </div>
    </aside>
  );
}
