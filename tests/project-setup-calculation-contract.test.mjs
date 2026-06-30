import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");

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
  assert.match(source, new RegExp(`function ${helper}\\b`), `${helper} is implemented`);
}

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
  assert.match(source, new RegExp(field), `universal setup field ${field} is stored`);
}

for (const formula of [
  /stitchesPerCm=\(userGaugeStitches\|\|patternGaugeStitches\|\|20\)\/gaugeWidthCm/,
  /rowsPerCm=\(userGaugeRows\|\|patternGaugeRows\|\|28\)\/gaugeHeightCm/,
  /patternStitchesPerCm=\(patternGaugeStitches\|\|userGaugeStitches\|\|20\)\/gaugeWidthCm/,
  /patternRowsPerCm=\(patternGaugeRows\|\|userGaugeRows\|\|28\)\/gaugeHeightCm/,
  /originalPatternStitches\*\(g\.stitchesPerCm\/g\.patternStitchesPerCm\)/,
  /originalPatternRows\*\(g\.rowsPerCm\/g\.patternRowsPerCm\)/,
  /\(\(result\.expectedWidthCm-patternWidth\)\/patternWidth\)\*100/,
  /\(\(result\.expectedLengthCm-patternLength\)\/patternLength\)\*100/
]) {
  assert.match(source, formula, `universal gauge formula ${formula} exists`);
}

for (const formula of [
  /swatchArea=cleanNumber\(setup\.swatchWidthCm\)\*cleanNumber\(setup\.swatchHeightCm\)/,
  /cleanNumber\(setup\.swatchWeightGrams\)\/swatchArea/,
  /patternYarn\*\(areaCm2\/patternArea\)\*safetyMargin/,
  /areaCm2\*gramsPerCm2\(setup\)\*safetyMargin/
]) {
  assert.match(source, formula, `yarn estimate formula ${formula} exists`);
}

for (const projectType of ["Scarf","Socks","Hat / Beanie","Bag","Blanket","Amigurumi","Shawl","Cardigan","Dress"]) {
  assert.match(source, new RegExp(`setup\\.projectType==="${projectType.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"|type==="${projectType.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), `${projectType} calculation branch exists`);
}

for (const formula of [
  /width\*g\.stitchesPerCm/,
  /length\*g\.rowsPerCm/,
  /targetFootCircumference=footCirc\*\(1-negative\)/,
  /roundCircular\(targetFootCircumference\*g\.stitchesPerCm,4\)/,
  /targetHatCircumference=head\*\(1-negativeEase\)/,
  /borderOuterWidth=width\+2\*border/,
  /borderOuterLength=length\+2\*border/,
  /borderArea=borderOuterWidth\*borderOuterLength-targetArea/,
  /result\.squaresAcross=Math\.ceil\(width\/square\)/,
  /result\.blocksAcross=Math\.ceil\(width\/blockWidth\)/,
  /heightScale=desiredHeight\/originalHeight/,
  /widthScale=desiredWidth\/originalWidth/,
  /averageScale=\(heightScale\+widthScale\)\/2/,
  /originalYarnGrams[\s\S]{0,80}\*averageScale\*\*2/,
  /originalStuffingGrams[\s\S]{0,80}\*averageScale\*\*3/,
  /\(desiredWidth\*3\.1416\)\*g\.stitchesPerCm/,
  /wingspan\*depth\/2/,
  /\.5\*3\.1416\*depth\*\*2/,
  /wingspan\*depth\*\.55/,
  /wingspan\*depth\*\.5/,
  /wingspan\+2\*Math\.sqrt\(\(wingspan\/2\)\*\*2\+depth\*\*2\)/,
  /targetChest=chest\+ease/,
  /bodyStitches=Math\.round\(targetChest\*g\.stitchesPerCm\)/,
  /result\.backStitches=Math\.round\(bodyStitches\/2\)/,
  /result\.frontPanelStitches=Math\.round\(bodyStitches\/4\)/,
  /result\.upperSleeveStitches=Math\.round\(upper\*g\.stitchesPerCm\)/,
  /result\.cuffStitches=Math\.round\(wrist\*g\.stitchesPerCm\)/,
  /result\.sleeveIncreaseStitches=Math\.max\(0,result\.upperSleeveStitches-result\.cuffStitches\)/,
  /skirtIncreaseStitches=Math\.max\(0,targetHipStitches-targetWaistStitches\)/
]) {
  assert.match(source, formula, `specific project formula ${formula} exists`);
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
  assert.match(source, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `friendly copy exists: ${copy}`);
}

for (const rawWord of ["parser", "database", "recognition engine", "grid X", "grid Y"]) {
  assert.doesNotMatch(source.slice(source.indexOf("function friendlyChartBetaHtml"), source.indexOf("function flowRecognitionResultsHtml")), new RegExp(rawWord, "i"), `Flow Mode setup avoids ${rawWord}`);
}

assert.match(source, /2\(sc, inc, sc\)/, "repeat example remains visible");
assert.match(source, /text\.replace\(\/\(\\d\+\)\\s\*\\\(\(\[\^\(\)\]\+\)\\\)\/g/, "repeat expansion handles 2(sc, inc, sc)");

console.log("Project setup calculation contract passed.");
