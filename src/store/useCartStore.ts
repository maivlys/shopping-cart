import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  quantity: number
}

type CartStore = {
  items: CartItem[];
  getQnt: (id: number) => number;
  increaseQnt: (id: number, amount?: number) => void;
  decreaseQnt: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalQnt: () => number;
  isInCart: (id: number) => boolean;
  clearCart: () => void;
   openCartPreview: boolean;
  setOpenCartPreview: (open: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      getQnt: (id) => {
        return get().items.find((item) => item.id === id)?.quantity ?? 0
      },

      increaseQnt: (id, amount = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          if (!existing) {
            return { items: [...state.items, { id, quantity: amount }] }
          }
          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + amount }
                : item)
          }
        })
      },

      decreaseQnt: (id) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          if (existing?.quantity === 1) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          }
        })
      },

      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      getTotalQnt: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      isInCart: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearCart: () => set({ items: [] }),
      openCartPreview: false,
      setOpenCartPreview: (open) => set({ openCartPreview: open }),

    }), { name: "shopping-cart",  partialize: (state) => ({ items: state.items }) }

  )
)
