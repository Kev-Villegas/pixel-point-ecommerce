"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { userAddressValidation } from "@/app/_schemas/validationSchemas";
import { useCartStore } from "@/store/useCartStore";
import { useUserInfoStore } from "@/store/useUserInfoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

export function UserAddressForm() {
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
  } = useForm<z.infer<typeof userAddressValidation>>({
    resolver: zodResolver(userAddressValidation),
    defaultValues: {
      name: session?.data?.user?.name?.split(" ")[0] ?? "",
      surname: session?.data?.user?.name?.split(" ")[1] ?? "",
      street_name: streetName,
      street_number: streetNumber,
      email: session?.data?.user?.email ?? "",
      area_code: "",
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
      area_code: "",
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

  const total = getTotalOrderPrice();

  const onSubmit = async (values: z.infer<typeof userAddressValidation>) => {
    setIsSubmitting(true);
    const payload = {
      cart: cartProducts,
      payer: values,
      total: total,
    };

    const order = await axios.post("/api/orders", payload);
    const orderId = order.data.id.toString();

    const preferencePayload = {
      ...payload,
      orderId,
    };

    const response = await axios.post(
      "/api/checkout/preferences",
      preferencePayload,
    );

    setIsSubmitting(false);
    router.push(`/checkout/payment?preference=${response.data.response.id}`);
    // const { api_response, total_amount, ...rest } = response.data.response
    const {
      back_urls,
      items,
      metadata,
      notification_url,
      statement_descriptor,
      payer,
      shipments,
    } = response.data.response;

    const preference = {
      back_urls,
      items,
      metadata,
      notification_url,
      statement_descriptor,
      payer,
      shipments,
    };

    localStorage.setItem("preference", JSON.stringify(preference));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-10 py-2">
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
          <p className="text-sm text-red-500">{errors.street_name.message}</p>
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
          <p className="text-sm text-red-500">{errors.street_number.message}</p>
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="area_code">Código de área</Label>
          <Input
            id="area_code"
            placeholder="351"
            {...register("area_code")}
            defaultValue=""
          />
          {errors.area_code && (
            <p className="text-sm text-red-500">{errors.area_code.message}</p>
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
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <p className="text-sm text-red-500">{errors.province.message}</p>
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
          <p className="text-sm text-red-500">{errors.postalCode.message}</p>
        )}
      </div>

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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
