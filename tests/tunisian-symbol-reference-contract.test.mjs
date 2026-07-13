import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import "../symbol-database.js";

const database=globalThis.YarnchaSymbolDatabase;
const tunisian=database.entries.filter(entry=>entry.craft==="Tunisian");
const requiredNames=[
  "Tunisian crochet","Forward Pass","Return Pass","Standard Return Pass","Foundation chain","Set-up / Foundation Row","Loop on hook","Vertical bar","Front vertical bar","Back vertical bar","Horizontal bar","Top bar","Edge stitch","Last / End Stitch","Right side","Wrong side","Do Not Turn","Turn When Instructed","Bind off / cast off","Slip-stitch bind off",
  "Tunisian Simple Stitch","Tunisian Knit Stitch","Tunisian Purl Stitch","Tunisian Reverse Stitch","Tunisian Full Stitch","Tunisian Twisted Simple Stitch","Extended Tunisian Simple Stitch","Tunisian Slip Stitch","Tunisian Single Crochet","Tunisian Half Double Crochet","Tunisian Double Crochet","Tunisian Treble Crochet",
  "Yarn over increase","Tunisian Full Stitch Increase","Increase in vertical bar","Increase in horizontal bar","Increase at beginning of row","Increase at end of row","Make one Tunisian increase","Multiple loops in same space","Eyelet increase","Invisible increase",
  "Tunisian simple stitch two together","Tunisian knit stitch two together","Tunisian purl stitch two together","Decrease at beginning of row","Decrease at end of row","Centered decrease","Left-leaning decrease","Right-leaning decrease","Skip-stitch decrease","Bind-off decrease",
  "Return Pass with chain spaces","Return Pass with colour change","Return Pass with lace opening","Return Pass with extended stitch","Reverse Return Pass",
  "Colour change at start of Forward Pass","Return Pass With Colour Change","Tunisian Stripes","Intarsia-style Tunisian colourwork","Carrying yarn","Floats","Two-colour Tunisian crochet","Tunisian Honeycomb","Tunisian Smock Stitch","Entrelac Tunisian crochet","Tunisian Lace Variation","Tunisian cables","Tunisian ribbing","Tunisian in the round","Double-ended Tunisian hook","Tunisian Short Rows","Joining panels","Seaming Tunisian fabric"
];
for(const name of requiredNames)assert.ok(tunisian.some(entry=>entry.fullName.toLowerCase()===name.toLowerCase()),`contains ${name}`);

const requiredSections=["Tunisian Crochet Basics","Core Tunisian Stitches","Tunisian Increases","Tunisian Decreases","Return Pass Variations","Colourwork & Special Techniques","Chart Reading Notes","Beginner Confusion Notes"];
for(const section of requiredSections)assert.ok(tunisian.some(entry=>entry.referenceCategory===section),`contains ${section}`);

for(const entry of tunisian){
  for(const field of ["referenceCategory","passType","englishName","usAbbr","ukAbbr","chineseAbbr","chineseName","japaneseNote","symbolCue","shortExplanation","howToWork","whyItMatters","commonMistakes","beginnerNote","countingTip","relatedStitches","examplePatternWording","appDisplayLevel"])assert.ok(entry[field],`${entry.fullName} has ${field}`);
  assert.match(entry.symbolCue,/varies by designer/i,`${entry.fullName} warns that symbols vary`);
  assert.ok(["Forward Pass","Return Pass","Both"].includes(entry.passType),`${entry.fullName} has a valid pass`);
  assert.ok(["Beginner","Intermediate","Advanced"].includes(entry.appDisplayLevel),`${entry.fullName} has a valid level`);
}

const tss=tunisian.find(entry=>entry.abbreviation==="TSS");
assert.equal(tss.usAbbr,"TSS");
assert.equal(tss.ukAbbr,"same");
assert.equal(tss.chineseAbbr,"突簡針");
assert.equal(tss.chineseName,"突尼斯簡單針");
assert.equal(tss.passType,"Forward Pass");
assert.match(tss.howToWork,/front vertical bar/i);
assert.ok(database.search("突簡針",{craft:"Tunisian",category:"All",difficulty:"All"}).some(entry=>entry.abbreviation==="TSS"));
assert.ok(database.search("チュニジアン",{craft:"Tunisian",category:"All",difficulty:"All"}).length>0);

const app=await readFile(new URL("../app.js",import.meta.url),"utf8");
for(const text of ["Tunisian crochet","TUNISIAN TWO-PASS BASICS","Forward Pass picks up loops","Count after FwP","Count after RetP","Pass","Common mistakes","Counting tip","Example pattern wording","Related tools"])assert.match(app,new RegExp(text,"i"));
assert.match(app,/symbol-pass-filter/);
assert.match(app,/referenceCategory/);

console.log(`Tunisian symbol reference contract passed with ${tunisian.length} entries.`);
