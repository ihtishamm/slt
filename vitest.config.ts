import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/**
 * Tests cover the pure logic in `src/lib` — the gloss engine and the sign
 * lookup. Those are plain functions with no React or DOM in them, so the
 * default node environment is all that is needed; no jsdom, no setup file.
 */
export default defineConfig({
  resolve: {
    // Mirrors the `@/*` path alias in tsconfig.json.
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
