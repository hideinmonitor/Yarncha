import assert from "node:assert/strict";
import "../symbol-database.js";

const database=globalThis.YarnchaSymbolDatabase;
const audit=database.audit();

assert.equal(audit.missingSymbolType.length,0,"every entry has a symbolType and visual symbol");
assert.equal(audit.craftMismatchWarnings.length,0,"no knitting/crochet icon families are crossed");
assert.equal(audit.duplicateSymbolWarnings.length,0,"no unrelated stitches reuse a confirmed SVG symbol");
assert.equal(audit.intentionalSharedSymbols.length,1,"the CYC puff/bobble family glyph is documented as an intentional shared symbol");
assert.ok(audit.needsReview.length>0,"uncertain entries remain explicitly review-only");

console.log("Yarncha Symbol Database Audit");
console.table([{
  totalEntries:audit.totalEntries,
  missingSymbols:audit.missingSymbolType.length,
  needsReview:audit.needsReview.length,
  duplicateAbbreviations:audit.duplicateAbbreviations.length,
  duplicateSymbolWarnings:audit.duplicateSymbolWarnings.length,
  craftMismatches:audit.craftMismatchWarnings.length
}]);
if(audit.duplicateAbbreviations.length)console.table(audit.duplicateAbbreviations.map(item=>({abbreviation:item.abbreviation,entries:item.entries.map(entry=>`${entry.craft}: ${entry.name}`).join(" | ")})));
