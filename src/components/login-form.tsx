"use client";

import Cookies from "js-cookie";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/app/login/login.api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
  const router = useRouter();

  useEffect(() => {
    //Accede a las cookies solo despues de que el componente se haya montado
    const token = Cookies.get("access_token");
    if (token) {
      console.log("Token encontrado:", token);
      router.push("/main/dashboard"); //Redirige si ya esta autenticado
    }
  }, []);

  //Funcion para enviar los datos al backend de NestJS
  const onSubmit = handleSubmit(async (data: IFormInput) => {
    try {
      const res = await login(data);
      const resData = await res.json();

      //Verificar si el login fue exitoso
      if (res.ok && resData.access_token) {
        //Guarda el token en una cooke con js-cookie
        Cookies.set("access_token", resData.access_token, {
          expires: 1 / 24,
          path: "/",
        }); //expira en 1 hora
        //Redirige al dashboard
        router.push("/main/dashboard");
      } else {
        console.error("Login fallido", resData.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Inicia sesión con tu cuenta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Ingrese su correo electrónico a continuación para iniciar sesión en su
          cuenta
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
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button type="submit" className="w-full">
          {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </div>
      <div className="text-center text-sm">
        No tienes una cuenta?{" "}
        <a href="#" className="underline underline-offset-4">
          Registrate
        </a>
      </div>
    </form>
  );
}
