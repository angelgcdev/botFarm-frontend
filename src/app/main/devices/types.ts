import { ReactNode } from "react";

export type DeviceStatus = "ACTIVO" | "INACTIVO";

export type DevieType = "FISICO" | "EMULADOR";

export interface UpdateCompleteConfig {
  id: number;
  complete_config: boolean;
}

export interface DevicesCardInfoProps {
  device: Device;
  fetchDevices: () => void;
}

export interface SocialAccountFormModalProps {
  trigger: ReactNode;
  fetchData: () => void;
  accountId?: number;
  socialAccountToEdit?: SocialNetworkAccount;
}

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
  status?: string;
  social_network_accounts?: SocialNetworkAccount[];
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
  google_account_id?: number;
  social_network_id?: number;
  username: string;
  password: string;
  status?: string;
  created_at?: string;
  social_network: SocialNetwork;
}

export interface DeviceAccountsModalProps {
  children: ReactNode;
  deviceId: number;
  deviceName: string;
}

export interface Device {
  id: number;
  user_id: number;
  udid: string;
  device_type: DevieType;
  status: DeviceStatus;
  os_version: string;
  brand: string;
  connected_at: Date;
  last_activity: Date;
  complete_config?: boolean;
  google_accounts?: GoogleAccount;
}
