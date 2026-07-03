import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

for (const helper of [
  "normalizeRowReminderVoice",
  "normalizeRowReminder",
  "rowReminderMatches",
  "dueRowReminders",
  "triggerRowReminders",
  "readRowReminderAloud",
  "activeRowReminderHtml",
  "rowRemindersPanelHtml",
  "openRowReminderModal"
]) {
  assert.match(app, new RegExp(`function ${helper}\\b`), `${helper} is implemented`);
}

assert.match(app, /rowReminders:\(p\.rowReminders \|\| \[\]\)\.map\(normalizeRowReminder\)/, "project state hydrates row reminders");
assert.match(app, /rowReminderVoice:normalizeRowReminderVoice\(p\.rowReminderVoice\)/, "project state hydrates voice settings");
assert.match(app, /rowReminders:\[\],rowReminderVoice:\{speed:1,language:"en",volume:1\}/, "new projects start with reminder defaults");
assert.match(app, /\(row-r\.startRow\)%r\.every===0/, "reminders use the requested interval trigger formula");
assert.match(app, /r\.lastTriggeredRow===row\)return false/, "reminders do not fire repeatedly on the same row");
assert.match(app, /triggerRowReminders\(p,next\)/, "main row tracker checks reminders when rows change");
assert.match(app, /navigator\.vibrate/, "mobile vibration feedback is attempted when available");
assert.match(app, /SpeechSynthesisUtterance/, "voice reminders use browser speech synthesis");
assert.match(app, /utterance\.rate/, "voice speed is applied");
assert.match(app, /utterance\.lang/, "voice language is applied");
assert.match(app, /utterance\.volume/, "voice volume is applied");
assert.doesNotMatch(app, /row-reminder-language/, "reminder UI does not expose its own language selector");
assert.doesNotMatch(app, /Every 2 rows: Remember to increase\./, "example reminder chips are not shown in the default panel");
assert.match(app, /row-reminder-more/, "Edit and Delete live in the reminder overflow menu");

for (const copy of [
  "Row Reminders",
  "Reminder name",
  "Trigger every X rows/rounds",
  "Start row/round",
  "End row/round optional",
  "Custom reminder message",
  "Voice reminder on",
  "Visual notification on",
  "Repeat enabled",
  "Snooze until next row",
  "Done",
  "Test voice",
  "Pause",
  "Edit",
  "Delete"
]) {
  assert.ok(app.includes(copy), `${copy} is visible in the reminder UI`);
}

for (const selector of [
  ".row-reminder-banner",
  ".row-reminders-card",
  ".row-reminder-card",
  ".row-reminder-voice-settings",
  ".overflow-menu"
]) {
  assert.ok(styles.includes(selector), `${selector} is styled`);
}

assert.match(styles, /@media \(max-width:760px\)[\s\S]*\.row-reminder-card \{ grid-template-columns:1fr; \}/, "row reminders stack on phones");

console.log("Row reminders contract passed.");
