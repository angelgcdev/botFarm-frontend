const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getTotalFacebookSharesForPersonal = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard/total-facebook-shares`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalTiktokSharesForPersonal = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard/total-tiktok-shares`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalFacebookInteractionsForPersonal = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard/total-facebook-interactions`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalTiktokInteractionsForPersonal = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/interactions/count`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalTiktokViewsForPersonal = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/views/count`,
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

    return { ok: true, data: data._sum.total_views };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalTiktokLikesForPersonal = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/likes/count`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalFacebookLikesForPersonal = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard/total-facebook-likes`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalFacebookCommentsForPersonal = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard/total-facebook-comments`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalTiktokCommentsForPersonal = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/history/comments/count`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalClientsForDay = async (timeRange: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard/total-clients-for-day?range=${timeRange}`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getTotalSalesForDay = async (timeRange: string) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard/total-sales-for-day?range=${timeRange}`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

const getOriginClients = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard/total-origin-clients`,
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

    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};

export {
  getTotalFacebookCommentsForPersonal,
  getTotalFacebookSharesForPersonal,
  getTotalFacebookLikesForPersonal,
  getTotalFacebookInteractionsForPersonal,
  getTotalTiktokSharesForPersonal,
  getTotalTiktokInteractionsForPersonal,
  getTotalTiktokViewsForPersonal,
  getTotalTiktokLikesForPersonal,
  getTotalTiktokCommentsForPersonal,
  getTotalClientsForDay,
  getTotalSalesForDay,
  getOriginClients,
};
