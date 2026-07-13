# Yarncha symbol SVG audit

Primary reference: `Untitled (Draft).pdf`. Knitting is on pages 1-5, Tunisian crochet on pages 6-11, and crochet on pages 12-17. Page numbers below are one-based PDF pages.

Yarncha has 385 searchable catalogue entries. Those entries intentionally share 80 geometry keys in the single `symbolSvgPaths` registry; equivalent meanings reuse one key rather than duplicating SVG markup. Sixty-eight semantic symbols are directly mapped to the supplied reference, including the V-stitch alias. Thirteen internal fallback or non-standard keys are retained but are not presented as reference-approved stitch symbols.

## Reference coverage

| Symbol | Current | Reference page | Action | Confidence |
|---|---|---:|---|---|
| `knit` | Incorrect direction | 1 | Rebuilt as horizontal knit mark | High |
| `purl` | Incorrect direction | 1 | Rebuilt as vertical purl mark | High |
| `yarn-over` | Exact | 1 | Unchanged | High |
| `knit-twisted` | Close | 1 | Retained normalized loop geometry | Medium |
| `purl-twisted` | Close | 1 | Retained normalized loop and purl bar | Medium |
| `increase-kfb` | Exact | 2 | Unchanged | High |
| `increase-left` | Exact | 2 | Unchanged | High |
| `increase-right` | Exact | 2 | Unchanged | High |
| `purl-increase` | Exact | 2 | Unchanged | High |
| `decrease-right` | Exact | 2 | Unchanged | High |
| `decrease-left` | Exact | 2 | Unchanged | High |
| `purl-decrease-right` | Exact | 2 | Unchanged | High |
| `purl-decrease-left` | Exact | 2 | Unchanged | High |
| `decrease-centred` | Exact | 2 | Unchanged | High |
| `cable-left`, `cable-right` | Exact | 5 | Unchanged; crossing order preserved | High |
| `cable-left-wide`, `cable-right-wide` | Exact | 5 | Unchanged 2-over-2 geometry | High |
| `cable-left-3-3`, `cable-right-3-3` | Exact | 5 | Unchanged 3-over-3 geometry | High |
| `cable-left-4-4`, `cable-right-4-4` | Exact | 5 | Unchanged 4-over-4 geometry | High |
| `cable-left-purl`, `cable-right-purl` | Exact | 5 | Unchanged purl-cross geometry | High |
| `tunisian-simple` | Close | 6 | Cell boundary normalized to allowed path geometry | High |
| `tunisian-purl` | Close | 7 | Cell boundary normalized to allowed path geometry | High |
| `tunisian-knit` | Close | 7 | Cell boundary normalized to allowed path geometry | High |
| `tunisian-reverse` | Close | 10 | Cell boundary normalized to allowed path geometry | High |
| `tunisian-full` | Close | 6 | Cell boundary normalized to allowed path geometry | High |
| `tunisian-double` | Close | 7 | Cell boundary normalized to allowed path geometry | High |
| `tunisian-slip` | Close | 8 | Cell boundary normalized to allowed path geometry | High |
| `tunisian-yarn-over` | Close | 6 | Retained source-specific chart-cell form | Medium |
| `tunisian-yarn-over-space` | Close | 6 | Retained source-specific chart-cell form | Medium |
| `tunisian-increase-1-3` | Close | 8 | Cell boundary normalized; three branches retained | High |
| `tunisian-decrease-2` | Close | 10 | Cell boundary normalized; two-to-one count retained | High |
| `tunisian-decrease-3` | Close | 10 | Cell boundary normalized; three-to-one count retained | High |
| `tunisian-decrease-4` | Close | 11 | Cell boundary normalized; four-to-one count retained | High |
| `tunisian-decrease-5` | Close | 11 | Cell boundary normalized; five-to-one count retained | High |
| `tunisian-cross-a`, `tunisian-cross-b` | Close | 9 | Cell boundaries normalized; over/under order retained | High |
| `tunisian-double-cross` | Close | 9 | Cell boundary normalized; wrap bars retained | High |
| `tunisian-cable-left-3` | Close | 10 | Cell boundary normalized; three crossing strands retained | High |
| `chain` | Exact | 16 | Unchanged oval | High |
| `slip-stitch-crochet` | Exact | 16 | Unchanged filled dot | High |
| `single-crochet` | Exact | 14 | Unchanged cross | High |
| `half-double-crochet` | Exact | 14 | Unchanged T | High |
| `double-crochet` | Exact | 16 | Unchanged one-wrap tall stitch | High |
| `treble-crochet` | Exact | 16 | Unchanged two-wrap tall stitch | High |
| `double-treble-crochet` | Exact | 16 | Unchanged three-wrap tall stitch | High |
| `single-crochet-increase` | Exact | 17 | Unchanged two-from-one count | High |
| `half-double-crochet-increase` | Exact | 17 | Unchanged two-from-one count | High |
| `double-crochet-increase` | Exact | 17 | Unchanged two-from-one count | High |
| `v-stitch` | Duplicate | 12 | Reuses `double-crochet-increase`; duplicate SVG removed | High |
| `single-crochet-decrease` | Exact | 17 | Unchanged two-to-one count | High |
| `half-double-crochet-decrease` | Exact | 17 | Unchanged two-to-one count | High |
| `double-crochet-decrease` | Exact | 17 | Unchanged two-to-one count | High |
| `front-loop` | Incorrect | 13 | Rebuilt as lower bowl | High |
| `back-loop` | Incorrect | 13 | Rebuilt as upper arch | High |
| `front-post` | Close | 15 | Unchanged front-hook geometry | High |
| `back-post` | Close | 15 | Unchanged back-hook geometry | High |
| `cluster`, `cluster-decrease` | Exact | 15 | Unchanged joined-stitch counts | High |
| `puff` | Exact | 15 | Unchanged enclosed-loop group | High |
| `popcorn` | Exact | 16 | Unchanged five-stitch closure | High |
| `shell` | Exact | 13 | Unchanged five-stitch fan | High |
| `y-stitch` | Exact | 12 | Unchanged stem, branches, and wrap bars | High |
| `crochet-cross` | Exact | 12 | Unchanged crossing order | High |
| `picot` | Exact | 13 | Unchanged three-loop group | High |

