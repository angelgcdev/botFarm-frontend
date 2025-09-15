const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getTotalTiktokInteractions = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard-admin/total-tiktok-interactions`,
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

const getTotalFacebookInteractions = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard-admin/total-facebook-interactions`,
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

const getTotalTiktokViews = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard-admin/total-tiktok-views`,
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

const getTotalTiktokLikes = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard-admin/total-tiktok-likes`,
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

const getTotalFacebookLikes = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard-admin/total-facebook-likes`,
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

const getTotalTiktokComments = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard-admin/total-tiktok-comments`,
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

const getTotalFacebookComments = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard-admin/total-facebook-comments`,
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

const getTotalTiktokShares = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard-admin/total-tiktok-shares`,
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

const getTotalFacebookShares = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/dashboard-admin/total-facebook-shares`,
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
  getTotalTiktokInteractions,
  getTotalFacebookInteractions,
  getTotalTiktokViews,
  getTotalTiktokLikes,
  getTotalFacebookLikes,
  getTotalTiktokComments,
  getTotalFacebookComments,
  getTotalTiktokShares,
  getTotalFacebookShares,
};
