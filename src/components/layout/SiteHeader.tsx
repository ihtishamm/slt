"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav } from "@/data/navigation";

/**
 * Site header with the mobile nav toggle.
 *
 * Replaces the six near-identical `<header>` blocks that were copy-pasted
 * across the old HTML pages, plus the three separate mobile-menu scripts.
 *
 * Note: the legacy markup marked the current page with a valueless `active`
 * attribute (`<li class="nav-item" active>`), but the stylesheet targets the
 * `.nav-item.active` *class* — so the highlight never actually rendered. That
 * behaviour is reproduced here as-is. To switch it on, pass `highlightActive`.
 */
export default function SiteHeader({ highlightActive = false }: { highlightActive?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="main-header">
      <div className="nav-container">
        <Link href="/" className="site-brand">
          <img
            src="/assets/images/sltranslatorlogo.png"
            alt="Sign Language Translator"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </Link>

        <nav className="main-nav">
          <ul className={open ? "nav-list active" : "nav-list"} id="navList">
            {mainNav.map((item) => {
              const current = highlightActive && pathname === item.href;
              return (
                <li key={item.href} className={current ? "nav-item active" : "nav-item"}>
                  {item.href.startsWith("/blogs") ? (
                    <a href={item.href} className="nav-link" onClick={() => setOpen(false)}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="nav-link" onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-actions">
          <Link href="/sign-language-alphabet" className="action-btn highlight">
            <i className="fas fa-graduation-cap" />
            Start Learning
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          id="mobileToggle"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <i className={open ? "fas fa-times" : "fas fa-bars"} style={{ color: "black" }} />
        </button>
      </div>
    </header>
  );
}
