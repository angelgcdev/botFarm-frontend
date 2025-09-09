"use client";

import {
  CreateUserFormInput,
  CreateUserFormProps,
} from "@/app/admin/usuarios/types";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser } from "@/app/admin/usuarios/api";
import { useState } from "react";

//Esquema de validacion con zod
const createUserSchema = z.object({
  email: z
    .string()
    .email("Formato de correo no válido")
    .nonempty("Correo es requerido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .nonempty("Contraseña es requerida"),
  role: z.enum(["ADMINISTRADOR", "PERSONAL"], {
    errorMap: () => ({ message: "Debe seleccionar un rol válido" }),
  }),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

export function CreateUserForm({
  onUserCreated,
  className,
  ...props
}: CreateUserFormProps) {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
    },
  }); //integrar zod con

  const [showPassword, setShowPassword] = useState(false);

  //Funcion para enviar los datos al backend de NestJS
  const onSubmit = handleSubmit(async (data: CreateUserFormInput) => {
    try {
      console.log("Create user form", data);

      const res = await createUser(data);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      const resData = res.data;

      toast.success(`Cuenta creada correctamente: ${resData.email}`);

      onUserCreated();

      reset();
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
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
                placeholder="Ingresa una contraseña"
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

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Rol de usuario</Label>
            </div>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERSONAL">PERSONAL</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Espere por favor
              </>
            ) : (
              "Crear Cuenta"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
