import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app=await readFile(new URL("../app.js",import.meta.url),"utf8");
const css=await readFile(new URL("../styles.css",import.meta.url),"utf8");

assert.match(app,/function libraryPageHeroHtml/,"Library pages share one page hero");
assert.match(app,/function libraryCategoryCardHtml/,"Library category cards share one renderer");
assert.match(app,/getElementById\("library-back"\)\?\.addEventListener/,"detail pages do not abort Library bindings when the outer back button is omitted");
assert.match(app,/knowledge-hub-groups/,"Theory hub uses grouped knowledge navigation");
assert.match(app,/\["Beginner","Intermediate","Advanced"\]/,"learning paths are grouped by level");
assert.doesNotMatch(app,/wiki-hero card[^`]*<h2>Theory & Foundation/,"Theory view does not repeat its page heading in a card");
assert.match(app,/class="wiki-detail"/,"article detail uses a natural page container");
assert.doesNotMatch(app,/class="wiki-detail card"/,"article detail is not wrapped in a generic card");
assert.match(app,/class="wiki-more-actions"/,"low-priority article actions use an overflow menu");
assert.match(app,/Problem[\s\S]*Diagnosis[\s\S]*Resolution[\s\S]*Prevention/,"troubleshooting follows the required diagnostic hierarchy");
assert.match(app,/libraryWikiFilters\.search=event\.target\.value;libraryWikiFilters\.path="All"/,"manual search clears hidden curated-path filtering");
assert.match(css,/#library-view \.wiki-detail-grid section[\s\S]*border-top:1px solid var\(--border\)/,"article sections use separators instead of nested cards");
assert.match(css,/#library-view \.library-category-card h2[\s\S]*font-family:var\(--font-ui\)/,"interactive Library titles use the UI font");
assert.match(css,/@media \(max-width:760px\)[\s\S]*#library-view \.knowledge-hub-groups/,"Library knowledge navigation has a mobile layout");

console.log("Library experience contract passed.");
