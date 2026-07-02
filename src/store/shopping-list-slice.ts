'use client';

import type { StateCreator } from 'zustand';

type EditingItem = {
  id: string;
  todo: string;
} | null;

export type ShoppingListSlice = {
  editingItem: EditingItem;
  startEdit: (item: Exclude<EditingItem, null>) => void;
  cancelEdit: () => void;
};

export const createShoppingListSlice: StateCreator<ShoppingListSlice> = (set) => ({
  editingItem: null,
  startEdit: (editingItem) => set({ editingItem }),
  cancelEdit: () => set({ editingItem: null }),
});
