import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s` },
  icons: {
    icon: "/assets/images/icon.png",
    apple: "/assets/images/icon.png",
    shortcut: "/assets/images/icon.png",
  },
};

/*
 * Poppins, self-hosted from src/app/fonts.
 *
 * It came from fonts.googleapis.com originally — a render-blocking stylesheet
 * plus a second connection before any text could paint in the right face.
 * next/font fixed the runtime cost, but `next/font/google` still downloads the
 * files during every clean build, and that is a hard failure rather than a
 * fallback: a DNS blip here produced "Failed to fetch `Poppins` from Google
 * Fonts" and stopped the build outright.
 *
 * The five weights the stylesheets ask for are committed instead, so builds are
 * reproducible and work offline. next/font/local still generates the
 * size-adjusted fallback metrics, so the swap does not shift the layout.
 *
 * The stylesheets ask for 'Poppins' by name, so the family is exposed under
 * that name rather than through a CSS variable. See fonts/README.md.
 */
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

const GA_ID = "G-M09F1BRP5X";
const ADSENSE_CLIENT = "ca-pub-6835970656144904";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />

        {/*
          Analytics and ads previously ran on the home page only, which left the
          other 17 pages unmeasured. They are site-wide here.
        */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
