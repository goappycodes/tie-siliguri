import type { Metadata } from "next";
import Link from "next/link";
import { getMembership } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { whyJoin: w } = getMembership();

export const metadata: Metadata = {
  title: w.title,
  description: w.summary,
  openGraph: { title: w.title, description: w.summary },
};

export default function WhyJoinPage() {
  return (
    <>
      <PageHeader slug={w.slug} eyebrow={w.eyebrow} title={w.title} summary={w.summary} />

      {/* What TiE does */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{w.whatWeDo.eyebrow}</p>
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            {w.whatWeDo.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 60} className="bg-white">
                <div className="flex h-full flex-col p-8">
                  <span className="tick" aria-hidden="true" />
                  <h2 className="display-3 mt-5">{it.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Why join reasons */}
      <section className="bg-ink py-14 text-white sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-tie-red">{w.reasons.eyebrow}</p>
            <h2 className="display-2 mt-5 !text-white">The case for membership</h2>
          </Reveal>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-12">
            {w.reasons.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={i * 60} className="border-t border-white/15 pt-6">
                <h3 className="text-[18px] leading-tight font-bold !text-white">{it.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{it.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Signature programs */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{w.signaturePrograms.eyebrow}</p>
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {w.signaturePrograms.items.map((it, i) => (
              <Reveal as="li" key={it.name} delay={(i % 3) * 60}>
                <div className="flex h-full flex-col border border-line p-7">
                  <h3 className="text-[16px] leading-snug font-bold text-ink">{it.name}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper-alt py-14 lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 border-t-2 border-tie-red bg-white p-8 lg:flex-row lg:items-center lg:p-12">
          <h2 className="display-2 max-w-2xl">{w.cta.title}</h2>
          <Link href={w.cta.href} className="btn btn-primary flex-none">
            {w.cta.label}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
