import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

type Detail = { label: string; value: string };
type Module = { title: string; body: string };

export type FlagshipProgram = {
  slug: string;
  eyebrow: string;
  badge: string;
  title: string;
  summary: string;
  overview: string[];
  details: Detail[];
  modules: { eyebrow: string; items: Module[] };
  forWho: { eyebrow: string; body: string };
  cta: { title: string; label: string; href: string };
};

/**
 * Shared layout for the two flagship programme pages (AI Immersion Residency,
 * Founders' Immersion). Both have the same shape — overview, key details,
 * modules, who-it's-for and a CTA — so they render through one component and
 * differ only by their content JSON.
 */
export default function ProgramDetail({ program: p }: { program: FlagshipProgram }) {
  return (
    <>
      <PageHeader slug={p.slug} eyebrow={p.eyebrow} title={p.title} summary={p.summary} />

      {/* Overview + key details */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="space-y-6">
            <Reveal>
              <span className="inline-flex bg-tie-red-light px-3 py-1.5 text-[11px] font-bold text-tie-red">
                {p.badge}
              </span>
            </Reveal>
            {p.overview.map((para) => (
              <Reveal key={para}>
                <p className="lede">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="lg:pt-2">
            <dl className="border-t-2 border-tie-red bg-paper-alt">
              {p.details.map((d) => (
                <div
                  key={d.label}
                  className="flex flex-col gap-1 border-b border-line px-7 py-5 last:border-b-0"
                >
                  <dt className="text-[10.5px] font-bold text-slate">
                    {d.label}
                  </dt>
                  <dd className="text-[16px] font-semibold text-ink">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{p.modules.eyebrow}</p>
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            {p.modules.items.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 60} className="bg-white">
                <div className="flex h-full flex-col p-8">
                  <span className="text-[13px] font-extrabold text-tie-red/40">0{i + 1}</span>
                  <h3 className="display-3 mt-3">{m.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{p.forWho.eyebrow}</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">{p.forWho.body}</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="display-2 max-w-2xl !text-white">{p.cta.title}</h2>
          <Link href={p.cta.href} className="btn btn-primary flex-none">
            {p.cta.label}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
