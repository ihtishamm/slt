import { describe, it, expect } from "vitest";
import { translate } from "./translate";
import type { ResolvedToken } from "./sign-lookup";

/** "[SIGN]" for a real sign, "<word>" for something fingerspelled. */
const render = (tokens: ResolvedToken[]) =>
  tokens.map((t) => (t.kind === "sign" ? `[${t.entry.gloss}]` : `<${t.source}>`)).join(" ");

describe("translate", () => {
  it("signs a phrase as one sign rather than spelling it", () => {
    const { tokens } = translate("thank you");
    expect(render(tokens)).toBe("[THANK-YOU]");
  });

  it("fingerspells a word with no sign", () => {
    expect(render(translate("zxqv").tokens)).toBe("<zxqv>");
  });

  it("reorders a wh-question and still resolves the signs", () => {
    const { tokens, gloss } = translate("what is your name");
    expect(gloss?.gloss).toBe("YOUR NAME WHAT");
    expect(gloss?.markers).toContain("WHQ");
    // WHAT is signed; "your" and "name" have no sign yet, so they are spelled.
    expect(render(tokens)).toBe("<your> <name> [WHAT]");
  });

  it("leaves word order alone when ASL grammar is off", () => {
    const { tokens, gloss } = translate("what is your name", { aslGrammar: false });
    expect(gloss).toBeNull();
    expect(render(tokens)).toBe("[WHAT] <is> <your> <name>");
  });

  // The gloss line and the cards under it must agree. Resolving the original
  // English here would print ME in the panel and spell "i" on the card.
  it("renders what the gloss line says, not the original English", () => {
    const { tokens, gloss } = translate("I was tired");
    expect(gloss?.gloss).toBe("FINISH ME TIRED");
    // FINISH is the same sign as ALL-DONE, so it resolves rather than spelling.
    expect(render(tokens)).toBe("[ALL-DONE] <me> <tired>");
  });

  it("keeps a fixed phrase whole through the grammar rules", () => {
    expect(render(translate("how are you").tokens)).toBe("[HOW-ARE-YOU]");
    expect(render(translate("i love you").tokens)).toBe("[I-LOVE-YOU]");
  });

  it("mixes signs and spelling in one sentence", () => {
    const { tokens } = translate("please help me");
    expect(render(tokens)).toBe("[PLEASE] [HELP] <me>");
  });

  it("uses the page's own alphabet and no word signs off ASL", () => {
    const { tokens, gloss } = translate("hi", { alphabet: "bsl" });
    expect(gloss?.gloss).toBe("HI");
    expect(tokens[0].kind).toBe("fingerspell");
    if (tokens[0].kind === "fingerspell") {
      expect(tokens[0].letters.every((l) => l.src.includes("british"))).toBe(true);
    }
  });

  it("returns nothing for empty input", () => {
    expect(translate("")).toEqual({ tokens: [], gloss: null });
    expect(translate("   ").tokens).toEqual([]);
  });
});
