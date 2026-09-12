import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../app.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const handoff = await readFile(new URL("../src/services/ai-handoff.js", import.meta.url), "utf8");
const main = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const escapeRegExp = value => value.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&");

assert.match(main, /import "\.\/services\/ai-handoff\.js";/, "the handoff service loads before the application bundle");
assert.match(source, /function projectAssistantTabHtml\(p\)[\s\S]*assistant-tab-shell[\s\S]*yarnchaAssistantComposerHtml\(p\)/, "the Assistant section renders one composer surface");
assert.match(source, /<h2>Ask with AI<\/h2>/, "the Assistant has the requested heading");
assert.match(source, /Get help with your current project using the AI assistant you already use\./, "the handoff purpose is clear");
assert.match(source, /Project context active/, "the active project context is visible");
assert.match(source, /What do you need help with\?/, "the composer has a clear accessible label");
assert.match(source, /<textarea id="assistant-question"/, "there is one project question composer");
assert.match(source, /Continue with your AI/, "provider actions are framed as external continuation");
assert.match(source, /data-ai-provider/, "provider actions use the provider registry");
assert.match(source, /id="copy-assistant-prompt"/, "a provider-independent Copy prompt action exists");
assert.match(source, /Only the project context shown in Preview context will be copied\. Nothing leaves Yarncha until you choose an action\./, "privacy and explicit action are clear");
assert.match(source, /title:"Preview context"[\s\S]*id:"assistant-context-preview"/, "the exact prompt uses the shared collapsible component");
assert.match(source, /id="assistant-prompt-preview" aria-label="Prepared AI prompt"/, "the prepared prompt is inspectable");
assert.match(source, /role="status" aria-live="polite" aria-atomic="true"/, "handoff feedback is announced accessibly");
assert.match(source, /bindCollapsibleSectionState\(document\.querySelector\("\.assistant-composer"\)\)/, "the preview expanded state remains accessible");

for (const prompt of ["Explain this row", "My stitch count is wrong", "What does this symbol mean?", "Explain this repeat"]) {
  assert.match(source, new RegExp(escapeRegExp(prompt)), prompt + " suggestion is present");
}

assert.doesNotMatch(source, /id="ask-assistant"|role="log"|assistant-conversation|data-assistant-memory/, "the active UI has no simulated chat or local answer actions");
assert.doesNotMatch(source, /assistantProviderAdapters|sendAssistantMessage|yarnchaAssistantChartHtml/, "the old local answer adapter is disconnected from the UI");
assert.doesNotMatch(source, /open-chatgpt|function openInChatGPT|chatgpt\.com\/\?q=/, "the old undocumented ChatGPT handoff is removed");
assert.doesNotMatch(source, /PROJECT ASSISTANT/, "there is no competing Project Assistant identity");

assert.match(source, /const projectContextService=/, "existing project context extraction remains reusable");
for (const contextField of ["rowInstruction", "nearbyRows", "expectedStitchCount", "patternLanguage", "readingDirection", "verifiedChartText", "ocrText", "projectNotes"]) {
  assert.match(source, new RegExp(contextField), contextField + " is available to the context builder");
}
assert.match(source, /const aiHandoffService=globalThis\.YarnchaAIHandoff/, "the UI consumes a separate handoff service");
assert.match(source, /buildAssistantContext\(projectContext,projectContext\.currentRow,draft\)/, "context generation depends on the current question");
assert.match(source, /buildAssistantPrompt\(preparedContext,draft\)/, "prompt generation is separated from context extraction");
assert.match(source, /handoffToAI\(\{provider:providerId,prompt:request\.prompt\}\)/, "provider selection delegates to the handoff layer");

for (const provider of ["chatgpt", "claude", "gemini"]) {
  assert.match(handoff, new RegExp('id:"' + provider + '"'), provider + " is registered");
}
assert.match(handoff, /handoffStrategy:"copy-and-open"/, "providers explicitly declare copy-and-open behavior");
assert.match(handoff, /function buildAssistantContext/, "context building is a standalone service function");
assert.match(handoff, /function buildAssistantPrompt/, "prompt building is a standalone service function");
assert.match(handoff, /async function handoffToAI/, "handoff logic is a standalone service function");
assert.doesNotMatch(handoff, /fetch\(|XMLHttpRequest|Authorization|api[_-]?key|supabase|\?q=/i, "the handoff service has no API or undocumented prompt query integration");

assert.match(styles, /\.assistant-tab-shell[^}]*max-width:1200px/, "the Assistant uses the available desktop width");
assert.match(styles, /\.assistant-provider-grid[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/, "desktop shows three equal provider actions");
assert.match(styles, /@media \(max-width:760px\)[\s\S]*\.assistant-provider-grid \{ grid-template-columns:1fr; \}/, "mobile stacks provider actions");
assert.match(styles, /\.assistant-context-preview > \.collapsible-summary[^}]*border:0/, "the preview is not another nested card");
assert.match(styles, /\.assistant-provider-button:focus-visible/, "provider actions have a visible keyboard focus state");

console.log("Yarncha Assistant handoff contract passed");
