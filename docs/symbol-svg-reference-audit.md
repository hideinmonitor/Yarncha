# Symbol SVG reference audit

Primary visual reference: `Untitled (Draft).pdf`. All page numbers are one-based. Geometry is normalized to Yarncha's shared `0 0 64 64` viewBox and uses only approved vector primitives.

## Review summary

- 41 symbols reviewed in six batches of no more than eight symbols.
- 5 symbols rebuilt: twisted knit, twisted purl, left increase, right increase, and picot.
- 10 cable symbols adjusted to preserve the correct crossing order at small sizes.
- 24 symbols retained because their current geometry already matched the reference closely.
- 3 first-pass drawings were rejected and redrawn before approval: twisted knit, twisted purl, and picot.
- 2 registry symbols remain explicitly unsupported by this PDF: slip and lifted increase. Neither is treated as PDF-approved.
- 0 unresolved symbols in the PDF-approved review set; approved-symbol failure rate: 0%.

## Symbol-by-symbol review

| Symbol key | Reference | Previous | Final | Small-size clarity | Direction / count | Approved | Notes |
|---|---:|---|---|---|---|---|---|
| knit | 1 | Existing | Retained | Clear | Correct | Yes | Reference horizontal mark. |
| purl | 1 | Existing | Retained | Clear | Correct | Yes | Reference vertical mark. |
| yarn-over | 1 | Existing | Retained | Clear | Correct | Yes | Single open circle. |
| knit-twisted | 1 | Inaccurate | Rebuilt | Clear | Correct | Yes | Enclosed loop with balanced lower tails. |
| purl-twisted | 1 | Inaccurate | Rebuilt | Clear | Correct | Yes | Twisted loop plus purl bar. |
| slip | — | Existing | Unsupported | Clear | Not established | No | No unambiguous PDF match; requires a separate published standard. |
| front-loop | 13 | Existing | Retained | Clear | Correct | Yes | Lower bowl direction retained. |
| back-loop | 13 | Existing | Retained | Clear | Correct | Yes | Upper arch direction retained. |
| decrease-right | 2 | Existing | Retained | Clear | Correct | Yes | Right lean preserved. |
| decrease-left | 2 | Existing | Retained | Clear | Correct | Yes | Left lean preserved. |
| decrease-centred | 2 | Existing | Retained | Clear | Correct | Yes | Symmetric centred decrease. |
| purl-decrease-right | 2 | Existing | Retained | Clear | Correct | Yes | Lean and purl bar preserved. |
| purl-decrease-left | 2 | Existing | Retained | Clear | Correct | Yes | Lean and purl bar preserved. |
| increase-left | 2 | Wrong form | Rebuilt | Clear | Correct | Yes | Right anchor with left-leaning pickup stroke. |
| increase-right | 2 | Wrong form | Rebuilt | Clear | Correct | Yes | Left anchor with right-leaning pickup stroke. |
| lifted-increase | — | Existing | Unsupported | Clear | Not established | No | No unambiguous PDF match; requires a separate published standard. |
| cable-left | 5 | Crossing ambiguity | Adjusted | Clear | Correct | Yes | Explicit under-strand knockout. |
| cable-right | 5 | Crossing ambiguity | Adjusted | Clear | Correct | Yes | Explicit under-strand knockout. |
| cable-left-wide | 5 | Crossing ambiguity | Adjusted | Clear | Correct 2/2 | Yes | Two strands per side. |
| cable-right-wide | 5 | Crossing ambiguity | Adjusted | Clear | Correct 2/2 | Yes | Two strands per side. |
| cable-left-3-3 | 5 | Crossing ambiguity | Adjusted | Clear | Correct 3/3 | Yes | Three strands per side. |
| cable-right-3-3 | 5 | Crossing ambiguity | Adjusted | Clear | Correct 3/3 | Yes | Three strands per side. |
| cable-left-4-4 | 5 | Crossing ambiguity | Adjusted | Clear | Correct 4/4 | Yes | Four strands per side. |
| cable-right-4-4 | 5 | Crossing ambiguity | Adjusted | Clear | Correct 4/4 | Yes | Four strands per side. |
| cable-left-purl | 5 | Crossing ambiguity | Adjusted | Clear | Correct | Yes | Crossing plus purl bar. |
| cable-right-purl | 5 | Crossing ambiguity | Adjusted | Clear | Correct | Yes | Crossing plus purl bar. |
| chain | 16 | Existing | Retained | Clear | Correct | Yes | Open chain ellipse. |
| slip-stitch-crochet | 16 | Existing | Retained | Clear | Correct | Yes | Filled slip-stitch dot. |
| single-crochet | 14 | Existing | Retained | Clear | Correct | Yes | Cross form. |
| half-double-crochet | 14 | Existing | Retained | Clear | Correct | Yes | One crossbar. |
| double-crochet | 16 | Existing | Retained | Clear | Correct | Yes | One wrap. |
| treble-crochet | 16 | Existing | Retained | Clear | Correct | Yes | Two wraps. |
| double-treble-crochet | 16 | Existing | Retained | Clear | Correct | Yes | Three wraps. |
| single-crochet-increase | 17 | Existing | Retained | Clear | Correct | Yes | Two stitches from one base. |
| single-crochet-decrease | 17 | Existing | Retained | Clear | Correct | Yes | Two stitches joined at top. |
| shell | 13 | Existing | Retained | Clear | Correct 5 | Yes | Five-stitch fan. |
| cluster | 15 | Existing | Retained | Clear | Correct 3 | Yes | Three joined stitches. |
| popcorn | 16 | Existing | Retained | Clear | Correct 5 | Yes | Five-stitch group. |
| bobble | 16 | Existing | Retained | Clear | Correct | Yes | Compact grouped form. |
| picot | 13 | Placeholder-like | Rebuilt | Clear | Correct | Yes | Top chain loop and two dog-tooth side loops. |
| y-stitch | 12 | Existing | Retained | Clear | Correct | Yes | One stem and two branches. |

## Rendering and regression coverage

The deterministic fixture at `tests/fixtures/approved-symbol-render-matrix.svg` renders 16 representative approved symbols, including basics, decreases, cables, crochet stitches, and compound groups. The fixture contract checks the shared viewBox, exact fixture membership, and absence of raster images, embedded text, branding, filters, or foreign content.

The registry contract additionally verifies every approved database symbol resolves without `Check key`, cable directions and stitch counts remain distinct, shell/cluster/popcorn counts match their labels, detail pages use the same renderer, and mobile symbol cards remain bounded.

## Manual comparison method

Each review batch placed the PDF crop, previous SVG, and revised SVG side-by-side at 24, 40, 64, and 128 pixels. The six retained comparison screenshots are stored outside the repository in `/private/tmp/yarncha-symbol-svg-audit/` so production source is not burdened with binary review artifacts.
