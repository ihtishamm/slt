"use client";

import { useEffect, useState } from "react";
import { babySigns } from "@/data/baby-signs";

const STORAGE_KEY = "bsl-learned";
const TRACKED = babySigns.slice(0, 20);

/**
 * "Signs learned" progress tracker, persisted per browser.
 *
 * Replaces the legacy `toggleLearned()` / `resetTracker()` / `shareProgress()`
 * inline handlers. Reads happen after mount so the server-rendered markup and
 * the first client render agree (no hydration mismatch).
 */
export default function BabySignTracker() {
  const [learned, setLearned] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLearned(JSON.parse(raw));
    } catch {
      /* private mode or blocked storage: fall back to an empty tracker */
    }
    setHydrated(true);
  }, []);

  const persist = (next: number[]) => {
    setLearned(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore write failures */
    }
  };

  const toggle = (i: number) =>
    persist(learned.includes(i) ? learned.filter((x) => x !== i) : [...learned, i]);

  const reset = () => {
    if (!confirm("Reset all progress?")) return;
    setLearned([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const share = async () => {
    const msg = `🤟 My baby has learned ${learned.length} sign${learned.length !== 1 ? "s" : ""} out of ${TRACKED.length}! Learning baby sign language with BabySignGuide. #BabySignLanguage`;
    if (navigator.share) {
      try { await navigator.share({ text: msg }); } catch { /* dismissed */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(msg);
      alert("Progress copied to clipboard! Share it anywhere 🎉");
    } catch {
      /* clipboard unavailable */
    }
  };

  const count = hydrated ? learned.length : 0;

  return (
    <>
      <div className="tracker-header">
        <div>
          <div className="tracker-score">
            <span id="learned-count">{count}</span> <small>/ {TRACKED.length} signs learned</small>
          </div>
        </div>
        <button
          onClick={reset}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-light)",
            fontSize: "0.85rem",
          }}
        >
          Reset ↺
        </button>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          id="progress-fill"
          style={{ width: `${(count / TRACKED.length) * 100}%` }}
        />
      </div>

      <div className="tracker-signs" id="tracker-signs">
        {TRACKED.map((s, i) => {
          const done = learned.includes(i);
          return (
            <div
              key={s.name}
              className={done ? "tracker-sign learned" : "tracker-sign"}
              role="checkbox"
              aria-checked={done}
              tabIndex={0}
              onClick={() => toggle(i)}
              onKeyDown={(e) => { if (e.key === "Enter") toggle(i); }}
            >
              <span className="ts-emoji">{s.emoji}</span>
              {s.name}
              {done ? " ✓" : ""}
            </div>
          );
        })}
      </div>

      <button className="tracker-btn" onClick={share}>
        🎉 Share My Baby&apos;s Progress
      </button>
    </>
  );
}
