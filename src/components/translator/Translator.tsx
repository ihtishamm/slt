"use client";

import { useMemo, useState } from "react";
import { alphabets, type AlphabetKey, type SignMap } from "@/data/alphabets";
import { languagePages } from "@/data/navigation";

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

/**
 * The text-to-fingerspelling widget.
 *
 * Replaces nine separate scripts — the readable `main.js` plus eight obfuscated
 * per-language copies that were byte-for-byte the same logic with a different
 * image map. Markup, class names and element ids are kept identical to the old
 * pages so the existing stylesheets apply unchanged.
 */
export default function Translator({
  alphabet,
  heading,
  convertLabel,
  defaultText = "I Love You",
}: TranslatorProps) {
  const signs: SignMap = alphabets[alphabet];

  const [text, setText] = useState(defaultText);
  const [submitted, setSubmitted] = useState(defaultText);
  const [view, setView] = useState<View>("words");
  const [fixedWidth, setFixedWidth] = useState(false);
  const [highlightCapitals, setHighlightCapitals] = useState(true);
  const [size, setSize] = useState(120);
  const [showingAlphabet, setShowingAlphabet] = useState(false);

  const itemWidth = fixedWidth ? `${size}px` : "auto";

  const signLetter = (letter: string, key: string | number) => {
    const src = signs[letter.toLowerCase()];
    if (!src) return null;
    return (
      <div className="sign-letter" key={key}>
        <div className="sign-image" style={{ width: `${size - 40}px`, height: `${size - 20}px` }}>
          <img src={src} alt={`Sign for ${letter}`} />
        </div>
      </div>
    );
  };

  const alphabetKeys = useMemo(
    () => Object.keys(signs).filter((k) => /[a-z0-9]/i.test(k)),
    [signs],
  );

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
        <i className="fas fa-sign-language" />
        <p>Enter text to see translation</p>
      </div>
    );
  } else if (view === "words") {
    body = submitted
      .trim()
      .split(/\s+/)
      .map((word, i) => (
        <div className="sign-item" key={`${word}-${i}`} style={{ width: itemWidth }}>
          <div className="sign-header">{word}</div>
          <div className="sign-content">
            {word.split("").map((letter, j) => signLetter(letter, j))}
          </div>
        </div>
      ));
  } else {
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
  };

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
            if (e.key === "Enter") {
              setSubmitted(text);
              setShowingAlphabet(false);
            }
          }}
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
          <button
            className="btn primary-btn"
            id="translate-btn"
            onClick={() => {
              setSubmitted(text);
              setShowingAlphabet(false);
            }}
          >
            <i className="fas fa-language" />
            {convertLabel}
          </button>
          <button
            className="btn secondary-btn"
            id="show-alphabet-btn"
            onClick={() => {
              setShowingAlphabet(true);
              setView("letters");
            }}
          >
            <i className="fas fa-font" />
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
        <div id="result-content" className="result-content">
          {body}
        </div>
      </div>
    </div>
  );
}
