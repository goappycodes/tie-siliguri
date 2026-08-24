import Link from "next/link";
import { getSite } from "@/lib/content";

/**
 * The dark page header used on every built (non-home) page — breadcrumb, red
 * eyebrow, display title and lede, over the TiE contour + globe motifs. Mirrors
 * the header the ComingSoon stub renders, so built pages and stubs are visually
 * continuous. The breadcrumb is derived from the nav tree, so passing a `slug`
 * is enough.
 */
export default function PageHeader({
  slug,
  eyebrow,
  title,
  summary,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  summary?: string;
}) {
  const site = getSite();
  const parent = site.nav.find(
    (item) => item.href === slug || item.children?.some((c) => c.href === slug),
  );
  const isTopLevel = parent?.href === slug;

  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-white lg:py-24">
      <div aria-hidden="true" className="contours contours-light !opacity-[0.08]" />
      <div
        aria-hidden="true"
        className="globe-motif -top-8 -right-24 h-[16rem] w-[36rem] opacity-25 mix-blend-screen"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-tie-red/15 blur-3xl"
      />
      <div className="shell relative">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 text-[11.5px] font-semibold text-white/45 uppercase">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            {parent && !isTopLevel && (
              <>
                <li aria-hidden="true" className="text-white/25">
                  /
                </li>
                <li>
                  <Link href={parent.href} className="transition-colors hover:text-white">
                    {parent.label}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true" className="text-white/25">
              /
            </li>
            <li className="text-white/80">{title}</li>
          </ol>
        </nav>

        <p className="eyebrow !text-tie-red">{eyebrow}</p>
        <h1 className="display-1 mt-5 max-w-4xl !text-[clamp(2.1rem,4.6vw,3.75rem)] !text-white">
          {title}
        </h1>
        {summary && <p className="lede mt-6 max-w-2xl !text-white/70">{summary}</p>}
      </div>
    </section>
  );
}
