(function initializeYarnchaSymbolDatabase(root) {
  const categoryOrder = ["Basic", "Chain", "Slip Stitch", "Increase", "Decrease", "Loop Placement", "Post Stitch", "Shell", "Lace", "Cable", "Texture", "Colourwork", "Amigurumi", "Short Row", "Chart Structure", "Construction", "Finishing", "Special Stitch", "Chart Rule"];

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
    ["Knitting", "Special Stitch", "MB", "Bobble", "filled or outlined bobble"],
    ["Knitting", "Special Stitch", "Wrap", "Wrapped Stitch", "loop around stitch"],
    ["Knitting", "Special Stitch", "BR", "Brioche Symbol", "brioche-specific mark"],
    ["Knitting", "Special Stitch", "DK", "Double Knitting Symbol", "two-layer cell mark"],

    ["Crochet", "Chain", "CH", "Chain", "oval"],
    ["Crochet", "Slip Stitch", "SL ST", "Slip Stitch", "dot or filled oval"],
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
    ["Crochet", "Texture", "PC", "Popcorn", "outlined popcorn cluster"],
    ["Crochet", "Texture", "Puff", "Puff Stitch", "puffy oval cluster"],
    ["Crochet", "Texture", "Bobble", "Bobble Stitch", "compact cluster"],
    ["Crochet", "Texture", "CL", "Cluster", "joined unfinished stitches"],
    ["Crochet", "Shell", "Shell", "Shell Stitch", "fan of tall stitches"],
    ["Crochet", "Shell", "V-st", "V Stitch", "V-shaped pair"],
    ["Crochet", "Shell", "Y-st", "Y Stitch", "Y-shaped tall stitch"],
    ["Crochet", "Special Stitch", "Cross", "Cross Stitch", "crossed tall stitches"],
    ["Crochet", "Special Stitch", "Picot", "Picot", "small loop or triangle"],
    ["Crochet", "Loop Placement", "FLO", "Front Loop Only", "upper arc"],
    ["Crochet", "Loop Placement", "BLO", "Back Loop Only", "lower arc"],
    ["Crochet", "Post Stitch", "FPDC", "Front Post Double Crochet", "front-post double crochet"],
    ["Crochet", "Post Stitch", "BPDC", "Back Post Double Crochet", "back-post double crochet"],

    ["Tunisian", "Basic", "TSS", "Tunisian Simple Stitch", "Afghan-chart cell with a vertical bar"],
    ["Tunisian", "Basic", "TPS", "Tunisian Purl Stitch", "Afghan-chart cell with a horizontal purl bar"],
    ["Tunisian", "Basic", "TKS", "Tunisian Knit Stitch", "Afghan-chart cell with a teardrop insertion mark"],
    ["Tunisian", "Basic", "TRS", "Tunisian Reverse Stitch", "Afghan-chart reverse-stitch cell"],
    ["Tunisian", "Basic", "TFS", "Tunisian Full Stitch", "Afghan-chart gap insertion mark"],
    ["Tunisian", "Basic", "TDC", "Tunisian Double Crochet", "Afghan-chart tall-stitch cell"],
    ["Tunisian", "Basic", "TSLST", "Tunisian Slip Stitch", "Afghan-chart elongated slip mark"],
    ["Tunisian", "Lace", "TYO", "Tunisian Yarn Over", "Afghan-chart yarn-over variation"],
    ["Tunisian", "Lace", "TYO-FS", "Tunisian Yarn Over into Full-Stitch Space", "Afghan-chart yarn-over and space insertion variation"],
    ["Tunisian", "Increase", "T INC 1→3", "Tunisian One-to-Three Increase", "one chart cell branching into three loops"],
    ["Tunisian", "Decrease", "T2TOG", "Tunisian Two Together", "two chart cells joined into one"],
    ["Tunisian", "Decrease", "T3TOG", "Tunisian Three Together", "three chart cells joined into one"],
    ["Tunisian", "Decrease", "T4TOG", "Tunisian Four Together", "four chart cells joined into one"],
    ["Tunisian", "Decrease", "T5TOG", "Tunisian Five Together", "five chart cells joined into one"],
    ["Tunisian", "Cable", "TC-A", "Tunisian Cross Stitch A", "two-cell Afghan cable cross A"],
    ["Tunisian", "Cable", "TC-B", "Tunisian Cross Stitch B", "two-cell Afghan cable cross B"],
    ["Tunisian", "Cable", "TDC-X", "Crossed Tunisian Double Crochet", "crossed tall-stitch cells"],
    ["Tunisian", "Cable", "T3-LC", "Tunisian Left Three-Stitch Cross", "three-stitch left cross on return-stitch background"],
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
    ["Shared", "Decrease", "BR dec", "Brioche Decrease", "brioche joined mark"],
    ["Knitting","Basic","St st","Stockinette Stitch","smooth knit fabric"],
    ["Knitting","Basic","G st","Garter Stitch","horizontal ridges"],
    ["Knitting","Basic","Rev St st","Reverse Stockinette","purl-side fabric"],
    ["Knitting","Basic","Rib","Ribbing","alternating knit and purl columns"],
    ["Knitting","Texture","Seed","Seed Stitch","alternating knit and purl texture"],
    ["Knitting","Texture","Moss","Moss Stitch","staggered knit and purl texture"],
    ["Knitting","Basic","K1B","Knit One Below","work into stitch below"],
    ["Knitting","Basic","P1B","Purl One Below","purl into stitch below"],
    ["Knitting","Decrease","Sl1-k1-psso","Slip One, Knit One, Pass Slipped Stitch Over","left decrease"],
    ["Knitting","Increase","M1","Make One","single increase"],
    ["Knitting","Increase","M1PL","Make One Purlwise Left","left purl increase"],
    ["Knitting","Increase","M1PR","Make One Purlwise Right","right purl increase"],
    ["Knitting","Increase","LLI","Left Lifted Increase","left lifted increase"],
    ["Knitting","Increase","RLI","Right Lifted Increase","right lifted increase"],
    ["Knitting","Increase","Backward loop CO inc","Backward Loop Cast-on Increase","cast-on increase"],
    ["Knitting","Increase","Cable CO inc","Cable Cast-on Increase","cast-on increase"],
    ["Knitting","Decrease","K3TOG","Knit Three Together","right double decrease"],
    ["Knitting","Decrease","P3TOG","Purl Three Together","purl double decrease"],
    ["Knitting","Decrease","S2KP","Slip Two, Knit One, Pass Slipped Stitches Over","centred double decrease"],
    ["Knitting","Decrease","Sl1-k2tog-psso","Slip One, Knit Two Together, Pass Slipped Stitch Over","double decrease"],
    ["Knitting","Lace","YRN","Yarn Round Needle","yarn over"],
    ["Knitting","Lace","YFWD","Yarn Forward","yarn over"],
    ["Knitting","Lace","Double YO","Double Yarn Over","double eyelet"],
    ["Knitting","Chart Structure","No stitch","No Stitch","empty chart placeholder"],
    ["Knitting","Lace","K2tog + YO","K2tog and Yarn Over Pair","balanced lace pair"],
    ["Knitting","Lace","SSK + YO","SSK and Yarn Over Pair","balanced lace pair"],
    ["Knitting","Chart Structure","Lace repeat","Lace Repeat Box","repeat boundary"],
    ["Knitting","Basic","Sl1 wyif","Slip One With Yarn in Front","slipped stitch"],
    ["Knitting","Basic","Sl1 wyib","Slip One With Yarn in Back","slipped stitch"],
    ["Knitting","Basic","Sl knitwise","Slip Knitwise","slipped stitch"],
    ["Knitting","Basic","Sl purlwise","Slip Purlwise","slipped stitch"],
    ["Knitting","Decrease","PSSO","Pass Slipped Stitch Over","decrease step"],
    ["Knitting","Basic","WYIF","With Yarn in Front","yarn position"],
    ["Knitting","Basic","WYIB","With Yarn in Back","yarn position"],
    ["Knitting","Cable","C2F","Cable Two Front","one-over-one left cable"],
    ["Knitting","Cable","C2B","Cable Two Back","one-over-one right cable"],
    ["Knitting","Cable","C4F","Cable Four Front","two-over-two left cable"],
    ["Knitting","Cable","C4B","Cable Four Back","two-over-two right cable"],
    ["Knitting","Cable","C6F","Cable Six Front","three-over-three left cable"],
    ["Knitting","Cable","C6B","Cable Six Back","three-over-three right cable"],
    ["Knitting","Cable","LC","Left Cross","left cable cross"],
    ["Knitting","Cable","RC","Right Cross","right cable cross"],
    ["Knitting","Cable","Cable over purl","Cable Over Purl Stitches","cable with purl background"],
    ["Knitting","Cable","Cable no needle","Cable Without a Cable Needle","cable cross"],
    ["Knitting","Cable","RT","Right Twist","small right twist"],
    ["Knitting","Cable","LT","Left Twist","small left twist"],
    ["Knitting","Texture","Twisted rib","Twisted Rib","twisted rib columns"],
    ["Knitting","Texture","Kfbf","Knit Front, Back, Front","multi-stitch texture increase"],
    ["Knitting","Texture","Purl bump","Purl Bump Texture","raised purl bump"],
    ["Knitting","Colourwork","MC","Main Colour","main colour cell"],
    ["Knitting","Colourwork","CC","Contrast Colour","contrast colour cell"],
    ["Knitting","Colourwork","Colour A/B","Colour A / Colour B","colour chart cell"],
    ["Knitting","Colourwork","Stranded cell","Stranded Colourwork Cell","colour cell"],
    ["Knitting","Colourwork","Intarsia block","Intarsia Colour Block","colour block"],
    ["Knitting","Colourwork","Duplicate st","Duplicate Stitch Mark","embroidery mark"],
    ["Knitting","Colourwork","Float","Float","carried yarn"],
    ["Knitting","Colourwork","Catch float","Catch Float","secured carried yarn"],
    ["Knitting","Short Row","W&T","Wrap and Turn","short-row turn"],
    ["Knitting","Short Row","DS","German Short Row Double Stitch","double stitch"],
    ["Knitting","Short Row","Japanese SR","Japanese Short Row Marker","short-row marker"],
    ["Knitting","Short Row","Shadow wrap","Shadow Wrap","short-row turn"],
    ["Knitting","Short Row","Turn","Turn","turn work"],
    ["Knitting","Chart Structure","RS","Right Side","right-side row"],
    ["Knitting","Chart Structure","WS","Wrong Side","wrong-side row"],
    ["Knitting","Chart Structure","BOR","Beginning of Round","round start"],
    ["Knitting","Chart Structure","PM","Place Marker","marker instruction"],
    ["Knitting","Chart Structure","SM","Slip Marker","marker instruction"],
    ["Knitting","Chart Structure","RM","Remove Marker","marker instruction"],
    ["Knitting","Chart Structure","Repeat box","Repeat Box","repeat boundary"],
    ["Knitting","Chart Structure","Pattern repeat","Pattern Repeat","repeat instruction"],
    ["Knitting","Chart Structure","Bracket repeat","Bracket Repeat","repeat instruction"],
    ["Knitting","Chart Structure","* repeat","Asterisk Repeat","repeat instruction"],
    ["Knitting","Chart Structure","Edge st","Edge Stitch","edge cell"],
    ["Knitting","Chart Structure","Selvedge","Selvedge Stitch","edge stitch"],
    ["Knitting","Chart Structure","Centre st","Centre Stitch","centre marker"],
    ["Knitting","Chart Structure","Set-up row","Set-up Row","preparatory row"],
    ["Knitting","Chart Structure","Legend","Chart Key / Legend","symbol key"],
    ["Knitting","Construction","CO","Cast On","cast-on instruction"],
    ["Knitting","Construction","BO","Bind Off","bind-off instruction"],
    ["Knitting","Construction","Pick up & knit","Pick Up and Knit","picked-up stitches"],
    ["Knitting","Construction","Pick up & purl","Pick Up and Purl","picked-up stitches"],
    ["Knitting","Construction","Join round","Join in the Round","round join"],
    ["Knitting","Construction","Join yarn","Join New Yarn","yarn join"],
    ["Knitting","Construction","Break yarn","Break Yarn","cut yarn"],
    ["Knitting","Construction","Return held sts","Place Held Stitches on Needle","held stitches"],
    ["Knitting","Construction","Hold sts","Put Stitches on Holder","held stitches"],
    ["Knitting","Construction","Kitchener","Graft / Kitchener Stitch","grafted seam"],
    ["Knitting","Construction","3-needle BO","Three-needle Bind Off","joined bind-off"],
    ["Crochet","Chain","ch-sp","Chain Space","open chain space"],
    ["Crochet","Chain","sp","Space","open stitch space"],
    ["Crochet","Chain","foundation ch","Foundation Chain","foundation ovals"],
    ["Crochet","Chain","turning ch","Turning Chain","row-height chains"],
    ["Crochet","Chain","MR","Magic Ring / Magic Circle","adjustable ring"],
    ["Crochet","Chain","adjustable ring","Adjustable Ring","adjustable ring"],
    ["Crochet","Chain","fsc","Foundation Single Crochet","foundation single crochet"],
    ["Crochet","Chain","fhdc","Foundation Half Double Crochet","foundation half double crochet"],
    ["Crochet","Chain","fdc","Foundation Double Crochet","foundation double crochet"],
    ["Crochet","Basic","TRTR","Triple Treble Crochet","very tall stitch"],
    ["Crochet","Increase","inc","Increase","two stitches from one base"],
    ["Crochet","Increase","2 sc","Two Single Crochet in Same Stitch","two stitches from one base"],
    ["Crochet","Increase","3 sc","Three Single Crochet in Same Stitch","three stitches from one base"],
    ["Crochet","Increase","2 hdc","Two Half Double Crochet in Same Stitch","two stitches from one base"],
    ["Crochet","Increase","2 dc","Two Double Crochet in Same Stitch","two stitches from one base"],
    ["Crochet","Increase","3 dc","Three Double Crochet in Same Stitch","three stitches from one base"],
    ["Crochet","Increase","3 hdc","Three Half Double Crochet in Same Stitch","three stitches from one base"],
    ["Crochet","Increase","2 tr","Two Treble Crochet in Same Stitch","two stitches from one base"],
    ["Crochet","Increase","3 tr","Three Treble Crochet in Same Stitch","three stitches from one base"],
    ["Crochet","Increase","corner inc","Corner Increase","corner group"],
    ["Crochet","Increase","shell inc","Shell Increase","shell from one base"],
    ["Crochet","Increase","amigurumi inc","Amigurumi Increase","two single crochet from one base"],
    ["Crochet","Decrease","dec","Decrease","two bases joined at top"],
    ["Crochet","Decrease","TR2TOG","Treble Crochet Two Together","joined tall stitches"],
    ["Crochet","Decrease","SC3TOG","Single Crochet Three Together","three bases joined at top"],
    ["Crochet","Decrease","HDC3TOG","Half Double Crochet Three Together","three bases joined at top"],
    ["Crochet","Decrease","DC3TOG","Double Crochet Three Together","three bases joined at top"],
    ["Crochet","Decrease","TR3TOG","Treble Crochet Three Together","three bases joined at top"],
    ["Crochet","Decrease","inv dec","Invisible Decrease","front-loop decrease"],
    ["Crochet","Decrease","sk dec","Skipped-stitch Decrease","skipped base"],
    ["Crochet","Decrease","amigurumi dec","Amigurumi Decrease","invisible decrease"],
    ["Crochet","Loop Placement","both loops","Both Loops","top loops"],
    ["Crochet","Loop Placement","third loop","Third Loop","rear horizontal loop"],
    ["Crochet","Loop Placement","back bump","Back Bump of Chain","back chain bump"],
    ["Crochet","Loop Placement","FLO dec","Front Loop Decrease","front-loop decrease"],
    ["Crochet","Loop Placement","BLO rib","Back Loop Ribbing","ribbed loop placement"],
    ["Crochet","Post Stitch","FPSC","Front Post Single Crochet","front post stitch"],
    ["Crochet","Post Stitch","BPSC","Back Post Single Crochet","back post stitch"],
    ["Crochet","Post Stitch","FPHDC","Front Post Half Double Crochet","front post stitch"],
    ["Crochet","Post Stitch","BPHDC","Back Post Half Double Crochet","back post stitch"],
    ["Crochet","Post Stitch","FPTR","Front Post Treble Crochet","front post tall stitch"],
    ["Crochet","Post Stitch","BPTR","Back Post Treble Crochet","back post tall stitch"],
    ["Crochet","Post Stitch","post rib","Post Stitch Ribbing","raised ribbing"],
    ["Crochet","Post Stitch","raised texture","Raised Post Texture","raised stitches"],
    ["Crochet","Post Stitch","crochet cable","Cable-style Crochet","crossed post stitches"],
    ["Crochet","Shell","fan","Fan Stitch","fan group"],
    ["Crochet","Shell","5 dc shell","Five Double Crochet Shell","five-stitch shell"],
    ["Crochet","Shell","3 dc group","Three Double Crochet Group","three-stitch group"],
    ["Crochet","Shell","granny cl","Granny Cluster","three-stitch cluster"],
    ["Crochet","Shell","corner shell","Corner Shell","corner stitch group"],
    ["Crochet","Shell","space cluster","Cluster in Chain Space","cluster group"],
    ["Crochet","Shell","multi in sp","Multiple Stitches in One Space","grouped stitches"],
    ["Crochet","Texture","dc cluster","Double Crochet Cluster","closed cluster"],
    ["Crochet","Texture","tr cluster","Treble Crochet Cluster","tall closed cluster"],
    ["Crochet","Texture","puff cluster","Puff Cluster","raised cluster"],
    ["Crochet","Texture","closed cl","Closed Cluster","loops closed together"],
    ["Crochet","Texture","loop st","Loop Stitch","looped texture"],
    ["Crochet","Finishing","fringe","Fringe","decorative strands"],
    ["Crochet","Finishing","surface crochet","Surface Crochet","surface slip stitches"],
    ["Crochet","Lace","open mesh","Open Mesh","open filet cell"],
    ["Crochet","Lace","filled mesh","Filled Mesh","filled filet cell"],
    ["Crochet","Lace","filet block","Filet Crochet Block","filet block"],
    ["Crochet","Lace","skip st","Skip Stitch","skipped base"],
    ["Crochet","Lace","dc-ch mesh","Double Crochet Chain Mesh","mesh repeat"],
    ["Crochet","Lace","pineapple","Pineapple Motif","pineapple lace"],
    ["Crochet","Lace","lace repeat","Lace Repeat","repeat boundary"],
    ["Crochet","Colourwork","MC","Main Colour","main colour cell"],
    ["Crochet","Colourwork","CC","Contrast Colour","contrast colour cell"],
    ["Crochet","Colourwork","colour change","Colour Change","colour transition"],
    ["Crochet","Colourwork","tapestry cell","Tapestry Crochet Cell","colour cell"],
    ["Crochet","Colourwork","intarsia block","Intarsia Crochet Block","colour block"],
    ["Crochet","Colourwork","carry yarn","Carry Yarn","carried colour"],
    ["Crochet","Colourwork","drop yarn","Drop Yarn","released colour"],
    ["Crochet","Colourwork","join colour","Join New Colour","colour join"],
    ["Crochet","Colourwork","surface colour","Surface Colour Mark","surface decoration"],
    ["Crochet","Amigurumi","continuous rnds","Continuous Rounds","spiral rounds"],
    ["Crochet","Amigurumi","st marker","Stitch Marker / BOR","round marker"],
    ["Crochet","Amigurumi","stuff","Stuff","stuffing instruction"],
    ["Crochet","Amigurumi","safety eyes","Attach Safety Eyes","eye placement"],
    ["Crochet","Amigurumi","sew piece","Sew Piece","assembly instruction"],
    ["Crochet","Amigurumi","embroider","Embroider Detail","surface detail"],
    ["Crochet","Amigurumi","close hole","Close Hole","final closure"],
    ["Crochet","Finishing","sl st join","Slip Stitch Join","round join"],
    ["Crochet","Finishing","join yarn","Join New Yarn","yarn join"],
    ["Crochet","Finishing","FO","Fasten Off","finish yarn"],
    ["Crochet","Finishing","weave ends","Weave in Ends","hidden ends"],
    ["Crochet","Finishing","seam","Seam Pieces","joined edges"],
    ["Crochet","Finishing","join motifs","Join Motifs","motif join"],
    ["Crochet","Finishing","JAYG","Join as You Go","live motif join"],
    ["Crochet","Finishing","whip join","Whip Stitch Join","sewn join"],
    ["Crochet","Finishing","mattress seam","Mattress-style Crochet Seam","hidden seam"],
    ["Crochet","Finishing","invisible join","Invisible Join","seamless round finish"],
    ["Crochet","Finishing","standing st","Standing Stitch Join","new-round join"],
    ["Crochet","Chart Structure","RS","Right Side","right-side row"],
    ["Crochet","Chart Structure","WS","Wrong Side","wrong-side row"],
    ["Crochet","Chart Structure","turn","Turn","turn work"],
    ["Crochet","Chart Structure","do not turn","Do Not Turn","continue same direction"],
    ["Crochet","Chart Structure","rnd","Round","round instruction"],
    ["Crochet","Chart Structure","row","Row","row instruction"],
    ["Crochet","Chart Structure","repeat","Repeat","repeat instruction"],
    ["Crochet","Chart Structure","repeat box","Repeat Box","repeat boundary"],
    ["Crochet","Chart Structure","* repeat","Asterisk Repeat","repeat instruction"],
    ["Crochet","Chart Structure","bracket repeat","Bracket Repeat","repeat instruction"],
    ["Crochet","Chart Structure","corner","Corner","corner placement"],
    ["Crochet","Chart Structure","st count","Stitch Count","count checkpoint"],
    ["Crochet","Chart Structure","BOR","Beginning of Round","round start"],
    ["Crochet","Chart Structure","PM","Place Marker","marker instruction"],
    ["Crochet","Chart Structure","MM","Move Marker","marker instruction"],
    ["Crochet","Chart Structure","EOR","End of Round","round end"],
    ["Crochet","Chart Structure","no stitch","No Stitch","empty chart placeholder"],
    ["Tunisian","Chart Structure","TC","Tunisian Crochet","two-pass crochet fabric"],
    ["Tunisian","Chart Structure","FwP","Forward Pass","loops collected on hook"],
    ["Tunisian","Chart Structure","RetP","Return Pass","loops worked off hook"],
    ["Tunisian","Chart Structure","Std RetP","Standard Return Pass","chain then pairs closed"],
    ["Tunisian","Construction","foundation ch","Foundation Chain","foundation chain"],
    ["Tunisian","Construction","set-up row","Set-up / Foundation Row","first pickup row"],
    ["Tunisian","Chart Structure","loop on hook","Loop on Hook","retained loop"],
    ["Tunisian","Chart Structure","vertical bar","Vertical Bar","upright stitch bar"],
    ["Tunisian","Chart Structure","front bar","Front Vertical Bar","front upright bar"],
    ["Tunisian","Chart Structure","back bar","Back Vertical Bar","back upright bar"],
    ["Tunisian","Chart Structure","horizontal bar","Horizontal Bar","horizontal strand"],
    ["Tunisian","Chart Structure","top bar","Top Bar","top stitch loops"],
    ["Tunisian","Construction","edge st","Edge Stitch","edge loop"],
    ["Tunisian","Construction","last st","Last / End Stitch","two side loops"],
    ["Tunisian","Chart Structure","RS","Right Side","right side"],
    ["Tunisian","Chart Structure","WS","Wrong Side","wrong side"],
    ["Tunisian","Chart Structure","no turn","Do Not Turn","keep right side facing"],
    ["Tunisian","Chart Structure","turn","Turn When Instructed","turn work"],
    ["Tunisian","Finishing","BO","Bind Off / Cast Off","finished edge"],
    ["Tunisian","Finishing","sl st BO","Slip-stitch Bind Off","slip-stitch edge"],
    ["Tunisian","Basic","TWTSS","Tunisian Twisted Simple Stitch","twisted vertical bar"],
    ["Tunisian","Basic","ETSS","Extended Tunisian Simple Stitch","extended vertical bar"],
    ["Tunisian","Basic","TSC","Tunisian Single Crochet","short Tunisian stitch"],
    ["Tunisian","Basic","THDC","Tunisian Half Double Crochet","medium Tunisian stitch"],
    ["Tunisian","Basic","TTR","Tunisian Treble Crochet","tall Tunisian stitch"],
    ["Tunisian","Increase","TYO inc","Yarn Over Increase","extra loop"],
    ["Tunisian","Increase","TFS inc","Tunisian Full Stitch Increase","loop in space"],
    ["Tunisian","Increase","VB inc","Increase in Vertical Bar","extra loop from bar"],
    ["Tunisian","Increase","HB inc","Increase in Horizontal Bar","extra loop from horizontal strand"],
    ["Tunisian","Increase","beg inc","Increase at Beginning of Row","edge increase"],
    ["Tunisian","Increase","end inc","Increase at End of Row","edge increase"],
    ["Tunisian","Increase","M1T","Make One Tunisian Increase","hidden increase"],
    ["Tunisian","Increase","multi-loop inc","Multiple Loops in Same Space","fan increase"],
    ["Tunisian","Increase","eyelet inc","Eyelet Increase","open increase"],
    ["Tunisian","Increase","invisible inc","Invisible Increase","hidden increase"],
    ["Tunisian","Decrease","TSS2TOG","Tunisian Simple Stitch Two Together","two bars joined"],
    ["Tunisian","Decrease","TKS2TOG","Tunisian Knit Stitch Two Together","two knit insertions joined"],
    ["Tunisian","Decrease","TPS2TOG","Tunisian Purl Stitch Two Together","two purl insertions joined"],
    ["Tunisian","Decrease","beg dec","Decrease at Beginning of Row","edge decrease"],
    ["Tunisian","Decrease","end dec","Decrease at End of Row","edge decrease"],
    ["Tunisian","Decrease","centred dec","Centered Decrease","centred joined bars"],
    ["Tunisian","Decrease","left dec","Left-leaning Decrease","left-leaning join"],
    ["Tunisian","Decrease","right dec","Right-leaning Decrease","right-leaning join"],
    ["Tunisian","Decrease","skip dec","Skip-stitch Decrease","skipped bar"],
    ["Tunisian","Decrease","BO dec","Bind-off Decrease","decreased bind off"],
    ["Tunisian","Chart Structure","YO pull 1","Yarn Over, Pull Through One Loop","return-pass chain"],
    ["Tunisian","Chart Structure","YO pull 2","Yarn Over, Pull Through Two Loops","return-pass closing"],
    ["Tunisian","Lace","RetP ch-sp","Return Pass With Chain Spaces","return-pass spaces"],
    ["Tunisian","Colourwork","RetP colour","Return Pass With Colour Change","return-pass colour change"],
    ["Tunisian","Lace","RetP lace","Return Pass With Lace Opening","return-pass opening"],
    ["Tunisian","Basic","RetP ext","Return Pass With Extended Stitch","extended return step"],
    ["Tunisian","Chart Structure","reverse RetP","Reverse Return Pass","designer-specific return"],
    ["Tunisian","Colourwork","FwP colour","Colour Change at Start of Forward Pass","new forward-pass colour"],
    ["Tunisian","Colourwork","stripes","Tunisian Stripes","striped fabric"],
    ["Tunisian","Colourwork","intarsia","Intarsia-style Tunisian Colourwork","separate colour areas"],
    ["Tunisian","Colourwork","carry yarn","Carrying Yarn","carried colour"],
    ["Tunisian","Colourwork","floats","Floats","carried strands"],
    ["Tunisian","Colourwork","two colour","Two-colour Tunisian Crochet","two-colour fabric"],
    ["Tunisian","Special Stitch","entrelac","Entrelac Tunisian Crochet","joined blocks"],
    ["Tunisian","Cable","T cable","Tunisian Cables","crossed Tunisian stitches"],
    ["Tunisian","Texture","T rib","Tunisian Ribbing","ribbed Tunisian fabric"],
    ["Tunisian","Construction","T round","Tunisian in the Round","circular Tunisian fabric"],
    ["Tunisian","Construction","double-ended hook","Double-ended Tunisian Hook","hook at both ends"],
    ["Tunisian","Short Row","T short rows","Tunisian Short Rows","partial two-pass rows"],
    ["Tunisian","Finishing","join panels","Joining Panels","joined panel edges"],
    ["Tunisian","Finishing","seam","Seaming Tunisian Fabric","seamed fabric"],
    ["Tunisian","Chart Structure","chart FwP","Chart Shows Forward Pass Only","forward-pass chart"],
    ["Tunisian","Chart Structure","chart RetP","Chart Includes Return Pass","two-pass chart"],
    ["Tunisian","Chart Structure","symbol key","Designer Symbol Key","chart legend"],
    ["Tunisian","Chart Structure","case variants","Abbreviation Case Variants","mixed-case abbreviation"],
    ["Tunisian","Chart Structure","count loops","Count Loops After Forward Pass","loop checkpoint"],
    ["Tunisian","Chart Structure","count sts","Count Stitches After Return Pass","stitch checkpoint"],
    ["Tunisian","Chart Structure","first loop","First Loop Already on Hook","starting loop"],
    ["Tunisian","Chart Structure","edge count","Avoid Extra Edge Stitch","edge checkpoint"],
    ["Tunisian","Chart Structure","end two loops","Last Stitch Under Two Side Loops","end stitch"],
    ["Tunisian","Chart Rule","many loops","Why Are There So Many Loops on My Hook?","beginner question"],
    ["Tunisian","Chart Rule","one row","Is One Tunisian Row One Pass or Two?","beginner question"],
    ["Tunisian","Chart Rule","turn work?","Do I Turn the Work?","beginner question"],
    ["Tunisian","Chart Rule","curling","Why Is My Fabric Curling?","beginner question"],
    ["Tunisian","Chart Rule","count grows","Why Is My Stitch Count Increasing?","beginner question"],
    ["Tunisian","Chart Rule","messy edge","Why Is My Edge Messy?","beginner question"],
    ["Tunisian","Chart Rule","knit look","Why Does Tunisian Knit Stitch Look Like Knitting?","beginner question"],
    ["Tunisian","Chart Rule","same as crochet?","Is Tunisian Crochet the Same as Crochet?","beginner question"],
    ["Tunisian","Chart Rule","normal hook?","Can I Use a Normal Crochet Hook?","beginner question"],
    ["Tunisian","Chart Rule","long hook?","When Do I Need a Long or Cable Hook?","beginner question"],
    ["Tunisian","Chart Rule","which symbol?","Is This Normal or Tunisian Crochet?","beginner question"]
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
    "Knitting:K": { "zh-HK":"下針 / 平針", "zh-CN":"下针 / 平针", ja:"表目" },
    "Knitting:P": { "zh-HK":"上針 / 反針", "zh-CN":"上针 / 反针", ja:"裏目" },
    "Knitting:YO": { "zh-HK":"掛針 / 空針", "zh-CN":"挂针 / 空针", ja:"掛け目" },
    "Knitting:K2TOG": { "zh-HK":"右上二併一", "zh-CN":"右上二并一", ja:"右上2目一度" },
    "Knitting:SSK": { "zh-HK":"左上二併一", "zh-CN":"左上二并一", ja:"左上2目一度" },
    "Knitting:Sl": { "zh-HK":"滑針", "zh-CN":"滑针", ja:"すべり目" },
    "Knitting:KTBL": { "zh-HK":"扭下針", "zh-CN":"扭下针", ja:"ねじり表目" },
    "Knitting:PTBL": { "zh-HK":"扭上針", "zh-CN":"扭上针", ja:"ねじり裏目" },
    "Knitting:M1L": { "zh-HK":"左加針", "zh-CN":"左加针", ja:"左増し目" },
    "Knitting:M1R": { "zh-HK":"右加針", "zh-CN":"右加针", ja:"右増し目" },
    "Knitting:LI": { "zh-HK":"挑起加針 / 提針加針", "zh-CN":"挑起加针 / 提针加针", ja:"引き上げ増し目。記号は編み図により異なります。" },
    "Knitting:KFB": { "zh-HK":"同針前後加針 / 下針前後加針", "zh-CN":"同针前后加针 / 下针前后加针", ja:"表目の前後編み増し目。" },
    "Knitting:PFB": { "zh-HK":"上針前後加針", "zh-CN":"上针前后加针", ja:"裏目の前後編み増し目。記号は編み図により異なります。" },
    "Knitting:P2TOG": { "zh-HK":"上針右上二併一", "zh-CN":"上针右上二并一", ja:"裏目の右上2目一度" },
    "Knitting:SSP": { "zh-HK":"上針左上二併一", "zh-CN":"上针左上二并一", ja:"裏目の左上2目一度" },
    "Knitting:CDD": { "zh-HK":"中上三併一", "zh-CN":"中上三并一", ja:"中上3目一度" },
    "Knitting:SKP": { "zh-HK":"滑一針、下一針、套收 / 左斜減針", "zh-CN":"滑一针、下一针、套收 / 左斜减针", ja:"すべり目をかぶせる左減らし目。記号は編み図により異なります。" },
    "Knitting:DYO": { "zh-HK":"雙掛針", "zh-CN":"双挂针", ja:"二重掛け目。記号は編み図により異なります。" },
    "Crochet:CH": { "zh-HK":"鎖針", "zh-CN":"锁针", ja:"鎖編み" },
    "Crochet:SL ST": { "zh-HK":"引拔針", "zh-CN":"引拔针", ja:"引き抜き編み" },
    "Crochet:SC": { "zh-HK":"短針", "zh-CN":"短针", ja:"細編み" },
    "Crochet:HDC": { "zh-HK":"中長針", "zh-CN":"中长针", ja:"中長編み" },
    "Crochet:DC": { "zh-HK":"長針", "zh-CN":"长针", ja:"長編み" },
    "Crochet:TR": { "zh-HK":"長長針", "zh-CN":"长长针", ja:"長々編み" },
    "Crochet:FLO": { "zh-HK":"外半針", "zh-CN":"外半针", ja:"前半目" },
    "Crochet:BLO": { "zh-HK":"內半針", "zh-CN":"内半针", ja:"後半目" },
    "Tunisian:TSS": { "zh-HK":"阿富汗簡單針（下針）", "zh-CN":"阿富汗简单针（下针）", ja:"チュニジアンシンプルステッチ" },
    "Tunisian:TPS": { "zh-HK":"阿富汗上針", "zh-CN":"阿富汗上针", ja:"チュニジアンパールステッチ" },
    "Tunisian:TKS": { "zh-HK":"阿富汗下針（平針）", "zh-CN":"阿富汗下针（平针）", ja:"チュニジアンニットステッチ" },
    "Tunisian:TRS": { "zh-HK":"阿富汗反針", "zh-CN":"阿富汗反针", ja:"チュニジアンリバースステッチ" },
    "Tunisian:TFS": { "zh-HK":"阿富汗全針（掛針）", "zh-CN":"阿富汗全针（挂针）", ja:"チュニジアンフルステッチ" },
    "Tunisian:TDC": { "zh-HK":"阿富汗長針", "zh-CN":"阿富汗长针", ja:"チュニジアンダブルクロッシェ" },
    "Tunisian:TSLST": { "zh-HK":"阿富汗滑針", "zh-CN":"阿富汗滑针", ja:"チュニジアンスリップステッチ" },
    "Tunisian:TYO": { "zh-HK":"阿富汗掛針／繞線", "zh-CN":"阿富汗挂针／绕线", ja:"チュニジアン掛け目" },
    "Tunisian:TYO-FS": { "zh-HK":"掛針後於針隙挑針", "zh-CN":"挂针后于针隙挑针", ja:"掛け目とフルステッチ" },
    "Tunisian:T INC 1→3": { "zh-HK":"一針放三針的加針", "zh-CN":"一针放三针的加针", ja:"1目から3目の増し目" },
    "Tunisian:T2TOG": { "zh-HK":"二針併一針", "zh-CN":"二针并一针", ja:"2目一度" },
    "Tunisian:T3TOG": { "zh-HK":"三針併一針", "zh-CN":"三针并一针", ja:"3目一度" },
    "Tunisian:T4TOG": { "zh-HK":"四針併一針", "zh-CN":"四针并一针", ja:"4目一度" },
    "Tunisian:T5TOG": { "zh-HK":"五針併一針", "zh-CN":"五针并一针", ja:"5目一度" },
    "Tunisian:TC-A": { "zh-HK":"交叉針 A", "zh-CN":"交叉针 A", ja:"交差編み A" },
    "Tunisian:TC-B": { "zh-HK":"交叉針 B", "zh-CN":"交叉针 B", ja:"交差編み B" },
    "Tunisian:TDC-X": { "zh-HK":"長針交叉", "zh-CN":"长针交叉", ja:"長編み交差" },
    "Tunisian:T3-LC": { "zh-HK":"退針底的左上三針交叉", "zh-CN":"退针底的左上三针交叉", ja:"戻り目上の左3目交差" }
  };

  const chartLegendWarning = "Chart symbols can vary by designer and region. Always check the pattern legend first.";
  const crochetLegendWarning = "Crochet symbols and terms can vary by designer and region. Always check the pattern legend first.";
  const crochetUsUkWarning = "US and UK crochet terms are different. The same stitch name can mean different stitches. Always check whether your pattern uses US or UK terms.";
  const relatedToolsByCraft = {
    Knitting:["OG Chart Mode","Row / Round Counter Helper","Annotation Tool"],
    Crochet:["OG Chart Mode","Row / Round Counter Helper","Annotation Tool"],
    Tunisian:["OG Chart Mode","Row / Round Counter Helper","Annotation Tool"],
    Shared:["OG Chart Mode","Annotation Tool"]
  };
  const LAST_VERIFIED_DATE = "2026-06-23";
  const SOURCE_URLS = {
    cycCrochet:"https://www.craftyarncouncil.com/standards/crochet-chart-symbols",
    cycKnit:"https://www.craftyarncouncil.com/standards/knit-chart-symbols",
    cycKnitAbbreviations:"https://www.craftyarncouncil.com/knit.html",
    vogueCharts:"https://www.vogueknitting.com/pattern-help/how-to/pattern-reading/reading-charts/",
    interweaveCables:"https://www.interweave.com/article/knitting/understanding-cable-chart-symbols/",
    interweaveCharts:"https://www.interweave.com/article/knitting/reading-charts/",
    tinCanCharts:"https://blog.tincanknits.com/2014/06/06/how-to-read-a-knitting-chart/",
    purlCharts:"https://www.purlsoho.com/create/reading-a-chart/",
    knitPicksCharts:"https://tutorials.knitpicks.com/wp-content/uploads/2009/12/charttutorial.pdf",
    cycCrochetAbbreviations:"https://www.craftyarncouncil.com/crochet.html",
    cgoa:"https://www.crochet.org/",
    cycCrochetReading:"https://craftyarncouncil.com/standards/how-to-read-crochet-pattern",
    cycTunisianAbbreviations:"https://www.craftyarncouncil.com/standards/crochet-abbreviations",
    knitterKnotterTunisian:"https://knitterknotter.com/stitch-guide-and-abbreviations/",
    tlYarnTunisianBasics:"https://tlycblog.com/3-tunisian-crochet-stitches/",
    tlYarnTunisianKnit:"https://tlycblog.com/how-to-crochet-the-tunisian-crochet-knit-stitch-video-tutorial/"
  };
  const uploadedReferenceName="User-provided Chinese/Japanese chart reference sheets (IMG_4166–IMG_4176)";
  const uploadedTunisianReferenceName="User-provided Afghan/Tunisian crochet reference sheets (IMG_4154–IMG_4165)";
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
    "Tunisian:TSS":"│", "Tunisian:TPS":"—", "Tunisian:TKS":"◉",
    "Tunisian:TRS":"∪", "Tunisian:TFS":"○", "Tunisian:TDC":"†",
    "Tunisian:TSLST":"V", "Tunisian:TYO":"○", "Tunisian:TYO-FS":"◉",
    "Tunisian:T INC 1→3":"∨3", "Tunisian:T2TOG":"∧2", "Tunisian:T3TOG":"∧3",
    "Tunisian:T4TOG":"∧4", "Tunisian:T5TOG":"∧5", "Tunisian:TC-A":"╲╱",
    "Tunisian:TC-B":"╱╲", "Tunisian:TDC-X":"⨯", "Tunisian:T3-LC":"≋╱",
    "Shared:V Stitch":"V",
    "Shared:Y Stitch":"Y", "Shared:Cable Cross":"⨯"
  };

  const symbolIcons = {
    "Knitting:K":"knit", "Knitting:P":"purl", "Knitting:Sl":"slip",
    "Knitting:YO":"yarn-over", "Knitting:KTBL":"knit-twisted", "Knitting:PTBL":"purl-twisted",
    "Knitting:K2TOG":"decrease-right", "Knitting:P2TOG":"purl-decrease-right",
    "Knitting:SSK":"decrease-left", "Knitting:SSP":"purl-decrease-left", "Knitting:SKP":"decrease-left",
    "Knitting:CDD":"decrease-centred", "Knitting:KFB":"increase-kfb", "Knitting:PFB":"purl-increase", "Knitting:MB":"knit-bobble",
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
    "Crochet:PC":"popcorn", "Crochet:Puff":"puff", "Crochet:Bobble":"bobble", "Crochet:CL":"cluster",
    "Crochet:Shell":"shell", "Crochet:V-st":"v-stitch", "Crochet:Y-st":"y-stitch",
    "Crochet:Cross":"crochet-cross", "Crochet:Picot":"picot",
    "Tunisian:TSS":"tunisian-simple", "Tunisian:TPS":"tunisian-purl", "Tunisian:TKS":"tunisian-knit",
    "Tunisian:TRS":"tunisian-reverse", "Tunisian:TFS":"tunisian-full", "Tunisian:TDC":"tunisian-double",
    "Tunisian:TSLST":"tunisian-slip", "Tunisian:TYO":"tunisian-yarn-over", "Tunisian:TYO-FS":"tunisian-yarn-over-space",
    "Tunisian:T INC 1→3":"tunisian-increase-1-3", "Tunisian:T2TOG":"tunisian-decrease-2",
    "Tunisian:T3TOG":"tunisian-decrease-3", "Tunisian:T4TOG":"tunisian-decrease-4",
    "Tunisian:T5TOG":"tunisian-decrease-5", "Tunisian:TC-A":"tunisian-cross-a",
    "Tunisian:TC-B":"tunisian-cross-b", "Tunisian:TDC-X":"tunisian-double-cross",
    "Tunisian:T3-LC":"tunisian-cable-left-3", "Shared:Cable Cross":"cable-cross"
  };

  const cycCrochetSymbols = new Set(["CH","SL ST","SC","HDC","DC","TR","DTR","SC2TOG","DC2TOG","Puff","Bobble","PC","CL","Shell","Picot","FLO","BLO","FPDC","BPDC"]);
  const cycKnittingSymbols = new Set(["K","P","YO","K2TOG","P2TOG","SSK","SSP","KFB","M1L","M1R","KTBL","PTBL","MB"]);
  const cycCableSymbols = new Set(["1/1 LC","1/1 RC","2/2 LC","2/2 RC","1/1 LPC","1/1 RPC"]);

  const uploadedKnittingSymbols=new Set(["K","P","YO","KTBL","PTBL","M1L","M1R","K2TOG","P2TOG","SSK","SSP","CDD","1/1 LC","1/1 RC","2/2 LC","2/2 RC","3/3 LC","3/3 RC","1/1 LPC","1/1 RPC"]);
  const uploadedCrochetSymbols=new Set(["CH","SL ST","SC","HDC","DC","TR","DTR","SC INC","HDC INC","DC INC","SC2TOG","HDC2TOG","DC2TOG","PC","CL","Shell","Y-st","Picot","FLO","BLO","FPDC","BPDC"]);
  const uploadedTunisianConfirmedSymbols=new Set(["TSS","TPS","TKS","TDC","TSLST","T INC 1→3","T2TOG","T3TOG","T4TOG","T5TOG","TC-A","TC-B","TDC-X","T3-LC"]);
  const uploadedTunisianReviewSymbols=new Set(["TRS","TFS","TYO","TYO-FS"]);

  function sourceMetadata(craft, abbreviation, category, symbolIcon) {
    if(craft==="Tunisian"&&uploadedTunisianConfirmedSymbols.has(abbreviation))return{
      sourceType:"jp-cn-chart",requiresReview:false,confidence:"High",sourceName:uploadedTunisianReferenceName,sourceUrl:"",
      sourceNote:`Matched to the operation and chart cell shown in the uploaded Afghan/Tunisian sheets; ${["TSS","TPS","TKS","TDC","TSLST"].includes(abbreviation)?"the English abbreviation was cross-checked against the Craft Yarn Council Tunisian abbreviation list.":"the searchable abbreviation is a Yarncha label for this source-specific chart operation."}`
    };
    if(craft==="Tunisian"&&uploadedTunisianReviewSymbols.has(abbreviation))return{
      sourceType:"jp-cn-chart",requiresReview:true,confidence:"Medium",sourceName:uploadedTunisianReferenceName,sourceUrl:"",
      sourceNote:"The uploaded sheet confirms a related Afghan-chart operation, but the exact mapping to this modern English abbreviation is not universal. Keep it unconfirmed and use the pattern legend."
    };
    if(craft==="Crochet"&&uploadedCrochetSymbols.has(abbreviation))return{
      sourceType:"jp-cn-chart",requiresReview:false,confidence:"High",sourceName:uploadedReferenceName,sourceUrl:"",sourceNote:"Matched to the user-provided Chinese/Japanese-style crochet symbol reference; terminology and construction were cross-checked against CYC where available."
    };
    if (craft === "Crochet" && cycCrochetSymbols.has(abbreviation)) {
      const familyMark = ["Puff","Bobble"].includes(abbreviation);
      return {
        sourceType:"CYC",
        requiresReview:familyMark,
        confidence:familyMark?"Medium":"High",
        sourceName:"Craft Yarn Council Crochet Chart Symbols",
        sourceUrl:SOURCE_URLS.cycCrochet,
        sourceNote:familyMark
          ? "CYC publishes a combined 3-hdc cluster/puff/bobble family mark rather than a universal stitch-specific glyph. Yarncha keeps the names separate and requires the pattern key."
          : "Based on the Craft Yarn Council crochet chart-symbol standard; always confirm the pattern key."
      };
    }
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
    if (craft === "Tunisian") return "legend-specific";
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
    ,"Tunisian:TSS":"On the forward pass, insert the hook from right to left under the front vertical bar, yarn over, and draw up a loop. Work the stated return pass separately."
    ,"Tunisian:TPS":"Bring the yarn to the front, insert under the front vertical bar, then yarn over and draw up a loop while keeping the purl bump at the front."
    ,"Tunisian:TKS":"Insert the hook from front to back between the front and back vertical bars, yarn over, and draw up a loop for a knit-like face."
    ,"Tunisian:TRS":"Insert behind the back vertical bar as directed and draw up a loop. Published symbols vary, so confirm the legend before using this entry."
    ,"Tunisian:TFS":"Insert into the space between vertical bars rather than through a bar, yarn over, and draw up a loop. Confirm edge placement and the chart legend."
    ,"Tunisian:TDC":"Yarn over, insert as the pattern directs, draw up a loop, then yarn over and draw through two loops; leave the resulting loop on the hook for the forward pass."
    ,"Tunisian:TSLST":"Insert at the indicated vertical bar or space and pull the working loop through the fabric loop and the loop on the hook."
    ,"Tunisian:TYO":"Wrap the yarn over the hook to create an extra loop. The uploaded sheets use several related marks, so the chart legend controls placement and return-pass treatment."
    ,"Tunisian:TYO-FS":"Combine a yarn over with a pickup in the indicated inter-bar space. Treat this as a source-specific variation and check the chart legend."
    ,"Tunisian:T INC 1→3":"Create three forward-pass loops from one indicated position using the sequence shown by the source chart; verify the following return pass."
    ,"Tunisian:T2TOG":"Insert through the two indicated vertical bars together and draw up one loop, reducing two chart positions to one worked loop."
    ,"Tunisian:T3TOG":"Insert through the three indicated vertical bars together and draw up one loop."
    ,"Tunisian:T4TOG":"Insert through the four indicated vertical bars together and draw up one loop."
    ,"Tunisian:T5TOG":"Insert through the five indicated vertical bars together and draw up one loop."
    ,"Tunisian:TC-A":"Cross the two indicated Tunisian stitches in the A orientation shown by the source sheet; exact holding order is legend-specific."
    ,"Tunisian:TC-B":"Cross the two indicated Tunisian stitches in the B orientation shown by the source sheet; exact holding order is legend-specific."
    ,"Tunisian:TDC-X":"Work the indicated Tunisian double-crochet elements in crossed order."
    ,"Tunisian:T3-LC":"Move three loops aside, work the next three, then return and work the held group to form the source sheet's left cross."
  };

  function explanationFor(craft, abbreviation, fullName, category){
    return verifiedExplanations[`${craft}:${abbreviation}`] || `${fullName} is a ${craft.toLowerCase()} ${category.toLowerCase()} instruction whose exact operation and chart mark must be confirmed in the pattern legend.`;
  }

  function sourceReferencesFor(craft, abbreviation, category, source){
    const references=[{name:source.sourceName,url:source.sourceUrl||"",scope:"Primary entry source"}];
    if(craft==="Knitting"){
      references.push({name:"Vogue Knitting — Reading Charts",url:SOURCE_URLS.vogueCharts,scope:"Knit/purl and right-side chart convention"});
      references.push({name:"Purl Soho — Reading a Chart",url:SOURCE_URLS.purlCharts,scope:"Chart direction, decrease lean, cable width and legend variation"});
      references.push({name:"Knit Picks — Lace Chart Reading",url:SOURCE_URLS.knitPicksCharts,scope:"Flat/round chart direction and non-universal stitch-symbol warning"});
      references.push({name:"Interweave Knits — Reading Charts",url:SOURCE_URLS.interweaveCharts,scope:"Chart-reading and legend variation cross-check"});
      if(category==="Cable")references.push({name:"Interweave — Understanding Cable Chart Symbols",url:SOURCE_URLS.interweaveCables,scope:"Cable direction, span and purl-background notation"});
      if(category==="Chart Rule")references.push({name:"Tin Can Knits — How to Read a Knitting Chart",url:SOURCE_URLS.tinCanCharts,scope:"Flat and circular chart-reading workflow"});
    }
    if(craft==="Crochet"){
      references.push({name:"Craft Yarn Council — Crochet Chart Symbols",url:SOURCE_URLS.cycCrochet,scope:"Standard crochet symbol family"});
      references.push({name:"Craft Yarn Council — Crochet Abbreviations",url:SOURCE_URLS.cycCrochetAbbreviations,scope:"US/UK terminology and abbreviations"});
      references.push({name:"Crochet Guild of America — crochet education resources",url:SOURCE_URLS.cgoa,scope:"Guild-level terminology and teaching cross-check"});
      references.push({name:"Edie Eckman — The Crochet Answer Book",url:"",scope:"Published crochet terminology and special-stitch cross-check"});
      if(uploadedCrochetSymbols.has(abbreviation))references.unshift({name:uploadedReferenceName,url:"",scope:"Primary uploaded Chinese/Japanese-style symbol reference"});
    }
    if(craft==="Tunisian"){
      references.push({name:"Craft Yarn Council — Tunisian Abbreviations",url:SOURCE_URLS.cycTunisianAbbreviations,scope:"Standard English abbreviation"});
      references.push({name:"KnitterKnotter — Tunisian Stitch Guide",url:SOURCE_URLS.knitterKnotterTunisian,scope:"Stitch insertion and abbreviation cross-check"});
      if(["TSS","TFS","TPS","Honeycomb"].includes(abbreviation))references.push({name:"TL Yarn Crafts — Beginner Tunisian Stitches",url:SOURCE_URLS.tlYarnTunisianBasics,scope:"Stitch construction cross-check"});
      if(abbreviation==="TKS")references.push({name:"TL Yarn Crafts — Tunisian Knit Stitch",url:SOURCE_URLS.tlYarnTunisianKnit,scope:"Knit-stitch insertion cross-check"});
    }
    const seen=new Set();
    return references.filter(reference=>{const key=`${reference.name}|${reference.url}`;if(seen.has(key))return false;seen.add(key);return true;});
  }

  function variationNotesFor(craft, abbreviation, category, confidence){
    if(craft==="Crochet"&&["Puff","Bobble","CL"].includes(abbreviation))return "Cluster, puff and bobble notation varies by loop count and publisher. CYC includes a combined family mark; use the pattern legend for the exact construction.";
    if(craft==="Knitting"&&category==="Cable")return "Cable symbols are not universal. Line count indicates stitch span in many publications, while fill or added marks may indicate knit, purl or twisted stitches.";
    if(craft==="Tunisian")return "Tunisian chart notation is publication-specific. The uploaded Afghan-chart cell style is shown where matched; the English abbreviation describes the operation, not a universal glyph.";
    if(confidence!=="High")return "No sufficiently consistent universal glyph was found across the checked references. Keep this entry tied to the pattern legend.";
    return "The displayed symbol follows the cited reference family; another designer may use an alternative mark, so the pattern legend remains authoritative.";
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
    "CL": { us:"CL", uk:"CL", enUS:"Cluster", enUK:"Cluster", zhHK:"棗形針／群針", zhCN:"枣形针／组针", cnAbbreviation:"" },
    "Puff": { us:"puff", uk:"puff", enUS:"Puff stitch", enUK:"Puff stitch", zhHK:"泡芙針／玉編", zhCN:"枣形针", cnAbbreviation:"" },
    "Bobble": { us:"bo", uk:"bo", enUS:"Bobble stitch", enUK:"Bobble stitch", zhHK:"球球針", zhCN:"球球针", cnAbbreviation:"" },
    "Shell": { us:"sh", uk:"sh", enUS:"Shell stitch", enUK:"Shell stitch", zhHK:"貝殼針", zhCN:"贝壳针", cnAbbreviation:"" },
    "Picot": { us:"picot", uk:"picot", enUS:"Picot", enUK:"Picot", zhHK:"狗牙針", zhCN:"狗牙针", cnAbbreviation:"" },
    "FLO": { us:"FLO", uk:"FLO", enUS:"Front loop only", enUK:"Front loop only", zhHK:"外半針", zhCN:"外半针", cnAbbreviation:"" },
    "BLO": { us:"BLO", uk:"BLO", enUS:"Back loop only", enUK:"Back loop only", zhHK:"內半針", zhCN:"内半针", cnAbbreviation:"" }
    ,"FPDC": { us:"FPdc", uk:"FPtr", enUS:"Front post double crochet", enUK:"Front post treble", zhHK:"內鉤長針", zhCN:"内钩长针", cnAbbreviation:"NF" }
    ,"BPDC": { us:"BPdc", uk:"BPtr", enUS:"Back post double crochet", enUK:"Back post treble", zhHK:"外鉤長針", zhCN:"外钩长针", cnAbbreviation:"WF" }
  };

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  const knittingReferenceTerms={
    K:{cn:"下 / 正",jp:"表"},P:{cn:"上 / 反",jp:"裏"},M1L:{cn:"左加針 / 左扭加針",jp:"左増し目"},M1R:{cn:"右加針 / 右扭加針",jp:"右増し目"},
    K2TOG:{cn:"右上二併一 / 右上2併1",jp:"右上2目一度"},SSK:{cn:"左上二併一 / 左上2併1",jp:"左上2目一度"},CDD:{cn:"中上三併一",jp:"中上3目一度"},
    YO:{cn:"掛針 / 空針",jp:"掛け目"},C4F:{cn:"4針左交叉 / 左上交叉",jp:"左上交差"},C4B:{cn:"4針右交叉 / 右上交叉",jp:"右上交差"},
    "No stitch":{cn:"無針 / 不織",jp:"編み目なし"},RS:{cn:"正面",jp:"表側"},WS:{cn:"反面",jp:"裏側"},BOR:{cn:"圈起點",jp:"輪の始まり"},CO:{cn:"起針",jp:"作り目"},BO:{cn:"收針",jp:"伏せ止め"}
  };
  const knittingTeaching={
    P:{meaning:"Work a purl stitch.",howToRead:"Usually read as purl on a right-side row. In flat charts, wrong-side rows may reverse the action, so always check the legend.",howToWork:"Bring the yarn to the front, insert the right needle into the front of the stitch from right to left, wrap the yarn, and pull the new loop through.",beginnerNote:"Purl creates a bump on the front of the fabric. Together with knit, it forms many basic stitch patterns."},
    M1L:{meaning:"Increase one stitch with a left-leaning twist.",howToRead:"Make one stitch leaning left. The stitch count increases by one.",howToWork:"Lift the strand between the needles from front to back, then knit through the back loop.",beginnerNote:"M1L is often paired with M1R for mirrored shaping."},
    K2TOG:{meaning:"Decrease two stitches into one with a right-leaning decrease.",howToRead:"Knit the next two stitches together. The stitch count decreases by one.",howToWork:"Insert the right needle into the next two stitches together as if to knit, wrap the yarn, and pull through both stitches.",beginnerNote:"K2tog leans right and is often paired with SSK, which leans left."},
    C4F:{meaning:"Cross four stitches with the first two held to the front, creating a left-leaning cable.",howToRead:"Cross two stitches over two, holding the first pair at the front.",howToWork:"Slip two stitches to a cable needle and hold in front, knit two, then knit the held stitches.",beginnerNote:"Front usually makes the cable lean left; back usually makes it lean right."},
    "No stitch":{meaning:"A chart placeholder used to keep shaping visually aligned.",howToRead:"Skip this box and move to the next chart cell. Do not work a stitch.",howToWork:"No stitch is not a stitch. It is a placeholder in the chart to keep the visual layout correct.",beginnerNote:"Do not count this box as a stitch or consume a stitch from the needle."}
  };
  const crochetReferenceTerms={
    CH:{us:"ch",uk:"ch",cn:"鎖針",jp:"鎖編み"},"SL ST":{us:"sl st",uk:"ss",cn:"引拔針",jp:"引き抜き編み"},SC:{us:"sc",uk:"dc",cn:"短針",jp:"細編み"},HDC:{us:"hdc",uk:"htr",cn:"中長針",jp:"中長編み"},DC:{us:"dc",uk:"tr",cn:"長針",jp:"長編み"},TR:{us:"tr",uk:"dtr",cn:"長長針",jp:"長々編み"},DTR:{us:"dtr",uk:"trtr",cn:"三卷長針",jp:"三つ巻き長編み"},
    "SC INC":{us:"inc / 2 sc",uk:"inc / 2 dc",jp:"細編み増し目"},SC2TOG:{us:"sc2tog / dec",uk:"dc2tog / dec",jp:"細編み2目一度"},FLO:{us:"FLO",uk:"FLO",jp:"前半目"},BLO:{us:"BLO",uk:"BLO",jp:"後半目"},FPDC:{us:"FPdc",uk:"FPtr",jp:"表引き上げ長編み"},BPDC:{us:"BPdc",uk:"BPtr",jp:"裏引き上げ長編み"},
    Puff:{us:"puff",uk:"puff",cn:"棗形針 / 泡泡針",jp:"玉編み"},PC:{us:"pc",uk:"pc",cn:"爆米花針",jp:"ポップコーン編み"},Bobble:{us:"bobble",uk:"bobble",cn:"球球針",jp:"玉編み"},Shell:{us:"shell",uk:"shell",cn:"貝殼針",jp:"シェル編み"},Picot:{us:"picot",uk:"picot",cn:"狗牙針",jp:"ピコット"},MR:{us:"MR",uk:"MR",cn:"魔術環 / 活動環",jp:"わの作り目"},"no stitch":{us:"no stitch",uk:"no stitch",cn:"無針 / 不織",jp:"編み目なし"}
  };
  const crochetCnChartAbbreviations={
    "single crochet":"X",sc:"X","single crochet decrease":"A",sc2tog:"A","single crochet two together":"A","single crochet increase":"V","sc inc":"V","2 sc":"V","two single crochet in same stitch":"V","3 sc":"W","three single crochet in same stitch":"W",sc3tog:"M","single crochet three together":"M",
    "half double crochet":"T",hdc:"T","half double crochet increase":"TV","hdc inc":"TV","2 hdc":"TV","two half double crochet in same stitch":"TV","half double crochet decrease":"TA",hdc2tog:"TA","3 hdc":"TW","three half double crochet in same stitch":"TW",hdc3tog:"TM","half double crochet three together":"TM",
    "double crochet":"F",dc:"F","double crochet increase":"FV","dc inc":"FV","2 dc":"FV","two double crochet in same stitch":"FV","double crochet decrease":"FA",dc2tog:"FA","3 dc":"FW","three double crochet in same stitch":"FW",dc3tog:"FM","double crochet three together":"FM",
    "triple crochet":"E","treble crochet":"E",tr:"E","triple crochet increase":"EV","treble crochet increase":"EV","tr inc":"EV","2 tr":"EV","two treble crochet in same stitch":"EV","triple crochet decrease":"EA","treble crochet decrease":"EA",tr2tog:"EA","3 tr":"EW","three treble crochet in same stitch":"EW",tr3tog:"EM","treble crochet three together":"EM","triple crochet three together":"EM","puff stitch":"Q",puff:"Q"
  };
  function crochetCnChartCode(abbreviation,fullName,terms={}){
    const candidates=[abbreviation,fullName,terms.us,terms.enUS].filter(Boolean).map(value=>String(value).trim().toLowerCase());
    return candidates.map(value=>crochetCnChartAbbreviations[value]).find(Boolean)||terms.cnAbbreviation||"按圖例核對";
  }
  const crochetTeaching={
    CH:{meaning:"Make one chain stitch.",howToRead:"A chain is usually shown as a small oval or circle. It may form a foundation, turning chain, space, or decorative loop.",howToWork:"Yarn over and pull the yarn through the loop on the hook.",beginnerNote:"Keep chains even and loose enough to work into comfortably."},
    SC:{meaning:"Work one single crochet stitch in US terms (double crochet in UK terms).",howToRead:"Single crochet is commonly shown as an X or +. Check the legend because the mark can vary.",howToWork:"Insert the hook, yarn over and pull up a loop, yarn over again and pull through both loops.",beginnerNote:"Single crochet makes a short, firm fabric and is common in amigurumi."},
    DC:{meaning:"Work one double crochet stitch in US terms (treble crochet in UK terms).",howToRead:"Double crochet is commonly a T-shaped mark with one slash and is taller than single crochet.",howToWork:"Yarn over, insert the hook and pull up a loop, then yarn over and pull through two loops twice.",beginnerNote:"Check whether the turning chain counts as the first stitch."},
    "SC INC":{meaning:"Work two single crochet stitches into the same stitch.",howToRead:"Two stitches rise from one base, increasing the stitch count by one.",howToWork:"Work one single crochet into the stitch, then a second single crochet into the same stitch.",beginnerNote:"Mark rounds and count carefully so increases stay evenly spaced."},
    SC2TOG:{meaning:"Decrease two single crochet stitches into one.",howToRead:"Two stitch bases join into one top, reducing the stitch count by one.",howToWork:"Pull up a loop in each of the next two stitches, yarn over, and pull through all loops.",beginnerNote:"An invisible decrease is often neater for amigurumi."},
    FPDC:{meaning:"Work a double crochet around the post from the front.",howToRead:"The stitch wraps around the post and sits raised on the front of the fabric.",howToWork:"Yarn over, insert front-to-back-to-front around the post, then complete a double crochet.",beginnerNote:"Insert around the post, not through the top loops."},
    Puff:{meaning:"Create a soft raised stitch by pulling up several loops and closing them together.",howToRead:"Several elongated loops are worked into one place before closing.",howToWork:"Repeat yarn over, insert, and pull up a loop in one place, then close as the pattern directs.",beginnerNote:"Loop count and height vary, so use the pattern legend."},
    "no stitch":{meaning:"A placeholder that keeps the chart layout aligned.",howToRead:"Skip this chart box. Do not work or consume a stitch.",howToWork:"No stitch is not a stitch. Move directly to the next chart symbol.",beginnerNote:"Do not include this placeholder in the stitch count."}
  };

  function knittingTeachingFor(category,abbreviation,fullName){
    const exact=knittingTeaching[abbreviation]||{};
    const countNote=category==="Increase"?"It increases the stitch count; check the pattern for the intended direction and whether a hole is decorative.":category==="Decrease"?"It reduces the stitch count; check whether the chart expects a left, right, or centred lean.":category==="Colourwork"?"The cell usually tells you which colour to use, while the row side tells you whether to knit or purl.":category==="Short Row"?"This marks a turning or resolution point used to shape the fabric without working a full row.":category==="Chart Structure"?"This is a chart-reading instruction rather than a stitch unless the legend says otherwise.":category==="Construction"?"This connects the charted fabric to a cast-on, join, edge, seam, or finishing step.":`Work ${fullName} as defined by the pattern legend.`;
    return {
      meaning:exact.meaning||countNote,
      howToRead:exact.howToRead||`Read this as ${fullName}. Check the row direction and the pattern legend before working it.`,
      howToWork:exact.howToWork||`Follow the pattern's written instruction for ${fullName}, keeping stitch orientation and count changes in view.`,
      beginnerNote:exact.beginnerNote||`Pause after working this instruction and confirm the stitch count and fabric appearance before continuing.`,
      flatChartNote:"Right-side rows are usually read right to left and wrong-side rows left to right. Some symbols reverse their action on wrong-side rows.",
      roundChartNote:"Most in-the-round charts are read right to left on every round. The action usually stays the same unless the legend says otherwise."
    };
  }
  function crochetTeachingFor(category,abbreviation,fullName){
    const exact=crochetTeaching[abbreviation]||{};
    const meaning=category==="Increase"?"Work multiple stitches into the same stitch or space to increase the stitch count and shape the fabric.":category==="Decrease"?"Join or omit stitches as directed to reduce the stitch count.":category==="Colourwork"?"Use the indicated colour; the chart cell may show colour rather than a different stitch action.":category==="Amigurumi"?"Use this instruction while shaping or assembling a firm three-dimensional crochet piece.":category==="Chart Structure"?"This is a chart-reading instruction rather than a stitch unless the legend says otherwise.":category==="Finishing"?"Use this instruction to join, secure, seam, or finish part of the project.":`Work ${fullName} as defined by the pattern legend.`;
    return {meaning:exact.meaning||meaning,howToRead:exact.howToRead||`Read this as ${fullName}. Check whether it is worked into a stitch, space, loop, or post.`,howToWork:exact.howToWork||`Follow the pattern's written steps for ${fullName}, checking loop placement and stitch count.`,beginnerNote:exact.beginnerNote||"Pause after the instruction and confirm the placement and stitch count before continuing.",rowChartNote:"Rows usually alternate direction. Turning chains may or may not count as stitches, so check the pattern.",roundChartNote:"Rounds are usually read from the centre outward and counter-clockwise for right-handed work. Watch corners, chain spaces, and the beginning of round."};
  }
  const tunisianChinese={TSS:["突簡針","突尼斯簡單針"],TKS:["突下針","突尼斯下針"],TPS:["突上針","突尼斯上針"],TRS:["突反針","突尼斯反針"],TFS:["突全針","突尼斯全針"],TWTSS:["突扭簡針","突尼斯扭簡針"],ETSS:["突延簡針","突尼斯延伸簡單針"],TSLST:["突滑針","突尼斯滑針"],TSC:["突短針","突尼斯短針"],THDC:["突中長針","突尼斯中長針"],TDC:["突長針","突尼斯長針"],TTR:["突長長針","突尼斯長長針"],TC:["突鉤","突尼斯鉤針"],FwP:["前行","前進行程"],RetP:["回行","返回行程"],"Std RetP":["標準回行","標準返回行程"],"foundation ch":["基礎鎖針","突尼斯基礎鎖針"],"set-up row":["起始行","突尼斯起始行"],"loop on hook":["鉤上線圈","鉤針上的線圈"],"vertical bar":["直條","直向針柱"],"front bar":["前直條","前方直向針柱"],"back bar":["後直條","後方直向針柱"],"horizontal bar":["橫條","橫向線圈"],"top bar":["頂條","頂部線圈"],"edge st":["邊針","突尼斯邊針"],"last st":["末針","行末針"],RS:["正面","織物正面"],WS:["反面","織物反面"],"no turn":["不翻面","保持正面朝前"],turn:["翻面","依指示翻面"],BO:["收針","突尼斯收針"],"sl st BO":["滑針收邊","滑針收針"],"TYO inc":["掛線加針","突尼斯掛線加針"],"TFS inc":["全針加針","突尼斯全針加針"],"VB inc":["直條加針","直向針柱加針"],"HB inc":["橫條加針","橫向線圈加針"],"beg inc":["行首加針","行首加一針"],"end inc":["行末加針","行末加一針"],M1T:["隱形加針","突尼斯隱形加針"],"eyelet inc":["鏤空加針","突尼斯鏤空加針"],"invisible inc":["隱形加針","突尼斯隱形加針"],TSS2TOG:["突簡二併一","突尼斯簡單針二併一"],TKS2TOG:["突下二併一","突尼斯下針二併一"],TPS2TOG:["突上二併一","突尼斯上針二併一"],"beg dec":["行首減針","行首減一針"],"end dec":["行末減針","行末減一針"],"centred dec":["中上減針","突尼斯中上減針"],"left dec":["左斜減針","突尼斯左斜減針"],"right dec":["右斜減針","突尼斯右斜減針"],"skip dec":["跳針減針","突尼斯跳針減針"],"BO dec":["收針減針","收邊時減針"],"YO pull 1":["掛線穿一圈","回行掛線穿一圈"],"YO pull 2":["掛線穿兩圈","回行掛線穿兩圈"],"RetP ch-sp":["回行鎖針空間","帶鎖針空間的回行"],"RetP colour":["回行換色","返回行程換色"],"RetP lace":["回行鏤空","帶鏤空的返回行程"],"RetP ext":["延伸回行","延伸針返回行程"],"reverse RetP":["反向回行","反向返回行程"],"FwP colour":["前行換色","前進行程起始換色"],stripes:["條紋","突尼斯條紋"],intarsia:["嵌花","突尼斯嵌花配色"],"carry yarn":["帶線","沿行帶線"],floats:["浮線","背面浮線"],"two colour":["雙色突鉤","雙色突尼斯鉤針"],entrelac:["方塊拼接","突尼斯方塊拼接"],"T cable":["突纜針","突尼斯麻花針"],"T rib":["突羅紋","突尼斯羅紋"],"T round":["突環織","突尼斯環形鉤織"],"double-ended hook":["雙頭鉤針","雙頭突尼斯鉤針"],"T short rows":["突引返","突尼斯引返編織"],"join panels":["拼接片幅","突尼斯片幅拼接"],seam:["縫合","突尼斯織片縫合"]};
  const tunisianCore=new Set(["TSS","TKS","TPS","TRS","TFS","TWTSS","ETSS","TSLST","TSC","THDC","TDC","TTR"]);
  const tunisianBasics=new Set(["Tunisian Crochet","Forward Pass","Return Pass","Standard Return Pass","Foundation Chain","Set-up / Foundation Row","Loop on Hook","Vertical Bar","Front Vertical Bar","Back Vertical Bar","Horizontal Bar","Top Bar","Edge Stitch","Last / End Stitch","Right Side","Wrong Side","Do Not Turn","Turn When Instructed","Bind Off / Cast Off","Slip-stitch Bind Off"]);
  const tunisianChartNotes=new Set(["Chart Shows Forward Pass Only","Chart Includes Return Pass","Designer Symbol Key","Abbreviation Case Variants","Count Loops After Forward Pass","Count Stitches After Return Pass","First Loop Already on Hook","Avoid Extra Edge Stitch","Last Stitch Under Two Side Loops"]);
  const verifiedSymbolKeys=new Set(["Knitting:K","Knitting:P","Crochet:CH","Crochet:SL ST","Crochet:SC","Crochet:HDC","Crochet:DC","Crochet:TR"]);
  function publicSymbolStatus(craft,abbreviation,symbolIcon,source){
    const key=`${craft}:${abbreviation}`;
    if(verifiedSymbolKeys.has(key)&&source.confidence==="High")return"verified";
    if(craft==="Tunisian"||symbolIcon==="legend-specific"||symbolIcon==="chart-rule")return"variesByDesigner";
    if(source.confidence==="High")return"commonNotUniversal";
    if(source.confidence==="Low")return"needsReview";
    return"variesByDesigner";
  }
  function tunisianFieldsFor(category,abbreviation,fullName){
    const lower=`${abbreviation} ${fullName}`.toLowerCase();
    const passType=/return pass|retp|pull through/.test(lower)?"Return Pass":tunisianCore.has(abbreviation)||["Increase","Decrease"].includes(category)?"Forward Pass":"Both";
    const referenceCategory=category==="Chart Rule"?"Beginner Confusion Notes":tunisianBasics.has(fullName)?"Tunisian Crochet Basics":tunisianChartNotes.has(fullName)?"Chart Reading Notes":/return pass|retp|pull through/.test(lower)?"Return Pass Variations":tunisianCore.has(abbreviation)?"Core Tunisian Stitches":category==="Increase"?"Tunisian Increases":category==="Decrease"?"Tunisian Decreases":["Colourwork","Cable","Texture","Lace","Short Row","Special Stitch"].includes(category)||/round|hook|panels|seam|entrelac/.test(lower)?"Colourwork & Special Techniques":"Chart Reading Notes";
    const [chineseAbbr,chineseName]=tunisianChinese[abbreviation]||["突圖例","突尼斯圖例項目"];
    const insertion=abbreviation==="TSS"?"under the front vertical bar":abbreviation==="TKS"?"between the front and back vertical bars":abbreviation==="TPS"?"under the front vertical bar with the yarn held in front":abbreviation==="TRS"?"under the back vertical bar":abbreviation==="TFS"?"into the space between vertical bars":"at the bar, space, edge, or loop specified by the pattern";
    const howToWork=passType==="Return Pass"?`On the Return Pass, ${fullName.toLowerCase()} as instructed while working loops off the hook. Treat the Return Pass as part of the same row unless the designer says otherwise.`:passType==="Forward Pass"?`On the Forward Pass, insert ${insertion}, yarn over, and pull up a loop. Keep it on the hook, then work the stated Return Pass.`:`Follow ${fullName} across the Forward Pass and Return Pass where instructed. Keep the right side facing unless the pattern tells you to turn.`;
    return {referenceCategory,passType,englishName:fullName,usAbbr:abbreviation||"—",ukAbbr:"same",chineseAbbr,chineseName,japaneseNote:`${fullName} / 記号は編み図により異なる`,symbolCue:"Symbol varies by designer. Always check the pattern’s symbol key.",shortExplanation:`${fullName} is a Tunisian crochet ${category.toLowerCase()} reference used during the ${passType}.`,howToWork,whyItMatters:category==="Chart Structure"||category==="Chart Rule"?"It helps you read the two-pass row correctly and keep the edge and count stable.":"It changes the fabric texture, shaping, colour, or construction while loops are held on the hook.",commonMistakes:["Counting the first loop on the hook incorrectly","Using the wrong bar, space, or pass","Skipping the end stitch or adding an extra edge stitch"],beginnerNote:"Count loops after the Forward Pass and stitches after the Return Pass.",countingTip:"Count loops after the Forward Pass and stitches after the Return Pass; include the first loop already on the hook.",relatedStitches:["TSS","TKS","TPS","TFS"].filter(value=>value!==abbreviation),examplePatternWording:`${passType==="Return Pass"?"RetP":"FwP"}: ${abbreviation||fullName} as instructed.`,appDisplayLevel:["Basic","Chart Structure","Chart Rule"].includes(category)?"Beginner":["Increase","Decrease","Lace","Colourwork","Texture"].includes(category)?"Intermediate":"Advanced"};
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
    const sourceReferences=sourceReferencesFor(craft,abbreviation,category,source);
    const needsReview = confidence!=="High" || !hasKnownIcon || source.requiresReview || source.sourceType === "needs-review" || nameTraditionalChinese === "需核對" || (craft === "Crochet" && !regional);
    const abbreviationUS = terms.us || (craft === "Crochet" ? abbreviation.toLowerCase() : abbreviation);
    const abbreviationUK = terms.uk || (craft === "Crochet" ? "" : abbreviation);
    const aliases = [...new Set([abbreviation, String(abbreviation||"").toLowerCase(), String(abbreviation||"").toUpperCase(), String(abbreviation||"").replace(/\s+/g,""), abbreviationUS, abbreviationUK, terms.cnAbbreviation, fullName, terms.enUS, terms.enUK, terms.zhHK, terms.zhCN, fullName.replace(/ Stitch$/i, ""), ...Object.values(localized).flatMap(value=>value.split(/\s*\/\s*/))].filter(Boolean))];
    const localizedTerms=localizedAliases[`${craft}:${abbreviation}`]||{};
    const referenceTerms=craft==="Knitting"?knittingReferenceTerms[abbreviation]||{}:{};
    const teaching=craft==="Knitting"?knittingTeachingFor(category,abbreviation,terms.enUS||fullName):craft==="Crochet"?crochetTeachingFor(category,abbreviation,terms.enUS||fullName):{};
    const tunisian=craft==="Tunisian"?tunisianFieldsFor(category,abbreviation,fullName):{};
    const crochetTerms=craft==="Crochet"?crochetReferenceTerms[abbreviation]||{}:{};
    const abbreviations={
      us:tunisian.usAbbr||crochetTerms.us||terms.us||abbreviation||"—",
      uk:tunisian.ukAbbr||crochetTerms.uk||terms.uk||abbreviation||"—",
      usUk:craft==="Crochet"?[crochetTerms.us||terms.us||abbreviation,crochetTerms.uk||terms.uk||abbreviation].filter((value,index,values)=>values.indexOf(value)===index).join(" / "):abbreviation||"—",
      cn:tunisian.chineseAbbr||(craft==="Crochet"?crochetCnChartCode(abbreviation,terms.enUS||fullName,terms):referenceTerms.cn||terms.cnAbbreviation||localizedTerms["zh-HK"]||"按圖例核對"),
      jp:tunisian.japaneseNote||crochetTerms.jp||referenceTerms.jp||localizedTerms.ja||"按圖例核對"
    };
    const symbolStatus=publicSymbolStatus(craft,abbreviation,symbolIcon,source);
    return {
      id: `${craftConfig[craft].prefix}-${slug(abbreviation || fullName)}-${index}`,
      section: craftConfig[craft].section,
      craft,
      category,
      symbol: visualSymbol,
      visualSymbol,
      symbolIcon,
      symbolType:symbolIcon,
      svgKey:symbolStatus==="verified"||symbolStatus==="commonNotUniversal"?symbolIcon:"",
      symbolStatus,
      chartSymbolStatus:symbolStatus,
      displayMode:category==="Chart Rule"||category==="Chart Structure"&&symbolIcon==="chart-rule"?"abbreviationOnly":"chartSymbol",
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
      localizedNames:{zh:nameTraditionalChinese},
      ...tunisian,
      nameTraditionalChinese:tunisian.chineseName||nameTraditionalChinese,
      nameZh:tunisian.chineseName||nameTraditionalChinese,
      localizedNames:{zh:tunisian.chineseName||nameTraditionalChinese},
      nameSimplifiedChinese: terms.zhCN || localized["zh-CN"] || "需核对",
      explanation: explanationFor(craft, abbreviation, terms.enUS || fullName, category),
      description: `${fullName} is a ${craft.toLowerCase()} ${category.toLowerCase()} instruction. Its exact chart mark can vary by publication.`,
      howTo: `Follow the pattern's written instructions and legend for ${fullName}. Confirm stitch placement, orientation, and resulting stitch count before continuing.`,
      beginnerExplanation: `Read this as “${fullName}”. Practice it on a small swatch before using it in a fitted or counted section.`,
      abbreviations,
      meaning:tunisian.shortExplanation||teaching.meaning||explanationFor(craft, abbreviation, terms.enUS || fullName, category),
      howToRead:tunisian.symbolCue||teaching.howToRead||`Read this as ${terms.enUS||fullName}. Check the row direction, right-side or wrong-side context, and the pattern legend before working it.`,
      howToWork:tunisian.howToWork||teaching.howToWork||`Follow the pattern's written instruction for ${fullName}.`,
      flatChartNote:teaching.flatChartNote||"Check the pattern's flat-chart direction and right-side or wrong-side meaning.",
      roundChartNote:teaching.roundChartNote||"Check the pattern's round direction and legend.",
      rowChartNote:teaching.rowChartNote||"Check row direction and whether the turning chain counts as a stitch.",
      beginnerNote:tunisian.beginnerNote||teaching.beginnerNote||`This is a ${category.toLowerCase()} ${craft.toLowerCase()} instruction. Practise it on a small swatch if it is new to you.`,
      countingTip:tunisian.countingTip||(category==="Increase"?"Count again after the row; this instruction usually adds a stitch.":category==="Decrease"?"Count again after the row; this instruction usually removes one or more stitches.":"Pause at the end of the row or round and confirm the stitch count."),
      examplePatternWording:tunisian.examplePatternWording||`${abbreviation||fullName} as directed; check the pattern key before working the next instruction.`,
      relatedTools:relatedToolsByCraft[craft]||relatedToolsByCraft.Shared,
      legendWarning:craft==="Crochet"?crochetLegendWarning:chartLegendWarning,
      usUkWarning:craft==="Crochet"?crochetUsUkWarning:"",
      cnChartWarning:craft==="Crochet"?"CN chart abbreviations can vary by designer and pattern source. Always check the pattern legend first.":"",
      difficulty:tunisian.appDisplayLevel||(["Basic","Chain","Slip Stitch","Amigurumi","Chart Structure"].includes(category) ? "Beginner" : ["Increase","Decrease","Loop Placement","Post Stitch","Shell","Texture","Lace","Colourwork","Finishing"].includes(category) ? "Intermediate" : "Advanced"),
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
      commonMistakes:tunisian.commonMistakes||(craft==="Knitting"&&abbreviation==="P"?["Reading wrong-side chart rows the same as right-side rows","Forgetting to bring the yarn to the front","Assuming all charts use the same purl symbol"]:["Using a generic internet symbol instead of the pattern legend", "Missing direction, side, placement, or stitch-count changes"]),
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
      sourceReferences,
      variationNotes:variationNotesFor(craft,abbreviation,category,confidence),
      matchedUploadedReference:sourceReferences.some(reference=>reference.scope.includes("uploaded")||reference.name===uploadedReferenceName||reference.name===uploadedTunisianReferenceName),
      lastVerifiedDate:LAST_VERIFIED_DATE,
      confidence,
      tags:[craft,category],
      notes:"",
      customSvg:"",
      verificationStatus:confidence==="High"&&!needsReview ? (sourceReferences.some(reference=>reference.name===uploadedReferenceName||reference.name===uploadedTunisianReferenceName) ? "Manually Verified" : "Confirmed") : "To Be Confirmed",
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
    const tunisian=craft==="Tunisian"?tunisianFieldsFor("Chart Rule","",fullName):{};
    if(craft==="Tunisian")tunisian.referenceCategory="Chart Reading Notes";
    return {
      id: `rule-${slug(craft)}-${slug(fullName)}-${index}`,
      section: "Chart Reading Rules",
      craft,
      category: "Chart Rule",
      symbol: "Rule",
      visualSymbol: "↔",
      symbolIcon: "chart-rule",
      symbolType: "chart-rule",
      svgKey:"",
      symbolStatus:"variesByDesigner",
      chartSymbolStatus:"variesByDesigner",
      displayMode:"abbreviationOnly",
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
      ...tunisian,
      nameSimplifiedChinese: "图表阅读规则",
      explanation: description,
      description,
      howTo: description,
      beginnerExplanation: `Pause before row one and use this ${craft.toLowerCase()} chart-reading check.`,
      abbreviations:{us:tunisian.usAbbr||"—",uk:tunisian.ukAbbr||"—",usUk:"—",cn:tunisian.chineseAbbr||"—",jp:tunisian.japaneseNote||"—"},
      meaning:description,
      howToRead:description,
      beginnerNote:tunisian.beginnerNote||`Use this check before reading the first chart row or round.`,
      countingTip:tunisian.countingTip||"Pause at the end of the row or round and confirm the stitch count and repeat position.",
      examplePatternWording:tunisian.examplePatternWording||description,
      howToWork:tunisian.howToWork||description,
      flatChartNote:"Right-side rows are usually read right to left and wrong-side rows left to right unless the pattern says otherwise.",
      roundChartNote:"Most round charts are read right to left on every round unless the pattern says otherwise.",
      rowChartNote:"Rows usually alternate direction. Check turning chains, edge stitches, and whether they count.",
      relatedTools:relatedToolsByCraft[craft]||relatedToolsByCraft.Shared,
      legendWarning:craft==="Crochet"?crochetLegendWarning:chartLegendWarning,
      usUkWarning:craft==="Crochet"?crochetUsUkWarning:"",
      difficulty:tunisian.appDisplayLevel||"Beginner",
      aliases: [fullName],
      languageVariants: { en: fullName, "zh-HK": fullName, "zh-CN": fullName, ja: fullName },
      relatedSymbols: [],
      commonMistakes:tunisian.commonMistakes||["Assuming direction or terminology without checking the pattern", "Ignoring repeat boundaries or row-side information"],
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
      sourceReferences:sourceReferencesFor(craft,"","Chart Rule",{sourceName:"Tin Can Knits chart-reading guidance",sourceUrl:SOURCE_URLS.tinCanCharts}),
      variationNotes:"Chart direction and cell meaning depend on whether the work is flat, circular, right-side, wrong-side, row-based or round-based. Publication instructions override this general rule.",
      matchedUploadedReference:false,
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
      const haystack=[entry.visualSymbol, entry.abbreviation, entry.abbreviationUS, entry.abbreviationUK, entry.abbreviationChinese, entry.abbreviations?.usUk, entry.abbreviations?.cn, entry.abbreviations?.jp, entry.fullName, entry.nameEnglish, entry.nameTraditionalChinese, entry.nameSimplifiedChinese, entry.englishName, entry.usAbbr, entry.ukAbbr, entry.chineseAbbr, entry.chineseName, entry.japaneseNote, entry.referenceCategory, entry.passType, entry.examplePatternWording, entry.category, entry.description, entry.sourceName, entry.confidence, entry.verificationStatus, entry.variationNotes, ...(entry.sourceReferences||[]).flatMap(reference=>[reference.name,reference.scope]), ...(entry.tags||[]), ...(entry.regionTags||[]), ...entry.aliases, ...entry.recognitionAliases, ...entry.ocrKeywords]
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
    const tunisianOnly=/^tunisian-/;
    return {
      totalEntries:sourceEntries.length,
      missingSymbolType:sourceEntries.filter(entry=>!entry.symbolType||!entry.visualSymbol).map(entry=>entry.id),
      needsReview:sourceEntries.filter(entry=>entry.needsReview).map(entry=>entry.id),
      duplicateAbbreviations:[...abbreviationGroups.entries()].filter(([,items])=>items.length>1).map(([abbreviation,items])=>({abbreviation,entries:items.map(entry=>({id:entry.id,craft:entry.craft,name:entry.nameEn}))})),
      duplicateSymbolWarnings:[...symbolGroups.entries()].filter(([,items])=>items.length>1).map(([symbolType,items])=>({symbolType,entries:items.map(entry=>({id:entry.id,name:entry.nameEn}))})),
      intentionalSharedSymbols:[],
      craftMismatchWarnings:sourceEntries.filter(entry=>(entry.craft==="Knitting"&&(crochetOnly.test(entry.symbolType)||tunisianOnly.test(entry.symbolType)))||(entry.craft==="Crochet"&&(knittingOnly.test(entry.symbolType)||tunisianOnly.test(entry.symbolType)))||(entry.craft==="Tunisian"&&(crochetOnly.test(entry.symbolType)||knittingOnly.test(entry.symbolType)))).map(entry=>({id:entry.id,craft:entry.craft,symbolType:entry.symbolType}))
    };
  }

  root.YarnchaSymbolDatabase = Object.freeze({ schemaVersion:7, entries, defaultSymbols:entries, categoryOrder, search, searchEntries, recognitionCandidates, normalizeEntry, audit, chartLegendWarning });
})(globalThis);
