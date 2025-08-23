import { CreateUserFormInput, UserDataItem } from "./types";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const TOKEN = localStorage.getItem("token");

const deleteUser = async (id: number) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/auth/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const updateInfoUser = async (userEdited: UserDataItem) => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/auth/${userEdited.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(userEdited),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getUserData = async () => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const createUser = async (userAccount: CreateUserFormInput) => {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(userAccount),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

export { getUserData, createUser, updateInfoUser, deleteUser };
