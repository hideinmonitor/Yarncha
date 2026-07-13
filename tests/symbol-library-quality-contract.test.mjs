import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import "../symbol-database.js";

const database=globalThis.YarnchaSymbolDatabase;
const statuses=new Set(["verified","commonNotUniversal","variesByDesigner","needsReview"]);
for(const entry of database.entries){
  assert.ok(statuses.has(entry.symbolStatus),`${entry.id} has a public symbol status`);
  for(const field of ["nameEnglish","nameTraditionalChinese","aliases","meaning","howToWork","commonMistakes","countingTip","beginnerNote","relatedSymbols","examplePatternWording"])assert.ok(entry[field],`${entry.id} has ${field}`);
  if(["variesByDesigner","needsReview"].includes(entry.symbolStatus))assert.equal(entry.svgKey,"",`${entry.id} does not claim a chart glyph`);
}

const knitting=database.entries.filter(entry=>entry.craft==="Knitting");
const expected={
  YO:["掛針 / 空針","commonNotUniversal"],KTBL:["扭下針","commonNotUniversal"],PTBL:["扭上針","commonNotUniversal"],M1L:["左加針","commonNotUniversal"],M1R:["右加針","commonNotUniversal"],LI:["挑起加針 / 提針加針","variesByDesigner"],KFB:["同針前後加針 / 下針前後加針","commonNotUniversal"],PFB:["上針前後加針","variesByDesigner"],K2TOG:["右上二併一","commonNotUniversal"],P2TOG:["上針右上二併一","commonNotUniversal"],SSK:["左上二併一","commonNotUniversal"],SSP:["上針左上二併一","commonNotUniversal"],SKP:["滑一針、下一針、套收 / 左斜減針","variesByDesigner"],CDD:["中上三併一","commonNotUniversal"],DYO:["雙掛針","variesByDesigner"]
};
for(const [abbr,[chinese,status]] of Object.entries(expected)){
  const entry=knitting.find(item=>item.abbreviation===abbr);
  assert.ok(entry,`contains ${abbr}`);
  assert.equal(entry.nameTraditionalChinese,chinese,`${abbr} has clear Traditional Chinese`);
  assert.equal(entry.symbolStatus,status,`${abbr} has safe status`);
  assert.ok(entry.aliases.includes(abbr.toLowerCase())||entry.aliases.includes(abbr),`${abbr} has casing alias`);
}

const app=await readFile(new URL("../app.js",import.meta.url),"utf8");
const css=await readFile(new URL("../styles.css",import.meta.url),"utf8");
for(const text of ["Verified only","Common symbols","Varies by chart key","Abbreviation only","Common, check key","Chart symbol varies by designer","Counting tip","Example pattern wording"])assert.match(app,new RegExp(text,"i"));
assert.match(app,/function neutralSymbolHtml/);
assert.match(app,/role="img"/);
assert.match(app,/class="symbol-detail-overlay" role="dialog" aria-modal="true"/);
assert.match(css,/\.symbol-neutral/);
assert.match(css,/\.symbol-card-badges/);

console.log(`Symbol Library quality contract passed with ${database.entries.length} entries.`);
