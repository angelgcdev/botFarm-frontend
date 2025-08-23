"use client";

import { UsersListProps } from "@/app/admin/usuarios/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import React from "react";
import { EditUserModal } from "./EditUserModal";
import { formatRelativeWithDateFns } from "@/lib/utils/formatRelativeWithDateFns";
import { toast } from "sonner";
import { deleteUser } from "@/app/admin/usuarios/api";

export const UsersList = ({ onUserEdited, usersData }: UsersListProps) => {
  // Manejador de eliminar usuario
  const handleDeleteUser = async (id: number) => {
    console.log("Id de usuario a eliminar:", id);

    const res = await deleteUser(id);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    const resData = res.data;
    toast.success("Usuario eliminado Correctamente:", resData.email);
    onUserEdited();
  };

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Badge variant="secondary">{usersData.length} usuarios</Badge>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Correo</TableHead>
            <TableHead>Dispositivos</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead>Fecha de actualización</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{user._count?.devices}</span>
                  {(user._count?.devices ?? 0) > 0 && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatRelativeWithDateFns(user.created_at)}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatRelativeWithDateFns(user.updated_at)}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <EditUserModal
                    onUserEdited={onUserEdited}
                    user={user}
                    trigger={
                      <Button
                        variant="outline"
                        className="cursor-pointer flex-1 border-gray-300 hover:bg-gray-50"
                        size="sm"
                      >
                        <SquarePen className="w-4 h-4 mr-1" />
                      </Button>
                    }
                  ></EditUserModal>

                  <Button
                    variant="outline"
                    className="cursor-pointer flex-1 border-red-300 text-red-700 hover:bg-red-50"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
