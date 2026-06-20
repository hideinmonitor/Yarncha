# Yarncha Tool System Implementation Spec

This document describes the intended knitting and crochet calculator system for Yarncha. The current app is a static vanilla JavaScript app, so the live implementation is in `calculator-engine.js` and `app.js`. If Yarncha later moves to TypeScript/React, use this as the migration target.

## Feature Scope

The tool system covers four groups:

- Core tools: Gauge / Swatch Adapter, Needle / Hook Adjustment, Garment Resizer, Blocking Calculator, Size Reference.
- Project size tools: Hat / Beanie, Sock, Sleeve, Raglan, Blanket.
- Crochet tools: Amigurumi Shape Guide, Granny Square Size Planner, C2C Blanket Calculator.
- Project Rendering Studio: one module with Grid, Stripes, and Color Pooling tabs.
- Yarn tools: Yarn Estimator, Yarn Leftover Estimator, Yarn Substitution Helper, Yarn Weight Converter.

All tools should support metric and imperial inputs, show formulas, show intermediate calculations, save locally, copy/export text, and warn when manual verification is needed.

## User Flow

1. User opens Tools or Project -> Project -> Toolkit.
2. User chooses a category card.
3. User opens one tool.
4. User enters values in a mobile-friendly form.
5. User taps Calculate.
6. Result panel shows summary, confidence, warning, formula view, variables, intermediate values, and final outputs.
7. User may Copy, Save to Project Notes, Link to Project, Save as Project Idea, or Add to Buy List when relevant.
8. Saved results appear in Project -> Tools -> History.

## Validation Rules

- Required numeric inputs must be greater than 0.
- Optional numeric inputs may be blank only when the formula has a fallback.
- Gauge difference over 15% should warn.
- Tool adjustment over 18% gauge difference should recommend re-swatching.
- Resize ratios below 0.85 or above 1.15 should warn that shaping needs manual review.
- Unit conversion must reject incompatible families, such as grams to inches.
- C2C block size must be greater than 0.
- Yarn substitution should warn when weight, gauge, meterage, or fibre differs.
- Results should never imply guaranteed fit. Use confidence and notes.

## Reusable TypeScript Shapes

```ts
export type CraftType = "knitting" | "crochet" | "tunisian" | "shared";

export type CalculationResult<TOutputs> = {
  toolId: string;
  name: string;
  confidence: number;
  warning?: string;
  formula: string[];
  variables: Record<string, unknown>;
  intermediates: Record<string, unknown>;
  outputs: TOutputs;
  summary: string;
  notes: string[];
};

export function assertPositive(value: number, label: string): number {
  if (!Number.isFinite(value) || value <= 0) throw new Error(`${label} must be greater than 0.`);
  return value;
}

export function roundFinal(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function roundToMultiple(value: number, multiple: number): number {
  return Math.round(value / multiple) * multiple;
}
```

## Tool Formulas And Function Contracts

### Gauge / Swatch Adapter

Purpose: adjust stitch and row counts when user gauge differs from pattern gauge.

Inputs: pattern stitch gauge, pattern row gauge, user stitch gauge, user row gauge, original stitch count, original row count.

Outputs: adjusted stitches, adjusted rows, stitch difference %, row difference %, size ratio.

Formula:

```ts
adjustedStitches = originalStitches * userStitchGauge / patternStitchGauge;
adjustedRows = originalRows * userRowGauge / patternRowGauge;
```

Example: pattern 20 sts, user 22 sts, original 100 sts -> 110 sts.

Function:

```ts
export function calculateGaugeAdapter(input: GaugeAdapterInput): CalculationResult<GaugeAdapterOutput>;
```

### Needle / Hook Adjustment

Purpose: suggest whether to use a smaller or larger tool.

Logic:

- More stitches per 10 cm than target means fabric is too tight: go up.
- Fewer stitches per 10 cm than target means fabric is too loose: go down.
- 5-8% difference: 0.5 mm.
- 8-12% difference: 1.0 mm.
- 12-18% difference: 1.5 mm.
- Over 18%: re-swatch warning.

