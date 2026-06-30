import assert from "node:assert/strict";
<<<<<<< HEAD
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

assert.match(app, /symbolLearningLibrary:\[\]/, "starter state includes a local symbol learning library");
assert.match(app, /id: "symbol-learning"/, "Library includes a Symbol Learning Library section");
assert.match(app, /function normalizeLearningRecord/, "learning records are normalized through a schema helper");
assert.match(app, /schemaVersion:1[\s\S]+syncStatus:raw\.syncStatus\|\|"local-only"/, "learning schema is future-ready and local-only by default");
assert.match(app, /function learnedSymbolSuggestion/, "Flow Mode can check learned symbols before suggestions");
assert.match(app, /Local learning first/, "Flow Mode explains that local corrections are checked first");
assert.match(app, /Yarncha remembers your corrections on this device/, "UI uses local learning wording");
assert.doesNotMatch(app, /(?:is|was|has been|will be) retrained|model training complete/i, "UI does not claim model retraining");
assert.match(app, /Save this correction to my symbol learning library\?/, "correction flows ask before saving learning data");
assert.match(app, /function symbolLearningLibraryHtml/, "Learning Review page exists");
assert.match(app, /exportLearningJson/, "learning data can be exported");
assert.match(app, /importLearningJson/, "learning data can be imported");
assert.match(app, /resetLearningLibrary/, "learning data can be reset");
assert.match(app, /detectedSymbolImageAsset/, "learning records can reference a detected symbol image or crop asset");
assert.match(app, /snapshot\.symbolLearningLibrary/, "full backups include learning image assets");
assert.match(app, /imported\.symbolLearningLibrary/, "backup import merges learning records");
assert.match(css, /\.symbol-learning-grid/, "Learning Review page has layout styles");
assert.match(css, /\.learning-suggestion/, "local suggestion card is styled");
=======
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../app.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../styles.css", import.meta.url), "utf8");

for (const helper of [
  "normalizeLearningRecord",
  "learningRecords",
  "upsertLearningRecord",
  "learningRecordFromSymbolEntry",
  "syncLearningFromSymbolEntry",
  "symbolKnowledgeLayer",
  "matchSymbolKnowledge",
  "saveFlowModeCorrection"
]) {
  assert.match(source, new RegExp(`function ${helper}\\b`), `${helper} is implemented`);
}

assert.match(source, /symbolLearningLibrary:\[\]/, "state keeps local symbol memory");
assert.match(source, /merged\.symbolLearningLibrary = \(saved\.symbolLearningLibrary \|\| \[\]\)\.map\(normalizeLearningRecord\)/, "saved learning records are normalized on load");
assert.match(source, /syncLearningFromSymbolEntry\(normalized,\{save:false\}\)/, "Symbol Database edits automatically update learning records");
for (const field of ["symbolId","nameEn","nameZh","abbreviation","craft","category","symbolType","symbolImageAsset","source:\"symbol-database-edit\"","verificationStatus","confidence","updatedAt"]) {
  assert.ok(source.includes(field), `learning records include ${field}`);
}
assert.match(source, /symbolLearningKey\(record\)/, "learning records have a dedupe key");
assert.match(source, /abbreviation&&item\.abbreviation\.toLowerCase\(\)===next\.abbreviation\.toLowerCase\(\)&&item\.craft\.toLowerCase\(\)===next\.craft\.toLowerCase\(\)/, "same abbreviation and craft updates instead of duplicating");
const orderedNeedles = [
  'verificationStatus==="Manually Verified")return 1',
  'if(item.symbolImageAsset)return 2',
  'if(item.source&&item.source!=="symbol-database-edit")return 3',
  'if(item.verificationStatus==="Confirmed")return 4',
  'return 5'
];
let lastIndex = -1;
for (const needle of orderedNeedles) {
  const nextIndex = source.indexOf(needle);
  assert.ok(nextIndex > lastIndex, `recognition order includes ${needle}`);
  lastIndex = nextIndex;
}
assert.match(source, /symbolSuggestions/, "chart analysis stores symbol suggestions from the knowledge layer");
assert.match(source, /Save only as Flow Mode correction/, "Flow Mode correction can stay local to Flow Mode");
assert.match(source, /Save to Symbol Database/, "Flow Mode correction can also update Symbol Database");
assert.match(source, /Learn from this symbol/, "symbol learning toggle is exposed");
assert.match(source, /Yarncha will remember this symbol for future chart reading\./, "future chart reading wording is shown");
assert.match(source, /Yarncha remembers your corrections on this device\./, "local learning wording avoids model-training claims");
assert.doesNotMatch(source, /SYMBOL LEARNING LIBRARY|Local chart-reading memory/, "visible Symbol Learning Library summary is removed from the UI");
assert.doesNotMatch(styles, /\.symbol-learning-summary|\.symbol-learning-stats/, "removed learning summary styles");
assert.doesNotMatch(source, /retrained|model has been trained|train(?:ed)? the AI model/i, "UI does not claim model retraining");
assert.match(source, /symbolImageAsset\|\|record\.detectedSymbolImageAsset/, "learning image references are included in backup assets");
assert.match(source, /symbolLearningLibrary:learningRecords\(\)/, "symbol export includes learning data");
assert.match(source, /\(imported\.symbolLearningLibrary\|\|\[\]\)\.forEach\(record=>upsertLearningRecord\(record,\{save:false\}\)\)/, "backup import merges learning data");
>>>>>>> feature/flowmode

console.log("Symbol learning contract passed.");
