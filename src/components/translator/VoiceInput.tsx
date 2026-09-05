"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

/**
 * Microphone input, using the browser's own speech recognition.
 *
 * Nothing is sent to a server: the Web Speech API runs in the browser, so there
 * is no API key, no per-minute cost, and no audio leaving the visitor's device.
 * The trade is coverage — Chrome, Edge and Safari implement it and Firefox does
 * not. Rather than break there, the button renders disabled with a plain
 * explanation.
 */

/** The two names browsers ship this under. */
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<
    ArrayLike<{ transcript: string }> & { isFinal: boolean }
  >;
};

function getRecognition(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Plain-English message for each error the API reports. */
const ERRORS: Record<string, string> = {
  "not-allowed": "Microphone blocked. Allow access in your browser's address bar, then try again.",
  "service-not-allowed": "Your browser blocked speech recognition for this page.",
  "no-speech": "Didn't catch that. Try again, a little closer to the microphone.",
  "audio-capture": "No microphone found. Check that one is connected.",
  network: "Speech recognition needs a network connection. Check yours and try again.",
  aborted: "",
};

export type VoiceInputProps = {
  /** Interim and final transcripts, as they arrive. */
  onTranscript: (text: string) => void;
  /** Called once with the final transcript, to trigger the translation. */
  onFinal: (text: string) => void;
  /** BCP-47 tag matching the page, e.g. "en-US". */
  lang?: string;
  /**
   * Status and error text, lifted to the parent.
   *
   * The microphone sits inside the composer next to Send, so its messages
   * belong on the composer's own status line rather than under the button —
   * otherwise the toolbar would jump every time the text changed.
   */
  onStatus?: (message: string) => void;
  /** Mirrors the listening state so the composer can show it is recording. */
  onListeningChange?: (listening: boolean) => void;
};

export default function VoiceInput({
  onTranscript,
  onFinal,
  lang = "en-US",
  onStatus,
  onListeningChange,
}: VoiceInputProps) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // Kept in refs so the callbacks below never need to be re-created, which
  // would otherwise restart the recogniser mid-sentence.
  const statusRef = useRef(onStatus);
  const listeningRef = useRef(onListeningChange);
  statusRef.current = onStatus;
  listeningRef.current = onListeningChange;

  const lastMessage = useRef("");
  const setMessage = useCallback((m: string) => {
    lastMessage.current = m;
    statusRef.current?.(m);
  }, []);

  useEffect(() => {
    listeningRef.current?.(listening);
  }, [listening]);

  // Support is resolved after mount: the server has no window, and rendering a
  // different answer there than here would be a hydration mismatch.
  useEffect(() => {
    setSupported(getRecognition() !== null);
  }, []);

  // Stop the microphone if the visitor navigates away mid-sentence.
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Ctor = getRecognition();
    if (!Ctor) return;

    // start() on an already-running recogniser throws InvalidStateError.
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setMessage("Listening…");
    };

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;
        if (result.isFinal) final += text;
        else interim += text;
      }

      if (interim) onTranscript(interim);
      if (final) {
        const trimmed = final.trim();
        onTranscript(trimmed);
        onFinal(trimmed);
        setMessage(`Heard "${trimmed}"`);
      }
    };

    recognition.onerror = (event) => {
      setMessage(ERRORS[event.error] ?? `Speech recognition failed (${event.error}).`);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      // Clear the prompt only if nothing more useful replaced it.
      if (lastMessage.current === "Listening…") setMessage("");
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      setMessage("Could not start the microphone. Try again.");
      setListening(false);
    }
  }, [lang, onFinal, onTranscript, setMessage]);

  // Nothing on the first paint, so the server and client agree.
  if (supported === null) return null;

  if (!supported) {
    return (
      <button
        type="button"
        className="composer-btn composer-mic"
        disabled
        aria-disabled="true"
        title="Voice input needs Chrome, Edge, or Safari"
      >
        <Icon name="microphone-slash" title="Voice input is unavailable in this browser" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={listening ? "composer-btn composer-mic is-listening" : "composer-btn composer-mic"}
      onClick={listening ? stop : start}
      aria-pressed={listening}
      title={listening ? "Stop listening" : "Speak instead of typing"}
    >
      <Icon name={listening ? "stop" : "microphone"} title={listening ? "Stop listening" : "Start voice input"} />
    </button>
  );
}
