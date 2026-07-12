import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

for (const helper of [
  "normalizeSubCounter",
  "subCounterTicksAt",
  "subCounterLinkedCount",
  "subCounterVoiceDue",
  "syncSubCounterToMainRow",
  "subCounterRowsUntilNext",
  "repeatCounterSummary",
  "unifiedRepeatCountersHtml",
  "chartSubCountersHtml",
  "openSubCounterModal",
  "openSubCounterActionsModal",
  "openSubCounterRenameModal"
]) {
  assert.match(app, new RegExp(`function ${helper}\\b`), `${helper} is implemented`);
}

assert.match(app, /\$\{unifiedRepeatCountersHtml\(p,\{chart:true\}\)\}[\s\S]*<div class="annotation-toolbar-shell/, "Chart sub counters render inside the unified counter before annotation tools");
assert.match(app, /\$\{unifiedRepeatCountersHtml\(p\)\}/, "Project tracker uses the same unified counter card");
assert.match(app, /Repeat \/ Sub-Counter/, "Unified repeat section label is present");
assert.match(app, /No repeat counter yet/, "Empty unified counter state is present");
assert.match(app, /Counter name/, "Counter settings include name");
assert.match(app, /Sub-counter starts at/, "Counter settings include an explicit starting value");
assert.match(app, /Increment step/, "Counter settings include increment step");
assert.match(app, /Optional stop condition/, "Repeat settings include an optional stop condition");
assert.match(app, /Optional colour tag/, "Sub-counter settings include an optional colour tag");
assert.match(app, /First trigger row \/ round/, "Repeat settings include the inclusive first trigger anchor");
assert.match(app, /Link to Main Row Counter/, "Counter settings include main-row link");
assert.match(app, /Update every X rows/, "Counter settings include repeat interval");
assert.match(app, /Speak reminder every X rows/, "Counter settings include voice reminder interval");
assert.match(app, /Voice reminder message/, "Counter settings include voice reminder message");
assert.match(app, /Manual \+ \/ - sets a new sync point/, "Manual override explains the new sync baseline");
assert.match(app, /syncSubCounterToMainRow\(counter,oldRow,next\)/, "Main row changes synchronize sub counters");
assert.match(app, /newRow<=oldRow\)return null/, "Voice reminders do not trigger when reversing rows");
assert.match(app, /values\.syncRow=Number\(getProject\(\)\.row\)\|\|0/, "Saving settings creates a sync row baseline");
assert.match(app, /normalized\.syncRow=Number\(p\.row\)\|\|0/, "Manual +/- creates a new sync row baseline");
const moreMenuSource = app.slice(app.indexOf("function openSubCounterActionsModal"), app.indexOf("function openSubCounterRenameModal"));
assert.match(moreMenuSource, /counter-delete-action/, "Delete lives in the More actions modal");
assert.match(moreMenuSource, /repeatPreviewHtml\(normalized,p\.row\)/, "Technical trigger preview is hidden inside More");
assert.match(moreMenuSource, /counter-more-details/, "Advanced repeat details are hidden inside More");
assert.doesNotMatch(app, /data-delete-sub/, "Delete is not exposed as a standalone counter-row button");
assert.doesNotMatch(app, /data-edit-sub/, "Edit is not exposed as a standalone counter-row button");
assert.match(moreMenuSource, /counter-edit-action/, "Edit settings remain available inside the More actions modal");
assert.match(app, /assistantSubCounterSummary/, "Assistant can summarize sub row counters");
assert.match(app, /subCounters:this\.getSubCounterContext\(project\)/, "Assistant context includes sub counters");

const subCounterSource = app.slice(app.indexOf("function subCounterHtml"), app.indexOf("function unifiedRepeatCountersHtml"));
assert.match(subCounterSource, /repeatCounterSummary\(s,currentRow\)/, "Default sub-counter card shows the compact summary");
assert.doesNotMatch(subCounterSource, /repeatPreviewHtml/, "Default sub-counter card does not show technical trigger preview");
assert.doesNotMatch(subCounterSource, /Local triggers/, "Default sub-counter card hides local trigger blocks");
assert.doesNotMatch(subCounterSource, /Project rows/, "Default sub-counter card hides project trigger blocks");
assert.doesNotMatch(subCounterSource, /Next trigger/, "Default sub-counter card hides next trigger text");

for (const selector of [
  ".unified-counter-heading",
  ".unified-repeat-section",
  ".unified-repeat-list",
  ".sub-row-counter-card",
  ".counter-title-line",
  ".counter-more-details"
]) {
  assert.ok(styles.includes(selector), `${selector} is styled`);
}

assert.match(styles, /@media \(max-width:760px\)[\s\S]*\.sub-row-counter-card \{ grid-template-columns:1fr; \}/, "Sub counter cards stack on mobile");
assert.match(styles, /@media \(max-width:760px\)[\s\S]*\.unified-repeat-list \.repeat-counter-actions button \{ width:100%;/, "Unified repeat actions stay tappable on mobile");

console.log("Chart sub counters contract passed.");
