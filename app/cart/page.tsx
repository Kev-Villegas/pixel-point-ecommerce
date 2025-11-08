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
import PaymentComponent from "@/app/_components/PaymentComponent";
import { Brand } from "@mercadopago/sdk-react";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 lg:text-left">
          Checkout
        </h1>

        {cartProducts.length === 0 ? (
          <EmptyCartBanner />
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr,1.5fr]">
            {/* 🛒 Izquierda: Carrito y resumen */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="gap-2 space-y-3 shadow-sm">
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

              <div className="flex items-center justify-between px-2">
                <div className="text-lg font-semibold text-gray-700">
                  {cartProducts.length}{" "}
                  {cartProducts.length === 1 ? "Artículo" : "Artículos"}
                </div>
                <Button
                  variant="destructive"
                  className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  onClick={handleClearCart}
                >
                  <X className="mr-2 h-4 w-4" />
                  Vaciar Carrito
                </Button>
              </div>

              <CartOrderSummary
                cartProducts={cartProducts}
                getTotalOrderPrice={getTotalOrderPrice}
              />
            </motion.div>

            {/* 💳 Derecha: Payment Brick */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.4 }}
              className="h-min"
            >
              <Card className="p-2 shadow-md">
                <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
                  {/* Finalizar pago */}
                </h2>
                <Brand />
                <Separator className="mb-4" />
                <PaymentComponent />
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
