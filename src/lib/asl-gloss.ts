import { phraseKeys, lemmas } from "./sign-lookup";

/**
 * English -> ASL gloss.
 *
 * ASL is not English with different hands. It has its own word order, drops
 * words English requires, and carries grammar on the face that English carries
 * in word order. Signing English word-for-word — which is what this site did
 * before — produces something no Deaf signer would use.
 *
 * This implements the rules that are reliably correct and testable. It does not
 * attempt full syntactic parsing: there is no parser here, only a closed
 * vocabulary and ordered rewrite rules. Sentences outside those patterns pass
 * through in their original order rather than being mangled, because a wrong
 * reordering teaches a learner something false, which is worse than teaching
 * them nothing.
 *
 * Rules, in the order they fire:
 *   1. Fixed phrases ("how are you") are protected as single lexical units.
 *   2. Contractions expand ("don't" -> "do not").
 *   3. Articles, the copula, dummy do-support and infinitival "to" drop.
 *   4. Time phrases move to the front — ASL is time-topic-comment.
 *   5. Question words move to the end.
 *   6. Negation moves after the verb.
 *   7. Tense with no time word becomes FINISH (past) or WILL (future).
 *   8. Objects topicalise, but only behind a known transitive verb.
 *
 * Non-manual markers (the eyebrow and head movements that mark questions and
 * negation) are returned alongside, because in ASL they are grammar, not
 * decoration.
 */

/** Grammar carried on the face rather than the hands. */
export type NonManualMarker = "WHQ" | "YNQ" | "NEG" | "TOPIC";

export const MARKER_LABELS: Record<NonManualMarker, string> = {
  WHQ: "Brows down — wh-question",
  YNQ: "Brows up — yes/no question",
  NEG: "Head shake — negation",
  TOPIC: "Brows up, slight pause — topic",
};

export type GlossToken = {
  /** ASL gloss, uppercase. */
  gloss: string;
  /** The English this came from, so the UI can show both. */
  original: string;
  /** Dictionary key when this token is a fixed multi-word sign. */
  phrase?: string;
};

export type GlossResult = {
  tokens: GlossToken[];
  /** Clause-level non-manual markers. */
  markers: NonManualMarker[];
  /** Display string, e.g. "YOUR NAME WHAT". */
  gloss: string;
  /** What was changed, for the "why did it do that" panel. */
  notes: string[];
};

// ---------------------------------------------------------------- vocabulary

const ARTICLES = new Set(["a", "an", "the"]);
const COPULA = new Set(["is", "am", "are", "was", "were", "be", "been", "being"]);
const WH = new Set(["what", "when", "where", "who", "whom", "whose", "why", "which", "how"]);
const NEGATORS = new Set(["not", "never", "no", "none", "nothing", "cannot"]);

/** Single-word time markers. */
const TIME_WORDS = new Set([
  "yesterday", "today", "tomorrow", "tonight", "now", "later", "soon",
  "already", "recently", "always", "sometimes", "often", "daily", "weekly",
]);

/** Determiners that begin a multi-word time phrase, e.g. "last week". */
const TIME_DETERMINERS = new Set(["last", "next", "this", "every", "each"]);
const TIME_UNITS = new Set([
  "day", "week", "month", "year", "morning", "afternoon", "evening", "night",
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "summer", "winter", "spring", "fall", "time", "weekend",
]);

const PAST_COPULA = new Set(["was", "were"]);
const FUTURE_MODALS = new Set(["will", "shall"]);

/**
 * Irregular past forms. A regular past is spotted by its "-ed", but "went" and
 * "ate" have to be listed. Only past forms belong here: "-ing" is progressive
 * and "-s" is present, and treating either as past would put a FINISH in front
 * of "we are eating".
 */
const IRREGULAR_PAST = new Set([
  "went", "ate", "drank", "ran", "saw", "felt", "slept", "made", "took",
  "gave", "got", "bought", "read", "wrote", "taught", "found", "met",
  "sent", "brought", "wore", "told", "heard", "knew", "understood", "had",
  "said", "thought", "came", "left", "kept", "held", "stood", "sat", "lost",
]);

