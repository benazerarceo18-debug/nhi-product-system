import { create } from 'zustand';

const useAlertStore = create((set, get) => ({
  alerts: [],

  addAlert: (alert) => set((state) => {
    const exists = state.alerts.find(a => a.sku_code === alert.sku_code && a.status === 'open');
    if (exists) return state;
    return {
      alerts: [...state.alerts, { ...alert, id: 'alert-' + Date.now(), status: 'open', created_at: new Date().toISOString() }],
    };
  }),

  resolveAlert: (id, resolution) => set((state) => ({
    alerts: state.alerts.map(a =>
      a.id === id ? { ...a, status: 'resolved', resolution, resolved_at: new Date().toISOString() } : a
    ),
  })),

  getOpen: () => get().alerts.filter(a => a.status === 'open'),

  getBySkuCode: (skuCode) => get().alerts.find(a => a.sku_code === skuCode && a.status === 'open'),
}));

export default useAlertStore;
