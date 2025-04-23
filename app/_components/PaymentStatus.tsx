import { initMercadoPago, StatusScreen } from "@mercadopago/sdk-react";
import { useSearchParams } from "next/navigation";

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id") as string;

  const initialization = {
    paymentId: paymentId,
  };

  const customization = {
    backUrls: {
      error: "http://localhost:3000",
      return: "http://localhost:3000",
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
