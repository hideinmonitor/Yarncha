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

console.log("Repeat engine contract passed.");
