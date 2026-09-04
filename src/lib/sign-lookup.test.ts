import { describe, it, expect } from "vitest";
import { resolveText, countSigns, type ResolvedToken } from "./sign-lookup";

/** Compact view of a resolution: "THANK-YOU" for a sign, "*abc" for spelling. */
const shape = (tokens: ResolvedToken[]) =>
  tokens.map((t) => (t.kind === "sign" ? t.entry.gloss : `*${t.source}`));

describe("resolveText", () => {
  it("resolves a single known word to its sign", () => {
    expect(shape(resolveText("hello"))).toEqual(["HELLO"]);
  });

  it("fingerspells a word with no sign", () => {
    const [token] = resolveText("zxqv");
    expect(token.kind).toBe("fingerspell");
    expect(token.kind === "fingerspell" && token.letters.map((l) => l.letter)).toEqual([
      "z", "x", "q", "v",
    ]);
  });

  // The whole point of the feature: "thank you" is one sign, not nine letters.
  it("prefers a two-word phrase over its individual words", () => {
    expect(shape(resolveText("thank you"))).toEqual(["THANK-YOU"]);
  });

  it("prefers the longest phrase available", () => {
    // "i love you" must beat LOVE, and "how are you" must not split.
    expect(shape(resolveText("i love you"))).toEqual(["I-LOVE-YOU"]);
    expect(shape(resolveText("how are you"))).toEqual(["HOW-ARE-YOU"]);
  });

  it("still resolves the shorter word when the phrase does not match", () => {
    expect(shape(resolveText("love"))).toEqual(["LOVE"]);
  });

  it("mixes signs and fingerspelling in one sentence", () => {
    expect(shape(resolveText("hello Zara"))).toEqual(["HELLO", "*zara"]);
  });

  it("ignores case and punctuation", () => {
    expect(shape(resolveText("Hello!"))).toEqual(["HELLO"]);
    expect(shape(resolveText("  THANK   YOU.  "))).toEqual(["THANK-YOU"]);
  });

  it("keeps the apostrophe so contractions match", () => {
    expect(shape(resolveText("you're welcome"))).toEqual(["YOURE-WELCOME"]);
    expect(shape(resolveText("youre welcome"))).toEqual(["YOURE-WELCOME"]);
  });

  it("resolves synonyms to the same sign", () => {
    expect(shape(resolveText("mother"))).toEqual(["MOM"]);
    expect(shape(resolveText("mum"))).toEqual(["MOM"]);
    expect(shape(resolveText("thanks"))).toEqual(["THANK-YOU"]);
  });

  describe("lemmatisation", () => {
    // ASL does not inflect for number or tense, so these must not fall through
    // to fingerspelling.
    it("strips regular plurals", () => {
      expect(shape(resolveText("dogs"))).toEqual(["DOG"]);
      expect(shape(resolveText("cats"))).toEqual(["CAT"]);
      expect(shape(resolveText("friends"))).toEqual(["FRIEND"]);
    });

    it("strips -ing", () => {
      expect(shape(resolveText("eating"))).toEqual(["EAT"]);
      expect(shape(resolveText("helping"))).toEqual(["HELP"]);
      expect(shape(resolveText("working"))).toEqual(["WORK"]);
    });

    it("strips -ed, restoring a dropped e", () => {
      expect(shape(resolveText("helped"))).toEqual(["HELP"]);
      expect(shape(resolveText("loved"))).toEqual(["LOVE"]);
      expect(shape(resolveText("wanted"))[0]).toBe("*wanted"); // no WANT sign yet
    });

    it("handles irregular forms", () => {
      expect(shape(resolveText("ate"))).toEqual(["EAT"]);
      expect(shape(resolveText("went"))).toEqual(["GO"]);
    });

    it("does not over-strip short words", () => {
      // "yes" must not become "ye"; "no" must stay NO.
      expect(shape(resolveText("yes"))).toEqual(["YES"]);
      expect(shape(resolveText("no"))).toEqual(["NO"]);
    });
  });

  it("returns nothing for empty input", () => {
    expect(resolveText("")).toEqual([]);
    expect(resolveText("   ")).toEqual([]);
  });

  // The word dictionary is ASL photography. Applying it to the British or
  // Spanish pages would show the wrong sign entirely, which is worse than
  // spelling the word out.
  it("fingerspells everything for a non-ASL alphabet", () => {
    expect(shape(resolveText("hello", "bsl"))).toEqual(["*hello"]);
    expect(shape(resolveText("thank you", "lse"))).toEqual(["*thank", "*you"]);
    expect(countSigns(resolveText("hello thank you", "auslan"))).toBe(0);
  });

  it("uses BSL letter images when spelling on the BSL page", () => {
    const [token] = resolveText("ab", "bsl");
    expect(token.kind).toBe("fingerspell");
    if (token.kind === "fingerspell") {
      expect(token.letters.every((l) => l.src.includes("british"))).toBe(true);
    }
  });

  it("counts signs against fingerspelling", () => {
    expect(countSigns(resolveText("hello Zara"))).toBe(1);
    expect(countSigns(resolveText("hello please"))).toBe(2);
  });
});
