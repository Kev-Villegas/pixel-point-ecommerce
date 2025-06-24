import { useMemo } from "react";
import { Order } from "@/app/_hooks/useOrders";

export const useOrderStats = (orders: Order[]) => {
  const stats = useMemo(() => {
    const total = orders.length;

    const entregados = orders.filter((o) => o.estado === "ENTREGADO").length;
    const enviosPendientes = orders.filter(
      (o) => o.estado === "ENVIO_PENDIENTE",
    ).length;
    const enviadas = orders.filter((o) => o.estado === "ENVIADO").length;
    const pagoPendiente = orders.filter(
      (o) => o.estado === "PAGO_PENDIENTE",
    ).length;

    return { total, entregados, enviosPendientes, enviadas, pagoPendiente };
  }, [orders]);

  const pieData = useMemo(() => {
    if (stats.total === 0) return [];

    return [
      {
        name: "Entregado",
        value: Math.round((stats.entregados / stats.total) * 100),
        color: "#000000",
        count: stats.entregados,
      },
      {
        name: "Enviado",
        value: Math.round((stats.enviadas / stats.total) * 100),
        color: "#6b7280",
        count: stats.enviadas,
      },
      {
        name: "Envío Pendiente",
        value: Math.round((stats.enviosPendientes / stats.total) * 100),
        color: "#9ca3af",
        count: stats.enviosPendientes,
      },
      {
        name: "Pago Pendiente",
        value: Math.round((stats.pagoPendiente / stats.total) * 100),
        color: "#d1d5db",
        count: stats.pagoPendiente,
      },
    ];
  }, [stats]);

  return { stats, pieData };
};
