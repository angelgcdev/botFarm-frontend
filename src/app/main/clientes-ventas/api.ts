import { ClientForm, SaleForm } from "./types";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const updateSale = async (saleData: SaleForm, id: number) => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/clientes-ventas/sales/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(saleData),
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

const createSale = async (saleDataForm: SaleForm) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/clientes-ventas/sales`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(saleDataForm),
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

const updateClient = async (clientData: ClientForm, id: number) => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/clientes-ventas/clients/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(clientData),
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

const deleteClient = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/clientes-ventas/clients/${id}`,
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

const createClient = async (clientDataForm: ClientForm) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/clientes-ventas/clients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clientDataForm),
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

const getClients = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/clientes-ventas/clients`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

const getSales = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/clientes-ventas/sales`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export {
  updateSale,
  createSale,
  updateClient,
  deleteClient,
  createClient,
  getClients,
  getSales,
};
