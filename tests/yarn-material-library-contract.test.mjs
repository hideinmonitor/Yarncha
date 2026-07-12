import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const app=readFileSync("app.js","utf8"),css=readFileSync("styles.css","utf8");
for(const field of ["beginnerFriendly","warmth","softness","elasticity","drape","durability","stitchDefinition","careLevel","bestFor","notIdealFor","shortExplanation","behaviour","commonProblems","careTips","substitutionNotes","relatedTools"]){assert.match(app,new RegExp(field),`${field} is part of the material model`);}
for(const name of ["Wool","Merino wool","Superwash wool","Alpaca","Mohair","Cashmere","Angora","Silk","Cotton","Mercerized cotton","Linen / flax","Bamboo / viscose from bamboo","Hemp","Tencel / Lyocell","Acrylic","Premium acrylic / anti-pilling acrylic","Nylon / polyamide","Polyester","Microfiber","Elastic / spandex blend","Yak","Camel","Qiviut","Possum blend","Wool nylon blend","Sock yarn blend","Single-ply yarn","Chainette yarn","Chenille / velvet yarn","Raffia / paper yarn"]){assert.match(app,new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),`${name} card exists`);}
for(const filter of ["All","Wool","Cotton","Acrylic","Plant fibre","Animal fibre","Synthetic","Luxury","Blends","Yarn structure","Easy care","Garment","Socks","Bags","Amigurumi","Baby","Summer","Winter","Sensitive skin","Beginner friendly"]){assert.match(app,new RegExp(`"${filter}"`),`${filter} filter exists`);}
for(const guide of ["Best yarns for sweaters","Best yarns for socks","Best yarns for baby items","Best yarns for amigurumi","Best yarns for bags","Best yarns for blankets","Best yarns for summer tops","Best yarns for shawls","Best yarns for colourwork","Best yarns for cables","Yarn can grow after blocking","Same yarn weight does not mean same result","Machine washable yarn","Blocking by fibre","Substituting by fibre","Substituting for garments"]){assert.match(app,new RegExp(guide),`${guide} exists`);}
assert.match(app,/<details class="material-card card"/,"Cards are collapsible");
assert.match(app,/data-material-filter/,"Filter chips are interactive");
assert.match(css,/\.material-filter-chips\{[^}]*overflow-x:auto/,"Filters scroll safely on narrow screens");
assert.match(css,/@media \(max-width:760px\)\{\.material-grid\{grid-template-columns:1fr/,"Cards use one column on phones");
assert.match(css,/\.material-card \.wiki-chip-row \.chip\{min-height:44px/,"Related tool targets remain touch friendly");
console.log("Yarn Materials Library contract passed.");
