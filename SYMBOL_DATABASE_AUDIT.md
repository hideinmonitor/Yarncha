# Yarncha Symbol Database Audit

Audit date: 2026-06-21

## Result

- Original records reviewed: 102
- Retained audited records: 88
- Duplicate alias records removed: 14
- High-confidence glyph records: 46
- Fully confirmed records: 32
- Records still marked To Be Confirmed: 56
- Records shown as legend-specific rather than with an invented glyph: 29
- Unrelated confirmed SVG duplicates: 0
- Craft-family mismatches: 0
- Intentional shared glyphs: 1 family (CYC 3-hdc cluster / puff / bobble)

The difference between high-confidence glyphs and fully confirmed records is deliberate. A glyph can be supported by a source while its Chinese name, publication-specific abbreviation, or complete metadata still requires review.

Source classification: 25 user-reference matches, 19 CYC crochet/knit records, 4 common-knitting records, and 40 context or terminology records that still require a publication legend.

## Primary Evidence

- User-provided Chinese/Japanese-style knitting and crochet reference sheets: IMG_4166 through IMG_4176.
- [Craft Yarn Council Crochet Chart Symbols](https://www.craftyarncouncil.com/standards/crochet-chart-symbols)
- [Craft Yarn Council Knit Chart Symbols](https://www.craftyarncouncil.com/standards/knit-chart-symbols)
- [Craft Yarn Council Knitting Abbreviations](https://www.craftyarncouncil.com/knit.html)
- [Vogue Knitting: Reading Charts](https://www.vogueknitting.com/pattern-help/how-to/pattern-reading/reading-charts/)
- [Interweave: Understanding Cable Chart Symbols](https://www.interweave.com/article/knitting/understanding-cable-chart-symbols/)
- [Tin Can Knits: How to Read a Knitting Chart](https://blog.tincanknits.com/2014/06/06/how-to-read-a-knitting-chart/)

## Important Corrections

- Removed duplicate Yarn Over / Eyelet aliases and duplicate Shared-craft stitch records.
- Split 3/3 cable SVGs from 2/2 cable SVGs so stitch width is represented correctly.
- Kept left/right cable direction and purl-cross variants distinct.
- Replaced invented puff and bobble marks with CYC's intentionally shared 3-hdc family glyph.
- Kept popcorn, shell, picot, cluster, front-post, and back-post glyphs distinct.
- Replaced unsupported medium/low-confidence stitch glyphs with an explicit legend-specific state rather than a fabricated chart mark.
- Added `sourceName`, `sourceUrl`, `lastVerifiedDate`, and `confidence` to every record.
- Enforced: Medium or Low confidence always means `To Be Confirmed`.

## Remaining Review

Tunisian, brioche, double-knitting, publication-specific cable, and several special-stitch entries do not have a sufficiently universal glyph in the reviewed sources. Yarncha retains their searchable terminology but does not present an invented chart symbol. Their pattern legend remains authoritative.
