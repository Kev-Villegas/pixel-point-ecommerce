import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  phoneNumber: string;
  streetName: string;
  streetNumber: string;
  province: string;
  city: string;
  postalCode: string;
  apartment: string;
  floor: string;
  observations: string;
  loading: boolean; // Estado de carga
  error: string | null; // Estado de error
  fetchUserInfo: () => Promise<void>; // Método para obtener la información del usuario
  updateUser: (data: Partial<UserInfo>) => void;
}

export const useUserInfoStore = create<UserInfo>()(
  persist(
    (set) => ({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      streetName: "",
      streetNumber: "",
      province: "",
      city: "",
      postalCode: "",
      apartment: "",
      floor: "",
      observations: "",
      loading: false,
      error: null,
      fetchUserInfo: async () => {
        set({ loading: true, error: null }); // Inicia el estado de carga
        try {
          // Llama a tu API para obtener los datos de ShipmentData
          const response = await fetch("/api/users");
          if (!response.ok) {
            throw new Error("Error al obtener los datos del usuario");
          }
          const data = await response.json();
          // Actualiza el estado con los datos obtenidos
          set({
            phoneNumber: data.phoneNumber || "",
            streetName: data.streetName || "",
            streetNumber: data.streetNumber || "",
            province: data.province || "",
            city: data.city || "",
            postalCode: data.postalCode || "",
            apartment: data.apartment || "",
            floor: data.floor || "",
            observations: data.observations || "",
            loading: false,
          });
        } catch (error: any) {
          // Maneja errores
          set({ error: error.message, loading: false });
        }
      },
      updateUser: (data) => set((state) => ({ ...state, ...data })),
    }),
    { name: "userInfo" },
  ),
);
