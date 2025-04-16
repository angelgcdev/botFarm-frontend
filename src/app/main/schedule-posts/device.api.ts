const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

enum TipoDispositivo {
  FÍSICO = "FÍSICO",
  EMULADOR = "EMULADOR",
}

enum EstadoDispositivo {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
}

interface Device {
  usuario_id: number;
  id: number;
  udid: string;
  device_type: TipoDispositivo;
  status: EstadoDispositivo;
  version_so: string;
  marca: string;
  connected_at: Date;
  last_activity: Date | null;
}

const device = async (data: Device) => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

export { device as login };
