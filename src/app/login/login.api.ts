const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface IFormInput {
  email: string;
  password: string;
}

const login = async (data: IFormInput) => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

export { login };
