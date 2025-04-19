// src/app/main/devices/devices.api.ts

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAllDevices = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/devices`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error obtener información de los dispositivos.");
  }

  return res.json();
};

export { getAllDevices };
