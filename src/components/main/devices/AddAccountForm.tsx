import { addDeviceAccount, editDeviceAccount } from "@/app/main/devices/api";
import { AddAccountFormData } from "@/app/main/devices/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface ChildProps {
  setShowAddAccountForm: React.Dispatch<React.SetStateAction<boolean>>;
  deviceId: number;
  fetchData: () => void;
  accountToEdit?: { id: number; email: string };
}

//Esquema de validacion con zod
const createAccountDeviceSchema = z.object({
  email: z
    .string()
    .email("Formato de correo no válido")
    .nonempty("Correo es requerido"),
});

type CreateAccountDeviceSchema = z.infer<typeof createAccountDeviceSchema>;

export const AddAccountForm = ({
  setShowAddAccountForm,
  deviceId,
  accountToEdit,
  fetchData,
}: ChildProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountDeviceSchema>({
    resolver: zodResolver(createAccountDeviceSchema),
    defaultValues: {
      email: accountToEdit?.email || "",
    },
  });

  const onSubmit = handleSubmit(async (data: AddAccountFormData) => {
    if (accountToEdit) {
      // Modo edición
      const res = await editDeviceAccount({
        id: accountToEdit.id,
        email: data.email,
      });

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success(`Cuenta actualizada correctamente`);
    } else {
      // Modo agregar
      const payload = {
        device_id: deviceId,
        email: data.email,
      };

      const res = await addDeviceAccount(payload);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success("Cuenta añadida correctamente");
    }

    // Actualizar datos del servidor
    await fetchData();

    setShowAddAccountForm(false);
  });

  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <form onSubmit={onSubmit}>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="sm"
                className="cursor-pointer"
              >
                {isSubmitting
                  ? "Guardando..."
                  : accountToEdit
                  ? "Actualizar"
                  : "Agregar"}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setShowAddAccountForm(false);
                }}
                size="sm"
                className="cursor-pointer"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
