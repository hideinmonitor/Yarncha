(function(root){
  "use strict";

  const cases = [
    { tool: "gaugeSwatchAdapter", input: { patternStitches: 20, patternRows: 28, userStitches: 22, userRows: 30, patternCount: 100, patternRowCount: 80 }, expect: { adjustedStitches: 110, adjustedRows: 86 } },
    { tool: "gaugeSwatchAdapter", input: { patternStitches: 18, patternRows: 24, userStitches: 16, userRows: 22, patternCount: 90, patternRowCount: 70 }, expect: { adjustedStitches: 80, adjustedRows: 64 } },
    { tool: "needleHookAdjustment", input: { currentToolMm: 4, targetGauge: 20, currentGauge: 22 }, expect: { direction: "larger tool" } },
    { tool: "needleHookAdjustment", input: { currentToolMm: 5, targetGauge: 18, currentGauge: 16, craft: "crochet" }, expect: { direction: "smaller tool" } },
    { tool: "garmentSectionResizer", input: { originalStitches: 54, desiredStitches: 40, repeatMultiple: 2, leftSection: 6, centreSection: 15, rightSection: 6 }, expect: { total: 40 } },
    { tool: "blockingCalculator", input: { beforeWidth: 48, beforeLength: 60, growthPercent: 8 }, expect: { blockedWidth: 51.84, blockedLength: 64.8 } },
    { tool: "blockingCalculator", input: { beforeWidth: 50, beforeLength: 70, afterWidth: 52, afterLength: 68 }, expect: { widthChangePercent: 4, lengthChangePercent: -2.86 } },
    { tool: "hatBeanie", input: { headCircumference: 56, stitchGauge: 20, negativeEasePercent: 8 }, expect: { castOn: 104 } },
    { tool: "hatBeanie", input: { headCircumference: 50, stitchGauge: 18, negativeEasePercent: 6 }, expect: { castOn: 84 } },
    { tool: "sockCalculator", input: { footCircumference: 22, footLength: 24, stitchGauge: 30, negativeEasePercent: 10 }, expect: { castOn: 60, heelStitches: 30 } },
    { tool: "sockCalculator", input: { footCircumference: 25, footLength: 27, stitchGauge: 28, negativeEasePercent: 8 }, expect: { castOn: 64 } },
    { tool: "flatCircleCalculator", input: { startStitches: 6, rounds: 4, stitchType: "sc" }, expect: { finalStitchCount: 24 } },
    { tool: "amigurumiShapeGuide", input: { shape: "cylinder", baseStitches: 6, increaseRounds: 4, straightRounds: 5 }, expect: { finalStitchCount: 24 } },
    { tool: "grannySquarePlanner", input: { targetSize: 12, sizePerRound: 2.5, joiningAllowance: 0.5, blanketWidth: 120, blanketLength: 120 }, expect: { roundsNeeded: 5, totalSquares: 100 } },
    { tool: "c2cBlanketCalculator", input: { width: 120, height: 150, blockSize: 2.5, yarnPerBlock: 1.1 }, expect: { increaseRows: 48, plateauRows: 12, decreaseRows: 48, totalBlocks: 2880 } },
    { tool: "sleeveCalculator", input: { startStitches: 64, endStitches: 42, rowsAvailable: 90 }, expect: { action: "decrease", stitchChange: 22 } },
    { tool: "sleeveCalculator", input: { startStitches: 40, endStitches: 64, rowsAvailable: 96 }, expect: { action: "increase", rowsBetweenShaping: 4 } },
    { tool: "raglanCalculator", input: { neckStitches: 88, targetStitches: 260, increasePerRound: 8 }, expect: { increaseRounds: 22, yokeStitches: 264 } },
    { tool: "raglanCalculator", input: { neckStitches: 72, targetStitches: 200, increasePerRound: 8 }, expect: { increaseRounds: 16, yokeStitches: 200 } },
    { tool: "blanketCalculator", input: { width: 100, length: 140, stitchGauge: 16, rowGauge: 20, yarnPerTenByTen: 12 }, expect: { stitches: 160, rows: 280, estimatedYarn: 2016 } },
    { tool: "blanketCalculator", input: { width: 90, length: 90, stitchGauge: 18, rowGauge: 24, yarnPerTenByTen: 10 }, expect: { stitches: 162, rows: 216, estimatedYarn: 972 } },
    { tool: "gridGenerator", input: { width: 40, height: 60, craftType: "knitting", symbolSet: "basic", colors: 3 }, expect: { columns: 40, rows: 60, totalCells: 2400 } },
    { tool: "stripeGenerator", input: { direction: "horizontal stripes", totalRows: 10, colors: 3 }, expect: {} },
    { tool: "colorPoolingPlanner", input: { colorRepeatLength: 60, stitchesPerRepeat: 24, rowWidth: 96 }, expect: { stability: "stable vertical pooling", shiftPerRow: 0 } },
    { tool: "yarnEstimator", input: { kind: "Sweater", lengthPerSkein: 200, weightPerSkein: 100, patternAmount: 900, modificationPercent: 0, ownedSkeins: 0 }, expect: { suggestedSkeinsTotal: 6, skeinsToBuy: 6 } },
    { tool: "yarnEstimator", input: { kind: "Hat / beanie", lengthPerSkein: 220, weightPerSkein: 100, patternAmount: 180, modificationPercent: 10, ownedSkeins: 1 }, expect: { suggestedSkeinsTotal: 2, skeinsToBuy: 1 } },
    { tool: "yarnLeftoverEstimator", input: { leftoverWeight: 50, originalSkeinWeight: 100, originalSkeinLength: 200 }, expect: { leftoverLength: 100, percentRemaining: 50 } },
    { tool: "yarnSubstitution", input: { patternLength: 220, substituteLength: 180, patternBalls: 6, gaugeDifferencePercent: 10 }, expect: { substituteBalls: 9 } },
    { tool: "yarnSubstitution", input: { patternLength: 200, substituteLength: 200, patternBalls: 4, gaugeDifferencePercent: 0 }, expect: { substituteBalls: 4 } },
    { tool: "yarnWeightConverter", input: { grams: 100, length: 220, wpi: 0 }, expect: { category: "DK / Light Worsted" } },
    { tool: "yarnWeightConverter", input: { grams: 0, length: 0, wpi: 22 }, expect: { category: "Fingering / Sock" } },
    { tool: "unitConvert", input: [100, "cm", "in"], expect: { convertedValue: 39.3701 } },
    { tool: "unitConvert", input: [100, "g", "oz"], expect: { convertedValue: 3.5274 } },
    { tool: "castOnCalculator", input: { width: 40, gauge: 22, gaugeSpan: 10, multiple: 2, edge: 2 }, expect: { castOnStitches: 88 } },
    { tool: "increaseDecreasePlanner", input: { current: 84, desired: 96, row: 42 }, expect: { changeCount: 12, finalStitchCount: 96 } },
    { tool: "repeatCalculator", input: { total: 120, repeat: 8, edge: 4 }, expect: { fullRepeats: 14, remainder: 4 } },
    { tool: "rowRoundHelper", input: { current: 42, total: 128, repeat: 6 }, expect: { progressPercent: 32.8, nextCheckpoint: 48 } },
    { tool: "basicCalculator", input: { expression: "40+20/2" }, expect: { result: 50 } }
  ];

  function readOutput(result, key) {
    return result.outputs && Object.prototype.hasOwnProperty.call(result.outputs, key) ? result.outputs[key] : result.intermediates?.[key];
  }
  function nearlyEqual(actual, expected) {
    if (typeof expected === "number") return Math.abs(Number(actual) - expected) <= 0.02;
    return actual === expected;
  }
  function run(engine) {
    if (!engine) throw new Error("YarnchaCalculatorEngine is not loaded.");
    const failures = [];
    for (const testCase of cases) {
      const result = Array.isArray(testCase.input) ? engine[testCase.tool](...testCase.input) : engine[testCase.tool](testCase.input);
      for (const [key, expected] of Object.entries(testCase.expect)) {
        const actual = readOutput(result, key);
        if (!nearlyEqual(actual, expected)) failures.push({ tool: testCase.tool, key, expected, actual });
      }
      if (!result.formula?.length) failures.push({ tool: testCase.tool, key: "formula", expected: "formula list", actual: result.formula });
      if (!result.summary) failures.push({ tool: testCase.tool, key: "summary", expected: "summary", actual: result.summary });
    }
    return { passed: cases.length - failures.length, totalCases: cases.length, failures };
  }

  root.YarnchaCalculatorEngineTests = { cases, run };
})(typeof window !== "undefined" ? window : globalThis);
