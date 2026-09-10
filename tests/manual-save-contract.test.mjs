import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

assert.match(app, /function saveState\(\)/, "auto-save remains available");
assert.match(app, /function saveStateSoon\(delay=350\)/, "debounced auto-save remains available");
assert.match(app, /function manualSave\(context="Project"\)/, "manual save action exists");
assert.match(app, /window\.YarnchaCloud\.syncNow\("manual-save"\)/, "manual save triggers immediate cloud sync when available");
assert.match(app, /Everything is already saved\./, "manual save reports when nothing changed");
assert.match(app, /• Unsaved changes/, "unsaved changes indicator exists");
assert.match(app, /data-save-indicator/, "inline save status chips are rendered");
assert.match(app, /ensureSafeToLeave/, "internal navigation waits for pending auto-save");
assert.match(app, /beforeunload/, "browser leave is guarded while saving");
assert.match(app, /event\.preventDefault\(\);\s*manualSave\("Workspace"\)/s, "Cmd/Ctrl+S runs manual save");

for (const surface of ["Flow Mode", "Symbol Database"]) {
  assert.match(app, new RegExp(`data-manual-save="${surface}"`), `${surface} has a manual save control`);
}

for (const removedSurface of ["Project", "Project notes", "Chart", "Settings"]) {
  assert.doesNotMatch(app, new RegExp(`data-manual-save="${removedSurface}"`), `${removedSurface} relies on autosave instead of a duplicate Save button`);
}
assert.doesNotMatch(html, /data-manual-save="Workspace"/, "the top header does not duplicate autosave with a global Save button");
assert.match(html, /class="save-status" id="save-status" aria-live="polite"/, "the header retains truthful save and sync status");
assert.match(css, /\.manual-save-button/, "manual save button is styled");
assert.match(css, /\.manual-save-status\[data-tone="unsaved"\]/, "unsaved status has a distinct style");
assert.match(css, /@media \(max-width:430px\)[\s\S]*\.manual-save-button/, "manual save is compact on mobile");

console.log("Manual save contract passed.");
