const fs=require('fs'),path=require('path');const {parse}=require('node-html-parser');
const SP=process.env.SP, ROUTES=require('./routes.cjs');
const rows=[];
for(const r of ROUTES){
  const name=(r.route==='/'?'home':r.route.replace(/^\//,'').replace(/\//g,'_'))+'.html';
  const f=path.join(SP,'nextdom',name);
  if(!fs.existsSync(f)){ rows.push({route:r.route,err:'no dump'}); continue; }
  const d=parse(fs.readFileSync(f,'utf8'),{comment:false});
  const o=parse(fs.readFileSync(path.join(SP,'orig',r.file),'utf8'),{comment:false});
  const imgs=d.querySelectorAll('img').map(i=>i.getAttribute('src')).filter(Boolean);
  const oimgs=o.querySelectorAll('img').map(i=>i.getAttribute('src')).filter(Boolean);
  const txt=n=>n.querySelector('body')?.text.replace(/\s+/g,' ').trim().length||0;
  rows.push({
    route:r.route,
    title:(d.querySelector('title')?.text||'').trim().slice(0,44),
    titleMatch:(d.querySelector('title')?.text||'').trim()===(o.querySelector('title')?.text||'').trim(),
    h1:d.querySelectorAll('h1').length, oh1:o.querySelectorAll('h1').length,
    h2:d.querySelectorAll('h2').length, oh2:o.querySelectorAll('h2').length,
    imgs:imgs.length, oimgs:oimgs.length,
    links:d.querySelectorAll('a').length, olinks:o.querySelectorAll('a').length,
    ld:d.querySelectorAll('script[type="application/ld+json"]').length,
    old:o.querySelectorAll('script[type="application/ld+json"]').length,
    canon:!!d.querySelector('link[rel=canonical]'),
    header:!!d.querySelector('header.main-header'), footer:!!d.querySelector('footer.site-footer'),
    imgSrcs:imgs,
  });
}
console.log('route'.padEnd(36)+'title  h1     h2      imgs      links     jsonld  hdr/ftr');
for(const r of rows){
  if(r.err){console.log(r.route.padEnd(36)+r.err);continue;}
  const f=(a,b)=>`${a}/${b}`.padEnd(8)+(a===b?'':'*');
  console.log(r.route.padEnd(36)+(r.titleMatch?'ok   ':'DIFF ')+' '+
    f(r.h1,r.oh1)+f(r.h2,r.oh2)+f(r.imgs,r.oimgs)+f(r.links,r.olinks)+
    `${r.ld}/${r.old}`.padEnd(8)+(r.header&&r.footer?'yes':'MISSING'));
}
fs.writeFileSync(path.join(SP,'verify.json'),JSON.stringify(rows,null,1));
console.log('\n(* = differs from the original page)');
