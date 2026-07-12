import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const engineSource = readFileSync("repeat-engine.js", "utf8");
const app = readFileSync("app.js", "utf8");
const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const context = { Date, Math, console, globalThis: {} };
context.window = context.globalThis;
vm.createContext(context);
vm.runInContext(engineSource, context);
const engine = context.globalThis.YarnchaRepeatEngine;

for (const fn of [
  "createRepeatRule",
  "validateRepeatRule",
  "getTriggerPositions",
  "getNextTrigger",
  "getPreviousTrigger",
  "isTriggerPosition",
  "formatRepeatRule",
  "migrateRepeatRules",
  "projectPositionForLocal",
  "localPositionForProject"
]) {
  assert.equal(typeof engine[fn], "function", `${fn} is exposed`);
}

for (const type of [
  "every-x-rows",
  "every-xth-row",
  "every-x-rounds",
  "every-xth-round",
  "every-row",
  "every-round",
  "every-rs-row",
  "every-ws-row",
  "every-other-row",
  "every-alternate-row",
  "custom"
]) {
  assert.ok(engine.repeatTypes.includes(type), `${type} remains distinct`);
}

const everyEight = engine.createRepeatRule({ repeatType: "every-x-rows", repeatValue: 8, startAt: 8 });
const positions = value => Array.from(value);
assert.deepEqual(positions(engine.getTriggerPositions(everyEight, { from: 1, limit: 5 })), [8, 16, 24, 32, 40], "every X rows previews from start position");
assert.equal(engine.getNextTrigger(everyEight, 42), 48, "next project trigger is calculated");
assert.equal(engine.getPreviousTrigger(everyEight, 42), 40, "previous project trigger is calculated");
assert.equal(engine.isTriggerPosition(everyEight, 40), true, "trigger position can be checked");

const decreaseAt179 = engine.createRepeatRule({repeatType:"every-x-rows",firstTrigger:179,repeatValue:8});
assert.deepEqual(positions(engine.getTriggerPositions(decreaseAt179,{from:179,limit:5})),[179,187,195,203,211],"first trigger is an inclusive anchor");
assert.deepEqual(positions(engine.getTriggerPositions({repeatType:"every-x-rows",firstTrigger:0,repeatValue:8},{from:0,limit:5})),[0,8,16,24,32],"row zero remains supported");
assert.deepEqual(positions(engine.getTriggerPositions({repeatType:"every-x-rows",firstTrigger:1,repeatValue:1},{from:1,limit:5})),[1,2,3,4,5],"one-row cadence starts inclusively");
assert.equal(engine.isTriggerPosition(decreaseAt179,179),true,"rule triggers when current row equals first trigger");
assert.equal(engine.isTriggerPosition(decreaseAt179,178),false,"rule does not trigger before first trigger");

const sleeve = engine.createRepeatRule({ mode: "subCounter", sectionName: "Sleeve Shaping", repeatType: "every-x-rows", repeatValue: 6, startAt: 0, localStartValue: 0, sectionStartProjectPosition: 42 });
assert.deepEqual(positions(engine.getTriggerPositions(sleeve, { from: 0, limit: 3 })), [0, 6, 12], "sub-counter local triggers are calculated");
assert.deepEqual(positions(engine.getTriggerPositions({ ...sleeve, skipFirstRepeat: true }, { from: 0, limit: 3 })), [6, 12, 18], "skip first repeat works for sub-counters");
assert.equal(engine.projectPositionForLocal(sleeve, 6), 48, "sub-counter maps local position to project row");
assert.equal(engine.localPositionForProject(sleeve, 48), 6, "project row maps back to local section row");

assert.deepEqual(positions(engine.getTriggerPositions({ repeatType: "every-rs-row", startAt: 1, rowSide: "RS" }, { from: 1, limit: 4 })), [1, 3, 5, 7], "RS row filtering uses odd rows by default");
assert.deepEqual(positions(engine.getTriggerPositions({ repeatType: "every-ws-row", startAt: 1, rowSide: "WS" }, { from: 1, limit: 4 })), [2, 4, 6, 8], "WS row filtering uses even rows by default");

