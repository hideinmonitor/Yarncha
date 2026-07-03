import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");

assert.match(source, /function buildSetupFromLegacyProjectFields\b/, "legacy project fields migrate into shared setup");
assert.match(source, /function projectSetupPanelHtml\b/, "ProjectSetupPanel component exists");
assert.match(source, /function flowProjectSetupSummaryHtml\b/, "Flow Mode has shared setup access");
assert.match(source, /data-project-setup-form="flow"/, "Flow Mode edits the shared setup panel");
assert.match(source, /data-project-setup-form="\$\{escapeHtml\(context\)\}"/, "Project setup panel is reusable across contexts");
assert.match(source, /craftType:value\("craftType"\)/, "shared setup stores craft type");
assert.match(source, /bodyMeasurementCm:value\("bodyMeasurementCm"\)/, "fit check inputs are part of shared setup");
assert.match(source, /applySharedProjectSetup\(p,collectProjectSetupPanel\(form\)\)/, "shared setup form saves through one update path");
assert.match(source, /p\.setup=setup;\s*p\.projectSetup=setup;/, "project.setup and legacy projectSetup stay mirrored");
assert.match(source, /Your setup is shared across this project, Flow Mode, and project tools\./, "single shared setup explanation is used");
assert.doesNotMatch(source, /class="studio-tabs"/, "duplicate Rendering Studio Grid/Stripe/Pooling tabs are not rendered");
assert.doesNotMatch(source, /These details are used by Flow Mode and project tools/, "old duplicated setup explanation is removed");
assert.doesNotMatch(source, /Saved project settings/, "old read-only saved settings card label is removed");

console.log("Shared project setup contract passed.");
