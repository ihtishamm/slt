/**
 * The site's icon set, inline.
 *
 * These replace a render-blocking Font Awesome stylesheet loaded from a CDN on
 * every page. The whole site uses seventeen icons; pulling ~100 KB of CSS and a
 * webfont across a third-party connection to draw them was the single most
 * expensive thing in the critical path.
 *
 * Each icon renders inside an `<i>` element on purpose: two migrated rules —
 * `.action-btn i` and `.empty-result i` — size icons with `font-size`, and the
 * `1em` box below scales with it. Keeping the `<i>` means neither rule had to
 * change.
 *
 * Paths are drawn for this project, so nothing here carries an outside licence.
 * Social marks are not here: they already live as data in src/data/social.ts.
 */

export type IconName =
  | "arrow-up"
  | "bars"
  | "times"
  | "envelope"
  | "briefcase"
  | "graduation-cap"
  | "language"
  | "font"
  | "sign-language"
  | "microphone"
  | "microphone-slash"
  | "play"
  | "stop"
  | "send"
  | "sliders"
  | "keyboard";

type Shape = { d: string; fill?: boolean };

const ICONS: Record<IconName, Shape[]> = {
  "arrow-up": [{ d: "M12 19V5M5 12l7-7 7 7" }],
  bars: [{ d: "M3 6h18M3 12h18M3 18h18" }],
  times: [{ d: "M18 6 6 18M6 6l12 12" }],
  envelope: [{ d: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" }, { d: "m3 7 9 6 9-6" }],
  briefcase: [
    { d: "M3 8h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z" },
    { d: "M9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" },
  ],
  "graduation-cap": [{ d: "m2 9 10-5 10 5-10 5z" }, { d: "M6 12v4c0 1.1 2.7 2 6 2s6-.9 6-2v-4" }],
  // An "A" beside brush strokes: the alphabet and a written language.
  language: [
    { d: "M4 6h9M8.5 4v2c0 3.5-2 6.5-5 8M6.5 11c1.2 2.2 3.3 4 5.5 4.7" },
    { d: "m12.5 20 4.5-10 4.5 10M14.5 16.5h5" },
  ],
  font: [{ d: "m5 19 6-14 6 14M8 14h6" }],
  // An open hand, for the empty-result placeholder.
  "sign-language": [
    { d: "M8 12V6.5a1.5 1.5 0 0 1 3 0V11" },
    { d: "M11 11V4.5a1.5 1.5 0 0 1 3 0V11" },
    { d: "M14 11V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a5 5 0 0 1-5-5v-3.5a1.5 1.5 0 0 1 3 0V13" },
  ],
  microphone: [
    { d: "M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z" },
    { d: "M5 11a7 7 0 0 0 14 0M12 18v3" },
  ],
  "microphone-slash": [
    { d: "M9 6a3 3 0 0 1 6 0v6M9 10v2a3 3 0 0 0 4.5 2.6" },
    { d: "M5 11a7 7 0 0 0 10.5 6M19 11v1M12 18v3" },
    { d: "m3 3 18 18" },
  ],
  // A paper plane, the universal "send this" affordance.
  send: [{ d: "M21.5 12 3 4.5l3 7.5-3 7.5z", fill: true }, { d: "M6 12h15.5" }],
  sliders: [{ d: "M4 8h10M18 8h2M4 16h4M12 16h8" }, { d: "M16 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0M10 16a2 2 0 1 0-4 0 2 2 0 0 0 4 0" }],
  keyboard: [
    { d: "M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" },
    { d: "M7 10h.01M11 10h.01M15 10h.01M17 10h.01M7 14h10" },
  ],
  play: [{ d: "M7 4.5 19 12 7 19.5z", fill: true }],
  stop: [{ d: "M6.5 6.5h11v11h-11z", fill: true }],
};

export type IconProps = {
  name: IconName;
  /** Extra classes on the wrapping <i>, e.g. a legacy hook. */
  className?: string;
  /** Accessible name. Omit for icons that sit beside their own label. */
  title?: string;
  style?: React.CSSProperties;
};

export default function Icon({ name, className, title, style }: IconProps) {
  const shapes = ICONS[name];

  return (
    <i className={className ? `icon ${className}` : "icon"} style={style}>
      <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        // Decorative unless it is the only thing naming its control.
        role={title ? "img" : undefined}
        aria-hidden={title ? undefined : true}
      >
        {title ? <title>{title}</title> : null}
        {shapes.map((shape, i) => (
          <path
            key={i}
            d={shape.d}
            fill={shape.fill ? "currentColor" : "none"}
            stroke={shape.fill ? "none" : "currentColor"}
          />
        ))}
      </svg>
    </i>
  );
}
