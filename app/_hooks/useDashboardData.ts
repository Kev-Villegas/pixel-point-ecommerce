import useSWR from "swr";
import { ProductData, Order } from "@/app/protected/types/dashboard";

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

const SWR_CONFIG = { revalidateOnFocus: false };

export const useDashboardData = (
  currentDateISO: { from: string; to: string },
  previousDateISO: { from: string; to: string },
) => {
  const {
    data: topProducts,
    error: topProductsError,
    isLoading: isLoadingTopProducts,
  } = useSWR<ProductData[]>("/api/dashboard/most-selled", fetcher, SWR_CONFIG);

  const {
    data: orders,
    error,
    isLoading,
    mutate,
  } = useSWR<Order[]>(
    `/api/dashboard/orders?from=${currentDateISO.from}&to=${currentDateISO.to}`,
    fetcher,
    SWR_CONFIG,
  );

  const { data: previousOrders } = useSWR<Order[]>(
    `/api/dashboard/orders?from=${previousDateISO.from}&to=${previousDateISO.to}`,
    fetcher,
    SWR_CONFIG,
  );

  return {
    topProducts,
    topProductsError,
    isLoadingTopProducts,
    orders,
    error,
    isLoading,
    mutate,
    previousOrders,
  };
};
