import Image from "next/image";
import Link from "next/link";
import { getSite } from "@/lib/content";
import { heroFor } from "@/lib/heroes";

/**
 * The dark page header used on every built (non-home) page — breadcrumb, red
 * eyebrow, display title and lede, over the TiE contour + globe motifs. Mirrors
 * the header the ComingSoon stub renders, so built pages and stubs are visually
 * continuous. The breadcrumb is derived from the nav tree, so passing a `slug`
 * is enough.
 *
 * Pass `image` to run a full-bleed hero photo behind the copy — the same
 * treatment as the homepage hero (`home/Hero.tsx`): the photo reads at full
 * strength and legibility comes from a left-to-right ink gradient rather than
 * from flattening the image. Without `image` the header stays the plain ink
 * panel with only the brand motifs.
 */
export default function PageHeader({
  slug,
  eyebrow,
  title,
  summary,
  image,
  imageAlt,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
}) {
  const site = getSite();
  const parent = site.nav.find(
    (item) => item.href === slug || item.children?.some((c) => c.href === slug),
  );
  const isTopLevel = parent?.href === slug;

  // Resolve the hero photo: an explicit prop wins, otherwise fall back to the
  // slug's registered hero so every built page gets the homepage-style header.
  const hero = heroFor(slug);
  const heroSrc = image ?? hero?.src;
  const heroAlt = imageAlt ?? hero?.alt ?? "";

  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 text-white lg:py-24">
      {heroSrc && (
        <>
          {/* Full-bleed hero photo. Legibility comes from the gradients below,
              not from dimming the image, so the room reads. */}
          <Image
            src={heroSrc}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-[50%_35%]"
          />
          {/* Left-to-right, keeping the copy side dark and the right open. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40 sm:from-ink/94 sm:via-ink/72 sm:to-ink/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/80 to-transparent"
          />
        </>
      )}
      <div
        aria-hidden="true"
        className={`contours contours-light ${heroSrc ? "!opacity-[0.05]" : "!opacity-[0.08]"}`}
      />
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
          <ol className="flex flex-wrap items-center gap-2 text-[11.5px] font-semibold text-white/45">
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
