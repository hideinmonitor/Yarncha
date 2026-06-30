import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app = readFileSync("app.js", "utf8");
const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");

for (const pageId of ["today", "projects", "market", "library", "tools", "settings"]) {
  assert.match(html, new RegExp(`data-view="${pageId}"`), `Main navigation includes ${pageId}`);
}

for (const pageId of ["flow", "assistant"]) {
  assert.doesNotMatch(html, new RegExp(`data-view="${pageId}"`), `${pageId} is not a global navigation item`);
}

for (const component of ["TodayPage", "ProjectsPage", "YarnStashPage", "LibraryPage", "ToolsPage", "SettingsPage"]) {
  assert.match(app, new RegExp(component), `Route renderer exposes ${component}`);
}

for (const tabId of ["track", "chart", "project", "assistant"]) {
  assert.match(app, new RegExp(`data-project-tab="\\$\\{id\\}"`), "Project tab renderer uses stable project tab IDs");
  assert.match(app, new RegExp(`\\["track","chart","project","assistant"\\]`), "Project tabs remain Track, Chart, Project, Assistant");
  break;
}

assert.match(app, /function routeForPage\(pageId\)/, "Navigation uses stable page IDs through routeForPage");
assert.match(app, /function setActiveView\(viewId\)/, "Navigation switches the rendered view centrally");
assert.match(app, /toggleAttribute\("hidden", !isActive\)/, "Inactive views are hidden so Today cannot remain visible");
assert.doesNotMatch(app, /activePage = \$\{activePage\} \| renderedComponent = \$\{renderedComponent\}/, "Visible route debug text is removed");
assert.match(app, /\[Yarncha navigation\]/, "Development navigation logging is present");
assert.match(css, /\.view\[hidden\] \{ display:none !important; \}/, "Hidden views cannot render over the active page");
assert.doesNotMatch(css, /\.content-route-debug/, "Visible route debug badge styles are removed");
assert.match(css, /grid-template-columns:repeat\(6,minmax\(0,1fr\)\)/, "Mobile toolbar is exactly six sections");

const shellClickHandlers = app.match(/document\.addEventListener\("click",/g) || [];
assert.equal(shellClickHandlers.length, 1, "Only one app-shell click handler is registered");
assert.doesNotMatch(app, /document\.querySelectorAll\("\.nav-item"\)\.forEach\(button => \{\s*button\.onclick/s, "Nav buttons do not use stale direct onclick handlers");
assert.match(app, /window\.__yarnchaShellClickHandler[\s\S]*removeEventListener\("click",window\.__yarnchaShellClickHandler\)/, "Shell click handler is replaced on reload instead of leaving stale handlers");
assert.match(app, /<button class="project-card card" type="button" data-project="\$\{p\.id\}"/, "Project cards are real buttons with stable project IDs");
assert.match(app, /function openProject\(id\)[\s\S]*state\.projects\.find\(p=>p\.id===id\)[\s\S]*showView\("project-detail"\)/, "Project card clicks validate the id and route to the project detail page");
assert.match(app, /console\.warn\("\[Yarncha project navigation\] Project not found"/, "Invalid project ids warn instead of silently failing");
assert.match(app, /const showProject=openProject/, "Legacy project navigation alias still opens the project detail page");
assert.match(css, /\.project-card:focus-visible/, "Project cards keep keyboard focus visible");

console.log("Navigation contract passed");
