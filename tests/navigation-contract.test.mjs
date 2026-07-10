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
assert.match(app, /typeof saved\.onboardingComplete === "boolean" \? saved\.onboardingComplete : isExistingSavedWorkspace/, "Legacy saved workspaces without onboardingComplete do not get blocked by onboarding");
assert.match(app, /const isExistingSavedWorkspace = hasSavedProjects \|\| hasSavedLibrary \|\| hasSavedInventory \|\| !!saved\.lastSavedAt \|\| Number\(saved\.schemaVersion\) > 0/, "Existing user state is detected before showing onboarding");
assert.doesNotMatch(app, /merged\.onboardingComplete = !!saved\.onboardingComplete/, "Missing onboardingComplete is not coerced to false for legacy users");
assert.match(app, /function maybeShowOnboarding\(\)[\s\S]*if\(state\.onboardingComplete\)return;[\s\S]*renderOnboarding\(\)/, "Onboarding still appears for genuinely new users");
assert.doesNotMatch(app, /activePage = \$\{activePage\} \| renderedComponent = \$\{renderedComponent\}/, "Visible route debug text is removed");
assert.match(app, /\[Yarncha navigation\]/, "Development navigation logging is present");
assert.match(app, /try\{[\s\S]*route\.render\(\)[\s\S]*\}catch\(error\)\{[\s\S]*console\.error\("\[Yarncha navigation\] Render failed"/, "Navigation render failures are logged instead of failing silently");
assert.match(css, /\.view\[hidden\] \{ display:none !important; \}/, "Hidden views cannot render over the active page");
assert.doesNotMatch(css, /\.content-route-debug/, "Visible route debug badge styles are removed");
assert.match(css, /grid-template-columns:repeat\(6,minmax\(0,1fr\)\)/, "Mobile toolbar is exactly six sections");

const shellClickHandlers = app.match(/document\.addEventListener\("click",handleAppShellClick\)/g) || [];
assert.equal(shellClickHandlers.length, 1, "Only one app-shell click handler is registered");
assert.doesNotMatch(app, /document\.querySelectorAll\("\.nav-item"\)\.forEach\(button => \{\s*button\.onclick/s, "Nav buttons do not use stale direct onclick handlers");
assert.match(app, /window\.__yarnchaShellClickHandler[\s\S]*removeEventListener\("click",window\.__yarnchaShellClickHandler\)/, "Shell click handler is replaced on reload instead of leaving stale handlers");
assert.match(app, /const nav = e\.target\.closest\("\[data-view\]"\); if \(nav\) \{ e\.preventDefault\(\); showView\(nav\.dataset\.view\)\.catch/, "Sidebar navigation clicks prevent default and report failures");
assert.match(app, /showView\("tools"\)\.then\(\(\)=>renderTool\(tool\.dataset\.tool\)\)\.catch/, "Tool shortcuts wait for the Tools page before rendering a selected tool");
assert.match(app, /<button class="project-card card" type="button" data-project-id="\$\{p\.id\}" data-project="\$\{p\.id\}" aria-label="Open/, "Project cards are real buttons with stable project IDs");
assert.doesNotMatch(app, /onclick="event\.stopPropagation\(\).*yarncha:open-project/, "Project cards do not stop the delegated app-shell click handler");
assert.doesNotMatch(app, /function bindProjectGridNavigation/, "Project cards do not use stale direct grid onclick handlers");
assert.doesNotMatch(app, /__yarnchaProjectCardClickHandler/, "Project cards do not use competing capture/pointer handlers");
assert.match(app, /e\.target\.closest\("\[data-project-id\],\[data-project\]"\)/, "Project cards resolve from data-project-id");
assert.match(app, /const innerAction=e\.target\.closest\("\[data-project-action\],a,button,input,select,textarea"\)/, "Inner project actions can avoid opening the card");
assert.match(app, /innerAction&&innerAction!==project&&project\.contains\(innerAction\)/, "The project card itself is not blocked by the inner-action guard");
assert.match(app, /function stableProjectId\(project=\{\},index=0\)/, "Legacy projects missing ids receive stable local ids during load");
assert.match(app, /attachments: Array\.isArray\(p\.attachments\) \? p\.attachments : \[\]/, "Legacy projects missing attachments receive an empty attachments array");
assert.match(app, /function getProject\(id = currentProjectId\) \{ return state\.projects\.find\(p => String\(p\.id\) === String\(id\)\)/, "Project lookup tolerates string and numeric ids");
assert.match(app, /function openProject\(id\)[\s\S]*state\.projects\.find\(p=>String\(p\.id\)===String\(id\)\)[\s\S]*showView\("project-detail"\)/, "Project card clicks validate the id and route to the project detail page");
assert.match(app, /const attachments = Array\.isArray\(p\.attachments\) \? p\.attachments : \[\];\s*const \[firstAttachment = null\] = attachments;\s*p\.attachments = attachments;/, "Project detail renders old projects without attachments safely");
assert.doesNotMatch(app, /p\.attachments\[0\]/, "Project code does not directly read p.attachments[0]");
assert.ok(app.includes("location.hash.match(/^#project-(.+)$/)"), "Project hash route fallback is implemented");
assert.match(app, /window\.addEventListener\("hashchange",window\.__yarnchaHashProjectHandler\)/, "Project hash route fallback is registered");
assert.match(app, /queueMicrotask\(handleProjectHashRoute\)/, "Project hash route fallback runs on initial load");
assert.match(app, /console\.warn\("\[Yarncha project navigation\] Project not found"/, "Invalid project ids warn instead of silently failing");
assert.match(app, /const showProject=openProject/, "Legacy project navigation alias still opens the project detail page");
assert.match(app, /function activateProjectTab\(tabId,p=getProject\(\)\)/, "Project tabs use a central activation function");
assert.match(app, /const validTabs=\["track","chart","project","assistant"\]/, "Project tab activation accepts Track, Chart, Project, and Assistant");
assert.match(app, /console\.error\("\[Yarncha project tabs\] Render failed"/, "Project tab render failures are logged");
assert.match(app, /Assistant is ready[\s\S]*Add your question, row issue, sizing issue, or troubleshooting note/, "Assistant tab has a safe fallback empty state");
assert.match(app, /Project setup is ready[\s\S]*Some details are missing/, "Project tab has a safe fallback empty state");
assert.match(css, /\.project-card:focus-visible/, "Project cards keep keyboard focus visible");
assert.match(css, /\.project-card \{[^}]*display:block;/, "Project card buttons keep card styling");

console.log("Navigation contract passed");
