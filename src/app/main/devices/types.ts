import { ReactNode } from "react";

export interface SocialMediaAccount {
  id?: number;
  google_account_id?: number;
  password?: string;
  social_network_id: number;
  username: string;
}

export interface SocialNetwork {
  id: number;
  name: string;
}

export interface AddAccountFormData {
  email: string;
}

export interface IFormInput {
  email: string;
  items: string[];
  dispositivo_id: number;
}

export interface GoogleAccount {
  id?: number;
  device_id?: number;
  email: string;
}

export interface AccountsAndSocialMedia {
  id: number;
  device_id: number;
  email: string;
  status: GoogleAccountStatus;
  social_network_accounts: SocialNetworkAccount[];
}

export type GoogleAccountStatus = "ACTIVO" | "INACTIVO" | "BANEADO";

export interface SocialNetworkAccount {
  id: number;
  username: string;
  password: string;
  social_network: SocialNetwork;
}

export interface DeviceAccountsModalProps {
  children: ReactNode;
  deviceId: number;
  deviceName: string;
}
