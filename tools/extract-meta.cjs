const fs=require('fs'),path=require('path');const {parse}=require('node-html-parser');
const ROUTES=require('./routes.cjs');
const out={};
for(const r of ROUTES){
  const html=fs.readFileSync(r.file,'utf8');
  const root=parse(html,{comment:false});
  const m=(sel,attr='content')=>root.querySelector(sel)?.getAttribute(attr)||'';
  const ld=root.querySelectorAll('script[type="application/ld+json"]').map(s=>s.text.trim());
  out[r.route]={
    file:r.file, slug:r.slug,
    lang: root.querySelector('html')?.getAttribute('lang')||'en',
    title: (root.querySelector('title')?.text||'').trim(),
    description: m('meta[name="description"]'),
    keywords: m('meta[name="keywords"]'),
    robots: m('meta[name="robots"]'),
    canonical: m('link[rel="canonical"]','href'),
    ogTitle: m('meta[property="og:title"]'), ogDesc: m('meta[property="og:description"]'),
    ogImage: m('meta[property="og:image"]'), ogType: m('meta[property="og:type"]'),
    ogUrl: m('meta[property="og:url"]'), ogSite: m('meta[property="og:site_name"]'),
    twCard: m('meta[name="twitter:card"]'), twTitle: m('meta[name="twitter:title"]'),
    twDesc: m('meta[name="twitter:description"]'), twImage: m('meta[name="twitter:image"]'),
    jsonld: ld,
  };
}
fs.writeFileSync('tools/meta.json', JSON.stringify(out,null,1));
console.log('extracted metadata for', Object.keys(out).length, 'routes');
for(const [k,v] of Object.entries(out))
  console.log(`  ${k.padEnd(34)} ld:${v.jsonld.length} canon:${v.canonical?'y':'-'} og:${v.ogTitle?'y':'-'} tw:${v.twCard?'y':'-'} robots:${v.robots||'-'}`);
