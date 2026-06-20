(function initializeYarnchaSymbolDatabase(root) {
  const categoryOrder = ["Basic", "Increase", "Decrease", "Lace", "Cable", "Special Stitch", "Chart Rule"];

  const craftConfig = {
    Knitting: { section: "Knitting Symbols & Abbreviations", prefix: "knit" },
    Crochet: { section: "Crochet Symbols & Abbreviations", prefix: "crochet" },
    Tunisian: { section: "Tunisian Crochet Symbols & Abbreviations", prefix: "tunisian" },
    Shared: { section: "Special Stitches", prefix: "shared" }
  };

  const definitions = [
    ["Knitting", "Basic", "K", "Knit", "V or blank cell"],
    ["Knitting", "Basic", "P", "Purl", "- or dot"],
    ["Knitting", "Basic", "Sl", "Slip Stitch", "vertical or curved mark"],
    ["Knitting", "Basic", "YO", "Yarn Over", "○"],
    ["Knitting", "Basic", "KTBL", "Knit Through Back Loop", "twisted knit mark"],
    ["Knitting", "Basic", "PTBL", "Purl Through Back Loop", "twisted purl mark"],
    ["Knitting", "Increase", "M1L", "Make One Left", "left-leaning increase"],
    ["Knitting", "Increase", "M1R", "Make One Right", "right-leaning increase"],
    ["Knitting", "Increase", "LI", "Lifted Increase", "lifted stitch mark"],
    ["Knitting", "Increase", "YO inc", "Yarn Over Increase", "○"],
    ["Knitting", "Increase", "KFB", "Knit Front and Back", "split knit mark"],
    ["Knitting", "Increase", "PFB", "Purl Front and Back", "split purl mark"],
    ["Knitting", "Decrease", "K2TOG", "Knit Two Together", "right-leaning slash"],
    ["Knitting", "Decrease", "P2TOG", "Purl Two Together", "purl decrease slash"],
    ["Knitting", "Decrease", "SSK", "Slip Slip Knit", "left-leaning slash"],
    ["Knitting", "Decrease", "SSP", "Slip Slip Purl", "left purl decrease"],
    ["Knitting", "Decrease", "SKP", "Slip Knit Pass Slipped Stitch Over", "left decrease mark"],
    ["Knitting", "Decrease", "CDD", "Centered Double Decrease", "centered three-to-one mark"],
    ["Knitting", "Lace", "Eyelet", "Eyelet", "○"],
    ["Knitting", "Lace", "YO", "Yarn Over (Lace)", "○"],
    ["Knitting", "Lace", "DYO", "Double Yarn Over", "double circle"],
    ["Knitting", "Lace", "Lace dec", "Lace Decrease", "leaning slash"],
    ["Knitting", "Lace", "Pair shaping", "Paired Increase or Decrease", "mirrored marks"],
    ["Knitting", "Cable", "C left", "Cable Left", "left crossing lines"],
    ["Knitting", "Cable", "C right", "Cable Right", "right crossing lines"],
    ["Knitting", "Cable", "1/1 LC", "One Over One Cross", "two-line cross"],
    ["Knitting", "Cable", "2/2 LC", "Two Over Two Cross", "four-stitch cross"],
    ["Knitting", "Cable", "3/3 LC", "Three Over Three Cross", "six-stitch cross"],
    ["Knitting", "Cable", "Tw C", "Twisted Cable", "cross with twist mark"],
    ["Knitting", "Cable", "Travel C", "Traveling Cable", "traveling crossing line"],
    ["Knitting", "Special Stitch", "Nupp", "Nupp", "clustered oval"],
    ["Knitting", "Special Stitch", "Bobble", "Bobble", "filled or outlined bobble"],
    ["Knitting", "Special Stitch", "Wrap", "Wrapped Stitch", "loop around stitch"],
    ["Knitting", "Special Stitch", "BR", "Brioche Symbol", "brioche-specific mark"],
    ["Knitting", "Special Stitch", "DK", "Double Knitting Symbol", "two-layer cell mark"],

    ["Crochet", "Basic", "CH", "Chain", "oval"],
    ["Crochet", "Basic", "SL ST", "Slip Stitch", "dot or filled oval"],
    ["Crochet", "Basic", "SC", "Single Crochet", "+ or x"],
    ["Crochet", "Basic", "HDC", "Half Double Crochet", "T"],
    ["Crochet", "Basic", "DC", "Double Crochet", "T with one bar"],
    ["Crochet", "Basic", "TR", "Treble Crochet", "T with two bars"],
    ["Crochet", "Basic", "DTR", "Double Treble Crochet", "T with three bars"],
    ["Crochet", "Increase", "SC INC", "Single Crochet Increase", "two SC from one base"],
    ["Crochet", "Increase", "HDC INC", "Half Double Crochet Increase", "two HDC from one base"],
    ["Crochet", "Increase", "DC INC", "Double Crochet Increase", "two DC from one base"],
    ["Crochet", "Increase", "Cluster inc", "Cluster Increase", "multiple stems from one base"],
    ["Crochet", "Decrease", "SC2TOG", "Single Crochet Two Together", "joined SC tops"],
    ["Crochet", "Decrease", "HDC2TOG", "Half Double Crochet Two Together", "joined HDC tops"],
    ["Crochet", "Decrease", "DC2TOG", "Double Crochet Two Together", "joined DC tops"],
    ["Crochet", "Decrease", "Cluster dec", "Cluster Decrease", "multiple stems joined at top"],
    ["Crochet", "Special Stitch", "PC", "Popcorn", "outlined popcorn cluster"],
    ["Crochet", "Special Stitch", "Puff", "Puff Stitch", "puffy oval cluster"],
    ["Crochet", "Special Stitch", "Bobble", "Bobble Stitch", "compact cluster"],
    ["Crochet", "Special Stitch", "CL", "Cluster", "joined unfinished stitches"],
    ["Crochet", "Special Stitch", "Shell", "Shell Stitch", "fan of tall stitches"],
    ["Crochet", "Special Stitch", "V-st", "V Stitch", "V-shaped pair"],
    ["Crochet", "Special Stitch", "Y-st", "Y Stitch", "Y-shaped tall stitch"],
    ["Crochet", "Special Stitch", "Cross", "Cross Stitch", "crossed tall stitches"],
    ["Crochet", "Special Stitch", "Picot", "Picot", "small loop or triangle"],
    ["Crochet", "Basic", "FLO", "Front Loop Only", "upper arc"],
    ["Crochet", "Basic", "BLO", "Back Loop Only", "lower arc"],
    ["Crochet", "Special Stitch", "FP", "Front Post Stitch", "post hook facing front"],
    ["Crochet", "Special Stitch", "BP", "Back Post Stitch", "post hook facing back"],

    ["Tunisian", "Basic", "TSS", "Tunisian Simple Stitch", "vertical bar"],
    ["Tunisian", "Basic", "TPS", "Tunisian Purl Stitch", "purl-marked vertical bar"],
    ["Tunisian", "Basic", "TKS", "Tunisian Knit Stitch", "vertical bar with insertion mark"],
    ["Tunisian", "Basic", "TRS", "Tunisian Reverse Stitch", "reverse vertical bar"],
    ["Tunisian", "Basic", "TFS", "Tunisian Full Stitch", "gap insertion mark"],
    ["Tunisian", "Special Stitch", "Honeycomb", "Tunisian Honeycomb", "alternating TSS and TPS cells"],
    ["Tunisian", "Special Stitch", "Smock", "Tunisian Smock Stitch", "joined vertical bars"],
    ["Tunisian", "Special Stitch", "Basketweave", "Tunisian Basketweave", "grouped knit and purl blocks"],
    ["Tunisian", "Lace", "T lace", "Tunisian Lace Variation", "YO and decrease combination"],
    ["Tunisian", "Basic", "T chart", "Tunisian Chart Symbol", "cell with forward/return-pass marks"],

    ["Shared", "Special Stitch", "Bobble", "Bobble", "bobble or raised cluster"],
    ["Shared", "Special Stitch", "Popcorn", "Popcorn", "popcorn cluster"],
    ["Shared", "Special Stitch", "Puff", "Puff", "puff cluster"],
    ["Shared", "Special Stitch", "Nupp", "Nupp", "small gathered cluster"],
    ["Shared", "Special Stitch", "Cluster", "Cluster", "joined group"],
    ["Shared", "Special Stitch", "Shell", "Shell", "fan or shell group"],
    ["Shared", "Special Stitch", "V Stitch", "V Stitch", "V-shaped group"],
    ["Shared", "Special Stitch", "Y Stitch", "Y Stitch", "Y-shaped group"],
    ["Shared", "Cable", "Cable Cross", "Cable Crosses", "crossing lines"],
    ["Shared", "Increase", "BR inc", "Brioche Increase", "brioche branching mark"],
    ["Shared", "Decrease", "BR dec", "Brioche Decrease", "brioche joined mark"]
  ];

  const ruleDefinitions = [
    ["Knitting", "Flat chart direction", "Read right-side rows right-to-left and wrong-side rows left-to-right unless the pattern says otherwise."],
    ["Knitting", "Circular chart direction", "Read every round in the chart's stated direction, commonly right-to-left."],
    ["Knitting", "RS and WS rows", "A symbol may mean a different action on the wrong side; always use the legend's RS and WS columns."],
    ["Knitting", "Reading Japanese charts", "Confirm starting point, direction arrows, repeat brackets, garment schematic, and the publication legend."],
    ["Knitting", "Reading Chinese charts", "Confirm whether the chart uses mainland, Hong Kong, Taiwanese, Japanese-derived, or publication-specific conventions."],
    ["Knitting", "Reading English charts", "Check whether abbreviations use US/UK terms and whether blank cells mean knit, no stitch, or background."],
    ["Crochet", "Round charts", "Find the start marker, direction, joins, turning instructions, and repeated wedges before following symbols."],
    ["Crochet", "Row charts", "Read alternating row direction and confirm whether turning chains count as stitches."],
    ["Crochet", "Symbol charts", "Use the chart's legend because graphical crochet conventions vary by publisher and region."],
    ["Crochet", "Written patterns", "Confirm terminology system, repeat punctuation, stitch totals, and placement words such as same stitch or next space."],
    ["Tunisian", "Forward pass", "Read loop-pickup actions separately from the return pass and track the number of loops on the hook."],
    ["Tunisian", "Return pass", "Follow the stated closing sequence; a standard return pass must not be assumed when the legend specifies another."],
    ["Tunisian", "Tunisian chart conventions", "Confirm how one chart row represents forward and return passes and where edge stitches are shown."]
  ];

  const localizedAliases = {
    "Knitting:K": { "zh-HK":"上針 / 下針（依圖例）", "zh-CN":"上针 / 下针（依图例）", ja:"表目" },
    "Knitting:P": { "zh-HK":"下針 / 上針（依圖例）", "zh-CN":"下针 / 上针（依图例）", ja:"裏目" },
    "Knitting:YO": { "zh-HK":"掛針 / 空針", "zh-CN":"挂针 / 空针", ja:"掛け目" },
    "Knitting:K2TOG": { "zh-HK":"右上二併一", "zh-CN":"右上二并一", ja:"右上2目一度" },
    "Knitting:SSK": { "zh-HK":"左上二併一", "zh-CN":"左上二并一", ja:"左上2目一度" },
    "Crochet:CH": { "zh-HK":"鎖針", "zh-CN":"锁针", ja:"鎖編み" },
    "Crochet:SL ST": { "zh-HK":"引拔針", "zh-CN":"引拔针", ja:"引き抜き編み" },
    "Crochet:SC": { "zh-HK":"短針", "zh-CN":"短针", ja:"細編み" },
    "Crochet:HDC": { "zh-HK":"中長針", "zh-CN":"中长针", ja:"中長編み" },
    "Crochet:DC": { "zh-HK":"長針", "zh-CN":"长针", ja:"長編み" },
    "Crochet:TR": { "zh-HK":"長長針", "zh-CN":"长长针", ja:"長々編み" },
    "Crochet:FLO": { "zh-HK":"外半針", "zh-CN":"外半针", ja:"前半目" },
    "Crochet:BLO": { "zh-HK":"內半針", "zh-CN":"内半针", ja:"後半目" },
    "Tunisian:TSS": { "zh-HK":"阿富汗簡單針", "zh-CN":"阿富汗简单针", ja:"チュニジアンシンプルステッチ" },
    "Tunisian:TPS": { "zh-HK":"阿富汗上針", "zh-CN":"阿富汗上针", ja:"チュニジアンパールステッチ" },
    "Tunisian:TKS": { "zh-HK":"阿富汗下針", "zh-CN":"阿富汗下针", ja:"チュニジアンニットステッチ" }
  };

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function makeEntry([craft, category, abbreviation, fullName, symbol], index) {
    const needsLegend = /varies|mark|circle|slash|line|oval|cell|arc|dot|cross|bar|cluster|group|pair|fan|loop/i.test(symbol) || symbol === "○";
    const localized = localizedAliases[`${craft}:${abbreviation}`] || {};
    const aliases = [...new Set([abbreviation, fullName, fullName.replace(/ Stitch$/i, ""), ...Object.values(localized).flatMap(value=>value.split(/\s*\/\s*/))])];
    return {
      id: `${craftConfig[craft].prefix}-${slug(abbreviation || fullName)}-${index}`,
      section: craftConfig[craft].section,
      craft,
      category,
      symbol,
      abbreviation,
      fullName,
      description: `${fullName} is a ${craft.toLowerCase()} ${category.toLowerCase()} instruction. Its exact chart mark can vary by publication.`,
      howTo: `Follow the pattern's written instructions and legend for ${fullName}. Confirm stitch placement, orientation, and resulting stitch count before continuing.`,
      beginnerExplanation: `Read this as “${fullName}”. Practice it on a small swatch before using it in a fitted or counted section.`,
      difficulty: ["Basic"].includes(category) ? "Beginner" : ["Increase", "Decrease"].includes(category) ? "Intermediate" : "Advanced",
      aliases,
      languageVariants: {
        en: fullName,
        "zh-HK": `${fullName}（${abbreviation}）`,
        "zh-CN": `${fullName} (${abbreviation})`,
        ja: `${fullName} (${abbreviation})`,
        ...localized
      },
      relatedSymbols: definitions.filter(row => row[0] === craft && row[1] === category && row[2] !== abbreviation).slice(0, 4).map(row => row[2]),
      commonMistakes: ["Using a generic internet symbol instead of the pattern legend", "Missing direction, side, placement, or stitch-count changes"],
      chartExamples: [`${symbol} → possible ${abbreviation}`, `${abbreviation} in a repeat or chart cell`],
      recognitionAliases: [...aliases, symbol].filter(Boolean),
      ocrKeywords: aliases.map(value => value.toLowerCase()),
      possibleMeanings: needsLegend ? [...new Set([abbreviation, fullName, category === "Lace" ? "Eyelet or increase" : `${category} instruction`, "Publisher-specific meaning"])] : [abbreviation, fullName],
      ambiguityWarnings: needsLegend ? ["The same mark can mean different actions in another chart.", "Direction and RS/WS context may change the instruction."] : ["Confirm terminology and chart legend."],
      confidenceHint: needsLegend ? "Treat as a candidate match only. Always check the chart legend." : "Use abbreviation, craft, row direction, and legend together.",
      requiresLegendCheck: true,
      flowModeReady: true
    };
  }

  function makeRule([craft, fullName, description], index) {
    return {
      id: `rule-${slug(craft)}-${slug(fullName)}-${index}`,
      section: "Chart Reading Rules",
      craft,
      category: "Chart Rule",
      symbol: "Rule",
      abbreviation: "",
      fullName,
      description,
      howTo: description,
      beginnerExplanation: `Pause before row one and use this ${craft.toLowerCase()} chart-reading check.`,
      difficulty: "Beginner",
      aliases: [fullName],
      languageVariants: { en: fullName, "zh-HK": fullName, "zh-CN": fullName, ja: fullName },
      relatedSymbols: [],
      commonMistakes: ["Assuming direction or terminology without checking the pattern", "Ignoring repeat boundaries or row-side information"],
      chartExamples: [description],
      recognitionAliases: [fullName, craft, "chart rule"],
      ocrKeywords: fullName.toLowerCase().split(/\s+/),
      possibleMeanings: [description],
      ambiguityWarnings: ["Publication instructions override general conventions."],
      confidenceHint: "Use as contextual guidance, never as proof of a symbol meaning.",
      requiresLegendCheck: true,
      flowModeReady: true
    };
  }

  const entries = Object.freeze([
    ...definitions.map(makeEntry),
    ...ruleDefinitions.map(makeRule)
  ].map(Object.freeze));

  function normalizeEntry(raw = {}) {
    const craft = craftConfig[raw.craft] ? raw.craft : "Shared";
    const base = makeEntry([craft, raw.category || "Special Stitch", raw.abbreviation || "", raw.fullName || "Custom Symbol", raw.symbol || "Custom"], `custom-${slug(raw.id || raw.fullName || Date.now())}`);
    return { ...base, ...raw, id:raw.id || base.id, aliases:[...new Set([...(base.aliases||[]),...(raw.aliases||[])])], recognitionAliases:[...new Set([...(base.recognitionAliases||[]),...(raw.recognitionAliases||[])])], ocrKeywords:[...new Set([...(base.ocrKeywords||[]),...(raw.ocrKeywords||[])])], requiresLegendCheck:raw.requiresLegendCheck!==false };
  }

  function search(query = "", filters = {}) {
    const needle = query.trim().toLowerCase();
    return entries.filter(entry => {
      if (filters.craft && filters.craft !== "All" && entry.craft !== filters.craft) return false;
      if (filters.category && filters.category !== "All" && entry.category !== filters.category) return false;
      if (filters.difficulty && filters.difficulty !== "All" && entry.difficulty !== filters.difficulty) return false;
      if (!needle) return true;
      return [entry.symbol, entry.abbreviation, entry.fullName, entry.description, ...entry.aliases, ...entry.recognitionAliases, ...entry.ocrKeywords]
        .join(" ").toLowerCase().includes(needle);
    });
  }

  function recognitionCandidates(observation = {}) {
    const tokens = [observation.symbol, observation.text, ...(observation.ocrKeywords || [])].filter(Boolean).map(value => String(value).toLowerCase());
    return entries
      .filter(entry => !observation.craft || entry.craft === observation.craft || entry.craft === "Shared")
      .map(entry => ({
        entry,
        score: tokens.reduce((score, token) => score + entry.recognitionAliases.concat(entry.ocrKeywords).some(alias => String(alias).toLowerCase() === token) * 2 + entry.recognitionAliases.concat(entry.ocrKeywords).some(alias => String(alias).toLowerCase().includes(token)) * 0.5, 0)
      }))
      .filter(candidate => candidate.score > 0)
      .sort((a, b) => b.score - a.score);
  }

  root.YarnchaSymbolDatabase = Object.freeze({ schemaVersion:1, entries, categoryOrder, search, recognitionCandidates, normalizeEntry });
})(globalThis);
