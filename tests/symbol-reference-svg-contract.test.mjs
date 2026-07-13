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

assert.doesNotMatch(app, /const symbolDrawings=/, "the duplicate primitive registry is not reintroduced");
for (const entry of globalThis.YarnchaSymbolDatabase.entries.filter(entry => ["verified", "commonNotUniversal"].includes(entry.symbolStatus))) {
  const key = entry.svgKey || entry.symbolType;
  assert.ok(registry[key], `${entry.id} resolves to a real SVG instead of Check key`);
}
for (const reference of Object.values(references)) {
  assert.equal(reference.symbolKey, reference.tracedSvgKey, `${reference.symbolKey} maps directly to its traced SVG`);
  assert.ok(registry[reference.tracedSvgKey], `${reference.symbolKey} has traced geometry`);
  assert.ok(reference.page > 0, `${reference.symbolKey} records a one-based source page`);
}
for (const [key, markup] of Object.entries(registry)) {
  assert.doesNotMatch(markup, /<image\b|data:image|base64/i, `${key} contains no raster image`);
  assert.doesNotMatch(markup, /<text\b|mycrochet|logo|branding/i, `${key} contains no embedded text or branding`);
  assert.match(markup, /^<(?:path|line|circle|ellipse|rect)/, `${key} contains SVG geometry`);
}
assert.match(app, /viewBox="0 0 64 64"/, "all symbols render through the shared viewBox");
assert.match(app, /function symbolVisualHtml[\s\S]*neutralSymbolHtml/, "unapproved entries retain neutral fallback behavior");

const count = (value, pattern) => (value.match(pattern) || []).length;
assert.equal(count(registry["cable-left-wide"], /M(?:8|20) 52/g), 2, "2/2 left cable contains two left-crossing strands");
assert.equal(count(registry["cable-right-wide"], /M(?:8|20) 12/g), 2, "2/2 right cable contains two right-crossing strands");
assert.equal(count(registry["cable-left-3-3"], /M(?:4|14|24) 54/g), 3, "3/3 left cable contains three left-crossing strands");
assert.equal(count(registry["cable-right-3-3"], /M(?:4|14|24) 10/g), 3, "3/3 right cable contains three right-crossing strands");
assert.equal(count(registry["cable-left-4-4"], /M(?:2|12|22|32) 56/g), 4, "4/4 left cable contains four left-crossing strands");
assert.equal(count(registry["cable-right-4-4"], /M(?:2|12|22|32) 8/g), 4, "4/4 right cable contains four right-crossing strands");

assert.equal(count(registry.shell, /M32 54/g), 5, "shell has five stitches");
assert.equal(count(registry.popcorn, /M32 52/g), 5, "popcorn has five stitches");
assert.equal(count(registry.cluster, /M(?:16|32|48) 52/g), 3, "cluster has three joined stitches");
assert.match(registry["y-stitch"], /M32 56V32M32 32 15 12M32 32 49 12/, "Y stitch has one stem and two branches");
assert.equal(count(registry.picot, /<ellipse/g), 3, "picot has three chain loops");

assert.match(css, /\.symbol-card-open[^}]+grid-template-columns:64px minmax\(0,1fr\)/, "mobile symbol cards use a fixed mark and shrink-safe content column");
assert.match(css, /\.symbol-card-mark[^}]+width:64px[^}]+height:64px/, "mobile symbol marks remain bounded");
assert.match(app, /symbolVisualHtml\(entry,"detail"\)/, "detail pages use the same verified renderer");

console.log(`Symbol reference SVG contract passed with ${Object.keys(references).length} traced references.`);
