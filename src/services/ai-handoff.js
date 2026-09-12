(function initialiseAIHandoff(root){
  "use strict";

  const AI_PROVIDERS=Object.freeze([
    Object.freeze({id:"chatgpt",label:"ChatGPT",webUrl:"https://chatgpt.com/",handoffStrategy:"copy-and-open"}),
    Object.freeze({id:"claude",label:"Claude",webUrl:"https://claude.ai/",handoffStrategy:"copy-and-open"}),
    Object.freeze({id:"gemini",label:"Gemini",webUrl:"https://gemini.google.com/",handoffStrategy:"copy-and-open"})
  ]);

  const cleanText=(value,maxLength=800)=>String(value??"").replace(/\s+/g," ").trim().slice(0,maxLength);
  const contextStopWords=new Set(["the","and","for","with","this","that","what","when","where","which","does","have","from","into","your","you","help","find","likely","cause","about"]);
  const usefulWords=value=>(cleanText(value).toLowerCase().match(/[a-z0-9]{3,}/g)||[]).filter(word=>!contextStopWords.has(word));
  const hasValue=value=>value!==undefined&&value!==null&&cleanText(value)!=="";
  const addSection=(sections,label,value)=>{
    const text=cleanText(value);
    if(text&&!sections.some(section=>section.label===label))sections.push({label,value:text});
  };
  const assistantCraftLabel=value=>/tunisian/i.test(value)?"Tunisian Crochet":/crochet/i.test(value)?"Crochet":/knit/i.test(value)?"Knitting":cleanText(value)||"Yarn craft";
  const humanizeValue=value=>cleanText(value).replace(/-/g," ").replace(/\b\w/g,letter=>letter.toUpperCase());

  function relevantPatternExcerpt(text="",question="",currentRow=0){
    const source=String(text||"").trim();
    if(!source)return "";
    const terms=[...new Set([...usefulWords(question),currentRow?`row ${currentRow}`:"",currentRow?String(currentRow):""].filter(Boolean))];
    const chunks=source.split(/(?<=[.!?])\s+|\n+/).map(chunk=>cleanText(chunk,900)).filter(chunk=>chunk.length>12);
    const ranked=chunks.map((chunk,index)=>({chunk,index,score:terms.reduce((score,term)=>score+(chunk.toLowerCase().includes(term)?1:0),0)})).sort((a,b)=>b.score-a.score||a.index-b.index);
    return ranked[0]?.score>0?ranked[0].chunk:"";
  }

  function buildAssistantContext(projectContext={},currentRow=projectContext.currentRow,question=""){
    const q=cleanText(question,1200),lower=q.toLowerCase(),setup=projectContext.projectSetup||{},sections=[];
    const rowNumber=Number(currentRow||projectContext.currentRow)||0;
    const totalRows=projectContext.savedProgress?.totalRows||setup.rows||"";
    const asksAboutPattern=/row|round|repeat|stitch|symbol|abbrev|pattern|chart|count|mistake|drop|increase|decrease/i.test(lower);
    const asksAboutNearby=/previous|next|before|after|repeat|count|mistake|drop|increase|decrease/i.test(lower);
    const asksAboutMaterials=/gauge|swatch|size|fit|measure|yarn|fibre|fiber|needle|hook|tension|wide|narrow|large|small/i.test(lower);
    const asksAboutSymbol=/symbol|abbrev|stitch|mark|legend|mean/i.test(lower);

    addSection(sections,"Project",projectContext.projectName||"Untitled Yarncha project");
    const projectType=/^other$/i.test(cleanText(projectContext.projectType))?"":projectContext.projectType;
    addSection(sections,"Craft",[assistantCraftLabel(projectContext.craftType||setup.craft),projectType].filter(hasValue).join(" · "));
    if(rowNumber)addSection(sections,"Progress",`${/crochet|tunisian/i.test(projectContext.craftType||setup.craft)?"Round / row":"Row"} ${rowNumber}${totalRows?` of ${totalRows}`:""}`);
    if(projectContext.rowInstruction)addSection(sections,"Current row",projectContext.rowInstruction);

    const setupBits=[];
    if(setup.startStitches)setupBits.push(`Starting stitches: ${cleanText(setup.startStitches)}`);
    if(setup.patternLanguage)setupBits.push(`Pattern language: ${humanizeValue(setup.patternLanguage)}`);
    if(projectContext.readingDirection&&projectContext.readingDirection!=="auto")setupBits.push(`Reading direction: ${humanizeValue(projectContext.readingDirection)}`);
    if(asksAboutPattern&&projectContext.expectedStitchCount)setupBits.push(`Expected stitch count: ${cleanText(projectContext.expectedStitchCount)}`);
    addSection(sections,"Relevant setup",setupBits.join(" · "));

    if(asksAboutNearby&&Array.isArray(projectContext.nearbyRows)){
      const nearby=projectContext.nearbyRows.filter(row=>Number(row.number)!==rowNumber&&row.sequence).slice(0,2).map(row=>`Row ${row.number}: ${cleanText(row.sequence,360)}`);
      addSection(sections,"Nearby rows",nearby.join(" | "));
    }
    if(asksAboutSymbol)addSection(sections,"Selected symbol / stitch",[projectContext.currentSymbol,projectContext.selectedStitch].filter(hasValue).join(" · "));

    if(asksAboutMaterials){
      const materialBits=[];
      if(projectContext.patternGauge||setup.patternGauge)materialBits.push(`Gauge: ${cleanText(projectContext.patternGauge||setup.patternGauge)}`);
      if(projectContext.userGauge||setup.userGaugeStitches)materialBits.push(`User gauge: ${cleanText(projectContext.userGauge||setup.userGaugeStitches)}`);
      if(projectContext.yarnWeight||setup.yarnWeight)materialBits.push(`Yarn: ${cleanText(projectContext.yarnWeight||setup.yarnWeight)}`);
      if(projectContext.fibreContent)materialBits.push(`Fibre: ${cleanText(projectContext.fibreContent)}`);
      if(projectContext.toolSize||setup.hookNeedle)materialBits.push(`Needle / hook: ${cleanText(projectContext.toolSize||setup.hookNeedle)}`);
      addSection(sections,"Gauge and materials",materialBits.join(" · "));
      const measurements=Object.entries(projectContext.measurements||{}).filter(([,value])=>hasValue(value)&&value!=="Not checked yet").slice(0,5).map(([key,value])=>`${humanizeValue(key.replace(/Cm$/,""))}: ${cleanText(value)} cm`);
      addSection(sections,"Measurements",measurements.join(" · "));
    }

    if(asksAboutPattern){
      const excerpt=relevantPatternExcerpt(projectContext.verifiedChartText||projectContext.attachedProjectContext||projectContext.ocrText,q,rowNumber);
      addSection(sections,"Relevant pattern excerpt",excerpt);
    }

    const note=cleanText(projectContext.projectNotes,500),questionWords=usefulWords(q),noteWords=new Set(usefulWords(note));
    if(note&&(/note|reminder/i.test(lower)||questionWords.some(word=>noteWords.has(word))))addSection(sections,"Relevant project note",note);

    return Object.freeze({question:q,currentRow:rowNumber,sections:Object.freeze(sections.map(section=>Object.freeze(section)))});
  }

  function buildAssistantPrompt(preparedContext={},question=preparedContext.question||""){
    const sections=Array.isArray(preparedContext.sections)?preparedContext.sections:[];
    const lines=["You are helping me understand my knitting or crochet project in Yarncha.",""];
    sections.forEach(section=>lines.push(`${cleanText(section.label)}:`,cleanText(section.value),""));
    lines.push("My question:",cleanText(question,1200)||"I have not added my question yet.","","Please explain the likely issue clearly and practically. Do not invent missing pattern information. If something cannot be determined from the supplied context, tell me what information is missing.");
    return lines.join("\n").trim();
  }

  function getAIProvider(providerId){return AI_PROVIDERS.find(provider=>provider.id===providerId)||null;}

  async function copyAssistantPrompt(prompt,{clipboard=root.navigator?.clipboard}={}){
    const text=String(prompt||"").trim();
    if(!text)return {copied:false,error:"empty-prompt"};
    if(!clipboard?.writeText)return {copied:false,error:"clipboard-unavailable"};
    try{await clipboard.writeText(text);return {copied:true,error:""};}
    catch(error){return {copied:false,error:error?.message||"clipboard-failed"};}
  }

  function openProvider(provider,{openExternal}={}){
    const open=openExternal||((url)=>Boolean(root.open?.(url,"_blank","noopener,noreferrer")));
    try{return open(provider.webUrl)!==false;}
    catch{return false;}
  }

  async function handoffToAI({provider,prompt,clipboard,openExternal}={}){
    const destination=getAIProvider(provider);
    if(!destination)throw new Error(`Unknown AI provider: ${provider}`);
    const copyPromise=copyAssistantPrompt(prompt,{clipboard});
    const opened=openProvider(destination,{openExternal});
    const copyResult=await copyPromise;
    return {...copyResult,opened,provider:destination};
  }

  root.YarnchaAIHandoff=Object.freeze({AI_PROVIDERS,getAIProvider,buildAssistantContext,buildAssistantPrompt,copyAssistantPrompt,handoffToAI});
})(globalThis);
