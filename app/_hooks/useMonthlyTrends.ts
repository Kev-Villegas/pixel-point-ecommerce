import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface MonthlyTrend {
  month: string;
  orders: number;
  revenue: number;
}

export function useMonthlyTrends() {
  const { data, isLoading, error } = useSWR<MonthlyTrend[]>(
    "/api/dashboard/monthly-trends",
    fetcher,
  );

  return {
    trendData: data ?? [],
    isLoading,
    isError: error,
  };
}
