"use client";

import { useEffect } from "react";

/**
 * Adds `.visible` to `.reveal` elements as they scroll into view.
 *
 * Replaces the IntersectionObserver blocks that were duplicated in several page
 * scripts. Elements are revealed immediately if the browser has no observer
 * support, so content is never left invisible.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
