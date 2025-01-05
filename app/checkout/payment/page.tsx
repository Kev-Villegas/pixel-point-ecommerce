"use client";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import axios from "axios";
import { useSearchParams } from "next/navigation";

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const preferenceId = searchParams.get("preference") || undefined;

  const initialization = {
    amount: 10,
    preferenceId: preferenceId,
  };

  const customization: IPaymentBrickCustomization = {
    visual: {
      style: {
        theme: "default",
      },
    },
    paymentMethods: {
      ticket: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    // callback called when clicking the submit data button
    return new Promise((resolve, reject) => {
      // fetch("/process_payment", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // })
      axios
        .post("/api/checkout", JSON.stringify(formData))
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    });
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
    // console.log('AHORA READYYYYYYYYYYY');
  };

  return (
    // <main className='flex items-center justify-center text-center'>
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
    // </main>
  );
}
