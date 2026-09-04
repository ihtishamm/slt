import { signDictionary, type SignEntry } from "@/data/sign-dictionary";
import { alphabets, type AlphabetKey, type SignMap } from "@/data/alphabets";

/**
 * Resolves English text to an ordered stream of signs.
 *
 * The old translator spelled every character, so "thank you" came out as nine
 * separate handshapes. This resolves whole words and phrases against the sign
 * dictionary first and only falls back to fingerspelling for what is left —
 * which is what a Deaf signer actually does with a name or an unfamiliar word.
 *
 * Pure functions, no React: the gloss engine and the tests both call in here.
 */

/** A word or phrase that has its own sign. */
export type SignToken = {
  kind: "sign";
  /** The source text this matched, e.g. "thank you". */
  source: string;
  entry: SignEntry;
};

/** A word with no sign, spelled letter by letter. */
export type FingerspellToken = {
  kind: "fingerspell";
  source: string;
  /** One per character that has an image; unmapped characters are dropped. */
  letters: { letter: string; src: string }[];
};

export type ResolvedToken = SignToken | FingerspellToken;

/** Strips punctuation and casing so "Thank you!" matches "thank you". */
function normalize(text: string): string {
  return text
    .toLowerCase()
    // Keep the apostrophe: "you're welcome" is a dictionary key.
    .replace(/[^\p{L}\p{N}'\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** word/phrase -> entry, built once. */
const byWord: Map<string, SignEntry> = new Map();
/** How many words the longest phrase in the dictionary has. */
let maxPhraseWords = 1;

for (const entry of signDictionary) {
  for (const word of entry.words) {
    const key = normalize(word);
    byWord.set(key, entry);
    maxPhraseWords = Math.max(maxPhraseWords, key.split(" ").length);
  }
}

/**
 * Irregular forms worth handling; the regular -s/-ed/-ing cases are stripped
 * mechanically in `lemmas()` instead of being listed here.
 */
const IRREGULAR: Record<string, string> = {
  ate: "eat",
  eaten: "eat",
  drank: "drink",
  drunk: "drink",
  went: "go",
  gone: "go",
  loved: "love",
  children: "child",
  people: "person",
  men: "man",
  women: "woman",
  felt: "feel",
  slept: "sleep",
  ran: "run",
};

/**
 * Candidate base forms for a word, most specific first. ASL does not inflect
 * for tense or number the way English does, so "dogs", "eating" and "helped"
 * should all reach the plain sign rather than falling through to spelling.
 *
 * Shared with the gloss engine, which needs the same rules to write GO rather
 * than WENT — one implementation so the two can never disagree.
 */
export function lemmas(word: string): string[] {
  const out = [word];
  const push = (w: string) => {
    if (w.length >= 2 && !out.includes(w)) out.push(w);
  };

  if (IRREGULAR[word]) push(IRREGULAR[word]);

  if (word.endsWith("ies") && word.length > 4) push(word.slice(0, -3) + "y");
  if (word.endsWith("es") && word.length > 3) push(word.slice(0, -2));
  if (word.endsWith("s") && !word.endsWith("ss")) push(word.slice(0, -1));
  if (word.endsWith("ing") && word.length > 5) {
    const stem = word.slice(0, -3);
    push(stem);
    push(stem + "e");
    // "running" -> "run": undouble a final consonant pair.
    if (stem.length > 2 && stem.at(-1) === stem.at(-2)) push(stem.slice(0, -1));
  }
  if (word.endsWith("ed") && word.length > 4) {
    const stem = word.slice(0, -2);
    push(stem);
    push(stem + "e");
    if (stem.length > 2 && stem.at(-1) === stem.at(-2)) push(stem.slice(0, -1));
  }

  return out;
}

/** Looks a single word up, trying its base forms. */
function findWord(word: string): SignEntry | undefined {
  for (const form of lemmas(word)) {
    const hit = byWord.get(form);
    if (hit) return hit;
  }
  return undefined;
}

/** Spells a word out with the given alphabet. */
function fingerspell(word: string, signs: SignMap): FingerspellToken {
  const letters: FingerspellToken["letters"] = [];
  for (const ch of word) {
    const src = signs[ch.toLowerCase()];
    if (src) letters.push({ letter: ch, src });
  }
  return { kind: "fingerspell", source: word, letters };
}

/**
 * True when word-level signs apply to this alphabet.
 *
 * The dictionary is ASL photography. Showing an ASL HELLO on the British Sign
 * Language page would teach the wrong sign, so every other language falls back
 * to fingerspelling with its own alphabet until it has a dictionary of its own.
 */
export function hasWordSigns(alphabet: AlphabetKey): boolean {
  return alphabet === "asl";
}

/**
 * Resolves text into signs, preferring the longest phrase that matches.
 *
 * The greedy longest-first scan is what makes "i love you" render as the single
 * ILY handshape rather than as I + LOVE + YOU, and "thank you" as one sign
 * rather than two. Ties never arise because the dictionary generator rejects
 * duplicate English forms.
 */
export function resolveText(text: string, alphabet: AlphabetKey = "asl"): ResolvedToken[] {
  const signs = alphabets[alphabet];
  const words = normalize(text).split(" ").filter(Boolean);
  const useDictionary = hasWordSigns(alphabet);
  const out: ResolvedToken[] = [];

  let i = 0;
  while (i < words.length) {
    let matched = false;

    // Longest phrase first, down to a single word.
    const maxSpan = useDictionary ? Math.min(maxPhraseWords, words.length - i) : 0;
    for (let span = maxSpan; span >= 1; span--) {
      const phrase = words.slice(i, i + span).join(" ");
      const entry = span === 1 ? findWord(phrase) : byWord.get(phrase);
      if (entry) {
        out.push({ kind: "sign", source: phrase, entry });
        i += span;
        matched = true;
        break;
      }
    }

    if (!matched) {
      out.push(fingerspell(words[i], signs));
      i += 1;
    }
  }

  return out;
}

/** How many of the resolved tokens are real signs rather than spelling. */
export function countSigns(tokens: ResolvedToken[]): number {
  return tokens.filter((t) => t.kind === "sign").length;
}

/**
 * The multi-word dictionary keys, longest first.
 *
 * The gloss engine needs these: "how are you" and "i love you" are single
 * lexical signs, so grammar rules must treat them as one opaque unit rather
 * than reordering their words. Without this, "i love you" would be glossed
 * ME LOVE YOU and rendered as three separate signs instead of the ILY
 * handshape.
 */
export function phraseKeys(): string[] {
  return [...byWord.keys()]
    .filter((k) => k.includes(" "))
    .sort((a, b) => b.split(" ").length - a.split(" ").length);
}

/** Looks up a single already-normalized word or phrase. */
export function lookupExact(key: string): SignEntry | undefined {
  return byWord.get(normalize(key)) ?? findWord(normalize(key));
}
