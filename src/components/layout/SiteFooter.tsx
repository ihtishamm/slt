import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { socialIcons } from "@/data/social";
import { site } from "@/lib/site";

/**
 * Footer quick links.
 *
 * The old pages carried seven different link sets; this is the one used by 16
 * of the 18 pages, so it is the canonical set.
 */
const quickLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "ASL Translator", href: "/" },
  { label: "Sign Language Alphabet", href: "/sign-language-alphabet" },
  { label: "Sign Language Words", href: "/sign-language-words" },
];

/**
 * Site footer. Replaces the six near-identical `<footer>` blocks from the old
 * HTML pages; the only real differences between them were the copyright line
 * and which quick links were present.
 */
export default function SiteFooter({ showContact = true }: { showContact?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          {quickLinks.map((l, i) => (
            <span key={l.href}>
              <Link href={l.href}>{l.label}</Link>
              {i < quickLinks.length - 1 && <span className="separator">|</span>}
            </span>
          ))}
        </div>

        <div className="social-icons">
          {socialIcons.map((icon) => (
            <a
              key={icon.href}
              href={icon.href}
              className={`social-icon ${icon.cls}`}
              aria-label={icon.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox={icon.viewBox}>
                {icon.paths.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </svg>
            </a>
          ))}
        </div>

        <div className="footer-copyright">
          <span>
            {showContact && <>Contact Us - {site.email} | </>}
            Copyright © <Link href="/">SLtranslator.com</Link> {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
