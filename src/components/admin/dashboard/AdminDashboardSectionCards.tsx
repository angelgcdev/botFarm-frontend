"use client";

import { Eye, Forward, Heart, MessageCircle, Smartphone } from "lucide-react";
import { TikTokIcon } from "../../icons/tiktok-icon";
import { FacebookIcon } from "../../icons/facebook-icon";

import { useEffect, useState } from "react";
import { useDevices } from "@/context/DevicesContext";
import AdminDashboardCards from "./AdminDashboardCards";
import {
  getTotalFacebookComments,
  getTotalFacebookInteractions,
  getTotalFacebookLikes,
  getTotalFacebookShares,
  getTotalTiktokComments,
  getTotalTiktokInteractions,
  getTotalTiktokLikes,
  getTotalTiktokShares,
  getTotalTiktokViews,
} from "@/app/admin/dashboard/api";

const AdminDashboardSectionCards = () => {
  // Estados
  // Interacciones
  const [totalTiktokInteractions, setTotalTiktokInteractions] =
    useState<number>(0);

  const [totalFacebookInteractions, setTotalFacebookInteractions] =
    useState<number>(0);

  // Vistas
  const [totalTiktokViewsForAdmin, setTotalTiktokViewsForAdmin] = useState(0);

  //Likes
  const [totalTiktokLikes, setTotalTiktokLikes] = useState(0);

  const [totalFacebookLikes, setTotalFacebookLikes] = useState(0);

  // Comentarios
  const [totalTiktokComments, setTotalTiktokComments] = useState(0);

  const [totalFacebookComments, setTotalFacebookComments] = useState(0);

  // Compartidas
  const [totalTiktokShares, setTotalTiktokShares] = useState(0);

  const [totalFacebookShares, setTotalFacebookShares] = useState(0);

  const { devices } = useDevices();

  // Contextos
  // Filtrar dispositivos activos
  const activeDevices = devices.filter((device) => device.status === "ACTIVO");

  // Efectos
  useEffect(() => {
    const fetchData = async () => {
      try {
        //interacciones
        const resTotalTiktokInteractions = await getTotalTiktokInteractions();
        if (!resTotalTiktokInteractions.ok) {
          console.error("Error:", resTotalTiktokInteractions.message);
        }
        setTotalTiktokInteractions(resTotalTiktokInteractions.data);

        const resTotalFacebookInteractions =
          await getTotalFacebookInteractions();
        if (!resTotalFacebookInteractions.ok) {
          console.error("Error:", resTotalFacebookInteractions.message);
        }
        setTotalFacebookInteractions(resTotalFacebookInteractions.data);

        // views
        const resTotalViews = await getTotalTiktokViews();
        if (!resTotalViews.ok) {
          console.error("Error:", resTotalViews.message);
        }
        setTotalTiktokViewsForAdmin(resTotalViews.data);

        // likes
        const resTotalLikes = await getTotalTiktokLikes();
        if (!resTotalLikes.ok) {
          console.error("Error:", resTotalLikes.message);
        }
        setTotalTiktokLikes(resTotalLikes.data);

        const resTotalFacebookLikes = await getTotalFacebookLikes();
        if (!resTotalFacebookLikes.ok) {
          console.error("Error:", resTotalFacebookLikes.message);
        }
        setTotalFacebookLikes(resTotalFacebookLikes.data);

        // comments
        const resTotalComments = await getTotalTiktokComments();
        if (!resTotalComments.ok) {
          console.error("Error:", resTotalComments.message);
        }
        setTotalTiktokComments(resTotalComments.data);

        const resTotalFacebookComments = await getTotalFacebookComments();
        if (!resTotalFacebookComments.ok) {
          console.error("Error:", resTotalFacebookComments.message);
        }
        setTotalFacebookComments(resTotalFacebookComments.data);

        // Compartidas
        const resTotalShares = await getTotalTiktokShares();
        if (!resTotalShares.ok) {
          console.error("Error:", resTotalShares.message);
        }
        setTotalTiktokShares(resTotalShares.data);

        const resTotalFacebookShares = await getTotalFacebookShares();
        if (!resTotalFacebookShares.ok) {
          console.error("Error:", resTotalFacebookShares.message);
        }
        setTotalFacebookShares(resTotalFacebookShares.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setTotalTiktokInteractions(0);
      }
    };

    fetchData();
  }, []);

  console.log("total Admin:", totalFacebookShares);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AdminDashboardCards
        title="Dispositivos Conectados"
        icon={Smartphone}
        socialMediaIcon={TikTokIcon}
        value={activeDevices.length}
      />

      <AdminDashboardCards
        title="Interacciones Realizadas en Tiktok"
        value={totalTiktokInteractions}
        socialMediaIcon={TikTokIcon}
      />

      <AdminDashboardCards
        title="Vistas Generadas"
        value={totalTiktokViewsForAdmin}
        icon={Eye}
        socialMediaIcon={TikTokIcon}
        description="Vistas totales en videos de TikTok"
      />

      <AdminDashboardCards
        title="Likes automáticos realizados"
        value={totalTiktokLikes}
        icon={Heart}
        socialMediaIcon={TikTokIcon}
        description="Me gusta totales en videos de TikTok"
      />

      <AdminDashboardCards
        title="Comentarios automaticos realizados"
        value={totalTiktokComments}
        icon={MessageCircle}
        socialMediaIcon={TikTokIcon}
        description="Comentarios realizados en videos de TikTok"
      />

      {/* completar */}
      <AdminDashboardCards
        title="Compartidas automáticas realizadas"
        value={totalTiktokShares}
        icon={Forward}
        socialMediaIcon={TikTokIcon}
        description="Compartidas realizados en videos de TikTok"
      />

      <AdminDashboardCards
        title="Interacciones Realizadas en Facebook"
        value={totalFacebookInteractions}
        socialMediaIcon={FacebookIcon}
        className="bg-[#1877F2]/20"
      />

      <AdminDashboardCards
        title="Likes automáticos realizados"
        value={totalFacebookLikes}
        icon={Heart}
        socialMediaIcon={FacebookIcon}
        description="Likes realizados en publicaciones de Facebook"
        className="bg-[#1877F2]/20"
      />

      <AdminDashboardCards
        title="Compartidas automáticas realizadas"
        value={totalFacebookShares}
        icon={Forward}
        socialMediaIcon={FacebookIcon}
        description="Compartidas realizadas en publicaciones de Facebook"
        className="bg-[#1877F2]/20"
      />

      <AdminDashboardCards
        title="Comentarios automáticos realizados"
        value={totalFacebookComments}
        icon={MessageCircle}
        socialMediaIcon={FacebookIcon}
        description="Comentarios automáticos realizados en publicaciones de Facebook"
        className="bg-[#1877F2]/20"
      />
    </div>
  );
};

export default AdminDashboardSectionCards;
