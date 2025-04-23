export interface Device {
  connected_at: string;
  device_type: string;
  id: number;
  last_activity: string | null;
  marca: string;
  status: string;
  udid: string;
  usuario_id: number;
  version_so: string;
  configuracion_completa: boolean;
}
