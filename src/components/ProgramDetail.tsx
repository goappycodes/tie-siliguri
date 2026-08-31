import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

type Detail = { label: string; value: string };
type Module = { title: string; body: string };
type Session = { time: string; title: string; facilitators?: string; takeaway: string };
type AgendaDay = { label: string; date: string; sessions: Session[] };

export type FlagshipProgram = {
  slug: string;
  eyebrow: string;
  badge: string;
  title: string;
  summary: string;
  overview: string[];
  details: Detail[];
  modules: { eyebrow: string; items: Module[] };
  agenda?: { eyebrow: string; note?: string; days: AgendaDay[] };
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

      {/* Agenda — only for programmes that publish a session-by-session schedule */}
      {p.agenda && (
        <section className="bg-white py-14 sm:py-20 lg:py-24">
          <div className="shell">
            <Reveal>
              <p className="eyebrow">{p.agenda.eyebrow}</p>
              {p.agenda.note && <p className="lede mt-6 max-w-3xl">{p.agenda.note}</p>}
            </Reveal>

            <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
              {p.agenda.days.map((day) => (
                <Reveal key={day.label}>
                  <div className="h-full border border-line bg-white">
                    <div className="flex items-baseline justify-between gap-4 bg-ink px-7 py-5 text-white">
                      <h3 className="text-xl font-extrabold !text-white">{day.label}</h3>
                      <p className="text-[12.5px] font-semibold text-white/60">{day.date}</p>
                    </div>
                    <ol className="divide-y divide-line">
                      {day.sessions.map((s) => (
                        <li key={s.title} className="px-7 py-6">
                          <p className="text-[11px] font-bold text-tie-red">{s.time}</p>
                          <h4 className="mt-2 text-[16.5px] leading-snug font-bold text-ink">
                            {s.title}
                          </h4>
                          {s.facilitators && (
                            <p className="mt-1 text-[13px] font-medium text-slate">
                              {s.facilitators}
                            </p>
                          )}
                          <p className="mt-3 text-[14px] leading-relaxed text-ink-600">
                            <span className="font-semibold text-ink">You leave with: </span>
                            {s.takeaway}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Who it's for — background alternates depending on whether an agenda
          section (white) precedes it, so both flagship pages stay banded. */}
      <section className={`${p.agenda ? "bg-paper-alt" : "bg-white"} py-14 sm:py-20 lg:py-24`}>
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
