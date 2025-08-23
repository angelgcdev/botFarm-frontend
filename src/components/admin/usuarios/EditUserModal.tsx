"use client";

import { EditUserModalProps } from "@/app/admin/usuarios/types";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { EditUserForm } from "./EditUserForm";

const EditUserModal = ({ onUserEdited, trigger, user }: EditUserModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Información de usuario</DialogTitle>
          <DialogDescription>
            Edita la información del usuario
          </DialogDescription>
        </DialogHeader>

        <EditUserForm
          onUserEdited={onUserEdited}
          onCloseModal={handleCloseModal}
          user={user}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { EditUserModal };
