import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { routes } from "@/data/routes";

/**
 * Generated sitemap. Replaces the hand-maintained `sitemap.xml`, which had
 * drifted: it still listed `.html` URLs and was missing
 * `/terms-and-condition`.
 *
 * The WordPress blog keeps its own sitemap at /blogs/sitemap_index.xml.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified: now,
    changeFrequency: r.path === "/" ? "weekly" : "monthly",
    priority: r.path === "/" ? 1 : 0.8,
  }));
}
