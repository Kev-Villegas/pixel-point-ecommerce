"use client";
import { Order } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

type OrderWithFullData = Order & {
  items: {
    id: number;
    quantity: number;
    product: {
      name: string;
      price: number;
      images: { url: string }[];
      properties: { name: string; value: string } | null;
    };
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithFullData[]>([]);

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div className="space-y-4">
      {orders.length > 0 &&
        orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          >
            {/* Estado */}
            <div className="break-words">
              <label className="mb-1 block text-xs text-gray-500">Estado</label>
              <form method="POST" action={`/api/orders/${order.id}`}>
                <input type="hidden" name="_method" value="PATCH" />
                <select
                  name="status"
                  defaultValue={order.status}
                  onChange={(e) => {
                    e.preventDefault();
                    e.target.form?.submit();
                  }}
                  className="w-full rounded border bg-white px-2 py-1 text-sm"
                >
                  <option value="PAGO_PENDIENTE">Pago Pendiente</option>
                  <option value="ENVIO_PENDIENTE">Envio Pendiente</option>
                  <option value="ENVIADO">Enviado</option>
                  <option value="ENTREGADO">Entregado</option>
                </select>
              </form>
            </div>

            {/* Fecha */}
            <div className="break-words">
              <p className="text-xs text-gray-500">Fecha</p>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>

            {/* Pagado */}
            <div className="break-words">
              <p className="text-xs text-gray-500">Pagado</p>
              <p className={order.paid ? "text-green-600" : "text-red-600"}>
                {order.paid ? "YES" : "NO"}
              </p>
            </div>

            {/* Destinatario */}
            <div className="overflow-wrap break-words">
              <p className="text-xs text-gray-500">Destinatario</p>
              <p className="whitespace-pre-wrap">
                {order.username}
                <br />
                {order.email}
                <br />
                {order.phonenumber}
                <br />
                {order.city} - {order.streetAddress} - {order.postalCode}
              </p>
            </div>

            {/* Productos */}
            <div className="break-words">
              <p className="text-xs text-gray-500">Productos</p>
              {order.items.map((item) => (
                <div key={item.id} className="text-sm">
                  {item.product.name} x{item.quantity}
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="break-words">
              <p className="text-xs text-gray-500">Total</p>
              <strong>$ {order.totalPrice}</strong>
            </div>
          </div>
        ))}
    </div>
  );
}
