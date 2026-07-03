import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync("styles.css", "utf8");
const app = readFileSync("app.js", "utf8");

assert.match(app, /id="project-tool-content"/, "Tool content uses the shared project-tool-content container");
assert.match(app, /<div class="result-box" id="project-tool-result">/, "Tool results render through a shared result box");
assert.match(css, /\.tools-detail-content,#project-tool-content \{ width:100%; max-width:none; min-width:0; \}/, "Tool content containers can fill the available page width");
assert.match(css, /\.tools-detail-content \.toolkit-tool,#project-tool-content \.toolkit-tool \{ width:100%; display:grid; grid-template-columns:minmax\(0,1fr\);/, "Tool pages use one full-width flow instead of a side-by-side result column");
assert.match(css, /\.tools-detail-content \.result-box,#project-tool-content \.result-box \{ width:100%; grid-column:1\/-1; grid-row:auto; margin:0; min-height:220px;/, "Tool result boxes span the full tool content width with useful presence");
assert.doesNotMatch(css, /\.tools-detail-content \.result-box \{[^}]*grid-column:2;/, "Tool result boxes are not pinned to a right-side column");
assert.doesNotMatch(css, /\.tools-detail-content \.toolkit-tool \{[^}]*grid-template-columns:minmax\(0,1fr\) minmax\(300px,[^}]+;/, "Tool inputs and results no longer use the old narrow right-column layout");

console.log("Tool layout contract passed.");
