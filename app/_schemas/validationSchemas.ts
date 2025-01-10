import * as z from "zod";

export const userAddressValidation = z.object({
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
