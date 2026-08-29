import type { Metadata } from "next";
import Link from "next/link";
import { getAbout } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { index } = getAbout();

export const metadata: Metadata = {
  title: index.title,
  description: index.summary,
  openGraph: { title: index.title, description: index.summary },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        slug={index.slug}
        eyebrow={index.eyebrow}
        title={index.title}
        summary={index.summary}
      />

      {/* Mission */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{index.mission.eyebrow}</p>
            <h2 className="display-2 mt-5">{index.mission.headline}</h2>
          </Reveal>
          <Reveal delay={100} className="space-y-6">
            {index.mission.body.map((p) => (
              <p key={p} className="lede">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Section cards */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {index.cards.map((c, i) => (
              <Reveal as="li" key={c.href} delay={i * 70} className="bg-white">
                <Link
                  href={c.href}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-paper-alt lg:p-10"
                >
                  <span className="text-[11px] font-bold text-tie-red">
                    0{i + 1}
                  </span>
                  <h3 className="display-3 mt-4 transition-colors group-hover:text-tie-red">
                    {c.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[15.5px] leading-relaxed text-ink-600">{c.body}</p>
                  <span className="link-arrow mt-6">
                    Explore
                    <ArrowRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
