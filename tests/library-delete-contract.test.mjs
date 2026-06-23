import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app=await readFile(new URL("../app.js",import.meta.url),"utf8");

for(const cardDeleteHook of ["data-delete-item","data-delete-material","data-delete-idea"]){
  assert.doesNotMatch(app,new RegExp(cardDeleteHook),`${cardDeleteHook} is not exposed on Library cards`);
}

for(const modalDeleteId of ["delete-library-item-inside-edit","delete-material-inside-edit","delete-project-idea-inside-edit"]){
  assert.match(app,new RegExp(`id=\\"${modalDeleteId}\\"`),`${modalDeleteId} lives inside the edit modal`);
}

assert.match(app,/data-edit-item/,"generic Library rows expose Edit instead of Delete");
assert.match(app,/View files/,"generic Library rows expose normal View files action");
assert.match(app,/Are you sure you want to delete this item\?/,"Library modal deletes use the required confirmation text");
assert.match(app,/Delete this yarn material only if you no longer need it/,"Yarn material edit modal has a small Danger Zone");
assert.match(app,/Delete this library item only if you no longer need it/,"Library item edit modal has a small Danger Zone");
assert.match(app,/Delete this idea only if you no longer need it/,"Project idea edit modal has a small Danger Zone");

console.log("Library delete contract passed.");
