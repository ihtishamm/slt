/** Every page this app serves. Drives the sitemap. */
export type SiteRoute = { path: string; title: string };

export const routes: SiteRoute[] = [
  { path: "/", title: "Sign Language Translator" },
  { path: "/sign-language-alphabet", title: "Sign Language Alphabet" },
  { path: "/sign-language-words", title: "Sign Language Words" },
  { path: "/abc-in-sign-language", title: "ABC in Sign Language" },
  { path: "/baby-sign-language", title: "Baby Sign Language" },
  { path: "/australian-sign-language", title: "Australian Sign Language" },
  { path: "/british-sign-language", title: "British Sign Language" },
  { path: "/chinese-sign-language", title: "Chinese Sign Language" },
  { path: "/french-sign-language", title: "French Sign Language" },
  { path: "/german-sign-language", title: "German Sign Language" },
  { path: "/japanese-sign-language", title: "Japanese Sign Language" },
  { path: "/mexican-sign-language", title: "Mexican Sign Language" },
  { path: "/spanish-sign-language", title: "Spanish Sign Language" },
  { path: "/sign-language-alphabet-in-spanish", title: "Sign Language Alphabet in Spanish" },
  { path: "/about", title: "About Us" },
  { path: "/contact", title: "Contact Us" },
  { path: "/privacy", title: "Privacy Policy" },
  { path: "/terms-and-condition", title: "Terms & Conditions" },
];
