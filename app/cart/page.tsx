"use client";

import Image from "next/image";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import Header from "../_components/Header";
import { Button } from "../_components/ui/button";
import { CartContext } from "@/context/CartContext";
import { Trash2, Plus, Minus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "../_components/ui/separator";
import { EmptyCartBanner } from "../_components/EmptyCartBanner";
import { Card, CardDescription, CardTitle } from "../_components/ui/card";

export default function CartPage() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext debe estar dentro de un CartContextProvider");
  }

  const { cartProducts, removeProduct, clearCart, updateProductQuantity } =
    context;

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
      <Header />
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

          <div className="grid w-full grid-cols-2 gap-6">
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
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              onClick={() =>
                                handleQuantityChange(product.id, false)
                              }
                              className="text-bold rounded bg-gray-200 px-2 py-1 text-sm font-bold text-slate-900 hover:bg-gray-300"
                            >
                              <Minus />
                            </Button>
                            <p className="w-6 text-center text-sm font-medium text-gray-800">
                              {product.quantity}
                            </p>
                            <Button
                              variant="ghost"
                              onClick={() =>
                                handleQuantityChange(product.id, true)
                              }
                              className="rounded bg-gray-200 px-2 py-1 text-sm font-bold text-gray-700 hover:bg-gray-300"
                            >
                              <Plus />
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            className="bg-red-600"
                            aria-label="Eliminar producto"
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            <Trash2 className="h-6 w-6 text-gray-50" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Card>
                <div className="mt-4 flex justify-between">
                  <Button
                    variant="destructive"
                    className="rounded-lg bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
                    onClick={handleClearCart}
                  >
                    <X className="h-4 w-4" />
                    Vaciar Carrito
                  </Button>
                  <div className="pr-1 text-lg font-semibold text-gray-700">
                    {cartProducts.length}{" "}
                    {cartProducts.length === 1 ? "Artículo" : "Artículos"}
                  </div>
                </div>
              </motion.div>
            )}

            {cartProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="h-min px-6"
              >
                <Card className="px-4 py-4">
                  <CardTitle className="mb-2 text-2xl font-semibold">
                    Resumen de Orden
                  </CardTitle>
                  {cartProducts.map((product) => (
                    <CardDescription
                      className="text-slate-800"
                      key={product.id}
                    >
                      <div className="flex justify-between">
                        <h2 className="text-base">
                          {product.name} (x{product.quantity})
                        </h2>
                        <p>${(product.price * product.quantity).toFixed(2)}</p>
                      </div>
                    </CardDescription>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-2 font-semibold">
                    <div className="flex justify-between">
                      <span className="text-xl font-semibold">Subtotal:</span>
                      <span className="text-xl font-semibold">
                        ${getTotalOrderPrice().toFixed(2)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-xl font-semibold">Total:</span>
                      <span className="text-xl font-semibold">
                        ${getTotalOrderPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <Button className="mt-4 w-full" size="lg">
                    Continuar al Pago
                  </Button>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
