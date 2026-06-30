const STORAGE_KEY = "threadline-data-v1";
const colors = ["#6f8872", "#b56d52", "#8a7895", "#c19b5b", "#637f91"];
const APP_NAME = "Yarncha";
const BACKUP_VERSION = 2;
const projectTypeOptions = ["Knitting","Crochet","Tunisian Crochet","Weaving","Other"];
const projectStatusOptions = ["Planning","In progress","Paused","Finished","Frogged"];
const themePresets=[
  {id:"creamy-vanilla",name:"Creamy Vanilla",primary:"#D8B899",secondary:"#F4E6D0",background:"#FFF9F0",card:"#FFF3E3",text:"#5A4632",button:"#B68A62",highlight:"#EACB9A",dark:{background:"#15120F",card:"#211C17",text:"#FAF3EA",button:"#E7B97F",secondary:"#352A20",highlight:"#FFD08F"}},
  {id:"matcha-latte",name:"Matcha Latte",primary:"#A8BFA3",secondary:"#E3EAD8",background:"#FAF8EF",card:"#FFFFFF",text:"#4E5A46",button:"#7F9A7A",highlight:"#D8C89A",dark:{background:"#111611",card:"#1D251C",text:"#F3F8EF",button:"#A9D49E",secondary:"#283424",highlight:"#D8E9A7"}},
  {id:"sakura-milk",name:"Sakura Milk",primary:"#E8A6B3",secondary:"#F8DDE4",background:"#FFF7F9",card:"#FFFFFF",text:"#5B4148",button:"#C97B8C",highlight:"#F3C1C9",dark:{background:"#181113",card:"#261A1F",text:"#FFF1F5",button:"#F0A5B6",secondary:"#3A242C",highlight:"#FFC4D0"}},
  {id:"cocoa-beige",name:"Cocoa Beige",primary:"#A9826D",secondary:"#E8D8C8",background:"#F7F0E8",card:"#FFFDF9",text:"#4C3A32",button:"#8B6655",highlight:"#D1A883",dark:{background:"#15110F",card:"#241C18",text:"#F8EEE6",button:"#D6A17F",secondary:"#382920",highlight:"#E7B98B"}},
  {id:"soft-lavender",name:"Soft Lavender",primary:"#B9A7D8",secondary:"#EDE6F7",background:"#FBF9FF",card:"#FFFFFF",text:"#4A3F5E",button:"#8F7BBE",highlight:"#D8C8F0",dark:{background:"#13111A",card:"#211D2D",text:"#F6F1FF",button:"#BFA7F2",secondary:"#302842",highlight:"#D8C8FF"}},
  {id:"peach-apricot",name:"Peach Apricot",primary:"#F0B28A",secondary:"#FFE0C7",background:"#FFF8F2",card:"#FFFFFF",text:"#5C4436",button:"#D9875A",highlight:"#F6C59B",dark:{background:"#17110E",card:"#271B15",text:"#FFF1E8",button:"#F0A26C",secondary:"#3B261A",highlight:"#FFC08B"}},
  {id:"ocean-mist",name:"Ocean Mist",primary:"#9BBCC2",secondary:"#DDEEEF",background:"#F5FBFB",card:"#FFFFFF",text:"#354D52",button:"#6F9FA8",highlight:"#B7D8D9",dark:{background:"#0F1517",card:"#192529",text:"#EEF9FA",button:"#83D2D7",secondary:"#21363A",highlight:"#AFE6E6"}},
  {id:"vintage-paper",name:"Vintage Paper",primary:"#B7785F",secondary:"#E7E9DC",background:"#F6F0E6",card:"#FFFAF3",text:"#463D35",button:"#5F6958",highlight:"#C4A269",dark:{background:"#151310",card:"#211F19",text:"#F6EFE2",button:"#C8AA70",secondary:"#302D23",highlight:"#E2C47E"}}
];
const designStyles=[
  {id:"original-classic",name:"Original Classic",desc:"Balanced Yarncha look with soft cards and familiar controls."},
  {id:"korean-soft",name:"Korean Soft",desc:"Rounded airy cards, soft spacing and gentle interface edges."},
  {id:"minimal-clean",name:"Minimal Clean",desc:"Crisp spacing, simple cards and almost no decoration."},
  {id:"artsy-journal",name:"Artsy Journal",desc:"Scrapbook-like texture, expressive cards and a creative desk feeling."}
];
const ideaCraftOptions=["Knitting","Crochet","Tunisian Crochet","Mixed / Other"];
const ideaKindOptions=["Blanket","Sweater","Hat / beanie","Scarf","Socks pair","Amigurumi","Shawl","Gloves pair","Cardigan","Bag","Homeware","Custom idea"];
const ideaPlatformOptions=["Manual note","Instagram","Pinterest","Ravelry","YouTube","Book / magazine","Website","Other"];
const ideaDifficultyOptions=["Not sure yet","Beginner","Easy","Intermediate","Advanced"];

const starterData = {
  activeProjectId: "p1",
  projects: [
    {
      id: "p1", name: "Sage Sunday Cardigan", type: "Knitting", color: "#6f8872",
      row: 42, totalRows: 128, started: "June 8, 2026", notes: "Remember: work the button band one needle size down.",
      subCounters: [{ id: "s1", name: "Sleeve repeats", count: 3, linked: true, every: 6 }],
      markers: [{ row: 36, color: "blue" }], chart: null
    },
    {
      id: "p2", name: "Terracotta Market Bag", type: "Crochet", color: "#b56d52",
      row: 18, totalRows: 54, started: "June 12, 2026", notes: "Use the reinforced handle variation.",
      subCounters: [], markers: [], chart: null
    }
  ],
  librarySections: [
    { id: "patterns", name: "My Pattern library", icon: "▦", description: "Patterns and charts you want to keep.", items: [] },
    { id: "ideas", name: "My project ideas", icon: "✦", description: "Inspiration, sketches and future makes.", items: [] },
    { id: "materials", name: "Yarn materials", icon: "◌", description: "Natural and synthetic fibres, texture, season and care reference.", items: [] },
    { id: "symbols", name: "Symbol Database", icon: "", description: "Searchable knitting, crochet and Tunisian symbols, abbreviations, special stitches and chart-reading rules.", items: [] },
    { id: "tool-manual", name: "Tool Manual", icon: "◧", description: "Plain-language guide to every Toolkit calculator.", items: [] },
    { id: "theory", name: "Theory & Foundation", icon: "◎", description: "Structured knitting, crochet and Tunisian crochet learning notes.", items: [] }
  ],
  inventory: [
    { id:"inv1", name:"Sage merino", category:"Yarn", quantity:5, unit:"balls", color:"#718c72", details:"DK · 100 g each" }
  ],
  cart: [],
  marketBudget: 100,
  budgetSettings:{amount:1000,currency:"AUD",period:"monthly",periodStart:"2026-06-01",spent:0},
  purchaseHistory:[],
  language:"en",
  unitSystem:"metric",
  appPreferences:{notifications:false,voice:true},
  theme:{name:"creamy-vanilla",style:"original-classic",mode:"system"},
  onboardingComplete:false,
  onboardingStep:0,
  aiAccessConfirmed:false,
  account:{email:"",provider:"local",syncEnabled:false},
  yarnMaterials:[],
  techniqueKnowledge:[],
  projectIdeas:[],
  symbolFavorites:[],
  userTechniqueReferences:{},
  userSymbolsOverride:{},
  symbolLearningLibrary:[]
};

let state = loadState();
let currentProjectId = state.activeProjectId;
let activePage = "today";
let renderedComponent = "TodayPage";
let currentLibrarySection = null;
let currentSymbolId = null;
let symbolFilters = { search:"", craft:"All", category:"All", difficulty:"All", terminology:"All", verification:"All", sort:"Default" };
let currentProjectTool = "swatch";
let currentToolCategory = "All";
let currentToolSearch = "";
let currentGlobalRenderingTool = "grid";
let activeAnnotationTool = "touch";
const annotationTools=["touch","pen","highlighter","eraser","row-mask","text","arrow","marker"];
let annotationSettings={color:"#d96572",size:4,opacity:.72};
let drawingStroke = null;
let drawingFrame = null;
let maskDrag = null;
let arrowDrag = null;
let recognition = null;
let pendingVoiceIntent = null;
let fxRates={EUR:1,AUD:1.6442,USD:1.1567,CNY:7.8220,JPY:185.30,HKD:9.025};
let fxDate="12 June 2026";
function openAssetDb(){return new Promise((resolve,reject)=>{const r=indexedDB.open("threadline-files",2);r.onupgradeneeded=()=>{const db=r.result;if(!db.objectStoreNames.contains("files"))db.createObjectStore("files");if(!db.objectStoreNames.contains("state"))db.createObjectStore("state");};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
async function putAsset(id,file){const db=await openAssetDb();return new Promise((resolve,reject)=>{const tx=db.transaction("files","readwrite");tx.objectStore("files").put(file,id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
async function getAsset(id){const db=await openAssetDb();return new Promise((resolve,reject)=>{const r=db.transaction("files").objectStore("files").get(id);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
async function deleteAsset(id){if(!id)return;const db=await openAssetDb();return new Promise((resolve,reject)=>{const tx=db.transaction("files","readwrite");tx.objectStore("files").delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
async function putProjectStateSnapshot(){const db=await openAssetDb();return new Promise((resolve,reject)=>{const tx=db.transaction("state","readwrite");tx.objectStore("state").put(structuredClone(state),"app-state");tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
async function getAllAssetsByIds(ids){
  const unique=[...new Set(ids.filter(Boolean))],entries=[];
  for(const id of unique){const file=await getAsset(id);if(file)entries.push({id,file});}
  return entries;
}
function assetToDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(reader.error);reader.readAsDataURL(file);});}
async function dataUrlToBlob(dataUrl){
  const response=await fetch(dataUrl);
  return response.blob();
}
function normalizeThemeName(name){
  return { "soft-yarn":"creamy-vanilla", sakura:"sakura-milk", forest:"matcha-latte" }[name] || (themePresets.some(t=>t.id===name)?name:"creamy-vanilla");
}
function normalizeDesignStyle(style){
  return designStyles.some(s=>s.id===style)?style:"original-classic";
}
function normalizeProjectIdea(idea={}){
  const payload=idea.calculatorValues || idea.savedCalculatorResults?.[0] || null;
  const date=idea.createdAt || idea.dateCreated || new Date().toISOString();
  return {
    id:idea.id || `idea${Date.now()}${Math.random().toString(16).slice(2)}`,
    title:idea.title || "Project idea",
    craftType:idea.craftType || payload?.craftType || idea.craft || "Mixed / Other",
    projectKind:idea.projectKind || "Custom idea",
    inspirationNotes:idea.inspirationNotes || idea.description || "",
    description:idea.description || idea.inspirationNotes || "",
    sourcePlatform:idea.sourcePlatform || "Manual note",
    sourceLink:idea.sourceLink || "",
    referenceImageAsset:idea.referenceImageAsset || idea.imageAsset || null,
    savedCalculatorResults:idea.savedCalculatorResults || (payload?[payload]:[]),
    sourceTool:idea.sourceTool || payload?.toolName || "",
    calculatorValues:payload,
    yarnEstimate:idea.yarnEstimate || "",
    difficultyGuess:idea.difficultyGuess || "Not sure yet",
    tags:Array.isArray(idea.tags)?idea.tags:(idea.tags?String(idea.tags).split(",").map(t=>t.trim()).filter(Boolean):[]),
    archived:!!idea.archived,
    createdAt:date,
    updatedAt:idea.updatedAt || date
  };
}
function normalizeChartReaderConfig(config={},project={}){
  const crop=config.crop||{};
  const grid=config.grid||{};
  const direction=config.rowDirection||config.readingDirection;
  return {
    chartType:["Knitting","Crochet","Tunisian Crochet","Unknown"].includes(config.chartType)?config.chartType:(project.type&&["Knitting","Crochet","Tunisian Crochet"].includes(project.type)?project.type:"Unknown"),
    readingDirection:["right-to-left","left-to-right","alternating-rs-ws","round","auto"].includes(config.readingDirection)?config.readingDirection:"auto",
    rowDirection:["right-to-left","left-to-right","alternating-rs-ws","round"].includes(direction)?direction:"alternating-rs-ws",
    activeAssetId:config.activeAssetId||project.activeChartAssetId||project.chart?.assetId||"",
    chartReadingMode:config.chartReadingMode!==false,
    coverCompletedRows:!!config.coverCompletedRows,
    readAloud:{
      voiceSpeed:Math.max(.6,Math.min(1.5,Number(config.readAloud?.voiceSpeed)||1)),
      language:["en","zh-Hant","yue"].includes(config.readAloud?.language)?config.readAloud.language:"en",
      mode:["short","teaching","beginner"].includes(config.readAloud?.mode)?config.readAloud.mode:"teaching"
    },
    crop:{x:Number(crop.x)||0,y:Number(crop.y)||0,width:Number(crop.width)||100,height:Number(crop.height)||100},
    grid:{
      x:Number(grid.x)||0,
      y:Number(grid.y)||0,
      width:Number(grid.width)||100,
      height:Number(grid.height)||100,
      rows:Number(grid.rows)||Number(project.chartRows)||Number(project.totalRows)||0,
      columns:Number(grid.columns)||Number(project.chartAnalysis?.columns)||0,
      rowNumbers:Array.isArray(grid.rowNumbers)?grid.rowNumbers:[],
      columnNumbers:Array.isArray(grid.columnNumbers)?grid.columnNumbers:[],
      manualAdjusted:!!grid.manualAdjusted,
      status:grid.status||"Grid not detected yet."
    },
    recognitionResults:Array.isArray(config.recognitionResults)?config.recognitionResults:[],
    lastExplanation:config.lastExplanation||"",
    updatedAt:config.updatedAt||""
  };
}
function normalizePatternSource(source={},project={}){
  const typeOptions=["visual-chart","written-pattern","mixed","none"];
  const fileTypeOptions=["image","pdf","docx","text","paste","none"];
  const statusOptions=["not-started","scanning","success","low-confidence","failed"];
  const workspaceOptions=["og-visual","flow-visual","reading-text","mixed"];
  const scan=source.scanSettings||{};
  const crop=scan.crop||{};
  return {
    type:typeOptions.includes(source.type)?source.type:"none",
    fileType:fileTypeOptions.includes(source.fileType)?source.fileType:"none",
    originalFileBlobId:source.originalFileBlobId||project.activeChartAssetId||project.chart?.assetId||"",
    extractedText:source.extractedText||"",
    ocrConfidence:Math.max(0,Math.min(100,Number(source.ocrConfidence)||0)),
    ocrStatus:statusOptions.includes(source.ocrStatus)?source.ocrStatus:"not-started",
    selectedPages:Array.isArray(source.selectedPages)?source.selectedPages.map(n=>Math.max(1,Number(n)||1)).filter(Boolean):[],
    userCorrectedText:source.userCorrectedText||"",
    workspaceMode:workspaceOptions.includes(source.workspaceMode)?source.workspaceMode:"og-visual",
    currentLine:Math.max(1,Number(source.currentLine)||1),
    chartCollapsed:!!source.chartCollapsed,
    textCollapsed:!!source.textCollapsed,
    pageModes:source.pageModes&&typeof source.pageModes==="object"?source.pageModes:{},
    scanSettings:{
      rotation:[0,90,180,270].includes(Number(scan.rotation))?Number(scan.rotation):0,
      improve:!!scan.improve,
      zoom:Math.max(.5,Math.min(3,Number(scan.zoom)||1)),
      crop:{
        x:Math.max(0,Math.min(100,Number(crop.x)||0)),
        y:Math.max(0,Math.min(100,Number(crop.y)||0)),
        width:Math.max(1,Math.min(100,Number(crop.width)||100)),
        height:Math.max(1,Math.min(100,Number(crop.height)||100))
      }
    },
    reviewedAt:source.reviewedAt||""
  };
}
function normalizeProjectSetup(setup={},project={}){
  const sizeOptions=["XXS","XS","S","M","L","XL","XXL","Custom"];
  const projectTypes=["Scarf","Socks","Hat / Beanie","Shawl","Bag","Blanket","Amigurumi","Top","Cardigan","Jumper / Sweater","Vest","Dress","Other"];
  const measurements=setup.bodyMeasurements||{};
  const details=setup.itemDetails||{};
  return {
    craft:["Knitting","Crochet"].includes(setup.craft)?setup.craft:(/crochet/i.test(project.type||"")?"Crochet":"Knitting"),
    projectType:projectTypes.includes(setup.projectType)?setup.projectType:projectTypes.includes(project.projectKind)?project.projectKind:"Other",
    patternGauge:setup.patternGauge||project.gauge||"",
    patternToolSize:setup.patternToolSize||project.needles||"",
    patternYarnWeight:setup.patternYarnWeight||project.yarn||"",
    userToolSize:setup.userToolSize||project.needles||"",
    userYarnWeight:setup.userYarnWeight||project.yarn||"",
    desiredSize:sizeOptions.includes(setup.desiredSize)?setup.desiredSize:(sizeOptions.includes(project.size)?project.size:"M"),
    customSize:setup.customSize||project.size||"",
    patternLanguage:["abbreviations","full"].includes(setup.patternLanguage)?setup.patternLanguage:"abbreviations",
    bodyMeasurements:{
      chest:measurements.chest||"",
      waist:measurements.waist||"",
      hip:measurements.hip||"",
      sleeve:measurements.sleeve||"",
      body:measurements.body||""
    },
    itemDetails:{
      recipient:details.recipient||"Adult",
      adultHeight:details.adultHeight||"160–170 cm",
      scarfStyle:details.scarfStyle||"One wrap",
      sockType:details.sockType||"Crew",
      sockSizingMode:details.sockSizingMode||"Shoe Size",
      shoeRegion:details.shoeRegion||"AU",
      shoeSize:details.shoeSize||"",
      footLength:details.footLength||"",
      footCircumference:details.footCircumference||"",
      heelToAnkle:details.heelToAnkle||"",
      ankleCircumference:details.ankleCircumference||"",
      calfCircumference:details.calfCircumference||"",
      fitPreference:details.fitPreference||"Regular",
      constructionMethod:details.constructionMethod||"Cuff-down",
      heelStyle:details.heelStyle||"Pattern decides",
      headCircumference:details.headCircumference||"",
      hatStyle:details.hatStyle||"Fitted beanie",
      hatDepth:details.hatDepth||"",
      brimStyle:details.brimStyle||"Ribbed brim",
      crownStyle:details.crownStyle||"Pattern decides",
      bagType:details.bagType||"Tote",
      width:details.width||"",
      height:details.height||"",
      length:details.length||"",
      strapLength:details.strapLength||"",
      depth:details.depth||"",
      handleDrop:details.handleDrop||"",
      closure:details.closure||"None",
      lining:details.lining||"No lining",
      structure:details.structure||"Medium",
      blanketType:details.blanketType||"Throw Blanket",
      blanketShape:details.blanketShape||"Rectangle",
      warmth:details.warmth||"Medium",
      borderWidth:details.borderWidth||"",
      fringe:details.fringe||"None",
      amigurumiType:details.amigurumiType||"Animal",
      finishedHeight:details.finishedHeight||"",
      finishedWidth:details.finishedWidth||"",
      shape:details.shape||"Round",
      stuffingFirmness:details.stuffingFirmness||"Medium",
      safetyRecipient:details.safetyRecipient||"Adult",
      originalHeight:details.originalHeight||"",
      targetHeight:details.targetHeight||"",
      shawlShape:details.shawlShape||"Triangle",
      shawlFit:details.shawlFit||"Everyday Shawl",
      wingspan:details.wingspan||""
    },
    updatedAt:setup.updatedAt||""
  };
}
function ensureProjectSetup(p){
  p.projectSetup=normalizeProjectSetup(p.projectSetup,p);
  p.projectCalculations=calculateFlowProjectPlan(p,p.projectSetup);
  return p.projectSetup;
}
function firstNumber(value,fallback=0){
  const match=String(value||"").match(/-?\d+(?:\.\d+)?/);
  return match?Number(match[0]):fallback;
}
function parseGaugePair(gauge=""){
  const nums=String(gauge||"").match(/\d+(?:\.\d+)?/g)?.map(Number)||[];
  return {stitches:nums[0]||20,rows:nums[1]||28,span:nums[2]||10};
}
function normalizeYarnWeightName(value=""){
  const text=String(value||"").toLowerCase();
  if(/lace|0\b/.test(text))return "Lace";
  if(/fingering|sock|super fine|\b1\b/.test(text))return "Fingering";
  if(/sport|\b2\b/.test(text))return "Sport";
  if(/dk|light|8 ply|\b3\b/.test(text))return "DK";
  if(/worsted|aran|medium|10 ply|12 ply|\b4\b/.test(text))return "Worsted";
  if(/bulky|chunky|\b5\b/.test(text))return "Bulky";
  if(/super bulky|super chunky|\b6\b/.test(text))return "Super Bulky";
  return String(value||"").trim();
}
function yarnWeightRank(value=""){
  const order=["Lace","Fingering","Sport","DK","Worsted","Bulky","Super Bulky"];
  const normalized=normalizeYarnWeightName(value);
  return order.indexOf(normalized);
}
function sizeMeasurementDefaults(size="M"){
  return {
    XXS:{chest:76,waist:61,hip:84,body:52,sleeve:43},
    XS:{chest:82,waist:66,hip:90,body:54,sleeve:44},
    S:{chest:90,waist:74,hip:98,body:56,sleeve:46},
    M:{chest:100,waist:84,hip:108,body:58,sleeve:48},
    L:{chest:110,waist:94,hip:118,body:60,sleeve:50},
    XL:{chest:122,waist:106,hip:132,body:62,sleeve:52},
    XXL:{chest:132,waist:118,hip:142,body:64,sleeve:54},
    Custom:{chest:100,waist:84,hip:108,body:58,sleeve:48}
  }[size]||{chest:100,waist:84,hip:108,body:58,sleeve:48};
}
function setupMeasurements(setup={}){
  const defaults=sizeMeasurementDefaults(setup.desiredSize);
  const values=setup.bodyMeasurements||{};
  return Object.fromEntries(Object.entries(defaults).map(([key,value])=>[key,firstNumber(values[key],value)]));
}
function isGarmentProject(type=""){
  return ["Top","Cardigan","Jumper / Sweater","Vest","Dress"].includes(type);
}
function blanketPresetSize(type="Throw Blanket"){
  return {
    Lovey:[30,30],"Baby Blanket":[90,100],"Crib Blanket":[90,130],"Stroller Blanket":[75,90],"Lap Blanket":[90,120],"Throw Blanket":[130,170],Twin:[165,230],"Full / Double":[200,230],Queen:[230,250],King:[270,250],Custom:[130,170]
  }[type]||[130,170];
}
function flowProjectDimensions(setup={}){
  const d=setup.itemDetails||{},m=setupMeasurements(setup),type=setup.projectType;
  if(type==="Scarf"){
    const lengths={"Neck warmer":65,"One wrap":130,"Two wraps":170,"Long winter scarf":190,"Oversized scarf":220,"Fashion scarf":150,"Custom length":firstNumber(d.length,160)};
    return {width:firstNumber(d.width,22),length:lengths[d.scarfStyle]||160,sleeve:0,body:0};
  }
  if(type==="Socks"){
    const foot=firstNumber(d.footLength,24),leg={ "No-show":3, Ankle:7, "Quarter Crew":12, Crew:18, "Mid-Calf":28, "Knee High":40, "Over-the-Knee":55 }[d.sockType]||18;
    return {width:firstNumber(d.footCircumference,22),length:foot+leg,sleeve:0,body:leg};
  }
  if(type==="Hat / Beanie")return {width:firstNumber(d.headCircumference,56),length:firstNumber(d.hatDepth,22),sleeve:0,body:0};
  if(type==="Bag")return {width:firstNumber(d.width,36),length:firstNumber(d.height,38),sleeve:firstNumber(d.strapLength,60),body:firstNumber(d.depth,8)};
  if(type==="Blanket"){const preset=blanketPresetSize(d.blanketType);return {width:firstNumber(d.width,preset[0]),length:firstNumber(d.length,preset[1]),sleeve:0,body:0};}
  if(type==="Amigurumi")return {width:firstNumber(d.finishedWidth,firstNumber(d.targetHeight,18)),length:firstNumber(d.finishedHeight,firstNumber(d.targetHeight,20)),sleeve:0,body:0};
  if(type==="Shawl")return {width:firstNumber(d.wingspan,170),length:firstNumber(d.height,70),sleeve:0,body:0};
  if(isGarmentProject(type))return {width:Math.max(20,m.chest+8),length:m.body,sleeve:m.sleeve,body:m.body};
  return {width:firstNumber(d.width,Math.max(20,m.chest+8)),length:firstNumber(d.length,m.body),sleeve:m.sleeve,body:m.body};
}
function setupWarnings(setup={}){
  const warnings=[];
  const patternTool=firstNumber(setup.patternToolSize,0),userTool=firstNumber(setup.userToolSize,0);
  if(patternTool&&userTool&&Math.abs(patternTool-userTool)>=.5){
    warnings.push(`Your ${setup.craft==="Crochet"?"hook":"needle"} is ${userTool>patternTool?"larger":"smaller"} than the pattern. Your stitches may come out ${userTool>patternTool?"bigger and looser":"smaller and firmer"}, so the finished size may change.`);
  }
  const patternRank=yarnWeightRank(setup.patternYarnWeight),userRank=yarnWeightRank(setup.userYarnWeight);
  if(patternRank>=0&&userRank>=0&&patternRank!==userRank){
    warnings.push(`Your yarn is ${userRank>patternRank?"heavier":"lighter"} than the pattern yarn. The finished piece may be ${userRank>patternRank?"larger and use more yarn":"smaller and use less yarn"}.`);
  }
  return warnings;
}
function calculateFlowProjectPlan(p={},setup=normalizeProjectSetup(p.projectSetup,p)){
  const gauge=parseGaugePair(setup.patternGauge),measurements=setupMeasurements(setup),toolDelta=Math.abs(firstNumber(setup.userToolSize)-firstNumber(setup.patternToolSize)),weightDelta=Math.abs((yarnWeightRank(setup.userYarnWeight)+1||0)-(yarnWeightRank(setup.patternYarnWeight)+1||0));
  const dims=flowProjectDimensions(setup),width=Math.max(1,dims.width),length=Math.max(1,dims.length),sleeve=Math.max(0,dims.sleeve||0);
  const stitchCount=Math.max(1,Math.round(width*gauge.stitches/gauge.span)),rowCount=Math.max(1,Math.round(length*gauge.rows/gauge.span)),sleeveRows=Math.max(1,Math.round(sleeve*gauge.rows/gauge.span));
  const startCount=setup.craft==="Crochet"?Math.max(1,Math.round(stitchCount*.48)):stitchCount;
  const yarnBase=Math.max(1,Math.round((stitchCount*rowCount)/75)),yarnUsage=Math.round(yarnBase*(1+toolDelta*.06+weightDelta*.12));
  const shaping=Math.max(0,stitchCount-startCount),increaseEvery=shaping?Math.max(1,Math.round(rowCount/Math.max(1,Math.ceil(shaping/2)))):0;
  return {
    updatedAt:new Date().toISOString(),
    castOnOrChain:startCount,
    startingLabel:setup.craft==="Crochet"?"Starting chain":"Cast-on",
    stitchCount,
    rowCount,
    widthCm:Math.round(width),
    lengthCm:Math.round(length),
    sleeveLengthCm:Math.round(sleeve),
    bodyLengthCm:Math.round(dims.body||length),
    shapingNotes:shaping?`Add about ${shaping} stitch${shaping===1?"":"es"} across the project, roughly every ${increaseEvery} row${increaseEvery===1?"":"s"} if your pattern does not already place them.`:"No extra shaping is suggested from these setup numbers.",
    estimatedYarnUsage:`About ${yarnUsage} ball${yarnUsage===1?"":"s"} or skein${yarnUsage===1?"":"s"} as a planning estimate.`,
    warnings:setupWarnings(setup)
  };
}
function isLegacySymbolLearningSection(section={}){
  const id=String(section.id||"").toLowerCase();
  const name=String(section.name||"").toLowerCase();
  const description=String(section.description||"").toLowerCase();
  return ["symbol-learning","symbol-learning-library","symbol-learning-library-section"].includes(id)
    || name==="symbol learning library"
    || description.includes("local flow mode corrections");
}
function sanitizeLibrarySections(sections=[]){
  return (sections||[]).filter(section=>!isLegacySymbolLearningSection(section));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const merged = { ...starterData, ...saved };
    merged.librarySections = sanitizeLibrarySections(saved.librarySections || structuredClone(starterData.librarySections));
    if(!merged.librarySections.some(s=>s.id==="materials"))merged.librarySections.push(structuredClone(starterData.librarySections.find(s=>s.id==="materials")));
    for(const id of ["symbols","tool-manual","theory"]){
      if(!merged.librarySections.some(s=>s.id===id))merged.librarySections.push(structuredClone(starterData.librarySections.find(s=>s.id===id)));
    }
    const tutorialSection=merged.librarySections.find(s=>s.id==="tutorials");
    if(tutorialSection){
      if((tutorialSection.items||[]).length){
        tutorialSection.id="personal-references";
        tutorialSection.name="Personal References (legacy)";
        tutorialSection.description="Your existing personal uploads from an earlier Yarncha version.";
      }else merged.librarySections=merged.librarySections.filter(section=>section.id!=="tutorials");
    }
    merged.librarySections = sanitizeLibrarySections(merged.librarySections);
    merged.inventory = saved.inventory || structuredClone(starterData.inventory);
    merged.cart = saved.cart || [];
    merged.marketBudget = Number(saved.marketBudget) || starterData.marketBudget;
    merged.budgetSettings = saved.budgetSettings || {...starterData.budgetSettings,amount:merged.marketBudget};
    merged.purchaseHistory = saved.purchaseHistory || [];
    merged.language = saved.language || "en";
    merged.unitSystem = saved.unitSystem || "metric";
    merged.appPreferences = {...starterData.appPreferences,...(saved.appPreferences||{})};
    merged.theme = {...structuredClone(starterData.theme), ...(saved.theme || {})};
    merged.theme.name = normalizeThemeName(merged.theme.name);
    merged.theme.style = normalizeDesignStyle(merged.theme.style);
    merged.theme.mode = ["light","dark","system"].includes(merged.theme.mode) ? merged.theme.mode : "system";
    merged.onboardingComplete = !!saved.onboardingComplete;
    merged.onboardingStep = Number(saved.onboardingStep) || 0;
    merged.account = saved.account || structuredClone(starterData.account);
    merged.yarnMaterials = saved.yarnMaterials?.length ? saved.yarnMaterials : defaultYarnMaterials();
    merged.techniqueKnowledge = saved.techniqueKnowledge || [];
    merged.symbolFavorites = saved.symbolFavorites || [];
    merged.userTechniqueReferences = saved.userTechniqueReferences || {};
    merged.userSymbolsOverride = saved.userSymbolsOverride || {};
    merged.symbolLearningLibrary = (saved.symbolLearningLibrary || []).map(normalizeLearningRecord);
    merged.projectIdeas = (saved.projectIdeas || []).map(normalizeProjectIdea);
    merged.ideaFilters = saved.ideaFilters || {search:"",craft:"All",kind:"All",showArchived:false};
    merged.projects = (saved.projects || starterData.projects).map(p => ({
      ...p,
      totalRows: Number(p.totalRows) || null,
      chartRows: Number(p.chartRows) || Number(p.totalRows) || null,
      subCounters: p.subCounters || [],
      markers: (p.markers || []).map((m,index)=>({...m,id:m.id||`marker-${p.id}-${index}`,label:m.label||m.color})),
      assistantMessages: p.assistantMessages || [],
      projectTools: p.projectTools || {},
      fitCheck:p.fitCheck || {},
      toolHistory: p.toolHistory || [],
      buyList: p.buyList || [],
      pdfReference: p.pdfReference || "",
      attachments: p.attachments || [],
      patternPlan: p.patternPlan || {mode:"modified"},
      chatPreference: p.chatPreference || "ask",
      readerStatus:p.readerStatus||"No files analysed yet.",
      flowMode:p.flowMode!==false,
      activeTab:p.activeTab || "track",
      readingMode:!!p.readingMode,
      chartMode:p.chartMode || "og",
      chartZoom:Number(p.chartZoom)||1,
      annotations:p.annotations || [],
      annotationHistory:p.annotationHistory || [],
      annotationRedo:p.annotationRedo || [],
      annotationColor:p.annotationColor || "#d96572",
      annotationWidth:Number(p.annotationWidth)||4,
      annotationOpacity:Number(p.annotationOpacity)||.72,
      eraserMode:p.eraserMode || "standard",
      eraserSize:Number(p.eraserSize)||28,
      selectedAnnotationId:p.selectedAnnotationId || null,
      rowMask:p.rowMask || null,
      maskLockSize:!!p.maskLockSize,
      maskLockPosition:!!p.maskLockPosition,
      coverAsset:p.coverAsset || null,
      status:projectStatusOptions.includes(p.status) ? p.status : "In progress",
      startDate:p.startDate || "",
      finishDate:p.finishDate || "",
      patternUrl:p.patternUrl || "",
      yarn:p.yarn || "",
      needles:p.needles || "",
      gauge:p.gauge || "",
      size:p.size || "",
      sizingNotes:p.sizingNotes || "",
      patternSource:normalizePatternSource(p.patternSource,p),
      projectSetup:normalizeProjectSetup(p.projectSetup,p),
      updatedAt:p.updatedAt || new Date().toISOString(),
      chartAnalysis:p.chartAnalysis ? {
        ...p.chartAnalysis,
        rows:p.chartAnalysis.rows || [],
        legend:p.chartAnalysis.legend || "",
        columns:p.chartAnalysis.columns || null,
        gridStatus:p.chartAnalysis.gridStatus || "Grid and cell boundaries require user confirmation."
      } : null,
      chartReader:normalizeChartReaderConfig(p.chartReader,p)
    })).map(p=>({...p,projectCalculations:calculateFlowProjectPlan(p,p.projectSetup)}));
    return merged;
  }
  catch { return structuredClone(starterData); }
}
function saveState() {
  const now=new Date().toISOString();
  state.lastSavedAt=now;
  updateSaveStatus("Saving...");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  putProjectStateSnapshot().then(()=>updateSaveStatus(`✓ Saved · Last saved: ${formatSavedTime(now)}`)).catch(()=>updateSaveStatus("Saved locally in browser storage"));
  renderSidebar(); applyTheme(); queueMicrotask(applyLanguage);
  window.dispatchEvent(new CustomEvent("yarncha:local-save", { detail:{ savedAt:now } }));
}
let saveDebounceTimer=null;
function saveStateSoon(delay=350){
  clearTimeout(saveDebounceTimer);
  updateSaveStatus("Saving...");
  saveDebounceTimer=setTimeout(saveState,delay);
}
function updateSaveStatus(text){const el=document.getElementById("save-status");if(el)el.textContent=text;}
function formatSavedTime(value){try{return new Date(value).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});}catch{return "now";}}
function getProject(id = currentProjectId) { return state.projects.find(p => p.id === id) || state.projects[0]; }
function escapeHtml(value = "") { return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c])); }
const uiIconPaths={
  touch:'<path d="M8.5 11.5V6.8a1.7 1.7 0 0 1 3.4 0v4.7"></path><path d="M11.9 11.1V9a1.55 1.55 0 0 1 3.1 0v3"></path><path d="M15 12V9.8a1.5 1.5 0 0 1 3 0v4.4c0 4-2.7 6.8-6.4 6.8h-.7a5.6 5.6 0 0 1-4-1.8l-2.8-3a1.55 1.55 0 0 1 2.1-2.3l2.3 1.8V11.5"></path><path d="M5.5 5.5 3.8 3.8M18.5 5.5l1.7-1.7M12 3V1"></path>',
  voice:'<rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6"></path>',
  camera:'<rect x="3.5" y="6.5" width="17" height="13" rx="2"></rect><path d="m8 6.5 1.3-2h5.4l1.3 2"></path><circle cx="12" cy="13" r="3.25"></circle>',
  image:'<rect x="3.5" y="4.5" width="17" height="15" rx="2"></rect><circle cx="9" cy="10" r="1.5"></circle><path d="m5.5 17 4.5-4 3 2.5 2.5-2 3 3.5"></path>',
  folder:'<path d="M3.5 7.5h6l2-2h9v13.5h-17Z"></path>',
  book:'<path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v13H7a2 2 0 0 1-2-2Z"></path><path d="M5 17.5A2.5 2.5 0 0 1 7.5 15H18M9 8h5"></path>',
  pattern:'<path d="M4 6h16M4 12h16M4 18h16M7 3v18M17 3v18"></path>',
  idea:'<path d="M9 18h6M9.5 21h5"></path><path d="M8 14.5c-1.3-1.1-2-2.6-2-4.4A6 6 0 0 1 18 10c0 1.8-.8 3.4-2.1 4.5-.7.6-.9 1.1-.9 2H9c0-.9-.3-1.5-1-2Z"></path>',
  fibre:'<circle cx="10" cy="12" r="6.5"></circle><path d="M5 8.5c3 1 6.7.8 10.2-.7M4 12c3.6 1.4 7.8 1.5 12 .2M6 17c2.2-3.6 4-7.8 4.8-11.4M13 18.2c.6-4.7.2-8.7-1.2-12M16 15.5l4 3.5"></path>',
  manual:'<rect x="4" y="3.5" width="16" height="17" rx="2"></rect><path d="M8 8h8M8 12h8M8 16h5"></path>',
  theory:'<circle cx="12" cy="12" r="8.5"></circle><path d="M9.7 9.2a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1.2 1-1.2 1.8M12 17h.01"></path>',
  pen:'<path d="m5 19 3.8-1 9.7-9.7-2.8-2.8L6 15.2Z"></path><path d="m14.5 6.7 2.8 2.8"></path>',
  highlighter:'<path d="m5 16 8.8-8.8 3 3L8 19H5Z"></path><path d="M11 20h8"></path>',
  eraser:'<path d="m5.2 14.8 8.6-8.6 5 5-7.3 7.3H8.9Z"></path><path d="m11.5 18.5-5-5M12 20h7"></path>',
  mask:'<rect x="3.5" y="7" width="17" height="10" rx="1.5"></rect><path d="M7 10h10M7 14h7"></path>',
  text:'<path d="M5 5h14M12 5v14M8.5 19h7"></path>',
  arrow:'<path d="M5 18 18 5M12 5h6v6"></path>',
  marker:'<path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"></path><circle cx="12" cy="10" r="2"></circle>',
  close:'<path d="m6 6 12 12M18 6 6 18"></path>',
  undo:'<path d="M9 7 5 11l4 4"></path><path d="M6 11h7a6 6 0 0 1 6 6"></path>',
  redo:'<path d="m15 7 4 4-4 4"></path><path d="M18 11h-7a6 6 0 0 0-6 6"></path>',
  edit:'<path d="m5 19 3.8-1 9.7-9.7-2.8-2.8L6 15.2Z"></path><path d="m14.5 6.7 2.8 2.8M5 21h14"></path>',
  calculator:'<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M8 7h8M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1M8 18h1M12 18h5"></path>',
  measure:'<path d="M4 17 17 4l3 3L7 20Z"></path><path d="m9 15-2-2M12 12l-2-2M15 9l-2-2"></path>',
  garment:'<path d="m8 5 4-2 4 2 4 4-3 2v9H7v-9L4 9Z"></path>',
  circle:'<circle cx="12" cy="12" r="8"></circle><path d="M12 4v16M4 12h16"></path>',
  render:'<rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M4 10h16M10 4v16"></path>',
  exchange:'<path d="M5 8h13M15 5l3 3-3 3M19 16H6M9 13l-3 3 3 3"></path>'
  ,appearance:'<circle cx="12" cy="12" r="8"></circle><path d="M12 4a8 8 0 0 0 0 16c2 0 2.5-2.2 1-3.4-1.2-1-.5-2.6 1-2.6h2.5A3.5 3.5 0 0 0 20 10.5"></path><circle cx="9" cy="8" r=".7"></circle><circle cx="6.8" cy="11.5" r=".7"></circle>',
  preferences:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"></path><circle cx="16" cy="7" r="2"></circle><circle cx="8" cy="17" r="2"></circle>',
  storage:'<ellipse cx="12" cy="6" rx="8" ry="3"></ellipse><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path>',
  info:'<circle cx="12" cy="12" r="9"></circle><path d="M12 10v6M12 7h.01"></path>',
  warning:'<path d="M12 3.5 21 19H3Z"></path><path d="M12 9v4M12 16.5h.01"></path>'
};
function uiIcon(name,className="ui-icon"){return `<svg class="${className}" aria-hidden="true" viewBox="0 0 24 24">${uiIconPaths[name]||uiIconPaths.calculator}</svg>`;}
function toast(message) {
  const el = document.getElementById("toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}
const hkTranslations={
  "Today":"今日","Projects":"專案","Yarn Stash":"毛線庫存","Library":"資料庫","Tools":"工具","Your projects":"你的專案",
  "Settings":"設定","Reading Mode":"閱讀模式","Exit Reading":"離開閱讀模式",
  "My workspace":"我的工作區","Saved on this device":"已儲存在此裝置","New project":"新增專案","Good afternoon, maker.":"午安，手作人。",
  "Everything is right where you left it.":"所有內容都停留在你上次離開的位置。","In progress":"進行中","View all projects →":"查看所有專案 →",
  "Maker's toolkit":"手作工具箱","Swatch adapter":"織片調整器","Shape evenly":"平均加減針","Converters":"換算工具",
  "Read row guidance":"朗讀行數指引","Voice control":"語音控制","Pattern chart":"圖解","Upload":"上載","Main row counter":"主行數計數器",
  "Next row":"下一行","Project notes":"專案筆記","Stitch marker":"記號扣","Ask about this chart":"詢問此圖解","Buy list":"購買清單",
  "Ask about the current row, abbreviations, repeats, translation, or where you are stuck. Visual symbol recognition is paused; verify chart symbols manually.":"你可以詢問目前行數、縮寫、重複段落、翻譯，或卡住的位置。視覺符號辨識已暫停；請手動核對圖解符號。",
  "AI chart reader beta is paused. Manual OG Chart Mode is the reliable daily workflow right now.":"AI 圖解閱讀 Beta 已暫停。現階段最可靠的日常流程是手動 OG 圖解模式。",
  "The assistant can use your uploaded text, project notes, and personal symbol references, but it should never guess an unclear symbol.":"助理可以參考你上載的文字、專案筆記及個人符號參考，但不應猜測不清楚的符號。",
  "OG Mode":"OG 模式","Flow Mode (Beta)":"Flow 模式（Beta）","Manual chart reading":"手動圖解閱讀","Manual Reading Mode is recommended for accurate tracking.":"建議使用手動閱讀模式作準確追蹤。",
  "Flow Mode is paused. It will return later as a reviewed AI-assisted workflow.":"Flow 模式已暫停。稍後會以經審核的 AI 輔助流程回歸。",
  "Row Mask":"行遮罩","Lock mask":"鎖定遮罩","Unlock mask":"解鎖遮罩","Clear mask":"清除遮罩","Cover done":"遮住已完成行","Edit Counter":"編輯計數器","Reset Progress":"重設進度",
  "Inventory":"庫存","Shopping cart":"購物車","Likely needs":"較可能需要","Cart items":"購物車項目","Yarn in stash":"現有毛線",
  "English":"English","Start over":"重新開始","Delete project":"刪除專案","Set planned rows":"設定預計行數",
  "Stitch & Pattern Tools":"針法及圖樣工具","Fit & Size Tools":"尺寸及合身工具","Project Rendering Studio":"作品視覺規劃工作室","Project Rendering":"作品視覺規劃","Yarn Tools":"毛線工具",
  "Open":"開啟","Open Tool":"開啟工具","Back to categories":"返回分類","Back to tools":"返回工具","Preferred units":"偏好單位","UK / Metric":"英國／公制","US / Imperial":"美國／英制",
  "Add this to Buy List?":"加入購買清單？","Project Ideas":"作品靈感","Create Project from Idea":"由靈感建立專案","Archive":"封存","Archived":"已封存","Tool History":"工具紀錄",
  "Reader status:":"圖表閱讀狀態：","Set cart budget":"設定購物車預算","Budget amount":"預算金額","Budget currency":"預算貨幣",
  "Reset period":"重設週期","Current period started":"本期開始日期","Every week":"每星期","Every month":"每月",
  "Every year":"每年","Never":"永不","Reset spent now":"立即重設已用金額","Save":"儲存","Currency":"貨幣"
};
const originalText=new WeakMap();
function applyTheme(){
  document.documentElement.dataset.theme=normalizeThemeName(state.theme?.name);
  document.documentElement.dataset.mode=state.theme?.mode||"system";
  document.documentElement.dataset.style=normalizeDesignStyle(state.theme?.style);
}
function applyLanguage(){
  document.documentElement.lang=state.language;
  document.getElementById("app-language").value=state.language;
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;while(node=walker.nextNode()){const raw=originalText.get(node)||node.nodeValue;const trimmed=raw.trim();if(!trimmed)continue;if(!originalText.has(node))originalText.set(node,raw);const translated=state.language==="zh-HK"?(hkTranslations[trimmed]??trimmed):trimmed,target=translated!==trimmed?raw.replace(trimmed,translated):raw;if(node.nodeValue!==target)node.nodeValue=target;}
}

function setActiveView(viewId){
  document.querySelectorAll(".view").forEach(view => {
    const isActive = view.id === `${viewId}-view`;
    view.classList.toggle("active", isActive);
    view.toggleAttribute("hidden", !isActive);
    view.setAttribute("aria-hidden", isActive ? "false" : "true");
  });
}

function navigationDebugLog(clickedPageId,before,after,component){
  const isLocal=["localhost","127.0.0.1",""].includes(location.hostname);
  if(isLocal)console.debug("[Yarncha navigation]",{clickedPageId,activePageBefore:before,activePageAfter:after,renderedComponent:component});
}

function routeForPage(pageId){
  const routes={
    today:{viewId:"today",component:"TodayPage",label:"Today",render:renderToday},
    projects:{viewId:"projects",component:"ProjectsPage",label:"Projects",render:renderProjects},
    market:{viewId:"market",component:"YarnStashPage",label:"Yarn Stash",render:renderMarket},
    library:{viewId:"library",component:"LibraryPage",label:"Library",render:renderLibrary},
    tools:{viewId:"tools",component:"ToolsPage",label:"Tools",render:()=>renderTool("swatch")},
    settings:{viewId:"settings",component:"SettingsPage",label:"Settings",render:renderSettings},
    "project-detail":{viewId:"project-detail",component:"ProjectDetailPage",label:getProject()?.name||"Project",render:renderProjectDetail}
  };
  if(pageId==="yarnStash")return routes.market;
  return routes[pageId]||routes.today;
}

function showView(name) {
  const requested = name === "yarnStash" ? "market" : String(name || "today");
  const before = activePage;
  const route = routeForPage(requested);
  route.render();
  activePage = requested;
  renderedComponent = route.component;
  setActiveView(route.viewId);
  document.querySelectorAll(".nav-item").forEach(item => {
    const navId = item.dataset.view === "yarnStash" ? "market" : item.dataset.view;
    item.classList.toggle("active", navId === requested);
  });
  document.getElementById("breadcrumb").textContent = route.label;
  document.getElementById("header-context").textContent = route.viewId === "project-detail" ? "Projects" : "Workspace";
  document.querySelector(".sidebar").classList.remove("open");
  navigationDebugLog(requested,before,activePage,renderedComponent);
  queueMicrotask(applyLanguage);
}


function handleAppShellClick(e){
  const nav = e.target.closest("[data-view]"); if (nav) { showView(nav.dataset.view); return; }
  const go = e.target.closest("[data-go]"); if (go) { showView(go.dataset.go); return; }
  const project = e.target.closest("[data-project]"); if (project) { openProject(project.dataset.project); return; }
  const add = e.target.closest("[data-add-project]"); if (add) { openProjectModal(); return; }
  const tool = e.target.closest("[data-tool]"); if (tool&&!tool.closest(".annotation-toolbar")) { showView("tools"); renderTool(tool.dataset.tool); return; }
  const tab = e.target.closest("[data-tool-tab]"); if (tab) { renderTool(tab.dataset.toolTab); return; }
  const space=e.target.closest("[data-library-space]"); if(space){currentLibrarySection=space.dataset.librarySpace;renderLibrary();}
}
if(window.__yarnchaShellClickHandler)document.removeEventListener("click",window.__yarnchaShellClickHandler);
window.__yarnchaShellClickHandler=handleAppShellClick;
document.addEventListener("click",handleAppShellClick);

function renderSidebar() {
  document.getElementById("sidebar-project-list").innerHTML = state.projects.map(p =>
    `<button class="side-project" data-project="${p.id}"><span class="project-dot" style="background:${p.color}"></span><span>${escapeHtml(p.name)}</span></button>`
  ).join("");
}

function progress(project) { return project.totalRows ? Math.min(100, Math.round((project.row / project.totalRows) * 100)) : null; }
function rowSummary(project) { return project.totalRows ? `Row ${project.row} of ${project.totalRows}` : `Row ${project.row} · Open-ended`; }
function visual(project, compact = false) {
  const cover = project.coverAsset
    ? `<img class="project-cover-img" data-cover-asset="${project.coverAsset}" alt="${escapeHtml(project.name)} cover">`
    : `<div class="cover-placeholder"><span class="system-icon">${uiIcon("camera")}</span><strong>Add Project Photo</strong><small>Upload or replace cover</small></div>`;
  return `<div class="project-visual ${project.coverAsset?"has-cover":"no-cover"}" style="--project-color:${project.color};background:linear-gradient(145deg,${project.color}bb,${project.color})">
    ${cover}
    <span class="project-badge">${escapeHtml(project.type).toUpperCase()}</span>
    ${compact ? "" : `<small class="project-started">Started ${escapeHtml(project.started)}</small>`}
  </div>`;
}
async function hydrateProjectCovers(){
  for(const img of document.querySelectorAll("[data-cover-asset]")){
    const file=await getAsset(img.dataset.coverAsset);
    if(file)img.src=URL.createObjectURL(file);
  }
}

function renderToday() {
  renderTimeGreeting();
  const p = getProject(state.activeProjectId);
  const host = document.getElementById("active-project-card");
  if (!p) {
    host.innerHTML = `<div class="empty-state"><h3>Your first project starts here</h3><button class="primary-button" data-add-project>New project</button></div>`;
    return;
  }
  host.innerHTML = `<article class="resume-card card">
    ${visual(p)}
    <div class="resume-info">
      <h3>${escapeHtml(p.name)}</h3><p class="project-type">${escapeHtml(p.type)} · Started ${escapeHtml(p.started)}</p>
      <div class="row-progress"><span>${rowSummary(p)}</span><strong>${progress(p) === null ? "In progress" : `${progress(p)}%`}</strong></div>
      <div class="progress-track"><div class="progress-fill" style="width:${progress(p) ?? Math.min(95, p.row)}%"></div></div>
      <div class="counter-line"><div><small>Current row</small><strong>${p.row}</strong></div><div><small>Stitch markers</small><strong>${p.markers.length}</strong></div></div>
      <button class="primary-button" data-project="${p.id}">Continue making →</button>
    </div>
  </article>`;
  hydrateProjectCovers();
}

function localCraftGreeting(){
  const hour=new Date().getHours();
  if(state.language==="zh-HK"){
    if(hour>=5&&hour<12)return"早晨！準備好開始今日的新一行嗎？";
    if(hour<17)return"午安！你的手作專案正在等你。";
    if(hour<22)return"晚安！來織幾針，輕鬆一下吧。";
    return"夜深了！睡前記得保存進度。";
  }
  if(hour>=5&&hour<12)return"Good morning! Ready to start a fresh row today?";
  if(hour<17)return"Good afternoon! Your project is waiting for you.";
  if(hour<22)return"Good evening! A few relaxing stitches sound nice.";
  return"Good night! Remember to save your progress before bed.";
}
function renderTimeGreeting(){
  const title=document.getElementById("today-greeting");
  if(title)title.textContent=localCraftGreeting();
  const date=document.getElementById("today-date");
  if(date)date.textContent=new Intl.DateTimeFormat(state.language==="zh-HK"?"zh-HK":"en-AU",{weekday:"long",month:"long",day:"numeric"}).format(new Date()).toUpperCase();
}

function renderProjects() {
  document.getElementById("project-grid").innerHTML = state.projects.map(p => `<button class="project-card card" type="button" data-project="${p.id}" aria-label="Open ${escapeHtml(p.name)}">
    ${visual(p, true)}<div class="project-card-info"><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.type)} · ${rowSummary(p)}</p>
    <div class="progress-track"><div class="progress-fill" style="width:${progress(p) ?? Math.min(95, p.row)}%"></div></div></div>
  </button>`).join("") + `<button class="add-project-card card" type="button" data-add-project><div><span class="add-circle">+</span><strong>Start a new project</strong><p>Bring a new idea to life</p></div></button>`;
  hydrateProjectCovers();
}

function openProject(id) {
  const project = state.projects.find(p=>p.id===id);
  if(!project){
    console.warn("[Yarncha project navigation] Project not found", { projectId:id });
    toast("Project not found. Please choose another project.");
    showView("projects");
    return;
  }
  currentProjectId = id;
  state.activeProjectId = id;
  saveState();
  showView("project-detail");
}
const showProject=openProject;

function renderProjectDetail() {
  const p = getProject();
  if (!p) return showView("projects");
  p.activeTab ||= "track";
  const tab = p.readingMode ? "chart" : p.activeTab;
  document.getElementById("project-detail").innerHTML = `
    <div class="project-mobile-shell ${p.readingMode?"is-reading":""}">
      <div class="detail-head project-header">
        <button class="project-detail-cover cover-upload-button" id="project-cover-picker" aria-label="Upload or replace project cover photo">${visual(p,true)}</button>
        <div class="project-title-block"><p class="eyebrow">${escapeHtml(p.type).toUpperCase()}</p><div class="editable-title"><h1>${escapeHtml(p.name)}</h1></div><p class="project-type">${escapeHtml(p.status||"In progress")} · Row ${p.row}${p.totalRows?` of ${p.totalRows}`:""} · ${progress(p) === null ? "Open-ended" : `${progress(p)}% complete`}</p></div>
        <div class="detail-actions project-actions"><button class="project-action-button ghost" id="edit-project-name">Edit Project</button><button class="project-action-button secondary" id="speak-row">Read row</button><button class="project-action-button primary voice-icon-button" id="voice-project" aria-label="Voice controls" title="Voice controls">${uiIcon("voice","button-icon")}</button></div>
      </div>
      <div class="project-tabs" role="tablist" aria-label="Project sections">
        ${["track","chart","project","assistant"].map(id=>`<button class="${tab===id?"active":""}" data-project-tab="${id}">${id[0].toUpperCase()+id.slice(1)}</button>`).join("")}
      </div>
      <section class="project-tab-panel">${tab==="track"?projectTrackHtml(p):tab==="chart"?projectChartHtml(p):tab==="project"?projectProjectHtml(p):projectAssistantTabHtml(p)}</section>
    </div>`;
  bindProjectDetail();
  hydrateProjectCovers();
  const chartAssetId=p.activeChartAssetId&&p.attachments.some(a=>a.id===p.activeChartAssetId)?p.activeChartAssetId:p.attachments[0]?.id;
  if(chartAssetId)setTimeout(()=>showProjectAsset(chartAssetId),0);
  queueMicrotask(applyLanguage);
  window.dispatchEvent(new CustomEvent("yarncha:project-rendered", { detail:{ projectId:p.id, tab } }));
}

function projectTrackHtml(p){
  return `<div class="track-layout">
    <div class="counter-card card hero-counter">
      <div class="counter-label">Current row</div>
      <button class="main-count" id="edit-main-row" title="Set exact row">${p.row}</button>
      <div class="counter-controls counter-controls-large"><button data-counter="-1" aria-label="Previous row">−</button><button class="next" data-counter="1">Next row</button></div>
      <div class="manual-row-line"><label>Jump to row <input id="manual-row-input" type="number" min="0" value="${p.row}"></label><button class="secondary-button" id="manual-row-save">Go</button></div>
      <div class="progress-summary"><span>${p.totalRows?`${progress(p)}% complete`:"Open-ended project"}</span><div class="progress-track"><div class="progress-fill" style="width:${progress(p) ?? 0}%"></div></div></div>
      <div class="counter-menu"><button id="edit-project-rows">Planned rows</button><button id="reset-main">Reset rows</button><button id="edit-project-from-counter">Edit Project</button></div>
    </div>
    <div class="track-side">
      <div class="card mobile-card"><div class="section-heading compact-row"><h3>Repeat counters</h3><button class="mini-button" id="add-sub-counter">+ Add</button></div><div id="sub-counters">${p.subCounters.length?p.subCounters.map(s => subCounterHtml(s)).join(""):`<p class="muted-copy">Add repeats, sleeves, pattern sections or lace repeats here.</p>`}</div></div>
      <div class="notes-card card"><div class="section-heading compact-row"><h3>Project notes</h3><button class="mini-button" id="add-marker">+ Marker</button></div>
        <textarea id="project-notes" placeholder="Modifications, reminders, yarn details...">${escapeHtml(p.notes)}</textarea>
        <div class="markers">${p.markers.map(m => `<span class="marker-line" style="border-left:5px solid ${markerColor(m.color)}">Row ${m.row} · ${escapeHtml(m.label||m.color)} <button data-edit-marker="${m.id||`${m.row}-${m.color}`}">Edit</button><button class="minimal-icon-button" aria-label="Delete marker" data-delete-marker="${m.id||`${m.row}-${m.color}`}">${uiIcon("close")}</button></span>`).join("")}</div>
      </div>
    </div>
  </div>`;
}

function projectChartHtml(p){
  const chartMode=p.chartMode||"og";
  const hasChart=!!(p.chart||p.attachments?.length);
  const activeAssetId=p.activeChartAssetId&&p.attachments?.some(a=>a.id===p.activeChartAssetId)?p.activeChartAssetId:p.attachments?.[0]?.id;
  const patternSource=normalizePatternSource(p.patternSource,p);
  const chartHidden=patternSource.type==="mixed"&&patternSource.chartCollapsed;
  return `<div class="project-workspace-page chart-mode ${chartMode==="flow"?"flow-workflow":""} ${p.readingMode?"reading-mode":""}">
    <div class="project-workspace-inner">
    <div class="chart-mode-toolbar chart-action-bar card workspace-card">
      <div class="reading-title-wrap">${p.readingMode?`<span class="reading-cover-thumb">${visual(p,true)}</span>`:""}<div><p class="eyebrow">PROJECT CHART</p><h2>Chart Reading</h2><p>Zoom, pan, highlight the row, and annotate as you go.</p></div></div>
      <div class="chart-mode-actions"><div class="chart-mode-switch" role="radiogroup" aria-label="Chart mode">
        <button class="${chartMode==="og"?"active":""}" data-chart-mode="og" aria-checked="${chartMode==="og"}"><strong>OG Mode</strong><small>Manual Reading</small></button>
        <button class="${chartMode==="flow"?"active":""}" data-chart-mode="flow" aria-checked="${chartMode==="flow"}"><strong>Flow Mode</strong><small>Smart Reading</small></button>
        <span>Recommended for accurate row-by-row tracking.</span>
      </div></div>
      <input type="file" id="chart-upload" accept=".pdf,image/*" multiple hidden>
    </div>
    <div class="reading-counter row-counter-card card workspace-card">
      <div class="row-stepper">
        <button data-counter="-1" aria-label="Previous row">−</button>
        <label class="field row-current-field">Row <input id="manual-row-input" type="number" min="0" value="${p.row}"></label>
        <button data-counter="1" aria-label="Next row">+</button>
      </div>
      <label class="field total-rows-field">Rows <input id="chart-rows" type="number" min="1" value="${p.chartRows || p.totalRows || ""}" placeholder="Planned"></label>
      <div class="row-counter-actions">
        <button class="mini-button" id="reset-main">Reset</button>
        <button class="mini-button voice-icon-button" id="voice-project" aria-label="Voice controls" title="Voice controls">${uiIcon("voice","button-icon")}</button>
      </div>
    </div>
    <div class="annotation-toolbar-shell card workspace-card">
    <div class="annotation-toolbar ${hasChart?"":"is-disabled"}" role="toolbar" aria-label="Annotation tools" aria-disabled="${!hasChart}">
      ${annotationTools.map(tool=>`<button type="button" class="${activeAnnotationTool===tool?"active":""}" data-tool="${tool}" aria-pressed="${activeAnnotationTool===tool}" ${hasChart?"":"disabled"}>${toolIcon(tool)}<span>${toolLabel(tool)}</span></button>`).join("")}
      <label class="annotation-control">Color <input id="annotation-color" type="color" value="${escapeHtml(p.annotationColor||"#d96572")}" ${hasChart?"":"disabled"}></label>
      <label class="annotation-control">Size <select id="annotation-width" ${hasChart?"":"disabled"}>${[2,4,6,10,14,20].map(w=>`<option value="${w}" ${Number(p.annotationWidth)===w?"selected":""}>${w}</option>`).join("")}</select></label>
      <label class="annotation-control">Opacity <input id="annotation-opacity" type="range" min=".2" max=".95" step=".05" value="${p.annotationOpacity??p.rowMask?.opacity??.72}" ${hasChart?"":"disabled"}></label>
      <label class="annotation-control mask-only">Mask color <input id="row-mask-color" type="color" value="${escapeHtml(p.rowMask?.color||p.annotationColor||"#c9a66b")}" ${hasChart?"":"disabled"}></label>
      <label class="annotation-control">Eraser <select id="eraser-mode" ${hasChart?"":"disabled"}>${["standard","precise","stroke"].map(v=>`<option value="${v}" ${p.eraserMode===v?"selected":""}>${v[0].toUpperCase()+v.slice(1)}</option>`).join("")}</select></label>
      <label class="annotation-control">Eraser size <input id="eraser-size" type="range" min="8" max="80" step="2" value="${p.eraserSize||28}" ${hasChart?"":"disabled"}></label>
      <button id="toggle-mask-position-lock" ${hasChart?"":"disabled"}>${p.maskLockPosition?"Unlock position":"Lock position"}</button><button id="toggle-mask-size-lock" ${hasChart?"":"disabled"}>${p.maskLockSize?"Unlock size":"Lock size"}</button><button id="toggle-mask-lock" ${hasChart?"":"disabled"}>${p.rowMask?.locked?"Unlock all":"Lock all"}</button><button id="mask-up" ${hasChart?"":"disabled"}>Mask ↑</button><button id="mask-down" ${hasChart?"":"disabled"}>Mask ↓</button><button id="mask-cover-done" ${hasChart?"":"disabled"}>Cover done</button><button class="danger-button" id="clear-mask" ${hasChart?"":"disabled"}>Clear mask</button>
      <button id="undo-annotation" ${hasChart?"":"disabled"}>${uiIcon("undo","annotation-button-icon")}<span>Undo</span></button><button id="redo-annotation" ${hasChart?"":"disabled"}>${uiIcon("redo","annotation-button-icon")}<span>Redo</span></button><button class="danger-button" id="clear-annotations" ${hasChart?"":"disabled"}>Clear</button>
      <div class="zoom-tools"><button data-zoom="-0.15">−</button><strong>${Math.round((p.chartZoom||1)*100)}%</strong><button data-zoom="0.15">+</button></div>
    </div>
    </div>
    ${chartHidden?`<div class="chart-reader card workspace-card collapsed-workspace-panel"><strong>Visual chart is hidden.</strong><p class="muted-copy">Your original upload is still saved for Manual Reading Mode.</p><button class="secondary-button" data-pattern-collapse="show-chart">Show visual chart</button></div>`:`<div class="chart-reader card workspace-card">
      <div class="chart-stage og-chart-stage" id="chart-stage">${chartViewerHtml(p)}</div>
      <div class="attachment-strip">${p.attachments.map(a=>`<div class="chart-file-chip ${activeAssetId===a.id?"active":""}"><button class="chart-file-open" type="button" data-project-asset="${a.id}" aria-label="Open ${escapeHtml(a.name||"chart file")}"><span class="chart-file-icon" aria-hidden="true">${uiIcon("image","ui-icon")}</span><span class="chart-file-text"><strong>${escapeHtml(a.name||"Chart file")}</strong><small>Uploaded ✓</small></span></button><button class="chart-file-remove" type="button" data-delete-chart-asset="${a.id}" aria-label="Remove ${escapeHtml(a.name||"chart file")}">×</button></div>`).join("")}</div>
    </div>`}
    ${chartMode==="flow"?`<div class="manual-chart-tools">${friendlyChartBetaHtml(p)}</div>`:""}
    <div class="bottom-nav-spacer" aria-hidden="true"></div>
    </div>
  </div>`;
}

function chartViewerHtml(p){
  const hasChart=!!(p.chart||p.attachments?.length);
  const content = p.chart
    ? (p.chart.type === "application/pdf" ? `<iframe src="${p.chart.data}#toolbar=0"></iframe>` : `<img src="${p.chart.data}" alt="${escapeHtml(p.chart.name)}">`)
    : `<label class="chart-placeholder upload-drop chart-upload-card"><span class="chart-upload-content"><span class="upload-mark">▦</span><h3>Upload a chart image or PDF</h3><p>Manual Reading Mode is recommended for accurate tracking.</p><input type="file" id="chart-upload-inline" accept=".pdf,image/*" multiple hidden><span class="secondary-button">Choose chart</span></span></label>`;
  const highlight=hasChart&&p.chartMode==="flow"&&p.flowMode!==false?`<div class="row-highlight" style="${rowHighlightStyle(p)}"></div>`:"";
  const annotations=hasChart?annotationsHtml(p):"";
  return `<div class="chart-canvas ${hasChart?"has-chart":"empty-chart"}" style="transform:scale(${p.chartZoom||1});transform-origin:top left;">${content}${highlight}${annotations}</div>`;
}

function annotationsHtml(p){
  return `<svg class="annotation-layer" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-label="Chart annotations">${svgArrowDefs()}${(p.annotations||[]).map(a=>annotationSvg(a,p.selectedAnnotationId===a.id)).join("")}</svg>${rowMaskHtml(p)}`;
}
function rowMaskHtml(p){
  const m=p.rowMask;if(!m)return "";
  const x=(m.x??50)/10,y=(m.y??420)/10,w=(m.width??900)/10,h=(m.height??80)/10;
  const locked=m.locked||p.maskLockPosition;
  const handles=(!m.locked&&!p.maskLockSize)?`<span class="mask-handle mask-n" data-mask-action="resize-n"></span><span class="mask-handle mask-s" data-mask-action="resize-s"></span><span class="mask-handle mask-e" data-mask-action="resize-e"></span><span class="mask-handle mask-w" data-mask-action="resize-w"></span><span class="mask-handle mask-se" data-mask-action="resize-se"></span>`:"";
  return `<div class="row-mask ${locked?"locked":""}" data-mask-action="move" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%;--mask-color:${escapeHtml(m.color||"#c9a66b")};--mask-opacity:${m.opacity??.72}">
    ${locked?`<span class="mask-lock-label">Locked</span>`:""}${handles}
  </div>`;
}
function svgArrowDefs(){return `<defs><marker id="ann-arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth"><path d="M2,2 L10,6 L2,10 Z" fill="context-stroke"></path></marker></defs>`;}
function annotationSvg(a,selected=false){
  if(a.points?.length){
    const d=a.points.map((pt,i)=>`${i?"L":"M"}${pt.x} ${pt.y}`).join(" ");
    const color=a.color||"#d96572",width=Number(a.width)||4,opacity=a.tool==="highlighter" ? (Number(a.opacity)||.38) : (Number(a.opacity)||1);
    return `<path class="annotation-stroke annotation-${a.tool}" data-ann-id="${a.id}" d="${d}" stroke="${escapeHtml(color)}" stroke-width="${width}" stroke-opacity="${opacity}" fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path>`;
  }
  if(a.tool==="text")return `<foreignObject class="annotation-object" data-ann-id="${a.id}" x="${(a.x||0)-55}" y="${(a.y||0)-22}" width="150" height="58"><div xmlns="http://www.w3.org/1999/xhtml" class="annotation-text">${escapeHtml(a.text||"Note")}</div></foreignObject>`;
  if(a.tool==="arrow"){
    const x1=a.x1??a.x??0,y1=a.y1??a.y??0,x2=a.x2??((a.x??0)+120),y2=a.y2??((a.y??0)-80),color=escapeHtml(a.color||"#d96572"),width=Number(a.width)||6;
    return `<g class="annotation-arrow-object ${selected?"selected":""}" data-ann-id="${a.id}"><line class="annotation-arrow-line" data-ann-id="${a.id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" marker-end="url(#ann-arrowhead)" stroke-linecap="round" vector-effect="non-scaling-stroke"></line>${selected?`<circle class="annotation-handle" data-ann-id="${a.id}" data-arrow-handle="start" cx="${x1}" cy="${y1}" r="13"></circle><circle class="annotation-handle" data-ann-id="${a.id}" data-arrow-handle="end" cx="${x2}" cy="${y2}" r="13"></circle>`:""}</g>`;
  }
  return `<circle class="annotation-object" data-ann-id="${a.id}" cx="${a.x||0}" cy="${a.y||0}" r="${Math.max(8,Number(a.width)||12)}" fill="${escapeHtml(a.color||"#d96572")}" opacity="${Number(a.opacity)||.9}"></circle>`;
}
function toolIcon(tool){return uiIcon(({touch:"touch",pen:"pen",highlighter:"highlighter",text:"text",arrow:"arrow",marker:"marker",eraser:"eraser","row-mask":"mask",rowMask:"mask"})[tool]||"calculator","annotation-button-icon");}
function toolLabel(tool){return ({touch:"Touch","row-mask":"Row Mask",rowMask:"Row Mask",highlighter:"Highlighter"}[tool]||tool);}

function friendlyChartBetaHtml(p){
  const setup=ensureProjectSetup(p),plan=p.projectCalculations||calculateFlowProjectPlan(p,setup),reader=normalizeChartReaderConfig(p.chartReader,p),hasChart=p.chart||p.attachments.length,results=reader.recognitionResults||[],hasUnclear=results.some(cell=>cell.confidenceLabel==="Low"||Number(cell.confidence)<55),ready=!!hasChart&&!hasUnclear,rowInstruction=flowCurrentRowInstruction(p,setup);
  const simpleSetup=p.setup||{},lastSaved=setup.updatedAt||simpleSetup.updatedAt||p.updatedAt;
  const options=(values,current,labels={})=>values.map(v=>`<option value="${v}" ${current===v?"selected":""}>${escapeHtml(labels[v]||v)}</option>`).join("");
  const directionLabels={"left-to-right":"Left → Right","right-to-left":"Right → Left","alternating-rs-ws":"Alternating Rows"};
  const voiceLabels={short:"Read only",teaching:"Read & explain",beginner:"Beginner friendly"};
  const sizeOptions=["XXS","XS","S","M","L","XL","XXL","Custom"];
  const projectTypes=["Scarf","Socks","Hat / Beanie","Shawl","Bag","Blanket","Amigurumi","Top","Cardigan","Jumper / Sweater","Vest","Dress","Other"];
  return `<div class="chart-analysis ai-beta-safe flow-reader-card card workspace-card" id="flow-ai-reader">
    <div class="flow-hero"><p class="eyebrow">PROJECT CHART</p><h3>Flow Mode</h3><p>Let Yarncha help you follow your pattern one row at a time.</p><p class="muted-copy">Yarncha looks at your chart and helps you keep track of your place. If something looks unclear, we'll ask you to confirm it before continuing.</p></div>
    <section class="flow-ready-card ${ready?"ready":"almost"}"><h4>${ready?"Your chart is ready.":"You're almost ready."}</h4>${ready?`<p>✓ Chart added</p><p>✓ Ready to start</p>`:`<p>${hasChart?"Please review a few symbols before we begin.":"Add a chart, then Yarncha can guide you row by row."}</p>`}</section>
    <section class="flow-reader-panel flow-project-card"><p class="eyebrow">YOUR PROJECT</p><h4>${escapeHtml(p.name||"Current project")}</h4><p>${escapeHtml(setup.craft||p.type||"Pattern")} · You are on row ${p.row}${p.chartRows||p.totalRows?` of ${p.chartRows||p.totalRows}`:""}</p></section>
    <section class="flow-reader-panel flow-setup-panel"><h4>Project Setup</h4><p class="muted-copy">Add the pattern details once. Yarncha will reuse them across this project.</p>
      <div class="form-grid compact-form">
        <div class="field"><label>Craft</label><select id="flow-setup-craft">${options(["Knitting","Crochet"],setup.craft)}</select></div>
        <div class="field"><label>Pattern gauge</label><input id="flow-pattern-gauge" value="${escapeHtml(setup.patternGauge)}" placeholder="22 sts × 30 rows / 10 cm"></div>
        <div class="field"><label>Pattern hook / needle size</label><input id="flow-pattern-tool" value="${escapeHtml(setup.patternToolSize)}" placeholder="4 mm"></div>
        <div class="field"><label>Pattern yarn weight</label><input id="flow-pattern-yarn-weight" value="${escapeHtml(setup.patternYarnWeight)}" placeholder="DK, Worsted, Sport..."></div>
        <div class="field"><label>Your hook / needle size</label><input id="flow-user-tool" value="${escapeHtml(setup.userToolSize)}" placeholder="4.5 mm"></div>
        <div class="field"><label>Your yarn weight</label><input id="flow-user-yarn-weight" value="${escapeHtml(setup.userYarnWeight)}" placeholder="DK, Worsted, Sport..."></div>
        <div class="field full"><label>Project type</label><select id="flow-project-type">${options(projectTypes,setup.projectType)}</select></div>
        ${flowProjectTypeFields(setup,options,sizeOptions)}
      </div>
      <div class="flow-setup-save-row"><button class="primary-button" id="save-flow-project-setup" type="button">Save project setup</button><span id="flow-setup-save-status" class="setup-save-status saved">Saved · Last saved on this device ${escapeHtml(formatSavedTime(lastSaved))}</span></div>
      ${plan.warnings.length?`<div class="flow-warning-card"><strong>Before you begin</strong>${plan.warnings.map(w=>`<p>${escapeHtml(w)}</p>`).join("")}</div>`:`<div class="flow-ready-card ready"><p>✓ Your hook or needle and yarn look close enough to the pattern to begin.</p></div>`}
      ${resultSummaryHtml("Project Setup Summary",flowCalculationItems(plan),"flow-calculation-summary")}
    </section>
    <section class="flow-reader-panel flow-reading-mode-panel"><h4>Reading Progress</h4>
      <div class="flow-current-row-card"><label for="flow-current-row">I'm currently on</label><div class="flow-row-line"><span>Row</span><input id="flow-current-row" type="number" min="0" max="${p.chartRows||reader.grid.rows||999}" value="${p.row}"></div><p>${escapeHtml(rowInstruction)}</p></div>
      <div class="flow-row-buttons"><button class="secondary-button" id="flow-prev-row" type="button">Previous Row</button><button class="primary-button" id="flow-next-row" type="button">Next Row</button></div>
      <div class="flow-next-card"><strong>What's next?</strong><p>${flowReadingSummary(p,reader)}</p></div>
      <label class="flow-direction-field">Pattern Language<select id="flow-pattern-language">${options(["abbreviations","full"],setup.patternLanguage,{abbreviations:"Abbreviations",full:"Full wording"})}</select><small>Choose whether Yarncha shows short pattern notation or spells each stitch out.</small></label>
      <label class="flow-direction-field">How do you read this chart?<select id="flow-row-direction">${options(["left-to-right","right-to-left","alternating-rs-ws"],reader.rowDirection,directionLabels)}</select><small>Choose the direction your eyes move across each row. Alternating Rows is common when right-side and wrong-side rows switch direction.</small></label>
      <div class="analysis-actions"><button class="mini-button" id="flow-align-mask">Show current row</button><button class="mini-button" id="flow-cover-completed">${reader.coverCompletedRows?"Update finished cover":"Cover finished rows"}</button><button class="mini-button" id="flow-clear-cover">Remove cover</button></div>
    </section>
    <section class="flow-read-aloud">
      <div><strong>Voice Assistant</strong><p class="muted-copy">Yarncha can read the current row while you knit or crochet.</p></div>
      <div class="flow-read-controls"><button class="primary-button" id="flow-read-row">▶ Read Current Row</button><button class="secondary-button" id="flow-read-play">Play</button><button class="secondary-button" id="flow-read-pause">Pause</button><button class="secondary-button" id="flow-read-stop">Stop</button></div>
      <div class="flow-reading-controls flow-voice-settings">
        <label>Reading speed <input id="flow-voice-speed" type="range" min=".6" max="1.5" step=".05" value="${reader.readAloud.voiceSpeed}"><span>${reader.readAloud.voiceSpeed.toFixed(2)}x</span></label>
        <label>Voice language <select id="flow-voice-language">${options(["en","zh-Hant","yue"],reader.readAloud.language,{en:"English","zh-Hant":"Traditional Chinese","yue":"Cantonese-ready"})}</select></label>
        <label>Reading style <select id="flow-voice-mode">${options(["short","teaching","beginner"],reader.readAloud.mode,voiceLabels)}</select></label>
      </div>
    </section>
    <details class="flow-advanced-tools"><summary>Advanced tools</summary>
      <div class="flow-reader-grid">
        <section class="flow-reader-panel"><h4>Chart setup</h4><div class="form-grid compact-form">
          <div class="field"><label>Craft type</label><select id="flow-chart-type">${options(["Knitting","Crochet","Tunisian Crochet","Unknown"],reader.chartType)}</select></div>
          <div class="field"><label>Starting direction</label><select id="flow-reading-direction">${options(["right-to-left","left-to-right","alternating-rs-ws","round","auto"],reader.readingDirection,{...directionLabels,round:"In the round",auto:"Let Yarncha choose"})}</select></div>
          <div class="field"><label>Left edge</label><input id="flow-crop-x" type="number" min="0" max="100" value="${reader.crop.x}"></div>
          <div class="field"><label>Top edge</label><input id="flow-crop-y" type="number" min="0" max="100" value="${reader.crop.y}"></div>
          <div class="field"><label>Chart width</label><input id="flow-crop-width" type="number" min="1" max="100" value="${reader.crop.width}"></div>
          <div class="field"><label>Chart height</label><input id="flow-crop-height" type="number" min="1" max="100" value="${reader.crop.height}"></div>
        </div><button class="mini-button" id="save-flow-chart-setup">Save chart setup</button></section>
        <section class="flow-reader-panel"><h4>Fine-tune rows</h4><div class="form-grid compact-form">
          <div class="field"><label>Rows on chart</label><input id="flow-grid-rows" type="number" min="0" value="${reader.grid.rows||""}" placeholder="Optional"></div>
          <div class="field"><label>Stitches across</label><input id="flow-grid-columns" type="number" min="0" value="${reader.grid.columns||""}" placeholder="Optional"></div>
          <div class="field"><label>Guide left</label><input id="flow-grid-x" type="number" min="0" max="100" value="${reader.grid.x}"></div>
          <div class="field"><label>Guide top</label><input id="flow-grid-y" type="number" min="0" max="100" value="${reader.grid.y}"></div>
          <div class="field"><label>Guide width</label><input id="flow-grid-width" type="number" min="1" max="100" value="${reader.grid.width}"></div>
          <div class="field"><label>Guide height</label><input id="flow-grid-height" type="number" min="1" max="100" value="${reader.grid.height}"></div>
        </div><div class="analysis-actions"><button class="mini-button" id="detect-flow-grid">Prepare guide</button><button class="mini-button" id="save-flow-grid">Save guide</button></div><p class="muted-copy">${escapeHtml(reader.grid.status&&reader.grid.status!=="Grid not detected yet."?"Your chart guide has been saved.":"Adjust these only if your row highlight is in the wrong place.")}</p></section>
      </div>
      <section class="flow-reader-panel flow-reader-wide"><h4>Pattern review</h4><div class="analysis-actions"><button class="mini-button" id="run-flow-recognition">Check chart</button><button class="mini-button" id="review-chart-cells-local">Look over stitches</button><button class="mini-button" id="add-analysis-row">Add written row</button><button class="mini-button" id="edit-chart-legend">Edit stitch key</button></div>${flowRecognitionResultsHtml(results)}</section>
    </details>
    <p class="privacy-note">Yarncha remembers your corrections on this device so your next chart feels easier to follow.</p><div id="cloud-chart-reader-slot" class="flow-ai-cloud-slot"></div></div>`;
}
function flowCalculationItems(plan={}){
  return [
    {label:plan.startingLabel||"Start",value:String(plan.castOnOrChain||"Set gauge first")},
    {label:"Stitch count",value:String(plan.stitchCount||"Set gauge first")},
    {label:"Row count",value:String(plan.rowCount||"Set gauge first")},
    {label:"Width",value:plan.widthCm?`${plan.widthCm} cm`:"Set size first"},
    {label:"Length",value:plan.lengthCm?`${plan.lengthCm} cm`:"Set size first"},
    {label:"Sleeve length",value:plan.sleeveLengthCm?`${plan.sleeveLengthCm} cm`:"If needed"},
    {label:"Body length",value:plan.bodyLengthCm?`${plan.bodyLengthCm} cm`:"If needed"},
    {label:"Shaping",value:plan.shapingNotes||"Pattern decides"},
    {label:"Yarn",value:plan.estimatedYarnUsage||"Add yarn details"}
  ];
}
function resultSummaryHtml(title,items=[],className=""){
  return `<section class="result-summary ${className}" aria-label="${escapeHtml(title)}"><h4>${escapeHtml(title)}</h4><div class="result-summary-list">${items.map(item=>`<article class="result-summary-row"><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.value)}</p>${item.description?`<small>${escapeHtml(item.description)}</small>`:""}</article>`).join("")}</div></section>`;
}
function flowField(id,label,value="",placeholder="Optional",full=false){
  return `<div class="field ${full?"full":""}"><label>${escapeHtml(label)}</label><input id="${id}" value="${escapeHtml(value||"")}" placeholder="${escapeHtml(placeholder)}"></div>`;
}
function flowSelect(id,label,values,current,options,full=false,help=""){
  return `<div class="field ${full?"full":""}"><label>${escapeHtml(label)}</label><select id="${id}">${options(values,current)}</select>${help?`<small>${escapeHtml(help)}</small>`:""}</div>`;
}
function flowProjectTypeFields(setup={},options=(values,current)=>"",sizeOptions=[]){
  const d=setup.itemDetails||{},type=setup.projectType;
  const recipient=["Baby","Child","Teen","Adult","Custom"];
  if(isGarmentProject(type)){
    return `${flowSelect("flow-desired-size","Desired garment size",sizeOptions,setup.desiredSize,options)}${flowField("flow-custom-size","Custom size notes",setup.customSize)}${flowField("flow-body-chest","Chest / bust cm",setup.bodyMeasurements.chest)}${flowField("flow-body-waist","Waist cm",setup.bodyMeasurements.waist)}${flowField("flow-body-hip","Hip cm",setup.bodyMeasurements.hip)}${flowField("flow-body-sleeve","Sleeve length cm",setup.bodyMeasurements.sleeve)}${flowField("flow-body-body","Body length cm",setup.bodyMeasurements.body)}`;
  }
  if(type==="Scarf")return `${flowSelect("flow-recipient","Who are you making this for?",recipient,d.recipient,options)}${d.recipient==="Adult"?flowSelect("flow-adult-height","Approximate height",["Under 150 cm","150–160 cm","160–170 cm","170–180 cm","180–190 cm","190+ cm"],d.adultHeight,options):""}${flowSelect("flow-scarf-style","How do you want the scarf to fit?",["Neck warmer","One wrap","Two wraps","Long winter scarf","Oversized scarf","Fashion scarf","Custom length"],d.scarfStyle,options)}${d.scarfStyle==="Custom length"?flowField("flow-item-length","Custom length cm",d.length):""}${flowField("flow-item-width","Scarf width cm",d.width)}`;
  if(type==="Socks")return `${flowSelect("flow-sock-type","Sock type",["No-show","Ankle","Quarter Crew","Crew","Mid-Calf","Knee High","Over-the-Knee"],d.sockType,options,false,"This changes the pattern length and shaping.")}${flowSelect("flow-recipient","Who are you making these for?",recipient,d.recipient,options)}${flowSelect("flow-sock-sizing-mode","How would you like to size the socks?",["Shoe Size","Foot Measurements"],d.sockSizingMode,options)}${d.sockSizingMode==="Shoe Size"?`${flowSelect("flow-shoe-region","Region",["AU","US","UK","EU","JP"],d.shoeRegion,options)}${flowField("flow-shoe-size","Shoe size",d.shoeSize)}`:""}${flowField("flow-foot-length","Foot length cm",d.footLength)}${flowField("flow-foot-circumference","Foot circumference cm",d.footCircumference)}${flowField("flow-heel-to-ankle","Heel to ankle cm",d.heelToAnkle)}${flowField("flow-ankle-circumference","Ankle circumference cm",d.ankleCircumference)}${["Mid-Calf","Knee High","Over-the-Knee"].includes(d.sockType)?flowField("flow-calf-circumference","Calf circumference cm",d.calfCircumference):""}${flowSelect("flow-fit-preference","Fit preference",["Snug","Regular","Relaxed"],d.fitPreference,options)}${flowSelect("flow-construction-method","Construction method",["Toe-up","Cuff-down"],d.constructionMethod,options)}${flowSelect("flow-heel-style","Heel style",["Heel Flap","Short Row","Afterthought","Fish Lips Kiss","Pattern decides"],d.heelStyle,options)}`;
  if(type==="Hat / Beanie")return `${flowSelect("flow-recipient","Recipient",recipient,d.recipient,options)}${flowField("flow-head-circumference","Head circumference cm",d.headCircumference)}${flowSelect("flow-hat-style","Hat style",["Fitted beanie","Slouchy beanie","Folded brim","Bucket hat","Beret","Bonnet / baby hat","Custom"],d.hatStyle,options)}${flowField("flow-hat-depth","Desired hat depth cm",d.hatDepth)}${flowSelect("flow-fit-preference","Fit preference",["Snug","Regular","Relaxed"],d.fitPreference,options)}${flowSelect("flow-brim-style","Brim style",["No brim","Ribbed brim","Folded brim","Rolled brim"],d.brimStyle,options)}${flowSelect("flow-crown-style","Crown style",["Rounded crown","Pointed crown","Flat top","Pattern decides"],d.crownStyle,options)}`;
  if(type==="Bag")return `${flowSelect("flow-bag-type","Bag type",["Tote","Market bag","Crossbody","Shoulder bag","Drawstring pouch","Mini bag","Project bag","Custom"],d.bagType,options)}${flowField("flow-item-width","Desired width cm",d.width)}${flowField("flow-item-height","Desired height cm",d.height)}${flowField("flow-strap-length","Strap length cm",d.strapLength)}<details class="flow-inline-advanced"><summary>Advanced bag options</summary>${flowField("flow-item-depth","Bag depth / gusset cm",d.depth)}${flowField("flow-handle-drop","Handle drop cm",d.handleDrop)}${flowSelect("flow-closure","Closure",["None","Button","Zip","Drawstring","Flap"],d.closure,options)}${flowSelect("flow-lining","Lining",["No lining","Fabric lining"],d.lining,options)}${flowSelect("flow-structure","Fit / structure",["Soft","Medium","Firm"],d.structure,options)}</details>`;
  if(type==="Blanket"){
    const preset=blanketPresetSize(d.blanketType);
    return `${flowSelect("flow-blanket-type","Blanket type",["Lovey","Baby Blanket","Crib Blanket","Stroller Blanket","Lap Blanket","Throw Blanket","Twin","Full / Double","Queen","King","Custom"],d.blanketType,options)}<div class="flow-ready-card ready"><p>Recommended size: ${preset[0]} × ${preset[1]} cm. Use this size or edit below.</p></div>${flowField("flow-item-width","Finished width cm",d.width||preset[0])}${flowField("flow-item-length","Finished length cm",d.length||preset[1])}${flowSelect("flow-blanket-shape","Blanket shape",["Rectangle","Square","Circle","Hexagon","Custom"],d.blanketShape,options)}${flowSelect("flow-warmth","Warmth",["Lightweight","Medium","Thick & Cozy"],d.warmth,options)}${flowField("flow-border-width","Border width cm",d.borderWidth)}${flowSelect("flow-fringe","Fringe / tassels",["None","Short","Long"],d.fringe,options)}`;
  }
  if(type==="Amigurumi")return `${flowSelect("flow-amigurumi-type","What are you making?",["Animal","Doll","Character","Food","Plant","Keychain","Decoration","Plush","Custom"],d.amigurumiType,options)}${flowField("flow-finished-height","Desired finished height cm",d.finishedHeight)}${flowField("flow-finished-width","Desired finished width cm",d.finishedWidth)}${flowSelect("flow-shape","Overall shape",["Round","Oval","Long","Chubby","Standing","Sitting","Custom"],d.shape,options)}${flowSelect("flow-stuffing-firmness","Stuffing firmness",["Soft","Medium","Firm"],d.stuffingFirmness,options)}${flowSelect("flow-safety-recipient","Who is it for?",["Baby","Child","Adult","Display only"],d.safetyRecipient,options)}${d.safetyRecipient==="Baby"?`<div class="flow-warning-card"><p>For babies, embroidered eyes are safer than plastic safety eyes.</p></div>`:""}<details class="flow-inline-advanced" open><summary>Scale Existing Pattern</summary>${flowField("flow-original-height","Original pattern height cm",d.originalHeight)}${flowField("flow-target-height","I want cm",d.targetHeight)}</details>`;
  if(type==="Shawl")return `${flowSelect("flow-shawl-shape","Shawl shape",["Triangle","Crescent","Half Circle","Rectangle","Wrap","Asymmetrical","Custom"],d.shawlShape,options)}${flowSelect("flow-shawl-fit","Size",["Small Shoulder Shawl","Everyday Shawl","Large Wrap","Oversized Wrap","Custom"],d.shawlFit,options)}${flowField("flow-wingspan","Desired wingspan cm",d.wingspan)}${flowField("flow-item-height","Desired depth cm",d.height)}${flowSelect("flow-recipient","Who is it for?",["Child","Teen","Adult","Custom"],d.recipient,options)}`;
  return `${flowField("flow-item-width","Width cm",d.width)}${flowField("flow-item-length","Length cm",d.length)}${flowField("flow-item-height","Height cm",d.height)}`;
}
function readFlowSetupDetails(previous={}){
  const value=id=>document.getElementById(id)?.value?.trim();
  const pick=(id,key)=>value(id)??previous[key]??"";
  return {
    recipient:pick("flow-recipient","recipient"),
    adultHeight:pick("flow-adult-height","adultHeight"),
    scarfStyle:pick("flow-scarf-style","scarfStyle"),
    sockType:pick("flow-sock-type","sockType"),
    sockSizingMode:pick("flow-sock-sizing-mode","sockSizingMode"),
    shoeRegion:pick("flow-shoe-region","shoeRegion"),
    shoeSize:pick("flow-shoe-size","shoeSize"),
    footLength:pick("flow-foot-length","footLength"),
    footCircumference:pick("flow-foot-circumference","footCircumference"),
    heelToAnkle:pick("flow-heel-to-ankle","heelToAnkle"),
    ankleCircumference:pick("flow-ankle-circumference","ankleCircumference"),
    calfCircumference:pick("flow-calf-circumference","calfCircumference"),
    fitPreference:pick("flow-fit-preference","fitPreference"),
    constructionMethod:pick("flow-construction-method","constructionMethod"),
    heelStyle:pick("flow-heel-style","heelStyle"),
    headCircumference:pick("flow-head-circumference","headCircumference"),
    hatStyle:pick("flow-hat-style","hatStyle"),
    hatDepth:pick("flow-hat-depth","hatDepth"),
    brimStyle:pick("flow-brim-style","brimStyle"),
    crownStyle:pick("flow-crown-style","crownStyle"),
    bagType:pick("flow-bag-type","bagType"),
    width:pick("flow-item-width","width"),
    height:pick("flow-item-height","height"),
    length:pick("flow-item-length","length"),
    strapLength:pick("flow-strap-length","strapLength"),
    depth:pick("flow-item-depth","depth"),
    handleDrop:pick("flow-handle-drop","handleDrop"),
    closure:pick("flow-closure","closure"),
    lining:pick("flow-lining","lining"),
    structure:pick("flow-structure","structure"),
    blanketType:pick("flow-blanket-type","blanketType"),
    blanketShape:pick("flow-blanket-shape","blanketShape"),
    warmth:pick("flow-warmth","warmth"),
    borderWidth:pick("flow-border-width","borderWidth"),
    fringe:pick("flow-fringe","fringe"),
    amigurumiType:pick("flow-amigurumi-type","amigurumiType"),
    finishedHeight:pick("flow-finished-height","finishedHeight"),
    finishedWidth:pick("flow-finished-width","finishedWidth"),
    shape:pick("flow-shape","shape"),
    stuffingFirmness:pick("flow-stuffing-firmness","stuffingFirmness"),
    safetyRecipient:pick("flow-safety-recipient","safetyRecipient"),
    originalHeight:pick("flow-original-height","originalHeight"),
    targetHeight:pick("flow-target-height","targetHeight"),
    shawlShape:pick("flow-shawl-shape","shawlShape"),
    shawlFit:pick("flow-shawl-fit","shawlFit"),
    wingspan:pick("flow-wingspan","wingspan")
  };
}
function sharedProjectSetupSummaryHtml(p){
  const setup=ensureProjectSetup(p),plan=p.projectCalculations||calculateFlowProjectPlan(p,setup);
  const summaryItems=[
    {label:"Craft",value:setup.craft},
    {label:"Project type",value:setup.projectType},
    {label:"Pattern yarn",value:setup.patternYarnWeight||"Add yarn weight"},
    {label:"Your tool",value:setup.userToolSize||setup.patternToolSize||"Add hook / needle"},
    {label:"Start",value:`${plan.startingLabel||"Start"} ${plan.castOnOrChain||""}`.trim()},
    {label:"Rows",value:String(plan.rowCount||"Add gauge")}
  ];
  return `<div class="card mobile-card shared-project-setup"><p class="eyebrow">SHARED SETUP</p><h2>Project guide</h2><p class="muted-copy">These details are used by Flow Mode and project tools so you do not need to enter them again.</p>
    ${resultSummaryHtml("Saved project settings",summaryItems,"shared-setup-summary")}
    ${plan.warnings.length?`<div class="flow-warning-card">${plan.warnings.map(w=>`<p>${escapeHtml(w)}</p>`).join("")}</div>`:`<p class="shared-setup-note">Your yarn and hook or needle look close enough to begin.</p>`}
  </div>`;
}
function fitCheckNumber(value,fallback=0){
  const number=Number(String(value??"").replace(/[^\d.-]/g,""));
  return Number.isFinite(number)&&number>0?number:fallback;
}
function projectFitCheck(p){
  const setup=ensureProjectSetup(p),plan=p.projectCalculations||calculateFlowProjectPlan(p,setup),saved=p.fitCheck||{},measurements=setupMeasurements(setup);
  const bodyChest=fitCheckNumber(saved.bodyChest,measurements.chest||0);
  const finishedChest=fitCheckNumber(saved.finishedChest,plan.widthCm||0);
  const intendedEase=Number(saved.intendedEase??8);
  const targetLength=fitCheckNumber(saved.targetLength,plan.lengthCm||0);
  const currentLength=fitCheckNumber(saved.currentLength,0);
  const ease=bodyChest&&finishedChest?finishedChest-bodyChest:null;
  const easeGap=ease!==null?ease-intendedEase:null;
  const lengthGap=currentLength&&targetLength?targetLength-currentLength:null;
  const warnings=[];
  if(easeGap!==null&&Math.abs(easeGap)>4)warnings.push(easeGap>0?"Finished width may be looser than planned.":"Finished width may be tighter than planned.");
  if(lengthGap!==null&&Math.abs(lengthGap)>5)warnings.push(lengthGap>0?"You still have noticeable length to add.":"Length is already past the target.");
  if((setupWarnings(setup)||[]).length)warnings.push("Gauge, hook, needle, or yarn mismatch may change the fit.");
  const status=warnings.length?"Needs a quick check":"Looks close";
  const action=warnings.length?warnings.join(" "):"Keep going, and try it on again before bind-off or final shaping.";
  return {setup,plan,saved,bodyChest,finishedChest,intendedEase,targetLength,currentLength,ease,easeGap,lengthGap,status,action};
}
function projectFitCheckHtml(p){
  const check=projectFitCheck(p);
  const value=(key,fallback="")=>escapeHtml(check.saved[key]??fallback);
  const metric=(label,value,description="")=>`<article class="fit-check-metric"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(value)}</p>${description?`<small>${escapeHtml(description)}</small>`:""}</article>`;
  const easeText=check.ease===null?"Add body and finished width":`${check.ease>0?"+":""}${check.ease.toFixed(1)} cm`;
  const lengthText=check.lengthGap===null?"Add current length":`${check.lengthGap>0?`${check.lengthGap.toFixed(1)} cm to go`:`${Math.abs(check.lengthGap).toFixed(1)} cm over`}`;
  return `<section class="card mobile-card fit-check-card">
    <div class="section-heading compact-row"><div><p class="eyebrow">FIT CHECK</p><h2>Check the fit before you continue</h2><p class="muted-copy">Use this on desktop while planning, or on mobile while trying the project on.</p></div><span class="fit-check-status ${check.status==="Looks close"?"ok":"warn"}">${escapeHtml(check.status)}</span></div>
    <div class="fit-check-grid">
      <div class="fit-check-form form-grid compact-form">
        <div class="field"><label>Body chest / main measurement cm</label><input id="fit-body-chest" type="number" min="0" step=".5" value="${value("bodyChest",check.bodyChest||"")}" placeholder="e.g. 100"></div>
        <div class="field"><label>Finished width / chest cm</label><input id="fit-finished-chest" type="number" min="0" step=".5" value="${value("finishedChest",check.finishedChest||"")}" placeholder="e.g. 108"></div>
        <div class="field"><label>Intended ease cm</label><input id="fit-intended-ease" type="number" step=".5" value="${value("intendedEase",check.intendedEase)}" placeholder="e.g. 8"></div>
        <div class="field"><label>Target length cm</label><input id="fit-target-length" type="number" min="0" step=".5" value="${value("targetLength",check.targetLength||"")}" placeholder="e.g. 58"></div>
        <div class="field"><label>Current length cm</label><input id="fit-current-length" type="number" min="0" step=".5" value="${value("currentLength",check.currentLength||"")}" placeholder="Measure now"></div>
        <div class="field"><label>Fit feeling</label><select id="fit-feeling">${["Not checked yet","Too tight","Feels right","Too loose","Length unsure"].map(option=>`<option ${check.saved.feeling===option?"selected":""}>${option}</option>`).join("")}</select></div>
        <div class="field full"><label>Try-on notes</label><textarea id="fit-notes" rows="3" placeholder="Armhole, sleeve, length, shoulder, bust, waist...">${escapeHtml(check.saved.notes||"")}</textarea></div>
      </div>
      <div class="fit-check-summary">
        ${metric("Actual ease",easeText,`Planned ease: ${check.intendedEase} cm`)}
        ${metric("Length check",lengthText,`Target length: ${check.targetLength||"not set"} cm`)}
        ${metric("Fit advice",check.action)}
      </div>
    </div>
    <div class="fit-check-actions"><button class="secondary-button" id="save-fit-check">Save Fit Check</button><button class="mini-button" id="open-fit-tools">Open sizing tools</button></div>
  </section>`;
}
function flowCurrentRowInstruction(p=getProject(),setup=normalizeProjectSetup(p.projectSetup,p)){
  const analysed=highlightedRowAnalysis(p);
  const raw=analysed?.sequence||highlightedRowRecognition(p).map(cell=>cell.candidates?.[0]?.abbreviation||cell.detectedSymbol||"").filter(Boolean).join(", ");
  const fallback=setup.craft==="Crochet"?"sc, 2(sc, inc), sc":"K, K, K, SSK, P, P, YO";
  const sequence=raw||fallback;
  if(setup.patternLanguage==="full")return sequenceToSpokenInstructions(sequence,{readAloud:{mode:"teaching",language:"en",voiceSpeed:1}},setup.craft);
  return sequence;
}
function flowRecognitionResultsHtml(results=[]){
  if(!results.length)return `<div class="flow-recognition-empty">Nothing to look over yet. Use Check chart or add a written row when you want extra help.</div>`;
  const matchLabel=cell=>cell.confidenceLabel==="Low"||Number(cell.confidence)<55?"Please check":"Looks helpful";
  return `<div class="flow-results-table">${results.slice(0,12).map(cell=>`<article class="flow-cell-result ${cell.confidenceLabel==="Low"?"needs-review":""}"><div><strong>Row ${cell.row}, stitch ${cell.column}</strong><span>${matchLabel(cell)}</span></div><div>${cell.candidates.slice(0,3).map((candidate,index)=>`<span class="candidate-chip ${index===0?"best":""}">${escapeHtml(candidate.nameEn||candidate.abbreviation||"Pattern mark")}</span>`).join("")}</div><p>${cell.confidenceLabel==="Low"?"Please check this stitch before Yarncha reads it aloud.":"This looks ready to use."}</p></article>`).join("")}</div>`;
}
function flowReadingSummary(p,reader=normalizeChartReaderConfig(p.chartReader,p)){
  const rows=reader.grid.rows||p.chartRows||p.totalRows||0;
  const direction={ "left-to-right":"left to right", "right-to-left":"right to left", "alternating-rs-ws":"alternating rows", round:"in the round" }[reader.rowDirection]||"alternating rows";
  return `You are on row ${p.row}${rows?` of ${rows}`:""}. Keep following the chart ${direction}, then tap Next Row when you finish this row.`;
}

function projectProjectHtml(p){
  return `<div class="project-info-grid">
    ${sharedProjectSetupSummaryHtml(p)}
    ${projectFitCheckHtml(p)}
    <div class="card mobile-card"><p class="eyebrow">MATERIALS</p><h2>Project setup</h2><div class="form-grid compact-form">
      <div class="field full"><label>Yarn</label><input id="project-yarn" value="${escapeHtml(p.yarn)}" placeholder="Fibre, weight, colour, dye lot"></div>
      <div class="field"><label>Needles / hooks</label><input id="project-needles" value="${escapeHtml(p.needles)}" placeholder="e.g. 4 mm circular"></div>
      <div class="field"><label>Gauge</label><input id="project-gauge" value="${escapeHtml(p.gauge)}" placeholder="e.g. 22 sts x 30 rows"></div>
      <div class="field full"><label>Sizing notes</label><textarea id="project-sizing" rows="4">${escapeHtml(p.sizingNotes)}</textarea></div>
    </div></div>
    ${projectToolsHtml(p)}
    ${projectToolHistoryHtml(p)}
    ${projectBuyListHtml(p)}
  </div>`;
}

function projectToolHistoryHtml(p){
  const history=p.toolHistory||[];
  return `<div class="card mobile-card project-tool-history"><div class="section-heading compact-row"><div><p class="eyebrow">TOOLS</p><h2>History</h2></div></div>${history.length?`<div class="notion-list">${history.map(item=>`<div class="notion-row"><div>□</div><div><h3>${escapeHtml(item.toolName||"Tool result")}</h3><p>${escapeHtml(new Date(item.dateCreated||Date.now()).toLocaleString())} · ${escapeHtml(item.craftType||"Shared")} · Linked to ${escapeHtml(state.projects.find(p=>p.id===item.linkedProject)?.name||"this project")}</p><p>${escapeHtml(item.outputs?.result||"")}</p><details><summary>Inputs and outputs</summary><pre>${escapeHtml(JSON.stringify({inputs:item.inputs||{},outputs:item.outputs||{}},null,2))}</pre></details><textarea data-history-note="${item.id}" placeholder="Edit notes...">${escapeHtml(item.notes||"")}</textarea></div><div class="row-actions"><button class="mini-button" data-view-history="${item.id}">View</button><button class="mini-button" data-duplicate-history="${item.id}">Duplicate</button><button class="mini-button danger-button" data-delete-history="${item.id}">Delete</button></div></div>`).join("")}</div>`:`<p class="muted-copy">Calculator results you link to this project will appear here.</p>`}</div>`;
}
function openToolHistoryModal(id){
  const p=getProject(),item=(p.toolHistory||[]).find(h=>h.id===id);
  if(!item)return toast("Tool history item not found.");
  openModal(`<p class="eyebrow">TOOL HISTORY</p><h2>${escapeHtml(item.toolName||"Tool result")}</h2><p class="muted-copy">${escapeHtml(new Date(item.dateCreated||Date.now()).toLocaleString())} · ${escapeHtml(item.craftType||"Shared")}</p><div class="result-box"><p>${escapeHtml(item.outputs?.result||"")}</p></div><div class="field full"><label>Notes</label><textarea id="history-modal-notes" rows="5">${escapeHtml(item.notes||"")}</textarea></div><details open><summary>Calculator values</summary><pre>${escapeHtml(JSON.stringify({inputs:item.inputs||{},outputs:item.outputs||{}},null,2))}</pre></details><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Close</button><button class="primary-button" id="save-history-modal">Save notes</button></div>`);
  document.getElementById("save-history-modal").onclick=()=>{item.notes=document.getElementById("history-modal-notes").value;saveProjectTouch(p);closeModal();renderProjectDetail();};
}
function projectAssistantTabHtml(p){
  return `<div class="assistant-tab-grid">${projectAssistantHtml(p)}<div class="card mobile-card"><p class="eyebrow">BETA SAFETY</p><h2>Chart reader</h2><p>Automatic Flow Mode remains paused. The optional signed-in cloud chart reader produces an editable draft; Manual OG Chart Mode remains the reliable daily workflow.</p><p>The assistant can use your uploaded text, project notes, and personal symbol references, but it should never guess an unclear symbol.</p></div></div>`;
}
function themeLabel(t){return themePresets.find(theme=>theme.id===normalizeThemeName(t))?.name||t;}
function themeComparePreviewHtml(theme){
  const d=theme.dark;
  return `<article class="theme-compare-card" aria-label="${escapeHtml(theme.name)} light and dark preview">
    <div class="theme-compare-pane light" style="--pane-bg:${theme.background};--pane-card:${theme.card};--pane-text:${theme.text};--pane-muted:${theme.button};--pane-button:${theme.button};--pane-button-text:#fff;--pane-secondary:${theme.secondary};--pane-highlight:${theme.highlight};">
      <div class="theme-compare-top"><span>Light</span><i></i></div>
      <div class="theme-compare-surface"><b></b><b></b><b></b></div>
      <div class="theme-compare-content"><strong>${escapeHtml(theme.name)}</strong><p>Row 42 · soft card</p><em>Active tab</em></div>
    </div>
    <div class="theme-compare-pane dark" style="--pane-bg:${d.background};--pane-card:${d.card};--pane-text:${d.text};--pane-muted:${d.highlight};--pane-button:${d.button};--pane-button-text:#11130f;--pane-secondary:${d.secondary};--pane-highlight:${d.highlight};">
      <div class="theme-compare-top"><span>Dark</span><i></i></div>
      <div class="theme-compare-surface"><b></b><b></b><b></b></div>
      <div class="theme-compare-content"><strong>${escapeHtml(theme.name)}</strong><p>Row 42 · readable card</p><em>Active tab</em></div>
    </div>
  </article>`;
}
function styleLabel(s){return designStyles.find(style=>style.id===normalizeDesignStyle(s))?.name||s;}

function chartRowMetrics(p){
  const reader=normalizeChartReaderConfig(p.chartReader,p),grid=reader.grid||{},rows=Math.max(1,Number(grid.rows)||Number(p.chartRows)||Number(p.totalRows)||1);
  const row=Math.max(1,Math.min(rows,Number(p.row)||1)),rowHeight=(Number(grid.height)||100)/rows;
  return {reader,grid,rows,row,rowHeight,x:Number(grid.x)||0,y:Number(grid.y)||0,width:Number(grid.width)||100,height:Number(grid.height)||100,top:(Number(grid.y)||0)+(row-1)*rowHeight};
}
function rowHighlightStyle(p){
  const m=chartRowMetrics(p);
  return `left:${m.x}%;right:auto;width:${m.width}%;top:${Math.max(0,Math.min(100,m.top))}%;height:${Math.max(1.4,m.rowHeight)}%;`;
}
function rowHighlightTop(p) { return `${chartRowMetrics(p).top}%`; }
function patternReadingSpaceHtml(p){
  const source=normalizePatternSource(p.patternSource,p),text=(source.userCorrectedText||source.extractedText||"").trim();
  if(source.type==="none"&&!text)return "";
  const lines=text.split(/\n+/).map(line=>line.trim()).filter(Boolean),lineIndex=Math.max(0,Math.min(lines.length-1,(source.currentLine||1)-1));
  const currentLine=lines[lineIndex]||"Add or review the scanned pattern text here.";
  const fallback=source.ocrStatus==="failed"?`<div class="flow-warning-card"><p>We could not read this clearly. You can still use the image as a visual chart, or paste the written pattern text manually.</p></div>`:"";
  const modeLabel={ "written-pattern":"Written pattern", "visual-chart":"Visual chart", mixed:"Mixed pattern", none:"Not chosen" }[source.type]||"Not chosen";
  const mixedActions=source.type==="mixed"?`<div class="pattern-source-actions"><button class="mini-button" data-pattern-collapse="${source.textCollapsed?"show-text":"hide-text"}">${source.textCollapsed?"Show scanned text":"Hide scanned text"}</button><button class="mini-button" data-pattern-collapse="${source.chartCollapsed?"show-chart":"hide-chart"}">${source.chartCollapsed?"Show visual chart":"Hide visual chart"}</button></div>`:"";
  return `<section class="pattern-reading-space card workspace-card">
    <div class="section-heading compact-row"><div><p class="eyebrow">PATTERN READING SPACE</p><h3>${modeLabel}</h3><p>Review the scanned text before Yarncha uses it for row help.</p></div><button class="mini-button" id="review-pattern-source">Review scan</button></div>
    ${fallback}
    ${mixedActions}
    ${source.textCollapsed?`<div class="collapsed-workspace-panel"><strong>Scanned text is hidden.</strong><p class="muted-copy">Your corrected text is still saved with this project.</p></div>`:text?`<div class="pattern-reading-grid">
      <div class="pattern-line-focus"><span>Current line ${lineIndex+1}${lines.length?` of ${lines.length}`:""}</span><strong>${escapeHtml(currentLine)}</strong></div>
      <div class="pattern-line-controls"><button class="secondary-button" id="pattern-prev-line">Previous line</button><button class="primary-button" id="pattern-next-line">Next line</button></div>
      <label class="field full"><span>Scanned text</span><textarea id="pattern-source-text" rows="8">${escapeHtml(source.userCorrectedText||source.extractedText)}</textarea></label>
      <div class="pattern-source-actions"><button class="secondary-button" id="save-pattern-source-text">Save text edits</button><span>${source.ocrStatus==="success"?"Scan looks readable":source.ocrStatus==="low-confidence"?"Please review carefully":"You can still continue manually"}</span></div>
    </div>`:`<p class="muted-copy">No readable text has been saved yet. You can still use the original upload as a visual chart.</p>`}
  </section>`;
}
function chartRowHtml(r){return `<div class="chart-row ${r.status==="uncertain"?"uncertain":""}"><div><strong>Row ${r.number}</strong><span>${escapeHtml(r.side||"Side uncertain")} · ${Number(r.stitchCount)||"?"} stitches</span></div><p>${escapeHtml(r.sequence||"uncertain")}</p><small>${escapeHtml(r.shaping||"No increase/decrease detected")}</small><div class="row-actions"><button class="mini-button" data-edit-analysis-row="${r.id}">Edit</button><button class="mini-button danger-button" data-delete-analysis-row="${r.id}">Delete</button></div></div>`;}
function subCounterHtml(s) {
  return `<div class="sub-counter repeat-counter-card"><div class="sub-counter-main"><strong>${escapeHtml(s.name)}</strong><div class="link-toggle">${s.linked!==false ? "Linked to main row counter" : "Manual counter"}</div></div>
  <div class="sub-counter-controls"><button data-sub="${s.id}" data-delta="-1" aria-label="Decrease ${escapeHtml(s.name)}">−</button><strong>${s.count}</strong><button data-sub="${s.id}" data-delta="1" aria-label="Increase ${escapeHtml(s.name)}">+</button></div>
  <div class="repeat-counter-actions"><button class="secondary-button" data-edit-sub="${s.id}">Edit Counter</button><button class="mini-button" data-counter-more="${s.id}">More</button></div></div>`;
}
function projectAssistantHtml(p) {
  const messages = p.assistantMessages.length ? p.assistantMessages : [];
  return `<div class="assistant-card card"><div class="section-heading" style="margin:0"><div><p class="eyebrow">PROJECT ASSISTANT</p><h3>Ask about this chart</h3><p class="assistant-helper">Ask about the current row, abbreviations, repeats, translation, or where you are stuck. Visual symbol recognition is paused; verify chart symbols manually.</p></div><button class="mini-button" id="open-chatgpt">Open in ChatGPT ↗</button></div>
    <div class="pdf-context"><strong>PDF reference: ${p.chart?.name ? escapeHtml(p.chart.name) : "No chart uploaded"}</strong><br>Paste chart legend, abbreviations or extracted instructions here so the local assistant can quote and reason from them.<textarea id="pdf-reference" placeholder="Pattern text, symbols, legend, row instructions...">${escapeHtml(p.pdfReference)}</textarea></div>
    <div class="assistant-messages">${messages.length?messages.slice(-6).map(m => `<div class="assistant-message ${m.role === "user" ? "user" : ""}">${escapeHtml(m.text)}</div>`).join(""):`<p class="muted-copy">Your project assistant is ready. Add checked chart text or ask a pattern question.</p>`}</div>
    <div class="assistant-input"><textarea id="assistant-question" placeholder="What does this repeat mean? What should I do on row ${p.row}?"></textarea><button class="primary-button" id="ask-assistant">Ask</button></div></div>`;
}
function projectBuyListHtml(p){
  const total=p.buyList.reduce((sum,i)=>sum+(Number(i.quantity)||0)*(Number(i.price)||0),0);
  return `<div class="buy-list-card card"><div class="market-panel-head"><div><p class="eyebrow">PROJECT SUPPLIES</p><h2>Buy list</h2></div><button class="primary-button" id="add-buy-item">+ Add item</button></div>
    <div class="notion-list">${p.buyList.length?p.buyList.map(i=>`<div class="notion-row"><div>□</div><div><h3>${escapeHtml(i.name)}</h3><p>${escapeHtml(i.category)} · ${i.quantity} × $${Number(i.price).toFixed(2)} = $${(i.quantity*i.price).toFixed(2)}</p></div><div class="row-actions"><button class="mini-button" data-send-cart="${i.id}">Add to cart</button><button class="mini-button" data-edit-buy="${i.id}">Edit</button><button class="mini-button danger-button" data-delete-buy="${i.id}">Delete</button></div></div>`).join(""):`<div class="empty-state">Add yarn, tools or kit supplies and calculate the project cost.</div>`}</div>
    <div class="section-heading" style="margin-bottom:0"><span>Estimated project purchases</span><strong class="buy-list-total">$${total.toFixed(2)}</strong></div></div>`;
}
const projectToolkitCategories=[
  {id:"stitch",title:"Stitch & Pattern Tools",icon:"⌁",desc:"Pattern maths, stitch counts, repeats and shaping.",tools:["basic","unit","cast-on","repeat","shaping","garment","row-helper"]},
  {id:"fit",title:"Fit & Size Tools",icon:"◇",desc:"Sizing, fit, gauge and finished dimensions.",tools:["swatch","tool-adjust","garment","blocking","size-reference","hat","sock","sleeve","raglan","blanket","circle","amigurumi","granny","c2c"]},
  {id:"rendering",title:"Project Rendering Studio",icon:"▦",desc:"Visual planning before making: grids, stripes and colour pooling.",tools:["grid","stripe","pooling"]},
  {id:"yarn",title:"Yarn Tools",icon:"◌",desc:"Yarn planning, purchasing, substitution and weight conversion.",tools:["yarn-estimator","yarn-leftover","substitution","yarn-weight"]}
];
function unitSystemLabel(){return state.unitSystem==="imperial"?"US / Imperial: inches, yards, ounces":"UK / Metric: cm, mm, metres, grams";}
function preferredUnit(kind){const imperial=state.unitSystem==="imperial";return ({length:imperial?"in":"cm",small:imperial?"in":"mm",yarnLength:imperial?"yd":"m",weight:imperial?"oz":"g",gauge:imperial?"Stitches per 4 in":"Stitches per 10 cm"})[kind]||"cm";}
function estimateDisclaimer(){return "This is an estimate. Yarn usage depends on gauge, stitch pattern, tension, yarn weight, needle/hook size, finished size and blocking.";}
function toolCraftLabel(tool){return tool.crafts?.includes("all")?"Shared":tool.crafts?.join(" / ")||"Shared";}
function projectToolkitTools(p){return toolkitToolsForProject(p).filter(t=>t.id!=="budget");}
function toolsInProjectCategory(p,categoryId){const allowed=new Set(projectToolkitTools(p).map(t=>t.id));const cat=projectToolkitCategories.find(c=>c.id===categoryId);return (cat?.tools||[]).filter(id=>allowed.has(id)).map(id=>toolkitToolDefs.find(t=>t.id===id)).filter(Boolean);}
function projectToolkitCategoryOptions(p){
  return projectToolkitCategories.map(cat=>({...cat,count:toolsInProjectCategory(p,cat.id).length})).filter(cat=>cat.count>0);
}
function projectToolkitToolOptions(p,categoryId){
  if(categoryId==="rendering")return [{id:"rendering-studio",name:"Project Rendering Studio",desc:"Visual planning before making: grid, stripes and colour pooling in one tidy workspace.",crafts:["all"],category:"Shared tools"}];
  return toolsInProjectCategory(p,categoryId);
}
function projectToolModeCopy(p,tool){
  const type=normalizeProjectType(p.type);
  if(tool.id==="swatch")return type==="Crochet"||type==="Tunisian Crochet"?"Crochet gauge mode: uses stitches and rows/rounds in your selected unit.":"Knitting gauge mode: uses stitches and rows in your selected unit.";
  if(tool.id==="tool-adjust")return type==="Crochet"||type==="Tunisian Crochet"?"Hook adjustment mode: larger hooks usually loosen crochet gauge; smaller hooks tighten it.":"Needle adjustment mode: larger needles usually loosen knitting gauge; smaller needles tighten it.";
  if(tool.id==="garment")return "Pattern Resizer keeps the same result engine as Garment Resizer, with proportions and repeat multiples visible.";
  return tool.desc||"Choose this tool to calculate and save a result.";
}
function projectToolsHtml(p) {
  p.projectTools=p.projectTools||{};
  const sharedSetup=ensureProjectSetup(p),sharedPlan=p.projectCalculations||calculateFlowProjectPlan(p,sharedSetup);
  const linked = p.projectTools.linked !== false;
  const categories=projectToolkitCategoryOptions(p);
  let categoryId=p.projectTools.category||projectToolkitCategories.find(cat=>cat.tools.includes(p.projectTools.selectedTool))?.id||"stitch";
  if(!categories.some(cat=>cat.id===categoryId))categoryId=categories[0]?.id||"stitch";
  const toolOptions=projectToolkitToolOptions(p,categoryId);
  let selected=p.projectTools.selectedTool;
  if(categoryId==="rendering"){
    selected=["grid","stripe","pooling"].includes(selected)?selected:"grid";
  }else if(!toolOptions.some(t=>t.id===selected)){
    selected=toolOptions[0]?.id||"swatch";
  }
  currentProjectTool=selected;
  const def=categoryId==="rendering"?{id:"rendering-studio",name:"Project Rendering Studio",desc:"Visual planning before making: grid, stripes and colour pooling in one tidy workspace.",crafts:["all"]}:toolkitToolDefs.find(t=>t.id===selected)||toolOptions[0]||toolkitToolDefs[0];
  const cat=categories.find(c=>c.id===categoryId)||projectToolkitCategories[0];
  const tabs=categoryId==="rendering"?toolsInProjectCategory(p,"rendering"):[];
  return `<div class="project-tools card toolkit-card compact-toolkit"><div class="section-heading" style="margin:0"><div><p class="eyebrow">PROJECT TOOLKIT</p><h2>Choose a focused tool</h2><p class="muted-copy">Showing ${escapeHtml(normalizeProjectType(p.type).toLowerCase())} tools plus shared tools. Budget stays in Buy List / Budget.</p><p class="unit-preference-note">Preferred units: ${escapeHtml(unitSystemLabel())}</p><p class="shared-tool-note">Using your saved setup: ${escapeHtml(sharedSetup.projectType)} · ${escapeHtml(sharedSetup.patternGauge||"add gauge")} · ${escapeHtml(sharedPlan.widthCm?`${sharedPlan.widthCm} cm wide`:"add size")}</p></div><label class="link-toggle"><input id="link-project-tools" type="checkbox" ${linked ? "checked" : ""}> Save results to this project</label></div>
    <div class="toolkit-selector-panel">
      <div class="field"><label>Category</label><select id="project-tool-category">${categories.map(c=>`<option value="${c.id}" ${c.id===categoryId?"selected":""}>${escapeHtml(c.title)}</option>`).join("")}</select><small>${escapeHtml(cat.desc)}</small></div>
      <div class="field"><label>Tool</label><select id="project-tool-picker">${toolOptions.map(t=>`<option value="${t.id}" ${(categoryId==="rendering"&&t.id==="rendering-studio")||t.id===selected?"selected":""}>${escapeHtml(t.name)}</option>`).join("")}</select><small>${escapeHtml(projectToolModeCopy(p,def))}</small></div>
      <button class="secondary-button" id="open-selected-project-tool">Open Tool</button>
    </div>
    ${categoryId==="rendering"?`<div class="studio-tabs" aria-label="Project Rendering Studio tabs">${tabs.map(t=>`<button class="pill-tab ${selected===t.id?"active":""}" data-rendering-tab="${t.id}">${escapeHtml(t.name.replace(" Generator","").replace(" Planner", ""))}</button>`).join("")}</div>`:""}
    <div class="selected-tool-summary"><span class="craft-pill">${escapeHtml(categoryId==="rendering"?"Shared":toolCraftLabel(def))}</span><div><h3>${escapeHtml(categoryId==="rendering"?"Project Rendering Studio":def.name)}</h3><p>${escapeHtml(projectToolModeCopy(p,def))}</p></div></div>
    <div id="project-tool-content">${projectToolContent(p,selected)}</div></div>`;
}
function normalizeProjectType(type="Mixed / Other"){
  if(/tunisian/i.test(type))return "Tunisian Crochet";
  if(/crochet/i.test(type))return "Crochet";
  if(/knit/i.test(type))return "Knitting";
  return "Mixed / Other";
}
const toolkitToolDefs=[
  {id:"cast-on",name:"Cast On Calculator",category:"Knitting tools",crafts:["Knitting"],desc:"Calculate cast-on stitches from width, gauge, stitch multiple and edge stitches."},
  {id:"sock",name:"Sock Calculator",category:"Knitting tools",crafts:["Knitting"],desc:"Plan sock stitches, heel/gusset basics and foot length from gauge."},
  {id:"swatch",name:"Gauge / Swatch Calculator",category:"Shared tools",crafts:["all"],desc:"Adjust stitch and row counts when your gauge differs from the pattern."},
  {id:"shaping",name:"Increase / Decrease Calculator",category:"Shared tools",crafts:["all"],desc:"Spread increases or decreases evenly across a row or round."},
  {id:"yarn-estimator",name:"Yarn Estimator",category:"Shared tools",crafts:["all"],desc:"Estimate yarn needed, suggested balls, safety margin and leftover.",buyList:true},
  {id:"garment",name:"Pattern / Garment Resizer",category:"Shared tools",crafts:["all"],desc:"Resize garment or pattern sections while keeping proportions visible."},
  {id:"circle",name:"Circle Calculator",category:"Crochet tools",crafts:["Crochet","Tunisian Crochet"],desc:"Generate flat-circle stitch counts by round."},
  {id:"amigurumi",name:"Amigurumi Shape Guide",category:"Crochet tools",crafts:["Crochet","Tunisian Crochet"],desc:"Plan round, oval, cone and cylinder shaping."},
  {id:"granny",name:"Granny Square Size Planner",category:"Crochet tools",crafts:["Crochet"],desc:"Plan square counts, layout size and joining allowance."},
  {id:"c2c",name:"C2C Blanket Calculator",category:"Crochet tools",crafts:["Crochet","Tunisian Crochet"],desc:"Estimate blocks, diagonal rows and yarn for corner-to-corner blankets."},
  {id:"hat",name:"Hat / Beanie Size Calculator",category:"Shared tools",crafts:["all"],desc:"Estimate cast-on/circumference, crown diameter, height and yardage."},
  {id:"sleeve",name:"Sleeve Calculator",category:"Shared tools",crafts:["all"],desc:"Plan tapered sleeve shaping over a target length."},
  {id:"raglan",name:"Raglan Calculator",category:"Shared tools",crafts:["all"],desc:"Plan top-down raglan stitch distribution and increase rounds."},
  {id:"blanket",name:"Blanket Calculator",category:"Shared tools",crafts:["all"],desc:"Calculate blanket stitches, rows and yarn from dimensions and gauge.",buyList:true},
  {id:"grid",name:"Grid Generator",category:"Shared tools",crafts:["all"],desc:"Generate a stitch grid size from measurements and gauge."},
  {id:"stripe",name:"Stripe Generator",category:"Shared tools",crafts:["all"],desc:"Plan vertical or horizontal stripe repeats and colour yardage."},
  {id:"pooling",name:"Color Pooling Planner",category:"Shared tools",crafts:["all"],desc:"Basic planned-pooling structure with future colour matching guidance."},
  {id:"blocking",name:"Blocking Calculator",category:"Shared tools",crafts:["all"],desc:"Estimate blocked size change from a swatch or finished fabric."},
  {id:"unit",name:"Unit Converter",category:"Shared tools",crafts:["all"],desc:"Convert cm/in, mm/in, meter/yard, gram/ounce and gauge values."},
  {id:"budget",name:"Budget Calculator",category:"Buy List / Budget",crafts:["all"],desc:"Estimate project cost and optionally add supplies to Buy List.",buyList:true},
  {id:"repeat",name:"Repeat Calculator",category:"Shared tools",crafts:["all"],desc:"Work out how many repeats fit and what remains."},
  {id:"row-helper",name:"Row / Round Counter Helper",category:"Shared tools",crafts:["all"],desc:"Plan repeats, milestones and progress percentages."},
  {id:"tool-adjust",name:"Needle / Hook Adjustment",category:"Shared tools",crafts:["all"],desc:"Estimate whether a smaller or larger tool may help match gauge."},
  {id:"substitution",name:"Yarn Substitution Helper",category:"Shared tools",crafts:["all"],desc:"Compare pattern yarn and substitute yarn by length and gauge.",buyList:true},
  {id:"yarn-leftover",name:"Yarn Leftover Estimator",category:"Shared tools",crafts:["all"],desc:"Estimate remaining length from leftover ball weight and original skein details."},
  {id:"yarn-weight",name:"Yarn Weight Converter",category:"Shared tools",crafts:["all"],desc:"Convert ball length, WPI and yarn thickness into a yarn category."},
  {id:"basic",name:"Basic Calculator",category:"Shared tools",crafts:["all"],desc:"Quick stitch math without leaving your project."},
  {id:"size-reference",name:"Size Reference",category:"Shared tools",crafts:["all"],desc:"Beginner-friendly size and yarn ranges by project category."}
];
function toolkitToolsForProject(p){
  const type=normalizeProjectType(p.type);
  return toolkitToolDefs.filter(t=>t.id!=="budget" && (t.crafts.includes("all")||t.crafts.includes(type)));
}
function projectToolContent(p, tool) {
  const saved = p.projectTools[tool] || {};
  const def=toolkitToolDefs.find(t=>t.id===tool)||toolkitToolDefs[0];
  const result=saved.result||"Your result will appear here.";
  const resultHtml=saved.calculator?calculatorResultHtml(saved.calculator):`<p>${escapeHtml(result)}</p>`;
  const card=(fields,button="Calculate")=>`<div class="toolkit-tool"><p class="tool-description">${escapeHtml(def.desc)}</p><p class="unit-preference-note">Preferred units: ${escapeHtml(unitSystemLabel())}</p>${fields}<p class="muted-copy estimate-disclaimer">${escapeHtml(estimateDisclaimer())}</p><div class="toolkit-actions"><button class="secondary-button" id="project-calculate">${button}</button><button class="mini-button" id="reset-tool-form">Reset</button><button class="mini-button" id="copy-calc-result">Copy result</button><button class="mini-button" id="save-tool-result">Save to Project Notes</button></div><div class="result-box" id="project-tool-result">${resultHtml}</div></div>`;
  if(tool==="basic")return `<div class="basic-calculator" data-display="${escapeHtml(saved.expression||"0")}"><div class="calc-display" id="calc-display">${escapeHtml(saved.expression||"0")}</div><div class="calc-grid">${["C","Back","%","/","7","8","9","x","4","5","6","-","1","2","3","+","Clear","0",".","="].map(k=>`<button class="${k==="="?"equals":""}" data-calc-key="${k}">${k}</button>`).join("")}</div><div class="toolkit-actions"><button class="mini-button" id="reset-tool-form">Reset</button><button class="mini-button" id="copy-calc-result">Copy result</button><button class="mini-button" id="save-tool-result">Save to Project Notes</button></div><div class="result-box" id="project-tool-result"><p>${escapeHtml(result)}</p></div></div>`;
  if(tool==="swatch")return card(`<div class="form-grid"><div class="field"><label>Pattern gauge stitches</label><input id="g-pattern-st" type="number" value="${saved.patternSt||20}" placeholder="e.g. 20"></div><div class="field"><label>Pattern gauge rows</label><input id="g-pattern-row" type="number" value="${saved.patternRows||28}" placeholder="e.g. 28"></div><div class="field"><label>What you got: stitches</label><input id="g-user-st" type="number" value="${saved.userSt||22}" placeholder="e.g. 22"></div><div class="field"><label>What you got: rows</label><input id="g-user-row" type="number" value="${saved.userRows||30}" placeholder="e.g. 30"></div><div class="field"><label>Original stitch count</label><input id="g-original-st" type="number" value="${saved.originalSt||100}" placeholder="e.g. 100"></div><div class="field"><label>Original row count</label><input id="g-original-row" type="number" value="${saved.originalRows||80}" placeholder="e.g. 80"></div></div>`);
  if(tool==="shaping")return card(`<div class="form-grid"><div class="field"><label>How many stitches now?</label><input id="shape-current" type="number" value="${saved.current||84}" placeholder="e.g. 84"></div><div class="field"><label>How many stitches do you need?</label><input id="shape-desired" type="number" value="${saved.desired||96}" placeholder="e.g. 96"></div><div class="field"><label>Where are you applying this?</label><input id="shape-row" type="number" value="${saved.row||p.row}" placeholder="Current row"></div></div>`, "Plan shaping");
  if(tool==="garment")return card(`<h3>Garment Resizer</h3><p class="muted-copy">For cardigans, sweaters, tops, vests, dresses, and other clothing projects.</p><div class="form-grid"><div class="field"><label>Original stitch count</label><input id="garment-original-st" type="number" value="${saved.originalSt||54}"></div><div class="field"><label>Original repeat size</label><input id="garment-repeat" type="number" value="${saved.repeat||2}"></div><div class="field"><label>Left section</label><input id="garment-left" type="number" value="${saved.left||6}"></div><div class="field"><label>Centre / back section</label><input id="garment-centre" type="number" value="${saved.centre||15}"></div><div class="field"><label>Right section</label><input id="garment-right" type="number" value="${saved.right||6}"></div><div class="field"><label>What stitch count do you want?</label><input id="garment-desired" type="number" value="${saved.desired||40}"></div><div class="field"><label>Keep symmetry?</label><select id="garment-symmetry"><option value="yes" ${saved.symmetry!=="no"?"selected":""}>Yes</option><option value="no" ${saved.symmetry==="no"?"selected":""}>No</option></select></div><div class="field"><label>Keep repeat multiple?</label><select id="garment-multiple"><option value="yes" ${saved.multiple!=="no"?"selected":""}>Yes</option><option value="no" ${saved.multiple==="no"?"selected":""}>No</option></select></div></div>`, "Resize garment");
  if(tool==="tool-adjust")return card(`<div class="form-grid"><div class="field"><label>Pattern needle/hook size</label><input id="adj-pattern-tool" type="number" step=".25" value="${saved.patternTool||4}" placeholder="e.g. 4 mm"></div><div class="field"><label>Your needle/hook size</label><input id="adj-user-tool" type="number" step=".25" value="${saved.userTool||4.5}" placeholder="e.g. 4.5 mm"></div><div class="field"><label>Pattern gauge</label><input id="adj-pattern-gauge" type="number" value="${saved.patternGauge||20}" placeholder="stitches per 10 cm"></div><div class="field"><label>Your gauge</label><input id="adj-user-gauge" type="number" value="${saved.userGauge||18}" placeholder="stitches per 10 cm"></div><div class="field"><label>Desired finished size</label><input id="adj-desired-size" type="number" value="${saved.desiredSize||50}" placeholder="cm or inches"></div><div class="field"><label>Current swatch size</label><input id="adj-current-size" type="number" value="${saved.currentSize||55}" placeholder="same unit"></div></div>`, "Check size risk");
  if(tool==="yarn-estimator")return card(`<div class="form-grid"><div class="field"><label>Project kind</label><select id="yarn-kind">${["Blanket","Sweater","Hat / beanie","Scarf","Socks pair","Amigurumi","Shawl","Gloves pair","Custom dimension"].map(k=>`<option ${saved.kind===k?"selected":""}>${k}</option>`).join("")}</select></div><div class="field"><label>Size</label><input id="yarn-size" value="${escapeHtml(saved.size||"M")}" placeholder="e.g. M, adult, baby"></div><div class="field"><label>Yarn weight</label><select id="yarn-weight-tool">${yarnWeights.map(r=>`<option>${r.name}</option>`).join("")}</select></div><div class="field"><label>Length per ball/skein (${preferredUnit("yarnLength")})</label><input id="yarn-length" type="number" value="${saved.length||(state.unitSystem==="imperial"?220:200)}" placeholder="${preferredUnit("yarnLength")}"></div><div class="field"><label>Weight per ball/skein (${preferredUnit("weight")})</label><input id="yarn-ball-weight" type="number" value="${saved.ballWeight||(state.unitSystem==="imperial"?3.5:100)}" placeholder="${preferredUnit("weight")}"></div><div class="field"><label>Pattern estimated yarn</label><input id="yarn-pattern-amount" type="number" value="${saved.patternAmount||900}" placeholder="same length unit"></div><div class="field"><label>User modification %</label><input id="yarn-mod" type="number" value="${saved.mod||0}" placeholder="e.g. -10 or 15"></div><div class="field"><label>How many balls do you already have?</label><input id="yarn-owned" type="number" value="${saved.owned||0}"></div></div>`, "Estimate yarn");
  if(tool==="budget")return card(`<div class="form-grid"><div class="field"><label>Yarn price per ball</label><input id="budget-yarn-price" type="number" step=".01" value="${saved.yarnPrice||12}"></div><div class="field"><label>Balls needed</label><input id="budget-balls" type="number" value="${saved.balls||6}"></div><div class="field"><label>Tools / supplies cost</label><input id="budget-supplies" type="number" step=".01" value="${saved.supplies||20}"></div><div class="field"><label>Finished items made</label><input id="budget-items" type="number" value="${saved.items||1}"></div><div class="field"><label>Leftover yarn balls</label><input id="budget-leftover" type="number" step=".1" value="${saved.leftover||.5}"></div></div>`, "Calculate budget");
  if(tool==="cast-on")return card(`<div class="form-grid"><div class="field"><label>Finished width</label><input id="simple-width" type="number" value="40"></div><div class="field"><label>${preferredUnit("gauge")}</label><input id="simple-gauge" type="number" value="22"></div><div class="field"><label>Stitch multiple</label><input id="simple-multiple" type="number" value="2"></div><div class="field"><label>Edge stitches</label><input id="simple-edge" type="number" value="2"></div></div>`, "Calculate cast on");
  if(tool==="sock")return card(`<div class="form-grid"><div class="field"><label>Foot circumference</label><input id="sock-circ" type="number" value="22"></div><div class="field"><label>${preferredUnit("gauge")}</label><input id="sock-gauge" type="number" value="30"></div><div class="field"><label>Ease %</label><input id="sock-ease" type="number" value="10"></div><div class="field"><label>Foot length</label><input id="sock-length" type="number" value="24"></div></div>`, "Plan sock");
  if(tool==="circle")return card(`<div class="form-grid"><div class="field"><label>Starting stitches</label><input id="circle-start" type="number" value="6"></div><div class="field"><label>Rounds</label><input id="circle-rounds" type="number" value="8"></div><div class="field"><label>Stitch type</label><select id="circle-stitch"><option>sc</option><option>hdc</option><option>dc</option></select></div></div>`, "Plan circle");
  if(tool==="amigurumi")return card(`<div class="form-grid"><div class="field"><label>Shape</label><select id="ami-shape"><option>round</option><option>oval</option><option>cone</option><option>cylinder</option></select></div><div class="field"><label>Base stitches</label><input id="ami-base" type="number" value="${saved.baseStitches||6}"></div><div class="field"><label>Increase rounds</label><input id="ami-rounds" type="number" value="${saved.increaseRounds||6}"></div><div class="field"><label>Straight rounds</label><input id="ami-straight" type="number" value="${saved.straightRounds||6}"></div><div class="field"><label>Oval chain length</label><input id="ami-chain" type="number" value="${saved.chainLength||8}"></div></div>`, "Guide shape");
  if(tool==="granny")return card(`<div class="form-grid"><div class="field"><label>Target square size</label><input id="granny-target" type="number" value="${saved.targetSize||12}"></div><div class="field"><label>Size per round</label><input id="granny-size" type="number" value="${saved.sizePerRound||2.5}"></div><div class="field"><label>Joining allowance</label><input id="granny-join" type="number" value="${saved.joiningAllowance||0.5}"></div><div class="field"><label>Project width</label><input id="granny-width" type="number" value="${saved.blanketWidth||120}"></div><div class="field"><label>Project length</label><input id="granny-length" type="number" value="${saved.blanketLength||120}"></div></div>`, "Plan squares");
  if(tool==="c2c")return card(`<div class="form-grid"><div class="field"><label>Width</label><input id="c2c-width" type="number" value="120"></div><div class="field"><label>Height</label><input id="c2c-height" type="number" value="150"></div><div class="field"><label>Block size</label><input id="c2c-block" type="number" value="2.5"></div><div class="field"><label>Yarn per block</label><input id="c2c-yarn" type="number" value="1.1"></div></div>`, "Plan C2C");
  if(tool==="hat")return card(`<div class="form-grid"><div class="field"><label>Head circumference</label><input id="hat-circ" type="number" value="56"></div><div class="field"><label>Fit ease %</label><input id="hat-ease" type="number" value="8"></div><div class="field"><label>${preferredUnit("gauge")}</label><input id="hat-gauge" type="number" value="20"></div></div>`, "Calculate hat");
  if(tool==="sleeve")return card(`<div class="form-grid"><div class="field"><label>Start stitches</label><input id="sleeve-start" type="number" value="64"></div><div class="field"><label>End stitches</label><input id="sleeve-end" type="number" value="42"></div><div class="field"><label>Rows available</label><input id="sleeve-rows" type="number" value="90"></div></div>`, "Plan sleeve");
  if(tool==="raglan")return card(`<div class="form-grid"><div class="field"><label>Neck stitches</label><input id="raglan-neck" type="number" value="88"></div><div class="field"><label>Target body + sleeves stitches</label><input id="raglan-target" type="number" value="260"></div><div class="field"><label>Increase stitches per increase round</label><input id="raglan-inc" type="number" value="8"></div></div>`, "Plan raglan");
  if(tool==="blanket")return card(`<div class="form-grid"><div class="field"><label>Width</label><input id="blanket-width" type="number" value="100"></div><div class="field"><label>Height</label><input id="blanket-height" type="number" value="140"></div><div class="field"><label>${preferredUnit("gauge")}</label><input id="blanket-st" type="number" value="16"></div><div class="field"><label>Rows per ${state.unitSystem==="imperial"?"4 in":"10 cm"}</label><input id="blanket-row" type="number" value="20"></div><div class="field"><label>Yarn per 10x10 area</label><input id="blanket-yarn" type="number" value="12"></div></div>`, "Plan blanket");
  if(tool==="grid")return card(`<div class="form-grid"><div class="field"><label>Width cells</label><input id="grid-width" type="number" value="${saved.width||40}"></div><div class="field"><label>Height cells</label><input id="grid-height" type="number" value="${saved.height||60}"></div><div class="field"><label>Craft type</label><select id="grid-craft"><option>knitting</option><option>crochet</option></select></div><div class="field"><label>Symbol set</label><select id="grid-symbols"><option>basic</option><option>lace</option><option>colourwork</option></select></div><div class="field"><label>Colours</label><input id="grid-colors" type="number" value="${saved.colors||2}"></div></div>`, "Generate grid");
  if(tool==="stripe")return card(`<div class="form-grid"><div class="field"><label>Direction</label><select id="stripe-direction"><option>horizontal stripes</option><option>vertical stripes</option></select></div><div class="field"><label>Total rows/stitches</label><input id="stripe-total" type="number" value="120"></div><div class="field"><label>Colours</label><input id="stripe-colors" type="number" value="4"></div></div>`, "Plan stripes");
  if(tool==="pooling")return card(`<div class="form-grid"><div class="field"><label>Colour repeat length</label><input id="pool-repeat" type="number" value="${saved.colorRepeatLength||60}"></div><div class="field"><label>Stitches per repeat</label><input id="pool-stitches" type="number" value="${saved.stitchesPerRepeat||24}"></div><div class="field"><label>Row width</label><input id="pool-row-width" type="number" value="${saved.rowWidth||96}"></div><div class="field full"><p class="muted-copy">Colour matching recommendations will be expanded later.</p></div></div>`, "Plan pooling");
  if(tool==="blocking")return card(`<div class="form-grid"><div class="field"><label>Before width</label><input id="block-width" type="number" value="${saved.beforeWidth||saved.w||48}"></div><div class="field"><label>Before length</label><input id="block-height" type="number" value="${saved.beforeLength||saved.h||60}"></div><div class="field"><label>After width</label><input id="block-after-width" type="number" value="${saved.afterWidth||""}" placeholder="optional"></div><div class="field"><label>After length</label><input id="block-after-height" type="number" value="${saved.afterLength||""}" placeholder="optional"></div><div class="field"><label>Expected growth %</label><input id="block-growth" type="number" value="${saved.growthPercent??saved.growth??8}" placeholder="used if after size is blank"></div></div>`, "Estimate blocking");
  if(tool==="size-reference")return `<div class="toolkit-tool"><p class="tool-description">${escapeHtml(def.desc)}</p>${sizeReferenceHtml(normalizeProjectType(p.type))}</div>`;
  if(tool==="repeat")return card(`<div class="form-grid"><div class="field"><label>How many stitches/rows do you have?</label><input id="repeat-total" type="number" value="${saved.total||120}"></div><div class="field"><label>How many are in one repeat?</label><input id="repeat-size" type="number" value="${saved.repeat||8}"></div><div class="field"><label>Edge stitches to keep aside</label><input id="repeat-edge" type="number" value="${saved.edge||0}"></div></div>`, "Calculate repeats");
  if(tool==="row-helper")return card(`<div class="form-grid"><div class="field"><label>Current row/round</label><input id="row-current" type="number" value="${saved.current||p.row}"></div><div class="field"><label>Planned rows/rounds</label><input id="row-total" type="number" value="${saved.total||p.totalRows||100}"></div><div class="field"><label>Repeat every X rows</label><input id="row-repeat" type="number" value="${saved.repeat||6}"></div></div>`, "Plan rows");
  if(tool==="substitution")return card(`<div class="form-grid"><div class="field"><label>Pattern yarn length per ball</label><input id="sub-pattern-length" type="number" value="${saved.patternLength||220}"></div><div class="field"><label>Substitute yarn length per ball</label><input id="sub-new-length" type="number" value="${saved.newLength||180}"></div><div class="field"><label>Pattern says how many balls?</label><input id="sub-pattern-balls" type="number" value="${saved.patternBalls||6}"></div><div class="field"><label>Gauge difference %</label><input id="sub-gauge-diff" type="number" value="${saved.gaugeDiff||0}"></div></div>`, "Compare yarns");
  if(tool==="yarn-leftover")return card(`<div class="form-grid"><div class="field"><label>Leftover weight (${preferredUnit("weight")})</label><input id="leftover-weight" type="number" value="${saved.leftoverWeight||(state.unitSystem==="imperial"?1.75:50)}"></div><div class="field"><label>Original skein weight (${preferredUnit("weight")})</label><input id="leftover-skein-weight" type="number" value="${saved.originalSkeinWeight||(state.unitSystem==="imperial"?3.5:100)}"></div><div class="field"><label>Original skein length (${preferredUnit("yarnLength")})</label><input id="leftover-skein-length" type="number" value="${saved.originalSkeinLength||(state.unitSystem==="imperial"?220:200)}"></div></div>`, "Estimate leftover");
  if(tool==="yarn-weight")return card(`<div class="form-grid"><div class="field"><label>Ball weight (${preferredUnit("weight")})</label><input id="tw-grams" type="number" value="${saved.grams||(state.unitSystem==="imperial"?3.5:100)}"></div><div class="field"><label>Length (${preferredUnit("yarnLength")})</label><input id="tw-yards" type="number" value="${saved.yards||(state.unitSystem==="imperial"?220:200)}"></div><div class="field"><label>Wraps per inch</label><input id="tw-wpi" type="number" value="${saved.wpi||""}" placeholder="optional"></div></div>`, "Find yarn category");
  return card(`<div class="form-grid"><div class="field"><label>Input value</label><input id="unit-amount" type="number" value="${saved.amount||100}"></div><div class="field"><label>From unit</label><select id="unit-from">${["cm","mm","m","in","yd","g","oz"].map(u=>`<option ${((saved.from||preferredUnit("length"))===u)?"selected":""}>${u}</option>`).join("")}</select></div><div class="field"><label>To unit</label><select id="unit-to">${["cm","mm","m","in","yd","g","oz"].map(u=>`<option ${((saved.to||(state.unitSystem==="imperial"?"yd":"m"))===u)?"selected":""}>${u}</option>`).join("")}</select></div></div>`, "Convert");
}
function bindProjectDetail() {
  const p = getProject();
  document.querySelectorAll("[data-project-tab]").forEach(b => b.onclick = () => { p.activeTab=b.dataset.projectTab; p.readingMode=false; saveProjectTouch(p); renderProjectDetail(); });
  document.querySelectorAll("[data-counter]").forEach(b => b.onclick = () => changeMainCounter(Number(b.dataset.counter)));
  document.querySelectorAll("[data-sub]").forEach(b => b.onclick = () => {
    const s = p.subCounters.find(x => x.id === b.dataset.sub),floor=Math.max(0,Number(s?.start)||0);
    if(!s)return;
    s.count = Math.max(floor, (Number(s.count)||0) + Number(b.dataset.delta));
    saveProjectTouch(p); renderProjectDetail();
  });
  document.querySelectorAll("[data-edit-sub]").forEach(b => b.onclick = () => openSubCounterModal(b.dataset.editSub));
  document.querySelectorAll("[data-counter-more]").forEach(b => b.onclick = () => openSubCounterActionsModal(b.dataset.counterMore));
  document.getElementById("project-notes")?.addEventListener("input", e => { p.notes = e.target.value; saveProjectTouch(p); });
  document.getElementById("pdf-reference")?.addEventListener("input", e => { p.pdfReference=e.target.value; saveProjectTouch(p); });
  document.getElementById("edit-project-name")?.addEventListener("click", openEditProjectModal);
  document.getElementById("project-cover-picker")?.addEventListener("click", openProjectCoverPicker);
  document.getElementById("edit-project-from-counter")?.addEventListener("click", openEditProjectModal);
  document.getElementById("edit-main-row")?.addEventListener("click", openEditRowModal);
  document.getElementById("add-marker")?.addEventListener("click", () => openMarkerModal());
  document.querySelectorAll("[data-edit-marker]").forEach(b=>b.onclick=()=>openMarkerModal(b.dataset.editMarker));
  document.querySelectorAll("[data-delete-marker]").forEach(b=>b.onclick=()=>{p.markers=p.markers.filter(m=>m.id!==b.dataset.deleteMarker);saveState();renderProjectDetail();});
  document.getElementById("add-sub-counter")?.addEventListener("click", openSubCounterModal);
  document.getElementById("speak-row")?.addEventListener("click", () => speak(buildRowGuidance(p)));
  document.querySelectorAll("#voice-project").forEach(b=>b.onclick = startVoice);
  document.getElementById("toggle-reading")?.addEventListener("click",()=>{p.readingMode=!p.readingMode;p.activeTab="chart";saveProjectTouch(p);renderProjectDetail();});
  document.querySelectorAll("[data-chart-mode]").forEach(b=>b.onclick=()=>{p.chartMode=b.dataset.chartMode;if(p.chartMode==="flow")toast("Flow Mode stays inside this project chart. Review every AI suggestion before using it.");saveProjectTouch(p);renderProjectDetail();});
  document.getElementById("flow-toggle")?.addEventListener("click",()=>{p.flowMode=!p.flowMode;saveProjectTouch(p);renderProjectDetail();});
  document.getElementById("edit-chart-legend")?.addEventListener("click",openChartLegendModal);
  document.getElementById("add-analysis-row")?.addEventListener("click",()=>openChartRowModal());
  document.getElementById("run-cloud-analysis-local")?.addEventListener("click",()=>{const button=document.getElementById("run-cloud-analysis");if(button)button.click();else document.getElementById("run-flow-recognition")?.click();});
  document.getElementById("review-chart-cells-local")?.addEventListener("click",()=>{const button=document.getElementById("load-cloud-cells");if(button)button.click();else openChartLegendModal();});
  bindFlowModeReader(p);
  document.getElementById("generate-final-pattern")?.addEventListener("click",generateFinalPattern);
  document.getElementById("review-pattern-source")?.addEventListener("click",()=>openPatternSourceReviewModal(p.patternSource?.originalFileBlobId||p.activeChartAssetId));
  document.getElementById("save-pattern-source-text")?.addEventListener("click",()=>savePatternSourceText());
  document.getElementById("pattern-prev-line")?.addEventListener("click",()=>movePatternLine(-1));
  document.getElementById("pattern-next-line")?.addEventListener("click",()=>movePatternLine(1));
  document.querySelectorAll("[data-pattern-collapse]").forEach(b=>b.onclick=()=>togglePatternWorkspacePanel(b.dataset.patternCollapse));
  document.querySelectorAll("[data-edit-analysis-row]").forEach(b=>b.onclick=()=>openChartRowModal(b.dataset.editAnalysisRow));
  document.querySelectorAll("[data-delete-analysis-row]").forEach(b=>b.onclick=()=>{p.chartAnalysis.rows=p.chartAnalysis.rows.filter(r=>r.id!==b.dataset.deleteAnalysisRow);saveState();renderProjectDetail();});
  document.getElementById("chart-rows")?.addEventListener("change", e => { p.chartRows = Math.max(1, +e.target.value || 0) || null; p.totalRows=p.chartRows||p.totalRows; saveProjectTouch(p); renderProjectDetail(); });
  document.getElementById("manual-row-save")?.addEventListener("click",()=>setManualRowFromInput());
  document.getElementById("manual-row-input")?.addEventListener("change",()=>setManualRowFromInput());
  document.getElementById("reset-main")?.addEventListener("click", () => { setMainRow(0,{render:false}); p.subCounters.forEach(s=>{s.count=Math.max(0,Number(s.start)||0);}); saveProjectTouch(p); renderProjectDetail(); toast("Counters reset"); });
  document.getElementById("edit-project-rows")?.addEventListener("click", () => openRowPlanModal());
  document.getElementById("ask-assistant")?.addEventListener("click", askProjectAssistant);
  document.getElementById("open-chatgpt")?.addEventListener("click", openInChatGPT);
  document.getElementById("project-tool-category")?.addEventListener("change",e=>{
    const category=e.target.value;
    const first=category==="rendering"?"grid":projectToolkitToolOptions(p,category)[0]?.id||"swatch";
    p.projectTools.category=category;p.projectTools.selectedTool=first;currentProjectTool=first;saveProjectTouch(p);renderProjectDetail();
  });
  document.getElementById("project-tool-picker")?.addEventListener("change",e=>{
    const picked=e.target.value;
    if(picked==="rendering-studio"){p.projectTools.category="rendering";p.projectTools.selectedTool=p.projectTools.selectedTool&&["grid","stripe","pooling"].includes(p.projectTools.selectedTool)?p.projectTools.selectedTool:"grid";}
    else {p.projectTools.selectedTool=picked;currentProjectTool=picked;}
    saveProjectTouch(p);renderProjectDetail();
  });
  document.getElementById("open-selected-project-tool")?.addEventListener("click",()=>document.getElementById("project-tool-content")?.scrollIntoView({behavior:"smooth",block:"start"}));
  document.getElementById("project-tool-select")?.addEventListener("change",e=>{currentProjectTool=e.target.value;p.projectTools.selectedTool=currentProjectTool;saveProjectTouch(p);renderProjectDetail();});
  document.getElementById("save-fit-check")?.addEventListener("click",saveProjectFitCheck);
  document.getElementById("open-fit-tools")?.addEventListener("click",openProjectFitTools);
  document.querySelectorAll("[data-toolkit-category]").forEach(b=>b.onclick=()=>{p.projectTools.view="category";p.projectTools.category=b.dataset.toolkitCategory;saveProjectTouch(p);renderProjectDetail();});
  document.querySelectorAll("[data-open-project-tool]").forEach(b=>b.onclick=()=>{p.projectTools.view="tool";p.projectTools.selectedTool=b.dataset.openProjectTool;currentProjectTool=b.dataset.openProjectTool;saveProjectTouch(p);renderProjectDetail();});
  document.querySelectorAll("[data-rendering-tab]").forEach(b=>b.onclick=()=>{p.projectTools.view="category";p.projectTools.category="rendering";p.projectTools.selectedTool=b.dataset.renderingTab;currentProjectTool=b.dataset.renderingTab;saveProjectTouch(p);renderProjectDetail();});
  document.querySelectorAll("[data-toolkit-back]").forEach(b=>b.onclick=()=>{const target=b.dataset.toolkitBack;if(target==="home"){p.projectTools.view="home";}else{p.projectTools.view="category";p.projectTools.category=target;}saveProjectTouch(p);renderProjectDetail();});
  document.querySelectorAll("[data-pattern-mode]").forEach(b=>b.onclick=()=>{p.patternPlan.mode=b.dataset.patternMode;saveState();renderProjectDetail();});
  document.getElementById("link-project-tools")?.addEventListener("change", e => { p.projectTools.linked=e.target.checked; saveProjectTouch(p); });
  document.getElementById("project-calculate")?.addEventListener("click", calculateProjectTool);
  document.getElementById("reset-tool-form")?.addEventListener("click",resetCurrentToolForm);
  document.querySelectorAll("[data-calc-key]").forEach(b=>b.onclick=()=>pressBasicCalculator(b.dataset.calcKey));
  document.getElementById("copy-calc-result")?.addEventListener("click",copyToolResult);
  document.getElementById("save-tool-result")?.addEventListener("click",saveToolResultToNotes);
  document.getElementById("add-buy-item")?.addEventListener("click",()=>openBuyItemModal());
  document.querySelectorAll("[data-edit-buy]").forEach(b=>b.onclick=()=>openBuyItemModal(b.dataset.editBuy));
  document.querySelectorAll("[data-delete-buy]").forEach(b=>b.onclick=()=>{p.buyList=p.buyList.filter(i=>i.id!==b.dataset.deleteBuy);saveState();renderProjectDetail();});
  document.querySelectorAll("[data-send-cart]").forEach(b=>b.onclick=()=>sendBuyItemToCart(b.dataset.sendCart));
  document.querySelectorAll("[data-history-note]").forEach(el=>el.oninput=e=>{const item=(p.toolHistory||[]).find(h=>h.id===e.target.dataset.historyNote);if(item){item.notes=e.target.value;saveProjectTouch(p);}});
  document.querySelectorAll("[data-view-history]").forEach(b=>b.onclick=()=>openToolHistoryModal(b.dataset.viewHistory));
  document.querySelectorAll("[data-delete-history]").forEach(b=>b.onclick=()=>{p.toolHistory=(p.toolHistory||[]).filter(h=>h.id!==b.dataset.deleteHistory);saveProjectTouch(p);renderProjectDetail();});
  document.querySelectorAll("[data-duplicate-history]").forEach(b=>b.onclick=()=>{const item=(p.toolHistory||[]).find(h=>h.id===b.dataset.duplicateHistory);if(item){p.toolHistory=[{...structuredClone(item),id:`hist${Date.now()}`,dateCreated:new Date().toISOString()},...(p.toolHistory||[])];saveProjectTouch(p);renderProjectDetail();}});
  document.getElementById("replace-chart")?.addEventListener("click", () => {
    let input = document.getElementById("chart-upload");
    if (!input) { input = document.createElement("input"); input.type = "file"; input.accept = ".pdf,image/*"; input.multiple=true; input.hidden = true; document.body.appendChild(input); }
    input.onchange = e => handleChartFiles(e.target.files); input.click();
  });
  const upload = document.getElementById("chart-upload"); if (upload) upload.onchange = e => handleChartFiles(e.target.files);
  const uploadInline = document.getElementById("chart-upload-inline"); if(uploadInline)uploadInline.onchange=e=>handleChartFiles(e.target.files);
  document.querySelectorAll("[data-project-asset]").forEach(b=>b.onclick=()=>showProjectAsset(b.dataset.projectAsset));
  document.querySelectorAll("[data-delete-chart-asset]").forEach(b=>b.onclick=()=>removeProjectChartAsset(b.dataset.deleteChartAsset));
  bindAnnotationToolbar();
  syncAnnotationSettingsFromProject(p);
  document.getElementById("annotation-color")?.addEventListener("input",e=>setAnnotationSetting("color",e.target.value));
  document.getElementById("annotation-width")?.addEventListener("change",e=>setAnnotationSetting("size",Number(e.target.value)||4));
  document.getElementById("annotation-opacity")?.addEventListener("input",e=>setAnnotationSetting("opacity",Number(e.target.value)||.72));
  document.getElementById("row-mask-color")?.addEventListener("input",e=>{ensureRowMask(p);p.rowMask.color=e.target.value;saveProjectTouch(p);paintRowMask(p);});
  document.getElementById("eraser-mode")?.addEventListener("change",e=>{p.eraserMode=e.target.value;saveProjectTouch(p);});
  document.getElementById("eraser-size")?.addEventListener("input",e=>{p.eraserSize=Number(e.target.value)||28;saveProjectTouch(p);});
  document.getElementById("toggle-mask-position-lock")?.addEventListener("click",()=>{p.maskLockPosition=!p.maskLockPosition;saveProjectTouch(p);renderProjectDetail();});
  document.getElementById("toggle-mask-size-lock")?.addEventListener("click",()=>{p.maskLockSize=!p.maskLockSize;saveProjectTouch(p);renderProjectDetail();});
  document.getElementById("toggle-mask-lock")?.addEventListener("click",()=>{ensureRowMask(p);p.rowMask.locked=!p.rowMask.locked;saveProjectTouch(p);renderProjectDetail();});
  document.getElementById("mask-up")?.addEventListener("click",()=>moveRowMask(-1));
  document.getElementById("mask-down")?.addEventListener("click",()=>moveRowMask(1));
  document.getElementById("mask-cover-done")?.addEventListener("click",coverCompletedRows);
  document.getElementById("clear-mask")?.addEventListener("click",()=>{p.rowMask=null;saveProjectTouch(p);renderProjectDetail();});
  document.querySelectorAll("[data-zoom]").forEach(b=>b.onclick=()=>{p.chartZoom=Math.min(3,Math.max(.5,(p.chartZoom||1)+Number(b.dataset.zoom)));saveProjectTouch(p);renderProjectDetail();});
  bindAnnotationStage();
  document.getElementById("undo-annotation")?.addEventListener("click",undoAnnotation);
  document.getElementById("redo-annotation")?.addEventListener("click",redoAnnotation);
  document.getElementById("clear-annotations")?.addEventListener("click",()=>{pushAnnotationHistory(p);p.annotations=[];p.annotationRedo=[];saveProjectTouch(p);renderProjectDetail();});
  ["project-yarn","project-needles","project-gauge","project-sizing"].forEach(id=>document.getElementById(id)?.addEventListener("input",e=>{const key={ "project-yarn":"yarn","project-needles":"needles","project-gauge":"gauge","project-sizing":"sizingNotes"}[id];p[key]=e.target.value;saveProjectTouch(p);}));
}
function saveProjectFitCheck(){
  const p=getProject();
  const value=id=>document.getElementById(id)?.value?.trim()||"";
  p.fitCheck={
    bodyChest:value("fit-body-chest"),
    finishedChest:value("fit-finished-chest"),
    intendedEase:value("fit-intended-ease"),
    targetLength:value("fit-target-length"),
    currentLength:value("fit-current-length"),
    feeling:value("fit-feeling"),
    notes:value("fit-notes"),
    updatedAt:new Date().toISOString()
  };
  saveProjectTouch(p);
  renderProjectDetail();
  toast("Fit Check saved.");
}
function openProjectFitTools(){
  const p=getProject();
  p.projectTools=p.projectTools||{};
  p.projectTools.category="fit";
  p.projectTools.selectedTool=isGarmentProject(ensureProjectSetup(p).projectType)?"garment":"swatch";
  saveProjectTouch(p);
  renderProjectDetail();
  setTimeout(()=>document.getElementById("project-tool-content")?.scrollIntoView({behavior:"smooth",block:"start"}),0);
}
function bindFlowModeReader(p){
  const num=id=>Number(document.getElementById(id)?.value)||0;
  const value=id=>document.getElementById(id)?.value?.trim()||"";
  const setupForm=()=>normalizeProjectSetup({
    craft:value("flow-setup-craft")||p.projectSetup?.craft,
    projectType:value("flow-project-type")||p.projectSetup?.projectType||"Other",
    patternGauge:value("flow-pattern-gauge"),
    patternToolSize:value("flow-pattern-tool"),
    patternYarnWeight:value("flow-pattern-yarn-weight"),
    userToolSize:value("flow-user-tool"),
    userYarnWeight:value("flow-user-yarn-weight"),
    desiredSize:value("flow-desired-size")||p.projectSetup?.desiredSize||"M",
    customSize:value("flow-custom-size")||p.projectSetup?.customSize||"",
    patternLanguage:value("flow-pattern-language")||p.projectSetup?.patternLanguage||"abbreviations",
    bodyMeasurements:{
      chest:value("flow-body-chest")||p.projectSetup?.bodyMeasurements?.chest||"",
      waist:value("flow-body-waist")||p.projectSetup?.bodyMeasurements?.waist||"",
      hip:value("flow-body-hip")||p.projectSetup?.bodyMeasurements?.hip||"",
      sleeve:value("flow-body-sleeve")||p.projectSetup?.bodyMeasurements?.sleeve||"",
      body:value("flow-body-body")||p.projectSetup?.bodyMeasurements?.body||""
    },
    itemDetails:readFlowSetupDetails(p.projectSetup?.itemDetails||{}),
    updatedAt:new Date().toISOString()
  },p);
  const saveFlowSetup=({render=true}={})=>{
    const setup=setupForm();
    const simpleSetup={
      craft:setup.craft,
      patternGauge:setup.patternGauge,
      updatedAt:new Date().toISOString()
    };
    p.projectSetup=setup;
    p.setup=simpleSetup;
    p.type=setup.craft;
    p.projectKind=setup.projectType;
    p.gauge=setup.patternGauge;
    p.needles=setup.userToolSize||setup.patternToolSize;
    p.yarn=setup.userYarnWeight||setup.patternYarnWeight;
    p.size=isGarmentProject(setup.projectType)?(setup.desiredSize==="Custom"?(setup.customSize||"Custom"):setup.desiredSize):setup.projectType;
    p.sizingNotes=isGarmentProject(setup.projectType)?(setup.customSize||p.size||""):`${setup.projectType} setup saved`;
    p.projectCalculations=calculateFlowProjectPlan(p,setup);
    if(p.projectCalculations?.rowCount){p.chartRows=p.chartRows||p.projectCalculations.rowCount;p.totalRows=p.totalRows||p.projectCalculations.rowCount;}
    saveProjectTouch(p);
    if(render)renderProjectDetail();
  };
  const markFlowSetupUnsaved=()=>{
    const status=document.getElementById("flow-setup-save-status");
    if(status){status.textContent="Unsaved changes";status.classList.remove("saved");status.classList.add("unsaved");}
  };
  const chartSetup=()=>({
    chartType:document.getElementById("flow-chart-type")?.value||p.type||"Unknown",
    readingDirection:document.getElementById("flow-reading-direction")?.value||"auto",
    rowDirection:document.getElementById("flow-row-direction")?.value||p.chartReader?.rowDirection||"alternating-rs-ws",
    readAloud:{
      voiceSpeed:Number(document.getElementById("flow-voice-speed")?.value)||p.chartReader?.readAloud?.voiceSpeed||1,
      language:document.getElementById("flow-voice-language")?.value||p.chartReader?.readAloud?.language||"en",
      mode:document.getElementById("flow-voice-mode")?.value||p.chartReader?.readAloud?.mode||"teaching"
    },
    crop:{
      x:Math.max(0,Math.min(100,num("flow-crop-x"))),
      y:Math.max(0,Math.min(100,num("flow-crop-y"))),
      width:Math.max(1,Math.min(100,num("flow-crop-width")||100)),
      height:Math.max(1,Math.min(100,num("flow-crop-height")||100))
    }
  });
  const gridSetup=()=>({
    x:Math.max(0,Math.min(100,num("flow-grid-x"))),
    y:Math.max(0,Math.min(100,num("flow-grid-y"))),
    width:Math.max(1,Math.min(100,num("flow-grid-width")||100)),
    height:Math.max(1,Math.min(100,num("flow-grid-height")||100)),
    rows:Math.max(0,Math.round(num("flow-grid-rows"))),
    columns:Math.max(0,Math.round(num("flow-grid-columns")))
  });
  document.getElementById("save-flow-chart-setup")?.addEventListener("click",()=>{
    chartImageService.prepare(p,chartSetup());
    saveProjectTouch(p);renderProjectDetail();toast("Chart setup saved.");
  });
  document.getElementById("save-flow-project-setup")?.addEventListener("click",()=>{saveFlowSetup();toast("Project setup saved.");});
  document.getElementById("flow-pattern-language")?.addEventListener("change",()=>{saveFlowSetup();toast("Pattern language saved.");});
  document.getElementById("detect-flow-grid")?.addEventListener("click",()=>{
    chartImageService.prepare(p,chartSetup());
    gridDetectionService.detect(p);
    saveProjectTouch(p);renderProjectDetail();toast("Chart guide prepared.");
  });
  document.getElementById("save-flow-grid")?.addEventListener("click",()=>{
    chartImageService.prepare(p,chartSetup());
    gridDetectionService.saveManual(p,gridSetup());
    saveProjectTouch(p);renderProjectDetail();toast("Chart guide saved.");
  });
  ["flow-setup-craft","flow-project-type","flow-recipient","flow-scarf-style","flow-sock-type","flow-sock-sizing-mode","flow-bag-type","flow-blanket-type","flow-amigurumi-type","flow-safety-recipient","flow-shawl-shape","flow-shawl-fit"].forEach(id=>{
    document.getElementById(id)?.addEventListener("change",()=>{saveFlowSetup();toast("Project setup updated.");});
  });
  ["flow-pattern-gauge","flow-pattern-tool","flow-pattern-yarn-weight","flow-user-tool","flow-user-yarn-weight","flow-custom-size","flow-body-chest","flow-body-waist","flow-body-hip","flow-body-sleeve","flow-body-body"].forEach(id=>{
    document.getElementById(id)?.addEventListener("input",markFlowSetupUnsaved);
  });
  document.getElementById("run-flow-recognition")?.addEventListener("click",()=>{
    chartImageService.prepare(p,chartSetup());
    gridDetectionService.saveManual(p,gridSetup());
    const results=symbolRecognitionService.recognize(p);
    saveProjectTouch(p);renderProjectDetail();
    toast(results.length ? "Chart check ready. Look over anything Yarncha marked for review." : "Add rows or a written row first, then try again.");
  });
  document.getElementById("flow-current-row")?.addEventListener("change",e=>{
    chartImageService.prepare(p,chartSetup());
    setMainRow(Math.max(0,Math.round(Number(e.target.value)||0)));
  });
  document.getElementById("flow-prev-row")?.addEventListener("click",()=>{chartImageService.prepare(p,chartSetup());setMainRow((Number(p.row)||0)-1);});
  document.getElementById("flow-next-row")?.addEventListener("click",()=>{chartImageService.prepare(p,chartSetup());setMainRow((Number(p.row)||0)+1);});
  document.getElementById("flow-row-direction")?.addEventListener("change",()=>{
    chartImageService.prepare(p,chartSetup());
    saveProjectTouch(p);renderProjectDetail();toast("Chart reading direction saved.");
  });
  document.getElementById("flow-align-mask")?.addEventListener("click",()=>{
    chartImageService.prepare(p,chartSetup());
    alignMaskToCurrentRow(p);
    saveProjectTouch(p);renderProjectDetail();toast("Current row shown.");
  });
  document.getElementById("flow-cover-completed")?.addEventListener("click",()=>{
    chartImageService.prepare(p,{...chartSetup(),coverCompletedRows:true});
    coverCompletedRows();
  });
  document.getElementById("flow-clear-cover")?.addEventListener("click",()=>{
    const reader=normalizeChartReaderConfig(p.chartReader,p);
    p.chartReader=normalizeChartReaderConfig({...reader,coverCompletedRows:false},p);
    p.rowMask=null;
    saveProjectTouch(p);renderProjectDetail();toast("Finished-row cover removed.");
  });
  document.getElementById("flow-read-row")?.addEventListener("click",()=>{
    chartImageService.prepare(p,chartSetup());
    readHighlightedRowAloud(p);
  });
  document.getElementById("flow-read-play")?.addEventListener("click",()=>{
    if("speechSynthesis" in window && speechSynthesis.paused)speechSynthesis.resume();
    else readHighlightedRowAloud(p);
  });
  document.getElementById("flow-read-pause")?.addEventListener("click",()=>{"speechSynthesis" in window ? speechSynthesis.pause() : toast("Speech is not supported in this browser.");});
  document.getElementById("flow-read-stop")?.addEventListener("click",()=>{"speechSynthesis" in window ? speechSynthesis.cancel() : toast("Speech is not supported in this browser.");});
  ["flow-voice-speed","flow-voice-language","flow-voice-mode"].forEach(id=>document.getElementById(id)?.addEventListener("change",()=>{
    chartImageService.prepare(p,chartSetup());
    saveProjectTouch(p);renderProjectDetail();toast("Voice settings saved.");
  }));
}
function saveProjectTouch(p){p.updatedAt=new Date().toISOString();saveState();}
function setManualRowFromInput(){const p=getProject(),input=document.getElementById("manual-row-input");if(!input)return;const next=Math.max(0,Math.round(+input.value||0));setMainRow(next);}
function changeMainCounter(delta) {
  const p=getProject();
  setMainRow((Number(p.row)||0)+Number(delta||0));
}
function setMainRow(nextRow,{render=true}={}){
  const p=getProject(),oldRow=Number(p.row)||0;
  let next=Math.max(0,Math.round(Number(nextRow)||0));
  if(p.totalRows)next=Math.min(p.totalRows,next);
  const delta=next-oldRow;
  p.row=next;
  if(delta){
    (p.subCounters||[]).filter(s=>s.linked!==false).forEach(s=>{
      const floor=Math.max(0,Number(s.start)||0);
      s.count=Math.max(floor,(Number(s.count)||0)+delta);
      if(delta>0)s.lastForwardMainRow=next;
    });
  }
  if(normalizeChartReaderConfig(p.chartReader,p).coverCompletedRows)coverCompletedRows({render:false});
  saveProjectTouch(p);
  if(render)renderProjectDetail();
}
function cloneAnnotations(list){return JSON.parse(JSON.stringify(list||[]));}
function pushAnnotationHistory(p){p.annotationHistory=[...(p.annotationHistory||[]),cloneAnnotations(p.annotations)].slice(-40);p.annotationRedo=[];}
function bindAnnotationStage(){
  const stage=document.getElementById("chart-stage");
  if(!stage)return;
  stage.onpointerdown=beginAnnotation;
  stage.onpointermove=moveAnnotation;
  stage.onpointerup=endAnnotation;
  stage.onpointercancel=endAnnotation;
  stage.onpointerleave=endAnnotation;
}
function bindAnnotationToolbar(){
  const toolbar=document.querySelector(".annotation-toolbar");
  if(!toolbar)return;
  toolbar.onclick=event=>{
    const button=event.target.closest?.("button[data-tool]");
    if(!button||button.disabled)return;
    event.preventDefault();
    event.stopPropagation();
    setActiveAnnotationTool(button.dataset.tool);
  };
}
function normalizeAnnotationTool(tool){
  const value=tool==="rowMask"?"row-mask":tool;
  return annotationTools.includes(value)?value:"touch";
}
function setActiveAnnotationTool(tool){
  activeAnnotationTool=normalizeAnnotationTool(tool);
  document.querySelectorAll(".annotation-toolbar button[data-tool]").forEach(button=>{
    const active=button.dataset.tool===activeAnnotationTool;
    button.classList.toggle("active",active);
    button.setAttribute("aria-pressed",String(active));
  });
  document.getElementById("chart-stage")?.setAttribute("data-active-tool",activeAnnotationTool);
  if(typeof window!=="undefined"&&location.hostname==="127.0.0.1")console.debug(`Annotation tool selected: ${activeAnnotationTool}`);
}
const selectAnnotationTool=setActiveAnnotationTool;
function syncAnnotationSettingsFromProject(p=getProject()){
  annotationSettings={color:p.annotationColor||"#d96572",size:Number(p.annotationWidth)||4,opacity:Number(p.annotationOpacity??p.rowMask?.opacity??.72)||.72};
  setActiveAnnotationTool(activeAnnotationTool);
}
function setAnnotationSetting(name,value){
  const p=getProject();
  if(name==="color"){annotationSettings.color=value;p.annotationColor=value;if(p.rowMask)p.rowMask.color=value;}
  if(name==="size"){annotationSettings.size=Number(value)||4;p.annotationWidth=annotationSettings.size;}
  if(name==="opacity"){annotationSettings.opacity=Math.max(.2,Math.min(.95,Number(value)||.72));p.annotationOpacity=annotationSettings.opacity;if(p.rowMask)p.rowMask.opacity=annotationSettings.opacity;paintRowMask(p);}
  saveProjectTouch(p);
  if(typeof window!=="undefined"&&location.hostname==="127.0.0.1")console.debug(`Annotation setting changed: ${name}`);
}
function ensureRowMask(p=getProject()){
  if(!p.rowMask)p.rowMask={type:"row-mask",x:50,y:420,width:900,height:90,color:annotationSettings.color||"#c9a66b",opacity:annotationSettings.opacity??.72,locked:false};
  p.rowMask.type="row-mask";
  return p.rowMask;
}
function pointFromEvent(event){
  const canvas=event.target.closest(".chart-canvas") || document.querySelector("#chart-stage .chart-canvas");
  if(!canvas)return null;
  const rect=canvas.getBoundingClientRect();
  return {
    x:Math.max(0,Math.min(1000,((event.clientX-rect.left)/rect.width)*1000)),
    y:Math.max(0,Math.min(1000,((event.clientY-rect.top)/rect.height)*1000))
  };
}
function beginAnnotation(event){
  if(event.button!==undefined&&event.button!==0)return;
  const p=getProject(),pt=pointFromEvent(event);
  if(!pt)return;
  if(!(p.chart||p.attachments?.length))return;
  if(activeAnnotationTool==="touch"){
    event.preventDefault();
    handleTouchRead(pt);
    return;
  }
  const annId=event.target?.dataset?.annId;
  const arrowHandle=event.target?.dataset?.arrowHandle;
  if(annId){
    const ann=(p.annotations||[]).find(a=>a.id===annId);
    if(ann){
      event.preventDefault();
      p.selectedAnnotationId=annId;
      if(ann.tool==="arrow"){
        arrowDrag={id:annId,mode:arrowHandle||"move",start:pt,original:{...ann}};
        event.currentTarget.setPointerCapture?.(event.pointerId);
      }
      paintAnnotations(p);
      saveStateSoon(180);
      return;
    }
  }
  const maskTarget=event.target.closest?.(".row-mask");
  if(maskTarget&&p.rowMask&&!p.rowMask.locked&&!p.maskLockPosition){
    event.preventDefault();
    const action=event.target.dataset.maskAction || "move";
    maskDrag={action,start:pt,original:{...p.rowMask}};
    event.currentTarget.setPointerCapture?.(event.pointerId);
    return;
  }
  if(activeAnnotationTool==="row-mask"){
    event.preventDefault();
    const m=ensureRowMask(p);
    m.x=Math.max(0,Math.min(900,pt.x-450));m.y=Math.max(0,Math.min(940,pt.y-45));m.width=900;m.height=90;m.color=annotationSettings.color||p.annotationColor||m.color;m.opacity=annotationSettings.opacity??m.opacity??.72;
    saveProjectTouch(p);renderProjectDetail();return;
  }
  p.selectedAnnotationId=null;
  if(["pen","highlighter"].includes(activeAnnotationTool)){
    event.preventDefault();
    pushAnnotationHistory(p);
    drawingStroke={id:`ann${Date.now()}`,tool:activeAnnotationTool,points:[pt],color:annotationSettings.color||p.annotationColor||"#d96572",width:Number(annotationSettings.size)||Number(p.annotationWidth)||4,opacity:activeAnnotationTool==="highlighter"?(annotationSettings.opacity??.38):1};
    p.annotations=[...(p.annotations||[]),drawingStroke];
    event.currentTarget.setPointerCapture?.(event.pointerId);
    scheduleAnnotationPaint(p);
  } else if(activeAnnotationTool==="eraser"){
    event.preventDefault();
    pushAnnotationHistory(p);
    eraseAt(pt,true);
  } else if(activeAnnotationTool==="arrow"){
    event.preventDefault();
    pushAnnotationHistory(p);
    const id=`ann${Date.now()}`;
    const ann={id,tool:"arrow",x1:pt.x,y1:pt.y,x2:Math.min(1000,pt.x+140),y2:Math.max(0,pt.y-90),color:annotationSettings.color||p.annotationColor||"#d96572",width:Number(annotationSettings.size)||Number(p.annotationWidth)||6,opacity:annotationSettings.opacity??1};
    p.annotations=[...(p.annotations||[]),ann];
    p.selectedAnnotationId=id;
    arrowDrag={id,mode:"end",start:pt,original:{...ann}};
    event.currentTarget.setPointerCapture?.(event.pointerId);
    scheduleAnnotationPaint(p);
  } else {
    event.preventDefault();
    pushAnnotationHistory(p);
    const text=activeAnnotationTool==="text"?(prompt("Note text")||"Note"):"";
    const id=`ann${Date.now()}`;
    p.annotations=[...(p.annotations||[]),{id,tool:activeAnnotationTool,x:pt.x,y:pt.y,text,color:annotationSettings.color||p.annotationColor||"#d96572",width:Number(annotationSettings.size)||Number(p.annotationWidth)||10,opacity:annotationSettings.opacity??.9}];
    p.selectedAnnotationId=id;
    paintAnnotations(p);saveProjectTouch(p);
  }
}
function moveAnnotation(event){
  const p=getProject(),pt=pointFromEvent(event);
  if(!pt)return;
  if(!(p.chart||p.attachments?.length))return;
  if(maskDrag&&p.rowMask){
    event.preventDefault();
    updateMaskDrag(p,pt);
    paintRowMask(p);
    return;
  }
  if(arrowDrag){
    event.preventDefault();
    updateArrowDrag(p,pt);
    scheduleAnnotationPaint(p);
    return;
  }
  if(drawingStroke){
    event.preventDefault();
    const last=drawingStroke.points.at(-1);
    if(!last||Math.hypot(pt.x-last.x,pt.y-last.y)>3)drawingStroke.points.push(pt);
    scheduleAnnotationPaint(p);
  } else if(activeAnnotationTool==="eraser"&&event.buttons){
    event.preventDefault();
    eraseAt(pt,true);
  }
}
function endAnnotation(event){
  if(maskDrag){maskDrag=null;saveProjectTouch(getProject());return;}
  if(arrowDrag){arrowDrag=null;saveProjectTouch(getProject());return;}
  if(!drawingStroke)return;
  const p=getProject();
  drawingStroke.points=simplifyStroke(drawingStroke.points);
  drawingStroke=null;
  event.currentTarget?.releasePointerCapture?.(event.pointerId);
  saveProjectTouch(p);
}
function updateArrowDrag(p,pt){
  const ann=(p.annotations||[]).find(a=>a.id===arrowDrag.id);
  if(!ann)return;
  const o=arrowDrag.original,dx=pt.x-arrowDrag.start.x,dy=pt.y-arrowDrag.start.y;
  if(arrowDrag.mode==="start"){ann.x1=Math.max(0,Math.min(1000,o.x1+dx));ann.y1=Math.max(0,Math.min(1000,o.y1+dy));}
  else if(arrowDrag.mode==="end"){ann.x2=Math.max(0,Math.min(1000,o.x2+dx));ann.y2=Math.max(0,Math.min(1000,o.y2+dy));}
  else {ann.x1=Math.max(0,Math.min(1000,o.x1+dx));ann.y1=Math.max(0,Math.min(1000,o.y1+dy));ann.x2=Math.max(0,Math.min(1000,o.x2+dx));ann.y2=Math.max(0,Math.min(1000,o.y2+dy));}
}
function updateMaskDrag(p,pt){
  const m=p.rowMask,o=maskDrag.original,dx=pt.x-maskDrag.start.x,dy=pt.y-maskDrag.start.y,min=32;
  if(maskDrag.action==="move"){m.x=Math.max(0,Math.min(1000-o.width,o.x+dx));m.y=Math.max(0,Math.min(1000-o.height,o.y+dy));return;}
  if(p.maskLockSize)return;
  if(maskDrag.action.includes("e"))m.width=Math.max(min,Math.min(1000-m.x,o.width+dx));
  if(maskDrag.action.includes("s"))m.height=Math.max(min,Math.min(1000-m.y,o.height+dy));
  if(maskDrag.action.includes("w")){const nx=Math.max(0,Math.min(o.x+dx,o.x+o.width-min));m.width=o.width+(o.x-nx);m.x=nx;}
  if(maskDrag.action.includes("n")){const ny=Math.max(0,Math.min(o.y+dy,o.y+o.height-min));m.height=o.height+(o.y-ny);m.y=ny;}
}
function paintRowMask(p){
  const el=document.querySelector("#chart-stage .row-mask"),m=p.rowMask;
  if(!el||!m)return;
  el.style.left=`${m.x/10}%`;el.style.top=`${m.y/10}%`;el.style.width=`${m.width/10}%`;el.style.height=`${m.height/10}%`;el.style.setProperty("--mask-color",m.color||"#c9a66b");el.style.setProperty("--mask-opacity",m.opacity??.72);
}
function alignMaskToCurrentRow(p=getProject()){
  const metrics=chartRowMetrics(p),m=ensureRowMask(p);
  m.x=metrics.x*10;
  m.y=Math.max(0,Math.min(1000,metrics.top*10));
  m.width=metrics.width*10;
  m.height=Math.max(24,metrics.rowHeight*10);
  m.color=annotationSettings.color||p.annotationColor||m.color||"#c9a66b";
  m.opacity=m.opacity??.48;
  return m;
}
function moveRowMask(direction){const p=getProject(),m=ensureRowMask(p),step=chartRowMetrics(p).rowHeight*10;m.y=Math.max(0,Math.min(1000-m.height,m.y+direction*step));saveProjectTouch(p);paintRowMask(p);}
function coverCompletedRows({render=true}={}){
  const p=getProject(),metrics=chartRowMetrics(p),m=ensureRowMask(p),completedHeight=Math.max(0,(metrics.row-1)*metrics.rowHeight*10);
  m.x=metrics.x*10;m.y=metrics.y*10;m.width=metrics.width*10;m.height=Math.min(1000-m.y,completedHeight);
  m.color=annotationSettings.color||p.annotationColor||m.color||"#c9a66b";m.opacity=Math.max(.28,Math.min(.72,annotationSettings.opacity??m.opacity??.42));
  const reader=normalizeChartReaderConfig(p.chartReader,p);
  p.chartReader=normalizeChartReaderConfig({...reader,coverCompletedRows:true},p);
  saveProjectTouch(p);
  if(render)renderProjectDetail();else paintRowMask(p);
}
function paintAnnotations(p){
  const layer=document.querySelector("#chart-stage .annotation-layer");
  if(layer)layer.innerHTML=svgArrowDefs()+(p.annotations||[]).map(a=>annotationSvg(a,p.selectedAnnotationId===a.id)).join("");
}
function scheduleAnnotationPaint(p){
  if(drawingFrame)return;
  drawingFrame=requestAnimationFrame(()=>{drawingFrame=null;paintAnnotations(p);});
}
function simplifyStroke(points){
  if(!points||points.length<3)return points||[];
  const reduced=[points[0]];
  for(let i=1;i<points.length-1;i++){
    const last=reduced[reduced.length-1],next=points[i+1],cur=points[i];
    const line=Math.hypot(next.x-last.x,next.y-last.y)||1;
    const distance=Math.abs((next.y-last.y)*cur.x-(next.x-last.x)*cur.y+next.x*last.y-next.y*last.x)/line;
    if(distance>1.8||Math.hypot(cur.x-last.x,cur.y-last.y)>18)reduced.push(cur);
  }
  reduced.push(points.at(-1));
  return reduced;
}
function eraseAt(pt,deferSave=false){
  const p=getProject(),mode=p.eraserMode||"standard",radius=Number(p.eraserSize)||28;
  let changed=false;
  if(mode==="precise"){
    p.annotations=(p.annotations||[]).map(a=>{
      if(!a.points?.length)return distanceToAnnotation(pt,a)<=radius?null:a;
      const points=a.points.filter(point=>Math.hypot(pt.x-point.x,pt.y-point.y)>radius);
      if(points.length!==a.points.length){changed=true;return points.length>1?{...a,points}:null;}
      return a;
    }).filter(Boolean);
  } else {
    const before=(p.annotations||[]).length;
    p.annotations=(p.annotations||[]).filter(a=>distanceToAnnotation(pt,a)>radius);
    changed=p.annotations.length!==before;
  }
  if(changed){p.selectedAnnotationId=null;scheduleAnnotationPaint(p);if(!deferSave)saveProjectTouch(p);else saveStateSoon(180);}
}
function distanceToAnnotation(pt,a){
  if(a.points?.length)return Math.min(...a.points.map(p=>Math.hypot(pt.x-p.x,pt.y-p.y)));
  if(a.tool==="arrow")return distanceToSegment(pt,{x:a.x1,y:a.y1},{x:a.x2,y:a.y2});
  return Math.hypot(pt.x-(a.x||0),pt.y-(a.y||0));
}
function distanceToSegment(pt,a,b){
  const dx=b.x-a.x,dy=b.y-a.y,len=dx*dx+dy*dy||1;
  const t=Math.max(0,Math.min(1,((pt.x-a.x)*dx+(pt.y-a.y)*dy)/len));
  return Math.hypot(pt.x-(a.x+t*dx),pt.y-(a.y+t*dy));
}
function rowFromTouchPoint(p,pt){
  const rows=Number(p.chartRows||p.chartAnalysis?.detectedRows||p.totalRows)||0;
  if(!rows)return Math.max(1,Number(p.row)||1);
  return Math.max(1,Math.min(rows,Math.ceil((pt.y/1000)*rows)));
}
function handleTouchRead(pt){
  const p=getProject(),rowNumber=rowFromTouchPoint(p,pt),rows=p.chartAnalysis?.rows||[],row=rows.find(r=>Number(r.number)===rowNumber);
  const columnCount=Number(p.chartAnalysis?.columns)||0;
  const column=columnCount?Math.max(1,Math.min(columnCount,Math.ceil((pt.x/1000)*columnCount))):null;
  const status=row?.status==="checked"?"Checked":"Needs review";
  const spoken=row?`Row ${rowNumber}${column?`, column ${column}`:""}. ${row.sequence||"Needs review"}. ${status}.`:`Row ${rowNumber}${column?`, column ${column}`:""}. Needs review.`;
  speak(spoken);
  openTouchReadModal(rowNumber,column,row);
}
function openTouchReadModal(rowNumber,column,row=null){
  openModal(`<p class="eyebrow">TOUCH TO READ</p><h2>${row?.status==="checked"?"Checked row":"Needs review"}</h2><p class="muted-copy">Touched ${column?`row ${rowNumber}, column ${column}`:`row ${rowNumber}`}. Correct the row or symbol, then save it for future reads.</p><div class="form-grid"><div class="field"><label>Row</label><input id="touch-row-number" type="number" min="1" value="${rowNumber}"></div><div class="field"><label>Column / symbol</label><input id="touch-column" value="${column||""}" placeholder="Optional"></div><div class="field full"><label>What should Yarncha read?</label><textarea id="touch-sequence" rows="4" placeholder="e.g. k2, yo, ssk, repeat">${escapeHtml(row?.sequence||"")}</textarea></div><div class="field"><label>Verification</label><select id="touch-status"><option value="uncertain" ${row?.status!=="checked"?"selected":""}>Needs review</option><option value="checked" ${row?.status==="checked"?"selected":""}>Checked by me</option></select></div><div class="field full"><label>Correction destination</label><select id="touch-correction-destination"><option value="flow">Save only as Flow Mode correction</option><option value="database">Save to Symbol Database</option></select></div></div><label class="check-row"><input id="touch-learn-toggle" type="checkbox" checked><span>Learn from this symbol</span></label><p class="privacy-note">Yarncha will remember this symbol for future chart reading. Yarncha remembers your corrections on this device.</p><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-touch-read">Save correction</button></div>`);
  document.getElementById("save-touch-read").onclick=()=>{
    const p=getProject(),a=p.chartAnalysis||(p.chartAnalysis={rows:[],legend:"",detectedRows:null,summary:"Manual touch review started."});
    a.rows ||= [];
    const number=Math.max(1,+document.getElementById("touch-row-number").value||rowNumber),sequence=document.getElementById("touch-sequence").value.trim()||"uncertain",status=document.getElementById("touch-status").value;
    const existing=a.rows.find(r=>Number(r.number)===number);
    const values={number,sequence,status,side:existing?.side||row?.side||"Side uncertain",stitchCount:existing?.stitchCount||null,shaping:existing?.shaping||"No increase/decrease confirmed"};
    if(existing)Object.assign(existing,values);else a.rows.push({id:`analysis-row-${Date.now()}`,...values});
    a.rows.sort((x,y)=>x.number-y.number);
    if(!p.chartRows&&a.detectedRows)p.chartRows=a.detectedRows;
    if(document.getElementById("touch-learn-toggle")?.checked)saveFlowModeCorrection({guess:document.getElementById("touch-column").value.trim(),corrected:sequence,craft:p.type,saveToDatabase:document.getElementById("touch-correction-destination").value==="database",source:"touch-to-read",chartType:p.chartReader?.chartType||p.type,readingDirection:p.chartReader?.readingDirection||"",row:rowNumber,column:column||null});
    saveProjectTouch(p);closeModal();renderProjectDetail();toast("Touch reading saved.");
  };
}
function undoAnnotation(){const p=getProject(),history=p.annotationHistory||[];if(!history.length)return toast("Nothing to undo.");p.annotationRedo=[...(p.annotationRedo||[]),cloneAnnotations(p.annotations)].slice(-40);p.annotations=history.pop();p.annotationHistory=history;p.selectedAnnotationId=null;paintAnnotations(p);saveStateSoon(120);}
function redoAnnotation(){const p=getProject(),redo=p.annotationRedo||[];if(!redo.length)return toast("Nothing to redo.");p.annotationHistory=[...(p.annotationHistory||[]),cloneAnnotations(p.annotations)].slice(-40);p.annotations=redo.pop();p.annotationRedo=redo;p.selectedAnnotationId=null;paintAnnotations(p);saveStateSoon(120);}
function buildRowGuidance(p) {
  const analysed=p.chartAnalysis?.rows?.find(r=>Number(r.number)===p.row);
  const linked = p.subCounters.filter(s=>s.linked).map(s=>`${s.name} is at repeat ${s.count}, advancing every ${s.every} rows.`).join(" ");
  const marker = p.markers.filter(m=>m.row===p.row).map(m=>`${m.color} marker here.`).join(" ");
  const rowText=analysed?`${analysed.side||"Side uncertain"}. ${analysed.sequence||"Sequence uncertain"}. Stitch count ${analysed.stitchCount||"uncertain"}. ${analysed.shaping||""}`:"No checked written instruction is saved for this row.";
  return `${chartReadingContext(p)} ${rowText} ${linked} ${marker} ${p.notes ? `Project note: ${p.notes}` : "Check the highlighted chart row."}`.trim();
}
function chartReadingContext(p){
  const reader=normalizeChartReaderConfig(p.chartReader,p),metrics=chartRowMetrics(p),direction={ "left-to-right":"left to right", "right-to-left":"right to left", "alternating-rs-ws":"alternating rows", round:"in the round" }[reader.rowDirection]||"alternating rows";
  return `You are following row ${p.row}${metrics.rows?` of ${metrics.rows}`:""}. Read this chart ${direction}.`;
}
function highlightedRowAnalysis(p=getProject()){
  return p.chartAnalysis?.rows?.find(r=>Number(r.number)===Number(p.row))||null;
}
function highlightedRowRecognition(p=getProject()){
  return normalizeChartReaderConfig(p.chartReader,p).recognitionResults.filter(cell=>Number(cell.row)===Number(p.row));
}
function highlightedRowConfidence(p=getProject()){
  const analysed=highlightedRowAnalysis(p);
  if(analysed?.status==="checked")return "High";
  const cells=highlightedRowRecognition(p);
  if(cells.length&&cells.every(cell=>cell.confidenceLabel==="High"||Number(cell.confidence)>=78))return "High";
  if(cells.some(cell=>cell.confidenceLabel==="Low"||Number(cell.confidence)<55)||analysed?.status==="uncertain")return "Low";
  return "Low";
}
function readHighlightedRowAloud(p=getProject()){
  const reader=normalizeChartReaderConfig(p.chartReader,p);
  p.chartReader=reader;saveProjectTouch(p);
  const confidence=highlightedRowConfidence(p);
  if(confidence!=="High"){
    return speakFlowRow("Please check this row before Yarncha reads it aloud.", reader);
  }
  speakFlowRow(buildHighlightedRowSpeech(p,reader), reader);
}
function buildHighlightedRowSpeech(p=getProject(),reader=normalizeChartReaderConfig(p.chartReader,p)){
  const analysed=highlightedRowAnalysis(p),side=analysed?.side||inferRowSide(p,reader),sequence=analysed?.sequence||highlightedRowRecognition(p).map(cell=>cell.candidates?.[0]?.abbreviation||cell.detectedSymbol||"unknown").join(" ");
  const spoken=sequenceToSpokenInstructions(sequence,reader,p.type);
  return flowLocalizedSpeech(`Row ${p.row}, ${side}. ${spoken}`, reader);
}
function inferRowSide(p,reader){
  if(reader.rowDirection==="round")return "round";
  if(reader.rowDirection==="alternating-rs-ws")return Number(p.row)%2?"right side":"wrong side";
  return reader.rowDirection.replace(/-/g," ");
}
function sequenceToSpokenInstructions(sequence="",reader=normalizeChartReaderConfig(getProject().chartReader,getProject()),craft="Knitting"){
  const mode=reader.readAloud.mode;
  return String(sequence).split(/[\s,;]+/).filter(Boolean).map(token=>spokenSymbolPhrase(token,{mode,craft})).join(", ") || "No checked written instruction is saved for this row.";
}
function spokenSymbolPhrase(token,{mode="teaching",craft="Knitting"}={}){
  const clean=String(token||"").trim(),lower=clean.toLowerCase(),match=matchSymbolKnowledge({guess:clean,craft});
  const common={k:"knit",knit:"knit",p:"purl",purl:"purl",yo:"yarn over",ssk:"slip slip knit",k2tog:"knit 2 together",p2tog:"purl 2 together",ch:"chain",sc:"single crochet",dc:"double crochet",hdc:"half double crochet",tr:"treble crochet",slst:"slip stitch",sl:"slip stitch",inc:"increase",dec:"decrease",rep:"repeat",repeat:"repeat"};
  const name=match?.nameEn||common[lower]||clean;
  const abbr=match?.abbreviation||clean;
  if(mode==="short")return abbr;
  if(mode==="beginner"&&match?.beginnerExplanation)return `${name}, ${match.beginnerExplanation}`;
  if(/\d/.test(clean)&&!match)return clean.replace(/([a-zA-Z]+)(\d+)/g,(_,a,n)=>`${common[a.toLowerCase()]||a} ${n}`);
  return name;
}
function flowLocalizedSpeech(text,reader){
  if(reader.readAloud.language==="zh-Hant")return text.replace(/^Row /,"第 ").replace(/, /," 行，").replace(/right side/,"正面").replace(/wrong side/,"反面").replace(/round/,"圈").replace(/repeat/g,"重複").replace(/knit/g,"織下針").replace(/purl/g,"織上針").replace(/yarn over/g,"掛針");
  if(reader.readAloud.language==="yue")return text.replace(/^Row /,"第 ").replace(/, /," 行，").replace(/right side/,"正面").replace(/wrong side/,"反面").replace(/round/,"圈").replace(/repeat/g,"重複").replace(/knit/g,"織低針").replace(/purl/g,"織高針").replace(/yarn over/g,"掛針");
  return text;
}
function speakFlowRow(text,reader=normalizeChartReaderConfig(getProject().chartReader,getProject())){
  if (!("speechSynthesis" in window)) return toast("Speech is not supported in this browser.");
  speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.rate=reader.readAloud.voiceSpeed;
  utterance.lang=reader.readAloud.language==="en"?"en-US":"zh-HK";
  speechSynthesis.speak(utterance);
}
function calculatorValueList(data={}){
  return Object.entries(data).map(([key,value])=>`<div><span>${escapeHtml(key.replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase()))}</span><strong>${escapeHtml(typeof value==="object"?JSON.stringify(value):String(value))}</strong></div>`).join("");
}
function calculatorFormulaList(list=[]){
  return list.map(item=>`<li><code>${escapeHtml(item)}</code></li>`).join("");
}
function calculatorResultHtml(calc){
  if(!calc)return `<p>Your result will appear here.</p>`;
  const warning=calc.warning?`<p class="calc-warning">${escapeHtml(calc.warning)}</p>`:"";
  return `<article class="calc-result-card" data-calculator-version="${escapeHtml(calc.version||"")}"><div class="calc-result-top"><div><p class="eyebrow">${escapeHtml(calc.name||"Calculator result")}</p><h3>${escapeHtml(calc.summary||"Result ready")}</h3></div><span class="confidence-pill ${Number(calc.confidence)<90?"needs-check":"strong"}">Confidence ${Math.round(Number(calc.confidence)||0)}%</span></div>${warning}<details open><summary>Formula and variables</summary><ol class="formula-list">${calculatorFormulaList(calc.formula)}</ol><div class="math-grid"><h4>Variables</h4>${calculatorValueList(calc.variables)}<h4>Intermediate calculations</h4>${calculatorValueList(calc.intermediates)}<h4>Final result</h4>${calculatorValueList(calc.outputs)}</div></details>${(calc.notes||[]).length?`<ul class="calc-notes">${calc.notes.map(n=>`<li>${escapeHtml(n)}</li>`).join("")}</ul>`:""}</article>`;
}
function calculatorPlainText(calc){
  if(!calc)return "";
  const lines=[calc.summary||"", calc.warning||"", "Formula:", ...(calc.formula||[]).map(f=>`- ${f}`), "Variables:", JSON.stringify(calc.variables||{},null,2), "Intermediate calculations:", JSON.stringify(calc.intermediates||{},null,2), "Final result:", JSON.stringify(calc.outputs||{},null,2)];
  return lines.filter(Boolean).join("\n");
}
function engineResultForCurrentTool(){
  const engine=window.YarnchaCalculatorEngine;
  if(!engine)return null;
  const n=id=>+valueOf(id)||0;
  const text=id=>valueOf(id);
  const craft=normalizeProjectType(getProject()?.type||"");
  if(currentProjectTool==="swatch")return engine.gaugeSwatchAdapter({patternStitches:n("g-pattern-st"),patternRows:n("g-pattern-row"),userStitches:n("g-user-st"),userRows:n("g-user-row"),patternCount:n("g-original-st"),patternRowCount:n("g-original-row")});
  if(currentProjectTool==="tool-adjust")return engine.needleHookAdjustment({craft,currentToolMm:n("adj-user-tool"),targetGauge:n("adj-pattern-gauge"),currentGauge:n("adj-user-gauge")});
  if(currentProjectTool==="garment")return engine.garmentSectionResizer({originalStitches:n("garment-original-st"),repeatMultiple:n("garment-repeat"),leftSection:n("garment-left"),centreSection:n("garment-centre"),rightSection:n("garment-right"),desiredStitches:n("garment-desired"),keepSymmetry:text("garment-symmetry")!=="no",keepMultiple:text("garment-multiple")!=="no"});
  if(currentProjectTool==="yarn-estimator")return engine.yarnEstimator({kind:text("yarn-kind"),size:text("yarn-size"),weight:text("yarn-weight-tool"),lengthPerSkein:n("yarn-length"),weightPerSkein:n("yarn-ball-weight"),patternAmount:n("yarn-pattern-amount"),modificationPercent:n("yarn-mod"),ownedSkeins:n("yarn-owned")});
  if(currentProjectTool==="cast-on")return engine.castOnCalculator({width:n("simple-width"),gauge:n("simple-gauge"),multiple:n("simple-multiple"),edge:n("simple-edge"),gaugeSpan:state.unitSystem==="imperial"?4:10});
  if(currentProjectTool==="shaping")return engine.increaseDecreasePlanner({current:n("shape-current"),desired:n("shape-desired"),row:n("shape-row")});
  if(currentProjectTool==="repeat")return engine.repeatCalculator({total:n("repeat-total"),repeat:n("repeat-size"),edge:n("repeat-edge")});
  if(currentProjectTool==="row-helper")return engine.rowRoundHelper({current:n("row-current"),total:n("row-total"),repeat:n("row-repeat")});
  if(currentProjectTool==="basic")return engine.basicCalculator({expression:document.getElementById("calc-display")?.textContent||"0"});
  if(currentProjectTool==="hat")return engine.hatBeanie({headCircumference:n("hat-circ"),negativeEasePercent:n("hat-ease"),stitchGauge:n("hat-gauge"),style:"fitted"});
  if(currentProjectTool==="sock")return engine.sockCalculator({footCircumference:n("sock-circ"),stitchGauge:n("sock-gauge"),negativeEasePercent:n("sock-ease"),footLength:n("sock-length")});
  if(currentProjectTool==="circle")return engine.flatCircleCalculator({startStitches:n("circle-start"),rounds:n("circle-rounds"),stitchType:text("circle-stitch")});
  if(currentProjectTool==="amigurumi")return engine.amigurumiShapeGuide({shape:text("ami-shape"),baseStitches:n("ami-base"),increaseRounds:n("ami-rounds"),straightRounds:n("ami-straight"),chainLength:n("ami-chain")});
  if(currentProjectTool==="granny")return engine.grannySquarePlanner({targetSize:n("granny-target"),sizePerRound:n("granny-size"),joiningAllowance:n("granny-join"),blanketWidth:n("granny-width"),blanketLength:n("granny-length")});
  if(currentProjectTool==="c2c")return engine.c2cBlanketCalculator({width:n("c2c-width"),height:n("c2c-height"),blockSize:n("c2c-block"),yarnPerBlock:n("c2c-yarn")});
  if(currentProjectTool==="sleeve")return engine.sleeveCalculator({startStitches:n("sleeve-start"),endStitches:n("sleeve-end"),rowsAvailable:n("sleeve-rows")});
  if(currentProjectTool==="raglan")return engine.raglanCalculator({neckStitches:n("raglan-neck"),targetStitches:n("raglan-target"),increasePerRound:n("raglan-inc")});
  if(currentProjectTool==="blanket")return engine.blanketCalculator({width:n("blanket-width"),length:n("blanket-height"),stitchGauge:n("blanket-st"),rowGauge:n("blanket-row"),yarnPerTenByTen:n("blanket-yarn")});
  if(currentProjectTool==="grid")return engine.gridGenerator({width:n("grid-width"),height:n("grid-height"),craftType:text("grid-craft"),symbolSet:text("grid-symbols"),colors:n("grid-colors")});
  if(currentProjectTool==="stripe")return engine.stripeGenerator({direction:text("stripe-direction"),totalRows:n("stripe-total"),colors:n("stripe-colors")});
  if(currentProjectTool==="pooling")return engine.colorPoolingPlanner({colorRepeatLength:n("pool-repeat"),stitchesPerRepeat:n("pool-stitches"),rowWidth:n("pool-row-width")});
  if(currentProjectTool==="blocking")return engine.blockingCalculator({beforeWidth:n("block-width"),beforeLength:n("block-height"),afterWidth:text("block-after-width"),afterLength:text("block-after-height"),growthPercent:text("block-growth")});
  if(currentProjectTool==="unit")return engine.unitConvert(n("unit-amount"),text("unit-from"),text("unit-to"));
  if(currentProjectTool==="substitution")return engine.yarnSubstitution({patternLength:n("sub-pattern-length"),substituteLength:n("sub-new-length"),patternBalls:n("sub-pattern-balls"),gaugeDifferencePercent:n("sub-gauge-diff")});
  if(currentProjectTool==="yarn-leftover")return engine.yarnLeftoverEstimator({leftoverWeight:n("leftover-weight"),originalSkeinWeight:n("leftover-skein-weight"),originalSkeinLength:n("leftover-skein-length")});
  if(currentProjectTool==="yarn-weight")return engine.yarnWeightConverter({grams:n("tw-grams"),length:n("tw-yards"),wpi:n("tw-wpi")});
  return null;
}
function calculateProjectToolWithEngine(p,linked){
  let calc;
  try{calc=engineResultForCurrentTool();}catch(error){toast(error.message||"Check the calculator inputs.");return true;}
  if(!calc)return false;
  const saved={...calc.variables,result:calc.summary,calculator:calc,outputs:calc.outputs,confidence:calc.confidence};
  if(currentProjectTool==="garment"){
    p.patternPlan={mode:"modified",originalSt:saved.originalStitches,modifiedSt:saved.desiredStitches,newLeft:calc.outputs.left,newCentre:calc.outputs.centre,newRight:calc.outputs.right,result:calc.summary};
  }
  const box=document.getElementById("project-tool-result");
  if(box)box.innerHTML=`${calculatorResultHtml(calc)}${toolResultActionsHtml(currentProjectTool)}`;
  bindToolResultActions();
  if(linked){p.projectTools[currentProjectTool]=saved;p.projectTools.selectedTool=currentProjectTool;saveProjectTouch(p);}
  return true;
}
function calculateProjectTool() {
  const p=getProject(), linked=document.getElementById("link-project-tools")?.checked ?? true;
  let result="",saved={};
  const positive=(...nums)=>nums.every(n=>Number.isFinite(n)&&n>0);
  if(calculateProjectToolWithEngine(p,linked))return;
  if(["cast-on","sock","circle","amigurumi","granny","c2c","hat","sleeve","raglan","blanket","grid","stripe","pooling","blocking"].includes(currentProjectTool)){
    const n=id=>+valueOf(id)||0;
    if(currentProjectTool==="cast-on"){const width=n("simple-width"),g=n("simple-gauge"),m=Math.max(1,Math.round(n("simple-multiple")||1)),edge=Math.max(0,Math.round(n("simple-edge")||0));const raw=Math.round(width*g/10);const adjusted=Math.ceil(Math.max(0,raw-edge)/m)*m+edge;result="Cast on about "+adjusted+" stitches. Raw gauge count is "+raw+"; rounded to multiple "+m+" plus "+edge+" edge stitches.";saved={width,gauge:g,multiple:m,edge,result};}
    if(currentProjectTool==="sock"){const circ=n("sock-circ"),g=n("sock-gauge"),ease=n("sock-ease"),length=n("sock-length");const sts=Math.round(circ*(1-ease/100)*g/10/4)*4;result="Sock cast-on: about "+sts+" stitches. Heel flap often starts with half the stitches ("+Math.round(sts/2)+"). Check foot length "+length+" in your unit before toe shaping.";saved={circ,gauge:g,ease,length,result};}
    if(currentProjectTool==="circle"){const start=Math.max(1,Math.round(n("circle-start"))),rounds=Math.max(1,Math.round(n("circle-rounds"))),st=valueOf("circle-stitch");const seq=Array.from({length:rounds},(_,i)=>"R"+(i+1)+": "+(start*(i+1))+" "+st).join("; ");result="Flat circle guide: "+seq+". Stagger increases if corners appear.";saved={start,rounds,stitch:st,result};}
    if(currentProjectTool==="amigurumi"){const shape=valueOf("ami-shape"),base=Math.max(1,Math.round(n("ami-base"))),rounds=Math.max(1,Math.round(n("ami-rounds")));result=shape+" guide: increase by about "+base+" stitches each round for "+rounds+" round(s), then work even or decrease symmetrically depending on the shape. Mark this as a draft and test the fabric.";saved={shape,base,rounds,result};}
    if(currentProjectTool==="granny"){const width=n("granny-width"),size=n("granny-size"),yarn=n("granny-yarn"),count=Math.ceil(width/size),total=count*count;result="Plan "+count+" x "+count+" squares = "+total+" squares. Estimated yarn before joining: "+Math.round(total*yarn)+" length/weight units. Add joining/border allowance.";saved={width,size,yarn,result};}
    if(currentProjectTool==="c2c"){const w=n("c2c-width"),h=n("c2c-height"),block=n("c2c-block"),yarn=n("c2c-yarn"),bw=Math.ceil(w/block),bh=Math.ceil(h/block),blocks=bw*bh;result="C2C plan: about "+bw+" blocks wide x "+bh+" blocks tall = "+blocks+" blocks. Estimated yarn: "+Math.round(blocks*yarn)+" units.";saved={w,h,block,yarn,result};}
    if(currentProjectTool==="hat"){const circ=n("hat-circ"),ease=n("hat-ease"),g=n("hat-gauge"),fit=circ*(1-ease/100),sts=Math.round(fit*g/10),crown=(circ/Math.PI).toFixed(1);result="Hat target circumference: "+fit.toFixed(1)+". Start around "+sts+" stitches. Crown diameter reference: about "+crown+".";saved={circ,ease,gauge:g,result};}
    if(currentProjectTool==="sleeve"){const start=n("sleeve-start"),end=n("sleeve-end"),rows=n("sleeve-rows"),change=Math.abs(start-end),every=change?Math.max(1,Math.floor(rows/change)):0;result="Sleeve shaping: "+(start>end?"decrease":"increase")+" "+change+" stitch(es) over "+rows+" rows, about every "+(every||"no")+" row(s).";saved={start,end,rows,result};}
    if(currentProjectTool==="raglan"){const neck=n("raglan-neck"),target=n("raglan-target"),inc=Math.max(1,n("raglan-inc")),rounds=Math.ceil(Math.max(0,target-neck)/inc);result="Raglan draft: need about "+rounds+" increase round(s). Start "+neck+", target "+target+", increasing "+inc+" stitches per increase round.";saved={neck,target,inc,result};}
    if(currentProjectTool==="blanket"){const w=n("blanket-width"),h=n("blanket-height"),st=n("blanket-st"),row=n("blanket-row"),y=n("blanket-yarn"),sts=Math.round(w*st/10),rows=Math.round(h*row/10),yarn=Math.round((w*h/100)*y*1.1);result="Blanket plan: "+sts+" stitches x "+rows+" rows. Estimated yarn with 10% buffer: "+yarn+" units.";saved={w,h,st,row,yarn,result};}
    if(currentProjectTool==="grid"){const w=n("grid-width"),h=n("grid-height"),st=n("grid-st"),row=n("grid-row");result="Grid size: "+Math.round(w*st/10)+" columns x "+Math.round(h*row/10)+" rows.";saved={w,h,st,row,result};}
    if(currentProjectTool==="stripe"){const dir=valueOf("stripe-direction"),total=Math.max(1,Math.round(n("stripe-total"))),colors=Math.max(1,Math.round(n("stripe-colors"))),each=Math.floor(total/colors),rem=total%colors;result=dir+": use about "+each+" rows/stitches per colour across "+colors+" colours"+(rem?", with "+rem+" extra row/stitch(es) to distribute":"")+".";saved={dir,total,colors,result};}
    if(currentProjectTool==="pooling"){const repeat=n("pool-repeat"),sts=n("pool-stitches");result="Pooling draft: "+repeat+" length units per colour repeat and about "+sts+" stitches per repeat. Colour matching recommendations will be expanded later. Swatch before trusting the plan.";saved={repeat,sts,result};}
    if(currentProjectTool==="blocking"){const w=n("block-width"),h=n("block-height"),growth=n("block-growth");result="After blocking estimate: width "+(w*(1+growth/100)).toFixed(1)+", height "+(h*(1+growth/100)).toFixed(1)+". Growth depends on fibre and stitch pattern.";saved={w,h,growth,result};}
  } else   if(currentProjectTool==="swatch"){
    const patternSt=+valueOf("g-pattern-st"),patternRows=+valueOf("g-pattern-row"),userSt=+valueOf("g-user-st"),userRows=+valueOf("g-user-row"),originalSt=+valueOf("g-original-st"),originalRows=+valueOf("g-original-row");
    if(!positive(patternSt,patternRows,userSt,userRows,originalSt,originalRows))return toast("Enter positive gauge and pattern numbers.");
    const adjustedSt=Math.round(originalSt*userSt/patternSt),adjustedRows=Math.round(originalRows*userRows/patternRows),stDiff=Math.abs(userSt-patternSt)/patternSt,rowDiff=Math.abs(userRows-patternRows)/patternRows;
    const warning=(stDiff>.1||rowDiff>.1)?"Warning: your gauge differs by more than 10%, so changing needle/hook size and swatching again is safer.":stDiff>.05||rowDiff>.05?"Small gauge difference: this adjustment can work, but check the finished size.":"Gauge is close.";
    const direction=userSt>patternSt?"Your stitches are smaller/denser, so try a larger needle or hook if you want to match the pattern.":"Your stitches are larger/looser, so try a smaller needle or hook if you want to match the pattern.";
    result=`Adjusted stitch count: about ${adjustedSt}. Adjusted row count: about ${adjustedRows}. ${warning} ${direction}`;
    saved={patternSt,patternRows,userSt,userRows,originalSt,originalRows,result};
  } else if(currentProjectTool==="shaping"){
    const current=Math.round(+valueOf("shape-current")),desired=Math.round(+valueOf("shape-desired")),row=Math.round(+valueOf("shape-row"));
    if(!positive(current,desired)||current===desired)return toast("Enter two different positive stitch counts.");
    const change=Math.abs(desired-current),action=desired>current?"increase":"decrease",interval=Math.max(1,Math.floor(current/change)),remainder=current%change;
    result=`At row/round ${row}, ${action} ${change} stitch(es). Work one ${action} about every ${interval} stitches${remainder?`, spacing ${remainder} sections slightly farther apart`:""}. Count again at the end of the row.`;
    saved={current,desired,row,result};
  } else if(currentProjectTool==="garment"){
    const originalSt=+valueOf("garment-original-st"),repeat=Math.max(1,Math.round(+valueOf("garment-repeat"))),left=Math.round(+valueOf("garment-left")),centre=Math.round(+valueOf("garment-centre")),right=Math.round(+valueOf("garment-right")),desired=+valueOf("garment-desired"),symmetry=valueOf("garment-symmetry"),multiple=valueOf("garment-multiple");
    if(!positive(originalSt,repeat,desired)||left<0||centre<0||right<0)return toast("Enter positive garment numbers.");
    const totalSections=left+centre+right;if(!totalSections)return toast("The left, centre and right sections need a total.");
    let compatible=multiple==="yes"?Math.max(repeat,Math.round(desired/repeat)*repeat):Math.round(desired);
    let newLeft=Math.round(compatible*(left/totalSections)),newRight=Math.round(compatible*(right/totalSections)),newCentre=compatible-newLeft-newRight;
    if(symmetry==="yes"){const side=Math.max(0,Math.round(((newLeft+newRight)/2)/repeat)*repeat||Math.round((newLeft+newRight)/2));newLeft=newRight=side;newCentre=compatible-newLeft-newRight;if(newCentre<0){newLeft=newRight=Math.floor(compatible/3);newCentre=compatible-newLeft-newRight;}}
    result=`Suggested sections: left ${newLeft}, centre/back ${newCentre}, right ${newRight}. Repeat-compatible stitch count: ${compatible}. ${newLeft!==newRight?"Symmetry warning: left and right do not match.":"Symmetry looks balanced."} Beginner note: keep edge stitches and repeat multiples visible in your written notes before you start.`;
    saved={originalSt,repeat,left,centre,right,desired,symmetry,multiple,result};
    p.patternPlan={mode:"modified",originalSt,originalGroups:totalSections,left,centre,right,modifiedSt:desired,newLeft,newCentre,newRight,result};
  } else if(currentProjectTool==="tool-adjust"){
    const patternTool=+valueOf("adj-pattern-tool"),userTool=+valueOf("adj-user-tool"),patternGauge=+valueOf("adj-pattern-gauge"),userGauge=+valueOf("adj-user-gauge"),desiredSize=+valueOf("adj-desired-size"),currentSize=+valueOf("adj-current-size");
    if(!positive(patternTool,userTool,patternGauge,userGauge,desiredSize,currentSize))return toast("Enter positive tool, gauge and size values.");
    const sizeChange=(patternGauge/userGauge)*desiredSize,delta=sizeChange-desiredSize,diff=Math.abs(patternGauge-userGauge)/patternGauge;
    const suggestion=userGauge<patternGauge?"Your gauge is looser, so try a smaller needle/hook.":"Your gauge is tighter, so try a larger needle/hook.";
    result=`Likely finished size: about ${sizeChange.toFixed(1)} in your chosen unit (${delta>=0?"+":""}${delta.toFixed(1)} from target). ${Math.abs(delta)>desiredSize*.05?"Warning: likely too big/small. ":""}${suggestion} ${diff>.08?"Make a new swatch before continuing.":"Difference is moderate; still check after blocking."}`;
    saved={patternTool,userTool,patternGauge,userGauge,desiredSize,currentSize,result};
  } else if(currentProjectTool==="yarn-estimator"){
    const kind=valueOf("yarn-kind"),size=valueOf("yarn-size"),weight=valueOf("yarn-weight-tool"),length=+valueOf("yarn-length"),ballWeight=+valueOf("yarn-ball-weight"),patternAmount=+valueOf("yarn-pattern-amount"),mod=+valueOf("yarn-mod"),owned=+valueOf("yarn-owned");
    if(!positive(length,ballWeight,patternAmount))return toast("Enter positive yarn values.");
    const margin=["Sweater","Blanket","Shawl","Custom dimension"].includes(kind) ? .18 : (["Hat / beanie","Scarf","Socks pair","Gloves pair","Amigurumi"].includes(kind) ? .12 : .15),total=patternAmount*(1+mod/100)*(1+margin),balls=Math.ceil(total/length),leftover=balls*length-total,buy=Math.max(0,balls-owned);
    result=`Estimated total yarn needed: ${Math.round(total)} length units. Suggested balls/skeins to buy: ${buy} (${balls} total needed, ${owned} already owned). Estimated leftover: ${Math.max(0,Math.round(leftover))}. Safety margin used: ${Math.round(margin*100)}%. Yarn usage varies by gauge, stitch pattern, yarn weight, hook/needle size, ease, and personal tension.`;
    saved={kind,size,weight,length,ballWeight,patternAmount,mod,owned,result};
  } else if(currentProjectTool==="budget"){
    const yarnPrice=+valueOf("budget-yarn-price"),balls=+valueOf("budget-balls"),supplies=+valueOf("budget-supplies"),items=Math.max(1,+valueOf("budget-items")||1),leftover=+valueOf("budget-leftover");
    if(yarnPrice<0||balls<0||supplies<0||leftover<0)return toast("Budget values cannot be negative.");
    const yarnCost=yarnPrice*balls,total=yarnCost+supplies,costPer=total/items,leftoverValue=leftover*yarnPrice,buyList=(p.buyList||[]).reduce((s,i)=>s+i.quantity*i.price,0);
    result=`Yarn cost: $${yarnCost.toFixed(2)}. Supplies cost: $${supplies.toFixed(2)}. Total project cost: $${total.toFixed(2)}. Cost per finished item: $${costPer.toFixed(2)}. Leftover yarn value: about $${leftoverValue.toFixed(2)}. Current project buy list total: $${buyList.toFixed(2)}.`;
    saved={yarnPrice,balls,supplies,items,leftover,result};
  } else if(currentProjectTool==="repeat"){
    const total=+valueOf("repeat-total"),repeat=+valueOf("repeat-size"),edge=+valueOf("repeat-edge");
    if(!positive(total,repeat)||edge<0||edge>=total)return toast("Enter a total larger than edge stitches.");
    const workable=total-edge,full=Math.floor(workable/repeat),remain=workable%repeat;
    result=`After setting aside ${edge} edge stitch(es), you can fit ${full} full repeat(s) of ${repeat}. Remainder: ${remain}. ${remain?"Adjust stitch count or edge stitches before starting.":"No remainder."}`;
    saved={total,repeat,edge,result};
  } else if(currentProjectTool==="row-helper"){
    const current=+valueOf("row-current"),total=+valueOf("row-total"),repeat=+valueOf("row-repeat");
    if(!positive(total,repeat)||current<0)return toast("Enter positive row numbers.");
    const percent=Math.min(100,Math.round(current/total*100)),next=Math.ceil((current+1)/repeat)*repeat;
    result=`Progress: ${percent}%. Next repeat checkpoint: row/round ${next}. Rows/rounds left: ${Math.max(0,total-current)}.`;
    saved={current,total,repeat,result};
  } else if(currentProjectTool==="substitution"){
    const patternLength=+valueOf("sub-pattern-length"),newLength=+valueOf("sub-new-length"),patternBalls=+valueOf("sub-pattern-balls"),gaugeDiff=+valueOf("sub-gauge-diff");
    if(!positive(patternLength,newLength,patternBalls))return toast("Enter positive yarn substitution values.");
    const neededLength=patternLength*patternBalls*(1+Math.max(0,gaugeDiff)/100),newBalls=Math.ceil(neededLength/newLength);
    result=`Pattern yarn total: ${Math.round(patternLength*patternBalls)} length units. With gauge buffer: ${Math.round(neededLength)}. Buy about ${newBalls} substitute balls/skeins. Check fibre, drape, elasticity and washed gauge before committing.`;
    saved={patternLength,newLength,patternBalls,gaugeDiff,result};
  } else if(currentProjectTool==="yarn-weight"){
    const grams=+valueOf("tw-grams"),yards=+valueOf("tw-yards"),wpi=+valueOf("tw-wpi");
    if(!positive(grams,yards)&&!positive(wpi))return toast("Enter grams/yards or WPI.");
    let index,method;
    if(wpi){index=wpi>=30?0:wpi>=20?1:wpi>=14?2:wpi>=11?3:wpi>=9?4:wpi>=6?5:6;method=`${wpi} WPI`;}
    else {const y100=yards/grams*100;index=y100>=600?0:y100>=430?1:y100>=300?2:y100>=210?3:y100>=140?4:y100>=90?5:6;method=`${Math.round(y100)} yards per 100 g`;}
    const row=yarnWeights[index];result=`Estimated yarn category: ${row.name} / CYC ${row.cyc}, from ${method}. Typical needles: ${row.needles}; hooks: ${row.hooks}. Use this as a starting point, then swatch.`;
    saved={grams,yards,wpi,result};
  } else if(currentProjectTool==="unit"){
    const amount=+valueOf("unit-amount"),from=valueOf("unit-from"),to=valueOf("unit-to"),table=from in lengthUnits?lengthUnits:weightUnits;
    if(!(to in table))return toast("Choose compatible From and To units.");
    const base=amount*table[from],converted=base/table[to];
    result=`${amount} ${from} = ${Number(converted.toPrecision(6))} ${to}.`;
    saved={amount,from,to,result};
  }
  document.getElementById("project-tool-result").innerHTML=`<p>${escapeHtml(result)}</p>${toolResultActionsHtml(currentProjectTool)}`;
  bindToolResultActions();
  if(linked){p.projectTools[currentProjectTool]=saved;p.projectTools.selectedTool=currentProjectTool;saveProjectTouch(p);}
}
function toolResultActionsHtml(toolId=currentProjectTool){
  const def=toolkitToolDefs.find(t=>t.id===toolId)||{};
  return `<div class="tool-result-actions"><button class="mini-button" id="copy-calc-result">Copy Result</button><button class="mini-button" id="save-tool-result">Save to Notes</button><button class="mini-button" id="link-tool-result">Link to Project</button><button class="mini-button" id="link-result-idea">Link to Idea</button><button class="mini-button" id="save-result-idea">Save as Project Idea</button>${def.buyList?`<button class="mini-button" id="add-result-buy-list">Add to Buy List</button>`:""}</div>`;
}
function bindToolResultActions(){
  document.getElementById("copy-calc-result")?.addEventListener("click",copyToolResult);
  document.getElementById("save-tool-result")?.addEventListener("click",saveToolResultToNotes);
  document.getElementById("link-tool-result")?.addEventListener("click",openProjectLinkModal);
  document.getElementById("link-result-idea")?.addEventListener("click",openIdeaLinkModal);
  document.getElementById("save-result-idea")?.addEventListener("click",saveToolResultAsIdea);
  document.getElementById("add-result-buy-list")?.addEventListener("click",addCurrentToolResultToBuyList);
}
function currentToolPayload(){
  const p=getProject();
  const stored=p.projectTools?.[currentProjectTool]||{};
  const text=stored.calculator?calculatorPlainText(stored.calculator):(document.getElementById("project-tool-result")?.textContent.trim()||"");
  const def=toolkitToolDefs.find(t=>t.id===currentProjectTool)||{};
  return {id:`hist${Date.now()}`,toolId:currentProjectTool,toolName:def.name||currentProjectTool,craftType:def.crafts?.includes("Knitting")?"Knitting":def.crafts?.includes("Crochet")?"Crochet":"Shared",dateCreated:new Date().toISOString(),inputs:stored.calculator?.variables||stored.inputs||{},outputs:{result:text,summary:stored.result||"",calculator:stored.calculator||null,values:stored.outputs||{}},notes:"",linkedProject:currentProjectId};
}
function openProjectLinkModal(){
  const payload=currentToolPayload();
  if(!payload.outputs.result)return toast("Calculate a result first.");
  const recent=[...state.projects].sort((a,b)=>new Date(b.updatedAt||0)-new Date(a.updatedAt||0)).slice(0,3);
  openModal(`<p class="eyebrow">LINK CALCULATOR RESULT</p><h2>Save to project history</h2><p class="muted-copy">Choose where this result should live. It will not change the project automatically.</p><div class="project-selector-list"><h3>Current project</h3><button class="notion-row" data-link-tool-project="${getProject().id}"><div>□</div><div><strong>${escapeHtml(getProject().name)}</strong><p>Current project</p></div></button><h3>Recent projects</h3>${recent.map(p=>`<button class="notion-row" data-link-tool-project="${p.id}"><div>□</div><div><strong>${escapeHtml(p.name)}</strong><p>${escapeHtml(p.type)}</p></div></button>`).join("")}<h3>All projects</h3>${state.projects.map(p=>`<button class="notion-row" data-link-tool-project="${p.id}"><div>□</div><div><strong>${escapeHtml(p.name)}</strong><p>${escapeHtml(p.type)}</p></div></button>`).join("")}</div>`);
  document.querySelectorAll("[data-link-tool-project]").forEach(b=>b.onclick=()=>{saveToolResultToProject(b.dataset.linkToolProject,payload);closeModal();});
}
function saveToolResultToProject(projectId,payload=currentToolPayload()){
  const project=state.projects.find(p=>p.id===projectId);
  if(!project)return toast("Project not found.");
  project.toolHistory=[payload,{...payload,id:`hist${Date.now()}`,linkedProject:projectId},...(project.toolHistory||[])].slice(1,80);
  saveProjectTouch(project);toast("Saved to project tool history.");
}
function saveToolResultAsIdea(){
  const payload=currentToolPayload();
  if(!payload.outputs.result)return toast("Calculate a result first.");
  const title=(payload.toolName||"Project idea")+" idea";
  const idea=normalizeProjectIdea({id:`idea${Date.now()}`,title,craftType:payload.craftType||"Mixed / Other",projectKind:guessIdeaKind(payload),inspirationNotes:payload.outputs.result,description:payload.outputs.result,sourcePlatform:"Calculator",sourceTool:payload.toolName,calculatorValues:payload,savedCalculatorResults:[payload],yarnEstimate:/yarn|blanket|budget|substitution/i.test(payload.toolName)?payload.outputs.result:"",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),archived:false});
  state.projectIdeas=[idea,...(state.projectIdeas||[])];
  const section=state.librarySections.find(s=>s.id==="ideas");
  if(section)section.items=[{id:idea.id,name:idea.title,notes:idea.inspirationNotes,craft:payload.craftType},...(section.items||[])];
  saveState();toast("Saved as project idea.");
}
function guessIdeaKind(payload={}){
  const text=`${payload.toolName||""} ${payload.outputs?.result||""}`.toLowerCase();
  if(/blanket/.test(text))return "Blanket";
  if(/sweater|garment|raglan|sleeve/.test(text))return "Sweater";
  if(/hat|beanie/.test(text))return "Hat / beanie";
  if(/sock/.test(text))return "Socks pair";
  if(/amigurumi/.test(text))return "Amigurumi";
  if(/shawl/.test(text))return "Shawl";
  if(/scarf|pooling/.test(text))return "Scarf";
  return "Custom idea";
}
function openIdeaLinkModal(){
  const payload=currentToolPayload();
  if(!payload.outputs.result)return toast("Calculate a result first.");
  const ideas=(state.projectIdeas||[]).filter(i=>!i.archived);
  if(!ideas.length)return toast("Create or save a project idea first.");
  openModal(`<p class="eyebrow">LINK TO IDEA</p><h2>Add this calculator result to an idea</h2><p class="muted-copy">This keeps the result with the inspiration board. It will not create or change a project.</p><div class="project-selector-list">${ideas.map(idea=>`<button class="notion-row" data-link-tool-idea="${idea.id}"><div>✦</div><div><strong>${escapeHtml(idea.title)}</strong><p>${escapeHtml(idea.craftType)} · ${escapeHtml(idea.projectKind)}</p></div></button>`).join("")}</div>`);
  document.querySelectorAll("[data-link-tool-idea]").forEach(b=>b.onclick=()=>{const idea=state.projectIdeas.find(i=>i.id===b.dataset.linkToolIdea);if(!idea)return;idea.savedCalculatorResults=[payload,...(idea.savedCalculatorResults||[])];idea.calculatorValues=payload;idea.sourceTool=payload.toolName;idea.updatedAt=new Date().toISOString();saveState();closeModal();toast("Linked to project idea.");});
}
function addCurrentToolResultToBuyList(){
  const p=getProject(),payload=currentToolPayload();
  if(!payload.outputs.result)return toast("Calculate a result first.");
  const isYarn=/yarn|blanket|substitution|estimator/i.test(payload.toolName||"");
  openModal(`<p class="eyebrow">BUY LIST</p><h2>Add this to Buy List?</h2><p class="muted-copy">Nothing is added until you confirm. The project Buy List total updates immediately after saving.</p><div class="form-grid"><div class="field full"><label>Item name</label><input id="buy-from-tool-name" value="${escapeHtml(isYarn?"Yarn for "+payload.toolName:"Supply for "+payload.toolName)}"></div><div class="field"><label>Category</label><select id="buy-from-tool-category"><option ${isYarn?"selected":""}>Yarn</option><option>Tools</option><option>DIY kits</option><option ${!isYarn?"selected":""}>Other</option></select></div><div class="field"><label>Quantity</label><input id="buy-from-tool-qty" type="number" step="0.1" value="1"></div><div class="field"><label>Estimated price</label><input id="buy-from-tool-price" type="number" step="0.01" value="0"></div><div class="field full"><label>Notes</label><textarea id="buy-from-tool-notes" rows="4">${escapeHtml(payload.outputs.result)}</textarea></div></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="confirm-buy-from-tool">Add to Buy List</button></div>`);
  document.getElementById("confirm-buy-from-tool").onclick=()=>{p.buyList=[...(p.buyList||[]),{id:`buy${Date.now()}`,name:document.getElementById("buy-from-tool-name").value.trim()||payload.toolName,category:document.getElementById("buy-from-tool-category").value,quantity:Number(document.getElementById("buy-from-tool-qty").value)||1,price:Number(document.getElementById("buy-from-tool-price").value)||0,notes:document.getElementById("buy-from-tool-notes").value}];saveProjectTouch(p);closeModal();toast("Added to Buy List.");renderProjectDetail();};
}
function valueOf(id){return document.getElementById(id)?.value||"";}
function saveToolResultToNotes(){
  const p=getProject(),text=document.getElementById("project-tool-result")?.textContent.trim();
  if(!text||text==="Your result will appear here.")return toast("Calculate a result first.");
  const tool=toolkitToolDefs.find(t=>t.id===currentProjectTool)?.name||"Toolkit";
  p.notes=`${p.notes||""}${p.notes?"\n\n":""}[${tool}] ${text}`;
  saveProjectTouch(p);toast("Saved to project notes");
}
function copyToolResult(){
  const text=document.getElementById("project-tool-result")?.textContent.trim()||document.getElementById("calc-display")?.textContent.trim()||"";
  if(navigator.clipboard?.writeText){
    navigator.clipboard.writeText(text).then(()=>toast("Copied result")).catch(()=>toast("Copy is blocked in this browser. Select the result and copy it manually."));
  }else toast("Copy is blocked in this browser. Select the result and copy it manually.");
}
function pressBasicCalculator(key){
  const p=getProject(),display=document.getElementById("calc-display");
  let expr=display?.textContent||"0";
  if(key==="C"||key==="Clear")expr="0";
  else if(key==="Back")expr=expr.length>1?expr.slice(0,-1):"0";
  else if(key==="="){
    try{
      const calc=window.YarnchaCalculatorEngine.basicCalculator({expression:expr});
      expr=String(calc.outputs.result).replace(/\.0+$/,"");
      p.projectTools.basic={expression:expr,result:calc.summary,calculator:calc,outputs:calc.outputs,confidence:calc.confidence};
      document.getElementById("project-tool-result").innerHTML=`${calculatorResultHtml(calc)}${toolResultActionsHtml(currentProjectTool)}`;bindToolResultActions();
      saveProjectTouch(p);
    }catch{return toast("That calculation could not be read.");}
  } else {
    const normalized=key==="+"?"+":key==="-"?"−":key==="x"?"×":key==="/"?"÷":key;
    expr=expr==="0"&&/[0-9.]/.test(normalized)?normalized:expr+normalized;
  }
  if(display)display.textContent=expr;
}
const projectReferenceData={
  "Knitting":[
    ["Socks","baby to adult; foot length based","fingering to DK","250-450 yd","Measure foot length and add negative ease."],
    ["Beanies / Hats","baby to adult XL; head circumference ranges","DK to bulky","120-250 yd","Hat fit depends on stretch and brim depth."],
    ["Cowls","single loop to long wrap","DK to bulky","200-600 yd","Check finished circumference before casting on."],
    ["Scarves","narrow to oversized","fingering to bulky","300-900 yd","Length is flexible; texture changes yarn use."],
    ["Shawls","small neck scarf to large wrap","lace to DK","400-1200 yd","Lace and garter use very different yardage."],
    ["Mittens / Gloves","child to adult","sport to worsted","120-350 yd","Fingers and thumbs add yarn and fit complexity."],
    ["Sweaters / Cardigans","baby to adult; bust/chest based","sport to bulky","900-2200 yd","Ease and construction affect fit heavily."],
    ["Dresses / Tops / Vests","bust/chest and length based","fingering to worsted","600-2200 yd","Swatch, block, and compare drape before resizing."]
  ],
  "Crochet":[
    ["Amigurumi","mini to large plush","sport to worsted","50-500 yd","Use smaller hooks for tight fabric and stuffing control."],
    ["Bags","small pouch to market tote","cotton DK to bulky","200-800 yd","Firm fabric and handles need extra structure."],
    ["Granny blankets","baby to bed size","DK to worsted","900-4000 yd","Motif count and joining method change yardage."],
    ["Tops / Dresses / Cardigans","body measurements and ease based","fingering to worsted","700-2400 yd","Crochet fabric can be heavier; check drape."],
    ["Shawls","small triangle to large wrap","lace to DK","400-1400 yd","Open lace may use less yarn but grows with blocking."]
  ],
  "Tunisian Crochet":[
    ["Scarves / Cowls","neckwear sizes","DK to bulky","300-900 yd","Tunisian fabric can curl; plan borders or blocking."],
    ["Blankets","baby to throw","DK to bulky","1200-4500 yd","Dense fabric often needs more yarn than standard crochet."],
    ["Bags","small to tote","cotton DK to bulky","250-900 yd","Dense structure is useful but can get heavy."],
    ["Tops / Cardigans / Shawls","body or wrap measurements","sport to worsted","800-2400 yd","Drape depends strongly on hook size and stitch."]
  ],
  "Mixed / Other":[
    ["Small accessories","case, pouch, sampler","varies","50-300 yd","Start with a small safety margin."],
    ["Wearables","top, vest, cardigan, mixed media","varies","700-2400 yd","Use the closest craft reference and swatch."],
    ["Home projects","blanket, runner, wall textile","varies","800-4500 yd","Large flat pieces need generous yarn margin."]
  ]
};
function sizeReferenceHtml(type){
  const rows=projectReferenceData[type]||projectReferenceData["Mixed / Other"];
  return `<div class="reference-disclaimer">Yarn usage varies by gauge, stitch pattern, yarn weight, hook/needle size, ease, and personal tension. Use these as planning ranges, not promises.</div><div class="size-reference-list">${rows.map(([project,size,weight,amount,note])=>`<article class="reference-row"><h3>${escapeHtml(project)}</h3><p><strong>Common sizes:</strong> ${escapeHtml(size)}</p><p><strong>Typical yarn weight:</strong> ${escapeHtml(weight)}</p><p><strong>Approx. yarn amount:</strong> ${escapeHtml(amount)}</p><small>${escapeHtml(note)}</small></article>`).join("")}</div>`;
}
function askProjectAssistant() {
  const p=getProject(), input=document.getElementById("assistant-question"), question=input.value.trim(); if(!question)return;
  p.assistantMessages.push({role:"user",text:question});
  const reference=findPdfReference(`${p.pdfReference||""}\n\n${techniqueKnowledgeText()}`,question,p.row);
  const calculation=/group|stitch|chain|panel|组|针|锁针|花样|グループ|目|鎖編み|パネル/i.test(question)&&p.patternPlan?.result?` Saved checked calculation: ${p.patternPlan.result}`:"";
  const chartContext=chartReadingContext(p),rowQuestion=/what row|which row|what.*next|do next|where am i|row am i|下一|下一步|第幾|做咩|做什么/i.test(question);
  const chinese=/[\u3400-\u9fff]|唔|嘅|咩|點|係|喺|冇|嗰|佢/.test(question),context=chinese?`你目前在第 ${p.row} 行${p.chartRows?`，圖表共有 ${p.chartRows} 行`:""}。${chartContext} `:`You are on row ${p.row}${p.chartRows?` of a ${p.chartRows}-row chart`:""}. ${chartContext} `;
  if(rowQuestion){
    const guidance=buildRowGuidance(p);
    p.assistantMessages.push({role:"assistant",text:chinese?`${context}${guidance}`:`${context}${guidance}`}); saveState(); renderProjectDetail(); return;
  }
  const answer=reference ? (chinese?`${context}我在已上載檔案的文字中找到：「${reference}」${calculation?` 已儲存的核對計算：${p.patternPlan.result}`:""} 請同時對照目前反白的圖表行及你的專案筆記。`:`${context}I found this in the uploaded PDF text: “${reference}”${calculation} Check it against the highlighted chart row and your project notes.`)
    : /repeat|重複|重复|循環|循环|リピート/i.test(question) ? (chinese?`${context}請檢查重複段落的起點、終點及已連結的副計數器。已擷取文字中暫時找不到相符指示。`:`${context}Check the repeat boundary and your linked sub-counters. I could not find a matching instruction in the extracted PDF text.`)
    : (chinese?`${context}${calculation?`已儲存的核對計算：${p.patternPlan.result}`:"我已儲存這條問題，但在已擷取文字中找不到接近的內容。"} 純圖像符號仍須在 ChatGPT 中作視覺分析和人工核對。`:`${context}${calculation||"I saved this question, but could not find a close match in the extracted PDF text."} Image-only symbols still need visual analysis in ChatGPT.`);
  p.assistantMessages.push({role:"assistant",text:answer}); saveState(); renderProjectDetail();
}
function findPdfReference(text,question,row){
  if(!text)return "";
  const chunks=text.split(/(?<=[.!?])\s+|\n+/).filter(s=>s.trim().length>12);
  const glossary={chain:["chain","ch","锁针","辫子针","鎖編み","くさり編み"],row:["row","行","段","列","段目"],repeat:["repeat","重复","反复","繰り返し","リピート"],increase:["increase","加针","増し目"],decrease:["decrease","减针","減らし目"],shell:["shell","贝壳花","扇形花","シェル"]};
  const q=question.toLowerCase(),terms=[`row ${row}`,`第${row}行`,`第${row}段`,`${row}段目`,String(row),...(q.match(/[\p{L}\p{N}]+/gu)||[]).filter(w=>w.length>1)];
  Object.values(glossary).forEach(words=>{if(words.some(w=>q.includes(w.toLowerCase())))terms.push(...words);});
  const ranked=chunks.map(s=>({s:s.trim(),score:terms.reduce((n,t)=>n+(s.toLowerCase().includes(t.toLowerCase())?1:0),0)})).sort((a,b)=>b.score-a.score);
  return ranked[0]?.score>0?ranked[0].s.slice(0,600):"";
}
function techniqueKnowledgeText(){
  const legacy=state.librarySections.find(s=>s.id==="personal-references");
  const items=(legacy?.items||[]).map(i=>`Personal reference: ${i.name}. ${i.craft||""}. ${i.notes||""}`).join("\n");
  const saved=(state.techniqueKnowledge||[]).map(i=>`${i.name}: ${i.text}`).join("\n");
  return [items,saved].filter(Boolean).join("\n");
}
function openInChatGPT() {
  const p=getProject();if(!state.aiAccessConfirmed)return openAiAccessModal();
  if(p.chatPreference==="ask")return openChatPreferenceModal();
  launchChatGPT(p);
}
function openAiAccessModal(){
  openModal(`<p class="eyebrow">AI ACCOUNT REQUIRED</p><h2>Connect through your own ChatGPT account</h2><p>Yarncha does not collect your password and cannot see whether another website has authenticated you. Sign in to ChatGPT first, then confirm here before sending project context.</p><div class="privacy-note">Only the text shown in the handoff prompt is sent when you open ChatGPT. Uploaded files remain on this device unless you personally attach them there.</div><div class="modal-actions"><button class="secondary-button" id="open-ai-login">Open ChatGPT sign-in</button><button class="primary-button" id="confirm-ai-login">I am signed in</button></div>`);
  document.getElementById("open-ai-login").onclick=()=>window.open("https://chatgpt.com/auth/login","_blank","noopener");
  document.getElementById("confirm-ai-login").onclick=()=>{state.aiAccessConfirmed=true;saveState();closeModal();openInChatGPT();};
}
function launchChatGPT(p){
  const question=document.getElementById("assistant-question")?.value.trim() || p.assistantMessages.filter(m=>m.role==="user").at(-1)?.text || "Please help me understand my current chart row.";
  const plan=p.patternPlan?.result||"No modification calculation saved.";
  const prompt=`I am working on a ${p.type} project called "${p.name}". Reply in the language and register used by my question. Fully support English, Traditional Chinese (Hong Kong), written Cantonese, Simplified Chinese, and Japanese craft terminology. I am at row ${p.row}${p.chartRows?` of ${p.chartRows}`:""}. Project notes: ${p.notes||"none"}. Saved proportion calculation: ${plan}. Extracted PDF reference: ${(p.pdfReference||"none").slice(0,5000)}. Question: ${question}. Check every arithmetic step, repeat count, stitch multiple, edge stitch and panel total. Clearly separate facts from assumptions, and flag any chart symbol or scan detail that cannot be read confidently.`;
  window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,"_blank","noopener");
}
function openChatPreferenceModal(){const p=getProject();openModal(`<p class="eyebrow">CHAT ORGANISATION</p><h2>How should this open?</h2><p>Browsers cannot reliably reopen one exact ChatGPT conversation, but Yarncha can keep one in-app history per project or treat each handoff separately.</p><div class="form-grid"><button class="secondary-button" id="chat-same">Keep one project history</button><button class="secondary-button" id="chat-separate">Separate handoffs</button></div><label class="check-row"><input id="remember-chat-choice" type="checkbox"> Remember for this project</label>`);document.getElementById("chat-same").onclick=()=>finishChatChoice("same");document.getElementById("chat-separate").onclick=()=>finishChatChoice("separate");function finishChatChoice(choice){if(document.getElementById("remember-chat-choice").checked)p.chatPreference=choice;saveState();closeModal();launchChatGPT(p);}}
function handleChart(file) {
  if (!file) return;
  if (file.size > 3_500_000) return toast("Please choose a chart smaller than 3.5 MB for this local version.");
  const reader = new FileReader();
  reader.onload = async () => {
    const p = getProject(); p.chart = { name:file.name, type:file.type, data:reader.result };
    if(file.type==="application/pdf"){
      toast("Reading text from the PDF…");
      const extracted=await extractPdfText(file);
      if(extracted)p.pdfReference=extracted;
    }
    saveState(); renderProjectDetail(); toast(p.pdfReference?"Chart added and PDF text indexed":"Chart added to your project");
  };
  reader.readAsDataURL(file);
}
async function handleChartFiles(fileList){
  const files=[...fileList];if(!files.length)return;
  const p=getProject(),total=files.reduce((s,f)=>s+f.size,0);if(total>80_000_000)return toast("Please keep each selection below 80 MB.");
  p.readerStatus=`Saving ${files.length} pattern file(s) locally…`;saveState();renderProjectDetail();
  const allText=[];
  let lastSource=null;
  for(const file of files){
    const id=`asset${Date.now()}${Math.random().toString(16).slice(2)}`;await putAsset(id,file);p.attachments.push({id,name:file.name,type:file.type,size:file.size});
    p.activeChartAssetId=id;
    chartImageService.prepare(p,{chartType:p.chartReader?.chartType||p.type||"Unknown",readingDirection:p.chartReader?.readingDirection||"auto"});
    window.YarnchaCloud?.queueChartUpload?.(p.id,id,file);
    if(!p.chart){p.chart={name:file.name,type:file.type,data:null,assetId:id};}
    p.patternSource=normalizePatternSource({type:"none",fileType:fileTypeForPattern(file),originalFileBlobId:id,ocrStatus:"scanning",workspaceMode:"og-visual"},p);
    saveProjectTouch(p);
    const scan=await scanPatternFile(file,p.patternSource.scanSettings);
    const sourceType=classifyPatternSource(scan.text,file,scan.status);
    lastSource=normalizePatternSource({
      type:sourceType,
      fileType:fileTypeForPattern(file),
      originalFileBlobId:id,
      extractedText:scan.text,
      ocrConfidence:scan.confidence,
      ocrStatus:scan.status,
      selectedPages:scan.pages.map(page=>page.pageNumber).filter(Boolean),
      pageModes:Object.fromEntries(scan.pages.map(page=>[page.pageNumber,sourceType])),
      workspaceMode:workspaceModeForPatternType(sourceType),
      scanSettings:p.patternSource.scanSettings
    },p);
    p.patternSource=lastSource;
    if(scan.text){allText.push(scan.text);}
  }
  const reviewedText=p.patternSource?.userCorrectedText||p.patternSource?.extractedText||"";
  if(reviewedText)p.pdfReference=`${p.pdfReference}\n\nSOURCE: ${p.attachments.at(-1)?.name||"Pattern upload"}\n${reviewedText}`.trim();
  p.chartAnalysis=analysePatternText(allText.join("\n"));
  if(!p.chartRows&&p.chartAnalysis.detectedRows)p.chartRows=p.chartAnalysis.detectedRows;
  p.readerStatus=allText.length ? `Pattern saved. Please review the scanned text before using it.` : `Pattern saved. Manual Reading Mode is still available.`;
  p.activeTab="chart";saveProjectTouch(p);renderProjectDetail();showProjectAsset(p.activeChartAssetId||p.attachments.at(-1).id);toast("Chart saved for Reading Mode");
  if(lastSource)setTimeout(()=>openPatternSourceReviewModal(lastSource.originalFileBlobId),150);
}
function fileTypeForPattern(file={}){
  const type=String(file.type||"").toLowerCase(),name=String(file.name||"").toLowerCase();
  if(type.includes("pdf")||name.endsWith(".pdf"))return "pdf";
  if(type.startsWith("image/")||/\.(png|jpe?g|webp|gif)$/i.test(name))return "image";
  if(name.endsWith(".docx"))return "docx";
  if(type.startsWith("text/")||name.endsWith(".txt"))return "text";
  return "none";
}
function workspaceModeForPatternType(type){
  return type==="written-pattern"?"reading-text":type==="mixed"?"mixed":type==="visual-chart"?"og-visual":"og-visual";
}
function classifyPatternSource(text="",file={},status="success"){
  if(status==="failed")return "visual-chart";
  const clean=String(text||"").trim();
  if(!clean)return "visual-chart";
  const rowLines=(clean.match(/(?:^|\n)\s*(?:row|round|rnd|第)?\s*\d{1,4}\s*(?:[:：.)]|行|段|圈)/gim)||[]).length;
  const words=(clean.match(/[A-Za-z\u3400-\u9fff]{2,}/g)||[]).length;
  if(words>90||rowLines>=5)return "written-pattern";
  if(words>18||rowLines>=2)return "mixed";
  return "visual-chart";
}
function analysePatternText(text){
  const clean=text.replace(/\s+/g," ").trim(),rowMatches=[...clean.matchAll(/(?:row|round|rnd|第)\s*([0-9]{1,4})(?:\s*(?:行|段|圈|段目))?/gi)].map(m=>+m[1]).filter(n=>n>0&&n<2000);
  const lineMatches=[...text.matchAll(/(?:^|\n)\s*(?:row|round|rnd|第)?\s*([0-9]{1,4})\s*(?:[:：.)]|行|段|圈|段目)\s*([^\n]{3,180})/gim)];
  const detectedRows=rowMatches.length?Math.max(...rowMatches):null;
  const rowSamples=lineMatches.slice(0,10).map(m=>`Row ${m[1]}: ${m[2].trim()}`);
  const rows=lineMatches.slice(0,200).map((m,index)=>{const sequence=m[2].trim(),tokens=sequence.split(/[\s,;]+/).slice(0,8),matches=tokens.map(token=>matchSymbolKnowledge({guess:token})).filter(Boolean);return{id:`analysis-row-${Date.now()}-${index}`,number:+m[1],side:+m[1]%2?"Right side (inferred)":"Wrong side (inferred)",sequence,stitchCount:null,shaping:/inc|increase|加针|加針|増し目/i.test(m[2])?"Possible increase":/dec|decrease|减针|減針|減らし目/i.test(m[2])?"Possible decrease":"No increase/decrease detected",status:"uncertain",symbolSuggestions:matches.map(item=>({symbolId:item.id,nameEn:item.nameEn,abbreviation:item.abbreviation,source:item.source||"symbol-database",verificationStatus:item.verificationStatus,confidence:item.confidence||70}))};});
  const languages=[/[\u3040-\u30ff]/.test(text)?"Japanese":null,/[\u3400-\u9fff]/.test(text)?"Chinese":null,/[A-Za-z]{4}/.test(text)?"English":null].filter(Boolean);
  const repeats=(clean.match(/repeat|重複|重复|繰り返し|リピート/gi)||[]).length;
  const suggestionCount=rows.reduce((sum,row)=>sum+(row.symbolSuggestions?.length||0),0);
  return {detectedRows,rowSamples,rows,legend:"",columns:null,gridStatus:"Row numbering needs manual confirmation.",summary:`Confidence: ${rowSamples.length?"Medium":"Low"}. Chart file saved. ${suggestionCount} symbol suggestion${suggestionCount===1?"":"s"} came from Yarncha's local symbol knowledge. ${rowSamples.length?"Some row-like text was found, but please review it manually.":"Row numbering is unclear."} Recommendation: use OG Chart Mode and verify rows yourself.`};
}
const chartImageService={
  prepare(project,updates={}){
    const reader=normalizeChartReaderConfig(project.chartReader,project);
    const activeAssetId=project.activeChartAssetId||project.chart?.assetId||project.attachments?.[0]?.id||"";
    project.chartReader=normalizeChartReaderConfig({
      ...reader,
      ...updates,
      activeAssetId,
      updatedAt:new Date().toISOString()
    },project);
    return project.chartReader;
  }
};
const gridDetectionService={
  detect(project){
    const reader=normalizeChartReaderConfig(project.chartReader,project);
    const rows=Number(project.chartAnalysis?.detectedRows)||Number(project.chartRows)||Number(project.totalRows)||reader.grid.rows||0;
    const columns=Number(project.chartAnalysis?.columns)||reader.grid.columns||inferColumnCount(project);
    const rowNumbers=rows?Array.from({length:Math.min(rows,300)},(_,i)=>i+1):[];
    const columnNumbers=columns?Array.from({length:Math.min(columns,200)},(_,i)=>i+1):[];
    const status=rows&&columns?"Grid draft detected from row/column hints. Please review the crop and adjust manually if cells do not line up.":"Auto-detection needs user confirmation. Add row and column counts manually.";
    project.chartReader=normalizeChartReaderConfig({...reader,grid:{...reader.grid,rows,columns,rowNumbers,columnNumbers,manualAdjusted:false,status},updatedAt:new Date().toISOString()},project);
    if(!project.chartAnalysis)project.chartAnalysis={rows:[],legend:"",detectedRows:rows||null,columns:columns||null,gridStatus:status,summary:"Flow Mode grid preparation started."};
    project.chartAnalysis.detectedRows=rows||project.chartAnalysis.detectedRows;
    project.chartAnalysis.columns=columns||project.chartAnalysis.columns;
    project.chartAnalysis.gridStatus=status;
    return project.chartReader.grid;
  },
  saveManual(project,gridUpdates={}){
    const reader=normalizeChartReaderConfig(project.chartReader,project),grid={...reader.grid,...gridUpdates,manualAdjusted:true,status:"Manual grid saved. Yarncha will use these rows and columns for review."};
    grid.rowNumbers=grid.rows?Array.from({length:Math.min(grid.rows,300)},(_,i)=>i+1):[];
    grid.columnNumbers=grid.columns?Array.from({length:Math.min(grid.columns,200)},(_,i)=>i+1):[];
    project.chartReader=normalizeChartReaderConfig({...reader,grid,updatedAt:new Date().toISOString()},project);
    return project.chartReader.grid;
  }
};
const symbolRecognitionService={
  recognize(project){
    const reader=normalizeChartReaderConfig(project.chartReader,project);
    const cells=buildChartCells(project,reader).slice(0,80);
    const results=cells.map(cell=>{
      const candidates=rankSymbolCandidates(cell,reader.chartType).slice(0,3);
      const best=candidates[0]||{nameEn:"Needs user confirmation",abbreviation:cell.detectedSymbol||"",confidence:20,confidenceLabel:"Low",source:"unmatched"};
      return {
        ...cell,
        candidates,
        confidence:best.confidence,
        confidenceLabel:confidenceLabel(best.confidence),
        source:best.source||"symbol knowledge",
        explanation:chartReasoningService.explainCandidate({candidate:best,cell,chartType:reader.chartType,readingDirection:reader.readingDirection})
      };
    });
    project.chartReader=normalizeChartReaderConfig({...reader,recognitionResults:results,lastExplanation:results[0]?.explanation||"",updatedAt:new Date().toISOString()},project);
    project.chartAnalysis=project.chartAnalysis||{rows:[],legend:"",detectedRows:reader.grid.rows||null,columns:reader.grid.columns||null,gridStatus:"Recognition draft created.",summary:"Flow Mode recognition draft needs review."};
    project.chartAnalysis.summary=`Confidence: ${results.some(r=>r.confidenceLabel==="High")?"Medium":"Low"}. ${results.length} chart cell${results.length===1?"":"s"} prepared for review. Needs user confirmation before read aloud or final pattern output.`;
    return results;
  }
};
const chartReasoningService={
  explainCandidate({candidate={},cell={},chartType="Unknown",readingDirection="auto"}={}){
    const notes=[];
    if(candidate.source)notes.push(`source: ${candidate.source}`);
    if(candidate.verificationStatus==="Manually Verified")notes.push("you manually verified this symbol before");
    if(candidate.symbolImageAsset)notes.push("it has an uploaded symbol picture reference");
    if(chartType==="Knitting")notes.push(Number(cell.row)%2?"RS row rule checked":"WS row rule checked");
    if(chartType==="Crochet")notes.push(readingDirection==="round"?"crochet round direction checked":"crochet chart direction checked");
    if(chartType==="Tunisian Crochet")notes.push("Tunisian forward/return pass context checked");
    if(/no\s*-?\s*stitch|empty/i.test(candidate.nameEn||candidate.abbreviation||""))notes.push("empty/no-stitch cell rule checked");
    if(/inc|increase|dec|decrease|ssk|k2tog/i.test(candidate.nameEn||candidate.abbreviation||""))notes.push("stitch-count change rule checked");
    if(/cable|cross/i.test(candidate.nameEn||candidate.abbreviation||""))notes.push("cable symbols may span multiple stitches");
    if(!candidate.nameEn||candidate.confidence<55)notes.push("Needs user confirmation.");
    return `Best local match: ${candidate.nameEn||candidate.abbreviation||"unknown"}. ${notes.join(" · ") || "Yarncha needs your review."}`;
  }
};
const userLearningService={
  rememberCorrection({project,cell={},corrected="",abbreviation="",saveToDatabase=false}={}){
    return saveFlowModeCorrection({
      guess:cell.detectedSymbol||cell.candidates?.[0]?.abbreviation||"",
      corrected:corrected||abbreviation,
      craft:project?.type||"Shared",
      saveToDatabase,
      source:"flow-mode-correction",
      chartType:project?.chartReader?.chartType,
      row:cell.row,
      column:cell.column,
      detectedSymbolImageAsset:cell.symbolImageAsset||"",
      notes:"Saved from Flow Mode cell review. Yarncha remembers your corrections on this device."
    });
  }
};
function inferColumnCount(project){
  const samples=(project.chartAnalysis?.rows||[]).map(row=>String(row.sequence||"").split(/[\s,;]+/).filter(Boolean).length).filter(Boolean);
  return samples.length?Math.max(...samples.slice(0,20)):0;
}
function buildChartCells(project,reader){
  const rows=project.chartAnalysis?.rows||[];
  if(rows.length){
    return rows.flatMap(row=>String(row.sequence||"").split(/[\s,;]+/).filter(Boolean).slice(0,Math.max(1,reader.grid.columns||12)).map((token,index)=>({
      id:`cell-${row.id}-${index+1}`,
      row:Number(row.number)||1,
      column:index+1,
      detectedSymbol:token,
      symbolImageRef:"text/OCR token",
      rowContext:row.sequence||"",
      chartType:reader.chartType
    })));
  }
  const rowsToBuild=Math.min(Number(reader.grid.rows)||1,8),colsToBuild=Math.min(Number(reader.grid.columns)||1,8);
  return Array.from({length:rowsToBuild*colsToBuild},(_,index)=>({id:`cell-draft-${index}`,row:Math.floor(index/colsToBuild)+1,column:index%colsToBuild+1,detectedSymbol:"",symbolImageRef:"manual cell review needed",chartType:reader.chartType}));
}
function rankSymbolCandidates(cell,chartType){
  const guess=String(cell.detectedSymbol||"").toLowerCase();
  const craft=chartType==="Unknown"?"":chartType;
  return symbolKnowledgeLayer().map(item=>{
    const fields=[item.abbreviation,item.visualSymbol,item.nameEn,item.nameZh,item.symbolType].filter(Boolean).map(value=>String(value).toLowerCase());
    const exact=guess&&fields.some(value=>value===guess);
    const partial=guess&&fields.some(value=>value.includes(guess)||guess.includes(value));
    const craftBoost=!craft||item.craft===craft||item.craft==="Shared"?10:-8;
    const sourceBoost=item.verificationStatus==="Manually Verified"?24:item.symbolImageAsset?18:item.source&&item.source!=="symbol-database-edit"?14:item.verificationStatus==="Confirmed"?8:0;
    const confidence=Math.max(18,Math.min(98,(exact?64:partial?46:24)+craftBoost+sourceBoost));
    return {...item,confidence,confidenceLabel:confidenceLabel(confidence)};
  }).filter(item=>guess?item.confidence>=35:true).sort((a,b)=>b.confidence-a.confidence).slice(0,3);
}
function confidenceLabel(confidence){return confidence>=78?"High":confidence>=55?"Medium":"Low";}
const chartSymbolReference={
  knitting:["— knit stitch (上針 in the supplied Chinese reference)","| purl stitch (下針)","○ yarn over (鏤空針)","twisted stitch / knit through back loop","right- and left-leaning 2-stitch decreases","centred double decrease","right- and left-leaning increases","cable crossings over 2–5 stitches","bobble and multi-row bobble symbols"],
  crochet:["oval = chain (CH)","filled dot = slip stitch (SL)","+ or × = single crochet (X / sc)","T = half double crochet","crossed T = double crochet","multi-bar T = taller crochet stitches","V-family = increases in one stitch","A-family = decreases worked together","FLO / BLO = front or back loop only","post-stitch symbols","shell, popcorn, cluster and crossed-stitch symbols"]
};
function openChartLegendModal(){
  const p=getProject(),a=p.chartAnalysis||(p.chartAnalysis={rows:[],legend:"",detectedRows:null,summary:"Manual review started."});
  a.rows ||= [];
  openModal(`<p class="eyebrow">USER-CHECKED LEGEND</p><h2>Review chart grid and symbols</h2><div class="form-grid"><div class="field"><label>Detected rows</label><input id="legend-rows" type="number" min="1" value="${a.detectedRows||""}"></div><div class="field"><label>Detected columns</label><input id="legend-columns" type="number" min="1" value="${a.columns||""}"></div><div class="field full"><label>Grid notes</label><input id="grid-status" value="${escapeHtml(a.gridStatus||"")}"></div><div class="field full"><label>Legend transcription and corrections</label><textarea id="chart-legend-text" rows="7" placeholder="Example: — = knit, | = purl, ○ = yarn over">${escapeHtml(a.legend||"")}</textarea></div></div><div class="symbol-reference"><h3>Reference vocabulary from your supplied sheets</h3><div><strong>Knitting</strong><p>${chartSymbolReference.knitting.join(" · ")}</p></div><div><strong>Crochet</strong><p>${chartSymbolReference.crochet.join(" · ")}</p></div></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-chart-legend">Save checked legend</button></div>`);
  document.getElementById("save-chart-legend").onclick=()=>{a.detectedRows=Math.max(1,+document.getElementById("legend-rows").value||0)||null;a.columns=Math.max(1,+document.getElementById("legend-columns").value||0)||null;a.gridStatus=document.getElementById("grid-status").value.trim();a.legend=document.getElementById("chart-legend-text").value.trim();if(a.detectedRows)p.chartRows=a.detectedRows;saveState();closeModal();renderProjectDetail();};
}
function openChartRowModal(rowId=null){
  const p=getProject(),a=p.chartAnalysis||(p.chartAnalysis={rows:[],legend:"",detectedRows:null,summary:"Manual review started."});
  a.rows ||= [];
  const row=a.rows.find(r=>r.id===rowId);
  openModal(`<p class="eyebrow">CHECKED ROW</p><h2>${row?"Edit":"Add"} written row</h2><div class="form-grid"><div class="field"><label>Row number</label><input id="analysis-row-number" type="number" min="1" value="${row?.number||p.row||1}"></div><div class="field"><label>Side</label><select id="analysis-row-side">${["Right side","Wrong side","Worked in the round","Side uncertain"].map(v=>`<option ${row?.side===v?"selected":""}>${v}</option>`).join("")}</select></div><div class="field full"><label>Stitch sequence</label><textarea id="analysis-row-sequence" rows="4" placeholder="Use “uncertain” for every unreadable cell">${escapeHtml(row?.sequence||"")}</textarea></div><div class="field"><label>Resulting stitch count</label><input id="analysis-stitch-count" type="number" min="0" value="${row?.stitchCount||""}" placeholder="Leave blank if uncertain"></div><div class="field"><label>Confidence</label><select id="analysis-row-status"><option value="uncertain" ${row?.status!=="checked"?"selected":""}>Uncertain</option><option value="checked" ${row?.status==="checked"?"selected":""}>Checked by me</option></select></div><div class="field full"><label>Increase / decrease notes</label><input id="analysis-shaping" value="${escapeHtml(row?.shaping||"")}" placeholder="e.g. 2 increases, final count 24"></div><div class="field full"><label>Correction destination</label><select id="analysis-correction-destination"><option value="flow">Save only as Flow Mode correction</option><option value="database">Save to Symbol Database</option></select></div></div><label class="check-row"><input id="analysis-learn-toggle" type="checkbox" checked><span>Learn from this symbol</span></label><p class="privacy-note">Yarncha will remember this symbol for future chart reading. Yarncha remembers your corrections on this device.</p><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-analysis-row">Save row</button></div>`);
  document.getElementById("save-analysis-row").onclick=()=>{const values={number:Math.max(1,+document.getElementById("analysis-row-number").value||1),side:document.getElementById("analysis-row-side").value,sequence:document.getElementById("analysis-row-sequence").value.trim()||"uncertain",stitchCount:+document.getElementById("analysis-stitch-count").value||null,status:document.getElementById("analysis-row-status").value,shaping:document.getElementById("analysis-shaping").value.trim()||"No increase/decrease confirmed"};if(row)Object.assign(row,values);else a.rows.push({id:`analysis-row-${Date.now()}`,...values});a.rows.sort((x,y)=>x.number-y.number);if(document.getElementById("analysis-learn-toggle")?.checked)saveFlowModeCorrection({guess:firstSymbolToken(row?.sequence||""),corrected:firstSymbolToken(values.sequence),craft:p.type,saveToDatabase:document.getElementById("analysis-correction-destination").value==="database",source:"flow-mode-correction",chartType:p.chartReader?.chartType||p.type,readingDirection:p.chartReader?.readingDirection||"",row:values.number,column:null});saveState();closeModal();renderProjectDetail();};
}
function generateFinalPattern(){
  const p=getProject(),rows=p.chartAnalysis?.rows||[],checked=rows.filter(r=>r.status==="checked");
  if(!checked.length)return toast("Check at least one row before generating a final pattern.");
  const uncertain=rows.length-checked.length,text=checked.map(r=>`Row ${r.number} (${r.side}): ${r.sequence}. Stitch count: ${r.stitchCount||"not confirmed"}. ${r.shaping||""}`).join("\n");
  openModal(`<p class="eyebrow">USER-VERIFIED OUTPUT</p><h2>Final written pattern draft</h2><p>${checked.length} checked row(s) included. ${uncertain} uncertain row(s) excluded.</p><textarea class="final-pattern-output" rows="14">${escapeHtml(text)}</textarea><div class="modal-actions"><button class="primary-button" onclick="closeModal()">Done</button></div>`);
}
async function showProjectAsset(id){
  const file=await getAsset(id);if(!file)return toast("This file is no longer available.");
  const p=getProject(),url=URL.createObjectURL(file),stage=document.getElementById("chart-stage"),highlight=p.chartMode==="flow"&&p.flowMode!==false?`<div class="row-highlight" style="${rowHighlightStyle(p)}"></div>`:"";
  if(!stage)return;
  if(p.activeChartAssetId!==id){p.activeChartAssetId=id;saveProjectTouch(p);}
  stage.innerHTML=`<div class="chart-canvas" style="transform:scale(${p.chartZoom||1});transform-origin:top left;">${file.type==="application/pdf"?`<iframe src="${url}#toolbar=0"></iframe>`:`<img src="${url}" alt="Pattern attachment">`}${highlight}${annotationsHtml(p)}</div>`;
  bindAnnotationStage();
}
async function removeProjectChartAsset(id){
  const p=getProject(),asset=(p.attachments||[]).find(a=>a.id===id);
  if(!asset)return toast("Chart file was already removed.");
  if(!confirm(`Remove "${asset.name||"this chart file"}" from this project? This cannot be undone.`))return;
  p.attachments=(p.attachments||[]).filter(a=>a.id!==id);
  if(p.chart?.assetId===id)p.chart=p.attachments[0]?{name:p.attachments[0].name,type:p.attachments[0].type,data:null,assetId:p.attachments[0].id}:null;
  if(p.activeChartAssetId===id)p.activeChartAssetId=p.attachments[0]?.id||null;
  if(p.patternSource?.originalFileBlobId===id)p.patternSource=normalizePatternSource({type:"none",fileType:"none",ocrStatus:"not-started",workspaceMode:"og-visual"},p);
  await deleteAsset(id);
  saveProjectTouch(p);
  renderProjectDetail();
  if(p.activeChartAssetId)setTimeout(()=>showProjectAsset(p.activeChartAssetId),0);
  toast("Chart file removed.");
}
async function extractPdfText(file,selectedPages=[]){
  try{
    const {pdfjsLib:pdfjs}=await getDocumentTools();
    const pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
    const pages=[];
    const wanted=selectedPages.length?selectedPages:Array.from({length:Math.min(pdf.numPages,30)},(_,index)=>index+1);
    for(const pageNumber of wanted.filter(n=>n>=1&&n<=pdf.numPages).slice(0,30)){
      const page=await pdf.getPage(pageNumber),content=await page.getTextContent();
      pages.push(`Page ${pageNumber}\n${content.items.map(item=>item.str).join(" ")}`);
    }
    return pages.join("\n\n").slice(0,120000);
  }catch(error){toast("The PDF was added, but its text could not be extracted.");return "";}
}
async function getDocumentTools(){
  if(window.YarnchaDocumentTools)return window.YarnchaDocumentTools;
  return new Promise((resolve,reject)=>{
    const timeout=setTimeout(()=>reject(new Error("Document tools did not load.")),15000);
    window.addEventListener("yarncha:document-tools-ready",()=>{clearTimeout(timeout);resolve(window.YarnchaDocumentTools);},{once:true});
  });
}
async function scanPatternFile(file,settings={}){
  const fileType=fileTypeForPattern(file);
  try{
    const selectedPages=parsePageList(settings.selectedPages||"");
    const selectable=fileType==="pdf"?await extractPdfText(file,selectedPages):"";
    const ocr=await ocrFile(file,{...settings,selectedPages});
    const text=[selectable,ocr.text].filter(Boolean).join("\n\n").trim().slice(0,160000);
    const confidence=Math.max(Number(ocr.confidence)||0,selectable.trim()?88:0);
    return {
      text,
      confidence,
      status:scanStatusForText(text,confidence),
      pages:ocr.pages.length?ocr.pages:(selectable?[{pageNumber:1,text:selectable,confidence:88,mode:classifyPatternSource(selectable,file,"success")}]:[]),
      selectableText:selectable,
      ocrText:ocr.text,
      error:ocr.error||""
    };
  }catch(error){
    return {text:"",confidence:0,status:"failed",pages:[],selectableText:"",ocrText:"",error:error.message||String(error)};
  }
}
function scanStatusForText(text="",confidence=0){
  if(!String(text||"").trim())return "failed";
  return Number(confidence)>=55?"success":"low-confidence";
}
function parsePageList(value){
  if(Array.isArray(value))return value.map(Number).filter(Boolean);
  return String(value||"").split(/[,\s]+/).map(part=>Number(part.trim())).filter(Boolean);
}
async function ocrFile(file,options={}){
  try{
    const tools=await getDocumentTools();
    const worker=await tools.createOcrWorker("eng+chi_tra+chi_sim+jpn",m=>{const p=getProject();if(m.status==="recognizing text"){p.readerStatus=`OCR ${file.name}: ${Math.round((m.progress||0)*100)}%`;const el=document.querySelector(".reader-status");if(el)el.innerHTML=`<strong>Reader status:</strong> ${escapeHtml(p.readerStatus)}`;}});
    const outputs=[],pages=[];
    if(file.type==="application/pdf"){
      const pdfjs=tools.pdfjsLib;
      const pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
      const wanted=options.selectedPages?.length?options.selectedPages:Array.from({length:Math.min(pdf.numPages,30)},(_,index)=>index+1);
      for(const n of wanted.filter(page=>page>=1&&page<=pdf.numPages).slice(0,30)){
        const page=await pdf.getPage(n),viewport=page.getViewport({scale:1.9,rotation:Number(options.rotation)||0}),canvas=document.createElement("canvas");
        canvas.width=viewport.width;canvas.height=viewport.height;
        await page.render({canvasContext:canvas.getContext("2d"),viewport}).promise;
        const prepared=options.improve?improveCanvasForOcr(canvas):canvas;
        const result=await worker.recognize(prepared),text=result.data.text.trim(),confidence=Number(result.data.confidence)||0;
        if(text){outputs.push(`OCR page ${n}\n${text}`);pages.push({pageNumber:n,text,confidence,mode:classifyPatternSource(text,file,scanStatusForText(text,confidence))});}
      }
    }else{
      const prepared=await prepareImageForOcr(file,options);
      const result=await worker.recognize(prepared),text=result.data.text.trim(),confidence=Number(result.data.confidence)||0;
      if(text){outputs.push(`OCR image\n${text}`);pages.push({pageNumber:1,text,confidence,mode:classifyPatternSource(text,file,scanStatusForText(text,confidence))});}
    }
    await worker.terminate();
    const confidence=pages.length?Math.round(pages.reduce((sum,page)=>sum+(Number(page.confidence)||0),0)/pages.length):0;
    return {text:outputs.join("\n\n"),confidence,status:scanStatusForText(outputs.join("\n\n"),confidence),pages,error:""};
  }catch(error){return {text:"",confidence:0,status:"failed",pages:[],error:error.message||String(error)};}
}
async function prepareImageForOcr(file,options={}){
  const url=URL.createObjectURL(file);
  try{
    const image=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=url;});
    const rotation=Number(options.rotation)||0,crop=options.crop||{},sx=image.naturalWidth*(Number(crop.x)||0)/100,sy=image.naturalHeight*(Number(crop.y)||0)/100,sw=image.naturalWidth*Math.max(1,Number(crop.width)||100)/100,sh=image.naturalHeight*Math.max(1,Number(crop.height)||100)/100;
    const rotated=rotation===90||rotation===270,canvas=document.createElement("canvas"),scale=Math.max(1,Number(options.zoom)||1);
    canvas.width=(rotated?sh:sw)*scale;canvas.height=(rotated?sw:sh)*scale;
    const ctx=canvas.getContext("2d");ctx.save();ctx.scale(scale,scale);
    if(rotation===90){ctx.translate(sh,0);ctx.rotate(Math.PI/2);}
    else if(rotation===180){ctx.translate(sw,sh);ctx.rotate(Math.PI);}
    else if(rotation===270){ctx.translate(0,sw);ctx.rotate(3*Math.PI/2);}
    ctx.drawImage(image,sx,sy,sw,sh,0,0,sw,sh);ctx.restore();
    return options.improve?improveCanvasForOcr(canvas):canvas;
  }finally{URL.revokeObjectURL(url);}
}
function improveCanvasForOcr(canvas){
  const ctx=canvas.getContext("2d"),imageData=ctx.getImageData(0,0,canvas.width,canvas.height),data=imageData.data;
  for(let i=0;i<data.length;i+=4){
    const gray=(data[i]*.299+data[i+1]*.587+data[i+2]*.114);
    const contrasted=Math.max(0,Math.min(255,(gray-128)*1.45+140));
    data[i]=data[i+1]=data[i+2]=contrasted;
  }
  ctx.putImageData(imageData,0,0);
  return canvas;
}
async function openPatternSourceReviewModal(assetId=null){
  const p=getProject(),source=normalizePatternSource(p.patternSource,p);
  const id=assetId||source.originalFileBlobId||p.activeChartAssetId;
  const file=id?await getAsset(id):null;
  const previewUrl=file?URL.createObjectURL(file):"";
  const text=source.userCorrectedText||source.extractedText||"";
  const pageList=source.selectedPages?.length?source.selectedPages.join(", "):"";
  const fallback=source.ocrStatus==="failed"?`<div class="flow-warning-card"><p>We could not read this clearly. You can still use the image as a visual chart, or paste the written pattern text manually.</p></div>`:"";
  openModal(`<p class="eyebrow">PATTERN SCAN REVIEW</p><h2>Review scanned text</h2><p class="muted-copy">OCR can misread craft abbreviations and row numbers. Please edit anything that looks wrong before Yarncha uses it.</p>
    <div class="ocr-review-layout">
      <div class="ocr-preview">${file?file.type==="application/pdf"?`<iframe src="${previewUrl}#toolbar=0"></iframe>`:`<img src="${previewUrl}" alt="Uploaded pattern preview">`:`<div class="empty-state">Original file preview is unavailable, but saved text can still be edited.</div>`}</div>
      <div class="ocr-review-panel">
        ${fallback}
        <div class="form-grid compact-form">
          <div class="field"><label>PDF pages</label><input id="ocr-selected-pages" value="${escapeHtml(pageList)}" placeholder="1, 2, 3"></div>
          <div class="field"><label>Rotate image</label><select id="ocr-rotation">${[0,90,180,270].map(v=>`<option value="${v}" ${source.scanSettings.rotation===v?"selected":""}>${v}°</option>`).join("")}</select></div>
          <div class="field"><label>Zoom preview</label><input id="ocr-zoom" type="number" min=".5" max="3" step=".1" value="${source.scanSettings.zoom}"></div>
          <div class="field"><label>Crop left %</label><input id="ocr-crop-x" type="number" min="0" max="100" value="${source.scanSettings.crop.x}"></div>
          <div class="field"><label>Crop top %</label><input id="ocr-crop-y" type="number" min="0" max="100" value="${source.scanSettings.crop.y}"></div>
          <div class="field"><label>Crop width %</label><input id="ocr-crop-width" type="number" min="1" max="100" value="${source.scanSettings.crop.width}"></div>
          <div class="field"><label>Crop height %</label><input id="ocr-crop-height" type="number" min="1" max="100" value="${source.scanSettings.crop.height}"></div>
          <label class="check-row"><input id="ocr-improve" type="checkbox" ${source.scanSettings.improve?"checked":""}><span>Improve scan contrast</span></label>
        </div>
        <label class="field full"><span>Extracted text</span><textarea id="ocr-review-text" class="ocr-textarea" rows="14" placeholder="Paste or correct the written pattern text here.">${escapeHtml(text)}</textarea></label>
        <p class="privacy-note">Original upload is preserved. Scanned text and your corrections are saved locally with this project.</p>
      </div>
    </div>
    <div class="modal-actions ocr-review-actions">
      <button class="secondary-button" id="ocr-scan-again">Scan Again / Try Better Quality</button>
      <button class="secondary-button" id="use-visual-chart">Use as Visual Chart</button>
      <button class="secondary-button" id="use-mixed-pattern">Use as Mixed Pattern</button>
      <button class="primary-button" id="use-written-pattern">Use as Written Pattern</button>
    </div>`);
  const readSettings=()=>({
    selectedPages:document.getElementById("ocr-selected-pages")?.value||"",
    rotation:Number(document.getElementById("ocr-rotation")?.value)||0,
    improve:!!document.getElementById("ocr-improve")?.checked,
    zoom:Number(document.getElementById("ocr-zoom")?.value)||1,
    crop:{
      x:Number(document.getElementById("ocr-crop-x")?.value)||0,
      y:Number(document.getElementById("ocr-crop-y")?.value)||0,
      width:Number(document.getElementById("ocr-crop-width")?.value)||100,
      height:Number(document.getElementById("ocr-crop-height")?.value)||100
    }
  });
  const finish=type=>{
    const corrected=document.getElementById("ocr-review-text")?.value||"";
    const settings=readSettings(),selectedPages=parsePageList(settings.selectedPages);
    p.patternSource=normalizePatternSource({...source,type,fileType:file?fileTypeForPattern(file):source.fileType,originalFileBlobId:id,extractedText:source.extractedText,userCorrectedText:corrected,ocrConfidence:source.ocrConfidence,ocrStatus:corrected.trim()?source.ocrStatus==="failed"?"low-confidence":source.ocrStatus:source.ocrStatus,selectedPages,workspaceMode:workspaceModeForPatternType(type),scanSettings:settings,reviewedAt:new Date().toISOString()},p);
    if(corrected.trim())p.pdfReference=`${p.pdfReference}\n\nSOURCE: ${file?.name||"Pattern scan"}\n${corrected}`.trim();
    if(corrected.trim())p.chartAnalysis=analysePatternText(corrected);
    saveProjectTouch(p);closeModal();renderProjectDetail();if(p.activeChartAssetId)setTimeout(()=>showProjectAsset(p.activeChartAssetId),0);toast("Pattern scan saved.");
    if(previewUrl)URL.revokeObjectURL(previewUrl);
  };
  document.getElementById("use-written-pattern").onclick=()=>finish("written-pattern");
  document.getElementById("use-visual-chart").onclick=()=>finish("visual-chart");
  document.getElementById("use-mixed-pattern").onclick=()=>finish("mixed");
  document.getElementById("ocr-scan-again").onclick=async()=>{
    if(!file)return toast("Original file is unavailable for rescanning.");
    const settings=readSettings();
    p.readerStatus="Scanning again with your settings…";p.patternSource=normalizePatternSource({...source,ocrStatus:"scanning",scanSettings:settings},p);saveProjectTouch(p);renderProjectDetail();
    const scan=await scanPatternFile(file,settings),type=classifyPatternSource(scan.text,file,scan.status);
    p.patternSource=normalizePatternSource({...p.patternSource,type,fileType:fileTypeForPattern(file),originalFileBlobId:id,extractedText:scan.text,ocrConfidence:scan.confidence,ocrStatus:scan.status,selectedPages:scan.pages.map(page=>page.pageNumber).filter(Boolean),workspaceMode:workspaceModeForPatternType(type),scanSettings:settings},p);
    saveProjectTouch(p);openPatternSourceReviewModal(id);
  };
}
function savePatternSourceText(){
  const p=getProject(),source=normalizePatternSource(p.patternSource,p),text=document.getElementById("pattern-source-text")?.value||"";
  p.patternSource=normalizePatternSource({...source,userCorrectedText:text,ocrStatus:text.trim()?source.ocrStatus==="failed"?"low-confidence":source.ocrStatus:source.ocrStatus,reviewedAt:new Date().toISOString()},p);
  if(text.trim()){p.pdfReference=`${p.pdfReference}\n\nSOURCE: Pattern Reading Space\n${text}`.trim();p.chartAnalysis=analysePatternText(text);}
  saveProjectTouch(p);renderProjectDetail();toast("Scanned text saved.");
}
function movePatternLine(delta){
  const p=getProject(),source=normalizePatternSource(p.patternSource,p),text=source.userCorrectedText||source.extractedText||"",lines=text.split(/\n+/).map(line=>line.trim()).filter(Boolean);
  source.currentLine=Math.max(1,Math.min(Math.max(1,lines.length),source.currentLine+delta));
  p.patternSource=source;saveProjectTouch(p);renderProjectDetail();
}
function togglePatternWorkspacePanel(action){
  const p=getProject(),source=normalizePatternSource(p.patternSource,p);
  if(action==="hide-chart")source.chartCollapsed=true;
  if(action==="show-chart")source.chartCollapsed=false;
  if(action==="hide-text")source.textCollapsed=true;
  if(action==="show-text")source.textCollapsed=false;
  p.patternSource=source;saveProjectTouch(p);renderProjectDetail();
  if(p.activeChartAssetId&&!source.chartCollapsed)setTimeout(()=>showProjectAsset(p.activeChartAssetId),0);
}

function defaultYarnMaterials(){return [
  {id:"mat-merino",name:"Merino wool",category:"Natural",origin:"Natural animal fibre",season:"Cool weather and adaptable layers",textures:["Soft","Elastic","Warm"],features:"Good stitch memory and insulation; fine merino is gentler next to skin. Can felt and may need careful washing."},
  {name:"Sheep wool",origin:"Natural animal fibre",season:"Autumn and winter",texture:"Springy, warm; softness varies by breed and micron",features:"Excellent structure for cables and colourwork. Breathable, resilient and insulating even in changing humidity."},
  {name:"Alpaca",origin:"Natural animal fibre",season:"Cold weather",texture:"Smooth, drapey, very warm, low elasticity",features:"Useful for soft drape and warmth. Blend with wool when a garment needs stronger shape recovery."},
  {name:"Mohair",origin:"Natural animal fibre",season:"Cool weather or airy year-round lace",texture:"Light, fuzzy halo, lustrous",features:"Adds warmth with little weight. Can be itchy for sensitive skin and difficult to unravel."},
  {name:"Cashmere",origin:"Natural animal fibre",season:"Cool weather",texture:"Very soft, warm and lightweight",features:"Luxurious but less abrasion-resistant; best for protected garments and blends."},
  {name:"Silk",origin:"Natural protein fibre",season:"Spring, summer and luxury layers",texture:"Smooth, strong, lustrous and drapey",features:"Adds sheen and tensile strength. Limited elasticity; avoid harsh agitation and prolonged sunlight."},
  {name:"Cotton",origin:"Natural plant fibre",season:"Warm weather and all-season homewares",texture:"Cool, smooth, absorbent, low elasticity",features:"Strong and washable with crisp stitch definition. Heavier garments can stretch under their own weight."},
  {name:"Linen / flax",origin:"Natural plant fibre",season:"Hot weather",texture:"Cool, crisp, strong; softens with use",features:"Excellent drape and breathability. Little elasticity, so hand fatigue and uneven tension can be more noticeable."},
  {name:"Hemp",origin:"Natural plant fibre",season:"Warm weather and durable all-season items",texture:"Firm, strong and increasingly soft with wear",features:"Good for bags, tops and homewares. Low elasticity; blends improve softness and recovery."},
  {name:"Bamboo viscose",origin:"Regenerated cellulose",season:"Warm weather",texture:"Smooth, cool, shiny and fluid",features:"Usually means bamboo-derived viscose/rayon rather than mechanically processed bamboo fibre. Drapes heavily and may split."},
  {name:"Lyocell / Tencel",origin:"Regenerated cellulose",season:"Warm weather and transitional seasons",texture:"Smooth, cool, drapey",features:"Good moisture handling and sheen. Low spring compared with wool; often blended for shape."},
  {name:"Acrylic",origin:"Synthetic fibre",season:"All season; warm variants suit winter",texture:"Light, soft, resilient; quality varies",features:"Affordable, colourfast and often machine washable. Can pill, retain odour and soften or melt under high heat."},
  {name:"Nylon / polyamide",origin:"Synthetic fibre",season:"All season",texture:"Strong, smooth and elastic",features:"Usually blended into sock and hard-wearing yarns for abrasion resistance. Avoid high heat."},
  {name:"Polyester",origin:"Synthetic fibre",season:"All season",texture:"Durable, low absorbency, variable softness",features:"Strong, quick-drying and shape-retentive. May hold odours and should be kept away from high heat."}
].map((m,index)=>({id:m.id||`material-default-${index}`,category:m.category||(m.origin.startsWith("Synthetic")?"Synthetic":m.origin.startsWith("Regenerated")?"Other":"Natural"),textures:m.textures||(m.texture||"").split(",").map(x=>x.trim()).filter(Boolean),...m}));}

function projectIdeasHtml(){
  const filters=state.ideaFilters||{search:"",craft:"All",kind:"All",showArchived:false};
  const search=(filters.search||"").toLowerCase();
  const ideas=(state.projectIdeas||[]).filter(idea=>{
    const haystack=`${idea.title} ${idea.craftType} ${idea.projectKind} ${idea.inspirationNotes} ${(idea.tags||[]).join(" ")}`.toLowerCase();
    return (!search||haystack.includes(search))&&(filters.craft==="All"||idea.craftType===filters.craft)&&(filters.kind==="All"||idea.projectKind===filters.kind)&&(filters.showArchived||!idea.archived);
  });
  return `<div class="idea-board">
    <div class="idea-board-toolbar card">
      <div><p class="eyebrow">INSPIRATION BOARD</p><h2>Project Ideas</h2><p class="muted-copy">Save sparks, calculator experiments, images and links here. Ideas do not become projects until you choose Create Project from Idea.</p></div>
      <button class="primary-button" id="add-project-idea">+ Add Project Idea</button>
    </div>
    <div class="idea-filters card">
      <input id="idea-search" placeholder="Search ideas, tags, notes..." value="${escapeHtml(filters.search||"")}">
      <select id="idea-craft-filter"><option>All</option>${ideaCraftOptions.map(v=>`<option ${filters.craft===v?"selected":""}>${escapeHtml(v)}</option>`).join("")}</select>
      <select id="idea-kind-filter"><option>All</option>${ideaKindOptions.map(v=>`<option ${filters.kind===v?"selected":""}>${escapeHtml(v)}</option>`).join("")}</select>
      <label class="check-row"><input type="checkbox" id="idea-archive-filter" ${filters.showArchived?"checked":""}><span>Show archived</span></label>
    </div>
    ${ideas.length?`<div class="project-ideas-list idea-grid">${ideas.map(idea=>ideaCardHtml(idea)).join("")}</div>`:`<div class="empty-state"><h3>No matching project ideas yet</h3><p>Add an idea manually, or save a calculator result as a Project Idea.</p></div>`}
  </div>`;
}
function ideaCardHtml(idea){
  const date=new Date(idea.updatedAt||idea.createdAt||Date.now()).toLocaleDateString();
  const tags=(idea.tags||[]).slice(0,5);
  return `<article class="idea-card card ${idea.archived?"is-archived":""}">
    <div class="idea-thumb">${idea.referenceImageAsset?`<div class="idea-image" data-idea-image="${escapeHtml(idea.referenceImageAsset)}"></div>`:`<span>□</span><small>Add reference image</small>`}</div>
    <div class="idea-body">
      <div class="idea-meta"><span>${escapeHtml(idea.craftType||"Mixed / Other")}</span><span>${escapeHtml(idea.projectKind||"Custom idea")}</span>${idea.archived?`<span>Archived</span>`:""}</div>
      <h3>${escapeHtml(idea.title||"Project idea")}</h3>
      <p>${escapeHtml(idea.inspirationNotes||idea.description||"No notes yet.")}</p>
      <div class="idea-details">
        <span>Difficulty: <strong>${escapeHtml(idea.difficultyGuess||"Not sure yet")}</strong></span>
        <span>Updated: <strong>${escapeHtml(date)}</strong></span>
        ${idea.sourceTool?`<span>Source tool: <strong>${escapeHtml(idea.sourceTool)}</strong></span>`:""}
        ${idea.sourceLink?`<a href="${escapeHtml(idea.sourceLink)}" target="_blank" rel="noreferrer">Open source link</a>`:""}
      </div>
      ${tags.length?`<div class="idea-tags">${tags.map(t=>`<span>${escapeHtml(t)}</span>`).join("")}</div>`:""}
      ${idea.yarnEstimate?`<p class="idea-yarn"><strong>Yarn estimate:</strong> ${escapeHtml(idea.yarnEstimate)}</p>`:""}
      ${(idea.savedCalculatorResults||[]).length?`<details><summary>${idea.savedCalculatorResults.length} saved calculator result(s)</summary><pre>${escapeHtml(JSON.stringify(idea.savedCalculatorResults,null,2))}</pre></details>`:""}
    </div>
    <div class="row-actions idea-actions"><button class="mini-button" data-edit-idea="${escapeHtml(idea.id)}">Edit</button><button class="mini-button" data-create-project-idea="${escapeHtml(idea.id)}">Create Project from Idea</button><button class="mini-button" data-archive-idea="${escapeHtml(idea.id)}">${idea.archived?"Unarchive":"Archive"}</button></div>
  </article>`;
}
function bindProjectIdeas(){
  document.getElementById("add-project-idea")?.addEventListener("click",()=>openProjectIdeaModal());
  document.getElementById("idea-search")?.addEventListener("input",e=>{state.ideaFilters={...(state.ideaFilters||{}),search:e.target.value};renderLibrary();});
  document.getElementById("idea-craft-filter")?.addEventListener("change",e=>{state.ideaFilters={...(state.ideaFilters||{}),craft:e.target.value};renderLibrary();});
  document.getElementById("idea-kind-filter")?.addEventListener("change",e=>{state.ideaFilters={...(state.ideaFilters||{}),kind:e.target.value};renderLibrary();});
  document.getElementById("idea-archive-filter")?.addEventListener("change",e=>{state.ideaFilters={...(state.ideaFilters||{}),showArchived:e.target.checked};renderLibrary();});
  document.querySelectorAll("[data-edit-idea]").forEach(b=>b.onclick=()=>openProjectIdeaModal(b.dataset.editIdea));
  document.querySelectorAll("[data-archive-idea]").forEach(b=>b.onclick=()=>{const idea=(state.projectIdeas||[]).find(i=>i.id===b.dataset.archiveIdea);if(idea){idea.archived=!idea.archived;saveState();renderLibrary();}});
  document.querySelectorAll("[data-create-project-idea]").forEach(b=>b.onclick=()=>createProjectFromIdea(b.dataset.createProjectIdea));
  hydrateIdeaImages();
}
async function deleteProjectIdea(idea){
  if(!idea)return;
  if(!confirm("Are you sure you want to delete this item?"))return;
  if(idea.referenceImageAsset)await deleteAsset(idea.referenceImageAsset);
  state.projectIdeas=(state.projectIdeas||[]).filter(item=>item.id!==idea.id);
  const section=state.librarySections.find(s=>s.id==="ideas");
  if(section)section.items=(section.items||[]).filter(item=>item.id!==idea.id);
  saveState();closeModal(true);renderLibrary();toast("Project idea deleted.");
}
function createProjectFromIdea(id){
  const idea=(state.projectIdeas||[]).find(i=>i.id===id);
  if(!idea)return toast("Idea not found.");
  const craft=idea.craftType||idea.calculatorValues?.craftType||"Mixed / Other";
  const toolHistory=(idea.savedCalculatorResults||[]).map((payload,index)=>({...structuredClone(payload),id:`hist${Date.now()}-${index}`,linkedProject:null,notes:payload.notes||""}));
  const notes=[`Created from project idea: ${idea.title||""}`,idea.inspirationNotes||idea.description||"",idea.sourceLink?`Source: ${idea.sourceLink}`:"",idea.yarnEstimate?`Yarn estimate: ${idea.yarnEstimate}`:"",(idea.tags||[]).length?`Tags: ${idea.tags.join(", ")}`:""].filter(Boolean).join("\n\n");
  const project={id:`p${Date.now()}`,name:idea.title||"Project from idea",type:projectTypeOptions.includes(craft)?craft:"Mixed / Other",projectKind:idea.projectKind||"Custom idea",color:colors[state.projects.length%colors.length],row:1,totalRows:null,started:new Date().toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"}),notes,subCounters:[],markers:[],chart:null,projectTools:{},toolHistory,buyList:[],attachments:[],annotations:[],rowMask:null,coverAsset:idea.referenceImageAsset||null,sourceIdeaId:idea.id,activeTab:"project",updatedAt:new Date().toISOString()};
  project.toolHistory.forEach(h=>h.linkedProject=project.id);
  state.projects=[project,...state.projects];state.activeProjectId=project.id;currentProjectId=project.id;saveState();toast("Project created from idea.");showProject(project.id);
}
function openProjectIdeaModal(ideaId=null){
  const idea=ideaId?state.projectIdeas.find(i=>i.id===ideaId):null;
  openModal(`<p class="eyebrow">PROJECT IDEA</p><h2>${idea?"Edit":"Add"} project idea</h2>
    <div class="form-grid">
      <div class="field full"><label>Idea title</label><input id="idea-title" value="${escapeHtml(idea?.title||"")}" placeholder="e.g. Planned pooling scarf"></div>
      <div class="field"><label>Craft type</label><select id="idea-craft">${ideaCraftOptions.map(v=>`<option ${idea?.craftType===v?"selected":""}>${escapeHtml(v)}</option>`).join("")}</select></div>
      <div class="field"><label>Project kind</label><select id="idea-kind">${ideaKindOptions.map(v=>`<option ${idea?.projectKind===v?"selected":""}>${escapeHtml(v)}</option>`).join("")}</select></div>
      <div class="field"><label>Source platform</label><select id="idea-platform">${ideaPlatformOptions.map(v=>`<option ${idea?.sourcePlatform===v?"selected":""}>${escapeHtml(v)}</option>`).join("")}</select></div>
      <div class="field"><label>Difficulty guess</label><select id="idea-difficulty">${ideaDifficultyOptions.map(v=>`<option ${idea?.difficultyGuess===v?"selected":""}>${escapeHtml(v)}</option>`).join("")}</select></div>
      <div class="field full"><label>Source link</label><input id="idea-source-link" value="${escapeHtml(idea?.sourceLink||"")}" placeholder="Optional URL"></div>
      <div class="field full upload-drop"><label>Reference image</label><input id="idea-image" type="file" accept="image/*"><small>${idea?.referenceImageAsset?"Choose a new photo to replace the saved reference.":"Optional photo or screenshot."}</small></div>
      <div class="field full"><label>Inspiration notes</label><textarea id="idea-notes" rows="5" placeholder="What do you like about this idea?">${escapeHtml(idea?.inspirationNotes||idea?.description||"")}</textarea></div>
      <div class="field full"><label>Yarn estimate</label><input id="idea-yarn" value="${escapeHtml(idea?.yarnEstimate||"")}" placeholder="Optional yarn amount or note"></div>
      <div class="field full"><label>Tags</label><input id="idea-tags" value="${escapeHtml((idea?.tags||[]).join(", "))}" placeholder="cozy, cardigan, gift"></div>
    </div>
    ${idea?`<section class="danger-zone compact-danger-zone"><strong>Danger Zone</strong><p>Delete this idea only if you no longer need it. This action cannot be undone.</p><button type="button" class="danger-button secondary-button" id="delete-project-idea-inside-edit">Delete item</button></section>`:""}
    <div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-project-idea">Save idea</button></div>`);
  document.getElementById("delete-project-idea-inside-edit")?.addEventListener("click",()=>deleteProjectIdea(idea));
  document.getElementById("save-project-idea").onclick=async()=>{
    const title=document.getElementById("idea-title").value.trim();
    if(!title)return toast("Name this project idea.");
    const image=document.getElementById("idea-image").files[0];
    const now=new Date().toISOString();
    const values={
      title,
      craftType:document.getElementById("idea-craft").value,
      projectKind:document.getElementById("idea-kind").value,
      sourcePlatform:document.getElementById("idea-platform").value,
      sourceLink:document.getElementById("idea-source-link").value.trim(),
      inspirationNotes:document.getElementById("idea-notes").value.trim(),
      description:document.getElementById("idea-notes").value.trim(),
      yarnEstimate:document.getElementById("idea-yarn").value.trim(),
      difficultyGuess:document.getElementById("idea-difficulty").value,
      tags:document.getElementById("idea-tags").value.split(",").map(t=>t.trim()).filter(Boolean),
      referenceImageAsset:idea?.referenceImageAsset||null,
      updatedAt:now
    };
    if(image){values.referenceImageAsset=`ideaimg${Date.now()}`;await putAsset(values.referenceImageAsset,image);}
    if(idea)Object.assign(idea,values);
    else state.projectIdeas=[normalizeProjectIdea({id:`idea${Date.now()}`,...values,createdAt:now,archived:false}),...(state.projectIdeas||[])];
    const section=state.librarySections.find(s=>s.id==="ideas");
    if(section){
      section.items=(section.items||[]).filter(item=>item.id!==(idea?.id||values.id));
      const savedIdea=idea||state.projectIdeas[0];
      section.items=[{id:savedIdea.id,name:savedIdea.title,notes:savedIdea.inspirationNotes,craft:savedIdea.craftType},...section.items];
    }
    saveState();closeModal();renderLibrary();toast("Project idea saved.");
  };
}
async function hydrateIdeaImages(){
  for(const box of document.querySelectorAll("[data-idea-image]")){
    const file=await getAsset(box.dataset.ideaImage);
    if(file)box.style.backgroundImage=`url("${URL.createObjectURL(file)}")`;
  }
}
function librarySectionCount(section){
  if(section.id==="materials")return state.yarnMaterials.length;
  if(section.id==="symbols")return window.YarnchaSymbolDatabase?mergedSymbolEntries().length:0;
  if(section.id==="tool-manual")return toolkitToolDefs.length;
  if(section.id==="theory")return Object.values(theoryTopics).reduce((sum,items)=>sum+items.length,0);
  if(section.id==="ideas")return (state.projectIdeas||[]).length;
  return (section.items||[]).length;
}
function librarySectionIcon(sectionId){return uiIcon(({"personal-references":"book",patterns:"pattern",ideas:"idea",materials:"fibre",symbols:"pattern","tool-manual":"manual",theory:"theory"})[sectionId]||"folder","library-card-icon");}
function symbolRegionBadges(entry){return (entry.regionTags||[]).map(tag=>`<span class="symbol-region-badge">${escapeHtml(tag)}</span>`).join("");}
const symbolSvgPaths={
  knit:'<path d="M32 10v44"></path>',
  purl:'<path d="M10 32h44"></path>',
  slip:'<path d="m14 42 12-20 12 20 12-20"></path>',
  "yarn-over":'<circle cx="32" cy="32" r="17"></circle>',
  "double-yarn-over":'<circle cx="23" cy="32" r="12"></circle><circle cx="41" cy="32" r="12"></circle>',
  "knit-twisted":'<path d="M32 8v48"></path><path d="M21 23c0-10 22-10 22 0s-22 10-22 20 22 10 22 0"></path>',
  "purl-twisted":'<path d="M9 32h46"></path><path d="M22 18c-9 0-9 20 0 20s9-20 20-20 11 20 0 20"></path>',
  increase:'<path d="M12 14 32 52 52 14"></path>',
  "increase-kfb":'<path d="M32 54V31M32 31 18 12M32 31 46 12M18 12h10"></path>',
  "increase-left":'<path d="M12 14 32 52 52 14"></path><path d="M19 41 13 51"></path>',
  "increase-right":'<path d="M12 14 32 52 52 14"></path><path d="m45 41 6 10"></path>',
  "purl-increase":'<path d="M12 14 32 52 52 14M15 27h34"></path>',
  "decrease-right":'<path d="m16 52 32-40"></path>',
  "decrease-left":'<path d="m16 12 32 40"></path>',
  "purl-decrease-right":'<path d="m16 52 32-40M11 32h42"></path>',
  "purl-decrease-left":'<path d="m16 12 32 40M11 32h42"></path>',
  "decrease-centred":'<path d="m12 18 20 34 20-34M32 52V10"></path>',
  "decrease-joined":'<path d="m12 50 20-36 20 36M18 42h28"></path>',
  "crochet-chain":'<ellipse cx="32" cy="32" rx="22" ry="12"></ellipse>',
  "crochet-slip":'<circle class="symbol-svg-fill" cx="32" cy="32" r="10"></circle>',
  "crochet-sc":'<path d="m14 14 36 36M50 14 14 50"></path>',
  "crochet-hdc":'<path d="M10 15h44M32 15v40"></path>',
  "crochet-dc":'<path d="M10 15h44M32 15v40M24 31l16-9"></path>',
  "crochet-tr":'<path d="M10 15h44M32 15v40M23 29l18-10M23 39l18-10"></path>',
  "crochet-dtr":'<path d="M10 15h44M32 15v40M23 27l18-10M23 37l18-10M23 47l18-10"></path>',
  chain:'<ellipse cx="32" cy="32" rx="22" ry="12"></ellipse>',
  "slip-stitch-crochet":'<circle class="symbol-svg-fill" cx="32" cy="32" r="9"></circle>',
  "single-crochet":'<path d="m14 14 36 36M50 14 14 50"></path>',
  "half-double-crochet":'<path d="M10 15h44M32 15v40"></path>',
  "double-crochet":'<path d="M10 15h44M32 15v40M23 31l18-10"></path>',
  "treble-crochet":'<path d="M10 15h44M32 15v40M23 28l18-9M23 39l18-9"></path>',
  "double-treble-crochet":'<path d="M10 15h44M32 15v40M23 25l18-8M23 35l18-8M23 45l18-8"></path>',
  "single-crochet-increase":'<path d="M32 52 16 16M32 52 48 16M10 24l14-7M40 17l14 7"></path>',
  "half-double-crochet-increase":'<path d="M32 52 18 15M32 52 46 15M9 15h18M37 15h18"></path>',
  "double-crochet-increase":'<path d="M32 52 18 15M32 52 46 15M9 15h18M37 15h18M14 32l12-7M38 25l12 7"></path>',
  "single-crochet-decrease":'<path d="M16 50 32 13 48 50M10 42l13 6M41 48l13-6"></path>',
  "half-double-crochet-decrease":'<path d="M17 52 32 15 47 52M22 52H8M42 52h14M24 15h16"></path>',
  "double-crochet-decrease":'<path d="M17 52 32 15 47 52M22 52H8M42 52h14M24 15h16M18 39l12-7M34 32l12 7"></path>',
  "front-loop":'<path d="M10 39c11-22 33-22 44 0"></path>',
  "back-loop":'<path d="M10 25c11 22 33 22 44 0"></path>',
  "front-post":'<path d="M18 12h30M33 12v43M25 30l16-9M33 44c-18 0-18-18 0-18"></path>',
  "back-post":'<path d="M16 12h30M31 12v43M23 30l16-9M31 26c18 0 18 18 0 18"></path>',
  "cable-left":'<path d="M14 52 50 12"></path><path class="symbol-svg-under" d="M14 12 50 52"></path><path d="M14 12 50 52"></path>',
  "cable-right":'<path d="M14 12 50 52"></path><path class="symbol-svg-under" d="M14 52 50 12"></path><path d="M14 52 50 12"></path>',
  "cable-left-wide":'<path d="M8 52 44 12M20 52 56 12"></path><path class="symbol-svg-under" d="M8 12 44 52M20 12 56 52"></path><path d="M8 12 44 52M20 12 56 52"></path>',
  "cable-right-wide":'<path d="M8 12 44 52M20 12 56 52"></path><path class="symbol-svg-under" d="M8 52 44 12M20 52 56 12"></path><path d="M8 52 44 12M20 52 56 12"></path>',
  "cable-left-3-3":'<path d="M4 54 38 10M14 54 48 10M24 54 58 10"></path><path class="symbol-svg-under" d="M4 10 38 54M14 10 48 54M24 10 58 54"></path><path d="M4 10 38 54M14 10 48 54M24 10 58 54"></path>',
  "cable-right-3-3":'<path d="M4 10 38 54M14 10 48 54M24 10 58 54"></path><path class="symbol-svg-under" d="M4 54 38 10M14 54 48 10M24 54 58 10"></path><path d="M4 54 38 10M14 54 48 10M24 54 58 10"></path>',
  "cable-left-purl":'<path d="M14 52 50 12"></path><path class="symbol-svg-under" d="M14 12 50 52"></path><path d="M14 12 50 52M20 56h24"></path>',
  "cable-right-purl":'<path d="M14 12 50 52"></path><path class="symbol-svg-under" d="M14 52 50 12"></path><path d="M14 52 50 12M20 56h24"></path>',
  "cable-twisted":'<path d="M14 52 50 12M14 12 50 52"></path><circle cx="32" cy="32" r="7"></circle>',
  "cable-cross":'<path d="M13 13 51 51M51 13 13 51"></path>',
  "tunisian-simple":'<rect x="10" y="8" width="44" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M10 25h44M32 25v25"></path><path d="M20 14c8-5 16 5 24 0"></path>',
  "tunisian-purl":'<rect x="10" y="8" width="44" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M10 25h44"></path><path d="M18 14c9-5 19 5 28 0M20 43h24"></path>',
  "tunisian-knit":'<rect x="10" y="8" width="44" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M10 25h44"></path><path d="M18 14c9-5 19 5 28 0M32 49c-14-8-10-21 0-21s14 13 0 21Z"></path>',
  "tunisian-reverse":'<rect x="10" y="8" width="44" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M10 25h44M32 25v21"></path><path d="M18 14c9-5 19 5 28 0M21 47c6 8 16 8 22 0"></path>',
  "tunisian-full":'<rect x="10" y="8" width="44" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M10 25h44"></path><path d="M18 14c9-5 19 5 28 0"></path><circle cx="32" cy="40" r="8"></circle>',
  "tunisian-double":'<rect x="10" y="8" width="44" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M10 25h44M32 25v25M25 40l14-8"></path><path d="M18 14c9-5 19 5 28 0"></path>',
  "tunisian-slip":'<rect x="10" y="8" width="44" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M10 25h44"></path><path d="M18 14c9-5 19 5 28 0M20 50 32 29l12 21"></path>',
  "tunisian-yarn-over":'<rect x="10" y="8" width="44" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M10 25h44"></path><path d="M18 14c9-5 19 5 28 0"></path><ellipse cx="32" cy="40" rx="11" ry="7"></ellipse>',
  "tunisian-yarn-over-space":'<rect x="10" y="8" width="44" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M10 25h44"></path><path d="M18 14c9-5 19 5 28 0M20 49c7-18 17-18 24 0"></path><circle cx="32" cy="37" r="5"></circle>',
  "tunisian-increase-1-3":'<rect x="7" y="8" width="50" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M7 25h50"></path><path d="M16 14c7-5 13 5 20 0 7-5 12 5 18 0M32 50V35M32 35 19 26M32 35l13-9"></path><circle cx="32" cy="39" r="5"></circle>',
  "tunisian-decrease-2":'<rect x="7" y="8" width="50" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M7 25h50"></path><path d="M16 14c7-5 13 5 20 0 7-5 12 5 18 0M15 49 32 29l17 20"></path>',
  "tunisian-decrease-3":'<rect x="5" y="8" width="54" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M5 25h54"></path><path d="M12 14c6-5 11 5 17 0s11 5 17 0 8 4 12 0M11 49 32 29l21 20M32 29v20"></path>',
  "tunisian-decrease-4":'<rect x="4" y="8" width="56" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M4 25h56"></path><path d="M8 14c6-5 11 5 17 0s11 5 17 0 11 5 17 0M7 49 32 29l25 20M20 49l12-20M44 49 32 29"></path>',
  "tunisian-decrease-5":'<rect x="3" y="8" width="58" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M3 25h58"></path><path d="M6 14c5-5 10 5 15 0s10 5 15 0 10 5 15 0 7 4 10 0M5 49 32 29l27 20M18 49l14-20M46 49 32 29M32 29v20"></path>',
  "tunisian-cross-a":'<rect x="7" y="8" width="50" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M7 25h50"></path><path d="M16 14c7-5 13 5 20 0 7-5 12 5 18 0M13 50 49 29M15 29l34 21"></path>',
  "tunisian-cross-b":'<rect x="7" y="8" width="50" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M7 25h50"></path><path d="M16 14c7-5 13 5 20 0 7-5 12 5 18 0M15 29l34 21M13 50 49 29"></path><path d="M36 30v10"></path>',
  "tunisian-double-cross":'<rect x="7" y="8" width="50" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M7 25h50"></path><path d="M16 14c7-5 13 5 20 0 7-5 12 5 18 0M14 50 47 29M17 29l33 21M23 39l11-7M34 46l11-7"></path>',
  "tunisian-cable-left-3":'<rect x="3" y="8" width="58" height="48" rx="2"></rect><path stroke-dasharray="3 3" d="M3 25h58"></path><path d="M7 14c5-5 10 5 15 0s10 5 15 0 10 5 15 0 6 4 9 0M5 48 35 29M16 48l30-19M27 48l30-19"></path>',
  cluster:'<path d="M13 50 28 17M24 50l8-33M40 50l-8-33M51 50 36 17M24 17h16M17 35l12-6M35 29l12 6"></path>',
  "cluster-decrease":'<path d="M13 50 29 18M25 50l7-32M39 50l-7-32M51 50 35 18M25 18h14"></path><circle class="symbol-svg-fill" cx="32" cy="16" r="3"></circle>',
  puff:'<path d="M32 50C10 44 12 19 32 14M32 50c22-6 20-31 0-36M32 50c-10-10-10-26 0-36M32 50c10-10 10-26 0-36"></path><path d="M25 14h14M25 50h14"></path>',
  "cyc-hdc-cluster":'<path d="M32 52C12 45 13 21 32 13M32 52c20-7 19-31 0-39M32 52c-9-11-9-28 0-39M32 52c9-11 9-28 0-39"></path><path d="M22 13h20M22 52h20"></path>',
  bobble:'<path d="M32 51c-20 0-21-35 0-38 21 3 20 38 0 38ZM24 17c7 8 7 22 0 30M40 17c-7 8-7 22 0 30"></path>',
  "knit-bobble":'<circle cx="32" cy="32" r="15" class="symbol-svg-fill"></circle>',
  popcorn:'<path d="M16 48 26 18M24 50l8-34M40 50l-8-34M48 48 38 18M12 47c12 8 28 8 40 0M22 18h20"></path>',
  shell:'<path d="M32 52 12 18M32 52 22 16M32 52V15M32 52 42 16M32 52 52 18M8 18h9M18 16h9M28 15h8M37 16h9M47 18h9"></path>',
  "v-stitch":'<path d="M32 52 18 15M32 52 46 15M9 15h18M37 15h18M14 32l12-7M38 25l12 7"></path>',
  "y-stitch":'<path d="M32 54V31M32 31 16 12M32 31 48 12"></path>',
  "crochet-cross":'<path d="M16 51 45 15M48 51 19 15M10 15h18M36 15h18M23 37l13-8M28 29l13 8"></path>',
  picot:'<path d="M32 52V35"></path><ellipse cx="24" cy="27" rx="8" ry="5"></ellipse><ellipse cx="32" cy="18" rx="8" ry="5"></ellipse><ellipse cx="40" cy="27" rx="8" ry="5"></ellipse>',
  "crochet-generic":'<path d="M12 50 32 14 52 50"></path><circle cx="32" cy="14" r="5"></circle>',
  "special-stitch":'<path d="m32 10 20 22-20 22L12 32Z"></path>',
  "chart-rule":'<path d="M8 21h48M8 43h48M19 13l-9 8 9 8M45 35l9 8-9 8"></path>',
  "legend-specific":'<rect x="9" y="10" width="46" height="44" rx="4"></rect><path d="M17 21h30M17 31h20M17 41h26"></path>'
};
const symbolVerificationOptions=["To Be Confirmed","Confirmed","Manually Verified"];
const symbolCraftOptions=["Knitting","Crochet","Tunisian","Shared"];
const symbolDifficultyOptions=["Beginner","Intermediate","Advanced"];
const symbolSourceOptions=["CYC","common-knitting","jp-cn-chart","needs-review"];
function loadSymbolOverrides(){return state.userSymbolsOverride&&typeof state.userSymbolsOverride==="object"?state.userSymbolsOverride:{};}
function symbolSectionForCraft(craft){return ({Knitting:"Knitting Symbols & Abbreviations",Crochet:"Crochet Symbols & Abbreviations",Tunisian:"Tunisian Crochet Symbols & Abbreviations",Shared:"Special Stitches"})[craft]||"Special Stitches";}
function normalizeEditableSymbol(raw={}){
  const database=window.YarnchaSymbolDatabase;
  const normalized=database.normalizeEntry({...raw,fullName:raw.nameEn||raw.nameEnglish||raw.fullName,nameEnglish:raw.nameEn||raw.nameEnglish||raw.fullName,nameTraditionalChinese:raw.nameZh||raw.nameTraditionalChinese||"需核對"});
  const status=symbolVerificationOptions.includes(raw.verificationStatus)?raw.verificationStatus:"To Be Confirmed";
  const needsReview=raw.needsReview===undefined?status==="To Be Confirmed":!!raw.needsReview;
  return {...normalized,...raw,nameEn:raw.nameEn||normalized.nameEn,nameEnglish:raw.nameEn||normalized.nameEnglish,fullName:raw.nameEn||normalized.fullName,nameZh:raw.nameZh||normalized.nameZh,nameTraditionalChinese:raw.nameZh||normalized.nameTraditionalChinese,symbolType:raw.symbolType||raw.symbolIcon||normalized.symbolType,symbolIcon:raw.symbolType||raw.symbolIcon||normalized.symbolIcon,section:symbolSectionForCraft(raw.craft||normalized.craft),tags:Array.isArray(raw.tags)?raw.tags:typeof raw.tags==="string"?raw.tags.split(",").map(tag=>tag.trim()).filter(Boolean):normalized.tags||[],notes:raw.notes||"",customSvg:raw.customSvg||"",symbolImageAsset:raw.symbolImageAsset||"",symbolImageName:raw.symbolImageName||"",verificationStatus:status,verifiedDate:raw.verifiedDate||"",verifiedBy:raw.verifiedBy||"",verificationNotes:raw.verificationNotes||"",needsReview,flowModeReady:!needsReview,reviewStatus:needsReview?"needs-review":"reviewed-foundation"};
}
function normalizeLearningRecord(raw={}){
  const updatedAt=raw.updatedAt||raw.dateAdded||new Date().toISOString();
  const confidence=Number(raw.confidence);
  return {
    id:raw.id||raw.symbolId||`learned-symbol-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    symbolId:raw.symbolId||raw.id||"",
    nameEn:String(raw.nameEn||raw.englishName||raw.correctedSymbolName||raw.name||"").trim(),
    nameZh:String(raw.nameZh||raw.chineseName||raw.nameTraditionalChinese||"").trim(),
    abbreviation:String(raw.abbreviation||"").trim(),
    craft:raw.craft||raw.craftType||"Shared",
    category:raw.category||"Basic",
    symbolType:raw.symbolType||raw.symbolIcon||"legend-specific",
    visualSymbol:raw.visualSymbol||raw.symbol||"",
    symbolImageAsset:raw.symbolImageAsset||raw.detectedSymbolImageAsset||"",
    symbolImageName:raw.symbolImageName||raw.detectedSymbolImageName||"",
    originalAiGuess:raw.originalAiGuess||raw.originalGuess||"",
    correctedSymbolName:raw.correctedSymbolName||raw.nameEn||raw.englishName||"",
    detectedSymbolImageAsset:raw.detectedSymbolImageAsset||raw.symbolImageAsset||"",
    detectedSymbolImageName:raw.detectedSymbolImageName||raw.symbolImageName||"",
    chartType:raw.chartType||raw.craftType||"",
    readingDirection:raw.readingDirection||"",
    row:Number(raw.row)||null,
    column:Number(raw.column)||null,
    rowColumnContext:raw.rowColumnContext||raw.context||"",
    source:raw.source||"symbol-database-edit",
    verificationStatus:["To Be Confirmed","Confirmed","Manually Verified"].includes(raw.verificationStatus)?raw.verificationStatus:"To Be Confirmed",
    confidence:Math.max(0,Math.min(100,Number.isFinite(confidence)?confidence:raw.verificationStatus==="Manually Verified"?96:raw.verificationStatus==="Confirmed"?86:62)),
    notes:String(raw.notes||"").trim(),
    updatedAt,
    dateAdded:raw.dateAdded||updatedAt
  };
}
function learningRecords(){return (state.symbolLearningLibrary||[]).map(normalizeLearningRecord);}
function symbolLearningKey(record){
  const normalized=normalizeLearningRecord(record);
  if(normalized.symbolId)return `symbol:${normalized.symbolId}`;
  return `abbr:${normalized.abbreviation.toLowerCase()}|craft:${normalized.craft.toLowerCase()}`;
}
function upsertLearningRecord(record,{save=true}={}){
  const next=normalizeLearningRecord(record),key=symbolLearningKey(next),records=learningRecords();
  const index=records.findIndex(item=>symbolLearningKey(item)===key || (next.abbreviation&&item.abbreviation.toLowerCase()===next.abbreviation.toLowerCase()&&item.craft.toLowerCase()===next.craft.toLowerCase()));
  if(index>=0)records[index]={...records[index],...next,id:records[index].id,updatedAt:new Date().toISOString()};
  else records.unshift({...next,id:next.id||`learned-symbol-${Date.now()}`});
  state.symbolLearningLibrary=records;
  if(save)saveState();
  return index>=0?records[index]:records[0];
}
function learningRecordFromSymbolEntry(entry){
  return normalizeLearningRecord({
    id:`learn-${entry.id}`,
    symbolId:entry.id,
    nameEn:entry.nameEn||entry.nameEnglish,
    nameZh:entry.nameZh||entry.nameTraditionalChinese,
    abbreviation:entry.abbreviation||entry.abbreviationUS||entry.visualSymbol||"",
    craft:entry.craft,
    category:entry.category,
    symbolType:entry.symbolType||entry.symbolIcon,
    visualSymbol:entry.visualSymbol||entry.symbol,
    symbolImageAsset:entry.symbolImageAsset||"",
    symbolImageName:entry.symbolImageName||"",
    source:"symbol-database-edit",
    verificationStatus:entry.verificationStatus,
    confidence:entry.verificationStatus==="Manually Verified"?96:entry.verificationStatus==="Confirmed"?86:64,
    notes:"Yarncha will remember this symbol for future chart reading.",
    updatedAt:new Date().toISOString()
  });
}
function syncLearningFromSymbolEntry(entry,{save=true}={}){
  return upsertLearningRecord(learningRecordFromSymbolEntry(entry),{save});
}
function symbolKnowledgeLayer(){
  const database=window.YarnchaSymbolDatabase;
  const defaults=database?database.defaultSymbols.map(entry=>normalizeEditableSymbol(entry)):[];
  const overrides=Object.values(loadSymbolOverrides()).filter(entry=>entry&&!entry.deleted).map(normalizeEditableSymbol);
  const learned=learningRecords();
  const fromLearned=learned.map(record=>({
    id:record.symbolId||record.id,
    nameEn:record.nameEn||record.correctedSymbolName,
    nameZh:record.nameZh,
    abbreviation:record.abbreviation,
    craft:record.craft,
    category:record.category,
    symbolType:record.symbolType,
    symbolImageAsset:record.symbolImageAsset,
    visualSymbol:record.visualSymbol,
    verificationStatus:record.verificationStatus,
    source:record.source,
    confidence:record.confidence,
    updatedAt:record.updatedAt
  }));
  const rank=item=>{
    if(item.verificationStatus==="Manually Verified")return 1;
    if(item.symbolImageAsset)return 2;
    if(item.source&&item.source!=="symbol-database-edit")return 3;
    if(item.verificationStatus==="Confirmed")return 4;
    return 5;
  };
  return [...overrides,...fromLearned,...defaults].sort((a,b)=>rank(a)-rank(b)||String(b.updatedAt||"").localeCompare(String(a.updatedAt||"")));
}
function matchSymbolKnowledge(input={}){
  const guess=String(input.guess||input.originalAiGuess||input.symbol||input.sequence||"").toLowerCase().trim(),craft=String(input.craft||input.craftType||"").toLowerCase();
  if(!guess)return null;
  return symbolKnowledgeLayer().find(item=>{
    const names=[item.abbreviation,item.visualSymbol,item.nameEn,item.nameZh,item.symbolType].filter(Boolean).map(value=>String(value).toLowerCase());
    return (!craft||String(item.craft||"").toLowerCase()===craft||item.craft==="Shared") && names.some(value=>value===guess||guess.includes(value)||value.includes(guess));
  })||null;
}
function firstSymbolToken(text=""){return String(text).trim().split(/[\s,;]+/).find(Boolean)||"";}
function saveFlowModeCorrection({guess="",corrected="",craft="Shared",saveToDatabase=false,source="flow-mode-correction",chartType="",readingDirection="",row=null,column=null,detectedSymbolImageAsset="",detectedSymbolImageName="",notes=""}={}){
  const token=firstSymbolToken(corrected||guess),match=matchSymbolKnowledge({guess:guess||token,craft});
  const symbolId=match?.id||`flow-symbol-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const record=upsertLearningRecord({symbolId,nameEn:corrected||token,abbreviation:token,craft,category:match?.category||"Basic",symbolType:match?.symbolType||"legend-specific",visualSymbol:guess||token,symbolImageAsset:detectedSymbolImageAsset||match?.symbolImageAsset||"",detectedSymbolImageAsset,detectedSymbolImageName,chartType:chartType||craft,readingDirection,row,column,rowColumnContext:row&&column?`Row ${row}, column ${column}`:"",source,verificationStatus:"Manually Verified",confidence:92,notes:notes||"Yarncha remembers your corrections on this device.",updatedAt:new Date().toISOString()},{save:false});
  if(saveToDatabase){
    const entry=normalizeEditableSymbol({...match,id:symbolId,nameEn:corrected||match?.nameEn||token,nameZh:match?.nameZh||"需核對",abbreviation:token,visualSymbol:guess||match?.visualSymbol||token,symbol:guess||token,craft:craft||match?.craft||"Shared",category:match?.category||"Basic",difficulty:match?.difficulty||"Beginner",symbolType:match?.symbolType||"legend-specific",explanation:match?.explanation||"Saved from a user-corrected Flow Mode chart result.",verificationStatus:"Manually Verified",needsReview:false,flowModeReady:true,isCustom:!match});
    saveSymbolOverride(entry,{learn:true});
  }else saveState();
  return record;
}
function mergedSymbolEntries(){
  const database=window.YarnchaSymbolDatabase,overrides=loadSymbolOverrides(),defaultIds=new Set(database.defaultSymbols.map(entry=>entry.id));
  const merged=database.defaultSymbols.flatMap(entry=>{const override=overrides[entry.id];if(override?.deleted)return[];return[normalizeEditableSymbol(override?{...entry,...override}:entry)];});
  for(const [id,override] of Object.entries(overrides)){if(!defaultIds.has(id)&&!override?.deleted)merged.push(normalizeEditableSymbol({...override,id,isCustom:true}));}
  return merged;
}
function saveSymbolOverride(entry,{learn=true}={}){
  const normalized=normalizeEditableSymbol(entry);
  state.userSymbolsOverride={...loadSymbolOverrides(),[normalized.id]:structuredClone(normalized)};
  if(learn)syncLearningFromSymbolEntry(normalized,{save:false});
  saveState();return normalized;
}
function resetSymbolOverride(id){const overrides={...loadSymbolOverrides()};delete overrides[id];state.userSymbolsOverride=overrides;saveState();}
function sanitizeCustomSymbolSvg(input=""){
  const text=String(input).trim();if(!text)return{ok:true,value:""};
  if(text.length>12000)return{ok:false,error:"Custom SVG is too large."};
  try{
    const wrapped=/^<svg[\s>]/i.test(text)?text:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${text}</svg>`;
    const doc=new DOMParser().parseFromString(wrapped,"image/svg+xml"),root=doc.documentElement;
    if(root.tagName.toLowerCase()!=="svg"||doc.querySelector("parsererror"))return{ok:false,error:"SVG markup could not be parsed."};
    const allowedElements=new Set(["svg","g","path","circle","ellipse","line","polyline","polygon","rect"]),allowedAttributes=new Set(["xmlns","viewBox","d","cx","cy","r","rx","ry","x","y","x1","y1","x2","y2","width","height","points","transform","fill","stroke","stroke-width","stroke-linecap","stroke-linejoin","class"]);
    for(const element of root.querySelectorAll("*")){
      if(!allowedElements.has(element.tagName.toLowerCase()))return{ok:false,error:`SVG element <${element.tagName}> is not allowed.`};
      for(const attribute of [...element.attributes]){
        if(!allowedAttributes.has(attribute.name)||/^on/i.test(attribute.name)||/url\s*\(|javascript:/i.test(attribute.value))return{ok:false,error:`SVG attribute ${attribute.name} is not allowed.`};
      }
    }
    for(const attribute of [...root.attributes])if(!allowedAttributes.has(attribute.name))return{ok:false,error:`SVG attribute ${attribute.name} is not allowed.`};
    return{ok:true,value:root.innerHTML};
  }catch{return{ok:false,error:"SVG markup is invalid."};}
}
function validateSymbolEntry(entry){
  const errors=[];
  if(!String(entry.nameEn||"").trim())errors.push("English name is required.");
  if(!String(entry.abbreviation||"").trim()&&!String(entry.symbolType||"").trim()&&!String(entry.customSvg||"").trim())errors.push("Add an abbreviation, symbol type, or custom SVG.");
  if(!symbolCraftOptions.includes(entry.craft))errors.push("Choose a valid craft type.");
  if(!window.YarnchaSymbolDatabase.categoryOrder.includes(entry.category))errors.push("Choose a valid category.");
  if(!symbolDifficultyOptions.includes(entry.difficulty))errors.push("Choose a valid difficulty.");
  if(!symbolSourceOptions.includes(entry.sourceType))errors.push("Choose a valid source type.");
  if(!symbolVerificationOptions.includes(entry.verificationStatus))errors.push("Choose a valid verification status.");
  if(!["High","Medium","Low"].includes(entry.confidence))errors.push("Choose a valid confidence level.");
  if(entry.verificationStatus==="To Be Confirmed"){entry.needsReview=true;entry.flowModeReady=false;}
  if(entry.sourceUrl&&!/^https:\/\//i.test(entry.sourceUrl))errors.push("Source URL must begin with https://.");
  if(entry.customSvg){const result=sanitizeCustomSymbolSvg(entry.customSvg);if(!result.ok)errors.push(result.error);else entry.customSvg=result.value;}
  return{valid:errors.length===0,errors,entry};
}
function safeSourceLink(entry){return /^https:\/\//i.test(entry.sourceUrl||"")?`<a href="${escapeHtml(entry.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open source</a>`:"Uploaded or pattern-specific reference";}
function exportSymbolsJson(){
  const payload={app:"Yarncha",kind:"symbol-database-overrides",schemaVersion:8,exportedAt:new Date().toISOString(),overrides:loadSymbolOverrides(),symbols:mergedSymbolEntries(),symbolLearningLibrary:learningRecords()};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),link=document.createElement("a");
  link.href=url;link.download=`yarncha-symbols-${new Date().toISOString().slice(0,10)}.json`;link.click();URL.revokeObjectURL(url);toast("Symbol database exported");
}
async function importSymbolsJson(file){
  try{
    const parsed=JSON.parse(await file.text()),incoming=parsed.overrides&&typeof parsed.overrides==="object"?Object.values(parsed.overrides):Array.isArray(parsed)?parsed:Array.isArray(parsed.symbols)?parsed.symbols:[];
    if(!incoming.length)throw new Error("No symbol entries found");
    const next={...loadSymbolOverrides()};let imported=0,skipped=0;
    for(const raw of incoming){
      if(raw?.deleted&&raw.id){next[raw.id]={id:raw.id,deleted:true};imported++;continue;}
      const candidate=normalizeEditableSymbol({...raw,id:raw.id||`custom-symbol-${Date.now()}-${imported}`,verificationStatus:raw.verificationStatus||"To Be Confirmed",isCustom:raw.isCustom!==false});
      const result=validateSymbolEntry(candidate);if(!result.valid){skipped++;continue;}next[candidate.id]=structuredClone(result.entry);syncLearningFromSymbolEntry(result.entry,{save:false});imported++;
    }
    if(!imported)throw new Error("No valid entries found");
    state.userSymbolsOverride=next;(parsed.symbolLearningLibrary||[]).forEach(record=>upsertLearningRecord(record,{save:false}));saveState();renderLibrary();toast(`${imported} symbol entries imported${skipped?` · ${skipped} skipped`:""}`);
  }catch(error){toast(`Symbol import failed: ${error.message}`);}
}
function symbolIconSvg(entry,className="symbol-svg-icon"){
  const custom=entry.customSvg?sanitizeCustomSymbolSvg(entry.customSvg):{ok:true,value:""};
  const icon=custom.ok&&custom.value?custom.value:symbolSvgPaths[entry.symbolType]||symbolSvgPaths[entry.category==="Cable"?"cable-cross":entry.category==="Increase"?"increase":entry.category==="Decrease"?"decrease-joined":"special-stitch"];
  return `<svg class="${className}" viewBox="0 0 64 64" aria-hidden="true">${icon}</svg>`;
}
function symbolVisualHtml(entry,size="card"){
  const fallback=symbolIconSvg(entry,size==="detail"?"symbol-svg-icon symbol-svg-icon-large":"symbol-svg-icon");
  return entry.symbolImageAsset?`<span class="symbol-picture symbol-picture-${size}" data-symbol-picture="${escapeHtml(entry.symbolImageAsset)}" data-symbol-picture-name="${escapeHtml(entry.symbolImageName||entry.nameEn||"Symbol picture")}">${fallback}</span>`:fallback;
}
async function hydrateSymbolPictures(){
  for(const host of document.querySelectorAll("[data-symbol-picture]")){
    const file=await getAsset(host.dataset.symbolPicture);if(!file)continue;
    const image=document.createElement("img");image.src=URL.createObjectURL(file);image.alt=host.dataset.symbolPictureName||"Uploaded symbol picture";image.className="symbol-uploaded-picture";host.replaceChildren(image);
  }
}
function techniqueReferenceHtml(entry){
  const reference=(state.userTechniqueReferences||{})[entry.id];
  return `<section class="technique-reference" aria-labelledby="technique-reference-title"><div class="section-heading compact-row"><div><p class="eyebrow">PERSONAL, LOCAL REFERENCE</p><h3 id="technique-reference-title">Technique Reference</h3></div></div>${reference?`<div class="technique-reference-saved">${uiIcon("image","ui-icon")}<div><strong>Personal reference saved</strong><p>${escapeHtml(reference.fileName||"Personal reference image")}</p></div></div><div class="button-row"><button class="secondary-button" id="replace-symbol-technique">Replace Image</button><button class="secondary-button danger-button" id="remove-symbol-technique">Remove Image</button></div>`:`<div class="empty-state technique-reference-empty"><p>No technique reference added yet.<br>Upload your own image, diagram, or note for this symbol.</p><button class="primary-button" id="upload-symbol-technique">Upload Image</button></div>`}<input id="symbol-technique-file" type="file" accept="image/*" hidden><p class="privacy-note">User-supplied image only. Stored locally in this browser; the reference image is not displayed in the symbol glossary.</p></section>`;
}
async function saveSymbolTechniqueReference(entry,file){
  if(!file?.type?.startsWith("image/"))return toast("Choose an image file.");
  const previous=(state.userTechniqueReferences||{})[entry.id],assetId=`symbol-reference-${entry.id}-${Date.now()}`;
  await putAsset(assetId,file);
  state.userTechniqueReferences={...(state.userTechniqueReferences||{}),[entry.id]:{symbolId:entry.id,assetId,fileName:file.name,mediaType:file.type,updatedAt:new Date().toISOString(),syncVersion:1}};
  if(previous?.assetId&&previous.assetId!==assetId)await deleteAsset(previous.assetId);
  saveState();renderLibrary();toast(previous?"Technique reference replaced":"Technique reference added");
}
function symbolVerificationBadge(entry){
  const status=symbolVerificationOptions.includes(entry.verificationStatus)?entry.verificationStatus:"To Be Confirmed",className=status==="Confirmed"?"confirmed":status==="Manually Verified"?"manual":"pending";
  return `<span class="symbol-verification-badge ${className}"><i aria-hidden="true"></i>${escapeHtml(status)}</span>`;
}
function symbolEditFormHtml(entry,isNew=false){
  const picture=entry.symbolImageAsset?`<div class="symbol-edit-picture" data-symbol-picture="${escapeHtml(entry.symbolImageAsset)}" data-symbol-picture-name="${escapeHtml(entry.symbolImageName||entry.nameEn||"Symbol picture")}">${symbolIconSvg(entry)}</div><div><strong>Uploaded symbol picture</strong><p>${escapeHtml(entry.symbolImageName||"Personal symbol image")}</p></div>`:`<div class="symbol-edit-picture">${symbolIconSvg(entry)}</div><div><strong>No uploaded picture</strong><p>The default Yarncha symbol will be used.</p></div>`;
  return `<form class="symbol-edit-form edit-project-form" id="symbol-edit-form" novalidate><p class="eyebrow">SYMBOL DATABASE</p><h2>${isNew?"Add Symbol":"Edit Symbol"}</h2><p class="muted-copy">Edit the wording or add your own symbol picture. Yarncha keeps the original default available.</p><div id="symbol-edit-errors" class="form-error-list" role="alert" hidden></div><div class="form-grid"><div class="field"><label>English name *</label><input id="symbol-edit-name-en" value="${escapeHtml(entry.nameEn||"")}"></div><div class="field"><label>Chinese name</label><input id="symbol-edit-name-zh" value="${escapeHtml(entry.nameZh||"")}"></div><div class="field"><label>Abbreviation</label><input id="symbol-edit-abbreviation" value="${escapeHtml(entry.abbreviation||"")}"></div><div class="field"><label>Chart symbol / character</label><input id="symbol-edit-visual" value="${escapeHtml(entry.visualSymbol||entry.symbol||"")}" placeholder="e.g. ○, ×, /, \\" maxlength="24"></div><div class="field"><label>Craft type *</label><select id="symbol-edit-craft">${symbolCraftOptions.map(value=>`<option ${entry.craft===value?"selected":""}>${value}</option>`).join("")}</select></div><div class="field"><label>Category</label><select id="symbol-edit-category">${window.YarnchaSymbolDatabase.categoryOrder.map(value=>`<option ${entry.category===value?"selected":""}>${value}</option>`).join("")}</select></div><div class="field"><label>Difficulty</label><select id="symbol-edit-difficulty">${symbolDifficultyOptions.map(value=>`<option ${entry.difficulty===value?"selected":""}>${value}</option>`).join("")}</select></div><div class="field"><label>Verification status</label><select id="symbol-edit-verification">${symbolVerificationOptions.map(value=>`<option ${entry.verificationStatus===value?"selected":""}>${value}</option>`).join("")}</select></div><div class="field full"><label>Tags</label><input id="symbol-edit-tags" value="${escapeHtml((entry.tags||[]).join(", "))}" placeholder="lace, shaping, beginner"></div><div class="field full"><label>Symbol picture</label><div class="symbol-picture-editor" id="symbol-picture-editor">${picture}</div><div class="button-row symbol-picture-actions"><button class="secondary-button" type="button" id="choose-symbol-picture">${entry.symbolImageAsset?"Replace symbol picture":"Upload symbol picture"}</button><button class="secondary-button danger-button" type="button" id="remove-symbol-picture" ${entry.symbolImageAsset?"":"hidden"}>Remove uploaded picture</button></div><input id="symbol-picture-file" type="file" accept="image/*" hidden><small>If the default mark is wrong, upload a clear symbol image. It stays in this browser and becomes a recognition reference for Flow Mode.</small></div><div class="field full"><label>Explanation</label><textarea id="symbol-edit-explanation" rows="4">${escapeHtml(entry.explanation||"")}</textarea></div></div><label class="check-row"><input id="symbol-learn-toggle" type="checkbox" checked><span>Learn from this symbol</span></label><p class="privacy-note">Yarncha will remember this symbol for future chart reading. Yarncha remembers your corrections on this device.</p><div class="symbol-editor-secondary-actions">${!isNew&&window.YarnchaSymbolDatabase.defaultSymbols.some(item=>item.id===entry.id)?`<button class="secondary-button" type="button" id="reset-symbol-default">Reset to default</button>`:""}${!isNew?`<button class="secondary-button" type="button" id="duplicate-symbol">Duplicate symbol</button><button class="secondary-button danger-button" id="delete-symbol" type="button">Delete symbol</button>`:""}</div><div class="modal-actions"><button class="secondary-button" type="button" id="cancel-symbol-edit">Cancel</button><button class="primary-button" type="submit">Save Symbol</button></div></form>`;
}
function symbolEntryFromEditForm(base){
  const visualSymbol=document.getElementById("symbol-edit-visual").value.trim();
  const verificationStatus=document.getElementById("symbol-edit-verification").value,needsReview=verificationStatus==="To Be Confirmed";
  return normalizeEditableSymbol({...base,nameEn:document.getElementById("symbol-edit-name-en").value.trim(),nameZh:document.getElementById("symbol-edit-name-zh").value.trim(),abbreviation:document.getElementById("symbol-edit-abbreviation").value.trim(),symbol:visualSymbol,visualSymbol,craft:document.getElementById("symbol-edit-craft").value,category:document.getElementById("symbol-edit-category").value,difficulty:document.getElementById("symbol-edit-difficulty").value,tags:document.getElementById("symbol-edit-tags").value,explanation:document.getElementById("symbol-edit-explanation").value.trim(),needsReview,verificationStatus,flowModeReady:!needsReview});
}
async function deleteSymbolEntry(entry){
  if(!confirm(`Delete “${entry.nameEn}”? You can restore a default entry by resetting its override.`))return;
  if(entry.symbolImageAsset)await deleteAsset(entry.symbolImageAsset);
  const overrides={...loadSymbolOverrides()},isDefault=window.YarnchaSymbolDatabase.defaultSymbols.some(item=>item.id===entry.id);
  if(isDefault)overrides[entry.id]={id:entry.id,deleted:true};else delete overrides[entry.id];
  state.symbolLearningLibrary=learningRecords().filter(record=>record.symbolId!==entry.id);
  state.userSymbolsOverride=overrides;state.symbolFavorites=(state.symbolFavorites||[]).filter(id=>id!==entry.id);currentSymbolId=null;saveState();closeModal(true);renderLibrary();toast("Symbol deleted");
}
function duplicateSymbolEntry(entry){
  const duplicate=normalizeEditableSymbol({...entry,id:`custom-symbol-${Date.now()}-${Math.random().toString(16).slice(2)}`,nameEn:`${entry.nameEn} Copy`,nameEnglish:`${entry.nameEn} Copy`,fullName:`${entry.nameEn} Copy`,symbolImageAsset:"",symbolImageName:"",verificationStatus:"To Be Confirmed",verifiedDate:"",verifiedBy:"",verificationNotes:"",needsReview:true,isCustom:true});
  saveSymbolOverride(duplicate);closeModal(true);currentSymbolId=duplicate.id;renderLibrary();toast("Symbol duplicated");
}
function openSymbolEditModal(entry=null){
  const isNew=!entry,base=entry||normalizeEditableSymbol({id:`custom-symbol-${Date.now()}-${Math.random().toString(16).slice(2)}`,nameEn:"",nameZh:"",abbreviation:"",craft:"Knitting",category:"Basic",difficulty:"Beginner",tags:[],symbolType:"knit",explanation:"",notes:"",sourceType:"needs-review",sourceNote:"User-created symbol. Confirm against the pattern legend.",needsReview:true,verificationStatus:"To Be Confirmed",verifiedDate:"",verifiedBy:"",verificationNotes:"",isCustom:true});
  openModal(symbolEditFormHtml(base,isNew),{label:isNew?"Add Symbol":"Edit Symbol"});
  let stagedPicture=null,removePicture=false;
  hydrateSymbolPictures();
  const pictureInput=document.getElementById("symbol-picture-file"),pictureEditor=document.getElementById("symbol-picture-editor"),choosePicture=document.getElementById("choose-symbol-picture"),removeButton=document.getElementById("remove-symbol-picture");
  choosePicture.onclick=()=>pictureInput.click();
  pictureInput.onchange=()=>{const file=pictureInput.files?.[0];if(!file)return;if(!file.type.startsWith("image/"))return toast("Choose an image file.");stagedPicture=file;removePicture=false;const url=URL.createObjectURL(file);pictureEditor.innerHTML=`<div class="symbol-edit-picture"><img class="symbol-uploaded-picture" src="${url}" alt="Selected symbol picture"></div><div><strong>New symbol picture selected</strong><p>${escapeHtml(file.name)}</p></div>`;choosePicture.textContent="Replace symbol picture";if(removeButton)removeButton.hidden=false;};
  removeButton?.addEventListener("click",()=>{stagedPicture=null;removePicture=true;pictureInput.value="";pictureEditor.innerHTML=`<div class="symbol-edit-picture">${symbolIconSvg(base)}</div><div><strong>Uploaded picture will be removed</strong><p>The default Yarncha symbol will be used after saving.</p></div>`;choosePicture.textContent="Upload symbol picture";removeButton.hidden=true;});
  document.getElementById("cancel-symbol-edit").onclick=()=>closeModal();
  document.getElementById("symbol-edit-form").onsubmit=async event=>{event.preventDefault();const candidate=symbolEntryFromEditForm(base),result=validateSymbolEntry(candidate),errorHost=document.getElementById("symbol-edit-errors");if(!result.valid){errorHost.hidden=false;errorHost.innerHTML=`<strong>Please fix:</strong><ul>${result.errors.map(error=>`<li>${escapeHtml(error)}</li>`).join("")}</ul>`;return;}const previousAsset=base.symbolImageAsset||"";if(stagedPicture){const assetId=`symbol-picture-${candidate.id}-${Date.now()}`;await putAsset(assetId,stagedPicture);result.entry.symbolImageAsset=assetId;result.entry.symbolImageName=stagedPicture.name;}else if(removePicture){result.entry.symbolImageAsset="";result.entry.symbolImageName="";}const learn=document.getElementById("symbol-learn-toggle")?.checked!==false;const saved=saveSymbolOverride(result.entry,{learn});if(previousAsset&&previousAsset!==saved.symbolImageAsset)await deleteAsset(previousAsset);currentSymbolId=saved.id;closeModal(true);renderLibrary();toast(learn?"Symbol saved and remembered for chart reading":"Symbol saved");};
  document.getElementById("reset-symbol-default")?.addEventListener("click",async()=>{if(!confirm(`Reset “${base.nameEn}” to the Yarncha default?`))return;if(base.symbolImageAsset)await deleteAsset(base.symbolImageAsset);resetSymbolOverride(base.id);closeModal(true);currentSymbolId=base.id;renderLibrary();toast("Symbol reset to default");});
  document.getElementById("duplicate-symbol")?.addEventListener("click",()=>duplicateSymbolEntry(base));
  document.getElementById("delete-symbol")?.addEventListener("click",()=>deleteSymbolEntry(base));
}
async function resetAllSymbolOverrides(){if(!confirm("Reset every Symbol Database edit, addition, deletion and verification status to Yarncha defaults?"))return;await Promise.allSettled(Object.values(loadSymbolOverrides()).map(entry=>entry?.symbolImageAsset?deleteAsset(entry.symbolImageAsset):null));state.userSymbolsOverride={};state.symbolLearningLibrary=learningRecords().filter(record=>record.source!=="symbol-database-edit");saveState();currentSymbolId=null;renderLibrary();toast("All symbols reset to defaults");}
function symbolDatabaseHtml(){
  const database=window.YarnchaSymbolDatabase;
  if(!database)return `<div class="empty-state"><h3>Symbol Database could not load</h3><p>Refresh after confirming symbol-database.js is available.</p></div>`;
  const allEntries=mergedSymbolEntries();
  if(currentSymbolId){
    const entry=allEntries.find(item=>item.id===currentSymbolId);
    if(!entry){currentSymbolId=null;return symbolDatabaseHtml();}
    const favorite=(state.symbolFavorites||[]).includes(entry.id);
    return `<section class="symbol-detail card">
      <button class="text-button symbol-detail-back" id="symbol-detail-back">← Symbol Database</button>
      <div class="symbol-detail-hero"><div class="symbol-glyph">${symbolVisualHtml(entry,"detail")}</div><div><p class="eyebrow">${escapeHtml(entry.craft)} · ${escapeHtml(entry.category)} · ${escapeHtml(entry.difficulty)}</p><h2>${escapeHtml(entry.nameEn)}</h2><p class="symbol-chinese-name">${escapeHtml(entry.nameZh)}</p><p class="symbol-abbreviation">${entry.craft==="Crochet"?`US ${escapeHtml(entry.abbreviationUS||"—")} · UK ${escapeHtml(entry.abbreviationUK||"—")} · CN ${escapeHtml(entry.abbreviationChinese||"—")}`:escapeHtml(entry.abbreviation||"No universal abbreviation")}</p>${symbolVerificationBadge(entry)}<div class="symbol-region-badges">${symbolRegionBadges(entry)}</div>${entry.needsReview?`<span class="analysis-badge review">Needs review</span>`:""}</div></div>
      <div class="symbol-detail-actions"><button class="secondary-button" id="edit-symbol-detail">Edit Symbol</button><button class="secondary-button" id="copy-symbol-meaning">Copy Meaning</button><button class="secondary-button" id="save-symbol-project">Save to Project Notes</button><button class="primary-button" id="favorite-symbol">${favorite?"Remove Favorite":"Add to Favorites"}</button></div>
      <p class="symbol-global-warning">${escapeHtml(entry.chartLegendWarning)}</p>
      <div class="symbol-detail-grid">
        <article><h3>Meaning</h3><p>${escapeHtml(entry.explanation)}</p></article>
        <article><h3>How To</h3><p>${escapeHtml(entry.howTo)}</p></article>
        <article><h3>Beginner Notes</h3><p>${escapeHtml(entry.beginnerExplanation)}</p></article>
        <article><h3>Common Mistakes</h3><ul>${entry.commonMistakes.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
        <article><h3>Related Symbols</h3><p>${entry.relatedSymbols.length?entry.relatedSymbols.map(escapeHtml).join(" · "):"Use craft and category filters to find related entries."}</p></article>
        <article><h3>Language Names</h3><dl>${Object.entries(entry.languageVariants).map(([language,name])=>`<dt>${escapeHtml(language)}</dt><dd>${escapeHtml(name)}</dd>`).join("")}</dl></article>
        <article><h3>Sources & Variations</h3><ul class="symbol-source-list">${(entry.sourceReferences||[]).map(reference=>`<li><strong>${escapeHtml(reference.name)}</strong>${reference.url?` · <a href="${escapeHtml(reference.url)}" target="_blank" rel="noopener noreferrer">Open</a>`:""}<br><span>${escapeHtml(reference.scope||"")}</span></li>`).join("")}</ul><p>${escapeHtml(entry.variationNotes||entry.sourceNote)}</p></article>
        <article><h3>Verification</h3>${symbolVerificationBadge(entry)}<p><strong>Confidence: ${escapeHtml(entry.confidence||"Low")}</strong></p><p>Last verified: ${escapeHtml(entry.lastVerifiedDate||entry.verifiedDate||"Not recorded")}${entry.verifiedBy?` · ${escapeHtml(entry.verifiedBy)}`:""}</p><p>${escapeHtml(entry.verificationNotes||"No verification notes yet.")}</p></article>
      </div>
      <section class="flow-reference-note"><p class="eyebrow">FLOW MODE REFERENCE</p><h3>Candidate matching notes</h3><p><strong>Possible meanings:</strong> ${entry.possibleMeanings.map(escapeHtml).join(" · ")}</p><p><strong>Recognition aliases:</strong> ${entry.recognitionAliases.map(escapeHtml).join(" · ")}</p><p><strong>OCR keywords:</strong> ${entry.ocrKeywords.map(escapeHtml).join(" · ")}</p><p><strong>Chart examples:</strong> ${entry.chartExamples.map(escapeHtml).join(" · ")}</p><p><strong>Ambiguity:</strong> ${entry.ambiguityWarnings.map(escapeHtml).join(" ")}</p><p><strong>Confidence:</strong> ${escapeHtml(entry.confidenceHint)}</p><span class="analysis-badge review">${entry.requiresLegendCheck?"Legend check required":"Context check required"}</span></section>
      ${techniqueReferenceHtml(entry)}
    </section>`;
  }
  let entries=database.searchEntries(allEntries,symbolFilters.search,symbolFilters);
  if(symbolFilters.sort==="Verification status"){
    const rank={"To Be Confirmed":0,"Manually Verified":1,"Confirmed":2};
    entries=[...entries].sort((a,b)=>(rank[a.verificationStatus]??0)-(rank[b.verificationStatus]??0)||a.nameEn.localeCompare(b.nameEn));
  }
  const sections=["Knitting Symbols & Abbreviations","Crochet Symbols & Abbreviations","Tunisian Crochet Symbols & Abbreviations","Special Stitches","Chart Reading Rules"];
  const craftOptions=["All","Knitting","Crochet","Tunisian","Shared"],categoryOptions=["All",...database.categoryOrder],difficultyOptions=["All","Beginner","Intermediate","Advanced"],terminologyOptions=["All","US","UK","CN","Chart Symbol"],verificationOptions=["All",...symbolVerificationOptions],sortOptions=["Default","Verification status"];
  return `<section class="symbol-database-shell">
    <div class="symbol-database-intro card"><p class="eyebrow">FLOW MODE FOUNDATION</p><h2>Symbols are candidates, not assumptions</h2><p>Search abbreviations, chart marks, aliases and reading rules. Every symbol keeps ambiguity and legend-check guidance for future reviewed recognition.</p></div>
    <div class="symbol-admin-toolbar card" aria-label="Symbol Database controls"><div><strong>Manage your symbol database</strong><p>Edits are saved locally without changing Yarncha's recoverable defaults.</p></div><div class="button-row"><button class="secondary-button" id="add-symbol">Add new symbol</button><button class="secondary-button" id="export-symbols">Export JSON</button><button class="secondary-button" id="import-symbols">Import JSON</button><button class="secondary-button danger-button" id="reset-all-symbols">Reset all to default</button><input id="symbol-import-file" type="file" accept="application/json,.json" hidden></div></div>
    <div class="symbol-quick-filters" aria-label="Quick symbol filters"><button class="secondary-button" data-symbol-quick="All">All</button><button class="secondary-button" data-symbol-quick="Knitting">Knitting</button><button class="secondary-button" data-symbol-quick="Crochet">Crochet</button><button class="secondary-button" data-symbol-quick="Cable">Cable</button><button class="secondary-button" data-symbol-quick="Increase">Increase</button><button class="secondary-button" data-symbol-quick="Decrease">Decrease</button><button class="secondary-button" data-symbol-quick="Basic">Basic</button></div>
    <div class="symbol-filter-bar card"><label class="symbol-search"><span>Search</span><input id="symbol-search" type="search" value="${escapeHtml(symbolFilters.search)}" placeholder="Symbol, US/UK abbreviation, 中文名稱 or alias"></label><label><span>Craft</span><select id="symbol-craft-filter">${craftOptions.map(value=>`<option ${symbolFilters.craft===value?"selected":""}>${value}</option>`).join("")}</select></label><label><span>Category</span><select id="symbol-category-filter">${categoryOptions.map(value=>`<option ${symbolFilters.category===value?"selected":""}>${value}</option>`).join("")}</select></label><label><span>Difficulty</span><select id="symbol-difficulty-filter">${difficultyOptions.map(value=>`<option ${symbolFilters.difficulty===value?"selected":""}>${value}</option>`).join("")}</select></label><label><span>Terminology</span><select id="symbol-terminology-filter">${terminologyOptions.map(value=>`<option ${symbolFilters.terminology===value?"selected":""}>${value==="US"?"US terms":value==="UK"?"UK terms":value==="CN"?"Chinese terms":value}</option>`).join("")}</select></label><label><span>Verification</span><select id="symbol-verification-filter">${verificationOptions.map(value=>`<option ${symbolFilters.verification===value?"selected":""}>${value}</option>`).join("")}</select></label><label><span>Sort</span><select id="symbol-sort">${sortOptions.map(value=>`<option ${symbolFilters.sort===value?"selected":""}>${value}</option>`).join("")}</select></label></div>
    <p class="symbol-result-count">${entries.length} matching entries · ${(state.symbolFavorites||[]).length} favorites</p>
    ${entries.length?sections.map(section=>{const items=entries.filter(entry=>entry.section===section);return items.length?`<section class="symbol-section"><div class="section-heading"><div><p class="eyebrow">SYMBOL DATABASE</p><h2>${escapeHtml(section)}</h2></div><span>${items.length} entries</span></div><div class="symbol-grid">${items.map(entry=>`<article class="symbol-card card"><button class="symbol-card-open" data-symbol-id="${entry.id}" aria-label="Open ${escapeHtml(entry.nameEn)} details"><span class="symbol-card-mark">${symbolVisualHtml(entry)}</span><span class="symbol-card-copy"><strong>${escapeHtml(entry.nameEn)}</strong><small>${escapeHtml(entry.nameZh)}</small><span class="symbol-card-abbreviation">${entry.craft==="Crochet"?`US ${escapeHtml(entry.abbreviationUS||"—")} · UK ${escapeHtml(entry.abbreviationUK||"—")}`:escapeHtml(entry.abbreviation||entry.category)}</span>${symbolVerificationBadge(entry)}<span class="symbol-region-badges">${symbolRegionBadges(entry)}</span><em>${escapeHtml(entry.category)} · ${escapeHtml(entry.difficulty)}${entry.needsReview?" · Needs review":""}</em></span></button><button class="symbol-card-edit" data-edit-symbol="${entry.id}" aria-label="Edit ${escapeHtml(entry.nameEn)}" title="Edit symbol">${uiIcon("edit","ui-icon")}</button>${(state.symbolFavorites||[]).includes(entry.id)?`<span class="symbol-favorite" aria-label="Favorite">Saved</span>`:""}</article>`).join("")}</div></section>`:"";}).join(""):`<div class="empty-state"><h3>No symbols match these filters</h3><p>Try a different craft, category, terminology or search term.</p></div>`}
  </section>`;
}
function symbolMeaningText(entry){return `${entry.nameEnglish}${entry.abbreviation?` (${entry.abbreviation})`:""}\nTraditional Chinese: ${entry.nameTraditionalChinese}\nChart symbol: ${entry.visualSymbol}\n${entry.craft==="Crochet"?`US: ${entry.abbreviationUS||"—"} · UK: ${entry.abbreviationUK||"—"} · CN: ${entry.abbreviationChinese||"—"}\n`:""}Meaning: ${entry.explanation}\nHow to: ${entry.howTo}\n${entry.chartLegendWarning}\nFlow Mode note: ${entry.confidenceHint}`;}
function openSymbolProjectModal(entry){
  if(!state.projects.length)return toast("Create a project before saving notes.");
  openModal(`<p class="eyebrow">SYMBOL DATABASE</p><h2>Save to Project Notes</h2><p>${escapeHtml(entry.fullName)} will be added as a reference note.</p><div class="field"><label for="symbol-project-select">Project</label><select id="symbol-project-select">${state.projects.map(project=>`<option value="${project.id}" ${project.id===state.activeProjectId?"selected":""}>${escapeHtml(project.name)}</option>`).join("")}</select></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="confirm-symbol-project">Save note</button></div>`);
  document.getElementById("confirm-symbol-project").onclick=()=>{const project=state.projects.find(item=>item.id===document.getElementById("symbol-project-select").value);if(!project)return;project.notes=`${project.notes||""}${project.notes?"\n\n":""}[Symbol Database]\n${symbolMeaningText(entry)}`;saveProjectTouch(project);closeModal(true);toast("Symbol saved to project notes");};
}
function bindSymbolDatabase(){
  const database=window.YarnchaSymbolDatabase;if(!database)return;
  hydrateSymbolPictures();
  document.getElementById("symbol-search")?.addEventListener("input",event=>{symbolFilters.search=event.target.value;renderLibrary();requestAnimationFrame(()=>document.getElementById("symbol-search")?.focus());});
  [["symbol-craft-filter","craft"],["symbol-category-filter","category"],["symbol-difficulty-filter","difficulty"],["symbol-terminology-filter","terminology"],["symbol-verification-filter","verification"],["symbol-sort","sort"]].forEach(([id,key])=>document.getElementById(id)?.addEventListener("change",event=>{symbolFilters[key]=event.target.value;renderLibrary();}));
  document.querySelectorAll("[data-symbol-quick]").forEach(button=>button.addEventListener("click",()=>{const value=button.dataset.symbolQuick;symbolFilters.craft=["Knitting","Crochet"].includes(value)?value:"All";symbolFilters.category=["Cable","Increase","Decrease","Basic"].includes(value)?value:"All";renderLibrary();}));
  document.querySelectorAll("[data-symbol-id]").forEach(button=>button.onclick=()=>{currentSymbolId=button.dataset.symbolId;renderLibrary();});
  document.querySelectorAll("[data-edit-symbol]").forEach(button=>button.onclick=()=>openSymbolEditModal(mergedSymbolEntries().find(entry=>entry.id===button.dataset.editSymbol)));
  document.getElementById("add-symbol")?.addEventListener("click",()=>openSymbolEditModal());
  document.getElementById("export-symbols")?.addEventListener("click",exportSymbolsJson);
  const importInput=document.getElementById("symbol-import-file");
  document.getElementById("import-symbols")?.addEventListener("click",()=>importInput?.click());
  importInput?.addEventListener("change",event=>{const file=event.target.files?.[0];if(file)importSymbolsJson(file);});
  document.getElementById("reset-all-symbols")?.addEventListener("click",resetAllSymbolOverrides);
  document.getElementById("symbol-detail-back")?.addEventListener("click",()=>{currentSymbolId=null;renderLibrary();});
  const entry=mergedSymbolEntries().find(item=>item.id===currentSymbolId);if(!entry)return;
  document.getElementById("edit-symbol-detail")?.addEventListener("click",()=>openSymbolEditModal(entry));
  document.getElementById("copy-symbol-meaning")?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(symbolMeaningText(entry));toast("Meaning copied");}catch{toast("Copy is blocked in this browser.");}});
  document.getElementById("save-symbol-project")?.addEventListener("click",()=>openSymbolProjectModal(entry));
  document.getElementById("favorite-symbol")?.addEventListener("click",()=>{const favorites=new Set(state.symbolFavorites||[]);favorites.has(entry.id)?favorites.delete(entry.id):favorites.add(entry.id);state.symbolFavorites=[...favorites];saveState();renderLibrary();});
  const fileInput=document.getElementById("symbol-technique-file");
  const openPicker=()=>fileInput?.click();
  document.getElementById("upload-symbol-technique")?.addEventListener("click",openPicker);
  document.getElementById("replace-symbol-technique")?.addEventListener("click",openPicker);
  fileInput?.addEventListener("change",event=>saveSymbolTechniqueReference(entry,event.target.files?.[0]));
  document.getElementById("remove-symbol-technique")?.addEventListener("click",async()=>{if(!confirm("Remove this personal technique reference?"))return;const reference=(state.userTechniqueReferences||{})[entry.id];if(reference?.assetId)await deleteAsset(reference.assetId);const references={...(state.userTechniqueReferences||{})};delete references[entry.id];state.userTechniqueReferences=references;saveState();renderLibrary();toast("Technique reference removed");});
}
function renderLibrary() {
  const host=document.getElementById("library-content");
  const cleanSections=sanitizeLibrarySections(state.librarySections||[]);
  if(cleanSections.length!==(state.librarySections||[]).length){
    state.librarySections=cleanSections;
    saveState();
  }
  if(!currentLibrarySection){
    host.innerHTML=`<div class="page-title split-title"><div><p class="eyebrow">YOUR MAKING WIKI</p><h1>Library</h1><p>A flexible home for your symbols, pattern files, notes and ideas.</p></div><button class="secondary-button" id="add-library-space">+ Custom space</button></div>
      <div class="library-home-grid">${state.librarySections.map(s=>`<button class="library-space card" data-library-space="${s.id}"><span class="library-space-count">${librarySectionCount(s)} items</span><div class="library-space-icon">${librarySectionIcon(s.id)}</div><h2>${escapeHtml(s.name)}</h2><p>${escapeHtml(s.description)}</p></button>`).join("")}</div>`;
    document.getElementById("add-library-space").onclick=()=>openLibrarySpaceModal();
  } else {
    const section=state.librarySections.find(s=>s.id===currentLibrarySection);
    if(!section){currentLibrarySection=null;return renderLibrary();}
    host.innerHTML=`<button class="text-button library-back" id="library-back">← All library spaces</button><div class="page-title split-title"><div><p class="eyebrow">PERSONAL LIBRARY</p><h1>${escapeHtml(section.name)}</h1><p>${escapeHtml(section.description)}</p></div>${section.id==="symbols"?"":`<div><button class="secondary-button" id="rename-library">Rename</button> <button class="primary-button" id="add-library-item">${section.id==="materials"?"+ Add yarn material":section.id==="ideas"?"+ Add Project Idea":"+ Add page or PDF"}</button></div>`}</div>
      ${section.id==="materials"?yarnMaterialReferenceHtml():section.id==="symbols"?symbolDatabaseHtml():section.id==="tool-manual"?toolManualHtml():section.id==="theory"?theoryFoundationHtml():section.id==="ideas"?projectIdeasHtml():""}
      <div class="notion-list">${["symbols","ideas"].includes(section.id)?"":section.items.length?section.items.map(item=>`<div class="notion-row"><div>${item.fileData||item.assets?.length?"▧":"□"}</div><div><h3>${escapeHtml(item.name)}</h3><p>${item.craft?`${escapeHtml(item.craft)} · `:""}${escapeHtml(item.notes||"No notes")}${item.assets?.length?` · ${item.assets.length} files`:item.fileName?` · ${escapeHtml(item.fileName)}`:""}</p></div><div class="row-actions"><button class="mini-button" data-edit-item="${item.id}">Edit</button>${item.fileData||item.assets?.length?`<button class="mini-button" data-open-item="${item.id}">View files</button>`:""}</div></div>`).join(""):["materials","tool-manual","theory","ideas"].includes(section.id)?"":`<div class="empty-state"><h3>This space is ready for your own pages</h3><p>Add a named section, note or PDF tutorial.</p></div>`}</div>`;
    document.getElementById("library-back").onclick=()=>{currentLibrarySection=null;renderLibrary();};
    document.getElementById("add-library-item")?.addEventListener("click",()=>section.id==="materials"?openYarnMaterialModal():section.id==="ideas"?openProjectIdeaModal():openLibraryItemModal(section.id));
    document.getElementById("rename-library")?.addEventListener("click",()=>openLibrarySpaceModal(section.id));
    document.querySelectorAll("[data-open-item]").forEach(b=>b.onclick=()=>openLibraryAssets(section.items.find(i=>i.id===b.dataset.openItem)));
    document.querySelectorAll("[data-edit-item]").forEach(b=>b.onclick=()=>openLibraryItemModal(section.id,b.dataset.editItem));
    document.querySelectorAll("[data-edit-material]").forEach(b=>b.onclick=()=>openYarnMaterialModal(b.dataset.editMaterial));
    bindProjectIdeas();
    bindSymbolDatabase();
    hydrateMaterialImages();
  }
  queueMicrotask(applyLanguage);
}
function yarnMaterialReferenceHtml(){return `<div class="material-reference"><div class="material-source-note">Quick fibre comparison. Final feel also depends on spin, blend, gauge and fabric density.</div><div class="material-grid">${state.yarnMaterials.map(m=>{const r=materialRatings(m);return `<article class="material-card card">${m.imageAsset?`<img class="material-photo" data-material-image="${m.imageAsset}" alt="">`:""}<h3>${escapeHtml(m.name)}</h3><span>${escapeHtml(m.category||m.origin)}</span><div class="rating-grid"><div><small>Warmth</small><strong>${r.warmth}/5</strong></div><div><small>Drape</small><strong>${r.drape}/5</strong></div><div><small>Elasticity</small><strong>${r.elasticity}/5</strong></div><div><small>Care</small><strong>${r.care}/5</strong></div></div><dl><dt>Best season</dt><dd>${escapeHtml(m.season)}</dd><dt>Substitutions</dt><dd>${escapeHtml(r.substitutions)}</dd><dt>Best uses</dt><dd>${escapeHtml(r.uses)}</dd><dt>Texture</dt><dd>${escapeHtml((m.textures||[]).join(", ")||m.texture||"Not specified")}</dd><dt>Useful to know</dt><dd>${escapeHtml(m.features)}</dd></dl><div class="row-actions"><button class="mini-button" data-edit-material="${m.id}">Edit</button></div></article>`}).join("")}</div></div>`;}
function materialRatings(m){
  const name=(m.name||"").toLowerCase(),text=`${m.texture||""} ${(m.textures||[]).join(" ")} ${m.features||""}`.toLowerCase();
  const warm=/alpaca|cashmere|mohair|wool|warm/.test(name+text)?5:/acrylic|polyester/.test(name)?3:/cotton|linen|hemp|bamboo|lyocell|silk/.test(name)?2:3;
  const drape=/alpaca|silk|bamboo|lyocell|linen|drapey|fluid/.test(name+text)?5:/cotton|hemp/.test(name)?4:/wool|acrylic/.test(name)?3:3;
  const elasticity=/wool|nylon|springy|elastic/.test(name+text)?5:/acrylic|polyester/.test(name)?3:/cotton|linen|silk|bamboo|hemp|alpaca/.test(name)?1:3;
  const care=/cashmere|mohair|silk/.test(name)?4:/wool|alpaca|linen|hemp/.test(name)?3:/cotton|acrylic|polyester|nylon/.test(name)?2:3;
  const substitutions=/wool/.test(name)?"alpaca blends, acrylic-wool blends, other same-weight animal fibres":/cotton/.test(name)?"linen, bamboo blends, cotton-acrylic blends":/linen|hemp/.test(name)?"cotton-linen blends, bamboo/lyocell blends":/alpaca/.test(name)?"wool-alpaca blends, merino for more bounce":/acrylic/.test(name)?"machine-wash wool blends, cotton-acrylic blends":/silk|bamboo|lyocell/.test(name)?"other smooth drapey plant/regenerated fibres":"same yarn weight with similar drape and elasticity";
  const uses=/sock|nylon/.test(name+text)?"socks, heels/toes, hard-wearing blends":warm>=5?"scarves, sweaters, winter accessories":drape>=5?"shawls, lace, fluid tops":elasticity>=5?"garments needing recovery, ribbing, cables":"bags, homewares, warm-weather garments";
  return {warmth:warm,drape,elasticity,care,substitutions,uses};
}
async function hydrateMaterialImages(){for(const img of document.querySelectorAll("[data-material-image]")){const file=await getAsset(img.dataset.materialImage);if(file)img.src=URL.createObjectURL(file);}}
async function deleteYarnMaterial(material){
  if(!material)return;
  if(!confirm("Are you sure you want to delete this item?"))return;
  if(material.imageAsset)await deleteAsset(material.imageAsset);
  state.yarnMaterials=state.yarnMaterials.filter(item=>item.id!==material.id);
  saveState();closeModal(true);renderLibrary();toast("Yarn material deleted.");
}
function manualDetailsForTool(tool){
  const relatedById={basic:"Repeat Calculator, Budget Calculator",swatch:"Needle / Hook Adjustment, Pattern / Garment Resizer",shaping:"Row / Round Counter Helper, Pattern / Garment Resizer",garment:"Gauge / Swatch Calculator, Repeat Calculator",unit:"Yarn Weight Converter, Gauge / Swatch Calculator",budget:"Buy List, Yarn Estimator", "yarn-estimator":"Buy List, Yarn Substitution Helper",substitution:"Yarn Estimator, Yarn Weight Converter", "yarn-weight":"Yarn Estimator, Needle / Hook Adjustment", grid:"Project Rendering Studio", stripe:"Project Rendering Studio", pooling:"Project Rendering Studio", "size-reference":"Gauge / Swatch Calculator"};
  return {
    what:tool.desc,
    when:`Use it when you are planning or checking ${tool.name.toLowerCase()} numbers before committing to the project.`,
    inputs:`Enter the labelled measurements from your pattern, swatch or plan. Keep measurements in ${unitSystemLabel()} unless the tool specifically asks for another unit.`,
    outputs:`Yarncha returns an estimate or planning note you can copy, save to notes, link to project history, save as an idea, or add to Buy List when relevant.`,
    example:`Beginner example: enter the sample values shown in the calculator, press Calculate, then compare the result with your pattern before changing stitches or buying yarn.`,
    mistake:"Common mistake: mixing unit systems, skipping a swatch, or treating an estimate as a checked final pattern.",
    related:relatedById[tool.id]||"Gauge / Swatch Calculator, Unit Converter, Project Notes"
  };
}
function toolManualHtml(){
  return `<div class="manual-grid">${toolkitToolDefs.map(tool=>{const m=manualDetailsForTool(tool);return `<article class="manual-card card"><p class="eyebrow">${escapeHtml(tool.category)} · ${escapeHtml(toolCraftLabel(tool))}</p><h3>${escapeHtml(tool.name)}</h3><dl><dt>What it is for</dt><dd>${escapeHtml(m.what)}</dd><dt>When to use it</dt><dd>${escapeHtml(m.when)}</dd><dt>Inputs explained</dt><dd>${escapeHtml(m.inputs)}</dd><dt>Output explained</dt><dd>${escapeHtml(m.outputs)}</dd><dt>Beginner example</dt><dd>${escapeHtml(m.example)}</dd><dt>Common mistake</dt><dd>${escapeHtml(m.mistake)}</dd><dt>Related tools</dt><dd>${escapeHtml(m.related)}</dd></dl></article>`;}).join("")}</div>`;
}
const theoryTopics={
  Beginner:["Yarn weight","Needle and hook size","Gauge basics","Tension","Reading labels","Basic stitch anatomy","Rows vs rounds","Why swatching matters"],
  Intermediate:["Ease","Shaping","Increases and decreases","Pattern repeats","Stitch multiples","Blocking","Yarn substitution","Working from charts"],
  Advanced:["Garment construction","Sleeve shaping","Raglan, yoke, drop shoulder, set-in sleeve","Lace and cable logic","Crochet shaping","Tunisian crochet structure","Calculating modifications"],
  Expert:["Grading sizes","Pattern design math","Advanced gauge adjustment","Fibre behavior","Drape and fabric density","Professional fit checking","Multi-size garment planning"]
};
function theoryFoundationHtml(){
  const related={Gauge:"Gauge / Swatch Adapter",Yarn:"Yarn Estimator",Needle:"Needle / Hook Adjustment",hook:"Needle / Hook Adjustment",Shaping:"Increase & Decrease Planner",Ease:"Garment Resizer",Pattern:"Repeat Calculator",Blocking:"Gauge / Swatch Adapter"};
  return `<div class="theory-levels">${Object.entries(theoryTopics).map(([level,topics])=>`<section class="theory-level card"><p class="eyebrow">${level}</p><h2>${level} foundations</h2><div class="theory-topic-list">${topics.map(topic=>{const relatedTool=Object.entries(related).find(([key])=>topic.includes(key))?.[1]||"Tool Manual";return `<article><h3>${escapeHtml(topic)}</h3><p><strong>Short explanation:</strong> ${escapeHtml(theoryExplanation(topic))}</p><p><strong>Why it matters:</strong> It helps you predict size, fabric, fit or yarn use before the project becomes expensive to undo.</p><p><strong>Practical example:</strong> Try the related calculator with your own pattern numbers before changing the project.</p><p><strong>Common mistakes:</strong> Mixing units, skipping a swatch, or trusting one number without checking the fabric.</p><small>Related tool: ${escapeHtml(relatedTool)}</small></article>`}).join("")}</div></section>`).join("")}</div>`;
}
function theoryExplanation(topic){
  if(/Yarn weight/.test(topic))return "Yarn weight describes yarn thickness; it affects gauge, drape and yardage.";
  if(/Needle|hook/.test(topic))return "Tool size changes stitch size, which changes the finished measurement.";
  if(/Gauge|swatching/.test(topic))return "Gauge is stitches and rows per measured area, usually checked on a swatch.";
  if(/Tension/.test(topic))return "Tension is how tightly or loosely you hold and form stitches.";
  if(/Ease/.test(topic))return "Ease is the difference between body measurement and garment measurement.";
  if(/Shaping|Increases|decreases/.test(topic))return "Shaping changes stitch counts to form curves, sleeves, armholes and fit.";
  if(/repeats|multiples/.test(topic))return "Repeats and multiples are pattern blocks that must fit cleanly into your stitch count.";
  if(/Blocking/.test(topic))return "Blocking relaxes and sets fabric, often changing final measurements.";
  if(/construction|Raglan|Sleeve|shoulder/.test(topic))return "Garment construction describes how the body and sleeves are built and joined.";
  if(/Tunisian/.test(topic))return "Tunisian crochet keeps loops on the hook and often creates denser fabric with curl.";
  if(/Fibre|Drape|density/.test(topic))return "Fibre and fabric density decide warmth, stretch, flow and durability.";
  return "This concept helps connect pattern instructions to real fabric behavior.";
}
function openYarnMaterialModal(materialId=null){
  const material=state.yarnMaterials.find(m=>m.id===materialId),textures=["Soft","Springy","Smooth","Drapey","Fuzzy","Crisp","Rustic","Lustrous","Warm","Cool","Lightweight","Dense"];
  openModal(`<p class="eyebrow">YARN MATERIAL</p><h2>${material?"Edit":"Add"} yarn material</h2><div class="form-grid"><div class="field full"><label>Material name</label><input id="material-name" value="${escapeHtml(material?.name||"")}"></div><div class="field"><label>Fibre group</label><select id="material-category">${["Natural","Synthetic","Blends","Other"].map(v=>`<option ${material?.category===v?"selected":""}>${v}</option>`).join("")}</select></div><div class="field"><label>Specify Other</label><input id="material-other" value="${escapeHtml(material?.otherCategory||"")}" placeholder="Required for Other"></div><div class="field full upload-drop"><label>Material photo</label><input id="material-photo" type="file" accept="image/*"><small>${material?.imageAsset?"Select a new photo to replace the current one.":"Optional reference photo."}</small></div><div class="field full"><label>Best season</label><input id="material-season" value="${escapeHtml(material?.season||"")}" placeholder="e.g. warm weather, winter, all season"></div><div class="field full"><label>Texture</label><div class="texture-checks">${textures.map(t=>`<label class="check-row"><input type="checkbox" name="material-texture" value="${t}" ${(material?.textures||[]).includes(t)?"checked":""}><span>${t}</span></label>`).join("")}</div></div><div class="field full"><label>Useful to know</label><textarea id="material-notes" rows="5">${escapeHtml(material?.features||"")}</textarea></div></div>${material?`<section class="danger-zone compact-danger-zone"><strong>Danger Zone</strong><p>Delete this yarn material only if you no longer need it. This action cannot be undone.</p><button type="button" class="danger-button secondary-button" id="delete-material-inside-edit">Delete item</button></section>`:""}<div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-material">Save material</button></div>`);
  document.getElementById("delete-material-inside-edit")?.addEventListener("click",()=>deleteYarnMaterial(material));
  document.getElementById("save-material").onclick=async()=>{const name=document.getElementById("material-name").value.trim(),category=document.getElementById("material-category").value,otherCategory=document.getElementById("material-other").value.trim();if(!name)return toast("Name this yarn material.");if(category==="Other"&&!otherCategory)return toast("Specify the Other fibre group.");const values={name,category,otherCategory,origin:category==="Other"?otherCategory:category,season:document.getElementById("material-season").value.trim(),textures:[...document.querySelectorAll('[name="material-texture"]:checked')].map(x=>x.value),features:document.getElementById("material-notes").value.trim(),imageAsset:material?.imageAsset||null};const photo=document.getElementById("material-photo").files[0];if(photo){values.imageAsset=`materialimg${Date.now()}`;await putAsset(values.imageAsset,photo);}if(material)Object.assign(material,values);else state.yarnMaterials.push({id:`material${Date.now()}`,...values});saveState();closeModal();renderLibrary();};
}
async function openLibraryAssets(item){
  if(item?.fileData)return openModal(`<h2>${escapeHtml(item.name)}</h2><iframe class="library-preview" src="${item.fileData}"></iframe><div class="modal-actions"><button class="primary-button" onclick="closeModal()">Exit preview</button></div>`);
  const assets=[];
  for(const asset of item?.assets||[]){const file=await getAsset(asset.id);if(file)assets.push({asset,file,url:URL.createObjectURL(file)});}
  if(!assets.length)return toast("No stored files were found.");
  openModal(`<h2>${escapeHtml(item.name)}</h2><div class="library-preview-list">${assets.map(({asset,file,url})=>file.type==="application/pdf"?`<div><strong>${escapeHtml(asset.name)}</strong><iframe class="library-preview" src="${url}#toolbar=0"></iframe></div>`:`<figure><img class="library-preview-image" src="${url}" alt="${escapeHtml(asset.name)}"><figcaption>${escapeHtml(asset.name)}</figcaption></figure>`).join("")}</div><div class="modal-actions"><button class="primary-button" onclick="closeModal()">Exit preview</button></div>`);
}

function renderSettings(){
  const host=document.getElementById("settings-content");
  const projectCount=state.projects.length,lastSaved=state.lastSavedAt?formatSavedTime(state.lastSavedAt):"Not yet";
  const limitations=[
    ["Local drafts are stored per browser/device.","Signed-in private beta users can migrate projects to cloud, while Export / Import remains the recovery backup."],
    ["AI chart recognition is a review-first private beta.","It runs only for signed-in users on explicitly selected cloud chart images. Every uncertain cell requires manual review before a written pattern is trusted."],
    ["Email auth and Supabase sync are prepared; Google, Apple, public sharing, and a custom domain are not included yet.","These can be introduced after private beta security and data migration are validated."],
    ["Annotation drawing supports MVP freehand tools, highlighter strokes, eraser, undo, redo, colour, opacity, thickness and Row Mask.","It is not yet a full pro drawing engine. Future work can add pressure sensitivity, lasso selection and more advanced smoothing."],
    ["PDF viewing relies on the browser’s native PDF capabilities.","More advanced page navigation, zoom controls, thumbnails, and PDF-native annotation features can be added later using a dedicated PDF viewer library."],
    ["Local preview availability may depend on the development environment.","A deployed website will be more stable than a temporary local preview server."]
  ];
  const activeTheme=normalizeThemeName(state.theme?.name),activeStyle=normalizeDesignStyle(state.theme?.style);
  const activeThemePreset=themePresets.find(t=>t.id===activeTheme)||themePresets[0];
  const preferences=state.appPreferences||starterData.appPreferences;
  host.innerHTML=`<div class="page-title"><p class="eyebrow">YOUR YARNCHA</p><h1>Settings</h1><p>Personalise your workspace and keep your projects safely within reach.</p></div>
    <div class="settings-page-shell">
      <div class="settings-group-title"><p class="eyebrow">PREFERENCES</p><h2>Preferences</h2></div>
      <section class="card mobile-card settings-panel settings-panel-wide appearance-panel"><div class="settings-section-heading"><span class="settings-section-icon">${uiIcon("appearance","ui-icon")}</span><div><p class="eyebrow">APPEARANCE</p><h2>Make Yarncha feel like yours</h2><p>Choose a colour mood, design style, display mode, and language.</p></div></div>
        <div class="appearance-heading"><h3>Colour theme</h3><button class="mini-button" id="reset-appearance">Reset default</button></div>
        <div class="appearance-grid theme-preview-grid">${themePresets.map(t=>`<button class="theme-preview-card ${activeTheme===t.id?"active":""}" data-theme-name="${t.id}" style="--preview-primary:${t.primary};--preview-secondary:${t.secondary};--preview-bg:${t.background};--preview-card:${t.card};--preview-text:${t.text};--preview-button:${t.button};--preview-highlight:${t.highlight};"><span class="theme-preview-surface"><i></i><b></b></span><strong>${escapeHtml(t.name)}</strong><small>${escapeHtml(t.background)} · ${escapeHtml(t.button)}</small><span class="swatch-row"><em></em><em></em><em></em><em></em></span></button>`).join("")}</div>
        <div class="appearance-heading"><h3>Light / Dark preview</h3><span class="muted-copy">Preview the selected theme before applying a mode.</span></div>
        ${themeComparePreviewHtml(activeThemePreset)}
        <div class="appearance-heading"><h3>Mode</h3><span class="muted-copy">System follows your device setting.</span></div>
        <div class="theme-grid mode-grid">${["light","dark","system"].map(m=>`<button class="theme-choice ${state.theme.mode===m?"active":""}" data-theme-mode="${m}">${m}</button>`).join("")}</div>
        <div class="appearance-heading"><h3>Design style</h3><span class="muted-copy">Style affects spacing, card shape, shadows, texture and overall feel.</span></div>
        <div class="appearance-grid style-preview-grid">${designStyles.map(s=>`<button class="style-preview-card ${activeStyle===s.id?"active":""}" data-style-name="${s.id}"><span class="style-sample ${s.id}"><i></i><i></i><i></i></span><strong>${escapeHtml(s.name)}</strong><small>${escapeHtml(s.desc)}</small></button>`).join("")}</div>
        <div class="settings-divider"></div><div class="settings-form-row"><div><strong>Language</strong><p>Choose the language used across Yarncha.</p></div><select id="settings-language" aria-label="App language"><option value="en" ${state.language==="en"?"selected":""}>English</option><option value="zh-HK" ${state.language==="zh-HK"?"selected":""}>繁體中文（香港）</option></select></div>
      </section>
      <section class="card mobile-card settings-panel"><div class="settings-section-heading"><span class="settings-section-icon">${uiIcon("preferences","ui-icon")}</span><div><p class="eyebrow">APP PREFERENCES</p><h2>Making preferences</h2><p>Set the defaults Yarncha uses while you work.</p></div></div><div class="settings-form-row settings-form-row-stack"><div><strong>Preferred units</strong><p>Calculators use this system by default.</p></div><div class="theme-grid mode-grid"><button class="theme-choice ${state.unitSystem!=="imperial"?"active":""}" data-unit-system="metric">UK / Metric<br><small>cm · mm · metres · grams</small></button><button class="theme-choice ${state.unitSystem==="imperial"?"active":""}" data-unit-system="imperial">US / Imperial<br><small>inches · yards · ounces</small></button></div></div><div class="settings-divider"></div><label class="settings-toggle-row"><span><strong>Voice controls</strong><small>Allow hands-free row and note commands.</small></span><input type="checkbox" id="settings-voice" ${preferences.voice!==false?"checked":""}><i aria-hidden="true"></i></label><div class="settings-divider"></div><label class="settings-toggle-row"><span><strong>Notification prompts</strong><small>Remember whether Yarncha may offer browser reminders later.</small></span><input type="checkbox" id="settings-notifications" ${preferences.notifications?"checked":""}><i aria-hidden="true"></i></label></section>
      <div class="settings-group-title"><p class="eyebrow">PROJECTS & BACKUP</p><h2>Projects & Backup</h2></div>
      <section class="card mobile-card settings-panel"><div class="settings-section-heading"><span class="settings-section-icon">${uiIcon("storage","ui-icon")}</span><div><p class="eyebrow">LOCAL DATA</p><h2>Your saved work</h2><p>Review local storage and move projects using a Yarncha backup.</p></div></div><div class="storage-status-panel"><span>Projects <strong>${projectCount}</strong></span><span>Autosave <strong>Enabled</strong></span><span>Last saved <strong>${lastSaved}</strong></span><span>Storage <strong>Local-first</strong></span></div><div class="settings-divider"></div><div class="settings-form-row settings-form-row-stack"><div><strong>Export or import projects</strong><p>Backup before clearing browser data, changing browsers, or moving devices.</p></div><div class="backup-actions"><select id="backup-project-select" aria-label="Project to export"><option value="">All projects</option>${state.projects.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("")}</select><button class="secondary-button" id="export-selected-project">Export selected</button><button class="primary-button" id="export-all-projects">Export all projects</button><button class="secondary-button" id="import-project-backup">Import backup</button><input id="settings-backup-file" type="file" accept=".json,application/json" hidden></div></div><div class="backup-mode"><label class="check-row"><input type="radio" name="import-mode" value="merge" checked><span>Merge with current projects</span></label><label class="check-row"><input type="radio" name="import-mode" value="replace"><span>Replace all local projects</span></label></div><div class="privacy-note">Local drafts belong to this browser and device. Export a backup before moving elsewhere.</div></section>
      <div id="cloud-settings-anchor" class="settings-cloud-anchor"></div>
      <section class="card mobile-card settings-panel settings-panel-wide settings-notes-panel"><div class="settings-section-heading"><span class="settings-section-icon">${uiIcon("info","ui-icon")}</span><div><p class="eyebrow">UPDATES & LIMITATIONS</p><h2>What to know</h2><p>Honest notes about the current Yarncha build.</p></div></div><div class="limitations-list">${limitations.map(([limit,fix])=>`<article><strong>${escapeHtml(limit)}</strong><p>${escapeHtml(fix)}</p></article>`).join("")}</div></section>
    </div>`;
  document.querySelectorAll("[data-theme-name]").forEach(b=>b.onclick=()=>{state.theme.name=b.dataset.themeName;saveState();renderSettings();});
  document.querySelectorAll("[data-style-name]").forEach(b=>b.onclick=()=>{state.theme.style=b.dataset.styleName;saveState();renderSettings();});
  document.querySelectorAll("[data-theme-mode]").forEach(b=>b.onclick=()=>{state.theme.mode=b.dataset.themeMode;saveState();renderSettings();});
  document.getElementById("reset-appearance").onclick=()=>{state.theme=structuredClone(starterData.theme);saveState();renderSettings();};
  document.querySelectorAll("[data-unit-system]").forEach(b=>b.onclick=()=>{state.unitSystem=b.dataset.unitSystem;saveState();renderSettings();});
  document.getElementById("settings-language").onchange=event=>{state.language=event.target.value;document.getElementById("app-language").value=state.language;saveState();applyLanguage();renderTimeGreeting();};
  document.getElementById("settings-voice").onchange=event=>{state.appPreferences={...(state.appPreferences||starterData.appPreferences),voice:event.target.checked};saveState();};
  document.getElementById("settings-notifications").onchange=event=>{state.appPreferences={...(state.appPreferences||starterData.appPreferences),notifications:event.target.checked};saveState();};
  document.getElementById("export-selected-project").onclick=()=>exportBackup(document.getElementById("backup-project-select").value||null);
  document.getElementById("export-all-projects").onclick=()=>exportBackup(null);
  document.getElementById("import-project-backup").onclick=()=>document.getElementById("settings-backup-file").click();
  document.getElementById("settings-backup-file").onchange=e=>importBackup(e,document.querySelector("input[name='import-mode']:checked")?.value||"merge");
  window.YarnchaCloud?.renderSettingsSection?.(host);
  queueMicrotask(applyLanguage);
}

function renderMarket(){
  resetBudgetIfDue();
  const host=document.getElementById("market-content");
  const cartTotal=state.cart.reduce((s,i)=>s+toAud(i.quantity*i.price,i.currency||"AUD"),0);
  const budget=budgetAmountAud(),remaining=budget-cartTotal-state.budgetSettings.spent;
  const yarnCount=state.inventory.filter(i=>i.category==="Yarn").reduce((s,i)=>s+i.quantity,0);
  const needs=state.cart.filter(i=>analyzeCartItem(i).status==="need").length;
  host.innerHTML=`<div class="page-title"><div><p class="eyebrow">STASH & SHOPPING</p><h1>Yarn Stash</h1><p>Owned yarn, project allocations, shopping list and budget decisions in one place.</p></div></div>
    <div class="market-summary"><div class="summary-card card"><small>Yarn in stash</small><strong>${yarnCount}</strong></div><div class="summary-card card"><small>Cart items</small><strong>${state.cart.length}</strong></div><div class="summary-card card"><small>Likely needs</small><strong>${needs}</strong></div><div class="summary-card card"><small>Cart / budget</small><strong id="cart-budget-summary">AUD $${cartTotal.toFixed(2)} / $${budget.toFixed(0)}</strong></div></div>
    <div class="budget-alert ${remaining<0?"over":"ok"}" id="cart-budget-alert">${remaining<0?`Over budget by AUD $${Math.abs(remaining).toFixed(2)}. Remove or postpone items before adding more.`:`AUD $${remaining.toFixed(2)} remains in this ${state.budgetSettings.period} budget.`}</div>
    <div class="market-layout"><div class="market-panel card"><div class="market-panel-head"><div><p class="eyebrow">CURRENT STASH</p><h2>Inventory</h2></div></div>
      <button class="secondary-button section-add" id="add-inventory">+ Add inventory</button><div class="inventory-grid">${state.inventory.length?state.inventory.map(i=>`<div class="inventory-item"><span class="inventory-swatch" style="background:${validHex(i.color)?i.color:"#a8afa8"}"></span><div><h3>${escapeHtml(i.name)}</h3><p>${escapeHtml(i.category)} · ${i.quantity} ${escapeHtml(i.unit)}${i.details?` · ${escapeHtml(i.details)}`:""}</p></div><div class="row-actions"><button class="mini-button" data-edit-inventory="${i.id}">Edit</button><button class="mini-button danger-button" data-delete-inventory="${i.id}">Delete</button></div></div>`).join(""):`<div class="empty-state">Add yarn and tools you already own.</div>`}</div></div>
      <div class="market-panel card"><div class="market-panel-head"><div><p class="eyebrow">DECISION CART</p><h2>Shopping cart</h2></div></div>
      <div class="cart-budget-line"><div><button class="mini-button" id="edit-budget">Budget ${state.budgetSettings.currency} ${state.budgetSettings.amount}</button><button class="mini-button" id="refresh-rates">Refresh rates</button><small>Daily reference rates: ${escapeHtml(fxDate)}</small></div><strong id="cart-total-line">Cart ≈ AUD $${cartTotal.toFixed(2)}</strong></div>
      <button class="primary-button section-add" id="add-cart-item">+ Add shopping item</button><div class="cart-list">${state.cart.length?state.cart.map(i=>cartItemHtml(i)).join(""):`<div class="empty-state">Your cart is clear. Add an item when something catches your eye.</div>`}</div></div></div>`;
  document.getElementById("add-inventory").onclick=()=>openInventoryModal();
  document.getElementById("add-cart-item").onclick=()=>openCartItemModal();
  document.getElementById("edit-budget").onclick=openBudgetModal;
  document.getElementById("refresh-rates").onclick=()=>refreshFxRates(true);
  document.querySelectorAll("[data-edit-inventory]").forEach(b=>b.onclick=()=>openInventoryModal(b.dataset.editInventory));
  document.querySelectorAll("[data-delete-inventory]").forEach(b=>b.onclick=()=>{state.inventory=state.inventory.filter(i=>i.id!==b.dataset.deleteInventory);saveState();renderMarket();});
  document.querySelectorAll("[data-edit-cart]").forEach(b=>b.onclick=()=>openCartItemModal(b.dataset.editCart));
  document.querySelectorAll("[data-delete-cart]").forEach(b=>b.onclick=()=>{state.cart=state.cart.filter(i=>i.id!==b.dataset.deleteCart);saveState();renderMarket();});
  document.querySelectorAll("[data-buy-cart]").forEach(b=>b.onclick=()=>purchaseCartItem(b.dataset.buyCart));
  document.querySelectorAll("[data-cart-field]").forEach(input=>input.oninput=handleCartInlineEdit);
  document.querySelectorAll("[data-cart-select]").forEach(input=>input.onchange=handleCartInlineEdit);
  hydrateCartImages();
  queueMicrotask(applyLanguage);
}
function validHex(color){return /^#[0-9a-f]{6}$/i.test(color||"");}
function analyzeCartItem(item){
  const reasons=[],project=item.projectId?state.projects.find(p=>p.id===item.projectId):null;
  const owned=state.inventory.filter(i=>i.name.toLowerCase()===item.name.toLowerCase()).reduce((s,i)=>s+i.quantity,0);
  const projectRequired=project?.buyList.some(i=>i.name.toLowerCase()===item.name.toLowerCase());
  if(projectRequired)reasons.push(`Listed for ${project.name}.`);
  if(project&&!projectRequired)reasons.push(`Linked to ${project.name}, but not on its buy list.`);
  if(owned>=item.quantity)reasons.push(`You already have ${owned} matching ${item.category.toLowerCase()} item(s) in inventory.`);
  else if(item.category==="Yarn")reasons.push(`Inventory appears short by ${Math.max(0,item.quantity-owned)}.`);
  if(item.reason)reasons.push(`Your reason: ${item.reason}`);
  const total=toAud(item.quantity*item.price,item.currency||"AUD");
  if(total>state.marketBudget*.5)reasons.push("This one item uses more than half of the shopping budget.");
  const need=projectRequired||(project&&owned<item.quantity);
  const want=!project&&owned>=item.quantity;
  return {status:need?"need":want?"want":"review",label:need?"Likely need":want?"Likely want":"Review first",reason:reasons.join(" ")||"No project need or inventory evidence has been added yet."};
}
function cartItemHtml(i){
  const a=analyzeCartItem(i),project=state.projects.find(p=>p.id===i.projectId);
  const local=i.quantity*i.price,aud=toAud(local,i.currency||"AUD");
  return `<div class="cart-item"><div class="cart-item-top"><div class="cart-title">${i.imageAsset?`<img data-cart-image="${i.imageAsset}" alt="">`:""}<div><h3>${escapeHtml(i.name)}</h3><div class="cart-meta">${escapeHtml(i.category)} · ${i.quantity} × ${i.currency||"AUD"} ${Number(i.price).toFixed(2)}${project?` · ${escapeHtml(project.name)}`:""}</div></div></div><span class="analysis-badge ${a.status}">${a.label}</span></div>
    <div class="cart-inline-editor">
      <label>Name <input data-cart-field="name" data-cart-id="${i.id}" value="${escapeHtml(i.name)}"></label>
      <label>Qty <input data-cart-field="quantity" data-cart-id="${i.id}" type="number" min="1" value="${i.quantity}"></label>
      <label>Price <input data-cart-field="price" data-cart-id="${i.id}" type="number" min="0" step=".01" value="${i.price}"></label>
      <label>Currency <select data-cart-select="currency" data-cart-id="${i.id}">${["AUD","HKD","USD","CNY","JPY","EUR"].map(c=>`<option ${c===(i.currency||"AUD")?"selected":""}>${c}</option>`).join("")}</select></label>
      <label>Status <select data-cart-select="category" data-cart-id="${i.id}">${["Yarn","Tools","DIY kit","Other"].map(c=>`<option ${c===i.category?"selected":""}>${c}</option>`).join("")}</select></label>
    </div>
    <div class="analysis-reason">${escapeHtml(a.reason)} ${spendingAdvice(i)}</div><div class="cart-controls"><strong data-cart-line-total="${i.id}">${i.currency||"AUD"} ${local.toFixed(2)} ≈ AUD $${aud.toFixed(2)}</strong><button class="mini-button" data-edit-cart="${i.id}">More details</button><button class="mini-button" data-buy-cart="${i.id}">Mark bought</button><button class="mini-button danger-button" data-delete-cart="${i.id}">Remove</button></div></div>`;
}
function handleCartInlineEdit(event){
  const id=event.target.dataset.cartId,field=event.target.dataset.cartField||event.target.dataset.cartSelect,item=state.cart.find(i=>i.id===id);
  if(!item)return;
  const value=event.target.value;
  if(field==="quantity")item.quantity=Math.max(1,+value||1);
  else if(field==="price")item.price=Math.max(0,+value||0);
  else item[field]=value;
  updateCartCalculatedDisplay(id);
  saveStateSoon();
  if(event.type==="change"&&["currency","category"].includes(field))renderMarket();
}
function updateCartCalculatedDisplay(itemId){
  const item=state.cart.find(i=>i.id===itemId),line=document.querySelector(`[data-cart-line-total="${itemId}"]`);
  if(item&&line){const local=item.quantity*item.price,aud=toAud(local,item.currency||"AUD");line.textContent=`${item.currency||"AUD"} ${local.toFixed(2)} ≈ AUD $${aud.toFixed(2)}`;}
  const cartTotal=state.cart.reduce((s,i)=>s+toAud(i.quantity*i.price,i.currency||"AUD"),0),budget=budgetAmountAud(),remaining=budget-cartTotal-state.budgetSettings.spent;
  const summary=document.getElementById("cart-budget-summary"),totalLine=document.getElementById("cart-total-line"),alert=document.getElementById("cart-budget-alert");
  if(summary)summary.textContent=`AUD $${cartTotal.toFixed(2)} / $${budget.toFixed(0)}`;
  if(totalLine)totalLine.textContent=`Cart ≈ AUD $${cartTotal.toFixed(2)}`;
  if(alert){alert.className=`budget-alert ${remaining<0?"over":"ok"}`;alert.textContent=remaining<0?`Over budget by AUD $${Math.abs(remaining).toFixed(2)}. Remove or postpone items before adding more.`:`AUD $${remaining.toFixed(2)} remains in this ${state.budgetSettings.period} budget.`;}
}
async function hydrateCartImages(){for(const img of document.querySelectorAll("[data-cart-image]")){const file=await getAsset(img.dataset.cartImage);if(file)img.src=URL.createObjectURL(file);}}
function toAud(amount,currency){return amount/fxRates[currency]*fxRates.AUD;}
async function refreshFxRates(force=false){
  const cached=JSON.parse(localStorage.getItem("abitofyarn-fx")||"null"),today=new Date().toISOString().slice(0,10);
  if(!force&&cached?.checked===today){fxRates={...fxRates,...cached.rates};fxDate=cached.date||today;return;}
  try{
    const response=await fetch("https://api.frankfurter.dev/v2/rates?base=EUR&quotes=AUD,USD,CNY,JPY,HKD");
    if(!response.ok)throw new Error("rate service unavailable");
    const data=await response.json(),rates={EUR:1};
    for(const item of data)rates[item.quote]=Number(item.rate);
    if(!rates.AUD||!rates.HKD)throw new Error("incomplete rates");
    fxRates={...fxRates,...rates};fxDate=data[0]?.date||today;localStorage.setItem("abitofyarn-fx",JSON.stringify({checked:today,date:fxDate,rates:fxRates}));
    if(document.getElementById("market-content")?.closest(".view.active"))renderMarket();
  }catch(error){if(cached?.rates){fxRates={...fxRates,...cached.rates};fxDate=cached.date||fxDate;}}
}
function budgetAmountAud(){return toAud(state.budgetSettings.amount,state.budgetSettings.currency);}
function resetBudgetIfDue(){const b=state.budgetSettings,started=new Date(b.periodStart),now=new Date(),elapsed=now-started,days=elapsed/86400000,due=b.period==="weekly"?days>=7:b.period==="monthly"?(now.getMonth()!==started.getMonth()||now.getFullYear()!==started.getFullYear()):b.period==="yearly"?now.getFullYear()!==started.getFullYear():false;if(due){b.spent=0;b.periodStart=now.toISOString().slice(0,10);saveState();}}
function spendingAdvice(item){const owned=state.inventory.some(i=>i.name.toLowerCase()===item.name.toLowerCase()),aud=toAud(item.quantity*item.price,item.currency||"AUD"),reasons=[];if(owned)reasons.push("Pause: an exact-name item is already in your inventory.");if(!item.projectId)reasons.push("No active project depends on this purchase.");if(!item.reason||item.reason.length<12)reasons.push("The reason is not specific enough to justify buying yet.");if(aud>state.marketBudget*.25)reasons.push("Wait 48 hours and compare at least two suppliers because this exceeds 25% of your budget.");return reasons.length?`Money-saving view: ${reasons.join(" ")}`:"Money-saving view: it is project-linked, not duplicated by name, and within the current budget; still compare shipping and unit price."; }

const toolsPageCategories=[
  {id:"All",label:"All"},
  {id:"Core",label:"Core",tools:["swatch","tool-adjust","garment","blocking","size-reference"]},
  {id:"Project sizing",label:"Project sizing",tools:["hat","sock","sleeve","raglan","blanket"]},
  {id:"Crochet",label:"Crochet",tools:["circle","amigurumi","granny","c2c"]},
  {id:"Rendering",label:"Rendering",tools:["rendering-studio"]},
  {id:"Yarn",label:"Yarn",tools:["yarn-estimator","yarn-leftover","substitution","yarn-weight"]},
  {id:"Helpers",label:"Helpers",tools:["repeat","row-helper","cast-on","basic","unit","shaping"]}
];
const toolIconMap={swatch:"◇","tool-adjust":"↕","garment":"□","blocking":"▱","size-reference":"尺",hat:"◠",sock:"∪",sleeve:"⌁",raglan:"△",blanket:"▦",circle:"○",amigurumi:"◌",granny:"▣",c2c:"◫","rendering-studio":"▦","yarn-estimator":"◍","yarn-leftover":"◒",substitution:"⇄","yarn-weight":"≋",repeat:"×","row-helper":"#","cast-on":"＋",basic:"=",unit:"↔",shaping:"±"};
function toolsPageCards(){
  const virtual={id:"rendering-studio",name:"Project Rendering Studio",category:"Rendering",crafts:["all"],desc:"Plan grids, stripes and colour pooling in one tidy visual workspace."};
  return toolkitToolDefs.filter(t=>!["budget","grid","stripe","pooling"].includes(t.id)).concat(virtual);
}
Object.assign(toolIconMap,{swatch:"measure","tool-adjust":"measure",garment:"garment",blocking:"measure","size-reference":"manual",hat:"garment",sock:"garment",sleeve:"garment",raglan:"garment",blanket:"pattern",circle:"circle",amigurumi:"circle",granny:"render",c2c:"render","rendering-studio":"render","yarn-estimator":"fibre","yarn-leftover":"fibre",substitution:"exchange","yarn-weight":"fibre",repeat:"pattern","row-helper":"manual","cast-on":"pattern",basic:"calculator",unit:"exchange",shaping:"measure"});
function toolsPageCategoryForTool(tool){
  if(["swatch","tool-adjust","garment","blocking","size-reference"].includes(tool.id))return "Core";
  if(["hat","sock","sleeve","raglan","blanket"].includes(tool.id))return "Project sizing";
  if(["circle","amigurumi","granny","c2c"].includes(tool.id))return "Crochet";
  if(tool.id==="rendering-studio")return "Rendering";
  if(["yarn-estimator","yarn-leftover","substitution","yarn-weight"].includes(tool.id))return "Yarn";
  return "Helpers";
}
function toolsPageDetailTool(tool){
  if(tool==="rendering-studio")return currentGlobalRenderingTool||"grid";
  return tool;
}
function toolCardHtml(tool,selected){
  const status=tool.id==="pooling"||tool.id==="rendering-studio"?"Planning":Number(tool.confidence||0)<0?"Beta":"";
  return `<button class="toolbox-card card ${selected===tool.id?"active":""}" data-open-tool="${escapeHtml(tool.id)}"><span class="toolbox-icon">${uiIcon(toolIconMap[tool.id]||"calculator","toolbox-card-icon")}</span><span class="toolbox-copy"><strong>${escapeHtml(tool.name)}</strong><small>${escapeHtml(tool.desc)}</small></span><span class="toolbox-tags"><em>${escapeHtml(toolCraftLabel(tool))}</em>${status?`<em>${escapeHtml(status)}</em>`:""}</span></button>`;
}
function renderTool(tool=currentProjectTool) {
  const panel=document.getElementById("tool-panel");
  if(!panel)return;
  const cards=toolsPageCards();
  if(["grid","stripe","pooling"].includes(tool)){currentGlobalRenderingTool=tool;tool="rendering-studio";}
  const selected=tool==="rendering-studio"?"rendering-studio":(toolkitToolDefs.some(t=>t.id===tool)?tool:"swatch");
  currentProjectTool=toolsPageDetailTool(selected);
  const search=currentToolSearch.trim().toLowerCase();
  const visible=cards.filter(t=>(currentToolCategory==="All"||toolsPageCategoryForTool(t)===currentToolCategory)&&(!search||`${t.name} ${t.desc} ${toolCraftLabel(t)} ${toolsPageCategoryForTool(t)}`.toLowerCase().includes(search)));
  const activeDef=selected==="rendering-studio"?cards.find(t=>t.id==="rendering-studio"):toolkitToolDefs.find(t=>t.id===currentProjectTool);
  const renderingTabs=toolsInProjectCategory({type:"Mixed / Other"},"rendering");
  panel.innerHTML=`<div class="tools-page-shell">
    <div class="page-title tools-page-title"><p class="eyebrow">YARNCHA TOOLKIT</p><h1>Maker’s Toolkit</h1><p>Calculators, planners, and yarn math for knitting and crochet.</p></div>
    <section class="toolbox-browser card">
      <div class="toolbox-controls">
        <div class="toolbox-tabs" role="tablist">${toolsPageCategories.map(c=>`<button class="pill-tab ${currentToolCategory===c.id?"active":""}" data-tools-category="${escapeHtml(c.id)}">${escapeHtml(c.label)}</button>`).join("")}</div>
        <input id="tool-search" class="toolbox-search" value="${escapeHtml(currentToolSearch)}" placeholder="Search tools, e.g. gauge, sock, yarn, C2C">
      </div>
      <div class="toolbox-grid">${visible.length?visible.map(t=>toolCardHtml(t,selected)).join(""):`<div class="empty-state"><h3>No tools found</h3><p>Try a different category or search word.</p></div>`}</div>
    </section>
    <section class="toolbox-detail card">
      <div class="toolbox-detail-head"><div><p class="eyebrow">${escapeHtml(selected==="rendering-studio"?"PROJECT RENDERING":toolsPageCategoryForTool(activeDef||{}))}</p><h2>${escapeHtml(selected==="rendering-studio"?"Project Rendering Studio":activeDef?.name||"Choose a tool")}</h2><p class="muted-copy">${escapeHtml(selected==="rendering-studio"?"Grid, stripes and colour pooling share one focused studio.":activeDef?.desc||"Choose a tool to start calculating.")}</p></div><span class="craft-pill">${escapeHtml(selected==="rendering-studio"?"Shared":toolCraftLabel(activeDef||{}))}</span></div>
      ${selected==="rendering-studio"?`<div class="studio-tabs" aria-label="Project Rendering Studio tabs">${renderingTabs.map(t=>`<button class="pill-tab ${currentProjectTool===t.id?"active":""}" data-global-rendering-tab="${t.id}">${escapeHtml(t.name.replace(" Generator","").replace(" Planner",""))}</button>`).join("")}</div>`:""}
      <input id="link-project-tools" type="checkbox" hidden>
      <div id="project-tool-content" class="tools-detail-content">${activeDef?projectToolContent(getProject(),currentProjectTool):`<div class="empty-state"><h3>Choose a tool to start calculating.</h3></div>`}</div>
    </section>
  </div>`;
  document.querySelectorAll("[data-tool-tab]").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll("[data-tools-category]").forEach(b=>b.onclick=()=>{currentToolCategory=b.dataset.toolsCategory;renderTool(selected);});
  document.getElementById("tool-search")?.addEventListener("input",e=>{currentToolSearch=e.target.value;renderTool(selected);});
  document.querySelectorAll("[data-open-tool]").forEach(b=>b.onclick=()=>{const picked=b.dataset.openTool;if(picked==="rendering-studio")currentGlobalRenderingTool=currentGlobalRenderingTool||"grid";renderTool(picked);});
  document.querySelectorAll("[data-global-rendering-tab]").forEach(b=>b.onclick=()=>{currentGlobalRenderingTool=b.dataset.globalRenderingTab;renderTool("rendering-studio");});
  document.getElementById("project-calculate")?.addEventListener("click",calculateProjectTool);
  document.getElementById("reset-tool-form")?.addEventListener("click",resetCurrentToolForm);
  document.querySelectorAll("[data-calc-key]").forEach(b=>b.onclick=()=>pressBasicCalculator(b.dataset.calcKey));
  bindToolResultActions();
  queueMicrotask(applyLanguage);
}
function bindTools(tool) { renderTool(tool); }
function resetCurrentToolForm(){
  const p=getProject();
  if(p.projectTools)delete p.projectTools[currentProjectTool];
  saveProjectTouch(p);
  if(document.getElementById("tools-view")?.classList.contains("active")){
    renderTool(["grid","stripe","pooling"].includes(currentProjectTool)?"rendering-studio":currentProjectTool);
  }else renderProjectDetail();
}
function classifyYarn(){
  const mm=+document.getElementById("yarn-mm").value,wpi=+document.getElementById("yarn-wpi").value,grams=+document.getElementById("yarn-grams").value,yards=+document.getElementById("yarn-yards").value,label=+document.getElementById("yarn-known-weight").value;
  let index=Number.isInteger(label)&&label>=0?label:null,method="";
  if(index!==null)method="selected yarn category";
  else if(wpi){index=wpi>=30?0:wpi>=20?1:wpi>=14?2:wpi>=11?3:wpi>=9?4:wpi>=6?5:6;method=`${wpi} WPI`;}
  else if(grams>0&&yards>0){const y100=yards/grams*100;index=y100>=600?0:y100>=430?1:y100>=300?2:y100>=210?3:y100>=140?4:y100>=90?5:6;method=`${Math.round(y100)} yd per 100 g`;}
  else if(mm){index=mm<.8?0:mm<1.2?1:mm<1.6?2:mm<2.1?3:mm<3?4:mm<4?5:6;method=`${mm} mm diameter`;}
  else return toast("Enter grams and yards, WPI, thickness, or a known category.");
  const row=yarnWeights[index];
  document.getElementById("yarn-class-result").innerHTML=`<div class="result-box"><strong>${row.name} · CYC ${row.cyc}</strong><p>Estimated from ${method}. Suggested knitting needles: ${row.needles}; crochet hooks: ${row.hooks}. This is a starting range only: always use the pattern gauge and make a swatch.</p></div>`;
}
function calculateSwatch() {
  const patternSt = +document.getElementById("sw-pattern-st").value, patternWidth = +document.getElementById("sw-pattern-width").value;
  const yourSt = +document.getElementById("sw-your-st").value, yourWidth = +document.getElementById("sw-your-width").value, desired = +document.getElementById("sw-desired").value;
  if (![patternSt, patternWidth, yourSt, yourWidth, desired].every(n => n > 0)) return toast("Please enter positive measurements.");
  const result = Math.round((yourSt / yourWidth) * desired);
  const original = Math.round((patternSt / patternWidth) * desired);
  document.getElementById("swatch-result").innerHTML = `<p>Cast on or begin with</p><strong>${result} stitches</strong><p>The original gauge would use ${original}. Your adjustment is ${result-original > 0 ? "+" : ""}${result-original} stitches.</p>`;
}
function calculateShape() {
  const current = Math.round(+document.getElementById("shape-current").value), desired = Math.round(+document.getElementById("shape-desired").value);
  if (current <= 0 || desired <= 0 || current === desired) return toast("Enter two different positive stitch counts.");
  const change = Math.abs(desired-current), increasing = desired > current;
  if (!increasing && change >= current) return toast("The desired count must be greater than zero.");
  const base = Math.floor(current / change), extras = current % change;
  const action = increasing ? "increase 1" : "decrease 1";
  const text = extras === 0 ? `Work ${base-1} stitch${base-1===1?"":"es"}, ${action}; repeat ${change} times.`
    : `Make ${change} ${increasing?"increases":"decreases"} across the row: mostly ${action} every ${base} stitches, spacing the remaining ${extras} section${extras===1?"":"s"} one stitch farther apart.`;
  document.getElementById("shape-result").innerHTML = `<p>${increasing?"Increase":"Decrease"} evenly by ${change}</p><strong>${current} → ${desired}</strong><p>${text}</p>`;
}

const lengthUnits = { "mm":1, "cm":10, "m":1000, "in":25.4, "ft":304.8, "yd":914.4 };
const weightUnits = { "g":1, "kg":1000, "oz":28.3495, "lb":453.592 };
const hooks = [
  ["2.0 mm","2/0","0","14","-","2.0 mm"],["2.5 mm","4/0","C/2","12","-","2.5 mm"],["3.0 mm","5/0","D/3","11","-","3.0 mm"],
  ["3.5 mm","6/0","E/4","9","-","3.5 mm"],["4.0 mm","7/0","G/6","8","8","4.0 mm"],["4.5 mm","7.5/0","7","7","7","4.5 mm"],
  ["5.0 mm","8/0","H/8","6","6","5.0 mm"],["5.5 mm","9/0","I/9","5","5","5.5 mm"],["6.0 mm","10/0","J/10","4","4","6.0 mm"],
  ["6.5 mm","10.5/0","K/10.5","3","3","6.5 mm"],["8.0 mm","-","L/11","0","0","8.0 mm"],["10.0 mm","-","N/15","000","000","10.0 mm"]
];
const needles=[["1.5 mm","000"],["2.0 mm","0"],["2.25 mm","1"],["2.75 mm","2"],["3.25 mm","3"],["3.5 mm","4"],["3.75 mm","5"],["4.0 mm","6"],["4.5 mm","7"],["5.0 mm","8"],["5.5 mm","9"],["6.0 mm","10"],["6.5 mm","10½"],["8.0 mm","11"],["9.0 mm","13"],["10 mm","15"],["12.75 mm","17"],["15 mm","19"],["19 mm","35"],["25 mm","50"]];
const yarnWeights = [
  {name:"Lace",cyc:"0",au:"1–2 ply",uk:"Lace",cn:"蕾絲 / 1股",wpi:"30+",needles:"1.5–2.25 mm",hooks:"1.4–2.25 mm"},
  {name:"Super fine",cyc:"1",au:"3–4 ply",uk:"Fingering",cn:"超細 / 2–3股",wpi:"20–30",needles:"2.25–3.25 mm",hooks:"2.25–3.5 mm"},
  {name:"Fine",cyc:"2",au:"5 ply",uk:"Sport",cn:"細 / 4股",wpi:"14–18",needles:"3.25–3.75 mm",hooks:"3.5–4.5 mm"},
  {name:"Light / DK",cyc:"3",au:"8 ply",uk:"DK",cn:"中細 / 5–6股",wpi:"11–14",needles:"3.75–4.5 mm",hooks:"4.5–5.5 mm"},
  {name:"Medium / Worsted",cyc:"4",au:"10–12 ply",uk:"Aran",cn:"中粗 / 8–10股",wpi:"9–11",needles:"4.5–5.5 mm",hooks:"5.5–6.5 mm"},
  {name:"Bulky",cyc:"5",au:"12–16 ply",uk:"Chunky",cn:"粗 / 12股",wpi:"6–9",needles:"5.5–8 mm",hooks:"6.5–9 mm"},
  {name:"Super bulky",cyc:"6",au:"14+ ply",uk:"Super chunky",cn:"超粗",wpi:"5–6",needles:"8–12.75 mm",hooks:"9–15 mm"}
];
function converterHtml(active) {
  const tabs = [["length","Length"],["hooks","Needles & hooks"],["yarn","Yarn category & weight"]];
  let body = "";
  if (active === "length") {
    const units = Object.keys(lengthUnits);
    body = `<div class="form-grid"><div class="field"><label>Amount</label><input id="convert-input" type="number" value="100"></div><div class="field"><label>From</label><select id="convert-from">${units.map(u=>`<option>${u}</option>`).join("")}</select></div></div><div id="conversion-result"></div>`;
  } else if(active==="hooks"){
    body=`<div class="converter-tabs"><button class="active" data-tool-kind="crochet">Crochet hooks</button><button data-tool-kind="knitting">Knitting needles</button><button data-tool-kind="other">Other / Tunisian</button></div><div id="tool-size-table">${toolSizeTable("crochet")}</div><div class="tool-size-advice"><strong>Adjusting fabric firmness</strong><p>For a tighter, denser fabric, try a smaller hook or needle. For a looser, softer or more drapey fabric, try a larger one. Change one size at a time and confirm with a washed gauge swatch; the pattern gauge remains the target for fitted pieces.</p></div>${toolSizeAssistantHtml()}`;
  } else {
    body=`<div class="form-grid"><div class="field"><label>Ball weight (grams)</label><input id="yarn-grams" type="number" min="1" placeholder="e.g. 100"></div><div class="field"><label>Length (yards)</label><input id="yarn-yards" type="number" min="1" placeholder="e.g. 220"></div><div class="field"><label>Yarn thickness estimate (mm)</label><input id="yarn-mm" type="number" min=".1" step=".1" placeholder="e.g. 1.8"></div><div class="field"><label>Wraps per inch (WPI)</label><input id="yarn-wpi" type="number" min="1" placeholder="e.g. 12"></div><div class="field full"><label>Known yarn weight (optional)</label><select id="yarn-known-weight"><option value="-1">Determine it for me</option>${yarnWeights.map((r,i)=>`<option value="${i}">${r.name} · CYC ${r.cyc}</option>`).join("")}</select></div></div><button class="secondary-button" id="classify-yarn">Suggest category and tools</button><div id="yarn-class-result"></div><div style="overflow:auto"><table class="conversion-table"><thead><tr>${["Category","CYC","Australia/NZ","UK/EU name","Chinese","WPI","Needles","Hooks"].map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${yarnWeights.map(r=>`<tr>${[r.name,r.cyc,r.au,r.uk,r.cn,r.wpi,r.needles,r.hooks].map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  return `<div class="calculator-card card"><p class="eyebrow">GLOBAL REFERENCE</p><h2>Craft converters</h2><p>Compare measurements and naming systems used in patterns around the world. Tool guidance is summarized from the Craft Yarn Council; metric diameter is the reference point.</p>
    <div class="converter-tabs">${tabs.map(([id,label])=>`<button class="${id===active?"active":""}" data-converter="${id}">${label}</button>`).join("")}</div>${body}</div>`;
}
function toolSizeTable(kind){if(kind==="knitting")return `<table class="conversion-table"><thead><tr><th>EU / metric diameter</th><th>US needle</th></tr></thead><tbody>${needles.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table>`;if(kind==="other")return `<div class="result-box"><p>Tunisian hooks use the same shaft diameter as regular hooks but need a long shaft or cable to hold loops. Double-ended hooks, loom tools and steel thread hooks should be matched by metric diameter and pattern gauge.</p></div>`;return `<table class="conversion-table"><thead><tr>${["Metric / EU","Japan","US","UK","China","Diameter"].map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${hooks.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;}
function toolSizeAssistantHtml(){return `<div class="size-assistant card"><p class="eyebrow">BUILT-IN SIZE ASSISTANT</p><h3>Which hook or needle should I try?</h3><div class="form-grid"><div class="field"><label>Craft</label><select id="size-craft"><option value="crochet">Crochet</option><option value="knitting">Knitting</option><option value="tunisian">Tunisian crochet</option></select></div><div class="field"><label>Yarn category</label><select id="size-yarn">${yarnWeights.map((r,i)=>`<option value="${i}">${r.name} · CYC ${r.cyc}</option>`).join("")}</select></div><div class="field full"><label>Fabric goal</label><select id="size-goal"><option value="balanced">Balanced / pattern starting point</option><option value="tight">Tighter and denser</option><option value="drapey">Looser and more drapey</option></select></div></div><button class="secondary-button" id="suggest-tool-size">Suggest a starting size</button><div id="size-assistant-result"></div></div>`;}
function suggestToolSize(){const craft=document.getElementById("size-craft").value,row=yarnWeights[+document.getElementById("size-yarn").value],goal=document.getElementById("size-goal").value,range=craft==="knitting"?row.needles:row.hooks,numbers=(range.match(/[\d.]+/g)||[]).map(Number),low=numbers[0],high=numbers[1]||numbers[0];let suggested=(low+high)/2;if(goal==="tight")suggested=Math.max(.5,suggested-.5);if(goal==="drapey")suggested+=.5;suggested=Math.round(suggested*4)/4;const tool=craft==="knitting"?"needle":"hook";document.getElementById("size-assistant-result").innerHTML=`<div class="result-box"><strong>${suggested} mm ${tool}</strong><p>${row.name} normally starts around ${range}. This suggestion shifts ${goal==="tight"?"smaller for a firmer fabric":goal==="drapey"?"larger for more drape":"toward the middle of the standard range"}. Make and wash a gauge swatch before choosing the final size.</p></div>`;}
function updateConversion() {
  const input = document.getElementById("convert-input"); if (!input) return;
  const value = +input.value, from = document.getElementById("convert-from").value;
  const table = from in lengthUnits ? lengthUnits : weightUnits; const base = value * table[from];
  document.getElementById("conversion-result").innerHTML = `<table class="conversion-table"><thead><tr><th>Unit</th><th>Converted amount</th></tr></thead><tbody>${Object.entries(table).filter(([u])=>u!==from).map(([u,f])=>`<tr><td>${u}</td><td>${Number((base/f).toPrecision(7))}</td></tr>`).join("")}</tbody></table>`;
}

let modalBeforeClose=null;
let modalLastFocus=null;
function ensureModalElements(){
  let backdrop=document.getElementById("modal-backdrop");
  if(backdrop&&document.getElementById("modal-content")&&document.getElementById("modal-close"))return backdrop;
  backdrop=document.createElement("div");
  backdrop.className="modal-backdrop";
  backdrop.id="modal-backdrop";
  backdrop.innerHTML=`<div class="modal" role="dialog" aria-modal="true"><button class="modal-close" id="modal-close" aria-label="Close dialog">${uiIcon("x","ui-icon")}</button><div id="modal-content"></div></div>`;
  document.body.appendChild(backdrop);
  document.getElementById("modal-close").onclick=()=>closeModal();
  backdrop.onclick=event=>{if(event.target.id==="modal-backdrop")closeModal();};
  return backdrop;
}
function openModal(html,options={}) {
  modalLastFocus=document.activeElement;
  ensureModalElements();
  const content=document.getElementById("modal-content"),modal=content.closest(".modal");
  content.innerHTML=html;
  modalBeforeClose=options.beforeClose||null;
  modal.classList.toggle("edit-project-modal",!!content.querySelector(".edit-project-form"));
  modal.setAttribute("aria-label",options.label||content.querySelector("h2")?.textContent||"Dialog");
  document.getElementById("modal-backdrop").classList.add("open");
  requestAnimationFrame(()=>content.querySelector("input:not([type=hidden]),select,textarea,button")?.focus());
}
function closeModal(force=false) {
  if(!force&&modalBeforeClose&&modalBeforeClose()===false)return false;
  document.getElementById("modal-backdrop")?.classList.remove("open");
  modalBeforeClose=null;
  const target=modalLastFocus;modalLastFocus=null;
  requestAnimationFrame(()=>target?.isConnected&&target.focus?.());
  return true;
}
function openAccountModal(){
  if(window.YarnchaCloud?.openAccountModal)return window.YarnchaCloud.openAccountModal();
  const a=state.account||starterData.account;
  openModal(`<p class="eyebrow">LOCAL-FIRST MVP</p><h2>Saved on this device</h2><div class="sync-status pending"><strong>No cloud account in this MVP</strong><p>Projects, row counts, annotations and library notes are stored locally. Safari and Chrome keep separate local storage, so use backups to move data between browsers.</p></div><div class="field"><label>Device profile label</label><input id="account-email" value="${escapeHtml(a.email||"")}" placeholder="e.g. Maile's iPad"></div><button class="secondary-button section-add" id="save-device-profile">Save device label</button><div class="sync-tools"><h3>Backup / move data manually</h3><p>Use a backup file until cloud sync is designed.</p><div class="modal-actions"><button class="secondary-button" id="import-backup">Import backup</button><button class="primary-button" id="export-backup">Export all</button><input id="backup-file" type="file" accept=".json,application/json" hidden></div></div><div class="privacy-note">Future-ready structure is kept local-first: projects, chart files, annotations and settings can later map to database tables and file storage.</div>`);
  document.getElementById("save-device-profile").onclick=()=>{state.account={email:document.getElementById("account-email").value.trim(),provider:"local",syncEnabled:false};saveState();closeModal();toast("Device profile saved");};
  document.getElementById("export-backup").onclick=exportBackup;
  document.getElementById("import-backup").onclick=()=>document.getElementById("backup-file").click();
  document.getElementById("backup-file").onchange=e=>importBackup(e,"merge");
}
function assetIdsForProject(p){
  return [
    p.coverAsset,
    p.chart?.assetId,
    ...(p.attachments||[]).map(a=>a.id),
    ...((p.buyList||[]).map(i=>i.imageAsset)),
  ].filter(Boolean);
}
function allAssetIdsForState(snapshot){
  return [
    ...(snapshot.projects||[]).flatMap(assetIdsForProject),
    ...(snapshot.cart||[]).map(i=>i.imageAsset),
    ...(snapshot.yarnMaterials||[]).map(m=>m.imageAsset),
    ...(snapshot.projectIdeas||[]).map(i=>i.referenceImageAsset),
    ...Object.values(snapshot.userTechniqueReferences||{}).map(reference=>reference.assetId),
    ...Object.values(snapshot.userSymbolsOverride||{}).map(entry=>entry.symbolImageAsset),
    ...(snapshot.symbolLearningLibrary||[]).map(record=>record.symbolImageAsset||record.detectedSymbolImageAsset),
    ...(snapshot.librarySections||[]).flatMap(s=>(s.items||[]).flatMap(i=>(i.assets||[]).map(a=>a.id)))
  ].filter(Boolean);
}
async function exportBackup(projectId=null){
  try{
    updateSaveStatus("Preparing backup...");
    const snapshot=structuredClone(state);
    const selectedProject=projectId?snapshot.projects.find(p=>p.id===projectId):null;
    if(projectId&&!selectedProject)return toast("Choose a project to export.");
    if(projectId){snapshot.projects=[selectedProject];snapshot.activeProjectId=selectedProject.id;}
    const assets={};
    for(const {id,file} of await getAllAssetsByIds(projectId?assetIdsForProject(selectedProject):allAssetIdsForState(snapshot))){
      assets[id]={name:file.name||id,type:file.type||"application/octet-stream",lastModified:file.lastModified||Date.now(),data:await assetToDataUrl(file)};
    }
    const payload={app:"Yarncha",version:BACKUP_VERSION,kind:projectId?"project":"full",exportedAt:new Date().toISOString(),storage:"local-first",state:snapshot,assets};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=`yarncha-${projectId?"project":"backup"}-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);
    updateSaveStatus(`✓ Backup ready · Last saved: ${formatSavedTime(state.lastSavedAt||new Date())}`);
    toast(projectId?"Project backup exported":"Yarncha backup exported");
  }catch(error){updateSaveStatus("Backup failed");toast("Backup could not be created.");}
}
async function importBackup(event,mode="merge"){
  try{
    const file=event.target.files?.[0];if(!file)return;
    const parsed=JSON.parse(await file.text());
    if(!parsed.state?.projects||!parsed.state?.librarySections)throw new Error("invalid backup");
    for(const [id,asset] of Object.entries(parsed.assets||{})){
      const blob=await dataUrlToBlob(asset.data);
      const restored=new File([blob],asset.name||id,{type:asset.type||blob.type,lastModified:asset.lastModified||Date.now()});
      await putAsset(id,restored);
    }
    if(mode==="replace"){
      state={...starterData,...parsed.state};
      state.librarySections=sanitizeLibrarySections(state.librarySections||[]);
    }else{
      const imported=parsed.state,existingIds=new Set(state.projects.map(p=>p.id));
      const projects=(imported.projects||[]).map(p=>existingIds.has(p.id)?{...p,id:`${p.id}-imported-${Date.now()}`}:{...p});
      state.projects=[...state.projects,...projects];
      state.inventory=[...state.inventory,...(imported.inventory||[])];
      state.cart=[...state.cart,...(imported.cart||[])];
      state.librarySections=mergeLibrarySections(state.librarySections,imported.librarySections||[]);
      state.yarnMaterials=[...(state.yarnMaterials||[]),...(imported.yarnMaterials||[])];
      state.techniqueKnowledge=[...(state.techniqueKnowledge||[]),...(imported.techniqueKnowledge||[])];
      state.userTechniqueReferences={...(state.userTechniqueReferences||{}),...(imported.userTechniqueReferences||{})};
      state.userSymbolsOverride={...(state.userSymbolsOverride||{}),...(imported.userSymbolsOverride||{})};
      (imported.symbolLearningLibrary||[]).forEach(record=>upsertLearningRecord(record,{save:false}));
      state.activeProjectId=projects[0]?.id||state.activeProjectId;
    }
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    await putProjectStateSnapshot();
    closeModal();toast("Backup imported");location.reload();
  }catch(error){toast("This backup file could not be read.");}
}
function mergeLibrarySections(current,incoming){
  const map=new Map(sanitizeLibrarySections(current).map(s=>[s.id,{...s,items:[...(s.items||[])]}]));
  for(const section of sanitizeLibrarySections(incoming)){
    const existing=map.get(section.id);
    if(existing)existing.items=[...(existing.items||[]),...(section.items||[])];
    else map.set(section.id,section);
  }
  return [...map.values()];
}
function openProjectCoverPicker(){
  const p=getProject();
  const input=document.createElement("input");
  input.type="file";
  input.accept="image/*";
  input.setAttribute("aria-label","Choose project cover photo");
  input.onchange=async()=>{
    const file=input.files?.[0];
    if(!file)return;
    if(!["image/jpeg","image/png","image/webp"].includes(file.type))return toast("Choose a JPG, PNG or WebP image.");
    if(file.size>10*1024*1024)return toast("Choose a project photo smaller than 10 MB.");
    const id=`cover${Date.now()}`;
    await putAsset(id,file);
    p.coverAsset=id;
    window.YarnchaCloud?.queueCoverUpload?.(p.id,id,file);
    saveProjectTouch(p);
    renderProjectDetail();
    toast("Project photo updated.");
  };
  input.click();
}
function openProjectModal() {
  openModal(`<p class="eyebrow">CHART FIRST</p><h2>New project</h2><div class="form-grid">
    <div class="field full"><label>Project name</label><input id="new-name" placeholder="e.g. Summer lace scarf"></div>
    <div class="field full"><label>Craft</label><select id="new-type">${projectTypeOptions.map(t=>`<option>${t}</option>`).join("")}</select></div>
    <div class="field full upload-drop"><label>Pattern charts (multiple PDF, PNG or JPG)</label><input id="new-chart" type="file" accept=".pdf,image/*" multiple><small>Up to 30 PDF pages are indexed per file. You can add more files later.</small></div></div>
    <div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="create-project">Create project</button></div>`);
  document.getElementById("create-project").onclick = () => {
    const name = document.getElementById("new-name").value.trim();
    if (!name) return toast("Give your project a name.");
    const files=document.getElementById("new-chart").files;
    const p = { id:`p${Date.now()}`,name,type:document.getElementById("new-type").value,status:"Planning",startDate:new Date().toISOString().slice(0,10),finishDate:"",patternUrl:"",size:"",color:colors[state.projects.length%colors.length],row:0,totalRows:null,chartRows:null,started:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),notes:"",subCounters:[],markers:[],chart:null,assistantMessages:[],projectTools:{},buyList:[],pdfReference:"",attachments:[],patternPlan:{mode:"modified"},chatPreference:"ask",readerStatus:"No files analysed yet.",flowMode:true,chartMode:"og",annotations:[],annotationHistory:[],annotationRedo:[],annotationColor:"#d96572",annotationWidth:4,rowMask:null,coverAsset:null,chartAnalysis:null,patternSource:normalizePatternSource(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString() };
    state.projects.push(p); saveState(); closeModal(); openProject(p.id); if(files.length)handleChartFiles(files);
  };
}
function openSubCounterModal(editId=null) {
  const existing=editId?getProject().subCounters.find(s=>s.id===editId):null;
  openModal(`<p class="eyebrow">TRACK A REPEAT</p><h2>${existing?"Edit":"Add"} sub-counter</h2><div class="form-grid">
    <div class="field full"><label>Name</label><input id="sub-name" value="${escapeHtml(existing?.name||"")}" placeholder="e.g. Cable repeat"></div>
    <div class="field"><label>Sync with main row counter</label><select id="sub-linked"><option value="yes" ${existing?.linked!==false?"selected":""}>On</option><option value="no" ${existing?.linked===false?"selected":""}>Off</option></select></div>
    <div class="field"><label>Start value</label><input id="sub-start" type="number" min="0" value="${Math.max(0,Number(existing?.start)||0)}"></div>
    <div class="field full"><label>Reminder interval</label><input id="sub-every" type="number" min="1" value="${existing?.every||1}"><small>Linked counters move by the same row delta. This interval is kept for reminders and notes.</small></div></div>
    <div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="create-sub">${existing?"Save changes":"Add counter"}</button></div>`);
  document.getElementById("create-sub").onclick = () => {
    const name = document.getElementById("sub-name").value.trim(); if (!name) return toast("Name your sub-counter.");
    const start=Math.max(0,+document.getElementById("sub-start").value||0);
    const values={name,linked:document.getElementById("sub-linked").value==="yes",every:Math.max(1,+document.getElementById("sub-every").value||1),start};
    if(existing){Object.assign(existing,values);existing.count=Math.max(start,Number(existing.count)||0);}else getProject().subCounters.push({id:`s${Date.now()}`,count:start,...values});
    saveState(); closeModal(); renderProjectDetail();
  };
}
function openSubCounterActionsModal(id){
  const p=getProject(),counter=p.subCounters.find(s=>s.id===id);
  if(!counter)return;
  openModal(`<p class="eyebrow">REPEAT COUNTER</p><h2>${escapeHtml(counter.name)}</h2><p class="muted-copy">Keep everyday controls simple. Reset and delete are kept here so they are harder to hit by accident.</p><div class="form-grid"><button class="secondary-button" id="counter-edit-action">Edit Counter</button><button class="secondary-button" id="counter-reset-action">Reset Progress</button></div><div class="danger-zone"><strong>Danger zone</strong><p>Deleting this counter cannot be undone.</p><button class="danger-button secondary-button" id="counter-delete-action">Delete Counter</button></div><div class="modal-actions"><button class="primary-button" onclick="closeModal()">Done</button></div>`);
  document.getElementById("counter-edit-action").onclick=()=>{closeModal();openSubCounterModal(id);};
  document.getElementById("counter-reset-action").onclick=()=>{counter.count=0;saveProjectTouch(p);closeModal();renderProjectDetail();toast("Repeat counter reset");};
  document.getElementById("counter-delete-action").onclick=()=>{if(!confirm(`Delete "${counter.name}"? This cannot be undone.`))return;p.subCounters=p.subCounters.filter(s=>s.id!==id);saveProjectTouch(p);closeModal();renderProjectDetail();};
}
function openRowPlanModal(){const p=getProject();openModal(`<p class="eyebrow">OPTIONAL PLAN</p><h2>Set planned rows</h2><p>Leave blank to keep this project open-ended.</p><div class="field"><label>Planned total rows</label><input id="planned-rows" type="number" value="${p.totalRows||""}" placeholder="No fixed total"></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-row-plan">Save</button></div>`);document.getElementById("save-row-plan").onclick=()=>{p.totalRows=Math.max(1,+document.getElementById("planned-rows").value||0)||null;saveState();closeModal();renderProjectDetail();};}
function editProjectField(id){return document.getElementById(id);}
function editProjectError(id,message=""){
  const node=document.getElementById(`error-${id}`);if(node)node.textContent=message;
  editProjectField(id)?.setAttribute("aria-invalid",message?"true":"false");
}
function validProjectUrl(value){if(!value)return true;try{const url=new URL(value);return ["http:","https:"].includes(url.protocol);}catch{return false;}}
async function deleteProjectAndAssets(p){
  await Promise.allSettled(assetIdsForProject(p).map(deleteAsset));
  await window.YarnchaCloud?.deleteCloudProject?.(p.id);
  state.projects=state.projects.filter(x=>x.id!==p.id);
  state.activeProjectId=state.projects[0]?.id||null;
  currentProjectId=state.activeProjectId;
  saveState();closeModal(true);showView("projects");toast("Project deleted");
}
function openEditProjectModal(){
  const p=getProject();if(!p)return;
  const currentType=projectTypeOptions.includes(p.type)?p.type:(normalizeProjectType(p.type)==="Mixed / Other"?"Other":normalizeProjectType(p.type));
  let dirty=false,removeCover=false;
  openModal(`<form class="edit-project-form" id="edit-project-form" novalidate>
    <div class="edit-project-heading"><p class="eyebrow">PROJECT DETAILS</p><h2>Edit Project</h2><p>Keep the project information that helps you return to your work quickly.</p></div>
    <section class="edit-project-section"><h3>Basic details</h3><div class="form-grid">
      <div class="field full"><label for="edit-project-name-input">Project name</label><input id="edit-project-name-input" maxlength="80" required value="${escapeHtml(p.name)}"><small class="form-error" id="error-edit-project-name-input" aria-live="polite"></small></div>
      <div class="field"><label for="edit-project-type">Craft type</label><select id="edit-project-type">${projectTypeOptions.map(t=>`<option ${currentType===t?"selected":""}>${t}</option>`).join("")}</select></div>
      <div class="field"><label for="edit-project-status">Project status</label><select id="edit-project-status">${projectStatusOptions.map(s=>`<option ${(p.status||"In progress")===s?"selected":""}>${s}</option>`).join("")}</select></div>
      <div class="field"><label for="edit-project-start-date">Start date</label><input id="edit-project-start-date" type="date" value="${escapeHtml(p.startDate||"")}"></div>
      <div class="field"><label for="edit-project-finish-date">Finish date</label><input id="edit-project-finish-date" type="date" value="${escapeHtml(p.finishDate||"")}"><small class="form-error" id="error-edit-project-finish-date" aria-live="polite"></small></div>
    </div></section>
    <section class="edit-project-section"><h3>Materials</h3><div class="form-grid">
      <div class="field full"><label for="edit-project-yarn">Yarn</label><input id="edit-project-yarn" value="${escapeHtml(p.yarn||"")}" placeholder="Fibre, weight, colourway, dye lot"></div>
      <div class="field"><label for="edit-project-tools">Needle / hook</label><input id="edit-project-tools" value="${escapeHtml(p.needles||"")}" placeholder="e.g. 4 mm circular"></div>
      <div class="field"><label for="edit-project-gauge">Gauge</label><input id="edit-project-gauge" value="${escapeHtml(p.gauge||"")}" placeholder="e.g. 22 sts × 30 rows / 10 cm"></div>
      <div class="field full"><label for="edit-project-size">Size</label><input id="edit-project-size" value="${escapeHtml(p.size||p.sizingNotes||"")}" placeholder="Finished size or fitting notes"></div>
    </div></section>
    <section class="edit-project-section"><h3>Progress</h3><div class="form-grid">
      <div class="field"><label for="edit-project-current-row">Current row</label><input id="edit-project-current-row" type="number" min="0" step="1" value="${Number(p.row)||0}"><small class="form-error" id="error-edit-project-current-row" aria-live="polite"></small></div>
      <div class="field"><label for="edit-project-total-rows">Total rows</label><input id="edit-project-total-rows" type="number" min="0" step="1" value="${p.totalRows??""}" placeholder="Optional"><small class="form-error" id="error-edit-project-total-rows" aria-live="polite"></small></div>
      <div class="field full"><label for="edit-project-markers">Stitch markers</label><input id="edit-project-markers" type="number" min="0" step="1" value="${p.markers.length}"><small>Changing this count keeps existing markers first and adds new markers at the current row.</small></div>
    </div></section>
    <section class="edit-project-section"><h3>Pattern & notes</h3><div class="form-grid">
      <div class="field full"><label for="edit-project-pattern-url">Pattern source / URL</label><input id="edit-project-pattern-url" type="url" value="${escapeHtml(p.patternUrl||"")}" placeholder="https://"><small class="form-error" id="error-edit-project-pattern-url" aria-live="polite"></small></div>
      <div class="field full"><label for="edit-project-notes">Notes</label><textarea id="edit-project-notes" rows="6">${escapeHtml(p.notes||"")}</textarea></div>
    </div></section>
    <section class="edit-project-section"><h3>Cover image</h3><div class="cover-editor">
      <div class="cover-editor-preview">${p.coverAsset?`<img data-cover-asset="${p.coverAsset}" alt="Current cover for ${escapeHtml(p.name)}">`:`<span class="system-icon">${uiIcon("camera")}</span><strong>Add Project Photo</strong>`}</div>
      <div class="field"><label for="project-cover-file">Upload or replace cover</label><input id="project-cover-file" type="file" accept="image/jpeg,image/png,image/webp"><small>JPG, PNG or WebP, up to 10 MB.</small><small class="form-error" id="error-project-cover-file" aria-live="polite"></small>${p.coverAsset?`<button type="button" class="secondary-button" id="remove-project-cover">Remove cover image</button>`:""}</div>
    </div></section>
    <section class="danger-zone"><strong>Danger zone</strong><p>Deleting this project permanently removes its progress, notes, chart settings, annotations, counters, and local files.</p><button type="button" class="danger-button secondary-button" id="delete-project-inside-edit">Delete Project</button><div class="delete-confirmation" id="delete-project-confirmation" hidden><h3>Delete this project?</h3><p>This action cannot be undone. Type <strong>DELETE</strong> to confirm.</p><label for="delete-project-confirm-text">Confirmation</label><input id="delete-project-confirm-text" autocomplete="off"><button type="button" class="danger-button" id="confirm-delete-project" disabled>Delete permanently</button></div></section>
    <div class="modal-actions edit-project-footer"><button type="button" class="secondary-button" id="cancel-project-edit">Cancel</button><button type="submit" class="primary-button" id="save-project-details">Save Changes</button></div>
  </form>`,{label:"Edit Project",beforeClose:()=>!dirty||confirm("Discard changes?")});
  hydrateProjectCovers();
  const form=editProjectField("edit-project-form");
  form.addEventListener("input",()=>{dirty=true;});
  form.addEventListener("change",()=>{dirty=true;});
  editProjectField("cancel-project-edit").onclick=()=>closeModal();
  editProjectField("remove-project-cover")?.addEventListener("click",()=>{removeCover=true;dirty=true;document.querySelector(".cover-editor-preview").innerHTML=`<span class="system-icon">${uiIcon("camera")}</span><strong>Cover will be removed</strong>`;editProjectField("remove-project-cover").disabled=true;});
  editProjectField("project-cover-file").addEventListener("change",event=>{
    const file=event.target.files?.[0];editProjectError("project-cover-file");if(!file)return;
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)){event.target.value="";return editProjectError("project-cover-file","Choose a JPG, PNG or WebP image.");}
    if(file.size>10*1024*1024){event.target.value="";return editProjectError("project-cover-file","Choose an image smaller than 10 MB.");}
    removeCover=false;const preview=document.querySelector(".cover-editor-preview");preview.innerHTML=`<img alt="New project cover preview">`;preview.querySelector("img").src=URL.createObjectURL(file);
  });
  editProjectField("delete-project-inside-edit").onclick=()=>{const box=editProjectField("delete-project-confirmation");box.hidden=false;editProjectField("delete-project-confirm-text").focus();};
  editProjectField("delete-project-confirm-text").oninput=event=>{editProjectField("confirm-delete-project").disabled=event.target.value!=="DELETE";};
  editProjectField("confirm-delete-project").onclick=()=>deleteProjectAndAssets(p);
  form.onsubmit=async event=>{
    event.preventDefault();
    ["edit-project-name-input","edit-project-finish-date","edit-project-current-row","edit-project-total-rows","edit-project-pattern-url","project-cover-file"].forEach(id=>editProjectError(id));
    const name=editProjectField("edit-project-name-input").value.trim(),currentRaw=editProjectField("edit-project-current-row").value,totalRaw=editProjectField("edit-project-total-rows").value;
    const currentRow=Number(currentRaw),totalRows=totalRaw===""?null:Number(totalRaw),startDate=editProjectField("edit-project-start-date").value,finishDate=editProjectField("edit-project-finish-date").value,patternUrl=editProjectField("edit-project-pattern-url").value.trim(),cover=editProjectField("project-cover-file").files?.[0];
    let invalid=false;
    if(!name||name.length>80){editProjectError("edit-project-name-input","Enter a project name of 80 characters or fewer.");invalid=true;}
    if(currentRaw===""||!Number.isInteger(currentRow)||currentRow<0){editProjectError("edit-project-current-row","Current row must be a whole number of zero or more.");invalid=true;}
    if(totalRows!==null&&(!Number.isInteger(totalRows)||totalRows<0)){editProjectError("edit-project-total-rows","Total rows must be a whole number of zero or more.");invalid=true;}
    if(totalRows!==null&&currentRow>totalRows){editProjectError("edit-project-current-row","Current row cannot exceed total rows.");invalid=true;}
    if(startDate&&finishDate&&finishDate<startDate){editProjectError("edit-project-finish-date","Finish date cannot be before the start date.");invalid=true;}
    if(!validProjectUrl(patternUrl)){editProjectError("edit-project-pattern-url","Enter a complete http:// or https:// URL.");invalid=true;}
    if(invalid)return form.querySelector('[aria-invalid="true"]')?.focus();
    const oldCover=p.coverAsset;
    Object.assign(p,{name,type:editProjectField("edit-project-type").value,status:editProjectField("edit-project-status").value,startDate,finishDate,totalRows,yarn:editProjectField("edit-project-yarn").value.trim(),needles:editProjectField("edit-project-tools").value.trim(),gauge:editProjectField("edit-project-gauge").value.trim(),size:editProjectField("edit-project-size").value.trim(),sizingNotes:editProjectField("edit-project-size").value.trim(),patternUrl,notes:editProjectField("edit-project-notes").value});
    setMainRow(currentRow,{render:false});
    const markerCount=Math.max(0,Number(editProjectField("edit-project-markers").value)||0);
    p.markers=p.markers.slice(0,markerCount);while(p.markers.length<markerCount)p.markers.push({id:`marker${Date.now()}-${p.markers.length}`,row:p.row,color:"#577fa8",label:`Marker ${p.markers.length+1}`});
    if(cover){const id=`cover${Date.now()}`;await putAsset(id,cover);p.coverAsset=id;window.YarnchaCloud?.queueCoverUpload?.(p.id,id,cover);if(oldCover&&oldCover!==id)await deleteAsset(oldCover);}
    else if(removeCover){p.coverAsset=null;if(oldCover)await deleteAsset(oldCover);}
    if(startDate)p.started=new Date(`${startDate}T00:00:00`).toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"});
    dirty=false;saveProjectTouch(p);document.getElementById("breadcrumb").textContent=p.name;closeModal(true);renderToday();renderProjects();renderProjectDetail();toast("✓ Project updated");
  };
}
function openEditRowModal(){const p=getProject();openModal(`<p class="eyebrow">ROW COUNTER</p><h2>Set exact row</h2><div class="field"><label>Current row</label><input id="exact-row" type="number" min="0" value="${p.row}"></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-exact-row">Set row</button></div>`);document.getElementById("save-exact-row").onclick=()=>{setMainRow(Math.max(0,+document.getElementById("exact-row").value||0),{render:false});closeModal();renderProjectDetail();};}
function openMarkerModal(markerId=null){const p=getProject(),marker=p.markers.find(m=>m.id===markerId);openModal(`<p class="eyebrow">STITCH MARKER</p><h2>${marker?"Edit":"Add"} marker</h2><div class="form-grid"><div class="field"><label>Row</label><input id="marker-row" type="number" min="0" value="${marker?.row??p.row}"></div><div class="field"><label>HEX color</label><input id="marker-color" type="color" value="${validHex(marker?.color)?marker.color:"#577fa8"}"></div><div class="field full"><label>Label</label><input id="marker-label" value="${escapeHtml(marker?.label||"")}" placeholder="e.g. sleeve join"></div></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-marker">Save marker</button></div>`);document.getElementById("save-marker").onclick=()=>{const values={row:Math.max(0,+document.getElementById("marker-row").value||0),color:document.getElementById("marker-color").value,label:document.getElementById("marker-label").value.trim()||document.getElementById("marker-color").value};if(marker)Object.assign(marker,values);else p.markers.push({id:`marker${Date.now()}`,...values});saveState();closeModal();renderProjectDetail();};}
function openBuyItemModal(itemId=null){const p=getProject(),item=p.buyList.find(i=>i.id===itemId);openModal(`<p class="eyebrow">PROJECT BUY LIST</p><h2>${item?"Edit":"Add"} supply</h2><div class="form-grid"><div class="field full"><label>Item</label><input id="buy-name" value="${escapeHtml(item?.name||"")}" placeholder="e.g. Sage DK yarn"></div><div class="field"><label>Category</label><select id="buy-category">${["Yarn","Tools","DIY kit","Other"].map(c=>`<option ${c===item?.category?"selected":""}>${c}</option>`).join("")}</select></div><div class="field"><label>Quantity</label><input id="buy-quantity" type="number" min="1" value="${item?.quantity||1}"></div><div class="field"><label>Price each</label><input id="buy-price" type="number" min="0" step=".01" value="${item?.price||0}"></div></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-buy-item">Save</button></div>`);document.getElementById("save-buy-item").onclick=()=>{const name=document.getElementById("buy-name").value.trim();if(!name)return toast("Name this supply.");const values={name,category:document.getElementById("buy-category").value,quantity:Math.max(1,+document.getElementById("buy-quantity").value||1),price:Math.max(0,+document.getElementById("buy-price").value||0)};if(item)Object.assign(item,values);else p.buyList.push({id:`buy${Date.now()}`,...values});saveState();closeModal();renderProjectDetail();};}
function sendBuyItemToCart(itemId){const p=getProject(),item=p.buyList.find(i=>i.id===itemId);if(!item)return;const existing=state.cart.find(i=>i.projectId===p.id&&i.name.toLowerCase()===item.name.toLowerCase());if(existing)existing.quantity+=item.quantity;else state.cart.push({id:`cart${Date.now()}`,...item,projectId:p.id,reason:`Required for ${p.name}`});saveState();toast("Added to Yarn Stash shopping list");}
function openInventoryModal(itemId=null){const item=state.inventory.find(i=>i.id===itemId);openModal(`<p class="eyebrow">MAKER INVENTORY</p><h2>${item?"Edit":"Add"} inventory</h2><div class="form-grid"><div class="field full"><label>Name</label><input id="inventory-name" value="${escapeHtml(item?.name||"")}"></div><div class="field"><label>Category</label><select id="inventory-category">${["Yarn","Tools","DIY kit","Other"].map(c=>`<option ${c===item?.category?"selected":""}>${c}</option>`).join("")}</select></div><div class="field"><label>Quantity</label><input id="inventory-quantity" type="number" min="0" value="${item?.quantity||1}"></div><div class="field"><label>Unit</label><input id="inventory-unit" value="${escapeHtml(item?.unit||"items")}" placeholder="balls, skeins, pieces"></div><div class="field"><label>HEX color</label><input id="inventory-color" type="color" value="${validHex(item?.color)?item.color:"#718c72"}"></div><div class="field full"><label>Details</label><input id="inventory-details" value="${escapeHtml(item?.details||"")}" placeholder="weight, dye lot, fibre, size..."></div></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-inventory">Save</button></div>`);document.getElementById("save-inventory").onclick=()=>{const name=document.getElementById("inventory-name").value.trim();if(!name)return toast("Name this inventory item.");const values={name,category:document.getElementById("inventory-category").value,quantity:Math.max(0,+document.getElementById("inventory-quantity").value||0),unit:document.getElementById("inventory-unit").value.trim()||"items",color:document.getElementById("inventory-color").value,details:document.getElementById("inventory-details").value.trim()};if(item)Object.assign(item,values);else state.inventory.push({id:`inv${Date.now()}`,...values});saveState();closeModal();renderMarket();};}
function openCartItemModal(itemId=null){
  const item=state.cart.find(i=>i.id===itemId);
  openModal(`<p class="eyebrow">DECISION CART</p><h2>${item?"Adjust":"Add"} shopping item</h2><div class="form-grid">
    <div class="field full"><label>Item</label><input id="cart-name" value="${escapeHtml(item?.name||"")}"></div>
    <div class="field full upload-drop"><label>Item photo</label><input id="cart-image" type="file" accept="image/*"><small>${item?.imageAsset?"A photo is currently attached. Select another to replace it.":"The photo will appear beside the item name."}</small></div>
    <div class="field"><label>Category</label><select id="cart-category">${["Yarn","Tools","DIY kit","Other"].map(c=>`<option ${c===item?.category?"selected":""}>${c}</option>`).join("")}</select></div>
    <div class="field"><label>Quantity</label><input id="cart-quantity" type="number" min="1" value="${item?.quantity||1}"></div>
    <div class="field"><label>Currency</label><select id="cart-currency">${["AUD","HKD","USD","CNY","JPY","EUR"].map(c=>`<option ${c===(item?.currency||"AUD")?"selected":""}>${c}</option>`).join("")}</select><small>Indicative reference rates, ${fxDate}.</small></div>
    <div class="field"><label>Price each</label><input id="cart-price" type="number" min="0" step=".01" value="${item?.price||0}"></div>
    <div class="field"><label>Link to project</label><select id="cart-project"><option value="">No project</option>${state.projects.map(p=>`<option value="${p.id}" ${p.id===item?.projectId?"selected":""}>${escapeHtml(p.name)}</option>`).join("")}</select></div>
    <div class="field full"><label>Why are you considering it?</label><input id="cart-reason" value="${escapeHtml(item?.reason||"")}" placeholder="Be specific: shortage, replacement, exact project requirement..."></div>
    <div class="field full"><label class="check-row"><input id="cart-create-project" type="checkbox" ${item?.createProject?"checked":""}><span>If this is a DIY kit, create a linked project when bought</span></label></div></div>
    <div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-cart-item">Save to cart</button></div>`);
  document.getElementById("save-cart-item").onclick=async()=>{
    const name=document.getElementById("cart-name").value.trim();if(!name)return toast("Name this shopping item.");
    const values={name,category:document.getElementById("cart-category").value,quantity:Math.max(1,+document.getElementById("cart-quantity").value||1),price:Math.max(0,+document.getElementById("cart-price").value||0),currency:document.getElementById("cart-currency").value,projectId:document.getElementById("cart-project").value,reason:document.getElementById("cart-reason").value.trim(),createProject:document.getElementById("cart-create-project").checked,imageAsset:item?.imageAsset||null};
    const image=document.getElementById("cart-image").files[0];if(image){values.imageAsset=`cartimg${Date.now()}`;await putAsset(values.imageAsset,image);}
    const existingWithout=state.cart.filter(i=>i.id!==itemId).reduce((s,i)=>s+toAud(i.quantity*i.price,i.currency||"AUD"),0),projected=existingWithout+toAud(values.quantity*values.price,values.currency)+state.budgetSettings.spent;
    if(projected>budgetAmountAud())return toast(`Cannot add: this would exceed the active ${state.budgetSettings.currency} budget.`);
    if(item)Object.assign(item,values);else state.cart.push({id:`cart${Date.now()}`,...values});saveState();closeModal();renderMarket();
  };
}
function openBudgetModal(){const b=state.budgetSettings;openModal(`<p class="eyebrow">SHOPPING BOUNDARY</p><h2>Set cart budget</h2><div class="form-grid"><div class="field"><label>Budget amount</label><input id="market-budget" type="number" min="0" step="1" value="${b.amount}"></div><div class="field"><label>Budget currency</label><select id="budget-currency">${["AUD","HKD","USD","CNY","JPY","EUR"].map(c=>`<option ${c===b.currency?"selected":""}>${c}</option>`).join("")}</select></div><div class="field"><label>Reset period</label><select id="budget-period"><option value="weekly" ${b.period==="weekly"?"selected":""}>Every week</option><option value="monthly" ${b.period==="monthly"?"selected":""}>Every month</option><option value="yearly" ${b.period==="yearly"?"selected":""}>Every year</option><option value="never" ${b.period==="never"?"selected":""}>Never</option></select></div><div class="field"><label>Current period started</label><input id="budget-start" type="date" value="${b.periodStart}"></div></div><div class="modal-actions"><button class="secondary-button" id="reset-budget-now">Reset spent now</button><button class="primary-button" id="save-budget">Save</button></div>`);document.getElementById("reset-budget-now").onclick=()=>{b.spent=0;b.periodStart=new Date().toISOString().slice(0,10);saveState();closeModal();renderMarket();};document.getElementById("save-budget").onclick=()=>{b.amount=Math.max(0,+document.getElementById("market-budget").value||0);b.currency=document.getElementById("budget-currency").value;b.period=document.getElementById("budget-period").value;b.periodStart=document.getElementById("budget-start").value||new Date().toISOString().slice(0,10);saveState();closeModal();renderMarket();};}
function purchaseCartItem(itemId){const item=state.cart.find(i=>i.id===itemId);if(!item)return;const cost=toAud(item.quantity*item.price,item.currency||"AUD");if(state.budgetSettings.spent+cost>budgetAmountAud())return toast("Purchase blocked: this exceeds the active budget.");const owned=state.inventory.find(i=>i.name.toLowerCase()===item.name.toLowerCase());if(owned)owned.quantity+=item.quantity;else state.inventory.push({id:`inv${Date.now()}`,name:item.name,category:item.category,quantity:item.quantity,unit:item.category==="Yarn"?"balls":"items",color:"#718c72",details:"Added from shopping cart"});state.budgetSettings.spent+=cost;state.purchaseHistory.push({...item,boughtAt:new Date().toISOString(),audCost:cost});if(item.category==="DIY kit"&&item.createProject){const p={id:`p${Date.now()}`,name:item.name,type:"Other",color:colors[state.projects.length%colors.length],row:0,totalRows:null,chartRows:null,started:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),notes:"Created from a purchased DIY kit.",subCounters:[],markers:[],chart:null,assistantMessages:[],projectTools:{},buyList:[],pdfReference:"",attachments:[],patternPlan:{mode:"modified"},chatPreference:"ask",readerStatus:"No files analysed yet.",flowMode:true,chartMode:"og",annotations:[],annotationHistory:[],annotationRedo:[],annotationColor:"#d96572",annotationWidth:4,rowMask:null,coverAsset:null,chartAnalysis:null,linkedKit:item.name};state.projects.push(p);item.projectId=p.id;}state.cart=state.cart.filter(i=>i.id!==itemId);saveState();renderMarket();toast("Purchase moved into inventory");}
function openLibrarySpaceModal(editId=null){const section=state.librarySections.find(s=>s.id===editId);openModal(`<p class="eyebrow">LIBRARY SPACE</p><h2>${section?"Rename space":"New custom space"}</h2><div class="form-grid"><div class="field full"><label>Name</label><input id="space-name" value="${escapeHtml(section?.name||"")}" placeholder="e.g. Embroidery references"></div><div class="field full"><label>Description</label><input id="space-description" value="${escapeHtml(section?.description||"")}" placeholder="What belongs here?"></div></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-space">Save</button></div>`);document.getElementById("save-space").onclick=()=>{const name=document.getElementById("space-name").value.trim();if(!name)return toast("Name this space.");if(section){section.name=name;section.description=document.getElementById("space-description").value;}else state.librarySections.push({id:`lib${Date.now()}`,name,description:document.getElementById("space-description").value,icon:"□",items:[]});saveState();closeModal();renderLibrary();};}
async function deleteLibraryItem(sectionId,item){
  if(!item)return;
  if(!confirm("Are you sure you want to delete this item?"))return;
  await Promise.allSettled((item.assets||[]).map(asset=>deleteAsset(asset.id)));
  const section=state.librarySections.find(s=>s.id===sectionId);
  if(section)section.items=(section.items||[]).filter(entry=>entry.id!==item.id);
  state.techniqueKnowledge=(state.techniqueKnowledge||[]).filter(entry=>entry.id!==item.id);
  saveState();closeModal(true);renderLibrary();toast("Library item deleted.");
}
function openLibraryItemModal(sectionId,itemId=null){
  const section=state.librarySections.find(s=>s.id===sectionId),item=itemId?section?.items?.find(entry=>entry.id===itemId):null,tutorial=sectionId==="tutorials";
  const selectedCraft=item?.craft||"Knitting";
  openModal(`<p class="eyebrow">LIBRARY PAGE</p><h2>${item?"Edit":"Add"} resource</h2><div class="form-grid">${tutorial?`<div class="field"><label>Craft section</label><select id="item-craft">${["Knitting","Crochet","Tunisian crochet","Weaving","Other"].map(value=>`<option ${selectedCraft===value?"selected":""}>${value}</option>`).join("")}</select></div><div class="field"><label>Other section name</label><input id="item-other-craft" value="${["Knitting","Crochet","Tunisian crochet","Weaving"].includes(selectedCraft)?"":escapeHtml(selectedCraft)}" placeholder="Required when Other is selected"></div>`:""}<div class="field full"><label>Page or section name</label><input id="item-name" value="${escapeHtml(item?.name||"")}" placeholder="e.g. Crochet chains"></div><div class="field full"><label>Notes</label><textarea id="item-notes" rows="4">${escapeHtml(item?.notes||"")}</textarea></div><div class="field full upload-drop"><label>Multiple PDFs or photos</label><input id="item-file" type="file" accept=".pdf,image/*" multiple><small>${item?.assets?.length?`Add files to the ${item.assets.length} already saved file(s).`:"Stored in expanded browser file storage."}</small></div></div>${item?`<section class="danger-zone compact-danger-zone"><strong>Danger Zone</strong><p>Delete this library item only if you no longer need it. This action cannot be undone.</p><button type="button" class="danger-button secondary-button" id="delete-library-item-inside-edit">Delete item</button></section>`:""}<div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-library-item">${item?"Save changes":"Add to library"}</button></div>`);
  document.getElementById("delete-library-item-inside-edit")?.addEventListener("click",()=>deleteLibraryItem(sectionId,item));
  document.getElementById("save-library-item").onclick=async()=>{
    const name=document.getElementById("item-name").value.trim(),files=[...document.getElementById("item-file").files],craft=tutorial?document.getElementById("item-craft").value:"";
    if(!name)return toast("Name this page.");
    const other=tutorial?document.getElementById("item-other-craft").value.trim():"";
    if(craft==="Other"&&!other)return toast("Name the Other craft section.");
    const assets=[];
    for(const file of files){const id=`libasset${Date.now()}${Math.random().toString(16).slice(2)}`;await putAsset(id,file);assets.push({id,name:file.name,type:file.type,size:file.size});}
    const notes=document.getElementById("item-notes").value,finalCraft=craft==="Other"?other:craft;
    if(item){
      Object.assign(item,{name,notes,craft:finalCraft,assets:[...(item.assets||[]),...assets]});
    }else{
      section.items.push({id:`item${Date.now()}`,name,notes,craft:finalCraft,assets});
    }
    const savedItem=item||section.items.at(-1);
    if(tutorial)state.techniqueKnowledge=[...(state.techniqueKnowledge||[]).filter(k=>k.id!==savedItem.id),{id:savedItem.id,name,craft:finalCraft,text:notes,assets:(savedItem.assets||[]).map(a=>a.name)}];
    saveState();closeModal();renderLibrary();
  };
}
function markerColor(name) {
  if(validHex(name))return name;
  const map = { red:"#c75a55",blue:"#577fa8",green:"#62856a",yellow:"#d3a93f",purple:"#84658e",pink:"#c77b91",orange:"#d27b45" };
  return map[name.toLowerCase()] || "#7a837d";
}
function speak(text) { if (!("speechSynthesis" in window)) return toast("Speech is not supported in this browser."); speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(text)); }
function startVoice() {
  if(state.appPreferences?.voice===false)return toast("Voice controls are turned off in Settings.");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return toast("Voice control works best in Chrome or Edge.");
  recognition = new SpeechRecognition(); recognition.continuous = true; recognition.interimResults = false; recognition.maxAlternatives=1; recognition.lang = state.language==="zh-HK"?"yue-Hant-HK":"en-AU";
  recognition.onresult = e => handleVoice(e.results[e.results.length-1][0].transcript.toLowerCase().trim());
  recognition.onend = () => document.getElementById("voice-dock").classList.remove("active");
  recognition.onerror = () => toast("I couldn't access the microphone.");
  recognition.start(); document.getElementById("voice-dock").classList.add("active");
}
const voiceIntentAliases={
  nextRow:["next row","next","go next","go to next row","move next","move to next row","next line","row down","continue","continue row","advance row","下一行","下一列","下一個 row","下一針","繼續"],
  previousRow:["previous row","previous","go back","go to previous row","row up","last row","move back","move to previous row","上一行","返回","退後"],
  readRow:["read row","read this row","read current row","read aloud","speak row","讀出呢行","讀呢行","朗讀"],
  pause:["pause","stop reading","hold on"],
  resume:["resume","continue reading"],
  startWork:["start work","start project","開始","開始工作"],
  undo:["undo","復原","撤销","取消上一步"],
  repeatPlus:["mark repeat","increase repeat","repeat plus","重複加一","重复加一"],
  addNote:["add note","note","新增筆記","添加笔记"]
};
const voiceIntentLabels={nextRow:"Next Row",previousRow:"Previous Row",readRow:"Read Row",pause:"Pause",resume:"Resume",startWork:"Start Work",undo:"Undo",repeatPlus:"Repeat Plus",addNote:"Add Note",goToRow:"Go To Row",mark:"Mark"};
function normalizeVoiceText(text=""){
  return String(text).toLowerCase().replace(/[.,!?，。！？]/g," ").replace(/\brole\b/g,"row").replace(/\broad\b/g,"row").replace(/\bline\b/g,"row").replace(/\s+/g," ").trim();
}
function voiceDistance(a,b){
  if(a===b)return 0;
  const rows=Array.from({length:a.length+1},(_,i)=>[i]);
  for(let j=1;j<=b.length;j++)rows[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)rows[i][j]=Math.min(rows[i-1][j]+1,rows[i][j-1]+1,rows[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return rows[a.length][b.length];
}
function voiceSimilarity(a,b){
  const compactA=a.replace(/\s+/g,""),compactB=b.replace(/\s+/g,"");
  const max=Math.max(compactA.length,compactB.length,1);
  return 1-(voiceDistance(compactA,compactB)/max);
}
function matchVoiceIntent(action){
  const normalized=normalizeVoiceText(action);
  if(/^(?:go to row|row|前往第|去第)\s*\d+(?:\s*行)?$/.test(normalized))return{intent:"goToRow",confidence:1,matched:"row number"};
  if(/^(?:mark|標記|标记)\s+.+/.test(normalized))return{intent:"mark",confidence:.95,matched:"marker"};
  const candidates=[];
  for(const [intent,aliases] of Object.entries(voiceIntentAliases)){
    for(const alias of aliases){
      const normalizedAlias=normalizeVoiceText(alias);
      let score=voiceSimilarity(normalized,normalizedAlias);
      if(normalized===normalizedAlias)score=1;
      else if(normalized.includes(normalizedAlias)||normalizedAlias.includes(normalized))score=Math.max(score,.72);
      candidates.push({intent,confidence:score,matched:alias});
    }
  }
  candidates.sort((a,b)=>b.confidence-a.confidence);
  const best=candidates[0]||{intent:null,confidence:0,matched:""};
  if(best.intent==="resume"&&!("speechSynthesis" in window&&speechSynthesis.paused)&&normalizeVoiceText(action)==="continue")return{intent:"nextRow",confidence:.72,matched:"continue"};
  if(best.intent==="nextRow"&&normalizeVoiceText(action)==="continue"&&"speechSynthesis" in window&&speechSynthesis.paused)return{intent:"resume",confidence:.95,matched:"continue reading"};
  return best;
}
function updateVoiceDebug({text="",intent="",confidence=0}={}){
  const dock=document.getElementById("voice-dock");if(!dock)return;
  let el=document.getElementById("voice-debug");
  if(!el){el=document.createElement("small");el.id="voice-debug";el.className="voice-debug";dock.querySelector("div")?.appendChild(el);}
  el.textContent=`Recognised text: ${text || "—"} · Intent matched: ${intent || "—"} · Confidence: ${Math.round(confidence*100)}%`;
}
function confirmVoiceIntent(match,action){
  pendingVoiceIntent={match,action};
  const label=voiceIntentLabels[match.intent]||match.intent;
  updateVoiceDebug({text:action,intent:`${label}?`,confidence:match.confidence});
  openModal(`<p class="eyebrow">VOICE COMMAND</p><h2>Did you mean ${escapeHtml(label)}?</h2><p class="muted-copy">Recognised text: “${escapeHtml(action)}”</p><div class="modal-actions"><button class="secondary-button" id="voice-confirm-no">No</button><button class="primary-button" id="voice-confirm-yes">Yes</button></div>`);
  document.getElementById("voice-confirm-no").onclick=()=>{pendingVoiceIntent=null;closeModal();};
  document.getElementById("voice-confirm-yes").onclick=()=>{const pending=pendingVoiceIntent;pendingVoiceIntent=null;closeModal();executeVoiceIntent(pending.match,pending.action);};
}
function executeVoiceIntent(match,action){
  const p=getProject();if(!p||!match.intent)return;
  updateVoiceDebug({text:action,intent:voiceIntentLabels[match.intent]||match.intent,confidence:match.confidence});
  if(match.intent==="nextRow"){changeMainCounter(1);speak(`Row ${getProject().row}`);}
  else if(match.intent==="previousRow"){changeMainCounter(-1);speak(`Row ${getProject().row}`);}
  else if(match.intent==="readRow"){if(p.chartMode==="flow")readHighlightedRowAloud(p);else speak(buildRowGuidance(p));}
  else if(match.intent==="pause"){if("speechSynthesis" in window)speechSynthesis.pause();else toast("Speech is not supported in this browser.");}
  else if(match.intent==="resume"){if("speechSynthesis" in window)speechSynthesis.resume();else toast("Speech is not supported in this browser.");}
  else if(match.intent==="startWork")speak(`Starting ${p.name}, row ${p.row}.`);
  else if(match.intent==="undo"){undoAnnotation();speak("Undone");}
  else if(match.intent==="repeatPlus"){const s=p.subCounters[0];if(s){s.count++;saveProjectTouch(p);renderProjectDetail();speak(`${s.name} ${s.count}`);}else toast("Add a repeat counter first.");}
  else if(match.intent==="addNote"){p.notes=`${p.notes}${p.notes?"\n":""}Voice note at row ${p.row}.`;saveProjectTouch(p);renderProjectDetail();speak("Note added");}
  else if(match.intent==="goToRow"){const row=+action.match(/\d+/)[0];setMainRow(Math.max(0,p.totalRows?Math.min(p.totalRows,row):row),{render:false});renderProjectDetail();speak(`Going to row ${p.row}`);}
  else if(match.intent==="mark"){const color=action.replace(/^(?:mark|標記|标记)\s+/,"").trim();p.markers.push({id:`marker${Date.now()}`,row:p.row,color:markerColor(color),label:color});saveState();renderProjectDetail();speak(`${color} marker placed at row ${p.row}`);}
}
function handleVoice(command) {
  const p = getProject();
  if (!p) return;
  const normalized=normalizeVoiceText(command);
  const english=normalized.match(/^(?:a bit of yarn|yarn assistant)\s+(.+)$/);
  const chinese=normalized.match(/^(?:一點毛線|毛線助手)\s*(.+)$/);
  const action=(english?.[1]||chinese?.[1]||normalized).trim();
  const match=matchVoiceIntent(action);
  if(match.confidence>=.82)return executeVoiceIntent(match,action);
  if(match.confidence>=.62)return confirmVoiceIntent(match,action);
  updateVoiceDebug({text:action,intent:"No match",confidence:match.confidence});
  toast('Command not matched. Try “next row”, “previous row”, “read row”, “pause”, or “resume”.');
}

function maybeShowOnboarding(){
  if(state.onboardingComplete)return;
  renderOnboarding();
}
function renderOnboarding(){
  const steps=[
    {title:"Open Project",text:"Choose or create a project so your chart, row counter and notes stay together.",target:"Projects"},
    {title:"Reading Mode",text:"Open the Chart tab and enter Reading Mode for row-by-row tracking.",target:"Reading Mode"},
    {title:"Next Row",text:"Use Next Row when you finish a row. Yarncha saves your place automatically.",target:"Next Row"}
  ];
  const step=steps[Math.min(state.onboardingStep||0,steps.length-1)];
  let overlay=document.getElementById("onboarding-overlay");
  if(!overlay){overlay=document.createElement("div");overlay.id="onboarding-overlay";overlay.className="onboarding-overlay";document.body.appendChild(overlay);}
  overlay.innerHTML=`<div class="onboarding-card card" role="dialog" aria-modal="false" aria-label="First run guide">
    <p class="eyebrow">QUICK START · ${Math.min(state.onboardingStep||0,steps.length-1)+1}/${steps.length}</p>
    <h2>${step.title}</h2><p>${step.text}</p><span class="onboarding-target">${step.target}</span>
    <div class="modal-actions"><button class="secondary-button" id="skip-onboarding">Skip</button><button class="primary-button" id="next-onboarding">${(state.onboardingStep||0)>=steps.length-1?"Done":"Next"}</button></div>
  </div>`;
  document.getElementById("skip-onboarding").onclick=completeOnboarding;
  document.getElementById("next-onboarding").onclick=()=>{if((state.onboardingStep||0)>=steps.length-1)return completeOnboarding();state.onboardingStep=(state.onboardingStep||0)+1;saveState();renderOnboarding();};
}
function completeOnboarding(){state.onboardingComplete=true;saveState();document.getElementById("onboarding-overlay")?.remove();}

document.getElementById("new-project").onclick = openProjectModal;
document.getElementById("quick-add-project").onclick = openProjectModal;
document.getElementById("app-language").onchange=e=>{state.language=e.target.value;saveState();applyLanguage();renderTimeGreeting();};
ensureModalElements();
document.getElementById("modal-close").onclick = () => closeModal();
document.getElementById("modal-backdrop").onclick = e => { if (e.target.id === "modal-backdrop") closeModal(); };
document.addEventListener("keydown",event=>{
  const backdrop=document.getElementById("modal-backdrop");if(!backdrop?.classList.contains("open"))return;
  if(event.key==="Escape"){event.preventDefault();closeModal();return;}
  if(event.key!=="Tab")return;
  const focusable=[...backdrop.querySelectorAll('button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),a[href]')].filter(node=>!node.hidden&&node.offsetParent!==null);
  if(!focusable.length)return;
  const first=focusable[0],last=focusable.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
});
document.getElementById("mobile-menu").onclick = () => document.querySelector(".sidebar").classList.toggle("open");
document.getElementById("phone-help").onclick=()=>openModal(`<p class="eyebrow">DEVICE ACCESS</p><h2>Open Yarncha on your phone</h2><p><strong>On this Mac:</strong> open <code>http://localhost:4183/</code> while the Yarncha preview server is running.</p><p><strong>On your phone:</strong> localhost points to the phone itself, so it will not open Yarncha. Connect the phone and Mac to the same Wi-Fi, then open <code>http://MAC_LOCAL_IP:4183/</code> using the Mac's local network address.</p><p><strong>If it still does not connect:</strong> allow incoming connections through the Mac firewall and try another available port such as 4184 or 5173.</p><p><strong>Deployed website:</strong> once Yarncha is deployed, use its hosted address instead of a local network address.</p><div class="privacy-note">Local browser storage does not automatically sync between devices or browsers. Export a backup before switching browser, clearing data, or moving device.</div><div class="modal-actions"><button class="primary-button" onclick="closeModal()">Close</button></div>`);
document.getElementById("account-button").onclick=openAccountModal;
document.getElementById("voice-top").onclick = startVoice;
document.getElementById("stop-voice").onclick = () => { recognition?.stop(); document.getElementById("voice-dock").classList.remove("active"); };

window.YarnchaLocal={
  getState:()=>state,
  getActiveProject:()=>getProject(),
  saveState,
  replaceState(next){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(next));
    state=loadState();
    currentProjectId=state.activeProjectId||state.projects[0]?.id||null;
    renderSidebar();renderToday();renderProjects();renderLibrary();applyTheme();applyLanguage();
    if(document.getElementById("project-detail-view")?.classList.contains("active"))renderProjectDetail();
    if(document.getElementById("settings-view")?.classList.contains("active"))renderSettings();
  },
  getAsset,
  putAsset,
  assetDescriptors(project){
    const descriptors=[];
    if(project.coverAsset)descriptors.push({id:project.coverAsset,kind:"cover",name:`${project.name} cover`});
    for(const item of project.attachments||[])descriptors.push({id:item.id,kind:"chart",name:item.name});
    if(project.chart?.assetId&&!descriptors.some(item=>item.id===project.chart.assetId))descriptors.push({id:project.chart.assetId,kind:"chart",name:project.chart.name});
    return descriptors;
  },
  rerenderSettings(){if(document.getElementById("settings-view")?.classList.contains("active"))renderSettings();},
  openModal,
  closeModal,
  toast,
  escapeHtml,
  uiIcon
};

renderSidebar();
renderToday();
setActiveView("today");
renderLibrary();
applyTheme();
applyLanguage();
refreshFxRates();
maybeShowOnboarding();
if("serviceWorker" in navigator)navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
