// vite.config.js
import { VitePWA } from "vite-plugin-pwa";

export default {
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "data/**/*.json"],
      manifest: {
        name: "Quran & Hadith",
        short_name: "QuranApp",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4ade80",
      },
    }),
  ],
};
