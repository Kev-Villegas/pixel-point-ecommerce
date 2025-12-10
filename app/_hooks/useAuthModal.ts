import { create } from "zustand";

type AuthView = "signin" | "signup";

interface AuthModalStore {
  isOpen: boolean;
  view: AuthView;
  openModal: (view?: AuthView) => void;
  onClose: () => void;
  setView: (view: AuthView) => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: "signin",
  openModal: (view = "signin") => set({ isOpen: true, view }),
  onClose: () => set({ isOpen: false }),
  setView: (view) => set({ view }),
}));
