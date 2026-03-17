import { create } from 'zustand';
import { INITIAL_VESSELS } from '../data/seed';

const useVesselStore = create((set, get) => ({
  items: INITIAL_VESSELS.map((v, i) => ({ ...v, id: `v${String(i + 1).padStart(3, '0')}` })),
  skuVesselMap: {},

  addItem: (item) => set(s => ({ items: [...s.items, { ...item, id: `v${String(s.items.length + 1).padStart(3, '0')}` }] })),

  updateItem: (id, data) => set(s => ({
    items: s.items.map(v => v.id === id ? { ...v, ...data } : v),
  })),

  removeItem: (id) => set(s => ({ items: s.items.filter(v => v.id !== id) })),

  setSkuVessels: (skuCode, vessels) => set(s => ({
    skuVesselMap: { ...s.skuVesselMap, [skuCode]: vessels },
  })),

  getVesselsForSku: (skuCode) => get().skuVesselMap[skuCode] || [],
}));

export default useVesselStore;
