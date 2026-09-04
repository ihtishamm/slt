const fs=require('fs');const {parse}=require('node-html-parser');
const root=parse(fs.readFileSync('index.html','utf8'),{comment:false});
const icons=root.querySelectorAll('footer .social-icon');
const out=icons.map(a=>({
  href:a.getAttribute('href'),
  cls:a.getAttribute('class').replace('social-icon ','').trim(),
  label:a.getAttribute('aria-label'),
  viewBox:a.querySelector('svg')?.getAttribute('viewBox')||'0 0 24 24',
  paths:a.querySelectorAll('path').map(p=>p.getAttribute('d')),
}));
fs.writeFileSync('tools/social.json',JSON.stringify(out,null,1));
out.forEach(i=>console.log(`  ${i.label.padEnd(10)} ${i.cls.padEnd(10)} paths:${i.paths.length} ${i.href}`));
console.log('\n--- footer copyright ---');
console.log(root.querySelector('footer .footer-copyright')?.text.replace(/\s+/g,' ').trim());