Function:

```ts
export function calculateToolAdjustment(input: ToolAdjustmentInput): CalculationResult<ToolAdjustmentOutput>;
```

### Garment Resizer

Purpose: resize garment sections while preserving proportions.

Formula:

```ts
ratio = targetMeasurement / originalMeasurement;
newStitchCount = originalStitchCount * ratio;
newRowCount = originalRowCount * ratio;
```

Yarncha currently also supports section resizing:

```ts
newSection = compatibleTotal * originalSection / originalSectionTotal;
```

Warn if ratio < 0.85 or > 1.15.

### Blocking Calculator

Purpose: measure fabric growth or shrinkage after blocking.

Formula:

```ts
widthChangePercent = (afterWidth - beforeWidth) / beforeWidth * 100;
lengthChangePercent = (afterLength - beforeLength) / beforeLength * 100;
areaChangePercent = (afterArea - beforeArea) / beforeArea * 100;
```

Example: 10 cm to 12 cm -> 20% growth.

### Size Reference

Purpose: provide non-medical, non-tailoring reference measurements for baby, child, adult, and accessories.

Outputs: head, chest, waist, hip, foot, sleeve, garment length reference ranges.

UI text: "Reference only. Always measure the wearer or a garment that fits."

### Hat / Beanie Calculator

Inputs: head circumference, ease %, stitch gauge, row gauge, style.

Formula:

```ts
targetCircumference = headCircumference * (1 - negativeEasePercent / 100);
castOn = targetCircumference * stitchGaugePer10cm / 10;
crownDiameter = headCircumference / Math.PI;
```

Round cast-on to a multiple of 4 or 8.

### Sock Calculator

Inputs: foot circumference, foot length, stitch gauge, row gauge, construction.

Formula:

```ts
sockCircumference = footCircumference * 0.9;
castOn = sockCircumference * stitchGaugePer10cm / 10;
footRows = footLength * rowGaugePer10cm / 10;
```

Round cast-on to a multiple of 4.

### Sleeve Calculator

Inputs: wrist stitches or circumference, upper arm stitches or circumference, sleeve rows/length.

Formula:

```ts
increaseStitches = upperArmStitches - wristStitches;
increaseRounds = increaseStitches / 2;
rowsBetween = totalRows / increaseRounds;
```

### Raglan Calculator

Inputs: neck stitches, target stitches, increase per round. Future full version should also accept neck circumference, bust, upper arm, gauge, and raglan line count.

Formula:

```ts
increaseRounds = ceil((targetStitches - neckStitches) / increasePerRound);
yokeStitches = neckStitches + increaseRounds * increasePerRound;
```

Future proportional allocation:

- Front 35%
- Back 35%
- Sleeve 15% each

### Blanket Calculator

Inputs: width, length, stitch gauge, row gauge, optional yarn per 10 x 10 area.

Formula:

```ts
stitches = width * stitchGaugePer10cm / 10;
rows = length * rowGaugePer10cm / 10;
estimatedYarn = areaUnits * yarnPer10x10 * allowance;
```

### Amigurumi Shape Guide

Shapes: round/sphere, oval, cone, cylinder.

Rules:

- Sphere: increase to widest round, work straight, mirror decreases.
- Cylinder: increase to base diameter, then work straight.
- Cone: increase gradually.
- Oval: work both sides of foundation chain and increase at both ends.

Circle base:

```ts
roundStitchCount = baseStitches * roundNumber;
```

### Granny Square Size Planner

Inputs: target square size, size per round, joining allowance, project width, project length.

Formula:

```ts
roundsNeeded = ceil((targetSquareSize - joiningAllowance) / sizePerRound);
squareSize = roundsNeeded * sizePerRound + joiningAllowance;
totalSquares = ceil(width / squareSize) * ceil(length / squareSize);
```

### C2C Blanket Calculator

Inputs: target width, target height, block size, yarn per block.

Formula:

