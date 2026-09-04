const fs=require('fs');
const LANGS=[
 {key:'bsl',  dir:'british-sign-language',    js:'british-sign-language',    prefix:'b'},
 {key:'auslan',dir:'australian-sign-language',js:'australian-sign-language', prefix:'b'},
 {key:'csl',  dir:'chinese-sign-language',    js:'chinese-sign-language',    prefix:'c'},
 {key:'lsf',  dir:'french-sign-language',     js:'french-sign-language',     prefix:'f'},
 {key:'dgs',  dir:'german-sign-language',     js:'german-sign-language',     prefix:'G'},
 {key:'lsm',  dir:'mexican-sign-language',    js:'mexican-sign-language',    prefix:'m'},
 {key:'lse',  dir:'spanish-sign-language',    js:'spanish-sign-language',    prefix:'s'},
];
const res={};
for(const L of LANGS){
  const src=fs.readFileSync(`assets/js/${L.js}.js`,'utf8');
  const names=[...new Set([...src.matchAll(/'([^']*\.(?:png|webp|jpg))'/g)].map(m=>m[1]))];
  const onDisk=new Set(fs.readdirSync(L.dir).filter(f=>/\.(png|webp|jpg)$/i.test(f)));
  const map={}; const missing=[];
  for(const n of names){
    const base=n.replace(/\.(png|webp|jpg)$/i,'');
    if(!base.startsWith(L.prefix)) continue;
    const letter=base.slice(L.prefix.length).toLowerCase();
    if(!letter) continue;
    map[letter]=`/${L.dir}/${n}`;
    if(!onDisk.has(n)) missing.push(n);
  }
  res[L.key]={dir:L.dir,map,count:Object.keys(map).length,missing,
              scriptNames:names.length};
  console.log(`${L.key.padEnd(7)} ${L.dir.padEnd(26)} script-imgs:${String(names.length).padStart(3)} mapped:${String(Object.keys(map).length).padStart(3)} missing-on-disk:${missing.length} ${missing.slice(0,4).join(',')}`);
}
// ASL from the readable main.js
const asl=fs.readFileSync('assets/js/main.js','utf8');
const m=asl.match(/const aslSigns = \{([\s\S]*?)\};/);
const aslMap={};
for(const mm of m[1].matchAll(/'([^']+)':\s*'([^']+)'/g)) aslMap[mm[1]]=`/${mm[2]}`;
res.asl={dir:'assets/images',map:aslMap,count:Object.keys(aslMap).length,missing:[]};
console.log(`asl     assets/images              mapped:${Object.keys(aslMap).length}`);
fs.writeFileSync('tools/alphabets.json',JSON.stringify(res,null,1));
