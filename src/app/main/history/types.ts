import { ReactNode } from "react";

export enum HistoryStatus {
  COMPLEATADA = "COMPLETADA",
  FALLIDA = "FALLIDA",
}

export interface FacebookSharedGroups {
  id: number;
  name: string;
  history_id: number;
}

export interface FacebookHistoryProps {
  renderStatusBadge: (status: string) => ReactNode;
}

export interface TiktokHistoryProps {
  renderStatusBadge: (status: string) => ReactNode;
}

export interface TiktokInteractionHistory {
  id: number;
  device_id?: number;
  username: string;
  total_views: number;
  liked: boolean;
  video_saved: boolean;
  shared_on_facebook: boolean;
  commented: string | null;
  finished_at: string; // ISO date
  video_url: string;
  status: HistoryStatus;
}

export interface FacebookInteractionHistory {
  id: number;
  device_id?: number;
  post_url: string;
  title_post?: string;
  liked: boolean;
  comment: string;
  finished_at: string;
  status: HistoryStatus;
}

export interface SocialNetworkAccount {
  id: number;
  username: string;
  status: string;
  created_at: string;
  social_network: {
    id: number;
    name: string; // "TIKTOK" | "FACEBOOK"
  };
  tiktok_interaction_histories?: TiktokInteractionHistory[];
  facebook_interaction_histories?: FacebookInteractionHistory[];
}

export interface GoogleAccount {
  id: number;
  email: string;
  status: string;
  social_network_accounts: SocialNetworkAccount[];
}

export interface FacebookInteractionHistoryFull {
  id: number;
  device_id?: number;
  post_url: string;
  title_post?: string;
  liked: boolean;
  comment: string;
  finished_at: string;
  status: HistoryStatus;

  device: Device;
  facebook_shared_groups: FacebookSharedGroups[];
}

export interface TiktokInteractionHistoryFull {
  id: number;
  username: string;
  total_views: number;
  liked: boolean;
  video_saved: boolean;
  shared_on_facebook: boolean;
  commented: string | null;
  video_url: string;
  status: HistoryStatus;
  finished_at: string;
  device_id: number;

  device: Device;
}

export interface Device {
  id: number;
  udid: string;
  device_type: string;
  status: string;
  os_version: string;
  brand: string;
  connected_at?: string;
  last_activity?: string;
}
