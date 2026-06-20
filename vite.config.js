import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: { input: "index.html" }
  },
  server: { host: "0.0.0.0", port: 4183 },
  preview: { host: "0.0.0.0", port: 4183 }
});
