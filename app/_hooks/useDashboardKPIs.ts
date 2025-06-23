import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDashboardKPIs() {
  const { data, error, isLoading } = useSWR("/api/dashboard/kpis", fetcher, {
    refreshInterval: 60 * 1000,
  });

  return {
    kpis: data,
    isLoading,
    isError: error,
  };
}
