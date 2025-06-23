"use client";

import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Error al cargar productos");
    return res.json();
  });

export function useDashboardProducts() {
  const { data, error, isLoading } = useSWR("/api/dashboard/products", fetcher);

  return {
    products: data ?? [],
    isLoading,
    isError: error,
  };
}
