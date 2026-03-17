import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: {},

  setRecipe: (skuCode, data) => set((state) => ({
    recipes: {
      ...state.recipes,
      [skuCode]: { ...data, updated_at: new Date().toISOString() },
    },
  })),

  getRecipe: (skuCode) => get().recipes[skuCode] || null,
}));

export default useRecipeStore;
