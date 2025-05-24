import * as z from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const userAddressValidation = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { message: "El nombre no debe exceder los 50 caracteres." }),
  surname: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres." })
    .max(50, { message: "El apellido no debe exceder los 50 caracteres." }),
  street_name: z
    .string()
    .min(5, { message: "La calle debe tener al menos 5 caracteres." })
    .max(100, {
      message: "El nombre de la calle no debe exceder los 100 caracteres.",
    }),
  street_number: z
    .string()
    .min(1, { message: "El número de la calle es obligatorio." })
    .max(10, {
      message: "El número de la calle no debe exceder los 10 caracteres.",
    }),
  email: z
    .string()
    .email({ message: "Debe ser un correo electrónico válido." })
    .max(100, {
      message: "El correo electrónico no debe exceder los 100 caracteres.",
    }),
  number: z
    .string()
    .min(7, { message: "Muy corto para ser un número válido." })
    .max(15, { message: "Muy largo para ser un número válido." })
    .refine(
      (val) => {
        const phone = parsePhoneNumberFromString(val, "AR");
        return phone?.isValid() ?? false;
      },
      {
        message: "Introduce un número válido.",
      },
    ),
  city: z
    .string()
    .min(2, { message: "La ciudad debe tener al menos 2 caracteres." })
    .max(50, {
      message: "El nombre de la ciudad no debe exceder los 50 caracteres.",
    }),
  province: z
    .string()
    .min(2, { message: "La provincia debe tener al menos 2 caracteres." })
    .max(50, {
      message: "El nombre de la provincia no debe exceder los 50 caracteres.",
    }),
  postalCode: z
    .string()
    .regex(/^[0-9]{4,5}$/, { message: "Debe ser un código postal válido." })
    .max(5, { message: "El código postal no debe exceder los 5 caracteres." }),
  floor: z
    .string()
    .max(10, { message: "El piso no debe exceder los 10 caracteres." })
    .optional(),
  apartment: z
    .string()
    .max(10, { message: "El departamento no debe exceder los 10 caracteres." })
    .optional(),
});

export const userRegisterSchema = z
  .object({
    email: z.string().min(1, "El email es obligatorio").email("Email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Debes confirmar la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
  email: z.string().min(1, "El email es obligatorio").email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type UserLoginSchema = z.infer<typeof userLoginSchema>;
