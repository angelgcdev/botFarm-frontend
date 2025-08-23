"use client";

import { CreateUserForm } from "@/components/admin/usuarios/CreateUserForm";
import { UsersList } from "@/components/admin/usuarios/UsersList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { UserDataItem } from "./types";
import { getUserData } from "./api";

const UsuariosPage = () => {
  const [usersData, setUsersData] = useState<UserDataItem[]>([]);

  const fetchData = async () => {
    const res = await getUserData();
    console.log(res);

    if (!res.ok) {
      toast.error(res.message);
      console.error(res.message);
      return;
    }

    setUsersData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Users list:", usersData);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Toaster />
      <div className="flex w-full flex-col gap-6 ">
        <div className="self-center max-w-[800px] w-full">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Crear nuevo usuario</CardTitle>
              <CardDescription>
                Completa la información para crear una nueva cuenta de usuario
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateUserForm onUserCreated={fetchData} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Información de Usuarios</CardTitle>
            <CardDescription>
              Gestiona y supervisa todos los usuarios del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersList onUserEdited={fetchData} usersData={usersData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsuariosPage;
