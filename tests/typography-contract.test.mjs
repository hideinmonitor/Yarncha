import { declarations } from './helpers/css-contract.mjs';
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const css=readFileSync("styles.css","utf8");
const html=readFileSync("index.html","utf8");
const app=readFileSync("app.js","utf8");
const main=readFileSync("src/main.js","utf8");

for(const weight of [400,500,600,700])assert.match(main,new RegExp(`@fontsource/dm-sans/latin-${weight}\\.css`),`Local DM Sans ${weight} is bundled`);
for(const weight of [600,700])assert.match(main,new RegExp(`@fontsource/fraunces/latin-${weight}\\.css`),`Local Fraunces ${weight} is bundled`);
assert.doesNotMatch(main+css,/fontsource\/inter|"Inter"/i,"The later Inter substitution is removed");
assert.doesNotMatch(html,/fonts\.(googleapis|gstatic)\.com|DM\+Sans|Fraunces:opsz/i,"The page makes no remote font request");

assert.match(css,/--font-brand:"Fraunces", Georgia, serif;/,"The original brand stack has a dedicated token");
assert.match(css,/--font-heading:"Fraunces", Georgia, serif;/,"The original heading stack is centralized");
assert.match(css,/--font-ui:"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;/,"The original UI stack is centralized");
assert.match(css,/--font-content:var\(--font-body\);/,"Future content customization has a separate semantic boundary");

const brandRule=css.match(/\.brand strong \{([^}]+)\}/)?.[1]||"";
assert.match(brandRule,/font-family:var\(--font-brand\)/,"The wordmark uses the fixed brand token");
assert.match(brandRule,/font-size:21px/,"The wordmark restores the historical size");
assert.match(brandRule,/font-weight:700/,"The wordmark restores the historical weight");
assert.match(brandRule,/letter-spacing:normal/,"The wordmark restores historical letter spacing");
assert.doesNotMatch(brandRule,/font-(?:ui|body|content)/,"The wordmark cannot inherit a customizable font role");
assert.match(css,/\.brand \{[^}]*gap:11px[^}]*padding:0 10px 28px/,"The wordmark restores its original surrounding spacing");
assert.match(css,/\.brand small \{[^}]*font:500 9px\/1\.25 var\(--font-ui\)[^}]*letter-spacing:\.02em/,"The original DM Sans tagline treatment is restored");

assert.doesNotMatch(css,/\*,\*::before,\*::after\s*\{[^}]*font-family:[^}]*!important/,"No universal important font override can flatten typography");
assert.equal(declarations('h1')['font-size'],'var(--text-page)','Page headings use the responsive current-application scale');
assert.equal(declarations('h2')['font-size'],'var(--text-section)','Major headings use the section scale');
assert.equal(declarations('h3')['font-size'],'var(--text-card)','Card headings use the shared scale');
assert.match(css,/blockquote \{ font:600 24px\/1\.35 var\(--font-heading\)/,"Display quotations use Fraunces 600 as in the original");
assert.match(css,/\.main-count \{ font:700 72px var\(--font-heading\)/,"Primary counters retain the original Fraunces treatment");
assert.match(app,/ctx\.font="700 34px 'DM Sans'"/,"Generated canvas text uses the restored UI font");

for(const declaration of css.matchAll(/font-family\s*:\s*([^;}]+)/g)){
  const value=declaration[1].trim();
  assert.match(value,/^(?:var\(--font-(?:brand|ui|body|heading|content)\))(?:\s*!important)?$/,`Unapproved font-family declaration: ${value}`);
}

console.log("Original Yarncha typography contract passed");
