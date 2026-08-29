import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAbout } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { ourChapter: c } = getAbout();

export const metadata: Metadata = {
  title: c.title,
  description: c.summary,
  openGraph: { title: c.title, description: c.summary },
};

export default function OurChapterPage() {
  return (
    <>
      <PageHeader slug={c.slug} eyebrow={c.eyebrow} title={c.title} summary={c.summary} />

      {/* Purpose */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.purpose.eyebrow}</p>
            <h2 className="display-2 mt-5">{c.purpose.headline}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {c.purpose.items.map((it, i) => (
              <Reveal as="li" key={it} delay={i * 60}>
                <div className="flex h-full gap-5 border border-line p-7 transition-colors hover:border-line-strong">
                  <span className="text-2xl font-extrabold text-tie-red/30">0{i + 1}</span>
                  <p className="text-[16px] leading-relaxed text-ink-700">{it}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Hub & Spoke */}
      <section className="bg-ink py-14 text-white sm:py-20 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow !text-tie-red">{c.hub.eyebrow}</p>
            <h2 className="display-2 mt-5 !text-white">{c.hub.headline}</h2>
            <div className="mt-6 space-y-5">
              {c.hub.body.map((p) => (
                <p key={p} className="text-[16px] leading-relaxed text-white/70">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="self-center">
            <dl className="grid gap-px border border-white/12 bg-white/12">
              {c.hub.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 bg-ink px-7 py-6">
                  <dt className="text-[13px] font-semibold text-white/55">
                    {f.label}
                  </dt>
                  <dd className="text-3xl font-extrabold !text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Momentum timeline */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.momentum.eyebrow}</p>
            <h2 className="display-2 mt-5">{c.momentum.headline}</h2>
            <p className="lede mt-6">{c.momentum.subhead}</p>
          </Reveal>
          <ol className="mt-12 border-l-2 border-line">
            {c.momentum.events.map((e, i) => {
              const isLaunch = i === c.momentum.events.length - 1;
              return (
                <Reveal as="li" key={e.title} delay={i * 50} className="relative pl-8 pb-9 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={`absolute top-1 -left-[7px] h-3 w-3 rounded-full ring-4 ring-white ${
                      isLaunch ? "bg-tie-red" : "bg-line-strong"
                    }`}
                  />
                  <p className="text-[11.5px] font-bold text-tie-red">
                    {e.date}
                  </p>
                  <h3
                    className={`mt-1.5 text-[17px] leading-snug font-bold ${
                      isLaunch ? "text-tie-red" : "text-ink"
                    }`}
                  >
                    {e.title}
                  </h3>
                  <p className="mt-1 text-[14px] font-normal text-slate">{e.with}</p>
                </Reveal>
              );
            })}
          </ol>

          {/* Pre-launch session creatives */}
          <div className="mt-14">
            <p className="eyebrow-plain">{c.momentum.galleryLabel}</p>
            <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
              {c.momentum.gallery.map((gm, i) => (
                <Reveal as="li" key={gm.image} delay={(i % 3) * 60}>
                  <div className="relative aspect-square overflow-hidden border border-line bg-paper-alt">
                    <Image
                      src={gm.image}
                      alt={gm.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 45vw"
                      quality={90}
                      className="object-contain"
                    />
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cadence */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.cadence.eyebrow}</p>
            <h2 className="display-2 mt-5">{c.cadence.headline}</h2>
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {c.cadence.items.map((it) => (
              <li key={it.title} className="flex flex-col justify-between gap-4 bg-white p-7">
                <span className="text-[16px] leading-snug font-semibold text-ink">{it.title}</span>
                <span className="inline-flex w-fit bg-tie-red-light px-3 py-1 text-[11px] font-bold text-tie-red">
                  {it.freq}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 border-t-2 border-tie-red bg-paper-alt p-8 lg:flex-row lg:items-center lg:p-12">
          <h2 className="display-2 max-w-2xl">{c.cta.title}</h2>
          <Link href={c.cta.href} className="btn btn-primary flex-none">
            {c.cta.label}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