## Unsupported or non-standard internal keys

| Symbol | Current | Reference page | Action | Confidence |
|---|---|---:|---|---|
| `slip` | Common knitting shorthand | - | Retained; not promoted as PDF-verified | Medium |
| `double-yarn-over` | Common doubled circle | - | Retained; reference does not show a distinct mark | Medium |
| `increase` | Generic family fallback | - | Retained for compatibility only | Low |
| `decrease-joined` | Generic family fallback | - | Retained for compatibility only | Low |
| `cable-twisted` | Designer-dependent | - | Retained; detail page warns to check key | Low |
| `cable-cross` | Generic cable fallback | - | Retained for shared category rendering | Low |
| `cyc-hdc-cluster` | Published family mark | - | Retained as non-PDF CYC compatibility key | Medium |
| `bobble` | Family mark | - | Retained; exact form varies by pattern | Medium |
| `knit-bobble` | Family mark | - | Retained; exact form varies by pattern | Medium |
| `crochet-generic` | Internal fallback | - | Retained; never marked reference-approved | Low |
| `special-stitch` | Internal fallback | - | Retained for designer/custom symbols | Low |
| `chart-rule` | Non-stitch UI mark | - | Retained for chart instructions | Low |
| `legend-specific` | Non-stitch UI mark | - | Converted to allowed path geometry | Low |

## Totals

- Catalogue entries audited: 385
- Registry geometry keys: 80
- Reference-mapped semantic symbols: 68
- Exact matches retained: 41
- Minor geometry/compliance adjustments: 22
- Rebuilt semantic marks: 4
- Duplicate semantic mark consolidated: 1
- Missing SVGs for verified/common entries: 0
- Unsupported or internal fallback keys: 13

No raster images, embedded text, source branding, canvas drawing, filters, or base64 data are used. All library symbols render through Yarncha's shared `0 0 64 64` viewBox. Uploaded images and custom SVGs continue to use the existing validated custom-symbol path.
