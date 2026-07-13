import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import "../symbol-database.js";

const database=globalThis.YarnchaSymbolDatabase;
const crochet=database.entries.filter(entry=>entry.craft==="Crochet");
const required=["CH","ch-sp","sp","foundation ch","turning ch","MR","fsc","fhdc","fdc","SL ST","SC","HDC","DC","TR","DTR","TRTR","inc","SC INC","SC2TOG","HDC2TOG","DC2TOG","TR2TOG","inv dec","BLO","FLO","both loops","third loop","FPDC","BPDC","FPSC","BPSC","FPHDC","BPHDC","FPTR","BPTR","Shell","fan","5 dc shell","PC","Puff","Bobble","CL","Picot","open mesh","filled mesh","MC","CC","continuous rnds","st marker","sl st join","FO","RS","WS","BOR","PM","no stitch"];
for(const abbreviation of required)assert.ok(crochet.some(entry=>entry.abbreviation===abbreviation),`contains ${abbreviation}`);
for(const entry of crochet){
  for(const field of ["abbreviations","meaning","howToRead","howToWork","rowChartNote","roundChartNote","beginnerNote","commonMistakes","relatedSymbols","relatedTools","legendWarning","usUkWarning"])assert.ok(entry[field],`${entry.abbreviation} has ${field}`);
  for(const field of ["us","uk","cn","jp"])assert.ok(entry.abbreviations[field],`${entry.abbreviation} has ${field} abbreviation`);
}
assert.ok(database.search("UK tr",{craft:"Crochet",category:"All",difficulty:"All"}).some(entry=>entry.abbreviation==="DC"));
assert.ok(database.search("短針",{craft:"Crochet",category:"All",difficulty:"All"}).some(entry=>entry.abbreviation==="SC"));
assert.ok(database.search("細編み",{craft:"Crochet",category:"All",difficulty:"All"}).some(entry=>entry.abbreviation==="SC"));
assert.match(crochet.find(entry=>entry.abbreviation==="no stitch").howToWork,/not a stitch/i);

const app=await readFile(new URL("../app.js",import.meta.url),"utf8");
for(const text of ["Crochet chart reading basics","Rows","Rounds & motifs","Amigurumi","Row chart note","Round chart note","Loop placement","Post stitch","Finishing"])assert.match(app,new RegExp(text,"i"));
assert.match(app,/crochet-abbreviation-chips/);
assert.match(app,/US and UK crochet terms are different/);
console.log(`Crochet symbol reference contract passed with ${crochet.length} entries.`);
