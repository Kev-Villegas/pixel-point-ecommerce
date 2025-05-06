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
          <th>Date</th>
          <th>Paid</th>
          <th>Recipient</th>
          <th>Products</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 &&
          orders.map((order) => (
            <tr key={order.id}>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td className={order.paid ? "text-green-600" : "text-red-600"}>
                {order.paid ? "YES" : "NO"}
              </td>
              <td>
                {order.username} - {order.email}
                <br />
                {/* {order.country} - {order.postalCode}<br /> */}
                {order.city} - {order.streetAddress}
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
            </tr>
          ))}
      </tbody>
    </table>
  );
}
