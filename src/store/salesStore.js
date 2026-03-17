import { create } from 'zustand';

const useSalesStore = create((set, get) => ({
  entries: [],

  addEntry: (entry) => set((state) => ({
    entries: [...state.entries, { ...entry, id: 'sale-' + Date.now() }],
  })),

  getByDate: (date, brand) => get().entries.filter(e =>
    e.date === date && (!brand || e.brand === brand)
  ),
}));

export default useSalesStore;
