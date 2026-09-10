import { declarations } from './helpers/css-contract.mjs';
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

assert.match(html, /id="new-project"[^>]*aria-label="Create new project"/, "the mobile New project entry keeps an accessible name");
assert.doesNotMatch(html, /id="mobile-menu"/, "the dead mobile menu was removed");
assert.match(app, /<label for="project-notes">Project notes<\/label>[\s\S]*id="project-notes"/, "project notes has a persistent label");
assert.match(app, /data-voice-project[^>]*>[\s\S]*Voice row controls/, "voice controls are visibly labelled in their project context");
assert.equal(declarations('.counter-context-actions button')['min-height'],'var(--button-height-sm)', 'Contextual actions use the shared touch target');
assert.equal(declarations('.subcounter-menu')['min-height'],'var(--button-height-sm)', 'Repeat menus use the shared touch target at every width');
assert.match(app, /focusable=\[\.\.\.backdrop\.querySelectorAll[\s\S]*event\.shiftKey[\s\S]*last\.focus\(\)/, "dialogs trap keyboard focus");
assert.match(app, /const firstFocus=content\.querySelector[\s\S]*firstFocus\?\.focus\(\{preventScroll:true\}\)/, "dialogs synchronously move focus inside with a frame fallback");
assert.match(app, /const target=modalLastFocus[\s\S]*if\(target\?\.isConnected\)target\.focus/, "dialogs synchronously restore focus to their opener with a frame fallback");
assert.match(css, /:focus-visible/, "keyboard focus has a visible style");
assert.match(html, /<nav class="nav-list" aria-label="Main navigation">/, "the primary navigation is labelled");
assert.match(html, /<main>/, "the page exposes a main landmark");

console.log("Mobile accessibility contract passed.");
