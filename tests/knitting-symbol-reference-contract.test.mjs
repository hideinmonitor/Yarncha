import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import "../symbol-database.js";

const database=globalThis.YarnchaSymbolDatabase;
const knitting=database.entries.filter(entry=>entry.craft==="Knitting");
const required=["K","P","St st","G st","Rev St st","Rib","Seed","Moss","K1B","P1B","M1","M1L","M1R","M1PL","M1PR","LLI","RLI","K2TOG","SSK","SKP","P2TOG","SSP","K3TOG","P3TOG","CDD","S2KP","YRN","YFWD","Double YO","No stitch","Sl1 wyif","Sl1 wyib","WYIF","WYIB","C2F","C2B","C4F","C4B","C6F","C6B","LC","RC","RT","LT","MC","CC","W&T","DS","RS","WS","BOR","PM","SM","RM","CO","BO","Kitchener"];
for(const abbreviation of required) assert.ok(knitting.some(entry=>entry.abbreviation===abbreviation),`contains ${abbreviation}`);
for(const entry of knitting){
  for(const field of ["abbreviations","meaning","howToRead","howToWork","flatChartNote","roundChartNote","beginnerNote","commonMistakes","relatedSymbols","relatedTools","legendWarning"]) assert.ok(entry[field],`${entry.abbreviation} has ${field}`);
  assert.ok(entry.abbreviations.usUk&&entry.abbreviations.cn&&entry.abbreviations.jp,`${entry.abbreviation} has three abbreviation chips`);
}
assert.ok(database.search("右上",{craft:"Knitting",category:"All",difficulty:"All"}).some(entry=>entry.abbreviation==="K2TOG"));
assert.ok(database.search("右上2目一度",{craft:"Knitting",category:"All",difficulty:"All"}).some(entry=>entry.abbreviation==="K2TOG"));
assert.ok(database.search("colourwork",{craft:"Knitting",category:"All",difficulty:"All"}).length>=4);
const noStitch=knitting.find(entry=>entry.abbreviation==="No stitch");
assert.match(noStitch.howToWork,/not a stitch/i);

const app=await readFile(new URL("../app.js",import.meta.url),"utf8");
assert.match(app,/<details class="symbol-full-explanation">/);
for(const label of ["Full explanation","How to work it","Flat knitting note","In-the-round note","Beginner tip","Short rows","Chart structure","Construction"]) assert.match(app,new RegExp(label));
assert.doesNotMatch(app.slice(app.indexOf('if(currentSymbolId)'),app.indexOf('let entries=')),/Needs review/);
console.log(`Knitting symbol reference contract passed with ${knitting.length} entries.`);
