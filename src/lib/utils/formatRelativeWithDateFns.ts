import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";
import { es } from "date-fns/locale";

export const formatRelativeWithDateFns = (date: string | Date): string => {
  const d = new Date(date);

  if (isToday(d)) {
    return formatDistanceToNow(d, { addSuffix: true, locale: es }); // ej: "Hace 2 horas "
  }

  if (isYesterday(d)) {
    return "ayer";
  }

  return format(d, "dd/MM/yyyy HH:mm", { locale: es }); // ej: "22/08/2025 14:30"
};
