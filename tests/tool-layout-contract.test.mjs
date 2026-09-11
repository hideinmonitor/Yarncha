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
assert.match(app, /function toolCardHtml\(tool\)/, "all tools render through one shared card helper");
assert.match(app, /class="toolbox-card card" type="button" data-open-tool=/, "tool cards share one idle class list");
assert.match(app, /tools\.map\(toolCardHtml\)/, "every category uses the shared tool card helper");
assert.doesNotMatch(app, /toolbox-card card \$\{selected===tool\.id/, "the default Gauge card is not permanently marked active");
assert.doesNotMatch(css, /\.toolbox-card\.active/, "tool cards do not keep a stale selected outline");
assert.equal(declarations('.toolbox-card')['background'],'var(--surface)','idle tool cards share the surface token');
assert.equal(declarations('.toolbox-card')['border'],'1px solid var(--border)','idle tool cards share the same border');
assert.equal(declarations('.toolbox-card')['border-radius'],'var(--radius-card)','idle tool cards share the card radius');
assert.equal(declarations('.toolbox-card')['box-shadow'],'var(--shadow-soft)','idle tool cards share the same shadow');
assert.equal(declarations('.toolbox-card')['padding'],'var(--card-padding)','idle tool cards share the same padding');
assert.equal(declarations('.toolbox-card:focus-visible')['outline'],'3px solid var(--focus)','keyboard focus remains visible');

console.log("Tool layout contract passed.");
