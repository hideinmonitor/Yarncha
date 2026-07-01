# Yarncha Development Memory

Last documentation update: 2026-07-01

This file is the project memory card for AI-assisted development. Read it before changing code. Keep it practical, current, and honest about what is stable, experimental, local-only, or paused.

## Current App Overview

Yarncha is a local-first yarn craft companion for knitting, crochet, Tunisian crochet, and related craft projects. The current MVP focuses on daily project workflow:

- Today dashboard and project resume cards
- Project creation, editing, covers, notes, row tracking, repeat counters, markers, and buy lists
- Project Chart workspace with OG Mode and Flow Mode
- Manual annotation tools, row mask, chart upload, PDF/image viewing, OCR review, and pattern text reading
- Project Toolkit and standalone Tools page
- Yarn Stash inventory, shopping cart, budget, and purchase history
- Library spaces, Symbol Database, tool manual, theory notes, yarn materials, and project ideas
- Theme gallery, design style settings, language preference, voice controls, local backup/import/export, and optional private-beta cloud sync

Stable core:

- Local-first project storage and backup/export/import
- Project list/detail navigation
- OG/manual chart annotation workspace
- Project Toolkit calculators and tool history
- Symbol Database browse/edit/import/export
- Theme gallery and settings grouping
- Main tests and Vite production build

Experimental or cautious:

- Flow Mode is an MVP local guided-reading workflow. It can prepare a chart guide, show row progress, read checked rows aloud, and use local symbol knowledge. It is not a fully reliable AI chart reader.
- OCR uses local browser-side extraction with PDF.js and Tesseract.js. It must always be user-reviewed.
- Supabase sync and server chart analysis exist as private-beta infrastructure but require credentials, migrations, functions, and manual release testing.
- Calculator outputs include estimates. Some calculator formulas are audited as approximate or risky in `CALCULATOR_AUDIT.md`.

Paused / deprecated:

- A separate global Flow Mode navigation item is not used. Flow Mode belongs inside each project's Chart section.
- The visible "Symbol Learning Library" card was removed from the Library UI. Learning data still exists as a local knowledge layer behind Symbol Database edits and Flow Mode corrections.
- Legacy tutorials are migrated to `Personal References (legacy)` if existing user data is found.

## Current Branch And Deployment Situation

Current inspected branch during this update:

- `docs/update-development-latest`
- It points at the same commit as `main`, `origin/main`, and `origin/HEAD` at the time of inspection.

Recent branch history:

- `main` is the production branch.
- Vercel should deploy from `main`.
- `recovery/reapply-flowmode-safely` was used to safely reapply Flow Mode after a bad raw merge.
- Bad merge reference: `68b31b0` (`backup/bad-flowmode-merge-68b31b0`).
- Stable recovery reference: `babeafb` restored stable main; `d4b50b4` and `a163c54` safely re-applied Flow Mode; `c1be2c2` triggered a Vercel production redeploy.

Deployment rules:

- Vercel Root Directory must be blank / repository root (`.`). A nested Yarncha app folder is invalid.
- Vercel build command: `npm run build`.
- Vercel output directory: `dist`.
- Production needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` only when cloud features are enabled.
- If production behaves differently from local after a script/cache change, redeploy without cache and verify that the production bundle includes the latest root `app.js`, `styles.css`, `calculator-engine.js`, `symbol-database.js`, and `src/calculations/*` files copied by `scripts/copy-static.mjs`.
- PWA/service-worker cache can serve older shells. During dev, use a version query string, unregister service workers if needed, and verify the loaded script version.

## Tech Stack

- Framework: vanilla HTML, CSS, and JavaScript.
- Build tool: Vite.
- Runtime modules:
  - `app.js` is the main SPA runtime.
  - `src/calculations/core.js` contains the shared deterministic calculation layer.
  - `calculator-engine.js` is a compatibility wrapper for Toolkit calculators and delegates to `window.YarnchaCalculations`.
  - `symbol-database.js` contains normalized default symbol data and search helpers.
  - `src/document-tools.js` bridges PDF.js and Tesseract.js for Vite/browser use.
  - `src/cloud/bootstrap.js` and `src/cloud/supabase-client.ts` implement optional Supabase private-beta sync.
- Styling: `styles.css` with CSS variables, semantic theme tokens, responsive layers, and mobile safe-area rules.
- Data: in-memory `state` object, localStorage, IndexedDB, optional Supabase.
- PWA: root and public service-worker files plus manifests and icons.

Node requirement:

- `package.json` requires Node `>=20.19`.

## File Structure

Repository root is the app root.

- `index.html`
  - Static shell, sidebar navigation, views, modal root, toast, voice dock, and script/style links.
- `app.js`
  - Main app state, rendering, storage, project workflow, chart tools, annotations, Flow Mode, OCR handling, Symbol Database UI, Toolkit UI, voice controls, settings, backup/import/export, and initialization.
- `styles.css`
  - Theme tokens, app layout, mobile layout, chart workspace, annotation toolbar, settings, symbols, Flow Mode, Library, Tools, modals, and responsive overrides.
- `calculator-engine.js`
  - Compatibility wrapper used by Toolkit tools. It preserves the existing `window.YarnchaCalculatorEngine` API while calling shared functions from `src/calculations/core.js`.
- `src/calculations/`
  - Shared calculation registry and category facades for gauge, yarn, sizing, repeats, shaping, garments, crochet, knitting, and rendering.
  - Project Setup, Toolkit calculators, and Flow Mode should use these functions instead of duplicating formulas.
- `src/data/sizeReference.js`
  - Shared size reference presets used by the calculation layer.
- `symbol-database.js`
  - Default symbol records, normalization, search, audit, and review-first recognition candidate helpers.
- `src/document-tools.js`
  - PDF.js/Tesseract.js bridge. PDF worker comes from `pdfjs-dist`; OCR worker/core/language data load on demand from CDNs.
- `src/cloud/bootstrap.js`
  - Browser-side account UI, Supabase setup detection, migration, autosync, cloud upload queue, chart review panel removal when unconfigured.
- `src/cloud/supabase-client.ts`
  - Supabase client wrappers for projects, settings, assets, chart cells, generated patterns, and account deletion.
- `api/config.js`
  - Vercel runtime endpoint exposing public Supabase configuration only.
- `scripts/copy-static.mjs`
  - After Vite build, copies classic app assets, public assets, `src/calculations`, and `src/data` into `dist`, then injects classic root scripts if missing.
- `supabase/migrations/202606200001_private_beta.sql`
  - Private beta schema, RLS policies, storage policies, and chart/tool tables.
- `supabase/functions/analyze-chart/index.ts`
  - Authenticated, review-first server chart transcription for image uploads.
- `supabase/functions/delete-account/index.ts`
  - Authenticated account and cloud data deletion.
- `tests/`
  - Contract and regression tests for calculators, Flow Mode, navigation, symbols, settings, themes, voice, project editor, and library delete behavior.
- Supporting docs:
  - `README.md`
  - `BETA_RELEASE.md`
  - `PRIVACY.md`
  - `CALCULATOR_AUDIT.md`
  - `SYMBOL_DATABASE_AUDIT.md`
  - `TOOL_SYSTEM_IMPLEMENTATION.md`

## Storage And Persistence

Primary state:

- localStorage key: `threadline-data-v1`
- Main functions: `loadState()`, `saveState()`, `saveProjectTouch(project)`, `window.YarnchaLocal.replaceState(next)`

Large local files:

- IndexedDB database: `threadline-files`
- Version: `2`
- Object stores:
  - `files`
  - `state`
- Main helpers: `openAssetDb()`, `putAsset(id, file)`, `getAsset(id)`, `deleteAsset(id)`, `putProjectStateSnapshot()`, `getAllAssetsByIds(ids)`

Saved locally:

- Projects, current active project, project rows, counters, markers, notes, covers, chart refs, attachments, annotations, row masks, chart zoom, reading mode, chart mode
- Flow Mode reader config, pattern source/OCR state, project setup, project calculations, chart analysis rows, and local symbol learning records
- Library sections/items and uploaded library assets
- Yarn Stash inventory, cart, budget settings, purchase history
- Symbol Database user overrides, uploaded symbol pictures, favorites, technique references, local learning records
- Theme, style, language, unit system, app preferences, onboarding state, account/sync preference
- Project ideas, tool history, saved calculator results

Not automatically synced:

- Local browser data does not sync across Safari/Chrome/devices unless the user uses backup/import or opts into private-beta Supabase migration.
- IndexedDB assets are browser-local unless exported/restored or synced through cloud beta.

Backup/import/export:

- Backup version constant: `BACKUP_VERSION = 2`.
- Full backups include project data and asset descriptors where supported.
- Symbol export/import includes local learning data and symbol overrides.

## Project System

Projects are rendered through:

- `renderProjects()`
- `renderProjectDetail()`
- `projectTrackHtml()`
- `projectChartHtml()`
- `projectProjectHtml()`
- `projectAssistantTabHtml()`

Project creation/editing:

- `openProjectModal()` creates projects.
- `openEditProjectModal()` edits metadata, craft/status, dates, rows, notes, cover image, material details, pattern source, and delete confirmation.
- Project cover images are stored in IndexedDB and hydrated through `hydrateProjectCovers()`.

Project tabs:

- Track
- Chart
- Project
- Assistant

Track tab:

- Main row counter
- Manual row jump
- Linked repeat/sub-counters
- Markers
- Project notes

Row counter behavior:

- `setMainRow()` is the central row update path.
- Linked sub-counters move forward and backward by the main-row delta.
- Linked sub-counters do not go below zero or their configured start value.
- Voice commands and Flow Mode row controls should call central row helpers rather than mutating `p.row` directly.

Known project edge cases:

- Preserve local data fields during migrations.
- Do not remove or rename saved fields without a migration plan.
- Project navigation must remain based on stable internal ids, not translated labels.
- Project cards need a regression test any time routing or overlay layout changes.

## OG Chart Mode

OG Mode is the manual chart workspace inside Project -> Chart.

Purpose:

- A clean manual annotation workspace, similar to a PDF/chart markup tool.
- No global AI panel and no separate analysis report inside OG Mode.

Current behavior:

- Upload image/PDF chart files through chart upload controls.
- Store uploads in IndexedDB and project attachments.
- Show uploaded files as compact attachment chips with filename, uploaded status, preview/open action, and internal remove button.
- Preview active image/PDF in chart canvas.
- Support zoom controls.
- Support annotation tools: Touch, Pen, Highlighter, Eraser, Row Mask, Text, Arrow, Marker.
- Support row mask controls: move, resize, lock position, lock size, lock all, move up/down, cover completed rows, clear mask.
- Support undo/redo/clear annotations.
- Support row counter and voice read guidance.

Important functions:

- `projectChartHtml(p)`
- `chartViewerHtml(p)`
- `annotationsHtml(p)`
- `annotationSvg(a, selected)`
- `bindAnnotationToolbar()`
- `setActiveAnnotationTool(tool)`
- `bindAnnotationStage()`
- `beginAnnotation()`, `moveAnnotation()`, `endAnnotation()`
- `ensureRowMask()`, `alignMaskToCurrentRow()`, `coverCompletedRows()`
- `handleChartFiles(fileList)`
- `showProjectAsset(id)`
- `removeProjectChartAsset(id)`

Known limitations:

- Annotation drawing is MVP-level and should be improved incrementally.
- PDF viewing relies on browser/PDF.js behavior, not a full custom PDF editor.
- Touch to Read depends on saved chart analysis or user corrections; it is not guaranteed visual recognition.

## Flow Mode

Flow Mode lives only inside Project -> Chart. It is selected with the OG Mode / Flow Mode switch in the Project Chart card.

Purpose:

- A calm guided-reading assistant that helps the user follow a pattern one row at a time.
- It should feel beginner-friendly and avoid developer-facing copy.
- It is not a separate global navigation item.

How Flow Mode differs from OG Mode:

- OG Mode is manual markup and row tracking.
- Flow Mode adds project setup, chart-reading direction, current-row guidance, local symbol suggestions, OCR/pattern text context, row highlight, and voice reading.

Current Flow Mode structure:

1. Project Chart card with OG/Flow selector
2. Row counter card
3. Chart canvas and attachment chips
4. Flow Mode card when chart mode is `flow`
5. Project Setup section
6. Reading Progress section
7. Voice Assistant section
8. Advanced tools collapsed section
9. Pattern Reading Space when OCR/text exists

Current reader behavior:

- `normalizeChartReaderConfig()` stores chart type, reading direction, row direction, crop, grid, recognition results, active asset, read-aloud settings, and completed-row cover state.
- `chartImageService` prepares chart source metadata.
- `gridDetectionService` can prepare a simple guide and save manual grid settings.
- `symbolRecognitionService` returns local top suggestions where possible.
- `chartReasoningService` applies simple craft/context rules, such as RS/WS and direction notes.
- `userLearningService` connects corrections to the local symbol knowledge layer.
- `rowHighlightStyle()` positions the current row highlight from chart reader grid settings.
- `chartReadingContext()` gives assistant/voice context from the highlighted row.

Setup-before-reading workflow:

- `normalizeProjectSetup()` normalizes shared setup fields.
- `friendlyChartBetaHtml()` renders the Flow Mode setup and reading UI.
- `bindFlowModeReader()` binds setup save, row changes, grid controls, voice controls, and chart direction changes.
- `saveFlowSetup()` stores setup on the project, mirrors key fields to existing project metadata, recalculates planning values, and updates total rows if needed.

Flow Mode wording rules:

- Use plain craft language: Ready, Continue, Review, Current row, Next row, Reading, Voice, Help, Guide, Pattern, Stitch.
- Avoid UI wording like AI, parser, database, recognition engine, confidence, or grid unless inside a developer-only contract or advanced implementation detail.

Limitations and risks:

- Local symbol matching is heuristic and review-first.
- OCR can be wrong and must be user-editable.
- Read aloud only gives row instructions when the row is checked/high confidence; otherwise it asks the user to check the row first.
- Server-side AI chart transcription is private-beta infrastructure and not required for local Flow Mode.

## Project Setup Calculation Engine

Current implementation is inside `app.js`, not a separate module.

Purpose:

- Collect project setup once and reuse it across Flow Mode and Project Tools.
- Provide a beginner-friendly planning summary before guided reading.
- Keep derived values out of editable setup fields where possible.

Main functions:

- `normalizeProjectSetup(setup, project)`
- `ensureProjectSetup(project)`
- `parseGaugePair(gauge)`
- `normalizeYarnWeightName(value)`
- `yarnWeightRank(value)`
- `sizeMeasurementDefaults(size)`
- `setupMeasurements(setup)`
- `isGarmentProject(type)`
- `blanketPresetSize(type)`
- `flowProjectDimensions(setup)`
- `setupWarnings(setup)`
- `calculateFlowProjectPlan(project, setup)`
- `flowCalculationItems(plan)`
- `resultSummaryHtml(title, items, className)`
- `flowProjectTypeFields(setup, options, sizeOptions)`
- `readFlowSetupDetails(existing)`

Stored setup fields:

- `craft`
- `projectType`
- `patternGauge`
- `patternToolSize`
- `patternYarnWeight`
- `userToolSize`
- `userYarnWeight`
- `desiredSize`
- `customSize`
- `patternLanguage`
- `bodyMeasurements`
- `itemDetails`
- `updatedAt`

Saved project data:

- Full setup is stored on `project.projectSetup`.
- Simplified compatibility setup is stored on `project.setup`.
- Calculated summary values are stored on `project.projectCalculations`.
- Setup mirrors important values back to existing project fields:
  - `p.type`
  - `p.projectKind`
  - `p.gauge`
  - `p.needles`
  - `p.yarn`
  - `p.size`
  - `p.sizingNotes`

Current calculation outputs:

- Cast-on or starting chain
- Stitch count
- Row count
- Width and length
- Sleeve length and body length where applicable
- Shaping note
- Estimated yarn usage
- Tool/yarn mismatch warnings

Project types currently represented in setup:

- Scarf
- Socks
- Hat / Beanie
- Shawl
- Bag
- Blanket
- Amigurumi
- Top
- Cardigan
- Jumper / Sweater
- Vest
- Dress
- Other

Current limits:

- The calculation engine is a practical planning helper, not a complete pattern grading engine.
- The current formulas are simpler than the full future spec. Do not claim precise garment grading, exact yarn usage, or complete stitch distribution.
- Gauge parsing currently uses a simple numeric pair with a default span.
- Yarn/tool warnings compare simple tool size and yarn weight rank.

Testing:

- `npm run test:flow-mode` currently checks the Project Setup UI, saved setup behavior, warning copy, derived-value display, and Flow Mode structure.
- `npm run test:project-setup-calculations` checks that Project Setup and Flow Mode delegate to the shared calculation layer and that the required calculation modules, setup fields, and friendly copy remain present.

## Calculator And Tool System

Calculator engine:

- `src/calculations/core.js` is the single source of truth for shared formulas.
- `calculator-engine.js` exposes `window.YarnchaCalculatorEngine` as the stable Toolkit API and delegates to `window.YarnchaCalculations`.
- `tests/calculator-engine.test.js` contains the calculator case table.
- `tests/run-calculator-tests.cjs` loads the size reference, shared calculation layer, and compatibility wrapper in Node, then reports pass/fail counts.

Shared calculation modules:

- `src/calculations/core.js` contains reusable functions such as `calculateGauge`, `calculateTargetStitches`, `calculateTargetRows`, `roundToRepeat`, `calculateAreaYarnEstimate`, `calculateSwatchYarnDensity`, project plan calculators, chart/rendering helpers, and yarn helpers.
- Category files under `src/calculations/` expose grouped facades without duplicating formulas.
- New Project Setup, Toolkit, or Flow Mode math should be added to the shared layer first, then called from UI wrappers.

Project Toolkit categories:

- Stitch & Pattern Tools
- Fit & Size Tools
- Project Rendering Studio
- Yarn Tools

Tool behavior:

- Project pages filter tools by craft.
- Budget-specific calculator work stays in Buy List / Budget rather than Project Toolkit categories.
- Project Tools can save results to project notes, project Tool History, project ideas, and Buy List where relevant.
- `projectToolsHtml()` shows the shared project setup context.
- `calculateProjectTool()` and `calculateProjectToolWithEngine()` connect UI forms to calculator output.

Current tools include:

- Gauge / Swatch Calculator
- Needle / Hook Adjustment
- Pattern / Garment Resizer
- Blocking Calculator
- Size Reference
- Hat / Beanie Size Calculator
- Sock Calculator
- Sleeve Calculator
- Raglan Calculator
- Blanket Calculator
- Circle Calculator
- Amigurumi Shape Guide
- Granny Square Size Planner
- C2C Blanket Calculator
- Grid Generator
- Stripe Generator
- Color Pooling Planner
- Yarn Estimator
- Yarn Leftover Estimator
- Yarn Substitution Helper
- Yarn Weight Converter
- Unit Converter
- Cast On Calculator
- Increase / Decrease Calculator
- Repeat Calculator
- Row / Round Counter Helper
- Basic Calculator

Calculator caution:

- Read `CALCULATOR_AUDIT.md` before major calculator work.
- Some formulas are safe exact arithmetic; others are estimates or marked risky.
- Do not present confidence percentages as objective craft accuracy unless a documented scoring method exists.

## Symbol Database And Local Learning

Default source:

- `symbol-database.js`
- Current audited default count in the code/tests: 101 normalized entries.
- Entries cover knitting, crochet, and Tunisian crochet.
- `SYMBOL_DATABASE_AUDIT.md` records the source audit and unresolved review groups.

Symbol UI:

- Library section id: `symbols`
- Main UI functions include `symbolDatabaseHtml()`, `bindSymbolDatabase()`, `mergedSymbolEntries()`, `symbolEditFormHtml()`, and `openSymbolEditModal()`.
- Default symbols remain immutable.
- User edits live in `state.userSymbolsOverride`.
- Custom symbol pictures are stored in IndexedDB and referenced by `symbolImageAsset` / `symbolImageName`.
- Symbol cards/details prefer uploaded pictures and fall back to SVG tokens.
- The beginner edit form intentionally avoids raw SVG editing and source/audit metadata fields.

Local learning:

- `state.symbolLearningLibrary` stores local learning records.
- The visible Symbol Learning Library card is removed from Library to reduce confusion.
- Symbol Database edits automatically sync a learning record via `syncLearningFromSymbolEntry()`.
- Flow Mode corrections can save only as Flow Mode correction or also update Symbol Database.
- Duplicate prevention uses symbol id or abbreviation + craft.
- Local learning wording must say: "Yarncha remembers your corrections on this device."
- Do not say the AI model is retrained.

Knowledge layer search order:

1. User manually verified symbols
2. User uploaded symbol images
3. User corrected Flow Mode symbols
4. Confirmed default Symbol Database entries
5. To Be Confirmed entries

## OCR, PDF, And Pattern Source Handling

Document tooling:

- `src/document-tools.js` exposes PDF/OCR helpers to the browser.
- PDF.js comes from `pdfjs-dist`.
- Tesseract.js comes from npm, but OCR worker/core/language files load on demand from jsDelivr and Project Naptha.

Pattern source model:

- Normalized by `normalizePatternSource()`.
- Stores:
  - `type`: visual-chart, written-pattern, mixed, none
  - `fileType`: image, pdf, docx, text, paste, none
  - `originalFileBlobId`
  - `extractedText`
  - `ocrConfidence`
  - `ocrStatus`
  - `selectedPages`
  - `userCorrectedText`
  - `workspaceMode`
  - scan settings for crop, rotation, improve, and zoom

Upload behavior:

- `handleChartFiles()` saves uploads to IndexedDB, updates project attachments, queues optional cloud upload, scans text when possible, classifies the pattern source, stores OCR text, and opens review.
- PDF selectable text is extracted where possible.
- Scanned/image PDFs and image files can run OCR.
- Users can review and edit scanned text.
- Mostly text uploads can route to Pattern Reading Space.
- Mixed uploads can keep visual chart and scanned text.
- OCR failure must not block the user; OG visual chart mode remains available.

Important functions:

- `scanPatternFile(file, scanSettings)`
- `extractPdfText(file)`
- `ocrFile(file, scanSettings)`
- `prepareImageForOcr(file, scanSettings)`
- `openPatternSourceReviewModal(assetId)`
- `patternReadingSpaceHtml(project)`
- `classifyPatternSource(text, file, status)`

Limitations:

- OCR quality depends on the browser, image quality, language data download, and Tesseract limitations.
- OCR should always be treated as a draft.
- Server-side AI chart transcription accepts images only in the Edge Function.

## Voice And Read Aloud

Voice controls:

- Browser SpeechRecognition is used when available.
- Speech synthesis is used for spoken row guidance/read aloud.
- Voice language switches to `yue-Hant-HK` when Yarncha language is `zh-HK`, otherwise `en-AU`.

Intent matching:

- `voiceIntentAliases`
- `normalizeVoiceText()`
- `voiceDistance()`
- `voiceSimilarity()`
- `matchVoiceIntent()`
- `confirmVoiceIntent()`
- `executeVoiceIntent()`

Supported intent families:

- Next row
- Previous row
- Read row
- Pause
- Resume
- Start work
- Undo
- Repeat plus
- Add note
- Go to row
- Mark

Confidence behavior:

- High confidence (`>= .82`) executes immediately.
- Medium confidence (`>= .62`) asks "Did you mean ...?"
- Debug text shows recognized text, matched intent, and confidence.

Flow Mode read aloud:

- `readHighlightedRowAloud()` refuses to read unchecked/low-confidence rows as instructions.
- `sequenceToSpokenInstructions()` and `spokenSymbolPhrase()` convert saved row/cell sequences into beginner-friendly speech.
- Voice settings are stored in chart reader read-aloud settings: speed, language, and mode.

## Theme, UI, And Mobile Design

Current theme system:

- Theme presets are defined in `themePresets`.
- There are eight current themes:
  1. Original Yarncha (`vintage-paper`)
  2. Flower Blossom
  3. Sky Blessing
  4. Matcha Grove
  5. Ocean Mist
  6. Mediterranean Dream
  7. Sakura Milk
  8. Lavender Twilight
- `Sky Blessing` replaces the old Morning Orchard direction.
- Theme UI must be English-only.
- Theme cards are visual gallery cards. There is no Apply Theme button or visible HEX palette in cards.
- Cards select by click, Enter, or Space; active state uses a border and explicit Active badge.
- Palette credit text appears in the settings theme area.

Theme storage:

- `state.theme.name`
- `state.theme.style`
- `state.theme.mode`
- `normalizeThemeName()` maps legacy ids to current ids.

Design styles:

- Original Classic
- Korean Soft
- Minimal Clean
- Artsy Journal

Mobile/layout rules:

- The app is mobile-first and must be tested at 390 px, 430 px, 768 px, and desktop.
- Avoid horizontal overflow.
- Use safe-area insets for bottom navigation and chart tools.
- Controls should have at least 44 px touch targets.
- Modals must fit inside phone width.
- Project Chart workspace uses shared `project-workspace-page`, `project-workspace-inner`, and `workspace-card` classes.
- Flow Mode layout should be one aligned column on narrow and medium widths.
- OG Mode chart canvas expands vertically now that bottom analysis panels are removed.

Dark mode:

- Themes include hand-authored dark palettes.
- `test:themes` checks contrast, theme token completeness, gallery behavior, and danger button contrast.

## Navigation, Settings, Library, And Stash

Navigation:

- Global nav sections: Today, Projects, Yarn Stash, Library, Tools, Settings.
- Flow Mode and Assistant are not global nav items.
- Stable page ids must be used internally; do not use translated labels as route ids.
- `setActiveView()` and project tab handlers must update both active state and rendered content.

Settings:

- Settings groups include preferences, project/backup, account/sync, appearance/theme, limitations, and Danger Zone.
- Delete Account/cloud deletion belongs in Danger Zone only.
- `openModal()` must call `ensureModalElements()` before writing modal content.
- The global footer includes `© 2026 Yarncha. All rights reserved.`

Library:

- Default sections: My Pattern library, My project ideas, Yarn materials, Symbol Database, Tool Manual, Theory & Foundation.
- Custom spaces can be created.
- Library items can include notes and multiple PDFs/photos.
- Deletion lives inside edit modal Danger Zone, not as a visible card-level delete action.
- Legacy tutorials migrate to `Personal References (legacy)` only if user data exists.

Yarn Stash:

- Inventory, shopping cart, budget settings, purchase history, and buy-list integration live in the market/stash area.
- Buy List and Budget are separate from Project Toolkit categories.

## Supabase And Cloud Beta

Implemented but not automatically active:

- Email/password auth UI
- Local-to-cloud migration
- Debounced cloud autosave after sign-in
- Cloud asset restore to IndexedDB
- Private Storage pathing
- RLS-owned project/settings/chart/tool tables
- Review-first chart upload/cell editor/generated pattern pipeline
- Account deletion Edge Function

Important files:

- `BETA_RELEASE.md`
- `src/cloud/bootstrap.js`
- `src/cloud/supabase-client.ts`
- `api/config.js`
- `supabase/migrations/202606200001_private_beta.sql`
- `supabase/functions/analyze-chart/index.ts`
- `supabase/functions/delete-account/index.ts`

Current status:

- Cloud features require Supabase project credentials and deployment.
- `api/config.js` returns public Supabase config only.
- Do not put `OPENAI_API_KEY` or service-role keys in Vite/browser/Vercel frontend variables.
- Server chart analysis is authenticated and review-first; it should never silently confirm uncertain cells.

## PWA And Cache Notes

PWA files:

- `public/manifest.json`
- `manifest.webmanifest`
- `service-worker.js`
- `public/service-worker.js`
- `sw.js`
- icons in `public/icons`
- root icons and favicons

Important cache notes:

- Root `index.html` currently references classic assets and shared calculation assets with `v=75-shared-calculations`.
- `scripts/copy-static.mjs` injects classic scripts with asset version `75-shared-calculations` if missing after Vite build. If stale production behavior appears, check this version path carefully.
- `service-worker.js` uses cache name `yarncha-shell-v61`.
- `public/service-worker.js` uses cache name `yarncha-shell-v46` and older asset urls. Treat this as legacy unless deliberately updated.
- Cache issues should be verified before assuming code regression, but do not overfocus on cache when incognito and versioned URLs reproduce a render bug.

## Tests And NPM Scripts

Current scripts from `package.json`:

- `npm run dev`
  - Starts Vite dev server on `0.0.0.0:4183`.
  - In restricted sandboxes this may fail to bind. Use `-- --host 127.0.0.1 --port 4183` when needed.
- `npm run build`
  - Runs Vite production build and `scripts/copy-static.mjs`.
  - Run before deployment or after broad UI/runtime changes.
- `npm run preview`
  - Serves the Vite production preview on `0.0.0.0:4183`.
- `npm run start`
  - Alias for Vite dev server.
- `npm run start:4184`
  - Static Python server on port 4184. Useful for classic local preview only.
- `npm run start:5173`
  - Static Python server on port 5173. Useful when 4183 is occupied.
- `npm run test:calculators`
  - Runs the calculator engine regression cases through the shared calculation layer and compatibility wrapper.
  - Use after any calculator, shared formula, tool result, or engine wrapper change.
  - Failures usually mean formula output drift, broken shared-layer loading, or a wrapper mapping regression.
- `npm run test:project-setup-calculations`
  - Checks the shared calculation registry, Project Setup field contracts, Flow Mode delegation, friendly setup copy, and repeat parsing hooks.
  - Use after changing Project Setup, Flow Mode planning, shared calculation modules, or calculator load order.
  - Failures usually mean formula duplication returned, a required shared module disappeared, or Project Setup stopped saving an expected field.
- `npm run test:project-editor`
  - Checks project editor/header/fit-check workflow contracts.
  - Use after changing project modals, headers, covers, fit check, or responsive project layout.
  - Failures usually mean a required workflow control or layout class disappeared.
- `npm run test:symbols`
  - Checks Symbol Database normalization, search, audit metadata, symbol icons, and important source-backed records.
  - Use after editing `symbol-database.js` or symbol rendering.
  - Failures usually mean invalid symbol data, missing metadata, or unsafe review status.
- `npm run test:symbol-audit`
  - Runs developer audit checks for duplicate abbreviations, review state, source references, and craft/icon mismatches.
  - Use after source/audit changes to symbol records.
- `npm run test:symbol-editor`
  - Checks beginner symbol edit UI, uploaded symbol picture behavior, mobile symbol layout, and hidden advanced fields.
  - Use after changing symbol edit forms or symbol picture storage.
- `npm run test:symbol-learning`
  - Checks local learning records, dedupe, Symbol Database edit sync, Flow Mode correction controls, backup/export learning data, and removal of the visible Symbol Learning Library summary.
  - Use after touching symbol learning, backup/import, or Flow Mode corrections.
- `npm run test:themes`
  - Checks all eight theme palettes, dark/light contrast, Sky Blessing, English-only theme UI, gallery card behavior, and danger button contrast.
  - Use after theme, settings appearance, or design token changes.
- `npm run test:flow-mode`
  - Checks Flow Mode structure, Project Setup UI, chart/reader state, OCR review pieces, OG/Flow placement, annotation toolbar contracts, attachment chip UI, friendly copy, read aloud, mobile layout classes, and cloud panel removal.
  - Use after changing Project Chart, OG Mode, Flow Mode, OCR, annotation toolbar, chart attachments, or project setup.
- `npm run test:voice`
  - Checks intent matching, aliases, fuzzy row wording, confidence thresholds, debug output, and Flow Mode read-row routing.
  - Use after changing voice commands or read aloud.
- `npm run test:navigation`
  - Checks global page ids, mobile/desktop nav, project card opening, project tabs, and stable internal nav behavior.
  - Use after any navigation, layout overlay, project card, route, or tab change.
- `npm run test:settings`
  - Checks Settings grouping, Danger Zone, account deletion wording, footer, and modal self-healing.
  - Use after settings or account/sync changes.
- `npm run test:library`
  - Checks Library delete behavior and hidden card-level destructive actions.
  - Use after library card/modal/delete changes.

Missing script note:

- `npm run test:project-setup-calculations` is not present in the current `package.json`. The current branch's Project Setup coverage lives in `npm run test:flow-mode`. If a future branch adds a standalone project setup calculation contract, update this section and the developer checklist.

Suggested full local verification:

```bash
npm run test:calculators
npm run test:project-editor
npm run test:symbols
npm run test:symbol-audit
npm run test:symbol-editor
npm run test:symbol-learning
npm run test:themes
npm run test:flow-mode
npm run test:voice
npm run test:navigation
npm run test:settings
npm run test:library
npm run build
```

## Developer Workflow Checklist

Before changes:

```bash
git branch --show-current
git status
git log --oneline --decorate -30
git diff main...HEAD
git grep -n '<<<<<<[<]\|======[=]\|>>>>>>[>]'
python3 -m json.tool package.json >/dev/null
npm install
```

During changes:

- Keep edits scoped.
- Preserve user data structures unless migrating intentionally.
- Prefer stable ids over UI labels.
- Do not use translated text as navigation/page keys.
- Do not merge large feature branches raw when there has been conflict history. Cherry-pick or reapply intentionally.
- Update `DEVELOPMENT.md` when structure, storage, features, scripts, tests, deployment, or maintenance constraints change.

After changes:

```bash
git grep -n '<<<<<<[<]\|======[=]\|>>>>>>[>]'
python3 -m json.tool package.json >/dev/null
npm run build
```

Run relevant tests:

```bash
npm run test:flow-mode
npm run test:navigation
npm run test:settings
npm run test:library
npm run test:voice
npm run test:themes
npm run test:calculators
```

If a future branch has a standalone project setup calculation script:

```bash
npm run test:project-setup-calculations
```

Deployment flow:

```bash
git status
git diff --check
npm run build
git push origin BRANCH_NAME
```

Then:

- Verify Vercel preview.
- Manually smoke test mobile and desktop.
- Merge to `main` only after local tests and preview pass.
- Redeploy production from `main`.
- If stale behavior appears, redeploy without cache and verify service worker/cache version.

## Manual Browser Smoke Checklist

Desktop:

- Today loads.
- Projects loads.
- Clicking a project opens detail.
- Project tabs switch: Track, Chart, Project, Assistant.
- Chart tab shows OG/Flow selector inside the Project Chart card.
- OG Mode upload, attachment chip preview, annotation toolbar, row mask, zoom, row counter, and voice button are usable.
- Flow Mode shows Project Setup, Reading Progress, Voice Assistant, and Advanced tools in one aligned workflow.
- Library loads, Symbol Database opens, symbol edit modal fits.
- Tools loads and calculator result actions work.
- Settings loads, theme gallery cards select by click and keyboard, Danger Zone is separated.
- Console has no runtime errors.
- Network has no missing root assets.

Mobile, especially 390 px:

- No horizontal scroll.
- Bottom nav does not cover chart tools, attachment chips, row counter, or Flow Mode controls.
- All tappable controls are at least 44 px high.
- Modals fit within viewport.
- Attachment chip filename truncates without overflow and remove button remains tappable.
- Annotation toolbar scrolls horizontally and tool selection works without re-rendering the project.
- Flow Mode project setup form is one column and save status is visible.
- Theme cards have equal visual rhythm and active state is obvious.

## Known Limitations And Risks

Local-first:

- Data is browser/device-specific unless manually backed up or synced through configured cloud beta.
- Clearing browser data can remove local state and IndexedDB assets.

Backend/cloud:

- Supabase private beta is implemented but not automatically active.
- Cloud release requires migrations, environment variables, deployed Edge Functions, and manual security testing.
- AI chart analysis needs representative pattern testing before confidence labels can be trusted.

Flow Mode:

- Local chart recognition is heuristic and review-first.
- Current project setup calculations are planning estimates.
- OCR and scanned row text must be reviewed by the user.
- Read aloud should not speak uncertain rows as instructions.

PWA/cache:

- Multiple service worker files exist and cache versions differ.
- Stale app shell issues can happen after deployment.
- Confirm actual loaded asset versions when debugging production mismatch.

Calculators:

- Some calculator formulas are audited as exact, some estimate-only, and some risky/experimental.
- Read `CALCULATOR_AUDIT.md` before claiming calculator accuracy or changing formulas.

Layout:

- The app has several accumulated responsive layers in `styles.css`.
- Avoid broad layout rewrites unless visual testing is available.
- Test Project Chart / Flow Mode / Settings / Symbol Database on both mobile and desktop after layout changes.

## Recent Changes

Recent major work represented in the current codebase:

- Stable main restored after a bad raw Flow Mode merge.
- Flow Mode was safely re-applied through recovery work rather than another raw branch merge.
- Project Chart card now contains the OG Mode / Flow Mode selector.
- Flow Mode is kept inside Project -> Chart and removed from global navigation.
- OG Mode analysis/AI panels were removed from the manual chart workspace.
- Attachment UI was redesigned as compact uploaded chart chips.
- Annotation toolbar uses stable internal tool ids and delegated click handling.
- Touch tool uses a touch/finger-style tool concept and does not draw or erase.
- OCR/PDF pattern source review was added with written, visual, and mixed workspace routing.
- Flow Mode copy was rewritten to sound like a craft assistant rather than developer tooling.
- Project Setup collects pattern details and stores shared setup/calculation data on the project.
- Shared calculation modules were added under `src/calculations/` so Project Setup, Toolkit calculators, and Flow Mode can use one formula source.
- `calculator-engine.js` now preserves the existing Toolkit API as a wrapper over `window.YarnchaCalculations`.
- `scripts/copy-static.mjs` now copies shared calculation/data files into production `dist` builds.
- `test:project-setup-calculations` now verifies shared calculation module presence and Flow Mode delegation.
- Flow Mode read aloud, voice settings, and intent matching were improved.
- Symbol Database edits merge with local symbol learning behind the scenes.
- Visible Symbol Learning Library summary was removed from Library.
- Theme gallery was simplified into clickable visual cards; Sky Blessing replaced Morning Orchard.
- Dark/light theme contrast and danger button contrast are covered by theme tests.
- Project Setup calculation behavior is covered by both `test:flow-mode` and `test:project-setup-calculations`.

Documentation-only update:

- This `DEVELOPMENT.md` was refreshed on 2026-07-01 after inspecting branch status, recent git history, package scripts, app/runtime files, tests, scripts, config, cloud, OCR, Symbol Database, PWA, and supporting audit docs.
