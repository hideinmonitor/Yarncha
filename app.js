const STORAGE_KEY = "threadline-data-v1";
const colors = ["#6f8872", "#b56d52", "#8a7895", "#c19b5b", "#637f91"];
const APP_NAME = "Yarncha";
const BACKUP_VERSION = 2;
const projectTypeOptions = ["Knitting","Crochet","Tunisian Crochet","Weaving","Other"];
const projectStatusOptions = ["Planning","In progress","Paused","Finished","Frogged"];
const themePresets=[
  {id:"creamy-vanilla",name:"Creamy Vanilla",primary:"#D8B899",secondary:"#F4E6D0",background:"#FFF9F0",card:"#FFF3E3",text:"#5A4632",button:"#B68A62",highlight:"#EACB9A"},
  {id:"matcha-latte",name:"Matcha Latte",primary:"#A8BFA3",secondary:"#E3EAD8",background:"#FAF8EF",card:"#FFFFFF",text:"#4E5A46",button:"#7F9A7A",highlight:"#D8C89A"},
  {id:"sakura-milk",name:"Sakura Milk",primary:"#E8A6B3",secondary:"#F8DDE4",background:"#FFF7F9",card:"#FFFFFF",text:"#5B4148",button:"#C97B8C",highlight:"#F3C1C9"},
  {id:"cocoa-beige",name:"Cocoa Beige",primary:"#A9826D",secondary:"#E8D8C8",background:"#F7F0E8",card:"#FFFDF9",text:"#4C3A32",button:"#8B6655",highlight:"#D1A883"},
  {id:"soft-lavender",name:"Soft Lavender",primary:"#B9A7D8",secondary:"#EDE6F7",background:"#FBF9FF",card:"#FFFFFF",text:"#4A3F5E",button:"#8F7BBE",highlight:"#D8C8F0"},
  {id:"peach-apricot",name:"Peach Apricot",primary:"#F0B28A",secondary:"#FFE0C7",background:"#FFF8F2",card:"#FFFFFF",text:"#5C4436",button:"#D9875A",highlight:"#F6C59B"},
  {id:"ocean-mist",name:"Ocean Mist",primary:"#9BBCC2",secondary:"#DDEEEF",background:"#F5FBFB",card:"#FFFFFF",text:"#354D52",button:"#6F9FA8",highlight:"#B7D8D9"},
  {id:"vintage-paper",name:"Original Yarncha",primary:"#B7785F",secondary:"#E7E9DC",background:"#F6F0E6",card:"#FFFAF3",text:"#463D35",button:"#5F6958",highlight:"#C4A269"}
];
const designStyles=[
  {id:"original-classic",name:"Original Classic",desc:"Balanced Yarncha look with soft cards and familiar controls."},
  {id:"japanese-zakka",name:"Japanese Zakka",desc:"Warm paper texture, gentle shadows and handmade notebook details."},
  {id:"korean-soft",name:"Korean Soft",desc:"Rounded airy cards, soft spacing and gentle interface edges."},
  {id:"minimal-clean",name:"Minimal Clean",desc:"Crisp spacing, simple cards and almost no decoration."},
  {id:"artsy-journal",name:"Artsy Journal",desc:"Scrapbook-like texture, expressive cards and a creative desk feeling."},
  {id:"dreamy-pastel",name:"Dreamy Pastel",desc:"Soft glow, floating cards and a delicate pastel mood."}
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
    { id: "tutorials", name: "Stitch Technique Refresher", icon: "⌁", description: "Your own named sections, PDFs and technique notes.", items: [] },
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
  theme:{name:"creamy-vanilla",style:"original-classic",mode:"system"},
  onboardingComplete:false,
  onboardingStep:0,
  aiAccessConfirmed:false,
  account:{email:"",provider:"local",syncEnabled:false},
  yarnMaterials:[],
  techniqueKnowledge:[],
  projectIdeas:[],
  symbolFavorites:[]
};

