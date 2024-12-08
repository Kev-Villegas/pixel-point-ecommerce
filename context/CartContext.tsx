"use client";
import { ProductBase, CartProduct } from "@/types/types";
import React, { createContext, useState, useEffect, ReactNode } from "react";

type CartContextType = {
  cartProducts: CartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  addProduct: (product: ProductBase) => void;
  removeProduct: (productId: number) => void;
  updateProductQuantity: (productId: number, increment: boolean) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

interface CartContextProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls) {
      if (cartProducts.length) {
        ls.setItem("cart", JSON.stringify(cartProducts));
      } else {
        ls.removeItem("cart");
      }
    }
  }, [cartProducts, ls]);

  useEffect(() => {
    if (ls) {
      try {
        const storedCart = JSON.parse(ls.getItem("cart") as string);
        if (Array.isArray(storedCart)) {
          setCartProducts(storedCart);
        }
      } catch (error) {
        console.error("Error al parsear los datos de localStorage", error);
      }
    }
  }, [ls]);

  const addProduct = (newProduct: ProductBase) => {
    setCartProducts((prev) => {
      const existingProduct = prev.find(
        (product) => product.id === newProduct.id,
      );
      if (existingProduct) {
        return prev.map((product) =>
          product.id === newProduct.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        );
      }
      return [...prev, { ...newProduct, quantity: 1 }];
    });
  };

  const removeProduct = (productId: number) => {
    setCartProducts((prev) =>
      prev.filter((product) => product.id !== productId),
    );
  };

  const updateProductQuantity = (productId: number, increment: boolean) => {
    setCartProducts((prev) =>
      prev
        .map((product) =>
          product.id === productId
            ? {
                ...product,
                quantity: increment
                  ? product.quantity + 1
                  : product.quantity - 1,
              }
            : product,
        )
        .filter((product) => product.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        updateProductQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
