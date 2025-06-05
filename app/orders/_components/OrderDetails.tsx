"use client";

import useSWR from "swr";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { ExternalLink, Package, Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function OrderDetails({ orderId }: { orderId: string }) {
  const { data, error } = useSWR(`/api/orders/${orderId}`, fetcher);

  if (error) return <div>Error al cargar los datos del pedido</div>;

  if (!data) return <div>Cargando...</div>;

  const order = data;

  console.log(order);

  const total = order.totalPrice ?? 0;
  const shipping = order.shipping ?? 0;
  const subtotal = total + shipping;

  return (
    <div className="bg-muted/40 p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumen del Pedido</CardTitle>
            <CardDescription>
              Pedido #{String(order.id).slice(0, 8)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Envío</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Factura
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información de Envío</CardTitle>
            <CardDescription>Detalles de entrega</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Dirección</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {order.province ?? "Dirección no disponible"}
                <br />
                {order?.city ?? "Dirección no disponible"}
                <br />
                {order?.streetAddress ?? "Dirección no disponible"}{" "}
                {order?.postalCode ?? "Dirección no disponible"}
                {/* <br />
                {order?.shippingAddress?.country ?? "Dirección no disponible"} */}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Método de Envío</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {order.shipping_method}
              </p>
            </div>
            {order.tracking_number && (
              <div>
                <h4 className="font-medium">Número de Seguimiento</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {order.tracking_number}
                </p>
              </div>
            )}
          </CardContent>
          {order.status === "shipped" && (
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                <Truck className="mr-2 h-4 w-4" />
                Rastrear Pedido
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Artículos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Artículos</CardTitle>
            <CardDescription>
              {order.items.length} artículos en tu pedido
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item: any) => {
                const product = item.product;
                return (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <Image
                        src={
                          product.images[0]?.url ||
                          `/placeholder.svg?height=64&width=64`
                        }
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Cantidad: {item.quantity} × $
                        {product.price.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <div className="font-medium">
                      ${(item.quantity * product.price).toLocaleString("es-AR")}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              <Package className="mr-2 h-4 w-4" />
              Comprar de Nuevo
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
