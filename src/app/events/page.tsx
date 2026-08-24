import type { Metadata } from "next";
import Link from "next/link";
import { getEvents } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { pages, upcoming, past } = getEvents();
const p = pages.index;

export const metadata: Metadata = {
  title: p.title,
  description: p.summary,
  openGraph: { title: p.title, description: p.summary },
};

export default function EventsPage() {
  const preview = upcoming.slice(0, 3);

  return (
    <>
      <PageHeader slug={p.slug} eyebrow={p.eyebrow} title={p.title} summary={p.summary} />

      {/* Intro */}
      <section className="bg-white pt-14 sm:pt-20 lg:pt-28">
        <div className="shell max-w-3xl space-y-6">
          {p.intro.map((para) => (
            <Reveal key={para}>
              <p className="lede">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Upcoming preview */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="eyebrow">Upcoming</p>
              <h2 className="display-2 mt-5">On the calendar</h2>
            </Reveal>
            <Reveal delay={100} className="flex-none">
              <Link href="/events/upcoming" className="link-arrow">
                All upcoming events
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Reveal>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {preview.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 80}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Past events band */}
      <section className="bg-ink py-16 text-white lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow !text-tie-red">Past events</p>
            <h2 className="display-2 mt-5 !text-white">
              {past.length} sessions since launch
            </h2>
            <p className="lede mt-5 max-w-xl !text-white/70">
              From the chapter launch to hands-on masterclasses — browse everything TiE Siliguri has
              hosted so far.
            </p>
          </div>
          <Link href="/events/past" className="btn btn-primary flex-none">
            Explore past events
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
