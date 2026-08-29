import type { Metadata } from "next";
import Link from "next/link";
import { getCommunity } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { index } = getCommunity();

export const metadata: Metadata = {
  title: index.title,
  description: index.summary,
  openGraph: { title: index.title, description: index.summary },
};

export default function CommunityPage() {
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

      {/* Member type cards */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:gap-8">
          {index.cards.map((c, i) => (
            <Reveal as="article" key={c.href} delay={i * 80}>
              <Link
                href={c.href}
                className={`group flex h-full flex-col p-8 transition-colors lg:p-10 ${
                  i === 0 ? "bg-ink text-white hover:bg-ink-800" : "border border-line hover:bg-paper-alt"
                }`}
              >
                <h2 className={`display-3 ${i === 0 ? "!text-white" : ""}`}>{c.title}</h2>
                <p
                  className={`mt-4 flex-1 text-[15.5px] leading-relaxed ${
                    i === 0 ? "text-white/70" : "text-ink-600"
                  }`}
                >
                  {c.body}
                </p>
                <span className={`link-arrow mt-6 ${i === 0 ? "!text-white" : ""}`}>
                  Meet them
                  <ArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{index.sectorsLabel}</p>
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {index.sectors.map((s, i) => (
              <Reveal as="li" key={s.name} delay={(i % 4) * 50} className="bg-white">
                <div className="flex h-full flex-col p-6">
                  <h3 className="text-[11px] font-bold text-tie-red">
                    {s.name}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {s.companies.map((co) => (
                      <li key={co} className="text-[14px] leading-snug text-ink-700">
                        {co}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
