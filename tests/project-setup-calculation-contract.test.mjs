import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url);
const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const engineSource = readFileSync(new URL("../calculator-engine.js", import.meta.url), "utf8");
const coreSource = readFileSync(new URL("../src/calculations/core.js", import.meta.url), "utf8");

for (const file of [
  "src/calculations/core.js",
  "src/calculations/gauge.js",
  "src/calculations/yarn.js",
  "src/calculations/sizing.js",
  "src/calculations/repeat.js",
  "src/calculations/shaping.js",
  "src/calculations/garments.js",
  "src/calculations/crochet.js",
  "src/calculations/knitting.js",
  "src/calculations/rendering.js",
  "src/data/sizeReference.js"
]) {
  assert.equal(existsSync(join(root.pathname, file)), true, `${file} exists`);
}

for (const sharedFunction of [
  "calculateGauge",
  "calculateTargetStitches",
  "calculateTargetRows",
  "roundToRepeat",
  "calculateAreaYarnEstimate",
  "calculateSwatchYarnDensity",
  "calculateScarfPlan",
  "calculateSockPlan",
  "calculateHatPlan",
  "calculateBagPlan",
  "calculateBlanketPlan",
  "calculateAmigurumiPlan",
  "calculateShawlPlan",
  "calculateGarmentPlan",
  "calculateProjectPlan",
  "calculateCircle",
  "calculateC2CBlanket",
  "calculateSleeveStitchShaping",
  "calculatePatternYarnEstimate"
]) {
  assert.match(coreSource, new RegExp(`function ${sharedFunction}\\b`), `${sharedFunction} is implemented in shared calculations`);
}

for (const helper of [
  "flowGaugeValues",
  "flowSafetyMargin",
  "gramsPerCm2",
  "estimateYarnFromArea",
  "applyRepeatRounding",
  "calculateFlowProjectPlan",
  "expandInstructionRepeats",
  "analyzeRowInstruction",
  "stitchActionForToken"
]) {
  assert.match(appSource, new RegExp(`function ${helper}\\b`), `${helper} is implemented`);
}

assert.match(appSource, /sharedCalculationEngine\(\)/, "Flow Mode can access shared calculations");
assert.match(appSource, /engine\.calculateProjectPlan\(p,setup\)/, "Flow Mode delegates project planning to the shared project plan");
assert.match(engineSource, /YarnchaCalculations/, "calculator-engine delegates to the shared calculation layer");

for (const field of [
  "patternToolSizeMm",
  "userToolSizeMm",
  "patternGaugeStitches",
  "patternGaugeRows",
  "userGaugeStitches",
  "userGaugeRows",
  "gaugeWidthCm",
  "gaugeHeightCm",
  "stitchRepeatMultiple",
  "edgeStitches",
  "swatchWidthCm",
  "swatchHeightCm",
  "swatchWeightGrams",
  "patternYarnGrams",
  "patternAreaCm2",
  "originalPatternStitches",
  "originalPatternRows",
  "patternWidthCm",
  "patternLengthCm"
]) {
  assert.match(appSource, new RegExp(field), `universal setup field ${field} is stored`);
}

for (const copy of [
  "Yarncha needs your gauge to give a more accurate size estimate.",
  "Your yarn or tool size is different from the pattern. The finished size may change. Please enter your gauge for a better estimate.",
  "Estimate only",
  "Start Flow Mode",
  "Estimated finished width",
  "Estimated finished length",
  "Recommended stitch count",
  "Recommended row count",
  "Yarn estimate",
  "This row may need a quick check. The stitch count does not fully match the previous row.",
  "For babies, embroidered eyes are safer than plastic safety eyes.",
  "This bag may stretch when filled. Consider a firmer stitch, lining, or smaller hook."
]) {
  assert.match(appSource + coreSource, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `friendly copy exists: ${copy}`);
}

for (const rawWord of ["parser", "database", "recognition engine", "grid X", "grid Y"]) {
  assert.doesNotMatch(appSource.slice(appSource.indexOf("function friendlyChartBetaHtml"), appSource.indexOf("function flowRecognitionResultsHtml")), new RegExp(rawWord, "i"), `Flow Mode setup avoids ${rawWord}`);
}

assert.match(appSource, /2\(sc, inc, sc\)/, "repeat example remains visible");
assert.match(appSource, /function expandInstructionRepeats[\s\S]*\(\[\^\(\)\]\+\)/, "repeat expansion handles 2(sc, inc, sc)");

console.log("Project setup calculation contract passed.");
