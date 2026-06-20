import { cp, copyFile } from "node:fs/promises";

await cp("public", "dist/public", { recursive: true });
for (const file of ["app.js", "calculator-engine.js", "styles.css", "favicon.ico", "apple-touch-icon.png", "apple-touch-icon-precomposed.png", "icon.svg"]) {
  await copyFile(file, `dist/${file}`);
}
