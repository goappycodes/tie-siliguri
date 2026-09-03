import type { Metadata } from "next";
import Link from "next/link";
import { getCommunity } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Avatar from "@/components/Avatar";
import Reveal from "@/components/Reveal";
import { ArrowRight, SocialIcon } from "@/components/Icons";

const { associateMembers: am } = getCommunity();

export const metadata: Metadata = {
  title: am.title,
  description: am.summary,
  openGraph: { title: am.title, description: am.summary },
};

export default function AssociateMembersPage() {
  return (
    <>
      <PageHeader slug={am.slug} eyebrow={am.eyebrow} title={am.title} summary={am.summary} />

      {/* Intro */}
      <section className="bg-white pt-14 pb-4 sm:pt-20 sm:pb-8 lg:pt-28">
        <div className="shell max-w-3xl space-y-6">
          {am.intro.map((p) => (
            <Reveal key={p}>
              <p className="lede">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Member grid */}
      {am.members?.length ? (
        <section className="bg-white pb-14 sm:pb-20 lg:pb-24">
          <div className="shell">
            {am.membersTitle && (
              <Reveal className="mb-10 max-w-2xl">
                <h2 className="display-2">{am.membersTitle}</h2>
              </Reveal>
            )}
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {am.members.map((m, i) => (
                <Reveal as="li" key={`${m.name}-${m.company}`} delay={(i % 3) * 60} className="bg-white">
                  <div className="flex h-full flex-col p-7 lg:p-8">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <Avatar src={m.photo} name={m.name} size={64} />
                        <div className="min-w-0">
                          <h3 className="text-[17px] leading-tight font-bold text-ink">{m.name}</h3>
                          <p className="mt-1 text-[13px] leading-snug font-semibold text-tie-red">
                            {m.company}
                          </p>
                          {m.role && (
                            <p className="mt-0.5 text-[12.5px] leading-snug text-slate">{m.role}</p>
                          )}
                        </div>
                      </div>
                      {(m as { linkedin?: string }).linkedin && (
                        <a
                          href={(m as { linkedin?: string }).linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} on LinkedIn`}
                          className="flex-none text-slate transition-colors hover:text-tie-red"
                        >
                          <SocialIcon name="linkedin" className="h-[18px] w-[18px]" />
                        </a>
                      )}
                    </div>
                    {m.bio && (
                      <p className="mt-5 text-[14px] leading-relaxed text-ink-600">{m.bio}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Criteria */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{am.criteria.eyebrow}</p>
          </Reveal>
          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {am.criteria.items.map((it, i) => (
              <Reveal as="li" key={it} delay={(i % 3) * 60} className="bg-white">
                <div className="flex h-full gap-4 p-7">
                  <span className="text-2xl font-extrabold text-tie-red/30">0{i + 1}</span>
                  <p className="text-[15px] leading-relaxed text-ink-700">{it}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="display-2 max-w-2xl !text-white">{am.cta.title}</h2>
          <Link href={am.cta.href} className="btn btn-primary flex-none">
            {am.cta.label}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
