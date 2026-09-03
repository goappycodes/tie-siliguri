import Image from "next/image";
import Link from "next/link";
import { getHome, getSite } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";

export default function Hero() {
  const { hero } = getHome();
  const site = getSite();

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Mobile: a wide photo band across the top. A full-bleed backdrop does
          not work at phone aspect — covering a very tall box with a landscape
          group shot crops it horizontally down to a few faces. A band keeps the
          photo in its natural proportion and the copy on clean ink below. */}
      <div className="absolute inset-x-0 top-0 h-[54vw] sm:hidden">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[50%_42%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10"
        />
      </div>

      {/* Desktop: full-bleed photo at full strength — legibility comes from the
          gradients rather than from flattening the image, so the room reads. */}
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        quality={90}
        className="hidden object-cover object-[50%_38%] sm:block"
      />
      {/* Left-to-right, keeping the right side open. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-r from-ink/94 via-ink/70 to-ink/25 sm:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-gradient-to-t from-ink/85 to-transparent sm:block"
      />
      {/* TiE Global's halftone dotted globe — the signature brand motif */}
      <div
        aria-hidden="true"
        className="globe-motif top-auto -right-16 -bottom-6 h-[16rem] w-[38rem] opacity-[0.2] mix-blend-screen lg:-right-24 lg:h-[22rem] lg:w-[52rem] lg:opacity-[0.22]"
      />

      {/* Mobile pads down past the photo band before the copy begins. */}
      <div className="shell relative pt-[47vw] pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-16">
        <div className="max-w-3xl">
          <p className="eyebrow !text-white/70 before:!bg-tie-red">{hero.eyebrow}</p>

          <h1 className="display-1 mt-3 !text-[clamp(1.875rem,4.6vw,3.5rem)] !text-white sm:mt-4">
            {hero.headline}
            <br />
            <span className="text-tie-red">{hero.headlineAccent}</span>
          </h1>

          <p className="lede mt-4 max-w-xl !text-[1.0625rem] !leading-[1.55] !text-white/80 sm:mt-5 sm:!leading-[1.6]">
            {hero.subheadShort ? (
              <>
                <span className="sm:hidden">{hero.subheadShort}</span>
                <span className="hidden sm:inline">{hero.subhead}</span>
              </>
            ) : (
              hero.subhead
            )}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
            <Link href={hero.primaryCta.href} className="btn btn-primary flex-1 sm:flex-none">
              {hero.primaryCta.label}
              <ArrowRight />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="btn btn-ghost-light flex-1 sm:flex-none"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          {/* Launch / hub detail line (chapter stats now live in the red strip
              below the hero). */}
          <div className="mt-7 sm:mt-8">
            <p className="text-[11px] font-medium text-white/45">
              {site.chapter.foundedLabel} · Hub chapter: {site.chapter.hubChapter}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
