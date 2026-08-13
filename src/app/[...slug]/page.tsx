import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ComingSoon";
import { getStubPage, getStubPages } from "@/lib/content";

type Props = { params: Promise<{ slug: string[] }> };

/**
 * Catch-all route that renders every page in the sitemap from content/pages.json
 * in "coming soon" mode. As each page gets built for real, give it its own
 * directory under src/app — a concrete route always wins over this catch-all.
 */
export function generateStaticParams() {
  return Object.keys(getStubPages()).map((path) => ({
    slug: path.replace(/^\//, "").split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getStubPage("/" + slug.join("/"));
  if (!page) return { title: "Page not found" };
  return {
    title: page.title,
    description: page.summary,
    openGraph: { title: page.title, description: page.summary },
  };
}

export default async function StubRoute({ params }: Props) {
  const { slug } = await params;
  const page = getStubPage("/" + slug.join("/"));
  if (!page) notFound();
  return <ComingSoon page={page} />;
}
