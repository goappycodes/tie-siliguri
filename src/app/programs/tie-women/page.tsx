import type { Metadata } from "next";
import Link from "next/link";
import { getPrograms } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { tieWomen } = getPrograms();

export const metadata: Metadata = {
  title: tieWomen.title,
  description: tieWomen.summary,
  openGraph: { title: tieWomen.title, description: tieWomen.summary },
};

export default function TieWomenPage() {
  return (
    <>
      <PageHeader
        slug={tieWomen.slug}
        eyebrow={tieWomen.eyebrow}
        title={tieWomen.title}
        summary={tieWomen.summary}
      />

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
            {tieWomen.overview.map((p) => (
              <Reveal key={p}>
                <p className="lede">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What it brings */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{tieWomen.offers.eyebrow}</p>
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            {tieWomen.offers.items.map((it, i) => (
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
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="display-2 max-w-2xl !text-white">{tieWomen.cta.title}</h2>
          <Link href={tieWomen.cta.href} className="btn btn-primary flex-none">
            {tieWomen.cta.label}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
