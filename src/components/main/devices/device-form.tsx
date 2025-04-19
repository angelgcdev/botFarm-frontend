"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { setInfoAccountDevice } from "@/app/main/devices/setInfoAccountDevice.api";

const items = [
  {
    id: "tiktok",
    label: "TikTok",
  },
  {
    id: "facebook",
    label: "Facebook",
  },
] as const;

const FormSchema = z.object({
  email: z
    .string()
    .email("Debe ser un correo válido")
    .min(1, "El correo es requerido"),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos un elemento.",
  }),
});

interface DeviceFormProps {
  onClose: () => void;
}

export function DeviceForm({ onClose }: DeviceFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    const res = setInfoAccountDevice(data);

    toast.success("Datos enviados correctamente:", {
      description: "Datos registrados.",
    });

    //Cerramos el modal
    onClose();
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico Google</FormLabel>
                <FormControl>
                  <Input placeholder="correo@gmail.com" {...field} />
                </FormControl>
                <FormDescription>Introduce tu cuenta google</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Redes sociales</FormLabel>
                  <FormDescription>
                    Seleccion las redes sociales que tenga registrada la cuenta
                    de google.
                  </FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Guardar</Button>
        </form>
      </Form>
    </>
  );
}