assert.equal(engine.validateRepeatRule({ repeatType: "every-x-rows", repeatValue: 0 }).valid, false, "repeat value 0 is invalid");
assert.match(engine.validateRepeatRule({ startAt: 10, endAt: 4 }).errors.join(" "), /Start row cannot be after the end row/, "start-after-end validation is friendly");
assert.match(engine.validateRepeatRule({ mode: "subCounter", sectionName: "", sectionStartProjectPosition: "" }).errors.join(" "), /Add a section name/, "sub-counter section name is required");

const migrated = engine.migrateRepeatRules([{ id: "p1", subCounters: [{ id: "s1", name: "Cable Repeat", every: 6, anchorRow: 12 }] }]);
assert.equal(migrated[0].repeatRules.length, 1, "legacy sub counters migrate to repeat rules");
assert.equal(migrated[0].repeatRules[0].linkedFeature, "project", "migrated rule links to project");
assert.equal(engine.createRepeatRule({startRow:12,repeatValue:4}).startAt,12,"legacy startRow migrates to the inclusive startAt anchor");

assert.match(html, /repeat-engine\.js\?v=/, "Repeat Engine is loaded before app runtime");
assert.match(app, /repeatEngine\(\)\?\.migrateRepeatRules/, "project load migrates repeat rules");
assert.match(app, /repeatEngine\(\)\?\.getNextTrigger/, "sub-counter next trigger uses Repeat Engine");
assert.match(app, /repeatEngine\(\)\.validateRepeatRule/, "UI validates repeat rules before save");
assert.match(app, /Repeat Counter/, "UI exposes Repeat Counter mode");
assert.match(app, /Sub-Counter \/ New Section/, "UI exposes Sub-Counter mode");
assert.match(app, /Advanced Repeat Settings/, "advanced settings are hidden behind a friendly accordion");
assert.match(app, /Live preview/, "UI includes live trigger preview");
assert.match(css, /\.repeat-engine-modal/, "Repeat Engine modal is styled");
assert.match(css, /\.repeat-preview-pills/, "Repeat preview pills are styled");
const refinedModal=app.slice(app.indexOf("function openSubCounterModal(editId=null){"),app.indexOf("function openSubCounterModalLegacy"));
assert.match(refinedModal,/First trigger row \/ round/,"repeat mode uses an unambiguous first-trigger label");
assert.match(refinedModal,/This exact row is the first time the rule happens\./,"inclusive anchor helper is shown");
assert.match(refinedModal,/Section begins at main row \/ round/,"sub-counter section start is explicit");
assert.match(refinedModal,/Sub-counter starts at/,"sub-counter starting value is explicit");
assert.doesNotMatch(refinedModal,/Current count|Repeat type|Anchor Row/,"ambiguous and mixed legacy fields are absent from the refined modal");
assert.match(refinedModal,/host\.innerHTML=mode==="repeatCounter"\?/,"mode fields are rendered conditionally rather than hidden");
assert.match(css,/\.modal:has\(\.repeat-engine-modal\) \{ width:min\(680px,calc\(100vw - 32px\)\)/,"Repeat modal is viewport bounded");
assert.match(app,/repeat-save-mobile">Save rule/,"Repeat Counter uses a compact mobile save label");
assert.match(app,/repeat-save-mobile">Save counter/,"Sub-Counter uses a compact mobile save label");
assert.match(css,/@media \(max-width:600px\)[\s\S]*\.modal \.repeat-modal-actions \{ display:grid !important; grid-template-columns:minmax\(0,1fr\) !important;/,"mobile footer actions stack safely below 600px");
assert.match(css,/\.modal \.repeat-modal-actions > \.primary-button \{ order:1; \}/,"mobile Save action appears before Cancel");

console.log("Repeat engine contract passed.");
