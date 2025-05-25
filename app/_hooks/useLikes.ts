import useSWR from "swr";
import axios from "axios";

export function useLikes() {
  const {
    data: likedProductIds = [],
    isValidating: isLoading,
    mutate,
    error,
  } = useSWR<number[]>("/api/likes", async (url: string) => {
    const res = await axios.get(url);
    if (res.data && res.data.likedProductIds) {
      return res.data.likedProductIds;
    }
    return res.data;
  });

  return { likedProductIds, isLoading, mutate, error };
}
