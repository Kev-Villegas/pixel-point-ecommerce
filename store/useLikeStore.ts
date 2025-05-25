import { create } from "zustand";

type LikesStore = {
  likedProductIds: number[];
  setLikedProductIds: (ids: number[]) => void;
  addLike: (id: number) => void;
  removeLike: (id: number) => void;
};

export const useLikesStore = create<LikesStore>((set) => ({
  likedProductIds: [],
  setLikedProductIds: (ids) => set({ likedProductIds: ids }),
  addLike: (id) =>
    set((state) => ({
      likedProductIds: [...state.likedProductIds, id],
    })),
  removeLike: (id) =>
    set((state) => ({
      likedProductIds: state.likedProductIds.filter((pid) => pid !== id),
    })),
}));
