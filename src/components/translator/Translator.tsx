"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { alphabets, type AlphabetKey, type SignMap } from "@/data/alphabets";
import { languagePages } from "@/data/navigation";
import { hasWordSigns, countSigns } from "@/lib/sign-lookup";
import { MARKER_LABELS } from "@/lib/asl-gloss";
import { translate as translateText } from "@/lib/translate";
import SignSequence from "./SignSequence";
import VoiceInput from "./VoiceInput";
import "./translator.css";
import Icon from "@/components/ui/Icon";

type View = "words" | "letters";

export type TranslatorProps = {
  /** Which sign alphabet to render with. */
  alphabet: AlphabetKey;
  /** Heading above the input card, e.g. "British Sign Language Translator". */
  heading: string;
  /** Label on the primary button, e.g. "Convert to British Sign Language". */
  convertLabel: string;
  /** Prefilled demo text; the legacy pages all shipped "I Love You". */
  defaultText?: string;
};

/** How long each sign is held when playing the sequence, in ms. */
const PLAY_SPEEDS = [
  { label: "Slow", ms: 1600 },
  { label: "Normal", ms: 1000 },
  { label: "Fast", ms: 600 },
];

/**
 * The text-to-sign widget.
 *
 * Originally this spelled every character, so "thank you" came out as nine
 * separate handshapes. It now resolves whole words and phrases against the sign
 * dictionary and only fingerspells what is left over, optionally reordering the
 * sentence into ASL gloss order first.
 *
 * Markup, class names and element ids are kept as they were so the nine
 * per-page stylesheets still apply unchanged.
 */
