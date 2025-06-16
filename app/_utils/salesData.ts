import { Order, SalesDataPoint } from "@/app/protected/types/dashboard";

export const processSalesData = (orders: Order[]): SalesDataPoint[] => {
  if (!orders?.length) return [];

  const salesByMonth = orders.reduce<Record<string, number>>((acc, order) => {
    const date = new Date(order.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    acc[monthKey] = (acc[monthKey] || 0) + order.totalPrice;
    return acc;
  }, {});

  return Object.entries(salesByMonth).map(([month, revenue]) => ({
    month,
    revenue,
  }));
};
