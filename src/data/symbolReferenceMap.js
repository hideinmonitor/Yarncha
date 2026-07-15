(function initializeSymbolReferenceMap(root) {
  /**
   * @typedef {Object} SymbolReferenceRecord
   * @property {string} symbolKey Yarncha semantic symbol key.
   * @property {"Untitled (Draft).pdf"|"Yarncha registry"} document
   * @property {number|null} page One-based PDF page number, or null for a retained fallback.
   * @property {string} tracedSvgKey Single symbolSvgPaths registry key used for rendering.
   * @property {"exact"|"minor-adjustment"|"rebuilt"|"duplicate"|"unsupported"} verificationStatus
   * @property {"High"|"Medium"|"Low"} confidence
   */

  const pdf = "Untitled (Draft).pdf";
  const rows = [
    ["knit",pdf,1,"knit","rebuilt","High"], ["purl",pdf,1,"purl","rebuilt","High"],
    ["yarn-over",pdf,1,"yarn-over","exact","High"], ["knit-twisted",pdf,1,"knit-twisted","rebuilt","High"],
    ["purl-twisted",pdf,1,"purl-twisted","rebuilt","High"], ["increase-kfb",pdf,2,"increase-kfb","exact","High"],
    ["increase-left",pdf,2,"increase-left","rebuilt","High"], ["increase-right",pdf,2,"increase-right","rebuilt","High"],
    ["purl-increase",pdf,2,"purl-increase","exact","High"], ["decrease-right",pdf,2,"decrease-right","exact","High"],
    ["decrease-left",pdf,2,"decrease-left","exact","High"], ["purl-decrease-right",pdf,2,"purl-decrease-right","exact","High"],
    ["purl-decrease-left",pdf,2,"purl-decrease-left","exact","High"], ["decrease-centred",pdf,2,"decrease-centred","exact","High"],
    ["cable-left",pdf,5,"cable-left","rebuilt","High"], ["cable-right",pdf,5,"cable-right","rebuilt","High"],
    ["cable-left-wide",pdf,5,"cable-left-wide","rebuilt","High"], ["cable-right-wide",pdf,5,"cable-right-wide","rebuilt","High"],
    ["cable-left-3-3",pdf,5,"cable-left-3-3","rebuilt","High"], ["cable-right-3-3",pdf,5,"cable-right-3-3","rebuilt","High"],
    ["cable-left-4-4",pdf,5,"cable-left-4-4","rebuilt","High"], ["cable-right-4-4",pdf,5,"cable-right-4-4","rebuilt","High"],
    ["cable-left-purl",pdf,5,"cable-left-purl","rebuilt","High"], ["cable-right-purl",pdf,5,"cable-right-purl","rebuilt","High"],

    ["tunisian-simple",pdf,6,"tunisian-simple","minor-adjustment","High"], ["tunisian-purl",pdf,7,"tunisian-purl","minor-adjustment","High"],
    ["tunisian-knit",pdf,7,"tunisian-knit","minor-adjustment","High"], ["tunisian-reverse",pdf,10,"tunisian-reverse","minor-adjustment","High"],
    ["tunisian-full",pdf,6,"tunisian-full","minor-adjustment","High"], ["tunisian-double",pdf,7,"tunisian-double","minor-adjustment","High"],
    ["tunisian-slip",pdf,8,"tunisian-slip","minor-adjustment","High"], ["tunisian-yarn-over",pdf,6,"tunisian-yarn-over","minor-adjustment","Medium"],
    ["tunisian-yarn-over-space",pdf,6,"tunisian-yarn-over-space","minor-adjustment","Medium"],
    ["tunisian-increase-1-3",pdf,8,"tunisian-increase-1-3","minor-adjustment","High"],
    ["tunisian-decrease-2",pdf,10,"tunisian-decrease-2","minor-adjustment","High"],
    ["tunisian-decrease-3",pdf,10,"tunisian-decrease-3","minor-adjustment","High"],
    ["tunisian-decrease-4",pdf,11,"tunisian-decrease-4","minor-adjustment","High"],
    ["tunisian-decrease-5",pdf,11,"tunisian-decrease-5","minor-adjustment","High"],
    ["tunisian-cross-a",pdf,9,"tunisian-cross-a","minor-adjustment","High"],
    ["tunisian-cross-b",pdf,9,"tunisian-cross-b","minor-adjustment","High"],
    ["tunisian-double-cross",pdf,9,"tunisian-double-cross","minor-adjustment","High"],
    ["tunisian-cable-left-3",pdf,10,"tunisian-cable-left-3","minor-adjustment","High"],

    ["chain",pdf,16,"chain","exact","High"], ["slip-stitch-crochet",pdf,16,"slip-stitch-crochet","exact","High"],
    ["single-crochet",pdf,14,"single-crochet","exact","High"], ["half-double-crochet",pdf,14,"half-double-crochet","exact","High"],
    ["double-crochet",pdf,16,"double-crochet","exact","High"], ["treble-crochet",pdf,16,"treble-crochet","exact","High"],
    ["double-treble-crochet",pdf,16,"double-treble-crochet","exact","High"],
    ["single-crochet-increase",pdf,17,"single-crochet-increase","exact","High"],
    ["half-double-crochet-increase",pdf,17,"half-double-crochet-increase","exact","High"],
    ["double-crochet-increase",pdf,17,"double-crochet-increase","exact","High"],
    ["v-stitch",pdf,12,"double-crochet-increase","duplicate","High"],
    ["single-crochet-decrease",pdf,17,"single-crochet-decrease","exact","High"],
    ["half-double-crochet-decrease",pdf,17,"half-double-crochet-decrease","exact","High"],
    ["double-crochet-decrease",pdf,17,"double-crochet-decrease","exact","High"],
    ["front-loop",pdf,13,"front-loop","rebuilt","High"], ["back-loop",pdf,13,"back-loop","rebuilt","High"],
    ["front-post",pdf,15,"front-post","minor-adjustment","High"], ["back-post",pdf,15,"back-post","minor-adjustment","High"],
    ["cluster",pdf,15,"cluster","exact","High"], ["cluster-decrease",pdf,15,"cluster-decrease","exact","High"],
    ["puff",pdf,15,"puff","exact","High"], ["popcorn",pdf,16,"popcorn","exact","High"],
    ["shell",pdf,13,"shell","exact","High"], ["y-stitch",pdf,12,"y-stitch","exact","High"],
    ["crochet-cross",pdf,12,"crochet-cross","exact","High"], ["picot",pdf,13,"picot","rebuilt","High"]
  ];

  /** @type {Readonly<Record<string, Readonly<SymbolReferenceRecord>>>} */
  const records = Object.freeze(Object.fromEntries(rows.map(([symbolKey, document, page, tracedSvgKey, verificationStatus, confidence]) => [
    symbolKey,
    Object.freeze({ symbolKey, document, page, tracedSvgKey, verificationStatus, confidence })
  ])));

  root.YarnchaSymbolReferenceMap = records;
})(globalThis);
