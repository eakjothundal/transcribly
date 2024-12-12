import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".", // Ensure Vite knows the root directory
  build: {
    target: "esnext",
  },
  esbuild: {
    target: "esnext",
  },
  plugins: [react()],
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@mantine/core",
      "@mantine/hooks",
      "@supabase/supabase-js",
      "axios",
    ],
  },
});
