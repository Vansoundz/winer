import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), VitePWA()],
  server: {
    proxy: {
      "/api": {
        target: "https://storage.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, "/wineshop-assets");
        },
      },
    },
  },
});
