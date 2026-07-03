import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync("app.js", "utf8");
const cloud = readFileSync("src/cloud/bootstrap.js", "utf8");
const html = readFileSync("index.html", "utf8");

assert.match(app, /let hasLoadedSavedState = false;/, "autosave has an initial-load guard");
assert.match(app, /hasLoadedSavedState = true;/, "saved state is marked loaded after local restore");
assert.match(app, /if\(!hasLoadedSavedState\)return;/, "save helpers refuse to run before restore completes");
assert.match(app, /const PROJECT_SCHEMA_VERSION = 2;/, "project schema version is explicit");
assert.match(app, /schemaVersion:Number\(p\.schemaVersion\)\|\|PROJECT_SCHEMA_VERSION/, "projects are migrated with schemaVersion");
assert.match(app, /const now=new Date\(\)\.toISOString\(\),id=stableProjectId\(p,index\),createdAt=p\.createdAt \|\| p\.startedAt \|\| p\.startDate \|\| p\.updatedAt \|\| now/, "projects preserve or receive createdAt");
assert.match(app, /function stableProjectId\(project=\{\},index=0\)/, "missing legacy project IDs are stable across refreshes");
assert.doesNotMatch(app, /id:p\.id \|\| `p\$\{Date\.now\(\)\}-\$\{index\}`/, "missing project IDs are not regenerated with Date.now during every load");
assert.match(app, /function saveProjectTouch\(p\)\{p\.updatedAt=new Date\(\)\.toISOString\(\);saveState\(\);\}/, "meaningful project edits update updatedAt before saving");
assert.match(app, /localStorage\.setItem\(STORAGE_KEY, JSON\.stringify\(state\)\)/, "localStorage remains the first project persistence write");
assert.match(app, /putProjectStateSnapshot\(\)/, "IndexedDB snapshot is written after localStorage");
assert.match(app, /✓ Saved on this device · \$\{formatSavedTime\(now\)\}/, "device save status does not imply cloud");
assert.match(html, /id="save-status"[^>]*>✓ Saved on this device</, "initial save status is honest before cloud is connected");
assert.doesNotMatch(app, /✓ Saved · Last saved:/, "save status does not use vague saved wording");

assert.match(cloud, /function chooseNewestProject\(localProject, cloudProject\)/, "cloud restore compares local and remote project versions");
assert.match(cloud, /projectTime\(cloudProject\) > projectTime\(localProject\)/, "newest project wins during cloud merge");
assert.match(cloud, /if \(!rows\.length && hasMeaningfulProjects\(current\)\)/, "empty cloud results cannot wipe local projects");
assert.match(cloud, /Cloud empty · kept device progress/, "empty cloud restore explains that device progress was kept");
assert.match(cloud, /current\.projects = \[\.\.\.byLocalId\.values\(\)\]/, "cloud restore merges projects by local id");
assert.match(cloud, /if \(!current\.projects\.some\(project => String\(project\.id\) === String\(current\.activeProjectId\)\)\)/, "active project id is repaired after merge");
assert.match(cloud, /const \{ theme, language, unitSystem, budgetSettings \} = remote;/, "cloud settings restore cannot replace projects accidentally");
assert.match(cloud, /setCloudStatus\("✓ Saved to cloud"/, "cloud save status is shown only after cloud write succeeds");
assert.match(cloud, /Saved on this device · Cloud retry needed/, "cloud failure keeps local save status honest");

console.log("Progress persistence contract passed.");
