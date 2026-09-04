import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
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
 * Poppins, self-hosted.
 *
 * It used to come from fonts.googleapis.com, which meant a render-blocking
 * stylesheet plus a second connection before any text could be painted in the
 * right face. next/font downloads the files at build time and serves them from
 * this origin, and it generates a size-adjusted fallback so the swap from the
 * system font does not move the layout.
 *
 * The stylesheets ask for 'Poppins' by name, so the family is exposed under
 * that name rather than through a CSS variable.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
