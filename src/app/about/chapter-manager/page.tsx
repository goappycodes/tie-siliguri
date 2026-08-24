import type { Metadata } from "next";
import { getAbout, getSite } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { chapterManager: m } = getAbout();

export const metadata: Metadata = {
  title: m.title,
  description: m.summary,
  openGraph: { title: m.title, description: m.summary },
};

export default function ChapterManagerPage() {
  const site = getSite();

  return (
    <>
      <PageHeader slug={m.slug} eyebrow={m.eyebrow} title={m.title} summary={m.summary} />

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Intro + responsibilities */}
          <div>
            <div className="max-w-2xl space-y-6">
              {m.intro.map((p) => (
                <Reveal key={p}>
                  <p className="lede">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12">
              <p className="eyebrow-plain">{m.responsibilities.eyebrow}</p>
              <ul className="mt-6 space-y-4">
                {m.responsibilities.items.map((it) => (
                  <li key={it} className="flex gap-3.5">
                    <span className="tick mt-1.5" aria-hidden="true" />
                    <span className="text-[16px] leading-relaxed text-ink-700">{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Contact card */}
          <aside>
            <div className="border-t-2 border-tie-red bg-paper-alt p-8 lg:p-10">
              <p className="eyebrow-plain">{m.contactLabel}</p>
              <dl className="mt-6 space-y-5 text-[14px]">
                <div>
                  <dt className="text-[10.5px] font-bold tracking-[0.1em] text-slate uppercase">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="font-bold text-ink underline decoration-tie-red decoration-2 underline-offset-4 hover:text-tie-red"
                    >
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10.5px] font-bold tracking-[0.1em] text-slate uppercase">
                    Phone
                  </dt>
                  {site.contact.phones.map((p) => (
                    <dd key={p} className="mt-1">
                      <a
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="text-ink-700 hover:text-tie-red"
                      >
                        {p}
                      </a>
                    </dd>
                  ))}
                </div>
                <div>
                  <dt className="text-[10.5px] font-bold tracking-[0.1em] text-slate uppercase">
                    Location
                  </dt>
                  <dd className="mt-1 text-ink-700">{site.contact.city}</dd>
                </div>
              </dl>
              <a href={`mailto:${site.contact.email}`} className="btn btn-primary mt-8 w-full">
                Email the chapter
                <ArrowRight />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
