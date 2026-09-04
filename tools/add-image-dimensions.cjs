/**
 * Adds width/height (and lazy-loading) to the <img> tags across the app.
 *
 * None of the 343 images carried dimensions, so the browser could not reserve
 * space for any of them and every page reflowed as they arrived — the largest
 * single Cumulative Layout Shift problem on the site. The intrinsic size is
 * read from the file itself, so the attributes cannot disagree with the image.
 *
 * `loading="lazy"` is NOT applied to the first image of each page. Lazy-loading
 * something above the fold delays the Largest Contentful Paint rather than
 * helping it, which is the opposite of the point.
 *
 * next/image is deliberately still not used here: the stylesheets size images
 * through class selectors (`.alphabet-card img`, `.sign-image img`), and its
 * wrapper element would change the box those rules apply to. See the README.
 *
 * Run: node tools/add-image-dimensions.cjs [--dry]
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DRY = process.argv.includes('--dry');
const IMG = /<img\s[^>]*?\/>/gs;

function files(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files(p, out);
    else if (e.name.endsWith('.tsx')) out.push(p);
  }
  return out;
}

async function main() {
  const stats = { changed: 0, skippedDynamic: 0, skippedHasDims: 0, missing: [] };

  for (const file of files('src')) {
    const src = fs.readFileSync(file, 'utf8');
    const tags = [...src.matchAll(IMG)];
    if (tags.length === 0) continue;

    let out = src;
    let first = true;

    for (const [tag] of tags) {
      const srcAttr = tag.match(/src="([^"]+)"/);
      if (!srcAttr) { stats.skippedDynamic++; continue; }        // src={expr}

      const isFirst = first;
      first = false;

      if (/\swidth=/.test(tag)) { stats.skippedHasDims++; continue; }

      const abs = path.join('public', srcAttr[1]);
      if (!fs.existsSync(abs)) { stats.missing.push(`${file}: ${srcAttr[1]}`); continue; }

      const { width, height } = await sharp(abs).metadata();
      if (!width || !height) { stats.missing.push(`${file}: unreadable ${srcAttr[1]}`); continue; }

      const add = [`width={${width}}`, `height={${height}}`];
      if (!/\sloading=/.test(tag) && !isFirst) add.push('loading="lazy"');
      if (!/\sdecoding=/.test(tag)) add.push('decoding="async"');

      // Insert before the self-closing slash, preserving whatever spacing is there.
      const replaced = tag.replace(/\s*\/>$/, ` ${add.join(' ')} />`);
      out = out.replace(tag, replaced);
      stats.changed++;
    }

    if (out !== src && !DRY) fs.writeFileSync(file, out);
  }

  console.log(`${DRY ? '[dry run] ' : ''}dimensions added : ${stats.changed}`);
  console.log(`already had width    : ${stats.skippedHasDims}`);
  console.log(`dynamic src, skipped : ${stats.skippedDynamic}`);
  if (stats.missing.length) {
    console.log(`\nMISSING FILES (${stats.missing.length}) — these render broken today:`);
    for (const m of stats.missing) console.log('  ' + m);
  }
}

main();
