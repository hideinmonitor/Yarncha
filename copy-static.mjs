import { cp, copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(projectRoot, "dist");

// These small classic-script assets are intentionally copied after Vite builds
// the module graph. OCR and PDF runtime files come from npm/CDN imports and are
// never copied from a local vendor directory.
const rootAssets = [
  "app.js",
  "calculator-engine.js",
  "styles.css",
  "favicon.ico",
  "apple-touch-icon.png",
  "apple-touch-icon-precomposed.png",
  "icon.svg"
];

await mkdir(distDir, { recursive: true });
await cp(resolve(projectRoot, "public"), resolve(distDir, "public"), { recursive: true });

for (const file of rootAssets) {
  await copyFile(resolve(projectRoot, file), resolve(distDir, file));
}

for (const file of ["index.html", ...rootAssets]) {
  await stat(resolve(distDir, file));
}
