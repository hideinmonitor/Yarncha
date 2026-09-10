import postcss from 'postcss';
import { readFileSync } from 'node:fs';
const tree = postcss.parse(readFileSync(new URL('../../styles.css',import.meta.url),'utf8'));
export function declarations(selector, condition = '') {
  const result = {};
  tree.walkRules(rule => {
    if(!rule.selectors.includes(selector))return;
    const context = rule.parent.type === 'atrule' ? rule.parent.params.replace(/\s/g,'') : '';
    if(context !== condition.replace(/\s/g,''))return;
    rule.walkDecls(decl=>{result[decl.prop]=decl.value;});
  });
  return result;
}
export function hasDeclaration(selector,property,value,condition='') {
  return declarations(selector,condition)[property] === value;
}
export { tree };
