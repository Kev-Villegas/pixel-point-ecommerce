"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAddressValidation } from "@/app/_schemas/validationSchemas";

export function UserAddressForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios.post("/api/checkout/preferences").then((response) => {
      window.localStorage.setItem(
        "id",
        JSON.stringify(response.data.response.id),
      );
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof userAddressValidation>>({
    resolver: zodResolver(userAddressValidation),
  });

  const onSubmit = (values: z.infer<typeof userAddressValidation>) => {
    setIsSubmitting(true);
    const address = {
      receiver_address: {
        zip_code: values.postalCode,
        street_number: values.street_number,
        street_name: values.street_name,
        floor: values.floor,
        apartment: values.apartment,
      },
    };

    console.log(address);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Dirección guardada con éxito");
      reset();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-10 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" placeholder="Juan" {...register("name")} name="name" />
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
          name="surname"
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
          name="street_name"
        />
        {errors.street_name && (
          <p className="text-sm text-red-500">{errors.street_name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="street_number">Número de calle</Label>
        <Input
          id="street_number"
          placeholder="123"
          {...register("street_number")}
          name="street_number"
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
          name="email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="area_code">Código de área</Label>
        <Input
          id="area_code"
          placeholder="+54"
          {...register("area_code")}
          name="area_code"
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
          name="number"
        />
        {errors.number && (
          <p className="text-sm text-red-500">{errors.number.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input
            id="city"
            placeholder="Iguazú"
            {...register("city")}
            name="city"
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
            name="province"
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
          name="postalCode"
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
          name="floor"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apartment">Departamento</Label>
        <Input
          id="apartment"
          placeholder="120A"
          {...register("apartment")}
          name="apartment"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
