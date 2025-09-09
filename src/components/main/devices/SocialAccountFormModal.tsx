"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Eye, EyeOff } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  addSocialMediaAccount,
  editSocialAccount,
  getSocialMediaData,
} from "@/app/main/devices/api";
import {
  SocialAccountFormModalProps,
  SocialMediaAccount,
  SocialNetwork,
} from "@/app/main/devices/types";
import { useDevices } from "@/context/DevicesContext";

//Esquema de validación con zod
const createSocialAccountSchema = z.object({
  social_network_id: z.number({ required_error: "Selecciona una plataforma" }),
  username: z.string().nonempty("Username es requerido"),
  password: z.string().optional(),
});

type CreateSocialAccountSchema = z.infer<typeof createSocialAccountSchema>;

export function SocialAccountFormModal({
  fetchData,
  accountId,
  socialAccountToEdit,
  trigger,
}: SocialAccountFormModalProps) {
  const { fetchDevices } = useDevices();

  const [isOpen, setIsOpen] = useState(false);

  // Estado para guardar redes sociales obtenidas para el select
  const [socialMediaData, setSocialMediaData] = useState<SocialNetwork[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateSocialAccountSchema>({
    resolver: zodResolver(createSocialAccountSchema),
    defaultValues: {
      social_network_id: socialAccountToEdit?.social_network.id || undefined,
      username: socialAccountToEdit?.username || "",
      password: socialAccountToEdit?.password || "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchSocialMedia();
  }, []);

  // Obtener datos para el select
  const fetchSocialMedia = async () => {
    const res = await getSocialMediaData();

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    console.log("Social media data:", res.data);
    setSocialMediaData(res.data);
  };

  const onSubmit = handleSubmit(async (data: SocialMediaAccount) => {
    if (socialAccountToEdit) {
      //Modo edicion
      console.log("SocialAccountToEdit:", socialAccountToEdit);
      console.log("Edit social account:", data);

      const res = await editSocialAccount(data, socialAccountToEdit.id);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success(`Cuenta de red social actualizada correctamente.`);
    } else {
      // Modo agregar
      const payload = {
        ...data,
        google_account_id: accountId,
      };

      const res = await addSocialMediaAccount(payload);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success("Cuenta Red Social añadida correctamente");
    }

    // Actualizar datos del servidor
    await fetchData();

    // Actualizar el contexto DevicesContext
    fetchDevices();

    // cerrar el modal
    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {socialAccountToEdit ? "Editar" : "Agregar"} Red Social
          </DialogTitle>
          <DialogDescription>
            Completa la información de la cuenta de red social
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Plataforma *</Label>
            <Controller
              name="social_network_id"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString() ?? ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialMediaData.map((socialMedia) => (
                      <SelectItem
                        key={socialMedia.id}
                        value={socialMedia.id.toString()}
                      >
                        {socialMedia.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.social_network_id && (
              <p className="text-sm text-destructive">
                {errors.social_network_id.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Nombre de Usuario *</Label>
            <Input
              id="username"
              placeholder="@usuario o nombre de usuario"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña (Opcional)</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña de la cuenta"
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
            <p className="text-xs text-muted-foreground">
              La contraseña es opcional y se almacena de forma segura
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Guardando"
                : socialAccountToEdit
                ? "Actualizar"
                : "Agregar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
