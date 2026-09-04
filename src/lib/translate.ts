import { resolveText, type ResolvedToken } from "./sign-lookup";
import { toGloss, type GlossResult } from "./asl-gloss";
import type { AlphabetKey } from "@/data/alphabets";

/**
 * The whole text-to-sign path in one call: grammar, then lookup.
 *
 * This exists so the UI and the tests exercise the same code. When the two
 * steps were wired together inside the component, the component resolved the
 * original English while the panel displayed the gloss — so the gloss line read
 * ME and the card under it spelled out "i".
 */

export type Translation = {
  /** Signs to render, in signing order. */
  tokens: ResolvedToken[];
  /** Gloss detail, or null when grammar reordering is off. */
  gloss: GlossResult | null;
};

export type TranslateOptions = {
  alphabet?: AlphabetKey;
  /** Reorder into ASL gloss order first. */
  aslGrammar?: boolean;
};

export function translate(
  text: string,
  { alphabet = "asl", aslGrammar = true }: TranslateOptions = {},
): Translation {
  if (!text.trim()) return { tokens: [], gloss: null };

  if (!aslGrammar) {
    return { tokens: resolveText(text, alphabet), gloss: null };
  }

  const gloss = toGloss(text);

  // Resolve each gloss token on its own so the reordering survives. Resolve the
  // gloss rather than the source English, so what renders matches the gloss
  // line shown above it. A fixed phrase carries its own dictionary key.
  const tokens = gloss.tokens.flatMap((t) =>
    resolveText(t.phrase ?? t.gloss.toLowerCase(), alphabet),
  );

  return { tokens, gloss };
}
