/**
 * Recompresses the PNGs in public/ without changing a single pixel.
 *
 * public/ is 21 MB, and some individual sign images are over 600 KB — the
 * Japanese folder alone was 6.5 MB. They were saved with weak compression.
 *
 * This is strictly lossless: `palette: false` is essential. Sharp quantises to
 * a 256-colour palette by default, which on these images shifts colours by up
 * to 36/255 AND silently drops the alpha channel, so a transparent background
 * would turn opaque. That is a much larger saving, and entirely the wrong trade
 * for reference images people are learning handshapes from. Every output here
 * is verified pixel-identical to its input before it replaces it.
 *
 * Filenames do not change, so no URL changes and nothing already indexed by
 * Google Images breaks.
 *
 * Run: node tools/recompress-images.cjs [--dry]
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DRY = process.argv.includes('--dry');
const MIN_BYTES = 50 * 1024;   // not worth rewriting anything smaller
const MIN_SAVING = 0.05;       // skip if it saves less than 5%

function pngs(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) pngs(p, out);
    else if (/\.png$/i.test(e.name) && fs.statSync(p).size >= MIN_BYTES) out.push(p);
  }
  return out;
}

async function main() {
  const files = pngs('public');
  let before = 0, after = 0, rewritten = 0, skipped = 0;
  const failed = [];

  for (const file of files) {
    const orig = fs.statSync(file).size;
    before += orig;

    const buf = await sharp(file)
      .png({ palette: false, compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();

    if (buf.length >= orig * (1 - MIN_SAVING)) { after += orig; skipped++; continue; }

    // Refuse to write anything that is not pixel-for-pixel the original.
    const a = await sharp(file).raw().toBuffer();
    const b = await sharp(buf).raw().toBuffer();
    if (!a.equals(b)) { failed.push(file); after += orig; continue; }

    if (!DRY) fs.writeFileSync(file, buf);
    after += buf.length;
    rewritten++;
  }

  const mb = (n) => (n / 1024 / 1024).toFixed(2) + ' MB';
  console.log(`${DRY ? '[dry run] ' : ''}PNGs over 50 KB : ${files.length}`);
  console.log(`rewritten            : ${rewritten}`);
  console.log(`skipped (<5% saving) : ${skipped}`);
  console.log(`before               : ${mb(before)}`);
  console.log(`after                : ${mb(after)}  (${(100 - after / before * 100).toFixed(1)}% smaller)`);
  if (failed.length) {
    console.log(`\nNOT pixel-identical, left untouched (${failed.length}):`);
    for (const f of failed) console.log('  ' + f);
  }
}

main();
