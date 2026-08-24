import type { Metadata } from "next";
import Link from "next/link";
import { getPrograms } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { tye } = getPrograms();

export const metadata: Metadata = {
  title: tye.title,
  description: tye.summary,
  openGraph: { title: tye.title, description: tye.summary },
};

export default function TyePage() {
  return (
    <>
      <PageHeader slug={tye.slug} eyebrow={tye.eyebrow} title={tye.title} summary={tye.summary} />

      {/* Coming soon + overview */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <div className="inline-flex items-center gap-3 border border-line bg-paper-alt px-4 py-2.5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tie-red opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tie-red" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.14em] text-ink uppercase">
                Coming soon to Siliguri
              </span>
            </div>
          </Reveal>
          <div className="mt-8 max-w-3xl space-y-6">
            {tye.overview.map((p) => (
              <Reveal key={p}>
                <p className="lede">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Global stats */}
      <section className="relative isolate overflow-hidden bg-tie-red py-14 text-white sm:py-16">
        <div aria-hidden="true" className="contours contours-light !opacity-[0.12]" />
        <div className="shell relative">
          <p className="text-[11px] font-bold tracking-[0.14em] text-white/70 uppercase">
            TYE worldwide
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {tye.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-4xl font-extrabold !text-white lg:text-5xl">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-[12px] font-semibold tracking-[0.06em] text-white/70 uppercase">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{tye.how.eyebrow}</p>
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            {tye.how.items.map((it, i) => (
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

      {/* CTA */}
      <section className="bg-paper-alt py-14 lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 border-t-2 border-tie-red bg-white p-8 lg:flex-row lg:items-center lg:p-12">
          <h2 className="display-2 max-w-2xl">{tye.cta.title}</h2>
          <Link href={tye.cta.href} className="btn btn-primary flex-none">
            {tye.cta.label}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
