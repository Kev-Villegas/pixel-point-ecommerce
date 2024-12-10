import axios from "axios";
import { create } from "zustand";

type Product = {
  id: number;
  name: string;
};

interface SearchProductStore {
  searchResults: Product[];
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
      const response = await axios.get(`/api/products/search`, {
        params: { q: query },
      });

      set({ searchResults: response.data });
    } catch (error) {
      console.error("Error al buscar productos:", error);
      set({ searchResults: [] });
    } finally {
      set({ isSearching: false });
    }
  };

  return {
    searchResults: [],
    isSearching: false,
    searchTerm: "",
    handleSearch,
  };
});
