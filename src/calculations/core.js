(function(root){
  "use strict";

  const VERSION="2026.07.01-shared";
  const CM_PER_INCH=2.54;
  const YARD_PER_METER=1.09361;
  const GRAM_PER_OUNCE=28.3495;
  const TEN_CM_IN_INCHES=3.937;
  const YARN_WEIGHT_WPI=[
    {name:"Lace",min:30,max:Infinity,confidence:"medium"},
    {name:"Fingering",min:19,max:22,confidence:"high"},
    {name:"Sport",min:15,max:18,confidence:"high"},
    {name:"DK",min:12,max:14,confidence:"high"},
    {name:"Worsted",min:9,max:11,confidence:"high"},
    {name:"Aran",min:8,max:9,confidence:"medium"},
    {name:"Bulky",min:6,max:7,confidence:"high"},
    {name:"Super Bulky",min:0,max:5,confidence:"medium"}
  ];
  const SIZE_REFERENCE=root.YarnchaSizeReference||{
    scarfLengths:{neckWarmer:[60,75],oneWrap:[130,170],longWinter:[190,240],oversized:[240,280]},
    hatHeadCircumference:{baby:[40,45],child:[48,54],adultSmall:[54,56],adultMedium:[56,58],adultLarge:[58,61]},
    sockShoeSize:{child:"measure foot length",adult:"use foot circumference and foot length"},
    blanketDimensions:{lovey:[30,30],baby:[90,100],throw:[130,170],queen:[230,250],king:[270,250]},
    garmentSizeRanges:{XXS:[76,84],XS:[82,90],S:[90,98],M:[100,108],L:[110,118],XL:[122,132],XXL:[132,142]},
    bagSizeExamples:{pouch:[18,14],tote:[36,38],market:[42,42]},
    shawlDimensions:{small:[120,45],everyday:[170,70],large:[210,90]}
  };

  function n(value,fallback=0){
    if(typeof value==="string"){
      const match=value.match(/-?\d+(?:\.\d+)?/);
      if(match)return Number(match[0]);
    }
    const number=Number(value);
    return Number.isFinite(number)?number:fallback;
  }
  function positive(value,fallback=1){return Math.max(0.0001,n(value,fallback));}
  function round(value,digits=2){const factor=10**digits;return Math.round((Number(value)||0)*factor)/factor;}
  function whole(value){return Math.round(Number(value)||0);}
  function safeCeil(value){return Math.ceil(Math.max(0,Number(value)||0));}
  function roundToRepeat(value,repeatMultiple=0,edgeStitches=0){
    const repeat=Math.round(n(repeatMultiple,0));
    const edge=Math.max(0,Math.round(n(edgeStitches,0)));
    if(repeat>0)return Math.round((Number(value||0)-edge)/repeat)*repeat+edge;
    return Math.round(Number(value)||0);
  }
  function calculateGauge({stitches=20,rows=28,widthCm=10,heightCm=10}={}){
    const width=positive(widthCm,10),height=positive(heightCm,width),st=positive(stitches,20),rw=positive(rows,28);
    return {stitchesPerCm:st/width,rowsPerCm:rw/height,stitchCm:width/st,rowCm:height/rw};
  }
  function calculateTargetStitches({targetWidthCm=0,stitchesPerCm=0,repeatMultiple=0,edgeStitches=0}={}){
    const raw=n(targetWidthCm)*n(stitchesPerCm);
    return {raw,adjusted:roundToRepeat(raw,repeatMultiple,edgeStitches)};
  }
  function calculateTargetRows({targetLengthCm=0,rowsPerCm=0}={}){
    return {targetRows:Math.round(n(targetLengthCm)*n(rowsPerCm))};
  }
  function calculateSwatchYarnDensity({swatchWidthCm=0,swatchHeightCm=0,swatchWeightGrams=0}={}){
    const area=n(swatchWidthCm)*n(swatchHeightCm);
    return {gramsPerCm2:area>0?n(swatchWeightGrams)/area:0,swatchAreaCm2:area};
  }
  function calculateAreaYarnEstimate({targetAreaCm2=0,gramsPerCm2=0,safetyMargin=1.1}={}){
    return {estimatedGrams:n(targetAreaCm2)*n(gramsPerCm2)*n(safetyMargin,1.1)};
  }
  function gaugeFromSetup(setup={}){
    const parsed=String(setup.patternGauge||"").match(/\d+(?:\.\d+)?/g)?.map(Number)||[];
    const widthCm=positive(setup.gaugeWidthCm||parsed[2]||10,10);
    const heightCm=positive(setup.gaugeHeightCm||parsed[2]||widthCm,10);
    const patternStitches=n(setup.patternGaugeStitches||parsed[0],20);
    const patternRows=n(setup.patternGaugeRows||parsed[1],28);
    const userHasGauge=n(setup.userGaugeStitches)>0&&n(setup.userGaugeRows)>0;
    const userStitches=userHasGauge?n(setup.userGaugeStitches):patternStitches;
    const userRows=userHasGauge?n(setup.userGaugeRows):patternRows;
    const pattern=calculateGauge({stitches:patternStitches,rows:patternRows,widthCm,heightCm});
    const user=calculateGauge({stitches:userStitches,rows:userRows,widthCm,heightCm});
    return {gaugeWidthCm:widthCm,gaugeHeightCm:heightCm,patternGaugeStitches:patternStitches,patternGaugeRows:patternRows,userGaugeStitches:userStitches,userGaugeRows:userRows,hasUserGauge:userHasGauge,stitchesPerCm:user.stitchesPerCm,rowsPerCm:user.rowsPerCm,patternStitchesPerCm:pattern.stitchesPerCm,patternRowsPerCm:pattern.rowsPerCm,stitchCm:user.stitchCm,rowCm:user.rowCm};
  }
  function calculateGaugeSwatchPlan(input={}){
    const pattern=calculateGauge({stitches:input.patternStitches,rows:input.patternRows,widthCm:input.patternWidthCm||10,heightCm:input.patternHeightCm||input.patternWidthCm||10});
    const user=calculateGauge({stitches:input.userStitches,rows:input.userRows,widthCm:input.userWidthCm||10,heightCm:input.userHeightCm||input.userWidthCm||10});
    const adjustedStitches=n(input.desiredWidthCm)*user.stitchesPerCm;
    const adjustedRows=n(input.desiredLengthCm)*user.rowsPerCm;
    const adjustedPatternStitches=n(input.originalPatternStitchCount||input.patternCount)*(user.stitchesPerCm/pattern.stitchesPerCm);
    const adjustedPatternRows=n(input.originalPatternRowCount||input.patternRowCount)*(user.rowsPerCm/pattern.rowsPerCm);
    return {patternStitchesPerCm:pattern.stitchesPerCm,patternRowsPerCm:pattern.rowsPerCm,userStitchesPerCm:user.stitchesPerCm,userRowsPerCm:user.rowsPerCm,adjustedStitches,adjustedRows,adjustedPatternStitches,adjustedPatternRows};
  }
  function calculateCastOn({targetWidthCm=0,stitchesPerCm=0,stitchRepeatMultiple=0,edgeStitches=0,craft="knitting",turningChain=1}={}){
    const target=calculateTargetStitches({targetWidthCm,stitchesPerCm,repeatMultiple:stitchRepeatMultiple,edgeStitches});
    const crochet=/crochet/i.test(craft);
    return {castOnStitches:target.adjusted,startingChain:crochet?target.adjusted+n(turningChain,1):0,repeatAdjustedResult:target.adjusted,rawStitches:target.raw};
  }
  function calculateIncreaseDecrease({currentStitches=0,targetStitches=0,craft="knitting"}={}){
    const current=Math.max(1,whole(currentStitches)),target=Math.max(0,whole(targetStitches)),difference=target-current;
    const count=Math.abs(difference),spacing=count?current/count:0,action=difference>0?"increase":difference<0?"decrease":"same";
    const stitch=/crochet/i.test(craft)?"sc":"K";
    const shaping=/crochet/i.test(craft)?"inc":"M1";
    const pattern=action==="same"?"No shaping needed.":action==="increase"?`(${stitch} ${Math.max(1,Math.floor(spacing))}, ${shaping}) repeat around.`:`(${stitch} ${Math.max(1,Math.floor(spacing))}, ${/crochet/i.test(craft)?"dec":"k2tog"}) repeat around.`;
    return {difference,increaseCount:difference>0?count:0,decreaseCount:difference<0?count:0,spacing,action,distributionPattern:pattern,friendly:action==="same"?"No shaping needed.":`${action==="increase"?"Increase":"Decrease"} 1 stitch about every ${Math.max(1,Math.round(spacing))} stitches.`};
  }
  function calculateRepeat({totalStitches=0,repeatStitches=1,edgeStitches=0}={}){
    const total=Math.max(0,whole(totalStitches)),repeat=Math.max(1,whole(repeatStitches)),edge=Math.max(0,whole(edgeStitches));
    const usable=Math.max(0,total-edge),repeatCount=Math.floor(usable/repeat),remainingStitches=usable%repeat;
    return {usableStitches:usable,repeatCount,remainingStitches,suggestedAdjustment:remainingStitches?`Adjust by ${repeat-remainingStitches} stitch(es) to fit one more repeat.`:"Your repeat fits evenly."};
  }
  function calculateRowProgress({totalRows=0,currentRow=0}={}){
    const total=Math.max(1,whole(totalRows)),current=Math.max(0,whole(currentRow)),milestones=[.25,.5,.75,1].map(p=>Math.round(total*p));
    const nextMilestone=milestones.find(row=>row>current)||total;
    return {currentProgress:round(Math.min(100,current/total*100),1),rowsRemaining:Math.max(0,total-current),nextMilestone,milestoneRows:{quarter:milestones[0],half:milestones[1],threeQuarter:milestones[2],complete:milestones[3]}};
  }
  function calculateToolAdjustment({patternGaugeStitchesPer10cm=0,userGaugeStitchesPer10cm=0}={}){
    const pattern=n(patternGaugeStitchesPer10cm),user=n(userGaugeStitchesPer10cm);
    const suggestedDirection=user>pattern?"larger":user<pattern?"smaller":"same";
    const explanation=suggestedDirection==="same"?"Your stitch gauge is close. Swatch again if the fabric feels wrong.":`Try a slightly ${suggestedDirection} hook/needle and swatch again.`;
    return {suggestedDirection,explanation};
  }
  function calculateYarnSubstitution(input={}){
    const substituteMetersPerGram=positive(input.substituteMetersPer100g,100)/100;
    const substituteGramsNeeded=positive(input.requiredMeters,1)/substituteMetersPerGram;
    const skeinGrams=positive(input.substituteSkeinGrams||input.requiredGrams||100,100);
    const skeinsNeeded=Math.ceil(substituteGramsNeeded/skeinGrams);
    const lengthDifferencePercent=((n(input.substituteMetersPer100g)-positive(input.patternMetersPer100g,100))/positive(input.patternMetersPer100g,100))*100;
    const warnings=[];
    if(Math.abs(lengthDifferencePercent)>15)warnings.push(lengthDifferencePercent>0?"Substitute yarn may be thinner. Gauge swatch recommended.":"Substitute yarn may be thicker. Finished size may change.");
    warnings.push("Gauge swatch recommended.");
    return {substituteMetersPerGram,substituteGramsNeeded,skeinsNeeded,lengthDifferencePercent,warnings};
  }
  function calculateYarnEstimate(input={}){
    const density=calculateSwatchYarnDensity({swatchWidthCm:input.swatchWidthCm,swatchHeightCm:input.swatchHeightCm,swatchWeightGrams:input.swatchWeightGrams});
    const margin=n(input.safetyMargin,1.1);
    const estimated=calculateAreaYarnEstimate({targetAreaCm2:input.projectAreaCm2,gramsPerCm2:density.gramsPerCm2,safetyMargin:margin});
    return {...density,...estimated,skeinsNeeded:input.skeinWeightGrams?Math.ceil(estimated.estimatedGrams/positive(input.skeinWeightGrams,100)):0};
  }
  function calculatePatternYarnEstimate(input={}){
    const margin={Blanket:.2,Sweater:.18,"Hat / beanie":.12,Scarf:.12,"Socks pair":.12,Amigurumi:.12,Shawl:.18,"Gloves pair":.12,"Custom dimension":.15}[input.kind]??.15;
    const modifiedAmount=positive(input.patternAmount,1)*(1+n(input.modificationPercent,0)/100),withSafety=modifiedAmount*(1+margin),suggestedSkeinsTotal=Math.ceil(withSafety/positive(input.lengthPerSkein,1)),skeinsToBuy=Math.max(0,suggestedSkeinsTotal-Math.max(0,whole(input.ownedSkeins)));
    return {modifiedAmount,withSafety,suggestedSkeinsTotal,skeinsToBuy,estimatedLeftover:suggestedSkeinsTotal*positive(input.lengthPerSkein,1)-withSafety,estimatedWeight:withSafety/positive(input.lengthPerSkein,1)*positive(input.weightPerSkein,100),safetyMargin:margin};
  }
  function calculateYarnLeftover({originalSkeinWeightGrams=100,originalSkeinLengthMeters=200,leftoverWeightGrams=0}={}){
    const metersPerGram=positive(originalSkeinLengthMeters,200)/positive(originalSkeinWeightGrams,100),leftoverMeters=n(leftoverWeightGrams)*metersPerGram;
    const suggestions=leftoverMeters>=400?["shawl section","large scarf"]:leftoverMeters>=200?["hat","small scarf"]:leftoverMeters>=80?["stripes","granny squares"]:["pom-pom","seaming"];
    return {leftoverMeters,leftoverYards:leftoverMeters*YARD_PER_METER,possibleProjectSuggestions:suggestions};
  }
  function calculateYarnWeight({WPI,wpi,metersPer100g,wrapsPerCm}={}){
    const wraps=n(WPI||wpi||0)||n(wrapsPerCm,0)*2.54;
    let match=wraps>0?YARN_WEIGHT_WPI.find(row=>wraps>=row.min&&wraps<=row.max):null;
    if(!match&&n(metersPer100g)>0){
      const meters=n(metersPer100g);
      match=meters>=600?YARN_WEIGHT_WPI[0]:meters>=430?YARN_WEIGHT_WPI[1]:meters>=300?YARN_WEIGHT_WPI[2]:meters>=210?YARN_WEIGHT_WPI[3]:meters>=140?YARN_WEIGHT_WPI[4]:meters>=90?YARN_WEIGHT_WPI[6]:YARN_WEIGHT_WPI[7];
    }
    match=match||{name:"Unknown",confidence:"low"};
    return {estimatedYarnWeight:match.name,confidence:match.confidence||"low",friendlyNote:"Yarn categories vary by brand. Swatching gives the best result."};
  }
  function convertUnit({amount=0,from="",to=""}={}){
    const value=n(amount),fromUnit=String(from)==="in"?"inch":String(from),toUnit=String(to)==="in"?"inch":String(to);
    const direct={
      "cm:inch":value/CM_PER_INCH,"inch:cm":value*CM_PER_INCH,
      "mm:inch":value/10/CM_PER_INCH,"inch:mm":value*CM_PER_INCH*10,
      "m:yd":value*YARD_PER_METER,"yd:m":value/YARD_PER_METER,
      "g:oz":value/GRAM_PER_OUNCE,"oz:g":value*GRAM_PER_OUNCE,
      "stitchesPer10cm:stitchesPerInch":value/TEN_CM_IN_INCHES,"stitchesPerInch:stitchesPer10cm":value*TEN_CM_IN_INCHES,
      "rowsPer10cm:rowsPerInch":value/TEN_CM_IN_INCHES,"rowsPerInch:rowsPer10cm":value*TEN_CM_IN_INCHES
    };
    const key=`${fromUnit}:${toUnit}`;
    if(Object.prototype.hasOwnProperty.call(direct,key))return {convertedValue:direct[key]};
    if(fromUnit==="mm"&&toUnit==="usTool")return {convertedValue:nearestUsTool(value)};
    return {convertedValue:value};
  }
  function nearestUsTool(mm){
    const tools=[["US 0",2],["US 1",2.25],["US 2",2.75],["US 3",3.25],["US 4",3.5],["US 5",3.75],["US 6",4],["US 7",4.5],["US 8",5],["US 9",5.5],["US 10",6],["US 10.5",6.5],["US 11",8],["US 13",9],["US 15",10]];
    return tools.reduce((best,item)=>Math.abs(item[1]-mm)<Math.abs(best[1]-mm)?item:best,tools[0])[0];
  }
  function calculateCircle({startingStitches=6,roundNumber,rounds,method="standard",stitchType="SC"}={}){
    const start=Math.max(1,whole(startingStitches)),roundNo=Math.max(1,whole(roundNumber||rounds||1)),totalStitches=start*roundNo,increaseCount=roundNo===1?0:start;
    let instruction;
    if(roundNo===1)instruction=`Magic ring, ${start} ${stitchType}. (${totalStitches} sts)`;
    else if(roundNo===2)instruction=`INC in every stitch. (${totalStitches} sts)`;
    else {
      const before=roundNo-2;
      if(/smooth/i.test(method)&&roundNo>=5&&roundNo%2===1){
        const front=Math.floor(before/2),back=before-front;
        instruction=`Work ${front} ${stitchType}, then 1 INC, then ${before} ${stitchType}, 1 INC repeat around, ending with the remaining ${back} ${stitchType} as needed. (${totalStitches} sts)`;
      }else instruction=`${before} ${stitchType}, 1 INC repeat around. (${totalStitches} sts)`;
    }
    return {method:/smooth/i.test(method)?"Improved smoother circle":method,totalStitches,increaseCount,instruction,note:/smooth/i.test(method)?"This staggers the increases so they do not stack in the same place.":""};
  }
  function calculateGrannySquare({targetWidthCm=0,targetLengthCm=0,squareSizeCm=10,joiningAllowanceCm=0,borderWidthCm=0}={}){
    const effectiveSquareSize=positive(squareSizeCm,10)+n(joiningAllowanceCm);
    const squaresAcross=Math.ceil(positive(targetWidthCm,1)/effectiveSquareSize),squaresDown=Math.ceil(positive(targetLengthCm,1)/effectiveSquareSize);
    return {effectiveSquareSize,squaresAcross,squaresDown,totalSquares:squaresAcross*squaresDown,actualWidth:squaresAcross*effectiveSquareSize+n(borderWidthCm)*2,actualLength:squaresDown*effectiveSquareSize+n(borderWidthCm)*2,actualFinishedSize:`${round(squaresAcross*effectiveSquareSize+n(borderWidthCm)*2,1)} x ${round(squaresDown*effectiveSquareSize+n(borderWidthCm)*2,1)} cm`};
  }
  function calculateC2CBlanket({targetWidthCm=0,targetLengthCm=0,blockWidthCm=2.5,blockHeightCm=2.5}={}){
    const blocksAcross=Math.max(1,Math.round(positive(targetWidthCm,1)/positive(blockWidthCm,2.5))),blocksDown=Math.max(1,Math.round(positive(targetLengthCm,1)/positive(blockHeightCm,2.5)));
    const increaseRows=Math.min(blocksAcross,blocksDown),middleRows=Math.abs(blocksAcross-blocksDown),decreaseRows=Math.min(blocksAcross,blocksDown);
    return {blocksAcross,blocksDown,increaseRows,middleRows,decreaseRows,totalRows:increaseRows+middleRows+decreaseRows,totalBlocks:blocksAcross*blocksDown};
  }
  function calculateAmigurumiPlan(input={}){
    const gauge=input.gauge||{},stitchesPerCm=n(input.stitchesPerCm||gauge.stitchesPerCm,2),rowsPerCm=n(input.rowsPerCm||gauge.rowsPerCm,2.8),shape=String(input.shape||"sphere").toLowerCase();
    let maxStitchCount=0,estimatedRounds=0,shapingSuggestion="";
    if(shape==="cylinder"){maxStitchCount=whole(n(input.circumferenceCm,Math.PI*n(input.diameterCm,8))*stitchesPerCm);estimatedRounds=whole(n(input.heightCm,12)*rowsPerCm);shapingSuggestion="Work a flat base, then continue even for the body.";}
    else if(shape==="cone"){maxStitchCount=whole(n(input.baseDiameterCm,8)*Math.PI*stitchesPerCm);estimatedRounds=whole(n(input.heightCm,12)*rowsPerCm);shapingSuggestion="Decrease gradually from base to tip.";}
    else if(shape==="oval"){maxStitchCount=whole(Math.PI*((n(input.widthCm,10)+n(input.heightCm,7))/2)*stitchesPerCm);estimatedRounds=whole(n(input.heightCm,7)*rowsPerCm);shapingSuggestion="Use two rounded ends with straight side stitches.";}
    else {maxStitchCount=whole(n(input.diameterCm,10)*Math.PI*stitchesPerCm);estimatedRounds=whole(n(input.diameterCm,10)*rowsPerCm);shapingSuggestion="Increase to the widest round, work even, then decrease to close.";}
    return {maxStitchCount,estimatedRounds,shapingSuggestion};
  }
  function calculateHatPlan(input={}){
    const gauge=input.gauge||calculateGauge({stitches:input.stitchGauge||20,rows:input.rowGauge||28,widthCm:10,heightCm:10});
    const ease=Number.isFinite(Number(input.negativeEasePercent))?Number(input.negativeEasePercent)/100:({snug:.12,fitted:.10,regular:.08,relaxed:.04,slouchy:.02}[String(input.easePreference||input.hatStyle||"regular").toLowerCase()]??.08);
    const castOn=roundToRepeat(n(input.headCircumferenceCm,56)*(1-ease)*gauge.stitchesPerCm,2,0),totalRows=whole(n(input.hatDepthCm,22)*gauge.rowsPerCm),brimRows=whole(n(input.brimDepthCm,5)*gauge.rowsPerCm),crownDecreaseRows=Math.max(1,Math.round(totalRows*.28));
    return {castOn,totalRows,brimRows,crownDecreaseRows,estimatedYarn:whole(n(input.headCircumferenceCm,56)*n(input.hatDepthCm,22)*.12)};
  }
  function calculateSockPlan(input={}){
    const gauge=input.gauge||calculateGauge({stitches:input.stitchGauge||30,rows:input.rowGauge||42,widthCm:10,heightCm:10});
    const ease=n(input.negativeEasePercent,8)/100,foot=n(input.footLengthCm||input.footLength,24),leg=n(input.legHeightCm,18),cuff=n(input.cuffHeightCm,5),toe=n(input.toeLengthCm,4.5);
    const sockStitches=roundToRepeat(n(input.footCircumferenceCm||input.footCircumference,22)*(1-ease)*gauge.stitchesPerCm,4,0);
    return {sockStitches,heelStitches:whole(sockStitches/2),instepStitches:whole(sockStitches/2),footBeforeToeCm:round(Math.max(0,foot-toe),1),legRows:whole(leg*gauge.rowsPerCm),cuffRows:whole(cuff*gauge.rowsPerCm),estimatedYarn:whole(sockStitches*(foot+leg)*.08)};
  }
  function calculateBlanketPlan(input={}){
    const gauge=input.gauge||calculateGauge({stitches:input.stitchGauge||16,rows:input.rowGauge||20,widthCm:10,heightCm:10});
    const width=n(input.widthCm||input.width,100),length=n(input.lengthCm||input.length,140),border=n(input.borderWidthCm,0),targetArea=width*length,borderArea=(width+2*border)*(length+2*border)-targetArea;
    const density=input.gramsPerCm2||n(input.yarnPerTenByTen,12)/100;
    return {blanketStitches:whole(width*gauge.stitchesPerCm),blanketRows:whole(length*gauge.rowsPerCm),finishedSize:`${round(width+2*border,1)} x ${round(length+2*border,1)} cm`,borderArea,estimatedYarn:whole((targetArea+borderArea)*density*n(input.safetyMargin,1.2))};
  }
  function calculateSleevePlan(input={}){
    const cuffStitches=whole(n(input.cuffCircumferenceCm,18)*n(input.stitchesPerCm,2)),upperSleeveStitches=whole(n(input.upperArmCircumferenceCm,32)*n(input.stitchesPerCm,2)),difference=upperSleeveStitches-cuffStitches,totalRows=whole(n(input.sleeveLengthCm,48)*n(input.rowsPerCm,2.8)),perRow=positive(input.increaseOrDecreasePerShapingRow,2),increaseRowsNeeded=Math.abs(difference)/perRow;
    return {cuffStitches,upperSleeveStitches,totalRows,increaseEveryRows:increaseRowsNeeded?round(totalRows/increaseRowsNeeded,1):0};
  }
  function calculateSleeveStitchShaping({startStitches=0,endStitches=0,rowsAvailable=0,stitchesChangedPerShapingRow=1}={}){
    const start=whole(startStitches),end=whole(endStitches),rows=positive(rowsAvailable,1),change=Math.abs(end-start),perRow=positive(stitchesChangedPerShapingRow,1),shapingRowsNeeded=change/perRow;
    return {action:end>start?"increase":end<start?"decrease":"same",stitchChange:change,shapingRowsNeeded,rowsBetweenShaping:shapingRowsNeeded?round(rows/shapingRowsNeeded,2):0};
  }
  function calculateRaglanPlan(input={}){
    const neck=n(input.neckStitches,88),body=n(input.bodyStitches,160),sleeveEach=n(input.sleeveStitchesEach,50),raglanLines=n(input.raglanLines,4),increaseRate=n(input.increaseRate,8);
    const targetYokeStitches=body+sleeveEach*2+raglanLines,neededIncreaseStitches=Math.max(0,targetYokeStitches-neck),increaseRoundsNeeded=Math.ceil(neededIncreaseStitches/increaseRate);
    return {frontStitches:whole(neck*.35),backStitches:whole(neck*.35),sleeveStitches:whole(neck*.15),raglanIncreaseRounds:increaseRoundsNeeded,estimatedYokeDepth:increaseRoundsNeeded*2};
  }
  function calculateGarmentResize(input={}){
    const widthScale=positive(input.targetWidthCm,1)/positive(input.originalWidthCm,1),lengthScale=positive(input.targetLengthCm,1)/positive(input.originalLengthCm,1);
    const gauge=input.gauge;
    const resizedStitches=gauge?.stitchesPerCm?positive(input.targetWidthCm,1)*gauge.stitchesPerCm:n(input.originalStitches)*widthScale;
    const resizedRows=gauge?.rowsPerCm?positive(input.targetLengthCm,1)*gauge.rowsPerCm:n(input.originalRows)*lengthScale;
    return {resizedStitches:whole(resizedStitches),resizedRows:whole(resizedRows),widthScalePercent:round(widthScale*100,1),lengthScalePercent:round(lengthScale*100,1),warning:Math.abs(widthScale-1)>.2||Math.abs(lengthScale-1)>.2?"Scale changes more than 20%; check shaping and fit.":""};
  }
  function calculateGarmentSectionResize(input={}){
    const originalStitches=positive(input.originalStitches,1),desiredStitches=positive(input.desiredStitches,1),repeatMultiple=Math.max(1,whole(input.repeatMultiple||1)),left=Math.max(0,whole(input.leftSection)),centre=Math.max(0,whole(input.centreSection)),right=Math.max(0,whole(input.rightSection)),sectionTotal=left+centre+right;
    const compatibleTotal=input.keepMultiple===false?whole(desiredStitches):Math.max(repeatMultiple,Math.round(desiredStitches/repeatMultiple)*repeatMultiple);
    let newLeft=sectionTotal?whole(compatibleTotal*left/sectionTotal):0,newRight=sectionTotal?whole(compatibleTotal*right/sectionTotal):0,newCentre=compatibleTotal-newLeft-newRight;
    if(input.keepSymmetry!==false){
      const side=Math.max(0,Math.round(((newLeft+newRight)/2)/repeatMultiple)*repeatMultiple);
      newLeft=side;newRight=side;newCentre=compatibleTotal-newLeft-newRight;
      if(newCentre<0){newLeft=newRight=Math.floor(compatibleTotal/3);newCentre=compatibleTotal-newLeft-newRight;}
    }
    return {scaleRatio:desiredStitches/originalStitches,left:newLeft,centre:newCentre,right:newRight,total:newLeft+newCentre+newRight};
  }
  function calculateBlocking(input={}){
    const widthGrowthPercent=((n(input.afterWidthCm)-positive(input.beforeWidthCm,1))/positive(input.beforeWidthCm,1))*100,lengthGrowthPercent=((n(input.afterLengthCm)-positive(input.beforeLengthCm,1))/positive(input.beforeLengthCm,1))*100;
    const currentWidth=n(input.currentWidthCm||input.targetWidthCm||input.beforeWidthCm),currentLength=n(input.currentLengthCm||input.targetLengthCm||input.beforeLengthCm);
    const predictedWidth=currentWidth*(1+widthGrowthPercent/100),predictedLength=currentLength*(1+lengthGrowthPercent/100);
    return {widthGrowthPercent,lengthGrowthPercent,predictedWidth,predictedLength,warning:"Compare this with your target size before binding off."};
  }
  function calculateGridPlan({widthStitches=0,heightRows=0,cellSize=1,colours=1}={}){
    const columns=whole(widthStitches),rows=whole(heightRows);
    return {columns,rows,cellSize:n(cellSize,1),colours:whole(colours),totalCells:columns*rows,gridDimensions:`${columns} x ${rows}`};
  }
  function calculateStripePlan({totalRows=0,stripeRows=1,colourSequence=[]}={}){
    const total=Math.max(1,whole(totalRows)),stripe=Math.max(1,whole(stripeRows)),colors=Array.isArray(colourSequence)&&colourSequence.length?colourSequence:["A","B"],stripeCount=Math.ceil(total/stripe);
    const stripeList=Array.from({length:stripeCount},(_,i)=>({stripe:i+1,colour:colors[i%colors.length],rows:Math.min(stripe,total-i*stripe)}));
    const rowsPerColour={};stripeList.forEach(item=>rowsPerColour[item.colour]=(rowsPerColour[item.colour]||0)+item.rows);
    const colourUsagePercentage=Object.fromEntries(Object.entries(rowsPerColour).map(([key,value])=>[key,round(value/total*100,1)]));
    return {stripeCount,stripeList,rowsPerColour,colourUsagePercentage};
  }
  function calculateColourPooling({yarnColourRepeatLengthCm=1,stitchLengthCm=1,stitchesPerRow=1}={}){
    const rowLengthCm=positive(stitchLengthCm,1)*positive(stitchesPerRow,1),poolingOffset=rowLengthCm%positive(yarnColourRepeatLengthCm,1);
    const result=poolingOffset===0?"Your colours may stack neatly.":poolingOffset<positive(yarnColourRepeatLengthCm,1)*.18?"Your colours may pool diagonally.":"Your colours may shift slightly each row.";
    return {rowLengthCm,poolingOffset,result};
  }
  function calculateScarfPlan(input={}){const gauge=input.gauge||gaugeFromSetup(input);const width=n(input.widthCm||input.width,22),length=n(input.lengthCm||input.length,160);return {...calculateCastOn({targetWidthCm:width,stitchesPerCm:gauge.stitchesPerCm,stitchRepeatMultiple:input.stitchRepeatMultiple,edgeStitches:input.edgeStitches,craft:input.craft}),stitchCount:whole(width*gauge.stitchesPerCm),rowCount:whole(length*gauge.rowsPerCm),widthCm:width,lengthCm:length,estimatedYarn:whole(width*length*.12)};}
  function calculateBagPlan(input={}){const gauge=input.gauge||gaugeFromSetup(input);const width=n(input.widthCm||input.width,36),height=n(input.heightCm||input.height,38),depth=n(input.depthCm||input.depth,8);return {stitchCount:whole(width*gauge.stitchesPerCm),rowCount:whole(height*gauge.rowsPerCm),widthCm:width,lengthCm:height,volumeCm3:whole(width*height*depth),estimatedYarn:whole((2*width*height+2*height*depth+width*depth)*.12)};}
  function calculateShawlPlan(input={}){const gauge=input.gauge||gaugeFromSetup(input);const wingspan=n(input.wingspanCm||input.wingspan,170),depth=n(input.depthCm||input.height,70),area=wingspan*depth/2;return {stitchCount:whole(wingspan*gauge.stitchesPerCm),rowCount:whole(depth*gauge.rowsPerCm),widthCm:wingspan,lengthCm:depth,totalRows:whole(depth*gauge.rowsPerCm),estimatedYarn:whole(area*.12)};}
  function calculateGarmentPlan(input={}){const gauge=input.gauge||gaugeFromSetup(input);const chest=n(input.chestCm||input.chest,100),ease=n(input.easeCm,8),body=n(input.bodyLengthCm||input.body,58),sleeve=n(input.sleeveLengthCm||input.sleeve,48),targetChest=chest+ease,bodyStitches=whole(targetChest*gauge.stitchesPerCm);const sleevePlan=calculateSleevePlan({cuffCircumferenceCm:input.wristCircumferenceCm||18,upperArmCircumferenceCm:input.upperArmCircumferenceCm||32,sleeveLengthCm:sleeve,stitchesPerCm:gauge.stitchesPerCm,rowsPerCm:gauge.rowsPerCm});return {stitchCount:bodyStitches,rowCount:whole(body*gauge.rowsPerCm),widthCm:targetChest,lengthCm:body,bodyLengthCm:body,sleeveLengthCm:sleeve,bodyStitches,backStitches:whole(bodyStitches/2),frontPanelStitches:whole(bodyStitches/4),...sleevePlan,estimatedYarn:whole(targetChest*(body+sleeve)*.12)};}
  function calculateProjectPlan(project={},setup={}){
    const s={...setup},g=gaugeFromSetup(s),d=s.itemDetails||{},type=s.projectType||"Other";
    const yarnDensity=calculateSwatchYarnDensity({swatchWidthCm:s.swatchWidthCm,swatchHeightCm:s.swatchHeightCm,swatchWeightGrams:s.swatchWeightGrams}).gramsPerCm2||.12;
    const base={gauge:g,estimateOnly:!g.hasUserGauge,safetyMargin:type==="Amigurumi"?1.2:["Top","Cardigan","Jumper / Sweater","Vest","Dress"].includes(type)?1.15:1.1,warnings:[]};
    if(base.estimateOnly)base.warnings.push("Yarncha needs your gauge to give a more accurate size estimate.");
    let plan;
    if(type==="Scarf")plan=calculateScarfPlan({...s,...d,gauge:g});
    else if(type==="Socks")plan=calculateSockPlan({...s,...d,gauge:g,footCircumferenceCm:d.footCircumference,footLengthCm:d.footLength,legHeightCm:d.desiredLegHeight||18,cuffHeightCm:d.cuffHeight});
    else if(type==="Hat / Beanie")plan=calculateHatPlan({...s,...d,gauge:g,headCircumferenceCm:d.headCircumference,hatDepthCm:d.hatDepth,brimDepthCm:d.brimDepth});
    else if(type==="Bag"){plan=calculateBagPlan({...s,...d,gauge:g});if(/market/i.test(d.bagType)||/soft/i.test(d.structure))base.warnings.push("This bag may stretch when filled. Consider a firmer stitch, lining, or smaller hook.");}
    else if(type==="Blanket")plan=calculateBlanketPlan({...s,...d,gauge:g,widthCm:d.width||130,lengthCm:d.length||170,borderWidthCm:d.borderWidth,gramsPerCm2:yarnDensity,safetyMargin:base.safetyMargin});
    else if(type==="Amigurumi")plan=calculateAmigurumiPlan({...s,...d,gauge:g,stitchesPerCm:g.stitchesPerCm,rowsPerCm:g.rowsPerCm,widthCm:d.finishedWidth,heightCm:d.finishedHeight});
    else if(type==="Shawl")plan=calculateShawlPlan({...s,...d,gauge:g});
    else if(["Top","Cardigan","Jumper / Sweater","Vest","Dress"].includes(type))plan=calculateGarmentPlan({...s,...d,gauge:g,chestCm:s.bodyMeasurements?.chest,easeCm:s.easeCm||8,bodyLengthCm:s.bodyMeasurements?.body,sleeveLengthCm:s.bodyMeasurements?.sleeve});
    else plan=calculateScarfPlan({...s,...d,gauge:g,widthCm:d.width||30,lengthCm:d.length||60});
    const stitchCount=plan.stitchCount||plan.blanketStitches||plan.sockStitches||plan.castOn||plan.castOnStitches||plan.maxStitchCount||1,rowCount=plan.rowCount||plan.blanketRows||plan.totalRows||plan.estimatedRounds||1,widthCm=plan.widthCm||n(d.width||d.finishedWidth||d.wingspan,1),lengthCm=plan.lengthCm||n(d.length||d.finishedHeight||d.height,1);
    return {...base,updatedAt:new Date().toISOString(),summary:`You’re ${s.craft==="Crochet"?"crocheting":"knitting"} a ${String(type).toLowerCase()}${["Top","Cardigan","Jumper / Sweater","Vest","Dress"].includes(type)?` in size ${s.desiredSize}`:""}.`,castOnOrChain:plan.startingChain||plan.castOnStitches||plan.castOn||plan.sockStitches||stitchCount,startingLabel:s.craft==="Crochet"?"Starting chain":"Cast-on",stitchCount,rowCount,widthCm,lengthCm,sleeveLengthCm:plan.sleeveLengthCm||n(s.bodyMeasurements?.sleeve,0),bodyLengthCm:plan.bodyLengthCm||lengthCm,shapingNotes:plan.shapingSuggestion||"No extra shaping is suggested from these setup numbers.",estimatedYarnGrams:plan.estimatedYarn||plan.estimatedYarnGrams||0,estimatedYarnUsage:(plan.estimatedYarn||plan.estimatedYarnGrams)?`About ${whole(plan.estimatedYarn||plan.estimatedYarnGrams)} g before buying buffer checks`:"Add swatch yarn weight for a better yarn estimate",details:plan};
  }
  function basicMath(expression="0"){
    const prepared=String(expression).replace(/×/g,"*").replace(/÷/g,"/").replace(/−/g,"-").replace(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/gi,"($1/100*$2)").replace(/(\d+(?:\.\d+)?)\s*%/g,"($1/100)");
    if(!/^[0-9+\-*/().\s]+$/.test(prepared))throw new Error("The expression can only include numbers and basic operators.");
    const result=Function(`"use strict";return (${prepared})`)();
    if(!Number.isFinite(result))throw new Error("The expression could not be calculated.");
    return {result};
  }

  root.YarnchaCalculations={
    VERSION,SIZE_REFERENCE,YARN_WEIGHT_WPI,n,round,whole,roundToRepeat,calculateGauge,calculateTargetStitches,calculateTargetRows,calculateAreaYarnEstimate,calculateSwatchYarnDensity,gaugeFromSetup,calculateGaugeSwatchPlan,calculateCastOn,calculateIncreaseDecrease,calculateRepeat,calculateRowProgress,calculateToolAdjustment,calculateYarnSubstitution,calculateYarnEstimate,calculatePatternYarnEstimate,calculateYarnLeftover,calculateYarnWeight,convertUnit,calculateCircle,calculateGrannySquare,calculateC2CBlanket,calculateAmigurumiPlan,calculateHatPlan,calculateSockPlan,calculateBlanketPlan,calculateSleevePlan,calculateSleeveStitchShaping,calculateRaglanPlan,calculateGarmentResize,calculateGarmentSectionResize,calculateBlocking,calculateGridPlan,calculateStripePlan,calculateColourPooling,calculateScarfPlan,calculateBagPlan,calculateShawlPlan,calculateGarmentPlan,calculateProjectPlan,basicMath
  };
})(typeof window!=="undefined"?window:globalThis);