let state = loadState();
let currentProjectId = state.activeProjectId;
let currentLibrarySection = null;
let currentSymbolId = null;
let symbolFilters = { search:"", craft:"All", category:"All", difficulty:"All" };
let currentProjectTool = "swatch";
let currentToolCategory = "All";
let currentToolSearch = "";
let currentGlobalRenderingTool = "grid";
let activeAnnotationTool = "marker";
let drawingStroke = null;
let drawingFrame = null;
let maskDrag = null;
let arrowDrag = null;
let recognition = null;
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

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const merged = { ...starterData, ...saved };
    merged.librarySections = saved.librarySections || structuredClone(starterData.librarySections);
    if(!merged.librarySections.some(s=>s.id==="materials"))merged.librarySections.push(structuredClone(starterData.librarySections.find(s=>s.id==="materials")));
    for(const id of ["symbols","tool-manual","theory"]){
      if(!merged.librarySections.some(s=>s.id===id))merged.librarySections.push(structuredClone(starterData.librarySections.find(s=>s.id===id)));
    }
    const tutorialSection=merged.librarySections.find(s=>s.id==="tutorials");
    if(tutorialSection&&/Stitch\s+tutorial\s+aids/i.test(tutorialSection.name))tutorialSection.name="Stitch Technique Refresher";
    merged.inventory = saved.inventory || structuredClone(starterData.inventory);
    merged.cart = saved.cart || [];
    merged.marketBudget = Number(saved.marketBudget) || starterData.marketBudget;
    merged.budgetSettings = saved.budgetSettings || {...starterData.budgetSettings,amount:merged.marketBudget};
    merged.purchaseHistory = saved.purchaseHistory || [];
    merged.language = saved.language || "en";
    merged.unitSystem = saved.unitSystem || "metric";
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
      updatedAt:p.updatedAt || new Date().toISOString(),
      chartAnalysis:p.chartAnalysis ? {
        ...p.chartAnalysis,
        rows:p.chartAnalysis.rows || [],
        legend:p.chartAnalysis.legend || "",
        columns:p.chartAnalysis.columns || null,
        gridStatus:p.chartAnalysis.gridStatus || "Grid and cell boundaries require user confirmation."
      } : null
    }));
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
function escapeHtml(value = "") { return value.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c])); }
const uiIconPaths={
  voice:'<rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6"></path>',
  camera:'<rect x="3.5" y="6.5" width="17" height="13" rx="2"></rect><path d="m8 6.5 1.3-2h5.4l1.3 2"></path><circle cx="12" cy="13" r="3.25"></circle>',
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
  calculator:'<rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M8 7h8M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1M8 18h1M12 18h5"></path>',
  measure:'<path d="M4 17 17 4l3 3L7 20Z"></path><path d="m9 15-2-2M12 12l-2-2M15 9l-2-2"></path>',
  garment:'<path d="m8 5 4-2 4 2 4 4-3 2v9H7v-9L4 9Z"></path>',
  circle:'<circle cx="12" cy="12" r="8"></circle><path d="M12 4v16M4 12h16"></path>',
  render:'<rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M4 10h16M10 4v16"></path>',
  exchange:'<path d="M5 8h13M15 5l3 3-3 3M19 16H6M9 13l-3 3 3 3"></path>'
};
function uiIcon(name,className="ui-icon"){return `<svg class="${className}" aria-hidden="true" viewBox="0 0 24 24">${uiIconPaths[name]||uiIconPaths.calculator}</svg>`;}
function toast(message) {
  const el = document.getElementById("toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}
const hkTranslations={
  "Today":"今日","Projects":"專案","Yarn Stash":"毛線庫存","Library":"資料庫","Tools":"工具","Your projects":"你的專案",
  "Settings":"設定","Stitch Technique Refresher":"針法技巧溫習","Reading Mode":"閱讀模式","Exit Reading":"離開閱讀模式",
  "My workspace":"我的工作區","Saved on this device":"已儲存在此裝置","New project":"新增專案","Good afternoon, maker.":"午安，手作人。",
  "Everything is right where you left it.":"所有內容都停留在你上次離開的位置。","In progress":"進行中","View all projects →":"查看所有專案 →",
  "Maker's toolkit":"手作工具箱","Swatch adapter":"織片調整器","Shape evenly":"平均加減針","Converters":"換算工具",
  "Read row guidance":"朗讀行數指引","Voice control":"語音控制","Pattern chart":"圖解","Upload":"上載","Main row counter":"主行數計數器",
  "Next row":"下一行","Project notes":"專案筆記","Stitch marker":"記號扣","Ask about this chart":"詢問此圖解","Buy list":"購買清單",
  "Ask about the current row, abbreviations, repeats, translation, or where you are stuck. Visual symbol recognition is paused; verify chart symbols manually.":"你可以詢問目前行數、縮寫、重複段落、翻譯，或卡住的位置。視覺符號辨識已暫停；請手動核對圖解符號。",
  "AI chart reader beta is paused. Manual OG Chart Mode is the reliable daily workflow right now.":"AI 圖解閱讀 Beta 已暫停。現階段最可靠的日常流程是手動 OG 圖解模式。",
  "The assistant can use your uploaded text, project notes, and Stitch Technique Refresher notes, but it should never guess an unclear symbol.":"助理可以參考你上載的文字、專案筆記及針法技巧溫習筆記，但不應猜測不清楚的符號。",
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

function showView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(v => v.classList.toggle("active", v.dataset.view === name));
  const view = document.getElementById(`${name}-view`);
  if (view) view.classList.add("active");
  document.getElementById("breadcrumb").textContent = name === "project-detail" ? getProject()?.name : name[0].toUpperCase() + name.slice(1);
  document.getElementById("header-context").textContent = name === "project-detail" ? "Projects" : "Workspace";
  document.querySelector(".sidebar").classList.remove("open");
  if (name === "today") renderToday();
  if (name === "projects") renderProjects();
  if (name === "market") renderMarket();
  if (name === "library") renderLibrary();
  if (name === "tools") renderTool("swatch");
  if (name === "settings") renderSettings();
  queueMicrotask(applyLanguage);
}


function handleAppShellClick(e){
  const nav = e.target.closest("[data-view]"); if (nav) { showView(nav.dataset.view); return; }
  const go = e.target.closest("[data-go]"); if (go) { showView(go.dataset.go); return; }
  const project = e.target.closest("[data-project]"); if (project) { openProject(project.dataset.project); return; }
  const add = e.target.closest("[data-add-project]"); if (add) { openProjectModal(); return; }
  const tool = e.target.closest("[data-tool]"); if (tool) { showView("tools"); renderTool(tool.dataset.tool); return; }
  const tab = e.target.closest("[data-tool-tab]"); if (tab) { renderTool(tab.dataset.toolTab); return; }
  const space=e.target.closest("[data-library-space]"); if(space){currentLibrarySection=space.dataset.librarySpace;renderLibrary();}
}
if(!window.__yarnchaShellClickBound){document.addEventListener("click",handleAppShellClick);window.__yarnchaShellClickBound=true;}

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

function renderProjects() {
  document.getElementById("project-grid").innerHTML = state.projects.map(p => `<article class="project-card card" data-project="${p.id}">
    ${visual(p, true)}<div class="project-card-info"><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.type)} · ${rowSummary(p)}</p>
    <div class="progress-track"><div class="progress-fill" style="width:${progress(p) ?? Math.min(95, p.row)}%"></div></div></div>
  </article>`).join("") + `<button class="add-project-card card" data-add-project><div><span class="add-circle">+</span><strong>Start a new project</strong><p>Bring a new idea to life</p></div></button>`;
  hydrateProjectCovers();
}

function openProject(id) {
  currentProjectId = id;
  state.activeProjectId = id;
  saveState();
  renderProjectDetail();
  showView("project-detail");
}

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
  if(p.attachments.length)setTimeout(()=>showProjectAsset(p.attachments[0].id),0);
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
  return `<div class="chart-mode ${p.readingMode?"reading-mode":""}">
    <div class="chart-mode-toolbar card">
      <div class="reading-title-wrap">${p.readingMode?`<span class="reading-cover-thumb">${visual(p,true)}</span>`:""}<div><p class="eyebrow">CHART WORKSPACE</p><h2>${chartMode==="flow"?"Flow Mode (Beta)":"Manual chart reading"}</h2><p>${chartMode==="flow"?"Flow Mode is paused. It will return later as a reviewed AI-assisted workflow.":"Follow your chart without AI guessing. Zoom, pan, highlight the row, and annotate as you go."}</p></div></div>
      <div class="chart-mode-actions"><button class="secondary-button" id="replace-chart">Upload chart</button><button class="primary-button" id="toggle-reading">${p.readingMode?"Exit Reading":"Reading Mode"}</button></div>
      <input type="file" id="chart-upload" accept=".pdf,image/*" multiple hidden>
    </div>
    <div class="chart-mode-switch card" role="radiogroup" aria-label="Chart mode">
      <button class="${chartMode==="og"?"active":""}" data-chart-mode="og" aria-checked="${chartMode==="og"}">OG Mode</button>
      <button class="${chartMode==="flow"?"active":""}" data-chart-mode="flow" aria-checked="${chartMode==="flow"}">Flow Mode (Beta)</button>
      <span>${chartMode==="flow"?"Experimental / disabled guidance only. No visual symbol recognition is running.":"Recommended for accurate row-by-row tracking."}</span>
    </div>
    <div class="reading-counter card">
      <button data-counter="-1" aria-label="Previous row">−</button>
      <label>Row <input id="manual-row-input" type="number" min="0" value="${p.row}"></label>
      <button data-counter="1">+</button>
      <label>Rows <input id="chart-rows" type="number" min="1" value="${p.chartRows || p.totalRows || ""}" placeholder="Planned"></label>
      <button class="mini-button" id="reset-main">Reset</button>
      <button class="mini-button voice-icon-button" id="voice-project" aria-label="Voice controls" title="Voice controls">${uiIcon("voice","button-icon")}</button>
    </div>
    <div class="annotation-toolbar card ${hasChart?"":"is-disabled"}" role="toolbar" aria-label="Annotation tools" aria-disabled="${!hasChart}">
      ${["pen","highlighter","eraser","rowMask","text","arrow","marker"].map(tool=>`<button class="${activeAnnotationTool===tool?"active":""}" data-annotation-tool="${tool}" ${hasChart?"":"disabled"}>${toolIcon(tool)}<span>${toolLabel(tool)}</span></button>`).join("")}
      <label class="annotation-control">Color <input id="annotation-color" type="color" value="${escapeHtml(p.annotationColor||"#d96572")}" ${hasChart?"":"disabled"}></label>
      <label class="annotation-control">Size <select id="annotation-width" ${hasChart?"":"disabled"}>${[2,4,6,10,14,20].map(w=>`<option value="${w}" ${Number(p.annotationWidth)===w?"selected":""}>${w}</option>`).join("")}</select></label>
      <label class="annotation-control mask-only">Opacity <input id="row-mask-opacity" type="range" min=".2" max=".95" step=".05" value="${p.rowMask?.opacity??.72}" ${hasChart?"":"disabled"}></label>
      <label class="annotation-control mask-only">Mask color <input id="row-mask-color" type="color" value="${escapeHtml(p.rowMask?.color||p.annotationColor||"#c9a66b")}" ${hasChart?"":"disabled"}></label>
      <label class="annotation-control">Eraser <select id="eraser-mode" ${hasChart?"":"disabled"}>${["standard","precise","stroke"].map(v=>`<option value="${v}" ${p.eraserMode===v?"selected":""}>${v[0].toUpperCase()+v.slice(1)}</option>`).join("")}</select></label>
      <label class="annotation-control">Eraser size <input id="eraser-size" type="range" min="8" max="80" step="2" value="${p.eraserSize||28}" ${hasChart?"":"disabled"}></label>
      <button id="toggle-mask-position-lock" ${hasChart?"":"disabled"}>${p.maskLockPosition?"Unlock position":"Lock position"}</button><button id="toggle-mask-size-lock" ${hasChart?"":"disabled"}>${p.maskLockSize?"Unlock size":"Lock size"}</button><button id="toggle-mask-lock" ${hasChart?"":"disabled"}>${p.rowMask?.locked?"Unlock all":"Lock all"}</button><button id="mask-up" ${hasChart?"":"disabled"}>Mask ↑</button><button id="mask-down" ${hasChart?"":"disabled"}>Mask ↓</button><button id="mask-cover-done" ${hasChart?"":"disabled"}>Cover done</button><button class="danger-button" id="clear-mask" ${hasChart?"":"disabled"}>Clear mask</button>
      <button id="undo-annotation" ${hasChart?"":"disabled"}>${uiIcon("undo","annotation-button-icon")}<span>Undo</span></button><button id="redo-annotation" ${hasChart?"":"disabled"}>${uiIcon("redo","annotation-button-icon")}<span>Redo</span></button><button class="danger-button" id="clear-annotations" ${hasChart?"":"disabled"}>Clear</button>
      <div class="zoom-tools"><button data-zoom="-0.15">−</button><strong>${Math.round((p.chartZoom||1)*100)}%</strong><button data-zoom="0.15">+</button></div>
    </div>
    <div class="chart-reader card">
      <div class="chart-stage og-chart-stage" id="chart-stage">${chartViewerHtml(p)}</div>
      <div class="attachment-strip">${p.attachments.map(a=>`<button class="mini-button" data-project-asset="${a.id}">${escapeHtml(a.name)}</button>`).join("")}</div>
    </div>
    <div class="manual-chart-tools">
      <div class="sync-panel card"><strong>Chart sync</strong><span>${p.chartRows ? `Highlighting row ${p.row} of ${p.chartRows}` : "Enter planned row count to place the row highlight."}</span></div>
      ${chartMode==="flow"?friendlyChartBetaHtml(p):friendlyChartBetaHtml(p)}
    </div>
  </div>`;
}

function chartViewerHtml(p){
  const hasChart=!!(p.chart||p.attachments?.length);
  const content = p.chart
    ? (p.chart.type === "application/pdf" ? `<iframe src="${p.chart.data}#toolbar=0"></iframe>` : `<img src="${p.chart.data}" alt="${escapeHtml(p.chart.name)}">`)
    : `<label class="chart-placeholder upload-drop"><div class="upload-mark">▦</div><h3>Upload a chart image or PDF</h3><p>Manual Reading Mode is recommended for accurate tracking.</p><input type="file" id="chart-upload-inline" accept=".pdf,image/*" multiple hidden><span class="secondary-button">Choose chart</span></label>`;
  const highlight=hasChart&&p.chartMode==="flow"&&p.flowMode!==false?`<div class="row-highlight" style="top:${rowHighlightTop(p)}"></div>`:"";
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
    const color=a.color||"#d96572",width=Number(a.width)||4,opacity=a.tool==="highlighter" ? .38 : 1;
    return `<path class="annotation-stroke annotation-${a.tool}" data-ann-id="${a.id}" d="${d}" stroke="${escapeHtml(color)}" stroke-width="${width}" stroke-opacity="${opacity}" fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path>`;
  }
  if(a.tool==="text")return `<foreignObject class="annotation-object" data-ann-id="${a.id}" x="${(a.x||0)-55}" y="${(a.y||0)-22}" width="150" height="58"><div xmlns="http://www.w3.org/1999/xhtml" class="annotation-text">${escapeHtml(a.text||"Note")}</div></foreignObject>`;
  if(a.tool==="arrow"){
    const x1=a.x1??a.x??0,y1=a.y1??a.y??0,x2=a.x2??((a.x??0)+120),y2=a.y2??((a.y??0)-80),color=escapeHtml(a.color||"#d96572"),width=Number(a.width)||6;
    return `<g class="annotation-arrow-object ${selected?"selected":""}" data-ann-id="${a.id}"><line class="annotation-arrow-line" data-ann-id="${a.id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" marker-end="url(#ann-arrowhead)" stroke-linecap="round" vector-effect="non-scaling-stroke"></line>${selected?`<circle class="annotation-handle" data-ann-id="${a.id}" data-arrow-handle="start" cx="${x1}" cy="${y1}" r="13"></circle><circle class="annotation-handle" data-ann-id="${a.id}" data-arrow-handle="end" cx="${x2}" cy="${y2}" r="13"></circle>`:""}</g>`;
  }
  return `<circle class="annotation-object" data-ann-id="${a.id}" cx="${a.x||0}" cy="${a.y||0}" r="${Math.max(8,Number(a.width)||12)}" fill="${escapeHtml(a.color||"#d96572")}" opacity=".9"></circle>`;
}
function toolIcon(tool){return uiIcon(({pen:"pen",highlighter:"highlighter",text:"text",arrow:"arrow",marker:"marker",eraser:"eraser",rowMask:"mask"})[tool]||"calculator","annotation-button-icon");}
function toolLabel(tool){return ({rowMask:"Row Mask",highlighter:"Highlighter"}[tool]||tool);}

