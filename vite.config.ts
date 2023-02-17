import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@helpers": path.resolve(__dirname, "/src/helpers"),
      "@types": path.resolve(__dirname, "/src/types"),
    },
  },
  plugins: [react()],
  build: {
    minify: false,
  },
});
