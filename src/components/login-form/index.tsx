"use client";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/app/login/api";
// import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useState } from "react";
interface IFormInput {
  email: string;
  password: string;
}

//Esquema de validacion con zod
const loginSchema = z.object({
  email: z
    .string()
    .email("Formato de correo no válido")
    .nonempty("Correo es requerido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .nonempty("Contraseña es requerida"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({ resolver: zodResolver(loginSchema) }); //integrar zod con React Hook Form
  // const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  //Funcion para enviar los datos al backend de NestJS
  const onSubmit = handleSubmit(async (data: IFormInput) => {
    try {
      const res = await login(data);

      if (!res.ok) {
        toast.error(res.message);
        console.error("login fallido:", res.message);
      }

      const resData = res.data;

      // Guardar en localStorage
      localStorage.setItem("token", resData.accessToken);
      localStorage.setItem("userId", resData.user.userId);
      localStorage.setItem("email", resData.user.email);
      localStorage.setItem("role", resData.user.role);

      //Redirige al dashboard
      // router.push("/main/dashboard");
      window.location.href =
        resData.user.role === "ADMINISTRADOR"
          ? "/main/dashboard-admin"
          : "/main/dashboard";
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  });

  return (
    <>
      <Toaster />
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Inicia sesión con tu cuenta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingrese su correo electrónico a continuación para iniciar sesión en
            su cuenta
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@correo.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Espere por favor
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          No tienes una cuenta?{" "}
          <a href="#" className="underline underline-offset-4">
            Registrate
          </a>
        </div>
      </form>
    </>
  );
}