/** Modals are kept; ASL has signs for all of these. */
const MODALS: Record<string, string> = {
  can: "CAN",
  could: "CAN",
  will: "WILL",
  would: "WILL",
  should: "SHOULD",
  must: "MUST",
  may: "MAYBE",
  might: "MAYBE",
  shall: "WILL",
};

const PRONOUNS: Record<string, string> = {
  i: "ME", me: "ME", my: "MY", mine: "MY", myself: "ME",
  you: "YOU", your: "YOUR", yours: "YOUR", yourself: "YOU",
  he: "HE", him: "HE", his: "HIS", himself: "HE",
  she: "SHE", her: "HER", hers: "HER", herself: "SHE",
  it: "IT", its: "ITS", itself: "IT",
  we: "WE", us: "US", our: "OUR", ours: "OUR", ourselves: "WE",
  they: "THEY", them: "THEY", their: "THEIR", theirs: "THEIR", themselves: "THEY",
};

/** Subject pronouns, for spotting the [subject][verb][object] shape. */
const SUBJECT_PRONOUNS = new Set(["i", "you", "he", "she", "it", "we", "they"]);

/**
 * Verbs that reliably take an object. Topicalisation only fires behind one of
 * these — without a parser, guessing at transitivity is how a translator starts
 * producing confident nonsense.
 */
const TRANSITIVE_VERBS = new Set([
  "love", "like", "want", "need", "have", "has", "eat", "drink", "see", "know",
  "understand", "help", "make", "take", "give", "get", "buy", "read", "write",
  "play", "watch", "learn", "teach", "study", "cook", "clean", "wash", "find",
  "meet", "call", "send", "bring", "wear", "open", "close", "use", "hate",
  "enjoy", "miss", "remember", "forget", "drive", "hear", "ask", "tell",
]);

/** Verbs generally, used to decide where negation lands. */
const VERBS = new Set([
  ...TRANSITIVE_VERBS,
  "go", "come", "run", "walk", "sit", "stand", "sleep", "work", "live", "look",
  "think", "feel", "say", "start", "finish", "stop", "wait", "sign", "talk",
]);

const CONTRACTIONS: Record<string, string> = {
  "don't": "do not", "doesn't": "does not", "didn't": "did not",
  "isn't": "is not", "aren't": "are not", "wasn't": "was not",
  "weren't": "were not", "can't": "can not", "couldn't": "could not",
  "won't": "will not", "wouldn't": "would not", "shouldn't": "should not",
  "haven't": "have not", "hasn't": "has not", "hadn't": "had not",
  "i'm": "i am", "you're": "you are", "he's": "he is", "she's": "she is",
  "it's": "it is", "we're": "we are", "they're": "they are",
  "i've": "i have", "you've": "you have", "we've": "we have",
  "they've": "they have", "i'll": "i will", "you'll": "you will",
  "he'll": "he will", "she'll": "she will", "we'll": "we will",
  "they'll": "they will", "i'd": "i would", "let's": "let us",
  "what's": "what is", "who's": "who is", "where's": "where is",
  "how's": "how is", "that's": "that is", "there's": "there is",
};

// ------------------------------------------------------------------ internals

type Word = {
  /** Lowercase source word, or the phrase key for a locked phrase. */
  text: string;
  /** The English span this covers. */
  original: string;
  /** A fixed multi-word sign: never reordered internally, never dropped. */
  locked: boolean;
};

/** Fixed phrases, longest first, computed once. */
const PHRASES = phraseKeys();

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}'\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

/** Expands contractions so "don't" reaches the negation rule as "do not". */
function expand(words: string[]): string[] {
  const out: string[] = [];
  for (const w of words) {
    const full = CONTRACTIONS[w];
    if (full) out.push(...full.split(" "));
    else out.push(w);
  }
  return out;
}

/**
 * Locks fixed multi-word signs into single units before any rule runs.
 * "how are you" is one sign; letting the copula rule delete its "are" would
 * destroy it.
 */
