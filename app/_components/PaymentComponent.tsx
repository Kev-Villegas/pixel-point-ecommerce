import { useCartStore } from "@/store/useCartStore";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

initMercadoPago(process.env.NEXT_PUBLIC_PUBLIC_KEY as string);

type PayloadType = {
  payer: {
    name: string;
    surname: string;
  };
};

export default function PaymentComponent() {
  const { cartProducts } = useCartStore();
  const [payload, setPayload] = useState<PayloadType | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("checkoutPayload");
    if (data) {
      const parsedData = JSON.parse(data);
      setPayload(parsedData);
    }
    localStorage.removeItem("checkoutPayload");
  }, []);

  const getTotalOrderPrice = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  };

  const searchParams = useSearchParams();
  const preferenceId = searchParams.get("preference") as string;

  const initialization = {
    amount: getTotalOrderPrice(),
    preferenceId: preferenceId,
    payer: {
      firstName: payload?.payer.name,
      lastName: payload?.payer.surname,
      // identification: {
      //  "type": "<PAYER_DOC_TYPE_HERE>",
      //  "number": "<PAYER_DOC_NUMBER_HERE>",
      // },
      // email: '<PAYER_EMAIL_HERE>',
      address: {
        zipCode: "<PAYER_ZIP_CODE_HERE>",
        federalUnit: "<PAYER_FED_UNIT_HERE>",
        city: "<PAYER_CITY_HERE>",
        neighborhood: "<PAYER_NEIGHBORHOOD_HERE>",
        streetName: "<PAYER_STREET_NAME_HERE>",
        streetNumber: "<PAYER_STREET_NUMBER_HERE>",
        complement: "<PAYER_COMPLEMENT_HERE>",
      },
    },
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
      prepaidCard: "all",
      mercadoPago: "all",
    } as any,
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    if (!payload) {
      console.error("No hay payload, no se puede continuar con el pago.");
      return;
    }

    const formToSend = {
      ...formData,
      statement_descriptor: "Pixel Point",
      notification_url:
        "https://pixel-point-ecommerce.vercel.app/api/checkout/notifications",
      additional_info: {
        items: cartProducts.map((item: any) => ({
          id: item.id,
          unit_price: item.price,
          quantity: item.quantity,
          title: item.name,
          picture_url: item.images[0].url,
          category_id: item.brand,
        })),
        // payer: {
        //   first_name: payload.payer.name,
        //   last_name: payload.payer.surname,
        //   phone: {
        //     area_code: "11",
        //     number: "987654321",
        //   },
        //   address: {
        //     street_number: null,
        //   },
        // },
        // shipments: {
        //   receiver_address: {
        //     zip_code: "12312-123",
        //     state_name: "Rio de Janeiro",
        //     city_name: "Buzios",
        //     street_name: "Av das Nacoes Unidas",
        //     street_number: 3003,
        //   },
        // },
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .post("/api/checkout", formToSend)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    });
  };

  const onError = async (error: any) => {
    console.log(error);
  };

  const onReady = async () => {
    console.log("Payment Brick is ready");
  };

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
}
