# Symbol reference audit

Yarncha uses a shared `0 0 64 64` SVG viewBox. This audit traces stitch geometry only; source branding, text, numbers, borders, decorative circles, and instructional diagrams are excluded.

## Reference documents

- `01-05.pdf` - knitting index on pages 1-2; worked stitch examples on pages 3-14.
- `Printable-crochet-symbols.pdf` - crochet symbols on pages 1-2; page 3 is abbreviations only and was not traced.

## Corrections and additions

| Symbol key | Name | Reference | Page | Classification | Action |
|---|---|---:|---:|---|---|
| `slip` | Knitting slip stitch | 01-05.pdf | 9 | wrong direction | Replaced generic zigzag with the reference V-shaped slip mark. |
| `purl-decrease-right` | Right purl decrease | 01-05.pdf | 7 | missing detail | Moved the purl bar to the foot of the right-leaning decrease. |
| `purl-decrease-left` | Left purl decrease | 01-05.pdf | 7 | missing detail | Moved the purl bar to the foot of the left-leaning decrease. |
| `cable-left-4-4` | Four-over-four left cable | 01-05.pdf | 14 | missing entirely | Added eight-strand left crossing with explicit over/under order. |
| `cable-right-4-4` | Four-over-four right cable | 01-05.pdf | 14 | missing entirely | Added eight-strand right crossing with explicit over/under order. |
| `cluster` | Three-stitch crochet cluster | Printable-crochet-symbols.pdf | 2 | wrong stitch count | Normalized to three joined tall stitches. |
| `popcorn` | Five-double-crochet popcorn | Printable-crochet-symbols.pdf | 2 | wrong stitch count | Normalized to five stems and the reference closure loop. |
| `shell` | Five-double-crochet shell | Printable-crochet-symbols.pdf | 1 | missing detail | Normalized five stems, five top bars, and yarn-over bars. |
| `y-stitch` | Crochet Y stitch | Printable-crochet-symbols.pdf | 2 | missing detail | Added the stem and branch yarn-over bars. |

## Exact or close matches retained

| Reference | Pages | Symbol keys |
|---|---:|---|
| 01-05.pdf | 3-10 | `knit`, `purl`, `yarn-over`, `double-yarn-over`, `knit-twisted`, `purl-twisted`, `increase`, `increase-kfb`, `increase-left`, `increase-right`, `purl-increase`, `decrease-right`, `decrease-left`, `decrease-centred`, `decrease-joined` |
| 01-05.pdf | 12-14 | `cable-left`, `cable-right`, `cable-left-wide`, `cable-right-wide`, `cable-left-3-3`, `cable-right-3-3`, `cable-left-purl`, `cable-right-purl`, `cable-twisted`, `cable-cross` |
| Printable-crochet-symbols.pdf | 1 | `crochet-chain`, `crochet-slip`, `crochet-sc`, `crochet-hdc`, `crochet-dc`, `crochet-tr`, `crochet-dtr`, `chain`, `slip-stitch-crochet`, `single-crochet`, `half-double-crochet`, `double-crochet`, `treble-crochet`, `double-treble-crochet`, `single-crochet-increase`, `half-double-crochet-increase`, `double-crochet-increase`, `front-loop`, `back-loop`, `front-post`, `back-post`, `v-stitch` |
| Printable-crochet-symbols.pdf | 1-2 | `single-crochet-decrease`, `half-double-crochet-decrease`, `double-crochet-decrease`, `cluster-decrease`, `puff`, `cyc-hdc-cluster`, `bobble`, `crochet-cross`, `picot` |

## Not covered by the supplied references

The following existing registry entries were retained unchanged because neither supplied PDF provides an authoritative matching symbol: `tunisian-simple`, `tunisian-purl`, `tunisian-knit`, `tunisian-reverse`, `tunisian-full`, `tunisian-double`, `tunisian-slip`, `tunisian-yarn-over`, `tunisian-yarn-over-space`, `tunisian-increase-1-3`, `tunisian-decrease-2`, `tunisian-decrease-3`, `tunisian-decrease-4`, `tunisian-decrease-5`, `tunisian-cross-a`, `tunisian-cross-b`, `tunisian-double-cross`, `tunisian-cable-left-3`, `knit-bobble`, `crochet-generic`, `special-stitch`, `chart-rule`, and `legend-specific`.

These entries remain subject to their existing Yarncha verification and “check the pattern key” behavior. They were not promoted based on unrelated reference geometry.
