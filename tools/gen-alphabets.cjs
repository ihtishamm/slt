const fs=require('fs');
const a=JSON.parse(fs.readFileSync('tools/alphabets.json','utf8'));
const META={
  asl:   {label:'American Sign Language'},
  bsl:   {label:'British Sign Language'},
  auslan:{label:'Australian Sign Language (Auslan)'},
  csl:   {label:'Chinese Sign Language'},
  lsf:   {label:'French Sign Language'},
  dgs:   {label:'German Sign Language'},
  lsm:   {label:'Mexican Sign Language'},
  lse:   {label:'Spanish Sign Language'},
};
const order=['asl','bsl','auslan','csl','lsf','dgs','lsm','lse'];
let body='';
for(const k of order){
  const e=a[k]; if(!e) continue;
  const keys=Object.keys(e.map).sort();
  const entries=keys.map(x=>`    ${JSON.stringify(x)}: ${JSON.stringify(e.map[x])},`).join('\n');
  body+=`  ${k}: {\n    // ${META[k].label} — ${keys.length} signs\n${entries}\n  },\n`;
}
const ts=`/**
 * Letter -> sign-image lookups, one per sign language.
 *
 * Extracted from the legacy per-page scripts (which were minified and
 * obfuscated) so the mapping now lives in readable, reviewable data. Paths are
 * site-absolute and resolve against \`public/\`.
 *
 * Note: a handful of digraph images ship in the language folders but were never
 * reachable from the letter-by-letter translator (German \`SCH\`, Mexican \`ll\`,
 * \`rr\`, \`nn\`). They are intentionally not mapped here, matching the old
 * behaviour. Spanish has no \`n\`: the legacy script pointed at \`bn.png\`, which
 * has never existed in that folder.
 */
export type SignMap = Record<string, string>;

export const alphabets = {
${body}} satisfies Record<string, SignMap>;

export type AlphabetKey = keyof typeof alphabets;

export const alphabetLabels: Record<AlphabetKey, string> = {
${order.filter(k=>a[k]).map(k=>`  ${k}: ${JSON.stringify(META[k].label)},`).join('\n')}
};
`;
fs.writeFileSync('src/data/alphabets.ts',ts);
console.log('wrote src/data/alphabets.ts');
order.filter(k=>a[k]).forEach(k=>console.log(`  ${k.padEnd(7)} ${Object.keys(a[k].map).length} signs`));
