import Image from "next/image";
import Link from "next/link";
import { getHome, getSite } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";

export default function Hero() {
  const { hero, globalBar } = getHome();
  const site = getSite();

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Backdrop — full-strength photo. Legibility comes from the gradients
          below rather than from flattening the image, so the room stays visible. */}
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        quality={82}
        className="object-cover object-[50%_38%]"
      />
      {/* Left-to-right gradient carries the headline; the right side stays open
          so the group photo reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/94 via-ink/70 to-ink/25"
      />
      {/* Soft foot, so the global stats bar has something to sit on. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 to-transparent"
      />
      {/* TiE Global's halftone dotted globe — the signature brand motif */}
      <div
        aria-hidden="true"
        className="globe-motif top-auto -right-16 -bottom-6 h-[16rem] w-[38rem] opacity-[0.2] mix-blend-screen lg:-right-24 lg:h-[22rem] lg:w-[52rem] lg:opacity-[0.22]"
      />

      <div className="shell relative pt-10 pb-0 sm:pt-12 lg:pt-16">
        <div className="max-w-3xl">
          <p className="eyebrow !text-white/70 before:!bg-tie-red">{hero.eyebrow}</p>

          <h1 className="display-1 mt-4 !text-[clamp(2rem,4.6vw,3.5rem)] !text-white">
            {hero.headline}
            <br />
            <span className="text-tie-red">{hero.headlineAccent}</span>
          </h1>

          <p className="lede mt-5 max-w-xl !text-[1.0625rem] !leading-[1.6] !text-white/80">
            {hero.subhead}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
              <ArrowRight />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn btn-ghost-light">
              {hero.secondaryCta.label}
            </Link>
          </div>

          {/* Chapter stats. The launch/hub line rides on the same row on wide
              screens, which removes a whole stacked block from the hero. */}
          <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-5 sm:gap-x-12">
            <dl className="flex flex-wrap gap-x-9 gap-y-5 sm:gap-x-11">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-[1.75rem] leading-none font-extrabold text-white sm:text-[2.125rem]">
                      {s.value}
                    </span>
                    <span className="mt-1.5 block max-w-[8.5rem] text-[10.5px] leading-tight font-semibold tracking-[0.06em] text-white/60 uppercase">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="text-[11px] font-medium text-white/45 uppercase">
              {site.chapter.foundedLabel} · Hub chapter: {site.chapter.hubChapter}
            </p>
          </div>
        </div>

        {/* Global credibility bar, docked to the hero */}
        <div className="mt-8 border-t border-white/12 lg:mt-10">
          <div className="flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:gap-10">
            <p className="flex-none text-[11px] font-bold tracking-[0.14em] text-tie-red uppercase">
              {globalBar.label}
            </p>
            <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
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
