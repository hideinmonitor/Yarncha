import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "public",
  plugins: [{
    name: "yarncha-classic-script-build",
    apply: "build",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replace(/\n\s*<script src="(?:calculator-engine|symbol-database|app)\.js\?v=\d+"><\/script>/g, "");
      }
    }
  }],
  build: {
    chunkSizeWarningLimit: 900,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: { input: "index.html" }
  },
  server: { host: "0.0.0.0", port: 4183 },
  preview: { host: "0.0.0.0", port: 4183 }
});
