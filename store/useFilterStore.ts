import { create } from "zustand";

interface FilterState {
  selectedOption: "asc" | "desc";
  selectedFilter: "price" | "name";
  setFilter: (filterBy: "price" | "name", order: "asc" | "desc") => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedOption: "asc",
  selectedFilter: "price",
  setFilter: (filterBy, order) =>
    set({ selectedFilter: filterBy, selectedOption: order }),
}));
