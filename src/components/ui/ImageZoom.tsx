"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ZoomContextValue = { open: (src: string) => void };

const ZoomContext = createContext<ZoomContextValue | null>(null);

/**
 * Lightbox for the sign images.
 *
 * Replaces the `openZoom()` / `closeZoom()` inline scripts that were duplicated
 * across three pages. Wrap a page in `<ImageZoomProvider>` and render zoomable
 * images with `<ZoomableImage>`.
 */
export function ImageZoomProvider({ children }: { children: ReactNode }) {
  const [src, setSrc] = useState<string | null>(null);

  return (
    <ZoomContext.Provider value={{ open: setSrc }}>
      {children}
      <div
        id="zoomOverlay"
        onClick={() => setSrc(null)}
        style={{
          display: src ? "flex" : "none",
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        {src && (
          <img
            id="zoomImage"
            src={src}
            alt=""
            style={{ maxWidth: "92%", maxHeight: "92%", borderRadius: "10px" }}
          />
        )}
      </div>
    </ZoomContext.Provider>
  );
}

/** An `<img>` that opens in the lightbox when clicked. */
export function ZoomableImage(props: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) {
  const ctx = useContext(ZoomContext);
  return <img {...props} alt={props.alt ?? ""} onClick={() => ctx?.open(props.src ?? "")} />;
}
