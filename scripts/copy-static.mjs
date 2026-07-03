import { cp, copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
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
  "symbol-database.js",
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

const indexFile = resolve(distDir, "index.html");
const assetVersion = "73-design-system-audit";
const classicScripts = [
  `<script src="calculator-engine.js?v=${assetVersion}"></script>`,
  `<script src="symbol-database.js?v=${assetVersion}"></script>`,
  `<script src="app.js?v=${assetVersion}"></script>`
].join("\n    ");
const indexHtml = await readFile(indexFile, "utf8");
if (!indexHtml.includes(`src="app.js?v=${assetVersion}"`)) {
  await writeFile(indexFile, indexHtml.replace("\n  </body>", `\n    ${classicScripts}\n  </body>`));
}

for (const file of ["index.html", ...rootAssets]) {
  await stat(resolve(distDir, file));
}
