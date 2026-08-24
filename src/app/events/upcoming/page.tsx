import type { Metadata } from "next";
import Link from "next/link";
import { getEvents, getSite } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { pages, upcoming } = getEvents();
const p = pages.upcoming;

export const metadata: Metadata = {
  title: p.title,
  description: p.summary,
  openGraph: { title: p.title, description: p.summary },
};

export default function UpcomingEventsPage() {
  const site = getSite();

  return (
    <>
      <PageHeader slug={p.slug} eyebrow={p.eyebrow} title={p.title} summary={p.summary} />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          {upcoming.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {upcoming.map((e, i) => (
                <Reveal as="li" key={e.title} delay={i * 80}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="lede max-w-2xl">{p.empty}</p>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <a href={`mailto:${site.contact.email}`} className="btn btn-primary">
              Register your interest
              <ArrowRight />
            </a>
            <Link href="/events/past" className="btn btn-outline">
              See past events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
