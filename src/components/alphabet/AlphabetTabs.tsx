"use client";

import { useState } from "react";
import { alphabets, alphabetLabels, type AlphabetKey } from "@/data/alphabets";
import Link from "next/link";

const keyToHref: Record<AlphabetKey, string> = {
  asl: "/",
  bsl: "/british-sign-language",
  auslan: "/australian-sign-language",
  csl: "/chinese-sign-language",
  lsf: "/french-sign-language",
  dgs: "/german-sign-language",
  lsm: "/mexican-sign-language",
  lse: "/spanish-sign-language",
};

export default function AlphabetTabs() {
  const [activeKey, setActiveKey] = useState<AlphabetKey>("asl");
  const signMap = alphabets[activeKey];
  const keys = Object.keys(alphabetLabels) as AlphabetKey[];
  const signEntries = Object.entries(signMap);

  return (
    <div className="alphabet-tabs-section" style={{ width: "100%", margin: "2rem 0" }}>
      <div
        className="language-tabs"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        {keys.map((key) => {
          const isActive = key === activeKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveKey(key)}
              style={{
                padding: "10px 18px",
                borderRadius: "30px",
                border: "2px solid #6366f1",
                backgroundColor: isActive ? "#6366f1" : "#ffffff",
                color: isActive ? "#ffffff" : "#6366f1",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: isActive ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "none",
              }}
            >
              {alphabetLabels[key]}
            </button>
          );
        })}
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", color: "#1e293b", marginBottom: "0.5rem" }}>
          {alphabetLabels[activeKey]} Alphabet Grid
        </h3>
        <p style={{ color: "#64748b" }}>
          Viewing all {signEntries.length} sign handshapes.{" "}
          <Link href={keyToHref[activeKey]} style={{ color: "#6366f1", textDecoration: "underline" }}>
            Go to {alphabetLabels[activeKey]} Translator page →
          </Link>
        </p>
      </div>

      <div className="alphabet-grid">
        {signEntries.map(([letter, imgSrc]) => (
          <div key={letter} className="alphabet-card">
            <h3 style={{ textTransform: "uppercase" }}>
              {letter} in {alphabetLabels[activeKey].split(" ")[0]} sign
            </h3>
            <img
              src={imgSrc}
              alt={`${letter.toUpperCase()} in ${alphabetLabels[activeKey]}`}
              width={150}
              height={140}
              loading="lazy"
              decoding="async"
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
