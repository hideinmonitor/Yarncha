import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

const topbar = html.match(/<header class="topbar">([\s\S]*?)<\/header>/)?.[1] || "";
assert.doesNotMatch(topbar, /<button/, "the top bar is quiet and contains no global action buttons");
assert.match(topbar, /id="header-context"[\s\S]*id="breadcrumb"[\s\S]*id="save-status"/, "the top bar keeps only context and save status");

assert.equal((html.match(/id="new-project"/g) || []).length, 1, "one New project control serves each responsive layout");
assert.match(html, /sidebar-new-project[^>]*id="new-project"/, "New project lives in the navigation shell");
assert.doesNotMatch(html, /id="voice-top"/, "global voice was removed from the header");
assert.doesNotMatch(html, /id="quick-add-project"/, "the duplicate project plus was removed");

assert.match(html, /sidebar-foot[\s\S]*id="account-button"[\s\S]*data-view="settings"/, "account and settings live in the sidebar footer");
assert.match(html, /data-view="today" aria-current="page"/, "the initial current navigation destination is announced");
assert.match(app, /item\.setAttribute\("aria-current","page"\)/, "navigation updates the announced current destination");
assert.match(app, /state\.projects\.slice\(0,5\)/, "sidebar project shortcuts are intentionally limited to recent work");
assert.match(app, /function openMobileMoreMenu\(\)[\s\S]*Yarn Stash[\s\S]*Library[\s\S]*Appearance[\s\S]*Settings/, "mobile More exposes secondary navigation and preferences");
assert.match(css, /grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/, "mobile navigation has five coherent destinations");

assert.match(app, /project-actions"><button[^>]*id="edit-project-name"[^>]*>Edit project<\/button><\/div>/, "the project header keeps one contextual edit action");
assert.match(app, /id="speak-row"[^>]*>Read current row<\/button>[\s\S]*Voice row controls/, "speech and voice controls are scoped to the row counter");
assert.doesNotMatch(app, /id="edit-project-from-counter"/, "the duplicate Edit project counter action was removed");

assert.match(app, /id="settings-appearance"/, "appearance is a settings destination");
assert.match(app, /id="settings-phone-help"/, "phone access help moved into settings");
assert.match(app, /Voice row controls<\/strong><small>Allow hands-free row navigation inside an open project/, "voice preference copy matches its real scope");
assert.match(app, /refreshShell:renderSidebar/, "account state refreshes the shell after auth changes");

console.log("UI simplification contract passed.");
