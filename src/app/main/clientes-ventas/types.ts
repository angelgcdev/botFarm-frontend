export type ClientOrigin = "TIKTOK" | "FACEBOOK" | "RECOMENDACION" | "OTRO";

export type SalesListProps = {
  salesClients: SaleClient[];
  fetchSales: () => void;
  clients?: Client[];
};

export type ClientsListProps = {
  clients: Client[];
  fetchClients: () => void;
};

export type ClientForm = {
  name?: string;
  ci: string;
  phone?: string;
  email?: string;
  city?: string;
};

export type Client = {
  id: number;
  user_id?: number;
  name?: string;
  ci: string;
  phone?: string;
  email?: string;
  city?: string;
  created_at: string;
  updated_at: string;
};

export type SaleForm = {
  client_id?: number | null;
  total?: number;
  client_origin: ClientOrigin;
};

export type SaleClient = {
  id: number;
  client_id?: number | null;
  user_id?: number;
  total?: number;
  client_origin: ClientOrigin;
  created_at: string;
  updated_at: string;
  client?: Client | null;
};

export type Sale = {
  id: number;
  client_id?: number | null;
  user_id?: number;
  total?: number;
  client_origin: ClientOrigin;
  created_at: string;
  updated_at: string;
};
