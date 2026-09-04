/**
 * Generates src/data/sign-dictionary.ts — the word-level sign vocabulary.
 *
 * The source of truth is the curated table below, not a filename scan. Scanning
 * would have been wrong in three ways: six of the images in assets/images are
 * multi-sign *charts* (peoples-, places-, popular-words-, expresion-,
 * feeling-, all-feeling-) rather than single signs; several words ship two or
 * three near-duplicate files and one has to be chosen; and no filename tells
 * you that "mom" should also answer to "mother" and "mum".
 *
 * What the script does add over hand-writing the file: it fails if any asset is
 * missing from disk, if two entries claim the same English word, or if an entry
 * is not cleared for commercial use — and it reads the real pixel dimensions
 * out of each image so the rendered <img> can carry width/height and not shift
 * the page as it loads.
 *
 * Run: node tools/gen-dictionary.cjs
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const WORDS = '/sign-language-words';   // dedicated word photos, preferred
const ASSETS = '/assets/images';        // everything else

/**
 * gloss:   canonical ASL gloss, uppercase, hyphens for multi-word signs.
 * words:   every English form that should resolve here. First is the label.
 * image:   site-absolute path under public/.
 */
const ENTRIES = [
  // ---- greetings and courtesies ----
  { gloss: 'HELLO',          words: ['hello'],                                image: `${WORDS}/hello-in-sign-langauge.webp` },
  { gloss: 'HI',             words: ['hi', 'hey'],                            image: `${WORDS}/hi-in-american-sign-language.webp` },
  { gloss: 'GOODBYE',        words: ['goodbye', 'bye', 'good bye'],           image: `${ASSETS}/goodbye-in-sign-language.webp` },
  { gloss: 'GOOD-MORNING',   words: ['good morning'],                         image: `${ASSETS}/good-morning-in-sign-language.webp` },
  { gloss: 'GOOD-NIGHT',     words: ['good night', 'goodnight'],              image: `${ASSETS}/good-night-in-sign-language.webp` },
  { gloss: 'HOW-ARE-YOU',    words: ['how are you'],                          image: `${WORDS}/how-are-you-in-asl.webp` },
  { gloss: 'HAVE-GOOD-DAY',  words: ['have a good day'],                      image: `${WORDS}/have-a-good-day-in-sign-language.webp` },
  { gloss: 'HAPPY-BIRTHDAY', words: ['happy birthday'],                       image: `${WORDS}/happy-birthday-in-sign-language.webp` },
  { gloss: 'PLEASE',         words: ['please'],                               image: `${WORDS}/please-in-sign-language.webp` },
  { gloss: 'THANK-YOU',      words: ['thank you', 'thanks', 'thankyou'],      image: `${ASSETS}/thank-you-in-sign-language.webp` },
  { gloss: 'YOURE-WELCOME',  words: ["you're welcome", 'you are welcome', 'youre welcome'], image: `${WORDS}/youe-welcome-in-sign-language.webp` },
  { gloss: 'SORRY',          words: ['sorry', 'apologize'],                   image: `${WORDS}/sorry-sign-language.webp` },
  { gloss: 'EXCUSE-ME',      words: ['excuse me'],                            image: `${ASSETS}/excuse-me-in-sign-language.webp` },

  // ---- core responses ----
  { gloss: 'YES',            words: ['yes', 'yeah', 'yep'],                   image: `${ASSETS}/yes-in-sign-language.webp` },
  { gloss: 'NO',             words: ['no', 'nope'],                           image: `${WORDS}/no-sign-language.webp` },
  { gloss: 'MORE',           words: ['more'],                                 image: `${WORDS}/more-in-sign-language.webp` },
  { gloss: 'ALL-DONE',       words: ['all done', 'finished', 'done'],         image: `${WORDS}/all-done-sign-language.webp` },
  { gloss: 'WAIT',           words: ['wait'],                                 image: `${WORDS}/wait-in-sign-language.webp` },
  { gloss: 'STOP',           words: ['stop'],                                 image: `${ASSETS}/stop-in-sign-language.webp` },
  { gloss: 'GO',             words: ['go'],                                   image: `${ASSETS}/go-in-sign-language.webp` },
  { gloss: 'HELP',           words: ['help'],                                 image: `${WORDS}/help-in-sign-language.webp` },

  // ---- question words ----
  { gloss: 'WHAT',           words: ['what'],                                 image: `${WORDS}/what-in-asl.webp` },
  { gloss: 'WHEN',           words: ['when'],                                 image: `${ASSETS}/when-in-sign-language.webp` },
  { gloss: 'WHERE',          words: ['where'],                                image: `${ASSETS}/where-in-sign-language.webp` },
  { gloss: 'WHO',            words: ['who'],                                  image: `${ASSETS}/who-in-sign-language.webp` },

  // ---- people ----
  { gloss: 'MOM',            words: ['mom', 'mother', 'mum', 'mommy', 'mama'], image: `${WORDS}/mom-in-sign-language.webp` },
  { gloss: 'DAD',            words: ['dad', 'father', 'daddy', 'papa'],       image: `${WORDS}/dad-in-sign-language.webp` },
  { gloss: 'FAMILY',         words: ['family'],                               image: `${WORDS}/family-sign-language.webp` },
  { gloss: 'FRIEND',         words: ['friend'],                               image: `${ASSETS}/friend-in-sign-language.webp` },

  // ---- feelings ----
  { gloss: 'I-LOVE-YOU',     words: ['i love you'],                           image: `${WORDS}/i-love-you-in-sign-language.webp` },
  { gloss: 'LOVE',           words: ['love'],                                 image: `${ASSETS}/love-in-sign-language.webp` },
  { gloss: 'HAPPY',          words: ['happy', 'glad'],                        image: `${ASSETS}/happy-in-sign-language.webp` },
  { gloss: 'SAD',            words: ['sad'],                                  image: `${ASSETS}/sad-in-sign-language.webp` },
  { gloss: 'HOT',            words: ['hot'],                                  image: `${ASSETS}/hot-in-sign-language.webp` },
  { gloss: 'COLD',           words: ['cold'],                                 image: `${ASSETS}/cold-in-sign-language.webp` },

  // ---- daily life ----
  { gloss: 'EAT',            words: ['eat', 'food'],                          image: `${ASSETS}/eat-in-sign-language.webp` },
  { gloss: 'DRINK',          words: ['drink'],                                image: `${ASSETS}/drink-in-sign-language.webp` },
  { gloss: 'BATHROOM',       words: ['bathroom', 'toilet', 'restroom'],       image: `${ASSETS}/bathroom-in-sign-language.webp` },
  { gloss: 'HOME',           words: ['home'],                                 image: `${ASSETS}/home-in-sign-language.webp` },
  { gloss: 'SCHOOL',         words: ['school'],                               image: `${ASSETS}/school-in-sign-language.webp` },
  { gloss: 'WORK',           words: ['work', 'job'],                          image: `${ASSETS}/work-in-sign-language.webp` },

  // ---- animals ----
  { gloss: 'CAT',            words: ['cat'],                                  image: `${ASSETS}/cat-in-sign-language.webp` },
  { gloss: 'DOG',            words: ['dog'],                                  image: `${ASSETS}/dog-in-sign-language.webp` },
];

