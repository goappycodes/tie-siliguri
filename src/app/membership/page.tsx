import type { Metadata } from "next";
import Link from "next/link";
import { getMembership } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { index } = getMembership();

export const metadata: Metadata = {
  title: index.title,
  description: index.summary,
  openGraph: { title: index.title, description: index.summary },
};

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        slug={index.slug}
        eyebrow={index.eyebrow}
        title={index.title}
        summary={index.summary}
      />

      {/* Intro */}
      <section className="bg-white pt-14 sm:pt-20 lg:pt-28">
        <div className="shell max-w-3xl space-y-6">
          {index.intro.map((p) => (
            <Reveal key={p}>
              <p className="lede">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {index.quickLinks.map((c, i) => (
              <Reveal as="li" key={c.href} delay={i * 70} className="bg-white">
                <Link
                  href={c.href}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-paper-alt lg:p-10"
                >
                  <span className="text-[11px] font-bold tracking-[0.14em] text-tie-red uppercase">
                    0{i + 1}
                  </span>
                  <h2 className="display-3 mt-4 transition-colors group-hover:text-tie-red">
                    {c.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-ink-600">{c.body}</p>
                  <span className="link-arrow mt-6">
                    View
                    <ArrowRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="display-2 max-w-2xl !text-white">{index.cta.title}</h2>
          <Link href={index.cta.href} className="btn btn-primary flex-none">
            {index.cta.label}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
