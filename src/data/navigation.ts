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
  { label: "American Sign Language", href: "/" },
  { label: "British Sign Language", href: "/british-sign-language" },
  { label: "Australian Sign Language", href: "/australian-sign-language" },
  { label: "Chinese Sign Language", href: "/chinese-sign-language" },
  { label: "French Sign Language", href: "/french-sign-language" },
  { label: "German Sign Language", href: "/german-sign-language" },
  { label: "Japanese Sign Language", href: "/japanese-sign-language" },
  { label: "Mexican Sign Language", href: "/mexican-sign-language" },
  { label: "Spanish Sign Language", href: "/spanish-sign-language" },
];
