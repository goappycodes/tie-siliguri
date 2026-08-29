import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { getHome, getSite } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Poppins carries the whole site — the typeface named in the TiE Siliguri brand
 * kit (Display/H1 ExtraBold/Bold, H2/H3 SemiBold/Bold, CTA & numbers Bold, body
 * regular). next/font ships only the weights we name below, self-hosted.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variable goes on <html> so --font-poppins is in scope at :root,
    // where globals.css composes it into --font-app.
    <html lang="en" className={poppins.variable}>
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
