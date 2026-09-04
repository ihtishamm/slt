import type { NextConfig } from "next";

/** Legacy `.html` URLs and old directory URLs, 301'd to their new routes. */
const legacyPages = [
  "about",
  "contact",
  "privacy",
  "terms-and-condition",
  "sign-language-alphabet-in-spanish",
];

const directoryPages = [
  "abc-in-sign-language",
  "australian-sign-language",
  "baby-sign-language",
  "british-sign-language",
  "chinese-sign-language",
  "french-sign-language",
  "german-sign-language",
  "japanese-sign-language",
  "mexican-sign-language",
  "sign-language-alphabet",
  "sign-language-words",
  "spanish-sign-language",
];

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },

  async redirects() {
    return [
      // /about.html -> /about
      ...legacyPages.map((p) => ({
        source: `/${p}.html`,
        destination: `/${p}`,
        permanent: true,
      })),
      // /british-sign-language/index.html -> /british-sign-language
      ...directoryPages.map((p) => ({
        source: `/${p}/index.html`,
        destination: `/${p}`,
        permanent: true,
      })),
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },

  async rewrites() {
    return [
      // The WordPress blog still runs at /blogs on the origin server; it is not
      // part of this app. Nothing here should shadow it.
    ];
  },
};

export default nextConfig;
