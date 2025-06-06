"use client";

import { useCartStore } from "@/store/useCartStore";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "../_components/ui/button";
import { Card } from "../_components/ui/card";
import { Separator } from "../_components/ui/separator";
import { CartOrderSummary } from "./_components/CartOrderSummary";
import { CartProductItem } from "./_components/CartProductItem";
import { EmptyCartBanner } from "./_components/EmptyCartBanner";

export default function CartPage() {
  const { cartProducts, removeProduct, clearCart, updateProductQuantity } =
    useCartStore();

  const handleRemoveProduct = (productId: number) => {
    removeProduct(productId);
    toast.success("Producto eliminado del carrito");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Carrito vacío");
  };

  const handleQuantityChange = (productId: number, increment: boolean) => {
    updateProductQuantity(productId, increment);
    const updatedProduct = cartProducts.find(
      (product) => product.id === productId,
    );
    if (updatedProduct && updatedProduct.quantity === 0) {
      toast.success("Producto eliminado del carrito");
    }
  };

  const getTotalOrderPrice = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  };

  return (
    <>
      {/* <Header /> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            Carrito de Compras
          </h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {cartProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center text-gray-600"
              >
                <EmptyCartBanner />
              </motion.div>
            ) : (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="gap-2 space-y-3">
                  <AnimatePresence>
                    {cartProducts.map((product) => (
                      <CartProductItem
                        key={product.id}
                        product={product}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </AnimatePresence>
                </Card>
                <Separator />
                <div className="mt-4 flex justify-between gap-4 px-2 sm:flex-row">
                  <div className="pr-1 text-lg font-semibold text-gray-700">
                    {cartProducts.length}{" "}
                    {cartProducts.length === 1 ? "Artículo" : "Artículos"}
                  </div>
                  <Button
                    variant="destructive"
                    className="rounded-lg bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
                    onClick={handleClearCart}
                  >
                    <X className="h-4 w-4" />
                    Vaciar Carrito
                  </Button>
                </div>
              </motion.div>
            )}
            {cartProducts.length > 0 && (
              <CartOrderSummary
                cartProducts={cartProducts}
                getTotalOrderPrice={getTotalOrderPrice}
              />
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
