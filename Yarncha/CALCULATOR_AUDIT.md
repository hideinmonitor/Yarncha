# Yarncha Calculator Accuracy Audit

Audit date: 2026-06-20

Scope: current `calculator-engine.js`, calculator UI and result actions in `app.js`, the existing automated tests, and the visible Tools page. No calculator code was changed during this audit.

## Executive result

Yarncha currently exposes 28 tool definitions plus a Project Rendering Studio entry that groups three of those tools. Twenty-five tools use the shared calculator engine, Size Reference is static data, and Budget is implemented in the legacy UI calculation path.

- Safe exact math: Unit Converter, Repeat Calculator, Basic Calculator, the core gauge ratio in Gauge / Swatch, and Yarn Leftover length arithmetic.
- Safe only with stated inputs/assumptions: Cast On, Blocking with measured before/after values, Blanket stitch/row counts, C2C block counts, Raglan increase-round count, and Grid/Stripe after integer validation is fixed.
- Estimate-only: Hat, Sock, Garment Resizer, Yarn Estimator, Granny Square, Circle, Blocking projection, Yarn Weight, and Size Reference.
- Hide or label experimental until corrected: Sleeve shaping, Increase / Decrease distribution, Amigurumi oval, Color Pooling, Yarn Substitution compatibility score, and Needle / Hook Adjustment size recommendation.

The current UI confidence percentages are not source-derived reliability scores. They should not be presented as objective confidence until a documented scoring method exists.

## Sources checked

