import { create } from "zustand";
import { ProductBase, CartProduct } from "@/types/types";

const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      try {
        fn(...args);
      } catch (error) {
        console.error("Debounced save failed", error);
      }
    }, delay);
  };
};

const debouncedSave = debounce((cartProducts: CartProduct[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }
}, 300);

const saveDebouncedCartToLocalStorage = (cartProducts: CartProduct[]) => {
  debouncedSave(cartProducts);
};

type CartState = {
  cartProducts: CartProduct[];
  loadingCart: boolean;
  addProduct: (product: ProductBase) => void;
  removeProduct: (productId: number) => void;
  updateProductQuantity: (productId: number, increment: boolean) => void;
  clearCart: () => void;
  initializeCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cartProducts: [],
  loadingCart: true,

  initializeCart: () => {
    if (typeof window !== "undefined") {
      try {
        const cart = localStorage.getItem("cartProducts");
        const parsedCart = cart ? JSON.parse(cart) : [];
        if (
          Array.isArray(parsedCart) &&
          parsedCart.every((item) => item.id && item.quantity)
        ) {
          set({ cartProducts: parsedCart, loadingCart: false });
        } else {
          console.warn("Invalid cart data, resetting to empty.");
          localStorage.removeItem("cartProducts");
          set({ cartProducts: [], loadingCart: false });
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage", error);
        set({ cartProducts: [], loadingCart: false });
      }
    } else {
      set({ loadingCart: false });
    }
  },

  addProduct: (product) => {
    if (product.price > 0 && typeof product.id === "number") {
      const existingProduct = get().cartProducts.find(
        (p) => p.id === product.id,
      );

      let updatedCart;
      if (existingProduct) {
        updatedCart = get().cartProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      } else {
        updatedCart = [...get().cartProducts, { ...product, quantity: 1 }];
      }

      saveDebouncedCartToLocalStorage(updatedCart);
      set({ cartProducts: updatedCart });
    }
  },

  removeProduct: (productId) => {
    const newCart = get().cartProducts.filter((p) => p.id !== productId);
    saveDebouncedCartToLocalStorage(newCart);
    set({ cartProducts: newCart });
  },

  updateProductQuantity: (productId, increment) => {
    const updatedCart = get()
      .cartProducts.map((product) => {
        if (product.id === productId) {
          const newQuantity = increment
            ? product.quantity + 1
            : product.quantity - 1;
          if (newQuantity > 0) return { ...product, quantity: newQuantity };
          return null;
        }
        return product;
      })
      .filter((product) => product !== null) as CartProduct[];

    saveDebouncedCartToLocalStorage(updatedCart);
    set({ cartProducts: updatedCart });
  },

  clearCart: () => {
    saveDebouncedCartToLocalStorage([]);
    set({ cartProducts: [] });
  },
}));
