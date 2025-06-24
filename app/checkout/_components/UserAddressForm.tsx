"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import useDeviceId from "@/app/_hooks/useDeviceId";
import { userAddressValidation } from "@/app/_schemas/validationSchemas";
import { useCartStore } from "@/store/useCartStore";
import { useUserInfoStore } from "@/store/useUserInfoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

export function UserAddressForm() {
  useDeviceId();
  const router = useRouter();
  const { cartProducts } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();
  const {
    phoneNumber,
    streetName,
    streetNumber,
    province,
    city,
    postalCode,
    apartment,
    floor,
    loading,
    error,
    fetchUserInfo,
  } = useUserInfoStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof userAddressValidation>>({
    resolver: zodResolver(userAddressValidation),
    defaultValues: {
      name: session?.data?.user?.name?.split(" ")[0] ?? "",
      surname: session?.data?.user?.name?.split(" ")[1] ?? "",
      street_name: streetName,
      street_number: streetNumber,
      email: session?.data?.user?.email ?? "",
      number: phoneNumber,
      city: city,
      province: province,
      postalCode: postalCode,
      floor: floor,
      apartment: apartment,
    },
  });

  // Actualiza los valores del formulario cuando los datos del store cambien
  useEffect(() => {
    reset({
      name: session?.data?.user?.name?.split(" ")[0] ?? "",
      surname: session?.data?.user?.name?.split(" ")[1] ?? "",
      street_name: streetName,
      street_number: streetNumber,
      email: session?.data?.user?.email ?? "",
      number: phoneNumber,
      city: city,
      province: province,
      postalCode: postalCode,
      floor: floor,
      apartment: apartment,
    });
  }, [
    session,
    streetName,
    streetNumber,
    phoneNumber,
    city,
    province,
    postalCode,
    floor,
    apartment,
    reset,
  ]);

  const getTotalOrderPrice = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  };

  const areaCodes = [
    "11",
    "221",
    "223",
    "261",
    "264",
    "266",
    "280",
    "291",
    "297",
    "298",
    "299",
    "341",
    "342",
    "343",
    "345",
    "351",
    "353",
    "358",
    "362",
    "364",
    "370",
    "376",
    "379",
    "380",
    "381",
    "383",
    "385",
    "387",
    "388",
    "220",
    "230",
    "236",
    "249",
    "260",
    "2901",
    "2902",
    "2903",
    "2914",
    "2920",
    "2921",
    "2922",
    "2923",
    "2924",
    "2925",
    "2926",
    "2927",
    "2928",
    "2929",
    "2931",
    "2932",
    "2933",
    "2934",
    "2935",
    "2936",
    "2937",
    "2938",
    "2940",
    "2942",
    "2945",
    "2946",
    "2948",
    "2952",
    "2953",
    "2954",
    "2962",
    "2963",
    "2964",
    "2966",
    "2968",
    "2972",
    "2974",
    "2975",
    "2976",
    "2982",
    "2983",
    "2984",
    "2985",
    "2986",
    "2988",
    "2994",
    "2995",
    "2996",
    "2997",
    "2998",
    "3751",
    "3755",
    "3756",
    "3757",
    "3758",
    "3759",
    "3772",
    "3773",
    "3774",
    "3775",
    "3777",
    "3778",
    "3779",
    "3804",
    "3805",
    "3806",
    "3813",
    "3814",
    "3815",
    "3832",
    "3835",
    "3837",
    "3838",
    "3841",
    "3843",
    "3844",
    "3845",
    "3846",
    "3854",
    "3855",
    "3856",
    "3857",
    "3858",
    "3861",
    "3862",
    "3863",
    "3865",
    "3867",
    "3868",
    "3869",
    "3873",
    "3876",
    "3877",
    "3878",
    "3885",
    "3886",
    "3887",
    "3888",
  ];

  const getAccurateAreaCode = (phone: string): string | null => {
    const cleaned = phone.replace(/^(\+54|54|0)/, "").replace(/\D/g, "");
    const normalized = cleaned.startsWith("9") ? cleaned.slice(1) : cleaned;

    const match = areaCodes
      .sort((a, b) => b.length - a.length)
      .find((code) => normalized.startsWith(code));

    return match ?? null;
  };

  const total = getTotalOrderPrice();

  const onSubmit = async (values: z.infer<typeof userAddressValidation>) => {
    setIsSubmitting(true);

    const areaCode = getAccurateAreaCode(values.number);
    const numberWithoutAreaCode =
      areaCode && values.number.startsWith(areaCode)
        ? values.number.slice(areaCode.length)
        : values.number;

    const payload = {
      cart: cartProducts,
      payer: {
        ...values,
        area_code: areaCode,
        number: numberWithoutAreaCode,
      },
      total,
    };

    try {
      const order = await axios.post("/api/orders", payload);
      const orderId = order.data.id.toString();

      await axios.put("/api/users", {
        phoneNumber: values.number,
        streetName: values.street_name,
        streetNumber: values.street_number,
        province: values.province,
        city: values.city,
        postalCode: values.postalCode,
        apartment: values.apartment,
        floor: values.floor,
      });

      const preferencePayload = {
        ...payload,
        orderId,
      };

      const response = await axios.post(
        "/api/checkout/preferences",
        preferencePayload,
      );

      const {
        back_urls,
        items,
        metadata,
        notification_url,
        statement_descriptor,
        payer,
        shipments,
        external_reference,
      } = response.data.response;

      const preference = {
        back_urls,
        items,
        metadata,
        notification_url,
        statement_descriptor,
        payer,
        shipments,
        external_reference,
      };

      localStorage.setItem("preference", JSON.stringify(preference));

      router.push(`/checkout/payment?preference=${response.data.response.id}`);
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Confirmá tu domicilio
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Completá estos datos para poder calcular el envío y continuar con el
            pago.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg bg-white p-6 shadow-lg"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="Juan"
              {...register("name")}
              defaultValue={session?.data?.user?.name?.split(" ")[0] ?? ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="surname">Apellido</Label>
            <Input
              id="surname"
              placeholder="Alvarez"
              {...register("surname")}
              defaultValue={session?.data?.user?.name?.split(" ")[1] ?? ""}
            />
            {errors.surname && (
              <p className="text-sm text-red-500">{errors.surname.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="street_name">Calle</Label>
            <Input
              id="street_name"
              placeholder="Av. Principal"
              {...register("street_name")}
              defaultValue={streetName}
            />
            {errors.street_name && (
              <p className="text-sm text-red-500">
                {errors.street_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="street_number">Número de calle</Label>
            <Input
              id="street_number"
              placeholder="4900"
              {...register("street_number")}
              defaultValue={streetNumber}
            />
            {errors.street_number && (
              <p className="text-sm text-red-500">
                {errors.street_number.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              placeholder="juan@ejemplo.com"
              {...register("email")}
              defaultValue={session?.data?.user?.email ?? ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Número de teléfono</Label>
            <Input
              id="number"
              placeholder="757148213"
              {...register("number")}
              defaultValue={phoneNumber}
            />
            {errors.number && (
              <p className="text-sm text-red-500">{errors.number.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                placeholder="Iguazú"
                {...register("city")}
                defaultValue={city}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Provincia</Label>
              <Input
                id="province"
                placeholder="Misiones"
                {...register("province")}
                defaultValue={province}
              />
              {errors.province && (
                <p className="text-sm text-red-500">
                  {errors.province.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Código Postal</Label>
            <Input
              id="postalCode"
              placeholder="28001"
              {...register("postalCode")}
              defaultValue={postalCode}
            />
            {errors.postalCode && (
              <p className="text-sm text-red-500">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="floor">Piso</Label>
              <Input
                id="floor"
                placeholder="12"
                {...register("floor")}
                defaultValue={floor}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Departamento</Label>
              <Input
                id="apartment"
                placeholder="120A"
                {...register("apartment")}
                defaultValue={apartment}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
