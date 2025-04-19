const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface IFormInput {
  email: string;
  password: string;
}

const setInfoAccountDevice = async (data: IFormInput) => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/devices`, {
    method: "POST",
    credentials: "include", // 👈 IMPORTANTE: permite manejar cookies
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

export { setInfoAccountDevice };
