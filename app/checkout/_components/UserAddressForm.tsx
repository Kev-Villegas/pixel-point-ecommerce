"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  streetAddress: z.string().min(5, {
    message: "La calle debe tener al menos 5 caracteres.",
  }),
  email: z.string().email({
    message: "Debe ser un correo electrónico válido.",
  }),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,14}$/, {
    message: "Debe ser un número de teléfono válido.",
  }),
  city: z.string().min(2, {
    message: "La ciudad debe tener al menos 2 caracteres.",
  }),
  province: z.string().min(2, {
    message: "La provincia debe tener al menos 2 caracteres.",
  }),
  postalCode: z.string().regex(/^[0-9]{5}$/, {
    message: "Debe ser un código postal válido de 5 dígitos.",
  }),
});

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
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // !Handle Api Data here
    console.log(values);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Dirección guardada con exito");
      reset();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-10 py-2">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nombre Completo</Label>
        <Input
          id="fullName"
          placeholder="Juan Alvarez"
          {...register("fullName")}
          name="fullName"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="streetAddress">Calle</Label>
        <Input
          id="streetAddress"
          placeholder="Av. Principal 123"
          {...register("streetAddress")}
          name="streetAddress"
        />
        {errors.streetAddress && (
          <p className="text-sm text-red-500">{errors.streetAddress.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="correo"
          placeholder="juan@ejemplo.com"
          {...register("email")}
          name="email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Número de teléfono</Label>
        <Input
          id="phoneNumber"
          placeholder="+543757148213"
          {...register("phoneNumber")}
          name="phoneNumber"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
