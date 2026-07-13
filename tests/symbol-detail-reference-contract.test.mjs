import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import "../symbol-database.js";

const database=globalThis.YarnchaSymbolDatabase;
const purl=database.entries.find(entry=>entry.craft==="Knitting"&&entry.abbreviation==="P");
assert.deepEqual(purl.abbreviations,{usUk:"P",cn:"上 / 反",jp:"裏"});
assert.match(purl.howToRead,/wrong-side rows may reverse/);
assert.equal(purl.relatedTools.length,3);

const app=await readFile(new URL("../app.js",import.meta.url),"utf8");
const styles=await readFile(new URL("../styles.css",import.meta.url),"utf8");
assert.match(app,/symbol-abbreviation-chips/);
assert.match(app,/data-related-symbol/);
assert.match(app,/<details class="symbol-reference-notes">/);
assert.doesNotMatch(app.slice(app.indexOf('if(currentSymbolId)'),app.indexOf('let entries=')),/<h3>Language Names<\/h3>|<h3>Sources & Variations<\/h3>|<h3>Verification<\/h3>/);
assert.match(styles,/@media \(max-width:600px\)[\s\S]*\.symbol-abbreviation-chips/);
console.log("Symbol detail reference contract passed.");
