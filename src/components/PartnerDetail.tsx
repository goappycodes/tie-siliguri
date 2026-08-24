import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

export type Partner = {
  slug: string;
  eyebrow: string;
  role: string;
  title: string;
  summary: string;
  body: string[];
  facts?: { value: string; label: string }[];
  link?: { label: string; href: string } | null;
};

/**
 * Shared layout for a single chapter-partner page. Facts and the external link
 * are optional, so a partner with only a description (e.g. one still being
 * finalised) renders cleanly without them.
 */
export default function PartnerDetail({ partner: p }: { partner: Partner }) {
  return (
    <>
      <PageHeader slug={p.slug} eyebrow={p.eyebrow} title={p.title} summary={p.summary} />

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="space-y-6">
            <Reveal>
              <span className="inline-flex bg-tie-red-light px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] text-tie-red uppercase">
                {p.role}
              </span>
            </Reveal>
            {p.body.map((para) => (
              <Reveal key={para}>
                <p className="lede">{para}</p>
              </Reveal>
            ))}
            {p.link && (
              <Reveal>
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  {p.link.label}
                  <ArrowRight />
                </a>
              </Reveal>
            )}
          </div>

          {p.facts && p.facts.length > 0 && (
            <Reveal delay={100} className="lg:pt-2">
              <dl className="border-t-2 border-tie-red bg-paper-alt">
                {p.facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line px-7 py-5 last:border-b-0"
                  >
                    <dt className="text-[12px] font-semibold tracking-[0.06em] text-slate uppercase">
                      {f.label}
                    </dt>
                    <dd className="text-2xl font-extrabold text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </section>

      {/* Back to partners */}
      <section className="bg-paper-alt py-12">
        <div className="shell">
          <Link href="/partners" className="link-arrow">
            All chapter partners
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
