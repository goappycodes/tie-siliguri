import type { Metadata } from "next";
import Link from "next/link";
import { getEvents } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { pages, past } = getEvents();
const p = pages.past;

export const metadata: Metadata = {
  title: p.title,
  description: p.summary,
  openGraph: { title: p.title, description: p.summary },
};

export default function PastEventsPage() {
  return (
    <>
      <PageHeader slug={p.slug} eyebrow={p.eyebrow} title={p.title} summary={p.summary} />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          {past.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {past.map((e, i) => (
                <Reveal as="li" key={e.title} delay={(i % 3) * 80}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="lede max-w-2xl">{p.empty}</p>
          )}

          <div className="mt-12">
            <Link href="/events/upcoming" className="btn btn-primary">
              See what's coming up
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
