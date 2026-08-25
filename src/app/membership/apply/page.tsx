import type { Metadata } from "next";
import { getMembership, getSite } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

const { apply: a } = getMembership();

export const metadata: Metadata = {
  title: a.title,
  description: a.summary,
  openGraph: { title: a.title, description: a.summary },
};

export default function ApplyPage() {
  const site = getSite();

  return (
    <>
      <PageHeader slug={a.slug} eyebrow={a.eyebrow} title={a.title} summary={a.summary} />

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Steps + fees */}
          <div>
            <Reveal>
              <p className="eyebrow">{a.steps.eyebrow}</p>
            </Reveal>
            <ol className="mt-8 space-y-8">
              {a.steps.items.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 70} className="flex gap-5">
                  <span className="flex h-10 w-10 flex-none items-center justify-center bg-tie-red text-[15px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h2 className="text-[18px] leading-tight font-bold text-ink">{s.title}</h2>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-ink-600">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-12">
              <p className="eyebrow-plain">{a.feesLabel}</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {a.fees.map((f) => (
                  <li
                    key={f.category}
                    className={`p-6 ${f.featured ? "bg-ink text-white" : "border border-line"}`}
                  >
                    <p className={`text-[14px] font-bold ${f.featured ? "!text-white" : "text-ink"}`}>
                      {f.category}
                    </p>
                    <p
                      className={`mt-3 text-[13px] ${f.featured ? "text-white/60" : "text-slate"}`}
                    >
                      {f.admission} admission
                    </p>
                    <p className="mt-1 text-[13px] font-semibold text-tie-red">{f.annual} / year</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Application form */}
          <aside>
            <div className="border-t-2 border-tie-red bg-paper-alt p-8 lg:p-10">
              <p className="eyebrow-plain">{a.contactLabel}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                Tell us a little about you and the chapter team will get back to you about the right
                membership.
              </p>
              <div className="mt-7">
                <ContactForm
                  subject="TiE Siliguri — Membership application"
                  interests={["Charter Member", "Associate Member", "Not sure yet"]}
                  submitLabel="Submit application"
                />
              </div>
              <p className="mt-6 text-[13px] text-slate">
                Prefer email?{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="font-semibold text-ink underline decoration-tie-red decoration-2 underline-offset-4 hover:text-tie-red"
                >
                  {site.contact.email}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
