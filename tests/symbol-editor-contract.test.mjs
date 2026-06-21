import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source=await readFile(new URL("../app.js",import.meta.url),"utf8");
const styles=await readFile(new URL("../styles.css",import.meta.url),"utf8");

for(const id of ["symbol-edit-name-en","symbol-edit-name-zh","symbol-edit-abbreviation","symbol-edit-visual","symbol-edit-craft","symbol-edit-category","symbol-edit-difficulty","symbol-edit-tags","symbol-edit-type","symbol-edit-svg","symbol-edit-explanation","symbol-edit-notes","symbol-edit-source","symbol-edit-source-name","symbol-edit-source-url","symbol-edit-source-note","symbol-edit-last-verified","symbol-edit-confidence","symbol-edit-needs-review","symbol-edit-verification","symbol-edit-verified-date","symbol-edit-verified-by","symbol-edit-verification-notes"]){
  assert.match(source,new RegExp(`id=\\"${id}\\"`),`${id} is present in the reusable form`);
}
for(const id of ["add-symbol","export-symbols","import-symbols","reset-all-symbols","reset-symbol-default","duplicate-symbol","delete-symbol"]){
  assert.match(source,new RegExp(`id=\\"${id}\\"`),`${id} is available`);
}
assert.match(source,/sanitizeCustomSymbolSvg/,'custom SVG uses an allowlist sanitizer');
assert.match(source,/SVG element <\$\{element\.tagName\}> is not allowed/,'unsafe SVG elements are rejected');
assert.match(source,/raw\.verificationStatus\|\|"To Be Confirmed"/,'legacy imports default to To Be Confirmed');
assert.match(styles,/\.symbol-card-edit[^}]+width:44px[^}]+height:44px/s,'card edit action has a 44px touch target');
assert.match(styles,/@media \(max-width:600px\)[\s\S]+\.symbol-grid[^}]+grid-template-columns:1fr/,'symbol cards use one column on phones');

console.log("Symbol editor contract passed.");
