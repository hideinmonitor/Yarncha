import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";
import "../symbol-database.js";
import "../src/data/symbolReferenceMap.js";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const registryStart = app.indexOf("const symbolSvgPaths={");
const registryEnd = app.indexOf("\n};", registryStart) + 3;
assert.ok(registryStart >= 0 && registryEnd > registryStart, "symbolSvgPaths registry is present");
const context = {};
vm.createContext(context);
vm.runInContext(app.slice(registryStart, registryEnd).replace("const symbolSvgPaths=", "registry="), context);
const registry = context.registry;
const references = globalThis.YarnchaSymbolReferenceMap;
const databaseEntries = globalThis.YarnchaSymbolDatabase.entries;

assert.doesNotMatch(app, /const symbolDrawings=/, "the duplicate primitive registry is not reintroduced");
for (const entry of globalThis.YarnchaSymbolDatabase.entries.filter(entry => ["verified", "commonNotUniversal"].includes(entry.symbolStatus))) {
  const key = entry.svgKey || entry.symbolType;
  assert.ok(registry[key], `${entry.id} resolves to a real SVG instead of Check key`);
}
for (const reference of Object.values(references)) {
  assert.ok(registry[reference.tracedSvgKey], `${reference.symbolKey} has traced geometry`);
  assert.ok(reference.page > 0, `${reference.symbolKey} records a one-based source page`);
  assert.equal(reference.document, "Untitled (Draft).pdf", `${reference.symbolKey} names the primary reference`);
  assert.ok(["High", "Medium", "Low"].includes(reference.confidence), `${reference.symbolKey} records confidence`);
}
for (const reference of Object.values(references)) {
  const matchingEntries = databaseEntries.filter(entry => (entry.svgKey || entry.symbolType) === reference.tracedSvgKey);
  for (const entry of matchingEntries) {
    assert.notEqual(entry.symbolStatus, "needsReview", `${entry.id} uses its approved reference SVG instead of Check key`);
  }
}
for (const [key, markup] of Object.entries(registry)) {
  assert.doesNotMatch(markup, /<image\b|data:image|base64/i, `${key} contains no raster image`);
  assert.doesNotMatch(markup, /<text\b|mycrochet|logo|branding/i, `${key} contains no embedded text or branding`);
  assert.match(markup, /^<(?:path|line|polyline|circle|ellipse)/, `${key} contains approved SVG geometry`);
  assert.doesNotMatch(markup, /<(?:rect|polygon|image|text|use|filter)\b/i, `${key} uses only approved SVG primitives`);
}
assert.match(app, /viewBox="0 0 64 64"/, "all symbols render through the shared viewBox");
assert.match(app, /function symbolVisualHtml[\s\S]*neutralSymbolHtml/, "unapproved entries retain neutral fallback behavior");
assert.equal(references["v-stitch"].tracedSvgKey, "double-crochet-increase", "V stitch reuses its equivalent two-double-crochet geometry");
assert.equal(registry["v-stitch"], undefined, "the duplicate V-stitch registry entry is removed");
assert.equal(registry["crochet-chain"], undefined, "the duplicate crochet chain alias is removed");
assert.equal(registry["crochet-slip"], undefined, "the duplicate crochet slip alias is removed");
assert.equal(registry["crochet-sc"], undefined, "the duplicate crochet SC alias is removed");

assert.equal(registry.knit, '<path d="M10 32h44"></path>', "knit uses the reference horizontal mark");
assert.equal(registry.purl, '<path d="M32 10v44"></path>', "purl uses the reference vertical mark");
assert.match(registry["front-loop"], /M10 25c11 22/, "front-loop-only uses the reference lower bowl");
assert.match(registry["back-loop"], /M10 39c11-22/, "back-loop-only uses the reference upper arch");

const count = (value, pattern) => (value.match(pattern) || []).length;
for (const key of ["cable-left","cable-right","cable-left-wide","cable-right-wide","cable-left-3-3","cable-right-3-3","cable-left-4-4","cable-right-4-4","cable-left-purl","cable-right-purl"]) {
  assert.equal(count(registry[key], /class="symbol-svg-under"/g), 1, `${key} has one explicit under-strand knockout`);
}
assert.notEqual(registry["cable-left"], registry["cable-right"], "1/1 cable directions remain distinct");
assert.notEqual(registry["cable-left-wide"], registry["cable-right-wide"], "2/2 cable directions remain distinct");
assert.notEqual(registry["cable-left-3-3"], registry["cable-right-3-3"], "3/3 cable directions remain distinct");
assert.notEqual(registry["cable-left-4-4"], registry["cable-right-4-4"], "4/4 cable directions remain distinct");
assert.equal(count(registry["cable-left-wide"], /M(?:8|20) 52/g), 4, "2/2 left cable contains two visible left-crossing strands plus their knockout pass");
assert.equal(count(registry["cable-left-3-3"], /M(?:4|14|24) 54/g), 6, "3/3 left cable contains three visible left-crossing strands plus their knockout pass");
assert.equal(count(registry["cable-left-4-4"], /M(?:2|12|22|32) 56/g), 8, "4/4 left cable contains four visible left-crossing strands plus their knockout pass");

assert.equal(count(registry["knit-twisted"], /<ellipse/g), 1, "twisted knit has one enclosed stitch loop");
assert.match(registry["knit-twisted"], /M32 42c-5 8[^<]+M32 42c5 8/, "twisted knit has two balanced lower tails");
assert.equal(count(registry["purl-twisted"], /<ellipse/g), 1, "twisted purl has one enclosed stitch loop");
assert.match(registry["purl-twisted"], /M19 54h26/, "twisted purl retains the reference purl bar");
assert.match(registry["increase-left"], /M48 52V14M48 34 16 14/, "left increase anchors on the right and leans left");
assert.match(registry["increase-right"], /M16 52V14M16 34 48 14/, "right increase anchors on the left and leans right");

assert.equal(count(registry.shell, /M32 54/g), 5, "shell has five stitches");
assert.equal(count(registry.popcorn, /M32 52/g), 5, "popcorn has five stitches");
assert.equal(count(registry.cluster, /M(?:16|32|48) 52/g), 3, "cluster has three joined stitches");
assert.match(registry["y-stitch"], /M32 56V32M32 32 15 12M32 32 49 12/, "Y stitch has one stem and two branches");
assert.equal(count(registry.picot, /<ellipse/g), 1, "picot has the reference top chain loop");
assert.match(registry.picot, /M22 18c-10 4[^<]+M42 18c10 4/, "picot has two symmetrical dog-tooth side loops");

assert.match(css, /\.symbol-card-open[^}]+grid-template-columns:64px minmax\(0,1fr\)/, "mobile symbol cards use a fixed mark and shrink-safe content column");
assert.match(css, /\.symbol-card-mark[^}]+width:64px[^}]+height:64px/, "mobile symbol marks remain bounded");
assert.match(app, /symbolVisualHtml\(entry,"detail"\)/, "detail pages use the same verified renderer");

console.log(`Symbol reference SVG contract passed with ${Object.keys(references).length} traced references.`);
