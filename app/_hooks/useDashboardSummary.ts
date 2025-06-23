import useSWR from "swr";

type BrandDatum = {
  brand: string;
  sales: number;
  fill: string;
};

type TopProduct = {
  name: string;
  sales: number;
  revenue: number;
};

type DashboardSummary = {
  brandData: BrandDatum[];
  topProducts: TopProduct[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useDashboardSummary() {
  const { data, error, isLoading } = useSWR<DashboardSummary>(
    "/api/dashboard/summary",
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 60000,
    },
  );

  return {
    data,
    loading: isLoading,
    error,
  };
}
