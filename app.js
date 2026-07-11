const STORAGE_KEY = "threadline-data-v1";
const colors = ["#6f8872", "#b56d52", "#8a7895", "#c19b5b", "#637f91"];
const APP_NAME = "Yarncha";
const BACKUP_VERSION = 2;
const PROJECT_SCHEMA_VERSION = 2;
const projectTypeOptions = ["Knitting","Crochet","Tunisian Crochet","Weaving","Other"];
const projectStatusOptions = ["Planning","In progress","Paused","Finished","Frogged"];
const themePresets=[
  {id:"corner-of-light",name:"Corner of Light",badge:"Vintage",description:"Warm paper layers, earthy accents, and a grounded craft journal feel.",recommended:true,canDelete:false,primary:"#793409",secondary:"#AD9E66",accent:"#C96C23",background:"#F6EAD7",surface:"#FFF7E7",card:"#EFE2C1",border:"#717678",text:"#332211",textSecondary:"#5D6264",button:"#793409",buttonText:"#FFF8EA",secondaryButton:"#E7D9B8",success:"#6F7A3E",warning:"#C96C23",danger:"#A54824",highlight:"#FCC277",link:"#793409",colors:{background:"#F6EAD7",surface:"#FFF7E7",surfaceSecondary:"#EFE2C1",primary:"#793409",primaryHover:"#5F2807",secondary:"#AD9E66",accent:"#C96C23",accentSoft:"#FCC277",border:"#717678",divider:"#DCCB9F",text:"#332211",textSecondary:"#5D6264",success:"#6F7A3E",warning:"#C96C23",error:"#A54824",chartCurrentRow:"#FCC277",chartCompleted:"#E8D9B7",annotationPen:"#793409",annotationHighlight:"rgba(252,194,119,0.32)",voiceListening:"#C96C23",shadow:"rgba(121,52,9,0.10)"},dark:{background:"#1A120C",surface:"#2B1C12",card:"#352314",text:"#FFF1D7",textSecondary:"#D3C09A",button:"#FCC277",buttonText:"#241407",secondary:"#4B3D24",accent:"#C96C23",border:"#6F5730",success:"#B2B978",warning:"#FCC277",danger:"#E28A62",highlight:"#FCC277",link:"#FCC277"}},
  {id:"flower-blossom",name:"Flower Blossom",description:"Soft spring flowers with warm peach accents.",primary:"#958F42",secondary:"#EEBB9A",accent:"#FB9547",background:"#EBE6D9",surface:"#FFF9F2",card:"#F7EFE4",border:"#D8CDBE",text:"#3D372C",textSecondary:"#726A5E",button:"#958F42",buttonText:"#2A241C",secondaryButton:"#F7EFE4",success:"#8CA04D",warning:"#FB9547",danger:"#C96E72",highlight:"#DD8687",link:"#6F692D",colors:{background:"#EBE6D9",surface:"#FFF9F2",surfaceSecondary:"#F7EFE4",primary:"#958F42",primaryHover:"#7F7937",secondary:"#EEBB9A",accent:"#FB9547",border:"#D8CDBE",divider:"#E9E0D4",text:"#3D372C",textSecondary:"#726A5E",success:"#8CA04D",warning:"#FB9547",error:"#C96E72",chartCurrentRow:"#DD8687",chartCompleted:"#EEC8A8",annotationPen:"#958F42",annotationHighlight:"rgba(251,149,71,0.28)",voiceListening:"#FB9547",shadow:"rgba(61,55,44,0.08)"},dark:{background:"#17150F",surface:"#2B261D",card:"#352D22",text:"#F8F1E7",textSecondary:"#D8CCBD",button:"#D7D06C",buttonText:"#18150E",secondary:"#483628",accent:"#FFB172",border:"#5E4F3C",success:"#B8CD74",warning:"#FFB172",danger:"#FF9699",highlight:"#F2A4A5",link:"#FFD8A8"}},
  {id:"sky-blessing",name:"Sky Blessing",description:"Clear sky, soft mint, and golden sunshine for a fresh calm workspace.",tags:["fresh","green","yellow","soft","airy"],primary:"#404930",secondary:"#BDD3D0",accent:"#BD962F",background:"#F7FAF7",surface:"#FFFFFF",card:"#F1F5F1",border:"#D8DED6",text:"#2F3528",textSecondary:"#66705F",button:"#404930",buttonText:"#FFFFFF",secondaryButton:"#F1F5F1",success:"#5E7046",warning:"#BD962F",danger:"#B94A48",highlight:"#BDD3D0",link:"#404930",colors:{background:"#F7FAF7",surface:"#FFFFFF",surfaceSecondary:"#F1F5F1",primary:"#404930",primaryHover:"#313927",secondary:"#BDD3D0",accent:"#BD962F",accentSoft:"#EFD36D",border:"#D8DED6",divider:"#E8EDE6",text:"#2F3528",textSecondary:"#66705F",success:"#5E7046",warning:"#BD962F",error:"#B94A48",chartCurrentRow:"#BDD3D0",chartCompleted:"#EFD36D",annotationPen:"#404930",annotationHighlight:"rgba(239, 211, 109, 0.35)",voiceListening:"#BD962F",shadow:"rgba(47, 53, 40, 0.08)"},dark:{background:"#101510",surface:"#202A22",card:"#2A352C",text:"#F4FAF4",textSecondary:"#CAD8C8",button:"#BFD8C9",buttonText:"#11130F",secondary:"#31423E",accent:"#E4C15E",border:"#4A5D4D",success:"#9FBD81",warning:"#E4C15E",danger:"#FF8E8C",highlight:"#CFE6E1",link:"#EFD36D"}},
  {id:"matcha-grove",name:"Matcha Grove",description:"Quiet green shade with ink-like contrast.",primary:"#121810",secondary:"#3B5131",accent:"#768572",background:"#F3F2EF",surface:"#FFFFFF",card:"#ECEBE7",border:"#CFCFC8",text:"#1E241C",textSecondary:"#596255",button:"#121810",buttonText:"#FFFDF8",secondaryButton:"#ECEBE7",success:"#4E6943",warning:"#A08F54",danger:"#9A6767",highlight:"#768572",link:"#30482A",colors:{background:"#F3F2EF",surface:"#FFFFFF",surfaceSecondary:"#ECEBE7",primary:"#121810",primaryHover:"#0C100B",secondary:"#3B5131",accent:"#768572",border:"#CFCFC8",divider:"#E3E3DD",text:"#1E241C",textSecondary:"#596255",success:"#4E6943",warning:"#A08F54",error:"#9A6767",chartCurrentRow:"#768572",chartCompleted:"#BCBFB1",annotationPen:"#3B5131",annotationHighlight:"rgba(118,133,114,0.25)",voiceListening:"#3B5131",shadow:"rgba(18,24,16,0.08)"},dark:{background:"#0E120D",surface:"#1C2518",card:"#263020",text:"#F4F6EF",textSecondary:"#CBD4C4",button:"#B4C0A8",buttonText:"#11130F",secondary:"#304427",accent:"#94A58E",border:"#465740",success:"#8FB37E",warning:"#CDBA77",danger:"#D58D8D",highlight:"#94A58E",link:"#C8D7BC"}},
  {id:"ocean-mist",name:"Ocean Mist",description:"Misty shoreline neutrals with quiet sea-glass greens.",primary:"#5B5C5E",secondary:"#697D7B",accent:"#8C9F96",background:"#F3F5F4",surface:"#FFFFFF",card:"#ECEFED",border:"#D7D8D4",text:"#353739",textSecondary:"#656B69",button:"#5B5C5E",buttonText:"#FFFDF8",secondaryButton:"#ECEFED",success:"#6C8A82",warning:"#B79A73",danger:"#A56E6A",highlight:"#8C9F96",link:"#4F6563",colors:{background:"#F3F5F4",surface:"#FFFFFF",surfaceSecondary:"#ECEFED",primary:"#5B5C5E",primaryHover:"#4A4B4D",secondary:"#697D7B",accent:"#8C9F96",border:"#D7D8D4",divider:"#E8EAE8",text:"#353739",textSecondary:"#656B69",success:"#6C8A82",warning:"#B79A73",error:"#A56E6A",chartCurrentRow:"#8C9F96",chartCompleted:"#BFB09B",annotationPen:"#697D7B",annotationHighlight:"rgba(140,159,150,0.28)",voiceListening:"#697D7B",shadow:"rgba(53,55,57,0.08)"},dark:{background:"#101414",surface:"#222A29",card:"#2C3533",text:"#F1F5F4",textSecondary:"#CCD5D2",button:"#B7C7C1",buttonText:"#11130F",secondary:"#374B49",accent:"#9FB6AD",border:"#4E5E5A",success:"#9ABCB2",warning:"#D9BF93",danger:"#DA9692",highlight:"#9FB6AD",link:"#CBE6DE"}},
  {id:"mediterranean-dream",name:"Mediterranean Dream",description:"Elegant seaside ceramics with soft stone and blush.",primary:"#A0AFB6",secondary:"#B3B69E",accent:"#E6CDC6",background:"#FAF8F6",surface:"#FFFFFF",card:"#F3F0ED",border:"#DDD8D2",text:"#4A4C50",textSecondary:"#6B6C70",button:"#A0AFB6",buttonText:"#2A241C",secondaryButton:"#F3F0ED",success:"#8F9E89",warning:"#D7B394",danger:"#C58F92",highlight:"#E6CDC6",link:"#58727D",colors:{background:"#FAF8F6",surface:"#FFFFFF",surfaceSecondary:"#F3F0ED",primary:"#A0AFB6",primaryHover:"#8898A0",secondary:"#B3B69E",accent:"#E6CDC6",border:"#DDD8D2",divider:"#ECE7E2",text:"#4A4C50",textSecondary:"#6B6C70",success:"#8F9E89",warning:"#D7B394",error:"#C58F92",chartCurrentRow:"#E6CDC6",chartCompleted:"#B3B69E",annotationPen:"#A0AFB6",annotationHighlight:"rgba(230,205,198,0.28)",voiceListening:"#A0AFB6",shadow:"rgba(74,76,80,0.08)"},dark:{background:"#111416",surface:"#22282B",card:"#2E3436",text:"#F3F4F4",textSecondary:"#D2D5D7",button:"#B9CAD2",buttonText:"#11130F",secondary:"#42483C",accent:"#E8C9C2",border:"#596267",success:"#B8D0AF",warning:"#E3C09E",danger:"#E4A0A4",highlight:"#E8C9C2",link:"#C8E3EE"}},
  {id:"sakura-milk",name:"Sakura Milk",description:"Milky pinks and vanilla warmth for a gentle workspace.",primary:"#DCA094",secondary:"#C8A59E",accent:"#E1C5C4",background:"#FFF9F6",surface:"#FFFFFF",card:"#F8F2EE",border:"#E5D8D3",text:"#5A4845",textSecondary:"#786460",button:"#DCA094",buttonText:"#2A241C",secondaryButton:"#F8F2EE",success:"#B9B27A",warning:"#DCA094",danger:"#C97F8C",highlight:"#E1C5C4",link:"#9B5F57",colors:{background:"#FFF9F6",surface:"#FFFFFF",surfaceSecondary:"#F8F2EE",primary:"#DCA094",primaryHover:"#C8897B",secondary:"#C8A59E",accent:"#E1C5C4",border:"#E5D8D3",divider:"#F0E8E5",text:"#5A4845",textSecondary:"#786460",success:"#B9B27A",warning:"#DCA094",error:"#C97F8C",chartCurrentRow:"#E1C5C4",chartCompleted:"#E6D9BA",annotationPen:"#DCA094",annotationHighlight:"rgba(225,197,196,0.30)",voiceListening:"#DCA094",shadow:"rgba(90,72,69,0.08)"},dark:{background:"#181211",surface:"#2B211F",card:"#372A27",text:"#FFF2EE",textSecondary:"#E5CBC4",button:"#F0B7AD",buttonText:"#11130F",secondary:"#493832",accent:"#EBC9C8",border:"#654E48",success:"#D1C989",warning:"#F0B7AD",danger:"#EF98A5",highlight:"#EBC9C8",link:"#FFD5CE"}},
  {id:"lavender-twilight",name:"Lavender Twilight",description:"Dusky lavender with quiet blush and evening ink.",primary:"#4D516D",secondary:"#A8868C",accent:"#B5A4B4",background:"#FAF8FA",surface:"#FFFFFF",card:"#F4F1F4",border:"#DED9DD",text:"#3A3D4F",textSecondary:"#6F6A72",button:"#4D516D",buttonText:"#FFFDF8",secondaryButton:"#F4F1F4",success:"#8D8AA4",warning:"#C5A38E",danger:"#B06E83",highlight:"#B5A4B4",link:"#4D516D",colors:{background:"#FAF8FA",surface:"#FFFFFF",surfaceSecondary:"#F4F1F4",primary:"#4D516D",primaryHover:"#3F435B",secondary:"#A8868C",accent:"#B5A4B4",border:"#DED9DD",divider:"#ECE8EC",text:"#3A3D4F",textSecondary:"#6F6A72",success:"#8D8AA4",warning:"#C5A38E",error:"#B06E83",chartCurrentRow:"#B5A4B4",chartCompleted:"#DDDAD5",annotationPen:"#4D516D",annotationHighlight:"rgba(181,164,180,0.28)",voiceListening:"#4D516D",shadow:"rgba(58,61,79,0.08)"},dark:{background:"#11121A",surface:"#222433",card:"#2D3042",text:"#F3F1FA",textSecondary:"#D2CEDD",button:"#AEB6E3",buttonText:"#11130F",secondary:"#4A363E",accent:"#CFBBD0",border:"#55586F",success:"#B8B5D4",warning:"#DDBCA5",danger:"#D890A4",highlight:"#CFBBD0",link:"#CCD3FF"}}
];
const designStyles=[
  {id:"original-classic",name:"Yarncha Default",tag:"Recommended",desc:"Balanced, calm, premium handmade base."},
  {id:"warm-cozy",name:"Warm Cozy",tag:"Cozy",desc:"Soft, rounded, relaxed handmade workspace."},
  {id:"modern-atelier",name:"Modern Atelier",tag:"Studio",desc:"Structured, calm, and studio-inspired."},
  {id:"artsy-journal",name:"Artsy Journal",tag:"Creative",desc:"Creative, personal, and notebook-like."}
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
  theme:{name:"corner-of-light",style:"original-classic",mode:"system"},
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
  symbolLearningLibrary:[],
  libraryBookmarks:[],
  libraryEntryNotes:{},
  librarySuggestedEdits:[],
  libraryRecentlyViewed:[],
  libraryProjectChecklist:[],
  libraryPathProgress:{},
  libraryReports:[]
};

let hasLoadedSavedState = false;
let state = loadState();
hasLoadedSavedState = true;
let currentProjectId = state.activeProjectId;
let activePage = "today";
let renderedComponent = "TodayPage";
let currentLibrarySection = null;
let currentLibraryEntryId = null;
let currentLibraryPathId = null;
let libraryWikiFilters = {search:"",craft:"All",level:"All",category:"All",projectType:"All",tool:"All",path:"All"};
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
let rowMaskDragState = null;
let arrowDrag = null;
let touchReadTap = null;
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
  const key=String(name||"").trim().toLowerCase();
  if(key.includes("corner-of-light")||key.includes("corner of light")||key.includes("vintage-paper"))return "corner-of-light";
  return { "soft-yarn":"corner-of-light", "creamy-vanilla":"corner-of-light", "cocoa-beige":"corner-of-light", sakura:"sakura-milk", forest:"matcha-grove", "matcha-latte":"matcha-grove", "peach-apricot":"sky-blessing", "soft-lavender":"lavender-twilight" }[key] || (themePresets.some(t=>t.id===key)?key:"corner-of-light");
}
function normalizeDesignStyle(style){
  const migrated={ "minimal-clean":"modern-atelier", "korean-soft":"original-classic", "classic-elegant":"original-classic", "corner-of-light":"original-classic", "corner-of-light-vintage-paper":"original-classic" }[style] || style;
  return designStyles.some(s=>s.id===migrated)?migrated:"original-classic";
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
function buildSetupFromLegacyProjectFields(project={}){
  const fit=project.fitCheck||{},materials=project.materials||{},simple=project.setup||{};
  return {
    ...simple,
    craftType:simple.craftType||simple.craft||project.craft||project.type,
    projectType:simple.projectType||project.projectKind||project.size,
    yarnWeight:simple.yarnWeight||simple.userYarnWeight||simple.patternYarnWeight||project.yarn,
    yarnName:simple.yarnName||materials.yarnName||project.yarn,
    yarnColour:simple.yarnColour||materials.yarnColour||materials.color||"",
    dyeLot:simple.dyeLot||materials.dyeLot||"",
    hookNeedle:simple.hookNeedle||simple.userToolSize||simple.patternToolSize||project.needles,
    gauge:simple.gauge||simple.patternGauge||project.gauge,
    startStitches:simple.startStitches||simple.castOn||project.castOn||simple.stitchCount||"",
    rows:simple.rows||simple.rowCount||project.chartRows||project.totalRows||"",
    bodyMeasurementCm:simple.bodyMeasurementCm||fit.bodyChest||simple.bodyMeasurements?.chest||"",
    finishedWidthCm:simple.finishedWidthCm||fit.finishedChest||simple.width||"",
    intendedEaseCm:simple.intendedEaseCm||fit.intendedEase||simple.easeCm||"",
    targetLengthCm:simple.targetLengthCm||fit.targetLength||simple.length||"",
    currentLengthCm:simple.currentLengthCm||fit.currentLength||"",
    fitFeeling:simple.fitFeeling||fit.feeling||"",
    tryOnNotes:simple.tryOnNotes||fit.notes||"",
    notes:simple.notes||project.sizingNotes||"",
    quantity:simple.quantity||materials.quantity||"",
    materialStatus:simple.materialStatus||materials.status||"Owned"
  };
}
function normalizeProjectSetup(setup={},project={}){
  const sizeOptions=["XXS","XS","S","M","L","XL","XXL","Custom"];
  const projectTypes=["Scarf","Socks","Hat / Beanie","Shawl","Bag","Blanket","Amigurumi","Top","Cardigan","Jumper / Sweater","Vest","Dress","Other"];
  const measurements=setup.bodyMeasurements||{};
  const details=setup.itemDetails||{};
  const numberText=value=>String(value??"").trim();
  const craftSource=setup.craftType||setup.craft||project.type||"";
  const craft=["Knitting","Crochet","Tunisian Crochet"].includes(craftSource)?craftSource:(/tunisian/i.test(craftSource)?"Tunisian Crochet":/crochet/i.test(craftSource||project.type||"")?"Crochet":"Knitting");
  const projectType=projectTypes.includes(setup.projectType)?setup.projectType:projectTypes.includes(project.projectKind)?project.projectKind:"Other";
  const yarnWeight=setup.yarnWeight||setup.userYarnWeight||setup.patternYarnWeight||project.yarn||"";
  const hookNeedle=setup.hookNeedle||setup.userToolSize||setup.patternToolSize||setup.patternToolSizeMm||project.needles||"";
  const gauge=setup.gauge||setup.patternGauge||project.gauge||"";
  const bodyMeasurementCm=numberText(setup.bodyMeasurementCm||measurements.chest||project.fitCheck?.bodyChest);
  const finishedWidthCm=numberText(setup.finishedWidthCm||setup.patternWidthCm||details.width||project.fitCheck?.finishedChest);
  const targetLengthCm=numberText(setup.targetLengthCm||setup.patternLengthCm||details.length||project.fitCheck?.targetLength);
  return {
    craft,
    craftType:craft,
    projectType,
    yarnWeight,
    yarnName:setup.yarnName||project.yarn||"",
    yarnColour:setup.yarnColour||setup.color||"",
    dyeLot:setup.dyeLot||"",
    hookNeedle,
    gauge,
    startStitches:numberText(setup.startStitches||setup.castOn||setup.originalPatternStitches),
    rows:numberText(setup.rows||setup.rowCount||setup.originalPatternRows||project.chartRows||project.totalRows),
    bodyMeasurementCm,
    finishedWidthCm,
    intendedEaseCm:numberText(setup.intendedEaseCm||setup.easeCm||project.fitCheck?.intendedEase),
    targetLengthCm,
    currentLengthCm:numberText(setup.currentLengthCm||project.fitCheck?.currentLength),
    fitFeeling:setup.fitFeeling||project.fitCheck?.feeling||"Not checked yet",
    tryOnNotes:setup.tryOnNotes||project.fitCheck?.notes||"",
    notes:setup.notes||project.sizingNotes||"",
    quantity:numberText(setup.quantity),
    materialStatus:setup.materialStatus||"Owned",
    patternGauge:setup.patternGauge||gauge,
    patternToolSize:setup.patternToolSize||setup.patternToolSizeMm||hookNeedle,
    patternYarnWeight:setup.patternYarnWeight||yarnWeight,
    userToolSize:setup.userToolSize||setup.userToolSizeMm||hookNeedle,
    userYarnWeight:setup.userYarnWeight||yarnWeight,
    patternToolSizeMm:numberText(setup.patternToolSizeMm||setup.patternToolSize||hookNeedle),
    userToolSizeMm:numberText(setup.userToolSizeMm||setup.userToolSize||hookNeedle),
    patternGaugeStitches:numberText(setup.patternGaugeStitches),
    patternGaugeRows:numberText(setup.patternGaugeRows),
    userGaugeStitches:numberText(setup.userGaugeStitches),
    userGaugeRows:numberText(setup.userGaugeRows),
    gaugeWidthCm:numberText(setup.gaugeWidthCm||10),
    gaugeHeightCm:numberText(setup.gaugeHeightCm||10),
    stitchRepeatMultiple:numberText(setup.stitchRepeatMultiple),
    edgeStitches:numberText(setup.edgeStitches),
    easeCm:numberText(setup.easeCm),
    easePercent:numberText(setup.easePercent),
    swatchWidthCm:numberText(setup.swatchWidthCm),
    swatchHeightCm:numberText(setup.swatchHeightCm),
    swatchWeightGrams:numberText(setup.swatchWeightGrams),
    patternYarnGrams:numberText(setup.patternYarnGrams),
    patternAreaCm2:numberText(setup.patternAreaCm2),
    originalPatternStitches:numberText(setup.originalPatternStitches||setup.startStitches),
    originalPatternRows:numberText(setup.originalPatternRows||setup.rows),
    patternWidthCm:numberText(setup.patternWidthCm||finishedWidthCm),
    patternLengthCm:numberText(setup.patternLengthCm||targetLengthCm),
    desiredSize:sizeOptions.includes(setup.desiredSize)?setup.desiredSize:(sizeOptions.includes(project.size)?project.size:"M"),
    customSize:setup.customSize||project.size||"",
    patternLanguage:["abbreviations","full"].includes(setup.patternLanguage)?setup.patternLanguage:"abbreviations",
    bodyMeasurements:{
      chest:measurements.chest||bodyMeasurementCm||"",
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
      easePreference:details.easePreference||"Regular",
      constructionMethod:details.constructionMethod||"Cuff-down",
      garmentConstruction:details.garmentConstruction||details.constructionMethod||"Pattern decides",
      heelStyle:details.heelStyle||"Pattern decides",
      toeLength:details.toeLength||"",
      desiredLegHeight:details.desiredLegHeight||"",
      cuffHeight:details.cuffHeight||"",
      pickedUpGussetStitches:details.pickedUpGussetStitches||"",
      headCircumference:details.headCircumference||"",
      hatStyle:details.hatStyle||"Fitted beanie",
      hatDepth:details.hatDepth||"",
      brimDepth:details.brimDepth||"",
      brimStyle:details.brimStyle||"Ribbed brim",
      crownStyle:details.crownStyle||"Pattern decides",
      decreaseSections:details.decreaseSections||"8",
      finalTopStitchesPerSection:details.finalTopStitchesPerSection||"1",
      bagType:details.bagType||"Tote",
      width:details.width||finishedWidthCm||"",
      height:details.height||"",
      length:details.length||targetLengthCm||"",
      strapLength:details.strapLength||"",
      strapWidth:details.strapWidth||"",
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
      squareSize:details.squareSize||"",
      blockWidth:details.blockWidth||"",
      blockHeight:details.blockHeight||"",
      amigurumiType:details.amigurumiType||"Animal",
      finishedHeight:details.finishedHeight||"",
      finishedWidth:details.finishedWidth||"",
      shape:details.shape||"Round",
      stuffingFirmness:details.stuffingFirmness||"Medium",
      safetyRecipient:details.safetyRecipient||"Adult",
      originalHeight:details.originalHeight||"",
      originalWidth:details.originalWidth||"",
      targetHeight:details.targetHeight||"",
      originalYarnGrams:details.originalYarnGrams||"",
      originalStuffingGrams:details.originalStuffingGrams||"",
      originalEyeSizeMm:details.originalEyeSizeMm||"",
      shawlShape:details.shawlShape||"Triangle",
      shawlFit:details.shawlFit||"Everyday Shawl",
      wearStyle:details.wearStyle||details.shawlFit||"Shoulder shawl",
      wingspan:details.wingspan||"",
      skirtLength:details.skirtLength||"",
      upperArmCircumference:details.upperArmCircumference||"",
      wristCircumference:details.wristCircumference||"",
      armholeDepth:details.armholeDepth||"",
      buttonBandStitches:details.buttonBandStitches||""
    },
    updatedAt:setup.updatedAt||""
  };
}
function ensureProjectSetup(p){
  const setup=normalizeProjectSetup(p.setup||p.projectSetup||buildSetupFromLegacyProjectFields(p),p);
  p.setup=setup;
  p.projectSetup=setup;
  p.projectCalculations=calculateFlowProjectPlan(p,setup);
  return setup;
}
function applySharedProjectSetup(p,partialSetup={}){
  const setup=normalizeProjectSetup({...ensureProjectSetup(p),...partialSetup,updatedAt:new Date().toISOString()},p);
  p.setup=setup;
  p.projectSetup=setup;
  p.type=setup.craft;
  p.projectKind=setup.projectType;
  p.yarn=setup.yarnName||setup.yarnWeight||p.yarn||"";
  p.needles=setup.hookNeedle||setup.userToolSize||setup.patternToolSize||p.needles||"";
  p.gauge=setup.gauge||setup.patternGauge||p.gauge||"";
  p.sizingNotes=setup.notes||p.sizingNotes||"";
  p.fitCheck={
    ...(p.fitCheck||{}),
    bodyChest:setup.bodyMeasurementCm,
    finishedChest:setup.finishedWidthCm,
    intendedEase:setup.intendedEaseCm,
    targetLength:setup.targetLengthCm,
    currentLength:setup.currentLengthCm,
    feeling:setup.fitFeeling,
    notes:setup.tryOnNotes,
    updatedAt:setup.updatedAt
  };
  p.projectCalculations=calculateFlowProjectPlan(p,setup);
  if(setup.rows&&!p.chartRows)p.chartRows=Number(setup.rows)||p.chartRows;
  if(setup.rows&&!p.totalRows)p.totalRows=Number(setup.rows)||p.totalRows;
  return setup;
}
function firstNumber(value,fallback=0){
  const match=String(value||"").match(/-?\d+(?:\.\d+)?/);
  return match?Number(match[0]):fallback;
}
function cleanNumber(value,fallback=0){
  const number=Number(String(value??"").replace(/[^\d.-]/g,""));
  return Number.isFinite(number)?number:fallback;
}
function hasPositive(value){return cleanNumber(value,0)>0;}
function roundFlow(value,digits=1){
  const factor=10**digits;
  return Math.round((Number(value)||0)*factor)/factor;
}
function roundToNearestMultiple(value,multiple=1){
  const step=Math.max(1,Math.round(Number(multiple)||1));
  return Math.round((Number(value)||0)/step)*step;
}
function roundCircular(value,multiple=4){
  return Math.max(multiple,roundToNearestMultiple(value,multiple));
}
function parseGaugePair(gauge=""){
  const nums=String(gauge||"").match(/\d+(?:\.\d+)?/g)?.map(Number)||[];
  return {stitches:nums[0]||0,rows:nums[1]||0,span:nums[2]||10};
}
function sharedCalculationEngine(){
  return globalThis.YarnchaCalculations;
}
function flowGaugeValues(setup={}){
  const engine=sharedCalculationEngine();
  if(engine?.gaugeFromSetup)return engine.gaugeFromSetup(setup);
  const parsed=parseGaugePair(setup.patternGauge);
  const gaugeWidthCm=Math.max(1,cleanNumber(setup.gaugeWidthCm,10)||10);
  const gaugeHeightCm=Math.max(1,cleanNumber(setup.gaugeHeightCm,gaugeWidthCm)||gaugeWidthCm);
  const patternGaugeStitches=cleanNumber(setup.patternGaugeStitches,parsed.stitches||20);
  const patternGaugeRows=cleanNumber(setup.patternGaugeRows,parsed.rows||28);
  return {gaugeWidthCm,gaugeHeightCm,patternGaugeStitches,patternGaugeRows,userGaugeStitches:patternGaugeStitches,userGaugeRows:patternGaugeRows,hasUserGauge:false,stitchesPerCm:patternGaugeStitches/gaugeWidthCm,rowsPerCm:patternGaugeRows/gaugeHeightCm,patternStitchesPerCm:patternGaugeStitches/gaugeWidthCm,patternRowsPerCm:patternGaugeRows/gaugeHeightCm};
}
function flowSafetyMargin(setup={}){
  const type=setup.projectType;
  if(type==="Amigurumi")return 1.20;
  if(isGarmentProject(type))return 1.15;
  if(["Scarf","Blanket"].includes(type))return 1.10;
  return /cable|bobble|texture/i.test(setup.sizingNotes||setup.patternGauge||"")?1.20:1.15;
}
function gramsPerCm2(setup={}){
  const engine=sharedCalculationEngine();
  const density=engine?.calculateSwatchYarnDensity?.({swatchWidthCm:setup.swatchWidthCm,swatchHeightCm:setup.swatchHeightCm,swatchWeightGrams:setup.swatchWeightGrams});
  return density?.gramsPerCm2||0.12;
}
function estimateYarnFromArea(areaCm2,setup={},safetyMargin=flowSafetyMargin(setup)){
  const patternYarn=cleanNumber(setup.patternYarnGrams),patternArea=cleanNumber(setup.patternAreaCm2);
  if(patternYarn>0&&patternArea>0)return patternYarn*(areaCm2/patternArea)*safetyMargin;
  const engine=sharedCalculationEngine();
  return engine?.calculateAreaYarnEstimate?.({targetAreaCm2:areaCm2,gramsPerCm2:gramsPerCm2(setup),safetyMargin})?.estimatedGrams||areaCm2*gramsPerCm2(setup)*safetyMargin;
}
function applyRepeatRounding(raw,setup={},fallbackMultiple=1){
  const engine=sharedCalculationEngine();
  return engine?.roundToRepeat?.(raw,cleanNumber(setup.stitchRepeatMultiple,fallbackMultiple)||fallbackMultiple,cleanNumber(setup.edgeStitches,0))||roundToNearestMultiple(raw,fallbackMultiple);
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
  const gauge=flowGaugeValues(setup),patternTool=firstNumber(setup.patternToolSizeMm||setup.patternToolSize,0),userTool=firstNumber(setup.userToolSizeMm||setup.userToolSize,0);
  const toolDiff=patternTool&&userTool&&Math.abs(patternTool-userTool)>=.25;
  if(toolDiff&&userTool>patternTool){
    warnings.push("Your tool is larger than the pattern. Your stitches may be bigger.");
  }else if(toolDiff&&userTool<patternTool){
    warnings.push("Your tool is smaller than the pattern. Your stitches may be tighter.");
  }
  const patternRank=yarnWeightRank(setup.patternYarnWeight),userRank=yarnWeightRank(setup.userYarnWeight);
  const yarnDiff=patternRank>=0&&userRank>=0&&patternRank!==userRank;
  if(yarnDiff&&userRank>patternRank){
    warnings.push("Your yarn is thicker than the pattern yarn. The project may become larger or firmer.");
  }else if(yarnDiff&&userRank<patternRank){
    warnings.push("Your yarn is thinner than the pattern yarn. The project may become smaller or softer.");
  }
  if((toolDiff||yarnDiff)&&!gauge.hasUserGauge){
    warnings.push("Your yarn or tool size is different from the pattern. The finished size may change. Please enter your gauge for a better estimate.");
  }
  if(!gauge.hasUserGauge){
    warnings.push("Yarncha needs your gauge to give a more accurate size estimate.");
  }
  return warnings;
}
function calculateFlowProjectPlan(p={},setup=normalizeProjectSetup(p.projectSetup,p)){
  const engine=sharedCalculationEngine();
  if(!engine?.calculateProjectPlan){
    const g=flowGaugeValues(setup);
    const dims=flowProjectDimensions(setup);
    return {updatedAt:new Date().toISOString(),estimateOnly:!g.hasUserGauge,gauge:g,safetyMargin:flowSafetyMargin(setup),summary:`You’re ${setup.craft==="Crochet"?"crocheting":"knitting"} a ${String(setup.projectType||"project").toLowerCase()}.`,castOnOrChain:applyRepeatRounding(dims.width*g.stitchesPerCm,setup),startingLabel:setup.craft==="Crochet"?"Starting chain":"Cast-on",stitchCount:Math.max(1,Math.round(dims.width*g.stitchesPerCm)),rowCount:Math.max(1,Math.round(dims.length*g.rowsPerCm)),widthCm:roundFlow(dims.width),lengthCm:roundFlow(dims.length),sleeveLengthCm:roundFlow(dims.sleeve||0),bodyLengthCm:roundFlow(dims.body||dims.length||0),shapingNotes:"No extra shaping is suggested from these setup numbers.",estimatedYarnGrams:roundFlow(estimateYarnFromArea(dims.width*dims.length,setup)),estimatedYarnUsage:"Add swatch yarn weight for a better yarn estimate",warnings:setupWarnings(setup),details:{}};
  }
  const plan=engine.calculateProjectPlan(p,setup);
  const warnings=[...(plan.warnings||[]),...setupWarnings(setup)];
  const uniqueWarnings=[...new Set(warnings.filter(Boolean))];
  return {...plan,warnings:uniqueWarnings};
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
function repeatEngine(){return window.YarnchaRepeatEngine;}
function stableProjectId(project={},index=0){
  if(project.id)return project.id;
  const base=String(project.name||project.title||project.started||index||"project").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,48)||"project";
  return `p-${base}-${index}`;
}
function normalizeProjectRecord(p={},index=0){
  const now=new Date().toISOString(),id=stableProjectId(p,index),createdAt=p.createdAt || p.startedAt || p.startDate || p.updatedAt || now;
  const sharedSetup=normalizeProjectSetup(p.setup||p.projectSetup||buildSetupFromLegacyProjectFields(p),p);
  const normalized={
    ...p,
    id,
    createdAt,
    schemaVersion:Number(p.schemaVersion)||PROJECT_SCHEMA_VERSION,
    totalRows: Number(p.totalRows) || null,
    chartRows: Number(p.chartRows) || Number(p.totalRows) || null,
    subCounters: (p.subCounters || []).map(normalizeSubCounter),
    repeatRules: repeatEngine()?.migrateRepeatRules([{...p,subCounters:(p.subCounters||[]).map(normalizeSubCounter),repeatRules:p.repeatRules||[]}])?.[0]?.repeatRules || [],
    rowReminders:(p.rowReminders || []).map(normalizeRowReminder),
    rowReminderVoice:normalizeRowReminderVoice(p.rowReminderVoice),
    activeRowReminder:p.activeRowReminder || null,
    markers: (p.markers || []).map((m,index)=>({...m,id:m.id||`marker-${id}-${index}`,label:m.label||m.color})),
    assistantMessages: p.assistantMessages || [],
    projectTools: p.projectTools || {},
    fitCheck:p.fitCheck || {},
    toolHistory: p.toolHistory || [],
    buyList: p.buyList || [],
    pdfReference: p.pdfReference || "",
    attachments: Array.isArray(p.attachments) ? p.attachments : [],
    patternPlan: p.patternPlan || {mode:"modified"},
    chatPreference: p.chatPreference || "ask",
    readerStatus:p.readerStatus||"No files analysed yet.",
    flowMode:p.flowMode!==false,
    activeTab:p.activeTab || "track",
    readingMode:!!p.readingMode,
    chartMode:p.chartMode || "og",
    yarnchaAssistant:p.yarnchaAssistant || {},
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
    setup:sharedSetup,
    projectSetup:sharedSetup,
    updatedAt:p.updatedAt || createdAt,
    chartAnalysis:p.chartAnalysis ? {
      ...p.chartAnalysis,
      rows:p.chartAnalysis.rows || [],
      legend:p.chartAnalysis.legend || "",
      columns:p.chartAnalysis.columns || null,
      gridStatus:p.chartAnalysis.gridStatus || "Grid and cell boundaries require user confirmation."
    } : null,
    chartReader:normalizeChartReaderConfig(p.chartReader,p)
  };
  return {...normalized,projectCalculations:calculateFlowProjectPlan(normalized,normalized.projectSetup)};
}

function hasMeaningfulSavedWorkspaceData(saved={}){
  const nonEmptyArrays=[
    "projects","inventory","purchaseHistory","cart","techniqueKnowledge","projectIdeas",
    "symbolFavorites","symbolLearningLibrary","libraryBookmarks","libraryRecentlyViewed","libraryProjectChecklist","libraryReports"
  ];
  if(nonEmptyArrays.some(key=>Array.isArray(saved[key])&&saved[key].length>0))return true;
  if(Array.isArray(saved.librarySections)&&saved.librarySections.some(section=>Array.isArray(section?.items)&&section.items.length>0))return true;
  if(saved.libraryEntryNotes&&Object.keys(saved.libraryEntryNotes).length>0)return true;
  if(saved.libraryPathProgress&&Object.keys(saved.libraryPathProgress).length>0)return true;
  if(saved.userTechniqueReferences&&Object.keys(saved.userTechniqueReferences).length>0)return true;
  if(saved.userSymbolsOverride&&Object.keys(saved.userSymbolsOverride).length>0)return true;
  return false;
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
    const savedTheme = saved.theme || {};
    merged.theme = {
      name: savedTheme.name || starterData.theme.name,
      style: savedTheme.style || starterData.theme.style,
      mode: savedTheme.mode || starterData.theme.mode
    };
    merged.theme.name = normalizeThemeName(merged.theme.name);
    merged.theme.style = normalizeDesignStyle(merged.theme.style);
    merged.theme.mode = ["light","dark","system"].includes(merged.theme.mode) ? merged.theme.mode : "system";
    const isExistingSavedWorkspace = hasMeaningfulSavedWorkspaceData(saved);
    merged.onboardingComplete = saved.onboardingComplete === true || isExistingSavedWorkspace;
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
    merged.libraryBookmarks = Array.isArray(saved.libraryBookmarks)?saved.libraryBookmarks:[];
    merged.libraryEntryNotes = saved.libraryEntryNotes && typeof saved.libraryEntryNotes==="object" ? saved.libraryEntryNotes : {};
    merged.librarySuggestedEdits = Array.isArray(saved.librarySuggestedEdits)?saved.librarySuggestedEdits:[];
    merged.libraryRecentlyViewed = Array.isArray(saved.libraryRecentlyViewed)?saved.libraryRecentlyViewed:[];
    merged.libraryProjectChecklist = Array.isArray(saved.libraryProjectChecklist)?saved.libraryProjectChecklist:[];
    merged.libraryPathProgress = saved.libraryPathProgress && typeof saved.libraryPathProgress==="object" ? saved.libraryPathProgress : {};
    merged.libraryReports = Array.isArray(saved.libraryReports)?saved.libraryReports:[];
    merged.schemaVersion = Number(saved.schemaVersion)||PROJECT_SCHEMA_VERSION;
    merged.projects = (saved.projects || starterData.projects).map(normalizeProjectRecord);
    if(!merged.projects.some(p=>String(p.id)===String(merged.activeProjectId)))merged.activeProjectId=merged.projects[0]?.id||null;
    return merged;
  }
  catch(error) {
    const details=navigationErrorDetails(error);
    console.error(`[Yarncha state] Load failed: ${details.message}\n${details.stack}`);
    const fallback=structuredClone(starterData);
    fallback.projects=fallback.projects.map((project,index)=>({
      ...project,
      id:stableProjectId(project,index),
      activeTab:"track",
      subCounters:Array.isArray(project.subCounters)?project.subCounters:[],
      repeatRules:Array.isArray(project.repeatRules)?project.repeatRules:[],
      rowReminders:Array.isArray(project.rowReminders)?project.rowReminders:[],
      markers:Array.isArray(project.markers)?project.markers:[],
      assistantMessages:Array.isArray(project.assistantMessages)?project.assistantMessages:[],
      attachments:Array.isArray(project.attachments)?project.attachments:[],
      annotations:Array.isArray(project.annotations)?project.annotations:[],
      annotationHistory:Array.isArray(project.annotationHistory)?project.annotationHistory:[],
      annotationRedo:Array.isArray(project.annotationRedo)?project.annotationRedo:[],
      buyList:Array.isArray(project.buyList)?project.buyList:[],
      projectTools:project.projectTools||{},
      yarnchaAssistant:project.yarnchaAssistant||{},
      patternPlan:project.patternPlan||{mode:"modified"},
      chartReader:project.chartReader||{}
    }));
    return fallback;
  }
}
let saveDebounceTimer=null;
let saveDirty=false;
let saveInFlight=null;
let lastSaveFailed=false;
function saveStatusText(){
  if(lastSaveFailed)return "Save failed";
  if(saveInFlight)return "Saving...";
  return saveDirty?"• Unsaved changes":"✓ Saved";
}
function updateSaveIndicators(text=saveStatusText(),tone=""){
  document.querySelectorAll("[data-save-indicator]").forEach(el=>{
    el.textContent=text;
    el.dataset.tone=tone || (text.includes("Unsaved")?"unsaved":text.includes("failed")?"error":text.includes("Saving")?"saving":"saved");
  });
}
function markUnsavedChanges(){
  saveDirty=true;
  lastSaveFailed=false;
  updateSaveStatus("• Unsaved changes","unsaved");
}
function saveState() {
  if(!hasLoadedSavedState)return;
  const now=new Date().toISOString();
  state.schemaVersion=PROJECT_SCHEMA_VERSION;
  state.lastSavedAt=now;
  lastSaveFailed=false;
  updateSaveStatus("Saving...","saving");
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }catch(error){
    lastSaveFailed=true;
    updateSaveStatus("Save failed","error");
    toast("Yarncha could not save progress in this browser.");
    return Promise.reject(error);
  }
  saveInFlight=putProjectStateSnapshot()
    .then(()=>{
      saveDirty=false;
      updateSaveStatus(`✓ Saved on this device · ${formatSavedTime(now)}`,"saved");
    })
    .catch(error=>{
      lastSaveFailed=true;
      updateSaveStatus("Saved locally · Expanded storage unavailable","error");
      return false;
    })
    .finally(()=>{saveInFlight=null;updateSaveIndicators();});
  renderSidebar(); applyTheme(); queueMicrotask(applyLanguage);
  window.dispatchEvent(new CustomEvent("yarncha:local-save", { detail:{ savedAt:now } }));
  return saveInFlight;
}
function saveStateSoon(delay=350){
  if(!hasLoadedSavedState)return;
  clearTimeout(saveDebounceTimer);
  markUnsavedChanges();
  saveDebounceTimer=setTimeout(saveState,delay);
}
function updateSaveStatus(text,tone=""){const el=document.getElementById("save-status");if(el){el.textContent=text;el.dataset.tone=tone;}updateSaveIndicators(text,tone);}
function formatSavedTime(value){try{return new Date(value).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});}catch{return "now";}}
function collapsibleSectionHtml({eyebrow="",title="",description="",defaultOpen=false,children="",rightMeta="",className="",summaryClass=""}={}){
  return `<details class="collapsible-section ${escapeHtml(className)}" ${defaultOpen?"open":""}>
    <summary class="collapsible-summary ${escapeHtml(summaryClass)}">
      <span class="collapsible-summary-copy">${eyebrow?`<span class="eyebrow">${escapeHtml(eyebrow)}</span>`:""}<strong>${escapeHtml(title)}</strong>${description?`<span>${escapeHtml(description)}</span>`:""}</span>
      <span class="collapsible-summary-side">${rightMeta?`<em>${escapeHtml(rightMeta)}</em>`:""}<i class="collapsible-chevron" aria-hidden="true"></i></span>
    </summary>
    <div class="collapsible-content">${children}</div>
  </details>`;
}
async function manualSave(context="Project"){
  const hadPending=saveDirty||!!saveDebounceTimer||!!saveInFlight||lastSaveFailed;
  try{
    if(saveDebounceTimer){clearTimeout(saveDebounceTimer);saveDebounceTimer=null;}
    if(saveInFlight)await saveInFlight;
    if(!hadPending){
      updateSaveStatus(`✓ Saved on this device · ${formatSavedTime(state.lastSavedAt||new Date())}`,"saved");
      toast("Everything is already saved.");
      return false;
    }
    await saveState();
    const cloud=window.YarnchaCloud?.status;
    if(cloud?.user&&window.YarnchaCloud?.syncNow){
      updateSaveStatus("Saving... syncing cloud","saving");
      await window.YarnchaCloud.syncNow("manual-save");
      toast("✓ Project saved · ✓ Synced to cloud");
    }else{
      toast(`✓ ${context} saved`);
    }
    updateSaveIndicators("✓ Saved","saved");
    return true;
  }catch(error){
    updateSaveStatus("Save failed","error");
    toast("Save failed. Try Save again.");
    return false;
  }
}
function getProject(id = currentProjectId) { return state.projects.find(p => String(p.id) === String(id)) || state.projects[0]; }
function escapeHtml(value = "") { return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c])); }
function optionList(values,current,labels={}){return values.map(v=>`<option value="${escapeHtml(v)}" ${current===v?"selected":""}>${escapeHtml(labels[v]||v)}</option>`).join("");}
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
  const appLanguage=document.getElementById("app-language");
  if(appLanguage)appLanguage.value=state.language;
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
function navigationErrorDetails(error){
  return {message:error?.message||String(error),stack:error?.stack||"No stack available"};
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

async function ensureSafeToLeave(){
  if(saveDebounceTimer){clearTimeout(saveDebounceTimer);saveDebounceTimer=null;await saveState();}
  if(saveInFlight)await saveInFlight;
  if(lastSaveFailed){
    if(!confirm("Yarncha could not finish saving. Try saving again before leaving this page?"))return true;
    await manualSave("Workspace");
    return !lastSaveFailed;
  }
  return true;
}
async function showView(name) {
  if(!(await ensureSafeToLeave()))return;
  const requested = name === "yarnStash" ? "market" : String(name || "today");
  const before = activePage;
  const route = routeForPage(requested);
  try{
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
  }catch(error){
    const details=navigationErrorDetails(error);
    console.error(`[Yarncha navigation] Render failed: ${details.message}`, {requested,before,component:route.component,stack:details.stack});
    toast(`${route.label || "This section"} could not open. Please try again.`);
  }
}


function handleAppShellClick(e){
  const manualSaveButton=e.target.closest("[data-manual-save]");
  if(manualSaveButton){e.preventDefault();manualSave(manualSaveButton.dataset.manualSave||"Project");return;}
  const nav = e.target.closest("[data-view]"); if (nav) { e.preventDefault(); showView(nav.dataset.view).catch(error=>console.error("[Yarncha navigation] Click failed", {target:"data-view",view:nav.dataset.view,error})); return; }
  const go = e.target.closest("[data-go]"); if (go) { e.preventDefault(); showView(go.dataset.go).catch(error=>console.error("[Yarncha navigation] Click failed", {target:"data-go",view:go.dataset.go,error})); return; }
  const project = e.target.closest("[data-project-id],[data-project]");
  if(project){
    const innerAction=e.target.closest("[data-project-action],a,button,input,select,textarea");
    if(innerAction&&innerAction!==project&&project.contains(innerAction))return;
    e.preventDefault();
    projectNavigationDebug("[Project tap]",{target:e.target,card:project,projectId:project.dataset.projectId||project.dataset.project});
    openProject(project.dataset.projectId||project.dataset.project);
    return;
  }
  const add = e.target.closest("[data-add-project]"); if (add) { openProjectModal(); return; }
  const tool = e.target.closest("[data-tool]"); if (tool&&!tool.closest(".annotation-toolbar")) { e.preventDefault(); showView("tools").then(()=>renderTool(tool.dataset.tool)).catch(error=>console.error("[Yarncha navigation] Tool click failed", {tool:tool.dataset.tool,error})); return; }
  const tab = e.target.closest("[data-tool-tab]"); if (tab) { renderTool(tab.dataset.toolTab); return; }
  const space=e.target.closest("[data-library-space]"); if(space){currentLibrarySection=space.dataset.librarySpace;renderLibrary();}
}
if(window.__yarnchaShellClickHandler)document.removeEventListener("click",window.__yarnchaShellClickHandler);
window.__yarnchaShellClickHandler=handleAppShellClick;
document.addEventListener("click",handleAppShellClick);
function bindDirectNavigation(control,action,diagnostic){
  if(!control||control.dataset.directNavigationBound)return;
  control.dataset.directNavigationBound="true";
  control.addEventListener("click",event=>{
    event.preventDefault();
    event.stopPropagation();
    try{
      Promise.resolve(action()).catch(error=>console.error("[Yarncha navigation] Direct click failed",{diagnostic,...navigationErrorDetails(error)}));
    }catch(error){
      console.error("[Yarncha navigation] Direct click failed",{diagnostic,...navigationErrorDetails(error)});
    }
  });
}
function bindPrimaryShellNavigation(){
  bindDirectNavigation(document.querySelector('.nav-item[data-view="tools"]'),()=>showView("tools"),"Tools navigation");
}
function handleProjectHashRoute(){
  const match=location.hash.match(/^#project-(.+)$/);
  if(match)openProject(decodeURIComponent(match[1]));
}
if(window.__yarnchaHashProjectHandler)window.removeEventListener("hashchange",window.__yarnchaHashProjectHandler);
window.__yarnchaHashProjectHandler=handleProjectHashRoute;
window.addEventListener("hashchange",window.__yarnchaHashProjectHandler);
queueMicrotask(handleProjectHashRoute);

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
  bindDirectNavigation(host.querySelector('[data-project]'),()=>openProject(p.id),'Today "Continue making"');
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
  const grid=document.getElementById("project-grid");
  grid.innerHTML = state.projects.map(p => `<button class="project-card card" type="button" data-project-id="${p.id}" data-project="${p.id}" aria-label="Open ${escapeHtml(p.name)}">
    ${visual(p, true)}<div class="project-card-info"><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.type)} · ${rowSummary(p)}</p>
    <div class="progress-track"><div class="progress-fill" style="width:${progress(p) ?? Math.min(95, p.row)}%"></div></div></div>
  </button>`).join("") + `<button class="add-project-card card" type="button" data-add-project><div><span class="add-circle">+</span><strong>Start a new project</strong><p>Bring a new idea to life</p></div></button>`;
  hydrateProjectCovers();
}

function projectNavigationDebug(...args){
  if(["localhost","127.0.0.1",""].includes(location.hostname))console.debug(...args);
}
function openProject(id) {
  const project = state.projects.find(p=>String(p.id)===String(id));
  projectNavigationDebug("[Project open] found project", project);
  if(!project){
    console.warn("[Yarncha project navigation] Project not found", { projectId:id });
    toast("Project not found. Please choose another project.");
    showView("projects");
    return;
  }
  currentProjectId = project.id;
  state.activeProjectId = project.id;
  saveState();
  showView("project-detail");
  projectNavigationDebug("[Opened project view]", {projectId:project.id,activeView:[...document.querySelectorAll(".view")].find(view=>!view.hidden)?.id});
}
const showProject=openProject;

function renderProjectDetail() {
  const p = getProject();
  if (!p) return showView("projects");
  const attachments = Array.isArray(p.attachments) ? p.attachments : [];
  const [firstAttachment = null] = attachments;
  p.attachments = attachments;
  p.activeTab ||= "track";
  const tab = p.readingMode ? "chart" : p.activeTab;
  document.getElementById("project-detail").innerHTML = `
    <div class="project-mobile-shell ${p.readingMode?"is-reading":""}">
      <div class="detail-head project-header">
        <button class="project-detail-cover cover-upload-button" id="project-cover-picker" aria-label="Upload or replace project cover photo">${visual(p,true)}</button>
        <div class="project-title-block"><p class="eyebrow">${escapeHtml(p.type).toUpperCase()}</p><div class="editable-title"><h1>${escapeHtml(p.name)}</h1></div><p class="project-type">${escapeHtml(p.status||"In progress")} · Row ${p.row}${p.totalRows?` of ${p.totalRows}`:""} · ${progress(p) === null ? "Open-ended" : `${progress(p)}% complete`}</p></div>
        <div class="detail-actions project-actions"><button class="project-action-button ghost" id="edit-project-name">Edit Project</button><button class="project-action-button secondary manual-save-button" data-manual-save="Project" type="button">Save</button><button class="project-action-button secondary" id="speak-row">Read row</button><button class="project-action-button primary voice-button voice-button--header voice-icon-button" id="voice-project" aria-label="Voice controls" title="Voice controls">${uiIcon("voice","voice-button-icon")}</button></div>
      </div>
      <div class="project-tabs" role="tablist" aria-label="Project sections">
        ${["track","chart","project","assistant"].map(id=>`<button type="button" role="tab" aria-selected="${tab===id}" class="${tab===id?"active":""}" data-project-tab="${id}">${id[0].toUpperCase()+id.slice(1)}</button>`).join("")}
      </div>
      ${activeRowReminderHtml(p)}
      <section class="project-tab-panel">${tab==="track"?projectTrackHtml(p):tab==="chart"?projectChartHtml(p):tab==="project"?projectProjectHtml(p):projectAssistantTabHtml(p)}</section>
    </div>`;
  bindProjectDetail();
  hydrateProjectCovers();
  const chartAssetId=p.activeChartAssetId&&attachments.some(a=>a.id===p.activeChartAssetId)?p.activeChartAssetId:firstAttachment?.id;
  if(chartAssetId)setTimeout(()=>showProjectAsset(chartAssetId),0);
  queueMicrotask(applyLanguage);
  updateSaveIndicators();
  window.dispatchEvent(new CustomEvent("yarncha:project-rendered", { detail:{ projectId:p.id, tab } }));
}

function markerChipHtml(marker){
  const id=marker.id||`${marker.row}-${marker.color}`,color=markerColor(marker.color),label=marker.label||marker.color||"Marker";
  return `<span class="marker-chip" style="--marker-color:${escapeHtml(color)}"><button type="button" class="marker-chip-main" data-edit-marker="${escapeHtml(id)}"><span class="marker-dot" aria-hidden="true"></span><span>Row ${Number(marker.row)||0} · ${escapeHtml(label)}</span></button><button type="button" class="marker-chip-delete" aria-label="Delete marker" data-delete-marker="${escapeHtml(id)}">${uiIcon("close")}</button></span>`;
}
function markerColorPresets(){
  return [
    {name:"Red",value:"#C75A55"},
    {name:"Blue",value:"#577FA8"},
    {name:"Yellow",value:"#D3A93F"},
    {name:"Green",value:"#62856A"},
    {name:"Pink",value:"#C77B91"},
    {name:"Purple",value:"#84658E"},
    {name:"Orange",value:"#D27B45"},
    {name:"Brown / Neutral",value:"#8A6F5A"}
  ];
}
function normalizeMarkerHex(value){
  const clean=String(value||"").trim().replace(/^#/,"");
  return /^[0-9a-f]{6}$/i.test(clean)?`#${clean.toUpperCase()}`:"";
}
function markerColorLabel(color){
  const normalized=normalizeMarkerHex(markerColor(color));
  return markerColorPresets().find(item=>item.value===normalized)?.name || normalized || "Marker";
}
function loadMarkerColorHistory(){
  try{
    const raw=JSON.parse(localStorage.getItem("yarncha.markerColorHistory")||"{}");
    return {
      recent:Array.isArray(raw.recent)?raw.recent.map(normalizeMarkerHex).filter(Boolean).slice(0,8):[],
      frequency:Object.fromEntries(Object.entries(raw.frequency||{}).map(([key,value])=>[normalizeMarkerHex(key),Math.max(0,Number(value)||0)]).filter(([key,value])=>key&&value))
    };
  }catch{return {recent:[],frequency:{}};}
}
function saveMarkerColorHistory(color){
  const hex=normalizeMarkerHex(color);
  if(!hex)return;
  const history=loadMarkerColorHistory();
  history.recent=[hex,...history.recent.filter(item=>item!==hex)].slice(0,8);
  history.frequency[hex]=(history.frequency[hex]||0)+1;
  localStorage.setItem("yarncha.markerColorHistory",JSON.stringify(history));
}
function markerHistoryRowHtml(title,colours=[]){
  if(!colours.length)return "";
  return `<div class="marker-color-history"><strong>${escapeHtml(title)}</strong><div class="marker-color-history-row">${colours.map(color=>`<button type="button" class="marker-history-swatch" data-marker-history-color="${escapeHtml(color)}" style="--marker-color:${escapeHtml(color)}" aria-label="Use marker colour ${escapeHtml(color)}"><span></span><small>${escapeHtml(markerColorLabel(color))}</small></button>`).join("")}</div></div>`;
}
function projectTrackHtml(p){
  const markers=(p.markers||[]).slice().sort((a,b)=>(Number(a.row)||0)-(Number(b.row)||0));
  return `<div class="track-layout">
    <div class="counter-card card hero-counter">
      <div class="unified-counter-heading"><p class="eyebrow">COUNTER</p><h3>Main Row</h3></div>
      <div class="counter-label">Current row</div>
      <button class="main-count" id="edit-main-row" title="Set exact row">${p.row}</button>
      <div class="counter-controls counter-controls-large main-row-controls"><button data-counter="-1" aria-label="Previous row">−</button><button class="next button-primary" data-counter="1">Next row</button><button class="button-icon voice-button voice-button--counter voice-icon-button inline-voice-button" data-voice-project aria-label="Voice controls" title="Voice controls">${uiIcon("voice","voice-button-icon")}</button></div>
      <div class="manual-row-line compact-row-jump"><label>Jump to row <input id="manual-row-input" type="number" min="0" value="${p.row}"></label><button class="secondary-button button-secondary" id="manual-row-save">Go</button></div>
      <div class="progress-summary"><span>${p.totalRows?`${progress(p)}% complete`:"Open-ended project"}</span><div class="progress-track"><div class="progress-fill" style="width:${progress(p) ?? 0}%"></div></div></div>
      <div class="counter-menu button-group"><button class="button-secondary" id="edit-project-rows">Planned rows</button><button class="button-ghost" id="reset-main">Reset rows</button><button class="button-ghost" id="edit-project-from-counter">Edit Project</button></div>
      ${unifiedRepeatCountersHtml(p)}
    </div>
    <div class="track-side">
      ${rowRemindersPanelHtml(p)}
      <div class="notes-card card"><div class="card-header"><div><h3>Project notes</h3><span class="manual-save-status" data-save-indicator>✓ Saved</span></div><div class="button-row compact-save-actions"><button class="mini-button button-secondary manual-save-button" data-manual-save="Project notes" type="button">Save</button><button class="mini-button button-secondary" id="add-marker">+ Marker</button></div></div>
        <textarea id="project-notes" placeholder="Modifications, reminders, yarn details...">${escapeHtml(p.notes)}</textarea>
        <div class="markers">${markers.map(m => markerChipHtml(m)).join("")}</div>
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
        <span>Recommended for accurate row-by-row tracking. Yarncha Assistant lives in the Assistant section.</span>
      </div><button class="secondary-button manual-save-button chart-save-button" data-manual-save="Chart" type="button">Save</button></div>
      <input type="file" id="chart-upload" accept=".pdf,image/*" multiple hidden>
    </div>
    <div class="reading-counter row-counter-card card workspace-card">
      <div class="unified-counter-heading"><p class="eyebrow">COUNTER</p><h3>Main Row</h3></div>
      <div class="row-stepper">
        <button data-counter="-1" aria-label="Previous row">−</button>
        <label class="field row-current-field"><span class="row-counter-label">Row</span><input class="row-counter-input" id="manual-row-input" type="number" min="0" value="${p.row}"></label>
        <button data-counter="1" aria-label="Next row">+</button>
        <button class="button-icon voice-button voice-button--counter voice-icon-button inline-voice-button" data-voice-project aria-label="Voice controls" title="Voice controls">${uiIcon("voice","voice-button-icon")}</button>
      </div>
      <div class="row-counter-actions button-group">
        <button class="mini-button button-secondary" id="edit-project-rows">Planned rows</button>
        <button class="mini-button button-ghost" id="reset-main">Reset</button>
      </div>
      ${unifiedRepeatCountersHtml(p,{chart:true})}
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
    ${hasChart&&activeAnnotationTool==="touch"?`<p class="annotation-mode-hint">Tap a chart row to read or correct it.</p>`:""}
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
    ${flowProjectSetupSummaryHtml(p)}
    <section class="flow-reader-panel flow-setup-results-panel">
      ${plan.warnings.length?`<div class="flow-warning-card"><strong>Before you begin</strong>${plan.warnings.map(w=>`<p>${escapeHtml(w)}</p>`).join("")}</div>`:`<div class="flow-ready-card ready"><p>✓ Your hook or needle and yarn look close enough to the pattern to begin.</p></div>`}
      <div class="flow-ready-card ${plan.estimateOnly?"almost":"ready"}"><p>${plan.estimateOnly?"Estimate only":"Ready"} · ${escapeHtml(plan.summary||"Project setup summary is ready.")}</p></div>
      ${resultSummaryHtml("Project Setup Summary",flowCalculationItems(plan),"flow-calculation-summary")}
      <div class="flow-setup-save-row"><button class="secondary-button manual-save-button" data-manual-save="Flow Mode" type="button">Save now</button><span id="flow-setup-save-status" class="setup-save-status saved" data-save-indicator>Saved · Last saved on this device ${escapeHtml(formatSavedTime(lastSaved))}</span></div>
      <button class="primary-button flow-start-button" id="start-flow-mode" type="button">Start Flow Mode</button>
    </section>
    <section class="flow-reader-panel flow-reading-mode-panel"><h4>Reading Progress</h4>
      <div class="flow-current-row-card"><label for="flow-current-row">I'm currently on</label><div class="flow-row-line"><span>Row</span><input id="flow-current-row" type="number" min="0" max="${p.chartRows||reader.grid.rows||999}" value="${p.row}"></div><p>${escapeHtml(rowInstruction)}</p><small>${escapeHtml(flowCurrentStitchStep(p,setup))}</small></div>
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
    {label:"Finished size",value:plan.widthCm&&plan.lengthCm?`${plan.widthCm} × ${plan.lengthCm} cm`:"Set size first"},
    {label:plan.startingLabel||"Start",value:String(plan.castOnOrChain||"Set gauge first")},
    {label:"Recommended stitch count",value:String(plan.stitchCount||"Set gauge first"),description:"Stitch count from your saved gauge."},
    {label:"Recommended row count",value:String(plan.rowCount||"Set gauge first"),description:"Row count from your saved gauge."},
    {label:"Estimated finished width",value:plan.widthCm?`${plan.widthCm} cm`:"Set size first"},
    {label:"Estimated finished length",value:plan.lengthCm?`${plan.lengthCm} cm`:"Set size first"},
    {label:"Sleeve length",value:plan.sleeveLengthCm?`${plan.sleeveLengthCm} cm`:"If needed"},
    {label:"Body length",value:plan.bodyLengthCm?`${plan.bodyLengthCm} cm`:"If needed"},
    {label:"Shaping",value:plan.shapingNotes||"Pattern decides"},
    {label:"Yarn estimate",value:plan.estimatedYarnUsage||"Add yarn details"},
    ...(plan.estimateOnly?[{label:"Estimate only",value:"Add your gauge when you can for a more accurate size estimate."}]:[])
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
    return `${flowSelect("flow-desired-size","Desired garment size",sizeOptions,setup.desiredSize,options)}${flowField("flow-custom-size","Custom size notes",setup.customSize)}${flowSelect("flow-ease-preference","Fit preference",["Fitted","Regular","Relaxed","Oversized"],d.easePreference,options)}${flowSelect("flow-garment-construction","Construction",["Raglan","Drop shoulder","Set-in sleeve","Circular yoke","Panels","Pattern decides"],d.garmentConstruction,options)}${flowField("flow-body-chest","Chest / bust cm",setup.bodyMeasurements.chest)}${flowField("flow-body-waist","Waist cm",setup.bodyMeasurements.waist)}${flowField("flow-body-hip","Hip cm",setup.bodyMeasurements.hip)}${flowField("flow-body-sleeve","Sleeve length cm",setup.bodyMeasurements.sleeve)}${flowField("flow-body-body","Body length cm",setup.bodyMeasurements.body)}<details class="flow-inline-advanced"><summary>Sleeve and shaping details</summary>${flowField("flow-upper-arm","Upper arm circumference cm",d.upperArmCircumference)}${flowField("flow-wrist","Wrist circumference cm",d.wristCircumference)}${flowField("flow-armhole-depth","Armhole depth cm",d.armholeDepth)}${flowField("flow-button-band","Button band stitches",d.buttonBandStitches)}${type==="Dress"?flowField("flow-skirt-length","Skirt length cm",d.skirtLength):""}</details>`;
  }
  if(type==="Scarf")return `${flowSelect("flow-recipient","Who are you making this for?",recipient,d.recipient,options)}${d.recipient==="Adult"?flowSelect("flow-adult-height","Approximate height",["Under 150 cm","150–160 cm","160–170 cm","170–180 cm","180–190 cm","190+ cm"],d.adultHeight,options):""}${flowSelect("flow-scarf-style","How do you want the scarf to fit?",["Neck warmer","One wrap","Two wraps","Long winter scarf","Oversized scarf","Fashion scarf","Custom length"],d.scarfStyle,options)}${d.scarfStyle==="Custom length"?flowField("flow-item-length","Custom length cm",d.length):""}${flowField("flow-item-width","Scarf width cm",d.width)}`;
  if(type==="Socks")return `${flowSelect("flow-sock-type","Sock type",["No-show","Ankle","Quarter Crew","Crew","Mid-Calf","Knee High","Over-the-Knee"],d.sockType,options,false,"This changes the pattern length and shaping.")}${flowSelect("flow-recipient","Who are you making these for?",recipient,d.recipient,options)}${flowSelect("flow-sock-sizing-mode","How would you like to size the socks?",["Shoe Size","Foot Measurements"],d.sockSizingMode,options)}${d.sockSizingMode==="Shoe Size"?`${flowSelect("flow-shoe-region","Region",["AU","US","UK","EU","JP"],d.shoeRegion,options)}${flowField("flow-shoe-size","Shoe size",d.shoeSize)}`:""}${flowField("flow-foot-length","Foot length cm",d.footLength)}${flowField("flow-foot-circumference","Foot circumference cm",d.footCircumference)}${flowField("flow-heel-to-ankle","Heel to ankle cm",d.heelToAnkle)}${flowField("flow-ankle-circumference","Ankle circumference cm",d.ankleCircumference)}${["Mid-Calf","Knee High","Over-the-Knee"].includes(d.sockType)?flowField("flow-calf-circumference","Calf circumference cm",d.calfCircumference):""}${flowSelect("flow-fit-preference","Fit preference",["Snug","Regular","Relaxed"],d.fitPreference,options)}${flowSelect("flow-construction-method","Construction method",["Toe-up","Cuff-down"],d.constructionMethod,options)}${flowSelect("flow-heel-style","Heel style",["Heel Flap","Short Row","Afterthought","Pattern decides"],d.heelStyle,options)}<details class="flow-inline-advanced"><summary>Heel, toe and leg details</summary>${flowField("flow-toe-length","Toe length cm",d.toeLength)}${flowField("flow-leg-height","Desired leg height cm",d.desiredLegHeight)}${flowField("flow-cuff-height","Cuff height cm",d.cuffHeight)}${flowField("flow-gusset-stitches","Picked up gusset stitches",d.pickedUpGussetStitches)}</details>`;
  if(type==="Hat / Beanie")return `${flowSelect("flow-recipient","Recipient",recipient,d.recipient,options)}${flowField("flow-head-circumference","Head circumference cm",d.headCircumference)}${flowSelect("flow-hat-style","Hat style",["Fitted beanie","Slouchy beanie","Folded brim","Bucket hat","Beret","Bonnet / baby hat","Custom"],d.hatStyle,options)}${flowField("flow-hat-depth","Desired hat depth cm",d.hatDepth)}${flowSelect("flow-fit-preference","Fit preference",["Snug","Regular","Relaxed"],d.fitPreference,options)}${flowSelect("flow-brim-style","Brim style",["No brim","Ribbed brim","Folded brim","Rolled brim"],d.brimStyle,options)}${flowSelect("flow-crown-style","Crown style",["Rounded crown","Pointed crown","Flat top","Pattern decides"],d.crownStyle,options)}<details class="flow-inline-advanced"><summary>Crown details</summary>${flowField("flow-brim-depth","Brim depth cm",d.brimDepth)}${flowField("flow-decrease-sections","Decrease sections",d.decreaseSections)}${flowField("flow-final-top-stitches","Final top stitches per section",d.finalTopStitchesPerSection)}</details>`;
  if(type==="Bag")return `${flowSelect("flow-bag-type","Bag type",["Tote","Market bag","Crossbody","Shoulder bag","Drawstring pouch","Mini bag","Project bag","Custom"],d.bagType,options)}${flowField("flow-item-width","Desired width cm",d.width)}${flowField("flow-item-height","Desired height cm",d.height)}${flowField("flow-strap-length","Strap length cm",d.strapLength)}${flowField("flow-strap-width","Strap width cm",d.strapWidth)}<details class="flow-inline-advanced"><summary>Advanced bag options</summary>${flowField("flow-item-depth","Bag depth / gusset cm",d.depth)}${flowField("flow-handle-drop","Handle drop cm",d.handleDrop)}${flowSelect("flow-closure","Closure",["None","Button","Zip","Drawstring","Flap"],d.closure,options)}${flowSelect("flow-lining","Lining",["No lining","Fabric lining"],d.lining,options)}${flowSelect("flow-structure","Fit / structure",["Soft","Medium","Firm"],d.structure,options)}</details>`;
  if(type==="Blanket"){
    const preset=blanketPresetSize(d.blanketType);
    return `${flowSelect("flow-blanket-type","Blanket type",["Lovey","Baby Blanket","Crib Blanket","Stroller Blanket","Lap Blanket","Throw Blanket","Twin","Full / Double","Queen","King","Custom"],d.blanketType,options)}<div class="flow-ready-card ready"><p>Recommended size: ${preset[0]} × ${preset[1]} cm. Use this size or edit below.</p></div>${flowField("flow-item-width","Finished width cm",d.width||preset[0])}${flowField("flow-item-length","Finished length cm",d.length||preset[1])}${flowSelect("flow-blanket-shape","Blanket shape",["Rectangle","Square","Circle","Hexagon","Custom"],d.blanketShape,options)}${flowSelect("flow-warmth","Warmth",["Lightweight","Medium","Thick & Cozy"],d.warmth,options)}${flowField("flow-border-width","Border width cm",d.borderWidth)}${flowSelect("flow-fringe","Fringe / tassels",["None","Short","Long"],d.fringe,options)}<details class="flow-inline-advanced"><summary>Squares or C2C details</summary>${flowField("flow-square-size","Granny square size cm",d.squareSize)}${flowField("flow-block-width","C2C block width cm",d.blockWidth)}${flowField("flow-block-height","C2C block height cm",d.blockHeight)}</details>`;
  }
  if(type==="Amigurumi")return `${flowSelect("flow-amigurumi-type","What are you making?",["Animal","Doll","Character","Food","Plant","Keychain","Decoration","Plush","Custom"],d.amigurumiType,options)}${flowField("flow-finished-height","Desired finished height cm",d.finishedHeight)}${flowField("flow-finished-width","Desired finished width cm",d.finishedWidth)}${flowSelect("flow-shape","Overall shape",["Round","Oval","Long","Chubby","Standing","Sitting","Custom"],d.shape,options)}${flowSelect("flow-stuffing-firmness","Stuffing firmness",["Soft","Medium","Firm"],d.stuffingFirmness,options)}${flowSelect("flow-safety-recipient","Who is it for?",["Baby","Child","Adult","Display only"],d.safetyRecipient,options)}${d.safetyRecipient==="Baby"?`<div class="flow-warning-card"><p>For babies, embroidered eyes are safer than plastic safety eyes.</p></div>`:""}<details class="flow-inline-advanced" open><summary>Scale existing pattern</summary>${flowField("flow-original-height","Original pattern height cm",d.originalHeight)}${flowField("flow-original-width","Original pattern width cm",d.originalWidth)}${flowField("flow-target-height","I want cm",d.targetHeight)}${flowField("flow-original-yarn","Original yarn grams",d.originalYarnGrams)}${flowField("flow-original-stuffing","Original stuffing grams",d.originalStuffingGrams)}${flowField("flow-original-eye","Original eye size mm",d.originalEyeSizeMm)}</details>`;
  if(type==="Shawl")return `${flowSelect("flow-shawl-shape","Shawl shape",["Triangle","Crescent","Half Circle","Rectangle","Wrap","Asymmetrical","Custom"],d.shawlShape,options)}${flowSelect("flow-shawl-fit","Wear style",["Neck scarf","Shoulder shawl","Large wrap","Oversized wrap"],d.wearStyle,options)}${flowField("flow-wingspan","Desired wingspan cm",d.wingspan)}${flowField("flow-item-height","Desired depth cm",d.height)}${flowField("flow-item-width","Finished width cm",d.width)}${flowField("flow-item-length","Finished length cm",d.length)}${flowSelect("flow-recipient","Who is it for?",["Child","Teen","Adult","Custom"],d.recipient,options)}`;
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
    easePreference:pick("flow-ease-preference","easePreference"),
    constructionMethod:pick("flow-construction-method","constructionMethod"),
    garmentConstruction:pick("flow-garment-construction","garmentConstruction"),
    heelStyle:pick("flow-heel-style","heelStyle"),
    toeLength:pick("flow-toe-length","toeLength"),
    desiredLegHeight:pick("flow-leg-height","desiredLegHeight"),
    cuffHeight:pick("flow-cuff-height","cuffHeight"),
    pickedUpGussetStitches:pick("flow-gusset-stitches","pickedUpGussetStitches"),
    headCircumference:pick("flow-head-circumference","headCircumference"),
    hatStyle:pick("flow-hat-style","hatStyle"),
    hatDepth:pick("flow-hat-depth","hatDepth"),
    brimDepth:pick("flow-brim-depth","brimDepth"),
    brimStyle:pick("flow-brim-style","brimStyle"),
    crownStyle:pick("flow-crown-style","crownStyle"),
    decreaseSections:pick("flow-decrease-sections","decreaseSections"),
    finalTopStitchesPerSection:pick("flow-final-top-stitches","finalTopStitchesPerSection"),
    bagType:pick("flow-bag-type","bagType"),
    width:pick("flow-item-width","width"),
    height:pick("flow-item-height","height"),
    length:pick("flow-item-length","length"),
    strapLength:pick("flow-strap-length","strapLength"),
    strapWidth:pick("flow-strap-width","strapWidth"),
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
    squareSize:pick("flow-square-size","squareSize"),
    blockWidth:pick("flow-block-width","blockWidth"),
    blockHeight:pick("flow-block-height","blockHeight"),
    amigurumiType:pick("flow-amigurumi-type","amigurumiType"),
    finishedHeight:pick("flow-finished-height","finishedHeight"),
    finishedWidth:pick("flow-finished-width","finishedWidth"),
    shape:pick("flow-shape","shape"),
    stuffingFirmness:pick("flow-stuffing-firmness","stuffingFirmness"),
    safetyRecipient:pick("flow-safety-recipient","safetyRecipient"),
    originalHeight:pick("flow-original-height","originalHeight"),
    originalWidth:pick("flow-original-width","originalWidth"),
    targetHeight:pick("flow-target-height","targetHeight"),
    originalYarnGrams:pick("flow-original-yarn","originalYarnGrams"),
    originalStuffingGrams:pick("flow-original-stuffing","originalStuffingGrams"),
    originalEyeSizeMm:pick("flow-original-eye","originalEyeSizeMm"),
    shawlShape:pick("flow-shawl-shape","shawlShape"),
    shawlFit:pick("flow-shawl-fit","shawlFit"),
    wearStyle:pick("flow-shawl-fit","wearStyle"),
    wingspan:pick("flow-wingspan","wingspan"),
    skirtLength:pick("flow-skirt-length","skirtLength"),
    upperArmCircumference:pick("flow-upper-arm","upperArmCircumference"),
    wristCircumference:pick("flow-wrist","wristCircumference"),
    armholeDepth:pick("flow-armhole-depth","armholeDepth"),
    buttonBandStitches:pick("flow-button-band","buttonBandStitches")
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
  return `<div class="card mobile-card shared-project-setup"><p class="eyebrow">PROJECT SETUP</p><h2>Project Setup</h2><p class="muted-copy">Your setup is shared across this project, Flow Mode, and project tools.</p>
    ${resultSummaryHtml("Project setup summary",summaryItems,"shared-setup-summary")}
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
function projectSetupPanelHtml(p,{context="project",embedded=false}={}){
  const setup=ensureProjectSetup(p),check=projectFitCheck(p),plan=p.projectCalculations||calculateFlowProjectPlan(p,setup);
  const value=name=>escapeHtml(setup[name]??"");
  const select=(name,values,current=setup[name])=>`<select data-project-setup-field="${name}">${values.map(option=>`<option value="${escapeHtml(option)}" ${current===option?"selected":""}>${escapeHtml(option)}</option>`).join("")}</select>`;
  const field=(name,label,placeholder="",type="text",full=false)=>`<div class="field ${full?"full":""}"><label>${escapeHtml(label)}</label><input data-project-setup-field="${name}" type="${type}" value="${value(name)}" placeholder="${escapeHtml(placeholder)}"></div>`;
  const textArea=(name,label,placeholder="",rows=3)=>`<div class="field full"><label>${escapeHtml(label)}</label><textarea data-project-setup-field="${name}" rows="${rows}" placeholder="${escapeHtml(placeholder)}">${value(name)}</textarea></div>`;
  const fitMetric=(label,metric,description="")=>`<article class="fit-check-metric"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(metric)}</p>${description?`<small>${escapeHtml(description)}</small>`:""}</article>`;
  const easeText=check.ease===null?"Add body and finished width":`${check.ease>0?"+":""}${check.ease.toFixed(1)} cm`;
  const lengthText=check.lengthGap===null?"Add current length":`${check.lengthGap>0?`${check.lengthGap.toFixed(1)} cm to go`:`${Math.abs(check.lengthGap).toFixed(1)} cm over`}`;
  const lastSaved=setup.updatedAt||p.updatedAt;
  return `<section class="card mobile-card project-setup-panel ${embedded?"embedded":""}" data-project-setup-form="${escapeHtml(context)}">
    <div class="section-heading compact-row"><div><p class="eyebrow">PROJECT SETUP</p><h2>Project Setup</h2><p class="muted-copy">Your setup is shared across this project, Flow Mode, and project tools.</p></div><span class="fit-check-status ${check.status==="Looks close"?"ok":"warn"}">${escapeHtml(check.status)}</span></div>
    <div class="project-setup-subsection">
      <h3>Basic setup</h3>
      <div class="project-setup-grid form-grid compact-form">
        <div class="field"><label>Craft</label>${select("craftType",["Knitting","Crochet","Tunisian Crochet"],setup.craftType||setup.craft)}</div>
        <div class="field"><label>Project type</label>${select("projectType",["Scarf","Socks","Hat / Beanie","Shawl","Bag","Blanket","Amigurumi","Top","Cardigan","Jumper / Sweater","Vest","Dress","Other"])}</div>
        ${field("yarnWeight","Yarn / yarn weight","DK, Worsted, 8 ply...")}
        ${field("hookNeedle","Hook / needle","4 mm circular, 5 mm hook...")}
        ${field("gauge","Gauge","22 sts x 30 rows / 10 cm")}
        ${field("startStitches","Cast-on / starting stitch count","60","number")}
        ${field("rows","Rows / rounds","168","number")}
        ${field("targetLengthCm","Target length cm","58","number")}
        ${textArea("notes","Notes","Construction notes, sizing choices, or pattern reminders...",3)}
      </div>
    </div>
    <div class="project-setup-subsection fit-check-card">
      <div class="section-heading compact-row"><div><h3>Fit Check</h3><p class="muted-copy">Check measurements before continuing.</p></div></div>
      <div class="fit-check-grid">
        <div class="project-setup-grid form-grid compact-form">
          ${field("bodyMeasurementCm","Body chest / main measurement cm","100","number")}
          ${field("finishedWidthCm","Finished width / chest cm","108","number")}
          ${field("intendedEaseCm","Intended ease cm","8","number")}
          ${field("currentLengthCm","Current length cm","Measure now","number")}
          <div class="field"><label>Fit feeling</label>${select("fitFeeling",["Not checked yet","Too tight","Feels right","Too loose","Length unsure"])}</div>
          ${textArea("tryOnNotes","Try-on notes","Armhole, sleeve, length, shoulder, bust, waist...",3)}
        </div>
        <div class="fit-check-summary">
          ${fitMetric("Actual ease",easeText,`Planned ease: ${setup.intendedEaseCm||check.intendedEase||"not set"} cm`)}
          ${fitMetric("Length check",lengthText,`Target length: ${setup.targetLengthCm||check.targetLength||"not set"} cm`)}
          ${fitMetric("Fit advice",check.action)}
        </div>
      </div>
    </div>
    <div class="project-setup-subsection">
      <h3>Optional materials</h3>
      <div class="project-setup-grid form-grid compact-form">
        ${field("yarnName","Yarn name","Brand and yarn line")}
        ${field("yarnColour","Yarn colour","Sage, Cream, 124...")}
        ${field("dyeLot","Dye lot","Lot number")}
        ${field("quantity","Quantity","3 balls","number")}
        <div class="field"><label>Bought / owned status</label>${select("materialStatus",["Owned","Need to buy","Partly owned","Wishlist"])}</div>
      </div>
    </div>
    <div class="project-setup-actions">
      <button class="primary-button" data-save-project-setup type="button">Save setup</button>
      <button class="mini-button" id="open-fit-tools" type="button">Open sizing tools</button>
      <span class="setup-save-status saved" data-project-setup-status>Saved · Last saved on this device ${escapeHtml(formatSavedTime(lastSaved))}</span>
      <span class="shared-setup-note">${escapeHtml(plan.summary||"Project setup summary is ready.")}</span>
    </div>
  </section>`;
}
function flowProjectSetupSummaryHtml(p){
  const setup=ensureProjectSetup(p),plan=p.projectCalculations||calculateFlowProjectPlan(p,setup);
  const summary=[setup.craft,setup.projectType,setup.startStitches?`${setup.startStitches} cast-on`:plan.castOnOrChain?`${plan.castOnOrChain} start`:"Add start count",setup.rows?`${setup.rows} rows`:plan.rowCount?`${plan.rowCount} rows`:"Add rows"].filter(Boolean).join(" · ");
  return collapsibleSectionHtml({eyebrow:"PROJECT SETUP",title:"Project guide",description:"Saved craft, project type, yarn, hook/needle, start, and rows for Flow Mode and project tools.",rightMeta:summary,className:"flow-reader-panel flow-setup-panel flow-project-setup-card",children:`<div id="flow-project-setup-editor">${projectSetupPanelHtml(p,{context:"flow",embedded:true})}</div>`});
}
function collectProjectSetupPanel(form){
  const value=name=>form.querySelector(`[data-project-setup-field="${name}"]`)?.value?.trim()||"";
  return {
    craftType:value("craftType"),
    craft:value("craftType"),
    projectType:value("projectType"),
    yarnWeight:value("yarnWeight"),
    yarnName:value("yarnName"),
    yarnColour:value("yarnColour"),
    dyeLot:value("dyeLot"),
    hookNeedle:value("hookNeedle"),
    gauge:value("gauge"),
    startStitches:value("startStitches"),
    rows:value("rows"),
    bodyMeasurementCm:value("bodyMeasurementCm"),
    finishedWidthCm:value("finishedWidthCm"),
    intendedEaseCm:value("intendedEaseCm"),
    targetLengthCm:value("targetLengthCm"),
    currentLengthCm:value("currentLengthCm"),
    fitFeeling:value("fitFeeling"),
    tryOnNotes:value("tryOnNotes"),
    notes:value("notes"),
    quantity:value("quantity"),
    materialStatus:value("materialStatus"),
    patternGauge:value("gauge"),
    patternToolSize:value("hookNeedle"),
    userToolSize:value("hookNeedle"),
    patternYarnWeight:value("yarnWeight"),
    userYarnWeight:value("yarnWeight"),
    originalPatternStitches:value("startStitches"),
    originalPatternRows:value("rows"),
    patternWidthCm:value("finishedWidthCm"),
    patternLengthCm:value("targetLengthCm"),
    bodyMeasurements:{chest:value("bodyMeasurementCm")},
    itemDetails:{width:value("finishedWidthCm"),length:value("targetLengthCm")}
  };
}
function bindProjectSetupPanels(p=getProject()){
  document.querySelectorAll("[data-project-setup-form]").forEach(form=>{
    const status=form.querySelector("[data-project-setup-status]");
    const save=({render=false,notify=false}={})=>{
      applySharedProjectSetup(p,collectProjectSetupPanel(form));
      saveProjectTouch(p);
      if(status){status.textContent=`✓ Setup saved · ${formatSavedTime(p.setup?.updatedAt||p.updatedAt)}`;status.classList.add("saved");status.classList.remove("unsaved");}
      if(notify)toast("Project setup saved.");
      if(render)renderProjectDetail();
    };
    form.addEventListener("input",()=>save({render:false}));
    form.addEventListener("change",()=>save({render:false}));
    form.querySelector("[data-save-project-setup]")?.addEventListener("click",()=>save({render:true,notify:true}));
  });
}
const flowExampleRows={
  crochet:"sc, 2(sc, inc, sc)",
  crochetLegacy:"sc, 2(sc, inc), sc",
  knitting:"K, K, K, SSK, P, P, YO"
};
function flowCurrentRowInstruction(p=getProject(),setup=normalizeProjectSetup(p.projectSetup,p)){
  const analysed=highlightedRowAnalysis(p);
  const raw=analysed?.sequence||highlightedRowRecognition(p).map(cell=>cell.candidates?.[0]?.abbreviation||cell.detectedSymbol||"").filter(Boolean).join(", ");
  const fallback=setup.craft==="Crochet"?flowExampleRows.crochet:flowExampleRows.knitting;
  const sequence=raw||fallback;
  if(setup.patternLanguage==="full")return sequenceToSpokenInstructions(sequence,{readAloud:{mode:"teaching",language:"en",voiceSpeed:1}},setup.craft);
  return sequence;
}
function flowCurrentStitchStep(p=getProject(),setup=normalizeProjectSetup(p.projectSetup,p)){
  const sequence=flowCurrentRowInstruction(p,{...setup,patternLanguage:"abbreviations"});
  const analysis=analyzeRowInstruction(sequence,{craft:setup.craft,startingStitches:previousRowStitchCount(p)});
  const firstStep=analysis.steps[0]?.token||"start this row";
  return `${analysis.steps.length?`First stitch: ${firstStep}. `:""}${analysis.warning||"Stitch count looks ready."}`;
}
function previousRowStitchCount(p=getProject()){
  const previous=p.chartAnalysis?.rows?.find(r=>Number(r.number)===Number(p.row)-1);
  return Number(previous?.stitchCount)||Number(p.projectCalculations?.stitchCount)||0;
}
function expandInstructionRepeats(sequence=""){
  let text=String(sequence||"");
  let guard=0;
  while(/\d+\s*\([^()]+\)/.test(text)&&guard++<12){
    text=text.replace(/(\d+)\s*\(([^()]+)\)/g,(_,count,body)=>Array.from({length:Math.max(1,Math.min(99,Number(count)||1))},()=>body).join(", "));
  }
  return text;
}
function instructionSteps(sequence=""){
  return expandInstructionRepeats(sequence).split(/[,;]+|\s+(?=(?:K2tog|SSK|YO|M1|BO|K|P|sc|dc|hdc|inc|dec|ch|sl\s*st)\b)/i).map(token=>token.trim()).filter(Boolean);
}
function stitchActionForToken(token,craft="Knitting"){
  const clean=String(token||"").trim(),lower=clean.toLowerCase().replace(/\s+/g," ");
  const crochet={sc:[1,1],dc:[1,1],hdc:[1,1],inc:[1,2],dec:[2,1],ch:[0,1],"sl st":[1,1],slst:[1,1]};
  const knitting={k:[1,1],p:[1,1],yo:[0,1],k2tog:[2,1],ssk:[2,1],m1:[0,1],bo:[1,0]};
  const table=/crochet/i.test(craft)?crochet:knitting;
  const match=Object.keys(table).find(key=>lower===key||lower.startsWith(key+" "));
  const pair=table[match]||[1,1];
  return {token:clean,consumes:pair[0],produces:pair[1]};
}
function analyzeRowInstruction(sequence="",{craft="Knitting",startingStitches=0}={}){
  const steps=instructionSteps(sequence).map(token=>stitchActionForToken(token,craft));
  const consumedStitches=steps.reduce((sum,step)=>sum+step.consumes,0);
  const endingStitches=steps.reduce((sum,step)=>sum+step.produces,0);
  const warning=startingStitches&&consumedStitches&&Math.abs(consumedStitches-startingStitches)>1?"This row may need a quick check. The stitch count does not fully match the previous row.":"";
  return {steps,startingStitches,consumedStitches,endingStitches,warning};
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

const YARNCHA_LEARNING_MEMORY_KEY="yarncha-learning-memory-v1";
function normalizeAssistantCraft(value=""){
  const text=String(value||"").toLowerCase();
  if(/tunisian/.test(text))return "tunisian";
  if(/crochet/.test(text))return "crochet";
  return "knitting";
}
function assistantCraftLabel(craftType="knitting"){return {knitting:"Knitting",crochet:"Crochet",tunisian:"Tunisian Crochet"}[craftType]||"Knitting";}
function normalizeAssistantSkill(value="beginner"){return ["beginner","intermediate","advanced"].includes(value)?value:"beginner";}
function titleCaseTechnique(value=""){return String(value||"").replace(/[-_]+/g," ").replace(/\s+/g," ").trim().replace(/\b\w/g,letter=>letter.toUpperCase());}
function defaultLearningMemory(){return {verifiedSymbols:[],userCorrections:[],frequentQuestions:{},preferredTerminology:{},projectMemories:{}};}
const learningMemoryService={
  getAll(){
    try{return {...defaultLearningMemory(),...(JSON.parse(localStorage.getItem(YARNCHA_LEARNING_MEMORY_KEY)||"null")||{})};}
    catch{return defaultLearningMemory();}
  },
  saveAll(memory){localStorage.setItem(YARNCHA_LEARNING_MEMORY_KEY,JSON.stringify({...defaultLearningMemory(),...(memory||{})}));},
  getLearningMemory(projectId=""){
    const memory=this.getAll();
    return {...memory,projectMemory:memory.projectMemories?.[projectId]||{}};
  },
  saveVerifiedSymbol(projectId,symbolData={}){
    const memory=this.getAll(),item={projectId,symbol:symbolData.symbol||symbolData.currentSymbol||"",meaning:symbolData.meaning||symbolData.question||"Verified in Yarncha Assistant",savedAt:new Date().toISOString()};
    memory.verifiedSymbols=[item,...(memory.verifiedSymbols||[])].slice(0,80);
    memory.projectMemories[projectId]={...(memory.projectMemories[projectId]||{}),lastVerifiedSymbol:item};
    this.saveAll(memory);return item;
  },
  saveUserCorrection(correctionData={}){
    const memory=this.getAll(),item={...correctionData,savedAt:new Date().toISOString()};
    memory.userCorrections=[item,...(memory.userCorrections||[])].slice(0,80);
    if(item.projectId)memory.projectMemories[item.projectId]={...(memory.projectMemories[item.projectId]||{}),lastCorrection:item};
    this.saveAll(memory);return item;
  },
  saveFrequentQuestion(question=""){
    const key=String(question||"").trim().toLowerCase().slice(0,120);
    if(!key)return;
    const memory=this.getAll();
    memory.frequentQuestions[key]=(memory.frequentQuestions[key]||0)+1;
    this.saveAll(memory);
  },
  savePreferredTerminology(term,preference){
    const memory=this.getAll();
    memory.preferredTerminology[term]=preference;
    this.saveAll(memory);
  },
  saveProjectNote(projectId,note){
    const memory=this.getAll();
    const projectMemory=memory.projectMemories[projectId]||{};
    projectMemory.notes=[{text:note,savedAt:new Date().toISOString()},...(projectMemory.notes||[])].slice(0,30);
    memory.projectMemories[projectId]=projectMemory;
    this.saveAll(memory);
  }
};
const projectContextService={
  getCurrentProject(){return getProject();},
  getCurrentChartContext(project=this.getCurrentProject()){
    const reader=normalizeChartReaderConfig(project?.chartReader,project||{});
    return {chartType:reader.chartType,currentChart:project?.activeChartAssetId||project?.chart?.name||project?.attachments?.[0]?.name||"",grid:reader.grid,verifiedSymbols:learningMemoryService.getLearningMemory(project?.id||"").verifiedSymbols||[]};
  },
  getCurrentRowContext(project=this.getCurrentProject()){
    const rowNumber=Number(project?.row)||0,row=(project?.chartAnalysis?.rows||[]).find(item=>Number(item.number)===rowNumber);
    return {currentRow:rowNumber,rowInstruction:row?.sequence||flowCurrentRowInstruction(project||{},ensureProjectSetup(project||{})),expectedStitchCount:row?.stitchCount||project?.projectCalculations?.stitchCount||null,savedProgress:{row:rowNumber,totalRows:project?.chartRows||project?.totalRows||null}};
  },
  getCurrentSymbolContext(project=this.getCurrentProject()){
    const recognition=highlightedRowRecognition(project||{})[0]||project?.chartReader?.recognitionResults?.[0]||null;
    return {currentSymbol:recognition?.candidates?.[0]?.abbreviation||recognition?.detectedSymbol||"",symbolMeaning:recognition?.candidates?.[0]?.nameEn||""};
  },
  getSubCounterContext(project=this.getCurrentProject()){
    return (project?.subCounters||[]).map(normalizeSubCounter).map(counter=>({name:counter.name,count:counter.count,every:counter.every,anchorRow:counter.anchorRow,linked:counter.linked,notes:counter.notes,nextIn:counter.linked!==false?subCounterRowsUntilNext(counter,Number(project?.row)||0):null}));
  },
  getCurrentProjectContext(){
    const project=this.getCurrentProject(),setup=ensureProjectSetup(project||{}),chart=this.getCurrentChartContext(project),row=this.getCurrentRowContext(project),symbol=this.getCurrentSymbolContext(project),memory=learningMemoryService.getLearningMemory(project?.id||"");
    return {projectId:project?.id||"",projectName:project?.name||"",craftType:normalizeAssistantCraft(setup.craft||chart.chartType||project?.type),projectType:setup.projectType||project?.projectKind||project?.type||"",yarnWeight:setup.yarnWeight||project?.yarnWeight||"",fibreContent:setup.fibreContent||project?.fibreContent||"",toolSize:setup.toolSize||setup.hookSize||setup.needleSize||project?.hookSize||project?.needleSize||"",patternGauge:setup.patternGauge||setup.patternStitchesPer10cm||"",userGauge:setup.userGauge||setup.userStitchesPer10cm||"",targetMeasurement:setup.targetMeasurement||setup.targetLengthCm||project?.fitCheck?.targetLength||"",currentMeasurement:setup.currentMeasurement||project?.fitCheck?.currentLength||"",blockedState:setup.blockedState||project?.fitCheck?.blockedState||"",measurements:setup.bodyMeasurements||project?.fitCheck||null,skillLevel:normalizeAssistantSkill(project?.yarnchaAssistant?.skillLevel||"beginner"),currentChart:chart.currentChart,currentRow:row.currentRow,currentSymbol:symbol.currentSymbol,projectNotes:project?.notes||"",savedProgress:row.savedProgress,subCounters:this.getSubCounterContext(project),verifiedSymbols:memory.verifiedSymbols||[],recentAssistantQuestions:(project?.yarnchaAssistant?.recentQuestions||[]),rowInstruction:row.rowInstruction,expectedStitchCount:row.expectedStitchCount,selectedTechnique:project?.yarnchaAssistant?.selectedTechnique||"",selectedStitch:project?.yarnchaAssistant?.selectedStitch||"",techniqueCategory:project?.yarnchaAssistant?.techniqueCategory||"",workingLocation:project?.yarnchaAssistant?.workingLocation||"",stitchCountBefore:project?.yarnchaAssistant?.stitchCountBefore||"",stitchCountAfter:project?.yarnchaAssistant?.stitchCountAfter||"",language:project?.yarnchaAssistant?.language||"en",projectMemory:memory.projectMemory||{}};
  }
};
function subCounterRowsUntilNext(counter,currentRow=0){
  const c=normalizeSubCounter(counter),row=Number(currentRow)||0;
  const next=repeatEngine()?.getNextTrigger(c.repeatRule,row);
  if(next!==undefined&&next!==null)return Math.max(0,next-row);
  if(row<c.anchorRow)return c.anchorRow-row;
  const offset=(row-c.anchorRow)%c.every;
  return offset===0?c.every:c.every-offset;
}
function assistantSubCounterSummary(counters=[]){
  const list=(counters||[]).filter(Boolean);
  if(!list.length)return "No sub row counters have been added yet.";
  return list.map(counter=>`${counter.name} is at ${counter.count}${counter.nextIn!==null?` · next update in ${counter.nextIn} row${counter.nextIn===1?"":"s"}`:""}`).join("; ");
}
const techniqueHelpLabels={en:{projectContext:"Project context",technique:"Technique",quickAnswer:"Quick answer",whatToDoNow:"What to do now",stepByStep:"Step-by-step",checkBeforeContinuing:"Check before continuing",commonMistakes:"Common mistakes",relatedTechniques:"Related techniques",moreDetails:"More details",countCheck:"Count check"}};
const techniqueGuideDatabase=[
  {id:"crochet-merge-new-yarn",label:"Merge New Yarn",craft:"crochet",category:"joining",level:"beginner",aliases:["join new yarn","add new yarn","change ball","merge yarn","換線","接新線"],stitchCountEffect:"no-change",shortMeaning:"Join a new strand of yarn so you can continue the project.",quickAnswer:"For merging new yarn in crochet, join the new yarn at the correct stitch or edge, then keep the first few stitches relaxed so the join does not look tight or bulky.",whatToDoNow:"Join the new yarn at the next stitch, leave a tail for weaving in, and crochet 3-5 stitches slowly before checking the tension.",steps:["Stop before the stitch where the new yarn needs to begin.","Place the new yarn over the hook and pull it through as instructed.","Leave a tail long enough to weave in later.","Work the next few stitches slowly while holding the tail gently at the back.","Check that the edge is not pulled tight.","Continue the row once the join looks secure."],checks:["Join at the edge if the pattern allows it.","Do not knot tightly unless the pattern or fibre needs it.","The yarn tail should be long enough to weave in securely."],commonMistakes:["Joining one stitch too early or too late.","Pulling the new yarn too tightly.","Accidentally counting the joining loop as an extra stitch."],relatedTechniqueIds:["crochet-weave-in-ends","crochet-standing-stitch","crochet-colour-change","crochet-edge-placement","crochet-tension-control"]},
  {id:"crochet-chain-space",label:"Work Into Chain Space",craft:"crochet",category:"chain space",level:"beginner",aliases:["chain space","ch space","work into space"],stitchCountEffect:"depends",quickAnswer:"For working into a chain space in crochet, insert the hook into the open space, not into the individual chain stitch, unless the pattern says otherwise.",whatToDoNow:"Find the open chain space, place the hook through the space, and count the stitches you make into it rather than counting the space itself.",steps:["Locate the chain space from the previous row or round.","Insert the hook into the opening under the chain, not through the top loops of one chain.","Work the number of stitches the pattern gives into that space.","Count the produced stitches after the group is complete.","Check whether the chain itself counts as a stitch in this pattern."],checks:["Several stitches may go into one chain space.","Count the stitches you produce, not the empty space.","Check whether the turning chain or chain space counts as a stitch."],commonMistakes:["Piercing the chain stitch instead of entering the space.","Counting the chain space as one finished stitch.","Missing extra stitches that should all go into the same space."],relatedTechniqueIds:["crochet-stitch-anatomy","crochet-turning-chain","crochet-edge-placement"]},
  {id:"crochet-back-loop-only",label:"Back Loop Only",craft:"crochet",category:"front loop / back loop",level:"beginner",aliases:["back loop","blo","back loop only"],stitchCountEffect:"no-change",quickAnswer:"For back loop only crochet, identify the top V and insert under only the loop farthest from you. This creates a ridge without adding stitches.",whatToDoNow:"Turn the stitch top toward you, find the back loop, and make one stitch through only that loop before checking the ridge.",steps:["Look at the top V of the next stitch.","Find the loop farthest from you.","Insert the hook under that back loop only.","Complete the stitch normally.","Check that the front loop remains visible as a ridge."],checks:["Back loop only should not change the stitch count.","The unused front loop should form a neat ridge.","The hook should not catch both loops."],commonMistakes:["Catching both loops by accident.","Working into the front loop instead of the back loop.","Pulling the back-loop stitch too tight."],relatedTechniqueIds:["crochet-front-loop-only","crochet-stitch-anatomy","crochet-tension-control"]},
  {id:"crochet-front-loop-only",label:"Front Loop Only",craft:"crochet",category:"front loop / back loop",level:"beginner",aliases:["front loop","flo","front loop only"],stitchCountEffect:"no-change",quickAnswer:"For front loop only crochet, use only the loop closest to you and leave the back loop unworked, which can create a decorative ridge.",whatToDoNow:"Find the front loop of the next stitch, insert only under that loop, and keep the tension relaxed so the row does not stretch.",steps:["Look for the top V of the next stitch.","Use the loop closest to you.","Insert the hook under the front loop only.","Complete the stitch normally.","Check the fabric stretch after a few stitches."],checks:["Front loop only should not change the stitch count.","The unused back loop should remain visible.","Front-loop work can stretch, so check tension often."],commonMistakes:["Working under both loops.","Confusing the front loop with a chain space.","Pulling too tightly and making the ridge uneven."],relatedTechniqueIds:["crochet-back-loop-only","crochet-stitch-anatomy","crochet-tension-control"]},
  {id:"crochet-post-stitch",label:"Post Stitch",craft:"crochet",category:"post stitch",level:"intermediate",aliases:["front post","back post","fpdc","bpdc","post stitch"],stitchCountEffect:"no-change",quickAnswer:"For a crochet post stitch, the hook goes around the post or body of the stitch below, not into the top V. Front post comes toward you; back post goes away from you.",whatToDoNow:"Find the stitch body below, decide front post or back post, then place the hook around the post before pulling up a loop.",steps:["Locate the post of the stitch from the previous row.","For front post, insert from front to back and back to front around the post.","For back post, insert from back to front and front to back around the post.","Pull up a loop around the post, then finish the stitch.","Check that the fabric texture pops in the intended direction."],checks:["Post stitches usually do not change stitch count.","The hook should not enter the top V.","Post stitches add thickness, so check tension and drape."],commonMistakes:["Working into the stitch top instead of around the post.","Mixing up front post and back post direction.","Pulling the post stitch too tight."],relatedTechniqueIds:["crochet-stitch-anatomy","crochet-tension-control","crochet-front-loop-only"]},
  {id:"crochet-turning-chain",label:"Turning Chain",craft:"crochet",category:"turning chain",level:"beginner",aliases:["turning chain","chain at beginning","ch 1","ch 2","ch 3"],stitchCountEffect:"depends",quickAnswer:"For a crochet turning chain, first check whether the pattern counts it as the first stitch. The wrong choice can add or remove one stitch from the row.",whatToDoNow:"Mark the first real stitch and read the pattern note about whether the turning chain counts before you work across.",steps:["Read the pattern note for turning chains.","Chain the required number for the stitch height.","If the chain counts, treat it as the first stitch.","If it does not count, work into the first stitch at the base of the chain.","Count the row at the end."],checks:["The turning chain rule can change the row count by one.","Mark the first real stitch if you are unsure.","The row edge should not lean or gap."],commonMistakes:["Counting the chain when the pattern says not to.","Skipping the first real stitch by accident.","Adding an extra stitch at the row edge."],relatedTechniqueIds:["crochet-edge-placement","crochet-chain-space","crochet-stitch-anatomy"]},
  {id:"crochet-increase",label:"Increase",craft:"crochet",category:"increase",level:"beginner",aliases:["increase","inc","2 sc in next","two stitches in one"],stitchCountEffect:"increase",quickAnswer:"For a crochet increase, work the stated number of stitches into the same stitch or chain space so the fabric gains stitches.",whatToDoNow:"Identify the exact stitch or space for the increase, work the full increase there, then count the stitches it produced.",steps:["Find whether the increase goes into a stitch top or a chain space.","Work the number of stitches the pattern states into that same place.","Do not skip the next stitch unless the pattern says to.","Count how many stitches the increase produced.","Compare with the row's expected stitch count."],checks:["An increase should add stitches.","The expected count should already include the added stitches.","The increase should not create a hole unless the pattern intends one."],commonMistakes:["Working the second stitch into the next stitch instead of the same stitch.","Skipping after the increase when the pattern did not say to.","Forgetting to include the extra stitch in the count."],relatedTechniqueIds:["crochet-chain-space","crochet-stitch-anatomy","crochet-tension-control"]},
  {id:"crochet-decrease",label:"Decrease",craft:"crochet",category:"decrease",level:"beginner",aliases:["decrease","dec","sc2tog","dc2tog"],stitchCountEffect:"decrease",quickAnswer:"For a crochet decrease, the stitch consumes two or more stitches and turns them into fewer stitches, so the row count should go down as written.",whatToDoNow:"Identify how many stitches the decrease uses, work only those stitches together, then check that you did not skip an extra stitch after it.",steps:["Read whether the decrease is sc2tog, dc2tog, or another stitch.","Insert into the first stitch and pull up the required loop.","Insert into the next stitch and pull up the required loop.","Finish the decrease as the pattern states.","Count the row to confirm the decrease is included."],checks:["A decrease should reduce the stitch count.","The expected count should already include the removed stitch or stitches.","Do not skip an extra stitch after the decrease."],commonMistakes:["Skipping one extra stitch after the decrease.","Not inserting into enough stitches.","Pulling the decrease too tight."],relatedTechniqueIds:["crochet-stitch-anatomy","crochet-tension-control","crochet-edge-placement"]},
  {id:"knitting-yarn-over",label:"Yarn Over",craft:"knitting",category:"yarn over",level:"beginner",aliases:["yo","yarn over"],stitchCountEffect:"increase",quickAnswer:"For a knitting yarn over, move the yarn over the needle so it creates a new loop on the next row and usually makes an eyelet.",whatToDoNow:"Check yarn position before and after the yarn over, then count it as one added stitch.",steps:["Look at whether the previous and next stitches are knit or purl.","Move the yarn over the right needle in the direction needed for the next stitch.","Do not knit into an existing stitch for the yarn over itself.","Work the next stitch while keeping the yarn over on the needle.","Count the yarn over as one stitch on the next row."],checks:["A yarn over should add one stitch unless paired with a decrease.","The expected count should include the added loop.","The yarn position should match the next stitch."],commonMistakes:["Dropping the yarn over before the next row.","Wrapping the yarn the wrong way before a purl.","Forgetting the paired decrease."],relatedTechniqueIds:["knitting-k2tog","knitting-ssk","knitting-stitch-anatomy"]},
  {id:"knitting-k2tog",label:"Knit Two Together",craft:"knitting",category:"decrease",level:"beginner",aliases:["k2tog","knit two together"],stitchCountEffect:"decrease",quickAnswer:"For knit two together, insert the right needle through the next two stitches together and knit them as one stitch, reducing the count by one.",whatToDoNow:"Check the next two stitches are mounted normally, then knit them together and count one stitch made.",steps:["Hold the working yarn at the back.","Insert the right needle through the front legs of the next two stitches together.","Wrap and pull through as for a knit stitch.","Slide both old stitches off the left needle.","Check the decrease leans right."],checks:["Knit Two Together removes one stitch for each decrease.","The expected count should include the decrease.","Both stitches should be worked together, not one at a time."],commonMistakes:["Knitting only the first stitch.","Twisting one stitch before the decrease.","Forgetting that two stitches become one."],relatedTechniqueIds:["knitting-ssk","knitting-yarn-over","knitting-stitch-anatomy"]},
  {id:"knitting-ssk",label:"Slip Slip Knit",craft:"knitting",category:"decrease",level:"beginner",aliases:["ssk","slip slip knit"],stitchCountEffect:"decrease",quickAnswer:"For slip slip knit, slip two stitches knitwise one at a time, then knit them together through the back loops so the decrease leans left.",whatToDoNow:"Slip the next two stitches separately knitwise, then knit through the back loops and count one stitch made.",steps:["Slip the first stitch knitwise.","Slip the second stitch knitwise.","Place the left needle into the fronts of both slipped stitches if needed.","Knit them together through the back loops.","Check the decrease leans left."],checks:["Slip Slip Knit removes one stitch for each decrease.","The expected count should include the decrease.","The stitches should be slipped one at a time."],commonMistakes:["Slipping both stitches together.","Working a right-leaning decrease by accident.","Pulling the decrease too loose."],relatedTechniqueIds:["knitting-k2tog","knitting-yarn-over","knitting-stitch-anatomy"]},
  {id:"knitting-make-one-left",label:"Make One Left",craft:"knitting",category:"increase",level:"intermediate",aliases:["m1l","make one left"],stitchCountEffect:"increase",quickAnswer:"For Make One Left, lift the strand between stitches from front to back and knit through the back leg so the increase twists closed.",whatToDoNow:"Find the strand between needles, lift it front to back, and knit through the back leg before counting the added stitch.",steps:["Locate the running strand between the needles.","Lift it from front to back onto the left needle.","Knit through the back leg.","Check that the new stitch is twisted closed.","Continue with the row instruction."],checks:["Make One Left adds one stitch.","The expected count should include the increase.","The increase should not leave a large hole."],commonMistakes:["Lifting the wrong strand.","Knitting through the front leg and making a hole.","Forgetting to count the new stitch."],relatedTechniqueIds:["knitting-make-one-right","knitting-yarn-over","knitting-stitch-anatomy"]},
  {id:"knitting-make-one-right",label:"Make One Right",craft:"knitting",category:"increase",level:"intermediate",aliases:["m1r","make one right"],stitchCountEffect:"increase",quickAnswer:"For Make One Right, lift the strand between stitches from back to front and knit through the front leg so the increase twists closed.",whatToDoNow:"Find the strand between needles, lift it back to front, and knit through the front leg before counting the added stitch.",steps:["Locate the running strand between the needles.","Lift it from back to front onto the left needle.","Knit through the front leg.","Check that the new stitch is twisted closed.","Continue with the row instruction."],checks:["Make One Right adds one stitch.","The expected count should include the increase.","The increase should lean right."],commonMistakes:["Lifting from the wrong direction.","Making a yarn-over hole by not twisting the strand.","Forgetting to count the new stitch."],relatedTechniqueIds:["knitting-make-one-left","knitting-yarn-over","knitting-stitch-anatomy"]},
  {id:"knitting-knit-through-back-loop",label:"Knit Through Back Loop",craft:"knitting",category:"twisted stitch",level:"beginner",aliases:["ktbl","knit through back loop"],stitchCountEffect:"no-change",quickAnswer:"For knit through back loop, insert the right needle into the back leg of the stitch instead of the front leg, creating a twisted stitch.",whatToDoNow:"Look at the stitch mount, insert through the back leg, and keep tension relaxed so the twist is visible but not tight.",steps:["Identify the front leg and back leg of the next stitch.","Insert the right needle into the back leg.","Wrap and pull through as for a knit stitch.","Slide the old stitch off the left needle.","Check that the stitch is twisted."],checks:["Knit Through Back Loop should not change stitch count.","The needle should enter the back leg.","Twisted stitches can tighten the row, so check tension."],commonMistakes:["Knitting through the front leg as usual.","Twisting a stitch that was already mounted differently.","Pulling too tight."],relatedTechniqueIds:["knitting-stitch-anatomy","knitting-tension-control"]},
  {id:"knitting-join-new-yarn",label:"Join New Yarn",craft:"knitting",category:"joining",level:"beginner",aliases:["join new yarn","add new yarn","merge new yarn"],stitchCountEffect:"no-change",quickAnswer:"For joining new yarn in knitting, start the new strand at the edge or required stitch and keep the first few stitches relaxed so the join does not pucker.",whatToDoNow:"Leave a tail, knit the next few stitches with the new yarn, and check the edge before continuing.",steps:["Stop at the stitch where the new yarn begins.","Hold the new yarn with a tail for weaving in.","Knit the next stitch using the new strand.","Work 3-5 stitches slowly.","Check that the join is secure but not tight."],checks:["Join New Yarn should not change stitch count.","The tail should be long enough to weave in.","The edge should not pucker."],commonMistakes:["Knotting tightly when the fabric does not need it.","Joining in the wrong stitch.","Counting the join as an extra stitch."],relatedTechniqueIds:["knitting-weave-in-ends","knitting-tension-control"]},
  {id:"knitting-bind-off",label:"Bind Off",craft:"knitting",category:"bind off",level:"beginner",aliases:["bind off","cast off"],stitchCountEffect:"decrease",quickAnswer:"For binding off, work stitches and pass one over another until live stitches are secured along the edge.",whatToDoNow:"Bind off loosely enough that the edge can stretch to match the fabric.",steps:["Work the first two stitches as instructed.","Lift the first stitch over the second and off the needle.","Work one more stitch.","Pass the previous stitch over it.","Continue until one stitch remains and fasten off."],checks:["Bind off removes live stitches from the needle.","The edge should not be tighter than the fabric.","Use the pattern bind-off method if specified."],commonMistakes:["Binding off too tightly.","Forgetting pattern stitches during bind off.","Dropping the final loop before securing it."],relatedTechniqueIds:["knitting-tension-control","knitting-stitch-anatomy"]},
  {id:"knitting-cable-cross",label:"Cable Cross",craft:"knitting",category:"cable",level:"intermediate",aliases:["cable","cable cross","c4f","c4b"],stitchCountEffect:"no-change",quickAnswer:"For a cable cross, hold the stated stitches to the front or back, knit the next stitches, then knit the held stitches in order.",whatToDoNow:"Check whether the cable needle goes front or back before moving stitches.",steps:["Read the cable abbreviation and number of stitches.","Slip the stated stitches onto a cable needle.","Hold them to the front or back as written.","Work the next stitches from the left needle.","Work the held stitches from the cable needle."],checks:["Cable Cross should not change stitch count.","Front and back placement changes cable direction.","Cable rows can tighten, so relax the yarn."],commonMistakes:["Holding the cable needle on the wrong side.","Dropping held stitches.","Pulling the cross too tight."],relatedTechniqueIds:["knitting-tension-control","knitting-stitch-anatomy"]},
  {id:"knitting-pick-up-stitches",label:"Pick Up Stitches",craft:"knitting",category:"joining",level:"intermediate",aliases:["pick up stitches","pickup stitches"],stitchCountEffect:"increase",quickAnswer:"For picking up stitches, insert the needle through the edge or stitch named by the pattern and pull up new loops evenly.",whatToDoNow:"Mark the pickup span, divide it into sections, and pick up the expected number evenly.",steps:["Mark the start and end of the pickup edge.","Divide the edge into smaller sections with markers.","Insert the needle through the edge stitch or gap named by the pattern.","Pull up a loop with even tension.","Count the picked-up stitches before continuing."],checks:["Pick Up Stitches adds stitches to the needle.","The expected count should include the picked-up stitches.","Spacing should look even along the edge."],commonMistakes:["Picking up too many stitches in one area.","Using the wrong edge strand.","Pulling the pickup row too tight."],relatedTechniqueIds:["knitting-join-new-yarn","knitting-tension-control"]},
  {id:"knitting-cast-on",label:"Cast On",craft:"knitting",category:"cast on",level:"beginner",aliases:["cast on"],stitchCountEffect:"increase",quickAnswer:"For casting on, create the number of starting stitches the pattern asks for with a method that matches the edge.",whatToDoNow:"Count the cast-on stitches on the needle before working Row 1.",steps:["Choose the cast-on method named by the pattern.","Make the first loop or slip knot if that method uses one.","Cast on each stitch with even spacing.","Count stitches on the needle.","Restart now if the count is wrong."],checks:["Cast On creates the starting stitch count.","The edge should not be too tight.","The first row should match the pattern count."],commonMistakes:["Counting the slip knot incorrectly.","Casting on too tightly.","Starting Row 1 with the wrong count."],relatedTechniqueIds:["knitting-bind-off","knitting-tension-control"]},
  {id:"tunisian-forward-pass",label:"Forward Pass",craft:"tunisian",category:"forward pass",level:"beginner",aliases:["forward pass","fwd pass"],stitchCountEffect:"depends",quickAnswer:"For the Tunisian forward pass, pick up loops across the row and leave them on the hook before working the return pass.",whatToDoNow:"Count the loops on your hook after the forward pass and make sure the edge stitch is included.",steps:["Start with one loop on the hook.","Insert into each required vertical bar or space.","Yarn over and pull up a loop, leaving it on the hook.","Continue across the row.","Work the edge stitch as the pattern states."],checks:["The loops on hook should match the row stitch count before the return pass.","Do not skip the edge stitch.","The row is not complete until the return pass is worked."],commonMistakes:["Dropping a loop before the return pass.","Missing the last edge stitch.","Pulling loops to different heights."],relatedTechniqueIds:["tunisian-return-pass","tunisian-edge-stitch","tunisian-vertical-bar"]},
  {id:"tunisian-return-pass",label:"Return Pass",craft:"tunisian",category:"return pass",level:"beginner",aliases:["return pass","standard return pass"],stitchCountEffect:"no-change",quickAnswer:"For the Tunisian return pass, yarn over and pull through loops as instructed until one loop remains on the hook.",whatToDoNow:"Work the first return-pass chain as written, then pull through two loops at a time unless your pattern says otherwise.",steps:["Yarn over and pull through one loop if this is the standard start.","Yarn over and pull through two loops.","Repeat until one loop remains on the hook.","Keep the return-pass chains even.","Check that no loop was skipped."],checks:["Standard Return Pass should not change stitch count by itself.","One loop should remain on the hook at the end.","Row count may treat forward and return pass together as one row."],commonMistakes:["Pulling through two loops at the first step when the pattern says one.","Leaving extra loops on the hook.","Tightening the return pass too much."],relatedTechniqueIds:["tunisian-forward-pass","tunisian-tension-control"]},
  {id:"tunisian-simple-stitch",label:"Tunisian Simple Stitch",craft:"tunisian",category:"vertical bar",level:"beginner",aliases:["tss","tunisian simple stitch","work into vertical bar","vertical bar"],stitchCountEffect:"no-change",quickAnswer:"For Tunisian Simple Stitch, insert the hook under the front vertical bar, yarn over, and pull up a loop for the forward pass.",whatToDoNow:"Find the next vertical bar, insert under it from right to left, and pull up one loop.",steps:["Identify the front vertical bar of the next stitch.","Insert the hook under that bar.","Yarn over and pull up a loop.","Leave the loop on the hook.","Continue across before the return pass."],checks:["Tunisian Simple Stitch should keep one loop per stitch on the forward pass.","Do not insert into the chain space unless instructed.","Include the edge stitch."],commonMistakes:["Catching two bars instead of one.","Skipping the edge stitch.","Pulling loops too short."],relatedTechniqueIds:["tunisian-forward-pass","tunisian-vertical-bar","tunisian-return-pass"]},
  {id:"tunisian-knit-stitch",label:"Tunisian Knit Stitch",craft:"tunisian",category:"stitch placement",level:"beginner",aliases:["tks","tunisian knit stitch"],stitchCountEffect:"no-change",quickAnswer:"For Tunisian Knit Stitch, insert the hook between the front and back vertical bars, then pull up a loop.",whatToDoNow:"Open the stitch slightly, place the hook between the vertical bars, and pull up a loop at even height.",steps:["Find the next stitch body.","Insert the hook between the front and back vertical bars.","Yarn over and pull up a loop.","Leave the loop on the hook.","Check the V shape on the front of the fabric."],checks:["Tunisian Knit Stitch should not change stitch count.","The hook goes through the stitch body, not under only the front bar.","Loops should be the same height."],commonMistakes:["Working Tunisian Simple Stitch by accident.","Splitting the yarn inside the stitch body.","Pulling the loop too tight."],relatedTechniqueIds:["tunisian-simple-stitch","tunisian-forward-pass","tunisian-tension-control"]},
  {id:"tunisian-purl-stitch",label:"Tunisian Purl Stitch",craft:"tunisian",category:"stitch placement",level:"intermediate",aliases:["tps","tunisian purl stitch"],stitchCountEffect:"no-change",quickAnswer:"For Tunisian Purl Stitch, bring the yarn to the front before inserting under the vertical bar, then pull up a loop.",whatToDoNow:"Bring yarn forward, insert under the vertical bar, and keep the front bump relaxed.",steps:["Bring the working yarn to the front.","Insert the hook under the front vertical bar.","Yarn over from the front position.","Pull up a loop and leave it on the hook.","Move to the next stitch without tightening the bump."],checks:["Tunisian Purl Stitch should not change stitch count.","The yarn must begin at the front.","Loops should stay even on the hook."],commonMistakes:["Leaving yarn at the back.","Pulling the purl bump too tight.","Skipping the next vertical bar."],relatedTechniqueIds:["tunisian-simple-stitch","tunisian-tension-control"]},
  {id:"tunisian-edge-stitch",label:"Edge Stitch",craft:"tunisian",category:"edge stitch",level:"beginner",aliases:["edge stitch","last stitch"],stitchCountEffect:"no-change",quickAnswer:"For a Tunisian edge stitch, work into the two outer loops at the edge unless your pattern gives a different edge method.",whatToDoNow:"Before the return pass, check the last stitch at the edge and make sure it has been picked up.",steps:["Work across the row to the last stitch.","Locate the two outer edge loops.","Insert the hook through those edge loops.","Yarn over and pull up a loop.","Check the side edge is straight."],checks:["Edge Stitch should not add an extra stitch.","Skipping it can make the side edge shrink.","The edge loop should sit at the same height as the row."],commonMistakes:["Skipping the last stitch.","Working into only one edge loop when the pattern expects two.","Pulling the edge loop too tight."],relatedTechniqueIds:["tunisian-forward-pass","tunisian-return-pass","tunisian-tension-control"]},
  {id:"tunisian-increase",label:"Tunisian Increase",craft:"tunisian",category:"increase",level:"beginner",aliases:["tunisian increase","increase"],stitchCountEffect:"increase",quickAnswer:"For a Tunisian increase, add an extra loop on the forward pass in the place named by the pattern.",whatToDoNow:"Find where the pattern wants the extra loop, make it there, and count loops on hook before the return pass.",steps:["Read whether the increase is in a vertical bar, space, or edge.","Insert the hook where instructed.","Pull up an extra loop.","Continue the forward pass.","Count loops before the return pass."],checks:["Tunisian Increase adds loops on the hook.","The expected count should include the added loop.","Do not add the loop in the wrong space."],commonMistakes:["Adding the increase one bar too early.","Forgetting to count loops before the return pass.","Creating a hole when the pattern wants a closed increase."],relatedTechniqueIds:["tunisian-forward-pass","tunisian-vertical-bar","tunisian-tension-control"]},
  {id:"tunisian-decrease",label:"Tunisian Decrease",craft:"tunisian",category:"decrease",level:"beginner",aliases:["tunisian decrease","decrease"],stitchCountEffect:"decrease",quickAnswer:"For a Tunisian decrease, insert through the stated bars or loops together so fewer loops are added on the forward pass.",whatToDoNow:"Identify how many bars the decrease consumes, pull up one loop through them together, and check the loop count before the return pass.",steps:["Read how many stitches the decrease uses.","Insert through the stated bars together.","Yarn over and pull up one loop.","Continue the forward pass.","Count loops before the return pass."],checks:["Tunisian Decrease removes stitches from the count.","The expected count should include the decrease.","Do not skip an extra vertical bar after the decrease."],commonMistakes:["Skipping the next bar after decreasing.","Pulling through the wrong bars.","Making the decrease too tight."],relatedTechniqueIds:["tunisian-forward-pass","tunisian-vertical-bar","tunisian-tension-control"]},
  {id:"tunisian-bind-off",label:"Tunisian Bind Off",craft:"tunisian",category:"bind off",level:"beginner",aliases:["bind off","tunisian bind off"],stitchCountEffect:"decrease",quickAnswer:"For Tunisian bind off, work across the row with slip-stitch-like movements so the final loops are closed neatly.",whatToDoNow:"Bind off loosely through the correct bars so the top edge does not pull inward.",steps:["Insert into the next bar as the pattern states.","Yarn over and pull through the bar and the loop on the hook.","Repeat across the row.","Keep the edge relaxed.","Fasten off at the end."],checks:["Bind off closes live loops.","The edge should not be tighter than the fabric.","Use the pattern's bind-off placement if specified."],commonMistakes:["Binding off too tightly.","Skipping the edge stitch.","Changing stitch placement during bind off."],relatedTechniqueIds:["tunisian-edge-stitch","tunisian-tension-control"]}
];
const techniqueRelatedLabels={"crochet-weave-in-ends":"Weave In Ends","crochet-standing-stitch":"Standing Stitch","crochet-colour-change":"Colour Change","crochet-edge-placement":"Edge Stitch Placement","crochet-tension-control":"Tension Control","crochet-stitch-anatomy":"Crochet Stitch Anatomy","crochet-front-loop-only":"Front Loop Only","crochet-back-loop-only":"Back Loop Only","crochet-turning-chain":"Turning Chain","crochet-chain-space":"Work Into Chain Space","knitting-weave-in-ends":"Weave In Ends","knitting-tension-control":"Tension Control","knitting-stitch-anatomy":"Knitting Stitch Anatomy","knitting-yarn-over":"Yarn Over","knitting-k2tog":"Knit Two Together","knitting-ssk":"Slip Slip Knit","knitting-make-one-left":"Make One Left","knitting-make-one-right":"Make One Right","tunisian-forward-pass":"Forward Pass","tunisian-return-pass":"Return Pass","tunisian-edge-stitch":"Edge Stitch","tunisian-vertical-bar":"Work Into Vertical Bar","tunisian-tension-control":"Tension Control","tunisian-simple-stitch":"Tunisian Simple Stitch","tunisian-knit-stitch":"Tunisian Knit Stitch"};
function normalizeTechniqueSearch(value=""){return String(value||"").toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g," ").trim();}
function techniqueOptionsForCraft(craftType="crochet"){return techniqueGuideDatabase.filter(item=>item.craft===normalizeAssistantCraft(craftType)).sort((a,b)=>a.label.localeCompare(b.label));}
function findTechniqueGuide(selectedTechnique="",craftType="crochet"){
  const craft=normalizeAssistantCraft(craftType),query=normalizeTechniqueSearch(selectedTechnique);
  if(!query)return null;
  return techniqueGuideDatabase.find(item=>item.craft===craft&&(normalizeTechniqueSearch(item.id)===query||normalizeTechniqueSearch(item.label)===query||(item.aliases||[]).some(alias=>normalizeTechniqueSearch(alias)===query)))||
    techniqueGuideDatabase.find(item=>item.craft===craft&&(normalizeTechniqueSearch(item.label).includes(query)||query.includes(normalizeTechniqueSearch(item.label))||(item.aliases||[]).some(alias=>query.includes(normalizeTechniqueSearch(alias))||normalizeTechniqueSearch(alias).includes(query))));
}
function techniqueStitchCountMessage(guide,context={}){
  const name=guide?.label||titleCaseTechnique(context.selectedTechnique)||"Selected technique",row=context.currentRow?` Row ${context.currentRow}`:" this row",expected=context.expectedStitchCount;
  if(guide?.stitchCountEffect==="no-change")return expected?`${name} should not change your stitch count. You should still have ${expected} stitches at the end of${row}.`:`${name} should not change your stitch count. Count before and after to make sure it stays the same.`;
  if(guide?.stitchCountEffect==="increase")return expected?`${name} adds stitches. Check that${row} expects the extra stitch or stitches and finishes with ${expected}.`:`${name} adds stitches. Check that the expected count already includes the increase.`;
  if(guide?.stitchCountEffect==="decrease")return expected?`${name} removes stitches. Check that${row} expects the decrease and finishes with ${expected}.`:`${name} removes stitches. Check that the expected count already includes the decrease.`;
  if(guide?.stitchCountEffect==="depends")return `${name} may or may not change the stitch count depending on the pattern wording. Compare your count with the row instruction before continuing.`;
  return "Check the pattern's stitch count note before continuing.";
}
function craftSpecificTechniqueFallback(selectedTechnique="",craftType="crochet"){
  const name=titleCaseTechnique(selectedTechnique),craft=assistantCraftLabel(craftType);
  const steps={crochet:[`For ${name} in crochet, check hook placement before making the stitch.`,"Look for the stitch top, chain space, front loop, back loop, post, or turning chain named by the pattern.","Make one slow sample movement, then count the stitches produced.","Check that the row edge and tension still look even."],knitting:[`For ${name} in knitting, check needle insertion direction, stitch mount, yarn position, and row tension before continuing.`,"Identify the front leg and back leg of the next stitch.","Work one repeat slowly, watching whether the stitch increases, decreases, or keeps the count.","Count the stitches on the needle before moving on."],tunisian:[`For ${name} in Tunisian crochet, separate the Forward Pass from the Return Pass before judging the result.`,"Check the vertical bars and edge stitch.","Count loops on the hook after the Forward Pass.","Confirm whether the pattern counts a full row as both passes together."]}[craftType]||[];
  return {questionType:"stitchTechnique",techniqueName:name,techniqueCategory:"unknown",quickAnswer:`I do not have a full guide for ${name} yet, but here is safe ${craft} help.`,whatToDoNow:`Work one small sample of ${name}, then check placement, tension, and stitch count before continuing the project row.`,steps,checkBeforeContinuing:[techniqueStitchCountMessage({label:name,stitchCountEffect:"unknown"},{selectedTechnique:name}),"If the pattern wording is unclear, stop at the end of the row before undoing anything."],commonMistakes:["Working from memory instead of the pattern wording.","Changing stitch count without checking the expected count.","Tightening the yarn while trying an unfamiliar movement."],relatedTechniques:["Stitch Anatomy","Practice Swatch","Tension Control"],libraryLinks:[{title:"Technique Basics",target:"library:technique-basics"},{title:"Practice Swatch",target:"library:practice-swatch"}],sourceType:"local-rule-based"};
}
function buildTechniqueHelp({selectedTechnique="",craftType="crochet",context={}}={}){
  const craft=normalizeAssistantCraft(craftType),chosen=String(selectedTechnique||context.selectedTechnique||"").trim();
  if(!chosen)return {questionType:"stitchTechnique",techniqueName:"Choose a technique first",quickAnswer:"Choose a technique first so Yarncha can give specific help.",whatToDoNow:"Pick from current row techniques, search by abbreviation, search by stitch name, open Stitch Anatomy, or open Practice Swatch.",steps:["Choose a technique from the Technique Help selector.","If it is from the current row, paste or select the row instruction too.","Ask Yarncha again with the technique selected.","Count before continuing if the technique might change stitch count."],checkBeforeContinuing:["Do not continue from a vague instruction if you are unsure where the hook or needle goes.","If your stitch count is already off, fix the count before learning the next movement."],commonMistakes:["Trying to follow help before choosing the actual technique.","Mixing crochet, knitting, and Tunisian terms.","Skipping the row instruction that tells you where the technique happens."],relatedTechniques:["Stitch Anatomy","Practice Swatch","Search by Abbreviation","Search by Stitch Name"],libraryLinks:[{title:"Stitch Anatomy",target:"library:stitch-anatomy"},{title:"Practice Swatch",target:"library:practice-swatch"}],sourceType:"local-rule-based"};
  const guide=findTechniqueGuide(chosen,craft);
  if(!guide)return craftSpecificTechniqueFallback(chosen,craft);
  const countCheck=techniqueStitchCountMessage(guide,context);
  return {questionType:"stitchTechnique",techniqueName:guide.label,techniqueCategory:guide.category,techniqueLevel:guide.level,shortMeaning:guide.shortMeaning,quickAnswer:`${guide.quickAnswer} ${countCheck}`,whatToDoNow:guide.whatToDoNow,steps:guide.steps,checkBeforeContinuing:[countCheck,...(guide.checks||[])].slice(0,4),commonMistakes:guide.commonMistakes,relatedTechniques:(guide.relatedTechniqueIds||[]).map(id=>techniqueRelatedLabels[id]||techniqueGuideDatabase.find(item=>item.id===id)?.label||titleCaseTechnique(id)),libraryLinks:[{title:guide.label,target:`library:${guide.id}`},...((guide.relatedTechniqueIds||[]).slice(0,3).map(id=>({title:techniqueRelatedLabels[id]||titleCaseTechnique(id),target:`library:${id}`})))],sourceType:"local-rule-based"};
}
const teachingService={
  style(skillLevel){
    if(skillLevel==="advanced")return "technical";
    if(skillLevel==="intermediate")return "direct";
    return "gentle";
  },
  explainSymbol(symbol="",craftType="knitting",skillLevel="beginner",context={}){
    const craft=assistantCraftLabel(craftType),mark=symbol||context.currentSymbol||"this symbol";
    const likely=craftType==="crochet"?"a circle often means chain, a tall T-shaped mark often means a taller stitch, and a slash may mean a post or decrease mark":craftType==="tunisian"?"a vertical mark often points to a vertical bar stitch, while return-pass marks may be shown separately":"a circle often means yarn over, a slash often means a decrease, and a blank square often means knit on right-side rows";
    return {questionType:"symbolMeaning",quickAnswer:`${mark} needs the pattern legend first because chart symbols are not universal. In ${craft}, ${likely}.`,whatToDoNow:`Open the chart legend and compare ${mark} with the designer's key. If Yarncha has selected the wrong mark, tap or zoom the exact symbol before you continue.`,steps:[`Check the legend printed with this pattern before using a general symbol meaning.`,`Confirm whether the current row is worked as ${craftType==="tunisian"?"a forward pass or return pass":craftType==="crochet"?"a row, round, or motif round":"a right-side or wrong-side row"}.`,context.currentRow?`Because you are on Row ${context.currentRow}, check this symbol only in that row before moving ahead.`:"If no row is selected, choose the row or zoom the chart so the symbol can be read clearly.",`If the legend is missing, compare nearby repeats and look for the same symbol used in a familiar stitch pattern.`],commonMistakes:["Assuming a symbol means the same thing in every pattern.","Reading a right-side chart symbol the same way on wrong-side rows when the legend says otherwise.","Ignoring designer notes that override standard chart symbols."],relatedTechniques:["chart legends","symbol reading","row direction"],libraryLinks:[{title:"Chart Symbol Guide",target:"library:symbol-guide"},{title:"Pattern Legend Guide",target:"library:pattern-legend-guide"}]};
  },
  explainAbbreviation(abbreviation="",craftType="knitting",skillLevel="beginner",context={}){
    const clean=String(abbreviation||"").trim().toLowerCase();
    const terms={
      knitting:{k2tog:["knit two together","right-leaning decrease","turns 2 stitches into 1, so the stitch count decreases by 1","insert the right needle through the next two stitches together, knit them as one stitch"],ssk:["slip, slip, knit","left-leaning decrease","turns 2 stitches into 1, so the stitch count decreases by 1","slip two stitches knitwise one at a time, return them to the left needle, then knit them together through the back loops"],yo:["yarn over","increase and eyelet","adds 1 stitch","bring the yarn over the needle before working the next stitch"],pm:["place marker","marker instruction","does not change stitch count","put a stitch marker on the needle at this point"]},
      crochet:{sc:["single crochet","basic crochet stitch","usually keeps stitch count the same unless worked as an increase or decrease","insert hook, yarn over, pull up a loop, yarn over and pull through both loops"],dc:["double crochet","tall crochet stitch","usually keeps stitch count the same","yarn over, insert hook, pull up a loop, yarn over through two loops twice"],ch:["chain","foundation or spacer stitch","adds a chain; it may or may not count as a stitch depending on the pattern","yarn over and pull through the loop on your hook"],"sl st":["slip stitch","joining or moving stitch","usually keeps stitch count the same","insert hook, yarn over, pull through the stitch and the loop on your hook"],slst:["slip stitch","joining or moving stitch","usually keeps stitch count the same","insert hook, yarn over, pull through the stitch and the loop on your hook"]},
      tunisian:{tss:["Tunisian simple stitch","basic Tunisian stitch","keeps one loop per stitch on the forward pass","insert hook under the front vertical bar, yarn over, pull up a loop"],tks:["Tunisian knit stitch","Tunisian stitch that looks knitted","keeps one loop per stitch on the forward pass","insert hook between the front and back vertical bars, yarn over, pull up a loop"],"return pass":["return pass","the pass that works loops off the hook","reduces loops on hook back to one working loop","yarn over and pull through one loop first, then yarn over and pull through two loops repeatedly"]}
    };
    const key=clean.replace(/\s+/g," ");
    const hit=terms[craftType]?.[key]||terms[craftType]?.[key.replace(/\s/g,"")];
    const label=abbreviation||"the abbreviation";
    return {questionType:"abbreviation",quickAnswer:hit?`${label} means ${hit[0]}. It is a ${hit[1]} in ${assistantCraftLabel(craftType)}.`:`${label} is a ${assistantCraftLabel(craftType)} abbreviation, but this pattern's abbreviation list should confirm the exact meaning.`,whatToDoNow:hit?`Before you work it, note the stitch-count effect: it ${hit[2]}. Then work it once slowly and count the result.`:`Find the abbreviation list in the pattern, then check whether the term increases, decreases, or keeps the stitch count the same.`,steps:hit?[`Full name: ${hit[0]}.`,`Craft type: ${assistantCraftLabel(craftType)}.`,`Stitch-count effect: ${hit[2]}.`,`How to do it: ${hit[3]}.`,context.currentRow?`On Row ${context.currentRow}, count again after this abbreviation if the row also has repeats.`:"If it appears inside brackets, count it as part of each repeat."]:["Look for the pattern abbreviation list or designer notes.","Check whether the pattern uses US or UK crochet terms if this is crochet.","Read the whole row before making the stitch.","Count before and after the row if the abbreviation changes stitch count."],commonMistakes:["Mixing US and UK crochet terms.","Missing whether an abbreviation sits inside a repeated bracket.","Forgetting that decreases reduce stitch count and yarn overs or increases add stitches."],relatedTechniques:["abbreviations","stitch count changes","pattern reading"],libraryLinks:[{title:"Abbreviation Guide",target:"library:abbreviation-guide"},{title:"Reading Patterns",target:"library:reading-patterns"}]};
  },
  explainTechnique(technique="",craftType="knitting",skillLevel="beginner",context={}){
    return buildTechniqueHelp({selectedTechnique:context.selectedTechnique||technique,craftType,context});
  },
  explainPatternLine(patternLine="",craftType="knitting",skillLevel="beginner",context={}){
    const line=patternLine||context.rowInstruction||"";
    return {questionType:context.currentRow?"rowInstruction":"patternReading",quickAnswer:line?`Read this row in pieces: first the stitches before any bracket, then the repeated section, then the stitches after the repeat.`:"I can help, but I need the exact row or pattern line to be precise.",whatToDoNow:line?`Mark the repeat section now. If you are on Row ${context.currentRow||"this row"}, work one repeat, count it, then repeat only the stated number of times.`:"Paste the row instruction or select the current row. For now, look for brackets, commas, repeat counts, and the final stitch count.",steps:[context.currentRow?`Read only Row ${context.currentRow} first; ignore the next row until this one is complete.`:"Read one instruction line at a time.","Circle or identify everything before the first bracket or asterisk.","Mark the repeated section and count how many stitches one repeat uses.","Work the bracketed section the required number of times.","Work any stitches after the repeat, then check the stitch count before continuing."],commonMistakes:["Repeating stitches that sit outside the brackets.","Missing an “at the same time” instruction.","Working a wrong-side row in the right-side direction.","Skipping the final stitches after a repeat."],relatedTechniques:["reading repeats","row tracking","stitch counts"],libraryLinks:[{title:"Reading Repeats",target:"library:reading-repeats"},{title:"Reading Patterns",target:"library:reading-patterns"}]};
  }
};
const troubleshootingService={
  troubleshootStitchCount(context={},skillLevel="beginner",craftType="knitting"){
    const expected=context.expectedStitchCount?` Yarncha sees an expected count around ${context.expectedStitchCount}.`:" I need the pattern's expected stitch count to be exact.";
    const terms={knitting:["needle","row","k2tog","ssk","yo","increase","decrease","stitch marker","tink back"],crochet:["hook","round","turning chain","skipped stitch","accidental increase","stitch marker","frog back"],tunisian:["hook","forward pass","return pass","vertical bars","edge stitch","loops on hook","frog back"]}[craftType]||[];
    return {questionType:"stitchCountProblem",quickAnswer:`Your stitch count is usually off because a repeat was missed or doubled, or an increase/decrease was counted incorrectly.${expected}`,whatToDoNow:context.currentRow?`Stop at the end of Row ${context.currentRow} if possible. Count the stitches now, compare with the expected count, then check each repeat before moving to Row ${Number(context.currentRow)+1}.`:"Stop at the end of the current row or round if possible. Count your stitches now, then compare with the pattern's expected count.",steps:[`Keep the work on your ${terms[0]||"tool"} and count every stitch or loop without stretching the fabric.`,`Write down your current count and the expected count from the pattern.`,`Place ${terms.includes("stitch marker")?"stitch markers":"markers"} between repeats or every 10 stitches.`,`Check the row for ${craftType==="knitting"?"k2tog, ssk, yo, increases, and decreases":craftType==="crochet"?"turning chains, skipped stitches, accidental increases, and decreases":"forward-pass loops, return-pass decreases, vertical bars, and the edge stitch"}.`,`If one repeat is wrong, undo only that repeat or section if you can see it clearly.`,`If the whole row is wrong or the mistake is hidden, ${craftType==="knitting"?"tink back":"frog back"} slowly to the last correct count.`],commonMistakes:craftType==="knitting"?["Forgetting that k2tog and ssk each decrease by 1 stitch.","Forgetting that yo adds 1 stitch.","Missing the last stitch after a repeat.","Repeating a bracket section too many or too few times."]:craftType==="crochet"?["Counting the turning chain when the pattern says it does not count.","Skipping the first or last stitch of the row.","Adding two stitches into one space by accident.","Missing a decrease that should turn two stitches into one."]:["Missing the last edge stitch on the forward pass.","Dropping a loop before the return pass.","Counting return-pass chain loops as extra stitches.","Skipping a vertical bar inside a repeat."],relatedTechniques:["stitch count troubleshooting","increases and decreases","reading repeats"],libraryLinks:[{title:"Stitch Count Troubleshooting",target:"library:stitch-count-troubleshooting"},{title:"Increases and Decreases",target:"library:increases-decreases"},{title:"Reading Repeats",target:"library:reading-repeats"}]};
  },
  troubleshootDroppedStitch(context={},skillLevel="beginner",craftType="knitting"){
    if(craftType==="crochet")return {questionType:"droppedStitch",quickAnswer:"Crochet usually does not drop stitches like knitting. The problem is more often a missed stitch, loose loop, undone stitch, or skipped stitch.",whatToDoNow:"Put a stitch marker in the loose loop, count the current row, and compare the stitch placement with the previous row before pulling anything out.",steps:["Find the loose loop or gap and secure it with a marker.","Count the stitches before and after the gap.","Check whether the turning chain counts as a stitch in this pattern.","If one stitch was missed, undo back to that point and rework it into the correct stitch or space.","If only the loop is loose, gently redistribute the extra yarn into nearby stitches."],commonMistakes:["Mistaking a skipped stitch for a dropped stitch.","Pulling the loose loop until nearby stitches tighten.","Forgetting whether the turning chain counts."],relatedTechniques:["crochet mistakes","missed stitches","turning chains"],libraryLinks:[{title:"Crochet Mistakes",target:"library:crochet-mistakes"},{title:"Fixing Mistakes",target:"library:fixing-mistakes"}]};
    if(craftType==="tunisian")return {questionType:"droppedStitch",quickAnswer:"In Tunisian crochet, this is usually a missed loop on the forward pass or a loose vertical bar rather than a knitting-style dropped stitch.",whatToDoNow:"Secure the loose loop, check the vertical bars in that column, and decide whether the row can be repaired or needs to be frogged back.",steps:["Do not pull the fabric.","Catch the loose loop or vertical bar with a hook or marker.","Trace the column upward and check whether one forward-pass loop was missed.","If the loop can be lifted, pull the correct strand through and keep the edge stitch intact.","If the return pass locked the mistake in place, frog back to the missed loop and rework the forward pass."],commonMistakes:["Missing the edge stitch.","Confusing return-pass chains with forward-pass loops.","Pulling a vertical bar too tight after repair."],relatedTechniques:["Tunisian mistakes","vertical bars","forward pass"],libraryLinks:[{title:"Tunisian Mistakes",target:"library:tunisian-mistakes"},{title:"Fixing Mistakes",target:"library:fixing-mistakes"}]};
    return {questionType:"droppedStitch",quickAnswer:"Do not pull the fabric. Secure the dropped stitch first, then ladder it back up one row at a time with a crochet hook.",whatToDoNow:"Put a locking stitch marker or crochet hook through the dropped loop right now so it cannot fall farther.",steps:["Do not stretch or tug the fabric.","Secure the dropped stitch with a stitch marker, safety pin, or crochet hook.","Find the horizontal ladder bars above the dropped stitch.","Use the crochet hook to pull the lowest ladder bar through the dropped stitch.","Repeat one ladder bar at a time, moving upward row by row.","Place the rescued stitch back on the needle facing the correct direction.","Knit slowly across that area and check that the stitch is not twisted."],commonMistakes:["Pulling the fabric and making the drop travel farther.","Skipping one ladder bar while repairing.","Putting the rescued stitch back on the needle twisted."],relatedTechniques:["fixing dropped stitches","knitting mistakes","stitch orientation"],libraryLinks:[{title:"Fixing Dropped Stitches",target:"library:fixing-dropped-stitches"},{title:"Knitting Mistakes",target:"library:knitting-mistakes"}]};
  },
  troubleshootGaugeIssue(context={},skillLevel="beginner"){
    return {questionType:"gaugeProblem",quickAnswer:"Gauge problems usually come from stitch tension, row tension, yarn weight, fibre behaviour, hook or needle size, or blocking.",whatToDoNow:"Measure stitches and rows across 10 cm before changing the project. If stitch gauge is too wide, try a smaller tool; if too narrow, try a larger tool.",steps:["Lay the fabric flat without stretching it.","Count stitches across 10 cm or 4 in.","Count rows across 10 cm or 4 in.","Compare both numbers with the pattern gauge.","Check yarn weight, fibre content, and hook or needle size.","Block a swatch if the pattern gauge is measured after blocking."],commonMistakes:["Measuring across too few stitches.","Checking stitch gauge but ignoring row gauge.","Comparing unblocked fabric to blocked pattern measurements."],relatedTechniques:["gauge","swatching","blocking"],libraryLinks:[{title:"Gauge & Swatch Basics",target:"library:gauge-swatch-basics"},{title:"Blocking Guide",target:"library:blocking-guide"},{title:"Yarn Substitution",target:"library:yarn-substitution"}]};
  },
  troubleshootProjectLooksDifferent(context={},skillLevel="beginner"){
    return {questionType:"projectLooksDifferent",quickAnswer:"A project can look different because of gauge, yarn weight, fibre, tool size, tension, blocking, stitch count, row count, or reading right-side/wrong-side rows incorrectly.",whatToDoNow:"Check gauge and counts before assuming the pattern is wrong. Measure 10 cm, count stitches and rows, then compare your yarn and tool size with the pattern.",steps:["Measure your stitch gauge across 10 cm.","Measure your row gauge across 10 cm.","Compare both with the pattern gauge.","Check yarn weight, fibre content, hook or needle size, and whether your yarn has similar drape.","Count stitches and rows in the section that looks wrong.","Check whether the pattern is asking for right side or wrong side, and whether increases or decreases are placed correctly.","Block or gently smooth a swatch before judging the final look."],commonMistakes:["Expecting the first few rows to look like the finished photo.","Using a yarn substitution with very different drape.","Missing increases or decreases that shape the project.","Reading wrong-side chart rows in the wrong direction."],relatedTechniques:["gauge","blocking","yarn substitution"],libraryLinks:[{title:"Gauge & Swatch Basics",target:"library:gauge-swatch-basics"},{title:"Blocking Guide",target:"library:blocking-guide"},{title:"Yarn Substitution",target:"library:yarn-substitution"}]};
  }
};
const yarnchaAssistantService={
  classifyQuestion(question=""){
    const lower=String(question||"").toLowerCase();
    if(/symbol|chart mark|legend|circle|slash|\/|what is this mark/.test(lower))return "symbolMeaning";
    if(/dropped|drop(ped)? stitch|ladder|fell down|loose loop/.test(lower))return "droppedStitch";
    if(/stitch count|row count|lost count|extra stitch|too many|too few|should have|have \d+ stitches|wrong count/.test(lower))return "stitchCountProblem";
    if(/abbrev|abbreviation|what does\b|k2tog|ssk|yo\b|sc\b|dc\b|tss\b|pm\b|sl st|slst/.test(lower))return "abbreviation";
    if(/gauge|swatch|too tight|too loose/.test(lower))return "gaugeProblem";
    if(/look different|doesn.t look|too wide|too narrow|too big|too small|shape weird|different from the photo/.test(lower))return "projectLooksDifferent";
    if(/read.*pattern|repeat|bracket|\*|row \d+|this row|instruction|pattern line|what should i do on row/.test(lower))return "patternReading";
    if(/how do i|technique|stitch|make|work/.test(lower))return "stitchTechnique";
    return "generalQuestion";
  },
  extractAbbreviation(question=""){
    const lower=String(question||"").toLowerCase();
    const match=lower.match(/\b(k2tog|ssk|yo|m1|pm|sc|dc|hdc|ch|sl\s?st|tss|tks|return pass)\b/);
    if(match)return match[1].replace("slst","sl st");
    return String(question||"").replace(/what does|mean|abbreviation|\?|in knitting|in crochet|in tunisian/gi,"").trim().split(/\s+/).slice(0,3).join(" ");
  },
  contextNote(projectContext={}){
    const bits=[];
    if(projectContext.projectName)bits.push(`Project: ${projectContext.projectName}`);
    if(projectContext.craftType)bits.push(`Craft: ${assistantCraftLabel(projectContext.craftType)}`);
    if(projectContext.currentRow)bits.push(`Current row: ${projectContext.currentRow}`);
    if(projectContext.expectedStitchCount)bits.push(`Expected stitch count: ${projectContext.expectedStitchCount}`);
    if(projectContext.subCounters?.length)bits.push(`Sub counters: ${assistantSubCounterSummary(projectContext.subCounters)}`);
    return bits.join(" · ");
  },
  diagnosticContext(projectContext={},question=""){
    const q=String(question||"").toLowerCase();
    const wanted=[
      ["craftType","craft type"],
      ["projectName","project name"],
      ["projectType","project type"],
      ["yarnWeight","yarn weight"],
      ["fibreContent","fibre content"],
      ["toolSize","hook or needle size"],
      ["patternGauge","pattern gauge"],
      ["userGauge","your gauge"],
      ["currentRow","current row/round"],
      ["expectedStitchCount","expected stitch count"],
      ["targetMeasurement","target measurement"],
      ["currentMeasurement","current measurement"],
      ["skillLevel","user skill level"],
      ["blockedState","blocked or unblocked state"]
    ];
    const missing=wanted.filter(([key])=>!projectContext[key]).map(([,label])=>label);
    if(/chart|symbol|row|pattern/.test(q)&&!projectContext.currentChart)missing.push("uploaded pattern/chart context");
    if(/measure|fit|size|sleeve|garment|hat|sock/.test(q)&&!projectContext.measurements)missing.push("measurements");
    const assumptions=[];
    if(projectContext.craftType)assumptions.push(`Using ${assistantCraftLabel(projectContext.craftType)} terminology.`);
    else assumptions.push("Giving general craft advice because craft type is missing.");
    if(!projectContext.rowInstruction)assumptions.push("No exact pattern row was provided, so guidance stays general.");
    return {missingInformation:[...new Set(missing)].slice(0,8),assumptions};
  },
  async askYarnchaAssistant({question="",projectContext={},skillLevel="beginner",craftType="knitting"}={}){
    const q=String(question||"").trim(),lower=q.toLowerCase();
    learningMemoryService.saveFrequentQuestion(q);
    const inferredTechnique=findTechniqueGuide(q,craftType)?.label||"";
    const context={...projectContext,craftType,selectedTechnique:projectContext.selectedTechnique||inferredTechnique};
    let questionType=this.classifyQuestion(q);
    if(/sub.?counter|counter|repeat counter|cable repeat|lace repeat|increase counter|next increase/i.test(q)){
      const summary=assistantSubCounterSummary(context.subCounters);
      const diagnostic=this.diagnosticContext(context,q);
      return {questionType:"counterStatus",quickAnswer:summary,whatToDoNow:context.subCounters?.length?"Use the Sub Row Counters panel under the chart row counter to adjust, pause, duplicate, or edit these counters while reading.":"Add a Sub Row Counter below the chart row counter, then Yarncha can reference it while you read.",generalLibraryAdvice:"Counters are a tracking aid; they do not replace the pattern's repeat instructions.",projectSpecificAdvice:context.subCounters?.length?`Your current counter context: ${summary}`:"No project counter is active yet.",assumptions:diagnostic.assumptions,missingInformation:diagnostic.missingInformation,steps:(context.subCounters||[]).map(counter=>counter.nextIn!==null?`${counter.name}: current count ${counter.count}; next update in ${counter.nextIn} row${counter.nextIn===1?"":"s"}.`:`${counter.name}: current count ${counter.count}.`),checkBeforeContinuing:["Make sure the counter anchor row matches where that section begins.","Use manual + or - if you intentionally adjust the repeat count.","If the pattern has an 8-row repeat, set Update every X rows to 8 so Flow Mode has a better hint."],commonMistakes:["Starting a sleeve or neckline counter too early.","Forgetting to set an anchor row for shaping that begins later.","Using a voice reminder on backward row movement; Yarncha only speaks these while moving forward."],relatedTechniques:["row tracking","reading repeats","chart reading"],libraryLinks:[{title:"Reading Repeats",target:"library:reading-repeats"}],contextNote:this.contextNote(context),confidence:"medium",sourceType:"local-rule-based"};
    }
    if(context.selectedTechnique&&(questionType==="generalQuestion"||questionType==="stitchTechnique"))questionType="stitchTechnique";
    if(context.selectedTechnique&&/selected technique|technique help|help me with|how do i work|how do i do/i.test(q))questionType="stitchTechnique";
    const base=questionType==="stitchCountProblem"?troubleshootingService.troubleshootStitchCount(context,skillLevel,craftType):questionType==="droppedStitch"?troubleshootingService.troubleshootDroppedStitch(context,skillLevel,craftType):questionType==="symbolMeaning"?teachingService.explainSymbol(context.currentSymbol||"this symbol",craftType,skillLevel,context):questionType==="abbreviation"?teachingService.explainAbbreviation(this.extractAbbreviation(q),craftType,skillLevel,context):questionType==="patternReading"||questionType==="rowInstruction"?teachingService.explainPatternLine(context.rowInstruction,craftType,skillLevel,context):questionType==="gaugeProblem"?troubleshootingService.troubleshootGaugeIssue(context,skillLevel):questionType==="projectLooksDifferent"?troubleshootingService.troubleshootProjectLooksDifferent(context,skillLevel):teachingService.explainTechnique(context.selectedTechnique,craftType,skillLevel,context);
    const missing=!context.rowInstruction&&/(row|instruction|pattern line|repeat)/i.test(q)?"I need the exact pattern line to be exact. ":!context.expectedStitchCount&&/count|stitch/i.test(q)?"I need the pattern's expected stitch count to be exact. ":"";
    const checkBeforeContinuing=base.checkBeforeContinuing||[context.expectedStitchCount?"Compare your current stitch count with the expected stitch count.":"Check the pattern notes for the expected stitch count or row count.",context.rowInstruction?"Read the current row instruction once more before moving on.":"Paste or select the exact row if you want Yarncha to be more precise.","If the fabric looks wrong, stop at the end of the row or round before undoing anything."];
    const approvedEntries=findLibraryEntriesForAssistant(q,craftType,3);
    const diagnostic=this.diagnosticContext(context,q);
    const libraryLinks=[...(base.libraryLinks||[]),...approvedEntries.map(entry=>({title:entry.title,target:`library:${entry.id}`}))].filter((link,index,all)=>all.findIndex(item=>item.target===link.target)===index);
    const relatedTools=[...(base.relatedTools||[]),...approvedEntries.flatMap(entry=>entry.relatedTools||[])].filter((tool,index,all)=>all.indexOf(tool)===index).slice(0,5);
    return {...base,questionType,contextNote:this.contextNote(context),generalLibraryAdvice:base.quickAnswer||"Use the Library guide as general technique help first.",projectSpecificAdvice:context.projectName?`For ${context.projectName}, check the current row, count, gauge, yarn, and measurement notes before changing the work.`:"Project-specific advice needs more project details before Yarncha can be exact.",assumptions:diagnostic.assumptions,missingInformation:diagnostic.missingInformation,whatToDoNow:`${missing}${base.whatToDoNow||"Start by checking the exact stitch, row, or symbol involved, then compare it with the pattern notes."}`,checkBeforeContinuing,libraryLinks,relatedTools,approvedLibraryEntries:approvedEntries.map(entry=>entry.title),confidence:context.currentRow||context.rowInstruction||context.currentSymbol?"medium":"general",sourceType:"local-library-rule-based"};
  }
};
function yarnchaAssistantAnswerHtml(answer){
  if(!answer)return `<div class="empty-state">Ask Yarncha Assistant for stitch, symbol, pattern, or mistake help.</div>`;
  const labels=techniqueHelpLabels.en;
  const list=(title,items,extraClass="")=>items?.length?`<section class="${extraClass}"><h4>${title}</h4><ul>${items.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`:"";
  const related=answer.relatedTechniques?.length?`<section><h4>${labels.relatedTechniques}</h4><div class="assistant-library-links">${answer.relatedTechniques.map(label=>`<button class="chip" data-library-link="library:${escapeHtml(label)}">${escapeHtml(label)}</button>`).join("")}</div></section>`:"";
  const tools=answer.relatedTools?.length?`<section><h4>Related tools</h4><div class="assistant-library-links">${answer.relatedTools.map(tool=>`<button class="chip" data-assistant-tool="${escapeHtml(tool)}">${escapeHtml(tool)}</button>`).join("")}</div></section>`:"";
  const basedOn=answer.approvedLibraryEntries?.length?`Based on: ${answer.approvedLibraryEntries.join(", ")}.`:"Based on: Yarncha local guide rules.";
  return `<article class="yarncha-assistant-answer">${answer.contextNote?`<section class="assistant-project-context"><h4>${labels.projectContext}</h4><p>${escapeHtml(answer.contextNote)}</p></section>`:""}${answer.techniqueName?`<section class="assistant-technique-card"><h4>${labels.technique}</h4><p>${escapeHtml(answer.techniqueName)}${answer.techniqueCategory?` · ${escapeHtml(titleCaseTechnique(answer.techniqueCategory))}`:""}</p></section>`:""}<section><h4>${labels.quickAnswer}</h4><p>${escapeHtml(answer.quickAnswer||"")}</p></section>${answer.generalLibraryAdvice?`<section><h4>General Library advice</h4><p>${escapeHtml(answer.generalLibraryAdvice)}</p></section>`:""}${answer.projectSpecificAdvice?`<section><h4>Project-specific advice</h4><p>${escapeHtml(answer.projectSpecificAdvice)}</p></section>`:""}<section><h4>${labels.whatToDoNow}</h4><p>${escapeHtml(answer.whatToDoNow||"")}</p></section>${answer.assumptions?.length?list("Assumptions",answer.assumptions):""}${answer.missingInformation?.length?list("Missing information",answer.missingInformation,"assistant-count-check"):""}${answer.steps?.length?`<details class="assistant-step-accordion" open><summary>${labels.stepByStep}</summary><ol>${answer.steps.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ol></details>`:""}${list(labels.checkBeforeContinuing,answer.checkBeforeContinuing,"assistant-count-check")}${list(labels.commonMistakes,answer.commonMistakes)}${related}${tools}<section><h4>Library links</h4><div class="assistant-library-links">${(answer.libraryLinks||[]).map(link=>`<button class="chip" data-library-link="${escapeHtml(link.target)}">${escapeHtml(link.title)}</button>`).join("")}</div></section><p class="assistant-source-note">${escapeHtml(basedOn)} ${escapeHtml(answer.questionType||"generalQuestion")} · ${escapeHtml(answer.sourceType||"local-rule-based")} · confidence ${escapeHtml(answer.confidence||"general")}</p></article>`;
}
function yarnchaAssistantChartHtml(p){
  const assistant=p.yarnchaAssistant||{},context=projectContextService.getCurrentProjectContext(),skill=normalizeAssistantSkill(assistant.skillLevel||context.skillLevel),craft=normalizeAssistantCraft(assistant.craftType||context.craftType),answer=assistant.lastAnswer;
  const contextText=context.currentRow?`Using row ${context.currentRow} context`:(context.currentChart?"Using current chart":"No chart context available");
  const selectedTechnique=assistant.selectedTechnique||"",techniqueOptions=techniqueOptionsForCraft(craft);
  const suggestions=["My stitch count is wrong","Explain this symbol","Help me read this row","Fix a dropped stitch","What does this abbreviation mean?","Why does my project look different?"];
  return `<section class="yarncha-assistant-panel card workspace-card">
    <div class="section-heading compact-row"><div><p class="eyebrow">YARNCHA ASSISTANT</p><h2>Yarncha Assistant</h2><p>Ask for help with stitches, symbols, patterns, and mistakes.</p></div><span class="assistant-context-pill">${escapeHtml(contextText)}</span></div>
    <div class="assistant-control-grid">
      <label class="field">Craft type<select id="chart-assistant-craft">${["knitting","crochet","tunisian"].map(value=>`<option value="${value}" ${craft===value?"selected":""}>${assistantCraftLabel(value)}</option>`).join("")}</select></label>
      <label class="field">Skill level<select id="chart-assistant-skill">${["beginner","intermediate","advanced"].map(value=>`<option value="${value}" ${skill===value?"selected":""}>${value[0].toUpperCase()+value.slice(1)}</option>`).join("")}</select></label>
      <label class="field full">Technique Help<select id="chart-assistant-technique"><option value="">Choose a technique first</option>${techniqueOptions.map(item=>`<option value="${escapeHtml(item.label)}" ${selectedTechnique===item.label?"selected":""}>${escapeHtml(item.label)} · ${escapeHtml(titleCaseTechnique(item.category))}</option>`).join("")}</select></label>
    </div>
    <div class="assistant-suggestion-row">${suggestions.map(text=>`<button class="chip" data-assistant-suggestion="${escapeHtml(text)}">${escapeHtml(text)}</button>`).join("")}</div>
    <div class="assistant-ask-row"><textarea id="chart-assistant-question" rows="3" placeholder="Ask about a stitch, symbol, row, mistake, or pattern line...">${escapeHtml(assistant.draftQuestion||"")}</textarea><button class="primary-button" id="ask-chart-assistant">Ask</button></div>
    <div id="chart-assistant-answer" aria-live="polite">${yarnchaAssistantAnswerHtml(answer)}</div>
    <div class="assistant-memory-actions"><button class="mini-button" data-assistant-memory="save-explanation">Save explanation</button><button class="mini-button" data-assistant-memory="add-notes">Add to project notes</button><button class="mini-button" data-assistant-memory="add-checklist">Add checklist</button><button class="mini-button" data-assistant-memory="save-troubleshooting">Save troubleshooting</button><button class="mini-button" data-assistant-memory="create-calculator-input">Create calculator input</button><button class="mini-button" data-assistant-memory="link-library">Link Library entries</button><button class="mini-button" data-assistant-memory="remember-correction">Remember correction</button><button class="mini-button" data-assistant-memory="verify-symbol">Mark symbol as verified</button></div>
  </section>`;
}

function projectProjectHtml(p){
  return `<div class="project-info-grid">
    ${projectSetupPanelHtml(p,{context:"project"})}
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
  return `<div class="assistant-tab-grid">${yarnchaAssistantChartHtml(p)}${projectAssistantHtml(p)}<div class="card mobile-card"><p class="eyebrow">BETA SAFETY</p><h2>Chart reader</h2><p>Flow Mode stays focused on chart reading, row highlighting, progress tracking, and read-aloud row help. Yarncha Assistant is the separate teaching and troubleshooting space.</p><p>The assistant can use your uploaded text, project notes, and personal symbol references, but it should never guess an unclear symbol.</p></div></div>`;
}
function themeLabel(t){return themePresets.find(theme=>theme.id===normalizeThemeName(t))?.name||t;}
function themeComparePreviewHtml(theme){
  const d=theme.dark;
  return `<article class="theme-compare-card" aria-label="${escapeHtml(theme.name)} light and dark preview">
    <div class="theme-compare-pane light" style="--pane-bg:${theme.background};--pane-card:${theme.card};--pane-text:${theme.text};--pane-muted:${theme.button};--pane-button:${theme.button};--pane-button-text:${theme.buttonText||"#fff"};--pane-secondary:${theme.secondary};--pane-highlight:${theme.highlight};">
      <div class="theme-compare-surface"><b></b><b></b><b></b><b></b><b></b></div>
    </div>
    <div class="theme-compare-pane dark" style="--pane-bg:${d.background};--pane-card:${d.card};--pane-text:${d.text};--pane-muted:${d.highlight};--pane-button:${d.button};--pane-button-text:${d.buttonText||"#11130f"};--pane-secondary:${d.secondary};--pane-highlight:${d.highlight};">
      <div class="theme-compare-surface"><b></b><b></b><b></b><b></b><b></b></div>
    </div>
  </article>`;
}
function themeGalleryCardHtml(t,activeTheme,index=0){
  const swatches=[t.colors.primary,t.colors.secondary,t.colors.accent,t.colors.chartCurrentRow,t.colors.background];
  const active=activeTheme===t.id;
  return `<article class="theme-preview-card ${active?"active":""}" data-theme-card="${t.id}" role="button" tabindex="0" aria-pressed="${active}" aria-label="Choose ${escapeHtml(t.name)} theme" style="--preview-primary:${t.primary};--preview-secondary:${t.secondary};--preview-accent:${t.accent};--preview-bg:${t.background};--preview-card:${t.card};--preview-surface:${t.surface};--preview-text:${t.text};--preview-button:${t.button};--preview-button-text:${t.buttonText};--preview-highlight:${t.highlight};">
    <div class="theme-card-meta"><span class="theme-number">Theme ${String(index+1).padStart(2,"0")}</span>${active?`<span class="theme-active-badge" aria-label="Current Theme">✓ Active</span>`:""}</div>
    <div class="theme-preview-surface" aria-hidden="true"><i></i><b></b><em></em><span></span><strong></strong></div>
    <div class="theme-card-copy"><h4>${escapeHtml(t.name)}${t.badge?` <small>${escapeHtml(t.badge)}</small>`:(t.recommended?` <small>Default</small>`:"")}</h4><p>${escapeHtml(t.description)}</p></div>
    <div class="swatch-row" aria-hidden="true">${swatches.map(color=>`<em style="background:${color}"></em>`).join("")}</div>
  </article>`;
}
function styleLabel(s){return designStyles.find(style=>style.id===normalizeDesignStyle(s))?.name||s;}
function designStyleCardHtml(style,activeStyle){
  const active=activeStyle===style.id;
  return `<button class="style-preview-card ${escapeHtml(style.id)} ${active?"active":""}" data-style-name="${escapeHtml(style.id)}" type="button" aria-pressed="${active}">
    <span class="style-card-top"><span><strong>${escapeHtml(style.name)}</strong></span><small>${escapeHtml(style.tag)}</small></span>
    <span class="style-sample ${escapeHtml(style.id)}" aria-hidden="true"><i></i><b></b><em></em><span></span><strong>Row 12</strong></span>
    <span class="style-card-copy">${escapeHtml(style.desc)}</span>
    ${active?`<span class="theme-active-badge" aria-label="Current Design Style">✓ Selected</span>`:""}
  </button>`;
}

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
function normalizeSubCounter(counter={},index=0){
  const start=Math.max(0,Math.round(Number(counter.start??counter.startingValue??0)||0));
  const step=Math.max(1,Math.round(Number(counter.step??counter.incrementStep??1)||1));
  const every=Math.max(1,Math.round(Number(counter.every??counter.updateEvery??1)||1));
  const resetValue=Math.max(0,Math.round(Number(counter.resetValue??start)||0));
  const count=Math.max(0,Math.round(Number(counter.count??start)||0));
  const maxRaw=counter.max??counter.maximumValue;
  const max=maxRaw===""||maxRaw==null?null:Math.max(0,Math.round(Number(maxRaw)||0));
  const anchorRaw=counter.anchorRow??counter.startRow;
  const mode=counter.mode==="repeatCounter"?"repeatCounter":"subCounter";
  const repeatRule=repeatEngine()?.createRepeatRule({
    ...(counter.repeatRule||{}),
    id:counter.repeatRuleId||counter.repeatRule?.id||`repeat-${counter.id||index}`,
    mode,
    sectionName:counter.sectionName||counter.name||"Sub row counter",
    repeatType:counter.repeatType||counter.repeatRule?.repeatType||"every-x-rows",
    repeatValue:counter.repeatValue??counter.repeatRule?.repeatValue??every,
    unit:counter.unit||counter.repeatRule?.unit||"row",
    startAt:counter.startAt??counter.repeatRule?.startAt??start,
    sectionStartProjectPosition:counter.sectionStartProjectPosition??counter.repeatRule?.sectionStartProjectPosition??(anchorRaw===""||anchorRaw==null?0:Math.max(0,Math.round(Number(anchorRaw)||0))),
    localStartValue:counter.localStartValue??counter.repeatRule?.localStartValue??start,
    endAt:counter.endAt??counter.repeatRule?.endAt,
    repeatCount:counter.repeatCount??counter.repeatRule?.repeatCount,
    offset:counter.offset??counter.repeatRule?.offset,
    skipFirstRepeat:counter.skipFirstRepeat??counter.repeatRule?.skipFirstRepeat,
    rowSide:counter.rowSide||counter.repeatRule?.rowSide||"all",
    unlimitedRepeats:counter.unlimitedRepeats??counter.repeatRule?.unlimitedRepeats,
    enabled:counter.enabled!==false,
    notes:counter.notes,
    source:counter.source||counter.repeatRule?.source||"manual",
    linkedFeature:counter.linkedFeature||"project",
    createdAt:counter.createdAt,
    updatedAt:counter.updatedAt
  });
  return {
    id:counter.id||`s${Date.now()}-${index}`,
    name:String(counter.name||"Sub row counter").trim()||"Sub row counter",
    mode,
    sectionName:counter.sectionName||String(counter.name||"Sub row counter").trim()||"Sub row counter",
    repeatRuleId:repeatRule?.id||counter.repeatRuleId||`repeat-${counter.id||index}`,
    repeatRule,
    repeatType:repeatRule?.repeatType||"every-x-rows",
    repeatValue:repeatRule?.repeatValue||every,
    unit:repeatRule?.unit||"row",
    startAt:repeatRule?.startAt??start,
    endAt:repeatRule?.endAt??null,
    repeatCount:repeatRule?.repeatCount??null,
    offset:repeatRule?.offset??0,
    skipFirstRepeat:!!repeatRule?.skipFirstRepeat,
    rowSide:repeatRule?.rowSide||"all",
    unlimitedRepeats:repeatRule?.unlimitedRepeats!==false,
    localStartValue:repeatRule?.localStartValue??start,
    sectionStartProjectPosition:repeatRule?.sectionStartProjectPosition??null,
    enabled:repeatRule?.enabled!==false,
    count:max===null?count:Math.min(max,count),
    linked:counter.linked!==false,
    every,
    start,
    step,
    max,
    resetValue,
    color:validHex(counter.color)?counter.color:"#718c72",
    notes:String(counter.notes||""),
    anchorRow:anchorRaw===""||anchorRaw==null?0:Math.max(0,Math.round(Number(anchorRaw)||0)),
    voiceEvery:Math.max(0,Math.round(Number(counter.voiceEvery)||0)),
    voiceMessage:String(counter.voiceMessage||"").trim(),
    lastVoiceRow:Number(counter.lastVoiceRow)||null,
    syncRow:Number.isFinite(Number(counter.syncRow))?Number(counter.syncRow):null,
    syncCount:Number.isFinite(Number(counter.syncCount))?Number(counter.syncCount):null
  };
}
function subCounterTicksAt(row,counter){
  const c=normalizeSubCounter(counter),current=Math.max(0,Math.round(Number(row)||0));
  const triggers=repeatEngine()?.getTriggerPositions(c.repeatRule,{from:c.repeatRule?.startAt??c.anchorRow,to:current,limit:1000});
  if(triggers)return triggers.length;
  if(current<c.anchorRow)return 0;
  return Math.floor((current-c.anchorRow)/c.every)+1;
}
function subCounterLinkedCount(counter,row){
  const c=normalizeSubCounter(counter),syncRow=Number.isFinite(Number(c.syncRow))?Number(c.syncRow):Number(row)||0,syncCount=Number.isFinite(Number(c.syncCount))?Number(c.syncCount):c.count;
  const next=syncCount+(subCounterTicksAt(row,c)-subCounterTicksAt(syncRow,c))*c.step;
  const clamped=Math.max(c.resetValue??c.start??0,next);
  return c.max===null?clamped:Math.min(c.max,clamped);
}
function subCounterVoiceDue(counter,oldRow,newRow){
  const c=normalizeSubCounter(counter);
  if(!c.voiceEvery||!c.voiceMessage||newRow<=oldRow)return null;
  for(let row=oldRow+1;row<=newRow;row++){
    if(row<c.anchorRow)continue;
    if((row-c.anchorRow)%c.voiceEvery===0&&c.lastVoiceRow!==row)return row;
  }
  return null;
}
function repeatPreviewHtml(counter,currentRow=0){
  const c=normalizeSubCounter(counter),rule=c.repeatRule||repeatEngine()?.createRepeatRule(c),engine=repeatEngine();
  if(!engine)return "";
  const preview=engine.getTriggerPositions(rule,{from:Math.max(0,Number(currentRow)||0),limit:5});
  const next=engine.getNextTrigger(rule,Number(currentRow)||0);
  const label=rule.mode==="subCounter"?"Local triggers":"Triggers";
  const projectTriggers=rule.mode==="subCounter"?preview.map(local=>engine.projectPositionForLocal(rule,local)):preview;
  return `<div class="repeat-preview-mini"><span>${escapeHtml(label)}</span><strong>${preview.length?preview.join(" · "):"No upcoming triggers"}</strong>${rule.mode==="subCounter"?`<small>Project rows: ${projectTriggers.join(" · ")||"none yet"}</small>`:""}${next!==null?`<small>Next trigger ${rule.mode==="subCounter"?`on local ${next} / project ${engine.projectPositionForLocal(rule,next)}`:`on ${rule.unit} ${next}`}</small>`:""}</div>`;
}
function repeatCounterSummary(counter,currentRow=0){
  const c=normalizeSubCounter(counter),rule=c.repeatRule,engine=repeatEngine();
  const repeat=engine?.formatRepeatRule(rule)?.split(" · ").pop() || `Every ${c.every} row${c.every===1?"":"s"}`;
  const link=c.linked!==false?"linked to main row":"manual";
  if(c.linked!==false&&c.anchorRow&&Number(currentRow)<c.anchorRow)return `Starts in ${c.anchorRow-Number(currentRow)} rows`;
  return `${repeat} · ${link}`;
}
function syncSubCounterToMainRow(counter,oldRow,newRow){
  const c=normalizeSubCounter(counter);
  if(c.linked===false)return c;
  if(c.syncRow===null){c.syncRow=oldRow;c.syncCount=c.count;}
  const dueVoiceRow=subCounterVoiceDue(c,oldRow,newRow);
  c.count=subCounterLinkedCount(c,newRow);
  if(dueVoiceRow){
    c.lastVoiceRow=dueVoiceRow;
    speak(c.voiceMessage,{rate:1,lang:"en-AU",volume:.9});
  }
  return c;
}
function subCounterMetaText(counter,currentRow=0){
  const c=normalizeSubCounter(counter),bits=[];
  bits.push(c.mode==="repeatCounter"?"Repeat Counter":"Sub-Counter");
  bits.push(c.linked!==false?"Linked to main row":"Manual counter");
  if(c.anchorRow)bits.push(`Anchor row ${c.anchorRow}`);
  bits.push(repeatEngine()?.formatRepeatRule(c.repeatRule)||`updates every ${c.every} row${c.every===1?"":"s"}`);
  if(c.max!==null)bits.push(`max ${c.max}`);
  if(c.voiceEvery&&c.voiceMessage)bits.push(`voice every ${c.voiceEvery} rows`);
  if(c.linked!==false&&c.anchorRow&&Number(currentRow)<c.anchorRow)bits.push(`starts in ${c.anchorRow-Number(currentRow)} rows`);
  return bits.join(" · ");
}
function subCounterHtml(counter,{chart=false,currentRow=0}={}) {
  const s=normalizeSubCounter(counter),inactive=s.linked!==false&&s.anchorRow&&Number(currentRow)<s.anchorRow;
  return `<article class="sub-counter repeat-counter-card sub-row-counter-card subcounter-card ${chart?"chart-sub-counter":""} ${inactive?"is-inactive":""}" style="--counter-tag:${escapeHtml(s.color||"var(--primary)")};--counter-theme:var(--primary)">
    <div class="subcounter-info sub-counter-main"><div class="subcounter-title-row"><h4>${escapeHtml(s.name)}</h4><button class="button-icon counter-overflow-button subcounter-menu" data-counter-more="${s.id}" aria-label="More actions for ${escapeHtml(s.name)}">⋮</button></div><p class="subcounter-meta link-toggle">${escapeHtml(repeatCounterSummary(s,currentRow))}</p></div>
    <div class="subcounter-controls sub-counter-controls"><button data-sub="${s.id}" data-delta="-1" aria-label="Decrease ${escapeHtml(s.name)}">−</button><strong>${s.count}</strong><button data-sub="${s.id}" data-delta="1" aria-label="Increase ${escapeHtml(s.name)}">+</button></div>
  </article>`;
}
function unifiedRepeatCountersHtml(p,{chart=false}={}){
  const counters=(p.subCounters||[]).map(normalizeSubCounter);
  return `<section class="repeat-section unified-repeat-section ${chart?"chart-repeat-section":""}" aria-label="Repeat and sub-counters">
    <div class="repeat-section-header unified-repeat-heading"><div class="repeat-section-title-group"><h3 class="section-title repeat-section-title">${counters.length?"Repeat / Sub-Counter":"No repeat counter yet"}</h3></div><button class="button-secondary add-subcounter-button mini-button" id="add-sub-counter">+ Add</button></div>
    <div id="sub-counters" class="unified-repeat-list">${counters.length?counters.map(counter=>subCounterHtml(counter,{chart,currentRow:p.row})).join(""):`<p class="muted-copy">Add sleeve shaping, cable repeats, lace repeats, colour changes, or any section that needs its own count.</p>`}</div>
  </section>`;
}
function chartSubCountersHtml(p){
  const counters=(p.subCounters||[]).map(normalizeSubCounter);
  return `<details class="chart-sub-counters-card card workspace-card" hidden ${counters.length?"open":""}>
    <summary><div><p class="eyebrow">CHART TRACKER</p><h3>Sub Row Counters</h3><p>Track repeats, shaping sections, cable repeats, lace repeats, colourwork repeats, or custom reminders while reading the chart.</p></div><span>${counters.length} counter${counters.length===1?"":"s"}</span></summary>
    <div class="chart-sub-counter-body"><button class="secondary-button" id="add-sub-counter">+ Add counter</button>
      <div class="chart-sub-counter-list">${counters.length?counters.map(counter=>subCounterHtml(counter,{chart:true,currentRow:p.row})).join(""):`<p class="muted-copy">Add Cable Repeat, Sleeve Increase, Lace Repeat, or any chart section you want to track beside your main row.</p>`}</div>
    </div>
  </details>`;
}
function normalizeRowReminderVoice(settings={},fallbackLanguage="en"){
  return {speed:Math.max(.6,Math.min(1.5,Number(settings.speed)||1)),language:settings.language||fallbackLanguage,volume:Math.max(0,Math.min(1,Number(settings.volume??1)))};
}
function normalizeRowReminder(reminder={},index=0){
  const every=Math.max(1,Math.round(Number(reminder.every)||Number(reminder.interval)||1));
  return {
    id:reminder.id||`reminder-${Date.now()}-${index}`,
    name:String(reminder.name||"Row reminder").trim()||"Row reminder",
    every,
    startRow:Math.max(0,Math.round(Number(reminder.startRow??reminder.start??1)||1)),
    endRow:reminder.endRow===""||reminder.endRow==null?null:Math.max(0,Math.round(Number(reminder.endRow)||0)),
    message:String(reminder.message||"Remember your special action.").trim()||"Remember your special action.",
    voice:reminder.voice!==false,
    visual:reminder.visual!==false,
    repeat:reminder.repeat!==false,
    paused:!!reminder.paused,
    lastTriggeredRow:Number(reminder.lastTriggeredRow)||null,
    snoozedUntilRow:Number(reminder.snoozedUntilRow)||null,
    doneRows:Array.isArray(reminder.doneRows)?reminder.doneRows.map(Number).filter(Number.isFinite):[]
  };
}
function rowReminderMatches(reminder,currentRow){
  const row=Number(currentRow)||0,r=normalizeRowReminder(reminder);
  if(r.paused||row<r.startRow)return false;
  if(r.endRow!==null&&row>r.endRow)return false;
  if(r.snoozedUntilRow&&row<r.snoozedUntilRow)return false;
  if(r.doneRows.includes(row))return false;
  if(r.lastTriggeredRow===row)return false;
  if(!r.repeat&&r.lastTriggeredRow)return false;
  return (row-r.startRow)%r.every===0;
}
function dueRowReminders(p=getProject(),row=p?.row){
  return (p?.rowReminders||[]).map(normalizeRowReminder).filter(reminder=>rowReminderMatches(reminder,row));
}
function triggerRowReminders(p=getProject(),row=p?.row){
  if(!p)return;
  p.rowReminders=(p.rowReminders||[]).map(normalizeRowReminder);
  const due=dueRowReminders(p,row);
  const reminder=due[0]||null;
  if(!reminder){p.activeRowReminder=null;return;}
  const target=p.rowReminders.find(item=>item.id===reminder.id);
  if(target)target.lastTriggeredRow=Number(row)||0;
  p.activeRowReminder=reminder.visual!==false?{id:reminder.id,row:Number(row)||0,shownAt:new Date().toISOString()}:null;
  if(reminder.voice!==false)readRowReminderAloud(p,reminder);
  if(navigator.vibrate)navigator.vibrate([80,40,80]);
}
function readRowReminderAloud(p,reminder){
  const settings=normalizeRowReminderVoice(p.rowReminderVoice,state.language);
  speak(reminder.message,{rate:settings.speed,lang:settings.language==="yue"?"yue-Hant-HK":settings.language==="zh-Hant"?"zh-Hant-HK":"en-AU",volume:settings.volume});
}
function activeRowReminderHtml(p){
  const active=p.activeRowReminder,reminder=active&&(p.rowReminders||[]).find(item=>item.id===active.id);
  if(!active||!reminder||reminder.visual===false)return "";
  return `<section class="row-reminder-banner" role="status" aria-live="polite"><div><p class="eyebrow">ROW REMINDER</p><h3>${escapeHtml(reminder.name)}</h3><p>${escapeHtml(reminder.message)}</p><small>Row ${Number(active.row)||p.row} · every ${reminder.every} rows from row ${reminder.startRow}${reminder.endRow?` to ${reminder.endRow}`:""}</small></div><div class="row-reminder-banner-actions"><button class="mini-button" data-row-reminder-snooze="${reminder.id}">Snooze until next row</button><button class="primary-button" data-row-reminder-done="${reminder.id}">Done</button></div></section>`;
}
function rowReminderHtml(reminder){
  const r=normalizeRowReminder(reminder);
  return `<article class="row-reminder-card ${r.paused?"paused":""}"><div><strong>${escapeHtml(r.name)}</strong><p>${escapeHtml(r.message)}</p><small>Every ${r.every} rows · starts row ${r.startRow}${r.endRow?` · ends row ${r.endRow}`:""} · ${r.voice?"Voice on":"Voice off"} · ${r.visual?"Visual on":"Visual off"} · ${r.repeat?"Repeats":"Once"}</small></div><div class="row-reminder-actions"><button class="mini-button button-secondary" data-test-reminder="${r.id}">Test voice</button><button class="mini-button button-ghost" data-toggle-reminder="${r.id}">${r.paused?"Resume":"Pause"}</button><details class="overflow-menu row-reminder-more"><summary class="button-icon reminder-menu-button reminder-overflow-button row-reminder-menu" aria-label="More reminder actions">⋮</summary><div><button class="button-ghost" data-edit-reminder="${r.id}">Edit</button><button class="danger-button" data-delete-reminder="${r.id}">Delete</button></div></details></div></article>`;
}
function rowRemindersPanelHtml(p){
  const reminders=(p.rowReminders||[]).map(normalizeRowReminder),voice=normalizeRowReminderVoice(p.rowReminderVoice,state.language);
  return `<div class="card mobile-card row-reminders-card"><div class="card-header"><div><h3>Row Reminders</h3><p class="muted-copy">Get a gentle visual or voice cue every few rows.</p></div><button class="mini-button button-secondary" id="add-row-reminder">+ Add reminder</button></div>
    <div class="flow-reading-controls row-reminder-voice-settings">
      <label>Reminder speed <input id="row-reminder-speed" type="range" min=".6" max="1.5" step=".05" value="${voice.speed}"><span>${voice.speed.toFixed(2)}x</span></label>
      <label>Volume <input id="row-reminder-volume" type="range" min="0" max="1" step=".05" value="${voice.volume}"><span>${Math.round(voice.volume*100)}%</span></label>
    </div>
    <div class="row-reminder-list">${reminders.length?reminders.map(rowReminderHtml).join(""):`<p class="muted-copy">Add reminders for increases, decreases, cable rows, colour changes, stitch counts, or try-on checks.</p>`}</div></div>`;
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
  return `<div class="project-tools card toolkit-card compact-toolkit"><div class="section-heading" style="margin:0"><div><p class="eyebrow">PROJECT TOOLKIT</p><h2>Choose a focused tool</h2><p class="muted-copy">Showing ${escapeHtml(normalizeProjectType(p.type).toLowerCase())} tools plus shared tools. Budget stays in Buy List / Budget.</p><p class="unit-preference-note">Preferred units: ${escapeHtml(unitSystemLabel())}</p><p class="shared-tool-note">Shared setup: ${escapeHtml(sharedSetup.projectType)} · ${escapeHtml(sharedSetup.patternGauge||"add gauge")} · ${escapeHtml(sharedPlan.widthCm?`${sharedPlan.widthCm} cm wide`:"add size")}</p></div><label class="link-toggle"><input id="link-project-tools" type="checkbox" ${linked ? "checked" : ""}> Save results to this project</label></div>
    <div class="toolkit-selector-panel">
      <div class="field"><label>Category</label><select id="project-tool-category">${categories.map(c=>`<option value="${c.id}" ${c.id===categoryId?"selected":""}>${escapeHtml(c.title)}</option>`).join("")}</select><small>${escapeHtml(cat.desc)}</small></div>
      <div class="field"><label>Tool</label><select id="project-tool-picker">${toolOptions.map(t=>`<option value="${t.id}" ${(categoryId==="rendering"&&t.id==="rendering-studio")||t.id===selected?"selected":""}>${escapeHtml(t.name)}</option>`).join("")}</select><small>${escapeHtml(projectToolModeCopy(p,def))}</small></div>
      <button class="secondary-button" id="open-selected-project-tool">Open Tool</button>
    </div>
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
const studioProjectTypes=["Scarf","Blanket","Sweater","Cardigan","Top","Bag","Hat / Beanie","Socks","Granny Square","Grid / Chart","Custom rectangle"];
const studioPatternModes=["Stripe Mode","Grid Mode","Granny Square Mode","Checkerboard Mode","Gradient Mode","Random Mix Mode","Colour Pooling Mode"];
const studioColourNameMap={cream:"#f5ead8",ivory:"#fff8e8",white:"#ffffff",black:"#2a2622",grey:"#8c8983",gray:"#8c8983",sage:"#718c72",green:"#6f8872",terracotta:"#b56d52",rust:"#a9573f",rose:"#d9a0a8",pink:"#e8a6b3",lavender:"#b9a7d8",purple:"#8a7895",blue:"#637f91",navy:"#354c63",yellow:"#d9b75f",gold:"#c19b5b",brown:"#7b5c48",beige:"#d8c1a6",red:"#b85d5a",orange:"#d9875a",teal:"#6f9fa8"};
function studioModeFromTool(tool){return tool==="stripe"?"Stripe Mode":tool==="pooling"?"Colour Pooling Mode":"Grid Mode";}
function normalizeStudioHex(value,fallback="#718c72"){
  const text=String(value||"").trim();
  if(/^#[0-9a-f]{6}$/i.test(text))return text.toLowerCase();
  if(/^[0-9a-f]{6}$/i.test(text))return `#${text.toLowerCase()}`;
  return studioColourNameMap[text.toLowerCase()]||fallback;
}
function contrastRatio(a,b){
  const lum=hex=>{const c=normalizeStudioHex(hex).slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(v=>v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4));return .2126*c[0]+.7152*c[1]+.0722*c[2];};
  const l1=lum(a),l2=lum(b),hi=Math.max(l1,l2),lo=Math.min(l1,l2);return (hi+.05)/(lo+.05);
}
function studioDefaultColours(){
  const stash=(state.inventory||[]).filter(i=>i.category==="Yarn"&&validHex(yarnItemColor(i))).slice(0,3).map((i,index)=>({id:`studio-stash-${i.id}`,name:yarnItemDisplayName(i),hex:yarnItemColor(i),brand:i.brand||"Saved stash",line:i.yarnName||i.details||"",weight:index?2:3,locked:false,stashItemId:i.id,colourNumber:i.colourNumber||""}));
  return stash.length?stash:[
    {id:"studio-sage",name:"Sage merino",hex:"#718c72",brand:"",line:"",weight:3,locked:false},
    {id:"studio-cream",name:"Warm cream",hex:"#f5ead8",brand:"",line:"",weight:2,locked:false},
    {id:"studio-rust",name:"Soft rust",hex:"#b56d52",brand:"",line:"",weight:1,locked:false}
  ];
}
function studioDefaultState(tool=currentProjectTool){
  return {projectType:"Scarf",mode:studioModeFromTool(tool),activeColor:0,paintTool:"brush",version:"A",versions:{},colors:studioDefaultColours(),settings:{rows:36,rowWidth:48,rowsPerStripe:3,repeatCount:1,stripeWidthMode:"Equal width",customSequence:"1,2,3,2",mirrorRepeat:false,alternateRepeat:false,borderColor:"#f5ead8",lockOrder:false,columns:18,gridRows:14,cellSize:18,mirrorH:false,mirrorV:false,rounds:5,repeatRounds:true,numberSquares:1,gramsPerSquare:0,centreColor:0,borderIndex:1,blockSize:1,gradientSteps:6,gradientDirection:"Top to bottom",reverseGradient:false,sortLightDark:false,totalBlocks:80,minRepeat:1,maxRepeat:4,randomSeed:"yarncha",colourRepeatLength:60,stitchesPerRepeat:24,stitchesPerSegment:6,targetShift:1,totalGrams:0,stitchGauge:0,rowGauge:0},gridCells:[]};
}
function normalizeStudioState(p,tool=currentProjectTool){
  p.projectTools=p.projectTools||{};
  const base=studioDefaultState(tool),saved=p.projectTools.renderingStudio||{};
  const studio={...base,...saved,settings:{...base.settings,...(saved.settings||{})},versions:{...(saved.versions||{})}};
  if(!Array.isArray(studio.colors)||!studio.colors.length)studio.colors=base.colors;
  studio.colors=studio.colors.map((c,i)=>({id:c.id||`studio-colour-${i}-${Date.now()}`,name:c.name||`Colour ${i+1}`,hex:normalizeStudioHex(c.hex||c.name,colors[i%colors.length]),brand:c.brand||"",line:c.line||"",weight:Math.max(1,Math.min(10,Number(c.weight)||1)),locked:!!c.locked,stashItemId:c.stashItemId||"",colourNumber:c.colourNumber||""}));
  studio.activeColor=Math.max(0,Math.min(studio.colors.length-1,Number(studio.activeColor)||0));
  if(!studioPatternModes.includes(studio.mode))studio.mode=studioModeFromTool(tool);
  if(!studioProjectTypes.includes(studio.projectType))studio.projectType="Custom rectangle";
  return studio;
}
function studioSequence(studio){
  const order=studio.colors.map((_,i)=>i);
  if(studio.settings.lockOrder)return order;
  if(studio.mode==="Checkerboard Mode")return order.slice(0,2);
  if(studio.mode==="Gradient Mode")return order;
  if(studio.mode==="Random Mix Mode")return studio.colors.flatMap((c,i)=>Array(Math.max(1,Number(c.weight)||1)).fill(i));
  if(studio.settings.stripeWidthMode==="Custom sequence"){
    const custom=String(studio.settings.customSequence||"").split(/[,\s]+/).map(x=>Math.max(0,Number(x)-1)).filter(i=>studio.colors[i]);
    if(custom.length)return custom;
  }
  return order;
}
function studioPaletteText(studio){return studio.colors.map(c=>c.hex).join(", ");}
function studioColourFeedback(studio){
  const colors=studio.colors,ratios=[];
  for(let i=0;i<colors.length;i++)for(let j=i+1;j<colors.length;j++)ratios.push(contrastRatio(colors[i].hex,colors[j].hex));
  const min=ratios.length?Math.min(...ratios):1,contrast=min>=4.5?"High":min>=2.4?"Medium":"Low";
  const light=colors.filter(c=>contrastRatio(c.hex,"#000000")>7).length,dark=colors.filter(c=>contrastRatio(c.hex,"#ffffff")>4.5).length,medium=Math.max(0,colors.length-light-dark);
  const main=[...colors].sort((a,b)=>b.weight-a.weight)[0]||colors[0],contrastColour=[...colors].sort((a,b)=>contrastRatio(main.hex,b.hex)-contrastRatio(main.hex,a.hex))[0]||colors[1]||main,border=[...colors].sort((a,b)=>contrastRatio(a.hex,"#ffffff")-contrastRatio(b.hex,"#ffffff"))[0]||main;
  const tooSimilar=min<1.55;
  const muted=colors.every(c=>contrastRatio(c.hex,"#777777")<3.2),pastel=colors.filter(c=>contrastRatio(c.hex,"#ffffff")<2.2).length>=Math.ceil(colors.length/2),earthy=colors.some(c=>/sage|rust|terracotta|brown|cream|beige/i.test(c.name)),bold=contrast==="High"&&colors.length>2,neutral=colors.every(c=>/cream|ivory|white|black|grey|gray|beige|brown/i.test(c.name));
  const tags=[pastel&&"pastel",earthy&&"earthy",muted&&"soft",bold&&"bold",neutral&&"neutral",!pastel&&earthy&&"vintage"].filter(Boolean);
  return {contrast,balance:`${light} light · ${medium} medium · ${dark} dark`,tooSimilar,main,contrastColour,border,tags:tags.length?tags:["balanced"]};
}
function studioFinishedSize(stitches,rows,studio){
  const st=Number(studio.settings.stitchGauge)||0,row=Number(studio.settings.rowGauge)||0;
  return {width:st?stitches/st*10:null,height:row?rows/row*10:null};
}
function studioUsageRows(usage,total,studio){
  const grams=Number(studio.settings.totalGrams)||0;
  return studio.colors.map((c,i)=>{
    const amount=Number(usage[i])||0,percent=total?amount/total*100:0;
    return {index:i,color:c,amount,percent,grams:grams?grams*percent/100:null};
  }).filter(r=>r.amount>0||studio.colors.length<=3);
}
function studioSeededRandom(seed){
  let h=2166136261;
  String(seed||"yarncha").split("").forEach(ch=>{h^=ch.charCodeAt(0);h=Math.imul(h,16777619);});
  return ()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};
}
function studioHexToRgb(hex){const clean=normalizeStudioHex(hex).slice(1);return [0,2,4].map(i=>parseInt(clean.slice(i,i+2),16));}
function studioRgbToHex(rgb){return `#${rgb.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("")}`;}
function studioInterpolateHex(a,b,t){const x=studioHexToRgb(a),y=studioHexToRgb(b);return studioRgbToHex(x.map((v,i)=>v+(y[i]-v)*t));}
function studioCalculatedPlan(studio){
  const s=studio.settings,mode=studio.mode,usage={},details=[],sequence=[],set=(i,n=1)=>usage[i]=(usage[i]||0)+n;
  let total=0,size={width:null,height:null},unit="units";
  if(mode==="Grid Mode"){
    const cols=Math.max(2,Number(s.columns)||18),rows=Math.max(2,Number(s.gridRows)||14),cells=studio.gridCells||[];
    total=cols*rows;unit="cells";for(let i=0;i<total;i++)set(cells[i]??((Math.floor(i/cols)+i)%studio.colors.length));
    size=studioFinishedSize(cols,rows,studio);details.push(["Total cells",total],["Finished width",size.width?`${size.width.toFixed(1)} cm`:"Add stitch gauge"],["Finished height",size.height?`${size.height.toFixed(1)} cm`:"Add row gauge"]);
  }else if(mode==="Granny Square Mode"){
    const rounds=Math.max(1,Number(s.rounds)||5),squares=Math.max(1,Number(s.numberSquares)||1),seq=studioSequence(studio),perSquare=Number(s.gramsPerSquare)||0;
    total=0;unit="weighted round units";
    for(let r=1;r<=rounds;r++){const weight=2*r-1,totalWeight=weight*squares,idx=r===1?Number(s.centreColor)||0:r===rounds?Number(s.borderIndex)||0:seq[(r-1)%seq.length]||0;set(idx,totalWeight);total+=totalWeight;sequence.push(`Round ${r}: ${studio.colors[idx]?.name||"Colour"} (${weight} weight units)`);}
    if(perSquare&&!Number(s.totalGrams))s.totalGrams=perSquare*squares;
    details.push(["Squares",squares],["Total weight units",total],["Weighted formula","Round weight = 2 x round number - 1"],["Estimated total grams",Number(s.totalGrams)?`${Number(s.totalGrams).toFixed(1)} g`:"Add total grams or grams per square"]);
  }else if(mode==="Checkerboard Mode"){
    const cols=Math.max(1,Number(s.columns)||18),rows=Math.max(1,Number(s.gridRows)||14),blocks=cols*rows,seq=studioSequence(studio);
    total=blocks;unit="blocks";for(let i=0;i<blocks;i++)set(seq[(Math.floor(i/cols)+i)%seq.length]||0);
    size=studioFinishedSize(cols*(Number(s.blockSize)||1),rows*(Number(s.blockSize)||1),studio);details.push(["Total blocks",blocks],["Block size",Number(s.blockSize)||1],["Finished width",size.width?`${size.width.toFixed(1)} cm`:"Add stitch gauge"],["Finished height",size.height?`${size.height.toFixed(1)} cm`:"Add row gauge"]);
  }else if(mode==="Gradient Mode"){
    let gradientColors=[...studio.colors];if(s.sortLightDark)gradientColors.sort((a,b)=>contrastRatio(a.hex,"#000000")-contrastRatio(b.hex,"#000000"));if(s.reverseGradient)gradientColors.reverse();
    const steps=Math.max(2,Number(s.gradientSteps)||gradientColors.length||2),rows=Math.max(steps,Number(s.rows)||steps),rowsPerStep=Math.max(1,Number(s.rowsPerStripe)||Math.ceil(rows/steps));
    total=rows;unit="rows";for(let step=0;step<steps;step++){const t=steps===1?0:step/(steps-1),slot=t*(gradientColors.length-1),lo=Math.floor(slot),hi=Math.min(gradientColors.length-1,Math.ceil(slot)),hex=studioInterpolateHex(gradientColors[lo]?.hex,gradientColors[hi]?.hex,slot-lo),count=Math.round((step+1)*rows/steps)-Math.round(step*rows/steps);sequence.push(`Step ${step+1}: ${hex}`);set(Math.min(step,studio.colors.length-1),count);}
    size=studioFinishedSize(Number(s.rowWidth)||48,rows,studio);details.push(["Steps",steps],["Rows per step",rowsPerStep],["Direction",s.gradientDirection||"Top to bottom"],["Finished width",size.width?`${size.width.toFixed(1)} cm`:"Add stitch gauge"],["Finished height",size.height?`${size.height.toFixed(1)} cm`:"Add row gauge"],["Note","Digital gradient colours are visual references; match with closest yarn colours."]);
  }else if(mode==="Random Mix Mode"){
    const totalBlocks=Math.max(1,Number(s.totalBlocks)||Number(s.rows)||80),min=Math.max(1,Number(s.minRepeat)||1),max=Math.max(min,Number(s.maxRepeat)||4),rand=studioSeededRandom(s.randomSeed),weighted=studio.colors.flatMap((c,i)=>Array(Math.max(1,Number(c.weight)||1)).fill(i));
    total=0;unit="rows / blocks";while(total<totalBlocks){const idx=weighted[Math.floor(rand()*weighted.length)]||0,run=Math.min(totalBlocks-total,min+Math.floor(rand()*(max-min+1)));set(idx,run);sequence.push(`${studio.colors[idx]?.name}: ${run}`);total+=run;}
    size=studioFinishedSize(Number(s.rowWidth)||48,totalBlocks,studio);details.push(["Random seed",s.randomSeed||"yarncha"],["Total weight",studio.colors.reduce((sum,c)=>sum+(Number(c.weight)||1),0)],["Repeat range",`${min}-${max}`],["Finished width",size.width?`${size.width.toFixed(1)} cm`:"Add stitch gauge"],["Finished height",size.height?`${size.height.toFixed(1)} cm`:"Add row gauge"]);
  }else if(mode==="Colour Pooling Mode"){
    const repeat=Math.max(1,Number(s.stitchesPerRepeat)||Number(s.colourRepeatLength)||24),rowWidth=Math.max(1,Number(s.rowWidth)||96),rows=Math.max(1,Number(s.rows)||36),shift=rowWidth%repeat,target=Number(s.targetShift)||1,seq=studioSequence(studio);
    total=rowWidth*rows;unit="stitches";for(let r=0;r<rows;r++)for(let c=0;c<rowWidth;c++)set(seq[Math.floor(((c+r*shift)%repeat)/Math.max(1,Number(s.stitchesPerSegment)||6))%seq.length]||0);
    const abs=Math.abs(shift),label=abs===0?"Stacking":abs<=2?"Gentle diagonal":abs<=repeat*.25?"Strong diagonal":abs<=repeat*.45?"Argyle-like":"Unstable / may not pool clearly";
    size=studioFinishedSize(rowWidth,rows,studio);details.push(["Current shift per row",shift],["Pooling behaviour",label],["Suggested stacking width",repeat*Math.max(1,Math.round(rowWidth/repeat))],["Suggested target-shift width",repeat*Math.max(1,Math.floor(rowWidth/repeat))+target],["Finished width",size.width?`${size.width.toFixed(1)} cm`:"Add stitch gauge"],["Finished height",size.height?`${size.height.toFixed(1)} cm`:"Add row gauge"],["Warning",label.startsWith("Unstable")?"Row width is unlikely to pool clearly.":"Swatch before starting the full project."]);
  }else{
    const rows=studioStripeRows(studio),rowWidth=Math.max(1,Number(s.rowWidth)||48),repeat=Math.max(1,Number(s.repeatCount)||1),expanded=Array.from({length:repeat},()=>rows).flat();
    total=expanded.length;unit="rows";expanded.forEach((idx,i)=>{set(idx);sequence.push(`Row ${i+1}: ${studio.colors[idx]?.name||"Colour"}`);});
    size=studioFinishedSize(rowWidth,total,studio);details.push(["Total rows",total],["Row width",`${rowWidth} stitches`],["Repeat count",repeat],["Finished width",size.width?`${size.width.toFixed(1)} cm`:"Add stitch gauge"],["Finished height",size.height?`${size.height.toFixed(1)} cm`:"Add row gauge"]);
  }
  return {mode,total,unit,usageRows:studioUsageRows(usage,total,studio),details,sequence:sequence.slice(0,80),estimateNote:"Yarn calculations are estimates only. Gauge, tension, fibre, stitch pattern and blocking can change real usage."};
}
function studioCalculatedResultsHtml(studio){
  const plan=studioCalculatedPlan(studio);
  return `<section class="studio-calculation-panel"><div class="section-heading compact-row"><div><p class="eyebrow">PLANNING CALCULATIONS</p><h3>${escapeHtml(plan.mode)} usage</h3><p>${escapeHtml(plan.estimateNote)}</p></div><strong>${plan.total} ${escapeHtml(plan.unit)}</strong></div><div class="studio-calc-grid">${plan.details.map(([k,v])=>`<article><strong>${escapeHtml(k)}</strong><span>${escapeHtml(v)}</span></article>`).join("")}</div><div class="studio-usage-table"><table><thead><tr><th>Colour</th><th>Usage</th><th>Percent</th><th>Estimated grams</th></tr></thead><tbody>${plan.usageRows.map(r=>`<tr><td><span class="studio-table-swatch" style="background:${r.color.hex}"></span>${escapeHtml(r.color.name)}<small>${escapeHtml(r.color.hex)}</small></td><td>${Number(r.amount).toFixed(r.amount%1?1:0)}</td><td>${r.percent.toFixed(1)}%</td><td>${r.grams===null?"Add total grams":`${r.grams.toFixed(1)} g`}</td></tr>`).join("")}</tbody></table></div>${plan.sequence.length?`<details class="studio-sequence-list" open><summary>${studio.mode==="Stripe Mode"?"Row-by-row colour sequence":studio.mode==="Colour Pooling Mode"?"Colour segment placement preview":"Generated sequence"}</summary><ol>${plan.sequence.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ol></details>`:""}</section>`;
}
function studioSwatchOptions(studio){return studio.colors.map((c,i)=>`<option value="${i}" ${studio.activeColor===i?"selected":""}>${escapeHtml(c.name)}</option>`).join("");}
function studioSharedPlanningHtml(studio){
  const s=studio.settings;
  return `<div class="studio-shared-inputs"><h4>Gauge and yarn estimate</h4><div class="form-grid"><div class="field"><label>Stitch gauge per 10 cm</label><input data-studio-setting="stitchGauge" type="number" min="0" step=".1" value="${s.stitchGauge||""}" placeholder="Optional"></div><div class="field"><label>Row gauge per 10 cm</label><input data-studio-setting="rowGauge" type="number" min="0" step=".1" value="${s.rowGauge||""}" placeholder="Optional"></div><div class="field"><label>Estimated total yarn grams</label><input data-studio-setting="totalGrams" type="number" min="0" step=".1" value="${s.totalGrams||""}" placeholder="Optional"></div></div></div>`;
}
function studioSettingsHtml(studio){
  const s=studio.settings;
  const shared=studioSharedPlanningHtml(studio);
  if(studio.mode==="Grid Mode")return `<div class="studio-settings-panel"><div class="studio-form-grid"><div class="field"><label>Number of columns</label><input id="studio-columns" data-studio-setting="columns" type="number" min="2" value="${s.columns}"></div><div class="field"><label>Number of rows</label><input id="studio-grid-rows" data-studio-setting="gridRows" type="number" min="2" value="${s.gridRows}"></div><div class="field"><label>Cell size</label><input id="studio-cell-size" data-studio-setting="cellSize" type="number" min="10" max="34" value="${s.cellSize}"></div><div class="field"><label>Paint colour</label><select id="studio-active-colour">${studioSwatchOptions(studio)}</select></div></div><div class="studio-toolbar" aria-label="Grid Mode tools"><button class="mini-button ${studio.paintTool==="brush"?"active":""}" data-studio-paint-tool="brush">Click cell to change colour</button><button class="mini-button ${studio.paintTool==="bucket"?"active":""}" data-studio-paint-tool="bucket">Fill bucket</button><button class="mini-button ${studio.paintTool==="eraser"?"active":""}" data-studio-paint-tool="eraser">Eraser</button><button class="mini-button" data-studio-action="replace-colour">Replace colour</button><button class="mini-button" data-studio-action="export-grid">Export chart</button><button class="mini-button" data-studio-action="save-grid">Save grid to project</button><label><input type="checkbox" data-studio-check="mirrorH" ${s.mirrorH?"checked":""}> Mirror horizontally</label><label><input type="checkbox" data-studio-check="mirrorV" ${s.mirrorV?"checked":""}> Mirror vertically</label></div>${shared}</div>`;
  if(studio.mode==="Granny Square Mode")return `<div class="studio-settings-panel"><div class="form-grid"><div class="field"><label>Centre colour</label><select data-studio-setting="centreColor">${studio.colors.map((c,i)=>`<option value="${i}" ${Number(s.centreColor)===i?"selected":""}>${escapeHtml(c.name)}</option>`).join("")}</select></div><div class="field"><label>Border colour</label><select data-studio-setting="borderIndex">${studio.colors.map((c,i)=>`<option value="${i}" ${Number(s.borderIndex)===i?"selected":""}>${escapeHtml(c.name)}</option>`).join("")}</select></div><div class="field"><label>Number of rounds</label><input data-studio-setting="rounds" type="number" min="1" max="12" value="${s.rounds}"></div><div class="field"><label>Number of squares</label><input data-studio-setting="numberSquares" type="number" min="1" value="${s.numberSquares}"></div><div class="field"><label>Yarn grams per square</label><input data-studio-setting="gramsPerSquare" type="number" min="0" step=".1" value="${s.gramsPerSquare||""}" placeholder="Optional"></div><label class="check-row"><input type="checkbox" data-studio-check="repeatRounds" ${s.repeatRounds?"checked":""}><span>Repeat colour sequence</span></label></div><p class="muted-copy">Outer rounds use more yarn, so usage uses weighted round units.</p>${shared}</div>`;
  if(studio.mode==="Checkerboard Mode")return `<div class="studio-settings-panel"><div class="form-grid"><div class="field"><label>Number of columns</label><input data-studio-setting="columns" type="number" min="1" value="${s.columns}"></div><div class="field"><label>Number of rows</label><input data-studio-setting="gridRows" type="number" min="1" value="${s.gridRows}"></div><div class="field"><label>Block size</label><input data-studio-setting="blockSize" type="number" min="1" value="${s.blockSize}"></div></div><p class="muted-copy">Uses the first two colours as Colour A and Colour B; extra colours can join the alternating order.</p>${shared}</div>`;
  if(studio.mode==="Gradient Mode")return `<div class="studio-settings-panel"><div class="form-grid"><div class="field"><label>Number of steps</label><input data-studio-setting="gradientSteps" type="number" min="2" value="${s.gradientSteps}"></div><div class="field"><label>Total rows</label><input data-studio-setting="rows" type="number" min="2" value="${s.rows}"></div><div class="field"><label>Rows per step</label><input data-studio-setting="rowsPerStripe" type="number" min="1" value="${s.rowsPerStripe}"></div><div class="field"><label>Gradient direction</label><select data-studio-setting="gradientDirection">${["Top to bottom","Left to right","Centre out"].map(v=>`<option ${s.gradientDirection===v?"selected":""}>${v}</option>`).join("")}</select></div></div><div class="studio-toggle-row"><label><input type="checkbox" data-studio-check="sortLightDark" ${s.sortLightDark?"checked":""}> Sort yarn colours light to dark</label><label><input type="checkbox" data-studio-check="reverseGradient" ${s.reverseGradient?"checked":""}> Reverse gradient</label></div>${shared}</div>`;
  if(studio.mode==="Random Mix Mode")return `<div class="studio-settings-panel"><div class="form-grid"><div class="field"><label>Total rows or blocks</label><input data-studio-setting="totalBlocks" type="number" min="1" value="${s.totalBlocks}"></div><div class="field"><label>Minimum repeat</label><input data-studio-setting="minRepeat" type="number" min="1" value="${s.minRepeat}"></div><div class="field"><label>Maximum repeat</label><input data-studio-setting="maxRepeat" type="number" min="1" value="${s.maxRepeat}"></div><div class="field"><label>Random seed</label><input data-studio-setting="randomSeed" value="${escapeHtml(s.randomSeed)}"></div></div><p class="muted-copy">Colour card weights set the random chance. Locked colours keep their card details while the seed regenerates the same mix.</p>${shared}</div>`;
  if(studio.mode==="Colour Pooling Mode")return `<div class="studio-settings-panel"><div class="form-grid"><div class="field"><label>Colour repeat length</label><input data-studio-setting="colourRepeatLength" type="number" min="1" value="${s.colourRepeatLength}"></div><div class="field"><label>Stitches per colour repeat</label><input data-studio-setting="stitchesPerRepeat" type="number" min="1" value="${s.stitchesPerRepeat}"></div><div class="field"><label>Row width in stitches</label><input data-studio-setting="rowWidth" type="number" min="1" value="${s.rowWidth}"></div><div class="field"><label>Number of rows</label><input data-studio-setting="rows" type="number" min="1" value="${s.rows}"></div><div class="field"><label>Stitches per colour segment</label><input data-studio-setting="stitchesPerSegment" type="number" min="1" value="${s.stitchesPerSegment}"></div><div class="field"><label>Target shift per row</label><input data-studio-setting="targetShift" type="number" value="${s.targetShift}"></div></div><p class="muted-copy">Colour pooling is highly sensitive to tension and yarn repeat length. Swatch before starting the full project.</p>${shared}</div>`;
  return `<div class="studio-settings-panel"><div class="form-grid"><div class="field"><label>Number of rows</label><input data-studio-setting="rows" type="number" min="2" value="${s.rows}"></div><div class="field"><label>Row width / stitches</label><input data-studio-setting="rowWidth" type="number" min="4" value="${s.rowWidth}"></div><div class="field"><label>Rows per stripe</label><input data-studio-setting="rowsPerStripe" type="number" min="1" value="${s.rowsPerStripe}"></div><div class="field"><label>Repeat count</label><input data-studio-setting="repeatCount" type="number" min="1" value="${s.repeatCount}"></div><div class="field"><label>Stripe width</label><select data-studio-setting="stripeWidthMode">${["Equal width","Random weighted width","Custom sequence"].map(v=>`<option ${s.stripeWidthMode===v?"selected":""}>${v}</option>`).join("")}</select></div><div class="field"><label>Stripe sequence</label><input data-studio-setting="customSequence" value="${escapeHtml(s.customSequence)}" placeholder="1,2,3,2"></div><div class="field"><label>Border colour</label><input data-studio-setting="borderColor" value="${escapeHtml(s.borderColor)}" placeholder="#f5ead8 or cream"></div></div><div class="studio-toggle-row"><label><input type="checkbox" data-studio-check="mirrorRepeat" ${s.mirrorRepeat?"checked":""}> Mirror repeat</label><label><input type="checkbox" data-studio-check="alternateRepeat" ${s.alternateRepeat?"checked":""}> Alternate repeat</label><label><input type="checkbox" data-studio-check="lockOrder" ${s.lockOrder?"checked":""}> Lock colour order</label></div>${shared}</div>`;
}
function studioStripeRows(studio){
  const s=studio.settings,total=Math.max(2,Number(s.rows)||36),seq=studioSequence(studio),rows=[];
  for(let i=0;i<total;){
    let idx=seq[rows.length%seq.length]||0,width=Math.max(1,Number(s.rowsPerStripe)||2);
    if(s.stripeWidthMode==="Random weighted width")width=Math.max(1,Math.round((studio.colors[idx]?.weight||1)*1.5));
    if(studio.mode==="Checkerboard Mode")width=1;
    if(studio.mode==="Gradient Mode")idx=Math.min(studio.colors.length-1,Math.floor((i/total)*studio.colors.length));
    rows.push({idx,rows:Math.min(width,total-i)});i+=width;
  }
  const expanded=rows.flatMap(r=>Array(r.rows).fill(r.idx));
  return s.mirrorRepeat?[...expanded,...expanded.slice().reverse()]:expanded;
}
function studioPreviewHtml(studio,{mini=false}={}){
  if(studio.mode==="Grid Mode")return studioGridPreviewHtml(studio,mini);
  if(studio.mode==="Granny Square Mode")return studioGrannyPreviewHtml(studio,mini);
  return studioStripePreviewHtml(studio,mini);
}
function studioStripePreviewHtml(studio,mini=false){
  const s=studio.settings,shape=studio.projectType.toLowerCase().replace(/[^a-z]+/g,"-"),border=normalizeStudioHex(s.borderColor,studio.colors[0]?.hex);
  let rows=studioStripeRows(studio).map(idx=>studio.colors[idx%studio.colors.length]?.hex||"#ccc");
  if(studio.mode==="Gradient Mode"){
    let gradientColors=[...studio.colors];if(s.sortLightDark)gradientColors.sort((a,b)=>contrastRatio(a.hex,"#000000")-contrastRatio(b.hex,"#000000"));if(s.reverseGradient)gradientColors.reverse();
    const count=Math.max(2,Number(s.rows)||36);
    rows=Array.from({length:count},(_,i)=>{const t=count===1?0:i/(count-1),slot=t*(gradientColors.length-1),lo=Math.floor(slot),hi=Math.min(gradientColors.length-1,Math.ceil(slot));return studioInterpolateHex(gradientColors[lo]?.hex,gradientColors[hi]?.hex,slot-lo);});
  }
  if(studio.mode==="Random Mix Mode"){
    const rand=studioSeededRandom(s.randomSeed),weighted=studio.colors.flatMap((c,i)=>Array(Math.max(1,Number(c.weight)||1)).fill(i)),total=Math.max(1,Number(s.totalBlocks)||80),min=Math.max(1,Number(s.minRepeat)||1),max=Math.max(min,Number(s.maxRepeat)||4);
    rows=[];while(rows.length<total){const idx=weighted[Math.floor(rand()*weighted.length)]||0,run=Math.min(total-rows.length,min+Math.floor(rand()*(max-min+1)));rows.push(...Array(run).fill(studio.colors[idx]?.hex||"#ccc"));}
  }
  return `<div class="studio-project-frame studio-shape-${shape} ${mini?"mini":""}" style="--studio-border:${border}">${rows.map((hex,i)=>`<span style="background:${hex}" title="Row ${i+1}"></span>`).join("")}</div>`;
}
function studioGridPreviewHtml(studio,mini=false){
  const s=studio.settings,cols=Math.max(2,Number(s.columns)||18),rows=Math.max(2,Number(s.gridRows)||14),cells=studio.gridCells||[],size=mini?10:Math.max(10,Math.min(24,Number(s.cellSize)||18));
  return `<div class="studio-grid-preview ${mini?"mini":""}" style="grid-template-columns:repeat(${cols},${size}px)">${Array.from({length:cols*rows},(_,i)=>{const color=studio.colors[cells[i]??((Math.floor(i/cols)+i)%studio.colors.length)]?.hex||"#eee";return `<button ${mini?"":`data-studio-cell="${i}"`} style="width:${size}px;height:${size}px;background:${color}" aria-label="Grid cell ${i+1}"></button>`;}).join("")}</div>`;
}
function studioGrannyPreviewHtml(studio,mini=false){
  const s=studio.settings,rounds=Math.max(1,Number(s.rounds)||5),seq=studioSequence(studio),centre=studio.colors[Number(s.centreColor)||0]?.hex||studio.colors[0]?.hex,border=studio.colors[Number(s.borderIndex)||1]?.hex||studio.colors.at(-1)?.hex;
  return `<div class="studio-granny-preview ${mini?"mini":""}" style="--centre:${centre};--border:${border}">${Array.from({length:rounds},(_,i)=>`<span style="--round:${i};background:${studio.colors[seq[i%seq.length]||0]?.hex||centre}"></span>`).join("")}<i></i></div>`;
}
function renderingStudioContent(p,tool=currentProjectTool){
  const studio=normalizeStudioState(p,tool),feedback=studioColourFeedback(studio),stash=(state.inventory||[]).filter(i=>i.category==="Yarn");
  const colourCards=studio.colors.map((c,i)=>{
    const meta=[c.hex,c.brand||"Manual",c.line,c.colourNumber?`Colour no. ${c.colourNumber}`:"",`Qty ${c.weight}`].filter(Boolean).map(escapeHtml).join(" · ");
    return `<article class="studio-colour-card ${i===studio.activeColor?"active":""}" draggable="true" data-studio-colour="${i}"><span class="studio-card-swatch" style="background:${c.hex}"></span><div class="studio-card-summary"><strong>${escapeHtml(c.name)}</strong><span>${meta}</span></div><div class="studio-card-actions"><button class="mini-button" data-studio-lock="${i}">${c.locked?"Unlock":"Lock"}</button><details class="studio-card-more"><summary>More</summary><div class="studio-card-fields"><input data-colour-field="name" value="${escapeHtml(c.name)}" aria-label="Colour name"><input data-colour-field="hex" value="${escapeHtml(c.hex)}" aria-label="Hex code"><input data-colour-field="brand" value="${escapeHtml(c.brand)}" placeholder="Brand" aria-label="Yarn brand"><input data-colour-field="line" value="${escapeHtml(c.line)}" placeholder="Line" aria-label="Yarn line"><label>Qty <input data-colour-field="weight" type="number" min="1" max="10" value="${c.weight}"></label></div><div class="studio-card-secondary-actions"><button class="mini-button" data-studio-duplicate="${i}">Duplicate</button>${c.stashItemId?`<button class="mini-button" data-studio-update-stash="${i}">Update stash colour</button>`:""}<button class="mini-button danger-button" data-studio-delete="${i}">Delete</button></div></details></div></article>`;
  }).join("");
  return `<section class="rendering-studio" data-studio-version="${escapeHtml(studio.version)}">
    <div class="studio-hero"><div><p class="eyebrow">VISUAL PLANNING STUDIO</p><h2>Preview the fabric before you make it</h2><p class="muted-copy">Build a palette from hex codes, colour names, yarn names, and stash colours. The full-width preview updates as you plan.</p></div><div class="studio-version-tabs">${["A","B","C"].map(v=>`<button class="pill-tab ${studio.version===v?"active":""}" data-studio-version="${v}">Version ${v}</button>`).join("")}</div></div>
    <div class="studio-input-grid">
      <div class="studio-panel studio-project-panel"><h3>Project and pattern</h3><div class="studio-form-grid"><div class="field"><label>Project type</label><select id="studio-project-type">${studioProjectTypes.map(t=>`<option ${studio.projectType===t?"selected":""}>${t}</option>`).join("")}</select></div><div class="field"><label>Preview mode</label><select id="studio-pattern-mode">${studioPatternModes.map(m=>`<option ${studio.mode===m?"selected":""}>${m}</option>`).join("")}</select></div></div>${studioSettingsHtml(studio)}</div>
    </div>
    <section class="studio-panel studio-add-panel"><div class="section-heading compact-row"><div><p class="eyebrow">COLOUR PLANNING</p><h3>Add colour</h3><p class="muted-copy">Add yarn colours by name, hex, stash source, or scan, then manage the colours used in the preview.</p></div></div><div class="studio-add-grid"><div class="field"><label>Colour / yarn colour name</label><input id="studio-new-name" value="" placeholder="Sage, oat, dye colourway"></div><div class="field"><label>Hex code</label><input id="studio-new-hex" value="" placeholder="#718c72"></div><div class="field"><label>Source / stash note</label><input id="studio-new-brand" value="" placeholder="Brand or source"></div><div class="field"><label>Yarn weight / ball info</label><input id="studio-new-line" value="" placeholder="DK, 100 g, merino..."></div><div class="field"><label>Ball count / weight count</label><input id="studio-new-weight" type="number" min="1" max="10" value="1"></div><div class="field full"><label>Use colour from Yarn Stash</label><select id="studio-stash-colour" multiple size="4">${stash.length?stash.map(i=>`<option value="${i.id}">${escapeHtml(yarnItemDisplayName(i))}${i.colourNumber?` · ${escapeHtml(i.colourNumber)}`:""}${validHex(yarnItemColor(i))?"":" · needs colour"}</option>`).join(""):`<option disabled>No yarn saved yet</option>`}</select><small>Select one or more saved yarns. If a yarn has no colour yet, capture or choose its colour first.</small></div></div><div class="studio-button-row"><button class="secondary-button" id="studio-add-colour">Add colour</button><button class="mini-button" id="studio-open-scan-yarn">Scan Yarn</button></div><div class="studio-current-colours"><div class="section-heading compact-row"><div><p class="eyebrow">CURRENT COLOURS</p><h3>Added colours</h3></div><span>${studio.colors.length} colour${studio.colors.length===1?"":"s"}</span></div><div class="studio-colour-board">${colourCards}</div></div></section>
    <section class="studio-preview-section"><div class="studio-preview-head"><div><p class="eyebrow">LIVE PREVIEW</p><h2>${escapeHtml(studio.projectType)} · ${escapeHtml(studio.mode)}</h2><p>${escapeHtml(studioPaletteText(studio))}</p></div><div class="studio-preview-actions"><button class="primary-button" data-studio-action="save-project">Save to Project</button><button class="secondary-button" data-studio-action="export-image">Export preview as image</button></div></div><div class="studio-preview-panel"><div class="studio-preview-stage">${studioPreviewHtml(studio)}</div></div>${studioCalculatedResultsHtml(studio)}</section>
    <section class="studio-feedback-grid"><article><strong>Contrast level</strong><span>${feedback.contrast}</span>${feedback.tooSimilar?`<p class="calc-warning">Some colours are very similar. Add a lighter or darker contrast colour before committing.</p>`:""}</article><article><strong>Light / medium / dark balance</strong><span>${feedback.balance}</span></article><article><strong>Suggested main colour</strong><span>${escapeHtml(feedback.main.name)}</span></article><article><strong>Suggested contrast colour</strong><span>${escapeHtml(feedback.contrastColour.name)}</span></article><article><strong>Suggested border colour</strong><span>${escapeHtml(feedback.border.name)}</span></article><article><strong>Mood tags</strong><span>${feedback.tags.map(escapeHtml).join(" · ")}</span></article></section>
    <div class="studio-action-bar"><button class="secondary-button" data-studio-action="save-notes">Save to Project Notes</button><button class="secondary-button" data-studio-action="save-idea">Save as Idea</button><button class="secondary-button" data-studio-action="buy-list">Add colours to Buy List</button><button class="secondary-button" data-studio-action="copy-sequence">Copy colour sequence</button><button class="secondary-button" data-studio-action="copy-hex">Copy hex palette</button></div>
    <section class="studio-versions"><div class="section-heading compact-row"><div><p class="eyebrow">SAVED VERSIONS</p><h3>Compare before choosing</h3></div><button class="mini-button" data-studio-action="save-version">Save current version</button></div><div class="studio-version-grid">${["A","B","C"].map(v=>{const version=studio.versions?.[v]||null,preview=version?studioPreviewHtml({...studio,...version,settings:{...studio.settings,...version.settings},colors:version.colors||studio.colors},{mini:true}):`<div class="empty-state">Version ${v} is empty.</div>`;return `<article><h4>Version ${v}</h4>${preview}</article>`;}).join("")}</div></section>
  </section>`;
}
function projectToolContent(p, tool) {
  const saved = p.projectTools[tool] || {};
  const def=toolkitToolDefs.find(t=>t.id===tool)||toolkitToolDefs[0];
  const result=saved.result||"Your result will appear here.";
  const resultHtml=saved.calculator?calculatorResultHtml(saved.calculator):`<p>${escapeHtml(result)}</p>`;
  const card=(fields,button="Calculate")=>`<div class="toolkit-tool"><p class="tool-description">${escapeHtml(def.desc)}</p><p class="unit-preference-note">Preferred units: ${escapeHtml(unitSystemLabel())}</p>${fields}<p class="muted-copy estimate-disclaimer">${escapeHtml(estimateDisclaimer())}</p><div class="toolkit-actions"><button class="secondary-button" id="project-calculate">${button}</button><button class="mini-button" id="reset-tool-form">Reset</button><button class="mini-button" id="copy-calc-result">Copy result</button><button class="mini-button" id="save-tool-result">Save to Project Notes</button></div><div class="result-box" id="project-tool-result">${resultHtml}</div></div>`;
  if(["grid","stripe","pooling"].includes(tool))return renderingStudioContent(p,tool);
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
function activeStudioProject(){return getProject();}
function readStudio(){
  const p=activeStudioProject();
  p.projectTools=p.projectTools||{};
  return normalizeStudioState(p,currentProjectTool);
}
function saveStudio(studio,{render=true,toastMessage=""}={}){
  const p=activeStudioProject();
  p.projectTools=p.projectTools||{};
  const plan=studioCalculatedPlan(studio);
  p.projectTools.renderingStudio=studio;
  p.projectTools[currentProjectTool]={result:studioSummaryText(studio),inputs:studio,outputs:{palette:studioPaletteText(studio),mode:studio.mode,projectType:studio.projectType,total:plan.total,unit:plan.unit,usage:plan.usageRows.map(r=>({name:r.color.name,hex:r.color.hex,amount:r.amount,percent:r.percent,grams:r.grams}))}};
  p.projectTools.selectedTool=currentProjectTool;
  saveProjectTouch(p);
  if(toastMessage)toast(toastMessage);
  if(render){
    if(document.getElementById("tools-view")?.classList.contains("active"))renderTool("rendering-studio");
    else renderProjectDetail();
  }else refreshStudioLive(studio);
}
function studioSummaryText(studio){
  const feedback=studioColourFeedback(studio);
  return `${studio.projectType} ${studio.mode}: ${studio.colors.map(c=>`${c.name} ${c.hex}${c.brand?` (${c.brand}${c.line?` ${c.line}`:""})`:""}`).join(" / ")}. Contrast ${feedback.contrast}; mood ${feedback.tags.join(", ")}.`;
}
function refreshStudioLive(studio){
  const root=document.querySelector(".rendering-studio");
  if(!root)return;
  const stage=root.querySelector(".studio-preview-stage"),calc=root.querySelector(".studio-calculation-panel"),heading=root.querySelector(".studio-preview-head h2"),palette=root.querySelector(".studio-preview-head p:not(.eyebrow)");
  if(stage){stage.innerHTML=studioPreviewHtml(studio);bindStudioPreviewCells(root);}
  if(calc)calc.outerHTML=studioCalculatedResultsHtml(studio);
  if(heading)heading.textContent=`${studio.projectType} · ${studio.mode}`;
  if(palette)palette.textContent=studioPaletteText(studio);
}
function bindStudioPreviewCells(root=document){
  root.querySelectorAll("[data-studio-cell]").forEach(cell=>cell.onclick=()=>{const studio=readStudio();
    const index=Number(cell.dataset.studioCell),cols=Math.max(2,Number(studio.settings.columns)||18),rows=Math.max(2,Number(studio.settings.gridRows)||14),paint=studio.paintTool||"brush";
    studio.gridCells=Array.from({length:cols*rows},(_,i)=>studio.gridCells?.[i]??null);
    const value=paint==="eraser"?null:studio.activeColor;
    if(paint==="bucket")studio.gridCells=studio.gridCells.map(()=>value);
    else {
      studio.gridCells[index]=value;
      const r=Math.floor(index/cols),c=index%cols;
      if(studio.settings.mirrorH)studio.gridCells[r*cols+(cols-1-c)]=value;
      if(studio.settings.mirrorV)studio.gridCells[(rows-1-r)*cols+c]=value;
      if(studio.settings.mirrorH&&studio.settings.mirrorV)studio.gridCells[(rows-1-r)*cols+(cols-1-c)]=value;
    }
    saveStudio(studio,{render:false});
  });
}
function bindRenderingStudio(){
  const root=document.querySelector(".rendering-studio");
  if(!root)return;
  const update=(mutate,{render=true}={})=>{const studio=readStudio();mutate(studio);saveStudio(studio,{render});};
  document.getElementById("studio-project-type")?.addEventListener("change",e=>update(s=>{s.projectType=e.target.value;}));
  document.getElementById("studio-pattern-mode")?.addEventListener("change",e=>update(s=>{s.mode=e.target.value;}));
  document.getElementById("studio-active-colour")?.addEventListener("change",e=>update(s=>{s.activeColor=Number(e.target.value)||0;}));
  root.querySelectorAll("[data-studio-setting]").forEach(input=>input.addEventListener("input",e=>update(s=>{
    const key=e.target.dataset.studioSetting,value=e.target.type==="number"?Number(e.target.value)||0:e.target.value;
    s.settings[key]=key==="borderColor"?normalizeStudioHex(value,value):value;
  },{render:e.target.tagName==="SELECT"})));
  root.querySelectorAll("select[data-studio-setting]").forEach(input=>input.addEventListener("change",e=>update(s=>{s.settings[e.target.dataset.studioSetting]=Number.isFinite(Number(e.target.value))&&e.target.value!==""?Number(e.target.value):e.target.value;})));
  root.querySelectorAll("[data-studio-check]").forEach(input=>input.addEventListener("change",e=>update(s=>{s.settings[e.target.dataset.studioCheck]=e.target.checked;})));
  document.getElementById("studio-add-colour")?.addEventListener("click",()=>update(s=>{
    const selected=Array.from(document.getElementById("studio-stash-colour")?.selectedOptions||[]).map(option=>option.value).filter(Boolean),stashItems=selected.map(id=>(state.inventory||[]).find(i=>i.id===id)).filter(Boolean);
    if(stashItems.some(item=>!validHex(yarnItemColor(item))))return toast("One selected yarn needs a saved colour first. Scan or choose its colour in Yarn Stash.");
    if(stashItems.length){
      stashItems.forEach(stash=>s.colors.push({id:`studio-colour-${Date.now()}${Math.random().toString(16).slice(2)}`,name:yarnItemDisplayName(stash),hex:yarnItemColor(stash),brand:stash.brand||"Saved stash",line:stash.yarnName||stash.details||"",weight:1,locked:false,stashItemId:stash.id,colourNumber:stash.colourNumber||""}));
      s.activeColor=s.colors.length-1;return;
    }
    const name=(document.getElementById("studio-new-name")?.value||"New colour").trim();
    const hex=normalizeStudioHex(document.getElementById("studio-new-hex")?.value||name,"#718c72");
    s.colors.push({id:`studio-colour-${Date.now()}`,name,hex,brand:document.getElementById("studio-new-brand")?.value.trim()||"",line:document.getElementById("studio-new-line")?.value.trim()||"",weight:Math.max(1,Math.min(10,Number(document.getElementById("studio-new-weight")?.value)||1)),locked:false,stashItemId:"",colourNumber:""});
    s.activeColor=s.colors.length-1;
  },{render:true}));
  document.getElementById("studio-open-scan-yarn")?.addEventListener("click",()=>openYarnScanModal());
  root.querySelectorAll("[data-colour-field]").forEach(input=>input.addEventListener("change",e=>update(s=>{
    const card=e.target.closest("[data-studio-colour]"),i=Number(card?.dataset.studioColour),field=e.target.dataset.colourField;
    if(!s.colors[i]||s.colors[i].locked)return toast("Unlock this colour before editing.");
    s.colors[i][field]=field==="hex"?normalizeStudioHex(e.target.value,s.colors[i].hex):field==="weight"?Math.max(1,Math.min(10,Number(e.target.value)||1)):e.target.value;
  })));
  root.querySelectorAll("[data-studio-lock]").forEach(button=>button.onclick=()=>update(s=>{const c=s.colors[Number(button.dataset.studioLock)];if(c)c.locked=!c.locked;}));
  root.querySelectorAll("[data-studio-duplicate]").forEach(button=>button.onclick=()=>update(s=>{const c=s.colors[Number(button.dataset.studioDuplicate)];if(c)s.colors.splice(Number(button.dataset.studioDuplicate)+1,0,{...c,id:`studio-colour-${Date.now()}`,name:`${c.name} copy`,locked:false});}));
  root.querySelectorAll("[data-studio-update-stash]").forEach(button=>button.onclick=()=>{const studio=readStudio(),c=studio.colors[Number(button.dataset.studioUpdateStash)],item=(state.inventory||[]).find(i=>i.id===c?.stashItemId);if(!item)return toast("Original stash yarn was not found.");item.colourHex=c.hex;item.color=c.hex;item.colourSource="manual";item.colourConfidence=100;saveState();toast("Stash colour updated.");});
  root.querySelectorAll("[data-studio-delete]").forEach(button=>button.onclick=()=>update(s=>{if(s.colors.length<=1)return toast("Keep at least one colour.");s.colors.splice(Number(button.dataset.studioDelete),1);s.activeColor=Math.min(s.activeColor,s.colors.length-1);}));
  let dragIndex=null;
  root.querySelectorAll("[data-studio-colour]").forEach(card=>{
    card.addEventListener("dragstart",e=>{dragIndex=Number(card.dataset.studioColour);e.dataTransfer.effectAllowed="move";});
    card.addEventListener("dragover",e=>e.preventDefault());
    card.addEventListener("drop",e=>{e.preventDefault();const target=Number(card.dataset.studioColour);if(dragIndex===null||dragIndex===target)return;update(s=>{const [item]=s.colors.splice(dragIndex,1);s.colors.splice(target,0,item);s.activeColor=target;});dragIndex=null;});
  });
  root.querySelectorAll("[data-studio-paint-tool]").forEach(button=>button.onclick=()=>update(s=>{s.paintTool=button.dataset.studioPaintTool;}));
  bindStudioPreviewCells(root);
  root.querySelectorAll("[data-studio-version]").forEach(button=>button.onclick=()=>update(s=>{s.version=button.dataset.studioVersion;}));
  root.querySelectorAll("[data-studio-action]").forEach(button=>button.onclick=()=>handleStudioAction(button.dataset.studioAction));
}
function handleStudioAction(action){
  const studio=readStudio(),p=activeStudioProject(),text=studioSummaryText(studio);
  if(action==="save-project"){saveStudio(studio,{render:false,toastMessage:"Design saved to project."});return;}
  if(action==="replace-colour"){const from=studio.activeColor,to=(from+1)%studio.colors.length,cols=Math.max(2,Number(studio.settings.columns)||18),rows=Math.max(2,Number(studio.settings.gridRows)||14);studio.gridCells=Array.from({length:cols*rows},(_,i)=>studio.gridCells?.[i]??null).map(value=>value===from?to:value);studio.activeColor=to;saveStudio(studio,{toastMessage:`Replaced ${studio.colors[from]?.name||"colour"} with ${studio.colors[to]?.name||"next colour"}.`});return;}
  if(action==="save-notes"){p.notes=`${p.notes||""}${p.notes?"\n\n":""}[Project Rendering Studio]\n${text}`;saveStudio(studio,{render:false,toastMessage:"Saved to project notes."});return;}
  if(action==="save-grid"||action==="export-grid"){saveStudio(studio,{render:false,toastMessage:action==="save-grid"?"Grid saved to project.":"Grid preview ready to export."});if(action==="export-grid")exportStudioImage(studio);return;}
  if(action==="save-version"){studio.versions=studio.versions||{};studio.versions[studio.version]={projectType:studio.projectType,mode:studio.mode,colors:structuredClone(studio.colors),settings:structuredClone(studio.settings),gridCells:structuredClone(studio.gridCells||[])};saveStudio(studio,{toastMessage:`Version ${studio.version} saved.`});return;}
  if(action==="save-idea"){const idea=normalizeProjectIdea({id:`idea${Date.now()}`,title:`${studio.projectType} colour idea`,craftType:p.type||"Mixed / Other",projectKind:studio.projectType,inspirationNotes:text,description:text,sourcePlatform:"Project Rendering Studio",sourceTool:"Project Rendering Studio",calculatorValues:{outputs:{result:text},inputs:studio},savedCalculatorResults:[{toolName:"Project Rendering Studio",outputs:{result:text},inputs:studio}],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),archived:false});state.projectIdeas=[idea,...(state.projectIdeas||[])];saveStudio(studio,{render:false,toastMessage:"Saved as idea."});return;}
  if(action==="buy-list"){p.buyList=[...(p.buyList||[]),...studio.colors.map(c=>({id:`buy${Date.now()}${Math.random().toString(16).slice(2)}`,name:c.brand?`${c.brand} ${c.line||c.name}`:c.name,category:"Yarn",quantity:Math.max(1,Number(c.weight)||1),price:0,notes:`Colour ${c.name} ${c.hex} from Project Rendering Studio`}))];saveStudio(studio,{render:false,toastMessage:"Colours added to Buy List."});return;}
  if(action==="copy-sequence")return copyStudioText(studio.colors.map(c=>c.name).join(" -> "),"Colour sequence copied.");
  if(action==="copy-hex")return copyStudioText(studioPaletteText(studio),"Hex palette copied.");
  if(action==="export-image")return exportStudioImage(studio);
}
function copyStudioText(text,message){navigator.clipboard?.writeText(text).then(()=>toast(message)).catch(()=>toast("Copy is blocked in this browser."));}
function exportStudioImage(studio){
  const canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),w=1200,h=760;
  canvas.width=w;canvas.height=h;ctx.fillStyle="#fff9f0";ctx.fillRect(0,0,w,h);ctx.fillStyle="#5a4632";ctx.font="700 34px Inter";ctx.fillText(`${studio.projectType} - ${studio.mode}`,48,70);ctx.font="18px Inter";ctx.fillText(studioPaletteText(studio),48,108);
  const x=80,y=150,pw=1040,ph=520;
  if(studio.mode==="Grid Mode"){
    const cols=Math.max(2,Number(studio.settings.columns)||18),rows=Math.max(2,Number(studio.settings.gridRows)||14),cell=Math.min(pw/cols,ph/rows);
    for(let i=0;i<cols*rows;i++){ctx.fillStyle=studio.colors[studio.gridCells?.[i]??((Math.floor(i/cols)+i)%studio.colors.length)]?.hex||"#eee";ctx.fillRect(x+(i%cols)*cell,y+Math.floor(i/cols)*cell,cell,cell);}
  }else if(studio.mode==="Granny Square Mode"){
    const rounds=Math.max(1,Number(studio.settings.rounds)||5),seq=studioSequence(studio),cx=w/2,cy=y+ph/2,max=480;
    for(let i=rounds-1;i>=0;i--){ctx.fillStyle=studio.colors[seq[i%seq.length]||0]?.hex||"#ccc";const size=max*((i+1)/rounds);ctx.fillRect(cx-size/2,cy-size/2,size,size);}
  }else{
    const rows=studioStripeRows(studio),rh=ph/rows.length;
    rows.forEach((idx,i)=>{ctx.fillStyle=studio.colors[idx%studio.colors.length]?.hex||"#ccc";ctx.fillRect(x,y+i*rh,pw,rh+1);});
  }
  const link=document.createElement("a");link.download=`yarncha-${studio.projectType.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-preview.png`;link.href=canvas.toDataURL("image/png");link.click();toast("Preview exported as image.");
}
function yarnItemColor(item={}){return validHex(item.colourHex)?item.colourHex:validHex(item.color)?item.color:"";}
function yarnItemDisplayName(item={}){return [item.brand,item.yarnName||item.name,item.colourName].filter(Boolean).join(" · ")||item.name||"Saved yarn";}
function yarnItemDetails(item={}){
  return [item.colourNumber&&`Colour ${item.colourNumber}`,item.dyeLot&&`Lot ${item.dyeLot}`,item.weight,item.fibreContent,item.grams&&`${item.grams} g`,item.metres&&`${item.metres} m`,item.yards&&`${item.yards} yd`,item.hookSize&&`Hook ${item.hookSize}`,item.needleSize&&`Needle ${item.needleSize}`].filter(Boolean).join(" · ")||item.details||"Saved yarn";
}
function normalizeYarnStashItem(values={}){
  const name=values.name||[values.brand,values.yarnName,values.colourName].filter(Boolean).join(" ")||"Scanned yarn";
  const colourHex=normalizeStudioHex(values.colourHex||values.color||"",validHex(values.colourHex||values.color)?values.colourHex||values.color:"#718c72");
  return {id:values.id||`inv${Date.now()}${Math.random().toString(16).slice(2)}`,name,category:"Yarn",quantity:Math.max(0,Number(values.quantity)||1),unit:values.unit||"balls",color:colourHex,details:values.details||"",brand:values.brand||"",yarnName:values.yarnName||name,barcode:values.barcode||"",colourName:values.colourName||"",colourNumber:values.colourNumber||"",dyeLot:values.dyeLot||"",colourHex,colourSource:values.colourSource||"manual",colourConfidence:Number(values.colourConfidence)||0,weight:values.weight||"",fibreContent:values.fibreContent||"",grams:Number(values.grams)||0,metres:Number(values.metres)||0,yards:Number(values.yards)||0,hookSize:values.hookSize||"",needleSize:values.needleSize||"",notes:values.notes||"",photoBlobId:values.photoBlobId||"",labelPhotoBlobId:values.labelPhotoBlobId||""};
}
function extractYarnLabelFields(text=""){
  const clean=String(text||""),pick=regex=>clean.match(regex)?.[1]?.trim()||"";
  return {
    colourNumber:pick(/(?:colou?r|shade)\s*(?:no\.?|number|#)?\s*[:\-]?\s*([A-Z0-9\-\/]+)/i),
    colourName:pick(/(?:colou?r|shade)\s*(?:name)?\s*[:\-]\s*([A-Za-z][A-Za-z\s\-]{2,30})/i),
    dyeLot:pick(/(?:dye\s*)?lot\s*(?:no\.?|number|#)?\s*[:\-]?\s*([A-Z0-9\-\/]+)/i),
    weight:pick(/(?:weight|category)\s*[:\-]?\s*([A-Za-z0-9\s#\/-]{2,24})/i),
    fibreContent:pick(/((?:\d{1,3}%\s*)?(?:wool|cotton|acrylic|alpaca|merino|nylon|polyester|cashmere|silk|linen|bamboo)[A-Za-z0-9%,\s]*)/i),
    grams:pick(/(\d{2,4})\s*g(?:rams?)?/i),
    metres:pick(/(\d{2,5})\s*m(?:etres?|eters?)?/i),
    yards:pick(/(\d{2,5})\s*y(?:ards?|ds?)?/i),
    hookSize:pick(/(?:hook|crochet)\s*(?:size)?\s*[:\-]?\s*([0-9.]+\s*mm|[A-Z]\-?[0-9]?)/i),
    needleSize:pick(/(?:needle|knitting)\s*(?:size)?\s*[:\-]?\s*([0-9.]+\s*mm|US\s*[0-9]+)/i)
  };
}
function imageFileToElement(file){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=URL.createObjectURL(file);});}
async function estimateImageColour(file){
  const img=await imageFileToElement(file),canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),size=80;
  canvas.width=size;canvas.height=size;ctx.drawImage(img,0,0,size,size);
  const data=ctx.getImageData(20,20,40,40).data,total=[0,0,0];let count=0;
  for(let i=0;i<data.length;i+=4){if(data[i+3]<128)continue;total[0]+=data[i];total[1]+=data[i+1];total[2]+=data[i+2];count++;}
  const rgb=total.map(v=>Math.round(v/Math.max(1,count))),hex=studioRgbToHex(rgb);
  return {hex,confidence:72,swatches:[hex,studioInterpolateHex(hex,"#ffffff",.18),studioInterpolateHex(hex,"#000000",.12)]};
}
async function scanBarcodeFromFile(file){
  if(!("BarcodeDetector" in window))return {barcode:"",message:"Barcode scanning is not supported in this browser yet. You can type the barcode or scan the label."};
  try{
    const detector=new BarcodeDetector({formats:["ean_13","ean_8","upc_a","upc_e","code_128","qr_code"]}),bitmap=await createImageBitmap(file),codes=await detector.detect(bitmap),barcode=codes[0]?.rawValue||"";
    return barcode?{barcode,message:"We found the barcode, but cannot identify this yarn yet. You can scan the label or add details manually."}:{barcode:"",message:"No barcode was found. Try a clearer photo or add the number manually."};
  }catch{return {barcode:"",message:"Barcode scanning did not work in this browser. You can continue manually."};}
}
function openYarnScanModal(initial={}){
  openModal(`<p class="eyebrow">YARN STASH</p><h2>Scan Yarn</h2><p class="muted-copy">Use your camera where supported, or upload a photo. Barcode and OCR results are only starting points; review everything before saving.</p>
    <div class="scan-yarn-actions"><button class="secondary-button" id="scan-barcode">Scan barcode</button><button class="secondary-button" id="scan-label">Scan yarn label text</button><button class="secondary-button" id="scan-colour">Take yarn colour photo</button><button class="secondary-button" id="scan-manual">Add manually</button></div>
    <div class="privacy-note">Estimated colour from your photo. You can adjust it to match your yarn. Lighting, camera, monitor screen, and dye lot affect colour.</div>
    <input id="scan-barcode-file" type="file" accept="image/*" capture="environment" hidden>
    <input id="scan-label-file" type="file" accept="image/*" capture="environment" hidden>
    <input id="scan-colour-file" type="file" accept="image/*" capture="environment" hidden>`);
  const draft={...initial};
  document.getElementById("scan-barcode").onclick=()=>document.getElementById("scan-barcode-file").click();
  document.getElementById("scan-label").onclick=()=>document.getElementById("scan-label-file").click();
  document.getElementById("scan-colour").onclick=()=>document.getElementById("scan-colour-file").click();
  document.getElementById("scan-manual").onclick=()=>openYarnScanReviewModal(draft);
  document.getElementById("scan-barcode-file").onchange=async e=>{const file=e.target.files?.[0];if(!file)return;const scan=await scanBarcodeFromFile(file);draft.barcode=scan.barcode;draft.colourSource=draft.colourSource||"barcode";toast(scan.message);openYarnScanReviewModal(draft);};
  document.getElementById("scan-label-file").onchange=async e=>{const file=e.target.files?.[0];if(!file)return;const assetId=`yarn-label-${Date.now()}`;await putAsset(assetId,file);toast("Reading label text...");const scan=await ocrFile(file);Object.assign(draft,extractYarnLabelFields(scan.text),{labelPhotoBlobId:assetId,colourSource:draft.colourSource||"label-ocr",notes:[draft.notes,scan.text&&`Scanned label text:\n${scan.text.slice(0,1200)}`].filter(Boolean).join("\n\n")});openYarnScanReviewModal(draft);};
  document.getElementById("scan-colour-file").onchange=async e=>{const file=e.target.files?.[0];if(!file)return;const assetId=`yarn-photo-${Date.now()}`;await putAsset(assetId,file);const colour=await estimateImageColour(file);Object.assign(draft,{photoBlobId:assetId,colourHex:colour.hex,colourConfidence:colour.confidence,colourSource:"photo-scan",swatches:colour.swatches});openYarnScanReviewModal(draft);};
}
function openYarnScanReviewModal(draft={}){
  const swatches=(draft.swatches||[draft.colourHex]).filter(validHex);
  openModal(`<p class="eyebrow">REVIEW SCANNED YARN</p><h2>Save to Yarn Stash</h2><p class="muted-copy">Correct anything that looks off before saving. Barcode does not guarantee exact shade or dye lot.</p>
    <div class="form-grid">
      <div class="field"><label>Brand</label><input id="scan-brand" value="${escapeHtml(draft.brand||"")}"></div><div class="field"><label>Yarn name</label><input id="scan-yarn-name" value="${escapeHtml(draft.yarnName||draft.name||"")}"></div>
      <div class="field"><label>Barcode</label><input id="scan-barcode-value" value="${escapeHtml(draft.barcode||"")}"></div><div class="field"><label>Colour name</label><input id="scan-colour-name" value="${escapeHtml(draft.colourName||"")}"></div>
      <div class="field"><label>Colour number</label><input id="scan-colour-number" value="${escapeHtml(draft.colourNumber||"")}"></div><div class="field"><label>Dye lot</label><input id="scan-dye-lot" value="${escapeHtml(draft.dyeLot||"")}"></div>
      <div class="field"><label>Colour HEX</label><input id="scan-colour-hex" type="color" value="${validHex(draft.colourHex)?draft.colourHex:"#718c72"}"></div><div class="field"><label>Colour source</label><select id="scan-colour-source">${["barcode","label-ocr","photo-scan","manual"].map(v=>`<option value="${v}" ${(draft.colourSource||"manual")===v?"selected":""}>${v}</option>`).join("")}</select></div>
      <div class="field"><label>Weight</label><input id="scan-weight" value="${escapeHtml(draft.weight||"")}"></div><div class="field"><label>Fibre content</label><input id="scan-fibre" value="${escapeHtml(draft.fibreContent||"")}"></div>
      <div class="field"><label>Grams</label><input id="scan-grams" type="number" value="${draft.grams||""}"></div><div class="field"><label>Metres</label><input id="scan-metres" type="number" value="${draft.metres||""}"></div>
      <div class="field"><label>Yards</label><input id="scan-yards" type="number" value="${draft.yards||""}"></div><div class="field"><label>Quantity</label><input id="scan-quantity" type="number" min="0" value="${draft.quantity||1}"></div>
      <div class="field"><label>Hook suggestion</label><input id="scan-hook" value="${escapeHtml(draft.hookSize||"")}"></div><div class="field"><label>Needle suggestion</label><input id="scan-needle" value="${escapeHtml(draft.needleSize||"")}"></div>
      <div class="field full"><label>Notes</label><textarea id="scan-notes" rows="4">${escapeHtml(draft.notes||"")}</textarea></div>
    </div>${swatches.length?`<div class="scan-swatch-row">${swatches.map(hex=>`<button style="background:${hex}" data-scan-swatch="${hex}" aria-label="Use ${hex}"></button>`).join("")}</div>`:""}
    <p class="privacy-note">Estimated colour from your photo. You can adjust it to match your yarn.</p>
    <div class="modal-actions"><button class="secondary-button" id="scan-more">Scan another part</button><button class="primary-button" id="save-scanned-yarn">Save yarn</button></div>`);
  document.querySelectorAll("[data-scan-swatch]").forEach(b=>b.onclick=()=>{document.getElementById("scan-colour-hex").value=b.dataset.scanSwatch;});
  document.getElementById("scan-more").onclick=()=>openYarnScanModal(readYarnScanReview(draft));
  document.getElementById("save-scanned-yarn").onclick=()=>saveScannedYarn(readYarnScanReview(draft));
}
function readYarnScanReview(draft={}){
  return {...draft,brand:valueOf("scan-brand"),yarnName:valueOf("scan-yarn-name"),barcode:valueOf("scan-barcode-value"),colourName:valueOf("scan-colour-name"),colourNumber:valueOf("scan-colour-number"),dyeLot:valueOf("scan-dye-lot"),colourHex:valueOf("scan-colour-hex"),colourSource:valueOf("scan-colour-source")||"manual",weight:valueOf("scan-weight"),fibreContent:valueOf("scan-fibre"),grams:Number(valueOf("scan-grams"))||0,metres:Number(valueOf("scan-metres"))||0,yards:Number(valueOf("scan-yards"))||0,quantity:Number(valueOf("scan-quantity"))||1,hookSize:valueOf("scan-hook"),needleSize:valueOf("scan-needle"),notes:valueOf("scan-notes"),colourConfidence:draft.colourConfidence||((valueOf("scan-colour-source")==="manual")?100:60)};
}
function saveScannedYarn(values){
  const item=normalizeYarnStashItem(values);
  const existing=state.inventory.find(i=>i.id===item.id)||(item.barcode?state.inventory.find(i=>i.barcode&&i.barcode===item.barcode&&i.colourNumber===item.colourNumber):null);
  if(existing)Object.assign(existing,item,{id:existing.id,quantity:item.id===existing.id?item.quantity:(Number(existing.quantity)||0)+(Number(item.quantity)||1)});
  else state.inventory.push(item);
  saveState();closeModal();renderMarket();toast("Yarn saved to Yarn Stash.");
}
function activateProjectTab(tabId,p=getProject()){
  const validTabs=["track","chart","project","assistant"];
  if(!p)return showView("projects");
  if(!validTabs.includes(tabId)){
    console.warn("[Yarncha project tabs] Unknown tab", {tabId,projectId:p.id});
    toast("That project section is not available yet.");
    return;
  }
  p.activeTab=tabId;
  p.readingMode=false;
  p.yarnchaAssistant=p.yarnchaAssistant||{};
  p.projectTools=p.projectTools||{};
  saveProjectTouch(p);
  try{
    renderProjectDetail();
  }catch(error){
    const details=navigationErrorDetails(error);
    console.error(`[Yarncha project tabs] Render failed: ${details.message}\n${details.stack}`, {tabId,projectId:p.id});
    const host=document.querySelector(".project-tab-panel");
    if(host){
      host.innerHTML=tabId==="assistant"
        ? `<div class="empty-state card"><h3>Assistant is ready</h3><p>Add your question, row issue, sizing issue, or troubleshooting note.</p></div>`
        : `<div class="empty-state card"><h3>Project setup is ready</h3><p>Some details are missing. Add yarn, hook/needle, gauge, or notes to improve suggestions.</p></div>`;
    }
    toast(`${tabId[0].toUpperCase()+tabId.slice(1)} could not fully load. Your project is still saved.`);
  }
}
function bindProjectDetail() {
  const p = getProject();
  document.querySelectorAll("[data-project-tab]").forEach(button=>bindDirectNavigation(button,()=>activateProjectTab(button.dataset.projectTab,p),`Project ${button.dataset.projectTab} tab`));
  document.querySelectorAll("[data-counter]").forEach(b => b.onclick = () => changeMainCounter(Number(b.dataset.counter)));
  document.querySelectorAll("[data-sub]").forEach(b => b.onclick = () => {
    const s = p.subCounters.find(x => x.id === b.dataset.sub);
    if(!s)return;
    const normalized=normalizeSubCounter(s),delta=Number(b.dataset.delta)||0,next=(Number(normalized.count)||0)+(delta*normalized.step);
    normalized.count = Math.max(normalized.resetValue??normalized.start??0, normalized.max===null?next:Math.min(normalized.max,next));
    normalized.syncRow=Number(p.row)||0;
    normalized.syncCount=normalized.count;
    Object.assign(s,normalized);
    p.repeatRules=repeatEngine()?.migrateRepeatRules([p])?.[0]?.repeatRules||p.repeatRules||[];
    saveProjectTouch(p); renderProjectDetail();
  });
  document.querySelectorAll("[data-counter-more]").forEach(b => b.onclick = () => openSubCounterActionsModal(b.dataset.counterMore));
  document.getElementById("project-notes")?.addEventListener("input", e => { p.notes = e.target.value; saveProjectTouch(p); });
  document.getElementById("pdf-reference")?.addEventListener("input", e => { p.pdfReference=e.target.value; saveProjectTouch(p); });
  document.getElementById("edit-project-name")?.addEventListener("click", openEditProjectModal);
  document.getElementById("project-cover-picker")?.addEventListener("click", openProjectCoverPicker);
  document.getElementById("edit-project-from-counter")?.addEventListener("click", openEditProjectModal);
  document.getElementById("edit-main-row")?.addEventListener("click", openEditRowModal);
  document.getElementById("add-marker")?.addEventListener("click", () => openMarkerModal());
  document.querySelectorAll("[data-edit-marker]").forEach(b=>b.onclick=()=>openMarkerModal(b.dataset.editMarker));
  document.querySelectorAll("[data-delete-marker]").forEach(b=>b.onclick=()=>{p.markers=p.markers.filter(m=>(m.id||`${m.row}-${m.color}`)!==b.dataset.deleteMarker);saveState();renderProjectDetail();});
  document.getElementById("add-sub-counter")?.addEventListener("click", openSubCounterModal);
  document.getElementById("add-row-reminder")?.addEventListener("click",()=>openRowReminderModal());
  document.querySelectorAll("[data-edit-reminder]").forEach(b=>b.onclick=()=>openRowReminderModal(b.dataset.editReminder));
  document.querySelectorAll("[data-toggle-reminder]").forEach(b=>b.onclick=()=>{const reminder=(p.rowReminders||[]).find(r=>r.id===b.dataset.toggleReminder);if(!reminder)return;reminder.paused=!reminder.paused;reminder.active=false;saveProjectTouch(p);renderProjectDetail();toast(reminder.paused?"Reminder paused":"Reminder resumed");});
  document.querySelectorAll("[data-delete-reminder]").forEach(b=>b.onclick=()=>{const reminder=(p.rowReminders||[]).find(r=>r.id===b.dataset.deleteReminder);if(!reminder)return;if(!confirm(`Delete "${reminder.name}"?`))return;p.rowReminders=p.rowReminders.filter(r=>r.id!==reminder.id);if(p.activeRowReminder?.id===reminder.id)p.activeRowReminder=null;saveProjectTouch(p);renderProjectDetail();});
  document.querySelectorAll("[data-test-reminder]").forEach(b=>b.onclick=()=>{const reminder=(p.rowReminders||[]).find(r=>r.id===b.dataset.testReminder);if(reminder)readRowReminderAloud(p,normalizeRowReminder(reminder));});
  document.querySelectorAll("[data-row-reminder-snooze]").forEach(b=>b.onclick=()=>{const reminder=(p.rowReminders||[]).find(r=>r.id===b.dataset.rowReminderSnooze);if(!reminder)return;reminder.snoozedUntilRow=(Number(p.row)||0)+1;p.activeRowReminder=null;saveProjectTouch(p);renderProjectDetail();toast("Reminder snoozed until the next row.");});
  document.querySelectorAll("[data-row-reminder-done]").forEach(b=>b.onclick=()=>{const reminder=(p.rowReminders||[]).find(r=>r.id===b.dataset.rowReminderDone);if(!reminder)return;reminder.doneRows=[...(reminder.doneRows||[]),Number(p.row)||0];if(reminder.repeat===false)reminder.paused=true;p.activeRowReminder=null;saveProjectTouch(p);renderProjectDetail();});
  ["row-reminder-speed","row-reminder-volume"].forEach(id=>document.getElementById(id)?.addEventListener("change",()=>{p.rowReminderVoice=normalizeRowReminderVoice({speed:valueOf("row-reminder-speed"),language:state.language,volume:valueOf("row-reminder-volume")});saveProjectTouch(p);renderProjectDetail();toast("Reminder voice settings saved.");}));
  document.getElementById("speak-row")?.addEventListener("click", () => speak(buildRowGuidance(p)));
  document.querySelectorAll("#voice-project,[data-voice-project]").forEach(b=>b.onclick = startVoice);
  document.getElementById("toggle-reading")?.addEventListener("click",()=>{p.readingMode=!p.readingMode;p.activeTab="chart";saveProjectTouch(p);renderProjectDetail();});
  document.querySelectorAll("[data-chart-mode]").forEach(b=>b.onclick=()=>{p.chartMode=b.dataset.chartMode;if(p.chartMode==="flow")toast("Flow Mode stays inside this project chart. Review every AI suggestion before using it.");saveProjectTouch(p);renderProjectDetail();});
  bindYarnchaAssistant(p);
  document.getElementById("flow-toggle")?.addEventListener("click",()=>{p.flowMode=!p.flowMode;saveProjectTouch(p);renderProjectDetail();});
  document.getElementById("edit-chart-legend")?.addEventListener("click",openChartLegendModal);
  document.getElementById("add-analysis-row")?.addEventListener("click",()=>openChartRowModal());
  document.getElementById("run-cloud-analysis-local")?.addEventListener("click",()=>{const button=document.getElementById("run-cloud-analysis");if(button)button.click();else document.getElementById("run-flow-recognition")?.click();});
  document.getElementById("review-chart-cells-local")?.addEventListener("click",()=>{const button=document.getElementById("load-cloud-cells");if(button)button.click();else openChartLegendModal();});
  bindProjectSetupPanels(p);
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
  document.getElementById("reset-main")?.addEventListener("click", () => { setMainRow(0,{render:false}); p.subCounters=p.subCounters.map(counter=>{const s=normalizeSubCounter(counter);s.count=s.resetValue??s.start??0;s.syncRow=0;s.syncCount=s.count;s.lastVoiceRow=null;return s;}); p.repeatRules=repeatEngine()?.migrateRepeatRules([p])?.[0]?.repeatRules||p.repeatRules||[]; saveProjectTouch(p); renderProjectDetail(); toast("Counters reset"); });
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
  bindRenderingStudio();
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
}
function bindYarnchaAssistant(p=getProject()){
  if(!document.querySelector(".yarncha-assistant-panel"))return;
  p.yarnchaAssistant=p.yarnchaAssistant||{};
  const savePrefs=()=>{
    p.yarnchaAssistant.skillLevel=normalizeAssistantSkill(document.getElementById("chart-assistant-skill")?.value||p.yarnchaAssistant.skillLevel);
    p.yarnchaAssistant.craftType=normalizeAssistantCraft(document.getElementById("chart-assistant-craft")?.value||p.yarnchaAssistant.craftType);
    p.yarnchaAssistant.selectedTechnique=document.getElementById("chart-assistant-technique")?.value||"";
    p.yarnchaAssistant.draftQuestion=document.getElementById("chart-assistant-question")?.value||"";
    saveProjectTouch(p);
  };
  document.getElementById("chart-assistant-skill")?.addEventListener("change",()=>{savePrefs();renderProjectDetail();});
  document.getElementById("chart-assistant-craft")?.addEventListener("change",()=>{const technique=document.getElementById("chart-assistant-technique");if(technique)technique.value="";p.yarnchaAssistant.selectedTechnique="";savePrefs();renderProjectDetail();});
  document.getElementById("chart-assistant-technique")?.addEventListener("change",()=>{savePrefs();});
  document.getElementById("chart-assistant-question")?.addEventListener("input",()=>{p.yarnchaAssistant.draftQuestion=document.getElementById("chart-assistant-question").value;saveStateSoon();});
  const suggestionPrompts={
    "My stitch count is wrong":"My stitch count is wrong on this row. Help me check what I should do next.",
    "Explain this symbol":"Explain this chart symbol and tell me how to check it against the legend.",
    "Help me read this row":"Help me read this row. Break down the repeats and tell me what to do first.",
    "Fix a dropped stitch":"I dropped a stitch. Help me fix it step by step.",
    "What does this abbreviation mean?":"What does this abbreviation mean, and does it change my stitch count?",
    "Why does my project look different?":"Why does my project look different from the pattern photo? Help me check gauge, yarn, and stitch count."
  };
  document.querySelectorAll("[data-assistant-suggestion]").forEach(button=>button.onclick=()=>{const box=document.getElementById("chart-assistant-question");if(box){box.value=suggestionPrompts[button.dataset.assistantSuggestion]||button.dataset.assistantSuggestion;box.focus();p.yarnchaAssistant.draftQuestion=box.value;saveStateSoon();}});
  document.getElementById("ask-chart-assistant")?.addEventListener("click",()=>askChartYarnchaAssistant(p));
  document.querySelectorAll("[data-assistant-memory]").forEach(button=>button.onclick=()=>handleAssistantMemoryAction(button.dataset.assistantMemory,p));
  document.querySelectorAll("[data-library-link]").forEach(button=>button.onclick=()=>openLibraryWikiEntry(button.dataset.libraryLink));
  document.querySelectorAll("[data-assistant-tool]").forEach(button=>button.onclick=()=>{const match=toolkitToolDefs.find(tool=>tool.name===button.dataset.assistantTool||tool.name.includes(button.dataset.assistantTool.split(" ")[0]));if(match){showView("tools");renderTool(match.id);}else toast(`${button.dataset.assistantTool} is in the Tool Manual.`);});
}
async function askChartYarnchaAssistant(p=getProject()){
  p.yarnchaAssistant=p.yarnchaAssistant||{};
  const question=document.getElementById("chart-assistant-question")?.value.trim();
  if(!question)return toast("Ask Yarncha Assistant a question first.");
  const skillLevel=normalizeAssistantSkill(document.getElementById("chart-assistant-skill")?.value||p.yarnchaAssistant.skillLevel);
  const craftType=normalizeAssistantCraft(document.getElementById("chart-assistant-craft")?.value||p.yarnchaAssistant.craftType);
  const selectedTechnique=document.getElementById("chart-assistant-technique")?.value||p.yarnchaAssistant.selectedTechnique||"";
  const projectContext={...projectContextService.getCurrentProjectContext(),skillLevel,craftType,selectedTechnique};
  const answer=await yarnchaAssistantService.askYarnchaAssistant({question,projectContext,skillLevel,craftType});
  p.yarnchaAssistant={...p.yarnchaAssistant,skillLevel,craftType,selectedTechnique,lastQuestion:question,draftQuestion:"",lastAnswer:answer,recentQuestions:[question,...(p.yarnchaAssistant.recentQuestions||[])].slice(0,8)};
  saveProjectTouch(p);
  renderProjectDetail();
}
function handleAssistantMemoryAction(action,p=getProject()){
  const assistant=p.yarnchaAssistant||{},answer=assistant.lastAnswer,context=projectContextService.getCurrentProjectContext();
  if(!answer)return toast("Ask Yarncha Assistant first.");
  const summary=answer.quickAnswer||assistant.lastQuestion||"Yarncha Assistant explanation";
  if(action==="save-explanation"){learningMemoryService.saveProjectNote(p.id,summary);toast("Explanation saved to local learning memory.");}
  if(action==="add-notes"){p.notes=`${p.notes||""}${p.notes?"\n\n":""}Yarncha Assistant: ${summary}`;saveProjectTouch(p);toast("Added to project notes.");}
  if(action==="add-checklist"){state.libraryProjectChecklist=[{id:`assistant-check${Date.now()}`,projectId:p.id,text:summary,source:"Yarncha Assistant",createdAt:new Date().toISOString()},...(state.libraryProjectChecklist||[])];saveState();toast("Assistant advice added as a checklist item.");}
  if(action==="save-troubleshooting"){p.troubleshootingNotes=[{id:`trouble${Date.now()}`,question:assistant.lastQuestion||"",summary,missingInformation:answer.missingInformation||[],relatedTools:answer.relatedTools||[],createdAt:new Date().toISOString()},...(p.troubleshootingNotes||[])];saveProjectTouch(p);toast("Troubleshooting result saved to this project.");}
  if(action==="create-calculator-input"){p.assistantCalculatorInputs=[{id:`calc-input${Date.now()}`,source:"Yarncha Assistant",question:assistant.lastQuestion||"",suggestedTool:(answer.relatedTools||[])[0]||"Gauge / Swatch Adapter",summary,createdAt:new Date().toISOString()},...(p.assistantCalculatorInputs||[])];saveProjectTouch(p);toast("Calculator input draft saved to this project.");}
  if(action==="link-library"){p.linkedLibraryEntries=[...new Set([...(p.linkedLibraryEntries||[]),...(answer.libraryLinks||[]).map(link=>String(link.target||"").replace("library:","")).filter(Boolean)])];saveProjectTouch(p);toast("Library entries linked to this project.");}
  if(action==="remember-correction"){learningMemoryService.saveUserCorrection({projectId:p.id,question:assistant.lastQuestion,correction:summary,craftType:assistant.craftType});toast("Correction remembered locally.");}
  if(action==="verify-symbol"){learningMemoryService.saveVerifiedSymbol(p.id,{symbol:context.currentSymbol||assistant.lastQuestion,meaning:summary,question:assistant.lastQuestion});toast("Symbol marked as verified locally.");}
  renderProjectDetail();
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
  applySharedProjectSetup(p,{
    bodyMeasurementCm:p.fitCheck.bodyChest,
    finishedWidthCm:p.fitCheck.finishedChest,
    intendedEaseCm:p.fitCheck.intendedEase,
    targetLengthCm:p.fitCheck.targetLength,
    currentLengthCm:p.fitCheck.currentLength,
    fitFeeling:p.fitCheck.feeling,
    tryOnNotes:p.fitCheck.notes
  });
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
    patternToolSizeMm:value("flow-pattern-tool"),
    patternYarnWeight:value("flow-pattern-yarn-weight"),
    userToolSize:value("flow-user-tool"),
    userToolSizeMm:value("flow-user-tool"),
    userYarnWeight:value("flow-user-yarn-weight"),
    patternGaugeStitches:value("flow-pattern-gauge-stitches"),
    patternGaugeRows:value("flow-pattern-gauge-rows"),
    userGaugeStitches:value("flow-user-gauge-stitches"),
    userGaugeRows:value("flow-user-gauge-rows"),
    gaugeWidthCm:value("flow-gauge-width")||10,
    gaugeHeightCm:value("flow-gauge-height")||10,
    stitchRepeatMultiple:value("flow-repeat-multiple"),
    edgeStitches:value("flow-edge-stitches"),
    swatchWidthCm:value("flow-swatch-width"),
    swatchHeightCm:value("flow-swatch-height"),
    swatchWeightGrams:value("flow-swatch-weight"),
    patternYarnGrams:value("flow-pattern-yarn-grams"),
    patternAreaCm2:value("flow-pattern-area"),
    originalPatternStitches:value("flow-original-stitches"),
    originalPatternRows:value("flow-original-rows"),
    patternWidthCm:value("flow-pattern-width"),
    patternLengthCm:value("flow-pattern-length"),
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
    const sharedForm=document.querySelector('[data-project-setup-form="flow"]');
    const setup=sharedForm?applySharedProjectSetup(p,collectProjectSetupPanel(sharedForm)):applySharedProjectSetup(p,setupForm());
    p.size=isGarmentProject(setup.projectType)?(setup.desiredSize==="Custom"?(setup.customSize||"Custom"):setup.desiredSize):setup.projectType;
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
  ["flow-pattern-gauge","flow-pattern-tool","flow-pattern-yarn-weight","flow-user-tool","flow-user-yarn-weight","flow-pattern-gauge-stitches","flow-pattern-gauge-rows","flow-user-gauge-stitches","flow-user-gauge-rows","flow-gauge-width","flow-gauge-height","flow-repeat-multiple","flow-edge-stitches","flow-swatch-width","flow-swatch-height","flow-swatch-weight","flow-pattern-yarn-grams","flow-pattern-area","flow-original-stitches","flow-original-rows","flow-pattern-width","flow-pattern-length","flow-custom-size","flow-body-chest","flow-body-waist","flow-body-hip","flow-body-sleeve","flow-body-body","flow-item-width","flow-item-height","flow-item-length","flow-item-depth","flow-strap-length","flow-strap-width","flow-border-width","flow-square-size","flow-block-width","flow-block-height","flow-finished-height","flow-finished-width","flow-original-height","flow-original-width","flow-target-height","flow-original-yarn","flow-original-stuffing","flow-original-eye","flow-wingspan","flow-upper-arm","flow-wrist","flow-armhole-depth","flow-button-band","flow-skirt-length"].forEach(id=>{
    document.getElementById(id)?.addEventListener("input",markFlowSetupUnsaved);
  });
  document.getElementById("start-flow-mode")?.addEventListener("click",()=>{saveFlowSetup({render:false});document.getElementById("flow-current-row")?.scrollIntoView({behavior:"smooth",block:"center"});toast("Flow Mode is ready.");});
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
    p.subCounters=(p.subCounters||[]).map(counter=>syncSubCounterToMainRow(counter,oldRow,next));
    p.repeatRules=repeatEngine()?.migrateRepeatRules([p])?.[0]?.repeatRules||p.repeatRules||[];
    triggerRowReminders(p,next);
    const reached=(p.markers||[]).find(marker=>Number(marker.row)===next);
    if(reached)toast(`You reached Row ${next} marker${reached.label?`: ${reached.label}`:""}.`);
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
    if(event.pointerType==="touch"&&event.isPrimary===false){touchReadTap=null;return;}
    touchReadTap={pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,startedAt:Date.now(),pt,moved:false,target:event.target.closest?.("#chart-stage .chart-canvas")};
    return;
  }
  touchReadTap=null;
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
    rowMaskDragState={action,start:pt,original:{...p.rowMask}};
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
  if(touchReadTap&&event.pointerId===touchReadTap.pointerId){
    if(Math.hypot(event.clientX-touchReadTap.startX,event.clientY-touchReadTap.startY)>8)touchReadTap.moved=true;
    return;
  }
  if(rowMaskDragState&&p.rowMask){
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
  if(touchReadTap&&event.pointerId===touchReadTap.pointerId){
    const tap=touchReadTap;
    touchReadTap=null;
    const duration=Date.now()-tap.startedAt;
    const distance=Math.hypot(event.clientX-tap.startX,event.clientY-tap.startY);
    const targetInsideChart=!!event.target.closest?.("#chart-stage .chart-canvas");
    const canOpen=activeAnnotationTool==="touch"&&!tap.moved&&distance<8&&duration<500&&!drawingStroke&&!rowMaskDragState&&!arrowDrag&&targetInsideChart&&tap.target;
    if(canOpen){
      event.preventDefault();
      handleTouchRead(tap.pt);
    }
    return;
  }
  touchReadTap=null;
  if(rowMaskDragState){rowMaskDragState=null;saveProjectTouch(getProject());return;}
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
  const m=p.rowMask,o=rowMaskDragState.original,dx=pt.x-rowMaskDragState.start.x,dy=pt.y-rowMaskDragState.start.y,min=32;
  if(rowMaskDragState.action==="move"){m.x=Math.max(0,Math.min(1000-o.width,o.x+dx));m.y=Math.max(0,Math.min(1000-o.height,o.y+dy));return;}
  if(p.maskLockSize)return;
  if(rowMaskDragState.action.includes("e"))m.width=Math.max(min,Math.min(1000-m.x,o.width+dx));
  if(rowMaskDragState.action.includes("s"))m.height=Math.max(min,Math.min(1000-m.y,o.height+dy));
  if(rowMaskDragState.action.includes("w")){const nx=Math.max(0,Math.min(o.x+dx,o.x+o.width-min));m.width=o.width+(o.x-nx);m.x=nx;}
  if(rowMaskDragState.action.includes("n")){const ny=Math.max(0,Math.min(o.y+dy,o.y+o.height-min));m.height=o.height+(o.y-ny);m.y=ny;}
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
  const linked = p.subCounters.filter(s=>s.linked!==false).map(s=>{const c=normalizeSubCounter(s),next=subCounterRowsUntilNext(c,p.row);return `${c.name} is at ${c.count}, updates every ${c.every} rows${c.anchorRow?`, anchored at row ${c.anchorRow}`:""}, next update in ${next} rows.`;}).join(" ");
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
  return instructionSteps(sequence).map(token=>spokenSymbolPhrase(token,{mode,craft})).join(", ") || "No checked written instruction is saved for this row.";
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
  const [firstAttachment=null]=p.attachments;
  if(p.chart?.assetId===id)p.chart=firstAttachment?{name:firstAttachment.name,type:firstAttachment.type,data:null,assetId:firstAttachment.id}:null;
  if(p.activeChartAssetId===id)p.activeChartAssetId=firstAttachment?.id||null;
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
  const project={id:`p${Date.now()}`,name:idea.title||"Project from idea",type:projectTypeOptions.includes(craft)?craft:"Mixed / Other",projectKind:idea.projectKind||"Custom idea",color:colors[state.projects.length%colors.length],row:1,totalRows:null,started:new Date().toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"}),notes,subCounters:[],rowReminders:[],rowReminderVoice:{speed:1,language:"en",volume:1},markers:[],chart:null,projectTools:{},toolHistory,buyList:[],attachments:[],annotations:[],rowMask:null,coverAsset:idea.referenceImageAsset||null,sourceIdeaId:idea.id,activeTab:"project",updatedAt:new Date().toISOString()};
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
  if(section.id==="theory")return libraryWikiEntries.length;
  if(section.id==="ideas")return (state.projectIdeas||[]).length;
  return (section.items||[]).length;
}
function librarySectionIcon(sectionId){return uiIcon(({"personal-references":"book",patterns:"pattern",ideas:"idea",materials:"fibre",symbols:"pattern","tool-manual":"manual",theory:"theory"})[sectionId]||"folder","library-card-icon");}
function libraryPageHeroHtml({eyebrow,title,description,actions=""}){return `<header class="page-title split-title library-page-hero"><div><p class="eyebrow">${escapeHtml(eyebrow)}</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></div>${actions?`<div class="library-page-actions">${actions}</div>`:""}</header>`;}
function libraryCategoryCardHtml(section){return `<button class="library-space library-category-card card" data-library-space="${section.id}"><span class="library-space-count">${librarySectionCount(section)} items</span><div class="library-space-icon">${librarySectionIcon(section.id)}</div><div class="library-category-copy"><h2>${escapeHtml(section.name)}</h2><p>${escapeHtml(section.description)}</p></div></button>`;}
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
  return `<form class="symbol-edit-form edit-project-form" id="symbol-edit-form" novalidate><p class="eyebrow">SYMBOL DATABASE</p><h2>${isNew?"Add Symbol":"Edit Symbol"}</h2><p class="muted-copy">Edit the wording or add your own symbol picture. Yarncha keeps the original default available.</p><div id="symbol-edit-errors" class="form-error-list" role="alert" hidden></div><div class="form-grid"><div class="field"><label>English name *</label><input id="symbol-edit-name-en" value="${escapeHtml(entry.nameEn||"")}"></div><div class="field"><label>Chinese name</label><input id="symbol-edit-name-zh" value="${escapeHtml(entry.nameZh||"")}"></div><div class="field"><label>Abbreviation</label><input id="symbol-edit-abbreviation" value="${escapeHtml(entry.abbreviation||"")}"></div><div class="field"><label>Chart symbol / character</label><input id="symbol-edit-visual" value="${escapeHtml(entry.visualSymbol||entry.symbol||"")}" placeholder="e.g. ○, ×, /, \\" maxlength="24"></div><div class="field"><label>Craft type *</label><select id="symbol-edit-craft">${symbolCraftOptions.map(value=>`<option ${entry.craft===value?"selected":""}>${value}</option>`).join("")}</select></div><div class="field"><label>Category</label><select id="symbol-edit-category">${window.YarnchaSymbolDatabase.categoryOrder.map(value=>`<option ${entry.category===value?"selected":""}>${value}</option>`).join("")}</select></div><div class="field"><label>Difficulty</label><select id="symbol-edit-difficulty">${symbolDifficultyOptions.map(value=>`<option ${entry.difficulty===value?"selected":""}>${value}</option>`).join("")}</select></div><div class="field"><label>Verification status</label><select id="symbol-edit-verification">${symbolVerificationOptions.map(value=>`<option ${entry.verificationStatus===value?"selected":""}>${value}</option>`).join("")}</select></div><div class="field full"><label>Tags</label><input id="symbol-edit-tags" value="${escapeHtml((entry.tags||[]).join(", "))}" placeholder="lace, shaping, beginner"></div><div class="field full"><label>Symbol picture</label><div class="symbol-picture-editor" id="symbol-picture-editor">${picture}</div><div class="button-row symbol-picture-actions"><button class="secondary-button" type="button" id="choose-symbol-picture">${entry.symbolImageAsset?"Replace symbol picture":"Upload symbol picture"}</button><button class="secondary-button danger-button" type="button" id="remove-symbol-picture" ${entry.symbolImageAsset?"":"hidden"}>Remove uploaded picture</button></div><input id="symbol-picture-file" type="file" accept="image/*" hidden><small>If the default mark is wrong, upload a clear symbol image. It stays in this browser and becomes a recognition reference for Flow Mode.</small></div><div class="field full"><label>Explanation</label><textarea id="symbol-edit-explanation" rows="4">${escapeHtml(entry.explanation||"")}</textarea></div></div><label class="check-row"><input id="symbol-learn-toggle" type="checkbox" checked><span>Learn from this symbol</span></label><p class="privacy-note">Yarncha will remember this symbol for future chart reading. Yarncha remembers your corrections on this device.</p><div class="symbol-editor-secondary-actions">${!isNew&&window.YarnchaSymbolDatabase.defaultSymbols.some(item=>item.id===entry.id)?`<button class="secondary-button" type="button" id="reset-symbol-default">Reset to default</button>`:""}${!isNew?`<button class="secondary-button" type="button" id="duplicate-symbol">Duplicate symbol</button><button class="secondary-button danger-button" id="delete-symbol" type="button">Delete symbol</button>`:""}</div><div class="modal-actions"><span class="manual-save-status" data-save-indicator>✓ Saved</span><button class="secondary-button manual-save-button" type="button" data-manual-save="Symbol Database">Save app now</button><button class="secondary-button" type="button" id="cancel-symbol-edit">Cancel</button><button class="primary-button" type="submit">Save Symbol</button></div></form>`;
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
    host.innerHTML=`${libraryPageHeroHtml({eyebrow:"YOUR MAKING WIKI",title:"Library",description:"A flexible home for your symbols, pattern files, notes and ideas.",actions:'<button class="secondary-button" id="add-library-space">+ Custom space</button>'})}
      <div class="library-home-grid">${state.librarySections.map(libraryCategoryCardHtml).join("")}</div>`;
    document.getElementById("add-library-space").onclick=()=>openLibrarySpaceModal();
  } else {
    const section=state.librarySections.find(s=>s.id===currentLibrarySection);
    if(!section){currentLibrarySection=null;return renderLibrary();}
    const isTheoryDetail=section.id==="theory"&&(currentLibraryEntryId||currentLibraryPathId);
    const sectionActions=section.id==="symbols"?"":`<button class="secondary-button" id="rename-library">Rename</button><button class="primary-button" id="add-library-item">${section.id==="materials"?"+ Add yarn material":section.id==="ideas"?"+ Add Project Idea":"+ Add page or PDF"}</button>`;
    host.innerHTML=`${isTheoryDetail?"":`<button class="text-button library-back" id="library-back">← All library spaces</button>${libraryPageHeroHtml({eyebrow:"PERSONAL LIBRARY",title:section.name,description:section.description,actions:sectionActions})}`}
      ${section.id==="materials"?yarnMaterialReferenceHtml():section.id==="symbols"?symbolDatabaseHtml():section.id==="tool-manual"?toolManualHtml():section.id==="theory"?theoryFoundationHtml():section.id==="ideas"?projectIdeasHtml():""}
      <div class="notion-list">${["symbols","ideas"].includes(section.id)?"":section.items.length?section.items.map(item=>`<div class="notion-row"><div>${item.fileData||item.assets?.length?"▧":"□"}</div><div><h3>${escapeHtml(item.name)}</h3><p>${item.craft?`${escapeHtml(item.craft)} · `:""}${escapeHtml(item.notes||"No notes")}${item.assets?.length?` · ${item.assets.length} files`:item.fileName?` · ${escapeHtml(item.fileName)}`:""}</p></div><div class="row-actions"><button class="mini-button" data-edit-item="${item.id}">Edit</button>${item.fileData||item.assets?.length?`<button class="mini-button" data-open-item="${item.id}">View files</button>`:""}</div></div>`).join(""):["materials","tool-manual","theory","ideas"].includes(section.id)?"":`<div class="empty-state"><h3>This space is ready for your own pages</h3><p>Add a named section, note or PDF tutorial.</p></div>`}</div>`;
    document.getElementById("library-back")?.addEventListener("click",()=>{currentLibrarySection=null;renderLibrary();});
    document.getElementById("add-library-item")?.addEventListener("click",()=>section.id==="materials"?openYarnMaterialModal():section.id==="ideas"?openProjectIdeaModal():openLibraryItemModal(section.id));
    document.getElementById("rename-library")?.addEventListener("click",()=>openLibrarySpaceModal(section.id));
    document.querySelectorAll("[data-open-item]").forEach(b=>b.onclick=()=>openLibraryAssets(section.items.find(i=>i.id===b.dataset.openItem)));
    document.querySelectorAll("[data-edit-item]").forEach(b=>b.onclick=()=>openLibraryItemModal(section.id,b.dataset.editItem));
    document.querySelectorAll("[data-edit-material]").forEach(b=>b.onclick=()=>openYarnMaterialModal(b.dataset.editMaterial));
    bindProjectIdeas();
    bindSymbolDatabase();
    bindLibraryWiki();
    hydrateMaterialImages();
  }
  queueMicrotask(applyLanguage);
}
function openLibraryWikiEntry(entryId){
  const entry=libraryWikiEntryById(String(entryId||"").replace(/^library:/,""));
  if(!entry)return toast("Library entry not found yet.");
  currentLibrarySection="theory";
  currentLibraryEntryId=entry.id;
  currentLibraryPathId=null;
  state.libraryRecentlyViewed=[entry.id,...(state.libraryRecentlyViewed||[]).filter(id=>id!==entry.id)].slice(0,12);
  saveStateSoon();
  if(activePage!=="library")showView("library");
  else renderLibrary();
}
function toggleLibraryBookmark(entryId){
  const bookmarks=new Set(state.libraryBookmarks||[]);
  bookmarks.has(entryId)?bookmarks.delete(entryId):bookmarks.add(entryId);
  state.libraryBookmarks=[...bookmarks];
  saveState();
  renderLibrary();
  toast(bookmarks.has(entryId)?"Entry saved.":"Entry removed from saved entries.");
}
function addLibraryEntryToProjectNotes(entryId){
  const entry=libraryWikiEntryById(entryId),project=getProject();
  if(!entry||!project)return;
  project.notes=`${project.notes||""}${project.notes?"\n\n":""}Library: ${entry.title}\n${entry.summary}`;
  saveProjectTouch(project);
  toast("Added to project notes.");
}
function addLibraryEntryToChecklist(entryId){
  const entry=libraryWikiEntryById(entryId),project=getProject();
  if(!entry||!project)return;
  const item={id:`wiki-check-${Date.now()}`,projectId:project.id,entryId,title:entry.title,createdAt:new Date().toISOString(),done:false};
  state.libraryProjectChecklist=[item,...(state.libraryProjectChecklist||[])].slice(0,80);
  project.libraryChecklist=[item,...(project.libraryChecklist||[])].slice(0,40);
  saveProjectTouch(project);
  toast("Added to project checklist.");
}
function openLibrarySuggestEdit(entryId){
  const entry=libraryWikiEntryById(entryId);
  if(!entry)return;
  openModal(`<p class="eyebrow">SUGGEST EDIT</p><h2>${escapeHtml(entry.title)}</h2><p class="muted-copy">Suggestions are stored locally for now. Future community review can submit these to moderators.</p><div class="field full"><label>What should change?</label><textarea id="wiki-suggest-text" rows="6" placeholder="Add a correction, missing tip, clearer wording, or source note."></textarea></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-wiki-suggestion">Save suggestion</button></div>`);
  document.getElementById("save-wiki-suggestion").onclick=()=>{const text=document.getElementById("wiki-suggest-text").value.trim();if(!text)return toast("Write the suggestion first.");state.librarySuggestedEdits=[{id:`suggest${Date.now()}`,entryId,text,status:"local-draft",createdAt:new Date().toISOString()},...(state.librarySuggestedEdits||[])];saveState();closeModal();toast("Suggestion saved locally.");};
}
function askAssistantAboutLibraryEntry(entryId){
  const entry=libraryWikiEntryById(entryId),project=getProject();
  if(!entry)return;
  if(project){
    project.yarnchaAssistant={...(project.yarnchaAssistant||{}),draftQuestion:`Help me understand ${entry.title}. ${entry.summary}`,selectedLibraryEntryId:entry.id};
    saveProjectTouch(project);
    currentProjectId=project.id;
    showView("project-detail").then(()=>{document.querySelector('[data-project-tab="assistant"]')?.click?.();});
  }else toast(`Ask Assistant: ${entry.title}`);
}
function updateLibraryPathProgress(pathId,reset=false){
  const path=libraryLearningPaths.find(item=>item.id===pathId);
  if(!path)return;
  state.libraryPathProgress=state.libraryPathProgress||{};
  state.libraryPathProgress[pathId]=reset?0:Math.min(path.orderedEntries.length,Number(state.libraryPathProgress[pathId]||0)+1);
  saveState();
  renderLibrary();
}
function openLibraryReport(entryId){
  const entry=libraryWikiEntryById(entryId);
  if(!entry)return toast("Library entry not found.");
  openModal(`<p class="eyebrow">COPYRIGHT / CONTENT REPORT</p><h2>${escapeHtml(libraryCopyrightPolicy.reportLabel)}</h2><p class="muted-copy">${escapeHtml(libraryCopyrightPolicy.summary)}</p><label class="field full">What looks copied or suspicious?<textarea id="wiki-report-text" rows="5" placeholder="Describe copied pattern text, chart content, designer material, or another concern."></textarea></label><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-wiki-report">Save report locally</button></div>`);
  document.getElementById("save-wiki-report").onclick=()=>{const text=document.getElementById("wiki-report-text").value.trim();if(!text)return toast("Add a short report note first.");state.libraryReports=[{id:`report${Date.now()}`,entryId,text,status:"local-review-needed",createdAt:new Date().toISOString()},...(state.libraryReports||[])];saveState();closeModal();toast("Report saved locally for review.");};
}
function bindLibraryWiki(){
  if(currentLibrarySection!=="theory")return;
  document.getElementById("wiki-entry-back")?.addEventListener("click",()=>{currentLibraryEntryId=null;currentLibraryPathId=null;renderLibrary();});
  document.getElementById("wiki-search")?.addEventListener("input",event=>{libraryWikiFilters.search=event.target.value;libraryWikiFilters.path="All";currentLibraryEntryId=null;currentLibraryPathId=null;renderLibrary();requestAnimationFrame(()=>document.getElementById("wiki-search")?.focus());});
  [["wiki-craft","craft"],["wiki-level","level"],["wiki-category","category"],["wiki-project-type","projectType"],["wiki-tool","tool"]].forEach(([id,key])=>document.getElementById(id)?.addEventListener("change",event=>{libraryWikiFilters[key]=event.target.value;libraryWikiFilters.path="All";currentLibraryEntryId=null;currentLibraryPathId=null;renderLibrary();}));
  document.querySelectorAll("[data-wiki-path]").forEach(button=>button.onclick=()=>{const path=button.dataset.wikiPath;libraryWikiFilters={search:"",craft:["knitting","crochet","tunisian"].includes(path)?path:"All",level:path==="beginner"?"beginner":"All",category:libraryWikiCategories.includes(path)?path:"All",projectType:"All",tool:"All",path};currentLibraryEntryId=null;currentLibraryPathId=null;renderLibrary();});
  document.querySelectorAll("[data-wiki-learning-path]").forEach(button=>button.onclick=()=>{currentLibraryPathId=button.dataset.wikiLearningPath;currentLibraryEntryId=null;renderLibrary();});
  document.querySelectorAll("[data-wiki-path-progress]").forEach(button=>button.onclick=()=>updateLibraryPathProgress(button.dataset.wikiPathProgress));
  document.querySelectorAll("[data-wiki-path-reset]").forEach(button=>button.onclick=()=>updateLibraryPathProgress(button.dataset.wikiPathReset,true));
  document.querySelectorAll("[data-wiki-entry]").forEach(button=>button.onclick=()=>openLibraryWikiEntry(button.dataset.wikiEntry));
  document.querySelectorAll("[data-wiki-save]").forEach(button=>button.onclick=()=>toggleLibraryBookmark(button.dataset.wikiSave));
  document.querySelectorAll("[data-wiki-project-note]").forEach(button=>button.onclick=()=>addLibraryEntryToProjectNotes(button.dataset.wikiProjectNote));
  document.querySelectorAll("[data-wiki-checklist]").forEach(button=>button.onclick=()=>addLibraryEntryToChecklist(button.dataset.wikiChecklist));
  document.querySelectorAll("[data-wiki-suggest]").forEach(button=>button.onclick=()=>openLibrarySuggestEdit(button.dataset.wikiSuggest));
  document.querySelectorAll("[data-wiki-report]").forEach(button=>button.onclick=()=>openLibraryReport(button.dataset.wikiReport));
  document.querySelectorAll("[data-wiki-ask]").forEach(button=>button.onclick=()=>askAssistantAboutLibraryEntry(button.dataset.wikiAsk));
  document.querySelectorAll("[data-wiki-tool]").forEach(button=>button.onclick=()=>{const match=toolkitToolDefs.find(tool=>tool.name===button.dataset.wikiTool||tool.name.includes(button.dataset.wikiTool.split(" ")[0]));if(match){showView("tools");renderTool(match.id);}else toast(`${button.dataset.wikiTool} is in the Tool Manual.`);});
  document.querySelector("[data-wiki-note]")?.addEventListener("input",event=>{state.libraryEntryNotes={...(state.libraryEntryNotes||{}),[event.target.dataset.wikiNote]:event.target.value};saveStateSoon();});
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
const libraryWikiCategories=[
  "Foundations","Knitting Knowledge","Crochet Knowledge","Tunisian Crochet Knowledge","Troubleshooting Hub","Project Planning","Pattern & Chart Reading","Modification & Design Math","Yarn & Fibre Library","Tool Manual Integration"
];
const libraryCraftLabels={shared:"Shared",knitting:"Knitting",crochet:"Crochet",tunisian:"Tunisian crochet"};
const libraryLevelLabels={beginner:"Beginner",intermediate:"Intermediate",advanced:"Advanced",expert:"Expert"};
const libraryReliabilityStatuses=["Official Yarncha Guide","Draft","Needs Review","User Submitted","Community Reviewed","Expert Reviewed"];
const libraryCopyrightPolicy={
  summary:"Yarncha Library teaches general technique, planning, and troubleshooting. It must not store, reproduce, or share full paid pattern instructions, copyrighted charts, copied designer content, or public community submissions that paste protected pattern text.",
  privateNotes:"Private notes are allowed for a user's own reference, but public/community submissions must be original summaries or general technique guidance.",
  assistantBoundary:"Yarncha Assistant may explain general techniques, troubleshoot user-provided numbers, and respond to pasted snippets supplied by the user, but it must not claim designer pattern content belongs to Yarncha.",
  reportLabel:"Report copied or suspicious content"
};
const libraryTerminologyVariants=[
  {term:"US/UK crochet terms",aliases:["single crochet / double crochet UK","double crochet / treble UK","half double crochet / half treble UK"]},
  {term:"AU/UK yarn terms",aliases:["8 ply","DK","10 ply","Aran","4 ply","fingering"]},
  {term:"US yarn weights",aliases:["CYC 0 lace","CYC 1 super fine","CYC 3 DK","CYC 4 worsted"]},
  {term:"Hook and needle sizes",aliases:["mm hook","US needle","UK needle","metric diameter"]},
  {term:"Bind off / cast off",aliases:["bind off","cast off"]},
  {term:"Gauge / tension",aliases:["gauge","tension","stitches per 10 cm"]},
  {term:"Frogging / ripping back",aliases:["frog back","rip back","undo rows"]}
];
const libraryMeasurementGuides=[
  "bust/chest","shoulder width","armhole depth","sleeve length","upper arm","wrist","body length","hip","neck opening","head circumference","foot length","foot circumference","hand circumference","blanket size","scarf size","hat size","sock size","bag size","amigurumi size"
];
const libraryCraftSafetyNotes=[
  "Baby items should avoid unsafe buttons, long ties, and safety eyes; embroidered features are safer for babies.",
  "Acrylic can melt near heat and should be kept away from hot surfaces.",
  "Cotton can stretch, sag, or become heavy in large garments.",
  "Wool may irritate sensitive skin and some yarns pill with friction.",
  "Bags need durable fibre, firm fabric, reinforced handles, and careful lining choices.",
  "Steam blocking can damage acrylic or heat-sensitive fibres; test a swatch first.",
  "Garments can grow after washing or blocking, especially cotton, alpaca, bamboo, linen, and superwash yarns."
];
const libraryProblemSearchMap=[
  {phrases:["crochet circle wavy","wavy circle","circle ripples"],entries:["crochet-circle-formula","project-too-big-small"],tools:["Blocking Calculator"],assistantSuggestion:"Check increase rate, hook size, and whether the circle is gaining too many stitches."},
  {phrases:["knitting rolling","edge curling","stockinette curls"],entries:["knitting-curling","blocking"],tools:["Blocking Calculator"],assistantSuggestion:"Stockinette curls naturally; add border, ribbing, garter edge, or plan blocking expectations."},
  {phrases:["tunisian curl","tunisian curling"],entries:["tunisian-curling","tunisian-forward-return-pass"],tools:["Needle / Hook Adjustment"],assistantSuggestion:"Try a larger Tunisian hook, softer edge, looser foundation, or blocking plan."},
  {phrases:["wrong count","extra stitch","too few stitches"],entries:["stitch-count-troubleshooting","reading-repeats"],tools:["Row / Round Counter Helper"],assistantSuggestion:"Pause at the end of the row, count repeats, and compare increases/decreases with the pattern."},
  {phrases:["too tight cast on","cast on too tight","bind off too tight","cast off too tight"],entries:["cast-on-bind-off","stitch-count-troubleshooting"],tools:["Needle / Hook Adjustment"],assistantSuggestion:"Use a stretchier cast-on or bind-off, relax the edge tension, and compare the edge with the fabric width."},
  {phrases:["8 ply instead of DK","dk instead of worsted","substitute yarn"],entries:["yarn-substitution","yarn-weight"],tools:["Yarn Substitution Helper"],assistantSuggestion:"Compare meterage per 100 g, fibre behavior, gauge, and swatch before substituting."},
  {phrases:["sleeve longer","sleeve too long","arm length wrong"],entries:["garment-modification","measurement-guide"],tools:["Sleeve Calculator"],assistantSuggestion:"Check row gauge, arm measurement, and shaping interval before removing length."},
  {phrases:["how much yarn","running out yarn","not enough yarn"],entries:["running-out-of-yarn","yarn-substitution"],tools:["Yarn Estimator"],assistantSuggestion:"Compare total meterage, add buffer, and plan contrast sections if needed."},
  {phrases:["read chart","chart symbol","pattern chart"],entries:["reading-charts","stitch-anatomy"],tools:["Symbol Database"],assistantSuggestion:"Start with the legend, direction of reading, repeat boundaries, and current row marker."}
];
function libraryReviewStatusLabel(value="official"){
  return value==="official"?"Official Yarncha Guide":libraryReliabilityStatuses.includes(value)?value:"Needs Review";
}
function defaultVisualAssetsForEntry(id,title,craftTypes=["shared"],level="beginner",troubleshooting=[]){
  const craft=craftTypes.includes("tunisian")?"Tunisian crochet":craftTypes.includes("crochet")?"Crochet":craftTypes.includes("knitting")?"Knitting":"Shared";
  const visualTopics={
    "stitch-anatomy":["Stitch anatomy comparison","Front loop, back loop, stitch legs, vertical bars, and chain spaces"],
    "knit-and-purl":["Knitting structure","Knit V, purl bump, right-side and wrong-side fabric"],
    "tunisian-forward-return-pass":["Tunisian structure","Forward pass loops and return pass chains"],
    "crochet-circle-formula":["Circle shaping","Round-by-round increase placement and wavy/cupped circle comparison"],
    "swatching":["Gauge swatch measuring","Where to place the ruler before and after blocking"],
    "blocking":["Blocking before/after","Fabric before blocking and relaxed finished measurements"],
    "stitch-count-troubleshooting":["Mistakes and fixes","Missing stitch, accidental increase, and repeat marker checks"],
    "reading-charts":["Chart symbol guide","Legend, repeat box, row direction, and current row marker"],
    "chart-reading":["Chart symbol guide","Legend, repeat box, row direction, and current row marker"],
    "cast-on-bind-off":["Cast-on and bind-off structure","Starting edge, live stitches, bind-off chain, and tight-edge comparison"],
    "yarn-over-increases-decreases":["Yarn over, increases, and decreases","How yarn overs add stitches and decreases consume stitches"]
  };
  const [caption,topic]=visualTopics[id]||[`${title} visual guide`,troubleshooting[0]||"Step-by-step reference panel"];
  return [{id:`visual-${id}`,type:"diagram",altText:`Diagram for ${title}: ${topic}.`,caption,craftType:craft,level,relatedEntry:id,troubleshootingTopic:topic,futureAnimationReady:true}];
}
function defaultDiagnosticFlow(entry){
  const symptom=entry.troubleshooting?.[0]||`The ${entry.title.toLowerCase()} result does not look or behave as expected.`;
  return {symptoms:[symptom],likelyCauses:entry.commonMistakes?.slice(0,3)||["Gauge, count, yarn, or tool mismatch."],quickChecks:["Check craft type, project type, yarn weight/fibre, hook or needle size, stitch count, row count, measurements, blocked state, skill level, and any uploaded pattern/chart context."],decisionPath:["Identify the visible symptom.","Compare the project against gauge, count, yarn, and measurement notes.","Use the related Yarncha tool if numbers need recalculating.","Save the result to Project Notes before continuing."],fixes:entry.troubleshooting?.slice(0,4)||entry.stepByStep?.slice(0,4)||[],prevention:entry.nextLearningSteps?.map(step=>`Review ${step} before starting a similar project.`)||[],relatedEntries:entry.relatedEntries||[],relatedTools:entry.relatedTools||[],saveToProjectAction:true};
}
function safetyNotesForEntry(entry){
  const text=[entry.title,entry.summary,...(entry.keywords||[]),...(entry.relatedProjectTypes||[])].join(" ").toLowerCase();
  return libraryCraftSafetyNotes.filter(note=>{
    const lower=note.toLowerCase();
    return (/baby|amigurumi|toy/.test(text)&&/baby|safety eyes|long ties/.test(lower))||(/acrylic|blocking/.test(text)&&/acrylic|steam/.test(lower))||(/cotton|garment|top|sweater/.test(text)&&/cotton|garments/.test(lower))||(/wool|fibre|yarn/.test(text)&&/wool|pilling/.test(lower))||(/bag/.test(text)&&/bags/.test(lower));
  }).slice(0,3);
}
function wikiEntry({id,title,category,subcategory,craftTypes=["shared"],level="beginner",summary,fullExplanation,whenToUse,whyItMatters,miniExample,stepByStep=[],commonMistakes=[],troubleshooting=[],relatedTools=[],relatedProjectTypes=[],relatedEntries=[],nextLearningSteps=[],keywords=[],aliases=[],difficulty,estimatedReadTime="4 min",verifiedStatus="official",visualAssets=null,diagnosticFlow=null,terminologyAliases=[],measurements=[],safetyNotes=[],createdAt="2026-07-05",updatedAt="2026-07-05",version="1.0.0",author="Yarncha Library Team",source="Yarncha original guide",editHistory=[],changelog=[]}){
  const base={id,title,slug:id,category,subcategory,craftTypes,level,summary,fullExplanation,whenToUse,whyItMatters,miniExample,stepByStep,commonMistakes,troubleshooting,relatedTools,relatedProjectTypes,relatedEntries,nextLearningSteps,keywords,aliases:[...aliases,...terminologyAliases],difficulty:difficulty||level,estimatedReadTime,userNotesEnabled:true,communitySubmissionEnabled:true,verifiedStatus,sourceQuality:libraryReviewStatusLabel(verifiedStatus),reliabilityStatus:libraryReviewStatusLabel(verifiedStatus),copyrightPolicy:libraryCopyrightPolicy,createdAt,updatedAt,lastUpdated:updatedAt,version,author,source,editHistory:editHistory.length?editHistory:[{date:updatedAt,summary:"Initial Yarncha guide version."}],changelog:changelog.length?changelog:["Created structured Library guide."],previousVersions:[],relatedAppVersion:"Yarncha Library Wiki MVP 2026-07-05",restoreSupported:true};
  base.visualAssets=visualAssets||defaultVisualAssetsForEntry(id,title,craftTypes,level,troubleshooting);
  base.diagnosticFlow=diagnosticFlow||defaultDiagnosticFlow(base);
  base.terminologyAliases=terminologyAliases;
  base.measurements=measurements;
  base.safetyNotes=safetyNotes.length?safetyNotes:safetyNotesForEntry(base);
  return base;
}
const libraryWikiEntries=[
  wikiEntry({id:"gauge-basics",title:"Gauge Basics",category:"Foundations",subcategory:"Gauge and swatching",craftTypes:["shared"],level:"beginner",summary:"Gauge is how many stitches and rows fit into a measured area. It controls finished size, drape, and yarn use.",fullExplanation:"Gauge connects your hands, yarn, hook or needle, and pattern numbers. A small difference across 10 cm can become several centimetres across a sweater, blanket, sleeve, or hat.",whenToUse:"Use this before starting any fitted project, when substituting yarn, or when your finished size looks wrong.",whyItMatters:"Gauge is the bridge between instructions and real fabric. Without it, even correct stitches can create the wrong size.",miniExample:"If a pattern expects 20 stitches per 10 cm and you get 18, your fabric is wider. A 100-stitch panel becomes about 55.5 cm instead of 50 cm.",stepByStep:["Make a swatch larger than 10 cm using the pattern stitch.","Wash or block it the way the finished project will be treated.","Measure stitches across 10 cm away from the edges.","Measure rows across 10 cm if length or shaping matters.","Compare your stitch and row gauge with the pattern before changing size."],commonMistakes:["Measuring over only 2 or 3 cm.","Measuring before the swatch relaxes.","Fixing stitch gauge while ignoring row gauge on sleeves, yokes, or armholes."],troubleshooting:["If you have fewer stitches per 10 cm, try a smaller hook or needle.","If you have more stitches per 10 cm, try a larger hook or needle.","If stitch gauge matches but row gauge does not, plan row/length adjustments instead of changing the tool immediately."],relatedTools:["Gauge / Swatch Adapter","Needle / Hook Adjustment","Pattern Resizer","Garment Resizer"],relatedProjectTypes:["Garments","Hats","Socks","Blankets"],relatedEntries:["swatching","tension-control","gauge-adjustment"],nextLearningSteps:["Swatching","Gauge Adjustment","Yarn Substitution"],keywords:["gauge","stitch gauge","row gauge","swatch","size"],aliases:["gauge basics","swatch gauge","stitches per 10 cm"]}),
  wikiEntry({id:"swatching",title:"Swatching",category:"Foundations",subcategory:"Gauge and swatching",craftTypes:["shared"],level:"beginner",summary:"A swatch is a small test fabric that shows gauge, drape, stitch definition, colour behaviour, and blocking changes.",fullExplanation:"Swatching is not only a measurement task. It lets you test whether the fabric feels right for the project before you spend days making the full item.",whenToUse:"Use before garments, fitted accessories, yarn substitutions, colourwork, lace, cables, Tunisian fabric, and anything where size matters.",whyItMatters:"A swatch can reveal a fabric that is too stiff, too loose, too transparent, too heavy, or too different after washing.",miniExample:"For a summer top, a cotton swatch may grow after washing. Measuring only before washing can make the top too wide.",stepByStep:["Make the swatch in the same stitch pattern as the project.","Make it wider than the measurement area so edges do not distort the count.","Treat it like the finished project: wash, steam, pin, or lay flat as appropriate.","Measure gauge and note the fabric feel.","Save the result in Project Notes or the Gauge tool."],commonMistakes:["Swatching in stockinette when the project uses lace or ribbing.","Skipping blocking even when the pattern gauge is blocked.","Using a tiny swatch that edge stitches distort."],troubleshooting:["If the swatch is stiff, try a larger tool or softer fibre.","If the swatch is loose or holey, try a smaller tool or firmer yarn.","If it grows after washing, adjust length and width planning before starting."],relatedTools:["Gauge / Swatch Adapter","Blocking Calculator","Project Notes"],relatedProjectTypes:["Sweaters","Tops","Shawls","Tunisian blankets"],relatedEntries:["gauge-basics","blocking","fabric-density"],nextLearningSteps:["Blocking","Fabric Density","Gauge Adjustment"],keywords:["swatch","test square","fabric test","blocked gauge"]}),
  wikiEntry({id:"yarn-weight",title:"Yarn Weight",category:"Foundations",subcategory:"Yarn basics",craftTypes:["shared"],level:"beginner",summary:"Yarn weight describes thickness, not how heavy the ball feels. It affects gauge, drape, stitch size, and yardage.",fullExplanation:"Two yarns can both be DK or worsted and still behave differently because fibre, spin, ply, and construction affect the fabric. Weight is a starting point, not a full substitution rule.",whenToUse:"Use when choosing yarn, reading yarn labels, estimating yardage, or replacing the pattern yarn.",whyItMatters:"Changing yarn weight changes stitch size and can make a project too big, too small, too stiff, or too open.",miniExample:"A worsted yarn usually creates bigger stitches than DK. If you use worsted in a DK scarf without changing stitch count, the scarf will likely be wider.",stepByStep:["Find the yarn weight on the label or pattern.","Compare recommended hook or needle sizes.","Check meterage or yardage per 100 g, not just the weight category.","Make a gauge swatch if size matters.","Use substitution tools before buying a full sweater quantity."],commonMistakes:["Assuming grams equal yarn length.","Substituting by colour only.","Using a heavier yarn without recalculating stitch count."],troubleshooting:["If fabric is too dense, the yarn may be too heavy or the tool too small.","If fabric is too loose, yarn may be too light or the tool too large.","If yarn runs out, compare meterage per ball with the pattern yarn."],relatedTools:["Yarn Weight Converter","Yarn Substitution Helper","Yarn Estimator","Needle / Hook Adjustment"],relatedProjectTypes:["All projects"],relatedEntries:["yarn-substitution","reading-yarn-labels","fabric-density"],nextLearningSteps:["Yarn Substitution","Reading Yarn Labels","Yarn Fibre Types"],keywords:["yarn weight","dk","worsted","aran","fingering","bulky"],aliases:["wpi","cyc weight","yarn category"]}),
  wikiEntry({id:"yarn-fibre-types",title:"Yarn Fibre Types",category:"Yarn & Fibre Library",subcategory:"Fibre behaviour",craftTypes:["shared"],level:"beginner",summary:"Fibre affects warmth, stretch, drape, durability, pilling, care, and blocking behaviour.",fullExplanation:"Wool, cotton, linen, alpaca, acrylic, nylon, silk, bamboo, mohair, cashmere, and blends can all make the same pattern behave differently. Fibre choice is part of fit and function.",whenToUse:"Use when choosing yarn for garments, socks, bags, blankets, amigurumi, baby items, summer tops, or winter wear.",whyItMatters:"The right fibre helps the project work for its purpose. Socks need durability, tops need drape and comfort, and amigurumi often needs firm structure.",miniExample:"Cotton can make a crisp summer top but may sag in a heavy sweater. Wool has more bounce and recovery for fitted garments.",stepByStep:["Identify whether the fibre is animal, plant, synthetic, or blended.","Match fibre behaviour to the project purpose.","Check care instructions and washing behaviour.","Compare stretch and drape with the pattern yarn.","Swatch and wash before committing to fit."],commonMistakes:["Using alpaca for a garment that needs bounce.","Using cotton for ribbing that must spring back.","Ignoring superwash growth after washing."],troubleshooting:["If fabric stretches out, check fibre recovery and blocking behaviour.","If socks wear through quickly, add nylon or a hard-wearing blend.","If amigurumi stuffing shows, use a firmer yarn or smaller hook."],relatedTools:["Yarn Substitution Helper","Yarn Estimator","Blocking Calculator","Project Notes"],relatedProjectTypes:["Garments","Socks","Bags","Blankets","Amigurumi","Baby items"],relatedEntries:["yarn-substitution","drape","fabric-density"],nextLearningSteps:["Yarn Substitution","Drape","Care Instructions"],keywords:["wool","merino","alpaca","cotton","linen","silk","acrylic","nylon","bamboo","mohair","cashmere","superwash","blend"]}),
  wikiEntry({id:"reading-yarn-labels",title:"Reading Yarn Labels",category:"Foundations",subcategory:"Yarn basics",craftTypes:["shared"],level:"beginner",summary:"A yarn label usually tells you fibre, weight, ball weight, meterage or yardage, gauge, care, colour number, dye lot, and suggested tools.",fullExplanation:"The label is a planning tool, but it is not a promise that your project will match the pattern. Suggested hook and needle sizes are starting points only.",whenToUse:"Use when buying yarn, scanning stash yarn, checking dye lots, estimating quantity, or comparing substitutes.",whyItMatters:"Label details help you avoid mismatched dye lots, wrong yardage, and fabric that behaves unlike the pattern sample.",miniExample:"Two balls may share a colour name but have different dye lots. In a garment, that difference can show as a stripe.",stepByStep:["Check fibre content and care first.","Check meterage or yardage per ball.","Record colour name, colour number, and dye lot.","Compare recommended gauge and tool size with the pattern.","Save the yarn in Yarn Stash if you plan to use it later."],commonMistakes:["Buying by grams instead of meterage.","Ignoring dye lot.","Treating suggested needle size as the required size."],troubleshooting:["If the barcode identifies yarn but not shade, scan label text or capture yarn colour.","If colour is missing, save product info and add colour manually.","If yardage is short, add extra buffer before starting."],relatedTools:["Scan Yarn","Yarn Estimator","Buy List","Yarn Stash","Yarn Substitution Helper"],relatedProjectTypes:["All projects"],relatedEntries:["yarn-weight","yarn-fibre-types","running-out-of-yarn"],nextLearningSteps:["Yarn Stash","Yarn Substitution","Yarn Amount Planning"],keywords:["label","dye lot","colour number","yardage","meterage","barcode","stash"]}),
  wikiEntry({id:"stitch-anatomy",title:"Stitch Anatomy",category:"Foundations",subcategory:"Fabric structure",craftTypes:["shared"],level:"beginner",summary:"Stitch anatomy helps you see where to insert the hook or needle and how rows, loops, legs, bars, and spaces form fabric.",fullExplanation:"Knitting, crochet, and Tunisian crochet have different stitch structures. Learning the parts of a stitch makes chart reading, fixing mistakes, and clean edges much easier.",whenToUse:"Use when a pattern says front loop, back loop, vertical bar, post, stitch top, right leg, wrong-side row, or chain space.",whyItMatters:"Most mistakes come from putting the tool into the wrong part of the stitch or counting the wrong loop as a stitch.",miniExample:"In crochet, working into the back loop only leaves the front loop visible as a ridge. In Tunisian simple stitch, you insert under the front vertical bar.",stepByStep:["Identify the top loops or stitch legs first.","Find the working direction of the row or round.","Locate special parts: chain space, post, front/back loop, vertical bar, edge stitch.","Work slowly through one repeat and inspect the fabric.","Mark confusing spots with a stitch marker."],commonMistakes:["Counting turning chains incorrectly.","Working into a chain space when the pattern means the stitch top.","Twisting a knitted stitch by inserting through the wrong leg."],troubleshooting:["If edges are uneven, check first and last stitch placement.","If fabric twists, check stitch mount and direction.","If stitch count changes unexpectedly, check whether you skipped a loop or worked twice into one stitch."],relatedTools:["Symbol Database","Chart Annotation / OG Mode","Row / Round Counter Helper"],relatedProjectTypes:["All projects"],relatedEntries:["crochet-stitch-height","tunisian-forward-return-pass","knit-and-purl"],nextLearningSteps:["Pattern Reading","Chart Reading","Fixing Mistakes"],keywords:["stitch anatomy","front loop","back loop","vertical bar","post stitch","chain space","right leg","wrong side"]}),
  wikiEntry({id:"knit-and-purl",title:"Knit Stitch and Purl Stitch",category:"Knitting Knowledge",subcategory:"Basic stitches",craftTypes:["knitting"],level:"beginner",summary:"Knit and purl are the foundation movements of knitting. Their combinations create stockinette, garter, ribbing, seed stitch, moss stitch, and many textures.",fullExplanation:"Knit stitches make a V on the front; purl stitches make a bump. The same stitch can look different depending on which side of the fabric you are viewing.",whenToUse:"Use when learning written knitting patterns, checking right side/wrong side, or troubleshooting twisted stitches and uneven tension.",whyItMatters:"Almost every knitting pattern builds from knit and purl placement. Reading the fabric helps you fix mistakes without guessing.",miniExample:"Stockinette is knit on the right side and purl on the wrong side when worked flat. Garter is knit every row when worked flat.",stepByStep:["Check whether you are on the right side or wrong side.","For knit, keep yarn at the back and insert through the front leg from left to right.","For purl, bring yarn to the front and insert from right to left.","After a few stitches, look at the fabric: Vs are knit side, bumps are purl side.","Count stitches before and after shaping rows."],commonMistakes:["Leaving yarn in front when knitting.","Twisting stitches by entering the back leg unintentionally.","Losing track of right-side and wrong-side rows."],troubleshooting:["If stitches look crossed, check stitch mount.","If ribbing is messy, read each stitch before working it.","If stockinette curls, that is normal fabric behaviour; add border, ribbing, or blocking expectations."],relatedTools:["Row / Round Counter Helper","Chart Annotation / OG Mode","Symbol Database"],relatedProjectTypes:["Scarves","Sweaters","Hats","Blankets"],relatedEntries:["reading-knitting-patterns","knitting-curling","tension-control"],nextLearningSteps:["Ribbing","Increases and Decreases","Reading Knitting Charts"],keywords:["knit","purl","stockinette","garter","ribbing","seed stitch","moss stitch"]}),
  wikiEntry({id:"knitting-construction",title:"Knitting Garment Construction",category:"Knitting Knowledge",subcategory:"Garment construction",craftTypes:["knitting"],level:"advanced",summary:"Garment construction describes how a sweater or cardigan is built: raglan, yoke, drop shoulder, set-in sleeve, seams, bands, neckline, and sleeve shaping.",fullExplanation:"Construction affects fit, ease, modification options, and the order of knitting. Understanding the structure helps you adjust body length, sleeve length, neckline, and armhole depth.",whenToUse:"Use before starting or modifying sweaters, cardigans, tops, vests, and fitted garments.",whyItMatters:"A sleeve-length change is simple in some constructions and complicated in others. The construction tells you where shaping happens.",miniExample:"A raglan uses diagonal increases or decreases from neckline to underarm. A drop shoulder often has a straighter body and easier sleeve adjustment.",stepByStep:["Identify construction from pattern notes or schematic.","Find where the garment starts: top-down, bottom-up, or pieces.","Mark shaping areas: raglan lines, yoke rounds, armholes, sleeve caps, neckline, button bands.","Compare finished measurements with body measurements and desired ease.","Record modification decisions in Project Notes before casting on."],commonMistakes:["Changing body length without checking waist or hip shaping.","Changing sleeve length after shaping is complete.","Ignoring button-band pickup ratio."],troubleshooting:["If armhole feels tight, check armhole depth and upper sleeve circumference.","If neckline gaps, check shaping, pickup rate, and bind-off firmness.","If sleeves are wrong length, compare row gauge and shaping interval."],relatedTools:["Garment Resizer","Sleeve Calculator","Raglan Calculator","Pattern Resizer","Project Notes"],relatedProjectTypes:["Sweaters","Cardigans","Tops","Vests"],relatedEntries:["ease","gauge-adjustment","modifying-garment-size"],nextLearningSteps:["Ease","Sleeve Shaping","Professional Fit Checking"],keywords:["raglan","yoke","drop shoulder","set-in sleeve","sleeve shaping","button band","neck shaping","garment fitting"]}),
  wikiEntry({id:"crochet-stitch-height",title:"Crochet Stitch Height and Turning Chains",category:"Crochet Knowledge",subcategory:"Basic stitches",craftTypes:["crochet"],level:"beginner",summary:"Crochet stitches have different heights. Chains, slip stitches, single crochet, half double crochet, double crochet, and treble crochet build rows with different proportions.",fullExplanation:"Turning chains lift the row to the height of the next stitch. Whether they count as a stitch depends on the pattern, and that choice affects edges and stitch counts.",whenToUse:"Use when edges wobble, counts are off, or a pattern says chain 1, chain 2, turning chain counts, or turning chain does not count.",whyItMatters:"Crochet edges and counts often go wrong at the first or last stitch of the row.",miniExample:"If a ch-3 counts as the first double crochet, you usually work the next stitch into the second stitch. If it does not count, work the first double crochet into the first stitch.",stepByStep:["Read whether the turning chain counts as a stitch.","Mark the first and last stitch of a row.","Count stitch tops, not just tall posts.","Use consistent turning-chain height.","Check edges every few rows."],commonMistakes:["Working into the first stitch twice when the turning chain already counts.","Skipping the first stitch when the chain does not count.","Making turning chains too loose."],troubleshooting:["If edges lean outward, check accidental increases at row ends.","If edges shrink inward, check skipped first or last stitches.","If gaps appear, try a standing stitch, stacked stitch, or shorter turning chain."],relatedTools:["Row / Round Counter Helper","Pattern Resizer","Crochet Chart Reading"],relatedProjectTypes:["Scarves","Blankets","Garments","Granny squares"],relatedEntries:["crochet-circle-formula","stitch-anatomy","stitch-count-troubleshooting"],nextLearningSteps:["Crochet Increases and Decreases","Reading Crochet Patterns"],keywords:["chain","slip stitch","single crochet","half double crochet","double crochet","treble crochet","turning chain","stitch height"]}),
  wikiEntry({id:"crochet-circle-formula",title:"Crochet Circle Formula",category:"Crochet Knowledge",subcategory:"Shape formulas",craftTypes:["crochet"],level:"intermediate",summary:"A flat crochet circle needs evenly spaced increases. Too many increases make waves; too few make a bowl.",fullExplanation:"Most flat circles add the same number of stitches each round as the first round. The increase placement can be staggered to avoid visible corners.",whenToUse:"Use for hats, bags, coasters, motifs, amigurumi starts, mandalas, and any circular base.",whyItMatters:"Circle shape problems are easier to fix early than after many rounds.",miniExample:"Starting with 6 single crochet usually increases by 6 stitches each round: 6, 12, 18, 24, 30.",stepByStep:["Count the first round stitches.","Add that same number of stitches each round for a flat circle.","Space increases evenly around the round.","Stagger increases if the circle becomes hexagonal.","Lay the circle flat every few rounds and check the edge."],commonMistakes:["Increasing every stitch for too many rounds.","Not increasing enough after the circle gets wider.","Changing hook size instead of checking the increase count."],troubleshooting:["If the circle is wavy, use fewer increases or add a plain round.","If it cups, add more increases or check tension.","If joins are visible, move the join or use continuous spiral rounds when appropriate."],relatedTools:["Circle Calculator","Amigurumi Shape Guide","Granny Square Planner"],relatedProjectTypes:["Amigurumi","Hats","Bags","Motifs"],relatedEntries:["crochet-stitch-height","amigurumi-shaping","crochet-circle-wavy"],nextLearningSteps:["Oval Formula","Cone Shaping","Amigurumi Basics"],keywords:["circle","flat circle","magic ring","spiral rounds","joining rounds","wavy circle","curling circle"]}),
  wikiEntry({id:"amigurumi-shaping",title:"Amigurumi Shaping",category:"Crochet Knowledge",subcategory:"3D crochet",craftTypes:["crochet"],level:"intermediate",summary:"Amigurumi uses increases, decreases, stuffing, yarn firmness, and hook size to make stable 3D shapes.",fullExplanation:"Small changes in hook size, yarn, stuffing firmness, and stitch placement can distort the final toy or make stuffing show through.",whenToUse:"Use before making animals, dolls, plushies, spheres, cones, cylinders, ovals, or safety-eye projects.",whyItMatters:"Amigurumi is structural. The fabric must be firm enough to hold stuffing and safe enough for the recipient.",miniExample:"If stuffing shows through, use a smaller hook or firmer yarn rather than simply stuffing less.",stepByStep:["Use a hook small enough for dense fabric.","Mark the start of each round.","Count every round, especially increase/decrease rounds.","Stuff gradually and shape with small amounts at a time.","Use embroidered eyes for babies or pets instead of safety eyes."],commonMistakes:["Overstuffing one area and distorting the shape.","Using a loose gauge so stuffing shows.","Placing safety eyes before checking final face position."],troubleshooting:["If shape is lumpy, redistribute stuffing and check increase placement.","If fabric gaps, use smaller hook or tighter tension.","If the piece twists, check spiral marker placement and stitch count."],relatedTools:["Amigurumi Shape Guide","Circle Calculator","Oval Calculator","Cone Calculator","Cylinder Calculator"],relatedProjectTypes:["Amigurumi","Toys","Decor"],relatedEntries:["crochet-circle-formula","stitch-count-troubleshooting","yarn-fibre-types"],nextLearningSteps:["Oval Formula","Cone Shaping","Safety Eyes"],keywords:["amigurumi","stuffing","safety eyes","sphere","oval","cone","cylinder","distortion"]}),
  wikiEntry({id:"tunisian-forward-return-pass",title:"Tunisian Forward Pass and Return Pass",category:"Tunisian Crochet Knowledge",subcategory:"Core structure",craftTypes:["tunisian"],level:"beginner",summary:"Tunisian crochet rows are built in two passes: a forward pass that picks up loops and a return pass that works them off.",fullExplanation:"Tunisian crochet is its own fabric system. The forward pass creates loops on the hook; the return pass closes them. Counting rows and stitches requires understanding both passes.",whenToUse:"Use when learning Tunisian simple stitch, knit stitch, purl stitch, full stitch, reverse stitch, colourwork, lace, cables, or entrelac.",whyItMatters:"Many Tunisian mistakes come from missing the last edge stitch, tightening the return pass, or treating passes as separate rows.",miniExample:"In Tunisian simple stitch, insert under each front vertical bar on the forward pass, then yarn over and pull through loops on the return pass.",stepByStep:["Start the forward pass with one loop already on the hook.","Insert into each stitch or vertical bar as instructed and pull up loops.","Do not skip the final edge stitch.","For the return pass, yarn over and pull through one loop first.","Then yarn over and pull through two loops repeatedly until one loop remains."],commonMistakes:["Skipping the final edge stitch.","Pulling the return pass too tight.","Counting forward and return passes as two rows when the pattern counts them as one."],troubleshooting:["If edges are uneven, check the last edge stitch.","If fabric is stiff, loosen the return pass or use a larger hook.","If loops are hard to work off, reduce tension and keep loops even on the hook."],relatedTools:["Needle / Hook Adjustment","Gauge / Swatch Adapter","Row / Round Counter Helper"],relatedProjectTypes:["Blankets","Scarves","Bags","Panels"],relatedEntries:["tunisian-curling","fabric-density","stitch-anatomy"],nextLearningSteps:["Tunisian Simple Stitch","Tunisian Curling","Tunisian Gauge"],keywords:["Tunisian crochet","forward pass","return pass","vertical bar","edge stitch","TSS","TKS","TPS"]}),
  wikiEntry({id:"tunisian-curling",title:"Why Tunisian Crochet Curls",category:"Tunisian Crochet Knowledge",subcategory:"Troubleshooting",craftTypes:["tunisian"],level:"beginner",summary:"Tunisian crochet often curls because the front of the fabric is tighter and denser than the back.",fullExplanation:"Curl is normal in many Tunisian stitches, especially Tunisian simple stitch. Hook size, fibre, stitch choice, border, blocking, and project type decide whether the curl is acceptable.",whenToUse:"Use when Tunisian fabric rolls at the bottom edge, feels stiff, or refuses to lie flat.",whyItMatters:"Curl can be planned around. Fighting it too late may not fully fix a dense fabric.",miniExample:"A Tunisian scarf in simple stitch may curl strongly unless worked with a larger hook, added border, or blocked firmly.",stepByStep:["Use a hook larger than the yarn label suggests.","Keep the return pass relaxed.","Add a non-curling border or stitch section.","Swatch and block before starting a large panel.","Choose projects where dense fabric is helpful if curl remains strong."],commonMistakes:["Using the same hook size as regular crochet.","Tightening every return-pass loop.","Expecting blocking alone to fix very dense fabric."],troubleshooting:["If curling is mild, block and add border.","If curling is severe, use a larger hook or different stitch.","If fabric is too stiff, choose softer fibre or looser gauge."],relatedTools:["Needle / Hook Adjustment","Blocking Calculator","Gauge / Swatch Adapter"],relatedProjectTypes:["Scarves","Blankets","Bags","Panels"],relatedEntries:["tunisian-forward-return-pass","fabric-density","blocking"],nextLearningSteps:["Tunisian Full Stitch","Blocking Tunisian Crochet","Drape"],keywords:["Tunisian curl","curling","return pass tight","dense fabric","stiff fabric"]}),
  wikiEntry({id:"stitch-count-troubleshooting",title:"Stitch Count Problems",category:"Troubleshooting Hub",subcategory:"Count problems",craftTypes:["shared"],level:"beginner",summary:"Wrong stitch counts usually come from missed repeats, accidental increases, skipped stitches, or misunderstood turning chains, yarn overs, decreases, or edge stitches.",fullExplanation:"A stitch-count problem is easier to fix if you stop immediately and locate whether the error is local, repeated, or caused by the row setup.",whenToUse:"Use when you have too many or too few stitches, a repeat does not fit, shaping looks wrong, or the final count disagrees with the pattern.",whyItMatters:"Continuing with the wrong count can shift shaping, lace, colourwork, cables, sleeves, or chart alignment.",miniExample:"If a 6-stitch repeat is worked one extra time, the row can be off by 6 stitches and every later row may stop lining up.",stepByStep:["Stop at the end of the current row or round if possible.","Write down your current count and the expected count.","Place markers between repeats or every 10 stitches.","Check the row for increases, decreases, yarn overs, skipped stitches, turning chains, or Tunisian edge stitches.","Undo only the wrong section if you can identify it; otherwise undo slowly to the last correct count."],commonMistakes:["Counting chain spaces as stitches when the pattern does not.","Forgetting yarn overs add stitches.","Missing the final stitch after a repeat.","Skipping the Tunisian edge stitch."],troubleshooting:["If count is off by 1, check edges first.","If count is off by the repeat size, check repeat number.","If count keeps drifting, add markers and count every row until stable."],relatedTools:["Row / Round Counter Helper","Repeat Calculator","Chart Annotation / OG Mode"],relatedProjectTypes:["All projects"],relatedEntries:["reading-repeats","crochet-stitch-height","knit-and-purl"],nextLearningSteps:["Reading Repeats","Row Tracking","Fixing Mistakes"],keywords:["wrong stitch count","too many stitches","too few stitches","repeat not fitting","lost count"]}),
  wikiEntry({id:"crochet-circle-wavy",title:"Crochet Circle Not Lying Flat",category:"Troubleshooting Hub",subcategory:"Shape problems",craftTypes:["crochet"],level:"beginner",summary:"A crochet circle waves when it has too many increases for the yarn, hook, and tension. It cups when it has too few.",fullExplanation:"Circle formulas are guides, not laws. Yarn thickness, stitch height, hook size, and tension can require small changes.",whenToUse:"Use when a coaster, bag base, motif, amigurumi start, or hat crown ruffles, cups, or forms corners.",whyItMatters:"Circle shape determines the structure of many crochet projects. Early correction prevents distorted bases.",miniExample:"If a single-crochet circle ruffles after round 5, try one plain round before the next increase round.",stepByStep:["Lay the circle flat without stretching.","Check whether the edge waves or cups.","Count each round and compare with the planned increase count.","If wavy, reduce increases or add a plain round.","If cupping, add increases or loosen tension."],commonMistakes:["Increasing in every stitch for too long.","Changing hook size before checking count.","Joining rounds with an extra stitch."],troubleshooting:["Wavy edge: fewer increases, smaller increase clusters, or plain round.","Cupping: more increases or larger hook.","Visible corners: stagger increase placement."],relatedTools:["Circle Calculator","Amigurumi Shape Guide","Project Notes"],relatedProjectTypes:["Amigurumi","Motifs","Bags","Hats"],relatedEntries:["crochet-circle-formula","stitch-count-troubleshooting","amigurumi-shaping"],nextLearningSteps:["Oval Formula","Spiral Rounds","Joining Rounds"],keywords:["wavy circle","curling circle","crochet circle","flat circle","ruffling","cupping"]}),
  wikiEntry({id:"running-out-of-yarn",title:"Running Out of Yarn",category:"Troubleshooting Hub",subcategory:"Yarn amount problems",craftTypes:["shared"],level:"intermediate",summary:"Running out of yarn usually comes from gauge differences, yardage mismatch, yarn substitution, added length, larger size, or too little buffer.",fullExplanation:"Meterage or yardage matters more than ball count. A substituted yarn can have less length per 100 g even if it looks similar.",whenToUse:"Use when your project is using yarn faster than expected or you are planning a project close to your stash quantity.",whyItMatters:"Planning before you start can prevent mismatched dye lots, unfinished sleeves, or a border that cannot be completed.",miniExample:"If the pattern used 400 m and your balls have only 160 m each, two balls are not enough even if the original pattern used two balls.",stepByStep:["Check pattern total meterage or yardage.","Check your yarn length per ball.","Compare gauge and project size with the pattern.","Add buffer for swatching, seaming, fringe, borders, and mistakes.","If already short, shorten a repeat, contrast the border, or plan a deliberate colour change."],commonMistakes:["Buying the same number of balls instead of the same total yardage.","Ignoring swatch yarn.","Adding length without recalculating yarn."],troubleshooting:["If dye lot is unavailable, alternate old and new yarn for a transition.","If a sleeve may run short, weigh yarn before and after the first sleeve.","If using stash scraps, plan stripes or colour blocking intentionally."],relatedTools:["Yarn Estimator","Yarn Leftover Estimator","Buy List","Project Rendering Studio"],relatedProjectTypes:["Sweaters","Blankets","Shawls","Scarves"],relatedEntries:["yarn-weight","reading-yarn-labels","project-planning-checklist"],nextLearningSteps:["Yarn Estimator","Colour Planning","Project Checklist"],keywords:["running out of yarn","yardage","meterage","dye lot","yarn amount","leftover yarn"]}),
  wikiEntry({id:"project-planning-checklist",title:"Project Planning Checklist",category:"Project Planning",subcategory:"Before starting",craftTypes:["shared"],level:"beginner",summary:"A project checklist helps you confirm size, yarn, gauge, tools, pattern requirements, colours, repeats, blocking, finishing, and backup notes before you start.",fullExplanation:"Planning is not about making the project rigid. It gives you fewer surprises while still leaving room to adjust.",whenToUse:"Use before starting any larger or fitted project, when modifying a pattern, or when using stash yarn.",whyItMatters:"Most avoidable project problems start before the first stitch: wrong size, wrong yardage, missing tool, unclear repeat, or untested gauge.",miniExample:"Before a cardigan, record body measurement, intended ease, finished bust, yarn amount, gauge, button band plan, and blocking expectation.",stepByStep:["Choose project type and size.","Measure body or target object.","Choose yarn and confirm yardage.","Make and record a swatch.","Read the full pattern once and mark repeats or charts.","Plan modifications, colour changes, blocking, and finishing.","Save notes and add uncertain tasks to the project checklist."],commonMistakes:["Starting before checking yardage.","Skipping measurements for gifts.","Making modifications without recording the original numbers."],troubleshooting:["If you feel stuck before starting, make the checklist smaller: yarn, size, gauge, first row.","If modifying, save original and target measurements side by side.","If using stash yarn, check dye lot and total meterage first."],relatedTools:["Project Notes","Buy List","Yarn Estimator","Gauge / Swatch Adapter","Project Rendering Studio"],relatedProjectTypes:["All projects"],relatedEntries:["gauge-basics","reading-yarn-labels","planning-colour-changes"],nextLearningSteps:["Reading Pattern Requirements","Planning Modifications","Blocking"],keywords:["project planning","checklist","before starting","project notes","measure body","choosing size"]}),
  wikiEntry({id:"reading-patterns",title:"Reading Written Patterns",category:"Pattern & Chart Reading",subcategory:"Written instructions",craftTypes:["shared"],level:"beginner",summary:"Written patterns use abbreviations, brackets, repeats, row or round labels, stitch counts, and notes that must be read in order.",fullExplanation:"A pattern line is easier when broken into before-repeat, repeat, after-repeat, and final stitch-count parts. Do not work from one abbreviation at a time without reading the whole instruction.",whenToUse:"Use when a row has brackets, asterisks, repeat instructions, stitch counts, or confusing wording.",whyItMatters:"Most reading mistakes happen when makers repeat too much, miss final stitches, or ignore an at-the-same-time note.",miniExample:"K2, [yo, k2tog] 6 times, k2 means work K2 once, repeat only the bracket 6 times, then K2 once at the end.",stepByStep:["Read notes and abbreviation list first.","Find the row or round number.","Mark brackets, asterisks, and repeat counts.","Count the stitches in one repeat.","Work slowly and count at the end of the row.","Highlight at-the-same-time instructions separately."],commonMistakes:["Repeating stitches outside the brackets.","Missing stitch counts in parentheses.","Mixing US and UK crochet terms."],troubleshooting:["If a repeat does not fit, check the stitch multiple and starting count.","If the row feels too long, check whether you repeated the edge stitches.","If the abbreviation is unclear, use the pattern glossary first."],relatedTools:["Repeat Calculator","Row / Round Counter Helper","Project Notes","Chart Annotation / OG Mode"],relatedProjectTypes:["All projects"],relatedEntries:["reading-repeats","stitch-count-troubleshooting","chart-reading"],nextLearningSteps:["Reading Repeats","Chart Reading","Pattern Modification"],keywords:["pattern reading","abbreviations","brackets","asterisk","repeat","row instruction","round instruction"]}),
  wikiEntry({id:"chart-reading",title:"Reading Charts",category:"Pattern & Chart Reading",subcategory:"Charts",craftTypes:["shared"],level:"intermediate",summary:"Charts show stitches visually, but direction, symbol legend, right-side/wrong-side rules, and craft type decide how to read them.",fullExplanation:"Knitting charts, crochet charts, and Tunisian charts are not read the same way. Always use the pattern legend and chart notes before assuming a symbol meaning.",whenToUse:"Use when following lace, cables, colourwork, motifs, crochet diagrams, Tunisian stitch charts, or imported chart images.",whyItMatters:"Reading the wrong direction or symbol meaning can shift an entire project.",miniExample:"A flat knitting chart may read right-to-left on right-side rows and left-to-right on wrong-side rows. A crochet motif chart may read in rounds from the centre outward.",stepByStep:["Find the legend before reading symbols.","Identify whether the chart is flat, in the round, motif, or Tunisian.","Check row direction and starting row.","Mark the current row with Yarncha's row mask or annotation tools.","Use row counters and repeat markers for repeated sections.","Verify unclear symbols before continuing."],commonMistakes:["Assuming symbols are universal.","Reading wrong-side rows in the same direction as right-side rows.","Ignoring repeat boxes or chart boundaries."],troubleshooting:["If the chart does not match the stitch count, check direction and repeats.","If symbols are unclear, zoom and compare with the legend.","If you lose your place, use row mask, markers, and notes before continuing."],relatedTools:["Chart Annotation / OG Mode","Row / Round Counter Helper","Grid Planner","Symbol Database"],relatedProjectTypes:["Lace","Cables","Colourwork","Motifs","Tunisian panels"],relatedEntries:["reading-patterns","stitch-anatomy","stitch-count-troubleshooting"],nextLearningSteps:["Reading Repeats","Symbol Database","Flow Mode"],keywords:["chart","chart reading","legend","symbols","row direction","OG Mode","annotation","row mask"]}),
  wikiEntry({id:"modifying-garment-size",title:"Modifying Garment Size",category:"Modification & Design Math",subcategory:"Garment math",craftTypes:["shared"],level:"advanced",summary:"Garment modification means changing stitch counts, row counts, gauge, ease, length, neckline, armhole, or sleeve measurements while preserving the pattern structure.",fullExplanation:"A garment is a set of connected measurements. Changing one area can affect shaping, repeats, yardage, and fit elsewhere.",whenToUse:"Use when changing size, yarn weight, gauge, body length, sleeve length, neckline, armhole depth, ease, or stitch count.",whyItMatters:"Good modification keeps the pattern's construction logic while making the result fit your body or yarn.",miniExample:"Adding 4 cm body length may require extra yarn and may move waist shaping or colour changes.",stepByStep:["Record original pattern gauge and finished measurements.","Record your gauge and target body measurements.","Choose intended ease.","Calculate new stitch and row counts.","Check stitch multiples and shaping intervals.","Adjust yarn estimate and project notes.","Make changes in a test section before committing to the whole garment."],commonMistakes:["Changing stitch count without checking repeats.","Adding length without changing yarn estimate.","Changing armhole depth without sleeve-cap consequences."],troubleshooting:["If the repeat no longer fits, adjust to the nearest valid multiple.","If sleeve length is wrong, compare row gauge and shaping rows.","If garment is too tight, check finished measurement and ease before blocking aggressively."],relatedTools:["Garment Resizer","Pattern Resizer","Sleeve Calculator","Raglan Calculator","Gauge / Swatch Adapter"],relatedProjectTypes:["Sweaters","Cardigans","Tops","Vests"],relatedEntries:["knitting-construction","ease","gauge-adjustment"],nextLearningSteps:["Grading Sizes","Professional Fit Checking","Pattern Design Math"],keywords:["modify pattern","resize sweater","garment size","ease","sleeve length","neckline","armhole","grading"]}),
  wikiEntry({id:"yarn-substitution",title:"Yarn Substitution",category:"Project Planning",subcategory:"Yarn planning",craftTypes:["shared"],level:"intermediate",summary:"Yarn substitution compares weight, gauge, meterage, fibre, ply, drape, stretch, colour, and care so a different yarn can behave close enough to the pattern yarn.",fullExplanation:"A substitute does not need to be identical, but it must suit the project purpose. A drapey alpaca may not replace springy wool in ribbing, and cotton may grow in garments.",whenToUse:"Use when the pattern yarn is unavailable, too expensive, not in stash, discontinued, or unsuitable for the recipient.",whyItMatters:"Substitution affects size, hand feel, durability, warmth, drape, and yardage.",miniExample:"DK cotton and DK merino can both match stitch gauge, but cotton may stretch lengthwise and have less recovery in ribbing.",stepByStep:["Compare yarn weight and meterage per 100 g.","Compare fibre behaviour, stretch, drape, and care.","Check recommended gauge and tool size.","Swatch in the actual pattern stitch.","Estimate total yardage plus buffer.","Buy matching dye lots when possible."],commonMistakes:["Matching only yarn weight.","Ignoring fibre stretch and blocking behaviour.","Buying equal ball count instead of equal meterage."],troubleshooting:["If fabric is too stiff, try larger tool or softer fibre.","If fabric grows, choose more elastic fibre or adjust length.","If yardage is uncertain, buy extra or plan contrast sections."],relatedTools:["Yarn Substitution Helper","Yarn Weight Converter","Gauge / Swatch Adapter","Yarn Estimator"],relatedProjectTypes:["Garments","Socks","Blankets","Bags","Toys"],relatedEntries:["yarn-weight","yarn-fibre-types","reading-yarn-labels"],nextLearningSteps:["Swatching","Drape","Blocking"],keywords:["yarn substitution","substitute yarn","DK instead of worsted","different yarn","fibre"]}),
  wikiEntry({id:"blocking",title:"Blocking",category:"Foundations",subcategory:"Finishing",craftTypes:["shared"],level:"beginner",summary:"Blocking shapes and relaxes fabric with water, steam, or gentle pinning. It can change size, drape, stitch definition, and edges.",fullExplanation:"Blocking is part finishing and part measurement check. Different fibres react differently, so the swatch should be blocked before relying on final measurements.",whenToUse:"Use after finishing lace, garments, shawls, squares, Tunisian panels, or anything where edges and measurements matter.",whyItMatters:"Blocking can improve fabric, but it can also reveal growth. Planning for blocking avoids surprise size changes.",miniExample:"A lace shawl may open beautifully after wet blocking, while a cotton top may grow longer than expected.",stepByStep:["Check fibre care instructions.","Test blocking on a swatch first.","Measure before blocking.","Block gently according to fibre and project type.","Measure after drying completely.","Record final measurements in Project Notes."],commonMistakes:["Steaming acrylic too hot.","Stretching ribbing until it loses recovery.","Judging size before the fabric is fully dry."],troubleshooting:["If blocking changed size too much, compare swatch behaviour and fibre content.","If edges still curl, add border or adjust stitch choice next time.","If fabric is limp, avoid overstretching and use gentler blocking."],relatedTools:["Blocking Calculator","Gauge / Swatch Adapter","Project Notes"],relatedProjectTypes:["Garments","Shawls","Lace","Tunisian crochet","Granny squares"],relatedEntries:["swatching","tunisian-curling","gauge-basics"],nextLearningSteps:["Finishing","Seaming","Drape"],keywords:["blocking","wet block","steam block","pinning","finished size","care instructions"]})
];
libraryWikiEntries.push(
  wikiEntry({id:"cast-on-bind-off",title:"Cast-On and Bind-Off Edges",category:"Knitting Knowledge",subcategory:"Edges and finishing",craftTypes:["knitting"],level:"beginner",summary:"Cast-on creates the starting edge and bind-off or cast-off secures live stitches at the end. Edge tension affects fit, stretch, and comfort.",fullExplanation:"A cast-on or bind-off can be technically correct but too tight for ribbing, socks, cuffs, neck openings, shawls, and blankets. The method should match the fabric's stretch and purpose.",whenToUse:"Use when starting knitting, finishing knitting, fixing a tight edge, choosing a stretchy edge, or comparing bind off / cast off wording.",whyItMatters:"A tight edge can make a hat, sock, sleeve, or neckline uncomfortable even when the rest of the gauge is correct.",miniExample:"A ribbed cuff may need a stretchier cast-on and bind-off than a flat garter-stitch scarf edge.",stepByStep:["Choose the cast-on or bind-off method named by the pattern.","Keep the edge loops relaxed and evenly spaced.","Count the starting or remaining stitches carefully.","Compare edge stretch with the fabric after a few rows or before fastening off.","If the edge is too tight, undo early and use a stretchier method or larger needle for the edge only."],commonMistakes:["Casting on too tightly.","Binding off too tightly.","Confusing bind off and cast off as different actions.","Using a firm edge where the project needs stretch."],troubleshooting:["If the cast-on is tight, recast with a larger needle or stretchier method.","If bind-off pulls inward, undo it and bind off more loosely.","If stitch count changes at the edge, recount before continuing."],relatedTools:["Needle / Hook Adjustment","Row / Round Counter Helper","Project Notes"],relatedProjectTypes:["Hats","Socks","Sleeves","Sweaters","Scarves","Blankets"],relatedEntries:["knit-and-purl","stitch-count-troubleshooting","terminology-variants"],nextLearningSteps:["Stretchy Cast-On","Stretchy Bind-Off","Reading Knitting Patterns"],keywords:["cast on","bind off","cast off","too tight cast on","too tight bind off","edge tension","live stitches"]}),
  wikiEntry({id:"yarn-over-increases-decreases",title:"Yarn Over, Increases, and Decreases",category:"Foundations",subcategory:"Shaping and stitch count",craftTypes:["shared","knitting","crochet"],level:"beginner",summary:"Yarn overs, increases, and decreases change stitch count, shaping, lace openings, and fabric direction.",fullExplanation:"A yarn over usually creates a new loop and often a decorative hole. Increases add stitches; decreases consume stitches. Patterns may pair them to keep stitch count stable.",whenToUse:"Use when a row includes yo, m1, kfb, inc, sc2tog, k2tog, ssk, decrease, shaping, lace, sleeves, hats, or amigurumi forms.",whyItMatters:"Most count problems happen when a maker forgets that yarn overs add stitches or decreases remove them.",miniExample:"In knitting, [yo, k2tog] can keep the total stitch count the same because one stitch is added and one is removed.",stepByStep:["Mark every stitch-count changing action in the row.","Check whether each yarn over or increase adds one or more stitches.","Check how many stitches each decrease consumes.","Compare the expected stitch count before and after the row.","Place markers between repeats until the count is stable."],commonMistakes:["Forgetting to make the yarn over.","Skipping an extra stitch after a decrease.","Adding a stitch when the pattern only wanted a decorative yarn movement.","Not pairing increases/decreases inside lace repeats."],troubleshooting:["If count is high, check accidental yarn overs and extra increases.","If count is low, check missed yarn overs or extra decreases.","If lace is shifted, check the repeat boundary and marker placement."],relatedTools:["Repeat Calculator","Row / Round Counter Helper","Chart Annotation / OG Mode"],relatedProjectTypes:["Lace","Sleeves","Garments","Hats","Amigurumi","Shawls"],relatedEntries:["stitch-count-troubleshooting","reading-repeats","stitch-anatomy"],nextLearningSteps:["Reading Repeats","Chart Symbols","Shaping"],keywords:["yarn over","yo","increase","decrease","k2tog","ssk","sc2tog","m1","kfb","lace","stitch count"]}),
  wikiEntry({id:"measurement-guide",title:"Measurement and Sizing Guide",category:"Project Planning",subcategory:"Measurements",craftTypes:["shared"],level:"beginner",summary:"A practical measuring reference for garments, accessories, blankets, bags, socks, hats, and amigurumi sizing.",fullExplanation:"Measurements connect pattern numbers to the body or object the project must fit. Yarncha keeps measurements separate from guesses so calculators can use clearer inputs.",whenToUse:"Use before choosing a size, changing length, planning sleeves, checking hat or sock fit, resizing a blanket, or adjusting a bag or toy.",whyItMatters:"A good measurement prevents beautiful fabric from becoming the wrong size.",miniExample:"For a hat, head circumference matters more than age. For socks, foot length and foot circumference both matter.",stepByStep:["Measure the body or item gently without pulling the tape tight.","Record bust/chest, shoulder width, armhole depth, sleeve length, upper arm, wrist, body length, hip, neck opening, head circumference, foot length, foot circumference, hand circumference, and project-specific sizes as needed.","Compare measurements with finished project size and intended ease.","Use Gauge / Swatch Adapter, Garment Resizer, Size Reference, Hat Calculator, Sock Calculator, or Blanket Size Reference when numbers need checking."],commonMistakes:["Choosing garment size by shop clothing size only.","Forgetting ease.","Measuring a stretched item instead of relaxed fabric."],troubleshooting:["If a sleeve length is wrong, compare body measurement, row gauge, and shaping intervals.","If a hat feels tight, compare head circumference with finished circumference and stretch.","If a blanket is too small, check motif count, gauge, and border plan."],relatedTools:["Size Reference","Garment Resizer","Sleeve Calculator","Hat Calculator","Sock Calculator","Blanket Size Reference"],relatedProjectTypes:["Sweaters","Cardigans","Tops","Hats","Socks","Gloves","Blankets","Scarves","Bags","Amigurumi"],relatedEntries:["gauge-basics","garment-modification","project-too-big-small"],nextLearningSteps:["Ease","Gauge Adjustment","Project Planning Checklist"],keywords:["measurement guide","bust","chest","shoulder width","armhole depth","sleeve length","upper arm","wrist","body length","hip","neck opening","head circumference","foot length","foot circumference","hand circumference","blanket size","scarf size","hat size","sock size","bag size","amigurumi size"],measurements:libraryMeasurementGuides}),
  wikiEntry({id:"terminology-variants",title:"Terminology and Regional Variants",category:"Foundations",subcategory:"Terminology",craftTypes:["shared"],level:"beginner",summary:"Craft patterns use regional names for the same ideas. Yarncha search recognises aliases across US, UK, AU, metric, and common maker slang.",fullExplanation:"US and UK crochet terms can use the same words for different stitches. Yarn weights, hook sizes, needle sizes, gauge, tension, cast off, bind off, frogging, and ripping back also vary by region.",whenToUse:"Use whenever a pattern source, yarn label, or video tutorial uses unfamiliar regional language.",whyItMatters:"Term confusion can change every stitch in a project, especially in crochet patterns.",miniExample:"US single crochet is UK double crochet. 8 ply is often treated like DK, but swatching still decides the final match.",stepByStep:["Identify the pattern region if possible.","Check whether crochet terms are US or UK.","Convert hook and needle sizes by metric diameter.","Translate yarn weight terms such as 8 ply, DK, worsted, Aran, and CYC numbers.","Search Yarncha by any alias; the Library will point to the matching guide."],commonMistakes:["Mixing US and UK crochet terms in one project.","Assuming ply always equals exact thickness.","Treating gauge and tension as different measurements."],troubleshooting:["If stitches look too tall, check US/UK crochet terminology first.","If yarn substitution is off, compare meterage per 100 g and gauge, not name alone.","If a cast off is too tight, search bind off/cast off for technique options."],relatedTools:["Craft converters","Yarn Weight Converter","Needle / Hook Adjustment"],relatedProjectTypes:["All projects"],relatedEntries:["yarn-weight","reading-yarn-labels","crochet-stitch-height"],nextLearningSteps:["Reading Patterns","Yarn Substitution","Chart Symbols"],keywords:["US/UK crochet terms","AU/UK yarn terms","US yarn weights","mm hook","US needle","UK needle","ply terms","bind off","cast off","gauge","tension","frogging","ripping back"],terminologyAliases:libraryTerminologyVariants.flatMap(item=>[item.term,...item.aliases])}),
  wikiEntry({id:"craft-safety-suitability",title:"Craft Safety and Suitability Notes",category:"Project Planning",subcategory:"Safety and suitability",craftTypes:["shared"],level:"beginner",summary:"Yarn choice, finishing details, recipient age, heat exposure, and fabric structure affect whether a project is suitable for everyday use.",fullExplanation:"A project can be technically correct but unsuitable for a baby, hot kitchen, hard-wearing bag, sensitive skin, or fitted garment. Safety and suitability notes help makers choose materials and details intentionally.",whenToUse:"Use when making baby items, toys, amigurumi, bags, kitchen items, garments, heat-adjacent items, or gifts for sensitive skin.",whyItMatters:"Small choices like safety eyes, buttons, ties, fibre, steam, and fabric density can change comfort, durability, and safety.",miniExample:"Safety eyes are not recommended for babies. Embroidered eyes are a safer option for baby toys.",stepByStep:["Identify the recipient and how the item will be used.","Check fibre behaviour, heat tolerance, stretch, and care needs.","Avoid unsafe small parts for babies.","Test blocking and washing on a swatch.","Record safety notes in Project Notes before gifting."],commonMistakes:["Using safety eyes for baby toys.","Steaming acrylic too hot.","Choosing cotton for a garment that needs strong recovery.","Making a bag fabric too loose for heavy use."],troubleshooting:["If a garment grows, check fibre stretch and blocked measurements.","If a bag stretches, use firmer fabric, lining, or reinforced handles.","If skin feels itchy, choose softer fibre or a barrier layer."],relatedTools:["Yarn Substitution Helper","Blocking Calculator","Project Notes","Yarn Estimator"],relatedProjectTypes:["Baby items","Amigurumi","Bags","Garments","Kitchen items","Gifts"],relatedEntries:["yarn-fibre-types","blocking","amigurumi-shaping"],nextLearningSteps:["Fibre Behaviour","Blocking","Project Planning Checklist"],keywords:["baby items","safety eyes","buttons","long ties","acrylic melts","cotton stretches","wool irritation","pilling","bag durability","steam blocking damage","garments grow"],safetyNotes:libraryCraftSafetyNotes}),
  wikiEntry({id:"copyright-pattern-protection",title:"Copyright and Pattern Protection",category:"Pattern & Chart Reading",subcategory:"Ethical use",craftTypes:["shared"],level:"beginner",summary:"Yarncha can help with general technique and private notes, but it must not reproduce full paid patterns, copyrighted charts, or copied designer instructions.",fullExplanation:"The Library is for original Yarncha explanations, user-owned private notes, and general craft education. Public or community content must not paste protected designer material.",whenToUse:"Use before saving, importing, sharing, or asking the Assistant about pattern text, charts, designer content, or community submissions.",whyItMatters:"Respecting designers keeps Yarncha useful, safe, and fair for makers and pattern creators.",miniExample:"It is okay to ask how decreases work in general. It is not okay to publish a designer's paid chart or full row-by-row instructions as a Library entry.",stepByStep:["Keep purchased pattern text and charts private.","Use Project Notes for personal reminders, not public copying.","Ask the Assistant for general technique or help with user-provided numbers.","Report copied or suspicious community content.","Credit sources where allowed and write original summaries."],commonMistakes:["Pasting a full paid pattern into a public note.","Uploading copyrighted charts as shared Library content.","Assuming a barcode/product listing gives permission to copy images or instructions."],troubleshooting:["If content looks copied, use Report copied or suspicious content.","If you need help, ask a general technique question or provide your own numbers.","If uncertain, keep the note private."],relatedTools:["Project Notes","Assistant","Library"],relatedProjectTypes:["All projects"],relatedEntries:["reading-charts","reading-patterns","project-planning-checklist"],nextLearningSteps:["Private Notes","Community Review","Pattern Reading"],keywords:["copyright","paid pattern","copyrighted charts","designer content","private notes","community submissions","report copied content"]})
);
const libraryLearningPaths=[
  {id:"knitting-beginner",title:"Knitting Beginner Path",difficulty:"Beginner",estimatedTime:"3-5 hours",orderedEntries:["reading-yarn-labels","yarn-weight","swatching","gauge-basics","stitch-anatomy","knit-and-purl","reading-knitting-patterns"],practiceTask:"Make a small garter or rib swatch, measure gauge, and save the note to a project.",relatedTools:["Gauge / Swatch Adapter","Row / Round Counter Helper"],nextStep:"Try a simple scarf or hat with saved row tracking."},
  {id:"crochet-beginner",title:"Crochet Beginner Path",difficulty:"Beginner",estimatedTime:"3-5 hours",orderedEntries:["reading-yarn-labels","stitch-anatomy","crochet-stitch-height","crochet-circle-formula","stitch-count-troubleshooting"],practiceTask:"Make a flat circle and a small rectangle, then check stitch count and edges.",relatedTools:["Circle Calculator","Row / Round Counter Helper"],nextStep:"Try a granny square, bag base, or simple amigurumi shape."},
  {id:"tunisian-beginner",title:"Tunisian Beginner Path",difficulty:"Beginner",estimatedTime:"2-4 hours",orderedEntries:["tunisian-forward-return-pass","tunisian-curling","swatching","blocking"],practiceTask:"Make a Tunisian simple stitch swatch with two hook sizes and compare curl.",relatedTools:["Needle / Hook Adjustment","Blocking Calculator"],nextStep:"Plan a scarf panel with a border."},
  {id:"gauge-swatching",title:"Gauge and Swatching Path",difficulty:"Beginner",estimatedTime:"2 hours",orderedEntries:["gauge-basics","swatching","blocking","gauge-adjustment"],practiceTask:"Make and block one swatch, then record stitch and row gauge.",relatedTools:["Gauge / Swatch Adapter","Needle / Hook Adjustment"],nextStep:"Use the numbers in Pattern Resizer."},
  {id:"pattern-reading",title:"Pattern Reading Path",difficulty:"Beginner",estimatedTime:"3 hours",orderedEntries:["terminology-variants","reading-patterns","reading-repeats","stitch-count-troubleshooting"],practiceTask:"Mark repeats and stitch-count changes in a short written row.",relatedTools:["Repeat Calculator","Project Notes"],nextStep:"Try a small lace or texture repeat."},
  {id:"chart-reading",title:"Chart Reading Path",difficulty:"Intermediate",estimatedTime:"3 hours",orderedEntries:["reading-charts","stitch-anatomy","symbol-database","reading-repeats"],practiceTask:"Highlight one chart row and compare it with the legend.",relatedTools:["Symbol Database","Chart Annotation / OG Mode"],nextStep:"Track the chart in Flow Mode."},
  {id:"amigurumi",title:"Amigurumi Path",difficulty:"Beginner",estimatedTime:"4 hours",orderedEntries:["crochet-circle-formula","amigurumi-shaping","stitch-count-troubleshooting","craft-safety-suitability"],practiceTask:"Make a sphere, check increase/decrease rounds, and review baby safety notes.",relatedTools:["Amigurumi Shape Guide","Circle Calculator"],nextStep:"Plan a small toy with embroidered features if for a baby."},
  {id:"sock-knitting",title:"Sock Knitting Path",difficulty:"Intermediate",estimatedTime:"5 hours",orderedEntries:["yarn-fibre-types","measurement-guide","gauge-basics","reading-repeats"],practiceTask:"Measure foot length and circumference, then compare yarn durability.",relatedTools:["Sock Calculator","Yarn Substitution Helper"],nextStep:"Track heel and gusset sections with Sub Row Counters."},
  {id:"garment-modification",title:"Garment Modification Path",difficulty:"Advanced",estimatedTime:"5-8 hours",orderedEntries:["measurement-guide","ease","gauge-basics","garment-modification","yarn-substitution"],practiceTask:"Compare body measurements, finished measurements, and ease for one sweater section.",relatedTools:["Garment Resizer","Sleeve Calculator","Gauge / Swatch Adapter"],nextStep:"Save a fit-check note to the project."},
  {id:"yarn-substitution",title:"Yarn Substitution Path",difficulty:"Intermediate",estimatedTime:"2-3 hours",orderedEntries:["yarn-weight","yarn-fibre-types","reading-yarn-labels","yarn-substitution","running-out-of-yarn"],practiceTask:"Compare two yarns by weight, meterage, fibre, and swatched gauge.",relatedTools:["Yarn Substitution Helper","Yarn Estimator"],nextStep:"Add selected yarn to Yarn Stash."},
  {id:"troubleshooting",title:"Troubleshooting Path",difficulty:"Beginner",estimatedTime:"3 hours",orderedEntries:["stitch-count-troubleshooting","project-too-big-small","knitting-curling","tunisian-curling","running-out-of-yarn"],practiceTask:"Choose one symptom and follow the decision path before undoing work.",relatedTools:["Row / Round Counter Helper","Gauge / Swatch Adapter"],nextStep:"Save the result to Project Notes."},
  {id:"pattern-design-math",title:"Pattern Design and Math Path",difficulty:"Advanced",estimatedTime:"6 hours",orderedEntries:["gauge-basics","measurement-guide","garment-modification","crochet-circle-formula","project-planning-checklist"],practiceTask:"Draft a small swatch-based rectangle or circle plan and check the numbers.",relatedTools:["Pattern Resizer","Repeat Calculator","Project Rendering Studio"],nextStep:"Save the plan as a Project Idea."}
];
function libraryWikiEntryById(id){return libraryWikiEntries.find(entry=>entry.id===id||entry.slug===id);}
function normalizeLibraryCraft(craft=""){const value=String(craft||"").toLowerCase();return /tunisian/.test(value)?"tunisian":/crochet/.test(value)?"crochet":/knit/.test(value)?"knitting":value||"shared";}
function libraryEntrySearchText(entry){return [entry.title,entry.summary,entry.fullExplanation,entry.category,entry.subcategory,entry.level,entry.sourceQuality,entry.reliabilityStatus,...(entry.craftTypes||[]),...(entry.keywords||[]),...(entry.aliases||[]),...(entry.terminologyAliases||[]),...(entry.measurements||[]),...(entry.safetyNotes||[]),...(entry.relatedTools||[]),...(entry.relatedProjectTypes||[]),...(entry.visualAssets||[]).flatMap(asset=>[asset.altText,asset.caption,asset.troubleshootingTopic]),...(entry.diagnosticFlow?.symptoms||[]),...(entry.diagnosticFlow?.likelyCauses||[])].join(" ").toLowerCase();}
function smartLibraryMatches(query=""){
  const q=String(query||"").toLowerCase();
  if(!q)return [];
  return libraryProblemSearchMap.filter(item=>item.phrases.some(phrase=>q.includes(phrase))).flatMap(item=>item.entries).map(libraryWikiEntryById).filter(Boolean);
}
function findLibraryEntriesForAssistant(question="",craftType="shared",limit=3){
  const q=String(question||"").toLowerCase(),craft=normalizeLibraryCraft(craftType),tokens=q.split(/[^a-z0-9]+/).filter(token=>token.length>2);
  const smart=smartLibraryMatches(q);
  return libraryWikiEntries.map(entry=>{
    const text=libraryEntrySearchText(entry);
    let score=smart.includes(entry)?10:0;
    if(entry.craftTypes.includes(craft)||entry.craftTypes.includes("shared"))score+=2;
    if(q.includes(entry.title.toLowerCase()))score+=8;
    for(const alias of entry.aliases||[])if(q.includes(alias.toLowerCase()))score+=5;
    for(const keyword of entry.keywords||[])if(q.includes(keyword.toLowerCase()))score+=3;
    for(const token of tokens)if(text.includes(token))score+=1;
    return {entry,score};
  }).filter(item=>item.score>1).sort((a,b)=>b.score-a.score).slice(0,limit).map(item=>item.entry);
}
function filteredLibraryWikiEntries(){
  const filters=libraryWikiFilters,q=String(filters.search||"").trim().toLowerCase();
  const smart=new Set(smartLibraryMatches(q).map(entry=>entry.id));
  return libraryWikiEntries.filter(entry=>{
    if(q&&!libraryEntrySearchText(entry).includes(q)&&!smart.has(entry.id))return false;
    if(filters.craft!=="All"&&!entry.craftTypes.includes("shared")&&!entry.craftTypes.includes(filters.craft))return false;
    if(filters.level!=="All"&&entry.level!==filters.level)return false;
    if(filters.category!=="All"&&entry.category!==filters.category)return false;
    if(filters.projectType!=="All"&&!(entry.relatedProjectTypes||[]).includes(filters.projectType))return false;
    if(filters.tool!=="All"&&!(entry.relatedTools||[]).includes(filters.tool))return false;
    if(filters.path!=="All"&&!entry.keywords?.join(" ").toLowerCase().includes(filters.path.toLowerCase())&&entry.category!==filters.path)return false;
    return true;
  });
}
function libraryWikiOption(values,current){return values.map(value=>`<option value="${escapeHtml(value)}" ${current===value?"selected":""}>${escapeHtml(value==="All"?"All":libraryCraftLabels[value]||libraryLevelLabels[value]||value)}</option>`).join("");}
function libraryEntryBadgeHtml(entry){
  const craft=(entry.craftTypes||[]).map(craft=>`<span>${escapeHtml(libraryCraftLabels[craft]||craft)}</span>`).join("");
  return `<div class="wiki-badges"><span>${escapeHtml(libraryLevelLabels[entry.level]||entry.level)}</span>${craft}<span>${escapeHtml(entry.sourceQuality||libraryReviewStatusLabel(entry.verifiedStatus))}</span><span>${escapeHtml(entry.estimatedReadTime)}</span></div>`;
}
function libraryEntryCardHtml(entry){
  const saved=(state.libraryBookmarks||[]).includes(entry.id);
  return `<article class="wiki-entry-card card"><div><p class="eyebrow">${escapeHtml(entry.category)} · ${escapeHtml(entry.subcategory)}</p><h3>${escapeHtml(entry.title)}</h3>${libraryEntryBadgeHtml(entry)}<p>${escapeHtml(entry.summary)}</p></div><div class="wiki-card-actions"><button class="secondary-button" data-wiki-entry="${entry.id}">Read guide</button><button class="text-button" data-wiki-save="${entry.id}">${saved?"Saved":"Save"}</button></div></article>`;
}
function libraryWikiHubCardsHtml(){
  const groups=[
    ["Foundations",[["Beginner foundations","beginner","Yarn labels, swatching, gauge, stitch anatomy, and simple rows."],["Yarn & fibre","Yarn & Fibre Library","Fibre behaviour, care, drape, durability, and project suitability."]]],
    ["Knowledge Library",[["Knitting","knitting","Stitches, charts, shaping, garments, and fit."],["Crochet","crochet","Stitch height, circles, motifs, amigurumi, and construction."],["Tunisian crochet","tunisian","Forward and return passes, curl control, hooks, and fabric."]]],
    ["Troubleshooting",[["Solve a making problem","Troubleshooting Hub","Find guidance by symptom, likely cause, quick check, or fix."]]]
  ];
  return `<nav class="knowledge-hub-groups" aria-label="Theory and Foundation areas">${groups.map(([title,items])=>`<section class="knowledge-hub-group"><h3>${escapeHtml(title)}</h3>${items.map(([label,path,copy])=>`<button class="knowledge-hub-row" data-wiki-path="${escapeHtml(path)}"><span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(copy)}</small></span><span aria-hidden="true">→</span></button>`).join("")}</section>`).join("")}</nav>`;
}
function libraryLearningPathItemHtml(path){
  const progress=Number(state.libraryPathProgress?.[path.id]||0),total=path.orderedEntries.length,percent=total?Math.min(100,Math.round(progress/total*100)):0;
  return `<article class="wiki-path-card learning-path-item"><div class="learning-path-copy"><div class="learning-path-meta"><span>${escapeHtml(path.difficulty)}</span><span>${escapeHtml(path.estimatedTime)}</span><span>${progress}/${total} complete</span></div><h4>${escapeHtml(path.title)}</h4><p>${escapeHtml(path.practiceTask)}</p><div class="learning-path-progress" aria-label="${percent}% complete"><span style="width:${percent}%"></span></div></div><div class="wiki-card-actions"><button class="secondary-button" data-wiki-learning-path="${escapeHtml(path.id)}">Open path</button><button class="text-button" data-wiki-path-progress="${escapeHtml(path.id)}">Mark next</button></div></article>`;
}
function libraryLearningPathsHtml(){
  const levels=["Beginner","Intermediate","Advanced"];
  const groups=levels.map(level=>{const paths=libraryLearningPaths.filter(path=>String(path.difficulty).toLowerCase()===level.toLowerCase());return paths.length?`<section class="learning-path-group"><div class="learning-path-group-heading"><h3>${level}</h3><span>${paths.length} path${paths.length===1?"":"s"}</span></div><div class="learning-path-list">${paths.map(libraryLearningPathItemHtml).join("")}</div></section>`:"";}).join("");
  return `<section class="wiki-path-section library-section"><div class="library-section-heading"><div><p class="eyebrow">LEARNING PATHS</p><h2>Guided craft journeys</h2><p>Choose a level, follow each guide in order, and keep your progress.</p></div><span>${libraryLearningPaths.length} paths</span></div>${groups}</section>`;
}
function libraryLearningPathDetailHtml(path){
  const progress=Number(state.libraryPathProgress?.[path.id]||0);
  const entries=path.orderedEntries.map(libraryWikiEntryById).filter(Boolean);
  return `<article class="wiki-detail learning-path-detail"><button class="text-button" id="wiki-entry-back">← Back to Theory & Foundation</button><header class="article-header"><p class="eyebrow">LEARNING PATH · ${escapeHtml(path.difficulty)} · ${escapeHtml(path.estimatedTime)}</p><h1>${escapeHtml(path.title)}</h1><p class="wiki-summary">${escapeHtml(path.practiceTask)}</p><div class="wiki-detail-actions"><button class="primary-button" data-wiki-path-progress="${escapeHtml(path.id)}">Mark next step complete</button><button class="text-button" data-wiki-path-reset="${escapeHtml(path.id)}">Reset progress</button></div></header><section class="wiki-path-plan"><h2>Ordered entries</h2>${entries.map((entry,index)=>`<button class="wiki-path-step ${index<progress?"complete":""}" data-wiki-entry="${entry.id}"><span>${index+1}</span><strong>${escapeHtml(entry.title)}</strong><small>${index<progress?"Complete":"Open guide"}</small></button>`).join("")}</section><section class="related-content"><div><h2>Related tools</h2><div class="wiki-chip-row">${path.relatedTools.map(tool=>`<button class="chip" data-wiki-tool="${escapeHtml(tool)}">${escapeHtml(tool)}</button>`).join("")}</div></div><div><h2>Next step</h2><p>${escapeHtml(path.nextStep)}</p></div></section></article>`;
}
function libraryVisualAssetsHtml(entry){
  return `<section class="wiki-visual-section"><h3>Visual learning</h3><div class="wiki-visual-grid">${(entry.visualAssets||[]).map(asset=>`<figure class="wiki-visual-card"><div class="wiki-visual-placeholder" aria-label="${escapeHtml(asset.altText)}"><span></span><span></span><span></span></div><figcaption><strong>${escapeHtml(asset.caption)}</strong><small>${escapeHtml(asset.craftType)} · ${escapeHtml(asset.level)} · ${escapeHtml(asset.type)}${asset.futureAnimationReady?" · GIF/animation-ready":""}</small><p>${escapeHtml(asset.altText)}</p></figcaption></figure>`).join("")}</div></section>`;
}
function libraryDecisionTreeHtml(entry){
  const flow=entry.diagnosticFlow||defaultDiagnosticFlow(entry);
  const block=(title,items)=>items?.length?`<div><h4>${escapeHtml(title)}</h4><ul>${items.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`:"";
  return `<section class="wiki-decision-tree article-section"><h2>Troubleshooting</h2><div class="diagnostic-groups"><section><h3>Problem</h3>${block("Symptoms",flow.symptoms)}</section><section><h3>Diagnosis</h3>${block("Likely causes",flow.likelyCauses)}${block("Quick checks",flow.quickChecks)}${block("Decision path",flow.decisionPath)}</section><section><h3>Resolution</h3>${block("Fixes",flow.fixes)}</section><section><h3>Prevention</h3>${block("How to avoid it",flow.prevention)}</section></div>${flow.saveToProjectAction?`<button class="secondary-button" data-wiki-checklist="${entry.id}">Save result to project checklist</button>`:""}</section>`;
}
function librarySmartSearchHintHtml(query=""){
  const smart=libraryProblemSearchMap.find(item=>item.phrases.some(phrase=>String(query||"").toLowerCase().includes(phrase)));
  if(!smart)return "";
  return `<div class="wiki-smart-search card"><p class="eyebrow">SMART SEARCH</p><strong>${escapeHtml(smart.assistantSuggestion)}</strong><div class="wiki-chip-row">${smart.tools.map(tool=>`<button class="chip" data-wiki-tool="${escapeHtml(tool)}">${escapeHtml(tool)}</button>`).join("")}</div></div>`;
}
function theoryFoundationHtml(){
  const entries=filteredLibraryWikiEntries(),selected=currentLibraryEntryId?libraryWikiEntryById(currentLibraryEntryId):null;
  const selectedPath=currentLibraryPathId?libraryLearningPaths.find(path=>path.id===currentLibraryPathId):null;
  if(selectedPath)return libraryLearningPathDetailHtml(selectedPath);
  if(selected)return libraryWikiEntryDetailHtml(selected);
  const categories=["All",...libraryWikiCategories],crafts=["All","shared","knitting","crochet","tunisian"],levels=["All","beginner","intermediate","advanced","expert"],projectTypes=["All",...[...new Set(libraryWikiEntries.flatMap(entry=>entry.relatedProjectTypes||[]))].sort()],tools=["All",...[...new Set(libraryWikiEntries.flatMap(entry=>entry.relatedTools||[]))].sort()];
  const savedEntries=(state.libraryBookmarks||[]).map(id=>libraryWikiEntryById(id)).filter(Boolean).slice(0,4);
  const recent=(state.libraryRecentlyViewed||[]).map(id=>libraryWikiEntryById(id)).filter(Boolean).slice(0,4);
  return `<section class="wiki-shell">
    <div class="wiki-hero"><p class="wiki-intro">Browse foundations, craft knowledge, and troubleshooting guidance.</p>${libraryWikiHubCardsHtml()}</div>
    ${libraryLearningPathsHtml()}
    <div class="wiki-filter-card card">
      <label class="field full">Search the wiki<input id="wiki-search" type="search" value="${escapeHtml(libraryWikiFilters.search)}" placeholder="Try: gauge, wavy circle, DK instead of worsted, Tunisian curl, chart direction"></label>
      <div class="wiki-filter-grid">
        <label>Craft<select id="wiki-craft">${libraryWikiOption(crafts,libraryWikiFilters.craft)}</select></label>
        <label>Level<select id="wiki-level">${libraryWikiOption(levels,libraryWikiFilters.level)}</select></label>
        <label>Category<select id="wiki-category">${libraryWikiOption(categories,libraryWikiFilters.category)}</select></label>
        <label>Project type<select id="wiki-project-type">${libraryWikiOption(projectTypes,libraryWikiFilters.projectType)}</select></label>
        <label>Related tool<select id="wiki-tool">${libraryWikiOption(tools,libraryWikiFilters.tool)}</select></label>
      </div>
    </div>
    ${librarySmartSearchHintHtml(libraryWikiFilters.search)}
    ${(savedEntries.length||recent.length)?`<div class="wiki-continuation-grid">${savedEntries.length?`<section class="card"><p class="eyebrow">SAVED ENTRIES</p>${savedEntries.map(entry=>`<button class="wiki-mini-link" data-wiki-entry="${entry.id}">${escapeHtml(entry.title)}</button>`).join("")}</section>`:""}${recent.length?`<section class="card"><p class="eyebrow">RECENTLY VIEWED</p>${recent.map(entry=>`<button class="wiki-mini-link" data-wiki-entry="${entry.id}">${escapeHtml(entry.title)}</button>`).join("")}</section>`:""}</div>`:""}
    <div class="wiki-result-heading"><strong>${entries.length} approved guide${entries.length===1?"":"s"}</strong><span>Official entries are separated from future community tips and personal notes.</span></div>
    <div class="wiki-entry-grid">${entries.length?entries.map(libraryEntryCardHtml).join(""):`<div class="empty-state"><h3>No guide matches yet</h3><p>Try clearing a filter or searching by a simpler problem name.</p></div>`}</div>
  </section>`;
}
function libraryWikiEntryDetailHtml(entry){
  const note=state.libraryEntryNotes?.[entry.id]||"",related=(entry.relatedEntries||[]).map(libraryWikiEntryById).filter(Boolean);
  const saved=(state.libraryBookmarks||[]).includes(entry.id);
  return `<article class="wiki-detail">
    <button class="text-button" id="wiki-entry-back">← Back to Theory & Foundation</button>
    <header class="article-header"><p class="eyebrow">${escapeHtml(entry.category)} · ${escapeHtml(entry.subcategory)}</p><h1>${escapeHtml(entry.title)}</h1>${libraryEntryBadgeHtml(entry)}<p class="wiki-summary">${escapeHtml(entry.summary)}</p></header>
    <div class="wiki-source-banner"><strong>${escapeHtml(entry.sourceQuality||"Official Yarncha Guide")}</strong><span>${escapeHtml(entry.author)} · v${escapeHtml(entry.version)} · Updated ${escapeHtml(entry.updatedAt||entry.lastUpdated)}</span></div>
    <div class="wiki-copyright-note"><strong>Copyright-safe Library use</strong><p>${escapeHtml(entry.copyrightPolicy?.summary||libraryCopyrightPolicy.summary)}</p></div>
    <div class="wiki-detail-actions"><button class="primary-button" data-wiki-ask="${entry.id}">Ask Assistant about this</button><button class="secondary-button" data-wiki-save="${entry.id}">${saved?"Saved":"Save entry"}</button><button class="text-button" data-wiki-project-note="${entry.id}">Add to project notes</button><button class="text-button" data-wiki-checklist="${entry.id}">Add to checklist</button><details class="wiki-more-actions"><summary>More</summary><div><button class="text-button" data-wiki-suggest="${entry.id}">Suggest edit</button><button class="text-button" data-wiki-report="${entry.id}">${escapeHtml(libraryCopyrightPolicy.reportLabel)}</button></div></details></div>
    ${libraryVisualAssetsHtml(entry)}
    <div class="wiki-detail-grid">
      <section><h3>Detailed explanation</h3><p>${escapeHtml(entry.fullExplanation)}</p></section>
      <section><h3>When to use this</h3><p>${escapeHtml(entry.whenToUse)}</p></section>
      <section><h3>Why it matters</h3><p>${escapeHtml(entry.whyItMatters)}</p></section>
      <section><h3>Mini example</h3><p>${escapeHtml(entry.miniExample)}</p></section>
      <section><h3>Step-by-step guidance</h3><ol>${(entry.stepByStep||[]).map(step=>`<li>${escapeHtml(step)}</li>`).join("")}</ol></section>
      <section><h3>Common mistakes</h3><ul>${(entry.commonMistakes||[]).map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
      <section><h3>Related tools</h3><div class="wiki-chip-row">${(entry.relatedTools||[]).map(tool=>`<button class="chip" data-wiki-tool="${escapeHtml(tool)}">${escapeHtml(tool)}</button>`).join("")}</div></section>
      <section><h3>Related project types</h3><div class="wiki-chip-row">${(entry.relatedProjectTypes||[]).map(type=>`<span class="chip passive">${escapeHtml(type)}</span>`).join("")}</div></section>
      <section><h3>Next learning step</h3><ul>${(entry.nextLearningSteps||[]).map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
      ${entry.safetyNotes?.length?`<section><h3>Safety and suitability</h3><ul>${entry.safetyNotes.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`:""}
      ${entry.measurements?.length?`<section><h3>Measurement guide</h3><div class="wiki-chip-row">${entry.measurements.map(item=>`<span class="chip passive">${escapeHtml(item)}</span>`).join("")}</div></section>`:""}
      ${entry.terminologyAliases?.length?`<section><h3>Terminology aliases</h3><div class="wiki-chip-row">${entry.terminologyAliases.slice(0,14).map(item=>`<span class="chip passive">${escapeHtml(item)}</span>`).join("")}</div></section>`:""}
    </div>
    ${libraryDecisionTreeHtml(entry)}
    <section class="wiki-version-card"><h3>Version history and maintenance</h3><dl><dt>Created</dt><dd>${escapeHtml(entry.createdAt)}</dd><dt>Updated</dt><dd>${escapeHtml(entry.updatedAt||entry.lastUpdated)}</dd><dt>Source</dt><dd>${escapeHtml(entry.source)}</dd><dt>Review status</dt><dd>${escapeHtml(entry.reliabilityStatus)}</dd><dt>Changelog</dt><dd>${escapeHtml((entry.changelog||[]).join(" · "))}</dd><dt>Related app version</dt><dd>${escapeHtml(entry.relatedAppVersion)}</dd></dl></section>
    ${related.length?`<section class="wiki-related"><h3>Related entries</h3><div class="wiki-entry-grid compact">${related.map(libraryEntryCardHtml).join("")}</div></section>`:""}
    <section class="wiki-notes card"><h3>Your private note</h3><textarea id="wiki-private-note" data-wiki-note="${entry.id}" rows="4" placeholder="Save your own reminder for this topic...">${escapeHtml(note)}</textarea><small>Private notes stay on this device unless a future sync/community feature is added.</small></section>
  </article>`;
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
        <div class="appearance-grid theme-preview-grid">${themePresets.map((t,index)=>themeGalleryCardHtml(t,activeTheme,index)).join("")}</div>
        <p class="theme-gallery-note">Palette inspiration: @Lux Design Studio from Pinterest.</p>
        <div class="appearance-heading"><h3>Light / Dark preview</h3><span class="muted-copy">Preview the selected theme before applying a mode.</span></div>
        ${themeComparePreviewHtml(activeThemePreset)}
        <div class="appearance-heading"><h3>Mode</h3><span class="muted-copy">System follows your device setting.</span></div>
        <div class="theme-grid mode-grid">${["light","dark","system"].map(m=>`<button class="theme-choice ${state.theme.mode===m?"active":""}" data-theme-mode="${m}">${m}</button>`).join("")}</div>
        <div class="appearance-heading"><h3>Design style</h3><span class="muted-copy">Style affects spacing, card shape, shadows, texture and overall feel.</span></div>
        <div class="appearance-grid style-preview-grid">${designStyles.map(s=>designStyleCardHtml(s,activeStyle)).join("")}</div>
        <div class="settings-divider"></div><div class="settings-form-row"><div><strong>Language</strong><p>Choose the language used across Yarncha.</p></div><select id="settings-language" aria-label="App language"><option value="en" ${state.language==="en"?"selected":""}>English</option><option value="zh-HK" ${state.language==="zh-HK"?"selected":""}>繁體中文（香港）</option></select></div>
      </section>
      <section class="card mobile-card settings-panel settings-panel-wide settings-preferences-card"><div class="settings-section-heading"><span class="settings-section-icon">${uiIcon("preferences","ui-icon")}</span><div><p class="eyebrow">APP PREFERENCES</p><h2>Making preferences</h2><p>Set the defaults Yarncha uses while you work.</p></div></div><div class="settings-form-row settings-form-row-stack"><div><strong>Preferred units</strong><p>Calculators use this system by default.</p></div><div class="theme-grid mode-grid"><button class="theme-choice ${state.unitSystem!=="imperial"?"active":""}" data-unit-system="metric">UK / Metric<br><small>cm · mm · metres · grams</small></button><button class="theme-choice ${state.unitSystem==="imperial"?"active":""}" data-unit-system="imperial">US / Imperial<br><small>inches · yards · ounces</small></button></div></div><div class="settings-divider"></div><label class="settings-toggle-row"><span><strong>Voice controls</strong><small>Allow hands-free row and note commands.</small></span><input type="checkbox" id="settings-voice" ${preferences.voice!==false?"checked":""}><i aria-hidden="true"></i></label><div class="settings-divider"></div><label class="settings-toggle-row"><span><strong>Notification prompts</strong><small>Remember whether Yarncha may offer browser reminders later.</small></span><input type="checkbox" id="settings-notifications" ${preferences.notifications?"checked":""}><i aria-hidden="true"></i></label></section>
      <div class="settings-group-title"><p class="eyebrow">PROJECTS & BACKUP</p><h2>Projects & Backup</h2></div>
      <section class="card mobile-card settings-panel settings-panel-wide settings-backup-card"><div class="settings-section-heading"><span class="settings-section-icon">${uiIcon("storage","ui-icon")}</span><div><p class="eyebrow">LOCAL DATA</p><h2>Your saved work</h2><p>Review local storage and move projects using a Yarncha backup.</p></div></div><div class="settings-backup-layout"><div><div class="storage-status-panel"><span>Projects <strong>${projectCount}</strong></span><span>Autosave <strong>Enabled</strong></span><span>Last saved <strong>${lastSaved}</strong></span><span>Storage <strong>Local-first</strong></span></div><div class="settings-divider"></div><div class="privacy-note">Local drafts belong to this browser and device. Export a backup before moving elsewhere.</div></div><div><div class="settings-form-row settings-form-row-stack"><div><strong>Export or import projects</strong><p>Backup before clearing browser data, changing browsers, or moving devices.</p></div><div class="backup-actions"><button class="secondary-button manual-save-button" data-manual-save="Settings" type="button">Save now</button><select id="backup-project-select" aria-label="Project to export"><option value="">All projects</option>${state.projects.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("")}</select><button class="secondary-button" id="export-selected-project">Export selected</button><button class="primary-button" id="export-all-projects">Export all projects</button><button class="secondary-button" id="import-project-backup">Import backup</button><input id="settings-backup-file" type="file" accept=".json,application/json" hidden></div></div><div class="backup-mode"><label class="check-row"><input type="radio" name="import-mode" value="merge" checked><span>Merge with current projects</span></label><label class="check-row"><input type="radio" name="import-mode" value="replace"><span>Replace all local projects</span></label></div></div></div></section>
      <div id="cloud-settings-anchor" class="settings-cloud-anchor"></div>
      <section class="card mobile-card settings-panel settings-panel-wide settings-notes-panel"><div class="settings-section-heading"><span class="settings-section-icon">${uiIcon("info","ui-icon")}</span><div><p class="eyebrow">UPDATES & LIMITATIONS</p><h2>What to know</h2><p>Honest notes about the current Yarncha build.</p></div></div><div class="limitations-list">${limitations.map(([limit,fix])=>`<article><strong>${escapeHtml(limit)}</strong><p>${escapeHtml(fix)}</p></article>`).join("")}</div></section>
    </div>`;
  function chooseThemeCard(card){state.theme.name=card.dataset.themeCard;saveState();renderSettings();}
  document.querySelectorAll("[data-theme-card]").forEach(card=>{
    card.onclick=()=>chooseThemeCard(card);
    card.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();chooseThemeCard(card);}};
  });
  document.querySelectorAll("[data-style-name]").forEach(b=>b.onclick=()=>{state.theme.style=b.dataset.styleName;saveState();renderSettings();});
  document.querySelectorAll("[data-theme-mode]").forEach(b=>b.onclick=()=>{state.theme.mode=b.dataset.themeMode;saveState();renderSettings();});
  document.getElementById("reset-appearance").onclick=()=>{state.theme=structuredClone(starterData.theme);saveState();renderSettings();};
  document.querySelectorAll("[data-unit-system]").forEach(b=>b.onclick=()=>{state.unitSystem=b.dataset.unitSystem;saveState();renderSettings();});
  document.getElementById("settings-language").onchange=event=>{state.language=event.target.value;const appLanguage=document.getElementById("app-language");if(appLanguage)appLanguage.value=state.language;saveState();applyLanguage();renderTimeGreeting();};
  document.getElementById("settings-voice").onchange=event=>{state.appPreferences={...(state.appPreferences||starterData.appPreferences),voice:event.target.checked};saveState();};
  document.getElementById("settings-notifications").onchange=event=>{state.appPreferences={...(state.appPreferences||starterData.appPreferences),notifications:event.target.checked};saveState();};
  document.getElementById("export-selected-project").onclick=()=>exportBackup(document.getElementById("backup-project-select").value||null);
  document.getElementById("export-all-projects").onclick=()=>exportBackup(null);
  document.getElementById("import-project-backup").onclick=()=>document.getElementById("settings-backup-file").click();
  document.getElementById("settings-backup-file").onchange=e=>importBackup(e,document.querySelector("input[name='import-mode']:checked")?.value||"merge");
  window.YarnchaCloud?.renderSettingsSection?.(host);
  updateSaveIndicators();
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
      <div class="button-row"><button class="primary-button section-add" id="scan-yarn">Scan Yarn</button><button class="secondary-button section-add" id="add-inventory">+ Add inventory</button></div><div class="inventory-grid">${state.inventory.length?state.inventory.map(i=>`<div class="inventory-item"><span class="inventory-swatch" style="background:${validHex(yarnItemColor(i))?yarnItemColor(i):"#a8afa8"}"></span><div><h3>${escapeHtml(yarnItemDisplayName(i))}</h3><p>${escapeHtml(i.category)} · ${i.quantity} ${escapeHtml(i.unit)}${i.category==="Yarn"?` · ${escapeHtml(yarnItemDetails(i))}`:i.details?` · ${escapeHtml(i.details)}`:""}</p>${i.category==="Yarn"&&i.colourSource?`<small class="stash-source-note">Colour source: ${escapeHtml(i.colourSource)}${i.colourConfidence?` · confidence ${Math.round(i.colourConfidence)}%`:""}${i.barcode?` · barcode ${escapeHtml(i.barcode)}`:""}</small>`:""}</div><div class="row-actions"><button class="mini-button" data-edit-inventory="${i.id}">Edit</button>${i.category==="Yarn"?`<button class="mini-button" data-rescan-yarn="${i.id}">Scan colour/details</button>`:""}<button class="mini-button danger-button" data-delete-inventory="${i.id}">Delete</button></div></div>`).join(""):`<div class="empty-state">Add yarn and tools you already own.</div>`}</div></div>
      <div class="market-panel card"><div class="market-panel-head"><div><p class="eyebrow">DECISION CART</p><h2>Shopping cart</h2></div></div>
      <div class="cart-budget-line"><div><button class="mini-button" id="edit-budget">Budget ${state.budgetSettings.currency} ${state.budgetSettings.amount}</button><button class="mini-button" id="refresh-rates">Refresh rates</button><small>Daily reference rates: ${escapeHtml(fxDate)}</small></div><strong id="cart-total-line">Cart ≈ AUD $${cartTotal.toFixed(2)}</strong></div>
      <button class="primary-button section-add" id="add-cart-item">+ Add shopping item</button><div class="cart-list">${state.cart.length?state.cart.map(i=>cartItemHtml(i)).join(""):`<div class="empty-state">Your cart is clear. Add an item when something catches your eye.</div>`}</div></div></div>`;
  document.getElementById("add-inventory").onclick=()=>openInventoryModal();
  document.getElementById("scan-yarn").onclick=()=>openYarnScanModal();
  document.getElementById("add-cart-item").onclick=()=>openCartItemModal();
  document.getElementById("edit-budget").onclick=openBudgetModal;
  document.getElementById("refresh-rates").onclick=()=>refreshFxRates(true);
  document.querySelectorAll("[data-edit-inventory]").forEach(b=>b.onclick=()=>openInventoryModal(b.dataset.editInventory));
  document.querySelectorAll("[data-rescan-yarn]").forEach(b=>b.onclick=()=>openYarnScanModal(state.inventory.find(i=>i.id===b.dataset.rescanYarn)||{}));
  document.querySelectorAll("[data-delete-inventory]").forEach(b=>b.onclick=async()=>{const item=state.inventory.find(i=>i.id===b.dataset.deleteInventory);await Promise.allSettled([item?.photoBlobId,item?.labelPhotoBlobId].filter(Boolean).map(deleteAsset));state.inventory=state.inventory.filter(i=>i.id!==b.dataset.deleteInventory);saveState();renderMarket();});
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
function toolsPageCategoryDescription(id){
  return {
    Core:"Stitch, gauge, blocking, and reference helpers.",
    "Project sizing":"Fit, size, and garment planning tools.",
    Crochet:"Circle, amigurumi, granny square, and C2C tools.",
    Rendering:"Colour, stripe, grid, and project preview tools.",
    Yarn:"Yarn amount, leftover, substitution, and weight tools.",
    Helpers:"Repeats, rows, cast-on, unit, and shaping helpers."
  }[id]||"Yarncha planning tools.";
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
  const activeDef=selected==="rendering-studio"?cards.find(t=>t.id==="rendering-studio"):toolkitToolDefs.find(t=>t.id===currentProjectTool);
  const visible=cards.filter(t=>!search||`${t.name} ${t.desc} ${toolCraftLabel(t)} ${toolsPageCategoryForTool(t)}`.toLowerCase().includes(search));
  const selectedCategory=toolsPageCategoryForTool(activeDef||{});
  const categoryPanels=toolsPageCategories.filter(c=>c.id!=="All").map(category=>{
    const tools=visible.filter(t=>toolsPageCategoryForTool(t)===category.id);
    if(!tools.length)return "";
    const content=`<div class="toolbox-grid">${tools.map(t=>toolCardHtml(t,selected)).join("")}</div>`;
    return collapsibleSectionHtml({eyebrow:"TOOLS",title:category.label,description:toolsPageCategoryDescription(category.id),rightMeta:`${tools.length} tool${tools.length===1?"":"s"}`,defaultOpen:search?true:selectedCategory===category.id,className:"toolbox-category-panel",children:content});
  }).join("");
  panel.innerHTML=`<div class="tools-page-shell">
    <div class="page-title tools-page-title"><p class="eyebrow">YARNCHA TOOLKIT</p><h1>Maker’s Toolkit</h1><p>Calculators, planners, and yarn math for knitting and crochet.</p></div>
    <section class="toolbox-browser card">
      <div class="toolbox-controls">
        <input id="tool-search" class="toolbox-search" value="${escapeHtml(currentToolSearch)}" placeholder="Search tools, e.g. gauge, sock, yarn, C2C">
      </div>
      <div class="toolbox-accordion-grid">${categoryPanels||`<div class="empty-state"><h3>No tools found</h3><p>Try a different search word.</p></div>`}</div>
    </section>
    <section class="toolbox-detail card">
      <div class="toolbox-detail-head"><div><p class="eyebrow">${escapeHtml(selected==="rendering-studio"?"PROJECT RENDERING":toolsPageCategoryForTool(activeDef||{}))}</p><h2>${escapeHtml(selected==="rendering-studio"?"Project Rendering Studio":activeDef?.name||"Choose a tool")}</h2><p class="muted-copy">${escapeHtml(selected==="rendering-studio"?"Grid, stripes and colour pooling share one focused studio.":activeDef?.desc||"Choose a tool to start calculating.")}</p></div><span class="craft-pill">${escapeHtml(selected==="rendering-studio"?"Shared":toolCraftLabel(activeDef||{}))}</span></div>
      <input id="link-project-tools" type="checkbox" hidden>
      <div id="project-tool-content" class="tools-detail-content">${activeDef?projectToolContent(getProject(),currentProjectTool):`<div class="empty-state"><h3>Choose a tool to start calculating.</h3></div>`}</div>
    </section>
  </div>`;
  document.querySelectorAll("[data-tool-tab]").forEach(b=>b.classList.remove("active"));
  document.getElementById("tool-search")?.addEventListener("input",e=>{currentToolSearch=e.target.value;renderTool(selected);});
  document.querySelectorAll("[data-open-tool]").forEach(b=>b.onclick=()=>{const picked=b.dataset.openTool;if(picked==="rendering-studio")currentGlobalRenderingTool=currentGlobalRenderingTool||"grid";renderTool(picked);});
  document.querySelectorAll("[data-global-rendering-tab]").forEach(b=>b.onclick=()=>{currentGlobalRenderingTool=b.dataset.globalRenderingTab;renderTool("rendering-studio");});
  document.getElementById("project-calculate")?.addEventListener("click",calculateProjectTool);
  document.getElementById("reset-tool-form")?.addEventListener("click",resetCurrentToolForm);
  document.querySelectorAll("[data-calc-key]").forEach(b=>b.onclick=()=>pressBasicCalculator(b.dataset.calcKey));
  bindRenderingStudio();
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
    const p = { id:`p${Date.now()}`,name,type:document.getElementById("new-type").value,status:"Planning",startDate:new Date().toISOString().slice(0,10),finishDate:"",patternUrl:"",size:"",color:colors[state.projects.length%colors.length],row:0,totalRows:null,chartRows:null,started:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),notes:"",subCounters:[],rowReminders:[],rowReminderVoice:{speed:1,language:"en",volume:1},markers:[],chart:null,assistantMessages:[],projectTools:{},buyList:[],pdfReference:"",attachments:[],patternPlan:{mode:"modified"},chatPreference:"ask",readerStatus:"No files analysed yet.",flowMode:true,chartMode:"og",yarnchaAssistant:{},annotations:[],annotationHistory:[],annotationRedo:[],annotationColor:"#d96572",annotationWidth:4,rowMask:null,coverAsset:null,chartAnalysis:null,patternSource:normalizePatternSource(),createdAt:new Date().toISOString(),updatedAt:new Date().toISOString() };
    state.projects.push(p); saveState(); closeModal(); openProject(p.id); if(files.length)handleChartFiles(files);
  };
}
function openSubCounterModal(editId=null) {
  const existing=editId?getProject().subCounters.find(s=>s.id===editId):null,counter=normalizeSubCounter(existing||{name:"",mode:"subCounter",linked:true,start:0,count:0,every:1,step:1,resetValue:0,color:"#718c72",anchorRow:Number(getProject().row)||0,sectionStartProjectPosition:Number(getProject().row)||0,localStartValue:0});
  const projectRow=Number(getProject().row)||0,sectionStartValue=counter.sectionStartProjectPosition??counter.anchorRow??projectRow;
  const typeOptions=[
    ["every-x-rows","Every X Rows"],["every-xth-row","Every Xth Row"],["every-x-rounds","Every X Rounds"],["every-xth-round","Every Xth Round"],
    ["every-row","Every Row"],["every-round","Every Round"],["every-rs-row","Every RS Row"],["every-ws-row","Every WS Row"],
    ["every-other-row","Every Other Row"],["every-alternate-row","Every Alternate Row"],["custom","Custom, future only"]
  ];
  openModal(`<section class="repeat-engine-modal">
    <p class="eyebrow">REPEAT ENGINE</p><h2>${existing?"Edit repeat rule":"Add repeat rule"}</h2><p class="muted-copy">Use Repeat Counter for project-wide row repeats, or Sub-Counter when a sleeve, border, neckline, or chart section starts counting from its own zero.</p>
    <div class="repeat-mode-toggle" role="group" aria-label="Repeat mode">
      <label><input type="radio" name="repeat-mode" value="repeatCounter" ${counter.mode==="repeatCounter"?"checked":""}><span>Repeat Counter</span></label>
      <label><input type="radio" name="repeat-mode" value="subCounter" ${counter.mode!=="repeatCounter"?"checked":""}><span>Sub-Counter / New Section</span></label>
    </div>
    <div class="repeat-engine-grid">
      <div class="repeat-settings-card">
        <h3>Basic settings</h3>
        <div class="form-grid">
          <div class="field full"><label>Counter name</label><input id="sub-name" value="${escapeHtml(existing?counter.name:"")}" placeholder="e.g. Sleeve Increase"></div>
          <div class="field"><label>Repeat type</label><select id="sub-repeat-type">${typeOptions.map(([value,label])=>`<option value="${value}" ${counter.repeatType===value?"selected":""}>${label}</option>`).join("")}</select></div>
          <div class="field"><label>Repeat every / Repeat value</label><input id="sub-every" type="number" min="1" value="${counter.repeatValue||counter.every}"></div>
          <div class="field"><label>Unit</label><select id="sub-unit"><option value="row" ${counter.unit!=="round"?"selected":""}>Rows</option><option value="round" ${counter.unit==="round"?"selected":""}>Rounds</option></select></div>
          <div class="field"><label>Start row / round</label><input id="sub-start-at" type="number" min="0" value="${counter.startAt??counter.start}"></div>
          <div class="field"><label>Current count</label><input id="sub-count" type="number" min="0" value="${counter.count}"></div>
          <div class="field"><label>Starting value</label><input id="sub-start" type="number" min="0" value="${counter.start}"></div>
          <div class="field"><label>Increment step</label><input id="sub-step" type="number" min="1" value="${counter.step}"></div>
          <div class="field"><label>Link to Main Row Counter</label><select id="sub-linked"><option value="yes" ${counter.linked!==false?"selected":""}>On</option><option value="no" ${counter.linked===false?"selected":""}>Off</option></select></div>
          <div class="field repeat-colour-field-wrap"><label>Colour tag</label><label class="repeat-colour-field" style="--repeat-colour:${escapeHtml(counter.color)}"><span class="repeat-colour-swatch" aria-hidden="true"></span><span class="repeat-colour-label" id="repeat-colour-label">${escapeHtml(counter.color).toUpperCase()}</span><input id="sub-color" type="color" value="${escapeHtml(counter.color)}" aria-label="Choose repeat colour tag"></label></div>
        </div>
      </div>
      <div class="repeat-settings-card sub-counter-settings-card" id="sub-section-card">
        <h3>Sub-Counter section</h3>
        <div class="form-grid">
          <div class="field full"><label>Section name</label><input id="sub-section-name" value="${escapeHtml(counter.sectionName||counter.name||"")}" placeholder="Sleeve, Neckline, Border, Pattern Repeat"></div>
          <div class="field"><label>Section starts at project row / round</label><input id="sub-section-start" type="number" min="0" value="${sectionStartValue}"></div>
          <div class="field"><label>Local counter starts from</label><select id="sub-local-start"><option value="0" ${Number(counter.localStartValue)!==1?"selected":""}>0</option><option value="1" ${Number(counter.localStartValue)===1?"selected":""}>1</option></select></div>
          <div class="field"><label>Anchor Row</label><input id="sub-anchor" type="number" min="0" value="${counter.anchorRow}" placeholder="Start counting from row"></div>
        </div>
        <p class="privacy-note">Your project row is ${projectRow}, but this section can start from ${Number(counter.localStartValue)||0}.</p>
      </div>
      <div class="repeat-settings-card repeat-preview-card">
        <h3>Live preview</h3>
        <div id="repeat-rule-preview" aria-live="polite"></div>
      </div>
      <details class="repeat-settings-card repeat-advanced-settings">
        <summary>Advanced Repeat Settings</summary>
        <div class="form-grid">
          <div class="field"><label>End row / round</label><input id="sub-end-at" type="number" min="0" value="${counter.endAt??""}" placeholder="No end"></div>
          <div class="field"><label>Repeat count</label><input id="sub-repeat-count" type="number" min="1" value="${counter.repeatCount??""}" placeholder="Unlimited"></div>
          <div class="field"><label>Offset</label><input id="sub-offset" type="number" value="${counter.offset||0}"></div>
          <div class="field"><label>RS / WS only</label><select id="sub-row-side"><option value="all" ${counter.rowSide==="all"?"selected":""}>All rows</option><option value="RS" ${counter.rowSide==="RS"?"selected":""}>RS only</option><option value="WS" ${counter.rowSide==="WS"?"selected":""}>WS only</option></select></div>
          <label class="check-row"><input id="sub-skip-first" type="checkbox" ${counter.skipFirstRepeat?"checked":""}><span>Skip first repeat</span></label>
          <label class="check-row"><input id="sub-unlimited" type="checkbox" ${counter.unlimitedRepeats!==false?"checked":""}><span>Unlimited repeats</span></label>
          <div class="field"><label>Maximum value optional</label><input id="sub-max" type="number" min="0" value="${counter.max??""}" placeholder="No maximum"></div>
          <div class="field"><label>Reset value</label><input id="sub-reset" type="number" min="0" value="${counter.resetValue}"></div>
          <div class="field"><label>Speak reminder every X rows</label><input id="sub-voice-every" type="number" min="0" value="${counter.voiceEvery}" placeholder="0 = off"></div>
          <div class="field full"><label>Voice reminder message</label><input id="sub-voice-message" value="${escapeHtml(counter.voiceMessage)}" placeholder="e.g. Cable twist now."></div>
          <div class="field full"><label>Notes</label><textarea id="sub-notes" rows="3" placeholder="Repeat notes, shaping instruction, chart hint...">${escapeHtml(counter.notes)}</textarea></div>
        </div>
      </details>
    </div>
    <p class="form-error" id="repeat-rule-error" role="alert"></p>
    <p class="privacy-note">Manual + / - sets a new sync point at the current main row, so this counter stays aligned after Jump to Row or reversing rows. This repeat should not change your stitch count by itself.</p>
    <div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button>${existing?`<button class="secondary-button" id="disable-repeat-rule">${counter.enabled===false?"Enable":"Disable"}</button><button class="secondary-button" id="reset-section-counter">Reset section counter</button>`:""}<button class="primary-button" id="create-sub">${existing?"Save Repeat Rule":"Save Repeat Rule"}</button></div>
  </section>`);
  const currentMode=()=>document.querySelector('[name="repeat-mode"]:checked')?.value||"subCounter";
  const readRuleDraft=()=>repeatEngine().createRepeatRule({
    id:counter.repeatRuleId||counter.repeatRule?.id,
    mode:currentMode(),
    sectionName:valueOf("sub-section-name")||valueOf("sub-name"),
    repeatType:valueOf("sub-repeat-type"),
    repeatValue:valueOf("sub-every"),
    unit:valueOf("sub-unit"),
    startAt:valueOf("sub-start-at"),
    endAt:valueOf("sub-end-at"),
    repeatCount:valueOf("sub-repeat-count"),
    offset:valueOf("sub-offset"),
    skipFirstRepeat:document.getElementById("sub-skip-first").checked,
    rowSide:valueOf("sub-row-side"),
    unlimitedRepeats:document.getElementById("sub-unlimited").checked,
    sectionStartProjectPosition:valueOf("sub-section-start"),
    localStartValue:valueOf("sub-local-start"),
    enabled:counter.enabled!==false,
    notes:valueOf("sub-notes")
  });
  const updateRepeatPreview=()=>{
    const mode=currentMode(),section=document.getElementById("sub-section-card");
    if(section)section.hidden=mode!=="subCounter";
    const validation=repeatEngine().validateRepeatRule(readRuleDraft()),preview=document.getElementById("repeat-rule-preview"),error=document.getElementById("repeat-rule-error");
    error.textContent=validation.valid?"":validation.errors[0];
    const rule=validation.rule,triggers=repeatEngine().getTriggerPositions(rule,{from:Number(getProject().row)||0,limit:5}),next=repeatEngine().getNextTrigger(rule,Number(getProject().row)||0);
    const projectTriggers=rule.mode==="subCounter"?triggers.map(local=>repeatEngine().projectPositionForLocal(rule,local)):triggers;
    const repeatColour=valueOf("sub-color")||counter.color||"#718c72",colourField=document.querySelector(".repeat-colour-field"),colourLabel=document.getElementById("repeat-colour-label");
    if(colourField)colourField.style.setProperty("--repeat-colour",repeatColour);
    if(colourLabel)colourLabel.textContent=repeatColour.toUpperCase();
    const summary=repeatEngine().formatRepeatRule(rule);
    const chips=triggers.map((trigger,index)=>`<span class="repeat-preview-chip ${next===trigger?"is-next":""}">${rule.mode==="subCounter"?`Local ${trigger} · Project ${projectTriggers[index]}`:`${rule.unit==="round"?"Round":"Row"} ${trigger}`}</span>`).join("")||'<span class="repeat-preview-chip is-empty">No upcoming triggers</span>';
    preview.style.setProperty("--repeat-colour",repeatColour);
    preview.innerHTML=`<p class="repeat-preview-summary">${escapeHtml(summary)}</p><div class="repeat-preview-pills">${chips}</div>${next!==null?`<p class="repeat-preview-next">${rule.mode==="subCounter"?`Next trigger on ${escapeHtml(rule.sectionName)} Row ${next} / Project Row ${repeatEngine().projectPositionForLocal(rule,next)}.`:`Next trigger on ${rule.unit==="round"?"Round":"Row"} ${next}.`}</p>`:""}`;
  };
  document.querySelectorAll(".repeat-engine-modal input,.repeat-engine-modal select,.repeat-engine-modal textarea").forEach(el=>el.addEventListener("input",updateRepeatPreview));
  document.querySelectorAll('[name="repeat-mode"]').forEach(el=>el.addEventListener("change",updateRepeatPreview));
  updateRepeatPreview();
  document.getElementById("create-sub").onclick = () => {
    const name = document.getElementById("sub-name").value.trim(); if (!name) return toast("Name your repeat rule.");
    const ruleValidation=repeatEngine().validateRepeatRule(readRuleDraft());
    if(!ruleValidation.valid){document.getElementById("repeat-rule-error").textContent=ruleValidation.errors[0];return toast(ruleValidation.errors[0]);}
    const start=Math.max(0,+document.getElementById("sub-start").value||0);
    const count=Math.max(0,+document.getElementById("sub-count").value||0);
    const values=normalizeSubCounter({id:existing?.id,name,mode:currentMode(),sectionName:valueOf("sub-section-name")||name,count,linked:document.getElementById("sub-linked").value==="yes",every:valueOf("sub-every"),repeatValue:valueOf("sub-every"),repeatType:valueOf("sub-repeat-type"),unit:valueOf("sub-unit"),startAt:valueOf("sub-start-at"),endAt:valueOf("sub-end-at"),repeatCount:valueOf("sub-repeat-count"),offset:valueOf("sub-offset"),skipFirstRepeat:document.getElementById("sub-skip-first").checked,rowSide:valueOf("sub-row-side"),unlimitedRepeats:document.getElementById("sub-unlimited").checked,localStartValue:valueOf("sub-local-start"),sectionStartProjectPosition:valueOf("sub-section-start"),repeatRule:ruleValidation.rule,repeatRuleId:ruleValidation.rule.id,start,step:valueOf("sub-step"),max:valueOf("sub-max"),resetValue:valueOf("sub-reset"),color:valueOf("sub-color"),anchorRow:valueOf("sub-anchor"),voiceEvery:valueOf("sub-voice-every"),voiceMessage:valueOf("sub-voice-message"),notes:valueOf("sub-notes"),lastVoiceRow:existing?.lastVoiceRow,enabled:existing?.enabled!==false});
    values.syncRow=Number(getProject().row)||0;
    values.syncCount=values.count;
    if(existing)Object.assign(existing,values);
    else getProject().subCounters.push(values);
    getProject().repeatRules=repeatEngine().migrateRepeatRules([getProject()])[0].repeatRules;
    saveProjectTouch(getProject()); closeModal(); renderProjectDetail(); toast(existing?"Counter updated":"Counter added");
  };
  document.getElementById("disable-repeat-rule")?.addEventListener("click",()=>{
    if(!existing)return;
    existing.enabled=existing.enabled===false;
    existing.repeatRule=repeatEngine().createRepeatRule({...existing.repeatRule,enabled:existing.enabled});
    getProject().repeatRules=repeatEngine().migrateRepeatRules([getProject()])[0].repeatRules;
    saveProjectTouch(getProject()); closeModal(); renderProjectDetail(); toast(existing.enabled?"Repeat rule enabled":"Repeat rule disabled");
  });
  document.getElementById("reset-section-counter")?.addEventListener("click",()=>{
    if(!existing)return;
    const values=normalizeSubCounter(existing);existing.count=values.resetValue??values.localStartValue??values.start??0;existing.syncRow=Number(getProject().row)||0;existing.syncCount=existing.count;saveProjectTouch(getProject());closeModal();renderProjectDetail();toast("Section counter reset");
  });
}
function openSubCounterActionsModal(id){
  const p=getProject(),counter=p.subCounters.find(s=>s.id===id);
  if(!counter)return;
  const normalized=normalizeSubCounter(counter);
  openModal(`<p class="eyebrow">COUNTER DETAILS</p><h2>${escapeHtml(normalized.name)}</h2><p class="muted-copy">${escapeHtml(repeatCounterSummary(normalized,p.row))}</p>
    <div class="counter-more-details">
      <div><strong>Section</strong><span>${escapeHtml(normalized.sectionName||normalized.name)}</span></div>
      <div><strong>Linked main row</strong><span>${normalized.linked!==false?"On":"Off"}</span></div>
      <div><strong>Local counter start</strong><span>${normalized.localStartValue??normalized.start}</span></div>
      <div><strong>Repeat settings</strong><span>${escapeHtml(subCounterMetaText(normalized,p.row))}</span></div>
    </div>
    ${repeatPreviewHtml(normalized,p.row)}
    <div class="form-grid"><button class="secondary-button" id="counter-rename-action">Rename</button><button class="secondary-button" id="counter-duplicate-action">Duplicate</button><button class="secondary-button" id="counter-edit-action">Edit Settings</button><button class="secondary-button" id="counter-reset-action">Reset</button></div><div class="danger-zone"><strong>Danger zone</strong><p>Deleting this counter cannot be undone.</p><button class="danger-button secondary-button" id="counter-delete-action">Delete</button></div><div class="modal-actions"><button class="primary-button" onclick="closeModal()">Done</button></div>`);
  document.getElementById("counter-rename-action").onclick=()=>{closeModal();openSubCounterRenameModal(id);};
  document.getElementById("counter-duplicate-action").onclick=()=>{const copy=normalizeSubCounter({...counter,id:`s${Date.now()}`,repeatRuleId:`repeat-s${Date.now()}`,name:`${normalized.name} copy`,syncRow:Number(p.row)||0,syncCount:normalized.count});p.subCounters.push(copy);p.repeatRules=repeatEngine()?.migrateRepeatRules([p])?.[0]?.repeatRules||p.repeatRules||[];saveProjectTouch(p);closeModal();renderProjectDetail();toast("Counter duplicated");};
  document.getElementById("counter-edit-action").onclick=()=>{closeModal();openSubCounterModal(id);};
  document.getElementById("counter-reset-action").onclick=()=>{const values=normalizeSubCounter(counter);values.count=values.resetValue??values.start??0;values.syncRow=Number(p.row)||0;values.syncCount=values.count;values.lastVoiceRow=null;Object.assign(counter,values);p.repeatRules=repeatEngine()?.migrateRepeatRules([p])?.[0]?.repeatRules||p.repeatRules||[];saveProjectTouch(p);closeModal();renderProjectDetail();toast("Counter reset");};
  document.getElementById("counter-delete-action").onclick=()=>{if(!confirm(`Delete "${counter.name}"? This cannot be undone.`))return;p.subCounters=p.subCounters.filter(s=>s.id!==id);p.repeatRules=(p.repeatRules||[]).filter(rule=>rule.id!==(counter.repeatRuleId||counter.repeatRule?.id||`repeat-${id}`));saveProjectTouch(p);closeModal();renderProjectDetail();};
}
function openSubCounterRenameModal(id){
  const p=getProject(),counter=p.subCounters.find(s=>s.id===id);
  if(!counter)return;
  openModal(`<p class="eyebrow">RENAME COUNTER</p><h2>${escapeHtml(counter.name)}</h2><div class="field"><label>Counter name</label><input id="counter-rename-input" value="${escapeHtml(counter.name)}"></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-counter-rename">Save</button></div>`);
  document.getElementById("save-counter-rename").onclick=()=>{const name=valueOf("counter-rename-input").trim();if(!name)return toast("Name this counter.");counter.name=name;counter.sectionName=counter.sectionName||name;p.repeatRules=repeatEngine()?.migrateRepeatRules([p])?.[0]?.repeatRules||p.repeatRules||[];saveProjectTouch(p);closeModal();renderProjectDetail();};
}
function openRowReminderModal(editId=null){
  const p=getProject(),existing=editId?(p.rowReminders||[]).find(r=>r.id===editId):null,r=existing?normalizeRowReminder(existing):normalizeRowReminder({name:"",every:4,startRow:Math.max(1,Number(p.row)||1),message:"Remember your special action."});
  openModal(`<p class="eyebrow">ROW REMINDER</p><h2>${existing?"Edit":"Add"} reminder</h2><p class="muted-copy">Yarncha checks reminders whenever the current row changes.</p><div class="form-grid">
    <div class="field full"><label>Reminder name</label><input id="reminder-name" value="${escapeHtml(existing?r.name:"")}" placeholder="e.g. Sleeve increases"></div>
    <div class="field"><label>Trigger every X rows/rounds</label><input id="reminder-every" type="number" min="1" value="${r.every}"></div>
    <div class="field"><label>Start row/round</label><input id="reminder-start" type="number" min="0" value="${r.startRow}"></div>
    <div class="field"><label>End row/round optional</label><input id="reminder-end" type="number" min="0" value="${r.endRow??""}" placeholder="No end"></div>
    <div class="field full"><label>Custom reminder message</label><textarea id="reminder-message" rows="3" placeholder="e.g. Upcoming row: increase at both ends.">${escapeHtml(r.message)}</textarea></div>
    <label class="check-row"><input id="reminder-voice" type="checkbox" ${r.voice?"checked":""}><span>Voice reminder on</span></label>
    <label class="check-row"><input id="reminder-visual" type="checkbox" ${r.visual?"checked":""}><span>Visual notification on</span></label>
    <label class="check-row"><input id="reminder-repeat" type="checkbox" ${r.repeat?"checked":""}><span>Repeat enabled</span></label>
  </div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-row-reminder">${existing?"Save reminder":"Add reminder"}</button></div>`);
  document.getElementById("save-row-reminder").onclick=()=>{
    const name=valueOf("reminder-name").trim(),message=valueOf("reminder-message").trim();
    if(!name)return toast("Name this reminder.");
    if(!message)return toast("Write the reminder message.");
    const values=normalizeRowReminder({id:existing?.id,name,every:valueOf("reminder-every"),startRow:valueOf("reminder-start"),endRow:valueOf("reminder-end"),message,voice:document.getElementById("reminder-voice").checked,visual:document.getElementById("reminder-visual").checked,repeat:document.getElementById("reminder-repeat").checked,paused:existing?.paused});
    p.rowReminders=p.rowReminders||[];
    if(existing)Object.assign(existing,values,{doneRows:existing.doneRows||[],lastTriggeredRow:existing.lastTriggeredRow||null,snoozedUntilRow:existing.snoozedUntilRow||null});
    else p.rowReminders.push(values);
    saveProjectTouch(p);closeModal();renderProjectDetail();toast("Row reminder saved.");
  };
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
function openMarkerModal(markerId=null){
  const p=getProject(),marker=p.markers.find(m=>(m.id||`${m.row}-${m.color}`)===markerId);
  const presets=markerColorPresets(),presetValues=new Set(presets.map(item=>item.value)),currentColor=normalizeMarkerHex(markerColor(marker?.color||"#577FA8"))||"#577FA8",selectedPreset=presets.find(item=>item.value===currentColor),history=loadMarkerColorHistory();
  const recentSeed=selectedPreset?history.recent:[currentColor,...history.recent];
  const recent=[...new Set(recentSeed.filter(color=>!presetValues.has(color)))].slice(0,8);
  const frequent=Object.entries(history.frequency).sort((a,b)=>b[1]-a[1]).map(([color])=>color).filter(color=>!presetValues.has(color)&&!recent.includes(color)).slice(0,8);
  openModal(`<p class="eyebrow">STITCH MARKER</p><h2>${marker?"Edit":"Add"} marker</h2><div class="form-grid marker-modal-grid"><div class="field"><label>Row number</label><input id="marker-row" type="number" min="0" value="${marker?.row??p.row}"></div><div class="field full marker-color-section"><label>Marker colour</label><span class="marker-color-label">Preset colours</span><div class="marker-color-picker"><div class="marker-swatch-grid marker-color-grid">${presets.map(item=>`<label class="marker-swatch-option marker-color-option ${selectedPreset?.value===item.value?"is-selected":""}" style="--marker-color:${item.value}"><input type="radio" name="marker-color" value="${item.value}" ${selectedPreset?.value===item.value?"checked":""}><span class="marker-swatch marker-color-swatch"></span><span class="marker-swatch-name">${escapeHtml(item.name)}</span></label>`).join("")}<label class="marker-swatch-option marker-color-option marker-color-other ${!selectedPreset?"is-selected":""}" style="--marker-color:${currentColor}"><input type="radio" name="marker-color" value="other" ${!selectedPreset?"checked":""}><span class="marker-swatch marker-color-swatch"></span><span class="marker-swatch-name">Other</span></label></div><div class="marker-custom-row marker-custom-color" ${selectedPreset?"hidden":""}><span class="marker-custom-preview marker-color-preview" style="--marker-color:${currentColor}"></span><div><label>Other / Custom HEX</label><input class="marker-hex-input" id="marker-custom-hex" value="${escapeHtml(currentColor)}" placeholder="#5B8DEF" inputmode="text" autocomplete="off"></div><p class="marker-color-error" id="marker-color-error" role="alert" hidden>Enter a valid HEX colour, for example #5B8DEF.</p></div>${markerHistoryRowHtml("Recent colours",recent)}${markerHistoryRowHtml("Frequently used",frequent)}</div></div><div class="field full"><label>Marker name (optional)</label><input id="marker-label" value="${escapeHtml(marker?.label||"")}" placeholder="e.g. sleeve join"></div></div><div class="modal-actions"><button class="secondary-button button-ghost" onclick="closeModal()">Cancel</button><button class="primary-button button-primary" id="save-marker">Save marker</button></div>`);
  const syncMarkerColorPicker=()=>{
    const picked=document.querySelector('input[name="marker-color"]:checked')?.value||currentColor,custom=document.getElementById("marker-custom-hex"),customWrap=document.querySelector(".marker-custom-color"),error=document.getElementById("marker-color-error");
    document.querySelectorAll(".marker-color-option").forEach(option=>option.classList.toggle("is-selected",option.querySelector("input")?.checked));
    const isOther=picked==="other";
    if(customWrap)customWrap.hidden=!isOther;
    if(isOther){
      const normalized=normalizeMarkerHex(custom?.value);
      document.querySelector(".marker-color-other")?.style.setProperty("--marker-color",normalized||"#8A6F5A");
      document.querySelector(".marker-color-preview")?.style.setProperty("--marker-color",normalized||"#8A6F5A");
      if(error)error.hidden=true;
    }
  };
  document.querySelectorAll('input[name="marker-color"]').forEach(input=>input.addEventListener("change",syncMarkerColorPicker));
  document.querySelectorAll("[data-marker-history-color]").forEach(button=>button.addEventListener("click",()=>{
    const hex=normalizeMarkerHex(button.dataset.markerHistoryColor);
    const other=document.querySelector('input[name="marker-color"][value="other"]'),custom=document.getElementById("marker-custom-hex");
    if(other)other.checked=true;
    if(custom)custom.value=hex;
    syncMarkerColorPicker();
  }));
  document.getElementById("marker-custom-hex")?.addEventListener("input",event=>{
    const normalized=normalizeMarkerHex(event.target.value),error=document.getElementById("marker-color-error");
    if(normalized)event.target.value=normalized;
    document.querySelector(".marker-color-other")?.style.setProperty("--marker-color",normalized||"#8A6F5A");
    document.querySelector(".marker-color-preview")?.style.setProperty("--marker-color",normalized||"#8A6F5A");
    if(error)error.hidden=true;
  });
  syncMarkerColorPicker();
  document.getElementById("save-marker").onclick=()=>{
    const picked=document.querySelector('input[name="marker-color"]:checked')?.value||currentColor,error=document.getElementById("marker-color-error");
    const color=picked==="other"?normalizeMarkerHex(document.getElementById("marker-custom-hex")?.value):normalizeMarkerHex(picked);
    if(!color){if(error)error.hidden=false;document.getElementById("marker-custom-hex")?.focus();return;}
    const label=document.getElementById("marker-label").value.trim();
    const values={row:Math.max(0,+document.getElementById("marker-row").value||0),color,label:label||markerColorLabel(color)};
    if(marker)Object.assign(marker,values);else p.markers.push({id:`marker${Date.now()}`,...values});
    p.markers=p.markers.slice().sort((a,b)=>(Number(a.row)||0)-(Number(b.row)||0));
    saveMarkerColorHistory(color);
    saveState();closeModal();renderProjectDetail();
  };
}
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
function purchaseCartItem(itemId){const item=state.cart.find(i=>i.id===itemId);if(!item)return;const cost=toAud(item.quantity*item.price,item.currency||"AUD");if(state.budgetSettings.spent+cost>budgetAmountAud())return toast("Purchase blocked: this exceeds the active budget.");const owned=state.inventory.find(i=>i.name.toLowerCase()===item.name.toLowerCase());if(owned)owned.quantity+=item.quantity;else state.inventory.push({id:`inv${Date.now()}`,name:item.name,category:item.category,quantity:item.quantity,unit:item.category==="Yarn"?"balls":"items",color:"#718c72",details:"Added from shopping cart"});state.budgetSettings.spent+=cost;state.purchaseHistory.push({...item,boughtAt:new Date().toISOString(),audCost:cost});if(item.category==="DIY kit"&&item.createProject){const p={id:`p${Date.now()}`,name:item.name,type:"Other",color:colors[state.projects.length%colors.length],row:0,totalRows:null,chartRows:null,started:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),notes:"Created from a purchased DIY kit.",subCounters:[],rowReminders:[],rowReminderVoice:{speed:1,language:"en",volume:1},markers:[],chart:null,assistantMessages:[],projectTools:{},buyList:[],pdfReference:"",attachments:[],patternPlan:{mode:"modified"},chatPreference:"ask",readerStatus:"No files analysed yet.",flowMode:true,chartMode:"og",yarnchaAssistant:{},annotations:[],annotationHistory:[],annotationRedo:[],annotationColor:"#d96572",annotationWidth:4,rowMask:null,coverAsset:null,chartAnalysis:null,linkedKit:item.name};state.projects.push(p);item.projectId=p.id;}state.cart=state.cart.filter(i=>i.id!==itemId);saveState();renderMarket();toast("Purchase moved into inventory");}
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
  const map = { red:"#C75A55",blue:"#577FA8",green:"#62856A",yellow:"#D3A93F",purple:"#84658E",pink:"#C77B91",orange:"#D27B45",brown:"#8A6F5A",neutral:"#8A6F5A" };
  return map[String(name||"").toLowerCase()] || "#7A837D";
}
function speak(text,settings={}) {
  if (!("speechSynthesis" in window)) return toast("Speech is not supported in this browser.");
  const utterance=new SpeechSynthesisUtterance(text);
  if(settings.rate)utterance.rate=Number(settings.rate)||1;
  if(settings.lang)utterance.lang=settings.lang;
  if(settings.volume!==undefined)utterance.volume=Math.max(0,Math.min(1,Number(settings.volume)));
  speechSynthesis.cancel(); speechSynthesis.speak(utterance);
}
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
  if(state.onboardingComplete){
    document.getElementById("onboarding-overlay")?.remove();
    return;
  }
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
const appLanguageSelect=document.getElementById("app-language");
if(appLanguageSelect)appLanguageSelect.onchange=e=>{state.language=e.target.value;saveState();applyLanguage();renderTimeGreeting();};
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
if(window.__yarnchaManualSaveShortcut)document.removeEventListener("keydown",window.__yarnchaManualSaveShortcut);
window.__yarnchaManualSaveShortcut=event=>{
  if((event.metaKey||event.ctrlKey)&&String(event.key).toLowerCase()==="s"){
    event.preventDefault();
    manualSave("Workspace");
  }
};
document.addEventListener("keydown",window.__yarnchaManualSaveShortcut);
if(window.__yarnchaBeforeUnloadSaveGuard)window.removeEventListener("beforeunload",window.__yarnchaBeforeUnloadSaveGuard);
window.__yarnchaBeforeUnloadSaveGuard=event=>{
  if(saveDirty||saveInFlight||lastSaveFailed){
    event.preventDefault();
    event.returnValue="Yarncha is still saving your latest changes.";
    return event.returnValue;
  }
};
window.addEventListener("beforeunload",window.__yarnchaBeforeUnloadSaveGuard);
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
    if(!next?.projects?.length&&state.projects?.length)return updateSaveStatus("Sync conflict — kept newer device progress");
    next.schemaVersion=PROJECT_SCHEMA_VERSION;
    localStorage.setItem(STORAGE_KEY,JSON.stringify(next));
    state=loadState();
    currentProjectId=state.activeProjectId||state.projects[0]?.id||null;
    updateSaveStatus(`✓ Saved on this device · ${formatSavedTime(state.lastSavedAt||new Date())}`);
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
  exportBackup,
  importBackup,
  mergeLibrarySections,
  openModal,
  closeModal,
  toast,
  escapeHtml,
  uiIcon
};

renderSidebar();
bindPrimaryShellNavigation();
renderToday();
setActiveView("today");
renderLibrary();
applyTheme();
applyLanguage();
refreshFxRates();
maybeShowOnboarding();
async function configureServiceWorker(){
  if(!("serviceWorker" in navigator))return;
  const isLocalPreview=["localhost","127.0.0.1","::1"].includes(location.hostname);
  if(isLocalPreview){
    const registrations=await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(registration=>registration.unregister()));
    if("caches" in window){
      const cacheNames=await caches.keys();
      await Promise.all(cacheNames.map(cacheName=>caches.delete(cacheName)));
    }
    return;
  }
  await navigator.serviceWorker.register("./service-worker.js");
}
configureServiceWorker().catch(error=>console.warn("[Yarncha service worker] Configuration failed",error));
