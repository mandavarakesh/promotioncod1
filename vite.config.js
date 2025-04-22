import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig(() => ({
  base: './', // 👈 ADD THIS LINE to fix blank page in `vite preview`
  define: {
    global: "window",
  },
  server: {
    port: 3000,
  },
  esbuild: {
    loader: "jsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  plugins: [react(), svgrPlugin()],
}));
