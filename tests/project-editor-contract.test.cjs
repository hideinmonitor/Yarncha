const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const root = resolve(__dirname, "..");
const app = readFileSync(resolve(root, "app.js"), "utf8");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");

const checks = [
  ["opens from the project action", /id="edit-project-name"[\s\S]*addEventListener\("click", openEditProjectModal\)/],
  ["saves the changed name", /Object\.assign\(p,\{name,type:/],
  ["saves the changed craft type", /type:editProjectField\("edit-project-type"\)\.value/],
  ["rejects an empty or overlong name", /!name\|\|name\.length>80/],
  ["rejects current row above total rows", /currentRow>totalRows/],
  ["rejects finish date before start date", /finishDate<startDate/],
  ["validates cover type and 10 MB limit", /image\/jpeg[\s\S]*10\*1024\*1024/],
  ["stages cover removal until save", /removeCover=true[\s\S]*else if\(removeCover\)/],
  ["protects unsaved changes", /beforeClose:\(\)=>!dirty\|\|confirm\("Discard changes\?"\)/],
  ["requires exact DELETE confirmation", /event\.target\.value!=="DELETE"/],
  ["deletes project assets and stored project", /assetIdsForProject\(p\)\.map\(deleteAsset\)[\s\S]*state\.projects=state\.projects\.filter/],
  ["navigates safely after deletion", /closeModal\(true\);showView\("projects"\);toast\("Project deleted"\)/],
  ["shows project Fit Check card", /FIT CHECK[\s\S]*Check the fit before you continue/],
  ["saves Fit Check measurements", /function saveProjectFitCheck\(\)[\s\S]*bodyChest:value\("fit-body-chest"\)[\s\S]*finishedChest:value\("fit-finished-chest"\)/],
  ["opens sizing tools from Fit Check", /function openProjectFitTools\(\)[\s\S]*p\.projectTools\.category="fit"/]
];

for (const [name, pattern] of checks) assert.match(app, pattern, name);
assert.match(html, /class="header-left"/);
assert.match(html, /class="header-actions"/);
assert.match(css, /\.project-actions \{ width:100%; display:grid;/);
assert.match(css, /\.fit-check-grid \{ display:grid; grid-template-columns:minmax\(0,1\.25fr\) minmax\(220px,\.75fr\);/, "desktop Fit Check uses a two-column section");
assert.match(css, /@media \(max-width:760px\)[\s\S]*\.fit-check-grid,[\s\S]*\.result-summary-grid \{ grid-template-columns:1fr; \}/, "mobile Fit Check collapses to one column");

console.log(`Project editor contract: ${checks.length} workflow checks passed.`);
