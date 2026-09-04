import { describe, it, expect } from "vitest";
import { toGloss } from "./asl-gloss";

const g = (s: string) => toGloss(s).gloss;
const m = (s: string) => toGloss(s).markers;

describe("toGloss", () => {
  describe("dropping what ASL does not sign", () => {
    it("drops articles", () => {
      expect(g("the dog")).toBe("DOG");
      expect(g("a cat")).toBe("CAT");
      expect(g("an apple")).toBe("APPLE");
    });

    it("drops the copula", () => {
      expect(g("I am happy")).toBe("ME HAPPY");
      expect(g("she is sad")).toBe("SHE SAD");
      expect(g("they are friends")).toBe("THEY FRIENDS");
    });

    it("drops do-support at the start of a question", () => {
      expect(g("do you understand")).toBe("YOU UNDERSTAND");
    });

    it("drops infinitival to but keeps directional to", () => {
      expect(g("I want to eat")).toBe("ME WANT EAT");
      expect(g("go to school")).toBe("GO TO SCHOOL");
    });
  });

  describe("time first", () => {
    it("moves a single time word to the front", () => {
      expect(g("I work tomorrow")).toBe("TOMORROW ME WORK");
      expect(g("I am happy today")).toBe("TODAY ME HAPPY");
    });

    it("moves a two-word time phrase to the front", () => {
      expect(g("I went to school last week")).toBe("LAST WEEK ME GO TO SCHOOL");
      expect(g("we meet every monday")).toBe("EVERY MONDAY WE MEET");
    });

    it("leaves a time word already at the front alone", () => {
      expect(g("yesterday I was tired")).toBe("YESTERDAY ME TIRED");
    });
  });

  describe("tense", () => {
    it("marks the past with FINISH when no time word says it", () => {
      expect(g("I was tired")).toBe("FINISH ME TIRED");
      expect(g("I helped him")).toBe("FINISH ME HELP HE");
    });

    // ASL verbs do not inflect: time is set once, then the verb stays plain.
    it("glosses verbs in their base form", () => {
      expect(g("I helped him")).toContain("HELP");
      expect(g("I went to school last week")).toContain("GO");
      expect(g("she ate")).toContain("EAT");
      expect(g("we are eating")).toBe("WE EAT");
    });

    it("does not strip nouns that merely end in a verb-like suffix", () => {
      expect(g("the glass")).toBe("GLASS");
      expect(g("a bed")).toBe("BED");
    });

    it("does not add FINISH when a time word already carries the tense", () => {
      expect(g("yesterday I was tired")).toBe("YESTERDAY ME TIRED");
    });

    it("moves WILL to the front", () => {
      expect(g("I will go")).toBe("WILL ME GO");
    });
  });

  describe("questions", () => {
    it("moves the wh-word to the end", () => {
      expect(g("what is your name")).toBe("YOUR NAME WHAT");
      expect(g("where is the bathroom")).toBe("BATHROOM WHERE");
      expect(g("who is she")).toBe("SHE WHO");
    });

    it("marks a wh-question with brows down", () => {
      expect(m("what is your name")).toContain("WHQ");
    });

    it("marks a yes/no question with brows up and does not reorder", () => {
      expect(g("are you deaf")).toBe("YOU DEAF");
      expect(m("are you deaf")).toContain("YNQ");
    });
  });

  describe("negation", () => {
    it("expands the contraction and moves NOT after the verb", () => {
      expect(g("I don't like it")).toBe("ME LIKE NOT IT");
    });

    it("marks negation with a head shake", () => {
      expect(m("I do not understand")).toContain("NEG");
      expect(m("I never eat")).toContain("NEG");
    });
  });

  describe("topicalisation", () => {
    // Only fires behind a known transitive verb with a clean noun object.
    it("fronts a noun object as the topic", () => {
      expect(g("I love pizza")).toBe("PIZZA ME LOVE");
      expect(m("I love pizza")).toContain("TOPIC");
    });

    it("does not topicalise a pronoun object", () => {
      expect(g("I love you")).toBe("I-LOVE-YOU");
      expect(g("I see her")).toBe("ME SEE HER");
    });

    it("does not topicalise behind an intransitive verb", () => {
      expect(g("I go home")).toBe("ME GO HOME");
    });

    it("does not topicalise a wh-question", () => {
      expect(g("what do you want")).toBe("YOU WANT WHAT");
    });
  });

  describe("fixed phrases are never taken apart", () => {
    // "how are you" is one sign. Dropping its "are" would destroy it.
    it("keeps a phrase whole through the copula rule", () => {
      expect(g("how are you")).toBe("HOW-ARE-YOU");
    });

    it("keeps a phrase whole through reordering", () => {
      expect(g("thank you")).toBe("THANK-YOU");
      expect(g("good morning")).toBe("GOOD-MORNING");
    });

    it("reports the phrase key so the sign can be looked up", () => {
      const [token] = toGloss("i love you").tokens;
      expect(token.phrase).toBe("i love you");
      expect(token.gloss).toBe("I-LOVE-YOU");
    });
  });

  describe("pronouns", () => {
    it("maps English pronouns to ASL glosses", () => {
      expect(g("my name")).toBe("MY NAME");
      expect(g("I")).toBe("ME");
      expect(g("they are")).toBe("THEY");
    });
  });

  describe("edge cases", () => {
    it("handles empty input", () => {
      expect(g("")).toBe("");
      expect(toGloss("").tokens).toEqual([]);
      expect(toGloss("   ").markers).toEqual([]);
    });

    it("passes an unknown sentence through rather than mangling it", () => {
      expect(g("quixotic zebra")).toBe("QUIXOTIC ZEBRA");
    });

    it("keeps the original English on each token", () => {
      const { tokens } = toGloss("the dogs");
      expect(tokens.map((t) => t.original)).toEqual(["dogs"]);
    });

    it("explains what it changed", () => {
      expect(toGloss("what is your name").notes.length).toBeGreaterThan(0);
    });
  });
});
