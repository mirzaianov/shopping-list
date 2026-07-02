'use client';

import { create } from 'zustand';
import { createShoppingListSlice, type ShoppingListSlice } from './shopping-list-slice';

type Store = ShoppingListSlice;

export const useStore = create<Store>()((...args) => ({
  ...createShoppingListSlice(...args),
}));
