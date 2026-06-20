(function(root){
  "use strict";

  const VERSION = "2026.06.16-mvp";
  const GAUGE_BASE_SPAN_CM = 10;
  const TOOL_STEP_MM = 0.25;
  const MAX_TOOL_SHIFT_MM = 1.5;
  const KNITTING_TOOL_RANGE_MM = { min: 2, max: 15 };
  const CROCHET_TOOL_RANGE_MM = { min: 2, max: 20 };
  const GAUGE_CHANGE_PER_QUARTER_MM = 0.025;
  const DEFAULT_SAFETY_MARGINS = {
    smallAccessory: 0.12,
    standard: 0.15,
    largeGarment: 0.18,
    blanket: 0.2
  };
  const YARN_WEIGHT_TABLE = [
    { name: "Lace", cyc: "0", wpiMin: 30, wpiMax: 40, needles: "1.5-2.25 mm", hooks: "1.5-2.25 mm" },
    { name: "Fingering / Sock", cyc: "1", wpiMin: 20, wpiMax: 29, needles: "2.25-3.25 mm", hooks: "2.25-3.5 mm" },
    { name: "Sport", cyc: "2", wpiMin: 14, wpiMax: 19, needles: "3.25-3.75 mm", hooks: "3.5-4.5 mm" },
    { name: "DK / Light Worsted", cyc: "3", wpiMin: 11, wpiMax: 13, needles: "3.75-4.5 mm", hooks: "4.5-5.5 mm" },
    { name: "Worsted / Aran", cyc: "4", wpiMin: 9, wpiMax: 10, needles: "4.5-5.5 mm", hooks: "5.5-6.5 mm" },
    { name: "Bulky", cyc: "5", wpiMin: 6, wpiMax: 8, needles: "5.5-8 mm", hooks: "6.5-9 mm" },
    { name: "Super Bulky", cyc: "6", wpiMin: 3, wpiMax: 5, needles: "8-15 mm", hooks: "9-15 mm" },
    { name: "Jumbo", cyc: "7", wpiMin: 1, wpiMax: 2, needles: "12-25 mm", hooks: "15-25 mm" }
  ];
  const PROJECT_YARN_PROFILES = {
    "Blanket": { margin: DEFAULT_SAFETY_MARGINS.blanket, confidence: 84 },
    "Sweater": { margin: DEFAULT_SAFETY_MARGINS.largeGarment, confidence: 82 },
    "Hat / beanie": { margin: DEFAULT_SAFETY_MARGINS.smallAccessory, confidence: 88 },
    "Scarf": { margin: DEFAULT_SAFETY_MARGINS.smallAccessory, confidence: 87 },
    "Socks pair": { margin: DEFAULT_SAFETY_MARGINS.smallAccessory, confidence: 84 },
    "Amigurumi": { margin: DEFAULT_SAFETY_MARGINS.smallAccessory, confidence: 80 },
    "Shawl": { margin: DEFAULT_SAFETY_MARGINS.largeGarment, confidence: 82 },
    "Gloves pair": { margin: DEFAULT_SAFETY_MARGINS.smallAccessory, confidence: 80 },
    "Custom dimension": { margin: DEFAULT_SAFETY_MARGINS.standard, confidence: 78 }
  };
  const UNITS = {
    cm: { family: "length", factor: 1 },
    mm: { family: "length", factor: 0.1 },
    m: { family: "length", factor: 100 },
    in: { family: "length", factor: 2.54 },
    yd: { family: "length", factor: 91.44 },
    g: { family: "weight", factor: 1 },
    oz: { family: "weight", factor: 28.349523125 }
  };
  const SIZE_REFERENCE = {
    baby: { chest: [41, 51], waist: [40, 50], hip: [41, 51], head: [40, 48], foot: [9, 12], arm: [16, 22] },
    child: { chest: [53, 71], waist: [50, 61], hip: [56, 76], head: [48, 54], foot: [13, 22], arm: [24, 43] },
    "adult XS": { chest: [76, 81], waist: [61, 66], hip: [84, 89], head: [53, 55], foot: [22, 24], arm: [43, 46] },
    "adult S": { chest: [86, 91], waist: [69, 74], hip: [94, 99], head: [54, 56], foot: [23, 25], arm: [44, 47] },
    "adult M": { chest: [96, 101], waist: [79, 84], hip: [104, 109], head: [55, 58], foot: [24, 26], arm: [45, 49] },
    "adult L": { chest: [106, 111], waist: [89, 94], hip: [114, 119], head: [56, 59], foot: [25, 27], arm: [47, 51] },
    "adult XL": { chest: [116, 122], waist: [99, 107], hip: [124, 132], head: [57, 60], foot: [26, 28], arm: [49, 53] },
    "adult 2XL": { chest: [127, 132], waist: [112, 117], hip: [137, 142], head: [58, 61], foot: [27, 29], arm: [50, 54] },
    "adult 3XL": { chest: [137, 142], waist: [122, 127], hip: [147, 152], head: [58, 62], foot: [27, 30], arm: [51, 55] },
    "adult 4XL": { chest: [147, 152], waist: [132, 137], hip: [157, 162], head: [59, 63], foot: [28, 31], arm: [52, 56] },
    "adult 5XL": { chest: [157, 163], waist: [142, 148], hip: [167, 173], head: [59, 64], foot: [28, 32], arm: [53, 57] }
  };

  function asNumber(value, name, min = 0, allowZero = false) {
    const number = Number(value);
    if (!Number.isFinite(number) || number < min || (!allowZero && number === 0)) {
      throw new Error(`${name} must be ${allowZero ? "at least" : "greater than"} ${min}.`);
    }
    return number;
  }
  function round(value, digits = 2) {
    const factor = 10 ** digits;
    return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
  }
  function roundInt(value) {
    return Math.round(Number(value));
  }
  function roundToMultiple(value, multiple, mode = "nearest") {
    const m = Math.max(1, Math.round(Number(multiple) || 1));
    if (mode === "up") return Math.ceil(value / m) * m;
    if (mode === "down") return Math.floor(value / m) * m;
    return Math.round(value / m) * m;
  }
  function confidenceWarning(confidence) {
    return confidence < 90 ? "Manual verification recommended." : "";
  }
  function makeResult(config) {
    const confidence = Math.max(0, Math.min(99, Number(config.confidence ?? 90)));
    return {
      version: VERSION,
      toolId: config.toolId,
      name: config.name,
      confidence,
      warning: config.warning || confidenceWarning(confidence),
      formula: config.formula || [],
      variables: config.variables || {},
      intermediates: config.intermediates || {},
      outputs: config.outputs || {},
      summary: config.summary || "",
      notes: config.notes || []
    };
  }
  function unitConvert(amount, from, to) {
    const value = asNumber(amount, "Amount", 0, true);
    if (!UNITS[from] || !UNITS[to]) throw new Error("Choose supported units.");
    if (UNITS[from].family !== UNITS[to].family) throw new Error("Choose compatible From and To units.");
    const base = value * UNITS[from].factor;
    const converted = base / UNITS[to].factor;
    return makeResult({
      toolId: "unit",
      name: "Unit Converter",
      confidence: 99,
      formula: ["base_value = amount * from_unit_factor", "converted_value = base_value / to_unit_factor"],
      variables: { amount: value, fromUnit: from, toUnit: to, fromFactor: UNITS[from].factor, toFactor: UNITS[to].factor },
      intermediates: { baseValue: base },
      outputs: { convertedValue: round(converted, 4) },
      summary: `${round(value, 4)} ${from} = ${round(converted, 4)} ${to}.`
    });
  }
  function gaugeSwatchAdapter(input) {
    const patternStitches = asNumber(input.patternStitches, "Pattern gauge stitches");
    const patternRows = asNumber(input.patternRows, "Pattern gauge rows");
    const userStitches = asNumber(input.userStitches, "User gauge stitches");
    const userRows = asNumber(input.userRows, "User gauge rows");
    const patternCount = asNumber(input.patternCount, "Pattern stitch count");
    const patternRowCount = asNumber(input.patternRowCount, "Pattern row count");
    const adjustedStitchesRaw = patternCount * (userStitches / patternStitches);
    const adjustedRowsRaw = patternRowCount * (userRows / patternRows);
    const stitchPercentDifference = ((userStitches - patternStitches) / patternStitches) * 100;
    const rowPercentDifference = ((userRows - patternRows) / patternRows) * 100;
    const resultingWidthRatio = patternStitches / userStitches;
    const resultingLengthRatio = patternRows / userRows;
    const confidence = Math.max(72, 96 - Math.abs(stitchPercentDifference) * 0.8 - Math.abs(rowPercentDifference) * 0.5);
    return makeResult({
      toolId: "swatch",
      name: "Gauge / Swatch Calculator",
      confidence,
      formula: [
        "adjusted_stitches = pattern_stitches * (user_stitch_gauge / pattern_stitch_gauge)",
        "adjusted_rows = pattern_rows * (user_row_gauge / pattern_row_gauge)",
        "resulting_size_ratio = pattern_gauge / user_gauge"
      ],
      variables: { patternStitches, patternRows, userStitches, userRows, patternCount, patternRowCount, gaugeSpanCm: GAUGE_BASE_SPAN_CM },
      intermediates: {
        stitchGaugeRatio: userStitches / patternStitches,
        rowGaugeRatio: userRows / patternRows,
        stitchPercentDifference,
        rowPercentDifference,
        resultingWidthRatio,
        resultingLengthRatio
      },
      outputs: {
        adjustedStitches: roundInt(adjustedStitchesRaw),
        adjustedRows: roundInt(adjustedRowsRaw),
        stitchDifferencePercent: round(stitchPercentDifference, 2),
        rowDifferencePercent: round(rowPercentDifference, 2),
        resultingWidthPercent: round(resultingWidthRatio * 100, 2),
        resultingLengthPercent: round(resultingLengthRatio * 100, 2)
      },
      summary: `Use about ${roundInt(adjustedStitchesRaw)} stitches and ${roundInt(adjustedRowsRaw)} rows. Stitch gauge difference is ${round(stitchPercentDifference, 1)}%; row gauge difference is ${round(rowPercentDifference, 1)}%.`,
      notes: ["Round final stitch counts to the pattern multiple before making the piece.", "Swatch again if gauge differs by more than 10%."]
    });
  }
  function needleHookAdjustment(input) {
    const craft = /crochet/i.test(input.craft || "") ? "crochet" : "knitting";
    const currentTool = asNumber(input.currentToolMm, "Current tool size");
    const targetGauge = asNumber(input.targetGauge, "Target gauge");
    const currentGauge = asNumber(input.currentGauge, "Current gauge");
    const gaugeDeltaPercent = ((currentGauge - targetGauge) / targetGauge) * 100;
    const absDelta = Math.abs(gaugeDeltaPercent);
    let shift = 0;
    if (absDelta >= 5 && absDelta < 8) shift = 0.5;
    else if (absDelta >= 8 && absDelta < 12) shift = 1;
    else if (absDelta >= 12 && absDelta <= 18) shift = 1.5;
    else if (absDelta > 0 && absDelta < 5) shift = 0.25;
    else if (absDelta > 18) shift = 1.5;
    const suggestedTool = currentGauge > targetGauge ? currentTool + shift : currentTool - shift;
    const range = craft === "crochet" ? CROCHET_TOOL_RANGE_MM : KNITTING_TOOL_RANGE_MM;
    const clamped = Math.max(range.min, Math.min(range.max, suggestedTool));
    const confidence = absDelta > 18 ? 58 : Math.max(68, 90 - absDelta * 0.9);
    return makeResult({
      toolId: "tool-adjust",
      name: "Needle / Hook Adjustment",
      confidence,
      formula: [
        "gauge_delta_percent = (current_gauge - target_gauge) / target_gauge * 100",
        "5-8% gauge difference = 0.5mm change",
        "8-12% gauge difference = 1.0mm change",
        "12-18% gauge difference = 1.5mm change",
        "over 18% = re-swatch warning"
      ],
      variables: { craft, currentToolMm: currentTool, targetGauge, currentGauge, gaugeChangePerQuarterMm: GAUGE_CHANGE_PER_QUARTER_MM, supportedRangeMm: range },
      intermediates: { gaugeDeltaPercent, absoluteGaugeDeltaPercent: absDelta, rawSuggestedToolMm: suggestedTool },
      outputs: { suggestedToolMm: round(clamped, 2), estimatedShiftMm: round(clamped - currentTool, 2), direction: currentGauge > targetGauge ? "larger tool" : "smaller tool" },
      summary: `Try around ${round(clamped, 2)} mm (${currentGauge > targetGauge ? "larger" : "smaller"} than your current ${currentTool} mm).`,
      notes: [absDelta > 18 ? "Gauge differs by more than 18%; change tools and make a fresh swatch before resizing the pattern." : "This is a threshold-based gauge model, not a guarantee.", "Wash and block the new swatch before committing."]
    });
  }
  function garmentSectionResizer(input) {
    const originalStitches = asNumber(input.originalStitches, "Original stitches");
    const desiredStitches = asNumber(input.desiredStitches, "Desired stitches");
    const repeatMultiple = Math.max(1, roundInt(input.repeatMultiple || 1));
    const left = asNumber(input.leftSection, "Left section", 0, true);
    const centre = asNumber(input.centreSection, "Centre section", 0, true);
    const right = asNumber(input.rightSection, "Right section", 0, true);
    const sectionTotal = left + centre + right;
    if (!sectionTotal) throw new Error("Sections must add up to more than zero.");
    const scaledTotalRaw = desiredStitches;
    const compatibleTotal = input.keepMultiple === false ? roundInt(scaledTotalRaw) : Math.max(repeatMultiple, roundToMultiple(scaledTotalRaw, repeatMultiple));
    let newLeft = roundInt(compatibleTotal * left / sectionTotal);
    let newRight = roundInt(compatibleTotal * right / sectionTotal);
    let newCentre = compatibleTotal - newLeft - newRight;
    if (input.keepSymmetry !== false) {
      const side = Math.max(0, roundToMultiple((newLeft + newRight) / 2, repeatMultiple));
      newLeft = side;
      newRight = side;
      newCentre = compatibleTotal - newLeft - newRight;
      if (newCentre < 0) {
        newLeft = newRight = Math.floor(compatibleTotal / 3);
        newCentre = compatibleTotal - newLeft - newRight;
      }
    }
    const scaleRatio = desiredStitches / originalStitches;
    const proportionError = Math.abs((newLeft + newCentre + newRight) - compatibleTotal);
    return makeResult({
      toolId: "garment",
      name: "Pattern / Garment Resizer",
      confidence: proportionError ? 78 : 86,
      formula: [
        "scale_ratio = desired_stitches / original_stitches",
        "compatible_total = desired_stitches rounded to repeat_multiple",
        "new_section = compatible_total * original_section / original_section_total"
      ],
      variables: { originalStitches, desiredStitches, repeatMultiple, left, centre, right, keepSymmetry: input.keepSymmetry !== false, keepMultiple: input.keepMultiple !== false },
      intermediates: { scaleRatio, sectionTotal, scaledTotalRaw, compatibleTotal },
      outputs: { left: newLeft, centre: newCentre, right: newRight, total: newLeft + newCentre + newRight },
      summary: `Suggested split: left ${newLeft}, centre/back ${newCentre}, right ${newRight}. Total ${newLeft + newCentre + newRight}.`,
      notes: ["Check edge stitches, button bands, and pattern repeats manually.", "If the original design used shaping, move shaping points by the same scale ratio."]
    });
  }
  function blockingCalculator(input) {
    const beforeWidth = asNumber(input.beforeWidth, "Before width");
    const beforeLength = asNumber(input.beforeLength, "Before length");
    const afterWidth = input.afterWidth === undefined || input.afterWidth === "" ? null : asNumber(input.afterWidth, "After width");
    const afterLength = input.afterLength === undefined || input.afterLength === "" ? null : asNumber(input.afterLength, "After length");
    const growthPercent = input.growthPercent === undefined || input.growthPercent === "" ? null : Number(input.growthPercent);
    const projectedWidth = afterWidth || beforeWidth * (1 + (growthPercent || 0) / 100);
    const projectedLength = afterLength || beforeLength * (1 + (growthPercent || 0) / 100);
    const widthChangePercent = ((projectedWidth - beforeWidth) / beforeWidth) * 100;
    const lengthChangePercent = ((projectedLength - beforeLength) / beforeLength) * 100;
    const confidence = afterWidth && afterLength ? 92 : 78;
    return makeResult({
      toolId: "blocking",
      name: "Blocking Calculator",
      confidence,
      formula: [
        "width_change_percent = (after_width - before_width) / before_width * 100",
        "length_change_percent = (after_length - before_length) / before_length * 100",
        "projected_size = before_size * (1 + growth_percent)"
      ],
      variables: { beforeWidth, beforeLength, afterWidth, afterLength, growthPercent },
      intermediates: { widthChangePercent, lengthChangePercent },
      outputs: { blockedWidth: round(projectedWidth, 2), blockedLength: round(projectedLength, 2), widthChangePercent: round(widthChangePercent, 2), lengthChangePercent: round(lengthChangePercent, 2) },
      summary: `Blocked size estimate: ${round(projectedWidth, 1)} x ${round(projectedLength, 1)}. Width changes ${round(widthChangePercent, 1)}%; length changes ${round(lengthChangePercent, 1)}%.`,
      notes: ["Use real before/after swatch measurements for best accuracy.", "Different fibres can grow or shrink differently after washing."]
    });
  }
  function hatBeanie(input) {
    const headCircumference = asNumber(input.headCircumference, "Head circumference");
    const stitchGauge = asNumber(input.stitchGauge, "Stitch gauge");
    const negativeEasePercent = Number(input.negativeEasePercent ?? 8);
    const style = input.style || "fitted";
    const targetCircumference = headCircumference * (1 - negativeEasePercent / 100);
    const rawCastOn = targetCircumference * stitchGauge / GAUGE_BASE_SPAN_CM;
    const castOn = roundToMultiple(rawCastOn, 4);
    const crownDiameter = headCircumference / Math.PI;
    const depthRatio = style === "slouchy" ? 0.43 : style === "ribbed" ? 0.38 : 0.36;
    const depth = headCircumference * depthRatio;
    return makeResult({
      toolId: "hat",
      name: "Hat / Beanie Size Calculator",
      confidence: 88,
      formula: [
        "target_circumference = head_circumference * (1 - negative_ease_percent / 100)",
        "cast_on = target_circumference * stitch_gauge / 10cm",
        "crown_diameter = head_circumference / pi"
      ],
      variables: { headCircumference, stitchGauge, negativeEasePercent, style },
      intermediates: { targetCircumference, rawCastOn, crownDiameter, depthRatio },
      outputs: { castOn, crownDiameter: round(crownDiameter, 2), suggestedDepth: round(depth, 2), shapingMultiple: 4 },
      summary: `Cast on about ${castOn} stitches. Crown diameter reference: ${round(crownDiameter, 1)}. Suggested depth: ${round(depth, 1)}.`,
      notes: ["Ribbing and stitch pattern can change stretch.", "Round cast-on to the stitch pattern multiple."]
    });
  }
  function sockCalculator(input) {
    const footCircumference = asNumber(input.footCircumference, "Foot circumference");
    const footLength = asNumber(input.footLength, "Foot length");
    const stitchGauge = asNumber(input.stitchGauge, "Stitch gauge");
    const negativeEasePercent = Number(input.negativeEasePercent ?? 10);
    const targetCircumference = footCircumference * (1 - negativeEasePercent / 100);
    const rawStitches = targetCircumference * stitchGauge / GAUGE_BASE_SPAN_CM;
    const castOn = roundToMultiple(rawStitches, 4);
    const heelStitches = castOn / 2;
    const toeStartLength = footLength - Math.max(4, footLength * 0.18);
    return makeResult({
      toolId: "sock",
      name: "Sock Calculator",
      confidence: 84,
      formula: [
        "target_circumference = foot_circumference * (1 - negative_ease_percent / 100)",
        "cast_on = target_circumference * stitch_gauge / 10cm rounded to multiple of 4",
        "heel_stitches = cast_on / 2"
      ],
      variables: { footCircumference, footLength, stitchGauge, negativeEasePercent },
      intermediates: { targetCircumference, rawStitches },
      outputs: { castOn, heelStitches, toeStartLength: round(toeStartLength, 2), toeDecreaseStitches: castOn },
      summary: `Cast on about ${castOn} stitches. Work heel over ${heelStitches} stitches. Start toe shaping around length ${round(toeStartLength, 1)}.`,
      notes: ["Sock construction varies. Use this as a planning baseline, then follow your heel/toe method."]
    });
  }
  function sleeveCalculator(input) {
    const startStitches = asNumber(input.startStitches, "Start stitches");
    const endStitches = asNumber(input.endStitches, "End stitches");
    const rowsAvailable = asNumber(input.rowsAvailable, "Rows available");
    const change = Math.abs(endStitches - startStitches);
    const action = endStitches > startStitches ? "increase" : "decrease";
    const rowsBetween = change ? rowsAvailable / change : 0;
    return makeResult({
      toolId: "sleeve",
      name: "Sleeve Calculator",
      confidence: 88,
      formula: ["change = abs(end_stitches - start_stitches)", "rows_between_shaping = rows_available / change"],
      variables: { startStitches, endStitches, rowsAvailable },
      intermediates: { change, action, rowsBetween },
      outputs: { action, stitchChange: change, rowsBetweenShaping: change ? round(rowsBetween, 2) : 0 },
      summary: `${action} ${change} stitch(es) over ${rowsAvailable} rows. Work shaping about every ${change ? round(rowsBetween, 1) : 0} row(s).`,
      notes: ["For paired sleeve increases/decreases, divide the shaping count by the number changed per shaping row."]
    });
  }
  function raglanCalculator(input) {
    const neckStitches = asNumber(input.neckStitches, "Neck stitches");
    const targetStitches = asNumber(input.targetStitches, "Target stitches");
    const increasePerRound = asNumber(input.increasePerRound, "Increase stitches per round");
    const increaseRounds = Math.ceil(Math.max(0, targetStitches - neckStitches) / increasePerRound);
    const yokeStitches = neckStitches + increaseRounds * increasePerRound;
    return makeResult({
      toolId: "raglan",
      name: "Raglan Calculator",
      confidence: 82,
      formula: ["increase_rounds = ceil((target_stitches - neck_stitches) / increase_per_round)", "final_yoke_stitches = neck_stitches + increase_rounds * increase_per_round"],
      variables: { neckStitches, targetStitches, increasePerRound },
      intermediates: { neededIncrease: Math.max(0, targetStitches - neckStitches), increaseRounds },
      outputs: { increaseRounds, yokeStitches, overshoot: yokeStitches - targetStitches },
      summary: `Plan ${increaseRounds} raglan increase round(s). Final yoke count lands at ${yokeStitches} stitches.`,
      notes: ["Neck shaping, sleeve split, and yoke depth need manual fit checks."]
    });
  }
  function blanketCalculator(input) {
    const width = asNumber(input.width, "Width");
    const length = asNumber(input.length, "Length");
    const stitchGauge = asNumber(input.stitchGauge, "Stitch gauge");
    const rowGauge = asNumber(input.rowGauge, "Row gauge");
    const yarnPerTenByTen = asNumber(input.yarnPerTenByTen, "Yarn per 10x10 area");
    const stitches = width * stitchGauge / GAUGE_BASE_SPAN_CM;
    const rows = length * rowGauge / GAUGE_BASE_SPAN_CM;
    const areaUnits = (width * length) / 100;
    const yarn = areaUnits * yarnPerTenByTen * (1 + DEFAULT_SAFETY_MARGINS.blanket);
    return makeResult({
      toolId: "blanket",
      name: "Blanket Calculator",
      confidence: 86,
      formula: ["stitches = width * stitch_gauge / 10cm", "rows = length * row_gauge / 10cm", "yarn = area_10x10_units * yarn_per_10x10 * safety_margin"],
      variables: { width, length, stitchGauge, rowGauge, yarnPerTenByTen, safetyMargin: DEFAULT_SAFETY_MARGINS.blanket },
      intermediates: { areaUnits, rawStitches: stitches, rawRows: rows },
      outputs: { stitches: roundInt(stitches), rows: roundInt(rows), estimatedYarn: round(yarn, 1) },
      summary: `Plan about ${roundInt(stitches)} stitches x ${roundInt(rows)} rows. Estimated yarn with 20% buffer: ${round(yarn, 1)}.`,
      notes: ["Border, texture, cables, and dense crochet stitches can require extra yarn."]
    });
  }
  function flatCircleCalculator(input) {
    const startStitches = Math.max(1, roundInt(input.startStitches || 6));
    const rounds = Math.max(1, roundInt(input.rounds || 1));
    const stitchType = input.stitchType || "sc";
    const rows = Array.from({ length: rounds }, (_, index) => {
      const roundNumber = index + 1;
      const stitchCount = startStitches * roundNumber;
      const repeat = roundNumber === 1 ? `${startStitches} ${stitchType} in ring` : `${stitchType} ${roundNumber - 1}, inc around`;
      return { round: roundNumber, stitchCount, instruction: repeat };
    });
    return makeResult({
      toolId: "circle",
      name: "Circle Calculator",
      confidence: 88,
      formula: ["round_stitch_count = starting_stitches * round_number", "increase_count_per_round = starting_stitches"],
      variables: { startStitches, rounds, stitchType },
      intermediates: { increasePerRound: startStitches },
      outputs: { rounds: rows, finalStitchCount: rows.at(-1).stitchCount },
      summary: `Flat circle: ${rounds} round(s), ending with ${rows.at(-1).stitchCount} stitches.`,
      notes: ["Stagger increases if the circle begins to form corners.", "Different crochet stitch heights may need a different starting count."]
    });
  }
  function amigurumiShapeGuide(input) {
    const shape = String(input.shape || "round").toLowerCase();
    const baseStitches = Math.max(1, roundInt(input.baseStitches || 6));
    const increaseRounds = Math.max(1, roundInt(input.increaseRounds || 4));
    const straightRounds = Math.max(0, roundInt(input.straightRounds || increaseRounds));
    const chainLength = Math.max(3, roundInt(input.chainLength || 8));
    let rounds = [];
    if (shape === "oval") {
      rounds = Array.from({ length: increaseRounds }, (_, index) => {
        const roundNumber = index + 1;
        const endIncrease = baseStitches * (index + 1);
        const stitchCount = chainLength * 2 + endIncrease * 2;
        return { round: roundNumber, stitchCount, instruction: `Work both sides of chain; add ${endIncrease} total increases across the two ends.` };
      });
    } else if (shape === "cylinder") {
      const base = flatCircleCalculator({ startStitches: baseStitches, rounds: increaseRounds, stitchType: "sc" }).outputs.rounds;
      rounds = [...base, ...Array.from({ length: straightRounds }, (_, i) => ({ round: increaseRounds + i + 1, stitchCount: base.at(-1).stitchCount, instruction: "sc around with no increases" }))];
    } else if (shape === "cone") {
      rounds = Array.from({ length: increaseRounds }, (_, index) => {
        const roundNumber = index + 1;
        const stitchCount = baseStitches + baseStitches * Math.floor(index / 2);
        return { round: roundNumber, stitchCount, instruction: index % 2 ? "work even for gradual cone height" : "increase evenly around" };
      });
    } else {
      const widest = flatCircleCalculator({ startStitches: baseStitches, rounds: increaseRounds, stitchType: "sc" }).outputs.rounds;
      const straight = Array.from({ length: straightRounds }, (_, i) => ({ round: increaseRounds + i + 1, stitchCount: widest.at(-1).stitchCount, instruction: "sc around to build the sphere body" }));
      const decrease = [...widest].reverse().slice(1).map((row, i) => ({ round: increaseRounds + straightRounds + i + 1, stitchCount: row.stitchCount, instruction: "decrease evenly around" }));
      rounds = [...widest, ...straight, ...decrease];
    }
    return makeResult({
      toolId: "amigurumi",
      name: "Amigurumi Shape Guide",
      confidence: 82,
      formula: [
        "circle_base_count = base_stitches * round_number",
        "sphere = increase rounds + straight rounds + mirrored decrease rounds",
        "cylinder = circle base + straight rounds",
        "oval = chain sides + increases at both ends"
      ],
      variables: { shape, baseStitches, increaseRounds, straightRounds, chainLength },
      intermediates: { totalRounds: rounds.length },
      outputs: { rounds, finalStitchCount: rounds.at(-1)?.stitchCount || 0 },
      summary: `${shape} guide: ${rounds.length} round(s), ending at ${rounds.at(-1)?.stitchCount || 0} stitches.`,
      notes: ["Stuffing, yarn thickness, and hook size change final shape.", "Use stitch markers and count every round."]
    });
  }
  function grannySquarePlanner(input) {
    const targetSize = asNumber(input.targetSize, "Target size");
    const sizePerRound = asNumber(input.sizePerRound, "Size per round");
    const joiningAllowance = Math.max(0, Number(input.joiningAllowance || 0));
    const blanketWidth = input.blanketWidth ? asNumber(input.blanketWidth, "Blanket width") : targetSize;
    const blanketLength = input.blanketLength ? asNumber(input.blanketLength, "Blanket length") : targetSize;
    const roundsNeeded = Math.max(1, Math.ceil((targetSize - joiningAllowance) / sizePerRound));
    const squareSize = roundsNeeded * sizePerRound + joiningAllowance;
    const columns = Math.max(1, Math.ceil(blanketWidth / squareSize));
    const rows = Math.max(1, Math.ceil(blanketLength / squareSize));
    const totalSquares = columns * rows;
    return makeResult({
      toolId: "granny",
      name: "Granny Square Size Planner",
      confidence: 86,
      formula: ["rounds_needed = ceil((target_square_size - joining_allowance) / size_per_round)", "square_count = ceil(width / square_size) * ceil(length / square_size)"],
      variables: { targetSize, sizePerRound, joiningAllowance, blanketWidth, blanketLength },
      intermediates: { squareSize, columns, rows },
      outputs: { roundsNeeded, estimatedSquareSize: round(squareSize, 2), columns, rows, totalSquares },
      summary: `Make ${totalSquares} square(s): ${columns} across x ${rows} down. Each square needs about ${roundsNeeded} round(s).`,
      notes: ["Block a sample square before committing to total square count.", "Joining method can add or subtract finished size."]
    });
  }
  function c2cBlanketCalculator(input) {
    const width = asNumber(input.width, "Width");
    const height = asNumber(input.height, "Height");
    const blockSize = asNumber(input.blockSize, "Block size");
    const yarnPerBlock = Math.max(0, Number(input.yarnPerBlock || 0));
    const widthBlocks = Math.ceil(width / blockSize);
    const heightBlocks = Math.ceil(height / blockSize);
    const smaller = Math.min(widthBlocks, heightBlocks);
    const larger = Math.max(widthBlocks, heightBlocks);
    const increaseRows = smaller;
    const plateauRows = larger - smaller;
    const decreaseRows = Math.max(0, smaller - 1);
    const totalBlocks = widthBlocks * heightBlocks;
    const estimatedYarn = yarnPerBlock ? totalBlocks * yarnPerBlock * (1 + DEFAULT_SAFETY_MARGINS.standard) : 0;
    return makeResult({
      toolId: "c2c",
      name: "C2C Blanket Calculator",
      confidence: 86,
      formula: ["width_blocks = ceil(width / block_size)", "height_blocks = ceil(height / block_size)", "increase_rows = min(width_blocks, height_blocks)", "plateau_rows = abs(width_blocks - height_blocks)", "decrease_rows = min(width_blocks, height_blocks) - 1"],
      variables: { width, height, blockSize, yarnPerBlock, safetyMargin: DEFAULT_SAFETY_MARGINS.standard },
      intermediates: { widthBlocks, heightBlocks, smaller, larger },
      outputs: { increaseRows, plateauRows, decreaseRows, totalBlocks, estimatedYarn: round(estimatedYarn, 1) },
      summary: `C2C plan: increase ${increaseRows} row(s), work ${plateauRows} plateau row(s), decrease ${decreaseRows} row(s). Total blocks: ${totalBlocks}.`,
      notes: ["Block size should come from a real swatch for best fit.", "Different C2C stitch styles change yarn usage."]
    });
  }
  function gridGenerator(input) {
    const width = asNumber(input.width, "Width cells");
    const height = asNumber(input.height, "Height cells");
    const colors = Math.max(1, roundInt(input.colors || 1));
    return makeResult({
      toolId: "grid",
      name: "Grid Generator",
      confidence: 94,
      formula: ["total_cells = width_cells * height_cells"],
      variables: { width, height, craftType: input.craftType || "knitting", symbolSet: input.symbolSet || "basic", colors },
      intermediates: { totalCells: width * height },
      outputs: { columns: roundInt(width), rows: roundInt(height), totalCells: roundInt(width * height) },
      summary: `Grid ready: ${roundInt(width)} columns x ${roundInt(height)} rows (${roundInt(width * height)} cells).`,
      notes: ["Export and annotation are UI features; this result defines the chart dimensions."]
    });
  }
  function stripeGenerator(input) {
    const total = Math.max(1, roundInt(input.totalRows || 1));
    const colors = Math.max(1, roundInt(input.colors || 1));
    const base = Math.floor(total / colors);
    const remainder = total % colors;
    const sequence = Array.from({ length: colors }, (_, index) => ({ colorIndex: index + 1, rows: base + (index < remainder ? 1 : 0) }));
    return makeResult({
      toolId: "stripe",
      name: "Stripe Generator",
      confidence: 94,
      formula: ["base_rows_per_color = floor(total_rows / color_count)", "remainder_rows = total_rows % color_count"],
      variables: { direction: input.direction || "horizontal stripes", totalRows: total, colorCount: colors },
      intermediates: { baseRowsPerColor: base, remainderRows: remainder },
      outputs: { sequence },
      summary: `${input.direction || "horizontal stripes"}: ${colors} colour(s) across ${total} row/stitch positions.`,
      notes: ["For exact stripe repeats, adjust the total row count to a multiple of the colour sequence."]
    });
  }
  function colorPoolingPlanner(input) {
    const colorRepeatLength = asNumber(input.colorRepeatLength, "Colour repeat length");
    const stitchesPerRepeat = asNumber(input.stitchesPerRepeat, "Stitches per repeat");
    const rowWidth = input.rowWidth ? asNumber(input.rowWidth, "Row width") : stitchesPerRepeat;
    const shiftPerRow = rowWidth % stitchesPerRepeat;
    const stability = shiftPerRow === 0 ? "stable vertical pooling" : shiftPerRow <= 2 || shiftPerRow >= stitchesPerRepeat - 2 ? "gentle diagonal pooling" : "unstable pooling";
    const confidence = stability === "unstable pooling" ? 70 : 82;
    return makeResult({
      toolId: "pooling",
      name: "Color Pooling Planner",
      confidence,
      formula: ["shift_per_row = row_width % stitches_per_repeat", "small shift = diagonal pooling; zero shift = vertical pooling"],
      variables: { colorRepeatLength, stitchesPerRepeat, rowWidth },
      intermediates: { shiftPerRow },
      outputs: { stability, shiftPerRow },
      summary: `Pooling prediction: ${stability}. Row shift is ${round(shiftPerRow, 2)} stitch(es).`,
      notes: ["Colour matching recommendations will be expanded later.", "Pooling is sensitive to tension changes; swatch before starting."]
    });
  }
  function yarnEstimator(input) {
    const kind = input.kind || "Custom dimension";
    const lengthPerSkein = asNumber(input.lengthPerSkein, "Length per skein");
    const weightPerSkein = asNumber(input.weightPerSkein, "Weight per skein");
    const patternAmount = asNumber(input.patternAmount, "Pattern estimated yarn");
    const modificationPercent = Number(input.modificationPercent || 0);
    const ownedSkeins = Math.max(0, Number(input.ownedSkeins || 0));
    const profile = PROJECT_YARN_PROFILES[kind] || PROJECT_YARN_PROFILES["Custom dimension"];
    const modifiedAmount = patternAmount * (1 + modificationPercent / 100);
    const withSafety = modifiedAmount * (1 + profile.margin);
    const totalSkeins = Math.ceil(withSafety / lengthPerSkein);
    const skeinsToBuy = Math.max(0, totalSkeins - ownedSkeins);
    const leftoverLength = totalSkeins * lengthPerSkein - withSafety;
    const estimatedWeight = withSafety / lengthPerSkein * weightPerSkein;
    return makeResult({
      toolId: "yarn-estimator",
      name: "Yarn Estimator",
      confidence: profile.confidence,
      formula: [
        "modified_amount = pattern_amount * (1 + modification_percent / 100)",
        "estimated_yarn = modified_amount * (1 + safety_margin)",
        "skeins_needed = ceil(estimated_yarn / length_per_skein)"
      ],
      variables: { kind, lengthPerSkein, weightPerSkein, patternAmount, modificationPercent, ownedSkeins, safetyMargin: profile.margin },
      intermediates: { modifiedAmount, withSafety, estimatedWeight },
      outputs: { estimatedYarn: round(withSafety, 1), suggestedSkeinsTotal: totalSkeins, skeinsToBuy, estimatedLeftover: round(leftoverLength, 1), estimatedWeight: round(estimatedWeight, 1) },
      summary: `Estimated yarn needed: ${round(withSafety, 0)} length units. Suggested total skeins: ${totalSkeins}; buy ${skeinsToBuy}. Estimated leftover: ${round(leftoverLength, 0)}.`,
      notes: ["This is an estimate. Yarn usage depends on gauge, stitch pattern, tension, yarn weight, tool size, and finished size."]
    });
  }
  function yarnLeftoverEstimator(input) {
    const leftoverWeight = asNumber(input.leftoverWeight, "Leftover weight");
    const originalSkeinWeight = asNumber(input.originalSkeinWeight, "Original skein weight");
    const originalSkeinLength = asNumber(input.originalSkeinLength, "Original skein length");
    const metersPerWeight = originalSkeinLength / originalSkeinWeight;
    const leftoverLength = leftoverWeight * metersPerWeight;
    const percentRemaining = leftoverWeight / originalSkeinWeight * 100;
    const suggestions = leftoverLength >= 400 ? ["shawl section", "large scarf", "baby blanket accent"] :
      leftoverLength >= 200 ? ["hat", "small scarf", "mitts"] :
      leftoverLength >= 80 ? ["stripes", "granny squares", "amigurumi details"] :
      ["pom-pom", "seaming", "stitch markers or scrap swatch"];
    return makeResult({
      toolId: "yarn-leftover",
      name: "Yarn Leftover Estimator",
      confidence: 92,
      formula: ["length_per_weight = original_skein_length / original_skein_weight", "leftover_length = leftover_weight * length_per_weight", "percent_remaining = leftover_weight / original_skein_weight * 100"],
      variables: { leftoverWeight, originalSkeinWeight, originalSkeinLength },
      intermediates: { metersPerWeight, percentRemaining },
      outputs: { leftoverLength: round(leftoverLength, 1), percentRemaining: round(percentRemaining, 1), suggestions },
      summary: `You have about ${round(leftoverLength, 1)} length units left (${round(percentRemaining, 1)}% of a skein).`,
      notes: ["Suggestions are based on length only; yarn weight and fabric density still matter."]
    });
  }
  function yarnSubstitution(input) {
    const patternLength = asNumber(input.patternLength, "Pattern yarn length per ball");
    const substituteLength = asNumber(input.substituteLength, "Substitute yarn length per ball");
    const patternBalls = asNumber(input.patternBalls, "Pattern balls");
    const gaugeDifferencePercent = Math.max(0, Number(input.gaugeDifferencePercent || 0));
    const patternTotal = patternLength * patternBalls;
    const neededLength = patternTotal * (1 + gaugeDifferencePercent / 100);
    const substituteBalls = Math.ceil(neededLength / substituteLength);
    const lengthCompatibility = Math.min(100, substituteLength / patternLength * 100);
    const gaugeCompatibility = Math.max(0, 100 - gaugeDifferencePercent * 4);
    const score = round((lengthCompatibility * 0.45 + gaugeCompatibility * 0.55), 1);
    return makeResult({
      toolId: "substitution",
      name: "Yarn Substitution Helper",
      confidence: Math.min(88, Math.max(68, score - 5)),
      formula: ["pattern_total = pattern_length_per_ball * pattern_balls", "needed_length = pattern_total * (1 + gauge_difference_percent / 100)", "substitute_balls = ceil(needed_length / substitute_length_per_ball)"],
      variables: { patternLength, substituteLength, patternBalls, gaugeDifferencePercent },
      intermediates: { patternTotal, neededLength, lengthCompatibility, gaugeCompatibility },
      outputs: { substituteBalls, compatibilityScore: score, neededLength: round(neededLength, 1) },
      summary: `Buy about ${substituteBalls} substitute ball(s). Compatibility score: ${score}/100.`,
      notes: ["This does not yet model fibre content, ply structure, elasticity, or drape. Compare a washed swatch before substituting."]
    });
  }
  function yarnWeightConverter(input) {
    const grams = Number(input.grams || 0);
    const length = Number(input.length || 0);
    const wpi = Number(input.wpi || 0);
    let row;
    let method;
    if (wpi > 0) {
      row = YARN_WEIGHT_TABLE.find(item => wpi >= item.wpiMin && wpi <= item.wpiMax) || YARN_WEIGHT_TABLE.at(-1);
      method = `${wpi} WPI`;
    } else {
      asNumber(grams, "Ball weight");
      asNumber(length, "Ball length");
      const lengthPer100g = length / grams * 100;
      row = lengthPer100g >= 600 ? YARN_WEIGHT_TABLE[0] :
        lengthPer100g >= 430 ? YARN_WEIGHT_TABLE[1] :
        lengthPer100g >= 300 ? YARN_WEIGHT_TABLE[2] :
        lengthPer100g >= 210 ? YARN_WEIGHT_TABLE[3] :
        lengthPer100g >= 140 ? YARN_WEIGHT_TABLE[4] :
        lengthPer100g >= 90 ? YARN_WEIGHT_TABLE[5] : YARN_WEIGHT_TABLE[6];
      method = `${round(lengthPer100g, 1)} length units per 100 weight units`;
    }
    return makeResult({
      toolId: "yarn-weight",
      name: "Yarn Weight Converter",
      confidence: wpi > 0 ? 90 : 82,
      formula: ["WPI lookup uses named yarn-weight reference ranges", "length_per_100g = length / grams * 100"],
      variables: { grams, length, wpi },
      intermediates: { method },
      outputs: { category: row.name, cyc: row.cyc, wpiRange: `${row.wpiMin}-${row.wpiMax}`, needles: row.needles, hooks: row.hooks },
      summary: `Estimated yarn category: ${row.name} / CYC ${row.cyc}. Typical needles: ${row.needles}; hooks: ${row.hooks}.`,
      notes: ["Yarn category is a starting point. Pattern gauge and swatching are more important than label category."]
    });
  }
  function castOnCalculator(input) {
    const width = asNumber(input.width, "Finished width");
    const gauge = asNumber(input.gauge, "Gauge");
    const multiple = Math.max(1, roundInt(input.multiple || 1));
    const edge = Math.max(0, roundInt(input.edge || 0));
    const gaugeSpan = asNumber(input.gaugeSpan || GAUGE_BASE_SPAN_CM, "Gauge span");
    const raw = width * gauge / gaugeSpan;
    const adjusted = roundToMultiple(Math.max(0, raw - edge), multiple, "up") + edge;
    return makeResult({
      toolId: "cast-on",
      name: "Cast On Calculator",
      confidence: 88,
      formula: ["raw_stitches = finished_width * gauge / gauge_span", "adjusted_stitches = ceil((raw_stitches - edge_stitches) / multiple) * multiple + edge_stitches"],
      variables: { width, gauge, gaugeSpan, multiple, edgeStitches: edge },
      intermediates: { rawStitches: raw, stitchesBeforeEdge: Math.max(0, raw - edge) },
      outputs: { castOnStitches: adjusted },
      summary: `Cast on about ${adjusted} stitches.`,
      notes: ["Round to the pattern stitch multiple before starting.", "Ribbing, lace and cables can change width; swatch the actual stitch pattern."]
    });
  }
  function increaseDecreasePlanner(input) {
    const current = roundInt(asNumber(input.current, "Current stitch count"));
    const desired = roundInt(asNumber(input.desired, "Desired stitch count"));
    const row = roundInt(Number(input.row || 0));
    if (current === desired) throw new Error("Current and desired counts must be different.");
    const change = Math.abs(desired - current);
    const action = desired > current ? "increase" : "decrease";
    const interval = Math.max(1, Math.floor(current / change));
    const remainder = current % change;
    return makeResult({
      toolId: "shaping",
      name: "Increase / Decrease Planner",
      confidence: change > current / 2 ? 72 : 86,
      formula: ["change_count = abs(desired_count - current_count)", "interval = floor(current_count / change_count)", "remainder = current_count % change_count"],
      variables: { current, desired, row },
      intermediates: { changeCount: change, interval, remainder, action },
      outputs: { action, changeCount: change, suggestedInterval: interval, extraSpacingSections: remainder, finalStitchCount: desired },
      summary: `${action[0].toUpperCase()+action.slice(1)} ${change} stitch(es), roughly every ${interval} stitch(es).`,
      notes: ["Recount at the end of the row or round.", "For visible shaping, mirror increases/decreases around centre points when needed."]
    });
  }
  function repeatCalculator(input) {
    const total = roundInt(asNumber(input.total, "Total stitches or rows"));
    const repeat = roundInt(asNumber(input.repeat, "Repeat size"));
    const edge = Math.max(0, roundInt(input.edge || 0));
    if (edge >= total) throw new Error("Edge stitches must be smaller than the total.");
    const workable = total - edge;
    const fullRepeats = Math.floor(workable / repeat);
    const remainder = workable % repeat;
    return makeResult({
      toolId: "repeat",
      name: "Repeat Calculator",
      confidence: 96,
      formula: ["workable_count = total_count - edge_count", "full_repeats = floor(workable_count / repeat_size)", "remainder = workable_count % repeat_size"],
      variables: { total, repeat, edge },
      intermediates: { workableCount: workable },
      outputs: { fullRepeats, remainder, edgeStitches: edge },
      summary: `${fullRepeats} full repeat(s) fit after ${edge} edge stitch(es). Remainder: ${remainder}.`,
      notes: [remainder ? "Adjust the total count, repeat size or edge stitches before starting." : "No remainder."]
    });
  }
  function rowRoundHelper(input) {
    const current = Math.max(0, roundInt(Number(input.current || 0)));
    const total = roundInt(asNumber(input.total, "Planned rows or rounds"));
    const repeat = roundInt(asNumber(input.repeat, "Repeat interval"));
    const percent = Math.min(100, current / total * 100);
    const nextCheckpoint = Math.ceil((current + 1) / repeat) * repeat;
    return makeResult({
      toolId: "row-helper",
      name: "Row / Round Counter Helper",
      confidence: 96,
      formula: ["progress_percent = current_row / planned_rows * 100", "next_checkpoint = ceil((current_row + 1) / repeat_interval) * repeat_interval"],
      variables: { current, total, repeat },
      intermediates: { remainingRows: Math.max(0, total - current) },
      outputs: { progressPercent: round(percent, 1), nextCheckpoint, rowsLeft: Math.max(0, total - current) },
      summary: `${round(percent, 1)}% complete. Next repeat checkpoint: row/round ${nextCheckpoint}.`,
      notes: ["Use planned row count as a guide only if the pattern length may change while making."]
    });
  }
  function evaluateArithmeticExpression(expression) {
    const tokens = String(expression).match(/\d*\.?\d+|[()+\-*/]/g) || [];
    let index = 0;
    function peek(){ return tokens[index]; }
    function consume(){ return tokens[index++]; }
    function factor(){
      const token = consume();
      if (token === "-") return -factor();
      if (token === "+") return factor();
      if (token === "(") {
        const value = expr();
        if (consume() !== ")") throw new Error("Missing closing parenthesis.");
        return value;
      }
      const value = Number(token);
      if (!Number.isFinite(value)) throw new Error("Unexpected calculator input.");
      return value;
    }
    function term(){
      let value = factor();
      while (peek() === "*" || peek() === "/") {
        const op = consume(), next = factor();
        value = op === "*" ? value * next : value / next;
      }
      return value;
    }
    function expr(){
      let value = term();
      while (peek() === "+" || peek() === "-") {
        const op = consume(), next = term();
        value = op === "+" ? value + next : value - next;
      }
      return value;
    }
    const value = expr();
    if (index !== tokens.length) throw new Error("The full expression could not be read.");
    return value;
  }
  function basicCalculator(input) {
    const expression = String(input.expression || "0").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/%/g, "/100");
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) throw new Error("The expression can only include numbers and basic operators.");
    const result = evaluateArithmeticExpression(expression);
    if (!Number.isFinite(result)) throw new Error("The expression could not be calculated.");
    return makeResult({
      toolId: "basic",
      name: "Basic Calculator",
      confidence: 99,
      formula: ["result = evaluated arithmetic expression"],
      variables: { expression: String(input.expression || "0") },
      intermediates: {},
      outputs: { result: round(result, 6) },
      summary: `Calculator result: ${round(result, 6)}.`
    });
  }

  const api = {
    VERSION,
    constants: { GAUGE_BASE_SPAN_CM, TOOL_STEP_MM, MAX_TOOL_SHIFT_MM, KNITTING_TOOL_RANGE_MM, CROCHET_TOOL_RANGE_MM, GAUGE_CHANGE_PER_QUARTER_MM },
    reference: { YARN_WEIGHT_TABLE, SIZE_REFERENCE, PROJECT_YARN_PROFILES },
    unitConvert,
    gaugeSwatchAdapter,
    needleHookAdjustment,
    garmentSectionResizer,
    blockingCalculator,
    hatBeanie,
    sockCalculator,
    sleeveCalculator,
    raglanCalculator,
    blanketCalculator,
    flatCircleCalculator,
    amigurumiShapeGuide,
    grannySquarePlanner,
    c2cBlanketCalculator,
    gridGenerator,
    stripeGenerator,
    colorPoolingPlanner,
    yarnEstimator,
    yarnLeftoverEstimator,
    yarnSubstitution,
    yarnWeightConverter,
    castOnCalculator,
    increaseDecreasePlanner,
    repeatCalculator,
    rowRoundHelper,
    basicCalculator
  };
  root.YarnchaCalculatorEngine = api;
})(typeof window !== "undefined" ? window : globalThis);
