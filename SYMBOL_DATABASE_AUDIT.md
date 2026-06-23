# Yarncha Symbol Database Final Audit

Audit date: 2026-06-23

## Scope

This pass reviewed the generated default symbol database in `symbol-database.js` and the SVG token registry used by `app.js`.

The audit treats the user-provided reference sheets as the primary chart-symbol references where an entry is already matched to those sheets:

- Knitting / crochet / cable / increase-decrease chart sheets: `IMG_4166` through `IMG_4176`
- Afghan / Tunisian crochet chart sheets: `IMG_4154` through `IMG_4165`

No new raw uploaded image files were present in the readable workspace during this pass, so the pass preserved and normalized the uploaded-reference matches already encoded in the database rather than inventing new matches.

## Evidence Used

- User-provided Chinese/Japanese-style knitting, crochet, cable, increase/decrease and stitch-symbol sheets: `IMG_4166` through `IMG_4176`
- User-provided Afghan/Tunisian crochet sheets: `IMG_4154` through `IMG_4165`
- [Craft Yarn Council Crochet Chart Symbols](https://www.craftyarncouncil.com/standards/crochet-chart-symbols)
- [Craft Yarn Council Knit Chart Symbols](https://www.craftyarncouncil.com/standards/knit-chart-symbols)
- [Craft Yarn Council Knitting Abbreviations](https://www.craftyarncouncil.com/standards/knitting-abbreviations)
- [Craft Yarn Council Crochet and Tunisian Abbreviations](https://www.craftyarncouncil.com/standards/crochet-abbreviations)
- [Vogue Knitting: Reading Charts](https://www.vogueknitting.com/pattern-help/how-to/pattern-reading/reading-charts/)
- [Interweave Knits: Reading Charts](https://www.interweave.com/article/knitting/reading-charts/)
- [Interweave: Understanding Cable Chart Symbols](https://www.interweave.com/article/knitting/understanding-cable-chart-symbols/)
- [Tin Can Knits: How to Read a Knitting Chart](https://blog.tincanknits.com/2014/06/06/how-to-read-a-knitting-chart/)
- [Purl Soho: Reading a Chart](https://www.purlsoho.com/create/reading-a-chart/)
- [Knit Picks: Lace Chart Reading](https://tutorials.knitpicks.com/wp-content/uploads/2009/12/charttutorial.pdf)
- Crochet Guild of America education resources
- Edie Eckman, `The Crochet Answer Book`
- [KnitterKnotter: Stitch guide and Abbreviations](https://knitterknotter.com/stitch-guide-and-abbreviations/)
- [TL Yarn Crafts: Beginner Tunisian Stitches](https://tlycblog.com/3-tunisian-crochet-stitches/)
- [TL Yarn Crafts: Tunisian Crochet Knit Stitch](https://tlycblog.com/how-to-crochet-the-tunisian-crochet-knit-stitch-video-tutorial/)

## Final Result

- Total entries reviewed: 101
- Entries by craft: 43 knitting, 32 crochet, 26 Tunisian crochet
- Entries matched to uploaded references: 60
- Entries now marked `Manually Verified`: 47
- Entries marked `To Be Confirmed`: 54
- High-confidence records: 58
- Medium-confidence records: 21
- Low-confidence records: 22
- Entries requiring manual review before Flow Mode use: 41
- Flow Mode-ready entries: 60
- Duplicate abbreviation warnings: 0
- Duplicate confirmed SVG symbol warnings: 0
- Craft-family SVG mismatches: 0
- Missing symbol types: 0

## Corrections Made

- Made uploaded chart references primary when an uploaded-reference match exists, then kept CYC, Vogue, Interweave, Purl Soho, Knit Picks, KnitterKnotter, TL Yarn Crafts, CGOA and Edie Eckman references as cross-checks.
- Changed verified uploaded-reference entries from generic `Confirmed` to `Manually Verified`.
- Normalized knitting bobble from ambiguous `Bobble` abbreviation to `MB`.
- Preserved crochet bobble as a searchable stitch entry with the CYC `bo` abbreviation alias and kept it unconfirmed because bobble/puff/cluster chart marks vary.
- Removed the remaining duplicate-abbreviation audit warning.
- Kept medium- and low-confidence entries as `To Be Confirmed`; none are presented as confirmed defaults.
- Kept unrelated confirmed entries from sharing SVG token IDs.
- Preserved dedicated Tunisian SVG token families and avoided regular knitting/crochet icon reuse for Tunisian chart cells.
- Added broader source references to every entry, including chart-reading and publisher-variation references rather than relying on one website.

## Conflict Handling

Several symbols are intentionally not forced into a fake universal standard:

- Cable notation varies by publisher, stitch span, front/back language, and whether purl/background stitches are drawn inside the cable.
- Crochet puff, bobble and cluster symbols vary by stitch count and closing method.
- Tunisian chart notation is especially publication-specific; Yarncha shows uploaded Afghan-chart cell style only where the encoded reference match is strong.
- Chart-reading rules are context guidance, not stitch glyphs.

When the checked references did not support a stable symbol, the entry remains searchable but uses `legend-specific`, `To Be Confirmed`, lower confidence and a variation note.

## Remaining Manual Review

The following groups still need direct human review against a specific pattern legend or future raw uploaded images:

- Knitting slip/lifted/KFB/PFB/SKP variants where symbols differ by chart family
- Generic lace decrease and paired shaping entries
- Generic cable-left/cable-right and purl/twisted/traveling cable entries
- Nupp, wrap, brioche and double-knitting symbols
- Crochet cluster increase/decrease, puff, bobble, V-stitch, Y-stitch and crossed tall stitches
- Tunisian TRS, TFS, yarn-over variants, honeycomb, smock, basketweave, generic lace and generic chart entries

Accuracy rule retained: if Yarncha cannot confidently verify a symbol against the uploaded reference match plus independent sources, it remains `To Be Confirmed`.
