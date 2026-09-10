import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { BACKUP_LIMITS, assertBackupFileSize, validateBackupDocument } from "../src/security/backup-schema.js";

const stamp = "2026-09-09T01:02:03.000Z";
function validBackup() {
  return {
    app: "Yarncha",
    version: 3,
    kind: "full",
    exportedAt: stamp,
    storage: "local-first",
    state: {
      schemaVersion: 2,
      activeProjectId: "project-one",
      projects: [{ id: "project-one", name: "Safe project", color: "#718c72", row: 4, updatedAt: stamp, attachments: [{ id: "asset-one", name: "chart.png", type: "image/png", size: 4 }] }],
      librarySections: []
    },
    assets: {
      "asset-one": { name: "chart.png", type: "image/png", lastModified: 1, data: "data:image/png;base64,iVBORw==" }
    }
  };
}

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function rejected(mutator, description) {
  const fixture = clone(validBackup());
  mutator(fixture);
  assert.throws(() => validateBackupDocument(fixture, 4096), /Invalid Yarncha backup|Yarncha backups/, description);
}

const clean = validateBackupDocument(validBackup(), 4096);
assert.equal(clean.version, 3);
assert.notEqual(clean.state.projects[0].id, "project-one", "project IDs are always freshly assigned");
assert.notEqual(Object.keys(clean.assets)[0], "asset-one", "asset IDs are always freshly assigned");
assert.equal(clean.state.projects[0].attachments[0].id, Object.keys(clean.assets)[0], "asset references follow the fresh ID");

rejected(value => { value.state.projects[0].id = `bad\" onclick=\"alert(1)`; }, "quote-breaking IDs are rejected");
rejected(value => { value.state.projects[0].color = "red; background:url(https://evil.example)"; }, "CSS injection colors are rejected");
rejected(value => { value.state.projects[0].patternUrl = "javascript:alert(1)"; }, "script URLs are rejected");
rejected(value => { value.assets["asset-one"].data = "https://evil.example/tracker.png"; }, "external asset fetches are rejected");
rejected(value => { value.assets["asset-one"].data = "data:image/png;base64,not*base64"; }, "malformed data URLs are rejected");
rejected(value => { value.assets["asset-one"].type = "text/html"; value.assets["asset-one"].data = "data:text/html;base64,PHNjcmlwdD4="; }, "executable asset MIME types are rejected");
rejected(value => { value.state.projects[0].onclick = "alert(1)"; }, "event-handler-shaped unknown keys are rejected");
rejected(value => { value.unknown = true; }, "unknown top-level keys are rejected");
rejected(value => { value.state.projects = Array.from({ length: BACKUP_LIMITS.projects + 1 }, (_, index) => ({ id: `p${index}`, name: "x" })); }, "huge project arrays are rejected");
rejected(value => { value.state.projects[0].notes = "x".repeat(BACKUP_LIMITS.stringLength + 1); }, "huge strings are rejected");
rejected(value => { value.assets["asset-one"].name = "../chart.png"; }, "path-like filenames are rejected");

const polluted = JSON.parse(JSON.stringify(validBackup()).replace('"row":4', '"row":4,"__proto__":{"polluted":true}'));
assert.throws(() => validateBackupDocument(polluted, 4096), /unsafe key/);
assert.equal(Object.prototype.polluted, undefined, "prototype pollution never occurs");
assert.throws(() => assertBackupFileSize(BACKUP_LIMITS.fileBytes + 1), /must be between/, "oversized files are rejected before parsing");

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
assert.match(app, /assertBackupFileSize\(file\.size\)[\s\S]*validateBackupDocument\(JSON\.parse\(await file\.text\(\)\),file\.size\)/, "validation happens before backup storage");
assert.match(app, /function dataUrlToBlob[\s\S]*data:\(\[\^;,\]\+\);base64/, "asset restoration accepts only base64 data URLs");
const dataUrlBoundary = app.match(/function dataUrlToBlob\(dataUrl\)\{[\s\S]*?\n\}/)?.[0] || "";
assert.doesNotMatch(dataUrlBoundary, /fetch\(/, "asset restoration cannot make external fetches");
assert.match(app, /escapeHtml\(p\.name\)/, "project names are escaped at HTML boundaries");

console.log("Backup security contract passed.");
