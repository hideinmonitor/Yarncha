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
assert.match(source, /<h2>Ask Yarncha<\/h2>/, "the unified Assistant has one Yarncha identity");
assert.match(source, /Ask about your current project, chart, stitches, symbols, pattern, or mistakes\./, "Assistant section explains its unified project-aware purpose");
assert.match(source, /function projectAssistantTabHtml\(p\)[\s\S]*assistant-tab-shell[\s\S]*\$\{yarnchaAssistantChartHtml\(p\)\}/, "the project Assistant section renders one chat shell");
assert.doesNotMatch(source, /function projectAssistantHtml|PROJECT ASSISTANT/, "the competing Project Assistant panel is removed");
assert.match(source, /chartMode==="flow"\?\`<div class="manual-chart-tools">\$\{friendlyChartBetaHtml\(p\)\}<\/div>\`:""\}/, "Flow Mode rendering remains separate");
assert.match(source, /Yarncha Assistant lives in the Assistant section/, "Chart copy points to Assistant section");
assert.match(source, /Ask about this project, row, stitch, symbol, repeat, or mistake\.\.\./, "Assistant has one practical composer");
assert.match(source, /Using \$\{context\.projectName\}[\s\S]*Row \$\{context\.currentRow\}/, "Assistant identifies the active project and row context");
assert.match(source, /Attached project context/, "verified chart and OCR text lives in collapsible attached context");
assert.match(source, /role="log"[\s\S]*id="assistant-question"[\s\S]*id="ask-assistant"/, "Assistant has one conversation area and one composer");
assert.match(source, /const assistantProviderAdapters=Object\.freeze/, "assistant providers are isolated behind an adapter registry");
assert.match(source, /async function sendAssistantMessage\(\{message,projectContext,conversationHistory=\[\],provider="local"\}/, "chat sends through a provider-agnostic interface");
assert.match(source, /await sendAssistantMessage\(\{message:question,projectContext,conversationHistory\}\)/, "the UI passes message, project context, and history to the adapter");
assert.match(source, /attachedProjectContext:reviewedChartText[\s\S]*verifiedChartText:reviewedChartText[\s\S]*ocrText:/, "project context includes reviewed chart and OCR text");
assert.match(source, /classifyQuestion\(question/, "Assistant classifies the user question first");
assert.match(source, /const techniqueGuideDatabase=\[/, "Technique Help uses a structured guide database");
assert.match(source, /function buildTechniqueHelp/, "Technique Help has a dedicated response builder");
assert.match(source, /questionType:"stitchCountProblem"/, "Stitch count answers are typed");
assert.match(source, /questionType:"droppedStitch"/, "Dropped stitch answers are typed");
assert.match(source, /questionType:"symbolMeaning"/, "Symbol answers are typed");
assert.match(source, /questionType:"abbreviation"/, "Abbreviation answers are typed");
assert.match(source, /questionType:"projectLooksDifferent"/, "Project appearance answers are typed");

for (const copy of [
  "Quick answer",
  "What to do now",
  "Step-by-step",
  "Check before continuing",
  "Common mistakes",
  "Related techniques",
  "Library links",
  "My stitch count is wrong",
  "Explain this row",
  "What does this symbol mean?",
  "Explain this repeat",
  "Help me fix a mistake",
  "Technique Help",
  "Choose a technique first",
  "Merge New Yarn",
  "Back Loop Only",
  "Work Into Chain Space",
  "Post Stitch"
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
  "Stitch Count Troubleshooting",
  "should not change your stitch count",
  "You should still have ${expected} stitches",
  "insert under only the loop farthest from you",
  "insert the hook into the open space",
  "the hook goes around the post",
  "adds stitches",
  "removes stitches",
  "Forward Pass",
  "Return Pass",
  "needle insertion direction"
]) {
  assert.match(source, new RegExp(practicalCopy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${practicalCopy} guidance is present`);
}

for (const vagueCopy of [
  "This is a Knitting technique question",
  "this Crochet technique",
  "this Knitting technique",
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
assert.match(styles, /\.assistant-count-check/, "Technique count checks have a dedicated card style");
assert.match(styles, /\.assistant-step-accordion/, "Technique steps are readable on mobile");
assert.match(styles, /\.assistant-conversation/, "the unified chat conversation is styled");
assert.match(styles, /\.assistant-tab-shell[^}]*max-width:1200px/, "the unified Assistant uses the available desktop width");

console.log("Yarncha Assistant contract passed");
