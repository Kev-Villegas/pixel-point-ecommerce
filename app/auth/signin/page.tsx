"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  userLoginSchema,
  UserLoginSchema,
} from "@/app/_schemas/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../_components/Header";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = async (data: UserLoginSchema) => {
    setLoading(true);

    try {
      console.log("Datos de inicio de sesión:", data);
      // here we send data to the API
      // const response = await fetch("/api/login", { method: "POST", body: JSON.stringify(data) });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center">
              Ingrese su email y contraseña para iniciar sesión
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  O Continúa con
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
              }}
            >
              Google
            </Button>
          </CardFooter>
          <div className="pb-4 text-center text-sm text-gray-600">
            No tienes una cuenta?{" "}
            <Link href="/auth/signup" className="text-blue-700 hover:underline">
              Crear Cuenta
            </Link>
          </div>
        </Card>
      </form>
    </>
  );
}
