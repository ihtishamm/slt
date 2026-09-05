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
      /*
       * Root-level asset paths, carried over from the old .htaccess.
       *
       * Before the assets/ reorganisation these files sat in the document root,
       * and the .htaccess rewrote the old URLs internally so they kept
       * answering 200 and kept their search ranking. Those rules stop applying
       * the moment this app is served by Node instead of Apache, which would
       * 404 every root-level image URL that is still indexed — 94 of them, and
       * the home page's own og:image was among the paths that only ever
       * resolved this way.
       *
       * Rewrites, not redirects, exactly as before: the URL does not change, so
       * nothing has to be re-crawled.
       *
       * The WordPress blog still runs at /blogs on the origin server; it is not
       * part of this app, and nothing here shadows it.
       */
      {
        source: "/:file(.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico))",
        destination: "/assets/images/:file",
      },
      /*
       * The old /style.css and /script.js are deliberately NOT rewritten. Their
       * .htaccess rules pointed at assets/css/ and assets/js/, which no longer
       * exist — that CSS and JS is compiled into hashed Next bundles now. A
       * rewrite would just be a 404 dressed up as configuration. Only the
       * images are worth preserving: they are the URLs Google Images indexes
       * and that other sites hotlink.
       */
    ];
  },

  /*
   * Cache lifetimes for everything under public/, replacing the mod_expires
   * block in the old .htaccess. Next sets its own immutable headers on
   * /_next/static, but static files in public/ get none by default.
   *
   * These are content-addressed by name rather than by hash, so a month is the
   * limit worth risking: a replaced image keeps its filename, and anyone who
   * already has it cached will not see the new one until it expires.
   */
  async headers() {
    return [
      {
        source: "/:path*.(png|jpg|jpeg|webp|gif|svg|ico|woff|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
    ];
  },
};

export default nextConfig;
