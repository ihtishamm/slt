"use client";

import { useEffect, useState } from "react";
import { babySigns, babySignCategories, type BabySign } from "@/data/baby-signs";

/**
 * Category tabs + sign grid + detail modal for the baby sign page.
 *
 * Replaces the legacy `filterSigns()` / `openModal()` inline handlers. The old
 * page shipped the modal's stylesheet (`.sign-modal-overlay`, `.modal-emoji`,
 * …) but never rendered the markup, so clicking a card threw a TypeError. The
 * modal is implemented here as originally designed.
 */
export default function BabySignExplorer() {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<BabySign | null>(null);

  const visible = filter === "all" ? babySigns : babySigns.filter((s) => s.cat === filter);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  const levelClass = (level: BabySign["level"]) =>
    level === "Medium" ? "med" : level === "Advanced" ? "adv" : "";

  return (
    <>
      <div className="sign-tabs" role="tablist">
        {babySignCategories.map((c) => (
          <button
            key={c.key}
            className={filter === c.key ? "tab-btn active" : "tab-btn"}
            role="tab"
            aria-selected={filter === c.key}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="signs-grid reveal visible" id="signs-grid" role="list">
        {visible.map((s) => (
          <div
            key={s.name}
            className="sign-card"
            role="listitem"
            tabIndex={0}
            aria-label={`Learn the ${s.name} sign`}
            onClick={() => setSelected(s)}
            onKeyDown={(e) => { if (e.key === "Enter") setSelected(s); }}
          >
            <div className="s-emoji" aria-hidden="true">{s.emoji}</div>
            <div className="s-name">{s.name}</div>
            <div className={`s-level ${levelClass(s.level)}`}>{s.level}</div>
          </div>
        ))}
      </div>

      <div
        className={selected ? "sign-modal-overlay open" : "sign-modal-overlay"}
        onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        role="dialog"
        aria-modal="true"
        aria-label={selected ? `${selected.name} sign` : undefined}
      >
        {selected && (
          <div className="sign-modal">
            <button className="modal-close" aria-label="Close" onClick={() => setSelected(null)}>
              ×
            </button>
            <div className="modal-emoji" aria-hidden="true">{selected.emoji}</div>
            <div className="modal-name">{selected.name}</div>
            <div className="modal-category-tag">
              <span
                style={{
                  background: "var(--blush)",
                  color: "var(--terracotta)",
                  padding: "4px 12px",
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {selected.cat.charAt(0).toUpperCase() + selected.cat.slice(1)}
              </span>
            </div>
            <div className="modal-how">
              <strong>How to sign it</strong>
              {selected.how}
            </div>
            <div className="modal-when">🕐 When to use: {selected.when}</div>
          </div>
        )}
      </div>
    </>
  );
}