function friendlyChartBetaHtml(p){
  const hasChart=p.chart||p.attachments.length,hasLegend=!!p.chartAnalysis?.legend,hasRows=!!(p.chartAnalysis?.rows||[]).length;
  return `<div class="chart-analysis ai-beta-safe card"><p class="eyebrow">FLOW MODE · DISABLED</p><h3>Manual tracking remains recommended</h3><p>Automatic Flow Mode does not move or interpret rows. Signed-in private-beta users may use the separate cloud chart reader below, where every AI suggestion remains editable and unclear symbols stay uncertain.</p><div class="beta-checks"><span>${hasChart?"✓":"○"} Chart uploaded</span><span>${hasLegend?"✓":"○"} User legend saved</span><span>${hasRows?"✓":"⚠"} Row numbering ${hasRows?"manually reviewed":"needs review"}</span></div><strong>Safe workflow:</strong><p>AI reads → you review → you edit → final checked pattern. OG Mode remains the reliable daily tracker.</p><button class="mini-button" id="edit-chart-legend">Review legend</button><button class="mini-button" id="add-analysis-row">Add manual row</button></div>`;
}

function projectProjectHtml(p){
  return `<div class="project-info-grid">
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
  return `<div class="assistant-tab-grid">${projectAssistantHtml(p)}<div class="card mobile-card"><p class="eyebrow">BETA SAFETY</p><h2>Chart reader</h2><p>Automatic Flow Mode remains paused. The optional signed-in cloud chart reader produces an editable draft; Manual OG Chart Mode remains the reliable daily workflow.</p><p>The assistant can use your uploaded text, project notes, and Stitch Technique Refresher notes, but it should never guess an unclear symbol.</p></div></div>`;
}
function themeLabel(t){return themePresets.find(theme=>theme.id===normalizeThemeName(t))?.name||t;}
function styleLabel(s){return designStyles.find(style=>style.id===normalizeDesignStyle(s))?.name||s;}

function rowHighlightTop(p) { return `${p.chartRows ? Math.min(92, Math.max(0, (p.row / p.chartRows) * 92)) : 0}%`; }
function chartAnalysisHtml(p){
  if(!p.chartAnalysis)return `<div class="chart-analysis">
    <strong>Analysis report</strong>
    <span>No chart analysed yet. Add rows manually or upload a chart to create an uncertain draft for review.</span>
    <div class="analysis-actions"><button class="mini-button" id="edit-chart-legend">Review legend</button><button class="mini-button" id="add-analysis-row">+ Add row</button></div>
  </div>`;
  const a=p.chartAnalysis;
  const rows=a.rows||[];
  return `<details class="chart-analysis" open><summary><strong>Analysis report</strong> · ${a.detectedRows?`${a.detectedRows} rows detected`:"row total needs confirmation"}</summary><p>${escapeHtml(a.summary)}</p>
    <div class="verification-flow"><strong>AI reads</strong><span>→</span><strong>You check and edit</strong><span>→</span><strong>Final written pattern</strong></div>
    <div class="analysis-actions"><button class="mini-button" id="edit-chart-legend">Review legend</button><button class="mini-button" id="add-analysis-row">+ Add row</button><button class="mini-button" id="generate-final-pattern">Generate checked pattern</button></div>
    ${rows.length?`<div class="chart-row-table">${rows.map(r=>chartRowHtml(r)).join("")}</div>`:`<div class="empty-analysis">No trustworthy grid rows were detected. Add rows manually instead of relying on a guess.</div>`}
    <small>Low resolution, watermarks, compression and unfamiliar symbols reduce confidence. Unclear cells remain marked “uncertain”.</small></details>`;
}
function chartRowHtml(r){return `<div class="chart-row ${r.status==="uncertain"?"uncertain":""}"><div><strong>Row ${r.number}</strong><span>${escapeHtml(r.side||"Side uncertain")} · ${Number(r.stitchCount)||"?"} stitches</span></div><p>${escapeHtml(r.sequence||"uncertain")}</p><small>${escapeHtml(r.shaping||"No increase/decrease detected")}</small><div class="row-actions"><button class="mini-button" data-edit-analysis-row="${r.id}">Edit</button><button class="mini-button danger-button" data-delete-analysis-row="${r.id}">Delete</button></div></div>`;}
function subCounterHtml(s) {
  return `<div class="sub-counter repeat-counter-card"><div class="sub-counter-main"><strong>${escapeHtml(s.name)}</strong><div class="link-toggle">${s.linked ? `Linked every ${s.every} rows` : "Independent"}</div></div>
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
  return `<div class="project-tools card toolkit-card compact-toolkit"><div class="section-heading" style="margin:0"><div><p class="eyebrow">PROJECT TOOLKIT</p><h2>Choose a focused tool</h2><p class="muted-copy">Showing ${escapeHtml(normalizeProjectType(p.type).toLowerCase())} tools plus shared tools. Budget stays in Buy List / Budget.</p><p class="unit-preference-note">Preferred units: ${escapeHtml(unitSystemLabel())}</p></div><label class="link-toggle"><input id="link-project-tools" type="checkbox" ${linked ? "checked" : ""}> Save results to this project</label></div>
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
    const s = p.subCounters.find(x => x.id === b.dataset.sub); s.count = Math.max(0, s.count + Number(b.dataset.delta)); saveState(); renderProjectDetail();
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
  document.querySelectorAll("[data-chart-mode]").forEach(b=>b.onclick=()=>{p.chartMode=b.dataset.chartMode;if(p.chartMode==="flow")toast("Flow Mode beta is disabled guidance only. Use OG Mode for tracking.");saveProjectTouch(p);renderProjectDetail();});
  document.getElementById("flow-toggle")?.addEventListener("click",()=>{p.flowMode=!p.flowMode;saveProjectTouch(p);renderProjectDetail();});
  document.getElementById("edit-chart-legend")?.addEventListener("click",openChartLegendModal);
  document.getElementById("add-analysis-row")?.addEventListener("click",()=>openChartRowModal());
  document.getElementById("generate-final-pattern")?.addEventListener("click",generateFinalPattern);
  document.querySelectorAll("[data-edit-analysis-row]").forEach(b=>b.onclick=()=>openChartRowModal(b.dataset.editAnalysisRow));
  document.querySelectorAll("[data-delete-analysis-row]").forEach(b=>b.onclick=()=>{p.chartAnalysis.rows=p.chartAnalysis.rows.filter(r=>r.id!==b.dataset.deleteAnalysisRow);saveState();renderProjectDetail();});
  document.getElementById("chart-rows")?.addEventListener("change", e => { p.chartRows = Math.max(1, +e.target.value || 0) || null; p.totalRows=p.chartRows||p.totalRows; saveProjectTouch(p); renderProjectDetail(); });
  document.getElementById("manual-row-save")?.addEventListener("click",()=>setManualRowFromInput());
  document.getElementById("manual-row-input")?.addEventListener("change",()=>setManualRowFromInput());
  document.getElementById("reset-main")?.addEventListener("click", () => { p.row=0; p.subCounters.forEach(s=>s.count=0); saveProjectTouch(p); renderProjectDetail(); toast("Counters reset"); });
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
  document.querySelectorAll("[data-annotation-tool]").forEach(b=>b.onclick=()=>{activeAnnotationTool=b.dataset.annotationTool;renderProjectDetail();});
  document.getElementById("annotation-color")?.addEventListener("input",e=>{p.annotationColor=e.target.value;saveProjectTouch(p);});
  document.getElementById("annotation-width")?.addEventListener("change",e=>{p.annotationWidth=Number(e.target.value)||4;saveProjectTouch(p);});
  document.getElementById("row-mask-opacity")?.addEventListener("input",e=>{ensureRowMask(p);p.rowMask.opacity=Number(e.target.value)||.72;saveProjectTouch(p);paintRowMask(p);});
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
function saveProjectTouch(p){p.updatedAt=new Date().toISOString();saveState();}
function setManualRowFromInput(){const p=getProject(),input=document.getElementById("manual-row-input");if(!input)return;const next=Math.max(0,Math.round(+input.value||0));p.row=p.totalRows?Math.min(p.totalRows,next):next;saveProjectTouch(p);renderProjectDetail();}
function changeMainCounter(delta) {
  const p = getProject(); const oldRow = p.row; p.row = Math.max(0, p.row + delta);
  if (p.totalRows) p.row = Math.min(p.totalRows, p.row);
  if (delta > 0) p.subCounters.filter(s => s.linked && s.every > 0 && p.row % s.every === 0 && p.row !== oldRow).forEach(s => s.count++);
  saveProjectTouch(p); renderProjectDetail();
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
function ensureRowMask(p=getProject()){
  if(!p.rowMask)p.rowMask={type:"rowMask",x:50,y:420,width:900,height:90,color:"#c9a66b",opacity:.72,locked:false};
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
  if(activeAnnotationTool==="rowMask"){
    event.preventDefault();
    const m=ensureRowMask(p);
    m.x=Math.max(0,Math.min(900,pt.x-450));m.y=Math.max(0,Math.min(940,pt.y-45));m.width=900;m.height=90;m.color=p.annotationColor||m.color;m.opacity=m.opacity??.72;
    saveProjectTouch(p);renderProjectDetail();return;
  }
  p.selectedAnnotationId=null;
  if(["pen","highlighter"].includes(activeAnnotationTool)){
    event.preventDefault();
    pushAnnotationHistory(p);
    drawingStroke={id:`ann${Date.now()}`,tool:activeAnnotationTool,points:[pt],color:p.annotationColor||"#d96572",width:Number(p.annotationWidth)||4};
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
    const ann={id,tool:"arrow",x1:pt.x,y1:pt.y,x2:Math.min(1000,pt.x+140),y2:Math.max(0,pt.y-90),color:p.annotationColor||"#d96572",width:Number(p.annotationWidth)||6};
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
    p.annotations=[...(p.annotations||[]),{id,tool:activeAnnotationTool,x:pt.x,y:pt.y,text,color:p.annotationColor||"#d96572",width:Number(p.annotationWidth)||10}];
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
function moveRowMask(direction){const p=getProject(),m=ensureRowMask(p),step=p.chartRows?1000/p.chartRows:36;m.y=Math.max(0,Math.min(1000-m.height,m.y+direction*step));saveProjectTouch(p);paintRowMask(p);}
function coverCompletedRows(){const p=getProject(),m=ensureRowMask(p),rowHeight=p.chartRows?1000/p.chartRows:36;m.x=0;m.y=0;m.width=1000;m.height=Math.max(rowHeight,Math.min(1000,p.row*rowHeight));saveProjectTouch(p);renderProjectDetail();}
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
function undoAnnotation(){const p=getProject(),history=p.annotationHistory||[];if(!history.length)return toast("Nothing to undo.");p.annotationRedo=[...(p.annotationRedo||[]),cloneAnnotations(p.annotations)].slice(-40);p.annotations=history.pop();p.annotationHistory=history;p.selectedAnnotationId=null;paintAnnotations(p);saveStateSoon(120);}
function redoAnnotation(){const p=getProject(),redo=p.annotationRedo||[];if(!redo.length)return toast("Nothing to redo.");p.annotationHistory=[...(p.annotationHistory||[]),cloneAnnotations(p.annotations)].slice(-40);p.annotations=redo.pop();p.annotationRedo=redo;p.selectedAnnotationId=null;paintAnnotations(p);saveStateSoon(120);}
function buildRowGuidance(p) {
  const analysed=p.chartAnalysis?.rows?.find(r=>Number(r.number)===p.row);
  const linked = p.subCounters.filter(s=>s.linked).map(s=>`${s.name} is at repeat ${s.count}, advancing every ${s.every} rows.`).join(" ");
  const marker = p.markers.filter(m=>m.row===p.row).map(m=>`${m.color} marker here.`).join(" ");
  const rowText=analysed?`${analysed.side||"Side uncertain"}. ${analysed.sequence||"Sequence uncertain"}. Stitch count ${analysed.stitchCount||"uncertain"}. ${analysed.shaping||""}`:"No checked written instruction is saved for this row.";
  return `Row ${p.row}. ${rowText} ${linked} ${marker} ${p.notes ? `Project note: ${p.notes}` : "Check the highlighted chart row."}`.trim();
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
  const chinese=/[\u3400-\u9fff]|唔|嘅|咩|點|係|喺|冇|嗰|佢/.test(question),context=chinese?`你目前在第 ${p.row} 行${p.chartRows?`，圖表共有 ${p.chartRows} 行`:""}。`:`You are on row ${p.row}${p.chartRows?` of a ${p.chartRows}-row chart`:""}. `;
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
  const tutorial=state.librarySections.find(s=>s.id==="tutorials");
  const items=(tutorial?.items||[]).map(i=>`Technique sheet: ${i.name}. ${i.craft||""}. ${i.notes||""}`).join("\n");
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
  p.readerStatus=`Saving ${files.length} chart file(s) locally…`;saveState();renderProjectDetail();
  const allText=[];
  for(const file of files){
    const id=`asset${Date.now()}${Math.random().toString(16).slice(2)}`;await putAsset(id,file);p.attachments.push({id,name:file.name,type:file.type,size:file.size});
    window.YarnchaCloud?.queueChartUpload?.(p.id,id,file);
    if(!p.chart){p.chart={name:file.name,type:file.type,data:null,assetId:id};}
    let text="";if(file.type==="application/pdf")text=await extractPdfText(file);
    const ocr=await ocrFile(file);const combined=[text,ocr].filter(Boolean).join("\n");
    if(combined){p.pdfReference=`${p.pdfReference}\n\nSOURCE: ${file.name}\n${combined}`.trim();allText.push(combined);}
  }
  p.chartAnalysis=analysePatternText(allText.join("\n"));
  if(!p.chartRows&&p.chartAnalysis.detectedRows)p.chartRows=p.chartAnalysis.detectedRows;
  p.readerStatus=allText.length ? `Chart saved. Text reference found; please review rows manually.` : `Chart saved. Manual Reading Mode is recommended.`;
  p.activeTab="chart";saveProjectTouch(p);renderProjectDetail();showProjectAsset(p.attachments.at(-1).id);toast("Chart saved for Reading Mode");
}
function analysePatternText(text){
  const clean=text.replace(/\s+/g," ").trim(),rowMatches=[...clean.matchAll(/(?:row|round|rnd|第)\s*([0-9]{1,4})(?:\s*(?:行|段|圈|段目))?/gi)].map(m=>+m[1]).filter(n=>n>0&&n<2000);
  const lineMatches=[...text.matchAll(/(?:^|\n)\s*(?:row|round|rnd|第)?\s*([0-9]{1,4})\s*(?:[:：.)]|行|段|圈|段目)\s*([^\n]{3,180})/gim)];
  const detectedRows=rowMatches.length?Math.max(...rowMatches):null;
  const rowSamples=lineMatches.slice(0,10).map(m=>`Row ${m[1]}: ${m[2].trim()}`);
  const rows=lineMatches.slice(0,200).map((m,index)=>({id:`analysis-row-${Date.now()}-${index}`,number:+m[1],side:+m[1]%2?"Right side (inferred)":"Wrong side (inferred)",sequence:m[2].trim(),stitchCount:null,shaping:/inc|increase|加针|加針|増し目/i.test(m[2])?"Possible increase":/dec|decrease|减针|減針|減らし目/i.test(m[2])?"Possible decrease":"No increase/decrease detected",status:"uncertain"}));
  const languages=[/[\u3040-\u30ff]/.test(text)?"Japanese":null,/[\u3400-\u9fff]/.test(text)?"Chinese":null,/[A-Za-z]{4}/.test(text)?"English":null].filter(Boolean);
  const repeats=(clean.match(/repeat|重複|重复|繰り返し|リピート/gi)||[]).length;
  return {detectedRows,rowSamples,rows,legend:"",columns:null,gridStatus:"Row numbering needs manual confirmation.",summary:`Confidence: ${rowSamples.length?"Medium":"Low"}. Chart file saved. ${rowSamples.length?"Some row-like text was found, but please review it manually.":"Row numbering is unclear."} Recommendation: use OG Chart Mode and verify rows yourself.`};
}
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
  openModal(`<p class="eyebrow">CHECKED ROW</p><h2>${row?"Edit":"Add"} written row</h2><div class="form-grid"><div class="field"><label>Row number</label><input id="analysis-row-number" type="number" min="1" value="${row?.number||p.row||1}"></div><div class="field"><label>Side</label><select id="analysis-row-side">${["Right side","Wrong side","Worked in the round","Side uncertain"].map(v=>`<option ${row?.side===v?"selected":""}>${v}</option>`).join("")}</select></div><div class="field full"><label>Stitch sequence</label><textarea id="analysis-row-sequence" rows="4" placeholder="Use “uncertain” for every unreadable cell">${escapeHtml(row?.sequence||"")}</textarea></div><div class="field"><label>Resulting stitch count</label><input id="analysis-stitch-count" type="number" min="0" value="${row?.stitchCount||""}" placeholder="Leave blank if uncertain"></div><div class="field"><label>Confidence</label><select id="analysis-row-status"><option value="uncertain" ${row?.status!=="checked"?"selected":""}>Uncertain</option><option value="checked" ${row?.status==="checked"?"selected":""}>Checked by me</option></select></div><div class="field full"><label>Increase / decrease notes</label><input id="analysis-shaping" value="${escapeHtml(row?.shaping||"")}" placeholder="e.g. 2 increases, final count 24"></div></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-analysis-row">Save row</button></div>`);
  document.getElementById("save-analysis-row").onclick=()=>{const values={number:Math.max(1,+document.getElementById("analysis-row-number").value||1),side:document.getElementById("analysis-row-side").value,sequence:document.getElementById("analysis-row-sequence").value.trim()||"uncertain",stitchCount:+document.getElementById("analysis-stitch-count").value||null,status:document.getElementById("analysis-row-status").value,shaping:document.getElementById("analysis-shaping").value.trim()||"No increase/decrease confirmed"};if(row)Object.assign(row,values);else a.rows.push({id:`analysis-row-${Date.now()}`,...values});a.rows.sort((x,y)=>x.number-y.number);saveState();closeModal();renderProjectDetail();};
}
function generateFinalPattern(){
  const p=getProject(),rows=p.chartAnalysis?.rows||[],checked=rows.filter(r=>r.status==="checked");
  if(!checked.length)return toast("Check at least one row before generating a final pattern.");
  const uncertain=rows.length-checked.length,text=checked.map(r=>`Row ${r.number} (${r.side}): ${r.sequence}. Stitch count: ${r.stitchCount||"not confirmed"}. ${r.shaping||""}`).join("\n");
  openModal(`<p class="eyebrow">USER-VERIFIED OUTPUT</p><h2>Final written pattern draft</h2><p>${checked.length} checked row(s) included. ${uncertain} uncertain row(s) excluded.</p><textarea class="final-pattern-output" rows="14">${escapeHtml(text)}</textarea><div class="modal-actions"><button class="primary-button" onclick="closeModal()">Done</button></div>`);
}
async function showProjectAsset(id){
  const file=await getAsset(id);if(!file)return toast("This file is no longer available.");
  const p=getProject(),url=URL.createObjectURL(file),stage=document.getElementById("chart-stage"),highlight=p.chartMode==="flow"&&p.flowMode!==false?`<div class="row-highlight" style="top:${rowHighlightTop(p)}"></div>`:"";
  if(!stage)return;
  stage.innerHTML=`<div class="chart-canvas" style="transform:scale(${p.chartZoom||1});transform-origin:top left;">${file.type==="application/pdf"?`<iframe src="${url}#toolbar=0"></iframe>`:`<img src="${url}" alt="Pattern attachment">`}${highlight}${annotationsHtml(p)}</div>`;
  bindAnnotationStage();
}
async function extractPdfText(file){
  try{
    const {pdfjsLib:pdfjs}=await getDocumentTools();
    const pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
    const pages=[];
    for(let pageNumber=1;pageNumber<=Math.min(pdf.numPages,30);pageNumber++){
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
async function ocrFile(file){
  try{
    const tools=await getDocumentTools();
    const worker=await tools.createOcrWorker("eng+chi_tra+chi_sim+jpn",m=>{const p=getProject();if(m.status==="recognizing text"){p.readerStatus=`OCR ${file.name}: ${Math.round((m.progress||0)*100)}%`;const el=document.querySelector(".reader-status");if(el)el.innerHTML=`<strong>Reader status:</strong> ${escapeHtml(p.readerStatus)}`;}});
    const outputs=[];
    if(file.type==="application/pdf"){
      const pdfjs=tools.pdfjsLib;
      const pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise;
      for(let n=1;n<=Math.min(pdf.numPages,30);n++){const page=await pdf.getPage(n),viewport=page.getViewport({scale:1.7}),canvas=document.createElement("canvas");canvas.width=viewport.width;canvas.height=viewport.height;await page.render({canvasContext:canvas.getContext("2d"),viewport}).promise;const result=await worker.recognize(canvas);if(result.data.text.trim())outputs.push(`OCR page ${n}\n${result.data.text.trim()}`);}
    }else{const result=await worker.recognize(file);if(result.data.text.trim())outputs.push(`OCR image\n${result.data.text.trim()}`);}
    await worker.terminate();return outputs.join("\n\n");
  }catch(error){return `OCR notice: automatic image-text reading failed for ${file.name}. Please add a clearer image or paste the printed instructions manually.`;}
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
    <div class="row-actions idea-actions"><button class="mini-button" data-edit-idea="${escapeHtml(idea.id)}">Edit</button><button class="mini-button" data-create-project-idea="${escapeHtml(idea.id)}">Create Project from Idea</button><button class="mini-button" data-archive-idea="${escapeHtml(idea.id)}">${idea.archived?"Unarchive":"Archive"}</button><button class="mini-button danger-button" data-delete-idea="${escapeHtml(idea.id)}">Delete</button></div>
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
  document.querySelectorAll("[data-delete-idea]").forEach(b=>b.onclick=()=>{if(!confirm("Delete this project idea? This cannot be undone."))return;state.projectIdeas=(state.projectIdeas||[]).filter(i=>i.id!==b.dataset.deleteIdea);const section=state.librarySections.find(s=>s.id==="ideas");if(section)section.items=(section.items||[]).filter(i=>i.id!==b.dataset.deleteIdea);saveState();renderLibrary();});
  document.querySelectorAll("[data-create-project-idea]").forEach(b=>b.onclick=()=>createProjectFromIdea(b.dataset.createProjectIdea));
  hydrateIdeaImages();
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
    <div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-project-idea">Save idea</button></div>`);
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
  if(section.id==="symbols")return window.YarnchaSymbolDatabase?.entries.length||0;
  if(section.id==="tool-manual")return toolkitToolDefs.length;
  if(section.id==="theory")return Object.values(theoryTopics).reduce((sum,items)=>sum+items.length,0);
  if(section.id==="ideas")return (state.projectIdeas||[]).length;
  return (section.items||[]).length;
}
function librarySectionIcon(sectionId){return uiIcon(({tutorials:"book",patterns:"pattern",ideas:"idea",materials:"fibre",symbols:"pattern","tool-manual":"manual",theory:"theory"})[sectionId]||"folder","library-card-icon");}
function symbolDatabaseHtml(){
  const database=window.YarnchaSymbolDatabase;
  if(!database)return `<div class="empty-state"><h3>Symbol Database could not load</h3><p>Refresh after confirming symbol-database.js is available.</p></div>`;
  if(currentSymbolId){
    const entry=database.entries.find(item=>item.id===currentSymbolId);
    if(!entry){currentSymbolId=null;return symbolDatabaseHtml();}
    const favorite=(state.symbolFavorites||[]).includes(entry.id);
    return `<section class="symbol-detail card">
      <button class="text-button symbol-detail-back" id="symbol-detail-back">← Symbol Database</button>
      <div class="symbol-detail-hero"><div class="symbol-glyph">${escapeHtml(entry.symbol)}</div><div><p class="eyebrow">${escapeHtml(entry.craft)} · ${escapeHtml(entry.category)} · ${escapeHtml(entry.difficulty)}</p><h2>${escapeHtml(entry.fullName)}</h2><p class="symbol-abbreviation">${escapeHtml(entry.abbreviation||"No standard abbreviation")}</p></div></div>
      <div class="symbol-detail-actions"><button class="secondary-button" id="copy-symbol-meaning">Copy Meaning</button><button class="secondary-button" id="save-symbol-project">Save to Project Notes</button><button class="primary-button" id="favorite-symbol">${favorite?"Remove Favorite":"Add to Favorites"}</button></div>
      <div class="symbol-detail-grid">
        <article><h3>Meaning</h3><p>${escapeHtml(entry.description)}</p></article>
        <article><h3>How To</h3><p>${escapeHtml(entry.howTo)}</p></article>
        <article><h3>Beginner Notes</h3><p>${escapeHtml(entry.beginnerExplanation)}</p></article>
        <article><h3>Common Mistakes</h3><ul>${entry.commonMistakes.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
        <article><h3>Related Symbols</h3><p>${entry.relatedSymbols.length?entry.relatedSymbols.map(escapeHtml).join(" · "):"Use craft and category filters to find related entries."}</p></article>
        <article><h3>Language Names</h3><dl>${Object.entries(entry.languageVariants).map(([language,name])=>`<dt>${escapeHtml(language)}</dt><dd>${escapeHtml(name)}</dd>`).join("")}</dl></article>
      </div>
      <section class="flow-reference-note"><p class="eyebrow">FLOW MODE REFERENCE</p><h3>Candidate matching notes</h3><p><strong>Possible meanings:</strong> ${entry.possibleMeanings.map(escapeHtml).join(" · ")}</p><p><strong>Recognition aliases:</strong> ${entry.recognitionAliases.map(escapeHtml).join(" · ")}</p><p><strong>OCR keywords:</strong> ${entry.ocrKeywords.map(escapeHtml).join(" · ")}</p><p><strong>Chart examples:</strong> ${entry.chartExamples.map(escapeHtml).join(" · ")}</p><p><strong>Ambiguity:</strong> ${entry.ambiguityWarnings.map(escapeHtml).join(" ")}</p><p><strong>Confidence:</strong> ${escapeHtml(entry.confidenceHint)}</p><span class="analysis-badge review">${entry.requiresLegendCheck?"Legend check required":"Context check required"}</span></section>
    </section>`;
  }
  const entries=database.search(symbolFilters.search,symbolFilters);
  const sections=["Knitting Symbols & Abbreviations","Crochet Symbols & Abbreviations","Tunisian Crochet Symbols & Abbreviations","Special Stitches","Chart Reading Rules"];
  const craftOptions=["All","Knitting","Crochet","Tunisian","Shared"],categoryOptions=["All",...database.categoryOrder],difficultyOptions=["All","Beginner","Intermediate","Advanced"];
  return `<section class="symbol-database-shell">
    <div class="symbol-database-intro card"><p class="eyebrow">FLOW MODE FOUNDATION</p><h2>Symbols are candidates, not assumptions</h2><p>Search abbreviations, chart marks, aliases and reading rules. Every symbol keeps ambiguity and legend-check guidance for future reviewed recognition.</p></div>
    <div class="symbol-filter-bar card"><label class="symbol-search"><span>Search</span><input id="symbol-search" type="search" value="${escapeHtml(symbolFilters.search)}" placeholder="Symbol, abbreviation, name or OCR keyword"></label><label><span>Craft</span><select id="symbol-craft-filter">${craftOptions.map(value=>`<option ${symbolFilters.craft===value?"selected":""}>${value}</option>`).join("")}</select></label><label><span>Category</span><select id="symbol-category-filter">${categoryOptions.map(value=>`<option ${symbolFilters.category===value?"selected":""}>${value}</option>`).join("")}</select></label><label><span>Difficulty</span><select id="symbol-difficulty-filter">${difficultyOptions.map(value=>`<option ${symbolFilters.difficulty===value?"selected":""}>${value}</option>`).join("")}</select></label></div>
    <p class="symbol-result-count">${entries.length} matching entries · ${(state.symbolFavorites||[]).length} favorites</p>
    ${entries.length?sections.map(section=>{const items=entries.filter(entry=>entry.section===section);return items.length?`<section class="symbol-section"><div class="section-heading"><div><p class="eyebrow">SYMBOL DATABASE</p><h2>${escapeHtml(section)}</h2></div><span>${items.length} entries</span></div><div class="symbol-grid">${items.map(entry=>`<button class="symbol-card card" data-symbol-id="${entry.id}"><span class="symbol-card-mark">${escapeHtml(entry.symbol)}</span><span class="symbol-card-copy"><strong>${escapeHtml(entry.abbreviation||entry.fullName)}</strong><small>${escapeHtml(entry.fullName)}</small><em>${escapeHtml(entry.category)} · ${escapeHtml(entry.difficulty)}</em></span>${(state.symbolFavorites||[]).includes(entry.id)?`<span class="symbol-favorite" aria-label="Favorite">Saved</span>`:""}</button>`).join("")}</div></section>`:"";}).join(""):`<div class="empty-state"><h3>No symbols match these filters</h3><p>Try a different craft, category, difficulty or search term.</p></div>`}
  </section>`;
}
function symbolMeaningText(entry){return `${entry.fullName}${entry.abbreviation?` (${entry.abbreviation})`:""}\nSymbol: ${entry.symbol}\nMeaning: ${entry.description}\nHow to: ${entry.howTo}\nFlow Mode note: ${entry.confidenceHint}`;}
function openSymbolProjectModal(entry){
  if(!state.projects.length)return toast("Create a project before saving notes.");
  openModal(`<p class="eyebrow">SYMBOL DATABASE</p><h2>Save to Project Notes</h2><p>${escapeHtml(entry.fullName)} will be added as a reference note.</p><div class="field"><label for="symbol-project-select">Project</label><select id="symbol-project-select">${state.projects.map(project=>`<option value="${project.id}" ${project.id===state.activeProjectId?"selected":""}>${escapeHtml(project.name)}</option>`).join("")}</select></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="confirm-symbol-project">Save note</button></div>`);
  document.getElementById("confirm-symbol-project").onclick=()=>{const project=state.projects.find(item=>item.id===document.getElementById("symbol-project-select").value);if(!project)return;project.notes=`${project.notes||""}${project.notes?"\n\n":""}[Symbol Database]\n${symbolMeaningText(entry)}`;saveProjectTouch(project);closeModal(true);toast("Symbol saved to project notes");};
}
function bindSymbolDatabase(){
  const database=window.YarnchaSymbolDatabase;if(!database)return;
  document.getElementById("symbol-search")?.addEventListener("input",event=>{symbolFilters.search=event.target.value;renderLibrary();requestAnimationFrame(()=>document.getElementById("symbol-search")?.focus());});
  [["symbol-craft-filter","craft"],["symbol-category-filter","category"],["symbol-difficulty-filter","difficulty"]].forEach(([id,key])=>document.getElementById(id)?.addEventListener("change",event=>{symbolFilters[key]=event.target.value;renderLibrary();}));
  document.querySelectorAll("[data-symbol-id]").forEach(button=>button.onclick=()=>{currentSymbolId=button.dataset.symbolId;renderLibrary();});
  document.getElementById("symbol-detail-back")?.addEventListener("click",()=>{currentSymbolId=null;renderLibrary();});
  const entry=database.entries.find(item=>item.id===currentSymbolId);if(!entry)return;
  document.getElementById("copy-symbol-meaning")?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(symbolMeaningText(entry));toast("Meaning copied");}catch{toast("Copy is blocked in this browser.");}});
  document.getElementById("save-symbol-project")?.addEventListener("click",()=>openSymbolProjectModal(entry));
  document.getElementById("favorite-symbol")?.addEventListener("click",()=>{const favorites=new Set(state.symbolFavorites||[]);favorites.has(entry.id)?favorites.delete(entry.id):favorites.add(entry.id);state.symbolFavorites=[...favorites];saveState();renderLibrary();});
}
function renderLibrary() {
  const host=document.getElementById("library-content");
  if(!currentLibrarySection){
    host.innerHTML=`<div class="page-title split-title"><div><p class="eyebrow">YOUR MAKING WIKI</p><h1>Library</h1><p>A flexible home for tutorials, pattern files and ideas.</p></div><button class="secondary-button" id="add-library-space">+ Custom space</button></div>
      <div class="library-home-grid">${state.librarySections.map(s=>`<button class="library-space card" data-library-space="${s.id}"><span class="library-space-count">${librarySectionCount(s)} items</span><div class="library-space-icon">${librarySectionIcon(s.id)}</div><h2>${escapeHtml(s.name)}</h2><p>${escapeHtml(s.description)}</p></button>`).join("")}</div>`;
    document.getElementById("add-library-space").onclick=()=>openLibrarySpaceModal();
  } else {
    const section=state.librarySections.find(s=>s.id===currentLibrarySection);
    if(!section){currentLibrarySection=null;return renderLibrary();}
    host.innerHTML=`<button class="text-button library-back" id="library-back">← All library spaces</button><div class="page-title split-title"><div><p class="eyebrow">PERSONAL LIBRARY</p><h1>${escapeHtml(section.name)}</h1><p>${escapeHtml(section.description)}</p></div>${section.id==="symbols"?"":`<div><button class="secondary-button" id="rename-library">Rename</button> <button class="primary-button" id="add-library-item">${section.id==="materials"?"+ Add yarn material":section.id==="ideas"?"+ Add Project Idea":"+ Add page or PDF"}</button></div>`}</div>
      ${section.id==="materials"?yarnMaterialReferenceHtml():section.id==="symbols"?symbolDatabaseHtml():section.id==="tool-manual"?toolManualHtml():section.id==="theory"?theoryFoundationHtml():section.id==="ideas"?projectIdeasHtml():""}
      <div class="notion-list">${["symbols","ideas"].includes(section.id)?"":section.items.length?section.items.map(item=>`<div class="notion-row"><div>${item.fileData||item.assets?.length?"▧":"□"}</div><div><h3>${escapeHtml(item.name)}</h3><p>${item.craft?`${escapeHtml(item.craft)} · `:""}${escapeHtml(item.notes||"No notes")}${item.assets?.length?` · ${item.assets.length} files`:item.fileName?` · ${escapeHtml(item.fileName)}`:""}</p></div><div class="row-actions">${item.fileData||item.assets?.length?`<button class="mini-button" data-open-item="${item.id}">Open files</button>`:""}<button class="mini-button danger-button" data-delete-item="${item.id}">Delete</button></div></div>`).join(""):["materials","tool-manual","theory","ideas"].includes(section.id)?"":`<div class="empty-state"><h3>This space is ready for your own pages</h3><p>Add a named section, note or PDF tutorial.</p></div>`}</div>`;
    document.getElementById("library-back").onclick=()=>{currentLibrarySection=null;renderLibrary();};
    document.getElementById("add-library-item")?.addEventListener("click",()=>section.id==="materials"?openYarnMaterialModal():section.id==="ideas"?openProjectIdeaModal():openLibraryItemModal(section.id));
    document.getElementById("rename-library")?.addEventListener("click",()=>openLibrarySpaceModal(section.id));
    document.querySelectorAll("[data-delete-item]").forEach(b=>b.onclick=()=>{section.items=section.items.filter(i=>i.id!==b.dataset.deleteItem);saveState();renderLibrary();});
    document.querySelectorAll("[data-open-item]").forEach(b=>b.onclick=()=>openLibraryAssets(section.items.find(i=>i.id===b.dataset.openItem)));
    document.querySelectorAll("[data-edit-material]").forEach(b=>b.onclick=()=>openYarnMaterialModal(b.dataset.editMaterial));
    document.querySelectorAll("[data-delete-material]").forEach(b=>b.onclick=()=>{state.yarnMaterials=state.yarnMaterials.filter(m=>m.id!==b.dataset.deleteMaterial);saveState();renderLibrary();});
    bindProjectIdeas();
    bindSymbolDatabase();
    hydrateMaterialImages();
  }
  queueMicrotask(applyLanguage);
}
function yarnMaterialReferenceHtml(){return `<div class="material-reference"><div class="material-source-note">Quick fibre comparison. Final feel also depends on spin, blend, gauge and fabric density.</div><div class="material-grid">${state.yarnMaterials.map(m=>{const r=materialRatings(m);return `<article class="material-card card">${m.imageAsset?`<img class="material-photo" data-material-image="${m.imageAsset}" alt="">`:""}<h3>${escapeHtml(m.name)}</h3><span>${escapeHtml(m.category||m.origin)}</span><div class="rating-grid"><div><small>Warmth</small><strong>${r.warmth}/5</strong></div><div><small>Drape</small><strong>${r.drape}/5</strong></div><div><small>Elasticity</small><strong>${r.elasticity}/5</strong></div><div><small>Care</small><strong>${r.care}/5</strong></div></div><dl><dt>Best season</dt><dd>${escapeHtml(m.season)}</dd><dt>Substitutions</dt><dd>${escapeHtml(r.substitutions)}</dd><dt>Best uses</dt><dd>${escapeHtml(r.uses)}</dd><dt>Texture</dt><dd>${escapeHtml((m.textures||[]).join(", ")||m.texture||"Not specified")}</dd><dt>Useful to know</dt><dd>${escapeHtml(m.features)}</dd></dl><div class="row-actions"><button class="mini-button" data-edit-material="${m.id}">Edit</button><button class="mini-button danger-button" data-delete-material="${m.id}">Delete</button></div></article>`}).join("")}</div></div>`;}
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
  openModal(`<p class="eyebrow">YARN MATERIAL</p><h2>${material?"Edit":"Add"} yarn material</h2><div class="form-grid"><div class="field full"><label>Material name</label><input id="material-name" value="${escapeHtml(material?.name||"")}"></div><div class="field"><label>Fibre group</label><select id="material-category">${["Natural","Synthetic","Blends","Other"].map(v=>`<option ${material?.category===v?"selected":""}>${v}</option>`).join("")}</select></div><div class="field"><label>Specify Other</label><input id="material-other" value="${escapeHtml(material?.otherCategory||"")}" placeholder="Required for Other"></div><div class="field full upload-drop"><label>Material photo</label><input id="material-photo" type="file" accept="image/*"><small>${material?.imageAsset?"Select a new photo to replace the current one.":"Optional reference photo."}</small></div><div class="field full"><label>Best season</label><input id="material-season" value="${escapeHtml(material?.season||"")}" placeholder="e.g. warm weather, winter, all season"></div><div class="field full"><label>Texture</label><div class="texture-checks">${textures.map(t=>`<label class="check-row"><input type="checkbox" name="material-texture" value="${t}" ${(material?.textures||[]).includes(t)?"checked":""}><span>${t}</span></label>`).join("")}</div></div><div class="field full"><label>Useful to know</label><textarea id="material-notes" rows="5">${escapeHtml(material?.features||"")}</textarea></div></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-material">Save material</button></div>`);
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
  host.innerHTML=`<div class="page-title"><p class="eyebrow">YARNCHA SETTINGS</p><h1>Settings</h1><p>Theme, local-first storage notes, and honest limits for this MVP.</p></div>
    <div class="settings-grid">
      <section class="card mobile-card settings-panel settings-wide appearance-panel"><p class="eyebrow">APPEARANCE</p><h2>Theme & design style</h2><p class="muted-copy">Pick a colour mood and an interface style independently. Changes preview immediately and are saved on this device.</p>
        <div class="appearance-heading"><h3>Colour theme</h3><button class="mini-button" id="reset-appearance">Reset default</button></div>
        <div class="appearance-grid theme-preview-grid">${themePresets.map(t=>`<button class="theme-preview-card ${activeTheme===t.id?"active":""}" data-theme-name="${t.id}" style="--preview-primary:${t.primary};--preview-secondary:${t.secondary};--preview-bg:${t.background};--preview-card:${t.card};--preview-text:${t.text};--preview-button:${t.button};--preview-highlight:${t.highlight};"><span class="theme-preview-surface"><i></i><b></b></span><strong>${escapeHtml(t.name)}</strong><small>${escapeHtml(t.background)} · ${escapeHtml(t.button)}</small><span class="swatch-row"><em></em><em></em><em></em><em></em></span></button>`).join("")}</div>
        <div class="appearance-heading"><h3>Design style</h3><span class="muted-copy">Style affects spacing, card shape, shadows, texture and overall feel.</span></div>
        <div class="appearance-grid style-preview-grid">${designStyles.map(s=>`<button class="style-preview-card ${activeStyle===s.id?"active":""}" data-style-name="${s.id}"><span class="style-sample ${s.id}"><i></i><i></i><i></i></span><strong>${escapeHtml(s.name)}</strong><small>${escapeHtml(s.desc)}</small></button>`).join("")}</div>
        <div class="appearance-heading"><h3>Mode</h3><span class="muted-copy">System follows your device setting.</span></div>
        <div class="theme-grid mode-grid">${["light","dark","system"].map(m=>`<button class="theme-choice ${state.theme.mode===m?"active":""}" data-theme-mode="${m}">${m}</button>`).join("")}</div>
      </section>
      <section class="card mobile-card settings-panel"><p class="eyebrow">UNITS</p><h2>Preferred units</h2><p class="muted-copy">Choose the unit system calculators should prefer by default.</p><div class="theme-grid mode-grid"><button class="theme-choice ${state.unitSystem!=="imperial"?"active":""}" data-unit-system="metric">UK / Metric<br><small>cm · mm · metres · grams</small></button><button class="theme-choice ${state.unitSystem==="imperial"?"active":""}" data-unit-system="imperial">US / Imperial<br><small>inches · yards · ounces</small></button></div></section>
      <section class="card mobile-card settings-panel"><p class="eyebrow">LOCAL-FIRST MVP</p><h2>Storage</h2><p>Projects, row counts, chart file references, notes, annotations, theme and onboarding state are saved locally with localStorage and IndexedDB.</p><div class="storage-status-panel"><span>Projects: <strong>${projectCount}</strong></span><span>Storage: <strong>IndexedDB + localStorage</strong></span><span>Autosave: <strong>Enabled</strong></span><span>Last saved: <strong>${lastSaved}</strong></span><span>Cloud Sync: <strong>Not Enabled</strong></span></div><div class="privacy-note">Cloud sync, auth and domain setup are deliberately paused for this production MVP pass.</div></section>
      <section class="card mobile-card settings-panel settings-wide"><p class="eyebrow">PROJECT BACKUP & MIGRATION</p><h2>Move projects manually</h2><p class="muted-copy">Use these files to move Yarncha from Safari to Chrome, another device, or a future deployed site. Backup before clearing browser data or changing devices.</p><div class="backup-actions"><select id="backup-project-select"><option value="">All projects</option>${state.projects.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("")}</select><button class="secondary-button" id="export-selected-project">Export selected</button><button class="primary-button" id="export-all-projects">Export all projects</button><button class="secondary-button" id="import-project-backup">Import backup</button><input id="settings-backup-file" type="file" accept=".json,application/json" hidden></div><div class="backup-mode"><label class="check-row"><input type="radio" name="import-mode" value="merge" checked><span>Merge imported projects with current projects</span></label><label class="check-row"><input type="radio" name="import-mode" value="replace"><span>Replace all local projects with imported backup</span></label></div></section>
      <section class="card mobile-card settings-panel settings-wide"><p class="eyebrow">UPDATES & KNOWN LIMITATIONS LOGBOOK</p><h2>Current limits and paths forward</h2><div class="limitations-list">${limitations.map(([limit,fix])=>`<article><strong>${escapeHtml(limit)}</strong><p>${escapeHtml(fix)}</p></article>`).join("")}</div></section>
    </div>`;
  document.querySelectorAll("[data-theme-name]").forEach(b=>b.onclick=()=>{state.theme.name=b.dataset.themeName;saveState();renderSettings();});
  document.querySelectorAll("[data-style-name]").forEach(b=>b.onclick=()=>{state.theme.style=b.dataset.styleName;saveState();renderSettings();});
  document.querySelectorAll("[data-theme-mode]").forEach(b=>b.onclick=()=>{state.theme.mode=b.dataset.themeMode;saveState();renderSettings();});
  document.getElementById("reset-appearance").onclick=()=>{state.theme=structuredClone(starterData.theme);saveState();renderSettings();};
  document.querySelectorAll("[data-unit-system]").forEach(b=>b.onclick=()=>{state.unitSystem=b.dataset.unitSystem;saveState();renderSettings();});
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
function openModal(html,options={}) {
  modalLastFocus=document.activeElement;
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
  document.getElementById("modal-backdrop").classList.remove("open");
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
    }else{
      const imported=parsed.state,existingIds=new Set(state.projects.map(p=>p.id));
      const projects=(imported.projects||[]).map(p=>existingIds.has(p.id)?{...p,id:`${p.id}-imported-${Date.now()}`}:{...p});
      state.projects=[...state.projects,...projects];
      state.inventory=[...state.inventory,...(imported.inventory||[])];
      state.cart=[...state.cart,...(imported.cart||[])];
      state.librarySections=mergeLibrarySections(state.librarySections,imported.librarySections||[]);
      state.yarnMaterials=[...(state.yarnMaterials||[]),...(imported.yarnMaterials||[])];
      state.techniqueKnowledge=[...(state.techniqueKnowledge||[]),...(imported.techniqueKnowledge||[])];
      state.activeProjectId=projects[0]?.id||state.activeProjectId;
    }
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
    await putProjectStateSnapshot();
    closeModal();toast("Backup imported");location.reload();
  }catch(error){toast("This backup file could not be read.");}
}
function mergeLibrarySections(current,incoming){
  const map=new Map(current.map(s=>[s.id,{...s,items:[...(s.items||[])]}]));
  for(const section of incoming){
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
    const p = { id:`p${Date.now()}`,name,type:document.getElementById("new-type").value,status:"Planning",startDate:new Date().toISOString().slice(0,10),finishDate:"",patternUrl:"",size:"",color:colors[state.projects.length%colors.length],row:0,totalRows:null,chartRows:null,started:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),notes:"",subCounters:[],markers:[],chart:null,assistantMessages:[],projectTools:{},buyList:[],pdfReference:"",attachments:[],patternPlan:{mode:"modified"},chatPreference:"ask",readerStatus:"No files analysed yet.",flowMode:true,chartMode:"og",annotations:[],annotationHistory:[],annotationRedo:[],annotationColor:"#d96572",annotationWidth:4,rowMask:null,coverAsset:null,chartAnalysis:null,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString() };
    state.projects.push(p); saveState(); closeModal(); openProject(p.id); if(files.length)handleChartFiles(files);
  };
}
function openSubCounterModal(editId=null) {
  const existing=editId?getProject().subCounters.find(s=>s.id===editId):null;
  openModal(`<p class="eyebrow">TRACK A REPEAT</p><h2>${existing?"Edit":"Add"} sub-counter</h2><div class="form-grid">
    <div class="field full"><label>Name</label><input id="sub-name" value="${escapeHtml(existing?.name||"")}" placeholder="e.g. Cable repeat"></div>
    <div class="field"><label>Link to main counter?</label><select id="sub-linked"><option value="yes" ${existing?.linked!==false?"selected":""}>Yes</option><option value="no" ${existing?.linked===false?"selected":""}>No</option></select></div>
    <div class="field"><label>Advance every X rows</label><input id="sub-every" type="number" value="${existing?.every||2}"></div></div>
    <div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="create-sub">${existing?"Save changes":"Add counter"}</button></div>`);
  document.getElementById("create-sub").onclick = () => {
    const name = document.getElementById("sub-name").value.trim(); if (!name) return toast("Name your sub-counter.");
    const values={name,linked:document.getElementById("sub-linked").value==="yes",every:Math.max(1,+document.getElementById("sub-every").value||1)};
    if(existing)Object.assign(existing,values);else getProject().subCounters.push({id:`s${Date.now()}`,count:0,...values});
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
    Object.assign(p,{name,type:editProjectField("edit-project-type").value,status:editProjectField("edit-project-status").value,startDate,finishDate,row:currentRow,totalRows,yarn:editProjectField("edit-project-yarn").value.trim(),needles:editProjectField("edit-project-tools").value.trim(),gauge:editProjectField("edit-project-gauge").value.trim(),size:editProjectField("edit-project-size").value.trim(),sizingNotes:editProjectField("edit-project-size").value.trim(),patternUrl,notes:editProjectField("edit-project-notes").value});
    const markerCount=Math.max(0,Number(editProjectField("edit-project-markers").value)||0);
    p.markers=p.markers.slice(0,markerCount);while(p.markers.length<markerCount)p.markers.push({id:`marker${Date.now()}-${p.markers.length}`,row:p.row,color:"#577fa8",label:`Marker ${p.markers.length+1}`});
    if(cover){const id=`cover${Date.now()}`;await putAsset(id,cover);p.coverAsset=id;window.YarnchaCloud?.queueCoverUpload?.(p.id,id,cover);if(oldCover&&oldCover!==id)await deleteAsset(oldCover);}
    else if(removeCover){p.coverAsset=null;if(oldCover)await deleteAsset(oldCover);}
    if(startDate)p.started=new Date(`${startDate}T00:00:00`).toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"});
    dirty=false;saveProjectTouch(p);document.getElementById("breadcrumb").textContent=p.name;closeModal(true);renderToday();renderProjects();renderProjectDetail();toast("✓ Project updated");
  };
}
function openEditRowModal(){const p=getProject();openModal(`<p class="eyebrow">ROW COUNTER</p><h2>Set exact row</h2><div class="field"><label>Current row</label><input id="exact-row" type="number" min="0" value="${p.row}"></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-exact-row">Set row</button></div>`);document.getElementById("save-exact-row").onclick=()=>{p.row=Math.max(0,+document.getElementById("exact-row").value||0);if(p.totalRows)p.row=Math.min(p.totalRows,p.row);saveState();closeModal();renderProjectDetail();};}
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
function openLibraryItemModal(sectionId){const tutorial=sectionId==="tutorials";openModal(`<p class="eyebrow">NEW LIBRARY PAGE</p><h2>Add your own resource</h2><div class="form-grid">${tutorial?`<div class="field"><label>Craft section</label><select id="item-craft"><option>Knitting</option><option>Crochet</option><option>Tunisian crochet</option><option>Weaving</option><option>Other</option></select></div><div class="field"><label>Other section name</label><input id="item-other-craft" placeholder="Required when Other is selected"></div>`:""}<div class="field full"><label>Page or section name</label><input id="item-name" placeholder="e.g. Crochet chains"></div><div class="field full"><label>Notes</label><textarea id="item-notes" rows="4"></textarea></div><div class="field full upload-drop"><label>Multiple PDFs or photos</label><input id="item-file" type="file" accept=".pdf,image/*" multiple><small>Stored in expanded browser file storage.</small></div></div><div class="modal-actions"><button class="secondary-button" onclick="closeModal()">Cancel</button><button class="primary-button" id="save-library-item">Add to library</button></div>`);document.getElementById("save-library-item").onclick=async()=>{const name=document.getElementById("item-name").value.trim(),files=[...document.getElementById("item-file").files],craft=tutorial?document.getElementById("item-craft").value:"";if(!name)return toast("Name this page.");const other=tutorial?document.getElementById("item-other-craft").value.trim():"";if(craft==="Other"&&!other)return toast("Name the Other craft section.");const assets=[];for(const file of files){const id=`libasset${Date.now()}${Math.random().toString(16).slice(2)}`;await putAsset(id,file);assets.push({id,name:file.name,type:file.type,size:file.size});}const notes=document.getElementById("item-notes").value,finalCraft=craft==="Other"?other:craft,item={id:`item${Date.now()}`,name,notes,craft:finalCraft,assets};state.librarySections.find(s=>s.id===sectionId).items.push(item);if(tutorial)state.techniqueKnowledge=[...(state.techniqueKnowledge||[]).filter(k=>k.id!==item.id),{id:item.id,name,craft:finalCraft,text:notes,assets:assets.map(a=>a.name)}];saveState();closeModal();renderLibrary();};}
function markerColor(name) {
  if(validHex(name))return name;
  const map = { red:"#c75a55",blue:"#577fa8",green:"#62856a",yellow:"#d3a93f",purple:"#84658e",pink:"#c77b91",orange:"#d27b45" };
  return map[name.toLowerCase()] || "#7a837d";
}
function speak(text) { if (!("speechSynthesis" in window)) return toast("Speech is not supported in this browser."); speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(text)); }
function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return toast("Voice control works best in Chrome or Edge.");
  recognition = new SpeechRecognition(); recognition.continuous = true; recognition.interimResults = false; recognition.maxAlternatives=1; recognition.lang = state.language==="zh-HK"?"yue-Hant-HK":"en-AU";
  recognition.onresult = e => handleVoice(e.results[e.results.length-1][0].transcript.toLowerCase().trim());
  recognition.onend = () => document.getElementById("voice-dock").classList.remove("active");
  recognition.onerror = () => toast("I couldn't access the microphone.");
  recognition.start(); document.getElementById("voice-dock").classList.add("active");
}
function handleVoice(command) {
  const p = getProject();
  if (!p) return;
  const normalized=command.toLowerCase().replace(/[.,!?，。！？]/g,"").replace(/\s+/g," ").trim();
  const english=normalized.match(/^(?:a bit of yarn|yarn assistant)\s+(.+)$/);
  const chinese=normalized.match(/^(?:一點毛線|毛線助手)\s*(.+)$/);
  const action=(english?.[1]||chinese?.[1]||normalized).trim();
  if (/^(next|next row|下一行|下一段|下一圈)$/.test(action)) { changeMainCounter(1); speak(`Row ${getProject().row}`); }
  else if (/^(start work|start project|開始|開始工作)$/.test(action)) speak(`Starting ${p.name}, row ${p.row}.`);
  else if (/^(previous|previous row|go back one row|上一行|上一段|上一圈)$/.test(action)){changeMainCounter(-1);speak(`Row ${getProject().row}`);}
  else if (/^(undo|復原|撤销|取消上一步)$/.test(action)){undoAnnotation();speak("Undone");}
  else if (/^(mark repeat|increase repeat|repeat plus|重複加一|重复加一)$/.test(action)){const s=p.subCounters[0];if(s){s.count++;saveProjectTouch(p);renderProjectDetail();speak(`${s.name} ${s.count}`);}else toast("Add a repeat counter first.");}
  else if (/^(add note|note|新增筆記|添加笔记)$/.test(action)){p.notes=`${p.notes}${p.notes?"\n":""}Voice note at row ${p.row}.`;saveProjectTouch(p);renderProjectDetail();speak("Note added");}
  else if (/^(?:go to row|前往第)\s*\d+(?:\s*行)?$/.test(action)) { const row = +action.match(/\d+/)[0]; p.row = Math.max(0,p.totalRows?Math.min(p.totalRows,row):row); saveState(); renderProjectDetail(); speak(`Going to row ${p.row}`); }
  else if (/^(?:mark|標記|标记)\s+.+/.test(action)) { const color = action.replace(/^(?:mark|標記|标记)\s+/,"").trim(); p.markers.push({id:`marker${Date.now()}`,row:p.row,color:markerColor(color),label:color}); saveState(); renderProjectDetail(); speak(`${color} marker placed at row ${p.row}`); }
  else toast('Command not matched. Try “next row”, “previous row”, “mark repeat”, “undo”, or “add note”.');
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

document.addEventListener("click", e => {
  const nav = e.target.closest("[data-view]"); if (nav) showView(nav.dataset.view);
  const go = e.target.closest("[data-go]"); if (go) showView(go.dataset.go);
  const project = e.target.closest("[data-project]"); if (project) openProject(project.dataset.project);
  const add = e.target.closest("[data-add-project]"); if (add) openProjectModal();
  const tool = e.target.closest("[data-tool]"); if (tool) { showView("tools"); renderTool(tool.dataset.tool); }
  const tab = e.target.closest("[data-tool-tab]"); if (tab) renderTool(tab.dataset.toolTab);
  const space=e.target.closest("[data-library-space]"); if(space){currentLibrarySection=space.dataset.librarySpace;renderLibrary();}
});
document.getElementById("new-project").onclick = openProjectModal;
document.getElementById("quick-add-project").onclick = openProjectModal;
document.getElementById("app-language").onchange=e=>{state.language=e.target.value;saveState();applyLanguage();};
document.querySelectorAll(".nav-item").forEach(button => {
  button.onclick = () => showView(button.dataset.view);
});
document.getElementById("modal-close").onclick = () => closeModal();
document.getElementById("modal-backdrop").onclick = e => { if (e.target.id === "modal-backdrop") closeModal(); };
document.addEventListener("keydown",event=>{
  const backdrop=document.getElementById("modal-backdrop");if(!backdrop.classList.contains("open"))return;
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
  escapeHtml
};

renderSidebar();
renderToday();
renderLibrary();
applyTheme();
applyLanguage();
refreshFxRates();
maybeShowOnboarding();
if("serviceWorker" in navigator)navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
