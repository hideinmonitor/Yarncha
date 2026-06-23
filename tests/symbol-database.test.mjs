import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import "../symbol-database.js";

const database = globalThis.YarnchaSymbolDatabase;
const requiredFields = ["id","craft","category","symbol","visualSymbol","symbolIcon","symbolType","abbreviation","abbreviationChinese","nameEnglish","nameTraditionalChinese","nameEn","nameZh","explanation","fullName","description","howTo","beginnerExplanation","difficulty","aliases","languageVariants","relatedSymbols","commonMistakes","chartExamples","recognitionAliases","ocrKeywords","possibleMeanings","ambiguityWarnings","confidenceHint","requiresLegendCheck","chartLegendWarning","flowModeReady","needsReview","sourceType","sourceName","sourceUrl","sourceNote","sourceReferences","variationNotes","matchedUploadedReference","lastVerifiedDate","confidence","tags","notes","customSvg","verificationStatus","verifiedDate","verifiedBy","verificationNotes"];

assert.ok(database, "database is exposed for the UI and future Flow Mode");
assert.ok(database.entries.length >= 80, "database contains the requested foundation entries");
for (const entry of database.entries) {
  for (const field of requiredFields) assert.ok(Object.hasOwn(entry, field), `${entry.id} has ${field}`);
}
for (const name of ["Knit","Purl","Make One Left","Centered Double Decrease","Cable Left","Chain","Double Crochet","Popcorn","Front Loop Only","Tunisian Simple Stitch","Tunisian Smock Stitch","Flat chart direction","Tunisian chart conventions"]) {
  assert.ok(database.entries.some(entry => entry.fullName === name), `contains ${name}`);
}
const circleCandidates = database.recognitionCandidates({ craft:"Knitting", symbol:"○" });
assert.ok(circleCandidates.length >= 1, "circle returns a reviewed yarn-over candidate without duplicate alias records");
assert.ok(circleCandidates.every(candidate => candidate.entry.requiresLegendCheck), "candidate matches require legend review");
assert.ok(database.search("k2tog", { craft:"Knitting", category:"All", difficulty:"All" }).length, "search matches abbreviations");
assert.ok(database.search("鎖針", { craft:"Crochet", category:"All", difficulty:"All" }).some(entry=>entry.abbreviation==="CH"), "search matches localized recognition aliases");
assert.ok(database.search("短針", { craft:"Crochet", category:"All", difficulty:"All" }).some(entry=>entry.abbreviation==="SC"), "search matches Traditional Chinese terms");
assert.ok(database.search("dc UK", { craft:"Crochet", category:"All", difficulty:"All" }).some(entry=>entry.abbreviation==="SC"), "searching dc UK resolves to US single crochet");
const singleCrochet=database.entries.find(entry=>entry.craft==="Crochet"&&entry.abbreviation==="SC");
assert.equal(singleCrochet.abbreviationUS,"sc","single crochet keeps its US abbreviation");
assert.equal(singleCrochet.abbreviationUK,"dc","single crochet maps to UK double crochet");
assert.equal(singleCrochet.visualSymbol,"×","single crochet renders a visual chart mark");
assert.equal(singleCrochet.symbolIcon,"single-crochet","single crochet uses the SVG icon registry");
assert.equal(database.entries.find(entry=>entry.craft==="Crochet"&&entry.abbreviation==="DC").abbreviationUK,"tr","US double crochet maps to UK treble");
assert.ok(database.entries.every(entry=>entry.chartLegendWarning.includes("Always check the pattern legend")),"every entry shows the legend warning");
assert.ok(database.entries.every(entry=>["CYC","common-knitting","jp-cn-chart","needs-review"].includes(entry.sourceType)),"every entry has an allowed source type");
assert.ok(database.entries.every(entry=>entry.sourceNote.length>10),"every entry has a short source audit note");
assert.ok(database.entries.every(entry=>["High","Medium","Low"].includes(entry.confidence)),"every entry has an audit confidence level");
assert.ok(database.entries.filter(entry=>entry.confidence!=="High").every(entry=>entry.verificationStatus==="To Be Confirmed"),"non-high confidence entries are never presented as confirmed");
assert.ok(database.entries.every(entry=>entry.lastVerifiedDate),"every entry records the last audit date");
assert.ok(database.entries.every(entry=>entry.visualSymbol!=="◇"),"generic diamond placeholders were removed");
assert.equal(database.entries.filter(entry=>entry.craft==="Shared").length,0,"duplicate shared stitch aliases were removed");
assert.ok(database.entries.every(entry=>Array.isArray(entry.recognitionAliases)&&Array.isArray(entry.ocrKeywords)&&Array.isArray(entry.possibleMeanings)),"Flow Mode metadata exists on every entry");
assert.ok(database.entries.every(entry=>entry.visualSymbol!=="?"),"unknown symbols use category fallbacks instead of question marks");
assert.equal(database.defaultSymbols,database.entries,"immutable default symbols remain the source of truth");
assert.ok(database.entries.every(entry=>["To Be Confirmed","Confirmed","Manually Verified"].includes(entry.verificationStatus)),"every default has a supported verification status");
assert.ok(database.searchEntries(database.entries,"",{craft:"All",category:"All",difficulty:"All",verification:"Confirmed"}).every(entry=>entry.verificationStatus==="Confirmed"),"verification filters can run against a merged dataset");
assert.ok(database.entries.filter(entry=>entry.needsReview).every(entry=>entry.reviewStatus==="needs-review"&&!entry.flowModeReady),"uncertain visual marks are clearly held for review");
for(const abbreviation of ["K","P","YO","Sl","K2TOG","SSK","KFB","PFB","KTBL","PTBL","1/1 LC","1/1 RC","2/2 LC","2/2 RC"]){
  const entry=database.entries.find(item=>item.craft==="Knitting"&&item.abbreviation===abbreviation);
  assert.ok(entry?.symbolIcon,`${abbreviation} has a reusable chart icon`);
}
for(const [abbreviation,symbolType] of [["CH","chain"],["SL ST","slip-stitch-crochet"],["SC","single-crochet"],["HDC","half-double-crochet"],["DC","double-crochet"],["TR","treble-crochet"],["PC","popcorn"],["Puff","legend-specific"],["Bobble","legend-specific"],["CL","cluster"],["Shell","shell"],["Picot","picot"],["FPDC","front-post"],["BPDC","back-post"]]){
  const entry=database.entries.find(item=>item.craft==="Crochet"&&item.abbreviation===abbreviation);
  assert.equal(entry?.symbolType,symbolType,`${abbreviation} uses its own crochet symbol family`);
}
assert.equal(database.entries.find(entry=>entry.craft==="Knitting"&&entry.abbreviation==="3/3 LC")?.symbolType,"cable-left-3-3","3/3 left cable has a six-stitch SVG rather than the 2/2 icon");
assert.equal(database.entries.find(entry=>entry.craft==="Knitting"&&entry.abbreviation==="3/3 RC")?.symbolType,"cable-right-3-3","3/3 right cable has a six-stitch SVG rather than the 2/2 icon");
const tunisianRequired=["TSS","TKS","TPS","TRS","TFS","TDC","TYO","TYO-FS","T INC 1→3","T2TOG","T3TOG","T4TOG","T5TOG","TC-A","TC-B","TDC-X","T3-LC"];
for(const abbreviation of tunisianRequired){
  const entry=database.entries.find(item=>item.craft==="Tunisian"&&item.abbreviation===abbreviation);
  assert.ok(entry,`Tunisian database contains ${abbreviation}`);
  assert.match(entry.symbolType,/^(tunisian-|legend-specific$)/,`${abbreviation} never reuses a regular knitting or crochet icon`);
  assert.ok(entry.nameTraditionalChinese&&entry.nameTraditionalChinese!=="需核對",`${abbreviation} has a Chinese reference name`);
  assert.ok(entry.sourceName.includes("IMG_4154–IMG_4165"),`${abbreviation} cites the uploaded Tunisian reference set`);
}
for(const abbreviation of ["TRS","TFS","TYO","TYO-FS"]){
  const entry=database.entries.find(item=>item.craft==="Tunisian"&&item.abbreviation===abbreviation);
  assert.equal(entry.verificationStatus,"To Be Confirmed",`${abbreviation} remains unconfirmed because its modern-label mapping is not universal`);
  assert.equal(entry.flowModeReady,false,`${abbreviation} cannot be auto-confirmed by future Flow Mode`);
}
for(const abbreviation of ["TSS","TPS","TKS","TDC","TSLST"]){
  const entry=database.entries.find(item=>item.craft==="Tunisian"&&item.abbreviation===abbreviation);
  assert.equal(entry.confidence,"High",`${abbreviation} operation is confirmed by the uploaded sheet and standard abbreviation reference`);
  assert.notEqual(entry.symbolType,"legend-specific",`${abbreviation} has a dedicated Tunisian SVG`);
}
assert.equal(database.audit().missingSymbolType.length,0,"developer audit finds no missing symbol types");
assert.equal(database.audit().craftMismatchWarnings.length,0,"developer audit finds no craft mismatches");
assert.ok(database.entries.every(entry=>Array.isArray(entry.sourceReferences)&&entry.sourceReferences.length>=2),"every entry carries multiple source references");
assert.ok(database.entries.every(entry=>entry.variationNotes),"every entry documents symbol variation or uncertainty");
const appSource=await readFile(new URL("../app.js",import.meta.url),"utf8");
assert.match(appSource,/symbol-card-mark[^\n]+symbolVisualHtml\(entry\)/,"symbol cards prefer uploaded pictures and retain reusable SVG fallbacks");
assert.match(appSource,/Technique Reference/,"symbol details include user-managed technique references");
for(const helper of ["loadSymbolOverrides","saveSymbolOverride","resetSymbolOverride","exportSymbolsJson","importSymbolsJson","validateSymbolEntry","openSymbolEditModal"]){
  assert.match(appSource,new RegExp(`function ${helper}\\b`),`${helper} is implemented`);
}
assert.match(appSource,/userSymbolsOverride/,"symbol edits use a separate local override layer");
assert.match(appSource,/symbol-verification-filter/,"verification status is filterable in the UI");
assert.match(appSource,/Verification status/,"verification status can be sorted in the UI");
assert.doesNotMatch(appSource,/name:\s*"Stitch Technique Refresher"/,"the retired built-in refresher is not seeded");
const custom = database.normalizeEntry({ id:"custom-test", craft:"Crochet", fullName:"My Local Symbol", symbol:"△", recognitionAliases:["triangle sample"] });
assert.equal(custom.id,"custom-test","future custom packs can use the same normalized schema");
assert.equal(custom.requiresLegendCheck,true,"custom entries remain review-first by default");

console.log(`Symbol Database: ${database.entries.length} normalized entries passed.`);
