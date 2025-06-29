import useSWR from "swr";
import axios from "axios";
import { Image } from "@/types/types";

type FavoriteProduct = {
  id: number;
  name: string;
  description: string;
  brand: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  images: Image[];
  likeCount: number;
  likedByUser: boolean;
};

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data as FavoriteProduct[]);

export function useFavorites() {
  const {
    data,
    error,
    isValidating: isLoading,
    mutate,
  } = useSWR<FavoriteProduct[]>("/api/favorites", fetcher);
  const favorites = data ?? [];
  return { favorites, isLoading, error, mutate };
}
