const NEXT_PUBLIC_LOCAL_BACKEND_URL = process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;

interface UsuarioData {
  usuario_id: number;
}

const sendIdUser = async (data: UsuarioData) => {
  const res = await fetch(
    `${NEXT_PUBLIC_LOCAL_BACKEND_URL}/registrar-usuario`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res;
};

export { sendIdUser };
