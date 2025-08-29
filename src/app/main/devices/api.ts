// src/app/main/devices/devices.api.ts
import { GoogleAccount, IFormInput, SocialMediaAccount } from "./types";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

//Actualizar la cuenta de red social
const editSocialAccount = async (
  socialAccount: SocialMediaAccount,
  id: number
) => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/edit-social-account/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(socialAccount),
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

// Eliminar cuenta g

// Eliminar cuenta google del dispositivo
const deleteSocialNetworkAccount = async (socialAccountId: number) => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/social/${socialAccountId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
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

// Añadir cuenta red social del dispositivo
const addSocialMediaAccount = async (
  socialMediaAccount: SocialMediaAccount
) => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/social-media-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(socialMediaAccount),
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

//Obtener Redes sociales
const getSocialMediaData = async () => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/social-media`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
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

//Actualizar el correo del dispositivo
const editDeviceAccount = async (googleAccount: GoogleAccount) => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${googleAccount.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ email: googleAccount.email }),
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

// Eliminar cuenta google del dispositivo
const deleteDeviceAccount = async (accountId: number) => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/google/${accountId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
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

// Añadir cuenta google del dispositivo
const addDeviceAccount = async (googleAccount: GoogleAccount) => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/devices/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(googleAccount),
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

// const completeInfoDevice = async (data: IFormInput) => {
//   try {
//     const TOKEN = localStorage.getItem("token");

//     //Primera peticion: guardar cuenta_google y cuenta_red_social
//     const resSave = await fetch(
//       `${NEXT_PUBLIC_BACKEND_URL}/api/devices/complete-info`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${TOKEN}`,
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     if (!resSave.ok) {
//       const error = await resSave.json();
//       throw new Error(error.message);
//     }

//     const dataSave = await resSave.json();

//     //Segunda peticion: marcar como completado
//     const resUpdate = await fetch(
//       `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${data.dispositivo_id}/complete`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${TOKEN}`,
//         },
//       }
//     );

//     if (!resUpdate.ok) {
//       const errorUpdate = await resUpdate.json();
//       throw new Error(errorUpdate.message);
//     }

//     return { ok: true, data: dataSave };
//   } catch (error) {
//     return {
//       ok: false,
//       message: error instanceof Error ? error.message : "Error inesperado",
//     };
//   }
// };

const updateInfoDevice = async (dataDevice: IFormInput) => {
  try {
    const TOKEN = localStorage.getItem("token");

    //Primera peticion: guardar cuenta_google y cuenta_red_social
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${dataDevice.dispositivo_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(dataDevice),
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

const getAccountsAndSocialMedia = async (deviceId: number) => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/devices/${deviceId}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
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

//Obtener datos de la tabla device
const getAllDevices = async () => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/devices`, {
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

//Actualizar el estado de la tabla device al hacer logout
const updateAllStatus = async () => {
  try {
    const TOKEN = localStorage.getItem("token");

    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/devices/logout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ status: "INACTIVO" }),
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

export {
  editSocialAccount,
  deleteSocialNetworkAccount,
  addSocialMediaAccount,
  getSocialMediaData,
  editDeviceAccount,
  deleteDeviceAccount,
  addDeviceAccount,
  getAllDevices,
  updateAllStatus,
  getAccountsAndSocialMedia,
  updateInfoDevice,
  // completeInfoDevice,
};
