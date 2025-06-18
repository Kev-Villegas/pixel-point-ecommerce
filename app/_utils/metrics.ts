import { Order, Metrics } from "@/app/protected/types/dashboard";

export const calculatePercentageChange = (
  current: number,
  previous: number,
): number => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
};

export const calculateMetrics = (
  currentOrders: Order[] = [],
  previousOrders: Order[] = [],
): Metrics => {
  const currentIncome = currentOrders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );
  const previousIncome = previousOrders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );

  const currentOrdersCount = currentOrders.length;
  const previousOrdersCount = previousOrders.length;

  const currentClients = new Set(currentOrders.map((order) => order.email))
    .size;
  const previousClients = new Set(previousOrders.map((order) => order.email))
    .size;

  const currentAvgValue =
    currentOrdersCount > 0 ? currentIncome / currentOrdersCount : 0;
  const previousAvgValue =
    previousOrdersCount > 0 ? previousIncome / previousOrdersCount : 0;

  return {
    totalIncome: currentIncome,
    totalOrders: currentOrdersCount,
    totalClients: currentClients,
    avgValue: currentAvgValue,
    incomeChangePercent: calculatePercentageChange(
      currentIncome,
      previousIncome,
    ),
    ordersChangePercent: calculatePercentageChange(
      currentOrdersCount,
      previousOrdersCount,
    ),
    clientsChangePercent: calculatePercentageChange(
      currentClients,
      previousClients,
    ),
    avgValueChangePercent: calculatePercentageChange(
      currentAvgValue,
      previousAvgValue,
    ),
  };
};
