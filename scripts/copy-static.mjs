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
  "repeat-engine.js",
  "symbol-database.js",
  "styles.css",
  "favicon.ico",
  "apple-touch-icon.png",
  "apple-touch-icon-precomposed.png",
  "icon.svg"
];

await mkdir(distDir, { recursive: true });
await cp(resolve(projectRoot, "public"), resolve(distDir, "public"), { recursive: true });
await mkdir(resolve(distDir, "src"), { recursive: true });
await cp(resolve(projectRoot, "src", "calculations"), resolve(distDir, "src", "calculations"), { recursive: true });
await cp(resolve(projectRoot, "src", "data"), resolve(distDir, "src", "data"), { recursive: true });

for (const file of rootAssets) {
  await copyFile(resolve(projectRoot, file), resolve(distDir, file));
}

const indexFile = resolve(distDir, "index.html");
const assetVersion = "112-live-repeat-fix";
const classicScripts = [
  `<script src="src/data/sizeReference.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/core.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/gauge.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/yarn.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/sizing.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/repeat.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/shaping.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/garments.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/crochet.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/knitting.js?v=${assetVersion}"></script>`,
  `<script src="src/calculations/rendering.js?v=${assetVersion}"></script>`,
  `<script src="calculator-engine.js?v=${assetVersion}"></script>`,
  `<script src="repeat-engine.js?v=${assetVersion}"></script>`,
  `<script src="symbol-database.js?v=${assetVersion}"></script>`,
  `<script src="app.js?v=${assetVersion}"></script>`
].join("\n    ");
const indexHtml = await readFile(indexFile, "utf8");
if (!indexHtml.includes(`src="app.js?v=${assetVersion}"`)) {
  await writeFile(indexFile, indexHtml.replace("\n  </body>", `\n    ${classicScripts}\n  </body>`));
}

for (const file of ["index.html", ...rootAssets, "src/calculations/core.js", "src/data/sizeReference.js"]) {
  await stat(resolve(distDir, file));
}
