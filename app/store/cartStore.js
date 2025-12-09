import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => {
      // Check if item exists
      const existing = state.cartItems.find((i) => i.id === item.id);

      if (existing) {
        // increase qty instead of adding again
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }

      // new item → add qty = 1
      return {
        cartItems: [...state.cartItems, { ...item, qty: 1 }],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item?.id !== id),
    })),

  increaseQty: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
        )
        .filter((item) => item.qty > 0),
    })),
}));

export default useCartStore;
