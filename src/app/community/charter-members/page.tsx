import type { Metadata } from "next";
import { getCommunity } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Avatar from "@/components/Avatar";
import Reveal from "@/components/Reveal";

const { charterMembers: cm } = getCommunity();

export const metadata: Metadata = {
  title: cm.title,
  description: cm.summary,
  openGraph: { title: cm.title, description: cm.summary },
};

export default function CharterMembersPage() {
  return (
    <>
      <PageHeader slug={cm.slug} eyebrow={cm.eyebrow} title={cm.title} summary={cm.summary} />

      {/* Member grid */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {cm.members.map((m, i) => (
              <Reveal as="li" key={`${m.name}-${m.company}`} delay={(i % 3) * 60} className="bg-white">
                <div className="flex h-full flex-col p-7 lg:p-8">
                  <div className="flex items-center gap-4">
                    <Avatar src={m.photo} name={m.name} size={64} />
                    <div className="min-w-0">
                      <h2 className="text-[17px] leading-tight font-bold text-ink">{m.name}</h2>
                      <p className="mt-1 text-[13px] leading-snug font-semibold text-tie-red">
                        {m.company}
                      </p>
                    </div>
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

      {/* Criteria */}
      <section className="bg-ink py-14 text-white sm:py-20 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow !text-tie-red">{cm.criteria.eyebrow}</p>
          </Reveal>
          <Reveal delay={100}>
            <ul className="space-y-5">
              {cm.criteria.items.map((it) => (
                <li key={it} className="flex gap-4 border-b border-white/12 pb-5 last:border-b-0">
                  <span className="tick mt-1.5 flex-none" aria-hidden="true" />
                  <span className="text-[16px] leading-relaxed text-white/75">{it}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
