import { Order } from "../protected/types/dashboard";

export const formatDateForFilename = (date: string): string =>
  date.replace(/[:.]/g, "-");

export const generateCSVContent = (orders: Order[]): string => {
  if (!orders.length) return "";

  const headers = ["PedidoID", "Email", "Fecha", "Total"];
  const rows = orders.map((order) => [
    order.id,
    order.email,
    new Date(order.createdAt).toLocaleDateString(),
    order.totalPrice.toFixed(2),
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
};

export const exportOrdersToCSV = (
  orders: Order[],
  fromISO: string,
  toISO: string,
): void => {
  if (!orders?.length) {
    console.warn("No orders to export");
    return;
  }

  const csvContent = generateCSVContent(orders);
  const filename = `pedidos_${formatDateForFilename(fromISO)}_${formatDateForFilename(toISO)}.csv`;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
