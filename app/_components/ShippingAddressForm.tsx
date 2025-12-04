"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { userAddressValidation } from "@/app/_schemas/validationSchemas";
import { useUserInfoStore } from "@/store/useUserInfoStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { Textarea } from "./ui/textarea";

interface ShippingAddressFormProps {
  onSuccess?: () => void;
}

export function ShippingAddressForm({ onSuccess }: ShippingAddressFormProps) {
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
    observations,
    updateUser,
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
      number: phoneNumber,
      city: city,
      province: province,
      postalCode: postalCode,
      floor: floor,
      apartment: apartment,
      observations: observations,
    },
  });

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
      observations: observations,
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
    observations,
    reset,
  ]);

  const onSubmit = async (values: z.infer<typeof userAddressValidation>) => {
    setIsSubmitting(true);
    try {
      if (session.status === "authenticated") {
        await axios.put("/api/users", {
          phoneNumber: values.number,
          streetName: values.street_name,
          streetNumber: values.street_number,
          province: values.province,
          city: values.city,
          postalCode: values.postalCode,
          apartment: values.apartment,
          floor: values.floor,
          observations: values.observations,
        });

        // Update local store
        updateUser({
          phoneNumber: values.number,
          streetName: values.street_name,
          streetNumber: values.street_number,
          province: values.province,
          city: values.city,
          postalCode: values.postalCode,
          apartment: values.apartment,
          floor: values.floor,
          observations: values.observations,
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Error al guardar la dirección:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" placeholder="Juan" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="surname">Apellido</Label>
          <Input id="surname" placeholder="Pérez" {...register("surname")} />
          {errors.surname && (
            <p className="text-sm text-red-500">{errors.surname.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="province">Provincia</Label>
          <Input
            id="province"
            placeholder="Buenos Aires"
            {...register("province")}
          />
          {errors.province && (
            <p className="text-sm text-red-500">{errors.province.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Localidad</Label>
          <Input id="city" placeholder="La Plata" {...register("city")} />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="street_name">
          Dirección (calle, altura, piso y dpto.)
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2 sm:col-span-1">
            <Input
              id="street_name"
              placeholder="Calle"
              {...register("street_name")}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Input
              id="street_number"
              placeholder="Altura"
              {...register("street_number")}
            />
          </div>
          <div className="col-span-1">
            <Input id="floor" placeholder="Piso" {...register("floor")} />
          </div>
          <div className="col-span-1">
            <Input
              id="apartment"
              placeholder="Dpto"
              {...register("apartment")}
            />
          </div>
        </div>
        {errors.street_name && (
          <p className="text-sm text-red-500">{errors.street_name.message}</p>
        )}
        {errors.street_number && (
          <p className="text-sm text-red-500">{errors.street_number.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="postalCode">CP (CPA)</Label>
          <Input
            id="postalCode"
            placeholder="1900"
            {...register("postalCode")}
          />
          {errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            placeholder="juan@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="number">Celular (sin 0 ni 15)</Label>
          <Input id="number" placeholder="1112345678" {...register("number")} />
          {errors.number && (
            <p className="text-sm text-red-500">{errors.number.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observations">Observaciones (opcional)</Label>
        <Textarea
          id="observations"
          placeholder="Ej: Tocar timbre, dejar en portería..."
          {...register("observations")}
        />
        {errors.observations && (
          <p className="text-sm text-red-500">{errors.observations.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Confirmando..." : "Confirmar Dirección"}
      </Button>
    </form>
  );
}
