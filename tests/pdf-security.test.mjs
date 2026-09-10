import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import pdfjs from "pdfjs-dist/package.json" with { type: "json" };

const [major, minor, patch] = pdfjs.version.split(".").map(Number);
assert.ok(major > 6 || (major === 6 && (minor > 2 || (minor === 2 && patch >= 108))), `pdfjs-dist ${pdfjs.version} is on the fixed 6.2.108+ line`);
assert.match(pdfjs.engines.node, />=22\.13|>=24/, "the selected PDF.js Node requirement is explicit");

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const loader = await readFile(new URL("../src/document-tools-loader.js", import.meta.url), "utf8");
const main = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
assert.match(app, /file\.size>25\*1024\*1024/, "untrusted PDFs have a processing size bound");
assert.match(app, /getDocument\(\{data:[^}]+isEvalSupported:false/, "PDF JavaScript evaluation is disabled in extraction and OCR paths");
assert.match(app, /catch\(error\)\{toast\("The PDF was added, but its text could not be extracted\."\);return "";\}/, "malformed PDFs fail without crashing the application");
assert.match(loader, /documentToolsPromise[\s\S]*import\("\.\/document-tools\.js"\)/, "PDF/OCR tooling is loaded dynamically once");
assert.doesNotMatch(main, /import "\.\/document-tools\.js"/, "the dashboard entry does not eagerly import document tools");

console.log(`PDF security and lazy-loading contract passed on pdfjs-dist ${pdfjs.version}.`);
