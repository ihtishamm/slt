/**
 * HTML -> JSX converter for the static-page migration.
 *
 * Deliberately conservative: it converts markup structure and attributes, and
 * *reports* anything it cannot faithfully express (inline handlers, unknown
 * attributes) rather than silently dropping it.
 */

const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
  "meta", "param", "source", "track", "wbr",
]);

// HTML attribute -> JSX prop. Anything not listed and not data-/aria- is reported.
const ATTR = {
  class: "className",
  for: "htmlFor",
  colspan: "colSpan",
  rowspan: "rowSpan",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  maxlength: "maxLength",
  minlength: "minLength",
  tabindex: "tabIndex",
  readonly: "readOnly",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  novalidate: "noValidate",
  enctype: "encType",
  formaction: "formAction",
  accesskey: "accessKey",
  contenteditable: "contentEditable",
  crossorigin: "crossOrigin",
  datetime: "dateTime",
  srcset: "srcSet",
  srclang: "srcLang",
  usemap: "useMap",
  itemprop: "itemProp",
  itemscope: "itemScope",
  itemtype: "itemType",
  allowfullscreen: "allowFullScreen",
  frameborder: "frameBorder",
  marginwidth: "marginWidth",
  marginheight: "marginHeight",
  referrerpolicy: "referrerPolicy",
  playsinline: "playsInline",
  spellcheck: "spellCheck",
  inputmode: "inputMode",
  // SVG
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "stroke-opacity": "strokeOpacity",
  "fill-opacity": "fillOpacity",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  "text-anchor": "textAnchor",
  "xlink:href": "xlinkHref",
  viewbox: "viewBox",
  preserveaspectratio: "preserveAspectRatio",
  gradientunits: "gradientUnits",
  patternunits: "patternUnits",
};

// Valueless HTML attributes that are real React booleans.
const BOOL = new Set([
  "checked", "disabled", "selected", "readonly", "required", "multiple",
  "controls", "autoplay", "loop", "muted", "default", "open", "reversed",
  "hidden", "async", "defer", "novalidate", "allowfullscreen", "playsinline",
  "itemscope", "autofocus",
]);

function camel(prop) {
  if (prop.startsWith("--")) return prop; // CSS custom property: keep as-is
  return prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/** `style="a: b; c: d"` -> a JS object literal string. */
function styleToObject(value) {
  const entries = [];
  // split on ; not inside parentheses (url(), rgba(), etc.)
  let depth = 0, cur = "";
  for (const ch of value) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === ";" && depth === 0) { entries.push(cur); cur = ""; }
    else cur += ch;
  }
  if (cur.trim()) entries.push(cur);

  const props = [];
  for (const e of entries) {
    const i = e.indexOf(":");
    if (i === -1) continue;
    const key = e.slice(0, i).trim();
    const val = e.slice(i + 1).trim();
    if (!key || !val) continue;
    const jsKey = camel(key);
    const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(jsKey) ? jsKey : JSON.stringify(jsKey);
    props.push(`${safeKey}: ${JSON.stringify(val)}`);
  }
  return props.length ? `{{ ${props.join(", ")} }}` : null;
}

/** Escape a text node for JSX. */
function escapeText(text) {
  return text.replace(/[{}]/g, (m) => `{'${m}'}`).replace(/\\/g, "\\\\");
}

function attrsToJsx(node, ctx) {
  const out = [];
  const raw = node.rawAttributes || {};
  for (const [name, value] of Object.entries(raw)) {
    const lower = name.toLowerCase();

    if (lower.startsWith("on")) { ctx.handlers.push(`${node.rawTagName}[${lower}="${value}"]`); continue; }
    if (lower === "style") {
      const obj = styleToObject(value);
      if (obj) out.push(`style=${obj}`);
      continue;
    }
    if (lower.startsWith("data-") || lower.startsWith("aria-")) {
      out.push(`${lower}=${JSON.stringify(value)}`);
      continue;
    }
    const mapped = ATTR[lower] ?? (/^[a-z]+$/.test(lower) ? lower : null);
    if (!mapped) { ctx.unknown.push(`${node.rawTagName}[${name}]`); continue; }

    // Valueless attribute (`<input required>`): node-html-parser reports null.
    // An empty string is a real, meaningful value (e.g. `<option value="">`)
    // and must be preserved.
    if (value === null || value === undefined) {
      if (BOOL.has(lower)) { out.push(`${mapped}`); continue; }
      // not a real boolean prop (e.g. the legacy `active` on <li>): drop, report
      ctx.unknown.push(`${node.rawTagName}[${name}] (valueless, dropped)`);
      continue;
    }
    out.push(`${mapped}=${JSON.stringify(value)}`);
  }
  return out;
}

function convertNode(node, ctx, depth) {
  const pad = "  ".repeat(depth);

  // text
  if (node.nodeType === 3) {
    const t = node.rawText;
    if (!t.trim()) return "";
    return pad + escapeText(t.trim()) + "\n";
  }
  if (node.nodeType !== 1) return "";

  const tag = node.rawTagName;
  if (!tag) return "";
  const lower = tag.toLowerCase();

  if (lower === "script" || lower === "style" || lower === "noscript") {
    ctx.stripped.push(lower);
    return "";
  }

  const attrs = attrsToJsx(node, ctx);
  const attrStr = attrs.length ? " " + attrs.join(" ") : "";

  if (VOID.has(lower)) return `${pad}<${lower}${attrStr} />\n`;

  // Internal links become next/link so navigation stays client-side.
  // `/blogs` is the separate WordPress install, so it stays a plain anchor.
  let name = lower;
  if (lower === "a") {
    const href = node.getAttribute("href");
    const internal =
      href &&
      href.startsWith("/") &&
      !href.startsWith("/blogs") &&
      !/\.(png|jpe?g|webp|gif|svg|ico|css|js|xml|txt|pdf)$/i.test(href.split("?")[0]);
    if (internal) { name = "Link"; ctx.usesLink = true; }
  }

  const kids = node.childNodes.map((c) => convertNode(c, ctx, depth + 1)).join("");
  if (!kids.trim()) return `${pad}<${name}${attrStr}></${name}>\n`;
  return `${pad}<${name}${attrStr}>\n${kids}${pad}</${name}>\n`;
}

/** Convert a parsed node's children to a JSX string. */
function toJsx(node, depth = 0) {
  const ctx = { handlers: [], unknown: [], stripped: [], usesLink: false };
  const jsx = node.childNodes.map((c) => convertNode(c, ctx, depth)).join("");
  return { jsx, ...ctx };
}

module.exports = { toJsx, convertNode, styleToObject, VOID };
