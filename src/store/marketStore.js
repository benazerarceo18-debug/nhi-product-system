import { create } from 'zustand';
import { INITIAL_MARKET_ITEMS } from '../data/seed';

const useMarketStore = create((set, get) => ({
  items: [...INITIAL_MARKET_ITEMS],

  addItem: (item) => set((state) => ({
    items: [...state.items, { ...item, id: 'm' + String(state.items.length + 1).padStart(2, '0'), price_history: [], last_updated: new Date().toISOString() }],
  })),

  updateItem: (id, updates) => set((state) => ({
    items: state.items.map(it => it.id === id ? { ...it, ...updates } : it),
  })),

  updatePrice: (id, newPriceCentavos) => set((state) => ({
    items: state.items.map(it => {
      if (it.id !== id) return it;
      return {
        ...it,
        price_history: [...(it.price_history || []), { price: it.price_centavos, date: new Date().toISOString() }],
        price_centavos: newPriceCentavos,
        last_updated: new Date().toISOString(),
      };
    }),
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(it => it.id !== id),
  })),

  getById: (id) => get().items.find(it => it.id === id),
}));

export default useMarketStore;
