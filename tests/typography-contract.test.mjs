import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const css=readFileSync("styles.css","utf8");
const html=readFileSync("index.html","utf8");
const app=readFileSync("app.js","utf8");

assert.match(html,/family=Fraunces:wght@700&family=Inter:wght@400;500;600;700;800;900/,"One fixed Fraunces source and the complete Inter UI source are loaded");
assert.doesNotMatch(html,/DM\+Sans|Fraunces:opsz|Fraunces:ital/,"No legacy UI font or variable Fraunces axis is loaded");

assert.match(css,/--font-heading:"Fraunces", Georgia, serif;/,"The heading stack is centralized");
assert.match(css,/--font-ui:"Inter", system-ui, sans-serif;/,"The UI stack is centralized");
assert.doesNotMatch(css,/DM Sans|Arial|Helvetica|Roboto|Times/i,"No unapproved named font remains in CSS");
assert.doesNotMatch(app,/ctx\.font\s*=\s*["'][^"']*(system-ui|Arial|Helvetica|Roboto|Georgia|Times|DM Sans)/i,"Dynamic canvas text uses the approved UI font");

for(const declaration of css.matchAll(/font-family\s*:\s*([^;}]+)/g)){
  const value=declaration[1].trim();
  assert.match(value,/^(?:var\(--font-(?:ui|body|heading)\))(?:\s*!important)?$/,`Unapproved font-family declaration: ${value}`);
}

assert.match(css,/body h1[\s\S]*font-family:var\(--font-heading\) !important;/,"Approved headings use Fraunces");
assert.match(css,/body h1\s*\{[\s\S]*?font-size:48px !important;[\s\S]*?line-height:1\.08 !important;/,"Page-title token is fixed");
assert.match(css,/body h2\s*\{[\s\S]*?font-size:28px !important;[\s\S]*?line-height:1\.2 !important;/,"Section-title token is fixed");
assert.match(css,/body h3\s*\{[\s\S]*?font-size:24px !important;[\s\S]*?line-height:1\.2 !important;/,"Panel-title token is fixed");
assert.match(css,/font-style:normal !important;[\s\S]*font-variation-settings:normal !important;[\s\S]*font-weight:700 !important;[\s\S]*letter-spacing:0 !important;/,"Headings cannot acquire italics or variable axes");

assert.match(css,/button,input,select,textarea,option,label,[\s\S]*font-family:var\(--font-ui\) !important;/,"UI controls explicitly use Inter");
assert.match(css,/\*,\*::before,\*::after\s*\{[\s\S]*font-family:var\(--font-ui\) !important;/,"Dynamic content and pseudo-elements default to Inter");

console.log("Typography contract passed");
