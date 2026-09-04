import Link from "next/link";
import type { Metadata } from "next";
// gives the 404 page the same header/footer styling as the rest of the site
import "@/styles/home.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <div className="main-title">
        <h1>Page not found</h1>
        <p>
          That page doesn&apos;t exist. Try the{" "}
          <Link href="/">sign language translator</Link> or the{" "}
          <Link href="/sign-language-alphabet">sign language alphabet</Link>.
        </p>
      </div>
    </main>
  );
}
