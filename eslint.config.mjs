import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  ...compat.extends("next/core-web-vitals"),
  globalIgnores([".next/**", "node_modules/**", "blogs/**", "public/**", "_archive/**", "tools/**"]),
  {
    rules: {
      /*
       * Page copy was migrated verbatim from the old HTML and is full of
       * ordinary apostrophes and quotes ("don't", "the \"J\" sign"). These are
       * valid in JSX and render correctly; forcing them to HTML entities would
       * only make the prose harder to edit.
       */
      "react/no-unescaped-entities": "off",
      /*
       * The migrated pages size images entirely through CSS classes
       * (`.alphabet-card img`, `.sign-image img`, …). `next/image` requires
       * explicit width/height and renders its own wrapper element, which would
       * change the box model those rules depend on. Plain `<img>` is a
       * deliberate choice here, not an oversight.
       */
      "@next/next/no-img-element": "off",
      /* App Router loads fonts in the root layout; this rule targets the Pages Router. */
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default config;
