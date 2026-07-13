(function initializeSymbolReferenceMap(root) {
  /**
   * @typedef {Object} SymbolReferenceRecord
   * @property {string} symbolKey Yarncha symbolSvgPaths key.
   * @property {"01-05.pdf"|"Printable-crochet-symbols.pdf"} document
   * @property {number} page One-based PDF page number.
   * @property {string} tracedSvgKey Registry key containing the normalized trace.
   * @property {"exact-match"|"adjusted"|"added"} verificationStatus
   */

  /** @type {Readonly<Record<string, Readonly<SymbolReferenceRecord>>>} */
  const records = Object.freeze(Object.fromEntries([
    ["knit", "01-05.pdf", 3, "exact-match"], ["purl", "01-05.pdf", 3, "exact-match"],
    ["slip", "01-05.pdf", 9, "adjusted"], ["yarn-over", "01-05.pdf", 4, "exact-match"],
    ["double-yarn-over", "01-05.pdf", 8, "exact-match"], ["knit-twisted", "01-05.pdf", 9, "exact-match"],
    ["purl-twisted", "01-05.pdf", 10, "exact-match"], ["increase-kfb", "01-05.pdf", 7, "exact-match"],
    ["increase-left", "01-05.pdf", 7, "exact-match"], ["increase-right", "01-05.pdf", 7, "exact-match"],
    ["purl-increase", "01-05.pdf", 8, "exact-match"], ["decrease-right", "01-05.pdf", 4, "exact-match"],
    ["decrease-left", "01-05.pdf", 5, "exact-match"], ["purl-decrease-right", "01-05.pdf", 7, "adjusted"],
    ["purl-decrease-left", "01-05.pdf", 7, "adjusted"], ["decrease-centred", "01-05.pdf", 5, "exact-match"],
    ["cable-left", "01-05.pdf", 12, "exact-match"], ["cable-right", "01-05.pdf", 12, "exact-match"],
    ["cable-left-wide", "01-05.pdf", 12, "exact-match"], ["cable-right-wide", "01-05.pdf", 12, "exact-match"],
    ["cable-left-3-3", "01-05.pdf", 14, "exact-match"], ["cable-right-3-3", "01-05.pdf", 14, "exact-match"],
    ["cable-left-4-4", "01-05.pdf", 14, "added"], ["cable-right-4-4", "01-05.pdf", 14, "added"],
    ["chain", "Printable-crochet-symbols.pdf", 1, "exact-match"], ["slip-stitch-crochet", "Printable-crochet-symbols.pdf", 1, "exact-match"],
    ["single-crochet", "Printable-crochet-symbols.pdf", 1, "exact-match"], ["half-double-crochet", "Printable-crochet-symbols.pdf", 1, "exact-match"],
    ["double-crochet", "Printable-crochet-symbols.pdf", 1, "exact-match"], ["treble-crochet", "Printable-crochet-symbols.pdf", 1, "exact-match"],
    ["double-treble-crochet", "Printable-crochet-symbols.pdf", 1, "exact-match"], ["single-crochet-increase", "Printable-crochet-symbols.pdf", 1, "exact-match"],
    ["half-double-crochet-increase", "Printable-crochet-symbols.pdf", 1, "exact-match"], ["double-crochet-increase", "Printable-crochet-symbols.pdf", 1, "exact-match"],
    ["single-crochet-decrease", "Printable-crochet-symbols.pdf", 1, "exact-match"], ["half-double-crochet-decrease", "Printable-crochet-symbols.pdf", 2, "exact-match"],
    ["double-crochet-decrease", "Printable-crochet-symbols.pdf", 2, "exact-match"], ["front-loop", "Printable-crochet-symbols.pdf", 1, "exact-match"],
    ["back-loop", "Printable-crochet-symbols.pdf", 1, "exact-match"], ["front-post", "Printable-crochet-symbols.pdf", 1, "exact-match"],
    ["back-post", "Printable-crochet-symbols.pdf", 1, "exact-match"], ["cluster", "Printable-crochet-symbols.pdf", 2, "adjusted"],
    ["cluster-decrease", "Printable-crochet-symbols.pdf", 2, "exact-match"], ["puff", "Printable-crochet-symbols.pdf", 2, "exact-match"],
    ["popcorn", "Printable-crochet-symbols.pdf", 2, "adjusted"], ["shell", "Printable-crochet-symbols.pdf", 1, "adjusted"],
    ["v-stitch", "Printable-crochet-symbols.pdf", 1, "exact-match"], ["y-stitch", "Printable-crochet-symbols.pdf", 2, "adjusted"],
    ["crochet-cross", "Printable-crochet-symbols.pdf", 2, "exact-match"], ["picot", "Printable-crochet-symbols.pdf", 2, "exact-match"]
  ].map(([symbolKey, document, page, verificationStatus]) => [symbolKey, Object.freeze({
    symbolKey, document, page, tracedSvgKey: symbolKey, verificationStatus
  })])));

  root.YarnchaSymbolReferenceMap = records;
})(globalThis);
