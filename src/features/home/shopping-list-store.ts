'use client';

import { create } from 'zustand';

type EditingItem = {
  id: string;
  todo: string;
} | null;

type ShoppingListStore = {
  editingItem: EditingItem;
  startEdit: (item: Exclude<EditingItem, null>) => void;
  cancelEdit: () => void;
};

export const useShoppingListStore = create<ShoppingListStore>((set) => ({
  editingItem: null,
  startEdit: (editingItem) => set({ editingItem }),
  cancelEdit: () => set({ editingItem: null }),
}));
