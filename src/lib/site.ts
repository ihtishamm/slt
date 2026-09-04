/** Canonical site-wide settings. Override the origin per environment. */
export const site = {
  name: "SL Translator",
  title: "Sign Language Translator",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sltranslator.com",
  email: "info@sltranslator.com",
  locale: "en_US",
  twitter: "@sltranslatorcom",
} as const;

export const social = [
  { label: "Facebook", href: "https://www.facebook.com/people/SL-Translator/61575615043098/" },
  { label: "Pinterest", href: "https://www.pinterest.com/sltranslatorcom/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/sl-translator/" },
  { label: "YouTube", href: "https://www.youtube.com/@sltranslatorcom" },
  { label: "Instagram", href: "https://www.instagram.com/sltranslatorcom" },
  { label: "TikTok", href: "https://www.tiktok.com/@sltranslatorcom" },
  { label: "GitHub", href: "https://github.com/sltranslatorcom" },
] as const;

/** Absolute URL for a site-relative path. */
export function absolute(path = "/"): string {
  return new URL(path, site.url).toString();
}
