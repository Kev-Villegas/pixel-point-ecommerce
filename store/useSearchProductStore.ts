import axios from "axios";
import { create } from "zustand";
import { Product, Image } from "@prisma/client";

type ProductWithImages = Product & {
  images: Image[];
};

interface SearchProductStore {
  searchResults: ProductWithImages[];
  isSearching: boolean;
  searchTerm: string;
  handleSearch: (query: string) => Promise<void>;
}

export const useSearchProductStore = create<SearchProductStore>((set) => {
  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      set({ searchResults: [], isSearching: false });
      return;
    }

    set({ isSearching: true });

    try {
      const response = await axios.get<ProductWithImages[]>(
        "/api/products/search",
        {
          params: { q: query },
        },
      );

      set({ searchResults: response.data, isSearching: false });
    } catch (error) {
      console.error("Error al buscar productos:", error);
      set({ searchResults: [], isSearching: false });
    }
  };

  return {
    searchResults: [],
    isSearching: false,
    searchTerm: "",
    handleSearch,
  };
});
