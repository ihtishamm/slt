"use client";

import { useEffect, useRef } from "react";
import type { ResolvedToken } from "@/lib/sign-lookup";
import Icon from "@/components/ui/Icon";

/**
 * Renders a resolved token stream as signs.
 *
 * Three tiers, each falling back to the next: a video of the sign, a still
 * photograph of it, or the word fingerspelled letter by letter. The tiers exist
 * because the vocabulary is being filled in over time — a word with no video
 * yet still shows its photograph, and a word with neither is still spelled out
 * rather than silently dropped.
 *
 * The class names are the ones the 19 migrated stylesheets already target
 * (`.sign-item`, `.sign-header`, `.sign-content`, `.sign-letter`,
 * `.sign-image`), so this inherits the existing look on all nine pages that
 * carry a translator without touching any of those sheets.
 */

export type SignSequenceProps = {
  tokens: ResolvedToken[];
  /** Image box size in px, from the existing Size control. */
  size: number;
  /** Fixed-width cards, from the existing checkbox. */
  fixedWidth: boolean;
  /** Index currently being played, or null when the sequencer is idle. */
  activeIndex: number | null;
};

export default function SignSequence({
  tokens,
  size,
  fixedWidth,
  activeIndex,
}: SignSequenceProps) {
  if (tokens.length === 0) {
    return (
      <div className="empty-result">
        <Icon name="sign-language" />
        <p>Enter text to see translation</p>
      </div>
    );
  }

  const itemWidth = fixedWidth ? `${size}px` : undefined;

  return (
    <>
      {tokens.map((token, i) => {
        const active = activeIndex === i;
        const className = active ? "sign-item is-playing" : "sign-item";

        if (token.kind === "sign") {
          const { entry } = token;
          return (
            <div className={className} key={`${entry.gloss}-${i}`} style={{ width: itemWidth }}>
              <div className="sign-header">{entry.words[0]}</div>
              <div className="sign-content">
                <SignMedia entry={entry} size={size} active={active} />
              </div>
            </div>
          );
        }

        return (
          <div className={className} key={`${token.source}-${i}`} style={{ width: itemWidth }}>
            <div className="sign-header">
              {token.source}
              {/* Says plainly that this word is being spelled, not signed. */}
              <span className="sign-badge">spelled</span>
            </div>
            <div className="sign-content">
              {token.letters.map((l, j) => (
                <div className="sign-letter" key={j}>
                  <div
                    className="sign-image"
                    style={{ width: `${size - 40}px`, height: `${size - 20}px` }}
                  >
                    <img src={l.src} alt={`Sign for ${l.letter}`} loading="lazy" decoding="async" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

/** Video where one has been licensed, still photograph otherwise. */
function SignMedia({
  entry,
  size,
  active,
}: {
  entry: Extract<ResolvedToken, { kind: "sign" }>["entry"];
  size: number;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const box = size + 20;

  // Play the clip while the sequencer is on this sign, rewind when it moves on.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (active) {
      el.currentTime = 0;
      // Autoplay can be refused; the poster stays up, which is fine.
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [active]);

  if (entry.video) {
    return (
      <div className="sign-word-media" style={{ width: `${box}px`, height: `${box}px` }}>
        <video
          ref={videoRef}
          src={entry.video.src}
          poster={entry.video.poster ?? entry.image}
          muted
          playsInline
          loop
          preload="none"
          aria-label={`Sign for ${entry.words[0]}`}
        />
      </div>
    );
  }

  if (entry.image) {
    return (
      <div className="sign-word-media" style={{ width: `${box}px`, height: `${box}px` }}>
        <img
          src={entry.image}
          alt={`Sign for ${entry.words[0]} in American Sign Language`}
          width={entry.width}
          height={entry.height}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return <span className="sign-missing">{entry.gloss}</span>;
}
