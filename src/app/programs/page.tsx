import type { Metadata } from "next";
import Link from "next/link";
import { getPrograms } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { index } = getPrograms();

export const metadata: Metadata = {
  title: index.title,
  description: index.summary,
  openGraph: { title: index.title, description: index.summary },
};

export default function ProgramsPage() {
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

      {/* Programme cards */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell grid gap-6 lg:grid-cols-2 lg:gap-8">
          {index.programs.map((p, i) => (
            <Reveal as="article" key={p.href} delay={i * 70}>
              <Link
                href={p.href}
                className={`group flex h-full flex-col p-8 transition-colors lg:p-10 ${
                  p.flagship
                    ? "bg-ink text-white hover:bg-ink-800"
                    : "border border-line bg-white hover:bg-paper-alt"
                }`}
              >
                <span
                  className={`inline-flex w-fit px-3 py-1.5 text-[10.5px] font-bold ${
                    p.flagship ? "bg-tie-red text-white" : "bg-tie-red-light text-tie-red"
                  }`}
                >
                  {p.badge}
                </span>
                <h2
                  className={`display-3 mt-5 !text-[clamp(1.35rem,2.2vw,1.75rem)] ${
                    p.flagship ? "!text-white" : ""
                  }`}
                >
                  {p.name}
                </h2>
                <p
                  className={`mt-4 flex-1 text-[15.5px] leading-relaxed ${
                    p.flagship ? "text-white/65" : "text-ink-600"
                  }`}
                >
                  {p.summary}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.meta.map((m) => (
                    <li
                      key={m}
                      className={`px-2.5 py-1 text-[11.5px] font-medium ${
                        p.flagship
                          ? "bg-white/10 text-white/75"
                          : "bg-paper-alt text-slate"
                      }`}
                    >
                      {m}
                    </li>
                  ))}
                </ul>
                <span
                  className={`link-arrow mt-7 ${p.flagship ? "!text-white" : ""}`}
                >
                  {p.flagship ? "Explore the programme" : "Learn more"}
                  <ArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
