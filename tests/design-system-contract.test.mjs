import assert from 'node:assert/strict';
import { declarations, tree } from './helpers/css-contract.mjs';

const tokens = declarations(':root');
for(const token of ['--font-brand','--font-heading','--font-ui','--text-page','--text-section','--text-card','--text-body','--text-ui','--text-meta','--spacing-2xs','--spacing-xs','--spacing-sm','--spacing-md','--spacing-lg','--spacing-xl','--spacing-2xl','--content-narrow','--content-normal','--content-wide','--radius-card','--radius-button','--radius-input','--shadow','--shadow-soft','--focus','--control-border','--danger-ink']) assert.ok(tokens[token],`Missing shared token ${token}`);
assert.deepEqual(['--color-background','--color-surface','--color-text','--color-button','--color-accent','--color-highlight'].map(t=>tokens[t]),['#F6F0E6','#FFFAF3','#463D35','#5F6958','#B7785F','#C4A269']);
assert.equal(tokens['--button-height-sm'],'44px');
assert.equal(tokens['--button-height'],'48px');
for(const selector of ['.card','.mobile-card','.settings-panel','.toolbox-card','.symbol-card','.workspace-card'])assert.equal(declarations(selector)['border-radius'],'var(--radius-card)',`${selector} shares the card radius`);
for(const selector of ['.primary-button','.secondary-button','.danger-button','.project-action-button'])assert.equal(declarations(selector)['min-height'],'var(--button-height)',`${selector} shares the action height`);
for(const selector of ['.icon-button','.modal-close','.symbol-card-edit','.subcounter-menu'])assert.equal(declarations(selector)['min-height'],'var(--button-height-sm)',`${selector} shares the icon touch target`);
for(const selector of ['.project-grid','.toolbox-grid','.symbol-grid']){
 assert.match(declarations(selector)['grid-template-columns'],/auto-fit,minmax\(min\(100%,20rem\),1fr\)/,`${selector} sizes from available content width`);
 assert.equal(declarations(selector,'(max-width:760px)')['grid-template-columns'],'1fr');
}
assert.equal(declarations('.view')['max-width'],declarations('.topbar-inner')['max-width']);
assert.equal(declarations('.project-mobile-shell')['max-width'],'none','No restrictive parent workspace cap');
assert.equal(declarations('.project-workspace-inner')['max-width'],'none','No separate narrow chart cap');
assert.equal(declarations('.toolbox-browser.card')['border'],'0','No redundant outer card around tool cards');
assert.match(tokens['--font-brand'],/Fraunces/);
assert.equal(declarations('.brand strong')['font-family'],'var(--font-brand)');
assert.equal(declarations('h1')['font-size'],'var(--text-page)');
assert.equal(declarations('h2')['font-size'],'var(--text-section)');
assert.equal(declarations('h3')['font-size'],'var(--text-card)');
assert.equal(declarations('::selection')['background'],'var(--selected-bg)');
assert.equal(declarations(':focus-visible')['outline'],'3px solid var(--focus)');
assert.equal(declarations('.notes-card textarea')['border'],'1px solid var(--control-border)');
assert.equal(declarations('[hidden]').display,'none','Hidden inputs and conditional actions cannot be exposed by component display rules');
assert.equal(declarations('.symbol-detail')['width'],'min(var(--content-normal),100%)');
assert.equal(declarations('.modal.edit-project-modal')['width'],declarations('.modal')['width'],'Wide symbol forms retain their content category');
assert.ok(Number(declarations('.modal-backdrop')['z-index'])>Number(declarations('.symbol-detail-overlay')['z-index']),'Nested edits appear above symbol details');
assert.equal(declarations('.button-secondary')['border-radius'],declarations('.secondary-button')['border-radius'],'Legacy tracking aliases use shared button geometry');
// Mode and colour presets may change colours, never geometry or brand typography.
tree.walkRules(rule=>{
 if(!rule.selector.includes('[data-mode=') && !rule.selector.includes('[data-theme='))return;
 for(const decl of rule.nodes){
  if(decl.type!=='decl')continue;
  assert.ok(!/^--(?:font-brand|spacing-|radius-|card-padding|section-gap|page-padding)/.test(decl.prop),`${rule.selector} cannot change layout or brand typography`);
 }
});
// Catch a reintroduced late conflicting declaration, independent of line numbers or grouping.
const seen=new Map();
tree.walkRules(rule=>{
 let context='',node=rule.parent;
 while(node&&node.type!=='root'){context=`@${node.name} ${node.params.replace(/\s/g,'')}|${context}`;node=node.parent;}
 for(const selector of rule.selectors){
  rule.walkDecls(decl=>{
   const key=`${context}|${selector}|${decl.prop}`;
   assert.ok(!seen.has(key),`Duplicate declaration for ${key}`);
   seen.set(key,true);
  });
 }
});
console.log('Design system contract passed: identity, roles, cards, controls, widths, responsive grids, and duplicate declarations.');
