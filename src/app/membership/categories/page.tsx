import type { Metadata } from "next";
import Link from "next/link";
import { getMembership } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { categories: c } = getMembership();

export const metadata: Metadata = {
  title: c.title,
  description: c.summary,
  openGraph: { title: c.title, description: c.summary },
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader slug={c.slug} eyebrow={c.eyebrow} title={c.title} summary={c.summary} />

      {/* Definitions */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell grid gap-6 lg:grid-cols-2 lg:gap-8">
          {c.definitions.map((d, i) => (
            <Reveal key={d.name} delay={i * 80}>
              <div
                className={`flex h-full flex-col p-8 lg:p-10 ${
                  i === 0 ? "bg-ink text-white" : "border border-line bg-white"
                }`}
              >
                <span
                  className={`inline-flex w-fit px-3 py-1.5 text-[10.5px] font-bold tracking-[0.12em] uppercase ${
                    i === 0 ? "bg-tie-red text-white" : "bg-tie-red-light text-tie-red"
                  }`}
                >
                  {i === 0 ? "By invitation" : "Open to join"}
                </span>
                <h2 className={`display-3 mt-5 ${i === 0 ? "!text-white" : ""}`}>{d.name}</h2>
                <p
                  className={`mt-4 text-[15.5px] leading-relaxed ${
                    i === 0 ? "text-white/70" : "text-ink-600"
                  }`}
                >
                  {d.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comparison — stacks on mobile, tabular on desktop */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.compareLabel}</p>
          </Reveal>

          <div className="mt-10 border border-line bg-white">
            {/* Header row — desktop only */}
            <div className="hidden bg-ink text-white sm:grid sm:grid-cols-[1.1fr_1.6fr_1.6fr]">
              <span className="p-4 text-[11px] font-bold tracking-[0.1em] text-white/50 uppercase">
                Feature
              </span>
              <span className="p-4 text-[11px] font-bold tracking-[0.1em] uppercase">
                Charter Member
              </span>
              <span className="p-4 text-[11px] font-bold tracking-[0.1em] text-white/70 uppercase">
                Associate Member
              </span>
            </div>

            <dl className="divide-y divide-line">
              {c.comparison.map((row) => (
                <div key={row.feature} className="sm:grid sm:grid-cols-[1.1fr_1.6fr_1.6fr]">
                  <dt className="bg-paper-alt px-4 pt-5 pb-2 text-[12px] font-bold tracking-[0.06em] text-ink uppercase sm:bg-transparent sm:py-4 sm:text-[13px] sm:normal-case">
                    {row.feature}
                  </dt>
                  <dd className="px-4 pb-3 text-[14.5px] leading-relaxed text-ink-700 sm:border-l sm:border-line sm:py-4">
                    <span className="mb-0.5 block text-[10.5px] font-bold tracking-[0.1em] text-tie-red uppercase sm:hidden">
                      Charter
                    </span>
                    {row.cm}
                  </dd>
                  <dd className="px-4 pb-5 text-[14.5px] leading-relaxed text-slate sm:border-l sm:border-line sm:py-4">
                    <span className="mb-0.5 block text-[10.5px] font-bold tracking-[0.1em] text-slate uppercase sm:hidden">
                      Associate
                    </span>
                    {row.am}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.feesLabel}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {c.fees.map((f) => (
              <div
                key={f.category}
                className={`p-8 lg:p-10 ${
                  f.featured ? "bg-ink text-white" : "border border-line bg-white"
                }`}
              >
                <h3 className={`display-3 ${f.featured ? "!text-white" : ""}`}>{f.category}</h3>
                <dl className="mt-7 space-y-5">
                  <div className="flex items-baseline justify-between gap-4 border-b border-line/60 pb-4">
                    <dt
                      className={`text-[12px] font-semibold tracking-[0.06em] uppercase ${
                        f.featured ? "text-white/55" : "text-slate"
                      }`}
                    >
                      One-time admission
                    </dt>
                    <dd className={`text-2xl font-extrabold ${f.featured ? "!text-white" : "text-ink"}`}>
                      {f.admission}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt
                      className={`text-[12px] font-semibold tracking-[0.06em] uppercase ${
                        f.featured ? "text-white/55" : "text-slate"
                      }`}
                    >
                      Annual fee
                    </dt>
                    <dd
                      className={`text-2xl font-extrabold ${f.featured ? "!text-tie-red" : "text-tie-red"}`}
                    >
                      {f.annual}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13.5px] text-slate">{c.feesNote}</p>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t-2 border-tie-red bg-paper-alt p-8 sm:flex-row sm:items-center lg:p-10">
            <h2 className="display-3">{c.cta.title}</h2>
            <Link href={c.cta.href} className="btn btn-primary flex-none">
              {c.cta.label}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
