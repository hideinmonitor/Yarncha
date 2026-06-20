import assert from "node:assert/strict";
import "../symbol-database.js";

const database = globalThis.YarnchaSymbolDatabase;
const requiredFields = ["id","craft","category","symbol","abbreviation","fullName","description","howTo","beginnerExplanation","difficulty","aliases","languageVariants","relatedSymbols","commonMistakes","chartExamples","recognitionAliases","ocrKeywords","possibleMeanings","ambiguityWarnings","confidenceHint","requiresLegendCheck","flowModeReady"];

assert.ok(database, "database is exposed for the UI and future Flow Mode");
assert.ok(database.entries.length >= 80, "database contains the requested foundation entries");
for (const entry of database.entries) {
  for (const field of requiredFields) assert.ok(Object.hasOwn(entry, field), `${entry.id} has ${field}`);
}
for (const name of ["Knit","Purl","Make One Left","Centered Double Decrease","Cable Left","Chain","Double Crochet","Popcorn","Front Loop Only","Tunisian Simple Stitch","Tunisian Smock Stitch","Flat chart direction","Tunisian chart conventions"]) {
  assert.ok(database.entries.some(entry => entry.fullName === name), `contains ${name}`);
}
const circleCandidates = database.recognitionCandidates({ craft:"Knitting", symbol:"○" });
assert.ok(circleCandidates.length > 1, "ambiguous circle returns multiple candidates");
assert.ok(circleCandidates.every(candidate => candidate.entry.requiresLegendCheck), "candidate matches require legend review");
assert.ok(database.search("k2tog", { craft:"Knitting", category:"All", difficulty:"All" }).length, "search matches abbreviations");
assert.ok(database.search("鎖針", { craft:"Crochet", category:"All", difficulty:"All" }).some(entry=>entry.abbreviation==="CH"), "search matches localized recognition aliases");
const custom = database.normalizeEntry({ id:"custom-test", craft:"Crochet", fullName:"My Local Symbol", symbol:"△", recognitionAliases:["triangle sample"] });
assert.equal(custom.id,"custom-test","future custom packs can use the same normalized schema");
assert.equal(custom.requiresLegendCheck,true,"custom entries remain review-first by default");

console.log(`Symbol Database: ${database.entries.length} normalized entries passed.`);
