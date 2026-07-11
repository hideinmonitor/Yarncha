import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync("app.js", "utf8");
const css = readFileSync("styles.css", "utf8");

assert.match(app, /const libraryWikiEntries=\[/, "Theory library uses structured wiki entries");
assert.match(app, /function wikiEntry\(\{id,title,category,subcategory,craftTypes/, "Wiki entry data model includes required structured fields");
for (const field of ["fullExplanation","whenToUse","whyItMatters","miniExample","stepByStep","commonMistakes","troubleshooting","relatedTools","relatedProjectTypes","relatedEntries","nextLearningSteps","verifiedStatus","lastUpdated"]) {
  assert.match(app, new RegExp(field), `Wiki entries include ${field}`);
}
for (const field of ["visualAssets","altText","caption","craftType","relatedEntry","troubleshootingTopic","sourceQuality","reliabilityStatus","copyrightPolicy","diagnosticFlow","symptoms","likelyCauses","quickChecks","decisionPath","fixes","prevention","createdAt","updatedAt","version","author","source","editHistory","changelog","previousVersions","relatedAppVersion"]) {
  assert.match(app, new RegExp(field), `Library upgrade includes ${field}`);
}

for (const title of ["Gauge Basics","Yarn Fibre Types","Knit Stitch and Purl Stitch","Crochet Circle Formula","Tunisian Forward Pass and Return Pass","Stitch Count Problems","Project Planning Checklist","Reading Charts","Modifying Garment Size","Yarn Substitution"]) {
  assert.match(app, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${title} entry exists`);
}

for (const category of ["Foundations","Knitting Knowledge","Crochet Knowledge","Tunisian Crochet Knowledge","Troubleshooting Hub","Project Planning","Pattern & Chart Reading","Modification & Design Math","Yarn & Fibre Library","Tool Manual Integration"]) {
  assert.match(app, new RegExp(category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${category} category is represented`);
}

assert.match(app, /function filteredLibraryWikiEntries/, "Library wiki has search and filters");
assert.match(app, /id="wiki-search"/, "Library wiki renders a search input");
for (const filter of ["wiki-craft","wiki-level","wiki-category","wiki-project-type","wiki-tool"]) {
  assert.match(app, new RegExp(filter), `${filter} filter exists`);
}

assert.match(app, /function libraryWikiEntryDetailHtml/, "Library wiki renders entry subpages");
assert.match(app, /data-wiki-save/, "Entries can be saved");
assert.match(app, /data-wiki-project-note/, "Entries can be added to project notes");
assert.match(app, /data-wiki-checklist/, "Entries can be added to a checklist");
assert.match(app, /data-wiki-suggest/, "Entries support local suggested edits");
assert.match(app, /data-wiki-note/, "Entries support private notes");
assert.match(app, /state\.librarySuggestedEdits/, "Suggested edits are local-first");
assert.match(app, /state\.libraryReports/, "Copied/suspicious content reports are stored locally");
assert.match(app, /Report copied or suspicious content/, "Library includes a report option for copied content");
assert.match(app, /must not store, reproduce, or share full paid pattern instructions/, "Library protects paid pattern and copyright content");

for (const label of ["Official Yarncha Guide","Draft","Needs Review","User Submitted","Community Reviewed","Expert Reviewed"]) {
  assert.match(app, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${label} source/review label exists`);
}

assert.match(app, /const libraryLearningPaths=\[/, "Learning paths are structured");
for (const path of ["Knitting Beginner Path","Crochet Beginner Path","Tunisian Beginner Path","Gauge and Swatching Path","Pattern Reading Path","Chart Reading Path","Amigurumi Path","Sock Knitting Path","Garment Modification Path","Yarn Substitution Path","Troubleshooting Path","Pattern Design and Math Path"]) {
  assert.match(app, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${path} exists`);
}
for (const pathField of ["orderedEntries","estimatedTime","difficulty","practiceTask","relatedTools","nextStep","libraryPathProgress"]) {
  assert.match(app, new RegExp(pathField), `Learning paths include ${pathField}`);
}

for (const term of ["US/UK crochet terms","AU/UK yarn terms","US yarn weights","mm hook","US needle","UK needle","8 ply","bind off","cast off","gauge","tension","frogging","ripping back"]) {
  assert.match(app, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `${term} terminology is searchable`);
}

for (const measurement of ["bust/chest","shoulder width","armhole depth","sleeve length","upper arm","wrist","body length","hip","neck opening","head circumference","foot length","foot circumference","hand circumference","blanket size","scarf size","hat size","sock size","bag size","amigurumi size"]) {
  assert.match(app, new RegExp(measurement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `${measurement} measurement guide exists`);
}

for (const safety of ["safety eyes","acrylic can melt","cotton can stretch","Wool may irritate","Bags need durable fibre","Steam blocking can damage","Garments can grow"]) {
  assert.match(app, new RegExp(safety.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `${safety} safety note exists`);
}

assert.match(app, /smartLibraryMatches/, "Smart search maps natural problem searches to entries");
for (const query of ["crochet circle wavy","knitting rolling","too tight cast on","Tunisian curl","wrong count","8 ply instead of DK","sleeve longer","running out yarn","read chart"]) {
  assert.match(app, new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `${query} smart search example is present`);
}

assert.match(app, /findLibraryEntriesForAssistant/, "Assistant can search approved Library entries");
assert.match(app, /approvedLibraryEntries/, "Assistant cites approved Library entries");
assert.match(app, /Based on:/, "Assistant UI shows source references");
assert.match(app, /data-library-link/, "Assistant answers link back to Library entries");
assert.match(app, /General Library advice/, "Assistant separates general Library advice");
assert.match(app, /Project-specific advice/, "Assistant separates project-specific advice");
assert.match(app, /Assumptions/, "Assistant displays assumptions when context is incomplete");
assert.match(app, /Missing information/, "Assistant displays missing information instead of guessing");
for (const action of ["add-checklist","save-troubleshooting","create-calculator-input","link-library","data-wiki-project-note","data-wiki-checklist","data-wiki-save","data-wiki-note"]) {
  assert.match(app, new RegExp(action), `${action} save-to-project action exists`);
}
for (const contextField of ["project type","target measurement","current measurement","user skill level"]) {
  assert.match(app, new RegExp(contextField.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${contextField} is part of Assistant diagnostic context`);
}

for (const className of [".wiki-shell",".wiki-filter-grid",".wiki-entry-card",".wiki-detail",".wiki-hub-card",".wiki-notes",".wiki-path-grid",".wiki-visual-grid",".wiki-decision-tree",".wiki-source-banner",".wiki-copyright-note",".wiki-version-card"]) {
  assert.match(css, new RegExp(className.replace(".", "\\.")), `${className} styling exists`);
}
assert.match(css, /min-height:44px/, "Wiki controls preserve touch-friendly targets");
assert.match(css, /@media \(max-width:900px\)[\s\S]*wiki-entry-grid/, "Wiki has tablet/mobile responsive rules");
assert.match(css, /@media \(max-width:760px\)[\s\S]*wiki-hub-grid/, "Wiki has phone responsive rules");

console.log("Library wiki contract passed.");
