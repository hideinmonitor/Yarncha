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
assert.match(html,/© 2026 Yarncha\. All rights reserved\./,"site footer includes the copyright notice");
assert.doesNotMatch(css,/\.nav-item\[data-view="settings"\]/,"Settings has no special sidebar styling");
const cloud=await readFile(new URL("../src/cloud/bootstrap.js",import.meta.url),"utf8");
assert.match(cloud,/querySelector\("\.settings-page-shell"\)/,"cloud account card uses the unified Settings shell");
assert.match(cloud,/settings-section-heading/,"cloud account card uses the unified section header");
assert.match(cloud,/ACCOUNT & SYNC/,"cloud settings has a clear Account & Sync group");
assert.match(cloud,/cloud-danger-zone/,"cloud deletion lives in a dedicated Danger Zone");
assert.match(cloud,/settings-danger-title/,"Danger Zone has its own Settings group title");
assert.match(cloud,/This action cannot be undone\./,"Danger Zone includes irreversible-action warning text");
assert.match(cloud,/settings-delete-confirm/,"Delete Account requires typed confirmation");
assert.match(cloud,/value === "DELETE"/,"typing DELETE enables account deletion");
assert.match(cloud,/email && value\.toLowerCase\(\) === email\.toLowerCase\(\)/,"confirming the account email enables account deletion");
assert.match(cloud,/settings-cloud-sign-out/,"Cloud Account card exposes sign out");
assert.doesNotMatch(cloud,/settings-cloud-migrate[\s\S]{0,260}settings-delete-account/,"Delete Account is not grouped with normal cloud sync actions");
assert.doesNotMatch(cloud,/id="settings-cloud-account"[\s\S]{0,260}settings-delete-account/,"Cloud Account card contains no Delete Account action");
assert.match(app,/settings-panel-wide settings-preferences-card/,"Making preferences spans the desktop Settings content width");
assert.match(app,/settings-panel-wide settings-backup-card/,"Projects and Backup spans the desktop Settings content width");
assert.match(app,/settings-backup-layout/,"Projects and Backup has a dedicated desktop layout wrapper");
assert.match(cloud,/settings-panel settings-panel-wide/,"cloud account card spans the Settings content width");
assert.match(css,/@media \(min-width:1024px\)[\s\S]+\.view,\.topbar-inner \{ max-width:none; margin-inline:0; \}/,"desktop pages use the available width beside the sidebar");
assert.match(css,/@media \(min-width:1024px\)[\s\S]+\.settings-page-shell \{ grid-template-columns:minmax\(0,1fr\);/,"desktop Settings uses a full-width dashboard column");
assert.match(css,/@media \(min-width:1024px\)[\s\S]+\.settings-backup-layout \{ grid-template-columns:minmax\(0,1fr\) minmax\(300px,360px\);/,"desktop backup card uses a two-column layout");
assert.match(css,/@media \(max-width: 900px\)[\s\S]+\.settings-page-shell[^}]+grid-template-columns:1fr/s,"Settings cards stack responsively");
assert.match(css,/\.settings-danger-zone[^}]+border-color:color-mix\(in srgb,var\(--danger\)/,"Danger Zone has a visually distinct red border");
assert.match(css,/\.settings-toggle-row[^}]+min-height:56px/s,"toggles exceed the 44px touch target");
assert.match(css,/\.view[^}]+env\(safe-area-inset-bottom\)/s,"page shell preserves mobile safe area");

console.log("Settings consistency contract passed.");
