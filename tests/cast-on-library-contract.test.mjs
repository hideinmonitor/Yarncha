import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const app=readFileSync("app.js","utf8");

for(const title of ["Cast-on Methods","Backward Loop Cast-On","Long-Tail Cast-On","Knitted Cast-On","Cable Cast-On","German Twisted Cast-On / Old Norwegian Cast-On","Tubular Cast-On","Provisional Cast-On","Judy’s Magic Cast-On","Turkish Cast-On","Figure-8 Cast-On","Picot Cast-On","I-Cord Cast-On","Crochet Cast-On"]){
  assert.match(app,new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),`${title} guide exists`);
}
for(const tool of ["Cast-on Calculator","Gauge / Swatch Adapter","Pattern Resizer","Row Counter","Project Notes","Project Checklist"]){
  assert.match(app,new RegExp(tool.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),`${tool} is linked`);
}
for(const guide of ["My Cast-On Is Too Tight","My Cast-On Is Too Loose","I Did Not Leave Enough Tail","My Cast-On Twists When Joining in the Round","My First Row Is Hard to Knit"]){
  assert.match(app,new RegExp(guide.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),`${guide} troubleshooting guide exists`);
}
assert.match(app,/const castOnAssistantService=/,"Assistant has dedicated cast-on support");
assert.match(app,/questionType:"castOnHelp"/,"Cast-on questions use a distinct answer type");
for(const context of ["project type","edge purpose","whether the edge needs stretch","yarn type","needle size","whether you are working flat or in the round","skill level"]){
  assert.match(app,new RegExp(context),`Assistant checks ${context}`);
}
assert.match(app,/data-assistant-memory="add-notes"/,"Assistant can save a cast-on choice to project notes");
assert.match(app,/data-assistant-memory="add-checklist"/,"Assistant can add a stretch test to the checklist");

console.log("Cast-on Library contract passed.");
