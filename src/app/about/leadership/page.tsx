import type { Metadata } from "next";
import { getAbout, getHome, getCommunity } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Avatar from "@/components/Avatar";
import Reveal from "@/components/Reveal";
import { SocialIcon } from "@/components/Icons";

const { leadership: meta } = getAbout();

export const metadata: Metadata = {
  title: meta.title,
  description: meta.summary,
  openGraph: { title: meta.title, description: meta.summary },
};

/**
 * EC members are also Charter / Associate Members, so their notes are reused
 * from the community roster rather than duplicated — a single source of truth,
 * keyed by name. Anyone without a roster bio simply shows none.
 */
function buildLookups() {
  const { charterMembers, associateMembers } = getCommunity();
  const bio = new Map<string, string>();
  const linkedin = new Map<string, string>();
  for (const m of [...charterMembers.members, ...associateMembers.members]) {
    if ("bio" in m && m.bio && !bio.has(m.name)) bio.set(m.name, m.bio);
    const li = (m as { linkedin?: string }).linkedin;
    if (li && !linkedin.has(m.name)) linkedin.set(m.name, li);
  }
  return { bio, linkedin };
}

export default function LeadershipPage() {
  const { leadership } = getHome();
  const [president, ...rest] = leadership.members;
  const { bio: bioByName, linkedin: liByName } = buildLookups();

  return (
    <>
      <PageHeader slug={meta.slug} eyebrow={meta.eyebrow} title={meta.title} summary={meta.summary} />

      {/* Executive Committee */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{meta.ecLabel}</p>
            <h2 className="display-2 mt-5 max-w-2xl">The Executive Committee</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* President — featured */}
            <Reveal className="lg:row-span-2">
              <article className="flex h-full flex-col justify-between bg-ink p-8 text-white lg:p-10">
                <div>
                  <Avatar src={president.photo} name={president.name} size={96} tone="dark" />
                  <span className="mt-7 inline-block bg-tie-red px-3 py-1.5 text-[10.5px] font-bold text-white">
                    {president.role}
                  </span>
                  <h3 className="mt-5 text-3xl leading-none font-extrabold !text-white lg:text-4xl">
                    {president.name}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                    {president.company}
                  </p>
                  {bioByName.get(president.name) && (
                    <p className="mt-5 text-[14px] leading-relaxed text-white/50">
                      {bioByName.get(president.name)}
                    </p>
                  )}
                  {liByName.get(president.name) && (
                    <a
                      href={liByName.get(president.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${president.name} on LinkedIn`}
                      className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold text-white/80 transition-colors hover:text-white"
                    >
                      <SocialIcon name="linkedin" className="h-4 w-4" />
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
                <p className="mt-10 border-t border-white/12 pt-6 text-[12px] font-medium text-white/40">
                  {meta.ecLabel}
                </p>
              </article>
            </Reveal>

            {/* Rest of the EC */}
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-2">
              {rest.map((m, i) => (
                <Reveal as="li" key={m.name} delay={i * 60} className="bg-white">
                  <div className="flex h-full items-start gap-4 p-6 transition-colors hover:bg-paper-alt">
                    <Avatar src={m.photo} name={m.name} />
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-bold text-tie-red">
                        {m.role}
                      </p>
                      <h3 className="mt-1.5 text-[16px] leading-tight font-bold text-ink">
                        {m.name}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-snug font-normal text-slate">
                        {m.company}
                      </p>
                      {bioByName.get(m.name) && (
                        <p className="mt-3 text-[13px] leading-relaxed text-ink-600">
                          {bioByName.get(m.name)}
                        </p>
                      )}
                      {liByName.get(m.name) && (
                        <a
                          href={liByName.get(m.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} on LinkedIn`}
                          className="mt-3 inline-flex text-slate transition-colors hover:text-tie-red"
                        >
                          <SocialIcon name="linkedin" className="h-[17px] w-[17px]" />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{leadership.mentorsLabel}</p>
            <p className="lede mt-6 max-w-3xl">{meta.note}</p>
          </Reveal>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-12">
            {leadership.mentors.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 60}>
                <div className="flex items-start gap-4 border-t-2 border-tie-red bg-white p-7">
                  <Avatar src={m.photo} name={m.name} />
                  <div>
                    <h3 className="text-[16px] leading-tight font-bold text-ink">{m.name}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-snug font-normal text-ink-600">
                      {m.role}
                    </p>
                    <p className="mt-1 text-[13.5px] leading-snug font-normal text-slate">
                      {m.company}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
