import type { Metadata } from "next";
import Link from "next/link";
import { getCommunity } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { associateMembers: am } = getCommunity();

export const metadata: Metadata = {
  title: am.title,
  description: am.summary,
  openGraph: { title: am.title, description: am.summary },
};

export default function AssociateMembersPage() {
  return (
    <>
      <PageHeader slug={am.slug} eyebrow={am.eyebrow} title={am.title} summary={am.summary} />

      {/* Intro */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell max-w-3xl space-y-6">
          {am.intro.map((p) => (
            <Reveal key={p}>
              <p className="lede">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Criteria */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{am.criteria.eyebrow}</p>
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {am.criteria.items.map((it, i) => (
              <Reveal as="li" key={it} delay={(i % 3) * 60} className="bg-white">
                <div className="flex h-full gap-4 p-7">
                  <span className="text-2xl font-extrabold text-tie-red/30">0{i + 1}</span>
                  <p className="text-[15px] leading-relaxed text-ink-700">{it}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="display-2 max-w-2xl !text-white">{am.cta.title}</h2>
          <Link href={am.cta.href} className="btn btn-primary flex-none">
            {am.cta.label}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
