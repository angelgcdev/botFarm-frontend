export type InteractionStatus =
  | "PENDIENTE"
  | "EN_PROGRESO"
  | "COMPLETADA"
  | "FALLIDA"
  | "CANCELADO";

export type FacebookInteractionForm = {
  post_url: string;
  title_post?: string;
  liked?: boolean;
  comment?: string;
  share_groups_count?: number;
};

export type TiktokInteractionForm = {
  video_url: string;
  views_count?: number;
  liked?: boolean;
  saved?: boolean;
  shared_on_facebook?: boolean;
  comment?: string;
};

export interface TikTokPreview {
  version?: string;
  type?: string;
  author_url?: string;
  author_name?: string;
  width?: string;
  height?: string;
  html?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
  provider_url?: string;
  provider_name?: string;
  author_unique_id?: string;
  embed_product_id?: string;
  embed_type?: string;
  thumbnail_url?: string;
  title?: string;
}

export interface ScheduledTiktokInteraction {
  id?: number;
  user_id?: number;
  video_url: string;
  views_count?: number;
  liked?: boolean;
  saved?: boolean;
  shared_on_facebook?: boolean;
  comment?: string;
  status?: InteractionStatus;
  created_at?: string;
  updated_at?: string;
}

export interface ScheduledTiktokInteractionEdit {
  id: number;
  user_id?: number;
  video_url: string;
  views_count?: number;
  liked?: boolean;
  saved?: boolean;
  shared_on_facebook?: boolean;
  comment?: string;
  status?: InteractionStatus;
}

export interface FacebookInteractionEdit {
  id: number;
  user_id?: number;
  post_url: string;
  title_post?: string;
  liked?: boolean;
  comment?: string;
  share_groups_count?: number;
}

export interface ScheduledInteractions {
  tiktok: TiktokInteraction[];
  facebook: FacebookInteraction[];
}

export interface TiktokInteraction {
  id: number;
  user_id: number;
  video_url: string;
  views_count: number;
  liked: boolean;
  saved: boolean;
  shared_on_facebook?: boolean;
  comment: string;
  status: InteractionStatus;
  created_at: string;
  updated_at: string;
}

export interface FacebookInteraction {
  id: number;
  user_id: number;
  post_url: string;
  title_post?: string;
  liked?: boolean;
  comment?: string;
  share_groups_count?: number;
  status: InteractionStatus;
  created_at: string;
  updated_at: string;
}

export type ExecutionInfo = {
  estimatedTime: string;
  interactionId: number;
  totalDevices: number;
};