```ts
widthBlocks = ceil(width / blockSize);
heightBlocks = ceil(height / blockSize);
increaseRows = min(widthBlocks, heightBlocks);
plateauRows = abs(widthBlocks - heightBlocks);
decreaseRows = min(widthBlocks, heightBlocks) - 1;
totalBlocks = widthBlocks * heightBlocks;
```

### Project Rendering Studio

One module with tabs:

- Grid: width cells, height cells, craft type, symbol set, colors.
- Stripes: direction, total rows/stitches, color count or sequence.
- Color Pooling: color repeat length, stitches per repeat, row width.

Color pooling baseline:

```ts
shiftPerRow = rowWidth % stitchesPerRepeat;
```

Zero shift predicts vertical pooling; small shifts predict diagonal pooling; large shifts warn instability.

### Yarn Estimator

Inputs: project type, skein length, skein weight, pattern amount, modification %, owned skeins.

Formula:

```ts
modifiedAmount = patternAmount * (1 + modificationPercent / 100);
estimatedYarn = modifiedAmount * (1 + safetyMargin);
skeinsNeeded = ceil(estimatedYarn / lengthPerSkein);
```

Future swatch formula:

```ts
areaRatio = projectArea / swatchArea;
estimatedYarn = swatchYarnUsed * areaRatio * allowance;
```

### Yarn Leftover Estimator

Formula:

```ts
metersPerGram = skeinMeters / skeinGrams;
leftoverMeters = leftoverGrams * metersPerGram;
percentRemaining = leftoverGrams / skeinGrams * 100;
```

### Yarn Substitution Helper

Scoring:

- yarn weight match: 40%
- gauge match: 30%
- meterage match: 20%
- fibre similarity: 10%

Current Yarncha implementation models length and gauge first; fibre scoring is a future enhancement.

### Yarn Weight Converter

Include Lace, Fingering, Sport, DK, Worsted, Aran, Bulky, Super Bulky, Jumbo. Show common needle range, hook range, WPI range, and typical gauge range.

## UI Component Structure For Future React

```txt
src/
  app/
    tools/
      page.tsx
      knitting/
      crochet/
      yarn/
      rendering/
  components/
    tools/
      ToolCard.tsx
      ToolForm.tsx
      ResultPanel.tsx
      FormulaPanel.tsx
      UnitToggle.tsx
      SaveResultButton.tsx
  lib/
    calculations/
      gauge.ts
      garment.ts
      hat.ts
      sock.ts
      sleeve.ts
      raglan.ts
      blanket.ts
      amigurumi.ts
      grannySquare.ts
      c2c.ts
      yarn.ts
      rendering.ts
    validation/
      toolValidation.ts
    units/
      convert.ts
    tests/
      fixtures.ts
```

Current equivalent:

- `calculator-engine.js`: calculation functions.
- `app.js`: form rendering, user flow, local save, copy/export actions.
- `styles.css`: result panel and mobile UI.
- `tests/calculator-engine.test.js`: regression harness.

## Error Messages

- "Enter positive gauge and pattern numbers."
- "Gauge must be greater than 0."
- "Choose compatible From and To units."
- "This resize changes the pattern by more than 15%; review shaping manually."
- "Gauge differs by more than 18%; re-swatch before continuing."
- "Block size must be greater than 0."
- "Calculate a result first."

## Regression Test Plan

Each calculator should include:

- normal case
- metric case
- imperial case
- zero input case
- very large input case
- missing optional input case
- rounding case

Current initial harness covers representative normal and rounding cases. Future work should add invalid-input assertions and a larger benchmark fixture set.

## Todo Checklist

- Harden crochet and rendering tools with visual previews.
- Add area-based yarn estimator using swatch yarn usage.
- Add full garment measurement resizer with bust, waist, hip, sleeve, body length, and shaping position mapping.
- Add fibre similarity scoring to yarn substitution.
- Add export-to-text file download.
- Add editable previous result forms.
- Move from vanilla JS to TypeScript only if the app is deliberately migrated to a build system.
