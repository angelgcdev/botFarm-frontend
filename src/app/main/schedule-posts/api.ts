import { FacebookInteractionForm, TiktokInteractionForm } from "./types";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Crear interacción de Facebook
const createInteractionFacebookData = async (
  scheduledFacebookDataForm: FacebookInteractionForm
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/schedule/facebook-post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(scheduledFacebookDataForm),
      }
    );

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

//Petición para obtener datos de la api de tiktok para vista previa
export const fetchTikTokPreview = async (url: string) => {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
    );

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

const getInteractionsTiktokData = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

const createInteractionTiktokData = async (
  scheduledTiktokDataForm: TiktokInteractionForm
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(scheduledTiktokDataForm),
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

const deleteInteractionFacebookData = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/schedule/facebook-post-delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

const deleteInteractionTiktokData = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

const editInteractionFacebookData = async (
  id: number,
  interactionEdited: FacebookInteractionForm
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/schedule/facebook-post-edit/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(interactionEdited),
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

const editInteractionTiktokData = async (
  id: number,
  interactionEdited: TiktokInteractionForm
) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/schedule/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(interactionEdited),
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

export {
  createInteractionFacebookData,
  deleteInteractionFacebookData,
  deleteInteractionTiktokData,
  editInteractionFacebookData,
  editInteractionTiktokData,
  createInteractionTiktokData,
  getInteractionsTiktokData,
};
