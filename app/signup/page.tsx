"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../_components/Header";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userRegisterSchema,
  UserRegisterSchema,
} from "@/app/_schemas/validationSchemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/_components/ui/card";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterSchema>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmit = async (data: UserRegisterSchema) => {
    setLoading(true);
    try {
      console.log("Datos del formulario:", data);
      // here we send the data to the server / API
      // const response = await fetch("/api/register", { method: "POST", body: JSON.stringify(data) });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen items-center justify-center bg-gray-100"
      >
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">
              Crear Cuenta
            </CardTitle>
            <CardDescription className="text-center">
              Rellena el formulario debajo para crear tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="joshua@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  O Continua con
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Google
            </Button>
          </CardFooter>
          <div className="pb-4 text-center text-sm text-gray-600">
            Ya tienes una cuenta?{" "}
            <Link href="/signin" className="text-blue-700 hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </Card>
      </form>
    </>
  );
};

export default Page;
