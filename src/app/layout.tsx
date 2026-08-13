import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { getHome, getSite } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Jost carries the whole site — headings in bold uppercase, body in light at
 * normal case. Loaded as a variable font so every weight from 300 to 800 is
 * available without shipping separate files. Jost is one of TiE Global's own
 * webfonts, so this keeps the chapter site inside the parent brand.
 */
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const site = getSite();
const home = getHome();

export const metadata: Metadata = {
  title: {
    default: home.meta.title,
    template: `%s — ${site.chapter.name}`,
  },
  description: home.meta.description,
  metadataBase: new URL("https://siliguri.tie.org"),
  openGraph: {
    title: home.meta.title,
    description: home.meta.description,
    siteName: site.chapter.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: home.hero.image, width: 2400, height: 1600, alt: home.hero.imageAlt }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variable goes on <html> so --font-jost is in scope at :root,
    // where globals.css composes it into --font-app.
    <html lang="en" className={jost.variable}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-tie-red focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
