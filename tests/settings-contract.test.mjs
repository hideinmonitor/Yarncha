import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app=await readFile(new URL("../app.js",import.meta.url),"utf8");
const html=await readFile(new URL("../index.html",import.meta.url),"utf8");
const css=await readFile(new URL("../styles.css",import.meta.url),"utf8");

for(const section of ["APPEARANCE","APP PREFERENCES","PROJECTS & BACKUP","UPDATES & LIMITATIONS"]){
  assert.match(app,new RegExp(section),`${section} card exists`);
}
for(const control of ["settings-language","settings-voice","settings-notifications","backup-project-select"]){
  assert.match(app,new RegExp(`id=\\"${control}\\"`),`${control} is wired`);
}
assert.match(app,/appPreferences:\{notifications:false,voice:true\}/,"preferences have recoverable defaults");
assert.match(app,/function localCraftGreeting\(\)/,"local-time craft greeting is generated");
assert.match(html,/id="today-greeting"/,"dashboard exposes a greeting target");
assert.doesNotMatch(css,/\.nav-item\[data-view="settings"\]/,"Settings has no special sidebar styling");
const cloud=await readFile(new URL("../src/cloud/bootstrap.js",import.meta.url),"utf8");
assert.match(cloud,/querySelector\("\.settings-page-shell"\)/,"cloud account card uses the unified Settings shell");
assert.match(cloud,/settings-section-heading/,"cloud account card uses the unified section header");
assert.match(css,/\.settings-page-shell[^}]+grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/s,"desktop Settings uses the shared card grid");
assert.match(css,/@media \(max-width: 900px\)[\s\S]+\.settings-page-shell[^}]+grid-template-columns:1fr/s,"Settings cards stack responsively");
assert.match(css,/\.settings-toggle-row[^}]+min-height:56px/s,"toggles exceed the 44px touch target");
assert.match(css,/\.view[^}]+env\(safe-area-inset-bottom\)/s,"page shell preserves mobile safe area");

console.log("Settings consistency contract passed.");
