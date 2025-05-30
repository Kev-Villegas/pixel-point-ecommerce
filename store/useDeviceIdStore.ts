// stores/deviceStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DeviceStore {
  deviceId: string | null;
  setDeviceId: (id: string) => void;
}

const useDeviceStore = create<DeviceStore>()(
  persist(
    (set) => ({
      deviceId: null,
      setDeviceId: (id) => set({ deviceId: id }),
    }),
    {
      name: "device-id-storage",
    },
  ),
);

export default useDeviceStore;
