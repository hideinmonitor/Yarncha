import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");

for (const helper of [
  "voiceIntentAliases",
  "normalizeVoiceText",
  "voiceDistance",
  "voiceSimilarity",
  "matchVoiceIntent",
  "updateVoiceDebug",
  "confirmVoiceIntent",
  "executeVoiceIntent"
]) {
  assert.match(app, new RegExp(helper), `${helper} exists`);
}

for (const phrase of [
  "next row",
  "go to next row",
  "move to next row",
  "row down",
  "advance row",
  "previous row",
  "go back",
  "row up",
  "read current row",
  "read aloud",
  "speak row",
  "stop reading",
  "hold on",
  "continue reading",
  "下一行",
  "下一列",
  "下一個 row",
  "讀出呢行",
  "讀呢行",
  "朗讀"
]) {
  assert.ok(app.includes(phrase), `voice alias includes ${phrase}`);
}

assert.match(app, /replace\(\/\\brole\\b\/g,"row"\)/, "voice parser repairs role -> row");
assert.match(app, /replace\(\/\\broad\\b\/g,"row"\)/, "voice parser repairs road -> row");
assert.match(app, /match\.confidence>=\.82/, "high confidence commands run immediately");
assert.match(app, /match\.confidence>=\.62/, "medium confidence commands ask first");
assert.match(app, /Did you mean \$\{escapeHtml\(label\)\}\?/, "medium confidence confirmation asks the user");
assert.match(app, /Recognised text:/, "debug mode shows recognised text");
assert.match(app, /Intent matched:/, "debug mode shows matched intent");
assert.match(app, /Confidence:/, "debug mode shows confidence");
assert.match(app, /readHighlightedRowAloud\(p\)/, "read-row voice command uses Flow Mode read aloud when available");
assert.doesNotMatch(app, /\^\(next\|next row\|下一行\|下一段\|下一圈\)\$/, "old exact next-row matcher is gone");

console.log("Voice command contract passed.");