function lockPhrases(words: string[]): Word[] {
  const out: Word[] = [];
  let i = 0;

  while (i < words.length) {
    let hit: string | undefined;
    for (const phrase of PHRASES) {
      const span = phrase.split(" ");
      if (span.length > words.length - i) continue;
      if (span.every((w, k) => w === words[i + k])) {
        hit = phrase;
        break;
      }
    }

    if (hit) {
      const span = hit.split(" ").length;
      out.push({ text: hit, original: words.slice(i, i + span).join(" "), locked: true });
      i += span;
    } else {
      out.push({ text: words[i], original: words[i], locked: false });
      i += 1;
    }
  }

  return out;
}

/** True when the word begins a time phrase; returns how many words it spans. */
function timeSpan(words: Word[], i: number): number {
  const w = words[i];
  if (w.locked) return 0;
  if (TIME_WORDS.has(w.text)) return 1;
  if (TIME_DETERMINERS.has(w.text) && words[i + 1] && TIME_UNITS.has(words[i + 1].text)) return 2;
  return 0;
}

/**
 * The uninflected form of a verb.
 *
 * ASL verbs do not carry tense — time is set once at the front of the sentence
 * and the verb stays in its base form. So "went" is glossed GO and "helped" is
 * glossed HELP. Only words that resolve to a known verb are touched: stripping
 * blindly would turn nouns like "glass" into "glas".
 */
function baseVerb(word: string): string {
  if (VERBS.has(word)) return word;
  for (const form of lemmas(word)) {
    if (VERBS.has(form)) return form;
  }
  return word;
}

function toUpper(word: Word): GlossToken {
  if (word.locked) {
    return {
      gloss: word.text.toUpperCase().replace(/\s+/g, "-"),
      original: word.original,
      phrase: word.text,
    };
  }
  const mapped =
    PRONOUNS[word.text] ?? MODALS[word.text] ?? baseVerb(word.text).toUpperCase();
  return { gloss: mapped, original: word.original };
}

// ---------------------------------------------------------------------- main

/**
 * Translates an English sentence into ASL gloss order.
 *
 * Returns the reordered tokens, the clause-level non-manual markers, and a note
 * for each rule that fired so the UI can explain itself.
 */
