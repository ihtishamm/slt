"use client";

import Link from "next/link";
import { useEffect } from "react";
// same header/footer styling as the rest of the site, matching not-found.tsx
import "@/styles/home.css";

/**
 * Route-level error boundary.
 *
 * Without this a client-side throw renders a blank page — Next's built-in
 * fallback only shows a useful message in development. The translator is the
 * most interactive part of the site, so an uncaught error there is the most
 * likely way a visitor ends up staring at nothing.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in the browser console and in the server logs for a digest-only
    // production error, which is otherwise opaque.
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main>
      <div className="main-title">
        <h1>Something went wrong</h1>
        <p>
          That page hit an unexpected error. Try again, or head back to the{" "}
          <Link href="/">sign language translator</Link>.
        </p>
        <p>
          <button type="button" className="btn primary-btn" onClick={reset}>
            Try again
          </button>
        </p>
        {error.digest ? <p><small>Reference: {error.digest}</small></p> : null}
      </div>
    </main>
  );
}
