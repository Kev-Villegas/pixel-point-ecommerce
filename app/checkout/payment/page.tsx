"use client";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import axios from "axios";
import { useEffect, useState } from "react";

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);

export default function PaymentPage() {
  const [preferenceId, setPreferenceId] = useState("");

  useEffect(() => {
    const preferenceId = localStorage.getItem("id");
    if (preferenceId) {
      const parsedPreferenceId = JSON.parse(preferenceId);
      setPreferenceId(parsedPreferenceId);
    }
  }, []);

  const initialization = {
    amount: 50,
    preferenceId: preferenceId,
  };

  const customization = {
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

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
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

  const onError = async (error) => {
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
