import type { Metadata } from "next";
import { getAbout } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { tieGlobal: g } = getAbout();

export const metadata: Metadata = {
  title: g.title,
  description: g.summary,
  openGraph: { title: g.title, description: g.summary },
};

export default function TieGlobalPage() {
  return (
    <>
      <PageHeader slug={g.slug} eyebrow={g.eyebrow} title={g.title} summary={g.summary} />

      {/* Intro */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell max-w-3xl space-y-6">
          {g.intro.map((p) => (
            <Reveal key={p}>
              <p className="lede">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="relative isolate overflow-hidden bg-tie-red py-14 text-white sm:py-16">
        <div aria-hidden="true" className="contours contours-light !opacity-[0.12]" />
        <div className="shell relative">
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {g.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-4xl font-extrabold !text-white lg:text-5xl">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-[12px] font-semibold tracking-[0.08em] text-white/70 uppercase">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Five pillars */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{g.pillars.eyebrow}</p>
            <h2 className="display-2 mt-5">{g.pillars.headline}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {g.pillars.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 60} className="bg-white">
                <div className="flex h-full flex-col p-8">
                  <span className="tick" aria-hidden="true" />
                  <h3 className="display-3 mt-5">{it.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* India */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{g.india.eyebrow}</p>
            <h2 className="display-2 mt-5">{g.india.headline}</h2>
          </Reveal>
          <Reveal delay={100} className="space-y-6">
            {g.india.body.map((p) => (
              <p key={p} className="lede">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="display-2 max-w-2xl !text-white">{g.cta.title}</h2>
          <a
            href={g.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex-none"
          >
            {g.cta.label}
            <ArrowRight />
          </a>
        </div>
      </section>
    </>
  );
}
