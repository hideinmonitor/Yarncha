import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync("styles.css", "utf8");
const app = readFileSync("app.js", "utf8");

[
  "--font-title",
  "--font-heading",
  "--font-body",
  "--font-small",
  "--spacing-xs",
  "--spacing-sm",
  "--spacing-md",
  "--spacing-lg",
  "--radius-sm",
  "--radius-md",
  "--button-height",
  "--chip-height",
  "--icon-size"
].forEach(token => {
  assert.match(css, new RegExp(`${token}:`), `Missing design token ${token}`);
});

assert.match(css, /button,\n\.primary-button,\n\.secondary-button,\n\.mini-button,[\s\S]*min-height:var\(--button-height-sm\)/, "Shared button sizing should use the button height token");
assert.match(css, /\.primary-button,\n\.secondary-button,[\s\S]*min-height:var\(--button-height\)/, "Primary and secondary buttons should share the primary button height token");
assert.match(css, /\.chip,\n\.pill-tab,[\s\S]*min-height:var\(--chip-height\)/, "Chips and pills should share the chip height token");
assert.match(css, /\.ui-icon,\n\.button-icon,[\s\S]*width:var\(--icon-size\)/, "Icons should use the shared icon size token");
assert.match(css, /input:not\(\[type="checkbox"\]\)[\s\S]*min-height:var\(--control-height\)/, "Form controls should use the shared control height token");
assert.match(app, /counter-options-button" data-counter-more="\$\{s\.id\}">Options<\/button>/, "Repeat counter overflow action should read as Options");
assert.doesNotMatch(app, /data-counter-more="\$\{s\.id\}">More<\/button>/, "Repeat counter overflow action should not use the tiny More label");

console.log("Design system contract passed.");
