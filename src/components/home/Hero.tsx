import Image from "next/image";
import Link from "next/link";
import { getHome, getSite } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";

export default function Hero() {
  const { hero, globalBar } = getHome();
  const site = getSite();

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* Backdrop */}
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        quality={82}
        className="object-cover object-[50%_35%] opacity-[0.42]"
      />
      {/* Scrims: darken bottom-left for text legibility, keep faces visible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent"
      />
      {/* TiE Global's halftone dotted globe — the signature brand motif */}
      <div
        aria-hidden="true"
        className="globe-motif top-auto -right-16 -bottom-8 h-[22rem] w-[46rem] opacity-[0.22] mix-blend-screen lg:-right-24 lg:h-[30rem] lg:w-[62rem] lg:opacity-25"
      />

      <div className="shell relative pt-16 pb-0 sm:pt-20 lg:pt-28">
        <div className="max-w-3xl">
          <p className="eyebrow !text-white/70 before:!bg-tie-red">{hero.eyebrow}</p>

          <h1 className="display-1 mt-6 !text-white">
            {hero.headline}
            <br />
            <span className="text-tie-red">{hero.headlineAccent}</span>
          </h1>

          <p className="lede mt-7 max-w-2xl !text-white/75">{hero.subhead}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
              <ArrowRight />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn btn-ghost-light">
              {hero.secondaryCta.label}
            </Link>
          </div>

          {/* Chapter stats */}
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6 sm:gap-x-14">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    {s.value}
                  </span>
                  <span className="mt-1.5 block max-w-[9rem] text-[11.5px] leading-tight font-semibold tracking-[0.06em] text-white/55 uppercase">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-[12px] font-medium tracking-[0.05em] text-white/40 uppercase">
            {site.chapter.foundedLabel} · Hub chapter: {site.chapter.hubChapter}
          </p>
        </div>

        {/* Global credibility bar, docked to the hero */}
        <div className="mt-14 border-t border-white/12 lg:mt-20">
          <div className="flex flex-col gap-6 py-7 lg:flex-row lg:items-center lg:gap-12">
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
