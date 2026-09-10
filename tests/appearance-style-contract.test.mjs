import { declarations } from './helpers/css-contract.mjs';
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const app = readFileSync("app.js", "utf8");
const css = readFileSync("styles.css", "utf8");

const themeMatch = app.match(/const themePresets=\[[\s\S]*?\n\];/);
assert.ok(themeMatch, "themePresets is declared");
const themePresets = vm.runInNewContext(`${themeMatch[0]}\nthemePresets;`);
const originalTheme = themePresets[0];

assert.equal(originalTheme.id, "creamy-vanilla", "The defaults is the first/default colour theme");
assert.equal(originalTheme.name, "The defaults", "The original theme uses the requested visible label");
assert.equal(originalTheme.badge, "Original", "The defaults is identified as the original theme");
assert.equal(originalTheme.background, "#F6F0E6", "Creamy Vanilla uses the June 20 background");
assert.equal(originalTheme.surface, "#FFFAF3", "Creamy Vanilla uses the June 20 surface");
assert.equal(originalTheme.text, "#463D35", "Creamy Vanilla uses the June 20 text colour");
assert.equal(originalTheme.button, "#5F6958", "Creamy Vanilla uses the June 20 button colour");
assert.equal(originalTheme.accent, "#B7785F", "Creamy Vanilla uses the June 20 clay accent");
assert.equal(originalTheme.highlight, "#C4A269", "Creamy Vanilla uses the June 20 gold highlight");
assert.match(app, /theme:\{name:"creamy-vanilla",style:"original-classic",mode:"system"\}/, "starter data defaults to Creamy Vanilla, Original Classic, and System");

const styleMatch = app.match(/const designStyles=\[[\s\S]*?\n\];/);
assert.ok(styleMatch, "designStyles is declared");
const designStyles = vm.runInNewContext(`${styleMatch[0]}\ndesignStyles;`);
assert.equal(
  JSON.stringify(designStyles.map(style => style.id)),
  JSON.stringify(["original-classic","warm-cozy","modern-atelier","artsy-journal"]),
  "visual style gallery does not add Corner of Light as a layout preset"
);
assert.equal(designStyles[0].name, "Original Classic", "default visual style uses its historical name");
assert.equal(designStyles.some(style => Object.hasOwn(style, "zh"+"Name")), false, "visual style cards do not include translated subtitles");
assert.equal(designStyles.some(style => style.id === "corner-of-light"), false, "Corner of Light is not a layout style card");
assert.equal(designStyles.find(style => style.id === "modern-atelier")?.tag, "Studio", "Modern Atelier replaces Minimal Clean with Studio tag");
assert.doesNotMatch(app, /name:"Minimal Clean"/, "Minimal Clean is not shown as a current visual style");
assert.match(app, /"minimal-clean":"modern-atelier"/, "old Minimal Clean saved values migrate safely");
assert.match(app, /key\.includes\("vintage-paper"\)/, "old Vintage Paper colour values migrate safely");
assert.match(app, /"korean-soft":"original-classic"/, "old Korean Soft layout values migrate safely");
assert.match(app, /"classic-elegant":"original-classic"/, "old Classic Elegant layout values migrate safely");
assert.doesNotMatch(app, /name:"Korean Soft"|name:"Classic Elegant"/, "removed visual style names are not shown");
assert.match(app, /function designStyleCardHtml\(style,activeStyle\)/, "visual styles use a dedicated preview card renderer");
assert.match(app, /style-card-top/, "visual style cards include structured English heading content");
assert.match(app, /style-card-copy/, "visual style cards include descriptions");

for (const id of ["original-classic","warm-cozy","modern-atelier","artsy-journal"]) {
  assert.match(css, new RegExp(`data-style="${id}"`), `${id} has global visual style tokens`);
  assert.match(css, new RegExp(`style-sample\\.${id}`), `${id} has a mini preview style`);
}
assert.match(css, /data-theme="creamy-vanilla"/, "Creamy Vanilla is implemented as the canonical colour theme");
assert.doesNotMatch(css, /data-style="corner-of-light"|data-style="korean-soft"|data-style="classic-elegant"|style-sample\.corner-of-light|style-sample\.korean-soft|style-sample\.classic-elegant/, "removed visual styles have no CSS selectors");
assert.doesNotMatch(app + css, /– Vintage Paper/, "long Corner of Light label is removed from visible UI source");
assert.equal(designStyles.some(style => /[\u3400-\u9fff]/.test(`${style.name} ${style.desc} ${style.tag}`)), false, "visual style card text is English-only");

assert.match(css, /--yc-style-card-padding:/, "visual style controls card padding");
assert.match(css, /--yc-style-section-gap:/, "visual style controls spacing");
assert.match(css, /--yc-style-border-width:/, "visual style controls border weight");
assert.match(declarations('.style-preview-grid')['grid-template-columns'],/auto-fit.*20rem/, 'Style previews use content-driven substantial columns');
assert.match(css, /\.style-card-top[^}]+justify-content:space-between/, "visual style card header is structured");
assert.match(css, /\.style-sample\.modern-atelier[^}]+background-image:/, "Modern Atelier preview has studio-board detail");

console.log("Appearance style contract passed.");
