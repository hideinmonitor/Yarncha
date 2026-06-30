import assert from "node:assert/strict";
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

console.log("Symbol learning contract passed.");
