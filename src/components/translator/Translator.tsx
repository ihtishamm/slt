"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { alphabets, type AlphabetKey, type SignMap } from "@/data/alphabets";
import { languagePages } from "@/data/navigation";
import { hasWordSigns, countSigns, tokenLabel } from "@/lib/sign-lookup";
import { MARKER_LABELS } from "@/lib/asl-gloss";
import { translate as translateText } from "@/lib/translate";
import SignSequence from "./SignSequence";
import VoiceInput from "./VoiceInput";
import { useSpeech } from "./useSpeech";
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
 * Slow by default. Most visitors here are learning the signs, not reviewing
 * ones they already know, and a handshape needs a moment to read — more so now
 * that each one is also spoken aloud. Named rather than indexed so reordering
 * the list above cannot silently change the default.
 */
const DEFAULT_SPEED = PLAY_SPEEDS.find((s) => s.label === "Slow")!.ms;

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
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [listening, setListening] = useState(false);
  /** Read each sign aloud while playing. On by default; muted per visitor. */
  const [speakAloud, setSpeakAloud] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /*
   * Grow the box to fit what has been typed, up to a limit.
   *
   * The field is a textarea rather than an input so a long sentence stays
   * readable instead of scrolling sideways one word at a time — but it should
   * start at one line and only take the room it needs.
   */
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [text]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const itemWidth = fixedWidth ? `${size}px` : "auto";

  const translate = useCallback((value: string) => {
    setSubmitted(value);
    setShowingAlphabet(false);
    setPlayingIndex(null);
  }, []);

  /* ---------------------------------------------------------------- gloss */

  /*
   * ASL word order is always on. It was briefly a checkbox, but a toggle that
   * turns the grammar off just produces signed English — which is the thing
   * this was built to stop doing — so there is nothing useful on the other
   * side of it. Off ASL there is no word dictionary, so no gloss either.
   */
  const useGloss = wordSigns && view === "words";

  const { tokens, gloss: glossed } = useMemo(
    () =>
      view === "letters"
        ? { tokens: [], gloss: null }
        : translateText(submitted, { alphabet, aslGrammar: useGloss }),
    [submitted, view, alphabet, useGloss],
  );

  /* ----------------------------------------------------------- sequencer */

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speech = useSpeech(alphabet === "asl" ? "en-US" : "en-US");

  const stopPlaying = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPlayingIndex(null);
    speech.cancel();
  }, [speech]);

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

  /*
   * Say the word as its card lights up.
   *
   * This is what makes "Play all" teachable rather than a slideshow — you hear
   * the English at the same moment you see the handshape. It speaks the same
   * label the card shows, via tokenLabel, so the two cannot drift apart.
   *
   * Clicking Play all is the user gesture browsers require before speech, so
   * nothing here is blocked by autoplay policy.
   */
  useEffect(() => {
    if (!speakAloud || playingIndex === null) return;
    const token = tokens[playingIndex];
    if (token) speech.speak(tokenLabel(token));
  }, [playingIndex, speakAloud, tokens, speech]);

  // Never leave a timer running — or a voice talking — behind an unmounted
  // component.
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
        <div className={listening ? "composer is-listening" : "composer"}>
          <textarea
            ref={inputRef}
            className="composer-input"
            id="text-input"
            rows={1}
            placeholder="Type or speak a sentence…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              // Enter sends, Shift+Enter makes a new line — the convention
              // every chat interface has taught people to expect.
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                translate(text);
              }
            }}
            aria-label={heading}
          />

          <div className="composer-bar">
            {/* One line, always present, so the toolbar never jumps. */}
            <p className="composer-status" role="status" aria-live="polite">
              {voiceStatus}
            </p>

            <div className="composer-buttons">
              <VoiceInput
                onTranscript={setText}
                onFinal={translate}
                onStatus={setVoiceStatus}
                onListeningChange={setListening}
                lang={alphabet === "asl" ? "en-US" : undefined}
              />
              <button
                type="button"
                className="composer-btn composer-send"
                onClick={() => translate(text)}
                disabled={!text.trim()}
                title={convertLabel}
                aria-label={convertLabel}
              >
                <Icon name="send" />
              </button>
            </div>
          </div>
        </div>

        <div className="composer-tools">
          <button
            type="button"
            className={showingAlphabet ? "tool-chip is-active" : "tool-chip"}
            aria-pressed={showingAlphabet}
            onClick={() => {
              // A toggle, not a one-way trip: previously the only way back to
              // your own translation was the view tabs, which does not read as
              // "undo the thing I just clicked".
              if (showingAlphabet) {
                setShowingAlphabet(false);
                setView("words");
              } else {
                setShowingAlphabet(true);
                setView("letters");
              }
              stopPlaying();
            }}
          >
            <Icon name="font" />
            {showingAlphabet ? "Hide alphabet" : "Show alphabet"}
          </button>

          <label className="tool-chip tool-select">
            Size
            <select value={size} onChange={(e) => setSize(Number(e.target.value))} aria-label="Sign size">
              <option value="100">S</option>
              <option value="110">M</option>
              <option value="120">L</option>
              <option value="130">XL</option>
            </select>
          </label>

          <label className="tool-chip tool-select">
            Language
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) window.location.href = e.target.value;
              }}
              aria-label="Switch sign language"
            >
              <option value="">This page</option>
              {languagePages
                .filter((l) => l.href !== "/")
                .map((l) => (
                  <option key={l.href} value={l.href}>
                    {l.label}
                  </option>
                ))}
            </select>
          </label>
        </div>

        {/* Two narrow display switches that most visitors never need. They are
            kept, because removing a control removes a capability, but folded
            away so they do not compete with the composer. */}
        <details className="composer-more">
          <summary>
            <Icon name="sliders" />
            Display options
          </summary>
          <div className="composer-more-body">
            <label className="switch">
              <input
                type="checkbox"
                id="fixed-width"
                checked={fixedWidth}
                onChange={(e) => setFixedWidth(e.target.checked)}
              />
              <span className="switch-track" />
              Equal-width cards
            </label>
            <label className="switch">
              <input
                type="checkbox"
                id="highlight-capitals"
                checked={highlightCapitals}
                onChange={(e) => setHighlightCapitals(e.target.checked)}
              />
              <span className="switch-track" />
              Highlight capitals
              <span className="switch-note">Letters view only</span>
            </label>
          </div>
        </details>
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
              className="play-btn"
              onClick={() => (playingIndex === null ? setPlayingIndex(0) : stopPlaying())}
            >
              <Icon name={playingIndex === null ? "play" : "stop"} />
              {playingIndex === null ? "Play all" : "Stop"}
            </button>

            {/* Speech is on by default, but it plays without being asked, so
                there has to be a way to stop it that is visible before it
                starts — not buried in a settings panel. */}
            {speech.supported && (
              <button
                type="button"
                className={speakAloud ? "tool-chip is-active" : "tool-chip"}
                onClick={() => {
                  if (speakAloud) speech.cancel();
                  setSpeakAloud(!speakAloud);
                }}
                aria-pressed={speakAloud}
                title={speakAloud ? "Turn off spoken words" : "Speak each word aloud"}
              >
                <Icon name={speakAloud ? "volume" : "volume-off"} />
                {speakAloud ? "Sound on" : "Sound off"}
              </button>
            )}

            <label className="tool-chip tool-select">
              Speed
              <select
                id="play-speed"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                aria-label="Playback speed"
              >
                {PLAY_SPEEDS.map((s) => (
                  <option key={s.ms} value={s.ms}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            {/* The split matters: it is the difference between a real sign and
                a word being spelled out because the dictionary lacks it. */}
            <div className="count-pills">
              <span className="count-pill is-signed">{signCount} signed</span>
              {tokens.length - signCount > 0 && (
                <span className="count-pill is-spelled">
                  {tokens.length - signCount} fingerspelled
                </span>
              )}
            </div>
          </div>
        )}

        <div id="result-content" className="result-content">
          {body}
        </div>
      </div>
    </div>
  );
}
