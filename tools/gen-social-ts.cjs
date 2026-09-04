const fs=require('fs');
const icons=JSON.parse(fs.readFileSync('tools/social.json','utf8'));
// The Pinterest link was mislabelled aria-label="Instagram" in the legacy markup.
// Keep the `instagram` CSS class (there is no `.pinterest` rule, so the hover
// colour depends on it) but correct the accessible name.
const fixed=icons.map(i=>{
  if(i.href.includes('pinterest')) return {...i,label:'Pinterest'};
  return i;
});
const ts=`/** Social links rendered in the site footer.
 *
 * \`cls\` is the legacy CSS modifier class and drives the hover colour, so it is
 * kept verbatim — note Pinterest intentionally reuses \`instagram\` because the
 * stylesheet has no \`.pinterest\` rule.
 */
export type SocialIcon = {
  href: string;
  cls: string;
  label: string;
  viewBox: string;
  paths: string[];
};

export const socialIcons: SocialIcon[] = ${JSON.stringify(fixed,null,2)};
`;
fs.writeFileSync('src/data/social.ts',ts);
console.log('wrote src/data/social.ts with',fixed.length,'icons');
fixed.forEach(i=>console.log(`  ${i.label.padEnd(10)} class=${i.cls}`));
