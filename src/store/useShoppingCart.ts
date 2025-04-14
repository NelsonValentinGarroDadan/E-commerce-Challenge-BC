import { ShoppingCart, ShoppingItem } from "@/types/shoppingCart.type";
import { create, StateCreator } from "zustand";
import { persist } from 'zustand/middleware';

const cartStoreCreator: StateCreator<ShoppingCart, [], [], ShoppingCart> = (set, get) => ({
    items: [],
    isOpen: false,
    addItem: (item: ShoppingItem) => {
      const existing = get().items.find((i) => i.id === item.id);
      if (existing) {
        set({
          items: get().items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        });
      } else {
        set({ items: [...get().items, item] });
      }
    },
    removeItem: (id: string) => {
      set({ items: get().items.filter((i) => i.id !== id) });
    },
    updateQuantity: (id: string, quantity: number) => {
      set({
        items: get().items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        ),
      });
    },
    toggleCart: () => set({ isOpen: !get().isOpen }),
    closeCart: () => set({ isOpen: false }),
  });
  
  export const useCartStore = create<ShoppingCart>()(
    persist(cartStoreCreator, {
      name: 'shopping-cart-storage',
    })
  );
  