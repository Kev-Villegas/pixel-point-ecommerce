"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userLoginSchema,
  UserLoginSchema,
} from "@/app/_schemas/validationSchemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { status, data: session } = useSession();
  const router = useRouter();

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
      const signInResponse = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (signInResponse?.error === "CredentialsSignin") {
        toast.error("Correo electrónico o contraseña incorrecta");
      } else {
        toast.success("Inicio de sesión exitoso.");
        router.push("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Ocurrió un error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.emailVerified === null && session.user.email) {
        router.push(`/verify?email=${encodeURIComponent(session.user.email)}`);
      } else {
        router.refresh();
        router.push("/");
      }
    }
  }, [status, session, router]);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          Iniciar Sesión
        </CardTitle>
        <CardDescription className="text-center">
          Ingrese su email y contraseña para iniciar sesión
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
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
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-muted-foreground">O Continúa con</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            signIn("google", { callbackUrl: "/" });
          }}
        >
          <svg
            className="mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.15 0 5.68 1.3 7.24 2.39l5.34-5.34C33.19 3.47 28.94 2 24 2 14.8 2 7.21 7.95 4.27 16.2l6.56 5.1C12.3 14.3 17.6 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.1 24.5c0-1.6-.13-2.8-.41-4H24v7.5h12.5c-.54 2.9-2.18 5.37-4.66 7.02l7.36 5.74C43.72 36.7 46.1 31.2 46.1 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.84 28.36A14.87 14.87 0 0 1 9.5 24c0-1.5.25-2.94.69-4.36L3.63 14.5A22.3 22.3 0 0 0 2 24c0 3.6.86 7.01 2.38 9.5l6.46-5.14z"
            />
            <path
              fill="#34A853"
              d="M24 46c5.94 0 10.93-1.95 14.57-5.3l-7.36-5.74c-2.02 1.4-4.6 2.24-7.21 2.24-6.37 0-11.77-4.8-13.56-11.24l-6.56 5.1C7.21 40.05 14.8 46 24 46z"
            />
            <path fill="none" d="M2 2h44v44H2z" />
          </svg>
          Google
        </Button>
        <div className="pb-4 text-center text-sm text-gray-600">
          No tienes una cuenta?{" "}
          <Link href="/auth/signup" className="text-blue-700 hover:underline">
            Crear Cuenta
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
