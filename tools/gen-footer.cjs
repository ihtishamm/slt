const fs=require('fs');const {parse}=require('node-html-parser');const {toJsx}=require('./html-to-jsx.cjs');
// index.html carries the fullest footer (social icons + contact line)
const root=parse(fs.readFileSync('index.html','utf8'),{comment:false});
const footer=root.querySelector('footer');
const r=toJsx(footer,3);
console.log('handlers:',r.handlers.length,'unknown:',JSON.stringify([...new Set(r.unknown)]),'stripped:',r.stripped.length);
fs.writeFileSync('tools/footer.jsx.txt', r.jsx);
console.log('--- first 40 lines ---');
console.log(r.jsx.split('\n').slice(0,40).join('\n'));
console.log('...\n--- total lines:', r.jsx.split('\n').length);
