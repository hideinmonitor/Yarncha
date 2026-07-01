import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../app.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../styles.css", import.meta.url), "utf8");

for (const service of [
  "yarnchaAssistantService",
  "projectContextService",
  "teachingService",
  "troubleshootingService",
  "learningMemoryService"
]) {
  assert.match(source, new RegExp(`const ${service}=`), `${service} is implemented`);
}

assert.doesNotMatch(source, /data-chart-mode="assistant"/, "Yarncha Assistant is not a Chart mode");
assert.match(source, /<h2>Yarncha Assistant<\/h2>/, "Assistant section has Yarncha Assistant title");
assert.match(source, /Ask for help with stitches, symbols, patterns, and mistakes\./, "Assistant section explains tutor purpose");
assert.match(source, /function projectAssistantTabHtml\(p\)[\s\S]*\$\{yarnchaAssistantChartHtml\(p\)\}/, "Assistant renders in the project Assistant section");
assert.match(source, /chartMode==="flow"\?\`<div class="manual-chart-tools">\$\{friendlyChartBetaHtml\(p\)\}<\/div>\`:""\}/, "Flow Mode rendering remains separate");
assert.match(source, /Yarncha Assistant lives in the Assistant section/, "Chart copy points to Assistant section");
assert.match(source, /Ask about a stitch, symbol, row, mistake, or pattern line\.\.\./, "Assistant has the practical ask placeholder");
assert.match(source, /Using row \$\{context\.currentRow\} context/, "Assistant can show row context");
assert.match(source, /No chart context available/, "Assistant handles missing chart context");
assert.match(source, /classifyQuestion\(question/, "Assistant classifies the user question first");
assert.match(source, /questionType:"stitchCountProblem"/, "Stitch count answers are typed");
assert.match(source, /questionType:"droppedStitch"/, "Dropped stitch answers are typed");
assert.match(source, /questionType:"symbolMeaning"/, "Symbol answers are typed");
assert.match(source, /questionType:"abbreviation"/, "Abbreviation answers are typed");
assert.match(source, /questionType:"projectLooksDifferent"/, "Project appearance answers are typed");

for (const copy of [
  "Quick answer",
  "What to do now",
  "Step-by-step",
  "Check this before continuing",
  "Common mistakes",
  "Related techniques",
  "Library links",
  "My stitch count is wrong",
  "Explain this symbol",
  "Help me read this row",
  "Fix a dropped stitch",
  "What does this abbreviation mean?",
  "Why does my project look different?"
]) {
  assert.match(source, new RegExp(copy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${copy} is present`);
}

for (const practicalCopy of [
  "Stop at the end of the current row or round",
  "between repeats",
  "Do not pull the fabric",
  "pattern legend first",
  "stitch-count effect",
  "Measure your stitch gauge across 10 cm",
  "Yarn Substitution",
  "Stitch Count Troubleshooting"
]) {
  assert.match(source, new RegExp(practicalCopy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${practicalCopy} guidance is present`);
}

for (const vagueCopy of [
  "This is a Knitting technique question",
  "Work it slowly once",
  "Compare it with the next repeat",
  "Pause, count, and check one small section at a time",
  "Write a short note if the pattern wording is unusual"
]) {
  assert.doesNotMatch(source, new RegExp(vagueCopy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${vagueCopy} is not used`);
}

for (const value of ["knitting", "crochet", "tunisian", "beginner", "intermediate", "advanced"]) {
  assert.match(source, new RegExp(value), `${value} support exists`);
}

for (const action of ["save-explanation", "add-notes", "remember-correction", "verify-symbol"]) {
  assert.match(source, new RegExp(action), `${action} memory action exists`);
}

assert.match(source, /sourceType:"local-rule-based"/, "MVP answers are local rule based");
const assistantServiceSource = source.slice(source.indexOf("const yarnchaAssistantService="), source.indexOf("function yarnchaAssistantAnswerHtml"));
assert.doesNotMatch(assistantServiceSource, /fetch\(|supabase|OpenAI|api\/|analyzeChart/i, "Assistant MVP service does not require external AI/backend");
assert.match(styles, /\.yarncha-assistant-panel/, "Assistant has dedicated mobile-friendly styling");
assert.match(styles, /\.assistant-control-grid/, "Assistant controls are structured");

console.log("Yarncha Assistant contract passed");
