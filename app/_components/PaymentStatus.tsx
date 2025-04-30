import { initMercadoPago, StatusScreen } from "@mercadopago/sdk-react";
import { useSearchParams } from "next/navigation";

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id") as string;
  // const paymentStatusData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("paymentStatusData") || "{}") : {};

  const initialization = {
    paymentId: paymentId,
    // additionalInfo: {
    //   externalResourceURL: paymentStatusData.three_ds_info.externalResourceURL,
    //   creq: paymentStatusData.three_ds_info.creq,
    // },
  };

  const customization = {
    backUrls: {
      error: process.env.NEXT_PUBLIC_URL as string,
      return: process.env.NEXT_PUBLIC_URL as string,
    },
  };

  const onError = async (error: any) => {
    // callback called for all Brick error cases
    console.log(error);
  };

  const onReady = async () => {
    /*
     Callback called when Brick is ready.
     Here you can hide loadings from your site, for example.
   */
  };

  return (
    <StatusScreen
      initialization={initialization}
      customization={customization}
      onReady={onReady}
      onError={onError}
    />
  );
}
