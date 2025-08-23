import { ReactNode } from "react";

export type Role = "ADMINISTRADOR" | "PERSONAL";

export type EditUserFormProps = React.ComponentProps<"div"> & {
  user: UserDataItem;
  onCloseModal: () => void;
  onUserEdited: () => void;
};

export type EditUserModalProps = {
  trigger: ReactNode; // El botón (o cualquier elemento) que actuará como disparador
  // children?: ReactNode; // Contenido del diálogo
  user: UserDataItem;
  onUserEdited: () => void;
};

export interface CreateUserFormInput {
  email: string;
  password: string;
  role: Role;
}

export interface UserDataItem {
  id: number;
  email: string;
  password: string;
  role: Role;
  created_at: string;
  updated_at: string;
  _count?: {
    devices: number;
  };
}

export type UsersListProps = {
  usersData: UserDataItem[];
  onUserEdited: () => void;
};

export type CreateUserFormProps = React.ComponentProps<"div"> & {
  onUserCreated: () => void;
};
