export interface Device {
  connected_at: string;
  device_type: string;
  id: number;
  last_activity: string | null;
  brand: string;
  status: string;
  udid: string;
  user_id: number;
  os_version: string;
  complete_config: boolean;
}
