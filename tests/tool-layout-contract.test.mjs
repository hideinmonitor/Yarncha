import { declarations } from './helpers/css-contract.mjs';
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync("styles.css", "utf8");
const app = readFileSync("app.js", "utf8");

assert.match(app, /id="project-tool-content"/, "Tool content uses the shared project-tool-content container");
assert.match(app, /<div class="result-box" id="project-tool-result">/, "Tool results render through a shared result box");
assert.equal(declarations('#project-tool-content')['max-width'],'none','Tools use the available width');
assert.equal(declarations('#project-tool-content .toolkit-tool')['grid-template-columns'],'minmax(0,1fr)','Tool content keeps a full-width flow');
assert.equal(declarations('#project-tool-content .result-box')['grid-column'],'1/-1','Tool results span the content grid');
assert.doesNotMatch(css, /\.tools-detail-content \.result-box \{[^}]*grid-column:2;/, "Tool result boxes are not pinned to a right-side column");
assert.doesNotMatch(css, /\.tools-detail-content \.toolkit-tool \{[^}]*grid-template-columns:minmax\(0,1fr\) minmax\(300px,[^}]+;/, "Tool inputs and results no longer use the old narrow right-column layout");

console.log("Tool layout contract passed.");
