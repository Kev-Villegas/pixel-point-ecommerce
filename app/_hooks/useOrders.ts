import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface Order {
  rawId: number;
  id: string;
  cliente: string;
  producto: string;
  precio: number;
  estado: "ENTREGADO" | "ENVIO_PENDIENTE" | "ENVIADO" | "PAGO_PENDIENTE";
  fecha: string;
  email: string;
  telefono: string;
  direccion: string;
}

export function useRecentOrders() {
  const { data, error, isLoading, mutate } = useSWR<Order[]>(
    "/api/dashboard/orders",
    fetcher,
  );

  return {
    orders: data ?? [],
    isLoading,
    isError: error,
    refreshOrders: mutate,
  };
}
