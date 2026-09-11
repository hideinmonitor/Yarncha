# Yarncha design system

Yarncha uses the visual identity established in commit `74797df` while retaining the current application structure. Shared visual rules live at the start of `styles.css`; feature CSS should consume those tokens instead of defining a parallel card, control, typography, or page-width system.

## Identity

The default Creamy Vanilla theme uses the original six-colour identity:

| Role | Value |
| --- | --- |
| Page background | `#F6F0E6` |
| Primary surface | `#FFFAF3` |
| Primary text | `#463D35` |
| Primary action | `#5F6958` |
| Accent | `#B7785F` |
| Highlight | `#C4A269` |

`Fraunces` is the brand, display, and heading family. `DM Sans` is the body and UI family. The Yarncha wordmark has its own `--font-brand` token and remains Fraunces at 21px/700 in every theme, style, and display mode.

## Token scales

- Spacing: 4, 8, 12, 16, 24, 32, and 48px through `--spacing-2xs` to `--spacing-2xl`.
- Type: `--text-page`, `--text-section`, `--text-card`, `--text-body`, `--text-ui`, and `--text-meta`.
- Radius: 8px small, 12px controls, 20px cards, and fully round for passive status chips.
- Controls: 48px actions, 44px utilities and icon buttons, 28px passive chips, and 20px icons.
- Width: 640px narrow content, 960px normal/dialog content, 1600px wide application content, and 100% full workspaces.
- Elevation: `--shadow-soft` for ordinary surfaces and `--shadow` for dialogs and elevated overlays.

## Component categories

Compact cards carry status or small tool content. Standard cards use `--card-padding`, `--radius-card`, the shared border, and the soft shadow. Feature cards may span more columns or use a stronger internal layout while retaining the same surface rules. Workspace panels can use the full wide content area and must not introduce a second page-width cap.

Primary actions are 48px high and use the sage action colour. Secondary actions use the supporting surface and shared border. Tertiary/text actions are transparent. Danger actions use the semantic danger tint and border. Utility and icon actions use the 44px target. Pills are reserved for passive tags, status, and selections with a clear semantic reason.

Text inputs, selects, and textareas use the 48px control height, 12px radius, 16px body type, semantic control border, and a shared focus ring. Checkboxes and radio controls keep their native compact visual size inside a 44px row.

## Layout and responsive rules

The top bar and active view share the same `--page-max-width` and `--page-padding`. Equivalent headings, sections, grids, and panels align to that edge. Project, toolkit, tool, library, and symbol grids use available space with `auto-fit` and a 20rem minimum card basis. At 760px and below these grids become one column, page gutters become 16px, card padding becomes 16px, and primary navigation becomes the five-item bottom bar.

Display mode changes colour mappings only. System light maps to Creamy Vanilla and system dark maps to the dark theme. The design-style preference may adjust the shared card padding, radii, and shadow tokens, but it must update the whole component family together.

## Intentional exceptions

Chart canvases, annotation handles, symbol artwork, palette swatches, preview thumbnails, progress geometry, and touchable grid cells keep dimensions required by their tools. The Yarncha wordmark preserves its historical 21px size. The symbol detail dialog uses the normal 960px content category because it contains a reference document; ordinary forms use the 640px category. Passive chips remain 28px high because they are labels rather than interactive targets.

## Contribution rules

Add a semantic token only when an existing role cannot express the need. Reuse the shared card, button, form, dialog, and width primitives before adding feature styles. Keep domain geometry in the feature section. Do not add theme-specific layout, typography, spacing, or radius values. The design-system contract test rejects duplicate declarations for the same selector, property, and media context.
