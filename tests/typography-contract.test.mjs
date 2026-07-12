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
assert.match(app,/class="library-page-title"/,"Library page titles have an explicit semantic class");
assert.match(app,/class="major-section-title library-major-section-title"/,"Library major section titles share the cross-page semantic class");
assert.match(app,/class="content-title library-content-title"/,"Library content titles share the semantic content-title class");
assert.match(app,/class="content-title library-learning-path-title"/,"Learning Path titles share the compact content-title class");
assert.match(app,/class="library-article-section-title"/,"Library article section titles have an explicit semantic class");
assert.match(css,/#library-view \.library-page-title \{[^}]*font-size:46px !important[^}]*font-weight:700 !important[^}]*line-height:1\.08 !important/,"Library page titles use the requested fixed scale");
assert.match(css,/#library-view \.library-major-section-title \{[^}]*font-size:30px !important[^}]*line-height:1\.2 !important/,"Library major sections use the requested fixed scale");
assert.match(css,/#library-view \.wiki-entry-card \.library-content-title,[\s\S]*font-size:24px !important[^}]*line-height:1\.2 !important/,"Library cards use the requested content-title scale");
assert.match(css,/#library-view \.learning-path-item \.library-learning-path-title \{[^}]*font-size:19px !important[^}]*line-height:1\.2 !important/,"Learning Path titles use the requested compact scale");
assert.match(css,/#library-view \.wiki-detail \.library-article-section-title \{[^}]*font-size:26px !important[^}]*line-height:1\.2 !important/,"Article section titles use the requested scale");
assert.match(app,/titleClass:"major-section-title"/,"Tools category headings use the shared semantic major-section class");
assert.match(app,/class="content-title tool-card-title"/,"Tools titles share the semantic content-title class");
assert.match(app,/class="content-title project-content-title"/,"Project names share the semantic content-title class");
assert.match(css,/\.page-title-text,[\s\S]*font-size:46px !important[^}]*line-height:1\.08 !important/,"Top-level page titles share the requested semantic scale");
assert.match(css,/\.major-section-title,[\s\S]*font-size:30px !important[^}]*line-height:1\.2 !important/,"Cross-page major sections share the requested semantic scale");
assert.match(css,/\.content-title \{[^}]*font-family:var\(--font-heading\) !important[^}]*font-weight:700 !important[^}]*line-height:1\.2 !important/,"Primary content titles share the Fraunces semantic role");
assert.match(css,/#tools-view \.tool-card-title \{[^}]*font-family:var\(--font-heading\) !important[^}]*font-size:19px !important[^}]*font-weight:700 !important/,"Compact Tools titles use Fraunces at the requested density");
assert.match(css,/\.project-card \.project-content-title \{[^}]*font-size:24px !important/,"Primary project names use the larger content-title density");

console.log("Typography contract passed");
