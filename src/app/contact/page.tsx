import type { Metadata } from "next";
import Link from "next/link";
import { getContact, getSite } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const c = getContact();

export const metadata: Metadata = {
  title: c.title,
  description: c.summary,
  openGraph: { title: c.title, description: c.summary },
};

export default function ContactPage() {
  const site = getSite();

  return (
    <>
      <PageHeader slug={c.slug} eyebrow={c.eyebrow} title={c.title} summary={c.summary} />

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Form */}
          <div>
            <Reveal>
              <p className="lede max-w-2xl">{c.intro}</p>
            </Reveal>
            <Reveal className="mt-10">
              <ContactForm
                subject="TiE Siliguri — website enquiry"
                interests={["Membership", "Events", "Partnership", "Something else"]}
                submitLabel="Send message"
              />
            </Reveal>
          </div>

          {/* Direct contact */}
          <aside>
            <div className="border-t-2 border-tie-red bg-paper-alt p-8 lg:p-10">
              <p className="eyebrow-plain">{c.directLabel}</p>
              <dl className="mt-6 space-y-5 text-[14px]">
                <div>
                  <dt className="text-[10.5px] font-bold text-slate">
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
                  <dt className="text-[10.5px] font-bold text-slate">
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
                  <dt className="text-[10.5px] font-bold text-slate">
                    Location
                  </dt>
                  <dd className="mt-1 text-ink-700">{site.contact.city}</dd>
                </div>
              </dl>

              <p className="mt-8 text-[10.5px] font-bold text-slate">
                {c.followLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {site.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-line px-4 py-2 text-[11px] font-bold text-ink transition-colors hover:border-tie-red hover:bg-tie-red hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-paper-alt py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{c.reasons.eyebrow}</p>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {c.reasons.items.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 60}>
                <div className="flex flex-col gap-4 border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-[16.5px] font-bold text-ink">{r.title}</h2>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">{r.body}</p>
                  </div>
                  <Link href={r.href} className="link-arrow flex-none">
                    {r.cta}
                    <ArrowRight />
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
