/**
 * Generates `src/app/<route>/page.tsx` from each legacy HTML page.
 *
 * Structural elements (header, footer, scripts) are dropped because the layout
 * and components now own them. Interactive widgets are swapped for their React
 * equivalents. Everything else is converted verbatim.
 */
const fs = require("fs");
const path = require("path");
const { parse } = require("node-html-parser");
const { toJsx } = require("./html-to-jsx.cjs");

const ROUTES = require("./routes.cjs");
const META = JSON.parse(fs.readFileSync("tools/meta.json", "utf8"));

const ORIGIN = /^https?:\/\/(www\.)?sltranslator\.com/i;

/**
 * Some legacy metadata still points at pre-reorganisation asset paths
 * (`/iloveyou.png`), which only resolved thanks to an .htaccess rewrite. Map
 * those onto the real file under public/ so they work without server rules.
 */
function fixAssetPath(u) {
  const clean = u.split("?")[0];
  if (fs.existsSync(path.join("public", clean))) return u;
  const moved = path.posix.join("/assets/images", path.posix.basename(clean));
  if (fs.existsSync(path.join("public", moved))) return moved;
  return u;
}

/** Rewrite a legacy URL to a site-absolute Next.js route or asset path. */
function rewriteUrl(url, pageDir) {
  if (!url) return url;
  const trimmed = url.trim();
  if (/^(mailto:|tel:|#|data:)/i.test(trimmed)) return trimmed;

  let u = trimmed;
  let external = false;

  if (ORIGIN.test(u)) u = u.replace(ORIGIN, "") || "/";
  else if (/^https?:\/\//i.test(u) || u.startsWith("//")) external = true;

  if (external) return u;

  // Resolve relative paths against the page's own directory. `pageDir` is
  // already absolute, so join+normalize is enough — prefixing another "/" here
  // produced "//contact" for root-level pages.
  if (!u.startsWith("/")) u = path.posix.normalize(path.posix.join(pageDir, u));

  // assets keep their exact path; only page routes get normalised
  const isAsset = /\.(png|jpe?g|webp|gif|svg|ico|css|js|xml|txt|pdf)$/i.test(u.split("?")[0]);
  if (isAsset) return fixAssetPath(u);

  u = u.replace(/index\.html$/i, "").replace(/\.html$/i, "");
  if (u.length > 1) u = u.replace(/\/+$/, "");
  return u || "/";
}

/** Rewrite every href/src in the tree, in place. */
function rewriteTree(root, pageDir, report) {
  for (const el of root.querySelectorAll("*")) {
    for (const attr of ["href", "src", "value", "action", "content"]) {
      const v = el.getAttribute(attr);
      if (!v) continue;
      if (attr === "value" && el.rawTagName?.toLowerCase() !== "option") continue;
      if (attr === "content") continue;
      const next = rewriteUrl(v, pageDir);
      if (next !== v) {
        el.setAttribute(attr, next);
        report.push(`${v} -> ${next}`);
      }
    }
    // srcset
    const ss = el.getAttribute("srcset");
    if (ss) {
      el.setAttribute(
        "srcset",
        ss.split(",").map((p) => {
          const [u, d] = p.trim().split(/\s+/, 2);
          return [rewriteUrl(u, pageDir), d].filter(Boolean).join(" ");
        }).join(", "),
      );
    }
  }
}

/** Swap interactive widgets for placeholders that become React components. */
function swapWidgets(root, route) {
  const swaps = { translator: false, zoom: 0, video: 0 };

  // the translator: the `.container` that holds the input card
  const input = root.querySelector(".input-section");
  if (input) {
    let node = input;
    while (node.parentNode && !(node.classNames || "").includes("container")) node = node.parentNode;
    const target = (node.classNames || "").includes("container") ? node : input;
    target.replaceWith(parse("<div>@@TRANSLATOR@@</div>").firstChild);
    swaps.translator = true;
  }

  // zoomable images
  for (const img of root.querySelectorAll("img")) {
    const on = img.getAttribute("onclick");
    if (on && /openZoom/.test(on)) {
      img.removeAttribute("onclick");
      img.setAttribute("data-zoomable", "true");
      swaps.zoom++;
    }
  }

  // the click-to-play video box
  const vb = root.querySelector("#videoBox");
  if (vb) {
    const thumb = vb.querySelector("#thumbnail");
    const src = thumb?.getAttribute("src") || "";
    const alt = thumb?.getAttribute("alt") || "";
    vb.replaceWith(parse(`<div>@@VIDEO:${src}|${alt}@@</div>`).firstChild);
    swaps.video++;
  }

  // the zoom overlay is provided by ImageZoomProvider now
  root.querySelector("#zoomOverlay")?.remove();

  // baby-sign-language: the category tabs + grid, and the progress tracker
  const tabs = root.querySelector(".category-tabs");
  const grid = root.querySelector("#signs-grid");
  if (tabs && grid) {
    grid.remove();
    tabs.replaceWith(parse("<div>@@BABY_EXPLORER@@</div>").firstChild);
    swaps.babyExplorer = true;
  }
  const trackerBox = root.querySelector(".tracker-box");
  if (trackerBox) {
    trackerBox.set_content("@@BABY_TRACKER@@");
    swaps.babyTracker = true;
  }

  return swaps;
}

const VIDEO_ID = "dqmuJrdLO1Y";

function componentName(slug) {
  return slug.split(/[^a-z0-9]+/i).filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1)).join("") + "Page";
}

const TRANSLATOR_LABELS = {
  asl: { heading: "Text To American Sign Language", convert: "Convert to ASL Sign Language" },
};

function translatorProps(r, root) {
  const heading = root.__headingText || TRANSLATOR_LABELS[r.translator]?.heading || "Sign Language Translator";
  const convert = root.__convertText || TRANSLATOR_LABELS[r.translator]?.convert || "Translate";
  return `<Translator alphabet="${r.translator}" heading={${JSON.stringify(heading)}} convertLabel={${JSON.stringify(convert)}} />`;
}

const summary = [];
const fallbackBody = [];

for (const r of ROUTES) {
  const html = fs.readFileSync(r.file, "utf8");
  const root = parse(html, { comment: false });
  const meta = META[r.route];
  const pageDir = path.posix.dirname("/" + r.file) === "/" ? "/" : path.posix.dirname("/" + r.file) + "/";

  // capture translator labels before the widget is swapped out
  const headingText = root.querySelector(".input-section h2")?.text.trim();
  const convertText = root.querySelector("#translate-btn")?.text.replace(/\s+/g, " ").trim();
  root.__headingText = headingText;
  root.__convertText = convertText;

  // A few legacy pages have malformed <head> markup that stops the parser from
  // exposing a <body> element; fall back to slicing the body out textually.
  let body = root.querySelector("body");
  if (!body) {
    const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!m) throw new Error(`cannot locate <body> in ${r.file}`);
    body = parse(m[1], { comment: false });
    fallbackBody.push(r.file);
  }
  body.querySelectorAll("header").forEach((n) => n.remove());
  body.querySelectorAll("footer").forEach((n) => n.remove());
  body.querySelectorAll("script").forEach((n) => n.remove());
  body.querySelectorAll("noscript").forEach((n) => n.remove());
  body.querySelectorAll("style").forEach((n) => n.remove());

  // `hre="..."` is a typo for `href` that appears on nine of the legacy pages,
  // leaving those links dead. Normalise it so the fix carries into the app.
  const typos = [];
  for (const el of body.querySelectorAll("[hre]")) {
    const v = el.getAttribute("hre");
    el.removeAttribute("hre");
    el.setAttribute("href", v);
    typos.push(v);
  }

  const urlReport = [];
  rewriteTree(body, pageDir, urlReport);
  const swaps = swapWidgets(body, r.route);

  const { jsx, handlers, unknown, stripped, usesLink } = toJsx(body, 3);

  let content = jsx;
  if (swaps.translator) {
    content = content.replace(
      /^(\s*)<div>\s*\n\s*@@TRANSLATOR@@\s*\n\s*<\/div>\s*$/m,
      (_m, pad) => pad + translatorProps(r, root),
    );
  }
  content = content.replace(
    /<div>\s*\n\s*@@VIDEO:([^|]*)\|([^@]*)@@\s*\n\s*<\/div>/g,
    (_m, src, alt) => `<LazyVideo videoId="${VIDEO_ID}" thumbnail=${JSON.stringify(src)} alt={${JSON.stringify(alt)}} />`,
  );
  // zoomable images
  content = content.replace(/<img ([^>]*?)data-zoomable="true"([^>]*?)\/>/g,
    (_m, a, b) => `<ZoomableImage ${a}${b}/>`);
  content = content.replace(/<div>\s*\n\s*@@BABY_EXPLORER@@\s*\n\s*<\/div>/g, "<BabySignExplorer />");
  content = content.replace(/@@BABY_TRACKER@@/g, "<BabySignTracker />");

  // behaviour-only helpers, attached when the page contains their markup
  const usesFaq = /className="faq-q"/.test(content) || /faq-item/.test(content);
  const usesReveal = /\breveal\b/.test(content);

  const usesBaby = /<BabySignExplorer|<BabySignTracker/.test(content);
  const usesZoom = /<ZoomableImage/.test(content);
  const usesVideo = /<LazyVideo/.test(content);
  const usesTranslator = /<Translator/.test(content);

  const imports = [];
  if (usesLink) imports.push(`import Link from "next/link";`);
  if (usesTranslator) imports.push(`import Translator from "@/components/translator/Translator";`);
  if (usesZoom) imports.push(`import { ImageZoomProvider, ZoomableImage } from "@/components/ui/ImageZoom";`);
  if (usesVideo) imports.push(`import LazyVideo from "@/components/ui/LazyVideo";`);
  if (usesBaby) imports.push(`import BabySignExplorer from "@/components/baby/BabySignExplorer";`);
  if (usesBaby) imports.push(`import BabySignTracker from "@/components/baby/BabySignTracker";`);
  if (usesFaq) imports.push(`import FaqAccordion from "@/components/ui/FaqAccordion";`);
  if (usesReveal) imports.push(`import ScrollReveal from "@/components/ui/ScrollReveal";`);
  if (meta.jsonld.length) imports.push(`import JsonLd from "@/components/seo/JsonLd";`);

  let jsonldConst = "";
  let jsonldJsx = "";
  if (meta.jsonld.length) {
    const parsed = meta.jsonld.map((s) => {
      try {
        // JSON-LD carries absolute image URLs; repoint any stale asset paths.
        const repaired = s.replace(
          /(https?:\/\/(?:www\.)?sltranslator\.com)(\/[^"'\s]*\.(?:png|jpe?g|webp|gif|svg|ico))/gi,
          (_m, origin, p) => origin + fixAssetPath(p),
        );
        return JSON.parse(repaired);
      } catch { return null; }
    }).filter(Boolean);
    if (parsed.length) {
      jsonldConst = `\nconst structuredData = ${JSON.stringify(parsed.length === 1 ? parsed[0] : parsed, null, 2)};\n`;
      jsonldJsx = `      <JsonLd data={structuredData} />\n`;
    }
  }

  const seo = {
    title: meta.title, description: meta.description, keywords: meta.keywords,
    path: r.route, robots: meta.robots,
    ogTitle: meta.ogTitle, ogDescription: meta.ogDesc,
    ogImage: meta.ogImage ? rewriteUrl(meta.ogImage, pageDir) : undefined,
    ogType: meta.ogType, twitterCard: meta.twCard, twitterTitle: meta.twTitle,
    twitterDescription: meta.twDesc,
    twitterImage: meta.twImage ? rewriteUrl(meta.twImage, pageDir) : undefined,
  };
  for (const k of Object.keys(seo)) if (!seo[k]) delete seo[k];

  const helpers =
    (usesFaq ? "      <FaqAccordion />\n" : "") +
    (usesReveal ? "      <ScrollReveal />\n" : "");
  const open = usesZoom ? "    <ImageZoomProvider>\n" : "";
  const close = usesZoom ? "    </ImageZoomProvider>\n" : "";
  const inner = usesZoom ? content.split("\n").map((l) => (l ? "  " + l : l)).join("\n") : content;

  const file = `import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
${imports.join("\n")}
import "@/styles/${r.css}.css";

export const metadata: Metadata = buildMetadata(${JSON.stringify(seo, null, 2)});
${jsonldConst}
export default function ${componentName(r.slug)}() {
  return (
    <>
${jsonldJsx}${helpers}${open}${inner}${close}    </>
  );
}
`;

  const dir = r.route === "/" ? "src/app" : `src/app${r.route}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), file);

  summary.push({ route: r.route, typos: typos.length, lines: file.split("\n").length, swaps, handlers: [...new Set(handlers)], unknown: [...new Set(unknown)], urls: urlReport.length });
}

console.log("route".padEnd(36) + "lines  translator zoom video  urls  leftover-handlers");
for (const s of summary) {
  console.log(
    s.route.padEnd(36) +
    String(s.lines).padStart(5) +
    String(s.swaps.translator ? "yes" : "-").padStart(11) +
    String(s.swaps.zoom).padStart(5) +
    String(s.swaps.video).padStart(6) +
    String(s.urls).padStart(6) + "  " +
    (s.handlers.length ? s.handlers.join(" ") : "-"),
  );
}
if (fallbackBody.length) console.log("\nbody sliced textually (malformed <head>):", fallbackBody.join(", "));
const fixedTypos = summary.filter((s) => s.typos).map((s) => `${s.route}(${s.typos})`);
if (fixedTypos.length) console.log("\nfixed `hre=` -> `href=` on:", fixedTypos.join(", "));
const allUnknown = [...new Set(summary.flatMap((s) => s.unknown))];
if (allUnknown.length) console.log("\nunknown/dropped attributes:", allUnknown.join(", "));
