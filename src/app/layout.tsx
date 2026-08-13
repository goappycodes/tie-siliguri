import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { getHome, getSite } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** Body, UI, nav, buttons and stats — as on tie.org. */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

/** Section headings — Lato 800/900 uppercase, matching TiE Global. */
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["700", "900"],
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
    <html lang="en">
      <body className={`${montserrat.variable} ${lato.variable} antialiased`}>
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
