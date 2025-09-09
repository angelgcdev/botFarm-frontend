import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.tiktokcdn.com", // cubre p16-sign-va.tiktokcdn.com y otros
      },
      {
        protocol: "https",
        hostname: "*.tiktokcdn-eu.com", // algunos links devuelven este dominio
      },
      {
        protocol: "https",
        hostname: "*.tiktokcdn-us.com", // por si usas TikTok en región US
      },
    ],
  },
};

export default nextConfig;
