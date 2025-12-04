"use client";

import { useCartStore } from "@/store/useCartStore";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "../_components/ui/button";
import { Card } from "../_components/ui/card";
import { Separator } from "../_components/ui/separator";
import { CartOrderSummary } from "./_components/CartOrderSummary";
import { CartProductItem } from "./_components/CartProductItem";
import { EmptyCartBanner } from "./_components/EmptyCartBanner";
import PaymentModal from "@/app/_components/PaymentModal";
import { Modal } from "../_components/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function CartPageContent() {
  const { cartProducts, removeProduct, clearCart, updateProductQuantity } =
    useCartStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const preferenceId = searchParams.get("preference");

  // Payment state management
  const [paymentState, setPaymentState] = useState<
    "idle" | "processing" | "completed"
  >("idle");
  const [paymentData, setPaymentData] = useState<{
    id: string;
    status: string;
  } | null>(null);

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

  const handleCloseModal = () => {
    // Only allow closing if not processing
    if (paymentState !== "processing") {
      router.push("/cart");
      // Reset payment state when closing
      setPaymentState("idle");
      setPaymentData(null);
    }
  };

  const handlePaymentStart = () => {
    setPaymentState("processing");
  };

  const handlePaymentComplete = (data: { id: string; status: string }) => {
    setPaymentData(data);
    setPaymentState("completed");

    // Update URL to show payment ID instead of preference
    if (data.id) {
      const newUrl =
        data.status === "approved"
          ? `/cart?id=${data.id}&ok`
          : `/cart?id=${data.id}`;
      router.replace(newUrl, { scroll: false });
    }

    // If payment is approved, redirect to shipping form after a brief delay
    if (data.status === "approved") {
      setTimeout(() => {
        router.push(`/checkout/payment/status?id=${data.id}&ok`);
      }, 3000); // 3 second delay to show the success status
    }
  };

  // Reset payment state when preference or payment id changes
  useEffect(() => {
    const paymentId = searchParams.get("id");
    if (preferenceId && !paymentId) {
      setPaymentState("idle");
      setPaymentData(null);
    } else if (paymentId && !paymentData) {
      // If we have a payment ID in URL but no payment data, fetch it
      setPaymentState("completed");
      setPaymentData({
        id: paymentId,
        status: searchParams.has("ok") ? "approved" : "pending",
      });
    }
  }, [preferenceId, searchParams, paymentData]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-gray-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Carrito de Compras
          </h1>

          {cartProducts.length === 0 ? (
            <EmptyCartBanner />
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr,1fr]">
              {/* Left Column: Product List */}
              <m.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="overflow-hidden shadow-sm">
                  {/* Table Header - Hidden on mobile */}
                  <div className="hidden grid-cols-[2fr,1fr,1fr,auto] gap-4 border-b border-gray-200 bg-white px-6 py-4 text-sm font-semibold text-gray-500 md:grid">
                    <div>Producto</div>
                    <div className="text-center">Cantidad</div>
                    <div className="text-center">Total</div>
                    <div className="text-right">Acción</div>
                  </div>

                  {/* Product List */}
                  <div className="px-4 md:px-6">
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
                  </div>
                </Card>

                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleClearCart}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Vaciar Carrito
                  </Button>
                </div>
              </m.div>

              {/* Right Column: Order Summary */}
              <div>
                <CartOrderSummary
                  cartProducts={cartProducts}
                  getTotalOrderPrice={getTotalOrderPrice}
                />
              </div>
            </div>
          )}
        </div>

        {/* Payment Modal */}
        {(!!preferenceId || !!searchParams.get("id")) && (
          <Modal
            title={
              paymentState === "processing"
                ? "Procesando pago..."
                : paymentState === "completed"
                  ? "Estado del pago"
                  : "Completa tu pago"
            }
            description="Proceso de pago"
            maxWidth={
              paymentState === "completed"
                ? "sm:max-w-[500px]"
                : "sm:max-w-[600px]"
            }
            minHeight="min-h-[515px]"
            padding={paymentState === "completed" ? "p-0" : "p-4"}
            hideCloseButton={paymentState === "completed"}
            onClose={handleCloseModal}
          >
            <PaymentModal
              paymentState={paymentState}
              paymentData={paymentData}
              onPaymentStart={handlePaymentStart}
              onPaymentComplete={handlePaymentComplete}
            />
          </Modal>
        )}
      </m.div>
    </LazyMotion>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-3xl font-bold text-gray-900">
              Carrito de Compras
            </h1>
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
                <p className="text-gray-600">Cargando carrito...</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}
