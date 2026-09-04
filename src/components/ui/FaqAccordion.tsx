"use client";

import { useEffect } from "react";

/**
 * Wires up the `.faq-item` accordions rendered in page content.
 *
 * The FAQ markup is part of each page's converted content (it carries
 * schema.org Question/Answer microdata that must stay in the HTML), so this
 * component attaches the open/close behaviour to whatever is on the page rather
 * than owning the markup itself. Replaces the duplicated `.faq-q` click
 * handlers from the legacy page scripts.
 */
export default function FaqAccordion() {
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".faq-q"));
    if (!buttons.length) return;

    const closeAll = () => {
      document.querySelectorAll<HTMLElement>(".faq-item.open").forEach((item) => {
        item.classList.remove("open");
        const a = item.querySelector<HTMLElement>(".faq-a");
        if (a) a.style.maxHeight = "0";
        item.querySelector<HTMLElement>(".faq-q")?.setAttribute("aria-expanded", "false");
      });
    };

    const onClick = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const item = btn.closest<HTMLElement>(".faq-item");
      if (!item) return;
      const answer = item.querySelector<HTMLElement>(".faq-a");
      const wasOpen = item.classList.contains("open");

      closeAll();
      if (!wasOpen) {
        item.classList.add("open");
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
        btn.setAttribute("aria-expanded", "true");
      }
    };

    buttons.forEach((b) => b.addEventListener("click", onClick));
    return () => buttons.forEach((b) => b.removeEventListener("click", onClick));
  }, []);

  return null;
}
