import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../app.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const cloud = await readFile(new URL("../src/cloud/bootstrap.js", import.meta.url), "utf8");

assert.match(source, /function escapeHtml\(value = ""\) \{ return String\(value \?\? ""\)\.replace/, "HTML escaping accepts numeric setup values without crashing project navigation");

for (const service of [
  "chartImageService",
  "gridDetectionService",
  "symbolRecognitionService",
  "chartReasoningService",
  "userLearningService"
]) {
  assert.match(source, new RegExp(`const ${service}=`), `${service} is implemented`);
}

assert.match(source, /function normalizeChartReaderConfig/, "projects have Flow Mode reader state");
assert.match(source, /function normalizePatternSource/, "projects store scanned pattern source state");
assert.match(source, /patternSource:normalizePatternSource/, "project normalization includes pattern source");
for (const field of ["originalFileBlobId","extractedText","ocrConfidence","ocrStatus","selectedPages","userCorrectedText","workspaceMode"]) {
  assert.match(source, new RegExp(field), `pattern source stores ${field}`);
}
assert.match(source, /function normalizeProjectSetup/, "projects have shared Flow Mode setup state");
assert.match(source, /function calculateFlowProjectPlan/, "Flow Mode calculates project planning values");
for (const field of ["patternGauge","patternToolSize","patternYarnWeight","userToolSize","userYarnWeight","projectType","itemDetails","desiredSize","bodyMeasurements","patternLanguage"]) {
  assert.match(source, new RegExp(`${field}`), `project setup stores ${field}`);
}
assert.match(source, /chartType:\["Knitting","Crochet","Tunisian Crochet","Unknown"\]/, "chart type supports knitting, crochet, Tunisian, and unknown");
assert.match(source, /rowDirection:\["right-to-left","left-to-right","alternating-rs-ws","round"\]/, "row direction supports chart reading modes");
assert.match(source, /readingDirection:\["right-to-left","left-to-right","alternating-rs-ws","round","auto"\]/, "recognition direction supports all MVP modes");
assert.match(source, /<h3>Flow Mode<\/h3>/, "Flow Mode has the calm user-facing title");
assert.match(source, /Let Yarncha help you follow your pattern one row at a time\./, "Flow Mode subtitle is craft-friendly");
assert.match(source, /Yarncha looks at your chart and helps you keep track of your place\./, "Flow Mode explains the feature without technical wording");
assert.match(source, /Your chart is ready\./, "Flow Mode shows a simple ready state");
assert.match(source, /You're almost ready\./, "Flow Mode shows a simple review state");
assert.match(source, /Reading Progress/, "Flow Mode includes Reading Progress");
assert.match(source, /Project Setup/, "Flow Mode includes Project Setup before reading");
assert.doesNotMatch(source, /Chart sync|Highlighting row \$\{p\.row\} of \$\{p\.chartRows\}/, "Flow Mode no longer renders a separate Chart sync card");
assert.match(source, /Pattern Language/, "Flow Mode exposes pattern language preference");
assert.match(source, /Abbreviations/, "Pattern language supports abbreviations");
assert.match(source, /Full wording/, "Pattern language supports full wording");
assert.match(source, /Pattern gauge/, "Project Setup collects pattern gauge");
assert.match(source, /Pattern hook \/ needle size/, "Project Setup collects pattern tool size");
assert.match(source, /Pattern yarn weight/, "Project Setup collects pattern yarn weight");
assert.match(source, /Your hook \/ needle size/, "Project Setup collects user tool size");
assert.match(source, /Your yarn weight/, "Project Setup collects user yarn weight");
assert.match(source, /Project type/, "Project Setup asks project type before measurements");
assert.match(source, /Desired garment size/, "Project Setup collects desired size");
assert.match(source, /Chest \/ bust cm/, "Project Setup supports body measurements");
assert.match(source, /isGarmentProject/, "garment measurements are scoped to garment project types");
for (const label of ["Scarf","Socks","Hat / Beanie","Shawl","Bag","Blanket","Amigurumi","Top","Cardigan","Jumper / Sweater","Vest","Dress"]) {
  assert.match(source, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `Project Setup supports ${label}`);
}
for (const id of ["flow-scarf-style","flow-sock-type","flow-sock-sizing-mode","flow-bag-type","flow-blanket-type","flow-amigurumi-type","flow-shawl-shape"]) {
  assert.match(source, new RegExp(id), `${id} field is available`);
}
assert.match(source, /For babies, embroidered eyes are safer than plastic safety eyes\./, "amigurumi baby safety warning is present");
assert.match(source, /Recommended size:/, "blanket presets guide beginners");
assert.match(source, /readFlowSetupDetails/, "type-specific setup values are saved");
assert.match(source, /p\.projectKind=setup\.projectType/, "project type mirrors to the project");
assert.match(source, /These details are used by Flow Mode and project tools/, "Project section reuses the shared setup");
assert.match(source, /Using your saved setup:/, "Tools section shows the shared setup context");
assert.match(source, /Your .* is .* than the pattern/, "Flow Mode warns about tool mismatch");
assert.match(source, /Your yarn is .* than the pattern yarn/, "Flow Mode warns about yarn mismatch");
for (const label of ["Cast-on","Starting chain","Stitch count","Row count","Width","Length","Sleeve length","Body length","Shaping","Yarn"]) {
  assert.match(source, new RegExp(label), `Flow Mode shows ${label}`);
}
for (const field of ["flow-setup-stitch-count","flow-setup-row-count","flow-setup-width","flow-setup-length","flow-setup-sleeve-length","flow-setup-body-length","flow-setup-yarn-estimate"]) {
  assert.match(source, new RegExp(field), `Project Setup has editable ${field}`);
}
assert.match(source, /p\.setup=simpleSetup/, "Flow Mode saves the requested simple project.setup structure");
assert.match(source, /stitchCount:value\("flow-setup-stitch-count"\)/, "project.setup stores stitch count");
assert.match(source, /rowCount:value\("flow-setup-row-count"\)/, "project.setup stores row count");
assert.match(source, /Saved · Last saved on this device/, "Project Setup shows saved state");
assert.match(source, /Unsaved changes/, "Project Setup shows unsaved state");
assert.match(source, /markFlowSetupUnsaved/, "Project Setup marks edits before saving");
assert.match(source, /function resultSummaryHtml/, "calculation results use a reusable result summary renderer");
assert.match(source, /Project Setup Summary/, "Flow Mode labels the calculation summary clearly");
assert.match(source, /result-summary-row/, "result summary renders separated rows");
assert.match(source, /p\.projectCalculations=calculateFlowProjectPlan/, "calculated values are stored on the project");
assert.match(source, /p\.projectSetup=setup/, "setup values are stored on the project");
assert.match(source, /p\.gauge=setup\.patternGauge/, "setup gauge mirrors to project gauge");
assert.match(source, /p\.needles=setup\.userToolSize\|\|setup\.patternToolSize/, "setup tool size mirrors to project tools");
assert.match(source, /p\.yarn=setup\.userYarnWeight\|\|setup\.patternYarnWeight/, "setup yarn mirrors to project yarn");
assert.match(source, /flow-current-row/, "current row selector is present");
assert.match(source, /flow-prev-row/, "previous row button is present");
assert.match(source, /flow-next-row/, "next row button is present");
assert.match(source, /flow-row-direction/, "row direction selector is present");
assert.match(source, /alignMaskToCurrentRow/, "mask can align to current row");
assert.match(source, /coverCompletedRows/, "completed rows can be covered like a ruler");
assert.match(source, /rowHighlightStyle/, "current row highlight uses chart reader grid settings");
assert.match(source, /chartReadingContext/, "assistant uses highlighted row context");
assert.match(source, /I'm currently on/, "current row copy is friendly");
assert.match(source, /flowCurrentRowInstruction/, "current row shows pattern instructions");
assert.match(source, /sc, 2\(sc, inc\), sc/, "crochet example notation is available");
assert.match(source, /K, K, K, SSK, P, P, YO/, "knitting example notation is available");
assert.match(source, /How do you read this chart\?/, "row direction copy is friendly");
assert.match(source, /Show current row/, "current row display action is friendly");
assert.match(source, /Cover finished rows/, "finished row cover action is friendly");
assert.match(source, /Remove cover/, "remove cover action is friendly");
assert.match(source, /Voice Assistant/, "Flow Mode voice section is renamed");
assert.match(source, /▶ Read Current Row/, "Flow Mode exposes Read Current Row");
assert.match(source, /flow-read-play/, "Flow Mode exposes Play control");
assert.match(source, /flow-read-pause/, "Flow Mode exposes Pause control");
assert.match(source, /flow-read-stop/, "Flow Mode exposes Stop control");
assert.match(source, /flow-voice-speed/, "Flow Mode saves voice speed");
assert.match(source, /flow-voice-language/, "Flow Mode saves voice language");
assert.match(source, /flow-voice-mode/, "Flow Mode saves short/teaching mode");
assert.match(source, /Reading speed/, "voice speed is shown as reading speed");
assert.match(source, /Voice language/, "language setting is shown as voice language");
assert.match(source, /Reading style/, "voice mode is shown as reading style");
assert.match(source, /Beginner friendly/, "voice mode supports beginner-friendly reading");
assert.match(source, /highlightedRowConfidence/, "Read aloud checks current row confidence");
assert.match(source, /Please check this row before Yarncha reads it aloud\./, "unclear rows are not read as instructions");
assert.match(source, /sequenceToSpokenInstructions/, "Read aloud converts chart symbols to spoken instructions");
assert.match(source, /spokenSymbolPhrase/, "Read aloud has beginner-friendly symbol phrasing");
assert.match(source, /flow-crop-x/, "crop controls are present");
assert.match(source, /flow-grid-rows/, "manual grid controls are present");
assert.match(source, /Advanced tools/, "advanced controls are collapsed behind a friendly section");
assert.match(source, /Prepare guide/, "chart guide action is friendly");
assert.match(source, /slice\(0,3\)/, "symbol recognition returns top 3 possible matches");
for (const label of ["High","Medium","Low"]) {
  assert.match(source, new RegExp(`"${label}"`), `${label} confidence label exists`);
}
assert.match(source, /Please check this stitch before Yarncha reads it aloud\./, "unclear stitch wording is friendly");
assert.match(source, /Best local match/, "explain mode describes why Yarncha made a suggestion");
assert.match(source, /RS row rule checked/, "knitting RS/WS reasoning is included");
assert.match(source, /crochet chart direction checked/, "crochet direction reasoning is included");
assert.match(source, /cable symbols may span multiple stitches/, "multi-stitch cable reasoning is included");
assert.match(source, /Yarncha remembers your corrections on this device/, "does not imply model retraining");
assert.doesNotMatch(source, /Flow Mode \/ AI Chart Reader|AI reads → you review|Yarncha compares the uploaded chart with the Symbol Database|Grid prepared|Top 3 symbol matches|Highlight mask ready|Completed rows covered|Chart Reading Mode|Current row \/ round|Voice speed|Read Row Aloud/, "old technical Flow Mode page copy is removed");
assert.doesNotMatch(cloud, /Backend setup required|not connected to Supabase yet|OG Mode remains available offline/, "unconfigured cloud backend does not inject a scary chart-reader card");
assert.match(cloud, /panel\.remove\(\)/, "unconfigured cloud reader removes its panel");
assert.doesNotMatch(source, /data-page="flow"|data-mobile-page="flow"|Flow Mode<\/span>/, "Flow Mode is not a global navigation item");
assert.match(source, /data-chart-mode="flow"/, "Flow Mode remains inside the project chart section");
assert.match(source, /project-workspace-page/, "Project chart uses the shared workspace page shell");
assert.match(source, /project-workspace-inner/, "Project chart uses the shared workspace inner container");
assert.match(source, /workspace-card/, "Project chart cards use the shared workspace card class");
assert.match(source, /row-counter-card/, "row counter uses a dedicated responsive card");
assert.match(source, /row-stepper/, "row counter stepper keeps minus, row input, and plus together");
assert.match(source, /annotation-toolbar-shell/, "annotation toolbar has an overflow-safe shell");
assert.match(source, /function bindAnnotationToolbar/, "annotation toolbar has delegated click handling");
assert.match(source, /function setActiveAnnotationTool/, "annotation tools update from one source of truth");
assert.match(source, /const selectAnnotationTool=setActiveAnnotationTool/, "legacy annotation helper aliases the single source of truth");
assert.match(source, /annotationTools=\["touch","pen","highlighter","eraser","row-mask","text","arrow","marker"\]/, "annotation toolbar uses stable internal tool ids");
assert.match(source, /button type="button" class="\$\{activeAnnotationTool===tool\?"active":""\}" data-tool="\$\{tool\}" aria-pressed="\$\{activeAnnotationTool===tool\}"/, "annotation buttons use type button, data-tool and aria-pressed");
assert.match(source, /tool&&!tool\.closest\("\.annotation-toolbar"\)/, "global Tools navigation ignores annotation toolbar buttons");
assert.match(source, /setAnnotationSetting\("color"/, "annotation color control updates settings");
assert.match(source, /setAnnotationSetting\("size"/, "annotation size control updates settings");
assert.match(source, /setAnnotationSetting\("opacity"/, "annotation opacity control updates settings");
assert.match(source, /Annotation tool selected:/, "development debug logs tool selection");
assert.match(source, /Annotation setting changed:/, "development debug logs setting changes");
assert.doesNotMatch(source, /data-annotation-tool\]"\)\.forEach\(b=>b\.onclick=\(\)=>\{activeAnnotationTool=b\.dataset\.annotationTool;renderProjectDetail\(\);\}\)/, "annotation tool selection does not force a project re-render");
assert.doesNotMatch(source, /setActiveAnnotationTool[\s\S]{0,500}renderProjectDetail\(\)/, "setActiveAnnotationTool does not re-render the project");
assert.match(source, /chart-upload-content/, "upload card has centered content wrapper");
assert.match(source, /function scanPatternFile/, "uploads run through a reusable scan pipeline");
assert.match(source, /function ocrFile/, "image and scanned PDF OCR is implemented locally");
assert.match(source, /function prepareImageForOcr/, "image OCR supports crop, rotate, zoom, and improve options");
assert.match(source, /function openPatternSourceReviewModal/, "OCR review modal is available before using scanned text");
assert.match(source, /Use as Written Pattern/, "review modal can route text uploads to Pattern Reading Space");
assert.match(source, /Use as Visual Chart/, "review modal can keep uploads as visual charts");
assert.match(source, /Use as Mixed Pattern/, "review modal supports mixed chart and written notes");
assert.match(source, /Scan Again \/ Try Better Quality/, "review modal exposes a rescan option");
assert.match(source, /We could not read this clearly\. You can still use the image as a visual chart, or paste the written pattern text manually\./, "OCR failure has a friendly non-blocking fallback");
assert.match(source, /function patternReadingSpaceHtml/, "written and mixed scans render a Pattern Reading Space");
assert.match(source, /PATTERN READING SPACE/, "Pattern Reading Space is visible in chart tools");
assert.match(source, /pattern-source-text/, "users can edit scanned pattern text after OCR");
assert.match(source, /pattern-prev-line/, "Pattern Reading Space supports previous line tracking");
assert.match(source, /pattern-next-line/, "Pattern Reading Space supports next line tracking");
assert.match(source, /if\(p\.patternSource\?\.originalFileBlobId===id\)p\.patternSource=normalizePatternSource/, "deleting an active chart clears linked scan state");
assert.match(source, /bottom-nav-spacer/, "mobile workspace includes a bottom nav spacer");
assert.match(source, /<div class="chart-mode-actions"><div class="chart-mode-switch"/, "Project Chart card contains the OG/Flow selector");
assert.doesNotMatch(source, /<div class="chart-mode-switch card"/, "OG/Flow selector is not duplicated as a separate card");
assert.match(source, /Zoom, pan, highlight the row, and annotate as you go\./, "Project Chart card keeps the requested chart reading description");
assert.match(source, /<strong>OG Mode<\/strong><small>Manual Reading<\/small>/, "OG Mode shows the Manual Reading badge");
assert.match(source, /<strong>Flow Mode<\/strong><small>Smart Reading<\/small>/, "Flow Mode shows the Smart Reading badge");
assert.match(styles, /\.chart-mode-actions \.chart-mode-switch/, "integrated chart mode selector is styled");
assert.match(styles, /\.chart-mode-actions \.chart-mode-switch button small/, "chart mode badges are styled");
assert.match(styles, /@media \(max-width:760px\)[\s\S]*\.chart-mode-actions \.chart-mode-switch \{[^}]*grid-template-columns:1fr;/, "integrated selector stacks on mobile");
assert.match(styles, /\.flow-current-row-card/, "large current row card is styled");
assert.match(styles, /\.flow-setup-panel/, "project setup panel is styled");
assert.match(styles, /\.project-workspace-page\.flow-workflow \.manual-chart-tools,[\s\S]*\.project-workspace-page\.flow-workflow \.flow-reader-grid/, "Flow Mode workflow stays aligned in one column");
assert.match(styles, /\.flow-setup-save-row/, "Project Setup save row is styled");
assert.match(styles, /\.setup-save-status\.unsaved/, "Project Setup unsaved state is styled");
assert.match(styles, /\.flow-warning-card/, "setup warning card is styled");
assert.match(styles, /\.result-summary/, "result summary card is styled");
assert.match(styles, /\.result-summary-list/, "result summary rows use compact list layout");
assert.match(styles, /\.result-summary-row/, "result summary rows are separated");
assert.match(styles, /\.project-workspace-inner/, "workspace inner container is styled");
assert.match(styles, /container-type:inline-size/, "workspace responds to actual container width");
assert.match(styles, /@container \(max-width:680px\)/, "narrow workspace container keeps one-column layout");
assert.match(styles, /@container \(min-width:681px\)/, "wide workspace container can opt into wider layout");
assert.match(styles, /\.row-counter-card/, "responsive row counter card is styled");
assert.match(styles, /\.row-stepper/, "row stepper grid is styled");
assert.match(styles, /\.annotation-toolbar-shell/, "toolbar overflow shell is styled");
assert.match(styles, /\.annotation-toolbar-shell[\s\S]*overflow:hidden/, "toolbar shell prevents page-level horizontal overflow");
assert.match(styles, /\.project-workspace-page \.annotation-toolbar[\s\S]*overflow-x:auto/, "annotation toolbar scrolls horizontally inside itself");
assert.match(styles, /\.project-workspace-page \.annotation-toolbar button\[aria-pressed="true"\]/, "active toolbar button has non-colour focus/active outline");
assert.match(styles, /\.project-workspace-page \.annotation-toolbar input,[\s\S]*\.project-workspace-page \.annotation-toolbar select/, "toolbar form controls remain flex items");
assert.match(styles, /\.chart-upload-content/, "upload content wrapper is styled");
assert.match(styles, /\.chart-upload-card/, "upload card height is controlled");
assert.match(styles, /\.ocr-review-layout/, "OCR review modal is styled");
assert.match(styles, /\.ocr-preview/, "OCR original preview is styled");
assert.match(styles, /\.pattern-reading-space/, "Pattern Reading Space is styled");
assert.match(styles, /\.pattern-line-focus/, "current scanned line is styled");
assert.match(styles, /\.bottom-nav-spacer/, "bottom nav spacer is styled");
assert.match(styles, /\.flow-inline-advanced/, "progressive project setup sections are styled");
assert.match(styles, /\.shared-project-setup/, "Project shared setup summary is styled");
assert.match(styles, /\.flow-ready-card/, "simple progress card is styled");
assert.match(styles, /\.flow-advanced-tools/, "advanced tools drawer is styled");
assert.match(styles, /\.flow-reader-grid/, "Flow Mode reader layout is styled");
assert.match(styles, /\.flow-row-buttons/, "row buttons are styled");
assert.match(styles, /\.flow-read-aloud/, "Read aloud controls are styled");
assert.match(styles, /\.flow-ai-cloud-slot:empty \{ display:none;/, "empty cloud chart slot collapses");
assert.match(styles, /@media \(max-width:760px\)[\s\S]*\.flow-reader-grid \{ grid-template-columns:1fr; \}/, "Flow Mode reader collapses cleanly on mobile");

console.log("Flow Mode reader contract passed.");