export function toGloss(text: string): GlossResult {
  const notes: string[] = [];
  const markers: NonManualMarker[] = [];

  const raw = expand(tokenize(text));
  if (raw.length === 0) return { tokens: [], markers: [], gloss: "", notes: [] };

  let words = lockPhrases(raw);

  // --- sentence type, decided before anything is dropped ---
  const firstFree = words.find((w) => !w.locked);
  const hasWh = words.some((w) => !w.locked && WH.has(w.text));
  const isWhQuestion = hasWh && (firstFree ? WH.has(firstFree.text) : false);
  const isYesNo =
    !hasWh &&
    firstFree !== undefined &&
    (COPULA.has(firstFree.text) ||
      ["do", "does", "did", "can", "could", "will", "would", "should", "have", "has"].includes(
        firstFree.text,
      ));
  const isNegative = words.some((w) => !w.locked && NEGATORS.has(w.text));

  // --- tense, read before the copula and auxiliaries are dropped ---
  const hasTimeWord = words.some((_, i) => timeSpan(words, i) > 0);
  const isPast = words.some((w) => {
    if (w.locked) return false;
    if (PAST_COPULA.has(w.text) || w.text === "did") return true;
    if (IRREGULAR_PAST.has(w.text)) return true;
    // Regular past: "-ed" over a word that is otherwise a known verb.
    return /ed$/.test(w.text) && !VERBS.has(w.text) && lemmas(w.text).some((f) => VERBS.has(f));
  });
  const isFuture = words.some((w) => !w.locked && FUTURE_MODALS.has(w.text));

  // --- 1. drop what ASL does not sign ---
  const before = words.length;
  words = words.filter((w, i) => {
    if (w.locked) return true;
    if (ARTICLES.has(w.text)) return false;
    if (COPULA.has(w.text)) return false;
    // Dummy do-support only. It is an auxiliary when it opens the sentence
    // ("do you know"), follows a question word ("what do you want"), or carries
    // the negation ("do not"). A "do" used as a real verb is kept.
    if (["do", "does", "did"].includes(w.text)) {
      const next = words[i + 1];
      const prev = words[i - 1];
      if (i === 0) return false;
      if (prev && !prev.locked && WH.has(prev.text)) return false;
      if (next && NEGATORS.has(next.text)) return false;
      return true;
    }
    // Infinitival "to" ("want to eat"), not directional "to".
    if (w.text === "to" && words[i + 1] && VERBS.has(words[i + 1].text)) return false;
    return true;
  });
  if (words.length < before) {
    notes.push("Dropped words ASL does not sign (articles, to be, do-support).");
  }

  // --- 2. time to the front: ASL is time-topic-comment ---
  const timeWords: Word[] = [];
  const rest: Word[] = [];
  for (let i = 0; i < words.length; i++) {
    const span = timeSpan(words, i);
    if (span > 0) {
      timeWords.push(...words.slice(i, i + span));
      i += span - 1;
    } else {
      rest.push(words[i]);
    }
  }
  if (timeWords.length > 0 && words[0] !== timeWords[0]) {
    notes.push("Moved the time phrase to the front — ASL sets the time first.");
  }
  words = [...timeWords, ...rest];

  // --- 3. tense marker when no time word says it already ---
  if (!hasTimeWord && isPast) {
    words = [{ text: "finish", original: "(past)", locked: false }, ...words];
    notes.push("Added FINISH to mark past tense.");
  } else if (!hasTimeWord && isFuture) {
    // "will" is already in the sentence; move it to the time slot.
    const idx = words.findIndex((w) => !w.locked && FUTURE_MODALS.has(w.text));
    if (idx > 0) {
      const [will] = words.splice(idx, 1);
      words = [will, ...words];
      notes.push("Moved WILL to the front — it marks the time.");
    }
  }

  // --- 4. negation follows the verb it negates ---
  const negIdx = words.findIndex((w) => !w.locked && NEGATORS.has(w.text));
  if (negIdx >= 0 && words[negIdx].text === "not") {
    const [neg] = words.splice(negIdx, 1);
    // Place after the verb, if there is one after the old position.
    const verbIdx = words.findIndex((w, i) => i >= negIdx && !w.locked && VERBS.has(w.text));
    if (verbIdx >= 0) {
      words.splice(verbIdx + 1, 0, neg);
      notes.push("Moved NOT after the verb.");
    } else {
      words.push(neg);
    }
  }
  if (isNegative) markers.push("NEG");

  // --- 5. question word to the end ---
  if (isWhQuestion) {
    const idx = words.findIndex((w) => !w.locked && WH.has(w.text));
    if (idx >= 0 && idx !== words.length - 1) {
      const [wh] = words.splice(idx, 1);
      words.push(wh);
      notes.push("Moved the question word to the end — ASL asks at the end.");
    }
    markers.push("WHQ");
  } else if (isYesNo) {
    markers.push("YNQ");
  }

  // --- 6. topicalise the object, only behind a known transitive verb ---
  if (!isWhQuestion && words.length >= 3) {
    const subjIdx = words.findIndex((w) => !w.locked && SUBJECT_PRONOUNS.has(w.text));
    if (subjIdx >= 0) {
      const verbIdx = words.findIndex(
        (w, i) => i > subjIdx && !w.locked && TRANSITIVE_VERBS.has(w.text),
      );
      // Everything after the verb is the object, if it holds no further verb.
      if (verbIdx > subjIdx && verbIdx < words.length - 1) {
        const object = words.slice(verbIdx + 1);
        const objectIsClean = object.every(
          (w) => w.locked || (!VERBS.has(w.text) && !NEGATORS.has(w.text) && !WH.has(w.text)),
        );
        const objectIsNoun = object.every((w) => w.locked || !PRONOUNS[w.text]);
        if (objectIsClean && objectIsNoun) {
          words = [...object, ...words.slice(0, verbIdx + 1)];
          markers.push("TOPIC");
          notes.push("Fronted the object as the topic — ASL is topic-comment.");
        }
      }
    }
  }

  const tokens = words.map(toUpper);
  return {
    tokens,
    markers,
    gloss: tokens.map((t) => t.gloss).join(" "),
    notes,
  };
}
