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

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "El nombre no debe exceder los 50 caracteres.",
    }),
  surname: z
    .string()
    .min(2, {
      message: "El apellido debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "El apellido no debe exceder los 50 caracteres.",
    }),
  street_name: z
    .string()
    .min(5, {
      message: "La calle debe tener al menos 5 caracteres.",
    })
    .max(100, {
      message: "El nombre de la calle no debe exceder los 100 caracteres.",
    }),
  street_number: z
    .string()
    .min(1, {
      message: "El número de la calle es obligatorio.",
    })
    .max(10, {
      message: "El número de la calle no debe exceder los 10 caracteres.",
    }),
  email: z
    .string()
    .email({
      message: "Debe ser un correo electrónico válido.",
    })
    .max(100, {
      message: "El correo electrónico no debe exceder los 100 caracteres.",
    }),
  area_code: z
    .string()
    .regex(/^\+?[0-9]{1,5}$/, {
      message: "Debe ser un código de área válido.",
    })
    .max(5, {
      message: "El código de área no debe exceder los 5 caracteres.",
    }),
  number: z
    .string()
    .regex(/^[0-9]{10,14}$/, {
      message: "Debe ser un número de teléfono válido.",
    })
    .max(15, {
      message: "El número de teléfono no debe exceder los 15 caracteres.",
    }),
  city: z
    .string()
    .min(2, {
      message: "La ciudad debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "El nombre de la ciudad no debe exceder los 50 caracteres.",
    }),
  province: z
    .string()
    .min(2, {
      message: "La provincia debe tener al menos 2 caracteres.",
    })
    .max(50, {
      message: "El nombre de la provincia no debe exceder los 50 caracteres.",
    }),
  postalCode: z
    .string()
    .regex(/^[0-9]{5}$/, {
      message: "Debe ser un código postal válido de 5 dígitos.",
    })
    .max(5, {
      message: "El código postal no debe exceder los 5 caracteres.",
    }),
  floor: z
    .string()
    .max(10, {
      message: "El piso no debe exceder los 10 caracteres.",
    })
    .optional(),
  apartment: z
    .string()
    .max(10, {
      message: "El departamento no debe exceder los 10 caracteres.",
    })
    .optional(),
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

  // useForm hook
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
