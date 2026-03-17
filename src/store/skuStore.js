import { create } from 'zustand';
import { INITIAL_SKUS } from '../data/seed';

const useSkuStore = create((set, get) => ({
  skus: [...INITIAL_SKUS],

  addSku: (sku) => set((state) => ({
    skus: [...state.skus, { ...sku, status: 'active' }],
  })),

  removeSku: (sku_code) => set((state) => ({
    skus: state.skus.filter(s => s.sku_code !== sku_code),
  })),

  getByBrand: (brand) => get().skus.filter(s => s.brand === brand),
}));

export default useSkuStore;