1. [Craft Yarn Council, Standard Yarn Weight System](https://www.craftyarncouncil.com/standards/yarn-weight-system): category gauge and tool ranges are guidelines, not guarantees.
2. [Craft Yarn Council, How to Measure Wraps Per Inch](https://media.craftyarncouncil.com/standards/how-measure-wraps-inch-wpi): WPI ranges overlap and WPI is subjective; users should measure several places and swatch.
3. [Craft Yarn Council, Standard Body Measurements/Sizing](https://www.craftyarncouncil.com/standards/body-sizing): body measurements and ease guidance; fit still depends on the pattern and intended ease.
4. [Craft Yarn Council, Reading Instructions & Other Basics](https://media.craftyarncouncil.com/read_instructions.html): gauge is stitches and rows per inch, and a 4-inch swatch is recommended.
5. [Craft Yarn Council, beginner design guidance](https://www.craftyarncouncil.com/diy.html): stitch count from width and gauge is `width / gauge span * stitches in span`.

No reliable source is documented in the code for the app's hat-depth ratios, sock toe-start percentage, needle/hook millimetre thresholds, yarn safety percentages, yarn-substitution score, cone/oval shaping, or pooling stability labels.

## Current implementation map

All engine functions are in `calculator-engine.js`. Tool definitions, forms, result persistence, and actions are in `app.js`.

| Tool | Category / scope | Function | Inputs | Main outputs | Result actions |
|---|---|---|---|---|---|
| Cast On Calculator | Knitting | `castOnCalculator` | width, gauge, gauge span, repeat multiple, edge stitches | raw and usable cast-on | Copy, Notes, Project, Idea |
| Sock Calculator | Knitting | `sockCalculator` | foot circumference/length, stitch gauge, ease | cast-on, heel stitches, toe-start length | Standard actions |
| Gauge / Swatch Calculator | Shared | `gaugeSwatchAdapter` | pattern/user stitch and row gauges, original stitches/rows | exact ratios, rounded stitches/rows, size percentages | Standard actions |
| Increase / Decrease Calculator | Shared | `increaseDecreasePlanner` | current, desired, row | change count, rough interval, remainder | Standard actions |
| Yarn Estimator | Shared | `yarnEstimator` | project kind, length/weight per skein, pattern amount, modification, owned skeins | yarn, total skeins, buy count, leftover, weight | Standard + Buy List |
| Pattern / Garment Resizer | Shared | `garmentSectionResizer` | original/desired count, repeat, three sections, symmetry flags | resized section split | Standard actions |
| Circle Calculator | Crochet/Tunisian | `flatCircleCalculator` | starting stitches, rounds, stitch type | round sequence and final count | Standard actions |
| Amigurumi Shape Guide | Crochet/Tunisian | `amigurumiShapeGuide` | shape, base stitches, increase/straight rounds, chain length | round sequence | Standard actions |
| Granny Square Planner | Crochet | `grannySquarePlanner` | target square size, growth/round, join allowance, blanket dimensions | rounds, rows/columns, square count | Standard actions |
| C2C Blanket Calculator | Crochet/Tunisian | `c2cBlanketCalculator` | width, height, block size, optional yarn/block | diagonal sections, blocks, yarn | Standard actions |
| Hat / Beanie Calculator | Shared | `hatBeanie` | head circumference, stitch gauge, ease, style | cast-on, crown diameter, depth | Standard actions |
| Sleeve Calculator | Shared | `sleeveCalculator` | start/end stitches, available rows | stitch change and shaping interval | Standard actions |
| Raglan Calculator | Shared | `raglanCalculator` | neck/target stitches, increase/round | increase rounds, final count, overshoot | Standard actions |
| Blanket Calculator | Shared | `blanketCalculator` | dimensions, stitch/row gauge, yarn per 10x10 | stitches, rows, yarn | Standard + Buy List |
| Grid Generator | Shared | `gridGenerator` | width/height cells, craft, symbol set, colours | columns, rows, cells | Standard actions |
| Stripe Generator | Shared | `stripeGenerator` | direction, total rows/positions, colours | one even allocation sequence | Standard actions |
| Color Pooling Planner | Shared | `colorPoolingPlanner` | colour-repeat length, stitches/repeat, row width | shift and heuristic stability label | Standard actions |
| Blocking Calculator | Shared | `blockingCalculator` | before dimensions, after dimensions or growth percent | final dimensions and percentage change | Standard actions |
| Unit Converter | Shared | `unitConvert` | amount, From, To | converted value | Standard actions |
| Budget Calculator | Buy List/Budget | legacy branch in `calculateProjectTool` | price/ball, balls, supplies, item count, leftovers | yarn cost, total, cost/item, leftover value | Standard + Buy List |
| Repeat Calculator | Shared | `repeatCalculator` | total, repeat size, total edge stitches | full repeats, remainder | Standard actions |
| Row / Round Helper | Shared | `rowRoundHelper` | current, planned total, repeat interval | percentage, next checkpoint, rows left | Standard actions |
| Needle / Hook Adjustment | Shared | `needleHookAdjustment` | craft, current mm, target/current gauge | suggested mm size and direction | Standard actions |
| Yarn Substitution Helper | Shared | `yarnSubstitution` | pattern/substitute length per ball, balls, gauge difference | substitute balls, invented compatibility score | Standard + Buy List |
| Yarn Leftover Estimator | Shared | `yarnLeftoverEstimator` | leftover weight, original weight and length | estimated length, percentage, project suggestions | Standard actions |
| Yarn Weight Converter | Shared | `yarnWeightConverter` | WPI or ball weight/length | category, CYC number, WPI/tool ranges | Standard actions |
| Basic Calculator | Shared | `basicCalculator` | arithmetic expression | numeric result | Copy, Notes |
| Size Reference | Shared/static | `SIZE_REFERENCE` data | size label | body ranges | Display/reference only |

“Standard actions” means Copy Result, Save to Notes, Link to Project, Link to Idea, and Save as Project Idea after a result is generated. Buy List is only enabled by the tool definition for Yarn Estimator, Blanket, Yarn Substitution, and Budget.

## Critical and high-priority findings

1. **Yarn Weight misclassifies out-of-range WPI.** A value of 50 WPI falls through to Jumbo. CYC lists 30–40+ as Lace. The app's WPI bands also differ materially from CYC and remove the official overlaps.
2. **Sleeve interval math is wrong for ordinary paired shaping.** Going from 40 to 64 stitches changes 24 stitches, usually 12 paired increase events. Over 96 rows that is every 8 rows, but Yarncha reports every 4 rows.
3. **Amigurumi oval math contradicts its own instruction.** For chain 8 and six total end increases, it returns 28 stitches (`16 + 6*2`) instead of 22 if six is truly the total across both ends.
4. **Increase / Decrease Planner does not generate an even executable distribution.** `floor(current/change)` and `current % change` are not enough to place increases/decreases correctly. It gives superficially plausible but unusable guidance for large changes.
5. **Color Pooling ignores colour-repeat length.** Inputs of 10 and 1000 produce the same answer. Its “stable/diagonal/unstable” result therefore cannot support a pooling decision.
6. **Yarn Substitution's compatibility score is invented and potentially misleading.** It ignores fibre, construction, elasticity, density, drape, and negative gauge differences. A negative difference is silently converted to zero and can return 100/100.
7. **Impossible values are not rejected consistently.** A 150% negative ease returns negative cast-on counts; a -200% yarn modification returns negative yarn and skeins; circle negatives silently become one stitch/round.
8. **Needle / Hook Adjustment uses unsourced thresholds.** Direction is standard craft advice, but a given gauge difference does not reliably map to a fixed 0.25–1.5 mm change. At exact gauge it incorrectly labels the direction “smaller tool.”
9. **Grid integer consistency is broken.** Width 2.4 and height 2.4 return 2 columns, 2 rows, but 6 cells.
10. **Basic percentage semantics are misleading.** `100+10%` becomes `100 + 0.1 = 100.1`, not the consumer-calculator expectation of 110.

## Formula and safety audit

| Calculator | Formula source | Confidence | Precision | Problems found | Fix needed | Safe to use? |
|---|---|---|---|---|---|---|
| Unit Converter | Exact SI/imperial factors | High | 4 decimals | No stitch/row gauge conversion despite UI wording; blank becomes zero | Clarify scope; add explicit required validation | Yes for listed compatible units |
| Basic Calculator | Arithmetic precedence | High | 6 decimals | `%` semantics surprising; division by zero only caught after evaluation | Define percent behavior or remove `%` | Yes except `%` |
| Repeat Calculator | Integer division/modulo | High | Whole counts | Edge means total edge stitches, not per side; label must say so | Clarify label; integer/min validation | Yes |
| Gauge / Swatch | Standard gauge proportion; CYC guidance | High for ratio | Exact ratios, rounded usable count | No repeat multiple in final rounding; all inputs assume same 10 cm span; exact raw result hidden | Show exact + usable rounded result; accept gauge spans | Yes with manual repeat adjustment |
| Cast On | Standard width × gauge / span | High for base count | Whole stitches, rounds up to repeat | “Edge” ambiguity; always rounds up; no ease input | Label total edge stitches; expose rounding policy | Yes with a real swatch |
| Yarn Leftover | Proportional length/weight | High | 0.1 unit | Allows >100% remaining; assumes identical dry density; suggestions are arbitrary by length | Warn if overweight; label length units | Yes for same yarn, weighed consistently |
| Blocking | Percentage change math | High measured / Low forecast | 0.01 | A user-entered growth percent is not a material prediction; one percent is applied to both axes | Separate measured and hypothetical modes | Yes for measured before/after; estimate otherwise |
| Raglan | Ceiling division | High for count / Low for fit | Whole rounds | Target below neck produces an increase plan with positive overshoot; no yoke depth/split | Reject wrong direction; label count-only | Yes only for known construction inputs |
| Blanket | Gauge arithmetic + measured yarn/area | High for counts / Medium yarn | Whole stitches/rows; 0.1 yarn | 20% buffer is unsourced; dimensions/units implicit; no stitch multiple/border | Make buffer editable and units explicit | Yes as swatch-based estimate |
| C2C Blanket | Rectangle block/diagonal arithmetic | Medium-High | Whole blocks | Construction conventions vary; yarn buffer fixed 15% | State C2C convention; editable buffer | Yes for the stated convention |
| Grid Generator | Basic integer grid | High | Whole cells | Decimal dimensions create inconsistent total | Require integers before multiplication | Not until decimal bug fixed |
| Stripe Generator | Quotient/remainder | High arithmetic | Whole positions | Creates one allocation, not a repeating stripe plan; zero-row colours possible | Reject colours > positions; rename output | Yes for simple allocation only |
| Hat / Beanie | Gauge proportion; circumference/π geometry; CYC measurement guidance | Medium | Whole cast-on, 0.01 dimensions | Depth ratios and 4-stitch multiple are unsourced; ease unbounded; no row gauge; “yardage” claimed in card but not output | Validate ease, source/label heuristics, remove yardage claim | Estimate only |
| Sock | Gauge proportion; common 10% negative-ease baseline | Medium-Low | Whole multiple of 4 | Heel half and 18%/4-unit toe start are construction-specific; no row gauge; ease unbounded | Select construction, validate ease, add row gauge | Estimate only |
| Sleeve | Source missing | Low | 0.01 rows | Wrong for paired shaping; no change-per-event input; no row gauge/length | Rebuild around shaping events and distribution | No; hide until fixed |
| Garment Resizer | Proportional section scaling | Medium arithmetic / Low design | Whole stitches | Original stitches barely affect result; shaping/rows/measurements ignored; nearest repeat can alter requested size | Label stitch-section scaler; add fit constraints later | Estimate only |
| Increase / Decrease | Source missing | Low | Whole interval | Not a complete even-distribution algorithm; impossible large changes allowed | Implement established distribution with event arity and generated sequence | No; hide until fixed |
| Circle | Common simple flat-circle baseline | Medium | Whole rounds | Starting count depends on stitch height/tension; negative input silently normalized; instruction wording is simplistic | Validate; presets by stitch type; mark baseline | Estimate only |
| Amigurumi | Source missing | Low | Whole rounds | Oval is wrong/ambiguous; cone is heuristic; sphere does not close to zero | Correct each shape separately and source patterns | No for oval/cone; cylinder baseline only |
| Granny Square | Measured growth arithmetic | Medium | Whole squares/rounds | Join allowance semantics unclear; allowance > target gives oversized result | Define whether allowance adds per join or per motif; validate | Estimate only |
| Color Pooling | Source missing | Low | Numeric modulo | Ignores colour-repeat length and tension sequence; unsupported stability labels | Replace with swatch-derived colour segment model | No; experimental only |
| Yarn Estimator | User-supplied pattern amount × adjustment × buffer | Medium | 0.1 yarn; whole skeins | Safety margins 12–20% unsourced; negative modifications allowed; no dye-lot warning; not a true estimator without pattern amount | Validate, editable buffer, dye-lot warning, transparent units | Estimate only; buying needs review |
| Yarn Substitution | Length arithmetic plus invented score | Low | Whole balls | Score has no reliable basis; negative gauge ignored; core substitution properties omitted | Remove score; compare total length and require swatch/fibre review | Balls math only; score unsafe |
| Yarn Weight Converter | CYC category/WPI guidance | Low in current code | Category | Bands disagree with CYC, overlaps collapsed, >range fallback is reversed; length/100g thresholds unsourced; DK example is questionable | Replace with official overlapping guidance; return uncertain matches; reject out-of-range | No until fixed |
| Needle / Hook Adjustment | CYC direction guidance; size shift source missing | Low | 0.25 mm | Fixed threshold mapping unsupported; exact gauge says smaller; size clamp hides out-of-range | Keep direction only; require re-swatch; remove faux precision | Direction only; size unsafe |
| Row / Round Helper | Percentage and ceiling math | High | 0.1% | Current > total gives next checkpoint beyond project while showing 100%; no integer/min constraints | Warn or clamp current/checkpoint | Yes after simple validation |
| Yarn Budget | Basic currency arithmetic | High | 2 decimals | Hardcoded `$`; leftover value assumes “leftover” means full balls; not in shared engine/tests | Move to engine, label currency and leftover units | Yes for entered amounts |
| Size Reference | Source missing | Low | Ranges | Combined age/body/head/foot/arm ranges are not mapped to a cited standard and may not represent intended ease | Cite a standard and separate body from finished measurements | Reference only; verify independently |

## Test evidence

The existing suite contains 38 happy-path cases and all 38 passed. That proves the engine is internally consistent with its tests, not that all formulas are craft-correct. The suite has almost no invalid-input or boundary coverage, and the Stripe test asserts no numeric output.

| Tool/test | Input | Expected | Actual | Result |
|---|---|---|---|---|
| Unit | 10 cm to in | 3.937 in | 3.937 in | Pass |
| Unit incompatibility | 1 cm to g | Reject | Rejected | Pass |
| Gauge | 20→22 sts, 100 pattern sts | 110 usable before repeat adjustment | 110 | Pass |
| Cast On | 40 cm, 22 sts/10 cm, multiple 2, edge 2 | 88 | 88 | Pass |
| Repeat | 120 total, repeat 8, edge 4 | 14 repeats, remainder 4 | Same | Pass |
| Basic | `40+20/2` | 50 | 50 | Pass |
| Basic percent | `100+10%` | 110 in normal calculator UX | 100.1 | Fail |
| Hat impossible ease | 56 cm, 20 sts, 150% ease | Reject | -56 stitches | Fail |
| Sock impossible ease | 22 cm, 30 sts, 150% ease | Reject | -32 stitches | Fail |
| Sleeve paired shaping | 40→64 over 96 rows, +2/event | 12 events, every 8 rows | every 4 rows | Fail |
| Raglan wrong direction | neck 100, target 80, +8/round | Reject or decrease mode | 0 rounds, overshoot 20 | Fail |
| Circle invalid | -6 start, -2 rounds | Reject | silently becomes 1/1 | Fail |
| Amigurumi oval | chain 8, 6 total end increases | 22 if “6 total” | 28 | Fail |
| Granny invalid allowance | target 10, allowance 20 | Reject | 22-unit square | Fail |
| C2C | 120×150, block 2.5 | 48 increase, 12 plateau, 47 decrease | Same | Pass |
| Grid decimal | 2.4×2.4 cells | Reject or consistent rounded 2×2=4 | 2×2=6 | Fail |
| Stripe | 3 rows, 5 colours | Reject or omit unused colours | two zero-row colours | Fail |
| Pooling sensitivity | repeat length 10 vs 1000 | Different/uncertain result | Identical result | Fail |
| Blocking measured | 50×70 to 52×68 | +4%, -2.86% | Same | Pass |
| Yarn estimate buying | 650 m, 200 m/skein, no buffer | 4 minimum | 4 with standard profile when entered as custom amount | Pass with assumption |
| Yarn negative modification | 900, -200% | Reject | -1062 yarn, -5 skeins | Fail |
| Leftover overweight | 150g from 100g skein | Warn/reject | 150%, no warning | Fail |
| Substitution negative gauge | -20% difference | Handle signed difference or reject | treated as 0; score 100 | Fail |
| Yarn WPI | 50 WPI | Lace/out-of-chart guidance | Jumbo | Critical fail |
| Yarn WPI overlap | 14 WPI | Several possible CYC bands/uncertain | Sport only | Fail |
| Row helper overflow | row 150 of 100 | Warn/clamp | 100%, next checkpoint 160 | Fail |
| Budget | 4 balls × $10 + $5 | $45 | Formula returns $45 | Pass (legacy path) |
| Size Reference | adult range lookup | Source-backed range | Static range, source absent | Needs verification |

## Precision and input audit

- Decimal gauge: engine accepts decimals, but visible number inputs have no `step` metadata, so mobile/browser behavior may imply whole numbers.
- Stitch and row gauge: Gauge, Blanket, and Swatch use both; Hat, Sock, Sleeve and several fit tools omit row gauge where length shaping needs it.
- Units: Unit Converter handles cm/mm/m/in/yd and g/oz with exact factors. Calculator forms generally use unlabeled “units” and assume a 10 cm gauge span.
- Rounding: whole-stitch rounding is used, but the app often exposes only the rounded result rather than exact plus usable rounded result. Rounding direction is not always explained.
- Negative/zero/missing values: validation is inconsistent. Some functions reject them; others silently default, clamp, or produce impossible negatives.
- Very small/large values: no upper bounds or plausibility warnings exist. Very large grids/stitch counts can be generated without warning.
- Wrong unit combinations: Unit Converter rejects them correctly.
- Mobile: at 390 px there was no horizontal overflow and visible controls were 44 px high. Number inputs expose no `min`, `max`, `step`, or `inputmode`, weakening mobile validation and decimal UX.
- Runtime: no blocking console errors were observed on the Tools page during the audit.

## Warning audit

Warnings currently present in useful places include swatching reminders, fibre/blocking variability, stitch-pattern effects, and manual verification below an internal confidence threshold.

Warnings still needed:

- Yarn purchase results: “Buy extra from the same dye lot” and show the user-selected safety margin.
- Yarn Weight/WPI: “WPI is subjective and ranges overlap; measure several places and swatch.”
- Resizing: “Check original pattern shaping, construction, ease, edge stitches, and repeat multiples.”
- Hat/Sock/Sleeve/Raglan: clearly state the construction assumed.
- Yarn Substitution: state that total length alone cannot establish a safe substitute.
- Estimates: replace generic confidence percentages with labels such as Exact arithmetic, Swatch-based estimate, Construction-specific estimate, or Experimental.

## Recommended correction order

### Hide or disable first

1. Yarn Weight Converter (critical wrong WPI fallback and nonstandard bands).
2. Sleeve Calculator.
3. Amigurumi oval and cone modes.
4. Increase / Decrease Planner.
5. Color Pooling prediction.
6. Yarn Substitution compatibility score.
7. Needle / Hook exact size recommendation (retain only smaller/larger direction).

### Correct next

1. Centralize strict numeric validation: required, finite, unit-aware, integer where needed, sensible min/max.
2. Bound ease and percentage changes; reject results that imply negative dimensions/counts.
3. Fix Grid integer consistency and Stripe zero-row colours.
4. Add event size and executable spacing to sleeve and increase/decrease calculations.
5. Align Yarn Weight data to CYC guidance and represent overlapping categories honestly.
6. Make safety margins and rounding policy visible and editable.
7. Move Budget into the shared engine so it can be tested.

### Safe to retain with clearer labels

Unit, Basic without `%`, Repeat, Gauge ratio, Cast On, measured Blocking, Blanket count math, C2C block math, Raglan count math, Yarn Leftover arithmetic, and Row Helper after overflow validation.

## Unit-test plan

For every engine function, add table-driven tests for:

1. Standard known example with independently calculated expected output.
2. Decimal values and exact-versus-usable rounding.
3. Zero, negative, empty string, `null`, `undefined`, `NaN`, and infinity.
4. Minimum plausible and very large plausible values.
5. Invalid percentages (less than -100, over 100 where impossible).
6. Integer-only fields supplied as decimals.
7. Unit-family mismatch and round-trip conversion tolerances.
8. Repeat/edge/multiple compatibility.
9. Construction-specific event counts for sleeve, raglan, circle, sock and C2C.
10. Yarn-category boundary and overlap tests using the documented source table.
11. Serialization of formula, assumptions, units, warning, and rounded output.
12. Result actions: Copy, Notes, Project History, Project Idea, and Buy List payloads.

Specific regression tests required immediately:

- 50 WPI must never return Jumbo.
- 40→64 sleeve stitches with +2 per event over 96 rows must return 12 events/every 8 rows.
- 150% negative ease must be rejected.
- -200% yarn modification must be rejected.
- 2.4×2.4 grid must be rejected or produce internally consistent integer dimensions.
- Pooling result must not claim confidence when colour-repeat data is unused.
- Exact gauge match must say no tool change, not smaller.
- Current row greater than planned total must warn instead of generating a future checkpoint.

## Audit limitations

- This was a code, formula, automated test, and focused visible-UI audit. It did not validate every calculator against physical swatches.
- Many craft calculators cannot be universally exact because construction, stitch pattern, fibre, tension, blocking and intended ease vary.
- The audit found no source annotations in the engine itself. Where a formula is described as common practice, it still needs an explicit source and assumptions in product documentation before being marketed as reliable.
