export type NavItem = { label: string; href: string };

/** Primary navigation, shared by every page's header. */
export const mainNav: NavItem[] = [
  { label: "ASL Translator", href: "/" },
  { label: "Sign Language Alphabet", href: "/sign-language-alphabet" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs/" },
];

/** Links shown in the footer. */
export const footerNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms-and-condition" },
  { label: "Contact Us", href: "/contact" },
  { label: "About Us", href: "/about" },
];

/** Language pages offered in the translator's language dropdown. */
export const languagePages: NavItem[] = [
  { label: "American Sign Language (ASL)", href: "/" },
  { label: "British Sign Language (BSL)", href: "/british-sign-language" },
  { label: "Australian Sign Language (Auslan)", href: "/australian-sign-language" },
  { label: "Chinese Sign Language (CSL)", href: "/chinese-sign-language" },
  { label: "French Sign Language (LSF)", href: "/french-sign-language" },
  { label: "German Sign Language (DGS)", href: "/german-sign-language" },
  { label: "Japanese Sign Language (JSL)", href: "/japanese-sign-language" },
  { label: "Mexican Sign Language (LSM)", href: "/mexican-sign-language" },
  { label: "Spanish Sign Language (LSE)", href: "/spanish-sign-language" },
  { label: "Spanish Sign Language Alphabet", href: "/sign-language-alphabet-in-spanish" },
  { label: "Baby Sign Language", href: "/baby-sign-language" },
  { label: "ABC in Sign Language", href: "/abc-in-sign-language" },
  { label: "Sign Language Alphabet", href: "/sign-language-alphabet" },
  { label: "Sign Language Words", href: "/sign-language-words" },
];

