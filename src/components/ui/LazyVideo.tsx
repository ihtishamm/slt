"use client";

import { useState } from "react";

export type LazyVideoProps = {
  /** YouTube video id. */
  videoId: string;
  /** Poster image shown until the viewer clicks play. */
  thumbnail: string;
  alt: string;
};

/**
 * Click-to-load YouTube embed.
 *
 * Replaces the `videoBox` inline script duplicated across three pages. Nothing
 * is requested from YouTube until the viewer actually clicks, which keeps the
 * third-party player off the critical path.
 */
export default function LazyVideo({ videoId, thumbnail, alt }: LazyVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      id="videoBox"
      onClick={() => setPlaying(true)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "600px",
        aspectRatio: "16/9",
        overflow: "hidden",
        borderRadius: "16px",
        cursor: "pointer",
        margin: "20px auto",
      }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={alt}
          style={{ width: "100%", height: "100%", border: "none", borderRadius: "16px" }}
        />
      ) : (
        <>
          <img
            id="thumbnail"
            src={thumbnail}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70px",
              height: "70px",
              background: "rgba(0,0,0,0.6)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: "28px", lineHeight: 1 }}>▶</span>
          </div>
        </>
      )}
    </div>
  );
}
