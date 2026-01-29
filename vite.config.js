// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Thêm dòng này để cho phép popup Google hoạt động trơn tru
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
});
