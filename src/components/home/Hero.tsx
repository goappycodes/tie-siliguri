import Image from "next/image";
import Link from "next/link";
import { getHome, getSite } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";

export default function Hero() {
  const { hero, globalBar } = getHome();
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
          quality={82}
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
        quality={82}
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
      <div className="shell relative pt-[47vw] pb-0 sm:pt-12 lg:pt-16">
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

          {/* Chapter stats. The launch/hub line rides on the same row on wide
              screens, which removes a whole stacked block from the hero. */}
          <div className="mt-7 flex flex-wrap items-end gap-x-10 gap-y-5 sm:mt-8 sm:gap-x-12">
            <dl className="grid w-full grid-cols-3 gap-x-3 sm:flex sm:w-auto sm:flex-wrap sm:gap-x-11 sm:gap-y-5">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-[1.5rem] leading-none font-extrabold text-white sm:text-[2.125rem]">
                      {s.value}
                    </span>
                    <span className="mt-1.5 block text-[9.5px] leading-tight font-semibold tracking-[0.05em] text-white/60 uppercase sm:max-w-[8.5rem] sm:text-[10.5px]">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Detail line — desktop only, to keep the phone hero quiet. */}
            <p className="hidden text-[11px] font-medium text-white/45 uppercase sm:block">
              {site.chapter.foundedLabel} · Hub chapter: {site.chapter.hubChapter}
            </p>
          </div>
        </div>

        {/* Global credibility bar, docked to the hero */}
        <div className="mt-7 border-t border-white/12 sm:mt-8 lg:mt-10">
          <div className="flex flex-col gap-4 py-4 sm:gap-5 sm:py-5 lg:flex-row lg:items-center lg:gap-10">
            <p className="flex-none text-[11px] font-bold tracking-[0.14em] text-tie-red uppercase">
              {globalBar.label}
            </p>
            <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-4 sm:gap-y-5">
              {globalBar.stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2.5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="flex items-baseline gap-2.5">
                    <span className="text-xl font-extrabold text-white">{s.value}</span>
                    <span className="text-[11.5px] leading-tight font-medium text-white/50">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
