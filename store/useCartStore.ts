import { CartProduct, ProductBase } from "@/types/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  cartProducts: CartProduct[];
  loadingCart: boolean;
  addProduct: (product: ProductBase) => void;
  removeProduct: (productId: number) => void;
  updateProductQuantity: (productId: number, increment: boolean) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartProducts: [],
      loadingCart: true,

      addProduct: (product) => {
        if (product.price > 0 && typeof product.id === "number") {
          const existingProduct = get().cartProducts.find(
            (p) => p.id === product.id,
          );

          const currentQuantity = existingProduct
            ? existingProduct.quantity
            : 0;
          if (currentQuantity + 1 > product.stock) {
            toast.error("No hay más stock disponible para este producto", {
              id: "stock-limit",
            });
            return;
          }

          let updatedCart;
          if (existingProduct) {
            updatedCart = get().cartProducts.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
            );
          } else {
            updatedCart = [...get().cartProducts, { ...product, quantity: 1 }];
          }

          set({ cartProducts: updatedCart });
          toast.success(
            `${updatedCart[updatedCart.length - 1].name} agregado al carrito`,
          );
        }
      },

      removeProduct: (productId) => {
        const newCart = get().cartProducts.filter((p) => p.id !== productId);
        set({ cartProducts: newCart });
      },

      updateProductQuantity: (productId, increment) => {
        const updatedCart = get()
          .cartProducts.map((product) => {
            if (product.id === productId) {
              const newQuantity = increment
                ? product.quantity + 1
                : product.quantity - 1;

              if (increment && newQuantity > product.stock) {
                toast.error("No hay más stock disponible para este producto", {
                  id: "stock-limit",
                });
                return product;
              }
              if (newQuantity > 0) return { ...product, quantity: newQuantity };
              return null;
            }
            return product;
          })
          .filter((product) => product !== null) as CartProduct[];

        set({ cartProducts: updatedCart });
      },

      clearCart: () => {
        set({ cartProducts: [] });
      },
    }),
    { name: "cartProducts" },
  ),
);
