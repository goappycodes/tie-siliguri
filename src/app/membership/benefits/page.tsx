import type { Metadata } from "next";
import Link from "next/link";
import { getMembership } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { benefits: b } = getMembership();

export const metadata: Metadata = {
  title: b.title,
  description: b.summary,
  openGraph: { title: b.title, description: b.summary },
};

export default function BenefitsPage() {
  return (
    <>
      <PageHeader slug={b.slug} eyebrow={b.eyebrow} title={b.title} summary={b.summary} />

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell">
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {b.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={(i % 4) * 60} className="bg-white">
                <div className="flex h-full flex-col p-7">
                  <span className="text-[13px] font-extrabold text-tie-red/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-[16.5px] leading-snug font-bold text-ink">{it.title}</h2>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="display-2 max-w-2xl !text-white">{b.cta.title}</h2>
          <Link href={b.cta.href} className="btn btn-primary flex-none">
            {b.cta.label}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
