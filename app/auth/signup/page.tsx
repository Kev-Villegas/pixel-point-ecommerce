"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { signUp } from "../../actions/users/signUp";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Check, Dot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  userRegisterSchema,
  UserRegisterSchema,
} from "@/app/_schemas/validationSchemas";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserRegisterSchema>({
    resolver: zodResolver(userRegisterSchema),
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const passwordRules = [
    {
      label: "Al menos 6 caracteres",
      isValid: password?.length >= 6,
    },
    {
      label: "Las contraseñas coinciden",
      isValid: confirmPassword?.length > 0 && password === confirmPassword,
    },
  ];

  const onSubmit = async (data: UserRegisterSchema) => {
    setLoading(true);

    try {
      const response = await signUp(
        data.email,
        data.password,
        data.name,
        data.lastname,
      );

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Usuario registrado exitosamente.");
        router.push("/auth/signin");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("Ocurrió un error al registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (googleLoading) return;
    setGoogleLoading(true);
    try {
      await signIn("google");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-screen items-center justify-center bg-gray-100 md:my-4"
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
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastname">Apellido</Label>
            <Input
              id="lastname"
              type="text"
              placeholder="Tu apellido"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname.message}</p>
            )}
          </div>
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

          <div>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="mt-2 space-y-1 text-sm">
            {passwordRules.map((rule, index) => (
              <p
                key={index}
                className={`flex items-center transition-opacity duration-300 ${
                  rule.isValid
                    ? "text-green-600 line-through opacity-60"
                    : "text-gray-700 opacity-100"
                }`}
              >
                {rule.isValid ? (
                  <Check size={16} className="mr-2 font-bold text-green-600" />
                ) : (
                  <Dot className="ml-[-4px]" />
                )}
                <span>{rule.label}</span>
              </p>
            ))}
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
              <span className="px-2 text-muted-foreground">O Continúa con</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            <svg
              className="h-5 w-5"
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
            {googleLoading ? "Cargando..." : "Google"}
          </Button>
        </CardFooter>
        <div className="pb-4 text-center text-sm text-gray-600">
          Ya tienes una cuenta?{" "}
          <Link href="/auth/signin" className="text-blue-700 hover:underline">
            Iniciar Sesión
          </Link>
        </div>
      </Card>
    </form>
  );
};

export default SignUpPage;