export default function Translator({
  alphabet,
  heading,
  convertLabel,
  defaultText = "I Love You",
}: TranslatorProps) {
  const signs: SignMap = alphabets[alphabet];
  const wordSigns = hasWordSigns(alphabet);

  const [text, setText] = useState(defaultText);
  const [submitted, setSubmitted] = useState(defaultText);
  const [view, setView] = useState<View>("words");
  const [fixedWidth, setFixedWidth] = useState(false);
  const [highlightCapitals, setHighlightCapitals] = useState(true);
  const [size, setSize] = useState(120);
  const [showingAlphabet, setShowingAlphabet] = useState(false);
  // ASL word order. Only meaningful where there is a word dictionary.
  const [aslGrammar, setAslGrammar] = useState(true);
  const [speed, setSpeed] = useState(PLAY_SPEEDS[1].ms);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const itemWidth = fixedWidth ? `${size}px` : "auto";

  const translate = useCallback((value: string) => {
    setSubmitted(value);
    setShowingAlphabet(false);
    setPlayingIndex(null);
  }, []);

  /* ---------------------------------------------------------------- gloss */

  const useGloss = wordSigns && aslGrammar && view === "words";

  const { tokens, gloss: glossed } = useMemo(
    () =>
      view === "letters"
        ? { tokens: [], gloss: null }
        : translateText(submitted, { alphabet, aslGrammar: useGloss }),
    [submitted, view, alphabet, useGloss],
  );

  /* ----------------------------------------------------------- sequencer */

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopPlaying = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPlayingIndex(null);
  }, []);

  // Advances one sign at a time; clears itself at the end of the sequence.
  useEffect(() => {
    if (playingIndex === null) return;
    if (playingIndex >= tokens.length) {
      setPlayingIndex(null);
      return;
    }
    timer.current = setTimeout(() => setPlayingIndex((i) => (i === null ? null : i + 1)), speed);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playingIndex, tokens.length, speed]);

  // Never leave a timer running behind an unmounted component.
  useEffect(() => stopPlaying, [stopPlaying]);

  /* ---------------------------------------------------------------- body */

  const alphabetKeys = useMemo(
    () => Object.keys(signs).filter((k) => /[a-z0-9]/i.test(k)),
    [signs],
  );

  const signLetter = (letter: string, key: string | number) => {
    const src = signs[letter.toLowerCase()];
    if (!src) return null;
    return (
      <div className="sign-letter" key={key}>
        <div className="sign-image" style={{ width: `${size - 40}px`, height: `${size - 20}px` }}>
          <img src={src} alt={`Sign for ${letter}`} loading="lazy" decoding="async" />
        </div>
      </div>
    );
  };

  let body: React.ReactNode;

  if (showingAlphabet) {
    body = alphabetKeys.map((letter, i) => (
      <div
        className="sign-item single-letter"
        key={`${letter}-${i}`}
        style={fixedWidth ? { width: itemWidth } : undefined}
      >
        <div className="sign-header">{letter.toUpperCase()}</div>
        <div className="sign-content">{signLetter(letter.toUpperCase(), 0)}</div>
      </div>
    ));
  } else if (!submitted.trim()) {
    body = (
      <div className="empty-result">
        <Icon name="sign-language" />
        <p>Enter text to see translation</p>
      </div>
    );
  } else if (view === "words") {
    body = (
      <SignSequence
        tokens={tokens}
        size={size}
        fixedWidth={fixedWidth}
        activeIndex={playingIndex}
      />
    );
  } else {
    // Letters view: unchanged behaviour, every character spelled out.
    body = submitted
      .trim()
      .split("")
      .map((letter, i) => {
        const lower = letter.toLowerCase();
        if (letter === " " || !signs[lower]) return null;
        const isCapital = highlightCapitals && letter !== lower;
        return (
          <div className="sign-item single-letter" key={`${letter}-${i}`} style={{ width: itemWidth }}>
            <div className="sign-header" style={isCapital ? { backgroundColor: "#006064" } : undefined}>
              {letter}
            </div>
            <div className="sign-content">{signLetter(letter, 0)}</div>
          </div>
        );
      });
  }

  const selectView = (next: View) => {
    setView(next);
    setShowingAlphabet(false);
    stopPlaying();
  };

  const signCount = countSigns(tokens);

  return (
    <div className="container">
      <div className="card input-section">
        <h2>{heading}</h2>
        <input
          type="text"
          className="input-box"
          id="text-input"
          placeholder="Enter text to translate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") translate(text);
          }}
        />

        <VoiceInput
          onTranscript={setText}
          onFinal={translate}
          lang={alphabet === "asl" ? "en-US" : undefined}
        />

        <div className="options">
          <div className="option-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="fixed-width"
                checked={fixedWidth}
                onChange={(e) => setFixedWidth(e.target.checked)}
              />
              <span className="checkmark" />
              Fixed Width
            </label>
          </div>

          <div className="option-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="highlight-capitals"
                checked={highlightCapitals}
                onChange={(e) => setHighlightCapitals(e.target.checked)}
              />
              <span className="checkmark" />
              Highlight Capitals
            </label>
          </div>

          {wordSigns && (
            <div className="option-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="asl-grammar"
                  checked={aslGrammar}
                  onChange={(e) => setAslGrammar(e.target.checked)}
                />
                <span className="checkmark" />
                ASL Grammar
              </label>
            </div>
          )}

          <div className="option-group">
            <label htmlFor="size">Size:</label>
            <div className="select-container">
              <select id="size" value={size} onChange={(e) => setSize(Number(e.target.value))}>
                <option value="100">100</option>
                <option value="110">110</option>
                <option value="120">120</option>
                <option value="130">130</option>
              </select>
            </div>

            <div className="select-container">
              <select
                id="link"
                value=""
                onChange={(e) => {
                  if (e.target.value) window.location.href = e.target.value;
                }}
              >
                <option value="">Select a Sign Language Translator</option>
                {languagePages
                  .filter((l) => l.href !== "/")
                  .map((l) => (
                    <option key={l.href} value={l.href}>
                      {l.label} Translator
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="btn-group">
          <button className="btn primary-btn" id="translate-btn" onClick={() => translate(text)}>
            <Icon name="language" />
            {convertLabel}
          </button>
          <button
            className="btn secondary-btn"
            id="show-alphabet-btn"
            onClick={() => {
              setShowingAlphabet(true);
              setView("letters");
              stopPlaying();
            }}
          >
            <Icon name="font" />
            Show Alphabet
          </button>
        </div>
      </div>

      <div className="card result-section">
        <div className="result-header">
          <h2>Translation Results</h2>
          <div className="view-toggle">
            <button
              className={view === "words" ? "view-btn active" : "view-btn"}
              data-view="words"
              onClick={() => selectView("words")}
            >
              Words View
            </button>
            <button
              className={view === "letters" ? "view-btn active" : "view-btn"}
              data-view="letters"
              onClick={() => selectView("letters")}
            >
              Letters View
            </button>
          </div>
        </div>

        {/* The gloss, the facial grammar that goes with it, and what changed. */}
        {glossed && glossed.tokens.length > 0 && (
          <div className="gloss-panel">
            <div className="gloss-line">
              <span className="gloss-label">ASL gloss</span>
              <strong>{glossed.gloss}</strong>
            </div>

            {glossed.markers.length > 0 && (
              <ul className="gloss-markers">
                {glossed.markers.map((marker) => (
                  <li key={marker} className={`marker marker-${marker.toLowerCase()}`}>
                    <abbr title={MARKER_LABELS[marker]}>{marker}</abbr>
                  </li>
                ))}
              </ul>
            )}

            {glossed.notes.length > 0 && (
              <details className="gloss-notes">
                <summary>Why the order changed</summary>
                <ul>
                  {glossed.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}

        {/* Playback, and an honest count of what is signed vs spelled. */}
        {view === "words" && tokens.length > 0 && (
          <div className="playback">
            <button
              type="button"
              className="btn play-btn"
              onClick={() => (playingIndex === null ? setPlayingIndex(0) : stopPlaying())}
            >
              <Icon name={playingIndex === null ? "play" : "stop"} />
              {playingIndex === null ? "Play all" : "Stop"}
            </button>

            <div className="select-container">
              <label htmlFor="play-speed">Speed:</label>
              <select
                id="play-speed"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              >
                {PLAY_SPEEDS.map((s) => (
                  <option key={s.ms} value={s.ms}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <p className="playback-summary">
              {signCount} of {tokens.length} signed
              {tokens.length - signCount > 0 && `, ${tokens.length - signCount} fingerspelled`}
            </p>
          </div>
        )}

        <div id="result-content" className="result-content">
          {body}
        </div>
      </div>
    </div>
  );
}
