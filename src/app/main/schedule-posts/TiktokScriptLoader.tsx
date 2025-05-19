import { useEffect } from "react";

export function TikTokScriptLoader() {
  useEffect(() => {
    // Verificamos si el script ya está agregado para no duplicarlo
    if (
      !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null; // No renderiza nada visible
}
