import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AllergenMatrix from './pages/AllergenMatrix';
import RecipeCosting from './pages/RecipeCosting';
import QCAudit from './pages/QCAudit';
import WasteLog from './pages/WasteLog';
import KPITracker from './pages/KPITracker';
import ProductBibles from './pages/ProductBibles';
import MarketList from './pages/MarketList';
import SalesTracker from './pages/SalesTracker';
import VesselSystem from './pages/VesselSystem';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="skus" element={<ProductBibles />} />
        <Route path="costing" element={<RecipeCosting />} />
        <Route path="market" element={<MarketList />} />
        <Route path="sales" element={<SalesTracker />} />
        <Route path="vessels" element={<VesselSystem />} />
        <Route path="qc" element={<QCAudit />} />
        <Route path="waste" element={<WasteLog />} />
        <Route path="allergen" element={<AllergenMatrix />} />
        <Route path="kpi" element={<KPITracker />} />
      </Route>
    </Routes>
  );
}
