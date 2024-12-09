import { create } from "zustand";
import { ProductBase, CartProduct } from "@/types/types";

const loadCartFromLocalStorage = (): CartProduct[] => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("cartProducts");
  return cart ? JSON.parse(cart) : [];
};

const saveDebouncedCartToLocalStorage = (cartProducts: CartProduct[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
};

type CartState = {
  cartProducts: CartProduct[];
  addProduct: (product: ProductBase) => void;
  removeProduct: (productId: number) => void;
  updateProductQuantity: (productId: number, increment: boolean) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cartProducts: loadCartFromLocalStorage(),

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
      .cartProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: increment
                ? product.quantity + 1
                : Math.max(product.quantity - 1, 0),
            }
          : product,
      )
      .filter((product) => product.quantity > 0);

    saveDebouncedCartToLocalStorage(updatedCart);
    set({ cartProducts: updatedCart });
  },

  clearCart: () => {
    saveDebouncedCartToLocalStorage([]);
    set({ cartProducts: [] });
  },
}));
