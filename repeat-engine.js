(function(root){
  "use strict";
  const SCHEMA_VERSION=1;
  const repeatTypes=[
    "every-x-rows","every-xth-row","every-x-rounds","every-xth-round",
    "every-row","every-round","every-rs-row","every-ws-row",
    "every-other-row","every-alternate-row","custom"
  ];
  const units=["row","round"];
  const sides=["all","RS","WS"];
  const modes=["repeatCounter","subCounter"];
  const now=()=>new Date().toISOString();
  const whole=(value,fallback=0)=>Math.round(Number(value)||fallback);
  const nullableWhole=value=>value===""||value==null?null:whole(value,0);
  const stableId=input=>input.id||`repeat_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  function inferUnit(input={}){
    if(units.includes(input.unit))return input.unit;
    return /round/.test(String(input.repeatType||""))?"round":"row";
  }
  function inferRepeatValue(input={}){
    const type=input.repeatType;
    if(["every-row","every-round","every-rs-row","every-ws-row"].includes(type))return 1;
    if(["every-other-row","every-alternate-row"].includes(type))return 2;
    return Math.max(1,whole(input.repeatValue??input.every??input.updateEvery??1,1));
  }
  function createRepeatRule(input={}){
    const date=input.createdAt||now(),mode=modes.includes(input.mode)?input.mode:"repeatCounter";
    const repeatType=repeatTypes.includes(input.repeatType)?input.repeatType:"every-x-rows";
    const localStartValue=input.localStartValue===""||input.localStartValue==null?(mode==="subCounter"?0:null):whole(input.localStartValue,0);
    return {
      id:stableId(input),
      schemaVersion:Number(input.schemaVersion)||SCHEMA_VERSION,
      mode,
      sectionName:mode==="subCounter"?(String(input.sectionName||input.name||"").trim()||"Sub-counter"):null,
      repeatType,
      repeatValue:inferRepeatValue({...input,repeatType}),
      unit:inferUnit({...input,repeatType}),
      startAt:Math.max(0,whole(input.startAt??input.anchorRow??input.startRow??0,0)),
      endAt:nullableWhole(input.endAt),
      repeatCount:nullableWhole(input.repeatCount),
      offset:whole(input.offset,0),
      skipFirstRepeat:!!input.skipFirstRepeat,
      rowSide:sides.includes(input.rowSide)?input.rowSide:"all",
      rightSideStartsOn:["odd","even"].includes(input.rightSideStartsOn)?input.rightSideStartsOn:"odd",
      unlimitedRepeats:input.unlimitedRepeats!==false,
      localStartValue,
      sectionStartProjectPosition:nullableWhole(input.sectionStartProjectPosition),
      enabled:input.enabled!==false,
      notes:String(input.notes||""),
      source:input.source||"manual",
      linkedFeature:input.linkedFeature||"project",
      createdAt:date,
      updatedAt:input.updatedAt||date
    };
  }
  function validateRepeatRule(ruleInput={}){
    const rule=createRepeatRule(ruleInput),errors=[];
    const rawRepeatValue=Number(ruleInput.repeatValue??ruleInput.every??ruleInput.updateEvery??rule.repeatValue);
    const rawRepeatCount=ruleInput.repeatCount===""||ruleInput.repeatCount==null?null:Number(ruleInput.repeatCount);
    const rawSectionName=String(ruleInput.sectionName??ruleInput.name??"").trim();
    const rawSectionStart=ruleInput.sectionStartProjectPosition;
    if(!modes.includes(rule.mode))errors.push("Choose Repeat Counter or Sub-Counter.");
    if(!repeatTypes.includes(rule.repeatType))errors.push("Choose a repeat type.");
    if(!Number.isFinite(rawRepeatValue)||rawRepeatValue<1)errors.push("Repeat value must be at least 1.");
    if(rule.endAt!==null&&rule.startAt>rule.endAt)errors.push("Start row cannot be after the end row.");
    if(rawRepeatCount!==null&&(!Number.isFinite(rawRepeatCount)||rawRepeatCount<1))errors.push("Repeat count must be at least 1.");
    if(!sides.includes(rule.rowSide))errors.push("Choose All, RS, or WS.");
    if(rule.mode==="subCounter"){
      if(!rawSectionName)errors.push("Add a section name, such as Sleeve, Neckline, Border, or Pattern Repeat.");
      if(rawSectionStart===""||rawSectionStart==null||!Number.isFinite(Number(rawSectionStart)))errors.push("Choose where this section starts in your project.");
    }
    if(rule.repeatType==="custom")errors.push("Custom repeat patterns are reserved for a future version.");
    return {valid:errors.length===0,errors,rule};
  }
  function isRightSide(position,rule){
    const odd=position%2!==0;
    return rule.rightSideStartsOn==="even"?!odd:odd;
  }
  function sideAllowed(position,rule){
    if(rule.rowSide==="all")return true;
    const rs=isRightSide(position,rule);
    return rule.rowSide==="RS"?rs:!rs;
  }
  function cadence(rule){
    switch(rule.repeatType){
      case "every-row":
      case "every-round":
      case "every-rs-row":
      case "every-ws-row": return 1;
      case "every-other-row":
      case "every-alternate-row": return 2;
      default: return Math.max(1,rule.repeatValue);
    }
  }
  function baseTrigger(rule,position){
    if(position<rule.startAt)return false;
    if(rule.endAt!==null&&position>rule.endAt)return false;
    if(["every-xth-row","every-xth-round"].includes(rule.repeatType)){
      const adjusted=position-rule.offset;
      return adjusted>0&&adjusted%cadence(rule)===0;
    }
    const adjusted=position-rule.startAt-rule.offset;
    return adjusted>=0&&adjusted%cadence(rule)===0;
  }
  function isTriggerPosition(ruleInput={},positionInput=0){
    const rule=createRepeatRule(ruleInput),position=whole(positionInput,0);
    if(!rule.enabled)return false;
    if(["every-rs-row"].includes(rule.repeatType)&&!isRightSide(position,rule))return false;
    if(["every-ws-row"].includes(rule.repeatType)&&isRightSide(position,rule))return false;
    if(!sideAllowed(position,rule))return false;
    if(!baseTrigger(rule,position))return false;
    if(rule.skipFirstRepeat&&position===rule.startAt)return false;
    if(rule.repeatCount!==null){
      const previous=getTriggerPositions(rule,{from:rule.startAt,to:position,limit:rule.repeatCount+1});
      return previous.length<=rule.repeatCount;
    }
    return true;
  }
  function getTriggerPositions(ruleInput={},options={}){
    const rule=createRepeatRule(ruleInput),limit=Math.max(1,whole(options.limit,10)),from=Math.max(0,whole(options.from??rule.startAt,rule.startAt));
    const fallbackTo=from+(cadence(rule)*Math.max(limit*4,20))+100;
    const to=Math.max(from,whole(options.to??(rule.endAt??fallbackTo),fallbackTo)),positions=[];
    for(let position=from;position<=to&&positions.length<limit;position++){
      if(isTriggerPosition(rule,position))positions.push(position);
    }
    return positions;
  }
  function getNextTrigger(ruleInput={},currentPosition=0){
    return getTriggerPositions(ruleInput,{from:whole(currentPosition,0)+1,limit:1})[0]??null;
  }
  function getPreviousTrigger(ruleInput={},currentPosition=0){
    const rule=createRepeatRule(ruleInput),positions=getTriggerPositions(rule,{from:rule.startAt,to:whole(currentPosition,0)-1,limit:1000});
    return positions.at(-1)??null;
  }
  function projectPositionForLocal(ruleInput={},localPosition=0){
    const rule=createRepeatRule(ruleInput);
    if(rule.mode!=="subCounter"||rule.sectionStartProjectPosition===null)return localPosition;
    return rule.sectionStartProjectPosition+(whole(localPosition,0)-(rule.localStartValue??0));
  }
  function localPositionForProject(ruleInput={},projectPosition=0){
    const rule=createRepeatRule(ruleInput);
    if(rule.mode!=="subCounter"||rule.sectionStartProjectPosition===null)return projectPosition;
    return (rule.localStartValue??0)+(whole(projectPosition,0)-rule.sectionStartProjectPosition);
  }
  function formatRepeatRule(ruleInput={}){
    const rule=createRepeatRule(ruleInput),unit=rule.unit==="round"?"round":"row";
    const plural=value=>`${unit}${Number(value)===1?"":"s"}`;
    const label={
      "every-x-rows":`Every ${rule.repeatValue} ${plural(rule.repeatValue)}`,
      "every-xth-row":`Every ${rule.repeatValue}th row`,
      "every-x-rounds":`Every ${rule.repeatValue} ${plural(rule.repeatValue)}`,
      "every-xth-round":`Every ${rule.repeatValue}th round`,
      "every-row":"Every row",
      "every-round":"Every round",
      "every-rs-row":"Every RS row",
      "every-ws-row":"Every WS row",
      "every-other-row":"Every other row",
      "every-alternate-row":"Every alternate row",
      custom:"Custom repeat"
    }[rule.repeatType]||"Repeat rule";
    return rule.mode==="subCounter"&&rule.sectionName?`${rule.sectionName} · ${label}`:label;
  }
  function migrateRepeatRules(projects=[]){
    return (projects||[]).map(project=>{
      const existing=Array.isArray(project.repeatRules)?project.repeatRules.map(createRepeatRule):[];
      const byId=new Map(existing.map(rule=>[rule.id,rule]));
      for(const counter of project.subCounters||[]){
        const id=counter.repeatRuleId||`repeat-${counter.id}`;
        if(byId.has(id))continue;
        byId.set(id,createRepeatRule({
          id,
          mode:counter.mode==="repeatCounter"?"repeatCounter":"subCounter",
          sectionName:counter.sectionName||counter.name,
          repeatType:counter.repeatType||"every-x-rows",
          repeatValue:counter.repeatValue??counter.every,
          unit:counter.unit||"row",
          startAt:counter.startAt??counter.localStartValue??counter.start??0,
          sectionStartProjectPosition:counter.sectionStartProjectPosition??counter.anchorRow??0,
          localStartValue:counter.localStartValue??counter.start??0,
          rowSide:counter.rowSide||"all",
          endAt:counter.endAt,
          repeatCount:counter.repeatCount,
          offset:counter.offset,
          skipFirstRepeat:counter.skipFirstRepeat,
          unlimitedRepeats:counter.unlimitedRepeats,
          enabled:counter.enabled!==false,
          notes:counter.notes,
          source:"legacy-sub-counter",
          linkedFeature:"project",
          createdAt:counter.createdAt,
          updatedAt:counter.updatedAt
        }));
      }
      return {...project,repeatRules:[...byId.values()]};
    });
  }
  root.YarnchaRepeatEngine={SCHEMA_VERSION,repeatTypes,createRepeatRule,validateRepeatRule,getTriggerPositions,getNextTrigger,getPreviousTrigger,isTriggerPosition,formatRepeatRule,migrateRepeatRules,projectPositionForLocal,localPositionForProject};
})(typeof window!=="undefined"?window:globalThis);
