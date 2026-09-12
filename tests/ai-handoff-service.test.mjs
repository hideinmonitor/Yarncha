import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

await import("../src/services/ai-handoff.js");
const service = globalThis.YarnchaAIHandoff;

assert.ok(service, "the handoff service is available outside the UI");
assert.deepEqual(
  service.AI_PROVIDERS.map(provider => [provider.id, provider.webUrl, provider.handoffStrategy]),
  [
    ["chatgpt", "https://chatgpt.com/", "copy-and-open"],
    ["claude", "https://claude.ai/", "copy-and-open"],
    ["gemini", "https://gemini.google.com/", "copy-and-open"]
  ],
  "all handoffs use official base URLs and the documented fallback"
);

const project = {
  projectName: "Sage Sunday Cardigan",
  craftType: "knitting",
  projectType: "Cardigan",
  currentRow: 42,
  savedProgress: { totalRows: 128 },
  rowInstruction: "K3, SSK, P2, YO, repeat to end.",
  nearbyRows: [
    { number: 41, sequence: "Purl across." },
    { number: 42, sequence: "K3, SSK, P2, YO, repeat to end." },
    { number: 43, sequence: "Knit across." }
  ],
  expectedStitchCount: 60,
  projectSetup: {
    startStitches: 60,
    patternLanguage: "abbreviations",
    patternGauge: "22 stitches x 30 rows / 10 cm",
    yarnWeight: "DK",
    hookNeedle: "4 mm circular"
  },
  readingDirection: "alternating",
  verifiedChartText: "Row 42: repeat K3, SSK, P2, YO to end. Row 43: knit across. Sleeve shaping begins on row 50.",
  projectNotes: "Check sleeve length before row 50.",
  measurements: { targetLengthCm: 58, currentLengthCm: 41, fitFeeling: "Comfortable" }
};

const countContext = service.buildAssistantContext(project, 42, "Why is my stitch count wrong after this repeat?");
const countLabels = countContext.sections.map(section => section.label);
assert.deepEqual(countLabels.slice(0, 4), ["Project", "Craft", "Progress", "Current row"], "the prompt starts with core project and current progress");
assert.ok(countLabels.includes("Relevant setup"), "cast-on and expected count are available for count questions");
assert.ok(countLabels.includes("Nearby rows"), "nearby instructions are included when diagnosing a count problem");
assert.ok(countLabels.includes("Relevant pattern excerpt"), "the best matching verified pattern excerpt is included");
assert.ok(!countLabels.includes("Gauge and materials"), "unrelated gauge and yarn details are omitted from a row count question");
assert.ok(!countLabels.includes("Relevant project note"), "filler words do not pull unrelated project notes into the prompt");
assert.ok(countContext.sections.length <= 7, "question-aware context stays compact");

const gaugeContext = service.buildAssistantContext(project, 42, "My gauge is too large. Should I change needle or yarn?");
const gaugeLabels = gaugeContext.sections.map(section => section.label);
assert.ok(gaugeLabels.includes("Gauge and materials"), "gauge questions include yarn and tool context");
assert.ok(gaugeLabels.includes("Measurements"), "gauge and fit questions can include project measurements");
assert.ok(!gaugeLabels.includes("Nearby rows"), "row adjacency is omitted from an unrelated gauge question");

const symbolContext = service.buildAssistantContext(
  { ...project, currentSymbol: "SSK", selectedStitch: "Slip slip knit" },
  42,
  "What does this symbol mean?"
);
assert.ok(symbolContext.sections.some(section => section.label === "Selected symbol / stitch" && section.value.includes("SSK")), "symbol questions include the selected chart symbol");

const prompt = service.buildAssistantPrompt(countContext, countContext.question);
assert.match(prompt, /^You are helping me understand my knitting or crochet project in Yarncha\./, "the generated prompt identifies its purpose");
assert.match(prompt, /Project:\nSage Sunday Cardigan/, "the generated prompt is structured");
assert.match(prompt, /My question:\nWhy is my stitch count wrong after this repeat\?/, "the question is included verbatim");
assert.match(prompt, /Do not invent missing pattern information\./, "the prompt constrains unsupported answers");
assert.ok(prompt.length < 5000, "the generated prompt remains concise");

const copied = [];
const opened = [];
const result = await service.handoffToAI({
  provider: "claude",
  prompt,
  clipboard: { writeText: async text => copied.push(text) },
  openExternal: url => {
    opened.push(url);
    return true;
  }
});
assert.equal(result.copied, true, "the prompt is copied during handoff");
assert.equal(result.opened, true, "the chosen service is opened");
assert.deepEqual(copied, [prompt], "the exact previewed prompt is copied");
assert.deepEqual(opened, ["https://claude.ai/"], "handoff opens only the provider base URL");

const copyFailure = await service.handoffToAI({
  provider: "gemini",
  prompt,
  clipboard: { writeText: async () => { throw new Error("denied"); } },
  openExternal: () => true
});
assert.equal(copyFailure.copied, false, "clipboard failure is reported for the UI");
assert.equal(copyFailure.opened, true, "the provider can still open when copying fails");

await assert.rejects(
  service.handoffToAI({ provider: "unknown", prompt }),
  /Unknown AI provider/,
  "unknown providers cannot be opened"
);

const serviceSource = await readFile(new URL("../src/services/ai-handoff.js", import.meta.url), "utf8");
assert.doesNotMatch(serviceSource, /fetch\(|XMLHttpRequest|Authorization|api[_-]?key|supabase|\?q=/i, "the service contains no paid API integration or undocumented prompt URL");
console.log("AI handoff service tests passed");
