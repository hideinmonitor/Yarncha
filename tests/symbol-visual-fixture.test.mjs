import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const fixture = await readFile(new URL("./fixtures/approved-symbol-render-matrix.svg", import.meta.url), "utf8");
const required = ["knit","purl","yarn-over","knit-twisted","decrease-right","decrease-left","decrease-centred","cable-right","cable-left","single-crochet","double-crochet","treble-crochet","shell","cluster","popcorn","y-stitch"];

assert.match(fixture, /viewBox="0 0 256 256"/, "visual matrix has a deterministic canvas");
for (const key of required) {
  assert.match(fixture, new RegExp(`id="fixture-${key}"[^>]+viewBox="0 0 64 64"`), `${key} has a deterministic rendered fixture`);
}
assert.equal((fixture.match(/<svg id="fixture-/g) || []).length, required.length, "fixture contains exactly the approved minimum set");
assert.doesNotMatch(fixture, /<image\b|<text\b|<foreignObject\b|data:image|base64|<filter\b/i, "fixture contains vector geometry only");

console.log(`Symbol visual fixture passed with ${required.length} rendered symbols.`);
