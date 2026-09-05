"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Speaks a word aloud, using the browser's own speech synthesis.
 *
 * The companion to VoiceInput: that one listens, this one talks. Same trade —
 * no key, no server, no cost, and nothing leaves the device — and the same
 * caveat, that support varies, so callers must handle `supported === false`.
 *
 * Used to read each sign aloud as the sequencer reaches it, which is what makes
 * "Play all" teachable rather than a slideshow: you hear the English word at
 * the same moment you see the handshape for it.
 */
export type Speech = {
  /** False when the browser has no speech synthesis. */
  supported: boolean;
  /** Speaks `text`, cutting off whatever was already being said. */
  speak: (text: string) => void;
  /** Stops immediately. */
  cancel: () => void;
};

export function useSpeech(lang = "en-US"): Speech {
  const [supported, setSupported] = useState(false);
  const langRef = useRef(lang);
  langRef.current = lang;

  // Resolved after mount: there is no window on the server, and answering
  // differently there would be a hydration mismatch.
  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      const clean = text.trim();
      if (!clean) return;

      // Each sign gets its own utterance, and the sequencer may move on before
      // the last one finished — so cancel first rather than letting them queue
      // up and drift further behind the cards with every step.
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = langRef.current;
      // A little under natural pace: these are single words being taught, and
      // the default rate clips short ones.
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    },
    [],
  );

  // Never leave a voice talking after the component goes away.
  useEffect(() => cancel, [cancel]);

  /*
   * Memoised deliberately. A fresh object every render would change identity
   * every render, and callers put this in dependency arrays — the sequencer's
   * cleanup effect would then fire on every re-render and stop playback the
   * instant it started.
   */
  return useMemo(() => ({ supported, speak, cancel }), [supported, speak, cancel]);
}
