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
      console.log(response.data);
      setOrders(response.data);
    });
  }, []);

  return (
    <table className="basic">
      <thead>
        <tr>
          <th>Sent</th>
          <th>Date</th>
          <th>Paid</th>
          <th>Recipient</th>
          <th>Products</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody className="text-center text-sm text-gray-600">
        {orders.length > 0 &&
          orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200">
              <td>
                <form method="POST" action={`/api/orders/${order.id}`}>
                  <input type="hidden" name="_method" value="PATCH" />
                  <input
                    type="checkbox"
                    name="sent"
                    defaultChecked={order.sent}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      e.target.form?.submit();
                    }}
                  />
                </form>
              </td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td className={order.paid ? "text-green-600" : "text-red-600"}>
                {order.paid ? "YES" : "NO"}
              </td>
              <td>
                {order.username}
                <br />
                {order.email} - {order.phonenumber}
                <br />
                {order.city} - {order.streetAddress} - {order.postalCode}
                <br />
              </td>
              <td>
                {order.items.map((item) => (
                  <div key={item.id}>
                    {item.product.name} x{item.quantity}
                    <br />
                  </div>
                ))}
              </td>
              <td>
                <strong>$ {order.totalPrice}</strong>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
