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
    ["Knitting", "Cable", "1/1 RC", "One Over One Right Cross", "two-line right cross"],
    ["Knitting", "Cable", "2/2 LC", "Two Over Two Cross", "four-stitch cross"],
    ["Knitting", "Cable", "2/2 RC", "Two Over Two Right Cross", "four-stitch right cross"],
    ["Knitting", "Cable", "3/3 LC", "Three Over Three Cross", "six-stitch cross"],
    ["Knitting", "Cable", "3/3 RC", "Three Over Three Right Cross", "six-stitch right cross"],
    ["Knitting", "Cable", "1/1 LPC", "Left Purl Cross", "left crossing lines with purl marker"],
    ["Knitting", "Cable", "1/1 RPC", "Right Purl Cross", "right crossing lines with purl marker"],
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
    ["Crochet", "Special Stitch", "FPDC", "Front Post Double Crochet", "front-post double crochet"],
    ["Crochet", "Special Stitch", "BPDC", "Back Post Double Crochet", "back-post double crochet"],

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
    "Knitting:K": { "zh-HK":"K（中文名稱需按圖例核對）", "zh-CN":"K（中文名称需按图例核对）", ja:"表目" },
    "Knitting:P": { "zh-HK":"P（中文名稱需按圖例核對）", "zh-CN":"P（中文名称需按图例核对）", ja:"裏目" },
    "Knitting:YO": { "zh-HK":"掛針 / 空針", "zh-CN":"挂针 / 空针", ja:"掛け目" },
    "Knitting:K2TOG": { "zh-HK":"右上二併一", "zh-CN":"右上二并一", ja:"右上2目一度" },
    "Knitting:SSK": { "zh-HK":"左上二併一", "zh-CN":"左上二并一", ja:"左上2目一度" },
    "Knitting:Sl": { "zh-HK":"滑針", "zh-CN":"滑针", ja:"すべり目" },
    "Knitting:KTBL": { "zh-HK":"扭下針", "zh-CN":"扭下针", ja:"ねじり表目" },
    "Knitting:PTBL": { "zh-HK":"扭上針", "zh-CN":"扭上针", ja:"ねじり裏目" },
    "Knitting:M1L": { "zh-HK":"左加針", "zh-CN":"左加针", ja:"左増し目" },
    "Knitting:M1R": { "zh-HK":"右加針", "zh-CN":"右加针", ja:"右増し目" },
    "Knitting:P2TOG": { "zh-HK":"上針右上二併一", "zh-CN":"上针右上二并一", ja:"裏目の右上2目一度" },
    "Knitting:SSP": { "zh-HK":"上針左上二併一", "zh-CN":"上针左上二并一", ja:"裏目の左上2目一度" },
    "Knitting:CDD": { "zh-HK":"中上三併一", "zh-CN":"中上三并一", ja:"中上3目一度" },
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

  const chartLegendWarning = "Chart symbols can vary by designer and region. Always check the pattern legend.";
  const LAST_VERIFIED_DATE = "2026-06-21";
  const SOURCE_URLS = {
    cycCrochet:"https://www.craftyarncouncil.com/standards/crochet-chart-symbols",
    cycKnit:"https://www.craftyarncouncil.com/standards/knit-chart-symbols",
    cycKnitAbbreviations:"https://www.craftyarncouncil.com/knit.html",
    vogueCharts:"https://www.vogueknitting.com/pattern-help/how-to/pattern-reading/reading-charts/",
    interweaveCables:"https://www.interweave.com/article/knitting/understanding-cable-chart-symbols/",
    tinCanCharts:"https://blog.tincanknits.com/2014/06/06/how-to-read-a-knitting-chart/"
  };
  const uploadedReferenceName="User-provided Chinese/Japanese chart reference sheets (IMG_4166–IMG_4176)";
  const duplicateAliasesToRemove=new Set([
    "Knitting:YO inc","Knitting:Eyelet","Knitting:Yarn Over (Lace)",
    "Shared:Bobble","Shared:Popcorn","Shared:Puff","Shared:Nupp","Shared:Cluster","Shared:Shell","Shared:V Stitch","Shared:Y Stitch","Shared:Cable Cross","Shared:BR inc","Shared:BR dec"
  ]);

  // Text equivalents remain searchable, while the UI uses the SVG icon token.
  const visualSymbols = {
    "Knitting:K":"│", "Knitting:P":"—", "Knitting:Sl":"⌁", "Knitting:YO":"○",
    "Knitting:YO inc":"○", "Knitting:Eyelet":"○", "Knitting:DYO":"○○",
    "Knitting:K2TOG":"/", "Knitting:P2TOG":"/", "Knitting:SSK":"\\",
    "Knitting:SSP":"\\", "Knitting:SKP":"\\", "Knitting:CDD":"↑",
    "Knitting:C left":"╲╱", "Knitting:C right":"╱╲", "Knitting:1/1 LC":"╲╱",
    "Knitting:1/1 RC":"╱╲", "Knitting:2/2 LC":"╲╲╱╱", "Knitting:2/2 RC":"╱╱╲╲",
    "Knitting:3/3 LC":"╲╲╲╱╱╱", "Knitting:3/3 RC":"╱╱╱╲╲╲",
    "Knitting:1/1 LPC":"╲·╱", "Knitting:1/1 RPC":"╱·╲",
    "Crochet:CH":"○", "Crochet:SL ST":"●", "Crochet:SC":"×",
    "Crochet:HDC":"T", "Crochet:DC":"T̸", "Crochet:TR":"T̸̸", "Crochet:DTR":"T̸̸̸",
    "Crochet:SC INC":"∨", "Crochet:HDC INC":"∨T", "Crochet:DC INC":"∨T̸",
    "Crochet:SC2TOG":"∧", "Crochet:HDC2TOG":"T∧T", "Crochet:DC2TOG":"T̸∧T̸",
    "Crochet:PC":"◉", "Crochet:Puff":"◍", "Crochet:Bobble":"◍",
    "Crochet:CL":"⋀", "Crochet:Shell":"Ψ", "Crochet:V-st":"V",
    "Crochet:Y-st":"Y", "Crochet:Cross":"⨯", "Crochet:Picot":"△",
    "Crochet:FLO":"⌒", "Crochet:BLO":"⌣", "Crochet:FPDC":"⤴T̸", "Crochet:BPDC":"⤵T̸",
    "Tunisian:TSS":"│", "Tunisian:TPS":"•│", "Tunisian:TKS":"⌗",
    "Tunisian:TRS":"⌞", "Tunisian:TFS":"•", "Shared:V Stitch":"V",
    "Shared:Y Stitch":"Y", "Shared:Cable Cross":"⨯"
  };

  const symbolIcons = {
    "Knitting:K":"knit", "Knitting:P":"purl", "Knitting:Sl":"slip",
    "Knitting:YO":"yarn-over", "Knitting:KTBL":"knit-twisted", "Knitting:PTBL":"purl-twisted",
    "Knitting:K2TOG":"decrease-right", "Knitting:P2TOG":"purl-decrease-right",
    "Knitting:SSK":"decrease-left", "Knitting:SSP":"purl-decrease-left", "Knitting:SKP":"decrease-left",
    "Knitting:CDD":"decrease-centred", "Knitting:KFB":"increase-kfb", "Knitting:PFB":"purl-increase", "Knitting:Bobble":"knit-bobble",
    "Knitting:M1L":"increase-left", "Knitting:M1R":"increase-right", "Knitting:LI":"increase",
    "Knitting:YO inc":"yarn-over", "Knitting:Eyelet":"yarn-over", "Knitting:DYO":"double-yarn-over",
    "Knitting:C left":"cable-left", "Knitting:C right":"cable-right",
    "Knitting:1/1 LC":"cable-left", "Knitting:1/1 RC":"cable-right",
    "Knitting:2/2 LC":"cable-left-wide", "Knitting:2/2 RC":"cable-right-wide",
    "Knitting:3/3 LC":"cable-left-3-3", "Knitting:3/3 RC":"cable-right-3-3",
    "Knitting:1/1 LPC":"cable-left-purl", "Knitting:1/1 RPC":"cable-right-purl",
    "Knitting:Tw C":"cable-twisted", "Knitting:Travel C":"cable-left",
    "Crochet:CH":"chain", "Crochet:SL ST":"slip-stitch-crochet", "Crochet:SC":"single-crochet",
    "Crochet:HDC":"half-double-crochet", "Crochet:DC":"double-crochet", "Crochet:TR":"treble-crochet",
    "Crochet:DTR":"double-treble-crochet", "Crochet:SC INC":"single-crochet-increase", "Crochet:HDC INC":"half-double-crochet-increase",
    "Crochet:DC INC":"double-crochet-increase", "Crochet:SC2TOG":"single-crochet-decrease",
    "Crochet:HDC2TOG":"half-double-crochet-decrease", "Crochet:DC2TOG":"double-crochet-decrease",
    "Crochet:FLO":"front-loop", "Crochet:BLO":"back-loop", "Crochet:FPDC":"front-post",
    "Crochet:BPDC":"back-post", "Crochet:Cluster inc":"cluster", "Crochet:Cluster dec":"cluster-decrease",
    "Crochet:PC":"popcorn", "Crochet:Puff":"cyc-hdc-cluster", "Crochet:Bobble":"cyc-hdc-cluster", "Crochet:CL":"cluster",
    "Crochet:Shell":"shell", "Crochet:V-st":"v-stitch", "Crochet:Y-st":"y-stitch",
    "Crochet:Cross":"crochet-cross", "Crochet:Picot":"picot",
    "Tunisian:TSS":"knit", "Tunisian:TPS":"purl-twisted", "Tunisian:TKS":"knit-twisted",
    "Tunisian:TRS":"slip", "Tunisian:TFS":"crochet-slip", "Shared:Cable Cross":"cable-cross"
  };

  const cycCrochetSymbols = new Set(["CH","SL ST","SC","HDC","DC","TR","DTR","SC2TOG","DC2TOG","Puff","Bobble","PC","CL","Shell","Picot","FLO","BLO","FPDC","BPDC"]);
  const cycKnittingSymbols = new Set(["K","P","YO","K2TOG","P2TOG","SSK","SSP","KFB","M1L","M1R","KTBL","PTBL","Bobble"]);
  const cycCableSymbols = new Set(["1/1 LC","1/1 RC","2/2 LC","2/2 RC","1/1 LPC","1/1 RPC"]);

  const uploadedKnittingSymbols=new Set(["K","P","YO","KTBL","PTBL","M1L","M1R","K2TOG","P2TOG","SSK","SSP","CDD","1/1 LC","1/1 RC","2/2 LC","2/2 RC","3/3 LC","3/3 RC","1/1 LPC","1/1 RPC"]);
  const uploadedCrochetSymbols=new Set(["CH","SL ST","SC","HDC","DC","TR","DTR","SC INC","HDC INC","DC INC","SC2TOG","HDC2TOG","DC2TOG","PC","CL","Shell","Y-st","Picot","FLO","BLO","FPDC","BPDC"]);

  function sourceMetadata(craft, abbreviation, category, symbolIcon) {
    if (craft === "Crochet" && cycCrochetSymbols.has(abbreviation)) {
      const familyMark = ["Puff","Bobble"].includes(abbreviation);
      return {
        sourceType:"CYC",
        requiresReview:false,
        confidence:"High",
        sourceName:"Craft Yarn Council Crochet Chart Symbols",
        sourceUrl:SOURCE_URLS.cycCrochet,
        sourceNote:familyMark
          ? "CYC intentionally publishes one combined 3-hdc cluster/puff/bobble family mark. The shared glyph is correct; the pattern key decides the stitch name and loop count."
          : "Based on the Craft Yarn Council crochet chart-symbol standard; always confirm the pattern key."
      };
    }
    if(craft==="Crochet"&&uploadedCrochetSymbols.has(abbreviation))return{
      sourceType:"jp-cn-chart",requiresReview:false,confidence:"High",sourceName:uploadedReferenceName,sourceUrl:"",sourceNote:"Matched to the user-provided Chinese/Japanese-style crochet symbol reference; terminology and construction were cross-checked against CYC where available."
    };
    if(craft==="Knitting"&&uploadedKnittingSymbols.has(abbreviation))return{
      sourceType:"jp-cn-chart",requiresReview:false,confidence:"High",sourceName:uploadedReferenceName,sourceUrl:"",sourceNote:"Matched to the user-provided Chinese/Japanese-style knitting symbol reference; row-side meaning still follows the pattern legend."
    };
    if (craft === "Knitting" && cycKnittingSymbols.has(abbreviation)) return {
      sourceType:"common-knitting",
      requiresReview:false,
      confidence:"High",sourceName:"Craft Yarn Council Knit Chart Symbols",sourceUrl:SOURCE_URLS.cycKnit,
      sourceNote:"Based on the CYC knitting chart convention as viewed from the right side; RS/WS meaning may differ."
    };
    if (craft === "Knitting" && category === "Cable" && cycCableSymbols.has(abbreviation)) return {
      sourceType:"common-knitting",
      requiresReview:false,
      confidence:"High",sourceName:"CYC Knit Chart Symbols and Interweave cable chart guidance",sourceUrl:SOURCE_URLS.cycKnit,
      sourceNote:"Based on common CYC cable-cross direction. Cable marks span multiple cells and the pattern key controls exact placement."
    };
    if (craft === "Knitting" && category === "Cable" && ["C left","C right"].includes(abbreviation)) return {
      sourceType:"common-knitting",
      requiresReview:true,
      confidence:"Medium",sourceName:"Interweave cable chart guidance",sourceUrl:SOURCE_URLS.interweaveCables,
      sourceNote:"Conservative left/right crossing-lines icon. The generic abbreviation and exact cable width must be confirmed in the pattern key."
    };
    if (symbolIcon === "chart-rule") return { sourceType:"needs-review", requiresReview:true, confidence:"Medium",sourceName:"Tin Can Knits chart-reading guidance",sourceUrl:SOURCE_URLS.tinCanCharts,sourceNote:"Context guidance rather than a stitch glyph; publication instructions take priority." };
    return { sourceType:"needs-review", requiresReview:true, confidence:"Low",sourceName:"Pattern legend required",sourceUrl:"",sourceNote:"No single authoritative glyph was verified for this exact entry. Yarncha does not present a substitute chart symbol." };
  }

  function fallbackSymbolIcon(craft, category, abbreviation, fullName) {
    if (category === "Increase") return /purl|PFB/i.test(`${abbreviation} ${fullName}`) ? "purl-increase" : "increase";
    if (category === "Decrease") return /purl|SSP|P2/i.test(`${abbreviation} ${fullName}`) ? "purl-decrease-left" : "decrease-joined";
    if (category === "Cable") return "cable-cross";
    if (/purl/i.test(fullName)) return "purl";
    if (craft === "Knitting") return category === "Lace" ? "yarn-over" : "knit";
    if (craft === "Crochet") return "crochet-generic";
    if (craft === "Tunisian") return "knit-twisted";
    return "legend-specific";
  }

  const verifiedExplanations={
    "Knitting:K":"Work a knit stitch on the right side; the same chart cell may mean purl on a wrong-side row.",
    "Knitting:P":"Work a purl stitch on the right side; the same chart cell may mean knit on a wrong-side row.",
    "Knitting:YO":"Bring the yarn over the needle to create one new loop and usually an eyelet.",
    "Knitting:K2TOG":"Knit two stitches together, decreasing one stitch with a right-leaning result.",
    "Knitting:SSK":"Slip two stitches knitwise, then knit them together through the back loops for a left-leaning decrease.",
    "Knitting:KFB":"Knit into the front and back of one stitch to increase one stitch.",
    "Knitting:PFB":"Purl into the front and back of one stitch to increase one stitch.",
    "Crochet:CH":"Create one chain loop; an oval is the common chart mark.",
    "Crochet:SL ST":"Pull the working loop through the indicated stitch and the loop already on the hook.",
    "Crochet:SC":"Insert the hook, pull up a loop, yarn over and draw through both loops (US single crochet / UK double crochet).",
    "Crochet:HDC":"Yarn over, insert the hook, pull up a loop, then draw through all three loops (US half double / UK half treble).",
    "Crochet:DC":"Yarn over and draw through loops in two stages (US double crochet / UK treble).",
    "Crochet:TR":"Yarn over twice and draw through loops in three stages (US treble / UK double treble).",
    "Crochet:DTR":"Yarn over three times and draw through loops in four stages (US double treble / UK triple treble).",
    "Crochet:SC INC":"Work two single crochet stitches into the same stitch or space.",
    "Crochet:HDC INC":"Work two half double crochet stitches into the same stitch or space.",
    "Crochet:DC INC":"Work two double crochet stitches into the same stitch or space.",
    "Crochet:SC2TOG":"Join two single crochet stitches into one, decreasing the stitch count by one.",
    "Crochet:HDC2TOG":"Join two half double crochet stitches into one, decreasing the stitch count by one.",
    "Crochet:DC2TOG":"Join two double crochet stitches into one, decreasing the stitch count by one.",
    "Crochet:PC":"Complete the stated number of tall stitches in one place, remove the hook, then close the first and last stitch together as directed.",
    "Crochet:Puff":"Draw up multiple elongated loops in one place and close them together; loop count varies by pattern.",
    "Crochet:Bobble":"Work a group of partially completed tall stitches together so the stitch projects from the fabric.",
    "Crochet:CL":"Work the pattern-specified group of unfinished stitches and close them together at the top.",
    "Crochet:Shell":"Work the pattern-specified fan of tall stitches into one stitch or space.",
    "Crochet:V-st":"Work two tall stitches separated as directed into one stitch or space; exact V-stitch recipes vary.",
    "Crochet:Y-st":"A compound tall stitch with a shared stem and branching top; follow the pattern legend for construction.",
    "Crochet:Cross":"Work tall stitches so their stems cross; order and stitch count are pattern-specific.",
    "Crochet:Picot":"Form a short chain and join it back to its base as directed; chain count varies.",
    "Crochet:FLO":"Work only through the front loop of the indicated stitch.",
    "Crochet:BLO":"Work only through the back loop of the indicated stitch.",
    "Crochet:FPDC":"Work a US double crochet around the front of the indicated post (UK front-post treble).",
    "Crochet:BPDC":"Work a US double crochet around the back of the indicated post (UK back-post treble)."
  };

  function explanationFor(craft, abbreviation, fullName, category){
    return verifiedExplanations[`${craft}:${abbreviation}`] || `${fullName} is a ${craft.toLowerCase()} ${category.toLowerCase()} instruction whose exact operation and chart mark must be confirmed in the pattern legend.`;
  }

  const crochetRegionalTerms = {
    "CH": { us:"ch", uk:"ch", enUS:"Chain", enUK:"Chain", zhHK:"鎖針", zhCN:"锁针", cnAbbreviation:"CH" },
    "SL ST": { us:"sl st", uk:"ss", enUS:"Slip stitch", enUK:"Slip stitch", zhHK:"引拔針", zhCN:"引拔针", cnAbbreviation:"SL" },
    "SC": { us:"sc", uk:"dc", enUS:"Single crochet", enUK:"Double crochet", zhHK:"短針", zhCN:"短针", cnAbbreviation:"X" },
    "HDC": { us:"hdc", uk:"htr", enUS:"Half double crochet", enUK:"Half treble", zhHK:"中長針", zhCN:"中长针", cnAbbreviation:"T" },
    "DC": { us:"dc", uk:"tr", enUS:"Double crochet", enUK:"Treble", zhHK:"長針", zhCN:"长针", cnAbbreviation:"F" },
    "TR": { us:"tr", uk:"dtr", enUS:"Treble crochet", enUK:"Double treble", zhHK:"長長針", zhCN:"长长针", cnAbbreviation:"E" },
    "DTR": { us:"dtr", uk:"trtr", enUS:"Double treble crochet", enUK:"Triple treble", zhHK:"三卷長針", zhCN:"三卷长针", cnAbbreviation:"" },
    "SC INC": { us:"sc inc", uk:"dc inc", enUS:"Single crochet increase", enUK:"Double crochet increase", zhHK:"短針加針", zhCN:"短针加针", cnAbbreviation:"V" },
    "HDC INC": { us:"hdc inc", uk:"htr inc", enUS:"Half double crochet increase", enUK:"Half treble increase", zhHK:"中長針加針", zhCN:"中长针加针", cnAbbreviation:"" },
    "DC INC": { us:"dc inc", uk:"tr inc", enUS:"Double crochet increase", enUK:"Treble increase", zhHK:"長針加針", zhCN:"长针加针", cnAbbreviation:"" },
    "SC2TOG": { us:"sc2tog", uk:"dc2tog", enUS:"Single crochet two together", enUK:"Double crochet two together", zhHK:"短針二併一", zhCN:"短针减针", cnAbbreviation:"A" },
    "HDC2TOG": { us:"hdc2tog", uk:"htr2tog", enUS:"Half double crochet two together", enUK:"Half treble two together", zhHK:"中長針二併一", zhCN:"中长针减针", cnAbbreviation:"" },
    "DC2TOG": { us:"dc2tog", uk:"tr2tog", enUS:"Double crochet two together", enUK:"Treble two together", zhHK:"長針二併一", zhCN:"长针减针", cnAbbreviation:"" },
    "PC": { us:"pc", uk:"pc", enUS:"Popcorn", enUK:"Popcorn", zhHK:"爆米花針", zhCN:"爆米花针", cnAbbreviation:"" },
    "Puff": { us:"puff", uk:"puff", enUS:"Puff stitch", enUK:"Puff stitch", zhHK:"泡芙針／玉編", zhCN:"枣形针", cnAbbreviation:"" },
    "Shell": { us:"sh", uk:"sh", enUS:"Shell stitch", enUK:"Shell stitch", zhHK:"貝殼針", zhCN:"贝壳针", cnAbbreviation:"" },
    "FLO": { us:"FLO", uk:"FLO", enUS:"Front loop only", enUK:"Front loop only", zhHK:"外半針", zhCN:"外半针", cnAbbreviation:"" },
    "BLO": { us:"BLO", uk:"BLO", enUS:"Back loop only", enUK:"Back loop only", zhHK:"內半針", zhCN:"内半针", cnAbbreviation:"" }
    ,"FPDC": { us:"FPdc", uk:"FPtr", enUS:"Front post double crochet", enUK:"Front post treble", zhHK:"內鉤長針", zhCN:"内钩长针", cnAbbreviation:"NF" }
    ,"BPDC": { us:"BPdc", uk:"BPtr", enUS:"Back post double crochet", enUK:"Back post treble", zhHK:"外鉤長針", zhCN:"外钩长针", cnAbbreviation:"WF" }
  };

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function makeEntry([craft, category, abbreviation, fullName, symbol], index) {
    const key = `${craft}:${abbreviation}`;
    const provisionalSymbolIcon = symbolIcons[key] || fallbackSymbolIcon(craft, category, abbreviation, fullName);
    const provisionalVisualSymbol = visualSymbols[key] || "Legend-specific";
    const regional = craft === "Crochet" ? crochetRegionalTerms[abbreviation] || null : null;
    const needsLegend = true;
    const localized = localizedAliases[`${craft}:${abbreviation}`] || {};
    const terms = regional || {};
    const source = sourceMetadata(craft, abbreviation, category, provisionalSymbolIcon);
    const symbolIcon=source.confidence!=="High"&&provisionalSymbolIcon!=="chart-rule"?"legend-specific":provisionalSymbolIcon;
    const visualSymbol=source.confidence!=="High"?"Legend-specific":provisionalVisualSymbol;
    const hasKnownIcon = symbolIcon!=="legend-specific";
    const nameTraditionalChinese = terms.zhHK || localized["zh-HK"] || "需核對";
    const confidence=["High","Medium","Low"].includes(source.confidence)?source.confidence:"Low";
    const needsReview = confidence!=="High" || !hasKnownIcon || source.requiresReview || source.sourceType === "needs-review" || nameTraditionalChinese === "需核對" || (craft === "Crochet" && !regional);
    const abbreviationUS = terms.us || (craft === "Crochet" ? abbreviation.toLowerCase() : abbreviation);
    const abbreviationUK = terms.uk || (craft === "Crochet" ? "" : abbreviation);
    const aliases = [...new Set([abbreviation, abbreviationUS, abbreviationUK, terms.cnAbbreviation, fullName, terms.enUS, terms.enUK, terms.zhHK, terms.zhCN, fullName.replace(/ Stitch$/i, ""), ...Object.values(localized).flatMap(value=>value.split(/\s*\/\s*/))].filter(Boolean))];
    return {
      id: `${craftConfig[craft].prefix}-${slug(abbreviation || fullName)}-${index}`,
      section: craftConfig[craft].section,
      craft,
      category,
      symbol: visualSymbol,
      visualSymbol,
      symbolIcon,
      symbolType:symbolIcon,
      symbolDescription: symbol,
      abbreviation,
      abbreviationUS,
      abbreviationUK,
      abbreviationChinese: terms.cnAbbreviation || "",
      fullName,
      nameEnglish: terms.enUS || fullName,
      nameTraditionalChinese,
      nameEn: terms.enUS || fullName,
      nameZh: nameTraditionalChinese,
      nameSimplifiedChinese: terms.zhCN || localized["zh-CN"] || "需核对",
      explanation: explanationFor(craft, abbreviation, terms.enUS || fullName, category),
      description: `${fullName} is a ${craft.toLowerCase()} ${category.toLowerCase()} instruction. Its exact chart mark can vary by publication.`,
      howTo: `Follow the pattern's written instructions and legend for ${fullName}. Confirm stitch placement, orientation, and resulting stitch count before continuing.`,
      beginnerExplanation: `Read this as “${fullName}”. Practice it on a small swatch before using it in a fitted or counted section.`,
      difficulty: ["Basic"].includes(category) ? "Beginner" : ["Increase", "Decrease"].includes(category) ? "Intermediate" : "Advanced",
      aliases,
      languageVariants: {
        en: terms.enUS || fullName,
        "en-US": terms.enUS || fullName,
        "en-UK": terms.enUK || "Needs review",
        "zh-HK": nameTraditionalChinese,
        "zh-CN": terms.zhCN || localized["zh-CN"] || "需核对",
        ja: `${fullName} (${abbreviation})`,
        ...localized
      },
      relatedSymbols: definitions.filter(row => row[0] === craft && row[1] === category && row[2] !== abbreviation).slice(0, 4).map(row => row[2]),
      commonMistakes: ["Using a generic internet symbol instead of the pattern legend", "Missing direction, side, placement, or stitch-count changes"],
      chartExamples: [`${visualSymbol} → possible ${abbreviation}`, `${abbreviation} in a repeat or chart cell`],
      recognitionAliases: [...new Set([...aliases, visualSymbol, symbol].filter(Boolean))],
      ocrKeywords: [...new Set(aliases.map(value => String(value).toLowerCase()))],
      possibleMeanings: needsLegend ? [...new Set([abbreviation, fullName, category === "Lace" ? "Eyelet or increase" : `${category} instruction`, "Publisher-specific meaning"])] : [abbreviation, fullName],
      ambiguityWarnings: needsLegend ? ["The same mark can mean different actions in another chart.", "Direction and RS/WS context may change the instruction."] : ["Confirm terminology and chart legend."],
      confidenceHint: needsLegend ? "Treat as a candidate match only. Always check the chart legend." : "Use abbreviation, craft, row direction, and legend together.",
      requiresLegendCheck: true,
      chartLegendWarning,
      sourceType:source.sourceType,
      sourceName:source.sourceName,
      sourceUrl:source.sourceUrl,
      sourceNote:source.sourceNote,
      lastVerifiedDate:LAST_VERIFIED_DATE,
      confidence,
      tags:[craft,category],
      notes:"",
      customSvg:"",
      verificationStatus:confidence==="High"&&!needsReview ? "Confirmed" : "To Be Confirmed",
      verifiedDate:confidence==="High"&&!needsReview?LAST_VERIFIED_DATE:"",
      verifiedBy:"",
      verificationNotes:"",
      flowModeReady: !needsReview,
      reviewStatus: needsReview ? "needs-review" : "reviewed-foundation",
      needsReview,
      regionTags: craft === "Crochet" ? (regional ? ["US", "UK", "CN", "Chart Symbol"] : ["US", "Chart Symbol"]) : ["CN", "Chart Symbol"]
    };
  }

  function makeRule([craft, fullName, description], index) {
    return {
      id: `rule-${slug(craft)}-${slug(fullName)}-${index}`,
      section: "Chart Reading Rules",
      craft,
      category: "Chart Rule",
      symbol: "Rule",
      visualSymbol: "↔",
      symbolIcon: "chart-rule",
      symbolType: "chart-rule",
      symbolDescription: "Context rule",
      abbreviation: "",
      abbreviationUS: "",
      abbreviationUK: "",
      abbreviationChinese: "",
      fullName,
      nameEnglish: fullName,
      nameTraditionalChinese: "圖表閱讀規則",
      nameEn: fullName,
      nameZh: "圖表閱讀規則",
      nameSimplifiedChinese: "图表阅读规则",
      explanation: description,
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
      chartLegendWarning,
      sourceType:"needs-review",
      sourceName:"Tin Can Knits chart-reading guidance",
      sourceUrl:SOURCE_URLS.tinCanCharts,
      sourceNote:"Educational chart-reading guidance, not a standardized stitch glyph.",
      lastVerifiedDate:LAST_VERIFIED_DATE,
      confidence:"Medium",
      tags:[craft,"Chart Rule"],
      notes:"",
      customSvg:"",
      verificationStatus:"To Be Confirmed",
      verifiedDate:"",
      verifiedBy:"",
      verificationNotes:"",
      flowModeReady: true,
      reviewStatus: "context-only",
      needsReview: false,
      regionTags: ["Chart Symbol"]
    };
  }

  const auditedDefinitions=definitions.filter(([craft,,abbreviation,fullName])=>!duplicateAliasesToRemove.has(`${craft}:${abbreviation}`)&&!duplicateAliasesToRemove.has(`${craft}:${fullName}`));
  const entries = Object.freeze([
    ...auditedDefinitions.map(makeEntry),
    ...ruleDefinitions.map(makeRule)
  ].map(Object.freeze));

  function normalizeEntry(raw = {}) {
    const craft = craftConfig[raw.craft] ? raw.craft : "Shared";
    const base = makeEntry([craft, raw.category || "Special Stitch", raw.abbreviation || "", raw.fullName || "Custom Symbol", raw.symbol || "Custom"], `custom-${slug(raw.id || raw.fullName || Date.now())}`);
    return { ...base, ...raw, id:raw.id || base.id, aliases:[...new Set([...(base.aliases||[]),...(raw.aliases||[])])], recognitionAliases:[...new Set([...(base.recognitionAliases||[]),...(raw.recognitionAliases||[])])], ocrKeywords:[...new Set([...(base.ocrKeywords||[]),...(raw.ocrKeywords||[])])], requiresLegendCheck:raw.requiresLegendCheck!==false };
  }

  function searchEntries(sourceEntries = entries, query = "", filters = {}) {
    const needle = query.trim().toLowerCase();
    return sourceEntries.filter(entry => {
      if (filters.craft && filters.craft !== "All" && entry.craft !== filters.craft) return false;
      if (filters.category && filters.category !== "All" && entry.category !== filters.category) return false;
      if (filters.difficulty && filters.difficulty !== "All" && entry.difficulty !== filters.difficulty) return false;
      if (filters.terminology && filters.terminology !== "All" && !entry.regionTags.includes(filters.terminology)) return false;
      if (filters.verification && filters.verification !== "All" && entry.verificationStatus !== filters.verification) return false;
      if (!needle) return true;
      const haystack=[entry.visualSymbol, entry.abbreviation, entry.abbreviationUS, entry.abbreviationUK, entry.abbreviationChinese, entry.fullName, entry.nameEnglish, entry.nameTraditionalChinese, entry.nameSimplifiedChinese, entry.category, entry.description, entry.sourceName, entry.confidence, entry.verificationStatus, ...(entry.tags||[]), ...(entry.regionTags||[]), ...entry.aliases, ...entry.recognitionAliases, ...entry.ocrKeywords]
        .join(" ").toLowerCase();
      return needle.split(/\s+/).every(token=>haystack.includes(token));
    });
  }

  function search(query = "", filters = {}) { return searchEntries(entries, query, filters); }

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

  function audit(sourceEntries = entries) {
    const abbreviationGroups=new Map();
    const symbolGroups=new Map();
    for(const entry of sourceEntries){
      const key=String(entry.abbreviation||"").trim().toUpperCase();
      if(key)abbreviationGroups.set(key,[...(abbreviationGroups.get(key)||[]),entry]);
      if(!["legend-specific","chart-rule"].includes(entry.symbolType)){
        const symbolKey=`${entry.craft}:${entry.symbolType}`;
        symbolGroups.set(symbolKey,[...(symbolGroups.get(symbolKey)||[]),entry]);
      }
    }
    const crochetOnly=/^(chain|slip-stitch-crochet|single-crochet|half-double-crochet|double-crochet|treble-crochet|double-treble-crochet|single-crochet-increase|half-double-crochet-increase|double-crochet-increase|single-crochet-decrease|half-double-crochet-decrease|double-crochet-decrease|front-loop|back-loop|front-post|back-post|cluster|cluster-decrease|popcorn|puff|bobble|shell|v-stitch|y-stitch|crochet-cross|picot)$/;
    const knittingOnly=/^(knit|purl|knit-twisted|purl-twisted|increase-kfb|knit-bobble|purl-increase|purl-decrease|decrease-centred|cable-left|cable-right|cable-left-wide|cable-right-wide|cable-left-purl|cable-right-purl|cable-twisted)$/;
    return {
      totalEntries:sourceEntries.length,
      missingSymbolType:sourceEntries.filter(entry=>!entry.symbolType||!entry.visualSymbol).map(entry=>entry.id),
      needsReview:sourceEntries.filter(entry=>entry.needsReview).map(entry=>entry.id),
      duplicateAbbreviations:[...abbreviationGroups.entries()].filter(([,items])=>items.length>1).map(([abbreviation,items])=>({abbreviation,entries:items.map(entry=>({id:entry.id,craft:entry.craft,name:entry.nameEn}))})),
      duplicateSymbolWarnings:[...symbolGroups.entries()].filter(([key,items])=>items.length>1&&key!=="Crochet:cyc-hdc-cluster").map(([symbolType,items])=>({symbolType,entries:items.map(entry=>({id:entry.id,name:entry.nameEn}))})),
      intentionalSharedSymbols:[...symbolGroups.entries()].filter(([key,items])=>items.length>1&&key==="Crochet:cyc-hdc-cluster").map(([symbolType,items])=>({symbolType,entries:items.map(entry=>entry.nameEn)})),
      craftMismatchWarnings:sourceEntries.filter(entry=>(entry.craft==="Knitting"&&crochetOnly.test(entry.symbolType))||(entry.craft==="Crochet"&&knittingOnly.test(entry.symbolType))).map(entry=>({id:entry.id,craft:entry.craft,symbolType:entry.symbolType}))
    };
  }

  root.YarnchaSymbolDatabase = Object.freeze({ schemaVersion:5, entries, defaultSymbols:entries, categoryOrder, search, searchEntries, recognitionCandidates, normalizeEntry, audit, chartLegendWarning });
})(globalThis);
