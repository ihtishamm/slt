const fs=require('fs');
const LANGS=[
 {key:'dgs',dir:'german-sign-language',js:'german-sign-language',prefix:'G'},
 {key:'lsm',dir:'mexican-sign-language',js:'mexican-sign-language',prefix:'m'},
 {key:'lse',dir:'spanish-sign-language',js:'spanish-sign-language',prefix:'s'},
 {key:'csl',dir:'chinese-sign-language',js:'chinese-sign-language',prefix:'c'},
];
for(const L of LANGS){
  const src=fs.readFileSync(`assets/js/${L.js}.js`,'utf8');
  const names=[...new Set([...src.matchAll(/'([^']*\.(?:png|webp|jpg))'/g)].map(m=>m[1]))];
  const unmapped=names.filter(n=>!n.replace(/\.\w+$/,'').startsWith(L.prefix));
  const mapped=names.filter(n=>n.replace(/\.\w+$/,'').startsWith(L.prefix))
                    .map(n=>n.replace(/\.\w+$/,'').slice(L.prefix.length).toLowerCase());
  console.log(`${L.key}: UNMAPPED -> ${JSON.stringify(unmapped)}`);
  console.log(`      keys(${mapped.length}): ${mapped.sort().join(' ')}`);
}
