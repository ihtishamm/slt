import type { Metadata } from "next";
import Script from "next/script";
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

const GA_ID = "G-M09F1BRP5X";
const ADSENSE_CLIENT = "ca-pub-6835970656144904";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Font Awesome and Poppins were linked inconsistently across the old
          pages (14/18 and 11/18 respectively) — four pages used `fa-` icon
          classes without ever loading the font, so those icons never rendered.
          Loading both once here fixes that and keeps every page consistent.
        */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
