import { create } from "zustand";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetName: string;
  streetNumber: string;
  province: string;
  city: string;
  postalCode: string;
  apartment: string;
  floor: string;
  updateUser: (data: Partial<UserInfo>) => void;
}

export const useUserInfoStore = create<UserInfo>((set) => ({
  firstName: "Pedro",
  lastName: "Duarte",
  email: "pedro@example.com",
  phoneNumber: "+543876125518",
  streetName: "Avenida Champiñones",
  streetNumber: "123",
  province: "Buenos Aires",
  city: "CABA",
  postalCode: "28001",
  apartment: "12",
  floor: "3",
  updateUser: (data) => set((state) => ({ ...state, ...data })),
}));
