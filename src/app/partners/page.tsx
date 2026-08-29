import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPartners } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { index } = getPartners();

export const metadata: Metadata = {
  title: index.title,
  description: index.summary,
  openGraph: { title: index.title, description: index.summary },
};

export default function PartnersPage() {
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

      {/* Partner cards */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:gap-8">
          {index.partners.map((p, i) => (
            <Reveal as="article" key={p.href} delay={i * 80}>
              <Link
                href={p.href}
                className="group flex h-full flex-col border border-line p-8 transition-colors hover:bg-paper-alt lg:p-10"
              >
                {p.logo && (
                  <span className="mb-6 flex h-12 w-full items-center">
                    <Image
                      src={p.logo}
                      alt={p.logoAlt ?? `${p.name} logo`}
                      width={260}
                      height={96}
                      className="h-full w-auto max-w-[70%] object-contain object-left"
                    />
                  </span>
                )}
                <span className="inline-flex w-fit bg-tie-red-light px-3 py-1.5 text-[10.5px] font-bold text-tie-red">
                  {p.role}
                </span>
                <h2 className="display-3 mt-5 transition-colors group-hover:text-tie-red">
                  {p.name}
                </h2>
                <p className="mt-4 flex-1 text-[15.5px] leading-relaxed text-ink-600">{p.blurb}</p>
                <span className="link-arrow mt-6">
                  Learn more
                  <ArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}
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
