import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source=await readFile(new URL("../app.js",import.meta.url),"utf8");
const styles=await readFile(new URL("../styles.css",import.meta.url),"utf8");

for(const id of ["symbol-edit-name-en","symbol-edit-name-zh","symbol-edit-abbreviation","symbol-edit-visual","symbol-edit-craft","symbol-edit-category","symbol-edit-difficulty","symbol-edit-tags","symbol-edit-explanation","symbol-edit-verification","symbol-picture-file","choose-symbol-picture","remove-symbol-picture"]){
  assert.match(source,new RegExp(`id=\\"${id}\\"`),`${id} is present in the reusable form`);
}
for(const id of ["add-symbol","export-symbols","import-symbols","reset-all-symbols","reset-symbol-default","duplicate-symbol","delete-symbol"]){
  assert.match(source,new RegExp(`id=\\"${id}\\"`),`${id} is available`);
}
for(const removedLabel of ["Live icon preview","Custom SVG fragment","Verified date","Verified by","Verification notes","Source type","Source name","Source URL","Source note"]){
  assert.doesNotMatch(source,new RegExp(`<label>${removedLabel}</label>`),`${removedLabel} is removed from the edit UI`);
}
for(const removedId of ["symbol-edit-source","symbol-edit-source-name","symbol-edit-source-url","symbol-edit-source-note","symbol-edit-confidence","symbol-edit-notes"]){
  assert.doesNotMatch(source,new RegExp(`id=\\"${removedId}\\"`),`${removedId} is not exposed in the beginner edit form`);
}
assert.match(source,/symbolImageAsset/,'symbol overrides can reference an IndexedDB picture asset');
assert.match(source,/hydrateSymbolPictures/,'uploaded pictures hydrate into cards and details');
assert.match(source,/symbolVisualHtml\(entry/, 'cards and details prefer uploaded symbol pictures');
assert.match(source,/putAsset\(assetId,stagedPicture\)/,'symbol pictures are stored in IndexedDB only after save');
assert.match(source,/deleteAsset\(previousAsset\)/,'replaced or removed pictures are cleaned up');
assert.match(source,/raw\.verificationStatus\|\|"To Be Confirmed"/,'legacy imports default to To Be Confirmed');
assert.match(styles,/\.symbol-card-edit[^}]+width:44px[^}]+height:44px/s,'card edit action has a 44px touch target');
assert.match(styles,/@media \(max-width:600px\)[\s\S]+\.symbol-grid[^}]+grid-template-columns:1fr/,'symbol cards use one column on phones');
assert.match(styles,/@media \(max-width:600px\)[\s\S]+\.symbol-picture-actions[^}]+grid-template-columns:1fr/,'picture actions stack on phones');

console.log("Symbol editor contract passed.");
