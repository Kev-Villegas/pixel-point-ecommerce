import useDeviceStore from "@/store/useDeviceIdStore";
import { useEffect, useState } from "react";

export default function useDeviceId() {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const setGlobalDeviceId = useDeviceStore((state) => state.setDeviceId);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.mercadopago.com/v2/security.js";
    script.setAttribute("view", "checkout");
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const checkDeviceId = () => {
        const id = (window as any).MP_DEVICE_SESSION_ID;
        if (id) {
          setDeviceId(id);
          setGlobalDeviceId(id);
        } else {
          setTimeout(checkDeviceId, 100);
        }
      };
      checkDeviceId();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [setGlobalDeviceId]);

  return deviceId;
}
