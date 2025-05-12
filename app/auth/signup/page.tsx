"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
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

  const router = useRouter();

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
      const response = await signUp(data.email, data.password);

      if (response.error) {
        console.log(response.error);
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
              <span className="bg-white px-2 text-muted-foreground">
                O Continúa con
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
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