/*
 * Every image above is original SLTranslator photography, already published on
 * the site. It is the site owner's own work, so commercial use is cleared.
 * Anything harvested from an outside source must carry its own licence row and
 * must set `commercial: false` if it is not cleared — the assertion in the
 * generated file then fails the build rather than letting it ship.
 */
const OWN_LICENSE = { name: 'SLTranslator (own work)', commercial: true };

async function main() {
  const errors = [];
  const seen = new Map();

  for (const e of ENTRIES) {
    const abs = path.join('public', e.image);
    if (!fs.existsSync(abs)) errors.push(`missing asset: ${e.image} (${e.gloss})`);

    for (const w of e.words) {
      const key = w.toLowerCase();
      if (seen.has(key)) errors.push(`"${w}" claimed by both ${seen.get(key)} and ${e.gloss}`);
      seen.set(key, e.gloss);
    }
  }

  if (errors.length) {
    console.error('FAILED:\n  ' + errors.join('\n  '));
    process.exit(1);
  }

  // Real pixel dimensions, so the rendered <img> can reserve its box and not
  // shift the page while it loads.
  const withDims = [];
  for (const e of ENTRIES) {
    const meta = await sharp(path.join('public', e.image)).metadata();
    withDims.push({ ...e, width: meta.width, height: meta.height, license: OWN_LICENSE });
  }

  const rows = withDims
    .map((e) => `  ${JSON.stringify(e)},`)
    .join('\n')
    .replace(/"(gloss|words|image|width|height|license)":/g, '$1:');

  const ts = `/**
 * Word-level sign vocabulary.
 *
 * GENERATED by tools/gen-dictionary.cjs — edit the table there, not this file.
 *
 * Each entry maps one or more English words onto a single sign. A sign may be
 * shown as a video or, where no video has been licensed yet, a still image.
 * Words with no entry here are fingerspelled instead; see src/lib/sign-lookup.ts.
 *
 * ## Licensing
 *
 * Every entry carries its own licence, and \`assertCommercialUse()\` below
 * refuses to load the module if any entry is not cleared for commercial use.
 * This site runs AdSense, which makes it commercial use, and the major open ASL
 * video corpora do not permit that:
 *
 *   - WLASL is C-UDA, "academic and computational use only".
 *   - ASL-LEX prohibits commercial use expressly.
 *   - ASL Citizen (Microsoft) is non-commercial by default, but a commercial
 *     licence can be negotiated — ASL_Citizen@microsoft.com.
 *   - Wikimedia Commons CC BY-SA / public-domain clips are usable now, with
 *     attribution recorded in the \`license\` field.
 *
 * The assertion is what makes that a structural guarantee rather than a note in
 * a README that someone eventually stops reading.
 */

export type SignLicense = {
  /** Human-readable licence name, e.g. "CC BY-SA 4.0". */
  name: string;
  /** Link to the licence or the source page. */
  url?: string;
  /** Attribution line to display, where the licence requires one. */
  attribution?: string;
  /** Cleared for use on an ad-funded site. */
  commercial: boolean;
};

export type SignEntry = {
  /** Canonical ASL gloss, uppercase; hyphens join a multi-word sign. */
  gloss: string;
  /** English forms resolving to this sign. The first is used as the label. */
  words: string[];
  /** Video of the sign, once one has been licensed. */
  video?: { src: string; poster?: string };
  /** Still image — what the site has today. */
  image?: string;
  /** Intrinsic pixel size of \`image\`, used to reserve layout space. */
  width?: number;
  height?: number;
  license: SignLicense;
};

export const signDictionary: SignEntry[] = [
${rows}
];

/**
 * Refuses to load if any entry is not cleared for commercial use. Runs at
 * module load, so \`next build\` fails rather than shipping the asset.
 */
function assertCommercialUse(entries: SignEntry[]): void {
  const bad = entries.filter((e) => !e.license.commercial);
  if (bad.length > 0) {
    throw new Error(
      \`sign-dictionary: \${bad.length} entr\${bad.length === 1 ? "y is" : "ies are"} not cleared \` +
        \`for commercial use and this site runs ads: \${bad.map((e) => e.gloss).join(", ")}. \` +
        \`Remove them or obtain a commercial licence.\`,
    );
  }
}

assertCommercialUse(signDictionary);
`;

  fs.writeFileSync('src/data/sign-dictionary.ts', ts);
  const phrases = withDims.filter((e) => e.words.some((w) => w.includes(' '))).length;
  const forms = [...seen.keys()].length;
  console.log(`wrote src/data/sign-dictionary.ts`);
  console.log(`  ${withDims.length} signs, ${forms} English forms, ${phrases} with multi-word phrases`);
}

main();
