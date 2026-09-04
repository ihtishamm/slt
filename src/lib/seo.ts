import type { Metadata } from "next";
import { site, absolute } from "./site";

export type PageSeo = {
  title: string;
  description?: string;
  keywords?: string;
  /** Site-relative path, e.g. "/british-sign-language". */
  path: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

/** Parse the legacy `robots` meta string into Next's structured form. */
function parseRobots(value?: string): Metadata["robots"] {
  if (!value) return undefined;
  const parts = value.split(",").map((p) => p.trim().toLowerCase());
  const has = (t: string) => parts.includes(t);
  const num = (prefix: string) => {
    const hit = parts.find((p) => p.startsWith(prefix));
    if (!hit) return undefined;
    const raw = hit.split(":")[1];
    return raw === undefined ? undefined : Number.isNaN(Number(raw)) ? raw : Number(raw);
  };
  return {
    index: !has("noindex"),
    follow: !has("nofollow"),
    googleBot: {
      index: !has("noindex"),
      follow: !has("nofollow"),
      "max-image-preview": num("max-image-preview") as "none" | "standard" | "large" | undefined,
      "max-snippet": num("max-snippet") as number | undefined,
      "max-video-preview": num("max-video-preview") as number | undefined,
    },
  };
}

/**
 * Build page metadata. Canonical, Open Graph and Twitter tags all derive from
 * one place so a page can never drift out of sync with itself.
 */
export function buildMetadata(seo: PageSeo): Metadata {
  const url = absolute(seo.path);
  const image = seo.ogImage ?? absolute("/assets/images/sltranslatorlogo.png");

  return {
    metadataBase: new URL(site.url),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ? seo.keywords.split(",").map((k) => k.trim()) : undefined,
    alternates: { canonical: url },
    robots: parseRobots(seo.robots),
    openGraph: {
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: (seo.ogType as "website" | "article" | undefined) ?? "website",
      images: [{ url: image }],
    },
    twitter: {
      card: (seo.twitterCard as "summary" | "summary_large_image" | undefined) ?? "summary_large_image",
      title: seo.twitterTitle ?? seo.ogTitle ?? seo.title,
      description: seo.twitterDescription ?? seo.ogDescription ?? seo.description,
      images: [seo.twitterImage ?? image],
    },
  };
}
