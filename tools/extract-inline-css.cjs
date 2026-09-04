const fs=require('fs');const {parse}=require('node-html-parser');
const ROUTES=require('./routes.cjs');
let total=0;
for(const r of ROUTES){
  const root=parse(fs.readFileSync(r.file,'utf8'),{comment:false});
  const blocks=root.querySelectorAll('style').map(s=>s.text);
  if(!blocks.length) continue;
  const css=blocks.join('\n\n');
  const out=`src/styles/${r.css}.css`;
  if(fs.existsSync(out)){
    console.log(`  ${r.css}: already has a stylesheet, appending ${blocks.length} inline block(s)`);
    fs.appendFileSync(out, `\n\n/* --- extracted from the page's inline <style> --- */\n`+css);
  } else {
    fs.writeFileSync(out, `/* ${r.css}.css — extracted from the inline <style> block of ${r.file} */\n\n`+css);
    console.log(`  ${r.css}: wrote ${css.split('\n').length} lines -> ${out}`);
  }
  total+=css.split('\n').length;
}
console.log('total inline CSS lines extracted:', total);
